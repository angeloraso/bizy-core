import * as i0 from '@angular/core';
import { EventEmitter, Renderer2, Component, ChangeDetectionStrategy, Inject, ViewChild, Input, Output, NgModule, ElementRef, Directive, TemplateRef, ChangeDetectorRef, ContentChild, ViewContainerRef, ContentChildren, Pipe } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule, DOCUMENT, DecimalPipe } from '@angular/common';
import * as i2$2 from '@angular/forms';
import { FormsModule, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, filter, take, Subject, interval, Subscription, fromEvent, skip as skip$1, debounceTime as debounceTime$1 } from 'rxjs';
import { takeUntil, skip, debounceTime } from 'rxjs/operators';
import * as i2 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i2$1 from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import * as i2$3 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as echarts from 'echarts';

class ToggleComponent {
    renderer;
    bizyToggleInput;
    #afterViewInit = new BehaviorSubject(false);
    id = `bizy-toggle-${Math.random()}`;
    label = '';
    labelPosition = 'after';
    disabled = false;
    checkedChange = new EventEmitter();
    onSelect = new EventEmitter();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToggleComponent, deps: [{ token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ToggleComponent, selector: "bizy-toggle", inputs: { id: "id", label: "label", labelPosition: "labelPosition", disabled: "disabled", checked: "checked" }, outputs: { checkedChange: "checkedChange", onSelect: "onSelect" }, viewQueries: [{ propertyName: "bizyToggleInput", first: true, predicate: ["bizyToggleInput"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-toggle\">\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'before'\">{{label}}</label>\n\n    <div class=\"bizy-toggle__slide\">\n        <input \n            #bizyToggleInput\n            id=\"{{id}}\"\n            type=\"checkbox\"\n            (change)=\"checkedChange.emit(!_checked); onSelect.emit(!_checked)\"\n            class=\"bizy-toggle__slide__checkbox\"\n            [ngClass]=\"{'bizy-toggle__slide__checkbox--disabled': disabled}\">\n        <div class=\"bizy-toggle__slide__knobs\"></div>\n        <div class=\"bizy-toggle__slide__layer\"></div>\n    </div>\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'after'\">{{label}}</label>\n    \n</div>", styles: [".bizy-toggle{display:flex;width:-moz-fit-content;width:fit-content;column-gap:.5rem;align-items:center}.bizy-toggle__slide{position:relative;width:3rem;height:1.6rem}.bizy-toggle__slide__layer{border-radius:100px}.bizy-toggle__slide__checkbox{position:relative;width:100%;height:100%;padding:0;margin:0;opacity:0;cursor:pointer;z-index:3}.bizy-toggle__slide__knobs,.bizy-toggle__slide__layer{position:absolute;inset:0}.bizy-toggle__slide__knobs{z-index:2}.bizy-toggle__slide__knobs:before{content:\"\";position:absolute;top:0;left:.15rem;width:1.3rem;height:1.3rem;color:#fff;padding:.6rem .5rem;background-color:var(--bizy-toggle-off-color);border-radius:50%;transition:.3s cubic-bezier(.18,.89,.35,1.15) all}.bizy-toggle__slide__layer{background-color:var(--bizy-toggle-off-background-color);transition:.3s ease all;z-index:1;position:relative;top:-1.45rem;width:2.2rem;height:.6rem;left:.6rem}.bizy-toggle__slide__checkbox:checked+.bizy-toggle__slide__knobs:before{content:\"\";left:2rem;background-color:var(--bizy-toggle-on-color)}.bizy-toggle__slide__checkbox:checked~.bizy-toggle__slide__layer{width:2.2rem;height:.6rem;background-color:var(--bizy-toggle-on-background-color);position:relative;top:-1.45rem;left:.6rem}.bizy-toggle__slide__knobs,.bizy-toggle__slide__knobs:before,.bizy-toggle__slide__layer{transition:.3s ease all}.bizy-toggle__slide__checkbox--disabled{pointer-events:none;cursor:default}.bizy-toggle__label{cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toggle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-toggle\">\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'before'\">{{label}}</label>\n\n    <div class=\"bizy-toggle__slide\">\n        <input \n            #bizyToggleInput\n            id=\"{{id}}\"\n            type=\"checkbox\"\n            (change)=\"checkedChange.emit(!_checked); onSelect.emit(!_checked)\"\n            class=\"bizy-toggle__slide__checkbox\"\n            [ngClass]=\"{'bizy-toggle__slide__checkbox--disabled': disabled}\">\n        <div class=\"bizy-toggle__slide__knobs\"></div>\n        <div class=\"bizy-toggle__slide__layer\"></div>\n    </div>\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'after'\">{{label}}</label>\n    \n</div>", styles: [".bizy-toggle{display:flex;width:-moz-fit-content;width:fit-content;column-gap:.5rem;align-items:center}.bizy-toggle__slide{position:relative;width:3rem;height:1.6rem}.bizy-toggle__slide__layer{border-radius:100px}.bizy-toggle__slide__checkbox{position:relative;width:100%;height:100%;padding:0;margin:0;opacity:0;cursor:pointer;z-index:3}.bizy-toggle__slide__knobs,.bizy-toggle__slide__layer{position:absolute;inset:0}.bizy-toggle__slide__knobs{z-index:2}.bizy-toggle__slide__knobs:before{content:\"\";position:absolute;top:0;left:.15rem;width:1.3rem;height:1.3rem;color:#fff;padding:.6rem .5rem;background-color:var(--bizy-toggle-off-color);border-radius:50%;transition:.3s cubic-bezier(.18,.89,.35,1.15) all}.bizy-toggle__slide__layer{background-color:var(--bizy-toggle-off-background-color);transition:.3s ease all;z-index:1;position:relative;top:-1.45rem;width:2.2rem;height:.6rem;left:.6rem}.bizy-toggle__slide__checkbox:checked+.bizy-toggle__slide__knobs:before{content:\"\";left:2rem;background-color:var(--bizy-toggle-on-color)}.bizy-toggle__slide__checkbox:checked~.bizy-toggle__slide__layer{width:2.2rem;height:.6rem;background-color:var(--bizy-toggle-on-background-color);position:relative;top:-1.45rem;left:.6rem}.bizy-toggle__slide__knobs,.bizy-toggle__slide__knobs:before,.bizy-toggle__slide__layer{transition:.3s ease all}.bizy-toggle__slide__checkbox--disabled{pointer-events:none;cursor:default}.bizy-toggle__label{cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { bizyToggleInput: [{
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
            }], checkedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], checked: [{
                type: Input
            }] } });

const COMPONENTS$f = [
    ToggleComponent,
];
class ToggleModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToggleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ToggleModule, declarations: [ToggleComponent], imports: [CommonModule, FormsModule], exports: [ToggleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToggleModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToggleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$f,
                    exports: COMPONENTS$f
                }]
        }] });

class ButtonComponent {
    id = String(Math.random());
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ButtonComponent, selector: "bizy-button", inputs: { id: "id", disabled: "disabled", type: "type", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    [type]=\"type\"\n    id=\"{{id}}\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n        \n    <ng-content></ng-content>\n    \n</button>\n\n", styles: [".bizy-button{display:flex;justify-content:center;align-items:center;column-gap:.5rem;width:-moz-fit-content;width:fit-content;padding:.5rem;border-radius:.3rem;color:var(--bizy-button-color, #ffffff);border:none;cursor:pointer;background-color:var(--bizy-button-background-color, transparent)}.bizy-button:hover{filter:brightness(95%)}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    [type]=\"type\"\n    id=\"{{id}}\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n        \n    <ng-content></ng-content>\n    \n</button>\n\n", styles: [".bizy-button{display:flex;justify-content:center;align-items:center;column-gap:.5rem;width:-moz-fit-content;width:fit-content;padding:.5rem;border-radius:.3rem;color:var(--bizy-button-color, #ffffff);border:none;cursor:pointer;background-color:var(--bizy-button-background-color, transparent)}.bizy-button:hover{filter:brightness(95%)}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"] }]
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

const COMPONENTS$e = [
    ButtonComponent,
];
class ButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ButtonModule, declarations: [ButtonComponent], imports: [CommonModule, FormsModule], exports: [ButtonComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ButtonModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$e,
                    exports: COMPONENTS$e
                }]
        }] });

class FabButtonComponent {
    id = String(Math.random());
    disabled = false;
    customClass = '';
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FabButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FabButtonComponent, selector: "bizy-fab-button", inputs: { id: "id", disabled: "disabled", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    class=\"bizy-fab-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n    <span class=\"bizy-fab-button__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem}.bizy-fab-button{display:flex;display:grid;place-items:center;border-radius:50%;color:var(---bizy-fab-button-color, #ffffff);border:none;background-color:var(---bizy-fab-button-background-color, #16aa88);cursor:pointer;position:absolute;bottom:.5rem;right:.5rem;padding:1.2rem 1.3rem}.bizy-fab-button:hover{filter:brightness(95%)}.bizy-fab-button__content{width:100%;justify-content:center;align-items:center;flex-direction:column;row-gap:.5rem}.bizy-fab-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FabButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-fab-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    class=\"bizy-fab-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n    <span class=\"bizy-fab-button__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem}.bizy-fab-button{display:flex;display:grid;place-items:center;border-radius:50%;color:var(---bizy-fab-button-color, #ffffff);border:none;background-color:var(---bizy-fab-button-background-color, #16aa88);cursor:pointer;position:absolute;bottom:.5rem;right:.5rem;padding:1.2rem 1.3rem}.bizy-fab-button:hover{filter:brightness(95%)}.bizy-fab-button__content{width:100%;justify-content:center;align-items:center;flex-direction:column;row-gap:.5rem}.bizy-fab-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$d = [
    FabButtonComponent,
];
class FabButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FabButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: FabButtonModule, declarations: [FabButtonComponent], imports: [CommonModule, FormsModule], exports: [FabButtonComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FabButtonModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FabButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$d,
                    exports: COMPONENTS$d
                }]
        }] });

class ConfirmButtonsComponent {
    confirmLabel = 'Confirmar';
    cancelLabel = 'Cancelar';
    position;
    disabled = false;
    cancel = new EventEmitter();
    confirm = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfirmButtonsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ConfirmButtonsComponent, selector: "bizy-confirm-buttons", inputs: { confirmLabel: "confirmLabel", cancelLabel: "cancelLabel", position: "position", disabled: "disabled" }, outputs: { cancel: "cancel", confirm: "confirm" }, ngImport: i0, template: "<div class=\"bizy-confirm-buttons bizy-confirm-buttons--{{position}}\">\n\n    <bizy-button \n        customClass=\"bizy-confirm-buttons__cancel-button\"\n        type=\"button\"\n        (onSelect)=\"cancel.emit()\">\n        <svg \n            data-name=\"Cancel button\"\n            class=\"bizy-confirm-buttons__svg\"\n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__cancel-button__svg__content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n        <h4 class=\"bizy-confirm-buttons__cancel-button__label\">{{cancelLabel}}</h4>\n    </bizy-button>\n\n    <bizy-button \n        customClass=\"bizy-confirm-buttons__confirm-button\"\n        [disabled]=\"disabled\"\n        type=\"submit\"\n        (onSelect)=\"confirm.emit()\">\n        <h4 class=\"bizy-confirm-buttons__confirm-button__label\">{{confirmLabel}}</h4>\n        \n        <svg \n            viewBox=\"0 0 512 512\"\n            class=\"bizy-confirm-buttons__svg\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__confirm-button__svg__content\" d=\"M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z\"/>\n        </svg>\n\n    </bizy-button>\n\n</div>", styles: [".bizy-confirm-buttons{background-color:transparent;height:auto;display:flex;align-items:center;justify-content:space-evenly;column-gap:1rem;width:100%}.bizy-confirm-buttons--fixed{position:fixed;bottom:0;right:0;left:0}.bizy-confirm-buttons--sticky{position:sticky;bottom:0;right:0;left:0}::ng-deep .bizy-confirm-buttons__confirm-button{background-color:var(--bizy-confirm-buttons-confirm-background-color, #16aa88)!important}::ng-deep .bizy-confirm-buttons__cancel-button{background-color:var(--bizy-confirm-buttons-cancel-background-color, #e76565)!important}.bizy-confirm-buttons__svg{height:1rem}.bizy-confirm-buttons__cancel-button__svg__content{fill:var(--bizy-confirm-buttons-cancel-color, #fff)}.bizy-confirm-buttons__cancel-button__label{color:var(--bizy-confirm-buttons-cancel-color, #fff)}.bizy-confirm-buttons__confirm-button__svg__content{fill:var(--bizy-confirm-buttons-confirm-color, #fff)}.bizy-confirm-buttons__confirm-button__label{color:var(--bizy-confirm-buttons-confirm-color, #fff)}\n"], dependencies: [{ kind: "component", type: ButtonComponent, selector: "bizy-button", inputs: ["id", "disabled", "type", "customClass"], outputs: ["onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfirmButtonsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-confirm-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-confirm-buttons bizy-confirm-buttons--{{position}}\">\n\n    <bizy-button \n        customClass=\"bizy-confirm-buttons__cancel-button\"\n        type=\"button\"\n        (onSelect)=\"cancel.emit()\">\n        <svg \n            data-name=\"Cancel button\"\n            class=\"bizy-confirm-buttons__svg\"\n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__cancel-button__svg__content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n        <h4 class=\"bizy-confirm-buttons__cancel-button__label\">{{cancelLabel}}</h4>\n    </bizy-button>\n\n    <bizy-button \n        customClass=\"bizy-confirm-buttons__confirm-button\"\n        [disabled]=\"disabled\"\n        type=\"submit\"\n        (onSelect)=\"confirm.emit()\">\n        <h4 class=\"bizy-confirm-buttons__confirm-button__label\">{{confirmLabel}}</h4>\n        \n        <svg \n            viewBox=\"0 0 512 512\"\n            class=\"bizy-confirm-buttons__svg\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__confirm-button__svg__content\" d=\"M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z\"/>\n        </svg>\n\n    </bizy-button>\n\n</div>", styles: [".bizy-confirm-buttons{background-color:transparent;height:auto;display:flex;align-items:center;justify-content:space-evenly;column-gap:1rem;width:100%}.bizy-confirm-buttons--fixed{position:fixed;bottom:0;right:0;left:0}.bizy-confirm-buttons--sticky{position:sticky;bottom:0;right:0;left:0}::ng-deep .bizy-confirm-buttons__confirm-button{background-color:var(--bizy-confirm-buttons-confirm-background-color, #16aa88)!important}::ng-deep .bizy-confirm-buttons__cancel-button{background-color:var(--bizy-confirm-buttons-cancel-background-color, #e76565)!important}.bizy-confirm-buttons__svg{height:1rem}.bizy-confirm-buttons__cancel-button__svg__content{fill:var(--bizy-confirm-buttons-cancel-color, #fff)}.bizy-confirm-buttons__cancel-button__label{color:var(--bizy-confirm-buttons-cancel-color, #fff)}.bizy-confirm-buttons__confirm-button__svg__content{fill:var(--bizy-confirm-buttons-confirm-color, #fff)}.bizy-confirm-buttons__confirm-button__label{color:var(--bizy-confirm-buttons-confirm-color, #fff)}\n"] }]
        }], propDecorators: { confirmLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], position: [{
                type: Input
            }], disabled: [{
                type: Input
            }], cancel: [{
                type: Output
            }], confirm: [{
                type: Output
            }] } });

