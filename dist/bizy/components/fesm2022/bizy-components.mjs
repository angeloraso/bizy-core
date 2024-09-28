import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, Input, Output, NgModule, ChangeDetectorRef, Inject, ContentChildren, ViewChild, ElementRef, ViewContainerRef, TemplateRef, Directive, Renderer2, ContentChild, Pipe, inject, Injectable } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule, DatePipe, DOCUMENT, DecimalPipe } from '@angular/common';
import * as i2 from '@angular/forms';
import { FormsModule, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subscription, Subject, debounceTime, interval, BehaviorSubject, fromEvent, skip, filter, take, auditTime, throttleTime } from 'rxjs';
import * as i2$1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import flatpickr from 'flatpickr';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import * as i2$2 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i4 from '@angular/cdk/portal';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';
import * as echarts from 'echarts';
import html2canvas from 'html2canvas';
import Uppy from '@uppy/core';
import es_ES from '@uppy/locales/lib/es_ES';
import en_US from '@uppy/locales/lib/en_US';
import Dashboard from '@uppy/dashboard';
import XHRUpload from '@uppy/xhr-upload';

class BizyToggleComponent {
    id = `bizy-toggle-${Math.random()}`;
    disabled = false;
    selected = false;
    onSelect = new EventEmitter();
    selectedChange = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.selectedChange.emit(!this.selected);
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyToggleComponent, selector: "bizy-toggle", inputs: { id: "id", disabled: "disabled", selected: "selected" }, outputs: { onSelect: "onSelect", selectedChange: "selectedChange" }, ngImport: i0, template: "<button type=\"button\" class=\"bizy-toggle\" [ngClass]=\"{'bizy-toggle--disabled': disabled}\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <input \n        class=\"bizy-toggle__toggle\"\n        type=\"checkbox\"\n        [id]=\"id\"\n        [disabled]=\"disabled\"\n        [checked]=\"selected\"\n        readonly\n        [ngClass]=\"{'bizy-toggle__toggle--disabled': disabled}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-toggle{width:-moz-fit-content;width:fit-content;height:1.3rem;display:flex;column-gap:.5rem;align-items:center;border:none;cursor:pointer;background-color:transparent}.bizy-toggle--disabled{cursor:not-allowed!important}.bizy-toggle__toggle{position:relative;pointer-events:none;height:.8rem;width:2.2rem;cursor:pointer;appearance:none;-webkit-appearance:none;border-radius:9999px;background-color:var(--bizy-toggle-background-color);transition:all .3s ease}.bizy-toggle__toggle:before{position:absolute;pointer-events:none;content:\"\";left:-.2rem;top:-.2rem;display:block;height:1.2rem;width:1.2rem;cursor:pointer;background-color:var(--bizy-toggle-color);border-radius:9999px;transition:all .3s ease}.bizy-toggle__toggle:checked{background-color:var(--bizy-toggle-selected-background-color)}.bizy-toggle__toggle:checked:before{background-color:var(--bizy-toggle-selected-color);transform:translate(100%)}.bizy-toggle__toggle--disabled{pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toggle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button type=\"button\" class=\"bizy-toggle\" [ngClass]=\"{'bizy-toggle--disabled': disabled}\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <input \n        class=\"bizy-toggle__toggle\"\n        type=\"checkbox\"\n        [id]=\"id\"\n        [disabled]=\"disabled\"\n        [checked]=\"selected\"\n        readonly\n        [ngClass]=\"{'bizy-toggle__toggle--disabled': disabled}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-toggle{width:-moz-fit-content;width:fit-content;height:1.3rem;display:flex;column-gap:.5rem;align-items:center;border:none;cursor:pointer;background-color:transparent}.bizy-toggle--disabled{cursor:not-allowed!important}.bizy-toggle__toggle{position:relative;pointer-events:none;height:.8rem;width:2.2rem;cursor:pointer;appearance:none;-webkit-appearance:none;border-radius:9999px;background-color:var(--bizy-toggle-background-color);transition:all .3s ease}.bizy-toggle__toggle:before{position:absolute;pointer-events:none;content:\"\";left:-.2rem;top:-.2rem;display:block;height:1.2rem;width:1.2rem;cursor:pointer;background-color:var(--bizy-toggle-color);border-radius:9999px;transition:all .3s ease}.bizy-toggle__toggle:checked{background-color:var(--bizy-toggle-selected-background-color)}.bizy-toggle__toggle:checked:before{background-color:var(--bizy-toggle-selected-color);transform:translate(100%)}.bizy-toggle__toggle--disabled{pointer-events:none}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], selectedChange: [{
                type: Output
            }] } });

const COMPONENTS$j = [
    BizyToggleComponent,
];
class BizyToggleModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleModule, declarations: [BizyToggleComponent], imports: [CommonModule, FormsModule], exports: [BizyToggleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$j,
                    exports: COMPONENTS$j
                }]
        }] });

class BizyBreadcrumbComponent {
    ref;
    onSelect = new EventEmitter();
    _breadcrumbs = [];
    showGoBack = false;
    constructor(ref) {
        this.ref = ref;
    }
    set breadcrumbs(breadcrumbs) {
        if (breadcrumbs) {
            this._breadcrumbs = breadcrumbs;
            this.showGoBack = false;
            let counter = 0;
            for (let i = 0; i < breadcrumbs.length; i++) {
                if (!breadcrumbs[i].skip) {
                    counter++;
                }
                if (counter > 1) {
                    this.showGoBack = true;
                    this.ref.detectChanges();
                    break;
                }
            }
        }
    }
    goTo(breadcrumb) {
        if (breadcrumb.skip) {
            return;
        }
        this.onSelect.emit(breadcrumb);
    }
    goBack() {
        if (!this._breadcrumbs[this._breadcrumbs.length - 2]) {
            return;
        }
        for (let i = this._breadcrumbs.length; i > 0; i--) {
            if (!this._breadcrumbs[i - 2].skip) {
                this.onSelect.emit(this._breadcrumbs[i - 2]);
                break;
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyBreadcrumbComponent, selector: "bizy-breadcrumb", inputs: { breadcrumbs: "breadcrumbs" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<ul class=\"bizy-breadcrumb\">\n  <li *ngFor=\"let breadcrumb of _breadcrumbs; let last = last; let i = index\">\n    <button \n      class=\"bizy-breadcrumb__link\"\n      [ngClass]=\"{'bizy-breadcrumb__link--skip': breadcrumb.skip || last}\"\n      type=\"button\" \n      (click)=\"goTo(breadcrumb)\">\n      {{breadcrumb.label}}\n    </button>\n    <button\n      type=\"button\"\n      *ngIf=\"last && showGoBack\"\n      class=\"bizy-breadcrumb__go-back\"\n      (click)=\"goBack()\">\n      <svg \n        class=\"bizy-breadcrumb__go-back__icon\"\n        fill=\"none\"\n        stroke=\"currentColor\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        viewBox=\"0 0 24 24\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M0 0h24v24H0z\" fill=\"none\" stroke=\"none\"/>\n        <path d=\"M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1\"/>\n      </svg>\n    </button>\n  </li>\n</ul>\n  ", styles: [":host{font-size:1rem}.bizy-breadcrumb{list-style:none;margin:0;padding:0}.bizy-breadcrumb li{display:inline}.bizy-breadcrumb li:before{content:\"/\";margin:0 .3rem}.bizy-breadcrumb li:first-child:before{content:\"\";margin:0}.bizy-breadcrumb__link{cursor:pointer;border:none;background-color:transparent;color:var(--bizy-breadcrumb-link-color)}.bizy-breadcrumb__link:hover{filter:brightness(95%)}.bizy-breadcrumb__link--skip{cursor:default;color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__link--skip:hover{color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__go-back{cursor:pointer;margin-left:.4rem;position:relative;top:.5rem;background-color:transparent;border:none}.bizy-breadcrumb__go-back__icon{color:var(--bizy-breadcrumb-link-color);height:1rem;position:relative;bottom:.3rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-breadcrumb', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ul class=\"bizy-breadcrumb\">\n  <li *ngFor=\"let breadcrumb of _breadcrumbs; let last = last; let i = index\">\n    <button \n      class=\"bizy-breadcrumb__link\"\n      [ngClass]=\"{'bizy-breadcrumb__link--skip': breadcrumb.skip || last}\"\n      type=\"button\" \n      (click)=\"goTo(breadcrumb)\">\n      {{breadcrumb.label}}\n    </button>\n    <button\n      type=\"button\"\n      *ngIf=\"last && showGoBack\"\n      class=\"bizy-breadcrumb__go-back\"\n      (click)=\"goBack()\">\n      <svg \n        class=\"bizy-breadcrumb__go-back__icon\"\n        fill=\"none\"\n        stroke=\"currentColor\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        viewBox=\"0 0 24 24\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M0 0h24v24H0z\" fill=\"none\" stroke=\"none\"/>\n        <path d=\"M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1\"/>\n      </svg>\n    </button>\n  </li>\n</ul>\n  ", styles: [":host{font-size:1rem}.bizy-breadcrumb{list-style:none;margin:0;padding:0}.bizy-breadcrumb li{display:inline}.bizy-breadcrumb li:before{content:\"/\";margin:0 .3rem}.bizy-breadcrumb li:first-child:before{content:\"\";margin:0}.bizy-breadcrumb__link{cursor:pointer;border:none;background-color:transparent;color:var(--bizy-breadcrumb-link-color)}.bizy-breadcrumb__link:hover{filter:brightness(95%)}.bizy-breadcrumb__link--skip{cursor:default;color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__link--skip:hover{color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__go-back{cursor:pointer;margin-left:.4rem;position:relative;top:.5rem;background-color:transparent;border:none}.bizy-breadcrumb__go-back__icon{color:var(--bizy-breadcrumb-link-color);height:1rem;position:relative;bottom:.3rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { onSelect: [{
                type: Output
            }], breadcrumbs: [{
                type: Input
            }] } });

const COMPONENTS$i = [BizyBreadcrumbComponent];
class BizyBreadcrumbModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbModule, declarations: [BizyBreadcrumbComponent], imports: [CommonModule,
            FormsModule], exports: [BizyBreadcrumbComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbModule, imports: [CommonModule,
            FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: COMPONENTS$i,
                    exports: COMPONENTS$i,
                }]
        }] });

class BizyButtonComponent {
    id = `bizy-button-${Math.random()}`;
    disabled = false;
    type = 'button';
    customClass = '';
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyButtonComponent, selector: "bizy-button", inputs: { id: "id", disabled: "disabled", type: "type", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    [type]=\"type\"\n    [id]=\"id\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n    <span class=\"bizy-button__content\" (click)=\"_onSelect($event); $event.stopPropagation()\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem}.bizy-button{display:flex;justify-content:space-between;align-items:center;column-gap:.5rem;width:100%;height:100%;padding:var(--bizy-button-padding);border-radius:.3rem;border:var(--bizy-button-border);cursor:pointer;background-color:var(--bizy-button-background-color)}::ng-deep .bizy-button *{color:var(--bizy-button-color);text-wrap:nowrap}.bizy-button:hover{filter:brightness(95%)}.bizy-button__content{width:100%;display:flex;align-items:center;justify-content:center;column-gap:.3rem}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    [type]=\"type\"\n    [id]=\"id\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n    <span class=\"bizy-button__content\" (click)=\"_onSelect($event); $event.stopPropagation()\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem}.bizy-button{display:flex;justify-content:space-between;align-items:center;column-gap:.5rem;width:100%;height:100%;padding:var(--bizy-button-padding);border-radius:.3rem;border:var(--bizy-button-border);cursor:pointer;background-color:var(--bizy-button-background-color)}::ng-deep .bizy-button *{color:var(--bizy-button-color);text-wrap:nowrap}.bizy-button:hover{filter:brightness(95%)}.bizy-button__content{width:100%;display:flex;align-items:center;justify-content:center;column-gap:.3rem}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$h = [
    BizyButtonComponent,
];
class BizyButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonModule, declarations: [BizyButtonComponent], imports: [CommonModule, FormsModule], exports: [BizyButtonComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$h,
                    exports: COMPONENTS$h
                }]
        }] });

class BizyInputOptionComponent {
    ref;
    id = `bizy-input-${Math.random()}`;
    disabled = false;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
        this.ref.detectChanges();
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyInputOptionComponent, selector: "bizy-input-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-input-option--selected': selected, 'bizy-input-option--disabled': disabled}\"\n    class=\"bizy-input-option {{customClass}}\">\n\n    <span class=\"bizy-input-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-input-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-input-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-input-color);cursor:pointer}.bizy-input-option:hover{background-color:var(--bizy-input-option-hover-background-color)}.bizy-input-option--selected{background-color:var(--bizy-input-option-selected-background-color)!important}.bizy-input-option--selected ::ng-deep .bizy-input-option__content *{color:var(--bizy-input-option-selected-color)}.bizy-input-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-input-option--selected': selected, 'bizy-input-option--disabled': disabled}\"\n    class=\"bizy-input-option {{customClass}}\">\n\n    <span class=\"bizy-input-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-input-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-input-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-input-color);cursor:pointer}.bizy-input-option:hover{background-color:var(--bizy-input-option-hover-background-color)}.bizy-input-option--selected{background-color:var(--bizy-input-option-selected-background-color)!important}.bizy-input-option--selected ::ng-deep .bizy-input-option__content *{color:var(--bizy-input-option-selected-color)}.bizy-input-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizyInputComponent {
    ref;
    options;
    bizyInputWrapper;
    bizyInput;
    id = `bizy-input-${Math.random()}`;
    name = `bizy-input-${Math.random()}`;
    type = 'text';
    customClass = '';
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
    _onBlur(event) {
        setTimeout(() => {
            this.focused = false;
            this.touched = true;
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyInputComponent, selector: "bizy-input", inputs: { id: "id", name: "name", type: "type", customClass: "customClass", debounceTime: "debounceTime", rows: "rows", disabled: "disabled", readonly: "readonly", value: "value", autofocus: "autofocus" }, outputs: { valueChange: "valueChange", onChange: "onChange", onEnter: "onEnter", onBackspace: "onBackspace", onSelect: "onSelect", onBlur: "onBlur", onFocus: "onFocus" }, queries: [{ propertyName: "options", predicate: BizyInputOptionComponent }], viewQueries: [{ propertyName: "bizyInputWrapper", first: true, predicate: ["bizyInputWrapper"], descendants: true }, { propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type\"\n            [readonly]=\"readonly\"\n            [bizyOnlyNumbers]=\"type === 'number'\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"onEnter.emit($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n\n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"onEnter.emit($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type\"\n            [readonly]=\"readonly\"\n            [bizyOnlyNumbers]=\"type === 'number'\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"onEnter.emit($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n\n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"onEnter.emit($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"] }]
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

const COMPONENTS$g = [BizyInputComponent, BizyInputOptionComponent];
class BizyInputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, declarations: [BizyInputComponent, BizyInputOptionComponent], imports: [CommonModule,
            FormsModule,
            OverlayModule], exports: [BizyInputComponent, BizyInputOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, imports: [CommonModule,
            FormsModule,
            OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        OverlayModule
                    ],
                    declarations: COMPONENTS$g,
                    exports: COMPONENTS$g
                }]
        }] });

class BizyDatePickerComponent {
    datePipe;
    bizyDatePicker;
    id = `bizy-date-picker-${Math.random()}`;
    disabled = false;
    customClass = '';
    opened = false;
    enableSeconds = false;
    dateChange = new EventEmitter();
    rangeChange = new EventEmitter();
    onChange = new EventEmitter();
    openedChange = new EventEmitter();
    onOpen = new EventEmitter();
    onSelect = new EventEmitter();
    dateFormat = 'Y-m-d';
    datePipeFormat = 'yyyy-MM-dd';
    enableTime = false;
    started = false;
    noCalendar = true;
    mode = 'single';
    dates = [Date.now()];
    time = Date.now();
    set date(date) {
        if (typeof date === 'undefined' || date === null) {
            return;
        }
        this.mode = 'single';
        this.dates = [date];
        this.time = date;
        this.value = this.datePipe.transform(date, this.datePipeFormat, undefined, 'es-AR');
        if (!this.enableTime || !this.started) {
            this.#start();
        }
    }
    set range(range) {
        if (!range) {
            return;
        }
        this.mode = 'range';
        this.dates = [range.from, range.to];
        this.time = range.from;
        this.value = `${this.datePipe.transform(range.from, this.datePipeFormat, undefined, 'es-AR')} - ${this.datePipe.transform(range.to, this.datePipeFormat, undefined, 'es-AR')}`;
        this.#start();
    }
    value = '';
    set type(type) {
        if (!type) {
            return;
        }
        switch (type) {
            case 'date':
                this.dateFormat = 'Y-m-d';
                this.datePipeFormat = 'yyyy-MM-dd';
                this.enableTime = false;
                this.noCalendar = false;
                break;
            case 'date-time':
                this.dateFormat = 'Y-m-d H:i:S';
                this.datePipeFormat = this.enableSeconds ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd HH:mm';
                this.enableTime = true;
                this.noCalendar = false;
                break;
            case 'time':
                this.dateFormat = 'H:i:S';
                this.datePipeFormat = this.enableSeconds ? 'HH:mm:ss' : 'HH:mm';
                this.enableTime = true;
                this.noCalendar = true;
                break;
            case 'year-month':
                this.dateFormat = 'Y-M';
                this.datePipeFormat = 'yyyy MMMM';
                this.enableTime = false;
                this.noCalendar = false;
                break;
            default:
                this.dateFormat = 'Y-m-d';
                this.datePipeFormat = 'yyyy-MM-dd';
                this.enableTime = false;
                this.noCalendar = false;
        }
    }
    constructor(datePipe) {
        this.datePipe = datePipe;
    }
    ngAfterViewInit() {
        this.#start();
    }
    #start() {
        if (this.bizyDatePicker && this.bizyDatePicker.bizyInputWrapper && this.bizyDatePicker.bizyInputWrapper.nativeElement) {
            const plugins = [];
            if (this.dateFormat === 'Y-M') {
                plugins.push(monthSelectPlugin({
                    shorthand: true
                }));
            }
            flatpickr(this.bizyDatePicker.bizyInputWrapper.nativeElement, {
                locale: Spanish,
                mode: this.mode,
                dateFormat: this.dateFormat,
                enableTime: this.enableTime,
                enableSeconds: this.enableSeconds,
                plugins,
                noCalendar: this.noCalendar,
                disableMobile: true,
                time_24hr: true,
                defaultDate: this.mode === 'single' ? new Date(this.dates[0]) : this.dates.map(_date => new Date(_date)),
                defaultHour: this.#getHour(this.time),
                defaultMinute: this.#getMinute(this.time),
                onChange: (selectedDates) => {
                    if (this.mode === 'single' && selectedDates[0]) {
                        const date = new Date(selectedDates[0]);
                        this.dateChange.emit(date.getTime());
                        this.onChange.emit(date.getTime());
                    }
                    else if (selectedDates[0] && selectedDates[1]) {
                        const from = new Date(selectedDates[0]);
                        const to = new Date(selectedDates[1]);
                        to.setHours(23, 59, 59, 999);
                        const range = { from: from.getTime(), to: to.getTime() };
                        this.rangeChange.emit(range);
                        this.onChange.emit(range);
                    }
                },
                onOpen: () => {
                    this.opened = true;
                    this.openedChange.emit(this.opened);
                    this.onOpen.emit(this.opened);
                },
                onClose: () => {
                    this.opened = false;
                    this.openedChange.emit(this.opened);
                    this.onOpen.emit(this.opened);
                }
            });
            this.started = true;
        }
    }
    #getHour(time) {
        const date = new Date(time);
        return date.getHours();
    }
    #getMinute(time) {
        const date = new Date(time);
        return date.getMinutes();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerComponent, deps: [{ token: DatePipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyDatePickerComponent, selector: "bizy-date-picker", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened", enableSeconds: "enableSeconds", date: "date", range: "range", type: "type" }, outputs: { dateChange: "dateChange", rangeChange: "rangeChange", onChange: "onChange", openedChange: "openedChange", onOpen: "onOpen", onSelect: "onSelect" }, viewQueries: [{ propertyName: "bizyDatePicker", first: true, predicate: ["bizyDatePicker"], descendants: true }], ngImport: i0, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "debounceTime", "rows", "disabled", "readonly", "value", "autofocus"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-date-picker', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DatePipe, decorators: [{
                    type: Inject,
                    args: [DatePipe]
                }] }]; }, propDecorators: { bizyDatePicker: [{
                type: ViewChild,
                args: ['bizyDatePicker']
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], enableSeconds: [{
                type: Input
            }], dateChange: [{
                type: Output
            }], rangeChange: [{
                type: Output
            }], onChange: [{
                type: Output
            }], openedChange: [{
                type: Output
            }], onOpen: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], date: [{
                type: Input
            }], range: [{
                type: Input
            }], type: [{
                type: Input
            }] } });

