import { BizySelectOptionComponent } from './select-option/select-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, ContentChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
export class BizySelectComponent {
    ref;
    document;
    options;
    id = String(Math.random());
    disabled = false;
    label = '';
    customClass = '';
    opened = false;
    onOpen = new EventEmitter();
    _selectWidth;
    _optionValue = '';
    #options = [];
    #subscription = new Subscription();
    #mutationObserver;
    constructor(ref, document) {
        this.ref = ref;
        this.document = document;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (!this.options || (this.#options.length === 0 && this.options.length === 0)) {
                return;
            }
            if (this.#optionsAreEqual(this.#options, this.options.toArray())) {
                return;
            }
            this.#options = this.options.toArray();
            this._optionValue = '';
            const option = this.#options.find(_option => _option.getSelected());
            if (option) {
                this._optionValue = option.getValue();
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
        this.options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(() => {
                this._optionValue = _option.getValue();
                this.close(null);
                this.ref.detectChanges();
            }));
        });
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySelectComponent, selector: "bizy-select", inputs: { id: "id", disabled: "disabled", label: "label", customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen" }, queries: [{ propertyName: "options", predicate: BizySelectOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-select {{customClass}}\"\n    [ngClass]=\"{'bizy-select--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-select__content\">\n        <h4 class=\"bizy-select__content__label\" *ngIf=\"label\">{{label}}</h4>\n        <span>{{_optionValue}}</span>\n    </span>\n\n    <svg \n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        id=\"bizy-select-arrow\"\n        version=\"1.1\"\n        viewBox=\"0 0 512 512\"\n        xml:space=\"preserve\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <path d=\"M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z\"/>\n    </svg>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_selectWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-select-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-select{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;color:var(--bizy-select-color);padding:.25rem .5rem 0;cursor:pointer;min-height:3.3rem;border-top-left-radius:.3rem;border-top-right-radius:.3rem;border-bottom:.1rem solid var(--bizy-select-border-color)}.bizy-select--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-select__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:var(--bizy-select-color)}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__content{font-size:1rem;background-color:transparent;display:flex;flex-direction:column;align-items:flex-start;row-gap:.5rem;pointer-events:none;align-self:flex-start;text-align:start}.bizy-select__content__label{font-weight:700;color:var(--bizy-select-label-color)}.bizy-select__hidden-options{visibility:hidden;height:0;width:0;display:block;pointer-events:none}.bizy-select__options{background-color:var(--bizy-select-background-color);display:flex;min-width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:20rem;overflow-y:scroll;position:relative;max-width:min(75%,25rem)}.bizy-select__options__search{position:sticky;z-index:1;top:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-select {{customClass}}\"\n    [ngClass]=\"{'bizy-select--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-select__content\">\n        <h4 class=\"bizy-select__content__label\" *ngIf=\"label\">{{label}}</h4>\n        <span>{{_optionValue}}</span>\n    </span>\n\n    <svg \n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        id=\"bizy-select-arrow\"\n        version=\"1.1\"\n        viewBox=\"0 0 512 512\"\n        xml:space=\"preserve\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <path d=\"M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z\"/>\n    </svg>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_selectWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-select-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-select{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;color:var(--bizy-select-color);padding:.25rem .5rem 0;cursor:pointer;min-height:3.3rem;border-top-left-radius:.3rem;border-top-right-radius:.3rem;border-bottom:.1rem solid var(--bizy-select-border-color)}.bizy-select--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-select__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:var(--bizy-select-color)}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__content{font-size:1rem;background-color:transparent;display:flex;flex-direction:column;align-items:flex-start;row-gap:.5rem;pointer-events:none;align-self:flex-start;text-align:start}.bizy-select__content__label{font-weight:700;color:var(--bizy-select-label-color)}.bizy-select__hidden-options{visibility:hidden;height:0;width:0;display:block;pointer-events:none}.bizy-select__options{background-color:var(--bizy-select-background-color);display:flex;min-width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:20rem;overflow-y:scroll;position:relative;max-width:min(75%,25rem)}.bizy-select__options__search{position:sticky;z-index:1;top:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySelectOptionComponent]
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
            }], onOpen: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zZWxlY3Qvc2VsZWN0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsZUFBZSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUM5SyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQVEzQyxNQUFNLE9BQU8sbUJBQW1CO0lBa0JPO0lBQ1Q7SUFsQmdCLE9BQU8sQ0FBdUM7SUFDakYsRUFBRSxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNuQyxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLEtBQUssR0FBVyxFQUFFLENBQUM7SUFDbkIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixNQUFNLEdBQVksS0FBSyxDQUFDO0lBQ3ZCLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUVwRCxZQUFZLENBQVM7SUFDckIsWUFBWSxHQUFXLEVBQUUsQ0FBQztJQUUxQixRQUFRLEdBQXFDLEVBQUUsQ0FBQztJQUVoRCxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNuQyxpQkFBaUIsQ0FBbUI7SUFFcEMsWUFDcUMsR0FBc0IsRUFDL0IsUUFBa0I7UUFEVCxRQUFHLEdBQUgs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QyxVQUFVLEVBQUUsQ0FBQztTQUNyQztJQUNILENBQUM7d0dBL0dVLG1CQUFtQixrQkFrQnBCLGlCQUFpQixhQUNqQixRQUFROzRGQW5CUCxtQkFBbUIsb05BQ2IseUJBQXlCLDZCQ1o1QyxxakRBK0NBOzs0RkRwQ2EsbUJBQW1CO2tCQU4vQixTQUFTOytCQUNFLGFBQWEsbUJBR04sdUJBQXVCLENBQUMsTUFBTTs7MEJBb0I1QyxNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsUUFBUTs0Q0FsQjBCLE9BQU87c0JBQWxELGVBQWU7dUJBQUMseUJBQXlCO2dCQUNqQyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0ksTUFBTTtzQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQml6eVNlbGVjdE9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LW9wdGlvbi9zZWxlY3Qtb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVuLCBPbkluaXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbGVjdC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAQ29udGVudENoaWxkcmVuKEJpenlTZWxlY3RPcHRpb25Db21wb25lbnQpIG9wdGlvbnM6IFF1ZXJ5TGlzdDxCaXp5U2VsZWN0T3B0aW9uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIG9wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgb25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG5cbiAgX3NlbGVjdFdpZHRoOiBudW1iZXI7XG4gIF9vcHRpb25WYWx1ZTogc3RyaW5nID0gJyc7XG5cbiAgI29wdGlvbnM6IEFycmF5PEJpenlTZWxlY3RPcHRpb25Db21wb25lbnQ+ID0gW107XG5cbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI211dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zIHx8ICh0aGlzLiNvcHRpb25zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLiNvcHRpb25zQXJlRXF1YWwodGhpcy4jb3B0aW9ucywgdGhpcy5vcHRpb25zLnRvQXJyYXkoKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNvcHRpb25zID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgdGhpcy5fb3B0aW9uVmFsdWUgPSAnJztcblxuICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy4jb3B0aW9ucy5maW5kKF9vcHRpb24gPT4gX29wdGlvbi5nZXRTZWxlY3RlZCgpKTtcblxuICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICB0aGlzLl9vcHRpb25WYWx1ZSA9IG9wdGlvbi5nZXRWYWx1ZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7ICAgICAgXG4gICAgICB0aGlzLiNsaXN0ZW5PcHRpb25DaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIF9vbk9wZW4oZXZlbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuZWQgPSAhdGhpcy5vcGVuZWQ7XG4gICAgdGhpcy5vbk9wZW4uZW1pdChldmVudCk7XG5cbiAgICBpZiAoIXRoaXMub3BlbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGlmIChldmVudCAmJiBldmVudC5zcmNFbGVtZW50ICYmIGV2ZW50LnNyY0VsZW1lbnQub2Zmc2V0V2lkdGgpIHtcbiAgICAgIHRoaXMuX3NlbGVjdFdpZHRoID0gIGV2ZW50LnNyY0VsZW1lbnQub2Zmc2V0V2lkdGg7IFxuICAgIH1cblxuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGNsb3NlID0gKGV2ZW50OiBQb2ludGVyRXZlbnQgJiB7dGFyZ2V0OiB7aWQ6IHN0cmluZ319KSA9PiB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQgJiYgZXZlbnQudGFyZ2V0LmlkID09PSB0aGlzLmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAjbGlzdGVuT3B0aW9uQ2hhbmdlcyA9ICgpID0+IHtcbiAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChfb3B0aW9uID0+IHtcbiAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQoX29wdGlvbi5vblNlbGVjdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9vcHRpb25WYWx1ZSA9IF9vcHRpb24uZ2V0VmFsdWUoKTtcbiAgICAgICAgdGhpcy5jbG9zZShudWxsKTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSkpO1xuICAgIH0pO1xuICB9XG5cbiAgI29wdGlvbnNBcmVFcXVhbChhcnIxOiBBcnJheTxCaXp5U2VsZWN0T3B0aW9uQ29tcG9uZW50PiwgYXJyMjogQXJyYXk8Qml6eVNlbGVjdE9wdGlvbkNvbXBvbmVudD4pIHtcbiAgICBpZiAoYXJyMS5sZW5ndGggIT09IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBhcnIxLnNvcnQoKGEsIGIpID0+IFN0cmluZyhhLmlkKS5sb2NhbGVDb21wYXJlKFN0cmluZyhiLmlkKSkpO1xuICAgIGFycjIuc29ydCgoYSwgYikgPT4gU3RyaW5nKGEuaWQpLmxvY2FsZUNvbXBhcmUoU3RyaW5nKGIuaWQpKSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycjEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFycjFbaV0pIHtcbiAgICAgICAgICAgIGlmIChhcnIxW2ldW2tleV0gIT09IGFycjJbaV1ba2V5XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxufSIsIjxidXR0b24gXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY2xhc3M9XCJiaXp5LXNlbGVjdCB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIFtuZ0NsYXNzXT1cInsnYml6eS1zZWxlY3QtLWRpc2FibGVkJzogZGlzYWJsZWR9XCJcbiAgICBpZD1cInt7aWR9fVwiXG4gICAgKGNsaWNrKT1cIl9vbk9wZW4oJGV2ZW50KVwiXG4gICAgKGtleXVwLmVudGVyKT1cIl9vbk9wZW4oJGV2ZW50KVwiXG4gICAgY2RrT3ZlcmxheU9yaWdpbiBcbiAgICAjYml6eVNlbGVjdFRyaWdnZXI9XCJjZGtPdmVybGF5T3JpZ2luXCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktc2VsZWN0X19jb250ZW50XCI+XG4gICAgICAgIDxoNCBjbGFzcz1cImJpenktc2VsZWN0X19jb250ZW50X19sYWJlbFwiICpuZ0lmPVwibGFiZWxcIj57e2xhYmVsfX08L2g0PlxuICAgICAgICA8c3Bhbj57e19vcHRpb25WYWx1ZX19PC9zcGFuPlxuICAgIDwvc3Bhbj5cblxuICAgIDxzdmcgXG4gICAgICAgIGNsYXNzPVwiYml6eS1zZWxlY3RfX2Fycm93XCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydiaXp5LXNlbGVjdF9fYXJyb3ctLW9wZW5lZCc6IG9wZW5lZH1cIlxuICAgICAgICBpZD1cImJpenktc2VsZWN0LWFycm93XCJcbiAgICAgICAgdmVyc2lvbj1cIjEuMVwiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiXG4gICAgICAgIHhtbDpzcGFjZT1cInByZXNlcnZlXCJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPlxuICAgICAgICA8cGF0aCBkPVwiTTk4LjksMTg0LjdsMS44LDIuMWwxMzYsMTU2LjVjNC42LDUuMywxMS41LDguNiwxOS4yLDguNmM3LjcsMCwxNC42LTMuNCwxOS4yLTguNkw0MTEsMTg3LjFsMi4zLTIuNiAgYzEuNy0yLjUsMi43LTUuNSwyLjctOC43YzAtOC43LTcuNC0xNS44LTE2LjYtMTUuOHYwSDExMi42djBjLTkuMiwwLTE2LjYsNy4xLTE2LjYsMTUuOEM5NiwxNzkuMSw5Ny4xLDE4Mi4yLDk4LjksMTg0Ljd6XCIvPlxuICAgIDwvc3ZnPlxuXG48L2J1dHRvbj5cblxuPG5nLXRlbXBsYXRlXG4gICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5TWluV2lkdGhdPVwiX3NlbGVjdFdpZHRoXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJiaXp5U2VsZWN0VHJpZ2dlclwiXG4gICAgKG92ZXJsYXlPdXRzaWRlQ2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cIm9wZW5lZFwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LXNlbGVjdF9fb3B0aW9uc1wiPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYml6eS1zZWxlY3RfX29wdGlvbnNfX3NlYXJjaFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1pbnB1dFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktc2VsZWN0LW9wdGlvblwiPjwvbmctY29udGVudD5cblxuICAgIDwvc3Bhbj5cblxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==