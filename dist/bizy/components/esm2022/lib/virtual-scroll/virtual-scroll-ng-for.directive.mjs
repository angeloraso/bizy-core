import { Directive, Input, TemplateRef, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class BizyVirtualScrollNgForDirective {
    template;
    _items = new BehaviorSubject([]);
    get items() {
        return this._items.asObservable();
    }
    set virtualNgForIn(items) {
        this._items.next(items);
    }
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollNgForDirective, deps: [{ token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyVirtualScrollNgForDirective, selector: "[virtualNgFor]", inputs: { virtualNgForIn: "virtualNgForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollNgForDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualNgFor]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }]; }, propDecorators: { virtualNgForIn: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtbmctZm9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC1uZy1mb3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFNdkMsTUFBTSxPQUFPLCtCQUErQjtJQVlGO0lBWGpDLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBaUIsRUFBRSxDQUFDLENBQUM7SUFFeEQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUNJLGNBQWMsQ0FBQyxLQUFxQjtRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsWUFBd0MsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDO3dHQVozRCwrQkFBK0Isa0JBWXRCLFdBQVc7NEZBWnBCLCtCQUErQjs7NEZBQS9CLCtCQUErQjtrQkFKM0MsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjs7MEJBY2MsTUFBTTsyQkFBQyxXQUFXOzRDQUozQixjQUFjO3NCQURqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t2aXJ0dWFsTmdGb3JdJ1xufSlcblxuZXhwb3J0IGNsYXNzIEJpenlWaXJ0dWFsU2Nyb2xsTmdGb3JEaXJlY3RpdmUge1xuICBwdWJsaWMgX2l0ZW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTx1bmtub3duPj4oW10pO1xuXG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdmlydHVhbE5nRm9ySW4oaXRlbXM6IEFycmF5PHVua25vd24+KSB7XG4gICAgdGhpcy5faXRlbXMubmV4dChpdGVtcyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG4iXX0=