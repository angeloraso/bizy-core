import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, Inject, ContentChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { FilterSectionRangeOptionComponent } from '../filter-section-range-option/filter-section-range-option.component';
import { FilterSectionCheckboxOptionComponent } from '../filter-section-checkbox-option/filter-section-checkbox-option.component';
import * as i0 from "@angular/core";
import * as i1 from "../../checkbox/checkbox.component";
export class FilterSectionComponent {
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FilterSectionComponent, selector: "bizy-filter-section", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect", onRange: "onRange" }, queries: [{ propertyName: "rangeOption", first: true, predicate: FilterSectionRangeOptionComponent, descendants: true }, { propertyName: "checkboxOptions", predicate: FilterSectionCheckboxOptionComponent }], ngImport: i0, template: "<div class=\"bizy-filter-section {{customClass}}\" id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section__header\">\n\n        <ng-content select=\"[filter-section-title]\"></ng-content>\n        <ng-content></ng-content>\n\n        <bizy-checkbox \n            class=\"bizy-filter-section__header__checkbox\"\n            (onSelect)=\"_onSelect()\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n\n        <button \n            type=\"button\"\n            class=\"bizy-filter-section__header__clear-button\"\n            (click)=\"onClear()\"\n            (keyup.enter)=\"onClear()\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"bizy-filter-section__header__clear-icon\">\n                <path d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\"/>\n            </svg>\n        </button>\n        \n    </span>\n\n    <span class=\"bizy-filter-section__options\">\n\n        <ng-content select=\"bizy-filter-section-checkbox-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-range-option\"></ng-content>\n        \n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__options{overflow-y:hidden!important}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.9rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;border:none;background-color:transparent;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;row-gap:.7rem;min-height:6rem;max-height:20rem;overflow-y:scroll;overflow-x:hidden}.bizy-filter-section__header__clear-button{width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;border:none;background-color:transparent;cursor:pointer}.bizy-filter-section__header__clear-icon{fill:var(--bizy-filter-section-clear-color, #e76565);pointer-events:none;height:1rem}\n"], dependencies: [{ kind: "component", type: i1.CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2ZpbHRlci9maWx0ZXItc2VjdGlvbi9maWx0ZXItc2VjdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uL2ZpbHRlci1zZWN0aW9uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQWEsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUN6SCxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSw0RUFBNEUsQ0FBQzs7O0FBUWxJLE1BQU0sT0FBTyxzQkFBc0I7SUFlTDtJQWRtQyxlQUFlLENBQWtEO0lBQ3ZFLFdBQVcsQ0FBb0M7SUFDL0YsRUFBRSxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNuQyxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDekIsUUFBUSxHQUFZLElBQUksQ0FBQztJQUN4QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQTBDLENBQUM7SUFDdEUsT0FBTyxHQUFHLElBQUksWUFBWSxFQUE0QyxDQUFDO0lBRWpGLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5DLFFBQVEs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aUM7Z0JBQ3RDLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbmplY3QsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGaWx0ZXJTZWN0aW9uUmFuZ2VPcHRpb25Db21wb25lbnQgfSBmcm9tICcuLi9maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb24vZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJTZWN0aW9uQ2hlY2tib3hPcHRpb25Db21wb25lbnQgfSBmcm9tICcuLi9maWx0ZXItc2VjdGlvbi1jaGVja2JveC1vcHRpb24vZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZmlsdGVyLXNlY3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLXNlY3Rpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbHRlci1zZWN0aW9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJTZWN0aW9uQ29tcG9uZW50IHtcbiAgQENvbnRlbnRDaGlsZHJlbihGaWx0ZXJTZWN0aW9uQ2hlY2tib3hPcHRpb25Db21wb25lbnQpIHByaXZhdGUgY2hlY2tib3hPcHRpb25zOiBRdWVyeUxpc3Q8RmlsdGVyU2VjdGlvbkNoZWNrYm94T3B0aW9uQ29tcG9uZW50PjtcbiAgQENvbnRlbnRDaGlsZChGaWx0ZXJTZWN0aW9uUmFuZ2VPcHRpb25Db21wb25lbnQpIHByaXZhdGUgcmFuZ2VPcHRpb246IEZpbHRlclNlY3Rpb25SYW5nZU9wdGlvbkNvbXBvbmVudDtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbiA9IHRydWU7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8e2lkOiBzdHJpbmcsIHNlbGVjdGVkOiBib29sZWFufT4+KCk7XG4gIEBPdXRwdXQoKSBvblJhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7bWluOiBudW1iZXIgfCBudWxsLCBtYXg6IG51bWJlciB8IG51bGx9PigpO1xuXG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgX29wdGlvbnM6IEFycmF5PHtpZDogc3RyaW5nLCBzZWxlY3RlZDogYm9vbGVhbn0+ID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2hlY2tib3hPcHRpb25zICYmIHRoaXMuY2hlY2tib3hPcHRpb25zLmxlbmd0aCA+IDApIHtcblxuICAgICAgICB0aGlzLmNoZWNrYm94T3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgICAgIHRoaXMuX29wdGlvbnMucHVzaCh7aWQ6IF9vcHRpb24uZ2V0SWQoKSwgc2VsZWN0ZWQ6IF9vcHRpb24uZ2V0U2VsZWN0ZWQoKX0pXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5fb3B0aW9ucy5maWx0ZXIoX29wdGlvbiA9PiBfb3B0aW9uLnNlbGVjdGVkID09PSB0cnVlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPT09IHRoaXMuX29wdGlvbnMubGVuZ3RoO1xuICBcbiAgICAgICAgdGhpcy5jaGVja2JveE9wdGlvbnMuZm9yRWFjaChfb3B0aW9uID0+IHtcblxuICAgICAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQoX29wdGlvbi5vblNlbGVjdC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX29wdGlvbnMuZmluZEluZGV4KF9vcHRpb24gPT4gX29wdGlvbi5pZCA9PT0gZGF0YS5pZCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgIHRoaXMuX29wdGlvbnNbaW5kZXhdID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5fb3B0aW9ucy5maWx0ZXIoX29wdGlvbiA9PiBfb3B0aW9uLnNlbGVjdGVkID09PSB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZE9wdGlvbnMubGVuZ3RoID09PSB0aGlzLl9vcHRpb25zLmxlbmd0aDtcblxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMuX29wdGlvbnMpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmFuZ2VPcHRpb24pIHtcbiAgICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnJhbmdlT3B0aW9uLm9uQ2hhbmdlLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5yYW5nZU9wdGlvbi5nZXRTZWxlY3RlZCgpO1xuICAgICAgICAgIHRoaXMub25SYW5nZS5lbWl0KGRhdGEpO1xuICAgICAgICB9KSk7XG4gICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH1cblxuICBfb25TZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yYW5nZU9wdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcblxuICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLl9vcHRpb25zLm1hcChfb3B0aW9uID0+IHtcbiAgICAgIHJldHVybiB7Li4uX29wdGlvbiwgc2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWR9O1xuICAgIH0pXG5cbiAgICB0aGlzLmNoZWNrYm94T3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgX29wdGlvbi5zZXRTZWxlY3QodGhpcy5zZWxlY3RlZCk7XG4gICAgfSlcbiAgfVxuXG4gIG9uQ2xlYXIoKSB7XG4gICAgaWYgKCF0aGlzLnJhbmdlT3B0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5yYW5nZU9wdGlvbi5vbkNsZWFyKCk7XG4gIH1cblxuICBnZXRTZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxuXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn0iLCI8ZGl2IGNsYXNzPVwiYml6eS1maWx0ZXItc2VjdGlvbiB7e2N1c3RvbUNsYXNzfX1cIiBpZD1cInt7aWR9fVwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uX19oZWFkZXJcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbZmlsdGVyLXNlY3Rpb24tdGl0bGVdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbiAgICAgICAgPGJpenktY2hlY2tib3ggXG4gICAgICAgICAgICBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb25fX2hlYWRlcl9fY2hlY2tib3hcIlxuICAgICAgICAgICAgKG9uU2VsZWN0KT1cIl9vblNlbGVjdCgpXCJcbiAgICAgICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgPC9iaXp5LWNoZWNrYm94PlxuXG4gICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYml6eS1maWx0ZXItc2VjdGlvbl9faGVhZGVyX19jbGVhci1idXR0b25cIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xlYXIoKVwiXG4gICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwib25DbGVhcigpXCI+XG4gICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIiBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb25fX2hlYWRlcl9fY2xlYXItaWNvblwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTM1LjIgMTcuN0MxNDAuNiA2LjggMTUxLjcgMCAxNjMuOCAwSDI4NC4yYzEyLjEgMCAyMy4yIDYuOCAyOC42IDE3LjdMMzIwIDMyaDk2YzE3LjcgMCAzMiAxNC4zIDMyIDMycy0xNC4zIDMyLTMyIDMySDMyQzE0LjMgOTYgMCA4MS43IDAgNjRTMTQuMyAzMiAzMiAzMmg5Nmw3LjItMTQuM3pNMzIgMTI4SDQxNlY0NDhjMCAzNS4zLTI4LjcgNjQtNjQgNjRIOTZjLTM1LjMgMC02NC0yOC43LTY0LTY0VjEyOHptOTYgNjRjLTguOCAwLTE2IDcuMi0xNiAxNlY0MzJjMCA4LjggNy4yIDE2IDE2IDE2czE2LTcuMiAxNi0xNlYyMDhjMC04LjgtNy4yLTE2LTE2LTE2em05NiAwYy04LjggMC0xNiA3LjItMTYgMTZWNDMyYzAgOC44IDcuMiAxNiAxNiAxNnMxNi03LjIgMTYtMTZWMjA4YzAtOC44LTcuMi0xNi0xNi0xNnptOTYgMGMtOC44IDAtMTYgNy4yLTE2IDE2VjQzMmMwIDguOCA3LjIgMTYgMTYgMTZzMTYtNy4yIDE2LTE2VjIwOGMwLTguOC03LjItMTYtMTYtMTZ6XCIvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBcbiAgICA8L3NwYW4+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb25fX29wdGlvbnNcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LWZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvblwiPjwvbmctY29udGVudD5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LWZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvblwiPjwvbmctY29udGVudD5cbiAgICAgICAgXG4gICAgPC9zcGFuPlxuXG48L2Rpdj4iXX0=