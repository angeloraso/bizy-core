import { BehaviorSubject } from 'rxjs';
import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyGridForDirective {
    viewContainerRef;
    templateRef;
    #items = new BehaviorSubject([]);
    get items$() {
        return this.#items.asObservable();
    }
    set gridForOf(items) {
        this.#items.next(items);
    }
    constructor(viewContainerRef, templateRef) {
        this.viewContainerRef = viewContainerRef;
        this.templateRef = templateRef;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridForDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyGridForDirective, selector: "[gridFor]", inputs: { gridForOf: "gridForOf" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridForDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gridFor]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef, decorators: [{
                    type: Inject,
                    args: [ViewContainerRef]
                }] }, { type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }]; }, propDecorators: { gridForOf: [{
                type: Input,
                args: ['gridForOf']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZ3JpZC9ncmlkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTXhGLE1BQU0sT0FBTyxvQkFBb0I7SUFZSTtJQUNMO0lBWjlCLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBaUIsRUFBRSxDQUFDLENBQUM7SUFFakQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUF3QixTQUFTLENBQUMsS0FBcUI7UUFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFlBQ21DLGdCQUFrQyxFQUN2QyxXQUFpQztRQUQ1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3ZDLGdCQUFXLEdBQVgsV0FBVyxDQUFzQjtJQUMzRCxDQUFDO3dHQWRNLG9CQUFvQixrQkFZckIsZ0JBQWdCLGFBQ2hCLFdBQVc7NEZBYlYsb0JBQW9COzs0RkFBcEIsb0JBQW9CO2tCQUpoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO2lCQUN0Qjs7MEJBY0ksTUFBTTsyQkFBQyxnQkFBZ0I7OzBCQUN2QixNQUFNOzJCQUFDLFdBQVc7NENBTkcsU0FBUztzQkFBaEMsS0FBSzt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tncmlkRm9yXScsXG59KVxuXG5leHBvcnQgY2xhc3MgQml6eUdyaWRGb3JEaXJlY3RpdmUge1xuICAjaXRlbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFycmF5PHVua25vd24+PihbXSk7XG5cbiAgZ2V0IGl0ZW1zJCgpOiBPYnNlcnZhYmxlPEFycmF5PHVua25vd24+PiB7XG4gICAgcmV0dXJuIHRoaXMuI2l0ZW1zLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgQElucHV0KCdncmlkRm9yT2YnKSBzZXQgZ3JpZEZvck9mKGl0ZW1zOiBBcnJheTx1bmtub3duPikge1xuICAgIHRoaXMuI2l0ZW1zLm5leHQoaXRlbXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChWaWV3Q29udGFpbmVyUmVmKSBwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPHVua25vd24+XG4gICkgeyB9XG59XG4iXX0=