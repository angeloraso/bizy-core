import * as i0 from '@angular/core';
import { Pipe, Inject, Injectable, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import Fuse from 'fuse.js';

class BizyRepeatPipe {
    transform(value) {
        return Array.from({ length: value }, (_, i) => i);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRepeatPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyRepeatPipe, name: "bizyRepeat" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRepeatPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyRepeat'
                }]
        }] });

class BizySetToArrayPipe {
    transform(items) {
        if (!items) {
            return [];
        }
        return Array.from(items);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySetToArrayPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySetToArrayPipe, name: "bizySetToArray" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySetToArrayPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySetToArray'
                }]
        }] });

class BizyEnumToArrayPipe {
    transform(enumObj) {
        return Object.keys(enumObj)
            .filter(key => isNaN(Number(key))) // Only keep the keys, not the reverse mappings in numeric enums
            .map(key => ({ key, value: enumObj[key] }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyEnumToArrayPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyEnumToArrayPipe, name: "bizyEnumToArray" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyEnumToArrayPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyEnumToArray'
                }]
        }] });

class BizySelectedPipe {
    transform(items) {
        if (!items || items.length === 0) {
            return [];
        }
        return items.filter((_item) => _item.selected === true);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectedPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySelectedPipe, name: "bizySelected" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectedPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySelected',
                }]
        }] });

class BizyOrderByPipe {
    transform(items, order = null, property = '') {
        // No items
        if (!items || !order) {
            return items;
        }
        // Array with only one item
        if (items.length <= 1) {
            return items;
        }
        const sortByString = (items, order) => {
            return items.sort((a, b) => {
                let aValue = getValue(a);
                let bValue = getValue(b);
                if ((typeof aValue === 'undefined' || aValue === null) && (typeof bValue === 'undefined' || bValue === null)) {
                    return 0;
                }
                if ((typeof aValue === 'undefined' || aValue === null) && (typeof bValue !== 'undefined' && bValue !== null)) {
                    return order === 'desc' ? 1 : -1;
                }
                if ((typeof aValue !== 'undefined' && aValue !== null) && (typeof bValue === 'undefined' || bValue === null)) {
                    return order === 'desc' ? -1 : 1;
                }
                if (aValue === bValue) {
                    return 0;
                }
                if (order === 'desc') {
                    return (this.#removeAccentsAndDiacritics(String(aValue)).toLowerCase() > this.#removeAccentsAndDiacritics(String(bValue)).toLowerCase() ? -1 : 1);
                }
                return (this.#removeAccentsAndDiacritics(String(bValue)).toLowerCase() > this.#removeAccentsAndDiacritics(String(aValue)).toLowerCase() ? -1 : 1);
            });
        };
        const sortByNumber = (items, order) => {
            if (order === 'asc') {
                return items.sort((a, b) => Number(getValue(a)) - Number(getValue(b)));
            }
            else {
                return items.sort((a, b) => Number(getValue(b)) - Number(getValue(a)));
            }
        };
        const sortByDate = (items, order) => {
            return items.sort((a, b) => {
                const aDate = parseDateString(getValue(a));
                const bDate = parseDateString(getValue(b));
                return order === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
            });
        };
        const isDate = (value) => {
            const ddMMYYYYhhmmss = /^\d{1,2}\/\d{1,2}\/\d{4}( \d{1,2}:\d{1,2}(:\d{1,2})?)?$/;
            return ddMMYYYYhhmmss.test(value);
        };
        const parseDateString = (value) => {
            const [datePart, timePart] = value.split(' ');
            const separator = value.includes('/') ? '/' : '-';
            const [day, month, year] = datePart.split(separator).map(Number);
            let hours = 0, minutes = 0, seconds = 0;
            if (timePart) {
                const [hourStr, minuteStr, secondStr] = timePart.split(':').map(Number);
                hours = isNaN(hourStr) ? 0 : hourStr;
                minutes = isNaN(minuteStr) ? 0 : minuteStr;
                seconds = isNaN(secondStr) ? 0 : secondStr;
            }
            return new Date(year, month - 1, day, hours, minutes, seconds);
        };
        const getValue = (item) => {
            let value = item;
            if (property) {
                const nestedProperty = property.split('.');
                for (let i = 0; i < nestedProperty.length; i++) {
                    const property = nestedProperty[i];
                    if (!property || typeof value[property] === 'undefined' || value[property] === null) {
                        value = null;
                        break;
                    }
                    value = value[property];
                }
            }
            return value;
        };
        let output = [...items];
        const index = output.findIndex(_item => {
            const value = getValue(_item);
            return typeof value !== 'undefined' && value !== null;
        });
        if (index === -1) {
            return output;
        }
        const value = getValue(output[index]);
        if (typeof value === 'number' && !isNaN(value)) {
            return sortByNumber(output, order);
        }
        else if (isDate(value)) {
            return sortByDate(output, order);
        }
        else {
            return sortByString(output, order);
        }
    }
    #removeAccentsAndDiacritics(search) {
        if (!search) {
            return '';
        }
        return search.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOrderByPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyOrderByPipe, name: "bizyOrderBy" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOrderByPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyOrderBy'
                }]
        }] });

