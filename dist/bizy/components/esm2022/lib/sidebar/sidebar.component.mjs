import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, Inject, ChangeDetectorRef } from '@angular/core';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizySidebarComponent {
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
                const option = this.#getSelected(this.options.toArray());
                if (option) {
                    this.#unselect(this.options.toArray());
                    this.#select(this.options.toArray(), option);
                }
                this.#listenOptionChanges(this.options.toArray());
            }
            if (this.floatingOptions && (this.#floatingOptions.length !== 0 || this.floatingOptions.length !== 0) && !this.#optionsAreEqual(this.#floatingOptions, this.floatingOptions.toArray())) {
                this.#floatingOptions = this.floatingOptions.toArray();
                const option = this.#getSelected(this.floatingOptions.toArray());
                if (option) {
                    this.#unselect(this.floatingOptions.toArray());
                    this.#select(this.floatingOptions.toArray(), option);
                }
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
                    this.#select(this.options.toArray(), _option);
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
    #getSelected(options) {
        let selectedOption = null;
        if (!options || options.length === 0) {
            return null;
        }
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedOption = options[i];
                break;
            }
            if (options[i].options) {
                selectedOption = this.#getSelected(options[i].options.toArray());
                if (selectedOption) {
                    break;
                }
            }
        }
        return selectedOption;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarComponent, selector: "bizy-sidebar", inputs: { toggle: "toggle" }, outputs: { onToggle: "onToggle" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }, { propertyName: "floatingOptions", predicate: BizySidebarFloatingOptionComponent }], ngImport: i0, template: "<div class=\"bizy-sidebar\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"toggle = !toggle; onToggle.emit(toggle)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"toggle\"/>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__top\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__bottom\"  [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width)}.bizy-sidebar{width:-moz-fit-content;width:fit-content;height:100%;max-height:100vh;background-color:var(--bizy-sidebar-background-color);position:relative;transition:width .3s ease;display:grid;grid-template-columns:100%;grid-template-rows:auto 1fr auto}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__top{overflow:hidden;align-self:start}.bizy-sidebar__bottom{overflow:hidden;align-self:end}.bizy-sidebar__content{display:flex;min-height:var(--bizy-sidebar-section-min-height);width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding-left:.5rem;overflow-x:hidden;transition:width .3s ease}.bizy-sidebar__content--shrinked{padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-option-selected-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-sidebar\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"toggle = !toggle; onToggle.emit(toggle)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"toggle\"/>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__top\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__bottom\"  [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width)}.bizy-sidebar{width:-moz-fit-content;width:fit-content;height:100%;max-height:100vh;background-color:var(--bizy-sidebar-background-color);position:relative;transition:width .3s ease;display:grid;grid-template-columns:100%;grid-template-rows:auto 1fr auto}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__top{overflow:hidden;align-self:start}.bizy-sidebar__bottom{overflow:hidden;align-self:end}.bizy-sidebar__content{display:flex;min-height:var(--bizy-sidebar-section-min-height);width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding-left:.5rem;overflow-x:hidden;transition:width .3s ease}.bizy-sidebar__content--shrinked{padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-option-selected-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zaWRlYmFyL3NpZGViYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBYSxNQUFNLEVBQUUsaUJBQWlCLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sNkRBQTZELENBQUM7OztBQVFqSCxNQUFNLE9BQU8sb0JBQW9CO0lBWU07SUFDVDtJQVppQixPQUFPLENBQXlDO0lBQ3hDLGVBQWUsQ0FBaUQ7SUFDNUcsTUFBTSxHQUFZLEtBQUssQ0FBQztJQUN2QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUVqRCxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNuQyxpQkFBaUIsQ0FBbUI7SUFDcEMsUUFBUSxHQUFzQyxFQUFFLENBQUM7SUFDakQsZ0JBQWdCLEdBQThDLEVBQUUsQ0FBQztJQUVqRSxZQUNxQyxHQUFzQixFQUMvQixRQUFrQjtRQURULFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDM0MsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsaUJBQWlCLEdBQUcs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QU07c0JBQWQsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zaWRlYmFyLW9wdGlvbi9zaWRlYmFyLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi9zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXNpZGViYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vc2lkZWJhci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZWJhci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eVNpZGViYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAQ29udGVudENoaWxkcmVuKEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50KSBvcHRpb25zITogUXVlcnlMaXN0PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50PjtcbiAgQENvbnRlbnRDaGlsZHJlbihCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50KSBmbG9hdGluZ09wdGlvbnMhOiBRdWVyeUxpc3Q8Qml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudD47XG4gIEBJbnB1dCgpIHRvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgb25Ub2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7IFxuXG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAjb3B0aW9uczogQXJyYXk8Qml6eVNpZGViYXJPcHRpb25Db21wb25lbnQ+ID0gW107XG4gICNmbG9hdGluZ09wdGlvbnM6IEFycmF5PEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQ+ID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiAodGhpcy4jb3B0aW9ucy5sZW5ndGggIT09IDAgfHwgdGhpcy5vcHRpb25zLmxlbmd0aCAhPT0gMCkgJiYgIXRoaXMuI29wdGlvbnNBcmVFcXVhbCh0aGlzLiNvcHRpb25zLCB0aGlzLm9wdGlvbnMudG9BcnJheSgpKSkge1xuICAgICAgICB0aGlzLiNvcHRpb25zID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgICBjb25zdCBvcHRpb24gPSB0aGlzLiNnZXRTZWxlY3RlZCh0aGlzLm9wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgIHRoaXMuI3Vuc2VsZWN0KHRoaXMub3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgICAgIHRoaXMuI3NlbGVjdCh0aGlzLm9wdGlvbnMudG9BcnJheSgpLCBvcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4jbGlzdGVuT3B0aW9uQ2hhbmdlcyh0aGlzLm9wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZmxvYXRpbmdPcHRpb25zICYmICh0aGlzLiNmbG9hdGluZ09wdGlvbnMubGVuZ3RoICE9PSAwIHx8IHRoaXMuZmxvYXRpbmdPcHRpb25zLmxlbmd0aCAhPT0gMCkgJiYgIXRoaXMuI29wdGlvbnNBcmVFcXVhbCh0aGlzLiNmbG9hdGluZ09wdGlvbnMsIHRoaXMuZmxvYXRpbmdPcHRpb25zLnRvQXJyYXkoKSkpIHtcbiAgICAgICAgdGhpcy4jZmxvYXRpbmdPcHRpb25zID0gdGhpcy5mbG9hdGluZ09wdGlvbnMudG9BcnJheSgpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuI2dldFNlbGVjdGVkKHRoaXMuZmxvYXRpbmdPcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICAgIGlmIChvcHRpb24pIHtcbiAgICAgICAgICB0aGlzLiN1bnNlbGVjdCh0aGlzLmZsb2F0aW5nT3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgICAgIHRoaXMuI3NlbGVjdCh0aGlzLmZsb2F0aW5nT3B0aW9ucy50b0FycmF5KCksIG9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiNsaXN0ZW5GbG9hdGluZ09wdGlvbkNoYW5nZXModGhpcy5mbG9hdGluZ09wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH1cblxuICAjbGlzdGVuT3B0aW9uQ2hhbmdlcyA9IChvcHRpb25zOiBBcnJheTxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD4pID0+IHtcbiAgICBvcHRpb25zLmZvckVhY2goX29wdGlvbiA9PiB7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKF9vcHRpb24ub25TZWxlY3Quc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKF9vcHRpb24uZ2V0U2VsZWN0ZWQoKSkge1xuICAgICAgICAgIHRoaXMuI3NlbGVjdCh0aGlzLm9wdGlvbnMudG9BcnJheSgpLCBfb3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiN1bnNlbGVjdCh0aGlzLm9wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgICAgICB0aGlzLiNzZWxlY3QodGhpcy5vcHRpb25zLnRvQXJyYXkoKSwgX29wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSkpO1xuXG4gICAgICBpZiAoX29wdGlvbi5vcHRpb25zICYmIF9vcHRpb24ub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuI2xpc3Rlbk9wdGlvbkNoYW5nZXMoX29wdGlvbi5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAjbGlzdGVuRmxvYXRpbmdPcHRpb25DaGFuZ2VzID0gKG9wdGlvbnM6IEFycmF5PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50PiB8IEFycmF5PEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQ+KSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZChfb3B0aW9uLm9uU2VsZWN0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmIChfb3B0aW9uLmdldFNlbGVjdGVkKCkpIHtcbiAgICAgICAgICB0aGlzLiNzZWxlY3QodGhpcy5vcHRpb25zLnRvQXJyYXkoKSwgX29wdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy4jdW5zZWxlY3QodGhpcy5mbG9hdGluZ09wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgICAgICB0aGlzLiNzZWxlY3QodGhpcy5mbG9hdGluZ09wdGlvbnMudG9BcnJheSgpLCBfb3B0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KSk7XG5cbiAgICAgIGlmIChfb3B0aW9uLm9wdGlvbnMgJiYgX29wdGlvbi5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy4jbGlzdGVuRmxvYXRpbmdPcHRpb25DaGFuZ2VzKF9vcHRpb24ub3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgI3NlbGVjdCA9IChvcHRpb25zOiBBcnJheTxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD4gfCBBcnJheTxCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50Piwgb3B0aW9uOiBCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudCB8IEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQpOiBib29sZWFuID0+IHtcbiAgICBsZXQgb3B0aW9uU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBvcHRpb25zLmZvckVhY2goX29wdGlvbiA9PiB7XG4gICAgICBpZiAoX29wdGlvbi5nZXRJZCgpID09PSBvcHRpb24uZ2V0SWQoKSkge1xuICAgICAgICBpZiAoX29wdGlvbi5vcHRpb25zICYmIF9vcHRpb24ub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgb3B0aW9uLnNldFNlbGVjdGVkKCFfb3B0aW9uLmdldFNlbGVjdGVkKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbi5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAoX29wdGlvbi5vcHRpb25zICYmIF9vcHRpb24ub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IF9vcHRpb25TZWxlY3RlZCA9IHRoaXMuI3NlbGVjdChfb3B0aW9uLm9wdGlvbnMudG9BcnJheSgpLCBvcHRpb24pO1xuICAgICAgICBpZiAoX29wdGlvblNlbGVjdGVkKSB7XG4gICAgICAgICAgb3B0aW9uU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIF9vcHRpb24uc2V0U2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb3B0aW9uU2VsZWN0ZWQ7XG4gIH07XG5cbiAgI3Vuc2VsZWN0ID0gKG9wdGlvbnM6IEFycmF5PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50PiB8IEFycmF5PEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQ+KSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgX29wdGlvbi5zZXRTZWxlY3RlZChmYWxzZSk7XG4gICAgICBpZiAoX29wdGlvbi5vcHRpb25zICYmIF9vcHRpb24ub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuI3Vuc2VsZWN0KF9vcHRpb24ub3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gICNvcHRpb25zQXJlRXF1YWwoYXJyMTogQXJyYXk8Qml6eVNpZGViYXJPcHRpb25Db21wb25lbnQ+IHwgQXJyYXk8Qml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudD4sIGFycjI6IEFycmF5PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50PiB8IEFycmF5PEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQ+KSB7XG4gICAgaWYgKGFycjEubGVuZ3RoICE9PSBhcnIyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYXJyMS5zb3J0KChhLCBiKSA9PiBhLmlkLmxvY2FsZUNvbXBhcmUoYi5pZCkpO1xuICAgIGFycjIuc29ydCgoYSwgYikgPT4gYS5pZC5sb2NhbGVDb21wYXJlKGIuaWQpKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXJyMVtpXSkge1xuICAgICAgICAgICAgaWYgKGFycjFbaV1ba2V5XSAhPT0gYXJyMltpXVtrZXldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAjZ2V0U2VsZWN0ZWQob3B0aW9uczogQXJyYXk8Qml6eVNpZGViYXJPcHRpb25Db21wb25lbnQ+IHwgQXJyYXk8Qml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudD4pOiBCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudCB8IEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQgfCBudWxsIHtcbiAgICBsZXQgc2VsZWN0ZWRPcHRpb246IEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50IHwgQml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudCB8IG51bGwgPSBudWxsO1xuICAgIGlmICghb3B0aW9ucyB8fCBvcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAob3B0aW9uc1tpXS5zZWxlY3RlZCkge1xuICAgICAgICBzZWxlY3RlZE9wdGlvbiA9IG9wdGlvbnNbaV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9uc1tpXS5vcHRpb25zKSB7XG4gICAgICAgIHNlbGVjdGVkT3B0aW9uID0gdGhpcy4jZ2V0U2VsZWN0ZWQob3B0aW9uc1tpXS5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICAgIGlmIChzZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGVkT3B0aW9uO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxufSIsIjxkaXYgY2xhc3M9XCJiaXp5LXNpZGViYXJcIj5cblxuICA8c3BhbiBjbGFzcz1cImJpenktc2lkZWJhcl9fdGFiXCIgaWQ9XCJiaXp5LXNpZGViYXItdGFiXCIgKGNsaWNrKT1cInRvZ2dsZSA9ICF0b2dnbGU7IG9uVG9nZ2xlLmVtaXQodG9nZ2xlKVwiPlxuICAgIDxzdmcgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiYml6eS1zaWRlYmFyX190YWJfX3N2Z1wiPlxuICAgICAgPHBhdGggY2xhc3M9XCJiaXp5LXNpZGViYXJfX3RhYl9fc3ZnX19wYXRoXCIgZD1cIk0xMCA2QzguODk1NDMgNiA4IDUuMTA0NTcgOCA0QzggMi44OTU0MyA4Ljg5NTQzIDIgMTAgMkMxMS4xMDQ2IDIgMTIgMi44OTU0MyAxMiA0QzEyIDUuMTA0NTcgMTEuMTA0NiA2IDEwIDZaXCIvPlxuICAgICAgPHBhdGggY2xhc3M9XCJiaXp5LXNpZGViYXJfX3RhYl9fc3ZnX19wYXRoXCIgZD1cIk0xMCAxMkM4Ljg5NTQzIDEyIDggMTEuMTA0NiA4IDEwQzggOC44OTU0MyA4Ljg5NTQzIDggMTAgOEMxMS4xMDQ2IDggMTIgOC44OTU0MyAxMiAxMEMxMiAxMS4xMDQ2IDExLjEwNDYgMTIgMTAgMTJaXCIvPlxuICAgICAgPHBhdGggY2xhc3M9XCJiaXp5LXNpZGViYXJfX3RhYl9fc3ZnX19wYXRoXCIgZD1cIk0xMCAxOEM4Ljg5NTQzIDE4IDggMTcuMTA0NiA4IDE2QzggMTQuODk1NCA4Ljg5NTQzIDE0IDEwIDE0QzExLjEwNDYgMTQgMTIgMTQuODk1NCAxMiAxNkMxMiAxNy4xMDQ2IDExLjEwNDYgMTggMTAgMThaXCIvPlxuICAgIDwvc3ZnPlxuICA8L3NwYW4+XG5cbiAgPGlucHV0IGNsYXNzPVwiYml6eS1zaWRlYmFyX190b2dnbGVcIiBpZD1cImJpenktc2lkZWJhci10b2dnbGVcIiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJ0b2dnbGVcIi8+XG5cbiAgPHNwYW4gY2xhc3M9XCJiaXp5LXNpZGViYXJfX2NvbnRlbnQgYml6eS1zaWRlYmFyX190b3BcIiBbbmdDbGFzc109XCJ7J2Jpenktc2lkZWJhcl9fY29udGVudC0tc2hyaW5rZWQnOiB0b2dnbGV9XCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1zdGFydF1cIj48L25nLWNvbnRlbnQ+XG5cbiAgPC9zcGFuPlxuXG4gIDxzcGFuIGNsYXNzPVwiYml6eS1zaWRlYmFyX19jb250ZW50XCIgW25nQ2xhc3NdPVwieydiaXp5LXNpZGViYXJfX2NvbnRlbnQtLXNocmlua2VkJzogdG9nZ2xlfVwiPlxuXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9c3RhcnRdXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG4gIDwvc3Bhbj5cblxuICA8c3BhbiBjbGFzcz1cImJpenktc2lkZWJhcl9fY29udGVudCBiaXp5LXNpZGViYXJfX2JvdHRvbVwiICBbbmdDbGFzc109XCJ7J2Jpenktc2lkZWJhcl9fY29udGVudC0tc2hyaW5rZWQnOiB0b2dnbGV9XCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1lbmRdXCI+PC9uZy1jb250ZW50PlxuXG4gIDwvc3Bhbj5cblxuPC9kaXY+XG4iXX0=