const COMPONENTS$f = [
    BizyDatePickerComponent,
];
class BizyDatePickerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerModule, declarations: [BizyDatePickerComponent], imports: [CommonModule, FormsModule, BizyInputModule], exports: [BizyDatePickerComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerModule, providers: [DatePipe], imports: [CommonModule, FormsModule, BizyInputModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, BizyInputModule],
                    declarations: COMPONENTS$f,
                    exports: COMPONENTS$f,
                    providers: [DatePipe]
                }]
        }] });

class BizyTabComponent {
    elementRef;
    id = `bizy-tab-${Math.random()}`;
    disabled = false;
    selected = false;
    linePosition = 'bottom';
    customClass;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.selectedChange.emit(true);
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabComponent, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTabComponent, selector: "bizy-tab", inputs: { id: "id", disabled: "disabled", selected: "selected", linePosition: "linePosition", customClass: "customClass" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'top'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected}\"></span>\n\n<button \n  type=\"button\"\n  [id]=\"id\"\n  [ngClass]=\"{'bizy-tab--selected': selected, 'bizy-tab--disabled': disabled}\"\n  class=\"bizy-tab {{customClass}}\"\n  (click)=\"_onSelect($event)\"\n  (keyup.enter)=\"_onSelect($event)\">\n\n  <ng-content></ng-content>\n\n</button>\n\n<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'bottom'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected}\"></span>\n", styles: [":host{font-size:1rem;display:flex;flex-direction:column}.bizy-tab{width:100%;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;align-items:center;text-wrap:nowrap;border-top:var(--bizy-tab-border-top);border-right:var(--bizy-tab-border-right);border-bottom:var(--bizy-tab-border-bottom);border-left:var(--bizy-tab-border-left);border-radius:var(--bizy-tab-border-radius);padding:var(--bizy-tab-padding);background-color:var(--bizy-tab-background-color);color:var(--bizy-tab-color);cursor:pointer}.bizy-tab--selected{color:var(--bizy-tab-selected-color);background-color:var(--bizy-tab-selected-background-color)}.bizy-tab--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-tab__selected-line{width:100%;height:var(--bizy-tab-selected-bar-height);visibility:hidden;pointer-events:none;background-color:var(--bizy-tab-selected-bar-color)}.bizy-tab__selected-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tab', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'top'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected}\"></span>\n\n<button \n  type=\"button\"\n  [id]=\"id\"\n  [ngClass]=\"{'bizy-tab--selected': selected, 'bizy-tab--disabled': disabled}\"\n  class=\"bizy-tab {{customClass}}\"\n  (click)=\"_onSelect($event)\"\n  (keyup.enter)=\"_onSelect($event)\">\n\n  <ng-content></ng-content>\n\n</button>\n\n<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'bottom'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected}\"></span>\n", styles: [":host{font-size:1rem;display:flex;flex-direction:column}.bizy-tab{width:100%;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;align-items:center;text-wrap:nowrap;border-top:var(--bizy-tab-border-top);border-right:var(--bizy-tab-border-right);border-bottom:var(--bizy-tab-border-bottom);border-left:var(--bizy-tab-border-left);border-radius:var(--bizy-tab-border-radius);padding:var(--bizy-tab-padding);background-color:var(--bizy-tab-background-color);color:var(--bizy-tab-color);cursor:pointer}.bizy-tab--selected{color:var(--bizy-tab-selected-color);background-color:var(--bizy-tab-selected-background-color)}.bizy-tab--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-tab__selected-line{width:100%;height:var(--bizy-tab-selected-bar-height);visibility:hidden;pointer-events:none;background-color:var(--bizy-tab-selected-bar-color)}.bizy-tab__selected-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], linePosition: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

class BizyTabsComponent {
    ref;
    tabs;
    bizyTabs;
    bizyTabsWrapper;
    customClass;
    #SCROLL_STEP = 50;
    showLeftButton = false;
    showRightButton = false;
    #resizeObserver = null;
    #subscription = new Subscription();
    #resize$ = new Subject();
    #initialScroll = 0;
    constructor(ref) {
        this.ref = ref;
    }
    ngAfterViewInit() {
        this.bizyTabsWrapper.nativeElement.scrollLeft = this.#initialScroll;
        this.#resizeObserver = new ResizeObserver(() => this.#resize$.next());
        this.#resizeObserver.observe(this.bizyTabs.nativeElement);
        this.#subscription.add(this.#resize$.pipe(debounceTime(100)).subscribe(() => {
            this.#checkButtons();
        }));
    }
    ngAfterContentInit() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs.get(i).selected) {
                this.#initialScroll = this.tabs.get(i).elementRef.nativeElement.offsetLeft;
                break;
            }
        }
    }
    onScrollLeft() {
        this.bizyTabsWrapper.nativeElement.scrollLeft = this.bizyTabsWrapper.nativeElement.scrollLeft - this.#SCROLL_STEP < 0 ? 0 : this.bizyTabsWrapper.nativeElement.scrollLeft - this.#SCROLL_STEP;
        this.#checkButtons();
    }
    onScrollRight() {
        this.bizyTabsWrapper.nativeElement.scrollLeft = (this.bizyTabsWrapper.nativeElement.scrollLeft + this.#SCROLL_STEP) > this.bizyTabsWrapper.nativeElement.scrollWidth ? this.bizyTabsWrapper.nativeElement.scrollWidth : this.bizyTabsWrapper.nativeElement.scrollLeft + this.#SCROLL_STEP;
        this.#checkButtons();
    }
    #checkButtons() {
        this.showLeftButton = this.bizyTabsWrapper.nativeElement.scrollLeft > 0;
        this.showRightButton = (this.bizyTabsWrapper.nativeElement.scrollWidth - this.bizyTabs.nativeElement.offsetWidth) > 0 && (this.bizyTabsWrapper.nativeElement.scrollLeft < (this.bizyTabsWrapper.nativeElement.scrollWidth - this.bizyTabs.nativeElement.offsetWidth));
        this.ref.detectChanges();
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#resizeObserver.disconnect();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTabsComponent, selector: "bizy-tabs", inputs: { customClass: "customClass" }, queries: [{ propertyName: "tabs", predicate: BizyTabComponent }], viewQueries: [{ propertyName: "bizyTabs", first: true, predicate: ["bizyTabs"], descendants: true }, { propertyName: "bizyTabsWrapper", first: true, predicate: ["bizyTabsWrapper"], descendants: true }], ngImport: i0, template: "<div #bizyTabs class=\"bizy-tabs {{customClass}}\">\n\n    <button \n        type=\"button\"\n        class=\"bizy-tabs__scroll-button bizy-tabs__scroll-button--left\"\n        *ngIf=\"showLeftButton\"\n        (click)=\"onScrollLeft()\"\n        (keyup.enter)=\"onScrollLeft()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\" class=\"bizy-tabs__scroll-button__arrow\">\n            <path d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z\"/>\n        </svg>\n    </button>\n\n    <span class=\"bizy-tabs__wrapper\" #bizyTabsWrapper>\n\n        <ng-content select=\"bizy-tab\"></ng-content>\n\n    </span>\n\n    <button \n        type=\"button\"\n        class=\"bizy-tabs__scroll-button bizy-tabs__scroll-button--right\"\n        *ngIf=\"showRightButton\"\n        (click)=\"onScrollRight()\"\n        (keyup.enter)=\"onScrollRight()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\" class=\"bizy-tabs__scroll-button__arrow\">\n            <path d=\"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z\"/>\n        </svg>\n    </button>\n\n</div>", styles: [":host{font-size:1rem}.bizy-tabs{display:flex;width:100%;height:100%;overflow:hidden;background-color:transparent}.bizy-tabs__wrapper{display:flex;align-items:center;width:100%;height:100%;position:relative;overflow-y:hidden;overflow-x:auto;scroll-behavior:smooth;column-gap:var(--bizy-tabs-column-gap);background-color:var(--bizy-tabs-background-color)}.bizy-tabs__scroll-button{width:2rem;border:none;background-color:var(--bizy-tabs-arrow-button-background-color);display:flex;align-items:center;padding:.3rem;justify-content:center;box-shadow:0 0 47px -5px #000;-webkit-box-shadow:0px 0px 47px -5px rgba(0,0,0,1);-moz-box-shadow:0px 0px 47px -5px rgba(0,0,0,1)}.bizy-tabs__scroll-button--left{border-right:.1rem solid #6666}.bizy-tabs__scroll-button--right{border-left:.1rem solid #6666}.bizy-tabs__scroll-button__arrow{height:1rem;fill:var(--bizy-tabs-arrow-button-color)}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tabs', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div #bizyTabs class=\"bizy-tabs {{customClass}}\">\n\n    <button \n        type=\"button\"\n        class=\"bizy-tabs__scroll-button bizy-tabs__scroll-button--left\"\n        *ngIf=\"showLeftButton\"\n        (click)=\"onScrollLeft()\"\n        (keyup.enter)=\"onScrollLeft()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\" class=\"bizy-tabs__scroll-button__arrow\">\n            <path d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z\"/>\n        </svg>\n    </button>\n\n    <span class=\"bizy-tabs__wrapper\" #bizyTabsWrapper>\n\n        <ng-content select=\"bizy-tab\"></ng-content>\n\n    </span>\n\n    <button \n        type=\"button\"\n        class=\"bizy-tabs__scroll-button bizy-tabs__scroll-button--right\"\n        *ngIf=\"showRightButton\"\n        (click)=\"onScrollRight()\"\n        (keyup.enter)=\"onScrollRight()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\" class=\"bizy-tabs__scroll-button__arrow\">\n            <path d=\"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z\"/>\n        </svg>\n    </button>\n\n</div>", styles: [":host{font-size:1rem}.bizy-tabs{display:flex;width:100%;height:100%;overflow:hidden;background-color:transparent}.bizy-tabs__wrapper{display:flex;align-items:center;width:100%;height:100%;position:relative;overflow-y:hidden;overflow-x:auto;scroll-behavior:smooth;column-gap:var(--bizy-tabs-column-gap);background-color:var(--bizy-tabs-background-color)}.bizy-tabs__scroll-button{width:2rem;border:none;background-color:var(--bizy-tabs-arrow-button-background-color);display:flex;align-items:center;padding:.3rem;justify-content:center;box-shadow:0 0 47px -5px #000;-webkit-box-shadow:0px 0px 47px -5px rgba(0,0,0,1);-moz-box-shadow:0px 0px 47px -5px rgba(0,0,0,1)}.bizy-tabs__scroll-button--left{border-right:.1rem solid #6666}.bizy-tabs__scroll-button--right{border-left:.1rem solid #6666}.bizy-tabs__scroll-button__arrow{height:1rem;fill:var(--bizy-tabs-arrow-button-color)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { tabs: [{
                type: ContentChildren,
                args: [BizyTabComponent]
            }], bizyTabs: [{
                type: ViewChild,
                args: ['bizyTabs']
            }], bizyTabsWrapper: [{
                type: ViewChild,
                args: ['bizyTabsWrapper']
            }], customClass: [{
                type: Input
            }] } });

const COMPONENTS$e = [
    BizyTabsComponent,
    BizyTabComponent
];
class BizyTabsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsModule, declarations: [BizyTabsComponent,
            BizyTabComponent], imports: [CommonModule, FormsModule], exports: [BizyTabsComponent,
            BizyTabComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$e,
                    exports: COMPONENTS$e
                }]
        }] });

class BizyToolbarComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyToolbarComponent, selector: "bizy-toolbar", ngImport: i0, template: "<div class=\"bizy-toolbar\">\n\n    <span class=\"bizy-toolbar__start\">\n        \n        <ng-content select=\"[slot=start]\"></ng-content>\n\n    </span>\n\n    <span class=\"bizy-toolbar__end\">\n\n        <ng-content select=\"[slot=end]\"></ng-content>\n\n    </span>\n\n</div>\n", styles: [":host{font-size:1rem}.bizy-toolbar{height:var(--bizy-toolbar-height);width:100%;background-color:var(--bizy-toolbar-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:var(--bizy-toolbar-column-gap);padding:var(--bizy-toolbar-padding)}.bizy-toolbar__start{height:100%;display:flex;align-items:center;column-gap:var(--bizy-toolbar-column-gap)}.bizy-toolbar__end{height:100%;display:flex;align-items:center;justify-content:flex-end;column-gap:var(--bizy-toolbar-column-gap)}::ng-deep .bizy-toolbar *[toolbar-option]{height:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toolbar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-toolbar\">\n\n    <span class=\"bizy-toolbar__start\">\n        \n        <ng-content select=\"[slot=start]\"></ng-content>\n\n    </span>\n\n    <span class=\"bizy-toolbar__end\">\n\n        <ng-content select=\"[slot=end]\"></ng-content>\n\n    </span>\n\n</div>\n", styles: [":host{font-size:1rem}.bizy-toolbar{height:var(--bizy-toolbar-height);width:100%;background-color:var(--bizy-toolbar-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:var(--bizy-toolbar-column-gap);padding:var(--bizy-toolbar-padding)}.bizy-toolbar__start{height:100%;display:flex;align-items:center;column-gap:var(--bizy-toolbar-column-gap)}.bizy-toolbar__end{height:100%;display:flex;align-items:center;justify-content:flex-end;column-gap:var(--bizy-toolbar-column-gap)}::ng-deep .bizy-toolbar *[toolbar-option]{height:100%}\n"] }]
        }] });

const COMPONENTS$d = [
    BizyToolbarComponent,
];
class BizyToolbarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarModule, declarations: [BizyToolbarComponent], imports: [CommonModule, FormsModule], exports: [BizyToolbarComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$d,
                    exports: COMPONENTS$d
                }]
        }] });