class BizyReducePipe {
    transform(items, key, fixedTo = 2) {
        if (!items || items.length === 0) {
            return 0;
        }
        if (!key) {
            const reduce = items.reduce((acc, value) => acc + value, 0);
            return Number(reduce.toFixed(fixedTo));
        }
        const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);
        return Number(reduce.toFixed(fixedTo));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyReducePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyReducePipe, name: "bizyReduce" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyReducePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyReduce'
                }]
        }] });

class BizySafePipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type) {
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default: throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySafePipe, deps: [{ token: DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySafePipe, name: "bizySafe" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySafePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySafe'
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer, decorators: [{
                    type: Inject,
                    args: [DomSanitizer]
                }] }]; } });

class FuseOptions {
    isCaseSensitive;
    distance;
    findAllMatches;
    ignoreLocation;
    ignoreFieldNorm;
    includeMatches;
    includeScore;
    location;
    minMatchCharLength;
    shouldSort;
    threshold;
    useExtendedSearch;
    keys;
    constructor(options, keys) {
        // Si se desea cambiar algun valor por default, este es el lugar indicado
        if (!keys) {
            keys = [];
        }
        const defaultOptions = {
            // Se activa includeScore para poder buscar internamente en propiedades de tipo array
            includeScore: true,
            // Cuando es verdadero, la búsqueda ignorará la ubicación y la distancia, por lo que no importará en qué parte de la cadena aparezca el patrón
            ignoreLocation: true,
            // Se reduce a 0.1 el threshold (default: 0.6) para aumentar precisión en resultados
            threshold: 0.1
        };
        if (options) {
            options = { ...defaultOptions, ...options };
        }
        else {
            options = defaultOptions;
        }
        Object.assign(this, { ...options, keys: keys });
    }
}

class BizySearchPipe {
    fuseOptions;
    fuse;
    items;
    perfectMatch = {
        threshold: 0.0
    };
    transform(items, search, keys, options) {
        if (typeof search === 'undefined' || search === null || search === '' || (Array.isArray(search) && search.length === 0)) {
            return items;
        }
        let _keys = [];
        if (keys) {
            if (Array.isArray(keys)) {
                _keys = keys;
            }
            else {
                _keys = [keys];
            }
        }
        if (!Array.isArray(search)) {
            search = [this.#removeAccentsAndDiacritics(String(search))];
        }
        else {
            search = search.map(_search => this.#removeAccentsAndDiacritics(String(_search)));
        }
        const getFn = (item, keys) => {
            const value = keys.reduce((acc, key) => acc && acc[key], item);
            return typeof value === 'string' ? this.#removeAccentsAndDiacritics(value) : value;
        };
        // Remove empty items
        search = search.filter(n => n);
        search.forEach(_keyword => {
            // Apply perfect match if "search" is a number or is an email
            const searchIsText = isNaN(Number(_keyword)) && !String(_keyword).includes('@');
            if (searchIsText) {
                this.fuseOptions = new FuseOptions({ ...options, getFn }, _keys);
                this.fuse = new Fuse(items, this.fuseOptions);
            }
            else {
                this.fuseOptions = new FuseOptions({ ...options, ...this.perfectMatch, getFn }, _keys);
                this.fuse = new Fuse(items, this.fuseOptions);
            }
            const fuseResult = this.fuse.search(String(_keyword));
            // Get each fuse result item
            items = fuseResult.map(match => match.item);
        });
        return items;
    }
    #removeAccentsAndDiacritics(search) {
        if (!search) {
            return '';
        }
        return search.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySearchPipe, name: "bizySearch" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySearch'
                }]
        }] });

