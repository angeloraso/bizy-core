import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, Inject, ChangeDetectorRef } from '@angular/core';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizySidebarNewComponent {
    ref;
    document;
    options;
    floatingOptions;
    toggle = false;
    onToggle = new EventEmitter();
    #subscription = new Subscription();
    #mutationObserver;
    #options = [];
    #floatingOptions = [];
    constructor(ref, document) {
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.options && (this.#options.length !== 0 || this.options.length !== 0) && !this.#optionsAreEqual(this.#options, this.options.toArray())) {
                this.#options = this.options.toArray();
                this.#listenOptionChanges(this.options.toArray());
            }
            if (this.floatingOptions && (this.#floatingOptions.length !== 0 || this.floatingOptions.length !== 0) && !this.#optionsAreEqual(this.#floatingOptions, this.floatingOptions.toArray())) {
                this.#floatingOptions = this.floatingOptions.toArray();
                this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    #listenOptionChanges = (options) => {
        options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(() => {
                if (_option.getSelected()) {
                    this.#select(this.options.toArray(), _option);
                }
                else {
                    this.#unselect(this.options.toArray());
                    this.#select(this.options.toArray(), _option);
                }
                this.ref.detectChanges();
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenOptionChanges(_option.options.toArray());
            }
        });
    };
    #listenFloatingOptionChanges = (options) => {
        options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(() => {
                if (_option.getSelected()) {
                    this.#select(this.floatingOptions.toArray(), _option);
                }
                else {
                    this.#unselect(this.floatingOptions.toArray());
                    this.#select(this.floatingOptions.toArray(), _option);
                }
                this.ref.detectChanges();
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenFloatingOptionChanges(_option.options.toArray());
            }
        });
    };
    #select = (options, option) => {
        let optionSelected = false;
        options.forEach(_option => {
            if (_option.getId() === option.getId()) {
                if (_option.options && _option.options.length > 0) {
                    option.setSelected(!_option.getSelected());
                }
                else {
                    option.setSelected(true);
                }
                optionSelected = true;
                return;
            }
            else if (_option.options && _option.options.length > 0) {
                const _optionSelected = this.#select(_option.options.toArray(), option);
                if (_optionSelected) {
                    optionSelected = true;
                    _option.setSelected(true);
                    return;
                }
            }
        });
        return optionSelected;
    };
    #unselect = (options) => {
        options.forEach(_option => {
            _option.setSelected(false);
            if (_option.options && _option.options.length > 0) {
                this.#unselect(_option.options.toArray());
            }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarNewComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarNewComponent, selector: "bizy-sidebar-new", inputs: { toggle: "toggle" }, outputs: { onToggle: "onToggle" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }, { propertyName: "floatingOptions", predicate: BizySidebarFloatingOptionComponent }], ngImport: i0, template: "<div class=\"bizy-sidebar\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"toggle = !toggle; onToggle.emit(toggle)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"toggle\"/>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\"  [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width)}.bizy-sidebar{height:100%;width:-moz-fit-content;width:fit-content;display:flex;flex-direction:column;background-color:var(--bizy-sidebar-background-color);justify-content:space-between;position:relative;transition:width .3s ease}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__content{display:flex;width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding-left:.5rem;overflow-x:hidden;transition:width .3s ease}.bizy-sidebar__content--shrinked{padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-option-selected-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarNewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-new', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-sidebar\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"toggle = !toggle; onToggle.emit(toggle)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"toggle\"/>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\"  [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width)}.bizy-sidebar{height:100%;width:-moz-fit-content;width:fit-content;display:flex;flex-direction:column;background-color:var(--bizy-sidebar-background-color);justify-content:space-between;position:relative;transition:width .3s ease}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__content{display:flex;width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding-left:.5rem;overflow-x:hidden;transition:width .3s ease}.bizy-sidebar__content--shrinked{padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-option-selected-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { options: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1uZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1uZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1uZXcuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBYSxNQUFNLEVBQUUsaUJBQWlCLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sNkRBQTZELENBQUM7OztBQVFqSCxNQUFNLE9BQU8sdUJBQXVCO0lBWUc7SUFDVDtJQVppQixPQUFPLENBQXlDO0lBQ3hDLGVBQWUsQ0FBaUQ7SUFDNUcsTUFBTSxHQUFZLEtBQUssQ0FBQztJQUN2QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUVqRCxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNuQyxpQkFBaUIsQ0FBbUI7SUFDcEMsUUFBUSxHQUFzQyxFQUFFLENBQUM7SUFDakQsZ0JBQWdCLEdBQThDLEVBQUUsQ0FBQztJQUVqRSxZQUNxQyxHQUFzQixFQUMvQixRQUFrQjtRQURULFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDM0MsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMs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LENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNyQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQy9CLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckM7SUFDSCxDQUFDO3dHQWhJVSx1QkFBdUIsa0JBWXhCLGlCQUFpQixhQUNqQixRQUFROzRGQWJQLHVCQUF1QixpSkFDakIsMEJBQTBCLGtEQUMxQixrQ0FBa0MsNkJDZHJELHd4Q0EyQkE7OzRGRGZhLHVCQUF1QjtrQkFObkMsU0FBUzsrQkFDRSxrQkFBa0IsbUJBR1gsdUJBQXVCLENBQUMsTUFBTTs7MEJBYzVDLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDeEIsTUFBTTsyQkFBQyxRQUFROzRDQVoyQixPQUFPO3NCQUFuRCxlQUFlO3VCQUFDLDBCQUEwQjtnQkFDVSxlQUFlO3NCQUFuRSxlQUFlO3VCQUFDLGtDQUFrQztnQkFDMUMsTUFBTTtzQkFBZCxLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQml6eVNpZGViYXJPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL3NpZGViYXItb3B0aW9uL3NpZGViYXItb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL3NpZGViYXItZmxvYXRpbmctb3B0aW9uL3NpZGViYXItZmxvYXRpbmctb3B0aW9uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jpenktc2lkZWJhci1uZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2lkZWJhci1uZXcuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NpZGViYXItbmV3LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5U2lkZWJhck5ld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eVNpZGViYXJPcHRpb25Db21wb25lbnQpIG9wdGlvbnMhOiBRdWVyeUxpc3Q8Qml6eVNpZGViYXJPcHRpb25Db21wb25lbnQ+O1xuICBAQ29udGVudENoaWxkcmVuKEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQpIGZsb2F0aW5nT3B0aW9ucyE6IFF1ZXJ5TGlzdDxCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgdG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBvblRvZ2dsZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTsgXG5cbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI211dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICNvcHRpb25zOiBBcnJheTxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD4gPSBbXTtcbiAgI2Zsb2F0aW5nT3B0aW9uczogQXJyYXk8Qml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudD4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zICYmICh0aGlzLiNvcHRpb25zLmxlbmd0aCAhPT0gMCB8fCB0aGlzLm9wdGlvbnMubGVuZ3RoICE9PSAwKSAmJiAhdGhpcy4jb3B0aW9uc0FyZUVxdWFsKHRoaXMuI29wdGlvbnMsIHRoaXMub3B0aW9ucy50b0FycmF5KCkpKSB7XG4gICAgICAgIHRoaXMuI29wdGlvbnMgPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpO1xuXG4gICAgICAgIHRoaXMuI2xpc3Rlbk9wdGlvbkNoYW5nZXModGhpcy5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmZsb2F0aW5nT3B0aW9ucyAmJiAodGhpcy4jZmxvYXRpbmdPcHRpb25zLmxlbmd0aCAhPT0gMCB8fCB0aGlzLmZsb2F0aW5nT3B0aW9ucy5sZW5ndGggIT09IDApICYmICF0aGlzLiNvcHRpb25zQXJlRXF1YWwodGhpcy4jZmxvYXRpbmdPcHRpb25zLCB0aGlzLmZsb2F0aW5nT3B0aW9ucy50b0FycmF5KCkpKSB7XG4gICAgICAgIHRoaXMuI2Zsb2F0aW5nT3B0aW9ucyA9IHRoaXMuZmxvYXRpbmdPcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgICB0aGlzLiNsaXN0ZW5GbG9hdGluZ09wdGlvbkNoYW5nZXModGhpcy5mbG9hdGluZ09wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH1cblxuICAjbGlzdGVuT3B0aW9uQ2hhbmdlcyA9IChvcHRpb25zOiBBcnJheTxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD4pID0+IHtcbiAgICBvcHRpb25zLmZvckVhY2goX29wdGlvbiA9PiB7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKF9vcHRpb24ub25TZWxlY3Quc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKF9vcHRpb24uZ2V0U2VsZWN0ZWQoKSkge1xuICAgICAgICAgIHRoaXMuI3NlbGVjdCh0aGlzLm9wdGlvbnMudG9BcnJheSgpLCBfb3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiN1bnNlbGVjdCh0aGlzLm9wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgICAgICB0aGlzLiNzZWxlY3QodGhpcy5vcHRpb25zLnRvQXJyYXkoKSwgX29wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSkpO1xuXG4gICAgICBpZiAoX29wdGlvbi5vcHRpb25zICYmIF9vcHRpb24ub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuI2xpc3Rlbk9wdGlvbkNoYW5nZXMoX29wdGlvbi5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAjbGlzdGVuRmxvYXRpbmdPcHRpb25DaGFuZ2VzID0gKG9wdGlvbnM6IEFycmF5PEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQ+IHwgQXJyYXk8Qml6eVNpZGViYXJPcHRpb25Db21wb25lbnQ+KSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZChfb3B0aW9uLm9uU2VsZWN0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmIChfb3B0aW9uLmdldFNlbGVjdGVkKCkpIHtcbiAgICAgICAgICB0aGlzLiNzZWxlY3QodGhpcy5mbG9hdGluZ09wdGlvbnMudG9BcnJheSgpLCBfb3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiN1bnNlbGVjdCh0aGlzLmZsb2F0aW5nT3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgICAgIHRoaXMuI3NlbGVjdCh0aGlzLmZsb2F0aW5nT3B0aW9ucy50b0FycmF5KCksIF9vcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pKTtcblxuICAgICAgaWYgKF9vcHRpb24ub3B0aW9ucyAmJiBfb3B0aW9uLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLiNsaXN0ZW5GbG9hdGluZ09wdGlvbkNoYW5nZXMoX29wdGlvbi5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAjc2VsZWN0ID0gKG9wdGlvbnM6IEFycmF5PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50PiB8IEFycmF5PEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQ+LCBvcHRpb246IEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50IHwgQml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudCk6IGJvb2xlYW4gPT4ge1xuICAgIGxldCBvcHRpb25TZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG9wdGlvbnMuZm9yRWFjaChfb3B0aW9uID0+IHtcbiAgICAgIGlmIChfb3B0aW9uLmdldElkKCkgPT09IG9wdGlvbi5nZXRJZCgpKSB7XG4gICAgICAgIGlmIChfb3B0aW9uLm9wdGlvbnMgJiYgX29wdGlvbi5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBvcHRpb24uc2V0U2VsZWN0ZWQoIV9vcHRpb24uZ2V0U2VsZWN0ZWQoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvblNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChfb3B0aW9uLm9wdGlvbnMgJiYgX29wdGlvbi5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgX29wdGlvblNlbGVjdGVkID0gdGhpcy4jc2VsZWN0KF9vcHRpb24ub3B0aW9ucy50b0FycmF5KCksIG9wdGlvbik7XG4gICAgICAgIGlmIChfb3B0aW9uU2VsZWN0ZWQpIHtcbiAgICAgICAgICBvcHRpb25TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgX29wdGlvbi5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBvcHRpb25TZWxlY3RlZDtcbiAgfTtcblxuICAjdW5zZWxlY3QgPSAob3B0aW9uczogQXJyYXk8Qml6eVNpZGViYXJPcHRpb25Db21wb25lbnQ+IHwgQXJyYXk8Qml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudD4pID0+IHtcbiAgICBvcHRpb25zLmZvckVhY2goX29wdGlvbiA9PiB7XG4gICAgICBfb3B0aW9uLnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICAgIGlmIChfb3B0aW9uLm9wdGlvbnMgJiYgX29wdGlvbi5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy4jdW5zZWxlY3QoX29wdGlvbi5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgI29wdGlvbnNBcmVFcXVhbChhcnIxOiBBcnJheTxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD4gfCBBcnJheTxCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50PiwgYXJyMjogQXJyYXk8Qml6eVNpZGViYXJPcHRpb25Db21wb25lbnQ+IHwgQXJyYXk8Qml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudD4pIHtcbiAgICBpZiAoYXJyMS5sZW5ndGggIT09IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBhcnIxLnNvcnQoKGEsIGIpID0+IGEuaWQubG9jYWxlQ29tcGFyZShiLmlkKSk7XG4gICAgYXJyMi5zb3J0KChhLCBiKSA9PiBhLmlkLmxvY2FsZUNvbXBhcmUoYi5pZCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcnIxW2ldKSB7XG4gICAgICAgICAgICBpZiAoYXJyMVtpXVtrZXldICE9PSBhcnIyW2ldW2tleV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNtdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn0iLCI8ZGl2IGNsYXNzPVwiYml6eS1zaWRlYmFyXCI+XG5cbiAgPHNwYW4gY2xhc3M9XCJiaXp5LXNpZGViYXJfX3RhYlwiIGlkPVwiYml6eS1zaWRlYmFyLXRhYlwiIChjbGljayk9XCJ0b2dnbGUgPSAhdG9nZ2xlOyBvblRvZ2dsZS5lbWl0KHRvZ2dsZSlcIj5cbiAgICA8c3ZnIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImJpenktc2lkZWJhcl9fdGFiX19zdmdcIj5cbiAgICAgIDxwYXRoIGNsYXNzPVwiYml6eS1zaWRlYmFyX190YWJfX3N2Z19fcGF0aFwiIGQ9XCJNMTAgNkM4Ljg5NTQzIDYgOCA1LjEwNDU3IDggNEM4IDIuODk1NDMgOC44OTU0MyAyIDEwIDJDMTEuMTA0NiAyIDEyIDIuODk1NDMgMTIgNEMxMiA1LjEwNDU3IDExLjEwNDYgNiAxMCA2WlwiLz5cbiAgICAgIDxwYXRoIGNsYXNzPVwiYml6eS1zaWRlYmFyX190YWJfX3N2Z19fcGF0aFwiIGQ9XCJNMTAgMTJDOC44OTU0MyAxMiA4IDExLjEwNDYgOCAxMEM4IDguODk1NDMgOC44OTU0MyA4IDEwIDhDMTEuMTA0NiA4IDEyIDguODk1NDMgMTIgMTBDMTIgMTEuMTA0NiAxMS4xMDQ2IDEyIDEwIDEyWlwiLz5cbiAgICAgIDxwYXRoIGNsYXNzPVwiYml6eS1zaWRlYmFyX190YWJfX3N2Z19fcGF0aFwiIGQ9XCJNMTAgMThDOC44OTU0MyAxOCA4IDE3LjEwNDYgOCAxNkM4IDE0Ljg5NTQgOC44OTU0MyAxNCAxMCAxNEMxMS4xMDQ2IDE0IDEyIDE0Ljg5NTQgMTIgMTZDMTIgMTcuMTA0NiAxMS4xMDQ2IDE4IDEwIDE4WlwiLz5cbiAgICA8L3N2Zz5cbiAgPC9zcGFuPlxuXG4gIDxpbnB1dCBjbGFzcz1cImJpenktc2lkZWJhcl9fdG9nZ2xlXCIgaWQ9XCJiaXp5LXNpZGViYXItdG9nZ2xlXCIgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwidG9nZ2xlXCIvPlxuXG4gIDxzcGFuIGNsYXNzPVwiYml6eS1zaWRlYmFyX19jb250ZW50XCIgW25nQ2xhc3NdPVwieydiaXp5LXNpZGViYXJfX2NvbnRlbnQtLXNocmlua2VkJzogdG9nZ2xlfVwiPlxuXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9c3RhcnRdXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG4gIDwvc3Bhbj5cblxuICA8c3BhbiBjbGFzcz1cImJpenktc2lkZWJhcl9fY29udGVudFwiICBbbmdDbGFzc109XCJ7J2Jpenktc2lkZWJhcl9fY29udGVudC0tc2hyaW5rZWQnOiB0b2dnbGV9XCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1lbmRdXCI+PC9uZy1jb250ZW50PlxuXG4gIDwvc3Bhbj5cblxuPC9kaXY+XG4iXX0=