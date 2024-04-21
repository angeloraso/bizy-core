import * as i1$2 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, Inject, RendererFactory2, ChangeDetectorRef, ViewContainerRef, Component, ChangeDetectionStrategy, ViewChild, NgModule, Pipe } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import * as i1 from '@angular/router';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import * as i1$1 from '@angular/cdk/dialog';
import { DIALOG_DATA, DialogRef, Dialog, DialogModule } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import * as i1$3 from '@ngx-translate/core';
import { TranslateService as TranslateService$1, TranslateModule as TranslateModule$1 } from '@ngx-translate/core';

class BizyKeyboardService {
    document;
    #shiftHolding = new BehaviorSubject(false);
    get shiftHolding$() {
        return this.#shiftHolding.asObservable();
    }
    constructor(document) {
        this.document = document;
        this.document.addEventListener('keydown', (event) => {
            if (event.key === 'Shift') {
                this.#shiftHolding.next(true);
            }
        });
        this.document.addEventListener('keyup', (event) => {
            if (event.key === 'Shift') {
                this.#shiftHolding.next(false);
            }
        });
    }
    isShiftHolding() {
        return this.#shiftHolding.value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyKeyboardService, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyKeyboardService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyKeyboardService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });

class BizyExportToCSVService {
    document;
    rendererFactory;
    #loading = false;
    #renderer;
    constructor(document, rendererFactory) {
        this.document = document;
        this.rendererFactory = rendererFactory;
        this.#renderer = this.rendererFactory.createRenderer(null, null);
    }
    toCSV(data) {
        if (this.#loading || !data.items || !Array.isArray(data.items) || !data.model) {
            return;
        }
        try {
            this.#loading = true;
            const csv = this.#getCSV(data.items, data.model);
            if (!data.fileName) {
                data.fileName = 'bizy-csv';
            }
            this.#downloadCSV({ csv, fileName: data.fileName });
        }
        finally {
            this.#loading = false;
        }
    }
    #getCSV(items, model) {
        let toCopy = '';
        for (const key in model) {
            if (key) {
                toCopy += `${model[key]},`;
            }
        }
        items.forEach(_item => {
            // Remove the last character (',')
            toCopy = toCopy.slice(0, -1);
            toCopy += '\n';
            for (const key in model) {
                let value = _item;
                const nestedProperty = key.split('.');
                for (let i = 0; i < nestedProperty.length; i++) {
                    const _property = nestedProperty[i];
                    if (value) {
                        value = value[_property];
                    }
                    else {
                        break;
                    }
                }
                if (typeof value !== undefined || value !== null) {
                    toCopy += `${value},`;
                }
                else {
                    toCopy += ',';
                }
            }
        });
        return toCopy;
    }
    #downloadCSV(data) {
        const blob = new Blob([data.csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const downloadButton = this.#renderer.createElement('a');
        downloadButton.setAttribute('download', data.fileName);
        downloadButton.href = url;
        this.#renderer.appendChild(this.document.body, downloadButton);
        downloadButton.click();
        this.#renderer.removeChild(this.document.body, downloadButton);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyExportToCSVService, deps: [{ token: DOCUMENT }, { token: RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyExportToCSVService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyExportToCSVService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2, decorators: [{
                    type: Inject,
                    args: [RendererFactory2]
                }] }]; } });

