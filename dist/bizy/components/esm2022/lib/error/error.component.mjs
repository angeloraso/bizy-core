import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class ErrorComponent {
    label;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.9", type: ErrorComponent, selector: "bizy-error", inputs: { label: "label" }, ngImport: i0, template: "<h6 class=\"bizy-error\"><ng-content></ng-content></h6>\n", styles: ["@keyframes fade-in{0%{opacity:0}to{opacity:1}}.bizy-error{color:var(--bizy-error-color);font-weight:700;animation-name:fade-in;animation-duration:.5s;animation-fill-mode:both}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-error', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h6 class=\"bizy-error\"><ng-content></ng-content></h6>\n", styles: ["@keyframes fade-in{0%{opacity:0}to{opacity:1}}.bizy-error{color:var(--bizy-error-color);font-weight:700;animation-name:fade-in;animation-duration:.5s;animation-fill-mode:both}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2Vycm9yL2Vycm9yLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9lcnJvci9lcnJvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVExRSxNQUFNLE9BQU8sY0FBYztJQUNoQixLQUFLLENBQVM7dUdBRFosY0FBYzsyRkFBZCxjQUFjLDhFQ1IzQiwyREFDQTs7MkZET2EsY0FBYztrQkFOMUIsU0FBUzsrQkFDRSxZQUFZLG1CQUdMLHVCQUF1QixDQUFDLE1BQU07OEJBR3RDLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZXJyb3InLFxuICB0ZW1wbGF0ZVVybDogJy4vZXJyb3IuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Vycm9yLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBFcnJvckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG59IiwiPGg2IGNsYXNzPVwiYml6eS1lcnJvclwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2g2PlxuIl19