import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class SidebarHeaderComponent {
    customClass;
    onSelect = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SidebarHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: SidebarHeaderComponent, selector: "bizy-sidebar-header", inputs: { customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n  type=\"button\"\n  class=\"bizy-sidebar-header {{customClass}}\"\n  (click)=\"onSelect.emit($event)\"\n  (keyup.enter)=\"onSelect.emit($event)\">\n\n  <ng-content></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-sidebar-header{background:transparent;border:none}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SidebarHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n  type=\"button\"\n  class=\"bizy-sidebar-header {{customClass}}\"\n  (click)=\"onSelect.emit($event)\"\n  (keyup.enter)=\"onSelect.emit($event)\">\n\n  <ng-content></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-sidebar-header{background:transparent;border:none}\n"] }]
        }], propDecorators: { customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1oZWFkZXIvc2lkZWJhci1oZWFkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1oZWFkZXIvc2lkZWJhci1oZWFkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVFoRyxNQUFNLE9BQU8sc0JBQXNCO0lBQ3hCLFdBQVcsQ0FBUztJQUNuQixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQzt3R0FGbkMsc0JBQXNCOzRGQUF0QixzQkFBc0Isc0lDUm5DLDJNQVFTOzs0RkRBSSxzQkFBc0I7a0JBTmxDLFNBQVM7K0JBQ0UscUJBQXFCLG1CQUdkLHVCQUF1QixDQUFDLE1BQU07OEJBR3RDLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXNpZGViYXItaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZGViYXItaGVhZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaWRlYmFyLWhlYWRlci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgU2lkZWJhckhlYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbn0iLCI8YnV0dG9uIFxuICB0eXBlPVwiYnV0dG9uXCJcbiAgY2xhc3M9XCJiaXp5LXNpZGViYXItaGVhZGVyIHt7Y3VzdG9tQ2xhc3N9fVwiXG4gIChjbGljayk9XCJvblNlbGVjdC5lbWl0KCRldmVudClcIlxuICAoa2V5dXAuZW50ZXIpPVwib25TZWxlY3QuZW1pdCgkZXZlbnQpXCI+XG5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG48L2J1dHRvbj4iXX0=