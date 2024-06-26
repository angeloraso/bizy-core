import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef, Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyTableScrollingDirective {
    viewContainerRef;
    template;
    ref;
    #items = new BehaviorSubject([]);
    get items$() {
        return this.#items.asObservable();
    }
    set tableForIn(value) {
        this.#items.next(value);
    }
    constructor(viewContainerRef, template, ref) {
        this.viewContainerRef = viewContainerRef;
        this.template = template;
        this.ref = ref;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableScrollingDirective, selector: "[tableFor]", inputs: { tableForIn: "tableForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tableFor]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef, decorators: [{
                    type: Inject,
                    args: [ViewContainerRef]
                }] }, { type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { tableForIn: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTzNHLE1BQU0sT0FBTywyQkFBMkI7SUFjSDtJQUNMO0lBQ007SUFkcEMsTUFBTSxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBRTNDLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFDSSxVQUFVLENBQUMsS0FBZTtRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsWUFDbUMsZ0JBQWtDLEVBQ3ZDLFFBQTRDLEVBQ3RDLEdBQXNCO1FBRnZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBb0M7UUFDdEMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDdEQsQ0FBQzt3R0FqQk0sMkJBQTJCLGtCQWM1QixnQkFBZ0IsYUFDaEIsV0FBVyxhQUNYLGlCQUFpQjs0RkFoQmhCLDJCQUEyQjs7NEZBQTNCLDJCQUEyQjtrQkFKdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7OzBCQWdCSSxNQUFNOzJCQUFDLGdCQUFnQjs7MEJBQ3ZCLE1BQU07MkJBQUMsV0FBVzs7MEJBQ2xCLE1BQU07MkJBQUMsaUJBQWlCOzRDQVB2QixVQUFVO3NCQURiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEluamVjdCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5VGFibGVSb3dDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS1yb3cvdGFibGUtcm93LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0YWJsZUZvcl0nLFxufSlcblxuZXhwb3J0IGNsYXNzIEJpenlUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZTxUPiB7XG5cbiAgI2l0ZW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxUPj4oW10pO1xuXG4gIGdldCBpdGVtcyQoKTogT2JzZXJ2YWJsZTxBcnJheTxUPj4ge1xuICAgIHJldHVybiB0aGlzLiNpdGVtcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB0YWJsZUZvckluKHZhbHVlOiBBcnJheTxUPikge1xuICAgIHRoaXMuI2l0ZW1zLm5leHQodmFsdWUpO1xuICB9ICAgIFxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVmlld0NvbnRhaW5lclJlZikgcHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQEluamVjdChUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxCaXp5VGFibGVSb3dDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHB1YmxpYyByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHsgfVxufVxuIl19