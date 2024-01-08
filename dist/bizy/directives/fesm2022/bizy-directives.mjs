import * as i0 from '@angular/core';
import { Directive, Input, HostListener, ElementRef, Renderer2, Inject, Host, EventEmitter, Output, NgModule } from '@angular/core';
import { interval, Subject, takeUntil, take, fromEvent, merge, timer, of } from 'rxjs';
import * as i1 from '@angular/common';
import { filter, map, switchMap } from 'rxjs/operators';

class OnlyNumbersDirective {
    onlyNumbers;
    regexStr = '^[0-9]*$';
    onKeyDown(event) {
        if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
            return;
        }
        let e = event;
        const ignore = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];
        if (ignore.indexOf(e.key) !== -1 ||
            // Allow: Ctrl+A
            (e.key === 'a' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+C
            (e.key === 'c' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+V
            (e.key === 'v' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+X
            (e.key === 'x' && (e.ctrlKey || e.metaKey)) ||
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: OnlyNumbersDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.11", type: OnlyNumbersDirective, selector: "[bizyOnlyNumbers]", inputs: { onlyNumbers: ["bizyOnlyNumbers", "onlyNumbers"] }, host: { listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: OnlyNumbersDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyOnlyNumbers]'
                }]
        }], propDecorators: { onlyNumbers: [{
                type: Input,
                args: ['bizyOnlyNumbers']
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

class LoadingDirective {
    elementRef;
    renderer;
    set bizyLoading(value) {
        this.#currentValue = value;
        this.setLoading();
    }
    type = 'spinner';
    #loadingElement;
    #originalElement;
    #currentValue;
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    setLoading() {
        const interval$ = interval(500);
        const viewInit$ = new Subject();
        interval$.pipe(takeUntil(viewInit$), take(6)).subscribe(() => {
            if ((this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth === 0 || this.elementRef.nativeElement.offsetHeight === 0) && !this.#originalElement)) {
                return;
            }
            viewInit$.next();
            viewInit$.complete();
            if (this.#currentValue) {
                this.#originalElement = this.elementRef.nativeElement;
                const loadingWrapper = this.renderer.createElement('span');
                this.renderer.setStyle(loadingWrapper, 'width', `${this.elementRef.nativeElement.offsetWidth}px`);
                this.renderer.setStyle(loadingWrapper, 'height', `${this.elementRef.nativeElement.offsetHeight}px`);
                this.renderer.setStyle(loadingWrapper, 'display', 'grid');
                this.renderer.setStyle(loadingWrapper, 'placeItems', 'center');
                const backgroundColor = window.getComputedStyle(this.elementRef.nativeElement, null).getPropertyValue('background-color');
                this.renderer.setStyle(loadingWrapper, 'backgroundColor', backgroundColor);
                this.renderer.setStyle(loadingWrapper, 'pointer-events', 'none');
                const loading = this.renderer.createElement('span');
                this.renderer.addClass(loading, `bizy-loading--${this.type}`);
                const minSize = Math.min(this.elementRef.nativeElement.offsetWidth, this.elementRef.nativeElement.offsetHeight);
                this.renderer.setStyle(loading, 'width', `${minSize * 0.8}px`);
                this.renderer.setStyle(loading, 'height', `${minSize * 0.8}px`);
                this.renderer.setStyle(loading, 'maxWidth', '20vmax');
                this.renderer.setStyle(loading, 'maxHeight', '20vmax');
                this.renderer.appendChild(loadingWrapper, loading);
                this.#loadingElement = loadingWrapper;
                this.renderer.insertBefore(this.#originalElement.parentNode, this.#loadingElement, this.#originalElement);
                this.renderer.removeChild(this.#originalElement.parentNode, this.#originalElement);
            }
            else if (this.#loadingElement && this.#originalElement && this.#currentValue === false) {
                this.renderer.insertBefore(this.#loadingElement.parentNode, this.#originalElement, this.#loadingElement);
                this.renderer.removeChild(this.#loadingElement.parentNode, this.#loadingElement);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LoadingDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.11", type: LoadingDirective, selector: "[bizyLoading]", inputs: { bizyLoading: "bizyLoading", type: "type" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyLoading]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { bizyLoading: [{
                type: Input
            }], type: [{
                type: Input
            }] } });

class OnlyPhoneDigitsDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: OnlyPhoneDigitsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.11", type: OnlyPhoneDigitsDirective, selector: "[bizyOnlyPhoneDigits]", inputs: { onlyPhoneNumbers: ["bizyOnlyPhoneDigits", "onlyPhoneNumbers"] }, host: { listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: OnlyPhoneDigitsDirective, decorators: [{
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

class NgForTrackByIdDirective {
    ngFor;
    constructor(ngFor) {
        this.ngFor = ngFor;
        this.ngFor.ngForTrackBy = (_index, item) => item.id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: NgForTrackByIdDirective, deps: [{ token: i1.NgForOf, host: true }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.11", type: NgForTrackByIdDirective, selector: "[ngForBizyTrackById]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: NgForTrackByIdDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngForBizyTrackById]'
                }]
        }], ctorParameters: function () { return [{ type: i1.NgForOf, decorators: [{
                    type: Host
                }] }]; } });

class LongPressDirective {
    elementRef;
    threshold = 500;
    press = new EventEmitter();
    #event;
    constructor(elementRef) {
        this.elementRef = elementRef;
        const mousedown = fromEvent(elementRef.nativeElement, 'mousedown').pipe(filter((event) => event.button == 0), // Only allow left button (Primary button)
        map(() => true) // turn on threshold counter
        );
        const touchstart = fromEvent(elementRef.nativeElement, 'touchstart').pipe(map(() => true));
        const touchEnd = fromEvent(elementRef.nativeElement, 'touchend').pipe(map(() => false));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LongPressDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.11", type: LongPressDirective, selector: "[bizyLongPress]", inputs: { threshold: "threshold" }, outputs: { press: "press" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LongPressDirective, decorators: [{
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
    LoadingDirective,
    LongPressDirective,
    OnlyNumbersDirective,
    OnlyPhoneDigitsDirective,
    NgForTrackByIdDirective,
];
class DirectivesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: DirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.11", ngImport: i0, type: DirectivesModule, declarations: [LoadingDirective,
            LongPressDirective,
            OnlyNumbersDirective,
            OnlyPhoneDigitsDirective,
            NgForTrackByIdDirective], exports: [LoadingDirective,
            LongPressDirective,
            OnlyNumbersDirective,
            OnlyPhoneDigitsDirective,
            NgForTrackByIdDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: DirectivesModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: DirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: DIRECTIVES,
                    exports: DIRECTIVES,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DirectivesModule, LoadingDirective, LongPressDirective, NgForTrackByIdDirective, OnlyNumbersDirective, OnlyPhoneDigitsDirective };
//# sourceMappingURL=bizy-directives.mjs.map
