import * as i0 from '@angular/core';
import { EventEmitter, Renderer2, Component, ChangeDetectionStrategy, Inject, ViewChild, Input, Output, NgModule, ElementRef, Directive, TemplateRef, ChangeDetectorRef, ContentChild } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, filter, take, Subject, interval, Subscription } from 'rxjs';
import * as i2 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { takeUntil, skip, debounceTime } from 'rxjs/operators';
import * as i2$1 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i2$2 from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

class ToggleComponent {
    renderer;
    bizyToggleInput;
    #afterViewInit = new BehaviorSubject(false);
    id = String(Math.random());
    label = '';
    labelPosition = 'after';
    disabled = false;
    onSelect = new EventEmitter();
    valueChange = new EventEmitter();
    _checked = false;
    set checked(checked) {
        this.#afterViewInit.asObservable().pipe(filter(status => status === true), take(1)).subscribe(() => {
            if (checked) {
                this.renderer.setAttribute(this.bizyToggleInput.nativeElement, 'checked', 'true');
            }
            else {
                this.renderer.removeAttribute(this.bizyToggleInput.nativeElement, 'checked');
            }
            this._checked = Boolean(checked);
        });
    }
    ngAfterViewInit() {
        this.#afterViewInit.next(true);
    }
    constructor(renderer) {
        this.renderer = renderer;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ToggleComponent, deps: [{ token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.9", type: ToggleComponent, selector: "bizy-toggle", inputs: { id: "id", label: "label", labelPosition: "labelPosition", disabled: "disabled", checked: "checked" }, outputs: { onSelect: "onSelect", valueChange: "valueChange" }, viewQueries: [{ propertyName: "bizyToggleInput", first: true, predicate: ["bizyToggleInput"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-toggle\">\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'before'\">{{label}}</label>\n\n    <div class=\"bizy-toggle__slide\">\n        <input \n            #bizyToggleInput\n            id=\"{{id}}\"\n            type=\"checkbox\"\n            (change)=\"onSelect.emit(!_checked)\"\n            class=\"bizy-toggle__slide__checkbox\"\n            [ngClass]=\"{'bizy-toggle__slide__checkbox--disabled': disabled}\">\n        <div class=\"bizy-toggle__slide__knobs\"></div>\n        <div class=\"bizy-toggle__slide__layer\"></div>\n    </div>\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'after'\">{{label}}</label>\n    \n</div>", styles: [".bizy-toggle{display:flex;width:-moz-fit-content;width:fit-content;column-gap:.5rem;align-items:center}.bizy-toggle__slide{position:relative;width:3rem;height:1.6rem}.bizy-toggle__slide__layer{border-radius:100px}.bizy-toggle__slide__checkbox{position:relative;width:100%;height:100%;padding:0;margin:0;opacity:0;cursor:pointer;z-index:3}.bizy-toggle__slide__knobs,.bizy-toggle__slide__layer{position:absolute;inset:0}.bizy-toggle__slide__knobs{z-index:2}.bizy-toggle__slide__knobs:before{content:\"\";position:absolute;top:.15rem;left:.15rem;width:1.3rem;height:1.3rem;color:#fff;padding:.6rem .5rem;background-color:var(--bizy-toggle-off-color);border-radius:50%;transition:.3s cubic-bezier(.18,.89,.35,1.15) all}.bizy-toggle__slide__layer{background-color:var(--bizy-toggle-off-background-color);transition:.3s ease all;z-index:1;position:relative;top:-1.45rem;width:2.2rem;height:.6rem;left:.6rem}.bizy-toggle__slide__checkbox:checked+.bizy-toggle__slide__knobs:before{content:\"\";left:2rem;background-color:var(--bizy-toggle-on-color)}.bizy-toggle__slide__checkbox:checked~.bizy-toggle__slide__layer{width:2.2rem;height:.6rem;background-color:var(--bizy-toggle-on-background-color);position:relative;top:-1.45rem;left:.6rem}.bizy-toggle__slide__knobs,.bizy-toggle__slide__knobs:before,.bizy-toggle__slide__layer{transition:.3s ease all}.bizy-toggle__slide__checkbox--disabled{pointer-events:none;cursor:default}.bizy-toggle__label{cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toggle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-toggle\">\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'before'\">{{label}}</label>\n\n    <div class=\"bizy-toggle__slide\">\n        <input \n            #bizyToggleInput\n            id=\"{{id}}\"\n            type=\"checkbox\"\n            (change)=\"onSelect.emit(!_checked)\"\n            class=\"bizy-toggle__slide__checkbox\"\n            [ngClass]=\"{'bizy-toggle__slide__checkbox--disabled': disabled}\">\n        <div class=\"bizy-toggle__slide__knobs\"></div>\n        <div class=\"bizy-toggle__slide__layer\"></div>\n    </div>\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'after'\">{{label}}</label>\n    \n</div>", styles: [".bizy-toggle{display:flex;width:-moz-fit-content;width:fit-content;column-gap:.5rem;align-items:center}.bizy-toggle__slide{position:relative;width:3rem;height:1.6rem}.bizy-toggle__slide__layer{border-radius:100px}.bizy-toggle__slide__checkbox{position:relative;width:100%;height:100%;padding:0;margin:0;opacity:0;cursor:pointer;z-index:3}.bizy-toggle__slide__knobs,.bizy-toggle__slide__layer{position:absolute;inset:0}.bizy-toggle__slide__knobs{z-index:2}.bizy-toggle__slide__knobs:before{content:\"\";position:absolute;top:.15rem;left:.15rem;width:1.3rem;height:1.3rem;color:#fff;padding:.6rem .5rem;background-color:var(--bizy-toggle-off-color);border-radius:50%;transition:.3s cubic-bezier(.18,.89,.35,1.15) all}.bizy-toggle__slide__layer{background-color:var(--bizy-toggle-off-background-color);transition:.3s ease all;z-index:1;position:relative;top:-1.45rem;width:2.2rem;height:.6rem;left:.6rem}.bizy-toggle__slide__checkbox:checked+.bizy-toggle__slide__knobs:before{content:\"\";left:2rem;background-color:var(--bizy-toggle-on-color)}.bizy-toggle__slide__checkbox:checked~.bizy-toggle__slide__layer{width:2.2rem;height:.6rem;background-color:var(--bizy-toggle-on-background-color);position:relative;top:-1.45rem;left:.6rem}.bizy-toggle__slide__knobs,.bizy-toggle__slide__knobs:before,.bizy-toggle__slide__layer{transition:.3s ease all}.bizy-toggle__slide__checkbox--disabled{pointer-events:none;cursor:default}.bizy-toggle__label{cursor:pointer}\n"] }]
        }], ctorParameters: () => [{ type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }], propDecorators: { bizyToggleInput: [{
                type: ViewChild,
                args: ['bizyToggleInput']
            }], id: [{
                type: Input
            }], label: [{
                type: Input
            }], labelPosition: [{
                type: Input
            }], disabled: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], valueChange: [{
                type: Output
            }], checked: [{
                type: Input
            }] } });