class BizySidebarFloatingOptionTitleComponent {
    id = `bizy-sidebar-floating-option-title-${Math.random()}`;
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarFloatingOptionTitleComponent, selector: "bizy-sidebar-floating-option-title", inputs: { id: "id", customClass: "customClass" }, ngImport: i0, template: "<span class=\"bizy-sidebar-floating-option-title {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem;background-color:var(--bizy-sidebar-floating-option-title-background-color);position:sticky;top:0;z-index:1}.bizy-sidebar-floating-option-title{background-color:inherit;color:var(--bizy-sidebar-floating-option-title-color);padding:.5rem;cursor:default;-webkit-text-decoration:underline .1rem var(--bizy-sidebar-floating-option-title-underline-color);text-decoration:underline .1rem var(--bizy-sidebar-floating-option-title-underline-color);text-underline-offset:.2rem;display:flex;align-items:center}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-floating-option-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-sidebar-floating-option-title {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem;background-color:var(--bizy-sidebar-floating-option-title-background-color);position:sticky;top:0;z-index:1}.bizy-sidebar-floating-option-title{background-color:inherit;color:var(--bizy-sidebar-floating-option-title-color);padding:.5rem;cursor:default;-webkit-text-decoration:underline .1rem var(--bizy-sidebar-floating-option-title-underline-color);text-decoration:underline .1rem var(--bizy-sidebar-floating-option-title-underline-color);text-underline-offset:.2rem;display:flex;align-items:center}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

class BizyAccordionComponent {
    ref;
    id = `bizy-accordion-${Math.random()}`;
    customClass;
    disabled = false;
    opened = false;
    openedChange = new EventEmitter();
    onSelect = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.openedChange.emit(!this.opened);
        this.onSelect.emit(event);
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyAccordionComponent, selector: "bizy-accordion", inputs: { id: "id", customClass: "customClass", disabled: "disabled", opened: "opened" }, outputs: { openedChange: "openedChange", onSelect: "onSelect" }, ngImport: i0, template: "<button \n  type=\"button\"\n  [id]=\"id\"\n  [ngClass]=\"{'bizy-accordion--disabled': disabled}\"\n  class=\"bizy-accordion {{customClass}}\"\n  (click)=\"_onSelect($event)\"\n  (keyup.enter)=\"_onSelect($event)\">\n\n  <span class=\"bizy-accordion__content\">\n    <ng-content></ng-content>\n  </span>\n\n  <svg \n    class=\"bizy-accordion__arrow\" \n    [ngClass]=\"{'bizy-accordion__arrow--opened': opened}\"\n    viewBox=\"0 0 96 96\" \n    xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n  </svg>\n\n</button>\n\n<span class=\"bizy-accordion__options\" [ngClass]=\"{'bizy-accordion__options--opened': opened}\">\n\n  <ng-content select=\"[accordion-option]\"></ng-content>\n\n</span>\n", styles: [":host{font-size:1rem;width:100%}:host:has(>.bizy-accordion__options:empty) .bizy-accordion>.bizy-accordion__arrow{display:none!important}.bizy-accordion{background-color:var(--bizy-accordion-background-color);border:none;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;width:100%;cursor:pointer;position:relative;border-top-left-radius:.3rem;border-bottom:var(--bizy-accordion-border-bottom)}.bizy-accordion--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-accordion__content{width:100%;flex:1}.bizy-accordion__arrow{height:var(--bizy-accordion-arrow-height);pointer-events:none;display:block;transition:transform .1s ease;fill:var(--bizy-accordion-arrow-color);position:absolute;right:.5rem}.bizy-accordion__arrow--opened{transform:rotate(180deg);transition:transform .2s ease}.bizy-accordion__options{max-height:0;overflow:hidden;display:flex;flex-direction:column;padding-left:var(--bizy-accordion-padding-left);transition:max-height .1s ease;border-left:var(--bizy-accordion-border)}.bizy-accordion__options--opened{max-height:100vh;transition:transform .2s ease}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-accordion', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n  type=\"button\"\n  [id]=\"id\"\n  [ngClass]=\"{'bizy-accordion--disabled': disabled}\"\n  class=\"bizy-accordion {{customClass}}\"\n  (click)=\"_onSelect($event)\"\n  (keyup.enter)=\"_onSelect($event)\">\n\n  <span class=\"bizy-accordion__content\">\n    <ng-content></ng-content>\n  </span>\n\n  <svg \n    class=\"bizy-accordion__arrow\" \n    [ngClass]=\"{'bizy-accordion__arrow--opened': opened}\"\n    viewBox=\"0 0 96 96\" \n    xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n  </svg>\n\n</button>\n\n<span class=\"bizy-accordion__options\" [ngClass]=\"{'bizy-accordion__options--opened': opened}\">\n\n  <ng-content select=\"[accordion-option]\"></ng-content>\n\n</span>\n", styles: [":host{font-size:1rem;width:100%}:host:has(>.bizy-accordion__options:empty) .bizy-accordion>.bizy-accordion__arrow{display:none!important}.bizy-accordion{background-color:var(--bizy-accordion-background-color);border:none;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;width:100%;cursor:pointer;position:relative;border-top-left-radius:.3rem;border-bottom:var(--bizy-accordion-border-bottom)}.bizy-accordion--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-accordion__content{width:100%;flex:1}.bizy-accordion__arrow{height:var(--bizy-accordion-arrow-height);pointer-events:none;display:block;transition:transform .1s ease;fill:var(--bizy-accordion-arrow-color);position:absolute;right:.5rem}.bizy-accordion__arrow--opened{transform:rotate(180deg);transition:transform .2s ease}.bizy-accordion__options{max-height:0;overflow:hidden;display:flex;flex-direction:column;padding-left:var(--bizy-accordion-padding-left);transition:max-height .1s ease;border-left:var(--bizy-accordion-border)}.bizy-accordion__options--opened{max-height:100vh;transition:transform .2s ease}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], opened: [{
                type: Input
            }], openedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

class BizySidebarOptionComponent {
    ref;
    options;
    id = `bizy-sidebar-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _turnOn$ = new BehaviorSubject(false);
    _selected = false;
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        const turnOn = selected && selected !== this._selected;
        this._turnOn$.next(turnOn);
        this._selected = selected;
        this.ref.detectChanges();
    }
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.selectedChange.emit(!this._selected);
        this.onSelect.emit(event);
    }
    _setSelected(selected) {
        this._selected = selected;
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this._selected;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarOptionComponent, selector: "bizy-sidebar-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    [id]=\"id\"\n    customClass=\"bizy-sidebar-option {{_selected && (!options || options.length === 0) ? 'bizy-sidebar-option--selected' : ''}} {{disabled ? 'bizy-sidebar-option--disabled' : ''}}\"\n    [opened]=\"_selected\"\n    (onSelect)=\"_onSelect($event)\">\n\n    <ng-content></ng-content>\n\n    <ng-container accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </ng-container>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}:host:not(:has(.bizy-sidebar-option--disabled)) ::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-accordion__options{position:sticky}:host ::ng-deep .bizy-accordion__options:before{content:\"\";position:absolute;inset:0;background-color:#000;opacity:.3}::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}::ng-deep .bizy-sidebar-option--disabled{cursor:default!important;pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-accordion__options--opened{max-height:100%!important}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: BizyAccordionComponent, selector: "bizy-accordion", inputs: ["id", "customClass", "disabled", "opened"], outputs: ["openedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    [id]=\"id\"\n    customClass=\"bizy-sidebar-option {{_selected && (!options || options.length === 0) ? 'bizy-sidebar-option--selected' : ''}} {{disabled ? 'bizy-sidebar-option--disabled' : ''}}\"\n    [opened]=\"_selected\"\n    (onSelect)=\"_onSelect($event)\">\n\n    <ng-content></ng-content>\n\n    <ng-container accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </ng-container>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}:host:not(:has(.bizy-sidebar-option--disabled)) ::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-accordion__options{position:sticky}:host ::ng-deep .bizy-accordion__options:before{content:\"\";position:absolute;inset:0;background-color:#000;opacity:.3}::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}::ng-deep .bizy-sidebar-option--disabled{cursor:default!important;pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-accordion__options--opened{max-height:100%!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });

class BizySidebarFloatingOptionComponent {
    ref;
    options;
    id = `bizy-sidebar-floating-option-${Math.random()}`;
    disabled = false;
    offsetX = 0;
    offsetY = 0;
    customClass = '';
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _turnOn$ = new BehaviorSubject(false);
    _selected = false;
    _opened = false;
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        const turnOn = selected && selected !== this._selected;
        this._turnOn$.next(turnOn);
        this._opened = turnOn;
        this._selected = selected;
        this.ref.detectChanges();
    }
    #subscription = new Subscription();
    #optionSubscription = new Subscription();
    constructor(ref) {
        this.ref = ref;
    }
    ngAfterContentInit() {
        if (this.options && this.options.length > 0) {
            this.#listenOptionChanges(this.options.toArray());
            this.#subscription.add(this.options.changes.subscribe(() => {
                this.#optionSubscription.unsubscribe();
                this.#optionSubscription = new Subscription();
                this.#listenOptionChanges(this.options.toArray());
            }));
        }
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this._opened = !this._opened;
        this.ref.detectChanges();
        this.selectedChange.emit(this._opened);
        this.onSelect.emit(event);
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this._opened = false;
        this.ref.detectChanges();
    };
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    #listenOptionChanges = (options) => {
        options.forEach(_option => {
            this.#optionSubscription.add(_option._turnOn$.subscribe(turnOn => {
                if (turnOn) {
                    if (!_option.options || _option.options.length === 0) {
                        this._opened = false;
                        this.ref.detectChanges();
                    }
                    this.#selectParents(this.options.toArray(), _option);
                }
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenOptionChanges(_option.options.toArray());
            }
        });
    };
    #selectParents = (options, option) => {
        let founded = false;
        for (let i = 0; i < options.length; i++) {
            if (options[i].getId() === option.getId()) {
                founded = true;
            }
            else if (options[i].options && options[i].options.length > 0) {
                const _founded = this.#selectParents(options[i].options.toArray(), option);
                if (_founded) {
                    founded = true;
                    options[i].selectedChange.emit(true);
                }
                else {
                    options[i].selectedChange.emit(false);
                }
            }
            else {
                options[i].selectedChange.emit(false);
            }
        }
        return founded;
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarFloatingOptionComponent, selector: "bizy-sidebar-floating-option", inputs: { id: "id", disabled: "disabled", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--disabled': disabled, 'bizy-sidebar-floating-option--selected': _selected}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened && options && options.length > 0\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:calc(100% + 2rem);max-width:calc(100vw - 2rem);border-radius:.3rem;max-height:30rem;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-floating-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--disabled': disabled, 'bizy-sidebar-floating-option--selected': _selected}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened && options && options.length > 0\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:calc(100% + 2rem);max-width:calc(100vw - 2rem);border-radius:.3rem;max-height:30rem;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], offsetX: [{
                type: Input
            }], offsetY: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });

class BizySidebarComponent {
    id = `bizy-sidebar-${Math.random()}`;
    options;
    floatingOptions;
    toggle = false;
    onToggle = new EventEmitter();
    #subscription = new Subscription();
    #optionSubscription = new Subscription();
    #floatingOptionSubscription = new Subscription();
    ngAfterContentInit() {
        if (this.options && this.options.length > 0) {
            this.#listenOptionChanges(this.options.toArray());
            this.#subscription.add(this.options.changes.subscribe(() => {
                this.#optionSubscription.unsubscribe();
                this.#optionSubscription = new Subscription();
                this.#listenOptionChanges(this.options.toArray());
            }));
        }
        if (this.floatingOptions && this.floatingOptions.length > 0) {
            this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
            this.#subscription.add(this.floatingOptions.changes.subscribe(() => {
                this.#floatingOptionSubscription.unsubscribe();
                this.#floatingOptionSubscription = new Subscription();
                this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
            }));
        }
    }
    #listenOptionChanges = (options) => {
        options.forEach(_option => {
            this.#optionSubscription.add(_option._turnOn$.subscribe(turnOn => {
                if (turnOn) {
                    this.#selectParents(this.options.toArray(), _option);
                }
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenOptionChanges(_option.options.toArray());
            }
        });
    };
    #listenFloatingOptionChanges = (options) => {
        options.forEach(_option => {
            this.#floatingOptionSubscription.add(_option._turnOn$.subscribe(turnOn => {
                if (turnOn) {
                    this.floatingOptions.forEach(__option => {
                        if (__option.getId() !== _option.getId()) {
                            setTimeout(() => {
                                __option.selectedChange.emit(false);
                            }, 100);
                        }
                    });
                }
            }));
        });
    };
    #selectParents = (options, option) => {
        let founded = false;
        for (let i = 0; i < options.length; i++) {
            if (options[i].getId() === option.getId()) {
                founded = true;
            }
            else if (options[i].options && options[i].options.length > 0) {
                const _founded = this.#selectParents(options[i].options.toArray(), option);
                if (_founded) {
                    founded = true;
                    setTimeout(() => {
                        options[i].selectedChange.emit(true);
                    }, 100);
                }
                else {
                    setTimeout(() => {
                        options[i].selectedChange.emit(false);
                    }, 100);
                }
            }
            else {
                setTimeout(() => {
                    options[i].selectedChange.emit(false);
                }, 100);
            }
        }
        return founded;
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
        this.#floatingOptionSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarComponent, selector: "bizy-sidebar", inputs: { id: "id", toggle: "toggle" }, outputs: { onToggle: "onToggle" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }, { propertyName: "floatingOptions", predicate: BizySidebarFloatingOptionComponent }], ngImport: i0, template: "<div class=\"bizy-sidebar\" [id]=\"id\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"toggle = !toggle; onToggle.emit(toggle)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"toggle\"/>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__top\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__bottom\"  [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width)}.bizy-sidebar{min-width:-moz-fit-content;min-width:fit-content;height:100%;max-height:100vh;background-color:var(--bizy-sidebar-background-color);position:relative;transition:width .2s ease;display:grid;grid-template-columns:100%;grid-template-rows:auto 1fr auto}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__top{overflow:hidden;align-self:start}.bizy-sidebar__bottom{overflow:hidden;align-self:end}.bizy-sidebar__content{display:flex;min-height:var(--bizy-sidebar-section-min-height);width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding:var(--bizy-sidebar-padding);overflow-x:hidden;transition:width .2s ease}.bizy-sidebar__content--shrinked{padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-scroll-bar-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-sidebar\" [id]=\"id\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"toggle = !toggle; onToggle.emit(toggle)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"toggle\"/>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__top\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__bottom\"  [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width)}.bizy-sidebar{min-width:-moz-fit-content;min-width:fit-content;height:100%;max-height:100vh;background-color:var(--bizy-sidebar-background-color);position:relative;transition:width .2s ease;display:grid;grid-template-columns:100%;grid-template-rows:auto 1fr auto}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__top{overflow:hidden;align-self:start}.bizy-sidebar__bottom{overflow:hidden;align-self:end}.bizy-sidebar__content{display:flex;min-height:var(--bizy-sidebar-section-min-height);width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding:var(--bizy-sidebar-padding);overflow-x:hidden;transition:width .2s ease}.bizy-sidebar__content--shrinked{padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-scroll-bar-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], floatingOptions: [{
                type: ContentChildren,
                args: [BizySidebarFloatingOptionComponent]
            }], toggle: [{
                type: Input
            }], onToggle: [{
                type: Output
            }] } });

const COMPONENTS$c = [
    BizyAccordionComponent,
];
class BizyAccordionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionModule, declarations: [BizyAccordionComponent], imports: [CommonModule, FormsModule], exports: [BizyAccordionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$c,
                    exports: COMPONENTS$c
                }]
        }] });

const COMPONENTS$b = [
    BizySidebarComponent,
    BizySidebarOptionComponent,
    BizySidebarFloatingOptionComponent,
    BizySidebarFloatingOptionTitleComponent
];
class BizySidebarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, declarations: [BizySidebarComponent,
            BizySidebarOptionComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarFloatingOptionTitleComponent], imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule], exports: [BizySidebarComponent,
            BizySidebarOptionComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarFloatingOptionTitleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule],
                    declarations: COMPONENTS$b,
                    exports: COMPONENTS$b
                }]
        }] });

class BizyTableRowExpandContentComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableRowExpandContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableRowExpandContentComponent, selector: "bizy-table-row-expand-content", ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;width:100%;background-color:var(--bizy-table-row-expand-content-background-color);border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;padding:.5rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableRowExpandContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row-expand-content', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;width:100%;background-color:var(--bizy-table-row-expand-content-background-color);border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;padding:.5rem}\n"] }]
        }] });

// FIX: This components fixes the bug with Angular CDK virtual scrolling not supporting content projection.
// https://github.com/angular/components/issues/15277
class BizyTableScrollingComponent {
    document;
    elementRef;
    content;
    #view;
    items$;
    itemTemplate;
    itemSize;
    constructor(document, elementRef) {
        this.document = document;
        this.elementRef = elementRef;
    }
    /** Called by the virtual-for directive inside of the viewport. */
    attachView(tableDirective) {
        if (this.#view) {
            return;
        }
        let itemSize = 30;
        const rowHeight = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-table-row-height');
        const fontSize = getComputedStyle(this.document.documentElement).getPropertyValue('font-size');
        const gap = Number(fontSize.split('px')[0]) * 0.1;
        if (rowHeight && rowHeight.includes('rem')) {
            itemSize = Number(fontSize.split('px')[0]) * Number(rowHeight.split('rem')[0]);
        }
        else if (rowHeight && rowHeight.includes('px')) {
            itemSize = Number(rowHeight.split('px')[0]);
        }
        this.itemSize = itemSize + gap;
        this.items$ = tableDirective.items$;
        this.itemTemplate = tableDirective.template;
        this.#view = tableDirective.viewContainerRef;
        this.#view.createEmbeddedView(this.content);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingComponent, deps: [{ token: DOCUMENT }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableScrollingComponent, selector: "bizy-table-scrolling", viewQueries: [{ propertyName: "content", first: true, predicate: ["tableScrollingContent"], descendants: true }], ngImport: i0, template: "<cdk-virtual-scroll-viewport \n    [itemSize]=\"itemSize\"\n    [minBufferPx]=\"itemSize + (itemSize * 20)\"\n    [maxBufferPx]=\"itemSize + (itemSize * 40)\">\n    \n    <ng-content></ng-content>\n\n    <ng-template #tableScrollingContent>\n      <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"items$ | async\">\n        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\"></ng-template>\n      </ng-template>\n    </ng-template>\n</cdk-virtual-scroll-viewport>", styles: ["::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-table-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2$2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2$2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2$2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-scrolling', template: "<cdk-virtual-scroll-viewport \n    [itemSize]=\"itemSize\"\n    [minBufferPx]=\"itemSize + (itemSize * 20)\"\n    [maxBufferPx]=\"itemSize + (itemSize * 40)\">\n    \n    <ng-content></ng-content>\n\n    <ng-template #tableScrollingContent>\n      <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"items$ | async\">\n        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\"></ng-template>\n      </ng-template>\n    </ng-template>\n</cdk-virtual-scroll-viewport>", styles: ["::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-table-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['tableScrollingContent']
            }] } });

class BizyTableScrollingDirective {
    viewContainerRef;
    template;
    ref;
    #items = new BehaviorSubject([]);
    get items$() {
        return this.#items.asObservable();
    }
    set tableForIn(value) {
        this.#items.next(value);
    }
    constructor(viewContainerRef, template, ref) {
        this.viewContainerRef = viewContainerRef;
        this.template = template;
        this.ref = ref;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableScrollingDirective, selector: "[tableFor]", inputs: { tableForIn: "tableForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tableFor]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef, decorators: [{
                    type: Inject,
                    args: [ViewContainerRef]
                }] }, { type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { tableForIn: [{
                type: Input
            }] } });

class BizyTableColumnArrowsComponent {
    order = null;
    show = false;
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnArrowsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableColumnArrowsComponent, selector: "bizy-table-column-arrows", inputs: { order: "order", show: "show", customClass: "customClass" }, ngImport: i0, template: "<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 448 512\"\n    *ngIf=\"order !== 'asc' && order !== 'desc'\"\n    name=\"bizy-table-column-arrows\"\n    class=\"bizy-table-column-arrows bizy-table-column-arrows__down-up animated fade-in {{customClass}}\">\n    <path d=\"M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z\"/>\n</svg>\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'desc'\"\n    name=\"bizy-table-column-down-arrow\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\">\n    <path d=\"M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z\"/>\n</svg>\n\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'asc'\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\"\n    name=\"bizy-table-column-up-arrow\">\n    <path d=\"M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z\"/>\n</svg>\n", styles: [":host{font-size:1rem}.bizy-table-column-arrows__down-up{transform:rotate(90deg)}.bizy-table-column-arrows{display:none;font-size:1rem;height:1rem;fill:var(--bizy-table-column-arrows-color)}.bizy-table-column-arrows--visible{display:inline-block}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnArrowsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-column-arrows', changeDetection: ChangeDetectionStrategy.OnPush, template: "<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 448 512\"\n    *ngIf=\"order !== 'asc' && order !== 'desc'\"\n    name=\"bizy-table-column-arrows\"\n    class=\"bizy-table-column-arrows bizy-table-column-arrows__down-up animated fade-in {{customClass}}\">\n    <path d=\"M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z\"/>\n</svg>\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'desc'\"\n    name=\"bizy-table-column-down-arrow\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\">\n    <path d=\"M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z\"/>\n</svg>\n\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'asc'\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\"\n    name=\"bizy-table-column-up-arrow\">\n    <path d=\"M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z\"/>\n</svg>\n", styles: [":host{font-size:1rem}.bizy-table-column-arrows__down-up{transform:rotate(90deg)}.bizy-table-column-arrows{display:none;font-size:1rem;height:1rem;fill:var(--bizy-table-column-arrows-color)}.bizy-table-column-arrows--visible{display:inline-block}\n"] }]
        }], propDecorators: { order: [{
                type: Input
            }], show: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

class BizyTableColumnComponent {
    id = `bizy-table-column-${Math.random()}`;
    customClass = '';
    onSelect = new EventEmitter();
    getId = () => {
        return this.id;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableColumnComponent, selector: "bizy-table-column", inputs: { id: "id", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"onSelect.emit($event)\"\n    (keyup.enter)=\"onSelect.emit($event)\"\n    class=\"bizy-table-column {{customClass}}\">\n\n    <ng-content></ng-content>\n    \n</button>", styles: [":host{font-size:1rem;flex:1;height:var(--bizy-table-row-height);display:flex;-webkit-user-select:text;user-select:text}:host:has(.bizy-table-column-arrows) .bizy-table-column{cursor:pointer!important}.bizy-table-column{font-size:1rem;min-width:var(--bizy-table-column-min-width);width:100%;border-top:var(--bizy-table-column-border-top);border-right:var(--bizy-table-column-border-right);border-bottom:var(--bizy-table-column-border-bottom);border-left:var(--bizy-table-column-border-left);background-color:var(--bizy-table-column-background-color);display:flex;align-items:center;justify-content:var(--bizy-table-column-justify-content);column-gap:.3rem;padding-right:.3rem}::ng-deep .bizy-table-column *{text-align:start}::ng-deep .bizy-table-column:hover .bizy-table-column-arrows{display:inline-block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-column', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"onSelect.emit($event)\"\n    (keyup.enter)=\"onSelect.emit($event)\"\n    class=\"bizy-table-column {{customClass}}\">\n\n    <ng-content></ng-content>\n    \n</button>", styles: [":host{font-size:1rem;flex:1;height:var(--bizy-table-row-height);display:flex;-webkit-user-select:text;user-select:text}:host:has(.bizy-table-column-arrows) .bizy-table-column{cursor:pointer!important}.bizy-table-column{font-size:1rem;min-width:var(--bizy-table-column-min-width);width:100%;border-top:var(--bizy-table-column-border-top);border-right:var(--bizy-table-column-border-right);border-bottom:var(--bizy-table-column-border-bottom);border-left:var(--bizy-table-column-border-left);background-color:var(--bizy-table-column-background-color);display:flex;align-items:center;justify-content:var(--bizy-table-column-justify-content);column-gap:.3rem;padding-right:.3rem}::ng-deep .bizy-table-column *{text-align:start}::ng-deep .bizy-table-column:hover .bizy-table-column-arrows{display:inline-block}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizyCheckboxComponent {
    id = `bizy-checkbox-${Math.random()}`;
    selected = false;
    disabled = false;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _checkboxId = `bizy-input-checkbox-${Math.random()}`;
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.selectedChange.emit(!this.selected);
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: { id: "id", selected: "selected", disabled: "disabled" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<button type=\"button\" [id]=\"id\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\" class=\"bizy-checkbox\" [ngClass]=\"{'bizy-checkbox--disabled': disabled}\">\n\n  <ng-content select=\"[slot=start]\"></ng-content>\n\n  <input class=\"bizy-checkbox__input\" type=\"checkbox\" [id]=\"_checkboxId\" [disabled]=\"disabled\" [ngModel]=\"selected\">\n\n  <ng-content select=\"[slot=end]\"></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-checkbox{display:flex;column-gap:.5rem;align-items:center;border:none;cursor:pointer;background-color:transparent}.bizy-checkbox:hover .bizy-checkbox__input:not(:checked){background-color:var(--bizy-checkbox-hover-color)}.bizy-checkbox--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-checkbox__input{position:relative;width:1rem;height:1rem;color:var(--bizy-checkbox-border-color);border:.1rem solid var(--bizy-checkbox-border-color);border-radius:.3rem;appearance:none;outline:0;cursor:pointer;transition:background-color 175ms cubic-bezier(.1,.1,.25,1)}.bizy-checkbox__input:before{position:absolute;content:\"\";display:block;top:0;left:.25rem;width:.4rem;height:.7rem;border-style:solid;border-color:#fff;border-width:0 2px 2px 0;transform:rotate(45deg);opacity:0}.bizy-checkbox__input:checked{color:#fff;border-color:var(--bizy-checkbox-color);background-color:var(--bizy-checkbox-color)}.bizy-checkbox__input:checked:before{opacity:1}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-checkbox', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button type=\"button\" [id]=\"id\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\" class=\"bizy-checkbox\" [ngClass]=\"{'bizy-checkbox--disabled': disabled}\">\n\n  <ng-content select=\"[slot=start]\"></ng-content>\n\n  <input class=\"bizy-checkbox__input\" type=\"checkbox\" [id]=\"_checkboxId\" [disabled]=\"disabled\" [ngModel]=\"selected\">\n\n  <ng-content select=\"[slot=end]\"></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-checkbox{display:flex;column-gap:.5rem;align-items:center;border:none;cursor:pointer;background-color:transparent}.bizy-checkbox:hover .bizy-checkbox__input:not(:checked){background-color:var(--bizy-checkbox-hover-color)}.bizy-checkbox--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-checkbox__input{position:relative;width:1rem;height:1rem;color:var(--bizy-checkbox-border-color);border:.1rem solid var(--bizy-checkbox-border-color);border-radius:.3rem;appearance:none;outline:0;cursor:pointer;transition:background-color 175ms cubic-bezier(.1,.1,.25,1)}.bizy-checkbox__input:before{position:absolute;content:\"\";display:block;top:0;left:.25rem;width:.4rem;height:.7rem;border-style:solid;border-color:#fff;border-width:0 2px 2px 0;transform:rotate(45deg);opacity:0}.bizy-checkbox__input:checked{color:#fff;border-color:var(--bizy-checkbox-color);background-color:var(--bizy-checkbox-color)}.bizy-checkbox__input:checked:before{opacity:1}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

class BizyTableRowComponent {
    ref;
    id = `bizy-table-row-${Math.random()}`;
    customClass = '';
    disabled = false;
    selected = false;
    opened = false;
    selectable = null;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    openedChange = new EventEmitter();
    onOpen = new EventEmitter();
    marginRight = 0;
    constructor(ref) {
        this.ref = ref;
    }
    _onOpen(event) {
        if (this.disabled) {
            return;
        }
        this.openedChange.emit(!this.opened);
        this.onOpen.emit(event);
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    setSelectable = (selectable) => {
        if (this.selectable === false) {
            return;
        }
        this.selectable = selectable;
        this.ref.detectChanges();
    };
    setSelected = (selected) => {
        if (this.selectable === false) {
            return;
        }
        this.selected = selected;
        this.selectedChange.emit(selected);
        this.ref.detectChanges();
    };
    setMarginRight(margin) {
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableRowComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableRowComponent, selector: "bizy-table-row", inputs: { id: "id", customClass: "customClass", disabled: "disabled", selected: "selected", opened: "opened", selectable: "selectable" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect", openedChange: "openedChange", onOpen: "onOpen" }, ngImport: i0, template: "<bizy-accordion \n    class=\"bizy-table-row__accordion\"\n    customClass=\"bizy-table-row__accordion {{disabled ? 'bizy-table-row--disabled' : ''}} {{selected ? 'bizy-table-row--selected' : ''}} {{opened ? 'bizy-table-row--opened' : ''}}\"\n    [(opened)]=\"opened\"\n    (onSelect)=\"_onOpen($event)\">\n\n    <button\n        type=\"button\"\n        [id]=\"id\"\n        class=\"bizy-table-row {{customClass}}\"\n        (click)=\"selectedChange.emit(!selected)\"\n        (keyup.enter)=\"selectedChange.emit(!selected)\"\n        [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n        <ng-content select=\"bizy-table-column\"></ng-content>\n\n        <bizy-checkbox \n            *ngIf=\"selectable !== null\"\n            class=\"bizy-table-row__checkbox\"\n            [ngStyle]=\"{right: marginRight + 'px'}\"\n            [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event); $event.stopPropagation()\">\n        </bizy-checkbox>\n        \n    </button>\n\n    <ng-content accordion-option select=\"bizy-table-row-expand-content\"></ng-content>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;width:100%;display:flex;min-width:-moz-fit-content;min-width:fit-content;margin-bottom:.1rem}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row__accordion:hover{background-color:var(--bizy-table-row-hover-background-color)!important}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row:hover{background-color:inherit!important}::ng-deep .bizy-table-row__accordion{padding:0!important;--bizy-accordion-background-color: var(--bizy-table-row-background-color);--bizy-accordion-padding-left: 0}::ng-deep .bizy-table-row__accordion .bizy-accordion__options{--bizy-accordion-padding-left: 0}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:-moz-fit-content;height:fit-content;border:none;min-height:var(--bizy-table-row-height);background-color:inherit;border-bottom:inherit}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color)!important}::ng-deep .bizy-table-row--opened{background-color:var(--bizy-table-row-opened-background-color)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }, { kind: "component", type: BizyAccordionComponent, selector: "bizy-accordion", inputs: ["id", "customClass", "disabled", "opened"], outputs: ["openedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-accordion \n    class=\"bizy-table-row__accordion\"\n    customClass=\"bizy-table-row__accordion {{disabled ? 'bizy-table-row--disabled' : ''}} {{selected ? 'bizy-table-row--selected' : ''}} {{opened ? 'bizy-table-row--opened' : ''}}\"\n    [(opened)]=\"opened\"\n    (onSelect)=\"_onOpen($event)\">\n\n    <button\n        type=\"button\"\n        [id]=\"id\"\n        class=\"bizy-table-row {{customClass}}\"\n        (click)=\"selectedChange.emit(!selected)\"\n        (keyup.enter)=\"selectedChange.emit(!selected)\"\n        [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n        <ng-content select=\"bizy-table-column\"></ng-content>\n\n        <bizy-checkbox \n            *ngIf=\"selectable !== null\"\n            class=\"bizy-table-row__checkbox\"\n            [ngStyle]=\"{right: marginRight + 'px'}\"\n            [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event); $event.stopPropagation()\">\n        </bizy-checkbox>\n        \n    </button>\n\n    <ng-content accordion-option select=\"bizy-table-row-expand-content\"></ng-content>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;width:100%;display:flex;min-width:-moz-fit-content;min-width:fit-content;margin-bottom:.1rem}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row__accordion:hover{background-color:var(--bizy-table-row-hover-background-color)!important}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row:hover{background-color:inherit!important}::ng-deep .bizy-table-row__accordion{padding:0!important;--bizy-accordion-background-color: var(--bizy-table-row-background-color);--bizy-accordion-padding-left: 0}::ng-deep .bizy-table-row__accordion .bizy-accordion__options{--bizy-accordion-padding-left: 0}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:-moz-fit-content;height:fit-content;border:none;min-height:var(--bizy-table-row-height);background-color:inherit;border-bottom:inherit}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color)!important}::ng-deep .bizy-table-row--opened{background-color:var(--bizy-table-row-opened-background-color)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], opened: [{
                type: Input
            }], selectable: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], openedChange: [{
                type: Output
            }], onOpen: [{
                type: Output
            }] } });

class BizyTableFooterComponent {
    ref;
    elementRef;
    id = `bizy-table-footer-${Math.random()}`;
    customClass = '';
    marginRight = 0;
    _selectable = false;
    constructor(ref, elementRef) {
        this.ref = ref;
        this.elementRef = elementRef;
    }
    getId = () => {
        return this.id;
    };
    setSelectable = (selectable) => {
        this._selectable = selectable;
        this.ref.detectChanges();
    };
    setMarginRight(margin) {
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableFooterComponent, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableFooterComponent, selector: "bizy-table-footer", inputs: { id: "id", customClass: "customClass" }, ngImport: i0, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-footer-background-color)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-footer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-footer-background-color)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

class BizyTableHeaderComponent {
    ref;
    elementRef;
    id = `bizy-table-header-${Math.random()}`;
    customClass = '';
    selected = false;
    selectable = null;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    marginRight = 0;
    constructor(ref, elementRef) {
        this.ref = ref;
        this.elementRef = elementRef;
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    setSelectable = (selectable) => {
        if (this.selectable === false) {
            return;
        }
        this.selectable = selectable;
        this.ref.detectChanges();
    };
    setMarginRight(margin) {
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableHeaderComponent, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableHeaderComponent, selector: "bizy-table-header", inputs: { id: "id", customClass: "customClass", selected: "selected", selectable: "selectable" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectable: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

class BizyTableComponent {
    ref;
    document;
    renderer;
    elementRef;
    viewport;
    virtualFor;
    header;
    rows;
    footer;
    resizeRef = null;
    #selectableMutationObserver;
    #rowScrollingMutationObserver;
    #afterContentInitObserver;
    #resizeObserver;
    notifier$ = new Subject();
    #subscription = new Subscription();
    marginRight = 0;
    set selectable(selectable) {
        this.#selectableMutationObserver = new MutationObserver(() => {
            if (!this.rows || this.rows.length === 0) {
                return;
            }
            this.rows.forEach(_row => {
                _row.setSelectable(selectable);
                _row.setMarginRight(this.marginRight);
            });
            if (this.header) {
                this.header.setSelectable(selectable);
            }
            if (this.footer) {
                this.footer.setSelectable(selectable);
            }
            this.ref.detectChanges();
        });
        this.#selectableMutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    ;
    constructor(ref, document, renderer, elementRef) {
        this.ref = ref;
        this.document = document;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        this.#rowScrollingMutationObserver = new MutationObserver(() => {
            if (!this.virtualFor || !this.viewport) {
                return;
            }
            if (this.elementRef.nativeElement.offsetHeight) {
                const fontSize = getComputedStyle(this.document.documentElement).getPropertyValue('font-size');
                const gap = Number(fontSize.split('px')[0]) * 0.3;
                this.renderer.setStyle(this.viewport.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.offsetHeight - (this.header ? this.header.elementRef.nativeElement.offsetHeight + gap : 0) - (this.footer ? this.footer.elementRef.nativeElement.offsetHeight + gap : 0)}px`);
            }
            this.viewport.attachView(this.virtualFor);
            this.#rowScrollingMutationObserver.disconnect();
            this.ref.detectChanges();
            this.#afterContentInitObserver = new MutationObserver(() => {
                if (!this.elementRef.nativeElement.offsetWidth) {
                    return;
                }
                this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
                this.rows.forEach(_row => {
                    _row.setMarginRight(this.marginRight);
                });
                if (this.header) {
                    this.header.setMarginRight(this.marginRight);
                }
                if (this.footer) {
                    this.footer.setMarginRight(this.marginRight);
                }
                this.#subscription.add(fromEvent(this.elementRef.nativeElement, 'scroll', { capture: true }).subscribe(() => {
                    this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
                    this.rows.forEach(_row => {
                        _row.setMarginRight(this.marginRight);
                    });
                    if (this.header) {
                        this.header.setMarginRight(this.marginRight);
                    }
                    if (this.footer) {
                        this.footer.setMarginRight(this.marginRight);
                    }
                }));
                this.#afterContentInitObserver.disconnect();
                this.ref.detectChanges();
            });
            this.#afterContentInitObserver.observe(this.document.body, { childList: true, subtree: true });
        });
        this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });
        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
        const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
        this.#resizeObserver.observe(resizeRef);
        this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(200)).subscribe(() => {
            if (this.viewport && this.elementRef.nativeElement.offsetHeight) {
                const fontSize = getComputedStyle(this.document.documentElement).getPropertyValue('font-size');
                const gap = Number(fontSize.split('px')[0]) * 0.3;
                this.renderer.setStyle(this.viewport.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.offsetHeight - (this.header ? this.header.elementRef.nativeElement.offsetHeight + gap : 0) - (this.footer ? this.footer.elementRef.nativeElement.offsetHeight + gap : 0)}px`);
            }
            this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
            this.rows.forEach(_row => {
                _row.setMarginRight(this.marginRight);
            });
            if (this.header) {
                this.header.setMarginRight(this.marginRight);
            }
            if (this.footer) {
                this.footer.setMarginRight(this.marginRight);
            }
        }));
        this.notifier$.next();
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#selectableMutationObserver) {
            this.#selectableMutationObserver.disconnect();
        }
        if (this.#rowScrollingMutationObserver) {
            this.#rowScrollingMutationObserver.disconnect();
        }
        if (this.#afterContentInitObserver) {
            this.#afterContentInitObserver.disconnect();
        }
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: Renderer2 }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableComponent, selector: "bizy-table", inputs: { resizeRef: "resizeRef", selectable: "selectable" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyTableScrollingDirective, descendants: true }, { propertyName: "header", first: true, predicate: BizyTableHeaderComponent, descendants: true }, { propertyName: "footer", first: true, predicate: BizyTableFooterComponent, descendants: true }, { propertyName: "rows", predicate: BizyTableRowComponent }], viewQueries: [{ propertyName: "viewport", first: true, predicate: BizyTableScrollingComponent, descendants: true }], ngImport: i0, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-table-min-height);max-height:var(--bizy-table-max-height);height:var(--bizy-table-height);width:var(--bizy-table-width);flex:1;overflow-x:auto;overflow-y:hidden}.bizy-table{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"], dependencies: [{ kind: "component", type: BizyTableScrollingComponent, selector: "bizy-table-scrolling" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-table-min-height);max-height:var(--bizy-table-max-height);height:var(--bizy-table-height);width:var(--bizy-table-width);flex:1;overflow-x:auto;overflow-y:hidden}.bizy-table{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { viewport: [{
                type: ViewChild,
                args: [BizyTableScrollingComponent]
            }], virtualFor: [{
                type: ContentChild,
                args: [BizyTableScrollingDirective]
            }], header: [{
                type: ContentChild,
                args: [BizyTableHeaderComponent]
            }], rows: [{
                type: ContentChildren,
                args: [BizyTableRowComponent]
            }], footer: [{
                type: ContentChild,
                args: [BizyTableFooterComponent]
            }], resizeRef: [{
                type: Input
            }], selectable: [{
                type: Input
            }] } });

const COMPONENTS$a = [
    BizyCheckboxComponent,
];
class BizyCheckboxModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxModule, declarations: [BizyCheckboxComponent], imports: [CommonModule, FormsModule], exports: [BizyCheckboxComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$a,
                    exports: COMPONENTS$a
                }]
        }] });

const COMPONENTS$9 = [
    BizyTableComponent,
    BizyTableHeaderComponent,
    BizyTableFooterComponent,
    BizyTableRowComponent,
    BizyTableColumnComponent,
    BizyTableColumnArrowsComponent,
    BizyTableScrollingDirective,
    BizyTableScrollingComponent,
    BizyTableRowExpandContentComponent
];
class BizyTableModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, declarations: [BizyTableComponent,
            BizyTableHeaderComponent,
            BizyTableFooterComponent,
            BizyTableRowComponent,
            BizyTableColumnComponent,
            BizyTableColumnArrowsComponent,
            BizyTableScrollingDirective,
            BizyTableScrollingComponent,
            BizyTableRowExpandContentComponent], imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule], exports: [BizyTableComponent,
            BizyTableHeaderComponent,
            BizyTableFooterComponent,
            BizyTableRowComponent,
            BizyTableColumnComponent,
            BizyTableColumnArrowsComponent,
            BizyTableScrollingDirective,
            BizyTableScrollingComponent,
            BizyTableRowExpandContentComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule],
                    declarations: COMPONENTS$9,
                    exports: COMPONENTS$9
                }]
        }] });

class BizyMenuTitleComponent {
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyMenuTitleComponent, selector: "bizy-menu-title", inputs: { customClass: "customClass" }, ngImport: i0, template: "<span class=\"bizy-menu-title {{customClass}}\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem}.bizy-menu-title{background-color:var(--bizy-menu-title-background-color);color:var(--bizy-menu-title-color);padding:.5rem;cursor:default;-webkit-text-decoration:underline .1rem var(--bizy-menu-title-underline-color);text-decoration:underline .1rem var(--bizy-menu-title-underline-color);text-underline-offset:.3rem;display:flex;align-items:center}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-menu-title {{customClass}}\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem}.bizy-menu-title{background-color:var(--bizy-menu-title-background-color);color:var(--bizy-menu-title-color);padding:.5rem;cursor:default;-webkit-text-decoration:underline .1rem var(--bizy-menu-title-underline-color);text-decoration:underline .1rem var(--bizy-menu-title-underline-color);text-underline-offset:.3rem;display:flex;align-items:center}\n"] }]
        }], propDecorators: { customClass: [{
                type: Input
            }] } });

class BizyMenuOptionComponent {
    id = `bizy-menu-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyMenuOptionComponent, selector: "bizy-menu-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-menu-option--selected': selected, 'bizy-menu-option--disabled': disabled}\"\n    class=\"bizy-menu-option {{customClass}}\">\n\n    <span class=\"bizy-menu-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<span class=\"bizy-menu-option__menu\">\n    <ng-content select=\"bizy-menu\"></ng-content>\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu-option__menu:not(:empty)) .bizy-menu-option{display:none!important}.bizy-menu-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-menu-option-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-menu-option-color);cursor:pointer}.bizy-menu-option:hover{background-color:var(--bizy-menu-option-hover-background-color)}.bizy-menu-option--selected{color:var(--bizy-menu-option-selected-color)!important;background-color:var(--bizy-menu-option-selected-background-color)!important}::ng-deep .bizy-menu-option--selected *{color:var(--bizy-menu-option-selected-color)!important}.bizy-menu-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-menu-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;width:100%}::ng-deep .bizy-menu-option__menu *{color:var(--bizy-menu-option-color);fill:var(--bizy-menu-option-color)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-menu-option--selected': selected, 'bizy-menu-option--disabled': disabled}\"\n    class=\"bizy-menu-option {{customClass}}\">\n\n    <span class=\"bizy-menu-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<span class=\"bizy-menu-option__menu\">\n    <ng-content select=\"bizy-menu\"></ng-content>\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu-option__menu:not(:empty)) .bizy-menu-option{display:none!important}.bizy-menu-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-menu-option-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-menu-option-color);cursor:pointer}.bizy-menu-option:hover{background-color:var(--bizy-menu-option-hover-background-color)}.bizy-menu-option--selected{color:var(--bizy-menu-option-selected-color)!important;background-color:var(--bizy-menu-option-selected-background-color)!important}::ng-deep .bizy-menu-option--selected *{color:var(--bizy-menu-option-selected-color)!important}.bizy-menu-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-menu-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;width:100%}::ng-deep .bizy-menu-option__menu *{color:var(--bizy-menu-option-color);fill:var(--bizy-menu-option-color)}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizyMenuComponent {
    ref;
    options;
    id = `bizy-menu-${Math.random()}`;
    disabled = false;
    offsetX = 0;
    offsetY = 0;
    customClass = '';
    hideArrow = false;
    opened = false;
    onSelect = new EventEmitter();
    _menuWidth;
    #subscription = new Subscription();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
        if (this.options && this.options.length > 0) {
            this.selectButton(event);
        }
    }
    selectButton(event) {
        this.opened = !this.opened;
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._menuWidth = event.srcElement.offsetWidth;
        }
        if (this.opened) {
            if (this.options) {
                this.options.forEach((option) => {
                    this.#subscription.add(option.onSelect.subscribe(event => {
                        this.close(event);
                    }));
                });
            }
        }
        else {
            this.#subscription.unsubscribe();
        }
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this.opened = false;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyMenuComponent, selector: "bizy-menu", inputs: { id: "id", disabled: "disabled", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", hideArrow: "hideArrow", opened: "opened" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizyMenuOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\"\n        *ngIf=\"!hideArrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\">\n\n        <span class=\"bizy-menu__options__header\">\n            <ng-content select=\"bizy-menu-title\"></ng-content>\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu__options:empty) .bizy-menu>.bizy-menu__arrow{display:none!important}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:var(--bizy-menu-padding);color:var(--bizy-menu-color);cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:var(--bizy-menu-arrow-height);pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-menu-color)}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color);min-width:-moz-fit-content;min-width:fit-content;max-height:var(--bizy-menu-height);overflow-y:auto;overflow-x:hidden;width:100%;display:flex;flex-direction:column;position:relative;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-menu__options__header{position:sticky;z-index:1;top:0;display:flex;flex-direction:column;row-gap:.3rem;background-color:#fff}::ng-deep .bizy-menu__options__header{--bizy-input-width: auto;--bizy-input-background-color: #fff;--bizy-input-min-width: var(--bizy-select-min-width);--bizy-input-max-width: auto}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\"\n        *ngIf=\"!hideArrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\">\n\n        <span class=\"bizy-menu__options__header\">\n            <ng-content select=\"bizy-menu-title\"></ng-content>\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu__options:empty) .bizy-menu>.bizy-menu__arrow{display:none!important}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:var(--bizy-menu-padding);color:var(--bizy-menu-color);cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:var(--bizy-menu-arrow-height);pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-menu-color)}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color);min-width:-moz-fit-content;min-width:fit-content;max-height:var(--bizy-menu-height);overflow-y:auto;overflow-x:hidden;width:100%;display:flex;flex-direction:column;position:relative;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-menu__options__header{position:sticky;z-index:1;top:0;display:flex;flex-direction:column;row-gap:.3rem;background-color:#fff}::ng-deep .bizy-menu__options__header{--bizy-input-width: auto;--bizy-input-background-color: #fff;--bizy-input-min-width: var(--bizy-select-min-width);--bizy-input-max-width: auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizyMenuOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], offsetX: [{
                type: Input
            }], offsetY: [{
                type: Input
            }], customClass: [{
                type: Input
            }], hideArrow: [{
                type: Input
            }], opened: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$8 = [
    BizyMenuComponent,
    BizyMenuOptionComponent,
    BizyMenuTitleComponent
];
class BizyMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, declarations: [BizyMenuComponent,
            BizyMenuOptionComponent,
            BizyMenuTitleComponent], imports: [CommonModule, FormsModule, OverlayModule], exports: [BizyMenuComponent,
            BizyMenuOptionComponent,
            BizyMenuTitleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, imports: [CommonModule, FormsModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule],
                    declarations: COMPONENTS$8,
                    exports: COMPONENTS$8
                }]
        }] });

class BizyFilterContentComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterContentComponent, selector: "bizy-filter-content", ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-content', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem}\n"] }]
        }] });

class BizyFilterSectionSearchOptionComponent {
    ref;
    id = `bizy-filter-section-search-option-${Math.random()}`;
    customClass = '';
    valueChange = new EventEmitter();
    onChange = new EventEmitter();
    _value = '';
    #activated = new BehaviorSubject(false);
    get activated$() {
        return this.#activated.asObservable();
    }
    set value(value) {
        if (typeof value === 'undefined' || value === null) {
            return;
        }
        if (Array.isArray(value)) {
            value = '';
        }
        this._value = value;
        this.#activated.next(Boolean(value));
        this.ref.detectChanges();
    }
    constructor(ref) {
        this.ref = ref;
    }
    _onChange(value) {
        this.valueChange.emit(value);
        this.onChange.emit(value);
        this.#activated.next(Boolean(value));
        this.ref.detectChanges();
    }
    getId = () => {
        return this.id;
    };
    getValue = () => {
        return this._value;
    };
    isActivated = () => {
        return this.#activated.value;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionSearchOptionComponent, selector: "bizy-filter-section-search-option", inputs: { id: "id", customClass: "customClass", value: "value" }, outputs: { valueChange: "valueChange", onChange: "onChange" }, ngImport: i0, template: "<bizy-input\n    [id]=\"id\" \n    (onChange)=\"_onChange($event)\"\n    [value]=\"_value\"\n    class=\"bizy-filter-section-search-option {{customClass}}\">\n\n    <span slot=\"header\"></span>\n\n    <ng-container slot=\"prefix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=suffix]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:100%}.bizy-filter-section-search-option{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "debounceTime", "rows", "disabled", "readonly", "value", "autofocus"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-search-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-input\n    [id]=\"id\" \n    (onChange)=\"_onChange($event)\"\n    [value]=\"_value\"\n    class=\"bizy-filter-section-search-option {{customClass}}\">\n\n    <span slot=\"header\"></span>\n\n    <ng-container slot=\"prefix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=suffix]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:100%}.bizy-filter-section-search-option{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], onChange: [{
                type: Output
            }], value: [{
                type: Input
            }] } });