const COMPONENTS$c = [
    ConfirmButtonsComponent,
];
class ConfirmButtonsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfirmButtonsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ConfirmButtonsModule, declarations: [ConfirmButtonsComponent], imports: [CommonModule, FormsModule, ButtonModule], exports: [ConfirmButtonsComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfirmButtonsModule, imports: [CommonModule, FormsModule, ButtonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfirmButtonsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ButtonModule],
                    declarations: COMPONENTS$c,
                    exports: COMPONENTS$c
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollGridDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: VirtualScrollGridDirective, selector: "[virtualScrollGrid]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualScrollGrid]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; } });

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollNgForDirective, deps: [{ token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: VirtualScrollNgForDirective, selector: "[virtualNgFor]", inputs: { virtualNgForIn: "virtualNgForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollNgForDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualNgFor]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }]; }, propDecorators: { virtualNgForIn: [{
                type: Input
            }] } });

const MIN_VIRTUAL_SCROLL_WIDTH = 300;
class VirtualScrollComponent {
    elementRef;
    ref;
    document;
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
    #fontSize = 0;
    #resizeObserver;
    #mutationObserver;
    #subscription = new Subscription();
    constructor(elementRef, ref, document) {
        this.elementRef = elementRef;
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        if (this.#isString(this.itemMinHeight) && this.itemMinHeight.includes('rem')) {
            this._itemMinHeight = Number(this.itemMinHeight.split('rem')[0]) * 14; // 14 font size aprox
        }
        else {
            this._itemMinHeight = this.itemMinHeight;
        }
        this.#mutationObserver = new MutationObserver(() => {
            const virtualScrollWidth = this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.firstChild.offsetWidth;
            if (!virtualScrollWidth) {
                return;
            }
            this.bizyVirtualScrollWidth = virtualScrollWidth;
            this.#subscription.add(this.virtualFor.items.subscribe(items => {
                if (!items) {
                    return;
                }
                if (items.length > 0) {
                    this.items = items;
                    this.#fillVirtualScroll();
                    if (!this.#resizeObserver) {
                        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
                        this.#resizeObserver.observe(this.elementRef.nativeElement.parentElement?.parentElement);
                        this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
                            if (this.elementRef.nativeElement?.firstChild?.firstChild?.clientWidth) {
                                this.bizyVirtualScrollWidth = this.elementRef.nativeElement.firstChild.firstChild.clientWidth;
                                this.#fillVirtualScroll();
                            }
                        }));
                        this.notifier$.next();
                    }
                }
                else {
                    this.virtualScrollItems = [];
                }
            }));
            this.#mutationObserver.disconnect();
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    #fillVirtualScroll = () => {
        if (this.bizyVirtualScrollWidth < MIN_VIRTUAL_SCROLL_WIDTH) {
            this.itemsByRow = 1;
        }
        else {
            if (!this.#fontSize) {
                const fontSize = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size');
                this.#fontSize = Number(fontSize.split('px')[0]);
            }
            const gridGap = this.#fontSize || 14;
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
        this.#subscription.unsubscribe();
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: VirtualScrollComponent, selector: "bizy-virtual-scroll", inputs: { itemMinHeight: "itemMinHeight", itemMinWidth: "itemMinWidth", emptyText: "emptyText", viewportHeight: "viewportHeight" }, queries: [{ propertyName: "virtualFor", first: true, predicate: VirtualScrollNgForDirective, descendants: true }], ngImport: i0, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems.length !== 0\"\n    class=\"bizy-virtual-scroll\"\n    [itemSize]=\"_itemMinHeight\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n  <span *ngIf=\"virtualScrollItems.length === 0\" class=\"bizy-virtual-scroll--empty\">{{emptyText}}</span>\n\n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1em;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--empty{min-height:6rem;font-size:1.4rem;display:grid;place-items:center;text-align:center}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-virtual-scroll', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems.length !== 0\"\n    class=\"bizy-virtual-scroll\"\n    [itemSize]=\"_itemMinHeight\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n  <span *ngIf=\"virtualScrollItems.length === 0\" class=\"bizy-virtual-scroll--empty\">{{emptyText}}</span>\n\n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1em;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--empty{min-height:6rem;font-size:1.4rem;display:grid;place-items:center;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { virtualFor: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollModule, declarations: [VirtualScrollComponent,
            VirtualScrollGridDirective,
            VirtualScrollNgForDirective], imports: [CommonModule, ScrollingModule], exports: [VirtualScrollComponent,
            VirtualScrollGridDirective,
            VirtualScrollNgForDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollModule, imports: [CommonModule, ScrollingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollModule, decorators: [{
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
    enter = new EventEmitter();
    onBlur = new EventEmitter();
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
    _onBlur() {
        this.control.markAsTouched();
        this.onBlur.emit();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: InputComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: InputComponent, selector: "bizy-input", inputs: { id: "id", disabled: "disabled", readonly: "readonly", multiple: "multiple", clear: "clear", autoFocus: "autoFocus", autoCapitalize: "autoCapitalize", autoCorrect: "autoCorrect", browserAutoComplete: "browserAutoComplete", type: "type", label: "label", max: "max", maxLength: "maxLength", min: "min", minLength: "minLength", control: "control", placeholder: "placeholder", cancelLabel: "cancelLabel", confirmLabel: "confirmLabel", customClass: "customClass" }, outputs: { onFocus: "onFocus", enter: "enter", onBlur: "onBlur" }, viewQueries: [{ propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<ion-input \n    #bizyInput\n    *ngIf=\"type !== 'date' && type !== 'date-time' && type !== 'time' && type !== 'month-year' && type !== 'year' && type !== 'month' && type !== 'search'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    [type]=\"type\"\n    [inputmode]=\"type\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly\"\n    [value]=\"control?.value\"\n    [spellcheck]=\"true\"\n    [autocapitalize]=\"autoCapitalize ? 'on' : 'off'\"\n    [autocorrect]=\"autoCorrect ? 'on' : 'off'\"\n    [autocomplete]=\"browserAutoComplete ? 'on' : 'off'\"\n    [autofocus]=\"autoFocus\"\n    fill=\"solid\"\n    [max]=\"max\"\n    [maxlength]=\"maxLength\"\n    [min]=\"min\"\n    [minlength]=\"minLength\"\n    [debounce]=\"300\"\n    (ionBlur)=\"_onBlur()\"\n    (ionInput)=\"onInput($event)\"\n    (keyup.enter)=\"enter.emit()\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <h4 slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></h4>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<ion-input \n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    type=\"text\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"true\"\n    [value]=\"control?.value | date : (type === 'date' ? 'dd/MM/yyyy' : type === 'date-time' ? 'dd/MM/yyyy hh:mm' : type === 'time' ? 'hh:mm' : type === 'month-year' ? 'MMMM yyyy' : type === 'year' ? 'yyyy' : 'MMMM')\"\n    fill=\"solid\"\n    (ionBlur)=\"_onBlur()\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <h4 slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></h4>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<span class=\"bizy-input__errors\" *ngIf=\"control && control.touched && control.invalid\">\n    <ng-content select=\"[input-error]\"></ng-content>\n</span>\n\n<ion-modal \n    #bizyInputDateTimeModal\n    trigger=\"{{id}}\"\n    class=\"bizy-date-input\"\n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\">\n    <ng-template>\n\n        <ion-datetime \n            #bizyInputDateTime\n            [presentation]=\"type\" \n            [firstDayOfWeek]=\"1\"\n            [min]=\"min\"\n            [max]=\"max\"\n            locale=\"es-AR\"\n            hourCycle=\"h24\"\n            [showDefaultButtons]=\"true\"\n            [cancelText]=\"cancelLabel\"\n            [doneText]=\"confirmLabel\"\n            [value]=\"control?.value\">\n\n            <bizy-confirm-buttons\n                slot=\"buttons\"\n                (cancel)=\"cancel(bizyInputDateTimeModal, bizyInputDateTime)\"\n                (confirm)=\"confirm(bizyInputDateTimeModal, bizyInputDateTime)\">\n            </bizy-confirm-buttons>\n        </ion-datetime>\n\n    </ng-template>\n</ion-modal>\n\n", styles: [":host{font-size:1rem;width:100%}::ng-deep .bizy-input{--color: var(--bizy-input-color) !important;--background: var(--bizy-input-background-color) !important;--placeholder-color: var(--bizy-input-placeholder-color) !important;--placeholder-opacity: .8 !important;--padding-start: .3rem !important;--padding-end: .3rem !important;--inner-padding-end: 0 !important;--border-radius: .3rem .3rem 0 0 !important;border-bottom:.1rem solid var(--bizy-input-color)}::ng-deep .bizy-input__errors{margin-top:.5rem;display:flex;flex-direction:column;row-gap:.3rem}::ng-deep .bizy-input--error{border-bottom-color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input--error [slot=label]{color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input [slot=label]{color:var(--bizy-input-label-color)}::ng-deep .bizy-input [slot=start]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .bizy-input [slot=end]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .input-clear-icon.sc-ion-input-ios{width:auto!important;height:auto!important}::ng-deep .bizy-date-input{--width: auto !important;--height: auto !important}::ng-deep ion-datetime{--ion-color-base: var(--bizy-input-date-color);--ion-color-contrast: var(--bizy-input-date-contrast-color) !important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$1.IonDatetime, selector: "ion-datetime", inputs: ["cancelText", "clearText", "color", "dayValues", "disabled", "doneText", "firstDayOfWeek", "highlightedDates", "hourCycle", "hourValues", "isDateEnabled", "locale", "max", "min", "minuteValues", "mode", "monthValues", "multiple", "name", "preferWheel", "presentation", "readonly", "showClearButton", "showDefaultButtons", "showDefaultTimeLabel", "showDefaultTitle", "size", "titleSelectedDatesFormatter", "value", "yearValues"] }, { kind: "component", type: i2$1.IonInput, selector: "ion-input", inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "legacy", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "size", "spellcheck", "step", "type", "value"] }, { kind: "component", type: i2$1.IonModal, selector: "ion-modal" }, { kind: "directive", type: i2$1.SelectValueAccessor, selector: "ion-select, ion-radio-group, ion-segment, ion-datetime" }, { kind: "directive", type: i2$1.TextValueAccessor, selector: "ion-input:not([type=number]),ion-textarea,ion-searchbar,ion-range" }, { kind: "component", type: ConfirmButtonsComponent, selector: "bizy-confirm-buttons", inputs: ["confirmLabel", "cancelLabel", "position", "disabled"], outputs: ["cancel", "confirm"] }, { kind: "pipe", type: i1.DatePipe, name: "date" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ion-input \n    #bizyInput\n    *ngIf=\"type !== 'date' && type !== 'date-time' && type !== 'time' && type !== 'month-year' && type !== 'year' && type !== 'month' && type !== 'search'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    [type]=\"type\"\n    [inputmode]=\"type\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly\"\n    [value]=\"control?.value\"\n    [spellcheck]=\"true\"\n    [autocapitalize]=\"autoCapitalize ? 'on' : 'off'\"\n    [autocorrect]=\"autoCorrect ? 'on' : 'off'\"\n    [autocomplete]=\"browserAutoComplete ? 'on' : 'off'\"\n    [autofocus]=\"autoFocus\"\n    fill=\"solid\"\n    [max]=\"max\"\n    [maxlength]=\"maxLength\"\n    [min]=\"min\"\n    [minlength]=\"minLength\"\n    [debounce]=\"300\"\n    (ionBlur)=\"_onBlur()\"\n    (ionInput)=\"onInput($event)\"\n    (keyup.enter)=\"enter.emit()\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <h4 slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></h4>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<ion-input \n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    type=\"text\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"true\"\n    [value]=\"control?.value | date : (type === 'date' ? 'dd/MM/yyyy' : type === 'date-time' ? 'dd/MM/yyyy hh:mm' : type === 'time' ? 'hh:mm' : type === 'month-year' ? 'MMMM yyyy' : type === 'year' ? 'yyyy' : 'MMMM')\"\n    fill=\"solid\"\n    (ionBlur)=\"_onBlur()\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <h4 slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></h4>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<span class=\"bizy-input__errors\" *ngIf=\"control && control.touched && control.invalid\">\n    <ng-content select=\"[input-error]\"></ng-content>\n</span>\n\n<ion-modal \n    #bizyInputDateTimeModal\n    trigger=\"{{id}}\"\n    class=\"bizy-date-input\"\n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\">\n    <ng-template>\n\n        <ion-datetime \n            #bizyInputDateTime\n            [presentation]=\"type\" \n            [firstDayOfWeek]=\"1\"\n            [min]=\"min\"\n            [max]=\"max\"\n            locale=\"es-AR\"\n            hourCycle=\"h24\"\n            [showDefaultButtons]=\"true\"\n            [cancelText]=\"cancelLabel\"\n            [doneText]=\"confirmLabel\"\n            [value]=\"control?.value\">\n\n            <bizy-confirm-buttons\n                slot=\"buttons\"\n                (cancel)=\"cancel(bizyInputDateTimeModal, bizyInputDateTime)\"\n                (confirm)=\"confirm(bizyInputDateTimeModal, bizyInputDateTime)\">\n            </bizy-confirm-buttons>\n        </ion-datetime>\n\n    </ng-template>\n</ion-modal>\n\n", styles: [":host{font-size:1rem;width:100%}::ng-deep .bizy-input{--color: var(--bizy-input-color) !important;--background: var(--bizy-input-background-color) !important;--placeholder-color: var(--bizy-input-placeholder-color) !important;--placeholder-opacity: .8 !important;--padding-start: .3rem !important;--padding-end: .3rem !important;--inner-padding-end: 0 !important;--border-radius: .3rem .3rem 0 0 !important;border-bottom:.1rem solid var(--bizy-input-color)}::ng-deep .bizy-input__errors{margin-top:.5rem;display:flex;flex-direction:column;row-gap:.3rem}::ng-deep .bizy-input--error{border-bottom-color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input--error [slot=label]{color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input [slot=label]{color:var(--bizy-input-label-color)}::ng-deep .bizy-input [slot=start]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .bizy-input [slot=end]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .input-clear-icon.sc-ion-input-ios{width:auto!important;height:auto!important}::ng-deep .bizy-date-input{--width: auto !important;--height: auto !important}::ng-deep ion-datetime{--ion-color-base: var(--bizy-input-date-color);--ion-color-contrast: var(--bizy-input-date-contrast-color) !important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { bizyInput: [{
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
            }], enter: [{
                type: Output
            }], onBlur: [{
                type: Output
            }] } });

class ErrorComponent {
    label;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ErrorComponent, selector: "bizy-error", inputs: { label: "label" }, ngImport: i0, template: "<h6 class=\"bizy-error\"><ng-content></ng-content></h6>\n", styles: ["@keyframes fade-in{0%{opacity:0}to{opacity:1}}.bizy-error{color:var(--bizy-error-color);font-weight:700;animation-name:fade-in;animation-duration:.5s;animation-fill-mode:both}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-error', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h6 class=\"bizy-error\"><ng-content></ng-content></h6>\n", styles: ["@keyframes fade-in{0%{opacity:0}to{opacity:1}}.bizy-error{color:var(--bizy-error-color);font-weight:700;animation-name:fade-in;animation-duration:.5s;animation-fill-mode:both}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }] } });

const COMPONENTS$b = [
    ErrorComponent,
];
class ErrorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ErrorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ErrorModule, declarations: [ErrorComponent], imports: [CommonModule, FormsModule], exports: [ErrorComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ErrorModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ErrorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$b,
                    exports: COMPONENTS$b
                }]
        }] });