const COMPONENTS$4 = [
    ToggleComponent,
];
class ToggleModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ToggleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.9", ngImport: i0, type: ToggleModule, declarations: [ToggleComponent], imports: [CommonModule, FormsModule], exports: [ToggleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ToggleModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ToggleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$4,
                    exports: COMPONENTS$4
                }]
        }] });

class ButtonComponent {
    id = String(Math.random());
    disabled = false;
    type = 'button';
    customClass;
    options = [];
    opened = false;
    selected = false;
    onSelect = new EventEmitter();
    _menuWidth;
    selectButton(event) {
        if (!this.options || this.options.length === 0) {
            return;
        }
        this.opened = !this.opened;
        this.selected = !this.selected;
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._menuWidth = event.srcElement.offsetWidth;
        }
    }
    selectOption(option, event) {
        if (option.options && option.options.length > 0) {
            if (event && event.srcElement && event.srcElement.offsetWidth) {
                option._menuWidth = event.srcElement.offsetWidth;
            }
            option.opened = !option.opened;
            option.selected = !option.selected;
        }
        else {
            this.closeAll();
        }
        if (option.onSelect) {
            option.onSelect();
        }
    }
    closeAll() {
        this.options.forEach(_option => {
            if (_option.options && _option.options.length > 0) {
                _option.options.forEach(__option => {
                    __option.selected = false;
                    __option.opened = false;
                });
            }
            _option.selected = false;
            _option.opened = false;
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.9", type: ButtonComponent, selector: "bizy-button", inputs: { id: "id", disabled: "disabled", type: "type", customClass: "customClass", options: "options", opened: "opened", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    [type]=\"type\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-toolbar__option--opened': opened, 'bizy-toolbar__option--selected': selected}\"\n    (click)=\"onSelect.emit($event); selectButton($event)\"\n    (keyup.enter)=\"onSelect.emit($event); selectButton($event)\"\n    cdkOverlayOrigin \n    #bizyButtonTrigger=\"cdkOverlayOrigin\">\n    <span class=\"bizy-button__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <svg \n        *ngIf=\"options && options.length > 0\" \n        class=\"bizy-button__option__content bizy-button__svg\"\n        [ngClass]=\"{'bizy-button--opened': opened, 'bizy-button--closed': !opened}\"\n        viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z\"/>\n        <path d=\"M0 0h48v48h-48z\" fill=\"none\"/>\n    </svg>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    (overlayOutsideClick)=\"closeAll();\"\n    [cdkConnectedOverlayOrigin]=\"bizyButtonTrigger\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n    <span class=\"bizy-button__option-menu\">\n\n        <ng-container *ngFor=\"let option of options\">\n\n            <button \n                cdkOverlayOrigin #subOptionTrigger=\"cdkOverlayOrigin\"\n                type=\"button\"\n                class=\"bizy-button__option\"\n                [ngClass]=\"{'bizy-button__option--opened': option.opened, 'bizy-button__option--selected': option.selected}\"\n                (click)=\"selectOption(option, $event)\"\n                (keyup.enter)=\"selectOption(option, $event)\">\n                <span class=\"bizy-button__content\">\n\n                    <div \n                        *ngIf=\"option.icon\"\n                        class=\"bizy-button__option__content\"\n                        [customClass]=\"option.customClass\"\n                        [innerHTML]=\"option.icon\">\n                    </div>\n\n                    <h4 *ngIf=\"option.label\" class=\"bizy-button__option__content bizy-button__option__label\">{{option.label}}</h4>\n                </span>\n\n                <svg \n                    *ngIf=\"option.options && option.options.length > 0\"\n                    class=\"bizy-button__option__content bizy-button__svg\"\n                    [ngClass]=\"{'bizy-button--opened': option.opened, 'bizy-button--closed': !option.opened}\"\n                    viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z\"/>\n                    <path d=\"M0 0h48v48h-48z\" fill=\"none\"/>\n                </svg>\n\n            </button>\n    \n            <ng-template\n                cdkConnectedOverlay\n                [cdkConnectedOverlayMinWidth]=\"option._menuWidth\"\n                [cdkConnectedOverlayOrigin]=\"subOptionTrigger\"\n                [cdkConnectedOverlayOpen]=\"option.opened\">\n                <span class=\"bizy-button__option-menu\">\n    \n                    <ng-container *ngFor=\"let _option of option.options\">\n\n                        <button \n                            type=\"button\"\n                            class=\"bizy-button__option\"\n                            (click)=\"selectOption(_option, $event)\"\n                            (keyup.enter)=\"selectOption(_option, $event)\">\n                            <span class=\"bizy-button__content\">\n\n                                <div \n                                    *ngIf=\"_option.icon\"\n                                    class=\"bizy-button__option__content\"\n                                    [customClass]=\"_option.customClass\"\n                                    [innerHTML]=\"_option.icon\">\n                                </div>\n\n                                <h4 *ngIf=\"_option.label\" class=\"bizy-button__option__content bizy-button__option__label\">{{_option.label}}</h4>\n                            </span>\n                        </button>\n                \n                    </ng-container>\n                    \n                </span>\n            </ng-template>\n    \n        </ng-container>\n\n    </span>\n</ng-template>\n", styles: [".bizy-button{display:flex;justify-content:space-between;align-items:center;column-gap:.5rem;width:max-content;padding:.6rem .8rem;border-radius:.3rem;color:#fff;border:none;cursor:pointer}.bizy-button:hover{filter:brightness(95%)}.bizy-button:disabled{opacity:.6;cursor:not-allowed;background-color:inherit}.bizy-button__content{width:100%;display:flex;column-gap:.3rem;pointer-events:none}.bizy-button--opened{transition:transform .2s;transform:rotate(180deg)}.bizy-button--closed{transition:transform .2s}.bizy-button__option{border:none;height:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;cursor:pointer;color:var(--bizy-button-option-color)!important;background-color:var(--bizy-button-option-background-color)!important}.bizy-button__option__content{pointer-events:none}.bizy-button__svg{height:1rem}.bizy-button__option__label{color:var(--bizy-button-option-color)!important}.bizy-button__option:hover:not(.bizy-button__option--selected){color:var(--bizy-button-option-hover-color)!important;background-color:var(--bizy-button-option-hover-background-color)!important}.bizy-button__option:hover:not(.bizy-button__option--selected) .bizy-button__option__label{color:var(--bizy-button-option-hover-color)!important}.bizy-button__option--opened:not(.bizy-button__option--selected){color:var(--bizy-button-option-hover-color)!important;background-color:var(--bizy-button-option-hover-background-color)!important}.bizy-button__option--opened:not(.bizy-button__option--selected) .bizy-button__option__label{color:var(--bizy-button-option-hover-color)!important}.bizy-button__option--selected{color:var(--bizy-button-option-selected-color)!important;background-color:var(--bizy-button-option-selected-background-color)!important}.bizy-button__option--selected .bizy-button__option__label{color:var(--bizy-button-option-selected-color)!important}.bizy-button__option-menu{background-color:var(--bizy-button-option-hover-background-color)!important;display:flex;flex-direction:column;row-gap:.3rem;align-items:flex-start;width:100%;min-width:-moz-fit-content;min-width:fit-content;border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem;margin-top:.2rem}.bizy-button__option-menu .bizy-button__option{width:100%!important;border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem}.bizy-button__option-menu .bizy-button__option:not(.bizy-button__option--selected){color:var(--bizy-button-option-hover-color)!important;background-color:transparent!important}.bizy-button__option-menu .bizy-button__option:not(.bizy-button__option--selected) .bizy-button__option__label{color:var(--bizy-button-option-hover-color)!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    [type]=\"type\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-toolbar__option--opened': opened, 'bizy-toolbar__option--selected': selected}\"\n    (click)=\"onSelect.emit($event); selectButton($event)\"\n    (keyup.enter)=\"onSelect.emit($event); selectButton($event)\"\n    cdkOverlayOrigin \n    #bizyButtonTrigger=\"cdkOverlayOrigin\">\n    <span class=\"bizy-button__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <svg \n        *ngIf=\"options && options.length > 0\" \n        class=\"bizy-button__option__content bizy-button__svg\"\n        [ngClass]=\"{'bizy-button--opened': opened, 'bizy-button--closed': !opened}\"\n        viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z\"/>\n        <path d=\"M0 0h48v48h-48z\" fill=\"none\"/>\n    </svg>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    (overlayOutsideClick)=\"closeAll();\"\n    [cdkConnectedOverlayOrigin]=\"bizyButtonTrigger\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n    <span class=\"bizy-button__option-menu\">\n\n        <ng-container *ngFor=\"let option of options\">\n\n            <button \n                cdkOverlayOrigin #subOptionTrigger=\"cdkOverlayOrigin\"\n                type=\"button\"\n                class=\"bizy-button__option\"\n                [ngClass]=\"{'bizy-button__option--opened': option.opened, 'bizy-button__option--selected': option.selected}\"\n                (click)=\"selectOption(option, $event)\"\n                (keyup.enter)=\"selectOption(option, $event)\">\n                <span class=\"bizy-button__content\">\n\n                    <div \n                        *ngIf=\"option.icon\"\n                        class=\"bizy-button__option__content\"\n                        [customClass]=\"option.customClass\"\n                        [innerHTML]=\"option.icon\">\n                    </div>\n\n                    <h4 *ngIf=\"option.label\" class=\"bizy-button__option__content bizy-button__option__label\">{{option.label}}</h4>\n                </span>\n\n                <svg \n                    *ngIf=\"option.options && option.options.length > 0\"\n                    class=\"bizy-button__option__content bizy-button__svg\"\n                    [ngClass]=\"{'bizy-button--opened': option.opened, 'bizy-button--closed': !option.opened}\"\n                    viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z\"/>\n                    <path d=\"M0 0h48v48h-48z\" fill=\"none\"/>\n                </svg>\n\n            </button>\n    \n            <ng-template\n                cdkConnectedOverlay\n                [cdkConnectedOverlayMinWidth]=\"option._menuWidth\"\n                [cdkConnectedOverlayOrigin]=\"subOptionTrigger\"\n                [cdkConnectedOverlayOpen]=\"option.opened\">\n                <span class=\"bizy-button__option-menu\">\n    \n                    <ng-container *ngFor=\"let _option of option.options\">\n\n                        <button \n                            type=\"button\"\n                            class=\"bizy-button__option\"\n                            (click)=\"selectOption(_option, $event)\"\n                            (keyup.enter)=\"selectOption(_option, $event)\">\n                            <span class=\"bizy-button__content\">\n\n                                <div \n                                    *ngIf=\"_option.icon\"\n                                    class=\"bizy-button__option__content\"\n                                    [customClass]=\"_option.customClass\"\n                                    [innerHTML]=\"_option.icon\">\n                                </div>\n\n                                <h4 *ngIf=\"_option.label\" class=\"bizy-button__option__content bizy-button__option__label\">{{_option.label}}</h4>\n                            </span>\n                        </button>\n                \n                    </ng-container>\n                    \n                </span>\n            </ng-template>\n    \n        </ng-container>\n\n    </span>\n</ng-template>\n", styles: [".bizy-button{display:flex;justify-content:space-between;align-items:center;column-gap:.5rem;width:max-content;padding:.6rem .8rem;border-radius:.3rem;color:#fff;border:none;cursor:pointer}.bizy-button:hover{filter:brightness(95%)}.bizy-button:disabled{opacity:.6;cursor:not-allowed;background-color:inherit}.bizy-button__content{width:100%;display:flex;column-gap:.3rem;pointer-events:none}.bizy-button--opened{transition:transform .2s;transform:rotate(180deg)}.bizy-button--closed{transition:transform .2s}.bizy-button__option{border:none;height:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;cursor:pointer;color:var(--bizy-button-option-color)!important;background-color:var(--bizy-button-option-background-color)!important}.bizy-button__option__content{pointer-events:none}.bizy-button__svg{height:1rem}.bizy-button__option__label{color:var(--bizy-button-option-color)!important}.bizy-button__option:hover:not(.bizy-button__option--selected){color:var(--bizy-button-option-hover-color)!important;background-color:var(--bizy-button-option-hover-background-color)!important}.bizy-button__option:hover:not(.bizy-button__option--selected) .bizy-button__option__label{color:var(--bizy-button-option-hover-color)!important}.bizy-button__option--opened:not(.bizy-button__option--selected){color:var(--bizy-button-option-hover-color)!important;background-color:var(--bizy-button-option-hover-background-color)!important}.bizy-button__option--opened:not(.bizy-button__option--selected) .bizy-button__option__label{color:var(--bizy-button-option-hover-color)!important}.bizy-button__option--selected{color:var(--bizy-button-option-selected-color)!important;background-color:var(--bizy-button-option-selected-background-color)!important}.bizy-button__option--selected .bizy-button__option__label{color:var(--bizy-button-option-selected-color)!important}.bizy-button__option-menu{background-color:var(--bizy-button-option-hover-background-color)!important;display:flex;flex-direction:column;row-gap:.3rem;align-items:flex-start;width:100%;min-width:-moz-fit-content;min-width:fit-content;border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem;margin-top:.2rem}.bizy-button__option-menu .bizy-button__option{width:100%!important;border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem}.bizy-button__option-menu .bizy-button__option:not(.bizy-button__option--selected){color:var(--bizy-button-option-hover-color)!important;background-color:transparent!important}.bizy-button__option-menu .bizy-button__option:not(.bizy-button__option--selected) .bizy-button__option__label{color:var(--bizy-button-option-hover-color)!important}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], customClass: [{
                type: Input
            }], options: [{
                type: Input
            }], opened: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$3 = [
    ButtonComponent,
];
class ButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.9", ngImport: i0, type: ButtonModule, declarations: [ButtonComponent], imports: [CommonModule, FormsModule, OverlayModule], exports: [ButtonComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ButtonModule, imports: [CommonModule, FormsModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule],
                    declarations: COMPONENTS$3,
                    exports: COMPONENTS$3
                }]
        }] });

