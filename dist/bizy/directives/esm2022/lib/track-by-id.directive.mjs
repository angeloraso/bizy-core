import { Directive, Host } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NgForTrackByIdDirective {
    ngFor;
    constructor(ngFor) {
        this.ngFor = ngFor;
        this.ngFor.ngForTrackBy = (_index, item) => item.id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: NgForTrackByIdDirective, deps: [{ token: i1.NgForOf, host: true }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.9", type: NgForTrackByIdDirective, selector: "[ngForBizyTrackById]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: NgForTrackByIdDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngForBizyTrackById]'
                }]
        }], ctorParameters: () => [{ type: i1.NgForOf, decorators: [{
                    type: Host
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2stYnktaWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGlyZWN0aXZlcy9zcmMvbGliL3RyYWNrLWJ5LWlkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBU2hELE1BQU0sT0FBTyx1QkFBdUI7SUFDRztJQUFyQyxZQUFxQyxLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsTUFBYyxFQUFFLElBQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqRSxDQUFDO3VHQUhVLHVCQUF1QjsyRkFBdkIsdUJBQXVCOzsyRkFBdkIsdUJBQXVCO2tCQUhuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7aUJBQ2pDOzswQkFFYyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdGb3JPZiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW50ZXJmYWNlIEl0ZW0ge1xuICBpZDogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdGb3JCaXp5VHJhY2tCeUlkXSdcbn0pXG5leHBvcnQgY2xhc3MgTmdGb3JUcmFja0J5SWREaXJlY3RpdmU8VCBleHRlbmRzIEl0ZW0+IHtcbiAgY29uc3RydWN0b3IoQEhvc3QoKSBwcml2YXRlIHJlYWRvbmx5IG5nRm9yOiBOZ0Zvck9mPFQ+KSB7XG4gICAgdGhpcy5uZ0Zvci5uZ0ZvclRyYWNrQnkgPSAoX2luZGV4OiBudW1iZXIsIGl0ZW06IFQpID0+IGl0ZW0uaWQ7XG4gIH1cbn1cbiJdfQ==