const COMPONENTS$a = [InputComponent];
class InputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: InputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: InputModule, declarations: [InputComponent], imports: [CommonModule,
            FormsModule,
            IonicModule,
            ErrorModule,
            ConfirmButtonsModule], exports: [InputComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: InputModule, imports: [CommonModule,
            FormsModule,
            IonicModule,
            ErrorModule,
            ConfirmButtonsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: InputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        IonicModule,
                        ErrorModule,
                        ConfirmButtonsModule
                    ],
                    declarations: COMPONENTS$a,
                    exports: COMPONENTS$a,
                }]
        }] });

class TabsComponent {
    customClass;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TabsComponent, selector: "bizy-tabs", inputs: { customClass: "customClass" }, ngImport: i0, template: "<div class=\"bizy-tabs {{customClass}}\">\n\n    <ng-content select=\"bizy-tab\"></ng-content>\n\n</div>", styles: [".bizy-tabs{display:flex;align-items:center;background-color:var(--bizy-tabs-background-color, #ffffff)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tabs', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-tabs {{customClass}}\">\n\n    <ng-content select=\"bizy-tab\"></ng-content>\n\n</div>", styles: [".bizy-tabs{display:flex;align-items:center;background-color:var(--bizy-tabs-background-color, #ffffff)}\n"] }]
        }], propDecorators: { customClass: [{
                type: Input
            }] } });

class TabComponent {
    id = `bizy-tab-${Math.random()}`;
    selected = false;
    customClass;
    onSelect = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TabComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TabComponent, selector: "bizy-tab", inputs: { id: "id", selected: "selected", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<span class=\"bizy-tab__selected-line\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected}\"></span>\n\n<button \n  type=\"button\"\n  id=\"{{id}}\"\n  [ngClass]=\"{'bizy-tab--selected': selected}\"\n  class=\"bizy-tab {{customClass}}\"\n  (click)=\"onSelect.emit()\"\n  (keyup.enter)=\"onSelect.emit()\">\n\n  <ng-content select=\"[tab-icon]\"></ng-content>\n\n  <ng-content select=\"[tab-label]\"></ng-content>\n\n</button>", styles: [":host{flex:1}.bizy-tab{width:100%;display:flex;flex-direction:column;align-items:center;border:none;padding-top:.5rem;background-color:transparent;color:var(--bizy-tab-color, #666666);cursor:pointer}.bizy-tab--selected{color:var(--bizy-tab-selected-color, #16aa88)}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-tab__selected-line{display:block;width:100%;height:.2rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-tab-selected-color, #16aa88)}.bizy-tab__selected-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.3s;animation-fill-mode:both}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tab', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-tab__selected-line\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected}\"></span>\n\n<button \n  type=\"button\"\n  id=\"{{id}}\"\n  [ngClass]=\"{'bizy-tab--selected': selected}\"\n  class=\"bizy-tab {{customClass}}\"\n  (click)=\"onSelect.emit()\"\n  (keyup.enter)=\"onSelect.emit()\">\n\n  <ng-content select=\"[tab-icon]\"></ng-content>\n\n  <ng-content select=\"[tab-label]\"></ng-content>\n\n</button>", styles: [":host{flex:1}.bizy-tab{width:100%;display:flex;flex-direction:column;align-items:center;border:none;padding-top:.5rem;background-color:transparent;color:var(--bizy-tab-color, #666666);cursor:pointer}.bizy-tab--selected{color:var(--bizy-tab-selected-color, #16aa88)}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-tab__selected-line{display:block;width:100%;height:.2rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-tab-selected-color, #16aa88)}.bizy-tab__selected-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.3s;animation-fill-mode:both}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], selected: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$9 = [
    TabsComponent,
    TabComponent
];
class TabsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TabsModule, declarations: [TabsComponent,
            TabComponent], imports: [CommonModule, FormsModule], exports: [TabsComponent,
            TabComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TabsModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TabsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$9,
                    exports: COMPONENTS$9
                }]
        }] });

class ToolbarComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ToolbarComponent, selector: "bizy-toolbar", ngImport: i0, template: "<div class=\"bizy-toolbar\">\n\n    <span class=\"bizy-toolbar__start\">\n        \n        <ng-content select=\"[slot=start]\"></ng-content>\n\n    </span>\n\n    <span class=\"bizy-toolbar__end\">\n\n        <ng-content select=\"[slot=end]\"></ng-content>\n\n    </span>\n  \n\n</div>\n", styles: [":host{font-size:1rem}.bizy-toolbar{height:var(--bizy-toolbar-height, 3.2rem);width:100%;background-color:var(--bizy-toolbar-background-color, #f3f3f3);display:flex;align-items:center;justify-content:space-between;column-gap:1rem;padding:0 .5rem}.bizy-toolbar__start{display:flex;align-items:center;column-gap:1rem}.bizy-toolbar__end{display:flex;align-items:center;column-gap:1rem;justify-content:flex-end}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toolbar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-toolbar\">\n\n    <span class=\"bizy-toolbar__start\">\n        \n        <ng-content select=\"[slot=start]\"></ng-content>\n\n    </span>\n\n    <span class=\"bizy-toolbar__end\">\n\n        <ng-content select=\"[slot=end]\"></ng-content>\n\n    </span>\n  \n\n</div>\n", styles: [":host{font-size:1rem}.bizy-toolbar{height:var(--bizy-toolbar-height, 3.2rem);width:100%;background-color:var(--bizy-toolbar-background-color, #f3f3f3);display:flex;align-items:center;justify-content:space-between;column-gap:1rem;padding:0 .5rem}.bizy-toolbar__start{display:flex;align-items:center;column-gap:1rem}.bizy-toolbar__end{display:flex;align-items:center;column-gap:1rem;justify-content:flex-end}\n"] }]
        }] });

const COMPONENTS$8 = [
    ToolbarComponent,
];
class ToolbarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToolbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ToolbarModule, declarations: [ToolbarComponent], imports: [CommonModule, FormsModule], exports: [ToolbarComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToolbarModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToolbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$8,
                    exports: COMPONENTS$8
                }]
        }] });

class SidebarComponent {
    opened = false;
    onOpen = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: SidebarComponent, selector: "bizy-sidebar", inputs: { opened: "opened" }, outputs: { onOpen: "onOpen" }, ngImport: i0, template: "<div class=\"bizy-sidebar\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"opened = !opened; onOpen.emit(opened)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"!opened\"/>\n\n  <span class=\"bizy-sidebar__content\">\n\n    <ng-content select=\"[sidebar-header]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\">\n\n    <ng-content select=\"[sidebar-footer]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width, 3rem)}.bizy-sidebar{height:100%;width:-moz-fit-content;width:fit-content;display:flex;flex-direction:column;background-color:var(--bizy-sidebar-background-color, #fff);justify-content:space-between;position:relative;transition:width .3s ease}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height, 2.6rem);min-height:2.6rem;width:var(--bizy-sidebar-tab-width, 1.2rem);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top, .25rem);background-color:var(--bizy-sidebar-tab-background-color, #fff);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color, #666666)}.bizy-sidebar__content{display:flex;width:var(--bizy-sidebar-width, 10rem);flex-direction:column;overflow-x:hidden;transition:width .3s ease}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-sidebar\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"opened = !opened; onOpen.emit(opened)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"!opened\"/>\n\n  <span class=\"bizy-sidebar__content\">\n\n    <ng-content select=\"[sidebar-header]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\">\n\n    <ng-content select=\"[sidebar-footer]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width, 3rem)}.bizy-sidebar{height:100%;width:-moz-fit-content;width:fit-content;display:flex;flex-direction:column;background-color:var(--bizy-sidebar-background-color, #fff);justify-content:space-between;position:relative;transition:width .3s ease}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height, 2.6rem);min-height:2.6rem;width:var(--bizy-sidebar-tab-width, 1.2rem);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top, .25rem);background-color:var(--bizy-sidebar-tab-background-color, #fff);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color, #666666)}.bizy-sidebar__content{display:flex;width:var(--bizy-sidebar-width, 10rem);flex-direction:column;overflow-x:hidden;transition:width .3s ease}\n"] }]
        }], propDecorators: { opened: [{
                type: Input
            }], onOpen: [{
                type: Output
            }] } });

const COMPONENTS$7 = [
    SidebarComponent,
];
class SidebarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: SidebarModule, declarations: [SidebarComponent], imports: [CommonModule, FormsModule], exports: [SidebarComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SidebarModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$7,
                    exports: COMPONENTS$7
                }]
        }] });