class ConfirmButtonsComponent {
    componentRef;
    renderer;
    confirmLabel = 'Confirmar';
    cancelLabel = 'Cancelar';
    fixed = false;
    disabled = false;
    cancel = new EventEmitter();
    confirm = new EventEmitter();
    constructor(componentRef, renderer) {
        this.componentRef = componentRef;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.renderer.setStyle(this.componentRef.nativeElement, 'position', 'sticky');
        this.renderer.setStyle(this.componentRef.nativeElement, 'bottom', '0');
        this.renderer.setStyle(this.componentRef.nativeElement, 'left', '0');
        this.renderer.setStyle(this.componentRef.nativeElement, 'right', '0');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ConfirmButtonsComponent, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.9", type: ConfirmButtonsComponent, selector: "bizy-confirm-buttons", inputs: { confirmLabel: "confirmLabel", cancelLabel: "cancelLabel", fixed: "fixed", disabled: "disabled" }, outputs: { cancel: "cancel", confirm: "confirm" }, ngImport: i0, template: "<div class=\"bizy-confirm-buttons\" [ngClass]=\"{'bizy-confirm-buttons--fixed': fixed}\">\n\n    <bizy-button \n        customClass=\"bizy-confirm-buttons__cancel-button\"\n        [disabled]=\"disabled\"\n        type=\"button\"\n        (onSelect)=\"cancel.emit()\">\n        <svg \n            data-name=\"Cancel button\"\n            class=\"bizy-confirm-buttons__svg\"\n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__cancel-button__svg__content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n        <h4 class=\"bizy-confirm-buttons__cancel-button__label\">{{cancelLabel}}</h4>\n    </bizy-button>\n\n    <bizy-button \n        customClass=\"bizy-confirm-buttons__confirm-button\"\n        [disabled]=\"disabled\"\n        type=\"submit\"\n        (onSelect)=\"confirm.emit()\">\n        <h4 class=\"bizy-confirm-buttons__confirm-button__label\">{{confirmLabel}}</h4>\n        \n        <svg \n            viewBox=\"0 0 512 512\"\n            class=\"bizy-confirm-buttons__svg\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__confirm-button__svg__content\" d=\"M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z\"/>\n        </svg>\n\n    </bizy-button>\n\n</div>", styles: [".bizy-confirm-buttons{background-color:transparent;height:auto;display:flex;align-items:center;justify-content:space-evenly;column-gap:1rem;width:100%}.bizy-confirm-buttons--fixed{position:fixed;bottom:0;right:0;left:0}::ng-deep .bizy-confirm-buttons__confirm-button{background-color:var(--bizy-confirm-buttons-confirm-background-color)!important}::ng-deep .bizy-confirm-buttons__cancel-button{background-color:var(--bizy-confirm-buttons-cancel-background-color)!important}.bizy-confirm-buttons__svg{height:1rem}.bizy-confirm-buttons__cancel-button__svg__content{fill:var(--bizy-confirm-buttons-cancel-color)}.bizy-confirm-buttons__cancel-button__label{color:var(--bizy-confirm-buttons-cancel-color)}.bizy-confirm-buttons__confirm-button__svg__content{fill:var(--bizy-confirm-buttons-confirm-color)}.bizy-confirm-buttons__confirm-button__label{color:var(--bizy-confirm-buttons-confirm-color)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: ButtonComponent, selector: "bizy-button", inputs: ["id", "disabled", "type", "customClass", "options", "opened", "selected"], outputs: ["onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ConfirmButtonsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-confirm-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-confirm-buttons\" [ngClass]=\"{'bizy-confirm-buttons--fixed': fixed}\">\n\n    <bizy-button \n        customClass=\"bizy-confirm-buttons__cancel-button\"\n        [disabled]=\"disabled\"\n        type=\"button\"\n        (onSelect)=\"cancel.emit()\">\n        <svg \n            data-name=\"Cancel button\"\n            class=\"bizy-confirm-buttons__svg\"\n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__cancel-button__svg__content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n        <h4 class=\"bizy-confirm-buttons__cancel-button__label\">{{cancelLabel}}</h4>\n    </bizy-button>\n\n    <bizy-button \n        customClass=\"bizy-confirm-buttons__confirm-button\"\n        [disabled]=\"disabled\"\n        type=\"submit\"\n        (onSelect)=\"confirm.emit()\">\n        <h4 class=\"bizy-confirm-buttons__confirm-button__label\">{{confirmLabel}}</h4>\n        \n        <svg \n            viewBox=\"0 0 512 512\"\n            class=\"bizy-confirm-buttons__svg\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__confirm-button__svg__content\" d=\"M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z\"/>\n        </svg>\n\n    </bizy-button>\n\n</div>", styles: [".bizy-confirm-buttons{background-color:transparent;height:auto;display:flex;align-items:center;justify-content:space-evenly;column-gap:1rem;width:100%}.bizy-confirm-buttons--fixed{position:fixed;bottom:0;right:0;left:0}::ng-deep .bizy-confirm-buttons__confirm-button{background-color:var(--bizy-confirm-buttons-confirm-background-color)!important}::ng-deep .bizy-confirm-buttons__cancel-button{background-color:var(--bizy-confirm-buttons-cancel-background-color)!important}.bizy-confirm-buttons__svg{height:1rem}.bizy-confirm-buttons__cancel-button__svg__content{fill:var(--bizy-confirm-buttons-cancel-color)}.bizy-confirm-buttons__cancel-button__label{color:var(--bizy-confirm-buttons-cancel-color)}.bizy-confirm-buttons__confirm-button__svg__content{fill:var(--bizy-confirm-buttons-confirm-color)}.bizy-confirm-buttons__confirm-button__label{color:var(--bizy-confirm-buttons-confirm-color)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }], propDecorators: { confirmLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], fixed: [{
                type: Input
            }], disabled: [{
                type: Input
            }], cancel: [{
                type: Output
            }], confirm: [{
                type: Output
            }] } });

