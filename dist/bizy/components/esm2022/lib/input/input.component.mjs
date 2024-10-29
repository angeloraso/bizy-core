import { takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, ViewChild, ContentChildren } from '@angular/core';
import { Subject, Subscription, debounceTime, interval } from 'rxjs';
import { BizyInputOptionComponent } from './input-option/input-option.component';
import { DecimalPipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/cdk/overlay";
export class BizyInputComponent {
    ref;
    decimalPipe;
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
        if (typeof value === 'undefined' || value === null || value === 0) {
            this._value = '';
            return;
        }
        if (this.type === 'currency' && Number(value)) {
            const initialLength = this._value.length;
            let caretPosition = this.bizyInput.nativeElement.selectionStart;
            let _value = this.#getFormattedCurrencyValue(Number(value));
            if (this.hasFinalComma) {
                _value += ',';
                this.hasFinalComma = false;
            }
            this._value = _value;
            const newLength = _value.length;
            if ((newLength - initialLength) > 1) {
                caretPosition++;
            }
            else if ((newLength - initialLength) < -1) {
                caretPosition--;
            }
            setTimeout(() => {
                this.bizyInput.nativeElement.setSelectionRange(caretPosition, caretPosition);
            }, 1);
            return;
        }
        this._value = String(value);
    }
    focused = false;
    touched = false;
    opened = false;
    _value = '';
    hasFinalComma = false;
    #subscription = new Subscription();
    #optionSubscription = new Subscription();
    onChange$ = new Subject();
    constructor(ref, decimalPipe) {
        this.ref = ref;
        this.decimalPipe = decimalPipe;
    }
    getWidth() {
        return this.bizyInputWrapper && this.bizyInputWrapper.nativeElement && this.bizyInputWrapper.nativeElement.offsetWidth ? this.bizyInputWrapper.nativeElement.offsetWidth : 0;
    }
    _onchange(value) {
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.type === 'currency') {
            let cleanedStr = value.replace(/\./g, '');
            cleanedStr = cleanedStr.replace(',', '.');
            cleanedStr = cleanedStr.replace(/\,/g, '');
            this.hasFinalComma = cleanedStr[cleanedStr.length - 1] === '.';
            const _value = Number(cleanedStr);
            if (!_value && _value !== 0) {
                return;
            }
            this.valueChange.emit(_value);
            this.onChange.emit(_value);
            return;
        }
        else if (this.type === 'number' && Number(value)) {
            this.onChange$.next(Number(value));
        }
        else {
            this.onChange$.next(value);
        }
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
    #getFormattedCurrencyValue(value) {
        const decimalPosition = String(value).indexOf('.');
        if (decimalPosition > 0) {
            let leftSide = String(value).substring(0, decimalPosition);
            let rightSide = String(value).substring(decimalPosition + 1);
            leftSide = this.decimalPipe.transform(leftSide, '1.0-0');
            return `${leftSide},${rightSide}`;
        }
        return this.decimalPipe.transform(value, '1.0-0');
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputComponent, deps: [{ token: ChangeDetectorRef }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyInputComponent, selector: "bizy-input", inputs: { id: "id", name: "name", type: "type", customClass: "customClass", placeholder: "placeholder", debounceTime: "debounceTime", rows: "rows", disabled: "disabled", readonly: "readonly", autofocus: "autofocus", value: "value" }, outputs: { valueChange: "valueChange", onChange: "onChange", onEnter: "onEnter", onBackspace: "onBackspace", onSelect: "onSelect", onBlur: "onBlur", onFocus: "onFocus" }, queries: [{ propertyName: "options", predicate: BizyInputOptionComponent }], viewQueries: [{ propertyName: "bizyInputWrapper", first: true, predicate: ["bizyInputWrapper"], descendants: true }, { propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type === 'currency' ? 'tel' : type\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            [bizyOnlyNumbers]=\"type === 'number'\"\n            [bizyCurrencyFormat]=\"type === 'currency'\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n        \n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i3.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type === 'currency' ? 'tel' : type\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            [bizyOnlyNumbers]=\"type === 'number'\"\n            [bizyCurrencyFormat]=\"type === 'currency'\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n        \n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i1.DecimalPipe, decorators: [{
                    type: Inject,
                    args: [DecimalPipe]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2lucHV0L2lucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9pbnB1dC9pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3pMLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDakYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7OztBQVE5QyxNQUFNLE9BQU8sa0JBQWtCO0lBeUVRO0lBQ047SUF6RVksT0FBTyxDQUFzQztJQUN6RCxnQkFBZ0IsQ0FBYTtJQUNwQyxTQUFTLENBQWE7SUFDckMsRUFBRSxHQUFXLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDM0MsSUFBSSxHQUFXLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDN0MsSUFBSSxHQUErRSxNQUFNLENBQUM7SUFDMUYsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLFlBQVksR0FBVyxHQUFHLENBQUM7SUFDM0IsSUFBSSxHQUFXLENBQUMsQ0FBQztJQUNqQixRQUFRLEdBQVksS0FBSyxD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RCxlQUFlO3VCQUFDLHdCQUF3QjtnQkFDVixnQkFBZ0I7c0JBQTlDLFNBQVM7dUJBQUMsa0JBQWtCO2dCQUNMLFNBQVM7c0JBQWhDLFNBQVM7dUJBQUMsV0FBVztnQkFDYixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNJLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxPQUFPO3NCQUFoQixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTTtnQkFFTSxTQUFTO3NCQUFyQixLQUFLO2dCQVFPLEtBQUs7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgVmlld0NoaWxkLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBkZWJvdW5jZVRpbWUsIGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCaXp5SW5wdXRPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL2lucHV0LW9wdGlvbi9pbnB1dC1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9pbnB1dC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaW5wdXQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eUlucHV0T3B0aW9uQ29tcG9uZW50KSBvcHRpb25zOiBRdWVyeUxpc3Q8Qml6eUlucHV0T3B0aW9uQ29tcG9uZW50PjtcbiAgQFZpZXdDaGlsZCgnYml6eUlucHV0V3JhcHBlcicpIGJpenlJbnB1dFdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2JpenlJbnB1dCcpIGJpenlJbnB1dDogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LWlucHV0LSR7TWF0aC5yYW5kb20oKX1gO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSBgYml6eS1pbnB1dC0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgdHlwZTogJ3RleHQnIHwgJ251bWJlcicgfCAnZW1haWwnIHwgJ3Bhc3N3b3JkJyB8ICd0ZWwnIHwgJ3RleHRhcmVhJyB8ICdjdXJyZW5jeScgPSAndGV4dCc7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBkZWJvdW5jZVRpbWU6IG51bWJlciA9IDI1MDtcbiAgQElucHV0KCkgcm93czogbnVtYmVyID0gNDtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVtYmVyPigpO1xuICBAT3V0cHV0KCkgb25FbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuICBAT3V0cHV0KCkgb25CYWNrc3BhY2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBvbkJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcbiAgQE91dHB1dCgpIG9uRm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcblxuICBASW5wdXQoKSBzZXQgYXV0b2ZvY3VzKGF1dG9mb2N1czogYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2YgYXV0b2ZvY3VzID09PSAndW5kZWZpbmVkJyB8fCBhdXRvZm9jdXMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldEZvY3VzKGF1dG9mb2N1cyk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgdmFsdWUodmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9ICcnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjdXJyZW5jeScgJiYgTnVtYmVyKHZhbHVlKSkge1xuICAgICAgY29uc3QgaW5pdGlhbExlbmd0aCA9IHRoaXMuX3ZhbHVlLmxlbmd0aDtcbiAgICAgIGxldCBjYXJldFBvc2l0aW9uID0gdGhpcy5iaXp5SW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgIGxldCBfdmFsdWUgPSB0aGlzLiNnZXRGb3JtYXR0ZWRDdXJyZW5jeVZhbHVlKE51bWJlcih2YWx1ZSkpO1xuICAgICAgaWYgKHRoaXMuaGFzRmluYWxDb21tYSkge1xuICAgICAgICBfdmFsdWUgKz0gJywnO1xuICAgICAgICB0aGlzLmhhc0ZpbmFsQ29tbWEgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICBjb25zdCBuZXdMZW5ndGggPSBfdmFsdWUubGVuZ3RoO1xuICAgICAgaWYgKChuZXdMZW5ndGggLSBpbml0aWFsTGVuZ3RoKSA+IDEpIHtcbiAgICAgICAgY2FyZXRQb3NpdGlvbisrO1xuICAgICAgfSBlbHNlIGlmICgobmV3TGVuZ3RoIC0gaW5pdGlhbExlbmd0aCkgPCAtMSkge1xuICAgICAgICBjYXJldFBvc2l0aW9uLS07XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5iaXp5SW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShjYXJldFBvc2l0aW9uLCBjYXJldFBvc2l0aW9uKTtcbiAgICAgIH0sIDEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG5cbiAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICB0b3VjaGVkOiBib29sZWFuID0gZmFsc2U7XG4gIG9wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuICBfdmFsdWU6IHN0cmluZyA9ICcnO1xuICBoYXNGaW5hbENvbW1hOiBib29sZWFuID0gZmFsc2U7XG5cbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI29wdGlvblN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgb25DaGFuZ2UkID0gbmV3IFN1YmplY3Q8c3RyaW5nIHwgbnVtYmVyPigpO1xuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRGVjaW1hbFBpcGUpIHByaXZhdGUgZGVjaW1hbFBpcGU6IERlY2ltYWxQaXBlXG4gICkge31cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmJpenlJbnB1dFdyYXBwZXIgJiYgdGhpcy5iaXp5SW5wdXRXcmFwcGVyLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5iaXp5SW5wdXRXcmFwcGVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggPyB0aGlzLmJpenlJbnB1dFdyYXBwZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA6IDA7XG4gIH1cblxuICBfb25jaGFuZ2UodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAnY3VycmVuY3knKSB7XG4gICAgICBsZXQgY2xlYW5lZFN0ciA9IHZhbHVlLnJlcGxhY2UoL1xcLi9nLCAnJyk7XG4gICAgICBjbGVhbmVkU3RyID0gY2xlYW5lZFN0ci5yZXBsYWNlKCcsJywgJy4nKTtcbiAgICAgIGNsZWFuZWRTdHIgPSBjbGVhbmVkU3RyLnJlcGxhY2UoL1xcLC9nLCAnJyk7XG5cbiAgICAgIHRoaXMuaGFzRmluYWxDb21tYSA9IGNsZWFuZWRTdHJbY2xlYW5lZFN0ci5sZW5ndGggLTFdID09PSAnLic7XG5cbiAgICAgIGNvbnN0IF92YWx1ZSA9IE51bWJlcihjbGVhbmVkU3RyKTtcbiAgICAgIGlmICghX3ZhbHVlICYmIF92YWx1ZSAhPT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChfdmFsdWUpO1xuICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KF92YWx1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdudW1iZXInICYmIE51bWJlcih2YWx1ZSkpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UkLm5leHQoTnVtYmVyKHZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25DaGFuZ2UkLm5leHQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIF9vbkNsaWNrKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoZXZlbnQpO1xuICAgIHRoaXMub25PcGVuKClcbiAgfVxuXG4gIF9vbkVudGVyKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5IHx8ICF0aGlzLmZvY3VzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9uRW50ZXIuZW1pdChldmVudCk7XG4gIH1cblxuICBfb25CbHVyKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy50b3VjaGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH0sIDI1MClcbiAgfVxuXG4gIF9vbkJhY2tzcGFjZShldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm9uQmFja3NwYWNlLmVtaXQoZXZlbnQpO1xuICAgIH0sIDI1MClcbiAgfVxuXG4gIF9vbkZvY3VzKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc2V0VG91Y2hlZCh0b3VjaGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy50b3VjaGVkID0gdG91Y2hlZDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLm9uQ2hhbmdlJC5waXBlKGRlYm91bmNlVGltZSh0aGlzLmRlYm91bmNlVGltZSkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KSlcbiAgfVxuXG4gIG9uT3BlbigpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgIGlmICghdGhpcy5vcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLmFkZChfb3B0aW9uLm9uU2VsZWN0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB0aGlzLiNvcHRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEZvY3VzKGZvY3VzOiBib29sZWFuKSB7XG4gICAgY29uc3QgaW50ZXJ2YWwkID0gaW50ZXJ2YWwoMzAwKTtcbiAgICBjb25zdCBmaW5pc2gkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKGludGVydmFsJC5waXBlKHRha2VVbnRpbChmaW5pc2gkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmJpenlJbnB1dCAmJiB0aGlzLmJpenlJbnB1dC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIGlmIChmb2N1cykge1xuICAgICAgICAgIHRoaXMuYml6eUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYml6eUlucHV0Lm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmaW5pc2gkLm5leHQoKTtcbiAgICAgICAgZmluaXNoJC5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSkpXG4gIH1cblxuICBjbG9zZSA9IChldmVudD86IFBvaW50ZXJFdmVudCAmIHt0YXJnZXQ6IHtpZDogc3RyaW5nfX0sIGJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50KSA9PiB7XG4gICAgaWYgKGJ1dHRvbiAmJiBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0ID09PSBidXR0b24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gICNnZXRGb3JtYXR0ZWRDdXJyZW5jeVZhbHVlKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRlY2ltYWxQb3NpdGlvbiA9IFN0cmluZyh2YWx1ZSkuaW5kZXhPZignLicpO1xuICAgIGlmIChkZWNpbWFsUG9zaXRpb24gPiAwKSB7XG4gICAgICBsZXQgbGVmdFNpZGUgPSBTdHJpbmcodmFsdWUpLnN1YnN0cmluZygwLCBkZWNpbWFsUG9zaXRpb24pO1xuICAgICAgbGV0IHJpZ2h0U2lkZSA9IFN0cmluZyh2YWx1ZSkuc3Vic3RyaW5nKGRlY2ltYWxQb3NpdGlvbiArIDEpO1xuICAgICAgbGVmdFNpZGUgPSB0aGlzLmRlY2ltYWxQaXBlLnRyYW5zZm9ybShsZWZ0U2lkZSwgJzEuMC0wJyk7XG4gICAgICByZXR1cm4gYCR7bGVmdFNpZGV9LCR7cmlnaHRTaWRlfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGVjaW1hbFBpcGUudHJhbnNmb3JtKHZhbHVlLCAnMS4wLTAnKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59IiwiPGJ1dHRvblxuICAgICNiaXp5SW5wdXRXcmFwcGVyXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgKGNsaWNrKT1cIl9vbkNsaWNrKCRldmVudClcIlxuICAgIChrZXl1cCk9XCJfb25DbGljaygkZXZlbnQpXCJcbiAgICBjbGFzcz1cImJpenktaW5wdXQge3tjdXN0b21DbGFzc319XCJcbiAgICAoZm9jdXMpPVwiYml6eUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKVwiXG4gICAgY2RrT3ZlcmxheU9yaWdpblxuICAgICNiaXp5SW5wdXRUcmlnZ2VyPVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgW25nQ2xhc3NdPVwieydiaXp5LWlucHV0LS1kaXNhYmxlZCc6IGRpc2FibGVkfVwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWlucHV0X19oZWFkZXJcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9aGVhZGVyXVwiPjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX2NvbnRlbnRcIiBbbmdDbGFzc109XCJ7J2JpenktaW5wdXRfX2NvbnRlbnQtLXJlYWRvbmx5JzogcmVhZG9ubHl9XCI+XG4gICAgICAgIFxuICAgICAgICA8c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX2NvbnRlbnRfX3ByZWZpeFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9cHJlZml4XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICBcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAjYml6eUlucHV0XG4gICAgICAgICAgICAqbmdJZj1cInR5cGUgIT09ICd0ZXh0YXJlYSdcIlxuICAgICAgICAgICAgW2lkXT1cImlkXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYml6eS1pbnB1dF9fY29udGVudF9faW5wdXRcIlxuICAgICAgICAgICAgW3R5cGVdPVwidHlwZSA9PT0gJ2N1cnJlbmN5JyA/ICd0ZWwnIDogdHlwZVwiXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgIFtiaXp5T25seU51bWJlcnNdPVwidHlwZSA9PT0gJ251bWJlcidcIlxuICAgICAgICAgICAgW2JpenlDdXJyZW5jeUZvcm1hdF09XCJ0eXBlID09PSAnY3VycmVuY3knXCJcbiAgICAgICAgICAgIFtiaXp5T25seVBob25lRGlnaXRzXT1cInR5cGUgPT09ICd0ZWwnXCJcbiAgICAgICAgICAgIChibHVyKT1cIl9vbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZm9jdXMpPVwiX29uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiX29uRW50ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAoa2V5dXAuYmFja3NwYWNlKT1cIl9vbkJhY2tzcGFjZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIFtuZ01vZGVsXT1cIl92YWx1ZVwiXG4gICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJfb25jaGFuZ2UoJGV2ZW50KVwiLz5cbiAgICAgICAgXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgI2JpenlJbnB1dFxuICAgICAgICAgICAgKm5nSWY9XCJ0eXBlID09PSAndGV4dGFyZWEnXCJcbiAgICAgICAgICAgIFtpZF09XCJpZFwiXG4gICAgICAgICAgICBbcm93c109XCJyb3dzXCJcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgY2xhc3M9XCJiaXp5LWlucHV0X19jb250ZW50X19pbnB1dFwiXG4gICAgICAgICAgICAoYmx1cik9XCJfb25CbHVyKCRldmVudClcIlxuICAgICAgICAgICAgKGZvY3VzKT1cIl9vbkZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cIl9vbkVudGVyKCRldmVudClcIlxuICAgICAgICAgICAgKGtleXVwLmJhY2tzcGFjZSk9XCJfb25CYWNrc3BhY2UoJGV2ZW50KVwiXG4gICAgICAgICAgICBbbmdNb2RlbF09XCJfdmFsdWVcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiX29uY2hhbmdlKCRldmVudClcIj5cbiAgICAgICAgPC90ZXh0YXJlYT5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX2NvbnRlbnRfX3N1ZmZpeFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9c3VmZml4XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgPC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWlucHV0X19ib3R0b20tbGluZVwiIFtuZ0NsYXNzXT1cInsnYml6eS1pbnB1dF9fYm90dG9tLWxpbmUtLXZpc2libGUnOiBmb2N1c2VkfVwiPjwvc3Bhbj5cblxuPC9idXR0b24+XG5cbjxuZy10ZW1wbGF0ZVxuICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU1pbldpZHRoXT1cImJpenlJbnB1dFdyYXBwZXI/Lm9mZnNldFdpZHRoXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJiaXp5SW5wdXRUcmlnZ2VyXCJcbiAgICAob3ZlcmxheU91dHNpZGVDbGljayk9XCJjbG9zZSgkZXZlbnQsIGJpenlJbnB1dFdyYXBwZXIpXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwib3BlbmVkXCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX29wdGlvbnNcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LWlucHV0LW9wdGlvblwiPjwvbmctY29udGVudD5cbiAgICBcbiAgICA8L3NwYW4+XG5cbjwvbmctdGVtcGxhdGU+XG5cbjxzcGFuIGNsYXNzPVwiYml6eS1pbnB1dF9fZXJyb3JzXCIgKm5nSWY9XCJ0b3VjaGVkXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9ZXJyb3JdXCI+PC9uZy1jb250ZW50PlxuPC9zcGFuPlxuIl19