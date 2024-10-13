/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// This function's role is to enable smooth transition to the brave new world of
// User-Agent Client Hints. If you have legacy code that relies on
// `navigator.userAgent` and which relies on entropy that will go away by
// default, you *need* to refactor it to use UA-CH. This function is to be used
// as a stop gap, to enable smooth transition during that period.
/**
* @param {string[]} hints
* @return {Promise<string|undefined>} A Promise that resolves to a string if a
*   UA could be synthesized from client hints, otherwise undefined.
*/
async function getUserAgentUsingClientHints(hints) {
    // Helper functions for platform specific strings
    const GetCrosSpecificString = (values) => {
        let osCPUFragment = '';
        if (values.bitness == '64') {
            if (values.architecture == 'x86') {
                osCPUFragment = 'x86_64';
            }
            else if (values.architecture == 'arm') {
                osCPUFragment = 'aarch64';
            }
        }
        else if (values.architecture == 'arm' && values.bitness == '32') {
            osCPUFragment = 'armv7l';
        }
        if (osCPUFragment == '') {
            return `X11; CrOS ${values.platformVersion}`;
        }
        return `X11; CrOS ${osCPUFragment} ${values.platformVersion}`;
    };
    const GetWindowsSpecificString = (values) => {
        let osCPUFragment = '';
        if (values.architecture == 'x86' && values.bitness == '64') {
            osCPUFragment = '; Win64; x64';
        }
        else if (values.architecture == 'arm') {
            osCPUFragment = '; ARM';
        }
        else if (values.wow64 === true) {
            osCPUFragment = '; WOW64';
        }
        return `Windows NT ${getWindowsPlatformVersion(values.platformVersion)}${osCPUFragment}`;
    };
    const GetMacSpecificString = (values) => {
        let newUA = 'Macintosh;';
        newUA += values.architecture === 'arm' ? ' ARM ' : ' Intel ';
        newUA += 'Mac OS X ';
        let macVersion = values.platformVersion;
        if (macVersion.indexOf('.') > -1) {
            macVersion = macVersion.split('.').join('_');
        }
        newUA += macVersion;
        return newUA;
    };
    const GetAndroidSpecificString = (values) => {
        let newUA = 'Linux; Android ';
        newUA += values.platformVersion;
        if (values.model) {
            newUA += '; ';
            newUA += values.model;
        }
        return newUA;
    };
    const Initialize = (values) => {
        if (!values.architecture) {
            values.architecture = 'x86';
        }
        if (!values.bitness) {
            values.bitness = '64';
        }
        if (!values.model) {
            values.model = '';
        }
        if (!values.platform) {
            values.platform = 'Windows';
        }
        if (!values.platformVersion) {
            values.platformVersion = '10.0';
        }
        if (!values.wow64) {
            values.wow64 = false;
        }
        return values;
    };
    // @ts-ignore-error
    if (!navigator.userAgentData) {
        return Promise.resolve('');
    }
    // Verify that this is a Chromium-based browser
    let isChromium = false;
    let chromiumVersion;
    // eslint-disable-next-line prefer-regex-literals
    const isChromeUAPattern = new RegExp('AppleWebKit/537.36 \\(KHTML, like Gecko\\) Chrome/\\d+.\\d+.\\d+.\\d+ (Mobile )?Safari/537.36$');
    // @ts-ignore-error
    navigator.userAgentData.brands.forEach(value => {
        if (value.brand == 'Chromium') {
            // Let's double check the UA string as well, so we don't accidentally
            // capture a headless browser or friendly bot (which should report as
            // HeadlessChrome or something entirely different).
            isChromium = isChromeUAPattern.test(navigator.userAgent);
            chromiumVersion = value.version;
        }
    });
    // @ts-ignore
    if (!isChromium || chromiumVersion < 100) {
        // If this is not a Chromium-based browser, the UA string should be very
        // different. Or, if this is a Chromium lower than 100, it doesn't have
        // all the hints we rely on. So let's bail.
        return Promise.resolve('');
    }
    // Main logic
    return new Promise(resolve => {
        // @ts-ignore-error
        navigator.userAgentData.getHighEntropyValues(hints).then(values => {
            let initialValues = {
                // @ts-ignore-error
                platform: navigator.userAgentData?.platform,
                version: chromiumVersion
            };
            values = Object.assign(initialValues, values);
            values = Initialize(values);
            let newUA = 'Mozilla/5.0 (';
            if (['Chrome OS', 'Chromium OS'].includes(values.platform)) {
                newUA += GetCrosSpecificString(values);
            }
            else if (values.platform == 'Windows') {
                newUA += GetWindowsSpecificString(values);
            }
            else if (values.platform == 'macOS') {
                newUA += GetMacSpecificString(values);
            }
            else if (values.platform == 'Android') {
                newUA += GetAndroidSpecificString(values);
            }
            else {
                newUA += 'X11; Linux x86_64';
            }
            newUA += ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/';
            newUA += getVersion(values?.fullVersionList, initialValues.version);
            // @ts-ignore-error
            if (navigator.userAgentData.mobile) {
                newUA += ' Mobile';
            }
            newUA += ' Safari/537.36';
            resolve(newUA);
        });
    });
}
function getVersion(fullVersionList, majorVersion) {
    // If we don't get a fullVersionList, or it's somehow undefined, return
    // the reduced version number.
    return (fullVersionList?.find((item) => item.brand == 'Google Chrome')?.version ||
        `${majorVersion}.0.0.0`);
}
function getWindowsPlatformVersion(platformVersion) {
    // https://wicg.github.io/ua-client-hints/#get-the-legacy-windows-version-number
    const versionMap = new Map([
        ['0.3.0', '6.3'],
        ['0.2.0', '6.2'],
        ['0.1.0', '6.1'] // Windows 7
    ]);
    if (versionMap.has(platformVersion)) {
        return versionMap.get(platformVersion);
    }
    // Windows 10 and above send "Windows NT 10.0"
    return '10.0';
}
/**
   * @param {string[]} hints
   * @return {Promise<string|undefined>} A Promise that resolves on overriding the
   *   navigator.userAgent string.
   */