class BizyFilterSectionCheckboxOptionComponent {
    ref;
    id = `bizy-filter-section-checkbox-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    onChange = new EventEmitter();
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        this._selected = selected;
        this.onSelect(selected);
    }
    _selected = true;
    constructor(ref) {
        this.ref = ref;
    }
    onSelect = (selected) => {
        if (this.disabled) {
            return;
        }
        this._selected = selected;
        this.onChange.emit(selected);
        this.ref.detectChanges();
    };
    getSelected = () => {
        return this._selected;
    };
    getId = () => {
        return this.id;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionCheckboxOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionCheckboxOptionComponent, selector: "bizy-filter-section-checkbox-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    [id]=\"id\"\n    (click)=\"onSelect(!_selected)\"\n    (keyup.enter)=\"onSelect(!_selected)\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        class=\"bizy-filter-section-checkbox-option__checkbox\"\n        [selected]=\"_selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}.bizy-filter-section-checkbox-option__checkbox{pointer-events:none}\n"], dependencies: [{ kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionCheckboxOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-checkbox-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    [id]=\"id\"\n    (click)=\"onSelect(!_selected)\"\n    (keyup.enter)=\"onSelect(!_selected)\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        class=\"bizy-filter-section-checkbox-option__checkbox\"\n        [selected]=\"_selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}.bizy-filter-section-checkbox-option__checkbox{pointer-events:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onChange: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });

class BizyFilterSectionRangeOptionComponent {
    fb;
    ref;
    id = `bizy-filter-section-range-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    onChange = new EventEmitter();
    _minLimit;
    _maxLimit;
    #activated = new BehaviorSubject(false);
    get activated$() {
        return this.#activated.asObservable();
    }
    form;
    set min(min) {
        if (typeof min === 'undefined' || min === null) {
            this.minValue.setValue(null);
        }
        else {
            this.minValue.setValue(min);
        }
        this.#activated.next(Boolean(min));
        this.ref.detectChanges();
    }
    ;
    set max(max) {
        if (typeof max === 'undefined' || max === null) {
            this.maxValue.setValue(null);
        }
        else {
            this.maxValue.setValue(max);
        }
        this.#activated.next(Boolean(max));
        this.ref.detectChanges();
    }
    ;
    set minLimit(min) {
        if (typeof min === 'undefined' || min === null) {
            return;
        }
        this._minLimit = min;
        if (typeof this._maxLimit === 'undefined' || this._maxLimit === null) {
            this.minValue.setValidators([Validators.max(min)]);
        }
        else {
            this.minValue.setValidators([Validators.max(this._maxLimit), Validators.min(min)]);
        }
    }
    ;
    set maxLimit(max) {
        if (typeof max === 'undefined' || max === null) {
            return;
        }
        this._maxLimit = max;
        if (typeof this._minLimit === 'undefined' || this._minLimit === null) {
            this.maxValue.setValidators([Validators.max(max)]);
        }
        else {
            this.maxValue.setValidators([Validators.min(this._minLimit), Validators.max(max)]);
        }
    }
    ;
    constructor(fb, ref) {
        this.fb = fb;
        this.ref = ref;
        this.form = this.fb.group({
            minValue: [null],
            maxValue: [null]
        });
    }
    setMinValue(value) {
        let min = value === '' ? null : Number(value);
        const max = this.maxValue.value === null || this.maxValue.value === '' ? null : Number(this.maxValue.value);
        if (min !== null && max !== null && max < min) {
            return;
        }
        if (typeof this._minLimit !== 'undefined' && this._minLimit !== null && min && min < this._minLimit) {
            min = this._minLimit;
        }
        this.onChange.emit({ min, max });
        this.#activated.next(Boolean(min) || Boolean(max));
        this.ref.detectChanges();
    }
    setMaxValue(value) {
        let max = !Boolean(value) && value !== 0 ? null : Number(value);
        const min = this.minValue.value === null || this.minValue.value === '' ? null : Number(this.minValue.value);
        if (min !== null && max !== null && max < min) {
            return;
        }
        if (typeof this._maxLimit !== 'undefined' && this._maxLimit !== null && max && max > this._maxLimit) {
            max = this._maxLimit;
        }
        this.onChange.emit({ min, max });
        this.#activated.next(Boolean(min) || Boolean(max));
        this.ref.detectChanges();
    }
    get minValue() {
        return this.form.get('minValue');
    }
    get maxValue() {
        return this.form.get('maxValue');
    }
    onClean = () => {
        this.minValue.setValue(null);
        this.maxValue.setValue(null);
        this.onChange.emit({ min: null, max: null });
        this.#activated.next(false);
        this.ref.detectChanges();
    };
    getId = () => {
        return this.id;
    };
    isActivated = () => {
        return this.#activated.value;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionRangeOptionComponent, deps: [{ token: FormBuilder }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionRangeOptionComponent, selector: "bizy-filter-section-range-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", min: "min", max: "max", minLimit: "minLimit", maxLimit: "maxLimit" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    [id]=\"id\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"minValue.value\"\n            (onChange)=\"setMinValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=min-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"maxValue.value\"\n            (onChange)=\"setMaxValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=max-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n    </span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}.bizy-filter-section-range-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "debounceTime", "rows", "disabled", "readonly", "value", "autofocus"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionRangeOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-range-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    [id]=\"id\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"minValue.value\"\n            (onChange)=\"setMinValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=min-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"maxValue.value\"\n            (onChange)=\"setMaxValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=max-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n    </span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}.bizy-filter-section-range-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder, decorators: [{
                    type: Inject,
                    args: [FormBuilder]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onChange: [{
                type: Output
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], minLimit: [{
                type: Input
            }], maxLimit: [{
                type: Input
            }] } });

class BizyFilterPipe {
    transform(items, property, states) {
        if (!items || items.length === 0) {
            return [];
        }
        if (!property || !states || states.length === 0) {
            return items;
        }
        const _selected = states.filter(_state => _state.selected);
        if (_selected.length === states.length) {
            return items;
        }
        let output = [];
        states.forEach(state => {
            if (!state.selected) {
                return;
            }
            const res = items.filter(_item => {
                let _state = _item;
                const nestedProperty = property.split('.');
                nestedProperty.forEach(_property => {
                    _state = _state[_property];
                });
                if (typeof state.id === 'boolean') {
                    return Boolean(_state) === state.id;
                }
                if (Array.isArray(_state)) {
                    return _state.includes(state.id);
                }
                return _state === state.id;
            });
            output = output.concat(res);
        });
        let map = new Map();
        output.forEach(obj => map.set(JSON.stringify(obj), obj));
        const uniqueArray = Array.from(map.values());
        return uniqueArray;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, name: "bizyFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyFilter'
                }]
        }] });

class BizyRangeFilterPipe {
    transform(items, property, range) {
        if (!items || items.length === 0) {
            return [];
        }
        if (!property || !range) {
            return items;
        }
        const min = range.min ?? null;
        const max = range.max ?? null;
        let itemsWithoutProperty = [];
        const output = items.filter(_item => {
            let _value = _item;
            const nestedProperty = property.split('.');
            for (let i = 0; i < nestedProperty.length; i++) {
                const _property = nestedProperty[i];
                if (typeof _value[_property] === 'undefined' || _value[_property] === null) {
                    itemsWithoutProperty.push(_item);
                    return false;
                }
                _value = _value[_property];
            }
            if (isNaN(_value)) {
                return false;
            }
            return (min === null || _value >= min) && (max === null || _value <= max);
        });
        return itemsWithoutProperty.length === items.length ? items : output;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRangeFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyRangeFilterPipe, name: "bizyRangeFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRangeFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyRangeFilter'
                }]
        }] });

class BizyFilterSectionComponent {
    document;
    ref;
    checkboxOptions;
    rangeOption;
    searchOption;
    id = `bizy-filter-section-${Math.random()}`;
    disabled = false;
    customClass = '';
    onSelect = new EventEmitter();
    #subscription = new Subscription();
    #mutationObserver;
    #checkboxOptions = [];
    _activated = false;
    constructor(document, ref) {
        this.document = document;
        this.ref = ref;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.checkboxOptions && (this.#checkboxOptions.length !== 0 || this.checkboxOptions.length !== 0) && !this.#optionsAreEqual(this.#checkboxOptions, this.checkboxOptions.toArray())) {
                this.#checkboxOptions = this.checkboxOptions.toArray();
                const selectedOptions = this.checkboxOptions.filter(_option => _option.getSelected() === true);
                this._activated = selectedOptions.length !== this.checkboxOptions.length;
                this.onSelect.emit(this._activated);
                this.ref.detectChanges();
                this.checkboxOptions.forEach(_option => {
                    this.#subscription.add(_option.onChange.subscribe(() => {
                        const selectedOptions = this.checkboxOptions.filter(_option => _option.getSelected() === true);
                        this._activated = selectedOptions.length !== this.checkboxOptions.length;
                        this.onSelect.emit(this._activated);
                        this.ref.detectChanges();
                    }));
                });
            }
            else if (this.rangeOption) {
                this.#subscription.add(this.rangeOption.activated$.subscribe(value => {
                    setTimeout(() => {
                        this._activated = value;
                        this.onSelect.emit(value);
                        this.ref.detectChanges();
                    });
                }));
                this.#mutationObserver.disconnect();
            }
            else if (this.searchOption) {
                this.#subscription.add(this.searchOption.activated$.subscribe(value => {
                    setTimeout(() => {
                        this._activated = value;
                        this.onSelect.emit(value);
                        this.ref.detectChanges();
                    });
                }));
                this.#mutationObserver.disconnect();
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onSelect = (selected) => {
        if (this.disabled || this.rangeOption) {
            return;
        }
        this.checkboxOptions.forEach(_option => {
            _option.onSelect(selected);
        });
    };
    onClean = () => {
        if (!this.rangeOption) {
            return;
        }
        this.rangeOption.onClean();
    };
    isActivated = () => {
        return this._activated;
    };
    getId = () => {
        return this.id;
    };
    #optionsAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort((a, b) => String(a.id).localeCompare(String(b.id)));
        arr2.sort((a, b) => String(a.id).localeCompare(String(b.id)));
        for (let i = 0; i < arr1.length; i++) {
            for (let key in arr1[i]) {
                if (arr1[i][key] !== arr2[i][key]) {
                    return false;
                }
            }
        }
        return true;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionComponent, deps: [{ token: DOCUMENT }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionComponent, selector: "bizy-filter-section", inputs: { id: "id", disabled: "disabled", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "rangeOption", first: true, predicate: BizyFilterSectionRangeOptionComponent, descendants: true }, { propertyName: "searchOption", first: true, predicate: BizyFilterSectionSearchOptionComponent, descendants: true }, { propertyName: "checkboxOptions", predicate: BizyFilterSectionCheckboxOptionComponent }], ngImport: i0, template: "<div class=\"bizy-filter-section {{customClass}}\" [id]=\"id\">\n\n    <span class=\"bizy-filter-section__header\">\n\n        <ng-content select=\"[slot=header]\"></ng-content>\n\n        <bizy-checkbox \n            class=\"bizy-filter-section__header__checkbox\"\n            (onSelect)=\"_onSelect(_activated)\"\n            [selected]=\"!_activated\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n\n        <button \n            type=\"button\"\n            class=\"bizy-filter-section__header__clear-button\"\n            (click)=\"onClean()\"\n            (keyup.enter)=\"onClean()\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"bizy-filter-section__header__clear-icon\">\n                <path d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\"/>\n            </svg>\n        </button>\n        \n    </span>\n\n    <span class=\"bizy-filter-section__options\">\n\n        <ng-content select=\"bizy-filter-section-checkbox-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-range-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-search-option\"></ng-content>\n\n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1;min-width:var(--bizy-filter-section-min-width)}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__options{overflow-y:auto!important}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.5rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;border:none;background-color:transparent;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;row-gap:.7rem;min-height:-moz-fit-content;min-height:fit-content;max-height:15rem;overflow-y:hidden;overflow-x:hidden}.bizy-filter-section__header__clear-button{width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;border:none;background-color:transparent;cursor:pointer}.bizy-filter-section__header__clear-icon{fill:var(--bizy-filter-section-clear-color);pointer-events:none;height:1rem}\n"], dependencies: [{ kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-filter-section {{customClass}}\" [id]=\"id\">\n\n    <span class=\"bizy-filter-section__header\">\n\n        <ng-content select=\"[slot=header]\"></ng-content>\n\n        <bizy-checkbox \n            class=\"bizy-filter-section__header__checkbox\"\n            (onSelect)=\"_onSelect(_activated)\"\n            [selected]=\"!_activated\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n\n        <button \n            type=\"button\"\n            class=\"bizy-filter-section__header__clear-button\"\n            (click)=\"onClean()\"\n            (keyup.enter)=\"onClean()\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"bizy-filter-section__header__clear-icon\">\n                <path d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\"/>\n            </svg>\n        </button>\n        \n    </span>\n\n    <span class=\"bizy-filter-section__options\">\n\n        <ng-content select=\"bizy-filter-section-checkbox-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-range-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-search-option\"></ng-content>\n\n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1;min-width:var(--bizy-filter-section-min-width)}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__options{overflow-y:auto!important}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.5rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;border:none;background-color:transparent;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;row-gap:.7rem;min-height:-moz-fit-content;min-height:fit-content;max-height:15rem;overflow-y:hidden;overflow-x:hidden}.bizy-filter-section__header__clear-button{width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;border:none;background-color:transparent;cursor:pointer}.bizy-filter-section__header__clear-icon{fill:var(--bizy-filter-section-clear-color);pointer-events:none;height:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { checkboxOptions: [{
                type: ContentChildren,
                args: [BizyFilterSectionCheckboxOptionComponent]
            }], rangeOption: [{
                type: ContentChild,
                args: [BizyFilterSectionRangeOptionComponent]
            }], searchOption: [{
                type: ContentChild,
                args: [BizyFilterSectionSearchOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizyFilterSectionsComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionsComponent, selector: "bizy-filter-sections", ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;background-color:inherit;width:-moz-fit-content;width:fit-content;max-width:70vw;grid-template-columns:repeat(auto-fit,minmax(var(--bizy-filter-section-min-width),1fr));display:grid;gap:1rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-sections', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;background-color:inherit;width:-moz-fit-content;width:fit-content;max-width:70vw;grid-template-columns:repeat(auto-fit,minmax(var(--bizy-filter-section-min-width),1fr));display:grid;gap:1rem}\n"] }]
        }] });

class BizyFilterComponent {
    document;
    ref;
    sections;
    id = `bizy-filter-${Math.random()}`;
    disabled = false;
    customClass = '';
    opened = false;
    onOpen = new EventEmitter();
    onChange = new EventEmitter();
    _filterWidth;
    _activated = false;
    #subscription = new Subscription();
    constructor(document, ref) {
        this.document = document;
        this.ref = ref;
    }
    ngAfterViewInit() {
        const mutationObserver = new MutationObserver(() => {
            if (this.sections && this.sections.length > 0) {
                const activatedSections = this.sections.filter(_section => _section.isActivated() === true);
                const activated = activatedSections.length > 0;
                if (this._activated !== activated) {
                    this._activated = activated;
                    this.onChange.emit(this._activated);
                    this.ref.detectChanges();
                }
                this.sections.forEach(_section => {
                    this.#subscription.add(_section.onSelect.subscribe(() => {
                        const activatedSections = this.sections.filter(_section => _section.isActivated() === true);
                        const activated = activatedSections.length > 0;
                        if (this._activated !== activated) {
                            this._activated = activated;
                            this.onChange.emit(this._activated);
                            this.ref.detectChanges();
                        }
                    }));
                });
                mutationObserver.disconnect();
            }
        });
        mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onOpen = (event) => {
        if (this.disabled) {
            return;
        }
        this.opened = !this.opened;
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._filterWidth = event.srcElement.offsetWidth;
        }
        this.onOpen.emit(event);
    };
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this.opened = false;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterComponent, deps: [{ token: DOCUMENT }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterComponent, selector: "bizy-filter", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen", onChange: "onChange" }, queries: [{ propertyName: "sections", predicate: BizyFilterSectionComponent, descendants: true }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections-wrapper\">\n\n        <bizy-filter-sections>\n    \n            <ng-content select=\"bizy-filter-section\"></ng-content>\n    \n        </bizy-filter-sections>\n\n        <ng-content select=\"bizy-filter-content\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding);color:var(--bizy-filter-color);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections-wrapper{background-color:var(--bizy-filter-background-color);display:flex;flex-direction:column;overflow-y:auto;max-height:40rem;max-width:70vw;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "component", type: BizyFilterSectionsComponent, selector: "bizy-filter-sections" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections-wrapper\">\n\n        <bizy-filter-sections>\n    \n            <ng-content select=\"bizy-filter-section\"></ng-content>\n    \n        </bizy-filter-sections>\n\n        <ng-content select=\"bizy-filter-content\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding);color:var(--bizy-filter-color);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections-wrapper{background-color:var(--bizy-filter-background-color);display:flex;flex-direction:column;overflow-y:auto;max-height:40rem;max-width:70vw;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { sections: [{
                type: ContentChildren,
                args: [BizyFilterSectionComponent, { descendants: true }]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], onOpen: [{
                type: Output
            }], onChange: [{
                type: Output
            }] } });

const COMPONENTS$7 = [
    BizyFilterComponent,
    BizyFilterContentComponent,
    BizyFilterSectionsComponent,
    BizyFilterSectionComponent,
    BizyFilterSectionCheckboxOptionComponent,
    BizyFilterSectionRangeOptionComponent,
    BizyFilterSectionSearchOptionComponent,
    BizyFilterPipe,
    BizyRangeFilterPipe,
];
class BizyFilterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, declarations: [BizyFilterComponent,
            BizyFilterContentComponent,
            BizyFilterSectionsComponent,
            BizyFilterSectionComponent,
            BizyFilterSectionCheckboxOptionComponent,
            BizyFilterSectionRangeOptionComponent,
            BizyFilterSectionSearchOptionComponent,
            BizyFilterPipe,
            BizyRangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule], exports: [BizyFilterComponent,
            BizyFilterContentComponent,
            BizyFilterSectionsComponent,
            BizyFilterSectionComponent,
            BizyFilterSectionCheckboxOptionComponent,
            BizyFilterSectionRangeOptionComponent,
            BizyFilterSectionSearchOptionComponent,
            BizyFilterPipe,
            BizyRangeFilterPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, providers: [BizyFilterPipe, BizyRangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule],
                    declarations: COMPONENTS$7,
                    exports: COMPONENTS$7,
                    providers: [BizyFilterPipe, BizyRangeFilterPipe]
                }]
        }] });

