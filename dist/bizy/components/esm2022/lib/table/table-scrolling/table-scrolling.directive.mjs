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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTNHLE1BQU0sT0FBTywyQkFBMkI7SUFjSDtJQUNMO0lBQ007SUFkcEMsTUFBTSxHQUFHLElBQUksZUFBZSxDQUF1QixFQUFFLENBQUMsQ0FBQztJQUV2RCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQ0ksVUFBVSxDQUFDLEtBQTJCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxZQUNtQyxnQkFBa0MsRUFDdkMsUUFBNEMsRUFDdEMsR0FBc0I7UUFGdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUFvQztRQUN0QyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN0RCxDQUFDO3dHQWpCTSwyQkFBMkIsa0JBYzVCLGdCQUFnQixhQUNoQixXQUFXLGFBQ1gsaUJBQWlCOzRGQWhCaEIsMkJBQTJCOzs0RkFBM0IsMkJBQTJCO2tCQUp2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7MEJBZ0JJLE1BQU07MkJBQUMsZ0JBQWdCOzswQkFDdkIsTUFBTTsyQkFBQyxXQUFXOzswQkFDbEIsTUFBTTsyQkFBQyxpQkFBaUI7NENBUHZCLFVBQVU7c0JBRGIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgSW5qZWN0LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlUYWJsZVJvd0NvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLXJvdy90YWJsZS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IElCaXp5VGFibGVSb3cgfSBmcm9tICcuLi90YWJsZS50eXBlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0YWJsZUZvcl0nLFxufSlcblxuZXhwb3J0IGNsYXNzIEJpenlUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZSB7XG5cbiAgI2l0ZW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxJQml6eVRhYmxlUm93Pj4oW10pO1xuXG4gIGdldCBpdGVtcyQoKTogT2JzZXJ2YWJsZTxBcnJheTxJQml6eVRhYmxlUm93Pj4ge1xuICAgIHJldHVybiB0aGlzLiNpdGVtcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB0YWJsZUZvckluKHZhbHVlOiBBcnJheTxJQml6eVRhYmxlUm93Pikge1xuICAgIHRoaXMuI2l0ZW1zLm5leHQodmFsdWUpO1xuICB9ICAgIFxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVmlld0NvbnRhaW5lclJlZikgcHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQEluamVjdChUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxCaXp5VGFibGVSb3dDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHB1YmxpYyByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHsgfVxufVxuIl19