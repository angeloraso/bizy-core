import * as i0 from '@angular/core';
import { ElementRef, Directive, Inject, Input, Renderer2, HostListener, Host, EventEmitter, Output, NgModule } from '@angular/core';
import AutoNumeric from 'autonumeric';
import * as i1 from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { fromEvent, merge, timer, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

class BizyCurrencyFormatDirective {
    elementRef;
    bizyCurrencyFormat = false;
    options = {};
    #autoNumericInstance;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (typeof this.bizyCurrencyFormat === 'undefined' || this.bizyCurrencyFormat === null || this.bizyCurrencyFormat === false) {
            return;
        }
        this.#autoNumericInstance = new AutoNumeric(this.elementRef.nativeElement, this.options);
        this.elementRef.nativeElement.getValue = this.getValue;
        this.elementRef.nativeElement.setValue = this.setValue;
    }
    ngOnDestroy() {
        if (this.#autoNumericInstance) {
            this.#autoNumericInstance.remove();
        }
    }
    getValue = () => {
        return this.#autoNumericInstance.getNumber();
    };
    setValue = (value) => {
        this.#autoNumericInstance.set(value);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCurrencyFormatDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyCurrencyFormatDirective, selector: "[bizyCurrencyFormat]", inputs: { bizyCurrencyFormat: "bizyCurrencyFormat", options: ["bizyCurrencyOptions", "options"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCurrencyFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyCurrencyFormat]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { bizyCurrencyFormat: [{
                type: Input,
                args: ['bizyCurrencyFormat']
            }], options: [{
                type: Input,
                args: ['bizyCurrencyOptions']
            }] } });