async function overrideUserAgentUsingClientHints(hints) {
    return new Promise(resolve => {
        getUserAgentUsingClientHints(hints).then(newUA => {
            if (newUA) {
                // Got a new UA value. Now override `navigator.userAgent`.
                Object.defineProperty(navigator, 'userAgent', {
                    value: newUA,
                    writable: false,
                    configurable: true
                });
            }
            else {
                newUA = navigator.userAgent;
            }
            resolve(newUA);
        });
    });
}
export const exportedForTests = { getVersion, getWindowsPlatformVersion };
export { getUserAgentUsingClientHints, overrideUserAgentUsingClientHints as getUserAgent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWFjaC1yZXRyb2ZpbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3VzZXItYWdlbnQvdWFjaC1yZXRyb2ZpbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSCxnRkFBZ0Y7QUFDaEYsa0VBQWtFO0FBQ2xFLHlFQUF5RTtBQUN6RSwrRUFBK0U7QUFDL0UsaUVBQWlFO0FBQ2pFOzs7O0VBSUU7QUFDRixLQUFLLFVBQVUsNEJBQTRCLENBQUMsS0FBa0c7SUFDNUksaURBQWlEO0lBQ2pELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxNQUF3RSxFQUFFLEVBQUU7UUFDekcsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDMUIsSUFBSSxNQUFNLENBQUMsWUFBWSxJQUFJLEtBQUssRUFBRTtnQkFDaEMsYUFBYSxHQUFHLFFBQVEsQ0FBQzthQUMxQjtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUksS0FBSyxFQUFFO2dCQUN2QyxhQUFhLEdBQUcsU0FBUyxDQUFDO2FBQzNCO1NBQ0Y7YUFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ2pFLGFBQWEsR0FBRyxRQUFRLENBQUM7U0FDMUI7UUFFRCxJQUFJLGFBQWEsSUFBSSxFQUFFLEVBQUU7WUFDdkIsT0FBTyxhQUFhLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUM5QztRQUVELE9BQU8sYUFBYSxhQUFhLElBQUksTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2hFLENBQUMsQ0FBQztJQUVGLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxNQUF3RixFQUFFLEVBQUU7UUFDNUgsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFD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QUcsQ0FBQztRQUN6QixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7UUFDaEIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO1FBQ2hCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLFlBQVk7S0FDOUIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ25DLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUN4QztJQUVELDhDQUE4QztJQUM5QyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQ7Ozs7S0FJSztBQUNMLEtBQUssVUFBVSxpQ0FBaUMsQ0FBQyxLQUFrRztJQUNqSixPQUFPLElBQUksT0FBTyxDQUFTLE9BQU8sQ0FBQyxFQUFFO1FBQ25DLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMvQyxJQUFJLEtBQUssRUFBRTtnQkFDVCwwREFBMEQ7Z0JBQzFELE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRTtvQkFDNUMsS0FBSyxFQUFFLEtBQUs7b0JBQ1osUUFBUSxFQUFFLEtBQUs7b0JBQ2YsWUFBWSxFQUFFLElBQUk7aUJBQ25CLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO2FBQzdCO1lBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxVQUFVLEVBQUUseUJBQXlCLEVBQUUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsaUNBQWlDLElBQUksWUFBWSxFQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgJ0xpY2Vuc2UnKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gJ0FTIElTJyBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLy8gVGhpcyBmdW5jdGlvbidzIHJvbGUgaXMgdG8gZW5hYmxlIHNtb290aCB0cmFuc2l0aW9uIHRvIHRoZSBicmF2ZSBuZXcgd29ybGQgb2Zcbi8vIFVzZXItQWdlbnQgQ2xpZW50IEhpbnRzLiBJZiB5b3UgaGF2ZSBsZWdhY3kgY29kZSB0aGF0IHJlbGllcyBvblxuLy8gYG5hdmlnYXRvci51c2VyQWdlbnRgIGFuZCB3aGljaCByZWxpZXMgb24gZW50cm9weSB0aGF0IHdpbGwgZ28gYXdheSBieVxuLy8gZGVmYXVsdCwgeW91ICpuZWVkKiB0byByZWZhY3RvciBpdCB0byB1c2UgVUEtQ0guIFRoaXMgZnVuY3Rpb24gaXMgdG8gYmUgdXNlZFxuLy8gYXMgYSBzdG9wIGdhcCwgdG8gZW5hYmxlIHNtb290aCB0cmFuc2l0aW9uIGR1cmluZyB0aGF0IHBlcmlvZC5cbi8qKlxuKiBAcGFyYW0ge3N0cmluZ1tdfSBoaW50c1xuKiBAcmV0dXJuIHtQcm9taXNlPHN0cmluZ3x1bmRlZmluZWQ+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHN0cmluZyBpZiBhXG4qICAgVUEgY291bGQgYmUgc3ludGhlc2l6ZWQgZnJvbSBjbGllbnQgaGludHMsIG90aGVyd2lzZSB1bmRlZmluZWQuXG4qL1xuYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckFnZW50VXNpbmdDbGllbnRIaW50cyhoaW50czogWydhcmNoaXRlY3R1cmUnLCAnYml0bmVzcycsICdtb2RlbCcsICdwbGF0Zm9ybVZlcnNpb24nLCAndWFGdWxsVmVyc2lvbicsICdmdWxsVmVyc2lvbkxpc3QnXSk6IFByb21pc2U8c3RyaW5nPiB7XG4gIC8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHBsYXRmb3JtIHNwZWNpZmljIHN0cmluZ3NcbiAgY29uc3QgR2V0Q3Jvc1NwZWNpZmljU3RyaW5nID0gKHZhbHVlczogeyBiaXRuZXNzOiBzdHJpbmc7IGFyY2hpdGVjdHVyZTogc3RyaW5nOyBwbGF0Zm9ybVZlcnNpb246IGFueTsgfSkgPT4ge1xuICAgIGxldCBvc0NQVUZyYWdtZW50ID0gJyc7XG4gICAgaWYgKHZhbHVlcy5iaXRuZXNzID09ICc2NCcpIHtcbiAgICAgIGlmICh2YWx1ZXMuYXJjaGl0ZWN0dXJlID09ICd4ODYnKSB7XG4gICAgICAgIG9zQ1BVRnJhZ21lbnQgPSAneDg2XzY0JztcbiAgICAgIH0gZWxzZSBpZiAodmFsdWVzLmFyY2hpdGVjdHVyZSA9PSAnYXJtJykge1xuICAgICAgICBvc0NQVUZyYWdtZW50ID0gJ2FhcmNoNjQnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsdWVzLmFyY2hpdGVjdHVyZSA9PSAnYXJtJyAmJiB2YWx1ZXMuYml0bmVzcyA9PSAnMzInKSB7XG4gICAgICBvc0NQVUZyYWdtZW50ID0gJ2FybXY3bCc7XG4gICAgfVxuXG4gICAgaWYgKG9zQ1BVRnJhZ21lbnQgPT0gJycpIHtcbiAgICAgIHJldHVybiBgWDExOyBDck9TICR7dmFsdWVzLnBsYXRmb3JtVmVyc2lvbn1gO1xuICAgIH1cblxuICAgIHJldHVybiBgWDExOyBDck9TICR7b3NDUFVGcmFnbWVudH0gJHt2YWx1ZXMucGxhdGZvcm1WZXJzaW9ufWA7XG4gIH07XG5cbiAgY29uc3QgR2V0V2luZG93c1NwZWNpZmljU3RyaW5nID0gKHZhbHVlczogeyBhcmNoaXRlY3R1cmU6IHN0cmluZzsgYml0bmVzczogc3RyaW5nOyB3b3c2NDogYm9vbGVhbjsgcGxhdGZvcm1WZXJzaW9uOiBhbnk7IH0pID0+IHtcbiAgICBsZXQgb3NDUFVGcmFnbWVudCA9ICcnO1xuICAgIGlmICh2YWx1ZXMuYXJjaGl0ZWN0dXJlID09ICd4ODYnICYmIHZhbHVlcy5iaXRuZXNzID09ICc2NCcpIHtcbiAgICAgIG9zQ1BVRnJhZ21lbnQgPSAnOyBXaW42NDsgeDY0JztcbiAgICB9IGVsc2UgaWYgKHZhbHVlcy5hcmNoaXRlY3R1cmUgPT0gJ2FybScpIHtcbiAgICAgIG9zQ1BVRnJhZ21lbnQgPSAnOyBBUk0nO1xuICAgIH0gZWxzZSBpZiAodmFsdWVzLndvdzY0ID09PSB0cnVlKSB7XG4gICAgICBvc0NQVUZyYWdtZW50ID0gJzsgV09XNjQnO1xuICAgIH1cblxuICAgIHJldHVybiBgV2luZG93cyBOVCAke2dldFdpbmRvd3NQbGF0Zm9ybVZlcnNpb24oXG4gICAgICB2YWx1ZXMucGxhdGZvcm1WZXJzaW9uXG4gICAgKX0ke29zQ1BVRnJhZ21lbnR9YDtcbiAgfTtcblxuICBjb25zdCBHZXRNYWNTcGVjaWZpY1N0cmluZyA9ICh2YWx1ZXM6IHsgYXJjaGl0ZWN0dXJlOiBzdHJpbmc7IHBsYXRmb3JtVmVyc2lvbjogYW55OyB9KSA9PiB7XG4gICAgbGV0IG5ld1VBID0gJ01hY2ludG9zaDsnO1xuICAgIG5ld1VBICs9IHZhbHVlcy5hcmNoaXRlY3R1cmUgPT09ICdhcm0nID8gJyBBUk0gJyA6ICcgSW50ZWwgJztcbiAgICBuZXdVQSArPSAnTWFjIE9TIFggJztcbiAgICBsZXQgbWFjVmVyc2lvbiA9IHZhbHVlcy5wbGF0Zm9ybVZlcnNpb247XG4gICAgaWYgKG1hY1ZlcnNpb24uaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgIG1hY1ZlcnNpb24gPSBtYWNWZXJzaW9uLnNwbGl0KCcuJykuam9pbignXycpO1xuICAgIH1cblxuICAgIG5ld1VBICs9IG1hY1ZlcnNpb247XG4gICAgcmV0dXJuIG5ld1VBO1xuICB9O1xuXG4gIGNvbnN0IEdldEFuZHJvaWRTcGVjaWZpY1N0cmluZyA9ICh2YWx1ZXM6IHsgcGxhdGZvcm1WZXJzaW9uOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmc7IH0pID0+IHtcbiAgICBsZXQgbmV3VUEgPSAnTGludXg7IEFuZHJvaWQgJztcbiAgICBuZXdVQSArPSB2YWx1ZXMucGxhdGZvcm1WZXJzaW9uO1xuICAgIGlmICh2YWx1ZXMubW9kZWwpIHtcbiAgICAgIG5ld1VBICs9ICc7ICc7XG4gICAgICBuZXdVQSArPSB2YWx1ZXMubW9kZWw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1VBO1xuICB9O1xuXG4gIGNvbnN0IEluaXRpYWxpemUgPSAodmFsdWVzOiB7IGFyY2hpdGVjdHVyZTogc3RyaW5nOyBiaXRuZXNzOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmc7IHBsYXRmb3JtOiBzdHJpbmc7IHBsYXRmb3JtVmVyc2lvbjogc3RyaW5nOyB3b3c2NDogYm9vbGVhbjsgfSkgPT4ge1xuICAgIGlmICghdmFsdWVzLmFyY2hpdGVjdHVyZSkge1xuICAgICAgdmFsdWVzLmFyY2hpdGVjdHVyZSA9ICd4ODYnO1xuICAgIH1cblxuICAgIGlmICghdmFsdWVzLmJpdG5lc3MpIHtcbiAgICAgIHZhbHVlcy5iaXRuZXNzID0gJzY0JztcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlcy5tb2RlbCkge1xuICAgICAgdmFsdWVzLm1vZGVsID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKCF2YWx1ZXMucGxhdGZvcm0pIHtcbiAgICAgIHZhbHVlcy5wbGF0Zm9ybSA9ICdXaW5kb3dzJztcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlcy5wbGF0Zm9ybVZlcnNpb24pIHtcbiAgICAgIHZhbHVlcy5wbGF0Zm9ybVZlcnNpb24gPSAnMTAuMCc7XG4gICAgfVxuXG4gICAgaWYgKCF2YWx1ZXMud293NjQpIHtcbiAgICAgIHZhbHVlcy53b3c2NCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgLy8gQHRzLWlnbm9yZS1lcnJvclxuICBpZiAoIW5hdmlnYXRvci51c2VyQWdlbnREYXRhKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnJyk7XG4gIH1cblxuICAvLyBWZXJpZnkgdGhhdCB0aGlzIGlzIGEgQ2hyb21pdW0tYmFzZWQgYnJvd3NlclxuICBsZXQgaXNDaHJvbWl1bSA9IGZhbHNlO1xuICBsZXQgY2hyb21pdW1WZXJzaW9uOiBudW1iZXI7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcmVnZXgtbGl0ZXJhbHNcbiAgY29uc3QgaXNDaHJvbWVVQVBhdHRlcm4gPSBuZXcgUmVnRXhwKFxuICAgICdBcHBsZVdlYktpdC81MzcuMzYgXFxcXChLSFRNTCwgbGlrZSBHZWNrb1xcXFwpIENocm9tZS9cXFxcZCsuXFxcXGQrLlxcXFxkKy5cXFxcZCsgKE1vYmlsZSApP1NhZmFyaS81MzcuMzYkJ1xuICApO1xuICAgIC8vIEB0cy1pZ25vcmUtZXJyb3JcbiAgbmF2aWdhdG9yLnVzZXJBZ2VudERhdGEuYnJhbmRzLmZvckVhY2godmFsdWUgPT4ge1xuICAgIGlmICh2YWx1ZS5icmFuZCA9PSAnQ2hyb21pdW0nKSB7XG4gICAgICAvLyBMZXQncyBkb3VibGUgY2hlY2sgdGhlIFVBIHN0cmluZyBhcyB3ZWxsLCBzbyB3ZSBkb24ndCBhY2NpZGVudGFsbHlcbiAgICAgIC8vIGNhcHR1cmUgYSBoZWFkbGVzcyBicm93c2VyIG9yIGZyaWVuZGx5IGJvdCAod2hpY2ggc2hvdWxkIHJlcG9ydCBhc1xuICAgICAgLy8gSGVhZGxlc3NDaHJvbWUgb3Igc29tZXRoaW5nIGVudGlyZWx5IGRpZmZlcmVudCkuXG4gICAgICBpc0Nocm9taXVtID0gaXNDaHJvbWVVQVBhdHRlcm4udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIGNocm9taXVtVmVyc2lvbiA9IHZhbHVlLnZlcnNpb247XG4gICAgfVxuICB9KTtcbiAgLy8gQHRzLWlnbm9yZVxuICBpZiAoIWlzQ2hyb21pdW0gfHwgY2hyb21pdW1WZXJzaW9uIDwgMTAwKSB7XG4gICAgLy8gSWYgdGhpcyBpcyBub3QgYSBDaHJvbWl1bS1iYXNlZCBicm93c2VyLCB0aGUgVUEgc3RyaW5nIHNob3VsZCBiZSB2ZXJ5XG4gICAgLy8gZGlmZmVyZW50LiBPciwgaWYgdGhpcyBpcyBhIENocm9taXVtIGxvd2VyIHRoYW4gMTAwLCBpdCBkb2Vzbid0IGhhdmVcbiAgICAvLyBhbGwgdGhlIGhpbnRzIHdlIHJlbHkgb24uIFNvIGxldCdzIGJhaWwuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnJyk7XG4gIH1cblxuICAvLyBNYWluIGxvZ2ljXG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAvLyBAdHMtaWdub3JlLWVycm9yXG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudERhdGEuZ2V0SGlnaEVudHJvcHlWYWx1ZXMoaGludHMpLnRoZW4odmFsdWVzID0+IHtcbiAgICAgIGxldCBpbml0aWFsVmFsdWVzID0ge1xuICAgICAgICAvLyBAdHMtaWdub3JlLWVycm9yXG4gICAgICAgIHBsYXRmb3JtOiBuYXZpZ2F0b3IudXNlckFnZW50RGF0YT8ucGxhdGZvcm0sXG4gICAgICAgIHZlcnNpb246IGNocm9taXVtVmVyc2lvblxuICAgICAgfTtcbiAgICAgIHZhbHVlcyA9IE9iamVjdC5hc3NpZ24oaW5pdGlhbFZhbHVlcywgdmFsdWVzKTtcbiAgICAgIHZhbHVlcyA9IEluaXRpYWxpemUodmFsdWVzKTtcbiAgICAgIGxldCBuZXdVQSA9ICdNb3ppbGxhLzUuMCAoJztcbiAgICAgIGlmIChbJ0Nocm9tZSBPUycsICdDaHJvbWl1bSBPUyddLmluY2x1ZGVzKHZhbHVlcy5wbGF0Zm9ybSkpIHtcbiAgICAgICAgbmV3VUEgKz0gR2V0Q3Jvc1NwZWNpZmljU3RyaW5nKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlcy5wbGF0Zm9ybSA9PSAnV2luZG93cycpIHtcbiAgICAgICAgbmV3VUEgKz0gR2V0V2luZG93c1NwZWNpZmljU3RyaW5nKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlcy5wbGF0Zm9ybSA9PSAnbWFjT1MnKSB7XG4gICAgICAgIG5ld1VBICs9IEdldE1hY1NwZWNpZmljU3RyaW5nKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlcy5wbGF0Zm9ybSA9PSAnQW5kcm9pZCcpIHtcbiAgICAgICAgbmV3VUEgKz0gR2V0QW5kcm9pZFNwZWNpZmljU3RyaW5nKHZhbHVlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdVQSArPSAnWDExOyBMaW51eCB4ODZfNjQnO1xuICAgICAgfVxuXG4gICAgICBuZXdVQSArPSAnKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvJztcbiAgICAgIG5ld1VBICs9IGdldFZlcnNpb24odmFsdWVzPy5mdWxsVmVyc2lvbkxpc3QsIGluaXRpYWxWYWx1ZXMudmVyc2lvbik7XG4gICAgICAvLyBAdHMtaWdub3JlLWVycm9yXG4gICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudERhdGEubW9iaWxlKSB7XG4gICAgICAgIG5ld1VBICs9ICcgTW9iaWxlJztcbiAgICAgIH1cblxuICAgICAgbmV3VUEgKz0gJyBTYWZhcmkvNTM3LjM2JztcbiAgICAgIHJlc29sdmUobmV3VUEpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0VmVyc2lvbihmdWxsVmVyc2lvbkxpc3Q6IGFueVtdLCBtYWpvclZlcnNpb246IGFueSkge1xuICAvLyBJZiB3ZSBkb24ndCBnZXQgYSBmdWxsVmVyc2lvbkxpc3QsIG9yIGl0J3Mgc29tZWhvdyB1bmRlZmluZWQsIHJldHVyblxuICAvLyB0aGUgcmVkdWNlZCB2ZXJzaW9uIG51bWJlci5cbiAgcmV0dXJuIChcbiAgICBmdWxsVmVyc2lvbkxpc3Q/LmZpbmQoKGl0ZW06IHsgYnJhbmQ6IHN0cmluZzsgfSkgPT4gaXRlbS5icmFuZCA9PSAnR29vZ2xlIENocm9tZScpPy52ZXJzaW9uIHx8XG4gICAgICBgJHttYWpvclZlcnNpb259LjAuMC4wYFxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3dzUGxhdGZvcm1WZXJzaW9uKHBsYXRmb3JtVmVyc2lvbjogc3RyaW5nKSB7XG4gIC8vIGh0dHBzOi8vd2ljZy5naXRodWIuaW8vdWEtY2xpZW50LWhpbnRzLyNnZXQtdGhlLWxlZ2FjeS13aW5kb3dzLXZlcnNpb24tbnVtYmVyXG4gIGNvbnN0IHZlcnNpb25NYXAgPSBuZXcgTWFwKFtcbiAgICBbJzAuMy4wJywgJzYuMyddLCAvLyBXaW5kb3dzIDguMVxuICAgIFsnMC4yLjAnLCAnNi4yJ10sIC8vIFdpbmRvd3MgOFxuICAgIFsnMC4xLjAnLCAnNi4xJ10gLy8gV2luZG93cyA3XG4gIF0pO1xuXG4gIGlmICh2ZXJzaW9uTWFwLmhhcyhwbGF0Zm9ybVZlcnNpb24pKSB7XG4gICAgcmV0dXJuIHZlcnNpb25NYXAuZ2V0KHBsYXRmb3JtVmVyc2lvbik7XG4gIH1cblxuICAvLyBXaW5kb3dzIDEwIGFuZCBhYm92ZSBzZW5kIFwiV2luZG93cyBOVCAxMC4wXCJcbiAgcmV0dXJuICcxMC4wJztcbn1cblxuLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGhpbnRzXG4gICAqIEByZXR1cm4ge1Byb21pc2U8c3RyaW5nfHVuZGVmaW5lZD59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uIG92ZXJyaWRpbmcgdGhlXG4gICAqICAgbmF2aWdhdG9yLnVzZXJBZ2VudCBzdHJpbmcuXG4gICAqL1xuYXN5bmMgZnVuY3Rpb24gb3ZlcnJpZGVVc2VyQWdlbnRVc2luZ0NsaWVudEhpbnRzKGhpbnRzOiBbJ2FyY2hpdGVjdHVyZScsICdiaXRuZXNzJywgJ21vZGVsJywgJ3BsYXRmb3JtVmVyc2lvbicsICd1YUZ1bGxWZXJzaW9uJywgJ2Z1bGxWZXJzaW9uTGlzdCddKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KHJlc29sdmUgPT4ge1xuICAgIGdldFVzZXJBZ2VudFVzaW5nQ2xpZW50SGludHMoaGludHMpLnRoZW4obmV3VUEgPT4ge1xuICAgICAgaWYgKG5ld1VBKSB7XG4gICAgICAgIC8vIEdvdCBhIG5ldyBVQSB2YWx1ZS4gTm93IG92ZXJyaWRlIGBuYXZpZ2F0b3IudXNlckFnZW50YC5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5hdmlnYXRvciwgJ3VzZXJBZ2VudCcsIHtcbiAgICAgICAgICB2YWx1ZTogbmV3VUEsXG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1VBID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZShuZXdVQSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgY29uc3QgZXhwb3J0ZWRGb3JUZXN0cyA9IHsgZ2V0VmVyc2lvbiwgZ2V0V2luZG93c1BsYXRmb3JtVmVyc2lvbiB9O1xuZXhwb3J0IHsgZ2V0VXNlckFnZW50VXNpbmdDbGllbnRIaW50cywgb3ZlcnJpZGVVc2VyQWdlbnRVc2luZ0NsaWVudEhpbnRzIGFzIGdldFVzZXJBZ2VudH07XG4iXX0=