class BizyRouterService {
    router;
    _backPath = '';
    transitionsEnd$;
    transitionsStart$;
    constructor(router) {
        this.router = router;
        this.transitionsEnd$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd), map((event) => event.id), distinctUntilChanged(), map(() => this.router.routerState.snapshot.root));
        this.transitionsStart$ = this.router.events.pipe(filter(event => event instanceof NavigationStart), map((event) => event.id), distinctUntilChanged(), map(() => this.router.routerState.snapshot.root));
    }
    getURL() {
        return window.location.pathname;
    }
    getBackPath() {
        return this._backPath;
    }
    getId(activatedRoute, param) {
        return activatedRoute.snapshot.paramMap.get(param);
    }
    getQueryParam(activatedRoute, param) {
        return activatedRoute.snapshot.queryParamMap.get(param);
    }
    goTo(data) {
        this._backPath = this.getURL();
        if (data.path[0] === '/') {
            this.router.navigateByUrl(`${data.path}${this._serialize(data.params)}`, {
                replaceUrl: true
            });
            return;
        }
        const path = this.getURL();
        const index = path.indexOf('?');
        const url = index !== -1 ? path.substring(0, index) : path;
        this.router.navigateByUrl(`${url}/${data.path}${this._serialize(data.params)}`, {
            replaceUrl: true
        });
    }
    goBack() {
        if (this._backPath) {
            this.router.navigateByUrl(this._backPath, { replaceUrl: true });
            this._backPath = '';
        }
        else {
            const index = this.getURL().lastIndexOf('/');
            const backURL = this.getURL().substring(0, index);
            this.router.navigateByUrl(backURL, { replaceUrl: true });
        }
    }
    reload(force) {
        if (force) {
            window.location.reload();
        }
        else {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.goTo({ path: this.getURL() });
            });
        }
    }
    _serialize(params) {
        if (!params) {
            return '';
        }
        const str = [];
        for (const param in params) {
            if (params[param]) {
                str.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
            }
        }
        const queryParams = str.length > 0 ? `?${str.join('&')}` : '';
        return queryParams;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRouterService, deps: [{ token: Router }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRouterService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRouterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router, decorators: [{
                    type: Inject,
                    args: [Router]
                }] }]; } });

