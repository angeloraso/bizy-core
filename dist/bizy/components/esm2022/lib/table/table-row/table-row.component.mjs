import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ChangeDetectorRef, Inject, ContentChildren } from '@angular/core';
import { BizyTableColumnComponent } from '../table-column/table-column.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../checkbox/checkbox.component";
import * as i3 from "../../accordion/accordion.component";
export class BizyTableRowComponent {
    ref;
    columns;
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
    setMarginLeft(margin) {
        if (this.columns.length === 0) {
            return;
        }
        this.columns.forEach(_column => {
            _column.setMarginLeft(margin);
            this.ref.detectChanges();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableRowComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableRowComponent, selector: "bizy-table-row", inputs: { id: "id", customClass: "customClass", disabled: "disabled", selected: "selected", opened: "opened", selectable: "selectable" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect", openedChange: "openedChange", onOpen: "onOpen" }, queries: [{ propertyName: "columns", predicate: BizyTableColumnComponent }], ngImport: i0, template: "<bizy-accordion \n    class=\"bizy-table-row__accordion\"\n    customClass=\"bizy-table-row__accordion {{disabled ? 'bizy-table-row--disabled' : ''}} {{selected ? 'bizy-table-row--selected' : ''}} {{opened ? 'bizy-table-row--opened' : ''}}\"\n    [(opened)]=\"opened\"\n    (onSelect)=\"_onOpen($event)\">\n\n    <button\n        type=\"button\"\n        [id]=\"id\"\n        class=\"bizy-table-row {{customClass}}\"\n        (click)=\"selectedChange.emit(!selected)\"\n        (keyup.enter)=\"selectedChange.emit(!selected)\"\n        [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n        <ng-content select=\"bizy-table-column\"></ng-content>\n\n        <bizy-checkbox \n            *ngIf=\"selectable !== null\"\n            class=\"bizy-table-row__checkbox\"\n            [ngStyle]=\"{right: marginRight + 'px'}\"\n            [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event); $event.stopPropagation()\">\n        </bizy-checkbox>\n        \n    </button>\n\n    <ng-content accordion-option select=\"bizy-table-row-expand-content\"></ng-content>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;width:100%;background-color:var(--bizy-table-row-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;margin-bottom:.1rem}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row__accordion:hover ::ng-deep .bizy-table-row:before{opacity:1}::ng-deep .bizy-table-row__accordion{padding:0!important;--bizy-accordion-background-color: var(--bizy-table-row-background-color);--bizy-accordion-padding-left: 0}::ng-deep .bizy-table-row__accordion .bizy-accordion__options{--bizy-accordion-padding-left: 0}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:-moz-fit-content;height:fit-content;border:none;min-height:var(--bizy-table-row-height);background-color:inherit;border-bottom:inherit}::ng-deep .bizy-table-row:before{content:\"\";position:absolute;inset:0;background-color:var(--bizy-table-row-hover-background-color);opacity:0;pointer-events:none;z-index:1}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color)!important}:host(:has(bizy-table-row-expand-content)) ::ng-deep .bizy-table-row--opened{background-color:var(--bizy-table-row-opened-background-color)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }, { kind: "component", type: i3.BizyAccordionComponent, selector: "bizy-accordion", inputs: ["id", "customClass", "disabled", "opened"], outputs: ["openedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-accordion \n    class=\"bizy-table-row__accordion\"\n    customClass=\"bizy-table-row__accordion {{disabled ? 'bizy-table-row--disabled' : ''}} {{selected ? 'bizy-table-row--selected' : ''}} {{opened ? 'bizy-table-row--opened' : ''}}\"\n    [(opened)]=\"opened\"\n    (onSelect)=\"_onOpen($event)\">\n\n    <button\n        type=\"button\"\n        [id]=\"id\"\n        class=\"bizy-table-row {{customClass}}\"\n        (click)=\"selectedChange.emit(!selected)\"\n        (keyup.enter)=\"selectedChange.emit(!selected)\"\n        [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n        <ng-content select=\"bizy-table-column\"></ng-content>\n\n        <bizy-checkbox \n            *ngIf=\"selectable !== null\"\n            class=\"bizy-table-row__checkbox\"\n            [ngStyle]=\"{right: marginRight + 'px'}\"\n            [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event); $event.stopPropagation()\">\n        </bizy-checkbox>\n        \n    </button>\n\n    <ng-content accordion-option select=\"bizy-table-row-expand-content\"></ng-content>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;width:100%;background-color:var(--bizy-table-row-background-color);display:flex;min-width:-moz-fit-content;min-width:fit-content;margin-bottom:.1rem}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row__accordion:hover ::ng-deep .bizy-table-row:before{opacity:1}::ng-deep .bizy-table-row__accordion{padding:0!important;--bizy-accordion-background-color: var(--bizy-table-row-background-color);--bizy-accordion-padding-left: 0}::ng-deep .bizy-table-row__accordion .bizy-accordion__options{--bizy-accordion-padding-left: 0}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:-moz-fit-content;height:fit-content;border:none;min-height:var(--bizy-table-row-height);background-color:inherit;border-bottom:inherit}::ng-deep .bizy-table-row:before{content:\"\";position:absolute;inset:0;background-color:var(--bizy-table-row-hover-background-color);opacity:0;pointer-events:none;z-index:1}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color)!important}:host(:has(bizy-table-row-expand-content)) ::ng-deep .bizy-table-row--opened{background-color:var(--bizy-table-row-opened-background-color)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { columns: [{
                type: ContentChildren,
                args: [BizyTableColumnComponent]
            }], id: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1yb3cvdGFibGUtcm93LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1yb3cvdGFibGUtcm93Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3ZKLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOzs7OztBQVFsRixNQUFNLE9BQU8scUJBQXFCO0lBZ0JLO0lBZk0sT0FBTyxDQUFzQztJQUMvRSxFQUFFLEdBQVcsa0JBQWtCLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQy9DLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDekIsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLE1BQU0sR0FBWSxLQUFLLENBQUM7SUFDeEIsVUFBVSxHQUFtQixJQUFJLENBQUM7SUFDakMsY0FBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFDN0MsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDO0lBQzVDLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBQzNDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUVwRCxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBRWhCLFlBQ3FDLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQ3hELENBQUM7SUFFSixPQUFPLENBQUMsS0FBbUI7UUFDekIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxLQUFLLEdBQUcsR0FBVyxFQUFFO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUE7SUFFRCxXQUFXLEdBQUcsR0FBWSxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDLENBQUE7SUFFRCxhQUFhLEdBQUcsQ0FBQyxVQUFtQixFQUFRLEVBQUU7UUFDNUMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtZQUM3QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxDQUFDLFFBQWlCLEVBQVEsRUFBRTtRQUN4QyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQzdCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFBO0lBRUQsY0FBYyxDQUFDLE1BQWM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFjO1FBQzFCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7d0dBckVVLHFCQUFxQixrQkFnQnRCLGlCQUFpQjs0RkFoQmhCLHFCQUFxQiw2VUFDZix3QkFBd0IsNkJDVjNDLHUyQ0ErQmlCOzs0RkR0QkoscUJBQXFCO2tCQU5qQyxTQUFTOytCQUNFLGdCQUFnQixtQkFHVCx1QkFBdUIsQ0FBQyxNQUFNOzswQkFrQjVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQWZnQixPQUFPO3NCQUFqRCxlQUFlO3VCQUFDLHdCQUF3QjtnQkFDaEMsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNJLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLWNvbHVtbi90YWJsZS1jb2x1bW4uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS10YWJsZS1yb3cnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUtcm93Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS1yb3cuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlUYWJsZVJvd0NvbXBvbmVudCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eVRhYmxlQ29sdW1uQ29tcG9uZW50KSBjb2x1bW5zOiBRdWVyeUxpc3Q8Qml6eVRhYmxlQ29sdW1uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LXRhYmxlLXJvdy0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2VsZWN0YWJsZTogYm9vbGVhbiB8IG51bGwgPSBudWxsO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuICBAT3V0cHV0KCkgb3BlbmVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgb25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG5cbiAgbWFyZ2luUmlnaHQgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgX29uT3BlbihldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KCF0aGlzLm9wZW5lZCk7XG4gICAgdGhpcy5vbk9wZW4uZW1pdChldmVudCk7XG4gIH1cblxuICBnZXRJZCA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gIH1cblxuICBzZXRTZWxlY3RhYmxlID0gKHNlbGVjdGFibGU6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy5zZWxlY3RhYmxlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0YWJsZSA9IHNlbGVjdGFibGU7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWQgPSAoc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy5zZWxlY3RhYmxlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBzZXRNYXJnaW5SaWdodChtYXJnaW46IG51bWJlcikge1xuICAgIHRoaXMubWFyZ2luUmlnaHQgPSBtYXJnaW4gLSA1O1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNldE1hcmdpbkxlZnQobWFyZ2luOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5jb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKF9jb2x1bW4gPT4ge1xuICAgICAgX2NvbHVtbi5zZXRNYXJnaW5MZWZ0KG1hcmdpbik7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSlcbiAgfVxufSIsIjxiaXp5LWFjY29yZGlvbiBcbiAgICBjbGFzcz1cImJpenktdGFibGUtcm93X19hY2NvcmRpb25cIlxuICAgIGN1c3RvbUNsYXNzPVwiYml6eS10YWJsZS1yb3dfX2FjY29yZGlvbiB7e2Rpc2FibGVkID8gJ2JpenktdGFibGUtcm93LS1kaXNhYmxlZCcgOiAnJ319IHt7c2VsZWN0ZWQgPyAnYml6eS10YWJsZS1yb3ctLXNlbGVjdGVkJyA6ICcnfX0ge3tvcGVuZWQgPyAnYml6eS10YWJsZS1yb3ctLW9wZW5lZCcgOiAnJ319XCJcbiAgICBbKG9wZW5lZCldPVwib3BlbmVkXCJcbiAgICAob25TZWxlY3QpPVwiX29uT3BlbigkZXZlbnQpXCI+XG5cbiAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBbaWRdPVwiaWRcIlxuICAgICAgICBjbGFzcz1cImJpenktdGFibGUtcm93IHt7Y3VzdG9tQ2xhc3N9fVwiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RlZENoYW5nZS5lbWl0KCFzZWxlY3RlZClcIlxuICAgICAgICAoa2V5dXAuZW50ZXIpPVwic2VsZWN0ZWRDaGFuZ2UuZW1pdCghc2VsZWN0ZWQpXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydiaXp5LXRhYmxlLXJvdy0tZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ2JpenktdGFibGUtcm93LS1zZWxlY3RlZCc6IHNlbGVjdGVkfVwiPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtY29sdW1uXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICAgIDxiaXp5LWNoZWNrYm94IFxuICAgICAgICAgICAgKm5nSWY9XCJzZWxlY3RhYmxlICE9PSBudWxsXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYml6eS10YWJsZS1yb3dfX2NoZWNrYm94XCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cIntyaWdodDogbWFyZ2luUmlnaHQgKyAncHgnfVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J2JpenktdGFibGUtcm93X19jaGVja2JveC0taGlkZGVuJzogc2VsZWN0YWJsZSA9PT0gZmFsc2UsICdiaXp5LXRhYmxlLXJvd19fY2hlY2tib3gtLXNoYWRvdyc6IG1hcmdpblJpZ2h0ID4gMH1cIlxuICAgICAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwic2VsZWN0ZWRDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChvblNlbGVjdCk9XCJvblNlbGVjdC5lbWl0KCRldmVudCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgICAgICA8L2JpenktY2hlY2tib3g+XG4gICAgICAgIFxuICAgIDwvYnV0dG9uPlxuXG4gICAgPG5nLWNvbnRlbnQgYWNjb3JkaW9uLW9wdGlvbiBzZWxlY3Q9XCJiaXp5LXRhYmxlLXJvdy1leHBhbmQtY29udGVudFwiPjwvbmctY29udGVudD5cblxuPC9iaXp5LWFjY29yZGlvbj4iXX0=