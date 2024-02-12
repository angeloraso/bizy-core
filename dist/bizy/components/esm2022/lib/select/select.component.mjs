import { SelectOptionComponent } from './select-option/select-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, ContentChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
export class SelectComponent {
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: SelectComponent, selector: "bizy-select", inputs: { id: "id", disabled: "disabled", label: "label", customClass: "customClass", opened: "opened", value: "value" }, outputs: { onSelect: "onSelect", valueChange: "valueChange", onOpen: "onOpen" }, queries: [{ propertyName: "options", predicate: SelectOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-select {{customClass}}\"\n    [ngClass]=\"{'bizy-select--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-select__content\">\n        <h5 class=\"bizy-select__content__label\" *ngIf=\"label\">{{label}}</h5>\n        <span>{{_optionValue}}</span>\n    </span>\n\n    <svg \n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        id=\"bizy-select-arrow\"\n        version=\"1.1\"\n        viewBox=\"0 0 512 512\"\n        xml:space=\"preserve\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <path d=\"M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z\"/>\n    </svg>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_selectWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-search-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-select-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem;color:var(--bizy-select-color, #000);fill:var(--bizy-select-color, #000)}.bizy-select{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color, #fff);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;color:inherit;padding:.25rem .5rem 0;cursor:pointer;min-height:3.3rem;border-top-left-radius:.3rem;border-top-right-radius:.3rem;border-bottom:.1rem solid var(--bizy-select-border-color, #000)}.bizy-select--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-select__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:inherit}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__content{font-size:1rem;background-color:transparent;display:flex;flex-direction:column;align-items:flex-start;row-gap:.5rem;pointer-events:none;align-self:flex-start;text-align:start}.bizy-select__content__label{color:var(--bizy-select-label-color, #000)}.bizy-select__hidden-options{visibility:hidden;height:0;width:0;display:block;pointer-events:none}.bizy-select__options{background-color:var(--bizy-select-background-color, #fff);display:flex;min-width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:20rem;overflow-y:scroll;position:relative;max-width:min(75%,25rem)}.bizy-select__options__search{position:sticky;z-index:1;top:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zZWxlY3Qvc2VsZWN0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsZUFBZSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9KLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBUTNDLE1BQU0sT0FBTyxlQUFlO0lBNENXO0lBQ1Q7SUE1Q1ksT0FBTyxDQUFtQztJQUN6RSxFQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsS0FBSyxHQUFXLEVBQUUsQ0FBQztJQUNuQixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sR0FBWSxLQUFLLENBQUM7SUFDdkIsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO0lBQy9DLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztJQUNsRCxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFFcEQsSUFBYSxLQUFLLENBQUMsS0FBc0I7UUFDdkMsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsRCxPQUFPO1NBQ1I7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QyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQy9CLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckM7SUFDSCxDQUFDO3dHQTNKVSxlQUFlLGtCQTRDaEIsaUJBQWlCLGFBQ2pCLFFBQVE7NEZBN0NQLGVBQWUsc1JBQ1QscUJBQXFCLDZCQ1p4Qyw0akRBK0NBOzs0RkRwQ2EsZUFBZTtrQkFOM0IsU0FBUzsrQkFDRSxhQUFhLG1CQUdOLHVCQUF1QixDQUFDLE1BQU07OzBCQThDNUMsTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUN4QixNQUFNOzJCQUFDLFFBQVE7NENBNUNzQixPQUFPO3NCQUE5QyxlQUFlO3VCQUFDLHFCQUFxQjtnQkFDN0IsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBRU0sS0FBSztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdE9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LW9wdGlvbi9zZWxlY3Qtb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVuLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbGVjdC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihTZWxlY3RPcHRpb25Db21wb25lbnQpIG9wdGlvbnM6IFF1ZXJ5TGlzdDxTZWxlY3RPcHRpb25Db21wb25lbnQ+O1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVtYmVyPigpO1xuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZyB8IG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIG9uT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIEBJbnB1dCgpIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX29wdGlvblZhbHVlID0gJyc7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChfb3B0aW9uID0+IHtcbiAgICAgICAgaWYgKF9vcHRpb24uZ2V0S2V5KCkgPT09IHZhbHVlKSB7XG4gICAgICAgICAgX29wdGlvbi5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgICB0aGlzLl9vcHRpb25WYWx1ZSA9IF9vcHRpb24uZ2V0VmFsdWUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfb3B0aW9uLnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuXG4gIF9zZWxlY3RXaWR0aDogbnVtYmVyO1xuICBfdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgX29wdGlvblZhbHVlOiBzdHJpbmcgPSAnJztcblxuICAjb3B0aW9uczogQXJyYXk8U2VsZWN0T3B0aW9uQ29tcG9uZW50PiA9IFtdO1xuXG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zIHx8ICh0aGlzLiNvcHRpb25zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLiNvcHRpb25zQXJlRXF1YWwodGhpcy4jb3B0aW9ucywgdGhpcy5vcHRpb25zLnRvQXJyYXkoKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNvcHRpb25zID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgdGhpcy5fb3B0aW9uVmFsdWUgPSAnJztcblxuICAgICAgaWYgKHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgICAgIGlmIChfb3B0aW9uLmdldEtleSgpID09PSB0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgX29wdGlvbi5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvblZhbHVlID0gX29wdGlvbi5nZXRWYWx1ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfb3B0aW9uLnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7ICAgICAgXG4gICAgICB0aGlzLiNsaXN0ZW5PcHRpb25DaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIF9vbk9wZW4oZXZlbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuZWQgPSAhdGhpcy5vcGVuZWQ7XG4gICAgdGhpcy5vbk9wZW4uZW1pdChldmVudCk7XG5cbiAgICBpZiAoIXRoaXMub3BlbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGlmIChldmVudCAmJiBldmVudC5zcmNFbGVtZW50ICYmIGV2ZW50LnNyY0VsZW1lbnQub2Zmc2V0V2lkdGgpIHtcbiAgICAgIHRoaXMuX3NlbGVjdFdpZHRoID0gIGV2ZW50LnNyY0VsZW1lbnQub2Zmc2V0V2lkdGg7IFxuICAgIH1cblxuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGNsb3NlID0gKGV2ZW50OiBQb2ludGVyRXZlbnQgJiB7dGFyZ2V0OiB7aWQ6IHN0cmluZ319KSA9PiB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQgJiYgZXZlbnQudGFyZ2V0LmlkID09PSB0aGlzLmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAjbGlzdGVuT3B0aW9uQ2hhbmdlcyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuXG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKF9vcHRpb24ub25TZWxlY3Quc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goX19vcHRpb24gPT4ge1xuICAgICAgICAgIGlmIChfX29wdGlvbi5nZXRJZCgpICE9PSBfb3B0aW9uLmdldElkKCkpIHtcbiAgICAgICAgICAgIF9fb3B0aW9uLnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5fb3B0aW9uVmFsdWUgPSBfb3B0aW9uLmdldFZhbHVlKCk7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChfb3B0aW9uLmdldEtleSgpKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KF9vcHRpb24uZ2V0S2V5KCkpO1xuICAgICAgICB0aGlzLmNsb3NlKG51bGwpO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICAjb3B0aW9uc0FyZUVxdWFsKGFycjE6IEFycmF5PFNlbGVjdE9wdGlvbkNvbXBvbmVudD4sIGFycjI6IEFycmF5PFNlbGVjdE9wdGlvbkNvbXBvbmVudD4pIHtcbiAgICBpZiAoYXJyMS5sZW5ndGggIT09IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBhcnIxLnNvcnQoKGEsIGIpID0+IGEuaWQubG9jYWxlQ29tcGFyZShiLmlkKSk7XG4gICAgYXJyMi5zb3J0KChhLCBiKSA9PiBhLmlkLmxvY2FsZUNvbXBhcmUoYi5pZCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcnIxW2ldKSB7XG4gICAgICAgICAgICBpZiAoYXJyMVtpXVtrZXldICE9PSBhcnIyW2ldW2tleV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNtdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn0iLCI8YnV0dG9uIFxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNsYXNzPVwiYml6eS1zZWxlY3Qge3tjdXN0b21DbGFzc319XCJcbiAgICBbbmdDbGFzc109XCJ7J2Jpenktc2VsZWN0LS1kaXNhYmxlZCc6IGRpc2FibGVkfVwiXG4gICAgaWQ9XCJ7e2lkfX1cIlxuICAgIChjbGljayk9XCJfb25PcGVuKCRldmVudClcIlxuICAgIChrZXl1cC5lbnRlcik9XCJfb25PcGVuKCRldmVudClcIlxuICAgIGNka092ZXJsYXlPcmlnaW4gXG4gICAgI2JpenlTZWxlY3RUcmlnZ2VyPVwiY2RrT3ZlcmxheU9yaWdpblwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LXNlbGVjdF9fY29udGVudFwiPlxuICAgICAgICA8aDUgY2xhc3M9XCJiaXp5LXNlbGVjdF9fY29udGVudF9fbGFiZWxcIiAqbmdJZj1cImxhYmVsXCI+e3tsYWJlbH19PC9oNT5cbiAgICAgICAgPHNwYW4+e3tfb3B0aW9uVmFsdWV9fTwvc3Bhbj5cbiAgICA8L3NwYW4+XG5cbiAgICA8c3ZnIFxuICAgICAgICBjbGFzcz1cImJpenktc2VsZWN0X19hcnJvd1wiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnYml6eS1zZWxlY3RfX2Fycm93LS1vcGVuZWQnOiBvcGVuZWR9XCJcbiAgICAgICAgaWQ9XCJiaXp5LXNlbGVjdC1hcnJvd1wiXG4gICAgICAgIHZlcnNpb249XCIxLjFcIlxuICAgICAgICB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIlxuICAgICAgICB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIj5cbiAgICAgICAgPHBhdGggZD1cIk05OC45LDE4NC43bDEuOCwyLjFsMTM2LDE1Ni41YzQuNiw1LjMsMTEuNSw4LjYsMTkuMiw4LjZjNy43LDAsMTQuNi0zLjQsMTkuMi04LjZMNDExLDE4Ny4xbDIuMy0yLjYgIGMxLjctMi41LDIuNy01LjUsMi43LTguN2MwLTguNy03LjQtMTUuOC0xNi42LTE1Ljh2MEgxMTIuNnYwYy05LjIsMC0xNi42LDcuMS0xNi42LDE1LjhDOTYsMTc5LjEsOTcuMSwxODIuMiw5OC45LDE4NC43elwiLz5cbiAgICA8L3N2Zz5cblxuPC9idXR0b24+XG5cbjxuZy10ZW1wbGF0ZVxuICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU1pbldpZHRoXT1cIl9zZWxlY3RXaWR0aFwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwiYml6eVNlbGVjdFRyaWdnZXJcIlxuICAgIChvdmVybGF5T3V0c2lkZUNsaWNrKT1cImNsb3NlKCRldmVudClcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJvcGVuZWRcIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1zZWxlY3RfX29wdGlvbnNcIj5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cImJpenktc2VsZWN0X19vcHRpb25zX19zZWFyY2hcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktc2VhcmNoLWlucHV0XCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1zZWxlY3Qtb3B0aW9uXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPC9zcGFuPlxuXG48L25nLXRlbXBsYXRlPlxuIl19