const COMPONENTS$2 = [
    ConfirmButtonsComponent,
];
class ConfirmButtonsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ConfirmButtonsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.9", ngImport: i0, type: ConfirmButtonsModule, declarations: [ConfirmButtonsComponent], imports: [CommonModule, FormsModule, ButtonModule], exports: [ConfirmButtonsComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ConfirmButtonsModule, imports: [CommonModule, FormsModule, ButtonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ConfirmButtonsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ButtonModule],
                    declarations: COMPONENTS$2,
                    exports: COMPONENTS$2
                }]
        }] });

class VirtualScrollGridDirective {
    elRef;
    renderer;
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
        this.renderer.setStyle(this.elRef.nativeElement, 'gap', '1em');
        this.renderer.setStyle(this.elRef.nativeElement, 'marginBottom', '1em');
        const notifier = new Subject();
        const check = interval(100);
        check.pipe(takeUntil(notifier)).subscribe(() => {
            if (this.elRef.nativeElement.offsetParent) {
                notifier.next();
                notifier.complete();
                const bizyVirtualScrollComponent = this.elRef.nativeElement.offsetParent.offsetParent.parentElement.parentElement;
                let itemMinHeight = bizyVirtualScrollComponent.getAttribute('itemminheight');
                if (!itemMinHeight.includes('em') && !itemMinHeight.includes('rem') && !itemMinHeight.includes('px')) {
                    itemMinHeight = `${itemMinHeight}px`;
                }
                let itemMinWidth = bizyVirtualScrollComponent.getAttribute('itemminwidth');
                if (!itemMinWidth.includes('em') && !itemMinWidth.includes('rem') && !itemMinWidth.includes('px')) {
                    itemMinWidth = `${itemMinWidth}px`;
                }
                if (itemMinWidth.includes('rem')) {
                    const fontSize = window.getComputedStyle(this.elRef.nativeElement, null).getPropertyValue('font-size');
                    if (fontSize) {
                        itemMinWidth = `${Number(itemMinWidth.split('rem')[0])}em`;
                    }
                }
                this.renderer.setStyle(this.elRef.nativeElement, 'gridTemplateColumns', `repeat(auto-fill, minmax(${itemMinWidth}, 1fr))`);
                this.renderer.setStyle(this.elRef.nativeElement, 'gridTemplateRows', itemMinHeight);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollGridDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.9", type: VirtualScrollGridDirective, selector: "[virtualScrollGrid]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualScrollGrid]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }] });