// FIX: This components fixes the bug with Angular CDK virtual scrolling not supporting content projection.
// https://github.com/angular/components/issues/15277
class TableScrollingComponent {
    elementRef;
    content;
    #view;
    items$;
    itemTemplate;
    itemSize;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    /** Called by the virtual-for directive inside of the viewport. */
    attachView(tableDirective) {
        if (this.#view) {
            return;
        }
        const fontSize = window
            .getComputedStyle(this.elementRef.nativeElement)
            .getPropertyValue('font-size');
        this.itemSize = (Number(fontSize.split('px')[0]) || 14) * 2;
        this.items$ = tableDirective.items$;
        this.itemTemplate = tableDirective.template;
        this.#view = tableDirective.viewContainerRef;
        this.#view.createEmbeddedView(this.content);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableScrollingComponent, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableScrollingComponent, selector: "bizy-table-scrolling", viewQueries: [{ propertyName: "content", first: true, predicate: ["tableScrollingContent"], descendants: true }], ngImport: i0, template: "<cdk-virtual-scroll-viewport \n    [itemSize]=\"itemSize\"\n    [minBufferPx]=\"itemSize + (itemSize * 20)\"\n    [maxBufferPx]=\"itemSize + (itemSize * 40)\">\n    \n    <ng-content></ng-content>\n\n    <ng-template #tableScrollingContent>\n      <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"items$ | async\">\n        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\"></ng-template>\n      </ng-template>\n    </ng-template>\n</cdk-virtual-scroll-viewport>", styles: ["::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:scroll!important;overflow-x:hidden!important;contain:inline-size!important}\n"], dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableScrollingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-scrolling', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cdk-virtual-scroll-viewport \n    [itemSize]=\"itemSize\"\n    [minBufferPx]=\"itemSize + (itemSize * 20)\"\n    [maxBufferPx]=\"itemSize + (itemSize * 40)\">\n    \n    <ng-content></ng-content>\n\n    <ng-template #tableScrollingContent>\n      <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"items$ | async\">\n        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\"></ng-template>\n      </ng-template>\n    </ng-template>\n</cdk-virtual-scroll-viewport>", styles: ["::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:scroll!important;overflow-x:hidden!important;contain:inline-size!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['tableScrollingContent']
            }] } });

class TableScrollingDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableScrollingDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TableScrollingDirective, selector: "[tableFor]", inputs: { tableForIn: "tableForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableScrollingDirective, decorators: [{
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

class TableColumnArrowsComponent {
    order = null;
    show = false;
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableColumnArrowsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableColumnArrowsComponent, selector: "bizy-table-column-arrows", inputs: { order: "order", show: "show", customClass: "customClass" }, ngImport: i0, template: "<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 448 512\"\n    *ngIf=\"order !== 'asc' && order !== 'desc'\"\n    name=\"bizy-table-column-arrows\"\n    class=\"bizy-table-column-arrows bizy-table-column-arrows__down-up animated fade-in {{customClass}}\">\n    <path d=\"M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z\"/>\n</svg>\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'desc'\"\n    name=\"bizy-table-column-down-arrow\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\">\n    <path d=\"M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z\"/>\n</svg>\n\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'asc'\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\"\n    name=\"bizy-table-column-up-arrow\">\n    <path d=\"M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z\"/>\n</svg>\n", styles: [":host{font-size:1rem}.bizy-table-column-arrows__down-up{transform:rotate(90deg)}.bizy-table-column-arrows{display:none;font-size:1rem;height:1rem;fill:var(--bizy-table-column-arrow-color, #2b94f4)}.bizy-table-column-arrows--visible{display:inline-block}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableColumnArrowsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-column-arrows', changeDetection: ChangeDetectionStrategy.OnPush, template: "<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 448 512\"\n    *ngIf=\"order !== 'asc' && order !== 'desc'\"\n    name=\"bizy-table-column-arrows\"\n    class=\"bizy-table-column-arrows bizy-table-column-arrows__down-up animated fade-in {{customClass}}\">\n    <path d=\"M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z\"/>\n</svg>\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'desc'\"\n    name=\"bizy-table-column-down-arrow\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\">\n    <path d=\"M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z\"/>\n</svg>\n\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'asc'\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\"\n    name=\"bizy-table-column-up-arrow\">\n    <path d=\"M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z\"/>\n</svg>\n", styles: [":host{font-size:1rem}.bizy-table-column-arrows__down-up{transform:rotate(90deg)}.bizy-table-column-arrows{display:none;font-size:1rem;height:1rem;fill:var(--bizy-table-column-arrow-color, #2b94f4)}.bizy-table-column-arrows--visible{display:inline-block}\n"] }]
        }], propDecorators: { order: [{
                type: Input
            }], show: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

class TableColumnComponent {
    id = String(Math.random());
    customClass = '';
    onSelect = new EventEmitter();
    getId = () => {
        return this.id;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableColumnComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableColumnComponent, selector: "bizy-table-column", inputs: { id: "id", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"onSelect.emit()\"\n    (keyup.enter)=\"onSelect.emit()\"\n    class=\"bizy-table-column {{customClass}}\">\n\n    <ng-content></ng-content>\n    \n</button>", styles: [":host{font-size:1rem;flex:1;height:100%;display:flex;-webkit-user-select:text;user-select:text}:host:has(.bizy-table-column-arrows) .bizy-table-column{cursor:pointer!important}.bizy-table-column{font-size:1rem;min-width:var(--bizy-table-column-min-width, 2rem);width:100%;border:none;background-color:transparent;display:flex;align-items:center;column-gap:.3rem;padding-right:.3rem}.bizy-table-column__arrows{height:1rem;fill:var(--bizy-table-column-arrows-color, #2b94f4)}::ng-deep .bizy-table-column *{text-align:start}::ng-deep .bizy-table-column:hover .bizy-table-column-arrows{display:inline-block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableColumnComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-column', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"onSelect.emit()\"\n    (keyup.enter)=\"onSelect.emit()\"\n    class=\"bizy-table-column {{customClass}}\">\n\n    <ng-content></ng-content>\n    \n</button>", styles: [":host{font-size:1rem;flex:1;height:100%;display:flex;-webkit-user-select:text;user-select:text}:host:has(.bizy-table-column-arrows) .bizy-table-column{cursor:pointer!important}.bizy-table-column{font-size:1rem;min-width:var(--bizy-table-column-min-width, 2rem);width:100%;border:none;background-color:transparent;display:flex;align-items:center;column-gap:.3rem;padding-right:.3rem}.bizy-table-column__arrows{height:1rem;fill:var(--bizy-table-column-arrows-color, #2b94f4)}::ng-deep .bizy-table-column *{text-align:start}::ng-deep .bizy-table-column:hover .bizy-table-column-arrows{display:inline-block}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class CheckboxComponent {
    id = String(Math.random());
    name;
    selected = false;
    disabled = false;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _checkboxId = String(Math.random());
    setSelected() {
        if (this.disabled) {
            return;
        }
        this.selected = !this.selected;
        this.selectedChange.emit(this.selected);
        this.onSelect.emit(this.selected);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: CheckboxComponent, selector: "bizy-checkbox", inputs: { id: "id", name: "name", selected: "selected", disabled: "disabled" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<div class=\"bizy-checkbox\">\n    <input \n        class=\"bizy-checkbox__input\"\n        [ngClass]=\"{'bizy-checkbox__input--disabled': disabled}\"\n        id=\"{{id}}\"\n        [disabled]=\"disabled\"\n        type=\"checkbox\"\n        [ngModel]=\"selected\"\n        (ngModelChange)=\"setSelected()\"/>\n    <label class=\"bizy-checkbox__checkbox\" for=\"{{id}}\">\n        <span>\n            <svg width=\"12px\" height=\"10px\">\n            <use attr.xlink:href=\"#{{_checkboxId}}\"></use>\n            </svg>\n        </span>\n    </label>\n    <svg class=\"inline-svg\">\n      <symbol id=\"{{_checkboxId}}\" viewbox=\"0 0 12 10\">\n        <polyline points=\"1.5 6 4.5 9 10.5 1\"></polyline>\n      </symbol>\n    </svg>\n</div>\n", styles: [".bizy-checkbox .bizy-checkbox__checkbox{-webkit-user-select:none;user-select:none;cursor:pointer;padding:.1rem;border-radius:.5rem;overflow:hidden;transition:all .2s ease;display:inline-block}.bizy-checkbox .bizy-checkbox__checkbox:hover{background:var(--bizy-checkbox-hover-color, #16aa8833)}.bizy-checkbox .bizy-checkbox__checkbox span{float:left;vertical-align:middle;transform:translateZ(0)}.bizy-checkbox .bizy-checkbox__checkbox span:first-child{position:relative;width:1.1rem;height:1.1rem;border-radius:.25rem;transform:scale(1);border:.1rem solid var(--bizy-checkbox-border-color, #cccfdb);transition:all .2s ease;box-shadow:0 1px 1px #00104b0d}.bizy-checkbox .bizy-checkbox__checkbox span:first-child svg{position:absolute;top:.2rem;left:.15rem;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1.1rem;stroke-dashoffset:1.1rem;transition:all .3s ease;transition-delay:.1s;transform:translateZ(0)}.bizy-checkbox .bizy-checkbox__checkbox:hover span:first-child{border-color:var(--bizy-checkbox-selected-color, #16aa88)}.bizy-checkbox .bizy-checkbox__input{position:absolute;visibility:hidden}.bizy-checkbox__input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-checkbox .bizy-checkbox__input:checked+.bizy-checkbox__checkbox span:first-child{background-color:var(--bizy-checkbox-selected-color, #16aa88);border-color:var(--bizy-checkbox-selected-color, #16aa88);animation:bizy-checkbox-wave .4s ease}.bizy-checkbox .bizy-checkbox__input:checked+.bizy-checkbox__checkbox span:first-child svg{stroke-dashoffset:0}.bizy-checkbox .inline-svg{position:absolute;width:0;height:0;pointer-events:none;-webkit-user-select:none;user-select:none}@keyframes bizy-checkbox-wave{50%{transform:scale(.9)}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-checkbox', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-checkbox\">\n    <input \n        class=\"bizy-checkbox__input\"\n        [ngClass]=\"{'bizy-checkbox__input--disabled': disabled}\"\n        id=\"{{id}}\"\n        [disabled]=\"disabled\"\n        type=\"checkbox\"\n        [ngModel]=\"selected\"\n        (ngModelChange)=\"setSelected()\"/>\n    <label class=\"bizy-checkbox__checkbox\" for=\"{{id}}\">\n        <span>\n            <svg width=\"12px\" height=\"10px\">\n            <use attr.xlink:href=\"#{{_checkboxId}}\"></use>\n            </svg>\n        </span>\n    </label>\n    <svg class=\"inline-svg\">\n      <symbol id=\"{{_checkboxId}}\" viewbox=\"0 0 12 10\">\n        <polyline points=\"1.5 6 4.5 9 10.5 1\"></polyline>\n      </symbol>\n    </svg>\n</div>\n", styles: [".bizy-checkbox .bizy-checkbox__checkbox{-webkit-user-select:none;user-select:none;cursor:pointer;padding:.1rem;border-radius:.5rem;overflow:hidden;transition:all .2s ease;display:inline-block}.bizy-checkbox .bizy-checkbox__checkbox:hover{background:var(--bizy-checkbox-hover-color, #16aa8833)}.bizy-checkbox .bizy-checkbox__checkbox span{float:left;vertical-align:middle;transform:translateZ(0)}.bizy-checkbox .bizy-checkbox__checkbox span:first-child{position:relative;width:1.1rem;height:1.1rem;border-radius:.25rem;transform:scale(1);border:.1rem solid var(--bizy-checkbox-border-color, #cccfdb);transition:all .2s ease;box-shadow:0 1px 1px #00104b0d}.bizy-checkbox .bizy-checkbox__checkbox span:first-child svg{position:absolute;top:.2rem;left:.15rem;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1.1rem;stroke-dashoffset:1.1rem;transition:all .3s ease;transition-delay:.1s;transform:translateZ(0)}.bizy-checkbox .bizy-checkbox__checkbox:hover span:first-child{border-color:var(--bizy-checkbox-selected-color, #16aa88)}.bizy-checkbox .bizy-checkbox__input{position:absolute;visibility:hidden}.bizy-checkbox__input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-checkbox .bizy-checkbox__input:checked+.bizy-checkbox__checkbox span:first-child{background-color:var(--bizy-checkbox-selected-color, #16aa88);border-color:var(--bizy-checkbox-selected-color, #16aa88);animation:bizy-checkbox-wave .4s ease}.bizy-checkbox .bizy-checkbox__input:checked+.bizy-checkbox__checkbox span:first-child svg{stroke-dashoffset:0}.bizy-checkbox .inline-svg{position:absolute;width:0;height:0;pointer-events:none;-webkit-user-select:none;user-select:none}@keyframes bizy-checkbox-wave{50%{transform:scale(.9)}}\n"] }]
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

class TableRowComponent {
    ref;
    id = String(Math.random());
    customClass = '';
    disabled = false;
    selected = false;
    selectable = null;
    onSelect = new EventEmitter();
    marginRight = 0;
    constructor(ref) {
        this.ref = ref;
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
        this.onSelect.emit(selected);
        this.ref.detectChanges();
    };
    setMarginRight(margin) {
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableRowComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableRowComponent, selector: "bizy-table-row", inputs: { id: "id", customClass: "customClass", disabled: "disabled", selected: "selected", selectable: "selectable" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-row {{customClass}}\"\n    [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <bizy-checkbox \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-row__checkbox\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        (onSelect)=\"onSelect.emit($event)\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem;width:100%;display:flex;min-width:-moz-fit-content;min-width:fit-content}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:-moz-fit-content;height:fit-content;min-height:var(--bizy-table-row-height, 2rem);background-color:var(--bizy-table-row-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color, #2484C6)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color, #ffffff)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height, 2rem);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-row {{customClass}}\"\n    [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <bizy-checkbox \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-row__checkbox\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        (onSelect)=\"onSelect.emit($event)\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem;width:100%;display:flex;min-width:-moz-fit-content;min-width:fit-content}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:-moz-fit-content;height:fit-content;min-height:var(--bizy-table-row-height, 2rem);background-color:var(--bizy-table-row-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color, #2484C6)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color, #ffffff)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height, 2rem);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"] }]
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
            }], selectable: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class TableFooterComponent {
    ref;
    id = String(Math.random());
    customClass = '';
    marginRight = 0;
    _selectable = false;
    constructor(ref) {
        this.ref = ref;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableFooterComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableFooterComponent, selector: "bizy-table-footer", inputs: { id: "id", customClass: "customClass" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height, 2.4rem);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width, 100%);background-color:var(--bizy-table-header-background-color, #ffffff);border-top:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-footer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height, 2.4rem);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width, 100%);background-color:var(--bizy-table-header-background-color, #ffffff);border-top:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

class TableHeaderComponent {
    ref;
    id = String(Math.random());
    customClass = '';
    selected = false;
    selectable = null;
    onSelect = new EventEmitter();
    marginRight = 0;
    constructor(ref) {
        this.ref = ref;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableHeaderComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableHeaderComponent, selector: "bizy-table-header", inputs: { id: "id", customClass: "customClass", selected: "selected", selectable: "selectable" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height, 2.4rem);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width, 100%);background-color:var(--bizy-table-header-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height, 2.4rem);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width, 100%);background-color:var(--bizy-table-header-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectable: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class TableComponent {
    ref;
    document;
    elementRef;
    viewport;
    virtualFor;
    header;
    rows;
    footer;
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
    constructor(ref, document, elementRef) {
        this.ref = ref;
        this.document = document;
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        this.#rowScrollingMutationObserver = new MutationObserver(() => {
            if (!this.virtualFor) {
                return;
            }
            this.viewport.attachView(this.virtualFor);
            this.#rowScrollingMutationObserver.disconnect();
            this.ref.detectChanges();
            this.#afterContentInitObserver = new MutationObserver(() => {
                if (!this.elementRef.nativeElement.offsetWidth) {
                    return;
                }
                this.marginRight = (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft;
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
                    this.marginRight = (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft;
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
        this.#resizeObserver.observe(this.elementRef.nativeElement);
        this.#subscription.add(this.notifier$.pipe(skip$1(1), debounceTime$1(100)).subscribe(() => {
            this.marginRight = (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableComponent, selector: "bizy-table", inputs: { selectable: "selectable" }, queries: [{ propertyName: "virtualFor", first: true, predicate: TableScrollingDirective, descendants: true }, { propertyName: "header", first: true, predicate: TableHeaderComponent, descendants: true }, { propertyName: "footer", first: true, predicate: TableFooterComponent, descendants: true }, { propertyName: "rows", predicate: TableRowComponent }], viewQueries: [{ propertyName: "viewport", first: true, predicate: TableScrollingComponent, descendants: true }], ngImport: i0, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%;overflow-x:scroll;overflow-y:hidden}.bizy-table{width:100%;min-width:-moz-fit-content;min-width:fit-content;height:100%;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip}.bizy-table__rows{display:flex;flex-direction:column;height:var(--bizy-table-height, 30rem);width:var(--bizy-table-width, 100%);min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"], dependencies: [{ kind: "component", type: TableScrollingComponent, selector: "bizy-table-scrolling" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%;overflow-x:scroll;overflow-y:hidden}.bizy-table{width:100%;min-width:-moz-fit-content;min-width:fit-content;height:100%;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip}.bizy-table__rows{display:flex;flex-direction:column;height:var(--bizy-table-height, 30rem);width:var(--bizy-table-width, 100%);min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { viewport: [{
                type: ViewChild,
                args: [TableScrollingComponent]
            }], virtualFor: [{
                type: ContentChild,
                args: [TableScrollingDirective]
            }], header: [{
                type: ContentChild,
                args: [TableHeaderComponent]
            }], rows: [{
                type: ContentChildren,
                args: [TableRowComponent]
            }], footer: [{
                type: ContentChild,
                args: [TableFooterComponent]
            }], selectable: [{
                type: Input
            }] } });

const COMPONENTS$6 = [
    CheckboxComponent,
];
class CheckboxModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: CheckboxModule, declarations: [CheckboxComponent], imports: [CommonModule, FormsModule], exports: [CheckboxComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CheckboxModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$6,
                    exports: COMPONENTS$6
                }]
        }] });

const COMPONENTS$5 = [
    TableComponent,
    TableHeaderComponent,
    TableFooterComponent,
    TableRowComponent,
    TableColumnComponent,
    TableColumnArrowsComponent,
    TableScrollingDirective,
    TableScrollingComponent
];
class TableModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TableModule, declarations: [TableComponent,
            TableHeaderComponent,
            TableFooterComponent,
            TableRowComponent,
            TableColumnComponent,
            TableColumnArrowsComponent,
            TableScrollingDirective,
            TableScrollingComponent], imports: [CommonModule, FormsModule, ScrollingModule, CheckboxModule], exports: [TableComponent,
            TableHeaderComponent,
            TableFooterComponent,
            TableRowComponent,
            TableColumnComponent,
            TableColumnArrowsComponent,
            TableScrollingDirective,
            TableScrollingComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableModule, imports: [CommonModule, FormsModule, ScrollingModule, CheckboxModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ScrollingModule, CheckboxModule],
                    declarations: COMPONENTS$5,
                    exports: COMPONENTS$5
                }]
        }] });

