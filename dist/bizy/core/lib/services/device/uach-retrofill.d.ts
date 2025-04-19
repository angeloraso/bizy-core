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
/**
* @param {string[]} hints
* @return {Promise<string|undefined>} A Promise that resolves to a string if a
*   UA could be synthesized from client hints, otherwise undefined.
*/
declare function getUserAgentUsingClientHints(hints: ['architecture', 'bitness', 'model', 'platformVersion', 'uaFullVersion', 'fullVersionList']): Promise<string>;
declare function getVersion(fullVersionList: any[], majorVersion: any): any;
declare function getWindowsPlatformVersion(platformVersion: string): string;
/**
   * @param {string[]} hints
   * @return {Promise<string|undefined>} A Promise that resolves on overriding the
   *   navigator.userAgent string.
   */
declare function overrideUserAgentUsingClientHints(hints: ['architecture', 'bitness', 'model', 'platformVersion', 'uaFullVersion', 'fullVersionList']): Promise<string>;
export declare const exportedForTests: {
    getVersion: typeof getVersion;
    getWindowsPlatformVersion: typeof getWindowsPlatformVersion;
};
export { getUserAgentUsingClientHints, overrideUserAgentUsingClientHints as getUserAgent };
