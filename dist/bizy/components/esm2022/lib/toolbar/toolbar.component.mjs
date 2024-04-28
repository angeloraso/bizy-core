import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyToolbarComponent {
    id = `bizy-toolbar-${Math.random()}`;
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyToolbarComponent, selector: "bizy-toolbar", inputs: { id: "id", customClass: "customClass" }, ngImport: i0, template: "<div id=\"{{id}}\" class=\"bizy-toolbar {{customClass}}\">\n\n    <span class=\"bizy-toolbar__start\">\n        \n        <ng-content select=\"[slot=start]\"></ng-content>\n\n    </span>\n\n    <span class=\"bizy-toolbar__end\">\n\n        <ng-content select=\"[slot=end]\"></ng-content>\n\n    </span>\n  \n\n</div>\n", styles: [":host{font-size:1rem}.bizy-toolbar{height:var(--bizy-toolbar-height);width:100%;background-color:var(--bizy-toolbar-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:1rem;padding:var(--bizy-toolbar-padding)}.bizy-toolbar__start{height:100%;display:flex;align-items:center;column-gap:.5rem}.bizy-toolbar__end{height:100%;display:flex;align-items:center;justify-content:flex-end;column-gap:.5rem}::ng-deep .anura-toolbar *[toolbar-option]{height:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toolbar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div id=\"{{id}}\" class=\"bizy-toolbar {{customClass}}\">\n\n    <span class=\"bizy-toolbar__start\">\n        \n        <ng-content select=\"[slot=start]\"></ng-content>\n\n    </span>\n\n    <span class=\"bizy-toolbar__end\">\n\n        <ng-content select=\"[slot=end]\"></ng-content>\n\n    </span>\n  \n\n</div>\n", styles: [":host{font-size:1rem}.bizy-toolbar{height:var(--bizy-toolbar-height);width:100%;background-color:var(--bizy-toolbar-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:1rem;padding:var(--bizy-toolbar-padding)}.bizy-toolbar__start{height:100%;display:flex;align-items:center;column-gap:.5rem}.bizy-toolbar__end{height:100%;display:flex;align-items:center;justify-content:flex-end;column-gap:.5rem}::ng-deep .anura-toolbar *[toolbar-option]{height:100%}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvdG9vbGJhci90b29sYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90b29sYmFyL3Rvb2xiYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRMUUsTUFBTSxPQUFPLG9CQUFvQjtJQUN0QixFQUFFLEdBQVcsZ0JBQWdCLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQzdDLFdBQVcsR0FBVyxFQUFFLENBQUM7d0dBRnZCLG9CQUFvQjs0RkFBcEIsb0JBQW9CLHNHQ1JqQyxnVUFnQkE7OzRGRFJhLG9CQUFvQjtrQkFOaEMsU0FBUzsrQkFDRSxjQUFjLG1CQUdQLHVCQUF1QixDQUFDLE1BQU07OEJBR3RDLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS10b29sYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Rvb2xiYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Rvb2xiYXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlUb29sYmFyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LXRvb2xiYXItJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbn0iLCI8ZGl2IGlkPVwie3tpZH19XCIgY2xhc3M9XCJiaXp5LXRvb2xiYXIge3tjdXN0b21DbGFzc319XCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktdG9vbGJhcl9fc3RhcnRcIj5cbiAgICAgICAgXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PXN0YXJ0XVwiPjwvbmctY29udGVudD5cblxuICAgIDwvc3Bhbj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS10b29sYmFyX19lbmRcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1lbmRdXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPC9zcGFuPlxuICBcblxuPC9kaXY+XG4iXX0=