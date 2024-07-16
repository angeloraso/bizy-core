import * as i0 from '@angular/core';
import { Pipe, Inject, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import Fuse from 'fuse.js';

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
    transform(items, order = null, property = '', turnOff = false) {
        if (turnOff) {
            return items;
        }
        // No items
        if (!items) {
            return [];
        }
        if (!order) {
            return items;
        }
        // Array with only one item
        if (items.length <= 1) {
            return items;
        }
        let output = [...items];
        if (property === '') {
            if (order === 'asc') {
                output.sort();
                return output;
            }
            output.sort().reverse();
            return output;
        }
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
            const nestedProperty = property.split('.');
            nestedProperty.forEach(_property => {
                if (_property) {
                    value = value[_property];
                }
            });
            return value;
        };
        const index = output.findIndex(_item => {
            const value = getValue(_item);
            return typeof value !== 'undefined' && value !== null;
        });
        if (index === -1) {
            return output;
        }
        const value = getValue(output[index]);
        if (!isNaN(value)) {
            if (order === 'asc') {
                output = output.sort((a, b) => Number(getValue(a)) - Number(getValue(b)));
            }
            else {
                output = output.sort((a, b) => Number(getValue(b)) - Number(getValue(a)));
            }
            return output;
        }
        else if (isDate(value)) {
            output = output.sort((a, b) => {
                const aDate = parseDateString(getValue(a));
                const bDate = parseDateString(getValue(b));
                return order === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
            });
            return output;
        }
        else {
            output.sort((a, b) => {
                let aValue = a;
                let bValue = b;
                const nestedProperty = property.split('.');
                nestedProperty.forEach(_property => {
                    aValue = aValue[_property];
                    bValue = bValue[_property];
                });
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
                    return (aValue.toString().toLowerCase() > bValue.toString().toLowerCase() ? -1 : 1);
                }
                return (bValue.toString().toLowerCase() > aValue.toString().toLowerCase() ? -1 : 1);
            });
            return output;
        }
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
    transform(items, key) {
        if (!items) {
            return 0;
        }
        const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);
        return reduce.toFixed(2);
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
            // Se reduce a 0.3 el threshold (default: 0.6) para aumentar precisión en resultados
            threshold: 0.3
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
        if (!Array.isArray(keys)) {
            keys = [keys];
        }
        if (!Array.isArray(search)) {
            search = [String(search)];
        }
        let output = items;
        // Remove empty items
        search = search.filter(n => n);
        search.forEach(_keyword => {
            // Apply perfect match if "search" is a number or is an email
            const searchIsText = isNaN(Number(_keyword)) && !String(_keyword).includes('@');
            if (!searchIsText) {
                this.fuseOptions = new FuseOptions({ ...options, ...this.perfectMatch }, keys);
                this.fuse = new Fuse(output, this.fuseOptions);
            }
            else {
                this.fuseOptions = new FuseOptions(options, keys);
                this.fuse = new Fuse(output, this.fuseOptions);
            }
            const fuseResult = this.fuse.search(String(_keyword));
            // Get each fuse result item
            output = fuseResult.map(match => match.item);
        });
        return output;
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

class BizyFormatSecondsPipe {
    transform(seconds, language = 'es') {
        if (!seconds) {
            return '00:00:00';
        }
        const DAY = language === 'es' ? 'Día' : 'Day';
        const DAYS = language === 'es' ? 'Días' : 'Days';
        const MONTH = language === 'es' ? 'Mes' : 'Meses';
        const MONTHS = language === 'es' ? 'Meses' : 'Months';
        const YEAR = language === 'es' ? 'Año' : 'Year';
        const YEARS = language === 'es' ? 'Años' : 'Years';
        let _seconds = Number(seconds);
        const SECONDS_IN_YEAR = 365.25 * 24 * 3600;
        const SECONDS_IN_MONTH = 30.44 * 24 * 3600;
        const SECONDS_IN_DAY = 24 * 3600;
        const SECONDS_IN_HOUR = 3600;
        const SECONDS_IN_MINUTE = 60;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsPipe, name: "bizyFormatSeconds" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyFormatSeconds'
                }]
        }] });

const PIPES = [
    BizyOrderByPipe,
    BizyReducePipe,
    BizySafePipe,
    BizySearchPipe,
    BizySelectedPipe,
    BizySetToArrayPipe,
    BizyFormatSecondsPipe
];
class BizyPipesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, declarations: [BizyOrderByPipe,
            BizyReducePipe,
            BizySafePipe,
            BizySearchPipe,
            BizySelectedPipe,
            BizySetToArrayPipe,
            BizyFormatSecondsPipe], exports: [BizyOrderByPipe,
            BizyReducePipe,
            BizySafePipe,
            BizySearchPipe,
            BizySelectedPipe,
            BizySetToArrayPipe,
            BizyFormatSecondsPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, providers: PIPES });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: PIPES,
                    exports: PIPES,
                    providers: PIPES
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BizyFormatSecondsPipe, BizyOrderByPipe, BizyPipesModule, BizyReducePipe, BizySafePipe, BizySearchPipe, BizySelectedPipe, BizySetToArrayPipe, FuseOptions };
//# sourceMappingURL=bizy-pipes.mjs.map