class BizySelectOptionComponent {
    elementRef;
    ref;
    id = `bizy-select-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    onSelect = new EventEmitter();
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        this.#selected.next(selected);
    }
    #selected = new BehaviorSubject(false);
    get selected$() {
        return this.#selected.asObservable();
    }
    constructor(elementRef, ref) {
        this.elementRef = elementRef;
        this.ref = ref;
    }
    _onSelect() {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit();
        this.ref.detectChanges();
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.#selected.value;
    };
    getValue = () => {
        const value = this.elementRef?.nativeElement?.firstChild?.children[0]?.innerText;
        return value ?? '';
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectOptionComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySelectOptionComponent, selector: "bizy-select-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': (selected$ | async), 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color)}.bizy-select-option--selected{background-color:var(--bizy-select-option-selected-background-color)!important}.bizy-select-option--selected ::ng-deep .bizy-select-option__content *{color:var(--bizy-select-option-selected-color)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': (selected$ | async), 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color)}.bizy-select-option--selected{background-color:var(--bizy-select-option-selected-background-color)!important}.bizy-select-option--selected ::ng-deep .bizy-select-option__content *{color:var(--bizy-select-option-selected-color)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });

class BizySelectComponent {
    ref;
    #viewContainerRef = inject(ViewContainerRef);
    templatePortalContent;
    options;
    bizyInput;
    id = `bizy-select-${Math.random()}`;
    disabled = false;
    readonly = false;
    customClass = '';
    opened = false;
    openedChange = new EventEmitter();
    onSelect = new EventEmitter();
    onOpen = new EventEmitter();
    _optionValue = '';
    optionPortal;
    templatePortal = null;
    #subscription = new Subscription();
    #contentChildrenSubscription = new Subscription();
    constructor(ref) {
        this.ref = ref;
    }
    get touched() {
        return this.bizyInput ? this.bizyInput.touched : false;
    }
    ngAfterViewInit() {
        this.templatePortal = new TemplatePortal(this.templatePortalContent, this.#viewContainerRef);
        this._optionValue = '';
        const option = this.options.find(_option => _option.getSelected());
        if (option) {
            this._optionValue = option.getValue();
        }
        this.options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(() => {
                this.close();
                this.ref.detectChanges();
            }));
            this.#subscription.add(_option.selected$.pipe(filter(_value => _value === true)).subscribe(() => {
                this._optionValue = _option.getValue();
                this.close();
                this.ref.detectChanges();
            }));
        });
        this.#contentChildrenSubscription.add(this.options.changes.subscribe(() => {
            this.#subscription.unsubscribe();
            this.#subscription = new Subscription();
            this.options.forEach(_option => {
                this.#subscription.add(_option.onSelect.subscribe(() => {
                    this.close();
                    this.ref.detectChanges();
                }));
                this.#subscription.add(_option.selected$.pipe(filter(_value => _value === true)).subscribe(() => {
                    this._optionValue = _option.getValue();
                    this.close();
                    this.ref.detectChanges();
                }));
            });
        }));
        this.ref.detectChanges();
    }
    _onOpen(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.opened = !this.opened;
        this.onSelect.emit(event);
        this.openedChange.emit(this.opened);
        this.onOpen.emit(this.opened);
        if (this.bizyInput) {
            this.bizyInput.setFocus(true);
        }
        this.ref.detectChanges();
    }
    close = (event, select) => {
        if (select && event && event.target && event.target === select.bizyInputWrapper.nativeElement) {
            return;
        }
        this.opened = false;
        this.openedChange.emit(this.opened);
        this.onOpen.emit(this.opened);
        this.ref.detectChanges();
    };
    setTouched(touched) {
        if (this.bizyInput) {
            this.bizyInput.setTouched(touched);
            this.ref.detectChanges();
        }
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#contentChildrenSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySelectComponent, selector: "bizy-select", inputs: { id: "id", disabled: "disabled", readonly: "readonly", customClass: "customClass", opened: "opened" }, outputs: { openedChange: "openedChange", onSelect: "onSelect", onOpen: "onOpen" }, queries: [{ propertyName: "options", predicate: BizySelectOptionComponent }], viewQueries: [{ propertyName: "templatePortalContent", first: true, predicate: ["templatePortalContent"], descendants: true }, { propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<bizy-input\n    #bizyInput\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    [id]=\"id\"\n    [value]=\"_optionValue\"\n    [ngClass]=\"{'bizy-select--readonly': readonly}\"\n    (onSelect)=\"_onOpen($event); bizyInput?.setTouched(true)\"\n    (onEnter)=\"_onOpen($event); bizyInput?.setTouched(true)\"\n    class=\"bizy-select {{customClass}}\"\n    cdkOverlayOrigin\n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-select-arrow\"\n        *ngIf=\"!readonly\"\n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"prefix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n\n<span class=\"bizy-select__errors\" *ngIf=\"bizyInput?.touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n\n<ng-template #templatePortalContent>\n    <ng-content select=\"bizy-select-option\"></ng-content>\n</ng-template>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInput.getWidth()\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInput)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-template [cdkPortalOutlet]=\"templatePortal\"></ng-template>\n    \n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem;width:var(--bizy-select-width);min-width:var(--bizy-select-min-width);max-width:var(--bizy-select-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-select__errors:not(:empty)) ::ng-deep .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-select__errors:not(:empty)) ::ng-deep .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-select{--bizy-input-cursor: pointer;--bizy-input-background-color: var(--bizy-select-background-color);--bizy-input-color: var(--bizy-select-color)}.bizy-select--readonly{--bizy-input-cursor: default}.bizy-select__arrow{height:var(--bizy-select-arrow-height);pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-select-color)}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__options{background-color:var(--bizy-select-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-select-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-select__options__search{position:sticky;z-index:1;top:0}::ng-deep .bizy-select__options__search{--bizy-input-width: auto;--bizy-input-background-color: #fff;--bizy-input-min-width: var(--bizy-select-min-width);--bizy-input-max-width: auto}.bizy-select__errors:empty{display:none!important}::ng-deep .bizy-select__errors *{color:var(--bizy-input-invalid-color)!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "debounceTime", "rows", "disabled", "readonly", "value", "autofocus"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "directive", type: i4.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-input\n    #bizyInput\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    [id]=\"id\"\n    [value]=\"_optionValue\"\n    [ngClass]=\"{'bizy-select--readonly': readonly}\"\n    (onSelect)=\"_onOpen($event); bizyInput?.setTouched(true)\"\n    (onEnter)=\"_onOpen($event); bizyInput?.setTouched(true)\"\n    class=\"bizy-select {{customClass}}\"\n    cdkOverlayOrigin\n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-select-arrow\"\n        *ngIf=\"!readonly\"\n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"prefix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n\n<span class=\"bizy-select__errors\" *ngIf=\"bizyInput?.touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n\n<ng-template #templatePortalContent>\n    <ng-content select=\"bizy-select-option\"></ng-content>\n</ng-template>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInput.getWidth()\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInput)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-template [cdkPortalOutlet]=\"templatePortal\"></ng-template>\n    \n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem;width:var(--bizy-select-width);min-width:var(--bizy-select-min-width);max-width:var(--bizy-select-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-select__errors:not(:empty)) ::ng-deep .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-select__errors:not(:empty)) ::ng-deep .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-select{--bizy-input-cursor: pointer;--bizy-input-background-color: var(--bizy-select-background-color);--bizy-input-color: var(--bizy-select-color)}.bizy-select--readonly{--bizy-input-cursor: default}.bizy-select__arrow{height:var(--bizy-select-arrow-height);pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-select-color)}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__options{background-color:var(--bizy-select-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-select-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-select__options__search{position:sticky;z-index:1;top:0}::ng-deep .bizy-select__options__search{--bizy-input-width: auto;--bizy-input-background-color: #fff;--bizy-input-min-width: var(--bizy-select-min-width);--bizy-input-max-width: auto}.bizy-select__errors:empty{display:none!important}::ng-deep .bizy-select__errors *{color:var(--bizy-input-invalid-color)!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { templatePortalContent: [{
                type: ViewChild,
                args: ['templatePortalContent']
            }], options: [{
                type: ContentChildren,
                args: [BizySelectOptionComponent]
            }], bizyInput: [{
                type: ViewChild,
                args: ['bizyInput']
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], openedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onOpen: [{
                type: Output
            }] } });

const COMPONENTS$6 = [
    BizySelectComponent,
    BizySelectOptionComponent
];
class BizySelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, declarations: [BizySelectComponent,
            BizySelectOptionComponent], imports: [CommonModule, FormsModule, BizyInputModule, OverlayModule, PortalModule], exports: [BizySelectComponent,
            BizySelectOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, imports: [CommonModule, FormsModule, BizyInputModule, OverlayModule, PortalModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, BizyInputModule, OverlayModule, PortalModule],
                    declarations: COMPONENTS$6,
                    exports: COMPONENTS$6
                }]
        }] });

class BizySliderComponent {
    fromSlider;
    toSlider;
    minLimit = 0;
    maxLimit = 100;
    onChange = new EventEmitter();
    _min = 0;
    _max = 100;
    set min(min) {
        if (typeof min === 'undefined' || min == null) {
            return;
        }
        this._min = min;
    }
    ;
    set max(max) {
        if (typeof max === 'undefined' || max == null) {
            return;
        }
        this._max = max;
    }
    ;
    setFromSlider(value) {
        if (value > this._max) {
            this._min = this._max;
            this.fromSlider.nativeElement.value = this._max;
        }
        else {
            this._min = value;
        }
        this.onChange.emit({ min: this._min, max: this._max });
    }
    setToSlider(value) {
        if (value < this._min) {
            this._max = this._min;
            this.toSlider.nativeElement.value = this._min;
        }
        else {
            this._max = value;
        }
        this.onChange.emit({ min: this._min, max: this._max });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySliderComponent, selector: "bizy-slider", inputs: { minLimit: "minLimit", maxLimit: "maxLimit", min: "min", max: "max" }, outputs: { onChange: "onChange" }, viewQueries: [{ propertyName: "fromSlider", first: true, predicate: ["fromSlider"], descendants: true }, { propertyName: "toSlider", first: true, predicate: ["toSlider"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"], dependencies: [{ kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.RangeValueAccessor, selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-slider', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"] }]
        }], propDecorators: { fromSlider: [{
                type: ViewChild,
                args: ['fromSlider']
            }], toSlider: [{
                type: ViewChild,
                args: ['toSlider']
            }], minLimit: [{
                type: Input
            }], maxLimit: [{
                type: Input
            }], onChange: [{
                type: Output
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }] } });

const COMPONENTS$5 = [
    BizySliderComponent,
];
class BizySliderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySliderModule, declarations: [BizySliderComponent], imports: [CommonModule, FormsModule], exports: [BizySliderComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$5,
                    exports: COMPONENTS$5
                }]
        }] });

const MIN_CHART_SIZE$1 = 350; // px;
const Y_AXIS_OFFSET = 80;
const GRID_BOTTOM = 30;
class BizyBarLineChartComponent {
    elementRef;
    document;
    ref;
    renderer;
    resizeRef = null;
    tooltip = true;
    download = { hide: false, label: 'Descargar', name: 'Bizy' };
    axisPointer = 'line';
    xAxisLabels = [];
    onTooltipFormatter;
    onXAxisLabelFormatter;
    onDownload = new EventEmitter();
    onSelect = new EventEmitter();
    #echarts = null;
    #mutationObserver = null;
    #resizeObserver = null;
    #subscription = new Subscription();
    #chartContainer = null;
    #afterViewInit = new BehaviorSubject(false);
    #resize$ = new Subject();
    #data = [];
    #rightYAxis = 0;
    #leftYAxis = 0;
    #chartStacks = [];
    #chartNames = [];
    constructor(elementRef, document, ref, renderer) {
        this.elementRef = elementRef;
        this.document = document;
        this.ref = ref;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.elementRef && this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.offsetHeight)) {
                this.#afterViewInit.next(true);
                this.#mutationObserver.disconnect();
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    set data(data) {
        if (!data) {
            return;
        }
        if (data.length > 0) {
            this.#setChartData(data);
        }
        else {
            this.#deleteChartContainer();
        }
    }
    async #setChartData(data) {
        this.#data = data;
        this.#rightYAxis = 0;
        this.#leftYAxis = 0;
        this.#chartStacks = [];
        this.#chartNames = [];
        this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
            this.#createChartContainer();
            if (!this.#chartContainer) {
                return;
            }
            const series = [];
            const legends = [];
            const yAxis = [];
            this.#data.forEach((_d, _i) => {
                if (!_d.type) {
                    _d.type = 'bar';
                }
                if (!_d.values) {
                    _d.values = [];
                }
                const axisLine = {
                    show: true,
                    lineStyle: {}
                };
                const color = {
                    lineStyle: {
                        color: null
                    },
                    itemStyle: {
                        color: null
                    }
                };
                if (_d.color) {
                    axisLine.lineStyle = {
                        color: _d.color
                    };
                    color.lineStyle.color = _d.color;
                    color.itemStyle.color = _d.color;
                }
                let position = 'right';
                let offset = 0;
                let formatter = null;
                const xName = _d.xAxi && _d.xAxi.name ? _d.xAxi.name : _d.label;
                let yName = _d.label;
                if (_d.yAxi) {
                    formatter = _d.yAxi.onValueFormatter;
                    position = _d.yAxi.position ? _d.yAxi.position : _d.type === 'bar' ? 'right' : 'left';
                    if (_d.yAxi.name) {
                        yName = _d.yAxi.name;
                    }
                    if (_d.yAxi.hide) {
                        axisLine.show = false;
                        formatter = null;
                    }
                }
                if (!_d.yAxi || !_d.yAxi.hide) {
                    if (position === 'right') {
                        offset = this.#rightYAxis * Y_AXIS_OFFSET;
                        this.#rightYAxis++;
                    }
                    else {
                        offset = this.#leftYAxis * Y_AXIS_OFFSET;
                        this.#leftYAxis++;
                    }
                }
                yAxis.push({
                    type: 'value',
                    name: _d.yAxi && _d.yAxi.hide ? '' : yName,
                    position,
                    alignTicks: true,
                    offset,
                    axisLine,
                    axisLabel: { formatter }
                });
                legends.push(xName);
                let yAxisIndex = _i;
                if (_d.stack) {
                    const _index = this.#chartStacks.findIndex(_stack => _stack === _d.stack);
                    if (_index !== -1) {
                        yAxisIndex = _index;
                    }
                    else {
                        this.#chartStacks.push(_d.stack);
                    }
                }
                const _index = this.#chartNames.findIndex(_name => _name === yName);
                if (_index !== -1) {
                    yAxisIndex = _index;
                }
                else {
                    this.#chartNames.push(yName);
                }
                series.push({ ...{
                        type: _d.type,
                        name: xName,
                        yAxisIndex,
                        smooth: !_d.discrete,
                        stack: _d.stack,
                        data: _d.values
                    }, ...color });
            });
            const tooltip = {
                show: this.tooltip,
                trigger: 'axis',
                appendToBody: true,
                axisPointer: {
                    type: this.axisPointer
                },
                formatter: this.onTooltipFormatter
            };
            const grid = {
                left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
                right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
                bottom: GRID_BOTTOM,
                containLabel: true
            };
            const xAxis = [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: this.xAxisLabels,
                    axisLabel: {
                        formatter: this.onXAxisLabelFormatter,
                    }
                }
            ];
            const legend = {
                type: 'scroll',
                bottom: 0,
                data: legends
            };
            const textColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-color') ?? '#000';
            const textBackgroundColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-background-color') ?? '#fff';
            const borderColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-border-color') ?? '#fff';
            const toolbox = {
                show: true,
                feature: {
                    mySaveAsImage: {
                        show: !this.download.hide,
                        icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
                        title: this.download.label,
                        onclick: () => {
                            const showAllLegends = (chart) => {
                                const option = chart.getOption();
                                option.legend[0].type = 'plain';
                                option.grid = {
                                    left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    bottom: `${Math.max(option.legend[0].data.length, 5)}%`,
                                    containLabel: true
                                };
                                chart.setOption(option);
                            };
                            const restoreLegendType = (chart) => {
                                const option = chart.getOption();
                                option.legend[0].type = 'scroll';
                                option.grid = {
                                    left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    bottom: GRID_BOTTOM,
                                    containLabel: true
                                };
                                chart.setOption(option);
                            };
                            showAllLegends(this.#echarts);
                            setTimeout(() => {
                                html2canvas(this.#chartContainer).then(canvas => {
                                    var link = document.createElement('a');
                                    link.href = canvas.toDataURL('image/png');
                                    link.download = `${this.download.name}.png`;
                                    this.renderer.appendChild(this.document.body, link);
                                    link.click();
                                    this.renderer.removeChild(this.document.body, link);
                                    restoreLegendType(this.#echarts);
                                    this.onDownload.emit();
                                });
                            }, 500);
                        }
                    }
                },
                emphasis: {
                    iconStyle: {
                        color: textColor,
                        borderColor,
                        borderWidth: 1,
                        textBackgroundColor,
                        textPadding: 5,
                    }
                }
            };
            const option = {
                tooltip,
                legend,
                grid,
                xAxis,
                yAxis,
                toolbox,
                series
            };
            this.#echarts = echarts.init(this.#chartContainer);
            this.#echarts.setOption(option);
            this.#echarts.on('click', params => {
                this.onSelect.emit(params.name);
            });
            this.#resizeObserver = new ResizeObserver(() => this.#resize$.next());
            const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
            this.#resizeObserver.observe(resizeRef);
            this.#subscription.add(this.#resize$.pipe(skip(1), auditTime(300), throttleTime(500)).subscribe(() => {
                this.#deleteChartContainer();
                this.#createChartContainer();
                if (!this.#chartContainer) {
                    return;
                }
                this.#echarts = echarts.init(this.#chartContainer);
                this.#echarts.setOption(option);
                this.#echarts.on('click', params => {
                    this.onSelect.emit(params.name);
                });
            }));
        }));
    }
    #createChartContainer = () => {
        if (this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
            return;
        }
        let elementWidth = this.elementRef.nativeElement.offsetWidth || MIN_CHART_SIZE$1;
        let elementHeight = this.elementRef.nativeElement.offsetHeight || MIN_CHART_SIZE$1;
        let minWidth = MIN_CHART_SIZE$1;
        let minHeight = MIN_CHART_SIZE$1;
        const barChartMinWidth = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-width');
        const barChartMinHeight = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-height');
        if (Number(barChartMinWidth)) {
            minWidth = Number(barChartMinWidth);
        }
        if (Number(barChartMinHeight)) {
            minHeight = Number(barChartMinHeight);
        }
        const width = Math.max(elementWidth, minWidth);
        const height = Math.max(elementHeight, minHeight);
        this.#chartContainer = this.renderer.createElement('div');
        this.renderer.setStyle(this.#chartContainer, 'width', `${width}px`);
        this.renderer.setStyle(this.#chartContainer, 'height', `${height}px`);
        this.renderer.appendChild(this.elementRef.nativeElement, this.#chartContainer);
        this.ref.detectChanges();
    };
    #deleteChartContainer = () => {
        if (!this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
            return;
        }
        this.#echarts.clear();
        this.renderer.removeChild(this.elementRef.nativeElement, this.#chartContainer);
        this.#chartContainer = null;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
        if (this.#echarts) {
            this.#echarts.clear();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarLineChartComponent, deps: [{ token: ElementRef }, { token: DOCUMENT }, { token: ChangeDetectorRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyBarLineChartComponent, selector: "bizy-bar-line-chart", inputs: { resizeRef: "resizeRef", tooltip: "tooltip", download: "download", axisPointer: "axisPointer", xAxisLabels: "xAxisLabels", onTooltipFormatter: "onTooltipFormatter", onXAxisLabelFormatter: "onXAxisLabelFormatter", data: "data" }, outputs: { onDownload: "onDownload", onSelect: "onSelect" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarLineChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-bar-line-chart',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { resizeRef: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], download: [{
                type: Input
            }], axisPointer: [{
                type: Input
            }], xAxisLabels: [{
                type: Input
            }], onTooltipFormatter: [{
                type: Input
            }], onXAxisLabelFormatter: [{
                type: Input
            }], onDownload: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], data: [{
                type: Input
            }] } });

class BizyBarLineChartModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarLineChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyBarLineChartModule, declarations: [BizyBarLineChartComponent], imports: [CommonModule], exports: [BizyBarLineChartComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarLineChartModule, providers: [DecimalPipe], imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarLineChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [BizyBarLineChartComponent],
                    exports: [BizyBarLineChartComponent],
                    providers: [DecimalPipe]
                }]
        }] });

const EMPTY_CHART = [0];
const MIN_CHART_SIZE = 350; // px;
class BizyPieChartComponent {
    elementRef;
    document;
    ref;
    renderer;
    resizeRef = null;
    tooltip = true;
    download = { hide: false, label: 'Descargar', name: 'Bizy' };
    onLabelFormatter;
    onTooltipFormatter;
    onSelect = new EventEmitter();
    onDownload = new EventEmitter();
    #echarts = null;
    #mutationObserver = null;
    #resizeObserver = null;
    #subscription = new Subscription();
    #chartContainer = null;
    #afterViewInit = new BehaviorSubject(false);
    #resize$ = new Subject();
    #data = EMPTY_CHART;
    constructor(elementRef, document, ref, renderer) {
        this.elementRef = elementRef;
        this.document = document;
        this.ref = ref;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.elementRef && this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.offsetHeight)) {
                this.#afterViewInit.next(true);
                this.#mutationObserver.disconnect();
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    set data(data) {
        if (!data) {
            return;
        }
        if (data.length > 0) {
            this.#setChartData(data);
        }
        else {
            this.#deleteChartContainer();
            this.#setChartData(EMPTY_CHART);
        }
    }
    async #setChartData(data) {
        this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
            this.#createChartContainer();
            if (!this.#chartContainer) {
                return;
            }
            if (data && data.length > 0 && data[0] !== 0) {
                this.#data = [];
                data.forEach(_d => {
                    if (!_d.value) {
                        _d.value = 0;
                    }
                    if (!_d.name) {
                        _d.name = '---';
                    }
                    const itemStyle = _d.color ? { color: _d.color } : {};
                    this.#data.push({
                        name: _d.name,
                        value: _d.value,
                        itemStyle
                    });
                });
            }
            else {
                this.#data = EMPTY_CHART;
            }
            const series = [{
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '50%'],
                    data: this.#data,
                    itemStyle: {
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        normal: {
                            label: {
                                position: 'outer',
                                formatter: this.onLabelFormatter
                            },
                            labelLine: {
                                show: true
                            }
                        }
                    }
                }];
            const textColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-color') ?? '#000';
            const textBackgroundColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-background-color') ?? '#fff';
            const borderColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-border-color') ?? '#fff';
            const toolbox = {
                show: true,
                feature: {
                    mySaveAsImage: {
                        show: !this.download.hide,
                        icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
                        title: this.download.label,
                        onclick: () => {
                            setTimeout(() => {
                                html2canvas(this.#chartContainer).then(canvas => {
                                    var link = document.createElement('a');
                                    link.href = canvas.toDataURL('image/png');
                                    link.download = `${this.download.name}.png`;
                                    this.renderer.appendChild(this.document.body, link);
                                    link.click();
                                    this.renderer.removeChild(this.document.body, link);
                                    this.onDownload.emit();
                                });
                            }, 500);
                        }
                    }
                },
                emphasis: {
                    iconStyle: {
                        color: textColor,
                        borderColor,
                        borderWidth: 1,
                        textBackgroundColor,
                        textPadding: 5,
                    }
                }
            };
            const tooltip = {
                show: this.tooltip,
                trigger: 'item',
                appendToBody: true,
                formatter: this.onTooltipFormatter
            };
            const option = {
                tooltip,
                toolbox,
                series
            };
            this.#echarts = echarts.init(this.#chartContainer);
            this.#echarts.setOption(option);
            this.#echarts.on('click', params => {
                this.onSelect.emit(params.name);
            });
            this.#resizeObserver = new ResizeObserver(() => this.#resize$.next());
            const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
            this.#resizeObserver.observe(resizeRef);
            this.#subscription.add(this.#resize$.pipe(skip(1), auditTime(300), throttleTime(500)).subscribe(() => {
                this.#deleteChartContainer();
                this.#createChartContainer();
                if (!this.#chartContainer) {
                    return;
                }
                this.#echarts = echarts.init(this.#chartContainer);
                this.#echarts.setOption({ ...option, series: option.series.map(_serie => { return { ..._serie, data: this.#data }; }) });
                this.#echarts.on('click', params => {
                    this.onSelect.emit(params.name);
                });
            }));
        }));
    }
    #createChartContainer = () => {
        if (this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
            return;
        }
        let elementWidth = this.elementRef.nativeElement.offsetWidth || MIN_CHART_SIZE;
        let elementHeight = this.elementRef.nativeElement.offsetHeight || MIN_CHART_SIZE;
        let minWidth = MIN_CHART_SIZE;
        let minHeight = MIN_CHART_SIZE;
        const chartMinWidth = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-width');
        const pieChartMinHeight = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-height');
        if (Number(chartMinWidth)) {
            minWidth = Number(chartMinWidth);
        }
        if (Number(pieChartMinHeight)) {
            minHeight = Number(pieChartMinHeight);
        }
        const width = Math.max(elementWidth, minWidth);
        const height = Math.max(elementHeight, minHeight);
        this.#chartContainer = this.renderer.createElement('div');
        this.renderer.setStyle(this.#chartContainer, 'width', `${width}px`);
        this.renderer.setStyle(this.#chartContainer, 'height', `${height}px`);
        this.renderer.appendChild(this.elementRef.nativeElement, this.#chartContainer);
        this.ref.detectChanges();
    };
    #deleteChartContainer = () => {
        if (!this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
            return;
        }
        this.#echarts.clear();
        this.renderer.removeChild(this.elementRef.nativeElement, this.#chartContainer);
        this.#chartContainer = null;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
        if (this.#echarts) {
            this.#echarts.clear();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartComponent, deps: [{ token: ElementRef }, { token: DOCUMENT }, { token: ChangeDetectorRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyPieChartComponent, selector: "bizy-pie-chart", inputs: { resizeRef: "resizeRef", tooltip: "tooltip", download: "download", onLabelFormatter: "onLabelFormatter", onTooltipFormatter: "onTooltipFormatter", data: "data" }, outputs: { onSelect: "onSelect", onDownload: "onDownload" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-pie-chart',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { resizeRef: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], download: [{
                type: Input
            }], onLabelFormatter: [{
                type: Input
            }], onTooltipFormatter: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], onDownload: [{
                type: Output
            }], data: [{
                type: Input
            }] } });

class BizyPieChartModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartModule, declarations: [BizyPieChartComponent], imports: [CommonModule], exports: [BizyPieChartComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartModule, providers: [DecimalPipe], imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [BizyPieChartComponent],
                    exports: [BizyPieChartComponent],
                    providers: [DecimalPipe]
                }]
        }] });

var BIZY_TAG_TYPE;
(function (BIZY_TAG_TYPE) {
    BIZY_TAG_TYPE["DEFAULT"] = "default";
    BIZY_TAG_TYPE["SUCCESS"] = "success";
    BIZY_TAG_TYPE["INFO"] = "info";
    BIZY_TAG_TYPE["WARNING"] = "warning";
    BIZY_TAG_TYPE["DANGER"] = "danger";
})(BIZY_TAG_TYPE || (BIZY_TAG_TYPE = {}));
;

class BizyTagComponent {
    id = `bizy-tag-${Math.random()}`;
    customClass = '';
    type = BIZY_TAG_TYPE.DEFAULT;
    onSelect = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTagComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTagComponent, selector: "bizy-tag", inputs: { id: "id", customClass: "customClass", type: "type" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    class=\"bizy-tag bizy-tag--{{type}} {{customClass}}\"\n    (click)=\"onSelect.emit($event)\"\n    (keyup.enter)=\"onSelect.emit($event)\">\n\n    <ng-content></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-tag{border:none;padding:var(--bizy-tag-padding);border-radius:.3rem;display:flex;justify-content:center;cursor:pointer;column-gap:.5rem;align-items:center;text-wrap:nowrap;width:-moz-fit-content;width:fit-content}.bizy-tag--default{background-color:var(--bizy-tag-default-background-color)}::ng-deep .bizy-tag--default *{color:var(--bizy-tag-default-color)!important}.bizy-tag--info{background-color:var(--bizy-tag-info-background-color)}::ng-deep .bizy-tag--info *{color:var(--bizy-tag-info-color)!important}.bizy-tag--success{background-color:var(--bizy-tag-success-background-color)}::ng-deep .bizy-tag--success *{color:var(--bizy-tag-success-color)!important}.bizy-tag--warning{background-color:var(--bizy-tag-warning-background-color)}::ng-deep .bizy-tag--warning *{color:var(--bizy-tag-warning-color)!important}.bizy-tag--danger{background-color:var(--bizy-tag-danger-background-color)}::ng-deep .bizy-tag--danger *{color:var(--bizy-tag-danger-color)!important}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tag', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    class=\"bizy-tag bizy-tag--{{type}} {{customClass}}\"\n    (click)=\"onSelect.emit($event)\"\n    (keyup.enter)=\"onSelect.emit($event)\">\n\n    <ng-content></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-tag{border:none;padding:var(--bizy-tag-padding);border-radius:.3rem;display:flex;justify-content:center;cursor:pointer;column-gap:.5rem;align-items:center;text-wrap:nowrap;width:-moz-fit-content;width:fit-content}.bizy-tag--default{background-color:var(--bizy-tag-default-background-color)}::ng-deep .bizy-tag--default *{color:var(--bizy-tag-default-color)!important}.bizy-tag--info{background-color:var(--bizy-tag-info-background-color)}::ng-deep .bizy-tag--info *{color:var(--bizy-tag-info-color)!important}.bizy-tag--success{background-color:var(--bizy-tag-success-background-color)}::ng-deep .bizy-tag--success *{color:var(--bizy-tag-success-color)!important}.bizy-tag--warning{background-color:var(--bizy-tag-warning-background-color)}::ng-deep .bizy-tag--warning *{color:var(--bizy-tag-warning-color)!important}.bizy-tag--danger{background-color:var(--bizy-tag-danger-background-color)}::ng-deep .bizy-tag--danger *{color:var(--bizy-tag-danger-color)!important}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], type: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$4 = [
    BizyTagComponent,
];
class BizyTagModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTagModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyTagModule, declarations: [BizyTagComponent], imports: [CommonModule, FormsModule], exports: [BizyTagComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTagModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTagModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$4,
                    exports: COMPONENTS$4
                }]
        }] });

class BizyCardComponent {
    id = `bizy-card-${Math.random()}`;
    disabled = false;
    selected = false;
    customClass = '';
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyCardComponent, selector: "bizy-card", inputs: { id: "id", disabled: "disabled", selected: "selected", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    class=\"bizy-card {{customClass}}\"\n    [ngClass]=\"{'bizy-card--selected': selected, 'bizy-card--disabled': disabled}\">\n\n    <span class=\"bizy-card__header\">\n\n        <span class=\"bizy-card__header__start bizy-card__slot\">\n            <ng-content select=\"[slot=header-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__header__end bizy-card__slot\">\n            <ng-content select=\"[slot=header-end]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-card__content\">\n\n        <ng-content></ng-content>\n\n    </span>\n\n    <span class=\"bizy-card__footer\">\n\n        <span class=\"bizy-card__footer__start bizy-card__slot\">\n            <ng-content select=\"[slot=footer-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__footer__end bizy-card__slot\">\n            <ng-content select=\"[slot=footer-end]\"></ng-content>\n        </span>\n\n    </span>\n\n</button>", styles: [":host{font-size:1rem;height:100%;width:100%}.bizy-card{height:100%;width:100%;cursor:var(--bizy-card-cursor);border:none;border-radius:.3rem;overflow:hidden;padding:.5rem;display:flex;flex-direction:column;justify-content:space-between;row-gap:.3rem;background-color:var(--bizy-card-background-color);transition:transform .25s ease-in-out;box-shadow:0 4px 6px #32325d1c,0 1px 3px #00000014}.bizy-card:hover{transform:translateY(-1px);box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-card:has(.bizy-card__content:empty) .bizy-card__content{display:none}.bizy-card:has(.bizy-card__content:empty) .bizy-card__header:not(:empty){height:100%!important}.bizy-card:has(.bizy-card__content:empty) .bizy-card__footer:not(:empty){height:100%!important}.bizy-card--selected{background-color:var(--bizy-card-selected-background-color)}.bizy-card--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-card__content:not(:empty){display:flex;align-items:center;column-gap:.5rem;height:100%;width:100%}.bizy-card__header:has(.bizy-card__header__start:empty):has(.bizy-card__header__end:empty){display:none}.bizy-card__header:not(:empty){width:100%;height:-moz-fit-content;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem}.bizy-card__header__start{justify-self:start}.bizy-card__header__end{justify-self:end}.bizy-card__slot{width:-moz-fit-content;width:fit-content;max-width:-webkit-fill-available;display:flex;align-items:center;column-gap:.5rem;height:100%;overflow:hidden}.bizy-card__footer:has(.bizy-card__footer__start:empty):has(.bizy-card__footer__end:empty){display:none}.bizy-card__footer:not(:empty){width:100%;height:-moz-fit-content;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem}.bizy-card__footer__start{justify-self:start}.bizy-card__footer__end{justify-self:end}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-card', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    class=\"bizy-card {{customClass}}\"\n    [ngClass]=\"{'bizy-card--selected': selected, 'bizy-card--disabled': disabled}\">\n\n    <span class=\"bizy-card__header\">\n\n        <span class=\"bizy-card__header__start bizy-card__slot\">\n            <ng-content select=\"[slot=header-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__header__end bizy-card__slot\">\n            <ng-content select=\"[slot=header-end]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-card__content\">\n\n        <ng-content></ng-content>\n\n    </span>\n\n    <span class=\"bizy-card__footer\">\n\n        <span class=\"bizy-card__footer__start bizy-card__slot\">\n            <ng-content select=\"[slot=footer-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__footer__end bizy-card__slot\">\n            <ng-content select=\"[slot=footer-end]\"></ng-content>\n        </span>\n\n    </span>\n\n</button>", styles: [":host{font-size:1rem;height:100%;width:100%}.bizy-card{height:100%;width:100%;cursor:var(--bizy-card-cursor);border:none;border-radius:.3rem;overflow:hidden;padding:.5rem;display:flex;flex-direction:column;justify-content:space-between;row-gap:.3rem;background-color:var(--bizy-card-background-color);transition:transform .25s ease-in-out;box-shadow:0 4px 6px #32325d1c,0 1px 3px #00000014}.bizy-card:hover{transform:translateY(-1px);box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-card:has(.bizy-card__content:empty) .bizy-card__content{display:none}.bizy-card:has(.bizy-card__content:empty) .bizy-card__header:not(:empty){height:100%!important}.bizy-card:has(.bizy-card__content:empty) .bizy-card__footer:not(:empty){height:100%!important}.bizy-card--selected{background-color:var(--bizy-card-selected-background-color)}.bizy-card--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-card__content:not(:empty){display:flex;align-items:center;column-gap:.5rem;height:100%;width:100%}.bizy-card__header:has(.bizy-card__header__start:empty):has(.bizy-card__header__end:empty){display:none}.bizy-card__header:not(:empty){width:100%;height:-moz-fit-content;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem}.bizy-card__header__start{justify-self:start}.bizy-card__header__end{justify-self:end}.bizy-card__slot{width:-moz-fit-content;width:fit-content;max-width:-webkit-fill-available;display:flex;align-items:center;column-gap:.5rem;height:100%;overflow:hidden}.bizy-card__footer:has(.bizy-card__footer__start:empty):has(.bizy-card__footer__end:empty){display:none}.bizy-card__footer:not(:empty){width:100%;height:-moz-fit-content;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem}.bizy-card__footer__start{justify-self:start}.bizy-card__footer__end{justify-self:end}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$3 = [
    BizyCardComponent,
];
class BizyCardModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyCardModule, declarations: [BizyCardComponent], imports: [CommonModule, FormsModule], exports: [BizyCardComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$3,
                    exports: COMPONENTS$3
                }]
        }] });

const ES = {
    ...es_ES,
    strings: {
        ...es_ES.strings,
        noDuplicates: 'Archivo duplicado: \'%{fileName}\'',
        browseFiles: 'buscar archivo',
        dropPasteFiles: 'Soltar archivo aquí, pegar o %{browse}'
    }
};
const EN = {
    ...en_US,
    strings: {
        ...en_US.strings,
        noDuplicates: 'Duplicated file: \'%{fileName}\'',
        browseFiles: 'browse file',
        dropPasteFiles: 'Drop a file here or %{browse}'
    }
};
class BizyFileUploaderService {
    #fileLoaded = new Subject();
    #fileRemoved = new Subject();
    #upload = new Subject();
    #uploadSuccess = new Subject();
    #error = new Subject();
    #cancelAll = new Subject();
    #complete = new Subject();
    #uppy;
    get fileLoaded$() {
        return this.#fileLoaded.asObservable();
    }
    get fileRemoved$() {
        return this.#fileRemoved.asObservable();
    }
    get upload$() {
        return this.#upload.asObservable();
    }
    get uploadSuccess$() {
        return this.#uploadSuccess.asObservable();
    }
    get error$() {
        return this.#error.asObservable();
    }
    get cancelAll$() {
        return this.#cancelAll.asObservable();
    }
    get complete$() {
        return this.#complete.asObservable();
    }
    createFileUploader(data) {
        const locale = data.language === 'es' ? ES : EN;
        this.#uppy = new Uppy({
            locale,
            infoTimeout: 2500,
            restrictions: {
                maxFileSize: data.maxFileSize,
                minFileSize: data.minFileSize,
                maxTotalFileSize: data.maxTotalFileSize,
                maxNumberOfFiles: data.maxNumberOfFiles,
                minNumberOfFiles: data.minNumberOfFiles,
                allowedFileTypes: data.allowedFileTypes
            }
        })
            .use(Dashboard, {
            inline: true,
            target: `#${data.templateId}`,
            width: data.dragDropAreaWidth,
            height: data.dragDropAreaHeight,
            hideUploadButton: true,
            hidePauseResumeButton: true
        })
            .use(XHRUpload, {
            endpoint: '',
            headers: {
                'Bizy-TenantId': data.tenantId
            },
            getResponseData: (responseText, response) => {
                return {
                    fileId: responseText,
                    response
                };
            }
        })
            .on('file-added', file => {
            this.#fileLoaded.next(file);
        })
            .on('file-removed', file => {
            this.#fileRemoved.next(file);
        })
            .on('upload', data => {
            this.#upload.next();
        })
            .on('upload-success', (file, response) => {
            if (file) {
                this.#uploadSuccess.next({ file, response });
            }
        })
            .on('upload-error', (file, error, response) => {
            this.#error.next({ file, error, response });
        })
            .on('restriction-failed', (file, error) => {
            this.#error.next({ file, error });
        })
            .on('error', error => {
            this.#error.next({ error });
        })
            .on('cancel-all', () => {
            this.#cancelAll.next();
        })
            .on('complete', result => {
            this.#complete.next(result);
        });
    }
    load(data) {
        this.#uppy.addFile({
            name: data.file.name,
            type: data.file.type,
            data: data.file,
            meta: {
                // Optional, store the directory path of a file so Uppy can tell identical files in different directories apart.
                relativePath: data.file.webkitRelativePath,
                referenceId: data.id
            },
            source: 'Local',
            isRemote: false // Optional, set to true if actual file is not in the browser, but on some remote server, for example,
            // when using companion in combination with Instagram.
        });
    }
    upload(data) {
        this.#uppy.getPlugin('XHRUpload').setOptions({
            endpoint: data.url,
            headers: {
                authorization: `Bearer ${data.token}`
            }
        });
        this.#uppy.upload();
    }
    cleanAllFiles() {
        this.#uppy.cancelAll();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderService, decorators: [{
            type: Injectable
        }] });