class MenuOptionComponent {
    id = String(Math.random());
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: MenuOptionComponent, selector: "bizy-menu-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-menu-option--selected': selected, 'bizy-menu-option--disabled': disabled}\"\n    class=\"bizy-menu-option {{customClass}}\">\n\n    <span class=\"bizy-menu-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<span class=\"bizy-menu-option__menu\">\n    <ng-content select=\"bizy-menu\"></ng-content>\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu-option__menu:not(:empty)) .bizy-menu-option{display:none!important}.bizy-menu-option{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-menu-option-color, #000);cursor:pointer}.bizy-menu-option--selected{color:var(--bizy-menu-option-selected-color, #fff)!important;background-color:var(--bizy-menu-option-selected-background-color, #2b94f4)!important}.bizy-menu-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-menu-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem}::ng-deep .bizy-menu-option__menu *{color:var(--bizy-menu-option-color, #000);fill:var(--bizy-menu-option-color, #000)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-menu-option--selected': selected, 'bizy-menu-option--disabled': disabled}\"\n    class=\"bizy-menu-option {{customClass}}\">\n\n    <span class=\"bizy-menu-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<span class=\"bizy-menu-option__menu\">\n    <ng-content select=\"bizy-menu\"></ng-content>\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu-option__menu:not(:empty)) .bizy-menu-option{display:none!important}.bizy-menu-option{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-menu-option-color, #000);cursor:pointer}.bizy-menu-option--selected{color:var(--bizy-menu-option-selected-color, #fff)!important;background-color:var(--bizy-menu-option-selected-background-color, #2b94f4)!important}.bizy-menu-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-menu-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem}::ng-deep .bizy-menu-option__menu *{color:var(--bizy-menu-option-color, #000);fill:var(--bizy-menu-option-color, #000)}\n"] }]
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

class MenuComponent {
    ref;
    options;
    id = String(Math.random());
    disabled = false;
    customClass = '';
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
        this.selectButton(event);
        this.onSelect.emit(event);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: MenuComponent, selector: "bizy-menu", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: MenuOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\">\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem;color:var(--bizy-menu-color, #fff);fill:var(--bizy-menu-color, #fff)}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;color:inherit;padding:.5rem;cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:inherit}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color, #fff);min-width:100%;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$3.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$3.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\">\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem;color:var(--bizy-menu-color, #fff);fill:var(--bizy-menu-color, #fff)}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;color:inherit;padding:.5rem;cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:inherit}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color, #fff);min-width:100%;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [MenuOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$4 = [
    MenuComponent,
    MenuOptionComponent
];
class MenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: MenuModule, declarations: [MenuComponent,
            MenuOptionComponent], imports: [CommonModule, FormsModule, OverlayModule], exports: [MenuComponent,
            MenuOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuModule, imports: [CommonModule, FormsModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule],
                    declarations: COMPONENTS$4,
                    exports: COMPONENTS$4
                }]
        }] });

class FilterSectionCheckboxOptionComponent {
    ref;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    selected = true;
    onSelect = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect() {
        if (this.disabled) {
            return;
        }
        this.setSelect(!this.selected);
    }
    setSelect(selected) {
        this.selected = selected;
        this.onSelect.emit({ id: this.id, selected: this.selected });
        this.ref.detectChanges();
    }
    getSelected() {
        return this.selected;
    }
    getId() {
        return this.id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionCheckboxOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FilterSectionCheckboxOptionComponent, selector: "bizy-filter-section-checkbox-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        [selected]=\"selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}\n"], dependencies: [{ kind: "component", type: CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionCheckboxOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-checkbox-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        [selected]=\"selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}\n"] }]
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

class SliderComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: SliderComponent, selector: "bizy-slider", inputs: { minLimit: "minLimit", maxLimit: "maxLimit", min: "min", max: "max" }, outputs: { onChange: "onChange" }, viewQueries: [{ propertyName: "fromSlider", first: true, predicate: ["fromSlider"], descendants: true }, { propertyName: "toSlider", first: true, predicate: ["toSlider"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem;--bizy-slider-color: #666666;--bizy-slider-range-color: #16aa88;--bizy-slider-accent-color: #2484C6}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:#fff;border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:#fff;border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"], dependencies: [{ kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$2.RangeValueAccessor, selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]" }, { kind: "directive", type: i2$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-slider', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem;--bizy-slider-color: #666666;--bizy-slider-range-color: #16aa88;--bizy-slider-accent-color: #2484C6}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:#fff;border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:#fff;border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"] }]
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

class FilterSectionRangeOptionComponent {
    fb;
    id = String(Math.random());
    disabled = false;
    minLabel = 'Min';
    maxLabel = 'Max';
    customClass = '';
    onChange = new EventEmitter();
    _minLimit;
    _maxLimit;
    ngAfterViewInit() {
        if (this._minLimit) {
            this.minValue.setValue(this._minLimit);
        }
        if (this._maxLimit) {
            this.maxValue.setValue(this._maxLimit);
        }
    }
    set min(min) {
        if (typeof min === 'undefined' || min === null) {
            this.minValue.setValue('');
            return;
        }
        this.minValue.setValue(min);
    }
    ;
    set max(max) {
        if (typeof max === 'undefined' || max === null) {
            this.maxValue.setValue('');
            return;
        }
        this.maxValue.setValue(max);
    }
    ;
    set minLimit(min) {
        if (typeof min === 'undefined' || min === null) {
            return;
        }
        this._minLimit = min;
        this.minValue.setValue(min);
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
        this.maxValue.setValue(max);
        if (typeof this._minLimit === 'undefined' || this._minLimit === null) {
            this.maxValue.setValidators([Validators.max(max)]);
        }
        else {
            this.maxValue.setValidators([Validators.min(this._minLimit), Validators.max(max)]);
        }
    }
    ;
    form;
    #subscription = new Subscription();
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({
            minValue: [null],
            maxValue: [null]
        });
        this.#subscription.add(this.minValue.valueChanges.pipe(debounceTime$1(300)).subscribe(_value => {
            const min = _value === '' ? null : Number(_value);
            if (typeof this._minLimit !== 'undefined' && this._minLimit !== null && min && min < this._minLimit) {
                this.minValue.setValue(this._minLimit);
                return;
            }
            const max = this.maxValue.value === null || this.maxValue.value === '' ? null : Number(this.maxValue.value);
            if (min !== null && max !== null && max < min) {
                return;
            }
            this.onChange.emit({ min, max });
        }));
        this.#subscription.add(this.maxValue.valueChanges.pipe(debounceTime$1(300)).subscribe(_value => {
            const max = _value === '' ? null : Number(_value);
            if (typeof this._maxLimit !== 'undefined' && this._maxLimit !== null && max && max > this._maxLimit) {
                this.maxValue.setValue(this._maxLimit);
                return;
            }
            const min = this.minValue.value === null || this.minValue.value === '' ? null : Number(this.minValue.value);
            if (min !== null && max !== null && max < min) {
                return;
            }
            this.onChange.emit({ min, max });
        }));
    }
    get minValue() {
        return this.form.get('minValue');
    }
    get maxValue() {
        return this.form.get('maxValue');
    }
    onClear() {
        this.minValue.setValue(this._minLimit);
        this.maxValue.setValue(this._maxLimit);
    }
    getId() {
        return this.id;
    }
    getSelected() {
        return this.minValue.value === this._minLimit && this.maxValue.value === this._maxLimit;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionRangeOptionComponent, deps: [{ token: FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FilterSectionRangeOptionComponent, selector: "bizy-filter-section-range-option", inputs: { id: "id", disabled: "disabled", minLabel: "minLabel", maxLabel: "maxLabel", customClass: "customClass", min: "min", max: "max", minLimit: "minLimit", maxLimit: "maxLimit" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            [title]=\"minLabel\"\n            type=\"number\"\n            [control]=\"minValue\">\n        </bizy-input>\n\n        <bizy-input\n            [title]=\"maxLabel\"\n            type=\"number\"\n            [control]=\"maxValue\">\n        </bizy-input>\n\n    </span>\n\n    <bizy-slider \n        [min]=\"minValue.value\"\n        [minLimit]=\"_minLimit\"\n        [maxLimit]=\"_maxLimit\"\n        [max]=\"maxValue.value\"\n        (onChange)=\"minValue.setValue($event.min); maxValue.setValue($event.max)\">\n    </bizy-slider>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}\n"], dependencies: [{ kind: "component", type: InputComponent, selector: "bizy-input", inputs: ["id", "disabled", "readonly", "multiple", "clear", "autoFocus", "autoCapitalize", "autoCorrect", "browserAutoComplete", "type", "label", "max", "maxLength", "min", "minLength", "control", "placeholder", "cancelLabel", "confirmLabel", "customClass"], outputs: ["onFocus", "enter", "onBlur"] }, { kind: "component", type: SliderComponent, selector: "bizy-slider", inputs: ["minLimit", "maxLimit", "min", "max"], outputs: ["onChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionRangeOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-range-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            [title]=\"minLabel\"\n            type=\"number\"\n            [control]=\"minValue\">\n        </bizy-input>\n\n        <bizy-input\n            [title]=\"maxLabel\"\n            type=\"number\"\n            [control]=\"maxValue\">\n        </bizy-input>\n\n    </span>\n\n    <bizy-slider \n        [min]=\"minValue.value\"\n        [minLimit]=\"_minLimit\"\n        [maxLimit]=\"_maxLimit\"\n        [max]=\"maxValue.value\"\n        (onChange)=\"minValue.setValue($event.min); maxValue.setValue($event.max)\">\n    </bizy-slider>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i2$2.FormBuilder, decorators: [{
                    type: Inject,
                    args: [FormBuilder]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], minLabel: [{
                type: Input
            }], maxLabel: [{
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

class FilterPipe {
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
                return _state === state.id;
            });
            output = output.concat(res);
        });
        return output;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, name: "bizyFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyFilter'
                }]
        }] });