class VirtualScrollNgForDirective {
    template;
    _items = new BehaviorSubject([]);
    get items() {
        return this._items.asObservable();
    }
    set virtualNgForIn(items) {
        this._items.next(items);
    }
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollNgForDirective, deps: [{ token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.9", type: VirtualScrollNgForDirective, selector: "[virtualNgFor]", inputs: { virtualNgForIn: "virtualNgForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollNgForDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualNgFor]'
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }], propDecorators: { virtualNgForIn: [{
                type: Input
            }] } });

const MIN_VIRTUAL_SCROLL_WIDTH = 300;
class VirtualScrollComponent {
    elementRef;
    ref;
    virtualFor;
    itemMinHeight;
    itemMinWidth;
    emptyText = 'Sin elementos para mostrar';
    viewportHeight; // css height value  
    virtualScrollItems = [];
    itemsByRow;
    items;
    _itemMinHeight;
    bizyVirtualScrollWidth;
    notifier$ = new Subject();
    _resizeObserver;
    _subscription = new Subscription();
    constructor(elementRef, ref) {
        this.elementRef = elementRef;
        this.ref = ref;
    }
    ngOnInit() {
        if (this.#isString(this.itemMinHeight) && this.itemMinHeight.includes('rem')) {
            this._itemMinHeight = Number(this.itemMinHeight.split('rem')[0]) * 14; // 14 font size aprox
        }
        else {
            this._itemMinHeight = this.itemMinHeight;
        }
    }
    ngAfterViewInit() {
        setTimeout(() => {
            const finishInterval$ = new Subject();
            interval(50).pipe(takeUntil(finishInterval$)).subscribe(() => {
                const virtualScrollWidth = this.elementRef.nativeElement.offsetWidth;
                if (virtualScrollWidth) {
                    finishInterval$.next();
                    finishInterval$.complete();
                    this.bizyVirtualScrollWidth = virtualScrollWidth;
                    this._subscription.add(this.virtualFor.items.subscribe(items => {
                        if (items) {
                            if (items.length > 0) {
                                this.items = items;
                                this.fillVirtualScroll();
                                if (!this._resizeObserver) {
                                    this._resizeObserver = new ResizeObserver(() => this.notifier$.next());
                                    this._resizeObserver.observe(this.elementRef.nativeElement.parentElement?.parentElement);
                                    this._subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
                                        if (this.elementRef.nativeElement.offsetWidth) {
                                            this.bizyVirtualScrollWidth = this.elementRef.nativeElement.offsetWidth;
                                            this.fillVirtualScroll();
                                        }
                                    }));
                                }
                            }
                            else {
                                this.virtualScrollItems = [];
                            }
                        }
                    }));
                }
            });
        }, 1);
    }
    fillVirtualScroll = () => {
        if (this.bizyVirtualScrollWidth < MIN_VIRTUAL_SCROLL_WIDTH) {
            this.itemsByRow = 1;
        }
        else {
            const fontSize = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size');
            const gridGap = Number(fontSize.split('px')[0]) || 14;
            let itemMinWidth = 1;
            if (this.#isString(this.itemMinWidth)) {
                if (this.itemMinWidth.includes('rem')) {
                    itemMinWidth = Number(this.itemMinWidth.split('rem')[0]) * gridGap;
                }
                else if (this.itemMinWidth.includes('em')) {
                    itemMinWidth = Number(this.itemMinWidth.split('em')[0]) * gridGap;
                }
            }
            else {
                itemMinWidth = this.itemMinWidth;
            }
            const count = Math.trunc(this.bizyVirtualScrollWidth / (itemMinWidth));
            if (((gridGap * (count - 1)) + (itemMinWidth * count)) <= (this.bizyVirtualScrollWidth)) {
                this.itemsByRow = count;
            }
            else {
                this.itemsByRow = count - 1;
            }
        }
        this.#setItems();
    };
    #setItems = () => {
        const array = [];
        const itemsLength = this.items.length;
        let i;
        for (i = 0; i < itemsLength; i++) {
            array.push(this.items.slice(i, i + this.itemsByRow));
            i += this.itemsByRow - 1;
        }
        this.virtualScrollItems.length = 0;
        this.virtualScrollItems = array;
        this.ref.detectChanges();
    };
    #isString(string) {
        return typeof string === 'string' || string instanceof String;
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.9", type: VirtualScrollComponent, selector: "bizy-virtual-scroll", inputs: { itemMinHeight: "itemMinHeight", itemMinWidth: "itemMinWidth", emptyText: "emptyText", viewportHeight: "viewportHeight" }, queries: [{ propertyName: "virtualFor", first: true, predicate: VirtualScrollNgForDirective, descendants: true }], ngImport: i0, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems.length !== 0\"\n    class=\"bizy-virtual-scroll\"\n    [itemSize]=\"_itemMinHeight\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n  <span *ngIf=\"virtualScrollItems.length === 0\" class=\"bizy-virtual-scroll--empty\">{{emptyText}}</span>\n\n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1em;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--empty{min-height:6rem;font-size:1.4rem;display:grid;place-items:center;text-align:center}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2$1.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2$1.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2$1.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-virtual-scroll', template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems.length !== 0\"\n    class=\"bizy-virtual-scroll\"\n    [itemSize]=\"_itemMinHeight\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n  <span *ngIf=\"virtualScrollItems.length === 0\" class=\"bizy-virtual-scroll--empty\">{{emptyText}}</span>\n\n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1em;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--empty{min-height:6rem;font-size:1.4rem;display:grid;place-items:center;text-align:center}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { virtualFor: [{
                type: ContentChild,
                args: [VirtualScrollNgForDirective]
            }], itemMinHeight: [{
                type: Input
            }], itemMinWidth: [{
                type: Input
            }], emptyText: [{
                type: Input
            }], viewportHeight: [{
                type: Input
            }] } });

class VirtualScrollModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollModule, declarations: [VirtualScrollComponent,
            VirtualScrollGridDirective,
            VirtualScrollNgForDirective], imports: [CommonModule, ScrollingModule], exports: [VirtualScrollComponent,
            VirtualScrollGridDirective,
            VirtualScrollNgForDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollModule, imports: [CommonModule, ScrollingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ScrollingModule],
                    declarations: [
                        VirtualScrollComponent,
                        VirtualScrollGridDirective,
                        VirtualScrollNgForDirective,
                    ],
                    exports: [
                        VirtualScrollComponent,
                        VirtualScrollGridDirective,
                        VirtualScrollNgForDirective,
                    ],
                }]
        }] });

class InputComponent {
    ref;
    bizyInput;
    id = `bizy-input-${Math.random()}`;
    disabled = false;
    readonly = false;
    multiple = false;
    clear = true;
    autoFocus = true;
    autoCapitalize = false;
    autoCorrect = false;
    browserAutoComplete = true;
    type = 'text';
    label = '';
    max;
    maxLength;
    min;
    minLength;
    control;
    placeholder = '';
    cancelLabel = 'Cancelar';
    confirmLabel = 'Confirmar';
    customClass;
    onFocus = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    onInput = (event) => {
        if (!event || !event.target) {
            return;
        }
        this.control.markAsTouched();
        this.control.setValue(event.target.value ?? null);
        this.ref.detectChanges();
    };
    onBlur() {
        this.control.markAsTouched();
    }
    focus() {
        if (!this.bizyInput || !this.bizyInput.setFocus) {
            return;
        }
        this.bizyInput.setFocus();
    }
    cancel(modal, dateTime) {
        if (!modal || !dateTime) {
            return;
        }
        dateTime.cancel();
        modal.dismiss();
    }
    confirm(modal, dateTime) {
        if (!modal || !dateTime || !dateTime.value) {
            return;
        }
        dateTime.confirm();
        setTimeout(() => {
            this.onInput({ target: { value: String(dateTime.value) } });
            modal.dismiss();
        }, 1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: InputComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.9", type: InputComponent, selector: "bizy-input", inputs: { id: "id", disabled: "disabled", readonly: "readonly", multiple: "multiple", clear: "clear", autoFocus: "autoFocus", autoCapitalize: "autoCapitalize", autoCorrect: "autoCorrect", browserAutoComplete: "browserAutoComplete", type: "type", label: "label", max: "max", maxLength: "maxLength", min: "min", minLength: "minLength", control: "control", placeholder: "placeholder", cancelLabel: "cancelLabel", confirmLabel: "confirmLabel", customClass: "customClass" }, outputs: { onFocus: "onFocus" }, viewQueries: [{ propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<ion-input \n    #bizyInput\n    *ngIf=\"type !== 'date' && type !== 'date-time' && type !== 'time' && type !== 'month-year' && type !== 'year' && type !== 'month' && type !== 'search'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    [type]=\"type\"\n    [inputmode]=\"type\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly\"\n    [value]=\"control?.value\"\n    [spellcheck]=\"true\"\n    [autocapitalize]=\"autoCapitalize ? 'on' : 'off'\"\n    [autocorrect]=\"autoCorrect ? 'on' : 'off'\"\n    [autocomplete]=\"browserAutoComplete ? 'on' : 'off'\"\n    [autofocus]=\"autoFocus\"\n    fill=\"solid\"\n    [max]=\"max\"\n    [maxlength]=\"maxLength\"\n    [min]=\"min\"\n    [minlength]=\"minLength\"\n    [debounce]=\"300\"\n    (ionBlur)=\"onBlur()\"\n    (ionInput)=\"onInput($event)\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <div slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></div>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<ion-input \n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    type=\"text\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"true\"\n    [value]=\"control?.value | date : (type === 'date' ? 'dd/MM/yyyy' : type === 'date-time' ? 'dd/MM/yyyy hh:mm' : type === 'time' ? 'hh:mm' : type === 'month-year' ? 'MMMM yyyy' : type === 'year' ? 'yyyy' : 'MMMM')\"\n    fill=\"solid\"\n    (ionBlur)=\"onBlur()\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <div slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></div>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<span class=\"bizy-input__errors\" *ngIf=\"control && control.touched && control.invalid\">\n    <ng-content select=\"[input-error]\"></ng-content>\n</span>\n\n<ion-modal \n    #bizyInputDateTimeModal\n    trigger=\"{{id}}\"\n    class=\"bizy-date-input\"\n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\">\n    <ng-template>\n\n        <ion-datetime \n            #bizyInputDateTime\n            [presentation]=\"type\" \n            [firstDayOfWeek]=\"1\"\n            [min]=\"min\"\n            [max]=\"max\"\n            locale=\"es-AR\"\n            hourCycle=\"h24\"\n            [showDefaultButtons]=\"true\"\n            [cancelText]=\"cancelLabel\"\n            [doneText]=\"confirmLabel\"\n            [value]=\"control?.value\">\n\n            <bizy-confirm-buttons\n                slot=\"buttons\"\n                (cancel)=\"cancel(bizyInputDateTimeModal, bizyInputDateTime)\"\n                (confirm)=\"confirm(bizyInputDateTimeModal, bizyInputDateTime)\">\n            </bizy-confirm-buttons>\n        </ion-datetime>\n\n    </ng-template>\n</ion-modal>\n\n", styles: ["::ng-deep .bizy-input{--color: var(--bizy-input-color) !important;--background: var(--bizy-input-background-color) !important;--placeholder-color: var(--bizy-input-placeholder-color) !important;--placeholder-opacity: .8 !important;--padding-start: .3rem !important;--padding-end: .3rem !important;--inner-padding-end: 0 !important;--border-radius: .3rem .3rem 0 0 !important;border-bottom:.1rem solid var(--bizy-input-color)}::ng-deep .bizy-input__errors{margin-top:.5rem;display:flex;flex-direction:column;row-gap:.3rem}::ng-deep .bizy-input--error{border-bottom-color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input--error [slot=label]{color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input [slot=label]{color:var(--bizy-input-label-color)}::ng-deep .bizy-input [slot=start]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .bizy-input [slot=end]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .input-clear-icon.sc-ion-input-ios{width:auto!important;height:auto!important}::ng-deep .bizy-date-input{--width: auto !important;--height: auto !important}::ng-deep ion-datetime{--ion-color-base: var(--bizy-input-date-color);--ion-color-contrast: var(--bizy-input-date-contrast-color) !important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$2.IonDatetime, selector: "ion-datetime", inputs: ["cancelText", "clearText", "color", "dayValues", "disabled", "doneText", "firstDayOfWeek", "highlightedDates", "hourCycle", "hourValues", "isDateEnabled", "locale", "max", "min", "minuteValues", "mode", "monthValues", "multiple", "name", "preferWheel", "presentation", "readonly", "showClearButton", "showDefaultButtons", "showDefaultTimeLabel", "showDefaultTitle", "size", "titleSelectedDatesFormatter", "value", "yearValues"] }, { kind: "component", type: i2$2.IonInput, selector: "ion-input", inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "legacy", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "size", "spellcheck", "step", "type", "value"] }, { kind: "component", type: i2$2.IonModal, selector: "ion-modal" }, { kind: "directive", type: i2$2.SelectValueAccessor, selector: "ion-select, ion-radio-group, ion-segment, ion-datetime" }, { kind: "directive", type: i2$2.TextValueAccessor, selector: "ion-input:not([type=number]),ion-textarea,ion-searchbar,ion-range" }, { kind: "component", type: ConfirmButtonsComponent, selector: "bizy-confirm-buttons", inputs: ["confirmLabel", "cancelLabel", "fixed", "disabled"], outputs: ["cancel", "confirm"] }, { kind: "pipe", type: i1.DatePipe, name: "date" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ion-input \n    #bizyInput\n    *ngIf=\"type !== 'date' && type !== 'date-time' && type !== 'time' && type !== 'month-year' && type !== 'year' && type !== 'month' && type !== 'search'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    [type]=\"type\"\n    [inputmode]=\"type\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly\"\n    [value]=\"control?.value\"\n    [spellcheck]=\"true\"\n    [autocapitalize]=\"autoCapitalize ? 'on' : 'off'\"\n    [autocorrect]=\"autoCorrect ? 'on' : 'off'\"\n    [autocomplete]=\"browserAutoComplete ? 'on' : 'off'\"\n    [autofocus]=\"autoFocus\"\n    fill=\"solid\"\n    [max]=\"max\"\n    [maxlength]=\"maxLength\"\n    [min]=\"min\"\n    [minlength]=\"minLength\"\n    [debounce]=\"300\"\n    (ionBlur)=\"onBlur()\"\n    (ionInput)=\"onInput($event)\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <div slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></div>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<ion-input \n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    type=\"text\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"true\"\n    [value]=\"control?.value | date : (type === 'date' ? 'dd/MM/yyyy' : type === 'date-time' ? 'dd/MM/yyyy hh:mm' : type === 'time' ? 'hh:mm' : type === 'month-year' ? 'MMMM yyyy' : type === 'year' ? 'yyyy' : 'MMMM')\"\n    fill=\"solid\"\n    (ionBlur)=\"onBlur()\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <div slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></div>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<span class=\"bizy-input__errors\" *ngIf=\"control && control.touched && control.invalid\">\n    <ng-content select=\"[input-error]\"></ng-content>\n</span>\n\n<ion-modal \n    #bizyInputDateTimeModal\n    trigger=\"{{id}}\"\n    class=\"bizy-date-input\"\n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\">\n    <ng-template>\n\n        <ion-datetime \n            #bizyInputDateTime\n            [presentation]=\"type\" \n            [firstDayOfWeek]=\"1\"\n            [min]=\"min\"\n            [max]=\"max\"\n            locale=\"es-AR\"\n            hourCycle=\"h24\"\n            [showDefaultButtons]=\"true\"\n            [cancelText]=\"cancelLabel\"\n            [doneText]=\"confirmLabel\"\n            [value]=\"control?.value\">\n\n            <bizy-confirm-buttons\n                slot=\"buttons\"\n                (cancel)=\"cancel(bizyInputDateTimeModal, bizyInputDateTime)\"\n                (confirm)=\"confirm(bizyInputDateTimeModal, bizyInputDateTime)\">\n            </bizy-confirm-buttons>\n        </ion-datetime>\n\n    </ng-template>\n</ion-modal>\n\n", styles: ["::ng-deep .bizy-input{--color: var(--bizy-input-color) !important;--background: var(--bizy-input-background-color) !important;--placeholder-color: var(--bizy-input-placeholder-color) !important;--placeholder-opacity: .8 !important;--padding-start: .3rem !important;--padding-end: .3rem !important;--inner-padding-end: 0 !important;--border-radius: .3rem .3rem 0 0 !important;border-bottom:.1rem solid var(--bizy-input-color)}::ng-deep .bizy-input__errors{margin-top:.5rem;display:flex;flex-direction:column;row-gap:.3rem}::ng-deep .bizy-input--error{border-bottom-color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input--error [slot=label]{color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input [slot=label]{color:var(--bizy-input-label-color)}::ng-deep .bizy-input [slot=start]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .bizy-input [slot=end]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .input-clear-icon.sc-ion-input-ios{width:auto!important;height:auto!important}::ng-deep .bizy-date-input{--width: auto !important;--height: auto !important}::ng-deep ion-datetime{--ion-color-base: var(--bizy-input-date-color);--ion-color-contrast: var(--bizy-input-date-contrast-color) !important}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { bizyInput: [{
                type: ViewChild,
                args: ['bizyInput']
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], multiple: [{
                type: Input
            }], clear: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], autoCapitalize: [{
                type: Input
            }], autoCorrect: [{
                type: Input
            }], browserAutoComplete: [{
                type: Input
            }], type: [{
                type: Input
            }], label: [{
                type: Input
            }], max: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], min: [{
                type: Input
            }], minLength: [{
                type: Input
            }], control: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], confirmLabel: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onFocus: [{
                type: Output
            }] } });

