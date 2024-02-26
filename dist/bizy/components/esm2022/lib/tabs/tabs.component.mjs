import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class TabsComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvdGFicy90YWJzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJzL3RhYnMuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRMUUsTUFBTSxPQUFPLGFBQWE7SUFDZixXQUFXLENBQVE7d0dBRGpCLGFBQWE7NEZBQWIsYUFBYSx5RkNSMUIsMEdBSU07OzRGRElPLGFBQWE7a0JBTnpCLFNBQVM7K0JBQ0UsV0FBVyxtQkFHSix1QkFBdUIsQ0FBQyxNQUFNOzhCQUd0QyxXQUFXO3NCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS10YWJzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYnMuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYnMuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRhYnNDb21wb25lbnQge1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nXG59IiwiPGRpdiBjbGFzcz1cImJpenktdGFicyB7e2N1c3RvbUNsYXNzfX1cIj5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFiXCI+PC9uZy1jb250ZW50PlxuXG48L2Rpdj4iXX0=