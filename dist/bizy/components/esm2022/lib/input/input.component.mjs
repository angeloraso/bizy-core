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
            this._currencyValue = value;
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyInputComponent, selector: "bizy-input", inputs: { id: "id", name: "name", type: "type", customClass: "customClass", placeholder: "placeholder", debounceTime: "debounceTime", rows: "rows", disabled: "disabled", readonly: "readonly", autofocus: "autofocus", value: "value" }, outputs: { valueChange: "valueChange", onChange: "onChange", onEnter: "onEnter", onBackspace: "onBackspace", onSelect: "onSelect", onBlur: "onBlur", onFocus: "onFocus" }, queries: [{ propertyName: "options", predicate: BizyInputOptionComponent }], viewQueries: [{ propertyName: "bizyInputWrapper", first: true, predicate: ["bizyInputWrapper"], descendants: true }, { propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type === 'currency' ? 'tel' : type\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            [bizyCurrencyFormat]=\"type === 'currency'\"\n            [bizyCurrencyOptions]=\"currencyOptions\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n        \n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i3.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type === 'currency' ? 'tel' : type\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            [bizyCurrencyFormat]=\"type === 'currency'\"\n            [bizyCurrencyOptions]=\"currencyOptions\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n        \n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2lucHV0L2lucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9pbnB1dC9pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3pMLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7O0FBUWpGLE1BQU0sT0FBTyxrQkFBa0I7SUF3RFE7SUF2RE0sT0FBTyxDQUFzQztJQUN6RCxnQkFBZ0IsQ0FBYTtJQUNwQyxTQUFTLENBQWE7SUFDckMsRUFBRSxHQUFXLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDM0MsSUFBSSxHQUFXLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDN0MsSUFBSSxHQUErRSxNQUFNLENBQUM7SUFDMUYsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLFlBQVksR0FBVyxHQUFHLENBQUM7SUFDM0IsSUFBSSxHQUFXLENBQUMsQ0FBQztJQUNqQixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDekIsV0FBVyxHQUFHLElB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V0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7d0dBN0xVLGtCQUFrQixrQkF3RG5CLGlCQUFpQjs0RkF4RGhCLGtCQUFrQiwrZEFDWix3QkFBd0IsNE9DWjNDLG94RkFtRkE7OzRGRHhFYSxrQkFBa0I7a0JBTjlCLFNBQVM7K0JBQ0UsWUFBWSxtQkFHTCx1QkFBdUIsQ0FBQyxNQUFNOzswQkEwRDVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQXZEZ0IsT0FBTztzQkFBakQsZUFBZTt1QkFBQyx3QkFBd0I7Z0JBQ1YsZ0JBQWdCO3NCQUE5QyxTQUFTO3VCQUFDLGtCQUFrQjtnQkFDTCxTQUFTO3NCQUFoQyxTQUFTO3VCQUFDLFdBQVc7Z0JBQ2IsRUFBRTtzQkFBVixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDSSxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU07Z0JBRU0sU0FBUztzQkFBckIsS0FBSztnQkFRTyxLQUFLO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFZpZXdDaGlsZCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgZGVib3VuY2VUaW1lLCBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQml6eUlucHV0T3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC1vcHRpb24vaW5wdXQtb3B0aW9uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2lucHV0LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBAQ29udGVudENoaWxkcmVuKEJpenlJbnB1dE9wdGlvbkNvbXBvbmVudCkgb3B0aW9uczogUXVlcnlMaXN0PEJpenlJbnB1dE9wdGlvbkNvbXBvbmVudD47XG4gIEBWaWV3Q2hpbGQoJ2JpenlJbnB1dFdyYXBwZXInKSBiaXp5SW5wdXRXcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdiaXp5SW5wdXQnKSBiaXp5SW5wdXQ6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1pbnB1dC0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nID0gYGJpenktaW5wdXQtJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIHR5cGU6ICd0ZXh0JyB8ICdudW1iZXInIHwgJ2VtYWlsJyB8ICdwYXNzd29yZCcgfCAndGVsJyB8ICd0ZXh0YXJlYScgfCAnY3VycmVuY3knID0gJ3RleHQnO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgZGVib3VuY2VUaW1lOiBudW1iZXIgPSAyNTA7XG4gIEBJbnB1dCgpIHJvd3M6IG51bWJlciA9IDQ7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVtYmVyPigpO1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZyB8IG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIG9uRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcbiAgQE91dHB1dCgpIG9uQmFja3NwYWNlID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuICBAT3V0cHV0KCkgb25CbHVyID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBvbkZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG5cbiAgQElucHV0KCkgc2V0IGF1dG9mb2N1cyhhdXRvZm9jdXM6IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIGF1dG9mb2N1cyA9PT0gJ3VuZGVmaW5lZCcgfHwgYXV0b2ZvY3VzID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRGb2N1cyhhdXRvZm9jdXMpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAnY3VycmVuY3knKSB7XG4gICAgICB0aGlzLl9jdXJyZW5jeVZhbHVlID0gdmFsdWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdG91Y2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX3ZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgX2N1cnJlbmN5VmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIGN1cnJlbmN5T3B0aW9ucyA9ICdjb21tYURlY2ltYWxDaGFyRG90U2VwYXJhdG9yJztcblxuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAjb3B0aW9uU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBvbkNoYW5nZSQgPSBuZXcgU3ViamVjdDxzdHJpbmcgfCBudW1iZXI+KCk7XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYml6eUlucHV0V3JhcHBlciAmJiB0aGlzLmJpenlJbnB1dFdyYXBwZXIubmF0aXZlRWxlbWVudCAmJiB0aGlzLmJpenlJbnB1dFdyYXBwZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA/IHRoaXMuYml6eUlucHV0V3JhcHBlci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIDogMDtcbiAgfVxuXG4gIF9vbmNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjdXJyZW5jeScgJiYgKDxhbnk+dGhpcy5iaXp5SW5wdXQubmF0aXZlRWxlbWVudCkuZ2V0VmFsdWUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbmN5VmFsdWUgPSAoPGFueT50aGlzLmJpenlJbnB1dC5uYXRpdmVFbGVtZW50KS5nZXRWYWx1ZSgpXG4gICAgICB0aGlzLm9uQ2hhbmdlJC5uZXh0KHRoaXMuX2N1cnJlbmN5VmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25DaGFuZ2UkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgX29uQ2xpY2soZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudCk7XG4gICAgdGhpcy5vbk9wZW4oKVxuICB9XG5cbiAgX29uRW50ZXIoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkgfHwgIXRoaXMuZm9jdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25FbnRlci5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9vbkJsdXIoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjdXJyZW5jeScpIHtcbiAgICAgIHRoaXMuYml6eUlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0VmFsdWUodGhpcy5fY3VycmVuY3lWYWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMudG91Y2hlZCA9IHRydWU7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcbiAgICB9LCAyNTApXG4gIH1cblxuICBfb25CYWNrc3BhY2UoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5vbkJhY2tzcGFjZS5lbWl0KGV2ZW50KTtcbiAgICB9LCAyNTApXG4gIH1cblxuICBfb25Gb2N1cyhldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHNldFRvdWNoZWQodG91Y2hlZDogYm9vbGVhbikge1xuICAgIHRoaXMudG91Y2hlZCA9IHRvdWNoZWQ7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjdXJyZW5jeScpIHtcbiAgICAgIHRoaXMuYml6eUlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0VmFsdWUodGhpcy5fY3VycmVuY3lWYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5vbkNoYW5nZSQucGlwZShkZWJvdW5jZVRpbWUodGhpcy5kZWJvdW5jZVRpbWUpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSkpXG4gIH1cblxuICBvbk9wZW4oKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9wZW5lZCA9ICF0aGlzLm9wZW5lZDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChfb3B0aW9uID0+IHtcbiAgICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbi5hZGQoX29wdGlvbi5vblNlbGVjdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRGb2N1cyhmb2N1czogYm9vbGVhbikge1xuICAgIGNvbnN0IGludGVydmFsJCA9IGludGVydmFsKDMwMCk7XG4gICAgY29uc3QgZmluaXNoJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZChpbnRlcnZhbCQucGlwZSh0YWtlVW50aWwoZmluaXNoJCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5iaXp5SW5wdXQgJiYgdGhpcy5iaXp5SW5wdXQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICB0aGlzLmJpenlJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmJpenlJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZmluaXNoJC5uZXh0KCk7XG4gICAgICAgIGZpbmlzaCQuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0pKVxuICB9XG5cbiAgY2xvc2UgPSAoZXZlbnQ/OiBQb2ludGVyRXZlbnQgJiB7dGFyZ2V0OiB7aWQ6IHN0cmluZ319LCBidXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudCkgPT4ge1xuICAgIGlmIChidXR0b24gJiYgZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldCA9PT0gYnV0dG9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLiNvcHRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufSIsIjxidXR0b25cbiAgICAjYml6eUlucHV0V3JhcHBlclxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIChjbGljayk9XCJfb25DbGljaygkZXZlbnQpXCJcbiAgICAoa2V5dXApPVwiX29uQ2xpY2soJGV2ZW50KVwiXG4gICAgY2xhc3M9XCJiaXp5LWlucHV0IHt7Y3VzdG9tQ2xhc3N9fVwiXG4gICAgKGZvY3VzKT1cImJpenlJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKClcIlxuICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAjYml6eUlucHV0VHJpZ2dlcj1cImNka092ZXJsYXlPcmlnaW5cIlxuICAgIFtuZ0NsYXNzXT1cInsnYml6eS1pbnB1dC0tZGlzYWJsZWQnOiBkaXNhYmxlZH1cIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1pbnB1dF9faGVhZGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWhlYWRlcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWlucHV0X19jb250ZW50XCIgW25nQ2xhc3NdPVwieydiaXp5LWlucHV0X19jb250ZW50LS1yZWFkb25seSc6IHJlYWRvbmx5fVwiPlxuICAgICAgICBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJiaXp5LWlucHV0X19jb250ZW50X19wcmVmaXhcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PXByZWZpeF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgI2JpenlJbnB1dFxuICAgICAgICAgICAgKm5nSWY9XCJ0eXBlICE9PSAndGV4dGFyZWEnXCJcbiAgICAgICAgICAgIFtpZF09XCJpZFwiXG4gICAgICAgICAgICBjbGFzcz1cImJpenktaW5wdXRfX2NvbnRlbnRfX2lucHV0XCJcbiAgICAgICAgICAgIFt0eXBlXT1cInR5cGUgPT09ICdjdXJyZW5jeScgPyAndGVsJyA6IHR5cGVcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgICBbYml6eUN1cnJlbmN5Rm9ybWF0XT1cInR5cGUgPT09ICdjdXJyZW5jeSdcIlxuICAgICAgICAgICAgW2JpenlDdXJyZW5jeU9wdGlvbnNdPVwiY3VycmVuY3lPcHRpb25zXCJcbiAgICAgICAgICAgIFtiaXp5T25seVBob25lRGlnaXRzXT1cInR5cGUgPT09ICd0ZWwnXCJcbiAgICAgICAgICAgIChibHVyKT1cIl9vbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZm9jdXMpPVwiX29uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiX29uRW50ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAoa2V5dXAuYmFja3NwYWNlKT1cIl9vbkJhY2tzcGFjZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIFtuZ01vZGVsXT1cIl92YWx1ZVwiXG4gICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJfb25jaGFuZ2UoJGV2ZW50KVwiLz5cbiAgICAgICAgXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgI2JpenlJbnB1dFxuICAgICAgICAgICAgKm5nSWY9XCJ0eXBlID09PSAndGV4dGFyZWEnXCJcbiAgICAgICAgICAgIFtpZF09XCJpZFwiXG4gICAgICAgICAgICBbcm93c109XCJyb3dzXCJcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgY2xhc3M9XCJiaXp5LWlucHV0X19jb250ZW50X19pbnB1dFwiXG4gICAgICAgICAgICAoYmx1cik9XCJfb25CbHVyKCRldmVudClcIlxuICAgICAgICAgICAgKGZvY3VzKT1cIl9vbkZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cIl9vbkVudGVyKCRldmVudClcIlxuICAgICAgICAgICAgKGtleXVwLmJhY2tzcGFjZSk9XCJfb25CYWNrc3BhY2UoJGV2ZW50KVwiXG4gICAgICAgICAgICBbbmdNb2RlbF09XCJfdmFsdWVcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiX29uY2hhbmdlKCRldmVudClcIj5cbiAgICAgICAgPC90ZXh0YXJlYT5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX2NvbnRlbnRfX3N1ZmZpeFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9c3VmZml4XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgPC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWlucHV0X19ib3R0b20tbGluZVwiIFtuZ0NsYXNzXT1cInsnYml6eS1pbnB1dF9fYm90dG9tLWxpbmUtLXZpc2libGUnOiBmb2N1c2VkfVwiPjwvc3Bhbj5cblxuPC9idXR0b24+XG5cbjxuZy10ZW1wbGF0ZVxuICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU1pbldpZHRoXT1cImJpenlJbnB1dFdyYXBwZXI/Lm9mZnNldFdpZHRoXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJiaXp5SW5wdXRUcmlnZ2VyXCJcbiAgICAob3ZlcmxheU91dHNpZGVDbGljayk9XCJjbG9zZSgkZXZlbnQsIGJpenlJbnB1dFdyYXBwZXIpXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwib3BlbmVkXCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX29wdGlvbnNcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LWlucHV0LW9wdGlvblwiPjwvbmctY29udGVudD5cbiAgICBcbiAgICA8L3NwYW4+XG5cbjwvbmctdGVtcGxhdGU+XG5cbjxzcGFuIGNsYXNzPVwiYml6eS1pbnB1dF9fZXJyb3JzXCIgKm5nSWY9XCJ0b3VjaGVkXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9ZXJyb3JdXCI+PC9uZy1jb250ZW50PlxuPC9zcGFuPlxuIl19