class BizyTooltipDirective {
    elRef;
    renderer;
    document;
    tooltipTitle = '';
    customClass = '';
    clickeable = false;
    placement = 'top';
    delay; // Milliseconds, Ej; 500, 1000, etc
    tooltip;
    hiding;
    constructor(elRef, renderer, document) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.document = document;
    }
    onMouseEnter() {
        if (!this.tooltip) {
            if (!this.tooltipTitle) {
                return;
            }
            this.hiding = false;
            this.show();
        }
    }
    onMouseLeave() {
        if (this.tooltip && !this.hiding) {
            if (!this.tooltipTitle) {
                return;
            }
            this.hiding = true;
            this.hide();
        }
        // Fix fixed tooltips
        this.document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
            this.renderer.removeChild(this.document.body, element);
        });
    }
    onClick() {
        if (this.tooltip && !this.hiding) {
            this.hiding = true;
            this.hide();
            return;
        }
        if (!this.tooltip && this.tooltipTitle && this.clickeable) {
            this.hiding = false;
            this.show();
        }
    }
    show() {
        this.create();
        this.setPosition();
        this.renderer.addClass(this.tooltip, 'bizy-tooltip-identify');
        this.renderer.addClass(this.tooltip, 'bizy-tooltip--show');
        if (this.customClass) {
            this.renderer.addClass(this.tooltip, this.customClass);
        }
    }
    hide() {
        this.renderer.removeClass(this.tooltip, 'bizy-tooltip--show');
        window.setTimeout(() => {
            this.renderer.removeChild(this.document.body, this.tooltip);
            this.tooltip = null;
        }, Number(this.delay));
    }
    create() {
        this.tooltip = this.renderer.createElement('span');
        const sentences = String(this.tooltipTitle).split('</br>');
        sentences.forEach(_sentence => {
            this.renderer.appendChild(this.tooltip, this.renderer.createText(_sentence));
            this.renderer.appendChild(this.tooltip, this.renderer.createElement('br'));
        });
        this.renderer.appendChild(this.document.body, this.tooltip);
        this.renderer.addClass(this.tooltip, 'bizy-tooltip');
        this.renderer.addClass(this.tooltip, 'bizy-tooltip-' + this.placement);
        if (this.delay) {
            this.renderer.setStyle(this.tooltip, '-webkit-transition', 'opacity ' + this.delay + 'ms');
            this.renderer.setStyle(this.tooltip, '-moz-transition', 'opacity ' + this.delay + 'ms');
            this.renderer.setStyle(this.tooltip, '-o-transition', 'opacity ' + this.delay + 'ms');
            this.renderer.setStyle(this.tooltip, 'transition', 'opacity ' + this.delay + 'ms');
        }
    }
    setPosition() {
        const elRefPosition = this.elRef.nativeElement.getBoundingClientRect();
        const tooltipPos = this.tooltip?.getBoundingClientRect();
        const scrollPos = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        let top;
        let left;
        if (this.placement === 'top') {
            // @ts-ignore
            top = elRefPosition.top - tooltipPos.height - 10;
            // @ts-ignore
            left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
        }
        else if (this.placement === 'right') {
            // @ts-ignore
            top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
            left = elRefPosition.right + 10;
        }
        else if (this.placement === 'bottom') {
            top = elRefPosition.bottom + 10;
            // @ts-ignore
            left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
        }
        else if (this.placement === 'left') {
            // @ts-ignore
            top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
            // @ts-ignore
            left = elRefPosition.left - tooltipPos.width - 10;
        }
        this.renderer.setStyle(this.tooltip, 'top', (top + scrollPos) + 'px');
        this.renderer.setStyle(this.tooltip, 'left', left + 'px');
    }
    ngOnDestroy() {
        this.document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
            this.renderer.removeChild(this.document.body, element);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTooltipDirective, deps: [{ token: ElementRef }, { token: Renderer2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyTooltipDirective, selector: "[bizyTooltip]", inputs: { tooltipTitle: ["bizyTooltip", "tooltipTitle"], customClass: "customClass", clickeable: "clickeable", placement: "placement", delay: "delay" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "click": "onClick()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyTooltip]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { tooltipTitle: [{
                type: Input,
                args: ['bizyTooltip']
            }], customClass: [{
                type: Input
            }], clickeable: [{
                type: Input
            }], placement: [{
                type: Input
            }], delay: [{
                type: Input
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class BizyOnlyNumbersDirective {
    elementRef;
    onlyNumbers;
    #regex = new RegExp(/^-?\d*[.,]?\d*$/);
    #specialKeys = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    onInput(event) {
        if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
            return;
        }
        const inputElement = this.elementRef.nativeElement;
        const value = inputElement.value;
        // Format and validate input value
        const formattedValue = this.#formatValue(value);
        if (formattedValue !== value) {
            inputElement.value = formattedValue;
            event.stopImmediatePropagation();
        }
    }
    onKeyDown(event) {
        if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
            return;
        }
        // Allow special keys
        if (this.#specialKeys.indexOf(event.key) !== -1 ||
            // Allow: Ctrl+A
            (event.key === 'a' && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+C
            (event.key === 'c' && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+V
            (event.key === 'v' && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+X
            (event.key === 'x' && (event.ctrlKey || event.metaKey)) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // Let it happen, don't do anything
            return;
        }
        // Allow numbers and decimals
        let current = this.elementRef.nativeElement.value;
        let next = current.concat(event.key);
        if (next && !String(next).match(this.#regex)) {
            event.preventDefault();
        }
    }
    #formatValue(value) {
        // Remove all non-numeric characters except . , and -
        let newValue = value.replace(/[^0-9.,-]/g, '');
        // Ensure that '-' is only at the beginning and only once
        if (newValue.indexOf('-') !== newValue.lastIndexOf('-') || (newValue.indexOf('-') !== 0)) {
            newValue = newValue.replace(/-+/g, ''); // Remove all '-' characters
        }
        // Ensure only one '-' at the beginning
        if (newValue.startsWith('-') && newValue.indexOf('-') > 0) {
            newValue = '-' + newValue.replace(/^-+/, ''); // Remove additional '-' characters
        }
        // Ensure only one decimal separator
        const parts = newValue.split(/[,\.]/);
        if (parts.length > 2) {
            newValue = `${parts[0]}.${parts.slice(1).join('')}`;
        }
        return newValue;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOnlyNumbersDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyOnlyNumbersDirective, selector: "[bizyOnlyNumbers]", inputs: { onlyNumbers: ["bizyOnlyNumbers", "onlyNumbers"] }, host: { listeners: { "input": "onInput($event)", "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOnlyNumbersDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyOnlyNumbers]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { onlyNumbers: [{
                type: Input,
                args: ['bizyOnlyNumbers']
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

var LOADING_TYPE;
(function (LOADING_TYPE) {
    LOADING_TYPE["SPINNER"] = "spinner";
    LOADING_TYPE["BAR"] = "bar";
})(LOADING_TYPE || (LOADING_TYPE = {}));
class BizyLoadingDirective {
    elementRef;
    renderer;
    set bizyLoading(value) {
        this.#setLoading(value);
    }
    bizyLoadingType = LOADING_TYPE.SPINNER;
    #loadingElement;
    #originalElement;
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    #setLoading(value) {
        if (value) {
            this.#originalElement = this.elementRef.nativeElement;
            const width = this.elementRef.nativeElement.offsetWidth;
            const height = this.elementRef.nativeElement.offsetHeight;
            const loadingWrapper = this.renderer.createElement('span');
            this.renderer.setStyle(loadingWrapper, 'width', width ? `${this.elementRef.nativeElement.offsetWidth}px` : '1rem');
            this.renderer.setStyle(loadingWrapper, 'height', height ? `${this.elementRef.nativeElement.offsetHeight}px` : '1rem');
            this.renderer.setStyle(loadingWrapper, 'display', 'grid');
            this.renderer.setStyle(loadingWrapper, 'placeItems', 'center');
            const backgroundColor = window.getComputedStyle(this.elementRef.nativeElement, null).getPropertyValue('background-color');
            this.renderer.setStyle(loadingWrapper, 'backgroundColor', backgroundColor);
            this.renderer.setStyle(loadingWrapper, 'pointer-events', 'none');
            const loading = this.renderer.createElement('span');
            this.renderer.addClass(loading, `bizy-loading--${this.bizyLoadingType}`);
            if (this.bizyLoadingType === LOADING_TYPE.SPINNER) {
                let minSize = 0;
                if (this.elementRef.nativeElement.offsetWidth > 0 && this.elementRef.nativeElement.offsetHeight > 0) {
                    minSize = Math.min(this.elementRef.nativeElement.offsetWidth, this.elementRef.nativeElement.offsetHeight);
                }
                this.renderer.setStyle(loading, 'width', minSize ? `min(15rem, ${minSize}px)` : '1rem');
                this.renderer.setStyle(loading, 'height', minSize ? `min(15rem, ${minSize}px)` : '1rem');
            }
            this.renderer.appendChild(loadingWrapper, loading);
            this.#loadingElement = loadingWrapper;
            this.renderer.insertBefore(this.#originalElement.parentNode, this.#loadingElement, this.#originalElement);
            this.renderer.removeChild(this.#originalElement.parentNode, this.#originalElement);
        }
        else if (this.#loadingElement && this.#originalElement && value === false) {
            this.renderer.insertBefore(this.#loadingElement.parentNode, this.#originalElement, this.#loadingElement);
            this.renderer.removeChild(this.#loadingElement.parentNode, this.#loadingElement);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLoadingDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyLoadingDirective, selector: "[bizyLoading]", inputs: { bizyLoading: "bizyLoading", bizyLoadingType: "bizyLoadingType" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyLoading]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { bizyLoading: [{
                type: Input
            }], bizyLoadingType: [{
                type: Input
            }] } });

class BizyOnlyPhoneDigitsDirective {
    onlyPhoneNumbers;
    regexStr = '^[0-9*#+]*$';
    onKeyDown(event) {
        if (typeof this.onlyPhoneNumbers === 'undefined' || this.onlyPhoneNumbers === null || this.onlyPhoneNumbers === false) {
            return;
        }
        let e = event;
        const ignore = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];
        if (ignore.indexOf(e.key) !== -1 ||
            (e.ctrlKey || e.metaKey) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // Let it happen, don't do anything
            return;
        }
        let regEx = new RegExp(this.regexStr);
        if (!regEx.test(e.key)) {
            e.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOnlyPhoneDigitsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyOnlyPhoneDigitsDirective, selector: "[bizyOnlyPhoneDigits]", inputs: { onlyPhoneNumbers: ["bizyOnlyPhoneDigits", "onlyPhoneNumbers"] }, host: { listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOnlyPhoneDigitsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyOnlyPhoneDigits]'
                }]
        }], propDecorators: { onlyPhoneNumbers: [{
                type: Input,
                args: ['bizyOnlyPhoneDigits']
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

class BizyNgForTrackByIdDirective {
    ngFor;
    constructor(ngFor) {
        this.ngFor = ngFor;
        this.ngFor.ngForTrackBy = (_index, item) => item.id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyNgForTrackByIdDirective, deps: [{ token: i1.NgForOf, host: true }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyNgForTrackByIdDirective, selector: "[ngForBizyTrackById]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyNgForTrackByIdDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngForBizyTrackById]'
                }]
        }], ctorParameters: function () { return [{ type: i1.NgForOf, decorators: [{
                    type: Host
                }] }]; } });

class BizyLongPressDirective {
    elementRef;
    threshold = 500;
    press = new EventEmitter();
    #event;
    constructor(elementRef) {
        this.elementRef = elementRef;
        const mousedown = fromEvent(this.elementRef.nativeElement, 'mousedown').pipe(filter((event) => event.button == 0), // Only allow left button (Primary button)
        map(() => true) // turn on threshold counter
        );
        const touchstart = fromEvent(this.elementRef.nativeElement, 'touchstart').pipe(map(() => true));
        const touchEnd = fromEvent(this.elementRef.nativeElement, 'touchend').pipe(map(() => false));
        const mouseup = fromEvent(window, 'mouseup').pipe(filter((event) => event.button == 0), // Only allow left button (Primary button)
        map(() => false) // reset threshold counter
        );
        this.#event = merge(mousedown, mouseup, touchstart, touchEnd)
            .pipe(switchMap(state => (state ? timer(this.threshold, 100) : of(null))), filter(value => Boolean(value)))
            .subscribe(() => this.press.emit());
    }
    ngOnDestroy() {
        if (this.#event) {
            this.#event.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLongPressDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyLongPressDirective, selector: "[bizyLongPress]", inputs: { threshold: "threshold" }, outputs: { press: "press" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLongPressDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyLongPress]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { threshold: [{
                type: Input
            }], press: [{
                type: Output
            }] } });

const DIRECTIVES = [
    BizyLoadingDirective,
    BizyLongPressDirective,
    BizyOnlyNumbersDirective,
    BizyOnlyPhoneDigitsDirective,
    BizyNgForTrackByIdDirective,
    BizyTooltipDirective,
    BizyCurrencyFormatDirective
];
class BizyDirectivesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, declarations: [BizyLoadingDirective,
            BizyLongPressDirective,
            BizyOnlyNumbersDirective,
            BizyOnlyPhoneDigitsDirective,
            BizyNgForTrackByIdDirective,
            BizyTooltipDirective,
            BizyCurrencyFormatDirective], exports: [BizyLoadingDirective,
            BizyLongPressDirective,
            BizyOnlyNumbersDirective,
            BizyOnlyPhoneDigitsDirective,
            BizyNgForTrackByIdDirective,
            BizyTooltipDirective,
            BizyCurrencyFormatDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: DIRECTIVES,
                    exports: DIRECTIVES,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BizyCurrencyFormatDirective, BizyDirectivesModule, BizyLoadingDirective, BizyLongPressDirective, BizyNgForTrackByIdDirective, BizyOnlyNumbersDirective, BizyOnlyPhoneDigitsDirective, BizyTooltipDirective, LOADING_TYPE };
//# sourceMappingURL=bizy-directives.mjs.map