class BizyCacheService {
    router;
    CACHE_PREFIX = 'BIZY-CACHE';
    constructor(router) {
        this.router = router;
    }
    getData(key) {
        if (!key) {
            key = `${this.CACHE_PREFIX}-${this.router.getURL()}`;
        }
        const data = sessionStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return {};
    }
    setData(value, key) {
        if (!value) {
            return;
        }
        if (!key) {
            key = `${this.CACHE_PREFIX}-${this.router.getURL()}`;
        }
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    remove(key) {
        if (!key) {
            key = `${this.CACHE_PREFIX}-${this.router.getURL()}`;
        }
        sessionStorage.removeItem(key);
    }
    removeAll() {
        const cacheKeys = Object.keys(sessionStorage).filter(key => {
            return key.includes(this.CACHE_PREFIX);
        });
        cacheKeys.forEach(value => {
            sessionStorage.removeItem(value);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCacheService, deps: [{ token: BizyRouterService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCacheService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCacheService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: BizyRouterService, decorators: [{
                    type: Inject,
                    args: [BizyRouterService]
                }] }]; } });

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
const exportedForTests = { getVersion, getWindowsPlatformVersion };

class UserAgentService {
    get() {
        return new Promise(resolve => {
            overrideUserAgentUsingClientHints([
                'architecture',
                'bitness',
                'model',
                'platformVersion',
                'uaFullVersion',
                'fullVersionList'
            ])
                .then(userAgent => {
                resolve(userAgent);
            })
                .catch(() => {
                resolve(window.navigator.userAgent);
            });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserAgentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserAgentService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserAgentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class BizyValidatorService {
    isEmail(email) {
        const regex = /^(([^ñ<>()[\]\\.,;:\s@"]+(\.[^ñ<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
    isPassFormat(pass) {
        const formatRegex = /(?!.*012)(?!.*123)(?!.*234)(?!.*345)(?!.*456)(?!.*567)(?!.*678)(?!.*789)(?!.*987)(?!.*876)(?!.*765)(?!.*654)(?!.*543)(?!.*432)(?!.*321)(?!.*210)(?!.*(.)\1{2,})(?!(^\D+$))(?!(^\d+$))(^.{6,}$)/;
        const excludeRegex = /[^'"]$/;
        const _pass = String(pass).toLowerCase();
        return formatRegex.test(_pass) && excludeRegex.test(_pass);
    }
    isNoSpecialCharacter(name) {
        const regex = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
        return regex.test(String(name).toLowerCase());
    }
    isNumber(number) {
        const regex = /^[0-9]*$/;
        return regex.test(String(number).toLowerCase());
    }
    isPhoneNumber(number) {
        const regex = /^\+{0,1}[0-9#*]+$/;
        return regex.test(String(number).toLowerCase());
    }
    isString(string) {
        return typeof string === 'string' || string instanceof String;
    }
    isJSON(text) {
        if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\/bfnrtu]/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
        }
        return false;
    }
    emailValidator() {
        return (control) => {
            return !control.value || (control.value && this.isEmail(control.value)) ? null : { bizyEmail: true };
        };
    }
    phoneNumberValidator() {
        return (control) => {
            return !control.value || (control.value && this.isPhoneNumber(control.value)) ? null : { bizyPhoneNumber: true };
        };
    }
    numberValidator() {
        return (control) => {
            return !control.value || (control.value && this.isNumber(control.value)) ? null : { bizyNumber: true };
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyValidatorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyValidatorService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class BizyStorageService {
    get(key) {
        const item = localStorage.getItem(key);
        try {
            return JSON.parse(item);
        }
        catch (e) {
            return item;
        }
    }
    set(key, value) {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else if (typeof value === 'string') {
            localStorage.setItem(key, value);
        }
        else {
            localStorage.setItem(key, String(value));
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyStorageService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

var COLOR;
(function (COLOR) {
    COLOR["DEFAULT"] = "#666666";
    COLOR["INFO"] = "#2484C6";
    COLOR["SUCCESS"] = "#65BF6C";
    COLOR["WARNING"] = "#F7A64C";
    COLOR["ERROR"] = "#EF4C59";
})(COLOR || (COLOR = {}));
class BizyLogService {
    #lastLogTimestamp = 0;
    #log(log, color, param) {
        const difference = this.#lastLogTimestamp ? Date.now() - this.#lastLogTimestamp : 0;
        this.#lastLogTimestamp = Date.now();
        const timestampStyles = 'color: #EE5DFF';
        const logStyles = `color: ${color}; font-size: 12px;`;
        const date = new Date();
        if (param) {
            console.log(`%c${date.toLocaleString()}: %c${log} %c(+${difference}ms)`, timestampStyles, logStyles, timestampStyles, param);
        }
        else {
            console.log(`%c${date.toLocaleString()}: %c${log} %c(+${difference}ms)`, timestampStyles, logStyles, timestampStyles);
        }
    }
    debug(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.DEFAULT, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Debug', color: COLOR.DEFAULT });
        }
    }
    info(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.INFO, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Info', color: COLOR.INFO });
        }
    }
    success(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.SUCCESS, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Success', color: COLOR.SUCCESS });
        }
    }
    warning(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.WARNING, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Warning', color: COLOR.WARNING });
        }
    }
    error(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.ERROR, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Error', color: COLOR.ERROR });
        }
    }
    /** DEPRECATED */
    templateDebug(data) {
        this.#template({ ...data, title: 'Debug', color: COLOR.DEFAULT });
    }
    /** DEPRECATED */
    templateSucc(data) {
        this.#template({ ...data, title: 'Success', color: COLOR.SUCCESS });
    }
    /** DEPRECATED */
    templateInfo(data) {
        this.#template({ ...data, title: 'Info', color: COLOR.INFO });
    }
    /** DEPRECATED */
    templateWarn(data) {
        this.#template({ ...data, title: 'Warning', color: COLOR.WARNING });
    }
    /** DEPRECATED */
    templateError(data) {
        this.#template({ ...data, title: 'Error', color: COLOR.ERROR });
    }
    #template(data) {
        const log = `(${data.title}) ${data.fileName} - ${data.functionName}`;
        this.#log(log, data.color, data.param);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLogService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class BizyPopupWrapperComponent {
    component;
    dialogRef;
    ref;
    dynamicComponentContainer;
    constructor(component, dialogRef, ref) {
        this.component = component;
        this.dialogRef = dialogRef;
        this.ref = ref;
    }
    ngAfterViewInit() {
        this.loadDynamicComponent();
    }
    loadDynamicComponent() {
        if (this.component) {
            this.dynamicComponentContainer.clear();
            this.dynamicComponentContainer.createComponent(this.component);
            this.ref.detectChanges();
        }
    }
    close() {
        this.dialogRef.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupWrapperComponent, deps: [{ token: DIALOG_DATA }, { token: DialogRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyPopupWrapperComponent, selector: "bizy-popup-wrapper", viewQueries: [{ propertyName: "dynamicComponentContainer", first: true, predicate: ["dynamicComponentContainer"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<div class=\"bizy-popup-wrapper\">\n\n    <button (click)=\"close()\" (keyup.enter)=\"close()\" class=\"bizy-popup-wrapper__close-button\">\n\n        <svg \n            data-name=\"Cancel button\"\n            id=\"bizy-popup-wrapper-close-svg\" \n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path id=\"bizy-popup-wrapper-close-svg-content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>", styles: [".bizy-popup-wrapper{position:relative;background-color:var(--bizy-popup-background-color);min-width:min(80vw,26rem);height:-moz-fit-content;height:fit-content}.bizy-popup-wrapper__close-button{position:absolute;right:.5rem;top:.5rem;border:none;cursor:pointer;background-color:transparent;transition:color .3s;z-index:1}.bizy-popup-wrapper__close-button #bizy-popup-wrapper-close-svg{height:1rem}.bizy-popup-wrapper__close-button #bizy-popup-wrapper-close-svg-content{fill:var(--bizy-popup-close-button-color)}.bizy-popup-wrapper__close-button:hover #bizy-popup-wrapper-close-svg-content{fill:var(--bizy-popup-close-button-hover-color)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-popup-wrapper', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-popup-wrapper\">\n\n    <button (click)=\"close()\" (keyup.enter)=\"close()\" class=\"bizy-popup-wrapper__close-button\">\n\n        <svg \n            data-name=\"Cancel button\"\n            id=\"bizy-popup-wrapper-close-svg\" \n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path id=\"bizy-popup-wrapper-close-svg-content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>", styles: [".bizy-popup-wrapper{position:relative;background-color:var(--bizy-popup-background-color);min-width:min(80vw,26rem);height:-moz-fit-content;height:fit-content}.bizy-popup-wrapper__close-button{position:absolute;right:.5rem;top:.5rem;border:none;cursor:pointer;background-color:transparent;transition:color .3s;z-index:1}.bizy-popup-wrapper__close-button #bizy-popup-wrapper-close-svg{height:1rem}.bizy-popup-wrapper__close-button #bizy-popup-wrapper-close-svg-content{fill:var(--bizy-popup-close-button-color)}.bizy-popup-wrapper__close-button:hover #bizy-popup-wrapper-close-svg-content{fill:var(--bizy-popup-close-button-hover-color)}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DIALOG_DATA]
                }] }, { type: i1$1.DialogRef, decorators: [{
                    type: Inject,
                    args: [DialogRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { dynamicComponentContainer: [{
                type: ViewChild,
                args: ['dynamicComponentContainer', { read: ViewContainerRef }]
            }] } });

class BizyPopupService {
    dialog;
    #dialogs = new Set();
    #data;
    constructor(dialog) {
        this.dialog = dialog;
    }
    open(data, callback) {
        this.#data = data.data;
        const dialogRef = this.dialog.open(BizyPopupWrapperComponent, ({
            id: data.id,
            data: data.component,
            autoFocus: true,
            hasBackdrop: true,
            disableClose: data.disableClose ?? false,
            panelClass: ['bizy-popup', data.customClass]
        }));
        this.#dialogs.add(dialogRef);
        dialogRef.closed.pipe(take(1)).subscribe(response => {
            this.#dialogs.delete(dialogRef);
            if (callback) {
                callback(response);
            }
        });
    }
    getData() {
        return this.#data;
    }
    close(data) {
        let dialogRef = null;
        if (data && data.id) {
            dialogRef = Array.from(this.#dialogs).find(_dialogRef => _dialogRef.id === data.id);
        }
        else {
            dialogRef = Array.from(this.#dialogs).pop();
        }
        if (dialogRef) {
            dialogRef.close(data ? data.response : null);
            this.#dialogs.delete(dialogRef);
        }
    }
    closeAll() {
        Array.from(this.#dialogs).forEach(_dialogRef => {
            _dialogRef.close();
        });
        this.#dialogs.clear();
    }
    openedPopups() {
        return this.#dialogs.size;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupService, deps: [{ token: Dialog }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Dialog, decorators: [{
                    type: Inject,
                    args: [Dialog]
                }] }]; } });

const COMPONENTS$1 = [
    BizyPopupWrapperComponent,
];
class BizyPopupModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, declarations: [BizyPopupWrapperComponent], imports: [CommonModule, FormsModule, DialogModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, providers: [BizyPopupService], imports: [CommonModule, FormsModule, DialogModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, DialogModule],
                    declarations: COMPONENTS$1,
                    providers: [BizyPopupService]
                }]
        }] });

class BizyToastWrapperComponent {
    data;
    toast;
    type = TOAST.INFO;
    title = '';
    msg = '';
    constructor(data, toast) {
        this.data = data;
        this.toast = toast;
        this.type = this.data.type;
        this.title = this.data.title;
        this.msg = this.data.msg;
    }
    close() {
        this.toast.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToastWrapperComponent, deps: [{ token: DIALOG_DATA }, { token: BizyToastService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyToastWrapperComponent, selector: "bizy-toast-wrapper", ngImport: i0, template: "<div class=\"bizy-toast-wrapper bizy-toast-wrapper--{{type}}\">\n\n    <button (click)=\"close()\" (keyup.enter)=\"close()\" class=\"bizy-toast-wrapper__close-button\">\n\n        <svg \n            data-name=\"Cancel button\"\n            id=\"bizy-toast-wrapper-close-svg\" \n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path id=\"bizy-toast-wrapper-close-svg-content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n\n    </button>\n\n\n    <h1 class=\"bizy-toast-wrapper__title bizy-toast-wrapper__title--{{type}}\" *ngIf=\"title\">{{title}}</h1>\n\n    <h5 class=\"bizy-toast-wrapper__msg\" *ngIf=\"msg\">{{msg}}</h5>\n\n\n    <span class=\"bizy-toast__progress bizy-toast__progress--{{type}}\"></span>\n    \n</div>", styles: [".bizy-toast-wrapper{position:relative;width:100%;min-width:20rem;height:-moz-fit-content;height:fit-content;min-height:3rem;border-left:.4rem solid #fff;border-top-left-radius:.5rem;border-bottom-left-radius:.5rem;display:flex;flex-direction:column;justify-content:center;row-gap:.5rem;padding:.5rem;box-shadow:0 18px 25px #32325d40,0 3px 6px #0000001a}.bizy-toast-wrapper__title{max-width:min(28rem,60vw)}.bizy-toast-wrapper__msg{max-width:min(30rem,70vw)}.bizy-toast-wrapper--default{background-color:var(--bizy-toast-default-background-color, #fff);border-left-color:var(--bizy-toast-default-color, #666666)}.bizy-toast-wrapper__title--default{color:var(--bizy-toast-default-color, #666666)}.bizy-toast-wrapper--info{background-color:var(--bizy-toast-info-background-color, #fff);border-left-color:var(--bizy-toast-info-color, #2b94f4)}.bizy-toast-wrapper__title--info{color:var(--bizy-toast-info-color, #2b94f4)}.bizy-toast-wrapper--success{background-color:var(--bizy-toast-success-background-color, #fff);border-left-color:var(--bizy-toast-success-color, #5fbc5a)}.bizy-toast-wrapper__title--success{color:var(--bizy-toast-success-color, #5fbc5a)}.bizy-toast-wrapper--warning{background-color:var(--bizy-toast-warning-background-color, #fff);border-left-color:var(--bizy-toast-warning-color, #f7a64c)}.bizy-toast-wrapper__title--warning{color:var(--bizy-toast-warning-color, #f7a64c)}.bizy-toast-wrapper--danger{background-color:var(--bizy-toast-danger-background-color, #fff);border-left-color:var(--bizy-toast-danger-color, #e76565)}.bizy-toast-wrapper__title--danger{color:var(--bizy-toast-danger-color, #e76565)}.bizy-toast-wrapper__close-button{position:absolute;right:.5rem;top:.5rem;border:none;cursor:pointer;background-color:transparent;transition:color .3s;z-index:1}.bizy-toast-wrapper__close-button #bizy-toast-wrapper-close-svg{height:1rem}.bizy-toast-wrapper__close-button #bizy-toast-wrapper-close-svg-content{fill:var(--bizy-toast-close-button-color, #666666)}.bizy-toast-wrapper__close-button:hover #bizy-toast-wrapper-close-svg-content{fill:var(--bizy-toast-close-button-hover-color, #333333)}.bizy-toast__progress{width:100%;height:.1rem;display:inline-block;position:absolute;bottom:0;left:0;right:0;overflow:hidden}.bizy-toast__progress--default{background-color:var(--bizy-toast-default-color, #666666)}.bizy-toast__progress--info{background-color:var(--bizy-toast-info-color, #2b94f4)}.bizy-toast__progress--success{background-color:var(--bizy-toast-success-color, #5fbc5a)}.bizy-toast__progress--warning{background-color:var(--bizy-toast-warning-color, #f7a64c)}.bizy-toast__progress--danger{background-color:var(--bizy-toast-danger-color, #e76565)}.bizy-toast__progress:after{content:\"\";box-sizing:border-box;width:0;height:.1rem;background-color:#fff;position:absolute;top:0;left:0;animation:progress 2.5s linear infinite}@keyframes progress{0%{width:0}to{width:100%}}\n"], dependencies: [{ kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToastWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toast-wrapper', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-toast-wrapper bizy-toast-wrapper--{{type}}\">\n\n    <button (click)=\"close()\" (keyup.enter)=\"close()\" class=\"bizy-toast-wrapper__close-button\">\n\n        <svg \n            data-name=\"Cancel button\"\n            id=\"bizy-toast-wrapper-close-svg\" \n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path id=\"bizy-toast-wrapper-close-svg-content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n\n    </button>\n\n\n    <h1 class=\"bizy-toast-wrapper__title bizy-toast-wrapper__title--{{type}}\" *ngIf=\"title\">{{title}}</h1>\n\n    <h5 class=\"bizy-toast-wrapper__msg\" *ngIf=\"msg\">{{msg}}</h5>\n\n\n    <span class=\"bizy-toast__progress bizy-toast__progress--{{type}}\"></span>\n    \n</div>", styles: [".bizy-toast-wrapper{position:relative;width:100%;min-width:20rem;height:-moz-fit-content;height:fit-content;min-height:3rem;border-left:.4rem solid #fff;border-top-left-radius:.5rem;border-bottom-left-radius:.5rem;display:flex;flex-direction:column;justify-content:center;row-gap:.5rem;padding:.5rem;box-shadow:0 18px 25px #32325d40,0 3px 6px #0000001a}.bizy-toast-wrapper__title{max-width:min(28rem,60vw)}.bizy-toast-wrapper__msg{max-width:min(30rem,70vw)}.bizy-toast-wrapper--default{background-color:var(--bizy-toast-default-background-color, #fff);border-left-color:var(--bizy-toast-default-color, #666666)}.bizy-toast-wrapper__title--default{color:var(--bizy-toast-default-color, #666666)}.bizy-toast-wrapper--info{background-color:var(--bizy-toast-info-background-color, #fff);border-left-color:var(--bizy-toast-info-color, #2b94f4)}.bizy-toast-wrapper__title--info{color:var(--bizy-toast-info-color, #2b94f4)}.bizy-toast-wrapper--success{background-color:var(--bizy-toast-success-background-color, #fff);border-left-color:var(--bizy-toast-success-color, #5fbc5a)}.bizy-toast-wrapper__title--success{color:var(--bizy-toast-success-color, #5fbc5a)}.bizy-toast-wrapper--warning{background-color:var(--bizy-toast-warning-background-color, #fff);border-left-color:var(--bizy-toast-warning-color, #f7a64c)}.bizy-toast-wrapper__title--warning{color:var(--bizy-toast-warning-color, #f7a64c)}.bizy-toast-wrapper--danger{background-color:var(--bizy-toast-danger-background-color, #fff);border-left-color:var(--bizy-toast-danger-color, #e76565)}.bizy-toast-wrapper__title--danger{color:var(--bizy-toast-danger-color, #e76565)}.bizy-toast-wrapper__close-button{position:absolute;right:.5rem;top:.5rem;border:none;cursor:pointer;background-color:transparent;transition:color .3s;z-index:1}.bizy-toast-wrapper__close-button #bizy-toast-wrapper-close-svg{height:1rem}.bizy-toast-wrapper__close-button #bizy-toast-wrapper-close-svg-content{fill:var(--bizy-toast-close-button-color, #666666)}.bizy-toast-wrapper__close-button:hover #bizy-toast-wrapper-close-svg-content{fill:var(--bizy-toast-close-button-hover-color, #333333)}.bizy-toast__progress{width:100%;height:.1rem;display:inline-block;position:absolute;bottom:0;left:0;right:0;overflow:hidden}.bizy-toast__progress--default{background-color:var(--bizy-toast-default-color, #666666)}.bizy-toast__progress--info{background-color:var(--bizy-toast-info-color, #2b94f4)}.bizy-toast__progress--success{background-color:var(--bizy-toast-success-color, #5fbc5a)}.bizy-toast__progress--warning{background-color:var(--bizy-toast-warning-color, #f7a64c)}.bizy-toast__progress--danger{background-color:var(--bizy-toast-danger-color, #e76565)}.bizy-toast__progress:after{content:\"\";box-sizing:border-box;width:0;height:.1rem;background-color:#fff;position:absolute;top:0;left:0;animation:progress 2.5s linear infinite}@keyframes progress{0%{width:0}to{width:100%}}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DIALOG_DATA]
                }] }, { type: BizyToastService, decorators: [{
                    type: Inject,
                    args: [BizyToastService]
                }] }]; } });

var TOAST;
(function (TOAST) {
    TOAST["DEFAULT"] = "default";
    TOAST["SUCCESS"] = "success";
    TOAST["INFO"] = "info";
    TOAST["WARNING"] = "warning";
    TOAST["DANGER"] = "danger";
})(TOAST || (TOAST = {}));
class BizyToastService {
    dialog;
    #toast = null;
    #closing = false;
    constructor(dialog) {
        this.dialog = dialog;
    }
    #open(data) {
        this.#toast = this.dialog.open(BizyToastWrapperComponent, {
            data,
            autoFocus: true,
            hasBackdrop: false,
            disableClose: false,
            panelClass: ['bizy-toast', 'bizy-toast--in']
        });
        setTimeout(() => {
            this.close();
        }, 3000);
    }
    default(data) {
        this.#open({ type: TOAST.DEFAULT, ...data });
    }
    info(data) {
        this.#open({ type: TOAST.INFO, ...data });
    }
    success(data) {
        this.#open({ type: TOAST.SUCCESS, ...data });
    }
    warning(data) {
        this.#open({ type: TOAST.WARNING, ...data });
    }
    danger(data) {
        this.#open({ type: TOAST.DANGER, ...data });
    }
    close = () => {
        if (!this.#toast || this.#closing) {
            return;
        }
        this.#closing = true;
        this.#toast.removePanelClass('bizy-toast--in');
        this.#toast.addPanelClass('bizy-toast--out');
        setTimeout(() => {
            this.#toast.close();
            this.#toast = null;
            this.#closing = false;
        }, 500);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToastService, deps: [{ token: Dialog }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToastService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToastService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Dialog, decorators: [{
                    type: Inject,
                    args: [Dialog]
                }] }]; } });

const COMPONENTS = [
    BizyToastWrapperComponent,
];
class BizyToastModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyToastModule, declarations: [BizyToastWrapperComponent], imports: [CommonModule, FormsModule, DialogModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToastModule, providers: [BizyToastService], imports: [CommonModule, FormsModule, DialogModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, DialogModule],
                    declarations: COMPONENTS,
                    providers: [BizyToastService]
                }]
        }] });