class BizyFileUploaderComponent {
    fileUploader;
    tenantId = null;
    dragDropAreaWidth = '100%';
    dragDropAreaHeight = '16rem';
    language = 'es';
    maxFileSize = null;
    minFileSize = null;
    maxTotalFileSize = 31458000; // 30MB
    maxNumberOfFiles = null;
    minNumberOfFiles = null;
    allowedFileTypes = ['.wav'];
    upload;
    completed = new EventEmitter();
    loadedFiles = new EventEmitter();
    #subscription = new Subscription();
    #files = new Set();
    TEMPLATE_ID = 'bizy-file-uploader-template';
    constructor(fileUploader) {
        this.fileUploader = fileUploader;
    }
    ngAfterViewInit() {
        if (!this.tenantId) {
            return;
        }
        this.fileUploader.createFileUploader({
            maxFileSize: this.maxFileSize,
            minFileSize: this.minFileSize,
            maxTotalFileSize: this.maxTotalFileSize,
            maxNumberOfFiles: this.maxNumberOfFiles,
            minNumberOfFiles: this.minNumberOfFiles,
            dragDropAreaWidth: this.dragDropAreaWidth,
            dragDropAreaHeight: this.dragDropAreaHeight,
            allowedFileTypes: this.allowedFileTypes,
            tenantId: String(this.tenantId),
            language: this.language,
            templateId: this.TEMPLATE_ID
        });
        this.#subscription.add(this.upload.subscribe(data => {
            if (this.#files.size === 0 || (this.minNumberOfFiles && this.#files.size < this.minNumberOfFiles)) {
                this.completed.emit({ successful: [], failed: [] });
                return;
            }
            this.fileUploader.upload(data);
        }));
        this.#subscription.add(this.fileUploader.complete$.subscribe(res => {
            const successful = [];
            const failed = [];
            res.successful.forEach(_file => {
                if (_file.response && _file.response.body && _file.response.body.fileId) {
                    successful.push(_file.response.body.fileId);
                }
            });
            res.failed.forEach(_file => {
                if (_file.response && _file.response.body && _file.response.body.fileId) {
                    successful.push(_file.response.body.fileId);
                }
            });
            this.completed.emit({ successful, failed });
        }));
        this.#subscription.add(this.fileUploader.fileLoaded$.subscribe(file => {
            this.#files.add(file);
            this.loadedFiles.emit(Array.from(this.#files));
        }));
        this.#subscription.add(this.fileUploader.fileRemoved$.subscribe(file => {
            this.#files.delete(file);
            this.loadedFiles.emit(Array.from(this.#files));
        }));
    }
    ngOnDestroy() {
        this.fileUploader.cleanAllFiles();
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderComponent, deps: [{ token: BizyFileUploaderService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFileUploaderComponent, selector: "bizy-file-uploader", inputs: { tenantId: "tenantId", dragDropAreaWidth: "dragDropAreaWidth", dragDropAreaHeight: "dragDropAreaHeight", language: "language", maxFileSize: "maxFileSize", minFileSize: "minFileSize", maxTotalFileSize: "maxTotalFileSize", maxNumberOfFiles: "maxNumberOfFiles", minNumberOfFiles: "minNumberOfFiles", allowedFileTypes: "allowedFileTypes", upload: "upload" }, outputs: { completed: "completed", loadedFiles: "loadedFiles" }, providers: [BizyFileUploaderService], ngImport: i0, template: "<div [id]=\"TEMPLATE_ID\"></div>", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-file-uploader', providers: [BizyFileUploaderService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [id]=\"TEMPLATE_ID\"></div>" }]
        }], ctorParameters: function () { return [{ type: BizyFileUploaderService, decorators: [{
                    type: Inject,
                    args: [BizyFileUploaderService]
                }] }]; }, propDecorators: { tenantId: [{
                type: Input
            }], dragDropAreaWidth: [{
                type: Input
            }], dragDropAreaHeight: [{
                type: Input
            }], language: [{
                type: Input
            }], maxFileSize: [{
                type: Input
            }], minFileSize: [{
                type: Input
            }], maxTotalFileSize: [{
                type: Input
            }], maxNumberOfFiles: [{
                type: Input
            }], minNumberOfFiles: [{
                type: Input
            }], allowedFileTypes: [{
                type: Input
            }], upload: [{
                type: Input
            }], completed: [{
                type: Output
            }], loadedFiles: [{
                type: Output
            }] } });

class BizyFileUploaderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderModule, declarations: [BizyFileUploaderComponent], exports: [BizyFileUploaderComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [BizyFileUploaderComponent],
                    exports: [BizyFileUploaderComponent]
                }]
        }] });

class BizyRadioComponent {
    id = `bizy-radio-${Math.random()}`;
    name;
    selected = false;
    disabled = false;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.selectedChange.emit(!this.selected);
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRadioComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyRadioComponent, selector: "bizy-radio", inputs: { id: "id", name: "name", selected: "selected", disabled: "disabled" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<button type=\"button\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\" class=\"bizy-radio\" [ngClass]=\"{'bizy-radio--disabled': disabled}\">\n    <input \n        class=\"bizy-radio__input\"\n        [id]=\"id\"\n        [disabled]=\"disabled\"\n        type=\"radio\"\n        [name]=\"name\"\n        [checked]=\"selected\"/>\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <span class=\"bizy-radio__radio\"></span>\n    \n    <ng-content select=\"[slot=end]\"></ng-content>\n</button>\n", styles: [":host{font-size:1rem}.bizy-radio{border:none;background-color:transparent;cursor:pointer;position:relative;width:-moz-fit-content;width:fit-content;display:flex;column-gap:.5rem;align-items:center}.bizy-radio__input{position:absolute;visibility:hidden;pointer-events:none}.bizy-radio__input:checked+.bizy-radio__radio:before{box-shadow:inset 0 0 0 .3rem var(--bizy-radio-color)}.bizy-radio__radio{display:flex;align-items:center;transition:.25s ease}.bizy-radio__radio:before{display:flex;flex-shrink:0;content:\"\";background-color:#fff;min-width:1rem;min-height:1rem;border-radius:50%;transition:.25s ease;box-shadow:inset 0 0 0 .1rem var(--bizy-radio-color)}.bizy-radio__input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-radio', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button type=\"button\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\" class=\"bizy-radio\" [ngClass]=\"{'bizy-radio--disabled': disabled}\">\n    <input \n        class=\"bizy-radio__input\"\n        [id]=\"id\"\n        [disabled]=\"disabled\"\n        type=\"radio\"\n        [name]=\"name\"\n        [checked]=\"selected\"/>\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <span class=\"bizy-radio__radio\"></span>\n    \n    <ng-content select=\"[slot=end]\"></ng-content>\n</button>\n", styles: [":host{font-size:1rem}.bizy-radio{border:none;background-color:transparent;cursor:pointer;position:relative;width:-moz-fit-content;width:fit-content;display:flex;column-gap:.5rem;align-items:center}.bizy-radio__input{position:absolute;visibility:hidden;pointer-events:none}.bizy-radio__input:checked+.bizy-radio__radio:before{box-shadow:inset 0 0 0 .3rem var(--bizy-radio-color)}.bizy-radio__radio{display:flex;align-items:center;transition:.25s ease}.bizy-radio__radio:before{display:flex;flex-shrink:0;content:\"\";background-color:#fff;min-width:1rem;min-height:1rem;border-radius:50%;transition:.25s ease;box-shadow:inset 0 0 0 .1rem var(--bizy-radio-color)}.bizy-radio__input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], name: [{
                type: Input
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$2 = [
    BizyRadioComponent,
];
class BizyRadioModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyRadioModule, declarations: [BizyRadioComponent], imports: [CommonModule, FormsModule], exports: [BizyRadioComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRadioModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$2,
                    exports: COMPONENTS$2
                }]
        }] });

class BizyFormComponent {
    elementRef;
    inputs;
    selects;
    id = `bizy-form-${Math.random()}`;
    customClass = '';
    #subscription = new Subscription();
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngAfterViewInit() {
        const submit$ = fromEvent(this.elementRef.nativeElement, 'submit');
        this.#subscription.add(submit$.pipe(take(1)).subscribe(() => {
            if (this.inputs.length > 0) {
                this.inputs.forEach(component => {
                    component.setTouched(true);
                });
            }
            if (this.selects.length > 0) {
                this.selects.forEach(component => {
                    component.setTouched(true);
                });
            }
        }));
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormComponent, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFormComponent, selector: "bizy-form", inputs: { id: "id", customClass: "customClass" }, queries: [{ propertyName: "inputs", predicate: BizyInputComponent, descendants: true }, { propertyName: "selects", predicate: BizySelectComponent, descendants: true }], ngImport: i0, template: "<form class=\"bizy-form {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</form>", styles: [":host{font-size:1rem;max-width:var(--bizy-form-max-width)}.bizy-form{max-width:inherit;display:flex;flex-direction:column;row-gap:var(--bizy-form-row-gap);--bizy-input-max-width: 100%;--bizy-select-max-width: 100%}\n"], dependencies: [{ kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form class=\"bizy-form {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</form>", styles: [":host{font-size:1rem;max-width:var(--bizy-form-max-width)}.bizy-form{max-width:inherit;display:flex;flex-direction:column;row-gap:var(--bizy-form-row-gap);--bizy-input-max-width: 100%;--bizy-select-max-width: 100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { inputs: [{
                type: ContentChildren,
                args: [BizyInputComponent, { descendants: true }]
            }], selects: [{
                type: ContentChildren,
                args: [BizySelectComponent, { descendants: true }]
            }], id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

const COMPONENTS$1 = [
    BizyFormComponent,
];
class BizyFormModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFormModule, declarations: [BizyFormComponent], imports: [CommonModule, FormsModule], exports: [BizyFormComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$1,
                    exports: COMPONENTS$1
                }]
        }] });

class BizyGridRowComponent {
    elementRef;
    ref;
    renderer;
    rowHeight = 100; // Px
    set itemsPerRow(itemsPerRow) {
        if (!this.elementRef.nativeElement) {
            return;
        }
        if (!itemsPerRow) {
            itemsPerRow = 1;
        }
        let gridTemplateColumnsStyle = '1fr';
        for (let i = 1; i < itemsPerRow; i++) {
            gridTemplateColumnsStyle += ' 1fr';
        }
        this.renderer.setStyle(this.elementRef.nativeElement, 'gridTemplateRows', `${this.rowHeight}px`);
        this.renderer.setStyle(this.elementRef.nativeElement, 'gridTemplateColumns', gridTemplateColumnsStyle);
        this.ref.detectChanges();
    }
    constructor(elementRef, ref, renderer) {
        this.elementRef = elementRef;
        this.ref = ref;
        this.renderer = renderer;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridRowComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyGridRowComponent, selector: "bizy-grid-row", inputs: { rowHeight: "rowHeight", itemsPerRow: "itemsPerRow" }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:grid;column-gap:var(--bizy-grid-gap);margin-bottom:var(--bizy-grid-gap)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-grid-row', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:grid;column-gap:var(--bizy-grid-gap);margin-bottom:var(--bizy-grid-gap)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { rowHeight: [{
                type: Input
            }], itemsPerRow: [{
                type: Input
            }] } });

class BizyGridForDirective {
    viewContainerRef;
    templateRef;
    #items = new BehaviorSubject([]);
    get items$() {
        return this.#items.asObservable();
    }
    set gridForOf(items) {
        this.#items.next(items);
    }
    constructor(viewContainerRef, templateRef) {
        this.viewContainerRef = viewContainerRef;
        this.templateRef = templateRef;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridForDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyGridForDirective, selector: "[gridFor]", inputs: { gridForOf: "gridForOf" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridForDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gridFor]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef, decorators: [{
                    type: Inject,
                    args: [ViewContainerRef]
                }] }, { type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }]; }, propDecorators: { gridForOf: [{
                type: Input,
                args: ['gridForOf']
            }] } });

class BizyGridComponent {
    ref;
    document;
    renderer;
    elementRef;
    content;
    gridDirective;
    resizeRef = null;
    #rowScrollingMutationObserver;
    #resizeObserver;
    #subscription = new Subscription();
    #view;
    notifier$ = new Subject();
    rowHeight = 100;
    itemRows = [];
    items = [];
    itemTemplate;
    itemsPerRow = 1;
    constructor(ref, document, renderer, elementRef) {
        this.ref = ref;
        this.document = document;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        this.#rowScrollingMutationObserver = new MutationObserver(() => {
            if (!this.gridDirective) {
                return;
            }
            this.#subscription.add(this.gridDirective.items$.subscribe(items => {
                if (this.items.length === 0 && items.length === 0) {
                    return;
                }
                this.items = items;
                this.#updateView();
                if (!this.#view) {
                    this.#view = this.gridDirective.viewContainerRef;
                    this.#view.createEmbeddedView(this.content);
                }
            }));
            this.#rowScrollingMutationObserver.disconnect();
            this.ref.detectChanges();
        });
        this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });
        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
        const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
        this.#resizeObserver.observe(resizeRef);
        this.#subscription.add(this.notifier$.pipe(debounceTime(50)).subscribe(() => {
            this.#updateView();
        }));
    }
    #updateView = () => {
        this.itemTemplate = this.gridDirective.templateRef;
        const rowWidth = this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.firstChild.offsetWidth;
        let columnWidth = 100;
        const fontSize = Number(getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size').split('px')[0]);
        const rowHeightParameter = getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--bizy-grid-row-height');
        if (rowHeightParameter && rowHeightParameter.includes('rem')) {
            this.rowHeight = fontSize * Number(rowHeightParameter.split('rem')[0]);
        }
        else if (rowHeightParameter && rowHeightParameter.includes('px')) {
            this.rowHeight = Number(rowHeightParameter.split('px')[0]);
        }
        let gap = 10;
        const gapParameter = getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--bizy-grid-gap');
        if (gapParameter && gapParameter.includes('rem')) {
            gap = fontSize * Number(gapParameter.split('rem')[0]);
        }
        else if (gapParameter && gapParameter.includes('px')) {
            gap = Number(gapParameter.split('px')[0]);
        }
        const columnWidthParameter = getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--bizy-grid-column-width');
        if (columnWidthParameter && columnWidthParameter.includes('rem')) {
            columnWidth = fontSize * Number(columnWidthParameter.split('rem')[0]);
        }
        else if (columnWidthParameter && columnWidthParameter.includes('px')) {
            columnWidth = Number(columnWidthParameter.split('px')[0]);
        }
        columnWidth += gap;
        const count = Math.trunc(rowWidth / (columnWidth));
        if (Math.round((gap * (count - 1)) + (columnWidth * count)) <= (rowWidth)) {
            this.itemsPerRow = count <= 0 ? 1 : count;
        }
        else {
            this.itemsPerRow = (count - 1) <= 0 ? 1 : count - 1;
        }
        const itemRows = [];
        for (let i = 0; i < this.items.length; i += this.itemsPerRow) {
            const row = this.items.slice(i, i + this.itemsPerRow);
            itemRows.push(row);
        }
        this.itemRows = itemRows;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#rowScrollingMutationObserver) {
            this.#rowScrollingMutationObserver.disconnect();
        }
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: Renderer2 }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyGridComponent, selector: "bizy-grid", inputs: { resizeRef: "resizeRef" }, queries: [{ propertyName: "gridDirective", first: true, predicate: BizyGridForDirective, descendants: true }], viewQueries: [{ propertyName: "content", first: true, predicate: ["gridScrollingContent"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-grid\">\n\n    <cdk-virtual-scroll-viewport\n        class=\"bizy-grid__rows\"\n        *ngIf=\"items && items.length > 0\"\n        [itemSize]=\"rowHeight\"\n        [minBufferPx]=\"rowHeight + (rowHeight * 20)\"\n        [maxBufferPx]=\"rowHeight + (rowHeight * 40)\">\n        \n        <ng-content></ng-content>\n\n        <ng-template #gridScrollingContent>\n            <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"itemRows\">\n                <bizy-grid-row [rowHeight]=\"rowHeight\" [itemsPerRow]=\"itemsPerRow\">\n                    <ng-container *ngFor=\"let it of item\">\n                        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: it }\"></ng-template>\n                    </ng-container>\n                </bizy-grid-row>\n            </ng-template>\n        </ng-template>\n    </cdk-virtual-scroll-viewport>\n\n    <span class=\"bizy-grid__empty\" *ngIf=\"!items || items.length === 0\">\n        <ng-content select=\"[slot=empty]\"></ng-content>\n    </span>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-grid-min-height);max-height:var(--bizy-grid-max-height);height:var(--bizy-grid-height);width:var(--bizy-grid-width);flex:1;overflow-x:auto;overflow-y:hidden;font-size:1rem}.bizy-grid{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-grid-background-color)}.bizy-grid__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}.bizy-grid__empty{height:100%;width:100%}::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-grid-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2$2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2$2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2$2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "component", type: BizyGridRowComponent, selector: "bizy-grid-row", inputs: ["rowHeight", "itemsPerRow"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-grid', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-grid\">\n\n    <cdk-virtual-scroll-viewport\n        class=\"bizy-grid__rows\"\n        *ngIf=\"items && items.length > 0\"\n        [itemSize]=\"rowHeight\"\n        [minBufferPx]=\"rowHeight + (rowHeight * 20)\"\n        [maxBufferPx]=\"rowHeight + (rowHeight * 40)\">\n        \n        <ng-content></ng-content>\n\n        <ng-template #gridScrollingContent>\n            <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"itemRows\">\n                <bizy-grid-row [rowHeight]=\"rowHeight\" [itemsPerRow]=\"itemsPerRow\">\n                    <ng-container *ngFor=\"let it of item\">\n                        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: it }\"></ng-template>\n                    </ng-container>\n                </bizy-grid-row>\n            </ng-template>\n        </ng-template>\n    </cdk-virtual-scroll-viewport>\n\n    <span class=\"bizy-grid__empty\" *ngIf=\"!items || items.length === 0\">\n        <ng-content select=\"[slot=empty]\"></ng-content>\n    </span>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-grid-min-height);max-height:var(--bizy-grid-max-height);height:var(--bizy-grid-height);width:var(--bizy-grid-width);flex:1;overflow-x:auto;overflow-y:hidden;font-size:1rem}.bizy-grid{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-grid-background-color)}.bizy-grid__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}.bizy-grid__empty{height:100%;width:100%}::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-grid-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['gridScrollingContent']
            }], gridDirective: [{
                type: ContentChild,
                args: [BizyGridForDirective]
            }], resizeRef: [{
                type: Input
            }] } });

const COMPONENTS = [
    BizyGridComponent,
    BizyGridForDirective,
    BizyGridRowComponent
];
class BizyGridModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyGridModule, declarations: [BizyGridComponent,
            BizyGridForDirective,
            BizyGridRowComponent], imports: [CommonModule, FormsModule, ScrollingModule], exports: [BizyGridComponent,
            BizyGridForDirective,
            BizyGridRowComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridModule, imports: [CommonModule, FormsModule, ScrollingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ScrollingModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BIZY_TAG_TYPE, BizyAccordionComponent, BizyAccordionModule, BizyBarLineChartComponent, BizyBarLineChartModule, BizyBreadcrumbComponent, BizyBreadcrumbModule, BizyButtonComponent, BizyButtonModule, BizyCardComponent, BizyCardModule, BizyCheckboxComponent, BizyCheckboxModule, BizyDatePickerComponent, BizyDatePickerModule, BizyFileUploaderComponent, BizyFileUploaderModule, BizyFileUploaderService, BizyFilterComponent, BizyFilterContentComponent, BizyFilterModule, BizyFilterPipe, BizyFilterSectionCheckboxOptionComponent, BizyFilterSectionComponent, BizyFilterSectionRangeOptionComponent, BizyFilterSectionSearchOptionComponent, BizyFilterSectionsComponent, BizyFormComponent, BizyFormModule, BizyGridComponent, BizyGridForDirective, BizyGridModule, BizyGridRowComponent, BizyInputComponent, BizyInputModule, BizyInputOptionComponent, BizyMenuComponent, BizyMenuModule, BizyMenuOptionComponent, BizyMenuTitleComponent, BizyPieChartComponent, BizyPieChartModule, BizyRadioComponent, BizyRadioModule, BizyRangeFilterPipe, BizySelectComponent, BizySelectModule, BizySelectOptionComponent, BizySidebarComponent, BizySidebarFloatingOptionComponent, BizySidebarFloatingOptionTitleComponent, BizySidebarModule, BizySidebarOptionComponent, BizySliderComponent, BizySliderModule, BizyTabComponent, BizyTableColumnArrowsComponent, BizyTableColumnComponent, BizyTableComponent, BizyTableFooterComponent, BizyTableHeaderComponent, BizyTableModule, BizyTableRowComponent, BizyTableRowExpandContentComponent, BizyTableScrollingComponent, BizyTableScrollingDirective, BizyTabsComponent, BizyTabsModule, BizyTagComponent, BizyTagModule, BizyToggleComponent, BizyToggleModule, BizyToolbarComponent, BizyToolbarModule };
//# sourceMappingURL=bizy-components.mjs.map
