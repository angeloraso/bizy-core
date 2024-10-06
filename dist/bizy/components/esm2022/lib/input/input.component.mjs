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
    value = '';
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
    focused = false;
    touched = false;
    opened = false;
    #subscription = new Subscription();
    #optionSubscription = new Subscription();
    onChange$ = new Subject();
    getWidth() {
        return this.bizyInputWrapper && this.bizyInputWrapper.nativeElement && this.bizyInputWrapper.nativeElement.offsetWidth ? this.bizyInputWrapper.nativeElement.offsetWidth : 0;
    }
    _onchange(value) {
        if (this.disabled || this.readonly) {
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
    constructor(ref) {
        this.ref = ref;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyInputComponent, selector: "bizy-input", inputs: { id: "id", name: "name", type: "type", customClass: "customClass", placeholder: "placeholder", debounceTime: "debounceTime", rows: "rows", disabled: "disabled", readonly: "readonly", value: "value", autofocus: "autofocus" }, outputs: { valueChange: "valueChange", onChange: "onChange", onEnter: "onEnter", onBackspace: "onBackspace", onSelect: "onSelect", onBlur: "onBlur", onFocus: "onFocus" }, queries: [{ propertyName: "options", predicate: BizyInputOptionComponent }], viewQueries: [{ propertyName: "bizyInputWrapper", first: true, predicate: ["bizyInputWrapper"], descendants: true }, { propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            [bizyOnlyNumbers]=\"type === 'number'\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n\n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i3.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            [bizyOnlyNumbers]=\"type === 'number'\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n\n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"] }]
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
            }], value: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2lucHV0L2lucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9pbnB1dC9pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3pMLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7O0FBUWpGLE1BQU0sT0FBTyxrQkFBa0I7SUF5SlE7SUF4Sk0sT0FBTyxDQUFzQztJQUN6RCxnQkFBZ0IsQ0FBYTtJQUNwQyxTQUFTLENBQWE7SUFDckMsRUFBRSxHQUFXLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDM0MsSUFBSSxHQUFXLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDN0MsSUFBSSxHQUFrRSxNQUFNLENBQUM7SUFDN0UsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLFlBQVksR0FBVyxHQUFHLENBQUM7SUFDM0IsSUFBSSxHQUFXLENBQUMsQ0FBQztJQUNqQixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsS0FBSyxHQUFvQixF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QkFDRyxPQUFPO3NCQUFoQixNQUFNO2dCQUVNLFNBQVM7c0JBQXJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgVmlld0NoaWxkLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBkZWJvdW5jZVRpbWUsIGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCaXp5SW5wdXRPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL2lucHV0LW9wdGlvbi9pbnB1dC1vcHRpb24uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9pbnB1dC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaW5wdXQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eUlucHV0T3B0aW9uQ29tcG9uZW50KSBvcHRpb25zOiBRdWVyeUxpc3Q8Qml6eUlucHV0T3B0aW9uQ29tcG9uZW50PjtcbiAgQFZpZXdDaGlsZCgnYml6eUlucHV0V3JhcHBlcicpIGJpenlJbnB1dFdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2JpenlJbnB1dCcpIGJpenlJbnB1dDogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LWlucHV0LSR7TWF0aC5yYW5kb20oKX1gO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSBgYml6eS1pbnB1dC0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgdHlwZTogJ3RleHQnIHwgJ251bWJlcicgfCAnZW1haWwnIHwgJ3Bhc3N3b3JkJyB8ICd0ZWwnIHwgJ3RleHRhcmVhJyA9ICd0ZXh0JztcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGRlYm91bmNlVGltZTogbnVtYmVyID0gMjUwO1xuICBASW5wdXQoKSByb3dzOiBudW1iZXIgPSA0O1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gJyc7XG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVtYmVyPigpO1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZyB8IG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIG9uRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcbiAgQE91dHB1dCgpIG9uQmFja3NwYWNlID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuICBAT3V0cHV0KCkgb25CbHVyID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBvbkZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG5cbiAgQElucHV0KCkgc2V0IGF1dG9mb2N1cyhhdXRvZm9jdXM6IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIGF1dG9mb2N1cyA9PT0gJ3VuZGVmaW5lZCcgfHwgYXV0b2ZvY3VzID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRGb2N1cyhhdXRvZm9jdXMpO1xuICB9XG5cbiAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICB0b3VjaGVkOiBib29sZWFuID0gZmFsc2U7XG4gIG9wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICNvcHRpb25TdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIG9uQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PHN0cmluZyB8IG51bWJlcj4oKTtcblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmJpenlJbnB1dFdyYXBwZXIgJiYgdGhpcy5iaXp5SW5wdXRXcmFwcGVyLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5iaXp5SW5wdXRXcmFwcGVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggPyB0aGlzLmJpenlJbnB1dFdyYXBwZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA6IDA7XG4gIH1cblxuICBfb25jaGFuZ2UodmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9uQ2hhbmdlJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIF9vbkNsaWNrKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoZXZlbnQpO1xuICAgIHRoaXMub25PcGVuKClcbiAgfVxuXG4gIF9vbkVudGVyKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5IHx8ICF0aGlzLmZvY3VzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9uRW50ZXIuZW1pdChldmVudCk7XG4gIH1cblxuICBfb25CbHVyKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy50b3VjaGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH0sIDI1MClcbiAgfVxuXG4gIF9vbkJhY2tzcGFjZShldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm9uQmFja3NwYWNlLmVtaXQoZXZlbnQpO1xuICAgIH0sIDI1MClcbiAgfVxuXG4gIF9vbkZvY3VzKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc2V0VG91Y2hlZCh0b3VjaGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy50b3VjaGVkID0gdG91Y2hlZDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLm9uQ2hhbmdlJC5waXBlKGRlYm91bmNlVGltZSh0aGlzLmRlYm91bmNlVGltZSkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KSlcbiAgfVxuXG4gIG9uT3BlbigpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgIGlmICghdGhpcy5vcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLmFkZChfb3B0aW9uLm9uU2VsZWN0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB0aGlzLiNvcHRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEZvY3VzKGZvY3VzOiBib29sZWFuKSB7XG4gICAgY29uc3QgaW50ZXJ2YWwkID0gaW50ZXJ2YWwoMzAwKTtcbiAgICBjb25zdCBmaW5pc2gkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKGludGVydmFsJC5waXBlKHRha2VVbnRpbChmaW5pc2gkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmJpenlJbnB1dCAmJiB0aGlzLmJpenlJbnB1dC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIGlmIChmb2N1cykge1xuICAgICAgICAgIHRoaXMuYml6eUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYml6eUlucHV0Lm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmaW5pc2gkLm5leHQoKTtcbiAgICAgICAgZmluaXNoJC5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSkpXG4gIH1cblxuICBjbG9zZSA9IChldmVudD86IFBvaW50ZXJFdmVudCAmIHt0YXJnZXQ6IHtpZDogc3RyaW5nfX0sIGJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50KSA9PiB7XG4gICAgaWYgKGJ1dHRvbiAmJiBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0ID09PSBidXR0b24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn0iLCI8YnV0dG9uXG4gICAgI2JpenlJbnB1dFdyYXBwZXJcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAoY2xpY2spPVwiX29uQ2xpY2soJGV2ZW50KVwiXG4gICAgKGtleXVwKT1cIl9vbkNsaWNrKCRldmVudClcIlxuICAgIGNsYXNzPVwiYml6eS1pbnB1dCB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIChmb2N1cyk9XCJiaXp5SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpXCJcbiAgICBjZGtPdmVybGF5T3JpZ2luXG4gICAgI2JpenlJbnB1dFRyaWdnZXI9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICBbbmdDbGFzc109XCJ7J2JpenktaW5wdXQtLWRpc2FibGVkJzogZGlzYWJsZWR9XCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX2hlYWRlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1oZWFkZXJdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1pbnB1dF9fY29udGVudFwiIFtuZ0NsYXNzXT1cInsnYml6eS1pbnB1dF9fY29udGVudC0tcmVhZG9ubHknOiByZWFkb25seX1cIj5cbiAgICAgICAgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYml6eS1pbnB1dF9fY29udGVudF9fcHJlZml4XCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1wcmVmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICNiaXp5SW5wdXRcbiAgICAgICAgICAgICpuZ0lmPVwidHlwZSAhPT0gJ3RleHRhcmVhJ1wiXG4gICAgICAgICAgICBbaWRdPVwiaWRcIlxuICAgICAgICAgICAgY2xhc3M9XCJiaXp5LWlucHV0X19jb250ZW50X19pbnB1dFwiXG4gICAgICAgICAgICBbdHlwZV09XCJ0eXBlXCJcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgW2JpenlPbmx5TnVtYmVyc109XCJ0eXBlID09PSAnbnVtYmVyJ1wiXG4gICAgICAgICAgICBbYml6eU9ubHlQaG9uZURpZ2l0c109XCJ0eXBlID09PSAndGVsJ1wiXG4gICAgICAgICAgICAoYmx1cik9XCJfb25CbHVyKCRldmVudClcIlxuICAgICAgICAgICAgKGZvY3VzKT1cIl9vbkZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cIl9vbkVudGVyKCRldmVudClcIlxuICAgICAgICAgICAgKGtleXVwLmJhY2tzcGFjZSk9XCJfb25CYWNrc3BhY2UoJGV2ZW50KVwiXG4gICAgICAgICAgICBbbmdNb2RlbF09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJfb25jaGFuZ2UoJGV2ZW50KVwiLz5cblxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICNiaXp5SW5wdXRcbiAgICAgICAgICAgICpuZ0lmPVwidHlwZSA9PT0gJ3RleHRhcmVhJ1wiXG4gICAgICAgICAgICBbaWRdPVwiaWRcIlxuICAgICAgICAgICAgW3Jvd3NdPVwicm93c1wiXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYml6eS1pbnB1dF9fY29udGVudF9faW5wdXRcIlxuICAgICAgICAgICAgKGJsdXIpPVwiX29uQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAgIChmb2N1cyk9XCJfb25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJfb25FbnRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXl1cC5iYWNrc3BhY2UpPVwiX29uQmFja3NwYWNlKCRldmVudClcIlxuICAgICAgICAgICAgW25nTW9kZWxdPVwidmFsdWVcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiX29uY2hhbmdlKCRldmVudClcIj5cbiAgICAgICAgPC90ZXh0YXJlYT5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX2NvbnRlbnRfX3N1ZmZpeFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9c3VmZml4XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgPC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWlucHV0X19ib3R0b20tbGluZVwiIFtuZ0NsYXNzXT1cInsnYml6eS1pbnB1dF9fYm90dG9tLWxpbmUtLXZpc2libGUnOiBmb2N1c2VkfVwiPjwvc3Bhbj5cblxuPC9idXR0b24+XG5cbjxuZy10ZW1wbGF0ZVxuICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU1pbldpZHRoXT1cImJpenlJbnB1dFdyYXBwZXI/Lm9mZnNldFdpZHRoXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJiaXp5SW5wdXRUcmlnZ2VyXCJcbiAgICAob3ZlcmxheU91dHNpZGVDbGljayk9XCJjbG9zZSgkZXZlbnQsIGJpenlJbnB1dFdyYXBwZXIpXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwib3BlbmVkXCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktaW5wdXRfX29wdGlvbnNcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LWlucHV0LW9wdGlvblwiPjwvbmctY29udGVudD5cbiAgICBcbiAgICA8L3NwYW4+XG5cbjwvbmctdGVtcGxhdGU+XG5cbjxzcGFuIGNsYXNzPVwiYml6eS1pbnB1dF9fZXJyb3JzXCIgKm5nSWY9XCJ0b3VjaGVkXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9ZXJyb3JdXCI+PC9uZy1jb250ZW50PlxuPC9zcGFuPlxuIl19