var BIZY_FORMAT_SECONDS_LANGUAGE;
(function (BIZY_FORMAT_SECONDS_LANGUAGE) {
    BIZY_FORMAT_SECONDS_LANGUAGE["SPANISH"] = "es";
    BIZY_FORMAT_SECONDS_LANGUAGE["ENGLISH"] = "en";
})(BIZY_FORMAT_SECONDS_LANGUAGE || (BIZY_FORMAT_SECONDS_LANGUAGE = {}));
var BIZY_FORMAT_SECONDS_FORMAT;
(function (BIZY_FORMAT_SECONDS_FORMAT) {
    BIZY_FORMAT_SECONDS_FORMAT["DATE_TIME"] = "date-time";
    BIZY_FORMAT_SECONDS_FORMAT["TIME"] = "time";
})(BIZY_FORMAT_SECONDS_FORMAT || (BIZY_FORMAT_SECONDS_FORMAT = {}));

class BizyFormatSecondsService {
    #options = {
        language: BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH,
        format: BIZY_FORMAT_SECONDS_FORMAT.TIME
    };
    getOptions() {
        return this.#options;
    }
    setOptions(options) {
        if (options && options.language) {
            this.#options.language = options.language;
        }
        if (options && options.format) {
            this.#options.format = options.format;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsService, decorators: [{
            type: Injectable
        }] });