class ErrorComponent {
    label;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.9", type: ErrorComponent, selector: "bizy-error", inputs: { label: "label" }, ngImport: i0, template: "<h6 class=\"bizy-error\"><ng-content></ng-content></h6>\n", styles: ["@keyframes fade-in{0%{opacity:0}to{opacity:1}}.bizy-error{color:var(--bizy-error-color);font-weight:700;animation-name:fade-in;animation-duration:.5s;animation-fill-mode:both}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-error', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h6 class=\"bizy-error\"><ng-content></ng-content></h6>\n", styles: ["@keyframes fade-in{0%{opacity:0}to{opacity:1}}.bizy-error{color:var(--bizy-error-color);font-weight:700;animation-name:fade-in;animation-duration:.5s;animation-fill-mode:both}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }] } });

const COMPONENTS$1 = [
    ErrorComponent,
];
class ErrorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ErrorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.9", ngImport: i0, type: ErrorModule, declarations: [ErrorComponent], imports: [CommonModule, FormsModule], exports: [ErrorComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ErrorModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ErrorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$1,
                    exports: COMPONENTS$1
                }]
        }] });

const COMPONENTS = [InputComponent];
class InputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: InputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.9", ngImport: i0, type: InputModule, declarations: [InputComponent], imports: [CommonModule,
            FormsModule,
            IonicModule,
            ErrorModule,
            ConfirmButtonsModule], exports: [InputComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: InputModule, imports: [CommonModule,
            FormsModule,
            IonicModule,
            ErrorModule,
            ConfirmButtonsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: InputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        IonicModule,
                        ErrorModule,
                        ConfirmButtonsModule
                    ],
                    declarations: COMPONENTS,
                    exports: COMPONENTS,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonComponent, ButtonModule, ConfirmButtonsComponent, ConfirmButtonsModule, ErrorComponent, ErrorModule, InputComponent, InputModule, ToggleComponent, ToggleModule, VirtualScrollComponent, VirtualScrollGridDirective, VirtualScrollModule, VirtualScrollNgForDirective };
//# sourceMappingURL=bizy-components.mjs.map