var LANGUAGE;
(function (LANGUAGE) {
    LANGUAGE["SPANISH"] = "es";
    LANGUAGE["ENGLISH"] = "en";
})(LANGUAGE || (LANGUAGE = {}));
class TranslateService {
    translate;
    constructor(translate) {
        this.translate = translate;
    }
    loadTranslations(...args) {
        const locales = [...args];
        locales.forEach(locale => {
            this.translate.setTranslation(locale.lang, locale.translations, true);
        });
    }
    addLangs(langs) {
        this.translate.addLangs(langs);
    }
    getLangs() {
        return this.translate.getLangs();
    }
    setDefault(lang) {
        this.translate.setDefaultLang(lang);
    }
    getCurrentLang() {
        return this.translate.currentLang;
    }
    use(lang) {
        this.translate.use(lang);
    }
    get(translation) {
        return this.translate.instant(translation);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslateService, deps: [{ token: TranslateService$1 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslateService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslateService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$3.TranslateService, decorators: [{
                    type: Inject,
                    args: [TranslateService$1]
                }] }]; } });

class TranslatePipe {
    translate;
    constructor(translate) {
        this.translate = translate;
    }
    transform(label) {
        return this.translate.get(label);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslatePipe, deps: [{ token: TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TranslatePipe, name: "translate" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'translate',
                }]
        }], ctorParameters: function () { return [{ type: TranslateService, decorators: [{
                    type: Inject,
                    args: [TranslateService]
                }] }]; } });

class TranslatePipeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslatePipeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TranslatePipeModule, declarations: [TranslatePipe], exports: [TranslatePipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslatePipeModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslatePipeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TranslatePipe],
                    exports: [TranslatePipe]
                }]
        }] });

class TranslateModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TranslateModule, imports: [i1$3.TranslateModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslateModule, providers: [TranslateService], imports: [TranslateModule$1.forRoot()] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [TranslateModule$1.forRoot()],
                    providers: [TranslateService]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BizyCacheService, BizyExportToCSVService, BizyKeyboardService, BizyLogService, BizyPopupModule, BizyPopupService, BizyRouterService, BizyStorageService, BizyToastModule, BizyToastService, BizyValidatorService, LANGUAGE, TranslateModule, TranslatePipe, TranslatePipeModule, TranslateService, UserAgentService };
//# sourceMappingURL=bizy-services.mjs.map
