import { Pipe, Inject } from '@angular/core';
import { BizyTranslateService } from './translate.service';
import * as i0 from "@angular/core";
import * as i1 from "./translate.service";
export class BizyTranslatePipe {
    translate;
    constructor(translate) {
        this.translate = translate;
    }
    transform(label) {
        return this.translate.get(label);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTranslatePipe, deps: [{ token: BizyTranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyTranslatePipe, name: "translate" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTranslatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'translate',
                }]
        }], ctorParameters: function () { return [{ type: i1.BizyTranslateService, decorators: [{
                    type: Inject,
                    args: [BizyTranslateService]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3RyYW5zbGF0ZS90cmFuc2xhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUszRCxNQUFNLE9BQU8saUJBQWlCO0lBQ3NCO0lBQWxELFlBQWtELFNBQStCO1FBQS9CLGNBQVMsR0FBVCxTQUFTLENBQXNCO0lBQUcsQ0FBQztJQUVyRixTQUFTLENBQUMsS0FBYTtRQUNyQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7d0dBTFUsaUJBQWlCLGtCQUNSLG9CQUFvQjtzR0FEN0IsaUJBQWlCOzs0RkFBakIsaUJBQWlCO2tCQUg3QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxXQUFXO2lCQUNsQjs7MEJBRWMsTUFBTTsyQkFBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnLi90cmFuc2xhdGUuc2VydmljZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3RyYW5zbGF0ZScsXG59KVxuZXhwb3J0IGNsYXNzIEJpenlUcmFuc2xhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQml6eVRyYW5zbGF0ZVNlcnZpY2UpIHByaXZhdGUgdHJhbnNsYXRlOiBCaXp5VHJhbnNsYXRlU2VydmljZSkge31cblxuICB0cmFuc2Zvcm0obGFiZWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmdldChsYWJlbCk7XG4gIH1cbn1cbiJdfQ==