import * as i0 from '@angular/core';
import { Pipe, Inject, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import Fuse from 'fuse.js';

class OrderByPipe {
    transform(items, order = null, property = '', turnOff = false) {
        if (turnOff) {
            return items;
        }
        // No items
        if (!items || !order) {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OrderByPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: OrderByPipe, name: "bizyOrderBy" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OrderByPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyOrderBy'
                }]
        }] });

class ReducePipe {
    transform(items, key) {
        if (!items) {
            return 0;
        }
        const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);
        return reduce.toFixed(2);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ReducePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ReducePipe, name: "bizyReduce" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ReducePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyReduce'
                }]
        }] });

class SafePipe {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SafePipe, deps: [{ token: DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: SafePipe, name: "bizySafe" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SafePipe, decorators: [{
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

class SearchPipe {
    fuseOptions;
    fuse;
    elements;
    searchIsText;
    perfectMatch = {
        ignoreLocation: true,
        threshold: 0.0
    };
    transform(elements, search, keys, options) {
        if (!search || search.length === 0) {
            return elements;
        }
        if (typeof search === 'string' || search instanceof String) {
            // @ts-ignore
            search = [search];
        }
        let output = elements;
        // Remove empty elements
        search = search.filter(n => n);
        search.forEach(_keyword => {
            // Apply perfect match if "search" is a number or is an email
            this.searchIsText = isNaN(Number(_keyword)) && !_keyword.includes('@');
            if (!this.searchIsText) {
                this.fuseOptions = new FuseOptions({ ...options, ...this.perfectMatch }, keys);
                this.fuse = new Fuse(output, this.fuseOptions);
            }
            else {
                this.fuseOptions = new FuseOptions(options, keys);
                this.fuse = new Fuse(output, this.fuseOptions);
            }
            const fuseResult = this.fuse.search(_keyword);
            // Get each fuse result item
            output = fuseResult.map(match => match.item);
        });
        return output;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: SearchPipe, name: "bizySearch" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySearch'
                }]
        }] });

const PIPES = [
    OrderByPipe,
    ReducePipe,
    SafePipe,
    SearchPipe
];
class PipesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: PipesModule, declarations: [OrderByPipe,
            ReducePipe,
            SafePipe,
            SearchPipe], exports: [OrderByPipe,
            ReducePipe,
            SafePipe,
            SearchPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PipesModule, providers: [SearchPipe, OrderByPipe] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: PIPES,
                    exports: PIPES,
                    providers: [SearchPipe, OrderByPipe]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FuseOptions, OrderByPipe, PipesModule, ReducePipe, SafePipe, SearchPipe };
//# sourceMappingURL=bizy-pipes.mjs.map
