import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BIZY_TAG_TYPE } from './tag.types';
import * as i0 from "@angular/core";
export class BizyTagComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWcvdGFnLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWcvdGFnLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQVE1QyxNQUFNLE9BQU8sZ0JBQWdCO0lBQ2xCLEVBQUUsR0FBVyxZQUFZLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQ3pDLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDekIsSUFBSSxHQUFrQixhQUFhLENBQUMsT0FBTyxDQUFDO0lBQzNDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQzt3R0FKM0MsZ0JBQWdCOzRGQUFoQixnQkFBZ0IsbUpDVDdCLDhPQVNTOzs0RkRBSSxnQkFBZ0I7a0JBTjVCLFNBQVM7K0JBQ0UsVUFBVSxtQkFHSCx1QkFBdUIsQ0FBQyxNQUFNOzhCQUd0QyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJJWllfVEFHX1RZUEUgfSBmcm9tICcuL3RhZy50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktdGFnJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFnLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5VGFnQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LXRhZy0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB0eXBlOiBCSVpZX1RBR19UWVBFID0gQklaWV9UQUdfVFlQRS5ERUZBVUxUO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcbn1cbiIsIjxidXR0b24gXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgW2lkXT1cImlkXCJcbiAgICBjbGFzcz1cImJpenktdGFnIGJpenktdGFnLS17e3R5cGV9fSB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIChjbGljayk9XCJvblNlbGVjdC5lbWl0KCRldmVudClcIlxuICAgIChrZXl1cC5lbnRlcik9XCJvblNlbGVjdC5lbWl0KCRldmVudClcIj5cblxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuPC9idXR0b24+Il19