class RangeFilterPipe {
    transform(items, property, range) {
        if (!items || items.length === 0) {
            return [];
        }
        if (!property || !range) {
            return items;
        }
        const min = range.min ?? null;
        const max = range.max ?? null;
        const output = items.filter(_item => {
            let _value = _item;
            const nestedProperty = property.split('.');
            nestedProperty.forEach(_property => {
                _value = _value[_property];
            });
            if (isNaN(_value)) {
                return false;
            }
            return (min === null || _value >= min) && (max === null || _value <= max);
        });
        return output;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RangeFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: RangeFilterPipe, name: "bizyRangeFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RangeFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyRangeFilter'
                }]
        }] });

class FilterSectionComponent {
    document;
    checkboxOptions;
    rangeOption;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    selected = true;
    onSelect = new EventEmitter();
    onRange = new EventEmitter();
    #subscription = new Subscription();
    _options = [];
    constructor(document) {
        this.document = document;
    }
    ngAfterViewInit() {
        const mutationObserver = new MutationObserver(() => {
            if (this.checkboxOptions && this.checkboxOptions.length > 0) {
                this.checkboxOptions.forEach(_option => {
                    this._options.push({ id: _option.getId(), selected: _option.getSelected() });
                });
                const selectedOptions = this._options.filter(_option => _option.selected === true);
                this.selected = selectedOptions.length === this._options.length;
                this.checkboxOptions.forEach(_option => {
                    this.#subscription.add(_option.onSelect.subscribe(data => {
                        const index = this._options.findIndex(_option => _option.id === data.id);
                        if (index !== -1) {
                            this._options[index] = data;
                        }
                        else {
                            this._options.push(data);
                        }
                        const selectedOptions = this._options.filter(_option => _option.selected === true);
                        this.selected = selectedOptions.length === this._options.length;
                        this.onSelect.emit(this._options);
                    }));
                });
                mutationObserver.disconnect();
            }
            else if (this.rangeOption) {
                this.#subscription.add(this.rangeOption.onChange.subscribe(data => {
                    this.selected = this.rangeOption.getSelected();
                    this.onRange.emit(data);
                }));
                mutationObserver.disconnect();
            }
        });
        mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onSelect() {
        if (this.disabled || this.rangeOption) {
            return;
        }
        this.selected = !this.selected;
        this._options = this._options.map(_option => {
            return { ..._option, selected: this.selected };
        });
        this.checkboxOptions.forEach(_option => {
            _option.setSelect(this.selected);
        });
    }
    onClear() {
        if (!this.rangeOption) {
            return;
        }
        this.rangeOption.onClear();
    }
    getSelected() {
        return this.selected;
    }
    getId() {
        return this.id;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionComponent, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FilterSectionComponent, selector: "bizy-filter-section", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect", onRange: "onRange" }, queries: [{ propertyName: "rangeOption", first: true, predicate: FilterSectionRangeOptionComponent, descendants: true }, { propertyName: "checkboxOptions", predicate: FilterSectionCheckboxOptionComponent }], ngImport: i0, template: "<div class=\"bizy-filter-section {{customClass}}\" id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section__header\">\n\n        <ng-content select=\"[filter-section-title]\"></ng-content>\n        <ng-content></ng-content>\n\n        <bizy-checkbox \n            class=\"bizy-filter-section__header__checkbox\"\n            (onSelect)=\"_onSelect()\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n\n        <button \n            type=\"button\"\n            class=\"bizy-filter-section__header__clear-button\"\n            (click)=\"onClear()\"\n            (keyup.enter)=\"onClear()\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"bizy-filter-section__header__clear-icon\">\n                <path d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\"/>\n            </svg>\n        </button>\n        \n    </span>\n\n    <span class=\"bizy-filter-section__options\">\n\n        <ng-content select=\"bizy-filter-section-checkbox-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-range-option\"></ng-content>\n        \n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__options{overflow-y:hidden!important}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.9rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;border:none;background-color:transparent;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;row-gap:.7rem;min-height:6rem;max-height:20rem;overflow-y:scroll;overflow-x:hidden}.bizy-filter-section__header__clear-button{width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;border:none;background-color:transparent;cursor:pointer}.bizy-filter-section__header__clear-icon{fill:var(--bizy-filter-section-clear-color, #e76565);pointer-events:none;height:1rem}\n"], dependencies: [{ kind: "component", type: CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-filter-section {{customClass}}\" id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section__header\">\n\n        <ng-content select=\"[filter-section-title]\"></ng-content>\n        <ng-content></ng-content>\n\n        <bizy-checkbox \n            class=\"bizy-filter-section__header__checkbox\"\n            (onSelect)=\"_onSelect()\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n\n        <button \n            type=\"button\"\n            class=\"bizy-filter-section__header__clear-button\"\n            (click)=\"onClear()\"\n            (keyup.enter)=\"onClear()\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"bizy-filter-section__header__clear-icon\">\n                <path d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\"/>\n            </svg>\n        </button>\n        \n    </span>\n\n    <span class=\"bizy-filter-section__options\">\n\n        <ng-content select=\"bizy-filter-section-checkbox-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-range-option\"></ng-content>\n        \n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__options{overflow-y:hidden!important}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.9rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;border:none;background-color:transparent;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;row-gap:.7rem;min-height:6rem;max-height:20rem;overflow-y:scroll;overflow-x:hidden}.bizy-filter-section__header__clear-button{width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;border:none;background-color:transparent;cursor:pointer}.bizy-filter-section__header__clear-icon{fill:var(--bizy-filter-section-clear-color, #e76565);pointer-events:none;height:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { checkboxOptions: [{
                type: ContentChildren,
                args: [FilterSectionCheckboxOptionComponent]
            }], rangeOption: [{
                type: ContentChild,
                args: [FilterSectionRangeOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], onRange: [{
                type: Output
            }] } });

class FilterComponent {
    document;
    ref;
    sections;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    opened = false;
    onOpen = new EventEmitter();
    _filterWidth;
    _sections = [];
    _activated = false;
    #subscription = new Subscription();
    constructor(document, ref) {
        this.document = document;
        this.ref = ref;
    }
    ngAfterViewInit() {
        if (this.sections && this.sections.length > 0) {
            this.sections.forEach(_section => {
                this._sections.push({ id: _section.getId(), selected: _section.getSelected() });
            });
            const selectedSections = this._sections.filter(_section => _section.selected === true);
            this._activated = selectedSections.length !== this._sections.length;
            this.#listenSectionChanges();
        }
        else {
            const mutationObserver = new MutationObserver(() => {
                if (this.sections && this.sections.length > 0) {
                    this.sections.forEach(_section => {
                        this._sections.push({ id: _section.getId(), selected: _section.getSelected() });
                    });
                    const selectedSections = this._sections.filter(_section => _section.selected === true);
                    this._activated = selectedSections.length !== this._sections.length;
                    this.#listenSectionChanges();
                    mutationObserver.disconnect();
                }
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        }
    }
    _onOpen(event) {
        if (this.disabled) {
            return;
        }
        this.opened = !this.opened;
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._filterWidth = event.srcElement.offsetWidth;
        }
        this.onOpen.emit(event);
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this.opened = false;
        this.ref.detectChanges();
    };
    #listenSectionChanges = () => {
        if (!this.sections) {
            return;
        }
        this.sections.forEach(_section => {
            this.#subscription.add(_section.onSelect.subscribe(() => {
                const index = this._sections.findIndex(__section => __section.id === _section.id);
                if (index !== -1) {
                    this._sections[index] = { id: _section.getId(), selected: _section.getSelected() };
                }
                else {
                    this._sections.push({ id: _section.getId(), selected: _section.getSelected() });
                }
                const selectedSections = this._sections.filter(_section => _section.selected === true);
                this._activated = selectedSections.length !== this._sections.length;
                this.ref.detectChanges();
            }));
            this.#subscription.add(_section.onRange.subscribe(() => {
                const index = this._sections.findIndex(__section => __section.id === _section.id);
                if (index !== -1) {
                    this._sections[index] = { id: _section.getId(), selected: _section.getSelected() };
                }
                else {
                    this._sections.push({ id: _section.getId(), selected: _section.getSelected() });
                }
                const selectedOptions = this._sections.filter(_section => _section.selected === true);
                this._activated = selectedOptions.length !== this._sections.length;
                this.ref.detectChanges();
            }));
        });
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterComponent, deps: [{ token: DOCUMENT }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FilterComponent, selector: "bizy-filter", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen" }, queries: [{ propertyName: "sections", predicate: FilterSectionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections\">\n\n        <ng-content select=\"bizy-filter-section\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding, 0);color:var(--bizy-filter-color, #fff);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color, #e76565);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections{max-width:75vw;background-color:var(--bizy-filter-background-color, #fff);min-width:100%;display:flex;column-gap:1.2rem;flex-wrap:wrap;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$3.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$3.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections\">\n\n        <ng-content select=\"bizy-filter-section\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding, 0);color:var(--bizy-filter-color, #fff);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color, #e76565);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections{max-width:75vw;background-color:var(--bizy-filter-background-color, #fff);min-width:100%;display:flex;column-gap:1.2rem;flex-wrap:wrap;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { sections: [{
                type: ContentChildren,
                args: [FilterSectionComponent]
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
            }] } });

const COMPONENTS$3 = [
    SliderComponent,
];
class SliderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: SliderModule, declarations: [SliderComponent], imports: [CommonModule, FormsModule], exports: [SliderComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SliderModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$3,
                    exports: COMPONENTS$3
                }]
        }] });

const COMPONENTS$2 = [
    FilterComponent,
    FilterSectionComponent,
    FilterSectionCheckboxOptionComponent,
    FilterSectionRangeOptionComponent,
    FilterPipe,
    RangeFilterPipe,
];
class FilterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, declarations: [FilterComponent,
            FilterSectionComponent,
            FilterSectionCheckboxOptionComponent,
            FilterSectionRangeOptionComponent,
            FilterPipe,
            RangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule, InputModule, SliderModule], exports: [FilterComponent,
            FilterSectionComponent,
            FilterSectionCheckboxOptionComponent,
            FilterSectionRangeOptionComponent,
            FilterPipe,
            RangeFilterPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, providers: [FilterPipe, RangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule, InputModule, SliderModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule, InputModule, SliderModule],
                    declarations: COMPONENTS$2,
                    exports: COMPONENTS$2,
                    providers: [FilterPipe, RangeFilterPipe]
                }]
        }] });

