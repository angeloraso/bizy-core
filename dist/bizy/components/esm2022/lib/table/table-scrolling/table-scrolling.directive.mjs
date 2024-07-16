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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTzNHLE1BQU0sT0FBTywyQkFBMkI7SUFjSDtJQUNMO0lBQ007SUFkcEMsTUFBTSxHQUFHLElBQUksZUFBZSxDQUFpQixFQUFFLENBQUMsQ0FBQztJQUVqRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQ0ksVUFBVSxDQUFDLEtBQXFCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxZQUNtQyxnQkFBa0MsRUFDdkMsUUFBNEMsRUFDdEMsR0FBc0I7UUFGdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUFvQztRQUN0QyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN0RCxDQUFDO3dHQWpCTSwyQkFBMkIsa0JBYzVCLGdCQUFnQixhQUNoQixXQUFXLGFBQ1gsaUJBQWlCOzRGQWhCaEIsMkJBQTJCOzs0RkFBM0IsMkJBQTJCO2tCQUp2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7MEJBZ0JJLE1BQU07MkJBQUMsZ0JBQWdCOzswQkFDdkIsTUFBTTsyQkFBQyxXQUFXOzswQkFDbEIsTUFBTTsyQkFBQyxpQkFBaUI7NENBUHZCLFVBQVU7c0JBRGIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgSW5qZWN0LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlUYWJsZVJvd0NvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLXJvdy90YWJsZS1yb3cuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RhYmxlRm9yXScsXG59KVxuXG5leHBvcnQgY2xhc3MgQml6eVRhYmxlU2Nyb2xsaW5nRGlyZWN0aXZlIHtcblxuICAjaXRlbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFycmF5PHVua25vd24+PihbXSk7XG5cbiAgZ2V0IGl0ZW1zJCgpOiBPYnNlcnZhYmxlPEFycmF5PHVua25vd24+PiB7XG4gICAgcmV0dXJuIHRoaXMuI2l0ZW1zLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHRhYmxlRm9ySW4odmFsdWU6IEFycmF5PHVua25vd24+KSB7XG4gICAgdGhpcy4jaXRlbXMubmV4dCh2YWx1ZSk7XG4gIH0gICAgXG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChWaWV3Q29udGFpbmVyUmVmKSBwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPEJpenlUYWJsZVJvd0NvbXBvbmVudD4sXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHVibGljIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkgeyB9XG59XG4iXX0=