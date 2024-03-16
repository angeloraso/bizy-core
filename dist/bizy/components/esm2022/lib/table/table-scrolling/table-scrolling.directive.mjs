import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef, Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export class TableScrollingDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableScrollingDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TableScrollingDirective, selector: "[tableFor]", inputs: { tableForIn: "tableForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableScrollingDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTNHLE1BQU0sT0FBTyx1QkFBdUI7SUFjQztJQUNMO0lBQ007SUFkcEMsTUFBTSxHQUFHLElBQUksZUFBZSxDQUFtQixFQUFFLENBQUMsQ0FBQztJQUVuRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQ0ksVUFBVSxDQUFDLEtBQXVCO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxZQUNtQyxnQkFBa0MsRUFDdkMsUUFBd0MsRUFDbEMsR0FBc0I7UUFGdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUFnQztRQUNsQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN0RCxDQUFDO3dHQWpCTSx1QkFBdUIsa0JBY3hCLGdCQUFnQixhQUNoQixXQUFXLGFBQ1gsaUJBQWlCOzRGQWhCaEIsdUJBQXVCOzs0RkFBdkIsdUJBQXVCO2tCQUpuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7MEJBZ0JJLE1BQU07MkJBQUMsZ0JBQWdCOzswQkFDdkIsTUFBTTsyQkFBQyxXQUFXOzswQkFDbEIsTUFBTTsyQkFBQyxpQkFBaUI7NENBUHZCLFVBQVU7c0JBRGIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgSW5qZWN0LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYmxlUm93Q29tcG9uZW50IH0gZnJvbSAnLi4vdGFibGUtcm93L3RhYmxlLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSVRhYmxlUm93IH0gZnJvbSAnLi4vdGFibGUudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdGFibGVGb3JdJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZSB7XG5cbiAgI2l0ZW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxJVGFibGVSb3c+PihbXSk7XG5cbiAgZ2V0IGl0ZW1zJCgpOiBPYnNlcnZhYmxlPEFycmF5PElUYWJsZVJvdz4+IHtcbiAgICByZXR1cm4gdGhpcy4jaXRlbXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdGFibGVGb3JJbih2YWx1ZTogQXJyYXk8SVRhYmxlUm93Pikge1xuICAgIHRoaXMuI2l0ZW1zLm5leHQodmFsdWUpO1xuICB9ICAgIFxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVmlld0NvbnRhaW5lclJlZikgcHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQEluamVjdChUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxUYWJsZVJvd0NvbXBvbmVudD4sXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHVibGljIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkgeyB9XG59XG4iXX0=