class SelectOptionComponent {
    elementRef;
    ref;
    key;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    constructor(elementRef, ref) {
        this.elementRef = elementRef;
        this.ref = ref;
    }
    _onSelect() {
        if (this.disabled) {
            return;
        }
        this.selected = true;
        this.onSelect.emit();
        this.ref.detectChanges();
    }
    setSelected = (selected) => {
        this.selected = selected;
        this.ref.detectChanges();
    };
    getKey = () => {
        return this.key;
    };
    getId = () => {
        return this.id;
    };
    getValue = () => {
        const value = this.elementRef?.nativeElement?.firstChild?.children[0]?.innerText;
        return value ?? '';
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectOptionComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: SelectOptionComponent, selector: "bizy-select-option", inputs: { key: "key", id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': selected, 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}:host:has(>.bizy-select-option__select:not(:empty)) .bizy-select-option{display:none!important}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color, #fff);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color, #000);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color, #2b94f444)}.bizy-select-option--selected{color:var(--bizy-select-option-selected-color, #fff);background-color:var(--bizy-select-option-selected-background-color, #2b94f4)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': selected, 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}:host:has(>.bizy-select-option__select:not(:empty)) .bizy-select-option{display:none!important}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color, #fff);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color, #000);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color, #2b94f444)}.bizy-select-option--selected{color:var(--bizy-select-option-selected-color, #fff);background-color:var(--bizy-select-option-selected-background-color, #2b94f4)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { key: [{
                type: Input
            }], id: [{
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

class SelectComponent {
    ref;
    document;
    options;
    id = String(Math.random());
    disabled = false;
    label = '';
    customClass = '';
    opened = false;
    onSelect = new EventEmitter();
    valueChange = new EventEmitter();
    onOpen = new EventEmitter();
    set value(value) {
        if (typeof value === 'undefined' || value === null) {
            return;
        }
        this._value = value;
        this._optionValue = '';
        if (this.options && this.options.length > 0) {
            this.options.forEach(_option => {
                if (_option.getKey() === value) {
                    _option.setSelected(true);
                    this._optionValue = _option.getValue();
                }
                else {
                    _option.setSelected(false);
                }
            });
        }
        this.ref.detectChanges();
    }
    _selectWidth;
    _value;
    _optionValue = '';
    #options = [];
    #subscription = new Subscription();
    #mutationObserver;
    constructor(ref, document) {
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (!this.options || (this.#options.length === 0 && this.options.length === 0)) {
                return;
            }
            if (this.#optionsAreEqual(this.#options, this.options.toArray())) {
                return;
            }
            this.#options = this.options.toArray();
            this._optionValue = '';
            if (this._value) {
                this.options.forEach(_option => {
                    if (_option.getKey() === this._value) {
                        _option.setSelected(true);
                        this._optionValue = _option.getValue();
                    }
                    else {
                        _option.setSelected(false);
                    }
                });
            }
            this.ref.detectChanges();
            this.#listenOptionChanges();
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onOpen(event) {
        if (this.disabled) {
            return;
        }
        this.opened = !this.opened;
        this.onOpen.emit(event);
        if (!this.opened) {
            return;
        }
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._selectWidth = event.srcElement.offsetWidth;
        }
        this.ref.detectChanges();
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this.opened = false;
        this.ref.detectChanges();
    };
    #listenOptionChanges = () => {
        if (!this.options) {
            return;
        }
        this.options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(() => {
                this.options.forEach(__option => {
                    if (__option.getId() !== _option.getId()) {
                        __option.setSelected(false);
                    }
                });
                this._optionValue = _option.getValue();
                this.valueChange.emit(_option.getKey());
                this.onSelect.emit(_option.getKey());
                this.close(null);
                this.ref.detectChanges();
            }));
        });
    };
    #optionsAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort((a, b) => a.id.localeCompare(b.id));
        arr2.sort((a, b) => a.id.localeCompare(b.id));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: SelectComponent, selector: "bizy-select", inputs: { id: "id", disabled: "disabled", label: "label", customClass: "customClass", opened: "opened", value: "value" }, outputs: { onSelect: "onSelect", valueChange: "valueChange", onOpen: "onOpen" }, queries: [{ propertyName: "options", predicate: SelectOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-select {{customClass}}\"\n    [ngClass]=\"{'bizy-select--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-select__content\">\n        <h5 class=\"bizy-select__content__label\" *ngIf=\"label\">{{label}}</h5>\n        <span>{{_optionValue}}</span>\n    </span>\n\n    <svg \n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        id=\"bizy-select-arrow\"\n        version=\"1.1\"\n        viewBox=\"0 0 512 512\"\n        xml:space=\"preserve\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <path d=\"M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z\"/>\n    </svg>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_selectWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-search-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-select-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem;color:var(--bizy-select-color, #000);fill:var(--bizy-select-color, #000)}.bizy-select{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color, #fff);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;color:inherit;padding:.25rem .5rem 0;cursor:pointer;min-height:3.3rem;border-top-left-radius:.3rem;border-top-right-radius:.3rem;border-bottom:.1rem solid var(--bizy-select-border-color, #000)}.bizy-select--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-select__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:inherit}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__content{font-size:1rem;background-color:transparent;display:flex;flex-direction:column;align-items:flex-start;row-gap:.5rem;pointer-events:none;align-self:flex-start;text-align:start}.bizy-select__content__label{color:var(--bizy-select-label-color, #000)}.bizy-select__hidden-options{visibility:hidden;height:0;width:0;display:block;pointer-events:none}.bizy-select__options{background-color:var(--bizy-select-background-color, #fff);display:flex;min-width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:20rem;overflow-y:scroll;position:relative;max-width:min(75%,25rem)}.bizy-select__options__search{position:sticky;z-index:1;top:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$3.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$3.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-select {{customClass}}\"\n    [ngClass]=\"{'bizy-select--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-select__content\">\n        <h5 class=\"bizy-select__content__label\" *ngIf=\"label\">{{label}}</h5>\n        <span>{{_optionValue}}</span>\n    </span>\n\n    <svg \n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        id=\"bizy-select-arrow\"\n        version=\"1.1\"\n        viewBox=\"0 0 512 512\"\n        xml:space=\"preserve\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <path d=\"M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z\"/>\n    </svg>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_selectWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-search-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-select-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem;color:var(--bizy-select-color, #000);fill:var(--bizy-select-color, #000)}.bizy-select{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color, #fff);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;color:inherit;padding:.25rem .5rem 0;cursor:pointer;min-height:3.3rem;border-top-left-radius:.3rem;border-top-right-radius:.3rem;border-bottom:.1rem solid var(--bizy-select-border-color, #000)}.bizy-select--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-select__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:inherit}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__content{font-size:1rem;background-color:transparent;display:flex;flex-direction:column;align-items:flex-start;row-gap:.5rem;pointer-events:none;align-self:flex-start;text-align:start}.bizy-select__content__label{color:var(--bizy-select-label-color, #000)}.bizy-select__hidden-options{visibility:hidden;height:0;width:0;display:block;pointer-events:none}.bizy-select__options{background-color:var(--bizy-select-background-color, #fff);display:flex;min-width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:20rem;overflow-y:scroll;position:relative;max-width:min(75%,25rem)}.bizy-select__options__search{position:sticky;z-index:1;top:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [SelectOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], label: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], valueChange: [{
                type: Output
            }], onOpen: [{
                type: Output
            }], value: [{
                type: Input
            }] } });

const COMPONENTS$1 = [
    SelectComponent,
    SelectOptionComponent
];
class SelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: SelectModule, declarations: [SelectComponent,
            SelectOptionComponent], imports: [CommonModule, FormsModule, OverlayModule], exports: [SelectComponent,
            SelectOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectModule, imports: [CommonModule, FormsModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule],
                    declarations: COMPONENTS$1,
                    exports: COMPONENTS$1
                }]
        }] });

class LineChartComponent {
    renderer;
    elementRef;
    document;
    decimalPipe;
    saveAsImageButtonLabel = 'Descargar';
    xLabelPrefix = '';
    xLabelSuffix = '';
    yLabelPrefix = '';
    yLabelSuffix = '';
    labelsX = [];
    height;
    width;
    tooltip = true;
    chartContainer = null;
    set data(data) {
        if (data && data.length > 0) {
            this.#setChartData(data);
        }
    }
    constructor(renderer, elementRef, document, decimalPipe) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.document = document;
        this.decimalPipe = decimalPipe;
    }
    async #setChartData(data) {
        let size = { width: this.width, height: this.height };
        if (!this.width || !this.height) {
            size = await this.#getChartSize();
        }
        if (!this.chartContainer) {
            this.chartContainer = this.renderer.createElement('div');
            this.renderer.setStyle(this.chartContainer, 'width', `${size.width}px`);
            this.renderer.setStyle(this.chartContainer, 'height', `${size.height}px`);
            this.renderer.appendChild(this.elementRef.nativeElement, this.chartContainer);
        }
        const color = [];
        const _data = [];
        const legendData = [];
        data.forEach(_d => {
            if (_d.color) {
                color.push(_d.color);
            }
            legendData.push(_d.name);
            _data.push({
                type: 'line',
                id: _d.id ?? String(Math.random()),
                name: _d.name,
                smooth: true,
                data: !_d.values || _d.values.length === 0 ? [0] : _d.values
            });
        });
        const option = {
            tooltip: {
                show: this.tooltip,
                trigger: 'axis',
                appendToBody: true,
                formatter: this.#tooltipFormatter
            },
            legend: {
                y: 'bottom',
                padding: [0, 0, 0, 0],
                data: legendData
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true,
                        title: this.saveAsImageButtonLabel
                    }
                },
                iconStyle: {
                    emphasis: {
                        textAlign: 'right'
                    }
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.labelsX,
                    axisLabel: {
                        formatter: `${this.xLabelPrefix}{value}${this.xLabelSuffix}`,
                        fontSize: 10,
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: `${this.yLabelPrefix}{value}${this.yLabelSuffix}`,
                        fontSize: 10
                    }
                }
            ],
            series: _data
        };
        option.grid = {
            bottom: `${Math.max(legendData.length * 2.4, 10)}%`,
            containLabel: true,
            left: '3%',
            right: '3%'
        };
        if (color.length > 0) {
            option.color = color;
        }
        if ((legendData.length / 18) > 1) {
            this.renderer.setStyle(this.chartContainer, 'height', `${this.height * (legendData.length / 18)}px`);
        }
        echarts.init(this.chartContainer).setOption(option);
    }
    #tooltipFormatter = (params) => {
        let tooltip = `${params[0].name}`;
        const lineParam = params.filter(_param => _param.componentSubType === 'line');
        lineParam.forEach(_param => {
            const line = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">-</span>`;
            tooltip += `<br/>${line} ${_param.seriesName} : ${this.yLabelPrefix}${this.decimalPipe.transform(_param.value, '1.2-2')}${this.yLabelSuffix}`;
        });
        return tooltip;
    };
    #getChartSize() {
        return new Promise(resolve => {
            const mutationObserver = new MutationObserver(() => {
                const parentRef = this.renderer.parentNode(this.elementRef.nativeElement);
                if (parentRef && parentRef.offsetWidth && parentRef.offsetHeight) {
                    let width = (this.width || parentRef.offsetWidth);
                    let height = (this.height || parentRef.offsetHeight);
                    mutationObserver.disconnect();
                    resolve({ width, height });
                }
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LineChartComponent, deps: [{ token: Renderer2 }, { token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: LineChartComponent, selector: "bizy-line-chart", inputs: { saveAsImageButtonLabel: "saveAsImageButtonLabel", xLabelPrefix: "xLabelPrefix", xLabelSuffix: "xLabelSuffix", yLabelPrefix: "yLabelPrefix", yLabelSuffix: "yLabelSuffix", labelsX: "labelsX", height: "height", width: "width", tooltip: "tooltip", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LineChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-line-chart',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.DecimalPipe, decorators: [{
                    type: Inject,
                    args: [DecimalPipe]
                }] }]; }, propDecorators: { saveAsImageButtonLabel: [{
                type: Input
            }], xLabelPrefix: [{
                type: Input
            }], xLabelSuffix: [{
                type: Input
            }], yLabelPrefix: [{
                type: Input
            }], yLabelSuffix: [{
                type: Input
            }], labelsX: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], data: [{
                type: Input
            }] } });

class LineChartModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LineChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: LineChartModule, declarations: [LineChartComponent], imports: [CommonModule], exports: [LineChartComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LineChartModule, providers: [DecimalPipe], imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LineChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [LineChartComponent],
                    exports: [LineChartComponent],
                    providers: [DecimalPipe]
                }]
        }] });

class BarChartComponent {
    renderer;
    elementRef;
    document;
    decimalPipe;
    saveAsImageButtonLabel = 'Descargar';
    xLabelPrefix = '';
    xLabelSuffix = '';
    yLabelPrefix = '';
    yLabelSuffix = '';
    labelsX = [];
    height;
    width;
    tooltip = true;
    chartContainer = null;
    set data(data) {
        if (data && data.length > 0) {
            this.#setChartData(data);
        }
    }
    constructor(renderer, elementRef, document, decimalPipe) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.document = document;
        this.decimalPipe = decimalPipe;
    }
    async #setChartData(data) {
        let size = { width: this.width, height: this.height };
        if (!this.width || !this.height) {
            size = await this.#getChartSize();
        }
        if (!this.chartContainer) {
            this.chartContainer = this.renderer.createElement('div');
            this.renderer.setStyle(this.chartContainer, 'width', `${size.width}px`);
            this.renderer.setStyle(this.chartContainer, 'height', `${size.height}px`);
            this.renderer.appendChild(this.elementRef.nativeElement, this.chartContainer);
        }
        const color = [];
        const _data = [];
        const legendData = [];
        data.forEach(_d => {
            if (_d.color) {
                color.push(_d.color);
            }
            legendData.push(_d.name);
            _data.push({
                type: 'bar',
                id: _d.id ?? String(Math.random()),
                name: _d.name,
                smooth: true,
                data: !_d.values || _d.values.length === 0 ? [0] : _d.values
            });
        });
        const option = {
            tooltip: {
                show: this.tooltip,
                trigger: 'axis',
                appendToBody: true,
                formatter: this.#tooltipFormatter
            },
            legend: {
                y: 'bottom',
                padding: [0, 0, 0, 0],
                data: legendData
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true,
                        title: this.saveAsImageButtonLabel
                    }
                },
                iconStyle: {
                    emphasis: {
                        textAlign: 'right'
                    }
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.labelsX,
                    axisLabel: {
                        formatter: `${this.xLabelPrefix}{value}${this.xLabelSuffix}`,
                        fontSize: 10,
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: `${this.yLabelPrefix}{value}${this.yLabelSuffix}`,
                        fontSize: 10
                    }
                }
            ],
            series: _data
        };
        option.grid = {
            bottom: `${Math.max(legendData.length * 2.4, 10)}%`,
            containLabel: true,
            left: '3%',
            right: '3%'
        };
        if (color.length > 0) {
            option.color = color;
        }
        if ((legendData.length / 18) > 1) {
            this.renderer.setStyle(this.chartContainer, 'height', `${this.height * (legendData.length / 18)}px`);
        }
        echarts.init(this.chartContainer).setOption(option);
    }
    #tooltipFormatter = (params) => {
        let tooltip = `${params[0].name}`;
        const barParam = params.filter(_param => _param.componentSubType === 'bar');
        barParam.forEach(_param => {
            const bullet = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">&#8226;</span>`;
            tooltip += `<br/>${bullet} ${_param.seriesName} : ${this.yLabelPrefix}${this.decimalPipe.transform(_param.value, '1.2-2')}${this.yLabelSuffix}`;
        });
        return tooltip;
    };
    #getChartSize() {
        return new Promise(resolve => {
            const mutationObserver = new MutationObserver(() => {
                const parentRef = this.renderer.parentNode(this.elementRef.nativeElement);
                if (parentRef && parentRef.offsetWidth && parentRef.offsetHeight) {
                    let width = (this.width || parentRef.offsetWidth);
                    let height = (this.height || parentRef.offsetHeight);
                    mutationObserver.disconnect();
                    resolve({ width, height });
                }
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BarChartComponent, deps: [{ token: Renderer2 }, { token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BarChartComponent, selector: "bizy-bar-chart", inputs: { saveAsImageButtonLabel: "saveAsImageButtonLabel", xLabelPrefix: "xLabelPrefix", xLabelSuffix: "xLabelSuffix", yLabelPrefix: "yLabelPrefix", yLabelSuffix: "yLabelSuffix", labelsX: "labelsX", height: "height", width: "width", tooltip: "tooltip", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BarChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-bar-chart',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.DecimalPipe, decorators: [{
                    type: Inject,
                    args: [DecimalPipe]
                }] }]; }, propDecorators: { saveAsImageButtonLabel: [{
                type: Input
            }], xLabelPrefix: [{
                type: Input
            }], xLabelSuffix: [{
                type: Input
            }], yLabelPrefix: [{
                type: Input
            }], yLabelSuffix: [{
                type: Input
            }], labelsX: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], data: [{
                type: Input
            }] } });

class BarChartModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BarChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BarChartModule, declarations: [BarChartComponent], imports: [CommonModule], exports: [BarChartComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BarChartModule, providers: [DecimalPipe], imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BarChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [BarChartComponent],
                    exports: [BarChartComponent],
                    providers: [DecimalPipe]
                }]
        }] });

const EMPTY_CHART = [0];
class PieChartComponent {
    renderer;
    elementRef;
    document;
    decimalPipe;
    title = '';
    currency = '';
    saveAsImageButtonLabel = 'Descargar';
    isCurrency = false;
    decimals = 2;
    height;
    width;
    chartContainer = null;
    constructor(renderer, elementRef, document, decimalPipe) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.document = document;
        this.decimalPipe = decimalPipe;
    }
    set data(data) {
        if (data && data.length > 0) {
            this.#setChartData(data);
        }
        else if (data && data.length === 0) {
            if (this.chartContainer) {
                this.renderer.removeChild(this.elementRef.nativeElement, this.chartContainer);
                this.chartContainer = null;
            }
            this.#setChartData(EMPTY_CHART);
        }
    }
    async #setChartData(data) {
        let size = { width: this.width, height: this.height };
        if (!this.width || !this.height) {
            size = await this.#getChartSize();
        }
        if (!this.chartContainer) {
            this.chartContainer = this.renderer.createElement('div');
            this.renderer.setStyle(this.chartContainer, 'width', `${size.width}px`);
            this.renderer.setStyle(this.chartContainer, 'height', `${size.height}px`);
            this.renderer.appendChild(this.elementRef.nativeElement, this.chartContainer);
        }
        const color = [];
        let total = 0;
        data.forEach(_d => {
            total += _d.value;
            if (_d.color) {
                color.push(_d.color);
            }
        });
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: (item) => `${item.name}: ${this.currency ? this.currency + this.decimalPipe.transform(item.value, '1.2-2') : this.decimalPipe.transform(item.value, '1.2-2')} (${item.percent.toFixed()}%)`
            },
            title: {
                show: this.title,
                text: this.title,
                left: 'left',
                textStyle: {
                    color: '#2484c6',
                    width: this.width - 40,
                    overflow: 'break'
                },
                subtext: `Total: ${this.currency ? this.currency + this.decimalPipe.transform(total, '1.2-2') : this.decimalPipe.transform(total, '1.2-2')}`
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true,
                        title: this.saveAsImageButtonLabel
                    }
                },
                iconStyle: {
                    emphasis: {
                        textAlign: 'right'
                    }
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    center: this.width >= 576 ? ['50%', '50%'] : ['50%', '65%'],
                    data,
                    itemStyle: {
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        normal: {
                            label: {
                                position: 'outer',
                                formatter: (item) => {
                                    return `${item.name}: ${this.currency ? this.currency + this.decimalPipe.transform(item.value, '1.2-2') : this.decimalPipe.transform(item.value, '1.2-2')} (${item.percent.toFixed()}%)`;
                                }
                            },
                            labelLine: {
                                show: true
                            }
                        }
                    }
                }
            ]
        };
        if (color.length > 0 && color.length === data.length) {
            option.color = color;
        }
        echarts.init(this.chartContainer).setOption(option);
    }
    #getChartSize() {
        return new Promise(resolve => {
            const mutationObserver = new MutationObserver(() => {
                const parentRef = this.renderer.parentNode(this.elementRef.nativeElement);
                if (parentRef && parentRef.offsetWidth && parentRef.offsetHeight) {
                    let width = this.width || parentRef.offsetWidth;
                    let height = this.height || parentRef.offsetHeight;
                    mutationObserver.disconnect();
                    resolve({ width, height });
                }
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PieChartComponent, deps: [{ token: Renderer2 }, { token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: PieChartComponent, selector: "bizy-pie-chart", inputs: { title: "title", currency: "currency", saveAsImageButtonLabel: "saveAsImageButtonLabel", isCurrency: "isCurrency", decimals: "decimals", height: "height", width: "width", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PieChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-pie-chart',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.DecimalPipe, decorators: [{
                    type: Inject,
                    args: [DecimalPipe]
                }] }]; }, propDecorators: { title: [{
                type: Input
            }], currency: [{
                type: Input
            }], saveAsImageButtonLabel: [{
                type: Input
            }], isCurrency: [{
                type: Input
            }], decimals: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], data: [{
                type: Input
            }] } });

class PieChartModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PieChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: PieChartModule, declarations: [PieChartComponent], imports: [CommonModule], exports: [PieChartComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PieChartModule, providers: [DecimalPipe], imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PieChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [PieChartComponent],
                    exports: [PieChartComponent],
                    providers: [DecimalPipe]
                }]
        }] });

class AccordionComponent {
    customClass;
    opened = false;
    onOpen = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AccordionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: AccordionComponent, selector: "bizy-accordion", inputs: { customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen" }, ngImport: i0, template: "<button \n  type=\"button\"\n  [ngClass]=\"{'bizy-accordion--opened': opened}\"\n  class=\"bizy-accordion {{customClass}}\"\n  (click)=\"opened = !opened; onOpen.emit(opened)\"\n  (keyup.enter)=\"opened = !opened; onOpen.emit(opened)\">\n\n  <ng-content></ng-content>\n\n  <svg \n    class=\"bizy-accordion__arrow\" \n    viewBox=\"0 0 96 96\" \n    xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n  </svg>\n\n</button>\n\n<span class=\"bizy-accordion__options\" [ngClass]=\"{'bizy-accordion__options--opened': opened}\">\n\n  <ng-content select=\"[bizy-accordion-option]\"></ng-content>\n\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-accordion__options:empty) .bizy-accordion>.bizy-accordion__arrow{display:none!important}.bizy-accordion{background:transparent;border:none;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;width:100%}.bizy-accordion__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease}.bizy-accordion--selected .bizy-accordion__arrow{transform:rotate(180deg)}.bizy-accordion__options{max-height:0;overflow:hidden;display:flex;flex-direction:column;padding-left:.5rem;transition:max-height .3s ease}.bizy-accordion__options--opened{max-height:100vh!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-accordion', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n  type=\"button\"\n  [ngClass]=\"{'bizy-accordion--opened': opened}\"\n  class=\"bizy-accordion {{customClass}}\"\n  (click)=\"opened = !opened; onOpen.emit(opened)\"\n  (keyup.enter)=\"opened = !opened; onOpen.emit(opened)\">\n\n  <ng-content></ng-content>\n\n  <svg \n    class=\"bizy-accordion__arrow\" \n    viewBox=\"0 0 96 96\" \n    xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n  </svg>\n\n</button>\n\n<span class=\"bizy-accordion__options\" [ngClass]=\"{'bizy-accordion__options--opened': opened}\">\n\n  <ng-content select=\"[bizy-accordion-option]\"></ng-content>\n\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-accordion__options:empty) .bizy-accordion>.bizy-accordion__arrow{display:none!important}.bizy-accordion{background:transparent;border:none;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;width:100%}.bizy-accordion__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease}.bizy-accordion--selected .bizy-accordion__arrow{transform:rotate(180deg)}.bizy-accordion__options{max-height:0;overflow:hidden;display:flex;flex-direction:column;padding-left:.5rem;transition:max-height .3s ease}.bizy-accordion__options--opened{max-height:100vh!important}\n"] }]
        }], propDecorators: { customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], onOpen: [{
                type: Output
            }] } });

const COMPONENTS = [
    AccordionComponent,
];
class AccordionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: AccordionModule, declarations: [AccordionComponent], imports: [CommonModule, FormsModule], exports: [AccordionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AccordionModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });

class BizyComponentsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyComponentsModule, imports: [i2$1.IonicModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyComponentsModule, imports: [IonicModule.forRoot({ mode: 'ios' })] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [IonicModule.forRoot({ mode: 'ios' })],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AccordionComponent, AccordionModule, BarChartComponent, BarChartModule, BizyComponentsModule, ButtonComponent, ButtonModule, CheckboxComponent, CheckboxModule, ConfirmButtonsComponent, ConfirmButtonsModule, ErrorComponent, ErrorModule, FabButtonComponent, FabButtonModule, FilterComponent, FilterModule, FilterPipe, FilterSectionCheckboxOptionComponent, FilterSectionComponent, FilterSectionRangeOptionComponent, InputComponent, InputModule, LineChartComponent, LineChartModule, MenuComponent, MenuModule, MenuOptionComponent, PieChartComponent, PieChartModule, RangeFilterPipe, SelectComponent, SelectModule, SelectOptionComponent, SidebarComponent, SidebarModule, SliderComponent, SliderModule, TabComponent, TableColumnArrowsComponent, TableColumnComponent, TableComponent, TableFooterComponent, TableHeaderComponent, TableModule, TableRowComponent, TableScrollingComponent, TableScrollingDirective, TabsComponent, TabsModule, ToggleComponent, ToggleModule, ToolbarComponent, ToolbarModule, VirtualScrollComponent, VirtualScrollGridDirective, VirtualScrollModule, VirtualScrollNgForDirective };
//# sourceMappingURL=bizy-components.mjs.map
