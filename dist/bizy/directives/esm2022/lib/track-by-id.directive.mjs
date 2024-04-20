import { Directive, Host } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizyNgForTrackByIdDirective {
    ngFor;
    constructor(ngFor) {
        this.ngFor = ngFor;
        this.ngFor.ngForTrackBy = (_index, item) => item.id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyNgForTrackByIdDirective, deps: [{ token: i1.NgForOf, host: true }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyNgForTrackByIdDirective, selector: "[ngForBizyTrackById]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyNgForTrackByIdDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngForBizyTrackById]'
                }]
        }], ctorParameters: function () { return [{ type: i1.NgForOf, decorators: [{
                    type: Host
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2stYnktaWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGlyZWN0aXZlcy9zcmMvbGliL3RyYWNrLWJ5LWlkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBU2hELE1BQU0sT0FBTywyQkFBMkI7SUFDRDtJQUFyQyxZQUFxQyxLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsTUFBYyxFQUFFLElBQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqRSxDQUFDO3dHQUhVLDJCQUEyQjs0RkFBM0IsMkJBQTJCOzs0RkFBM0IsMkJBQTJCO2tCQUh2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7aUJBQ2pDOzswQkFFYyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdGb3JPZiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW50ZXJmYWNlIEl0ZW0ge1xuICBpZDogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdGb3JCaXp5VHJhY2tCeUlkXSdcbn0pXG5leHBvcnQgY2xhc3MgQml6eU5nRm9yVHJhY2tCeUlkRGlyZWN0aXZlPFQgZXh0ZW5kcyBJdGVtPiB7XG4gIGNvbnN0cnVjdG9yKEBIb3N0KCkgcHJpdmF0ZSByZWFkb25seSBuZ0ZvcjogTmdGb3JPZjxUPikge1xuICAgIHRoaXMubmdGb3IubmdGb3JUcmFja0J5ID0gKF9pbmRleDogbnVtYmVyLCBpdGVtOiBUKSA9PiBpdGVtLmlkO1xuICB9XG59XG4iXX0=