class BizyFormatSecondsPipe {
    bizyFormatSecondsService;
    constructor(bizyFormatSecondsService) {
        this.bizyFormatSecondsService = bizyFormatSecondsService;
    }
    transform(seconds, options) {
        if (!seconds) {
            return '00:00:00';
        }
        const regex = /^-?\d+(\.\d+)?$/;
        const isNumber = regex.test(String(seconds).toLowerCase());
        if (!isNumber || seconds <= 0) {
            return '00:00:00';
        }
        const defaultOptions = this.bizyFormatSecondsService.getOptions();
        const language = options?.language ?? defaultOptions.language;
        const format = options?.format ?? defaultOptions.format;
        const DAY = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Día' : 'Day';
        const DAYS = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Días' : 'Days';
        const MONTH = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Mes' : 'Month';
        const MONTHS = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Meses' : 'Months';
        const YEAR = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Año' : 'Year';
        const YEARS = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Años' : 'Years';
        let _seconds = Number(seconds);
        const SECONDS_IN_YEAR = 365.25 * 24 * 3600;
        const SECONDS_IN_MONTH = 30.44 * 24 * 3600;
        const SECONDS_IN_DAY = 24 * 3600;
        const SECONDS_IN_HOUR = 3600;
        const SECONDS_IN_MINUTE = 60;
        if (format === BIZY_FORMAT_SECONDS_FORMAT.DATE_TIME) {
            const years = Math.floor(_seconds / SECONDS_IN_YEAR);
            _seconds %= SECONDS_IN_YEAR;
            const months = Math.floor(_seconds / SECONDS_IN_MONTH);
            _seconds %= SECONDS_IN_MONTH;
            const days = Math.floor(_seconds / SECONDS_IN_DAY);
            _seconds %= SECONDS_IN_DAY;
            const hours = Math.floor(_seconds / SECONDS_IN_HOUR);
            _seconds %= SECONDS_IN_HOUR;
            const minutes = Math.floor(_seconds / SECONDS_IN_MINUTE);
            _seconds %= SECONDS_IN_MINUTE;
            const parts = [];
            if (years > 0) {
                parts.push(years + (years === 1 ? ` ${YEAR}` : ` ${YEARS}`));
            }
            if (months > 0) {
                parts.push(months + (months === 1 ? ` ${MONTH}` : ` ${MONTHS}`));
            }
            if (days > 0) {
                parts.push(days + (days === 1 ? ` ${DAY}` : ` ${DAYS}`));
            }
            parts.push(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${_seconds < 10 ? '0' + Math.trunc(_seconds) : Math.trunc(_seconds)}`);
            return parts.join(' ');
        }
        else {
            const hours = Math.floor(_seconds / SECONDS_IN_HOUR);
            _seconds %= SECONDS_IN_HOUR;
            const minutes = Math.floor(_seconds / SECONDS_IN_MINUTE);
            _seconds %= SECONDS_IN_MINUTE;
            const parts = [];
            parts.push(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${_seconds < 10 ? '0' + Math.trunc(_seconds) : Math.trunc(_seconds)}`);
            return parts.join(' ');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsPipe, deps: [{ token: BizyFormatSecondsService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsPipe, name: "bizyFormatSeconds" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyFormatSeconds'
                }]
        }], ctorParameters: function () { return [{ type: BizyFormatSecondsService, decorators: [{
                    type: Inject,
                    args: [BizyFormatSecondsService]
                }] }]; } });

class BizyAveragePipe {
    transform(items, key, fixedTo = 2) {
        if (!items || items.length === 0) {
            return 0;
        }
        if (!key) {
            const reduce = items.reduce((acc, value) => acc + value, 0);
            return Number((reduce / items.length).toFixed(fixedTo));
        }
        const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);
        return Number((reduce / items.length).toFixed(fixedTo));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAveragePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyAveragePipe, name: "bizyAverage" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAveragePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyAverage'
                }]
        }] });

const PIPES = [
    BizyOrderByPipe,
    BizyReducePipe,
    BizySafePipe,
    BizySearchPipe,
    BizySelectedPipe,
    BizySetToArrayPipe,
    BizyFormatSecondsPipe,
    BizyAveragePipe,
    BizyRepeatPipe,
    BizyEnumToArrayPipe
];
class BizyPipesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, declarations: [BizyOrderByPipe,
            BizyReducePipe,
            BizySafePipe,
            BizySearchPipe,
            BizySelectedPipe,
            BizySetToArrayPipe,
            BizyFormatSecondsPipe,
            BizyAveragePipe,
            BizyRepeatPipe,
            BizyEnumToArrayPipe], exports: [BizyOrderByPipe,
            BizyReducePipe,
            BizySafePipe,
            BizySearchPipe,
            BizySelectedPipe,
            BizySetToArrayPipe,
            BizyFormatSecondsPipe,
            BizyAveragePipe,
            BizyRepeatPipe,
            BizyEnumToArrayPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, providers: PIPES.concat([BizyFormatSecondsService]) });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: PIPES,
                    exports: PIPES,
                    providers: PIPES.concat([BizyFormatSecondsService])
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BIZY_FORMAT_SECONDS_FORMAT, BIZY_FORMAT_SECONDS_LANGUAGE, BizyAveragePipe, BizyEnumToArrayPipe, BizyFormatSecondsPipe, BizyFormatSecondsService, BizyOrderByPipe, BizyPipesModule, BizyReducePipe, BizyRepeatPipe, BizySafePipe, BizySearchPipe, BizySelectedPipe, BizySetToArrayPipe, FuseOptions };
//# sourceMappingURL=bizy-pipes.mjs.map
