import { takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, ViewChild, ContentChildren } from '@angular/core';
import { Subject, Subscription, debounceTime, interval } from 'rxjs';
import { BizyInputOptionComponent } from './input-option/input-option.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/cdk/overlay";
export class BizyInputComponent {
    ref;
    options;
    bizyInputWrapper;
    bizyInput;
    id = `bizy-input-${Math.random()}`;
    name = `bizy-input-${Math.random()}`;
    type = 'text';
    customClass = '';
    placeholder = '';
    debounceTime = 250;
    rows = 4;
    disabled = false;
    readonly = false;
    valueChange = new EventEmitter();
    onChange = new EventEmitter();
    onEnter = new EventEmitter();
    onBackspace = new EventEmitter();
    onSelect = new EventEmitter();
    onBlur = new EventEmitter();
    onFocus = new EventEmitter();
    set autofocus(autofocus) {
        if (typeof autofocus === 'undefined' || autofocus === null) {
            return;
        }
        this.setFocus(autofocus);
    }
    set value(value) {
        if (typeof value === 'undefined') {
            return;
        }
        if (this.type === 'currency') {
            this._currencyValue = Number(value);
            if (this.bizyInput) {
                const _value = this.bizyInput.nativeElement.getValue();
                if (_value !== this._currencyValue) {
                    this.bizyInput.nativeElement.setValue(this._currencyValue);
                }
            }
            return;
        }
        this._value = value;
    }
    focused = false;
    touched = false;
    opened = false;
    _value = null;
    _currencyValue = null;
    currencyOptions = 'commaDecimalCharDotSeparator';
    #subscription = new Subscription();
    #optionSubscription = new Subscription();
    onChange$ = new Subject();
    constructor(ref) {
        this.ref = ref;
    }
    getWidth() {
        return this.bizyInputWrapper && this.bizyInputWrapper.nativeElement && this.bizyInputWrapper.nativeElement.offsetWidth ? this.bizyInputWrapper.nativeElement.offsetWidth : 0;
    }
    _onchange(value) {
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.type === 'currency' && this.bizyInput.nativeElement.getValue) {
            this._currencyValue = this.bizyInput.nativeElement.getValue();
            this.onChange$.next(this._currencyValue);
            return;
        }
        this.onChange$.next(value);
    }
    _onClick(event) {
        this.onSelect.emit(event);
        this.onOpen();
    }
    _onEnter(event) {
        if (this.disabled || this.readonly || !this.focused) {
            return;
        }
        this.onEnter.emit(event);
    }
    _onBlur(event) {
        if (this.type === 'currency') {
            this.bizyInput.nativeElement.setValue(this._currencyValue);
        }
        setTimeout(() => {
            this.focused = false;
            this.touched = true;
            this.ref.detectChanges();
            this.onBlur.emit(event);
        }, 250);
    }
    _onBackspace(event) {
        setTimeout(() => {
            this.onBackspace.emit(event);
        }, 250);
    }
    _onFocus(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.focused = true;
        this.ref.detectChanges();
        this.onFocus.emit(event);
    }
    setTouched(touched) {
        this.touched = touched;
        this.ref.detectChanges();
    }
    ngAfterViewInit() {
        if (this.type === 'currency') {
            this.bizyInput.nativeElement.setValue(this._currencyValue);
        }
        this.#subscription.add(this.onChange$.pipe(debounceTime(this.debounceTime)).subscribe(value => {
            this.valueChange.emit(value);
            this.onChange.emit(value);
        }));
    }
    onOpen() {
        if (this.disabled) {
            return;
        }
        this.opened = !this.opened;
        this.ref.detectChanges();
        if (!this.options) {
            return;
        }
        this.#optionSubscription.unsubscribe();
        this.#optionSubscription = new Subscription();
        this.options.forEach(_option => {
            this.#optionSubscription.add(_option.onSelect.subscribe(() => {
                this.close();
                this.ref.detectChanges();
                this.#optionSubscription.unsubscribe();
            }));
        });
    }
    setFocus(focus) {
        const interval$ = interval(300);
        const finish$ = new Subject();
        this.#subscription.add(interval$.pipe(takeUntil(finish$)).subscribe(() => {
            if (this.bizyInput && this.bizyInput.nativeElement) {
                if (focus) {
                    this.bizyInput.nativeElement.focus();
                    this.focused = true;
                }
                else {
                    this.bizyInput.nativeElement.blur();
                    this.focused = false;
                }
                finish$.next();
                finish$.complete();
                this.ref.detectChanges();
            }
        }));
    }
    close = (event, button) => {
        if (button && event && event.target && event.target === button) {
            return;
        }
        this.opened = false;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyInputComponent, selector: "bizy-input", inputs: { id: "id", name: "name", type: "type", customClass: "customClass", placeholder: "placeholder", debounceTime: "debounceTime", rows: "rows", disabled: "disabled", readonly: "readonly", autofocus: "autofocus", value: "value" }, outputs: { valueChange: "valueChange", onChange: "onChange", onEnter: "onEnter", onBackspace: "onBackspace", onSelect: "onSelect", onBlur: "onBlur", onFocus: "onFocus" }, queries: [{ propertyName: "options", predicate: BizyInputOptionComponent }], viewQueries: [{ propertyName: "bizyInputWrapper", first: true, predicate: ["bizyInputWrapper"], descendants: true }, { propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled, 'bizy-input--negative': type === 'currency' && _currencyValue < 0}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type === 'currency' ? 'tel' : type\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            [bizyCurrencyFormat]=\"type === 'currency'\"\n            [bizyCurrencyOptions]=\"currencyOptions\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n        \n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--negative,.bizy-input--negative .bizy-input__header,.bizy-input--negative .bizy-input__content,.bizy-input--negative .bizy-input__content__input{background-color:var(--bizy-input-negative-background-color)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i3.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled, 'bizy-input--negative': type === 'currency' && _currencyValue < 0}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type === 'currency' ? 'tel' : type\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            [bizyCurrencyFormat]=\"type === 'currency'\"\n            [bizyCurrencyOptions]=\"currencyOptions\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n        \n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--negative,.bizy-input--negative .bizy-input__header,.bizy-input--negative .bizy-input__content,.bizy-input--negative .bizy-input__content__input{background-color:var(--bizy-input-negative-background-color)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizyInputOptionComponent]
            }], bizyInputWrapper: [{
                type: ViewChild,
                args: ['bizyInputWrapper']
            }], bizyInput: [{
                type: ViewChild,
                args: ['bizyInput']
            }], id: [{
                type: Input
            }], name: [{
                type: Input
            }], type: [{
                type: Input
            }], customClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], debounceTime: [{
                type: Input
            }], rows: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], onChange: [{
                type: Output
            }], onEnter: [{
                type: Output
            }], onBackspace: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], autofocus: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2lucHV0L2lucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9pbnB1dC9pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3pMLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7O0FBUWpGLE1BQU0sT0FBTyxrQkFBa0I7SUFnRVE7SUEvRE0sT0FBTyxDQUFzQztJQUN6RCxnQkFBZ0IsQ0FBYTtJQUNwQyxTQUFTLENBQWE7SUFDckMsRUFBRSxHQUFXLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDM0MsSUFBSSxHQUFXLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDN0MsSUFBSSxHQUErRSxNQUFNLENBQUM7SUFDMUYsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLFlBQVksR0FBVyxHQUFHLENBQUM7SUFDM0IsSUFBSSxHQUFXLENBQUMsQ0FBQztJQUNqQixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDekIsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO0lBQ2xELFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztJQUMvQyxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFDM0MsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDO0lBQy9DLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUM1QyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFDMUMsT0FBTyxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDO0lBRXJELElBQWEsU0FBUyxDQUFDLFNBQWtCO1FBQ3ZDLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDMUQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBYSxLQUFLLENBQUMsS0FBNkI7UUFDOUMsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7WUFDaEMsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVwQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLE1BQU0sTUFBTSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5RCxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsY0FBYyxFQUFFO29CQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUM1RDthQUNGO1lBRUQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELE9BQU8sR0FBWSxLQUFLLENBQUM7SUFDekIsT0FBTyxHQUFZLEtBQUssQ0FBQztJQUN6QixNQUFNLEdBQVksS0FBSyxDQUFDO0lBQ3hCLE1BQU0sR0FBMkIsSUFBSSxDQUFDO0lBQ3RDLGNBQWMsR0FBa0IsSUFBSSxDQUFDO0lBRXJDLGVBQWUsR0FBRyw4QkFBOEIsQ0FBQztJQUVqRCxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNuQyxtQkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3pDLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztJQUczQyxZQUNxQyxHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN4RCxDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0ssQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFhO1FBQ3JCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xDLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLElBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFjLENBQUMsUUFBUSxFQUFFO1lBQzVFLElBQUksQ0FBQyxjQUFjLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFjLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBbUI7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFtQjtRQUMxQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFtQjtRQUN6QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDVCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQW1CO1FBQzlCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDVCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQW1CO1FBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFnQjtRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1RixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFjO1FBQ3JCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN2RSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xELElBQUksS0FBSyxFQUFFO29CQUNULElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDckI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2lCQUN0QjtnQkFFRCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2YsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFRCxLQUFLLEdBQUcsQ0FBQyxLQUE2QyxFQUFFLE1BQTBCLEVBQUUsRUFBRTtRQUNwRixJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUM5RCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO3dHQXJNVSxrQkFBa0Isa0JBZ0VuQixpQkFBaUI7NEZBaEVoQixrQkFBa0IsK2RBQ1osd0JBQXdCLDRPQ1ozQyx1MUZBbUZBOzs0RkR4RWEsa0JBQWtCO2tCQU45QixTQUFTOytCQUNFLFlBQVksbUJBR0wsdUJBQXVCLENBQUMsTUFBTTs7MEJBa0U1QyxNQUFNOzJCQUFDLGlCQUFpQjs0Q0EvRGdCLE9BQU87c0JBQWpELGVBQWU7dUJBQUMsd0JBQXdCO2dCQUNWLGdCQUFnQjtzQkFBOUMsU0FBUzt1QkFBQyxrQkFBa0I7Z0JBQ0wsU0FBUztzQkFBaEMsU0FBUzt1QkFBQyxXQUFXO2dCQUNiLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxPQUFPO3NCQUFoQixNQUFNO2dCQUVNLFNBQVM7c0JBQXJCLEtBQUs7Z0JBUU8sS0FBSztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGRlYm91bmNlVGltZSwgaW50ZXJ2YWwgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJpenlJbnB1dE9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQtb3B0aW9uL2lucHV0LW9wdGlvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2lucHV0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pbnB1dC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihCaXp5SW5wdXRPcHRpb25Db21wb25lbnQpIG9wdGlvbnM6IFF1ZXJ5TGlzdDxCaXp5SW5wdXRPcHRpb25Db21wb25lbnQ+O1xuICBAVmlld0NoaWxkKCdiaXp5SW5wdXRXcmFwcGVyJykgYml6eUlucHV0V3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYml6eUlucHV0JykgYml6eUlucHV0OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYGJpenktaW5wdXQtJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9IGBiaXp5LWlucHV0LSR7TWF0aC5yYW5kb20oKX1gO1xuICBASW5wdXQoKSB0eXBlOiAndGV4dCcgfCAnbnVtYmVyJyB8ICdlbWFpbCcgfCAncGFzc3dvcmQnIHwgJ3RlbCcgfCAndGV4dGFyZWEnIHwgJ2N1cnJlbmN5JyA9ICd0ZXh0JztcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGRlYm91bmNlVGltZTogbnVtYmVyID0gMjUwO1xuICBASW5wdXQoKSByb3dzOiBudW1iZXIgPSA0O1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZyB8IG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBvbkVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBvbkJhY2tzcGFjZSA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcbiAgQE91dHB1dCgpIG9uQmx1ciA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuICBAT3V0cHV0KCkgb25Gb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIEBJbnB1dCgpIHNldCBhdXRvZm9jdXMoYXV0b2ZvY3VzOiBib29sZWFuKSB7XG4gICAgaWYgKHR5cGVvZiBhdXRvZm9jdXMgPT09ICd1bmRlZmluZWQnIHx8IGF1dG9mb2N1cyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0Rm9jdXMoYXV0b2ZvY3VzKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2N1cnJlbmN5Jykge1xuICAgICAgdGhpcy5fY3VycmVuY3lWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XG5cbiAgICAgIGlmICh0aGlzLmJpenlJbnB1dCkge1xuICAgICAgICBjb25zdCBfdmFsdWUgPSAoPGFueT50aGlzLmJpenlJbnB1dC5uYXRpdmVFbGVtZW50KS5nZXRWYWx1ZSgpO1xuICAgICAgICBpZiAoX3ZhbHVlICE9PSB0aGlzLl9jdXJyZW5jeVZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5iaXp5SW5wdXQubmF0aXZlRWxlbWVudC5zZXRWYWx1ZSh0aGlzLl9jdXJyZW5jeVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdG91Y2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX3ZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgX2N1cnJlbmN5VmFsdWU6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIGN1cnJlbmN5T3B0aW9ucyA9ICdjb21tYURlY2ltYWxDaGFyRG90U2VwYXJhdG9yJztcblxuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAjb3B0aW9uU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBvbkNoYW5nZSQgPSBuZXcgU3ViamVjdDxzdHJpbmcgfCBudW1iZXI+KCk7XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYml6eUlucHV0V3JhcHBlciAmJiB0aGlzLmJpenlJbnB1dFdyYXBwZXIubmF0aXZlRWxlbWVudCAmJiB0aGlzLmJpenlJbnB1dFdyYXBwZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA/IHRoaXMuYml6eUlucHV0V3JhcHBlci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIDogMDtcbiAgfVxuXG4gIF9vbmNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjdXJyZW5jeScgJiYgKDxhbnk+dGhpcy5iaXp5SW5wdXQubmF0aXZlRWxlbWVudCkuZ2V0VmFsdWUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbmN5VmFsdWUgPSAoPGFueT50aGlzLmJpenlJbnB1dC5uYXRpdmVFbGVtZW50KS5nZXRWYWx1ZSgpXG4gICAgICB0aGlzLm9uQ2hhbmdlJC5uZXh0KHRoaXMuX2N1cnJlbmN5VmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25DaGFuZ2UkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgX29uQ2xpY2soZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudCk7XG4gICAgdGhpcy5vbk9wZW4oKVxuICB9XG5cbiAgX29uRW50ZXIoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkgfHwgIXRoaXMuZm9jdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25FbnRlci5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9vbkJsdXIoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjdXJyZW5jeScpIHtcbiAgICAgIHRoaXMuYml6eUlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0VmFsdWUodGhpcy5fY3VycmVuY3lWYWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMudG91Y2hlZCA9IHRydWU7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcbiAgICB9LCAyNTApXG4gIH1cblxuICBfb25CYWNrc3BhY2UoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5vbkJhY2tzcGFjZS5lbWl0KGV2ZW50KTtcbiAgICB9LCAyNTApXG4gIH1cblxuICBfb25Gb2N1cyhldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHNldFRvdWNoZWQodG91Y2hlZDogYm9vbGVhbikge1xuICAgIHRoaXMudG91Y2hlZCA9IHRvdWNoZWQ7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjdXJyZW5jeScpIHtcbiAgICAgIHRoaXMuYml6eUlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0VmFsdWUodGhpcy5fY3VycmVuY3lWYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5vbkNoYW5nZSQucGlwZShkZWJvdW5jZVRpbWUodGhpcy5kZWJvdW5jZVRpbWUpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSkpXG4gIH1cblxuICBvbk9wZW4oKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9wZW5lZCA9ICF0aGlzLm9wZW5lZDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChfb3B0aW9uID0+IHtcbiAgICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbi5hZGQoX29wdGlvbi5vblNlbGVjdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRGb2N1cyhmb2N1czogYm9vbGVhbikge1xuICAgIGNvbnN0IGludGVydmFsJCA9IGludGVydmFsKDMwMCk7XG4gICAgY29uc3QgZmluaXNoJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZChpbnRlcnZhbCQucGlwZSh0YWtlVW50aWwoZmluaXNoJCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5iaXp5SW5wdXQgJiYgdGhpcy5iaXp5SW5wdXQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICB0aGlzLmJpenlJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmJpenlJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZmluaXNoJC5uZXh0KCk7XG4gICAgICAgIGZpbmlzaCQuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0pKVxuICB9XG5cbiAgY2xvc2UgPSAoZXZlbnQ/OiBQb2ludGVyRXZlbnQgJiB7dGFyZ2V0OiB7aWQ6IHN0cmluZ319LCBidXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudCkgPT4ge1xuICAgIGlmIChidXR0b24gJiYgZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldCA9PT0gYnV0dG9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLiNvcHRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufSIsIjxidXR0b25cbiAgICAjYml6eUlucHV0V3JhcHBlclxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIChjbGljayk9XCJfb25DbGljaygkZXZlbnQpXCJcbiAgICAoa2V5dXApPVwiX29uQ2xpY2soJGV2ZW50KVwiXG4gICAgY2xhc3M9XCJiaXp5LWlucHV0IHt7Y3VzdG9tQ2xhc3N9fVwiXG4gICAgKGZvY3VzKT1cImJpenlJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKClcIlxuICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAjYml6eUlucHV0VHJpZ2dlcj1cImNka092ZXJsYXlPcmlnaW5cIlxuICAgIFtuZ0NsYXNzXT1cInsnYml6eS1pbnB1dC0tZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ2JpenktaW5wdXQtLW5lZ2F0aXZlJzogdHlwZSA9PT0gJ2N1cnJlbmN5JyAmJiBfY3VycmVuY3lWYWx1ZSA8IDB9XCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX2hlYWRlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1oZWFkZXJdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1pbnB1dF9fY29udGVudFwiIFtuZ0NsYXNzXT1cInsnYml6eS1pbnB1dF9fY29udGVudC0tcmVhZG9ubHknOiByZWFkb25seX1cIj5cbiAgICAgICAgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYml6eS1pbnB1dF9fY29udGVudF9fcHJlZml4XCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1wcmVmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICNiaXp5SW5wdXRcbiAgICAgICAgICAgICpuZ0lmPVwidHlwZSAhPT0gJ3RleHRhcmVhJ1wiXG4gICAgICAgICAgICBbaWRdPVwiaWRcIlxuICAgICAgICAgICAgY2xhc3M9XCJiaXp5LWlucHV0X19jb250ZW50X19pbnB1dFwiXG4gICAgICAgICAgICBbdHlwZV09XCJ0eXBlID09PSAnY3VycmVuY3knID8gJ3RlbCcgOiB0eXBlXCJcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgW2JpenlDdXJyZW5jeUZvcm1hdF09XCJ0eXBlID09PSAnY3VycmVuY3knXCJcbiAgICAgICAgICAgIFtiaXp5Q3VycmVuY3lPcHRpb25zXT1cImN1cnJlbmN5T3B0aW9uc1wiXG4gICAgICAgICAgICBbYml6eU9ubHlQaG9uZURpZ2l0c109XCJ0eXBlID09PSAndGVsJ1wiXG4gICAgICAgICAgICAoYmx1cik9XCJfb25CbHVyKCRldmVudClcIlxuICAgICAgICAgICAgKGZvY3VzKT1cIl9vbkZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cIl9vbkVudGVyKCRldmVudClcIlxuICAgICAgICAgICAgKGtleXVwLmJhY2tzcGFjZSk9XCJfb25CYWNrc3BhY2UoJGV2ZW50KVwiXG4gICAgICAgICAgICBbbmdNb2RlbF09XCJfdmFsdWVcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiX29uY2hhbmdlKCRldmVudClcIi8+XG4gICAgICAgIFxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICNiaXp5SW5wdXRcbiAgICAgICAgICAgICpuZ0lmPVwidHlwZSA9PT0gJ3RleHRhcmVhJ1wiXG4gICAgICAgICAgICBbaWRdPVwiaWRcIlxuICAgICAgICAgICAgW3Jvd3NdPVwicm93c1wiXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYml6eS1pbnB1dF9fY29udGVudF9faW5wdXRcIlxuICAgICAgICAgICAgKGJsdXIpPVwiX29uQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAgIChmb2N1cyk9XCJfb25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJfb25FbnRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXl1cC5iYWNrc3BhY2UpPVwiX29uQmFja3NwYWNlKCRldmVudClcIlxuICAgICAgICAgICAgW25nTW9kZWxdPVwiX3ZhbHVlXCJcbiAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIl9vbmNoYW5nZSgkZXZlbnQpXCI+XG4gICAgICAgIDwvdGV4dGFyZWE+XG5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJiaXp5LWlucHV0X19jb250ZW50X19zdWZmaXhcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PXN1ZmZpeF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgIDwvc3Bhbj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1pbnB1dF9fYm90dG9tLWxpbmVcIiBbbmdDbGFzc109XCJ7J2JpenktaW5wdXRfX2JvdHRvbS1saW5lLS12aXNpYmxlJzogZm9jdXNlZH1cIj48L3NwYW4+XG5cbjwvYnV0dG9uPlxuXG48bmctdGVtcGxhdGVcbiAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlNaW5XaWR0aF09XCJiaXp5SW5wdXRXcmFwcGVyPy5vZmZzZXRXaWR0aFwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwiYml6eUlucHV0VHJpZ2dlclwiXG4gICAgKG92ZXJsYXlPdXRzaWRlQ2xpY2spPVwiY2xvc2UoJGV2ZW50LCBiaXp5SW5wdXRXcmFwcGVyKVwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cIm9wZW5lZFwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWlucHV0X19vcHRpb25zXCI+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1pbnB1dC1vcHRpb25cIj48L25nLWNvbnRlbnQ+XG4gICAgXG4gICAgPC9zcGFuPlxuXG48L25nLXRlbXBsYXRlPlxuXG48c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX2Vycm9yc1wiICpuZ0lmPVwidG91Y2hlZFwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWVycm9yXVwiPjwvbmctY29udGVudD5cbjwvc3Bhbj5cbiJdfQ==