import { BizyOnlyNumbersDirective } from './only-numbers.directive';
import { NgModule } from '@angular/core';
import { BizyLoadingDirective } from './loading.directive';
import { BizyOnlyPhoneDigitsDirective } from './only-phone-digits.directive';
import { BizyNgForTrackByIdDirective } from './track-by-id.directive';
import { BizyLongPressDirective } from './long-press.directive';
import { BizyTooltipDirective } from './tooltip.directive';
import { BizyCurrencyFormatDirective } from './currencyFormat.directive';
import * as i0 from "@angular/core";
const DIRECTIVES = [
    BizyLoadingDirective,
    BizyLongPressDirective,
    BizyOnlyNumbersDirective,
    BizyOnlyPhoneDigitsDirective,
    BizyNgForTrackByIdDirective,
    BizyTooltipDirective,
    BizyCurrencyFormatDirective
];
export class BizyDirectivesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, declarations: [BizyLoadingDirective,
            BizyLongPressDirective,
            BizyOnlyNumbersDirective,
            BizyOnlyPhoneDigitsDirective,
            BizyNgForTrackByIdDirective,
            BizyTooltipDirective,
            BizyCurrencyFormatDirective], exports: [BizyLoadingDirective,
            BizyLongPressDirective,
            BizyOnlyNumbersDirective,
            BizyOnlyPhoneDigitsDirective,
            BizyNgForTrackByIdDirective,
            BizyTooltipDirective,
            BizyCurrencyFormatDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: DIRECTIVES,
                    exports: DIRECTIVES,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvZGlyZWN0aXZlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFFekUsTUFBTSxVQUFVLEdBQUc7SUFDakIsb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsNEJBQTRCO0lBQzVCLDJCQUEyQjtJQUMzQixvQkFBb0I7SUFDcEIsMkJBQTJCO0NBQzVCLENBQUM7QUFLRixNQUFNLE9BQU8sb0JBQW9CO3dHQUFwQixvQkFBb0I7eUdBQXBCLG9CQUFvQixpQkFaL0Isb0JBQW9CO1lBQ3BCLHNCQUFzQjtZQUN0Qix3QkFBd0I7WUFDeEIsNEJBQTRCO1lBQzVCLDJCQUEyQjtZQUMzQixvQkFBb0I7WUFDcEIsMkJBQTJCLGFBTjNCLG9CQUFvQjtZQUNwQixzQkFBc0I7WUFDdEIsd0JBQXdCO1lBQ3hCLDRCQUE0QjtZQUM1QiwyQkFBMkI7WUFDM0Isb0JBQW9CO1lBQ3BCLDJCQUEyQjt5R0FNaEIsb0JBQW9COzs0RkFBcEIsb0JBQW9CO2tCQUpoQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxVQUFVO29CQUN4QixPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaXp5T25seU51bWJlcnNEaXJlY3RpdmUgfSBmcm9tICcuL29ubHktbnVtYmVycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlMb2FkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9sb2FkaW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCaXp5T25seVBob25lRGlnaXRzRGlyZWN0aXZlIH0gZnJvbSAnLi9vbmx5LXBob25lLWRpZ2l0cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQml6eU5nRm9yVHJhY2tCeUlkRGlyZWN0aXZlIH0gZnJvbSAnLi90cmFjay1ieS1pZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQml6eUxvbmdQcmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vbG9uZy1wcmVzcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQml6eVRvb2x0aXBEaXJlY3RpdmUgfSBmcm9tICcuL3Rvb2x0aXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJpenlDdXJyZW5jeUZvcm1hdERpcmVjdGl2ZSB9IGZyb20gJy4vY3VycmVuY3lGb3JtYXQuZGlyZWN0aXZlJztcblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgQml6eUxvYWRpbmdEaXJlY3RpdmUsXG4gIEJpenlMb25nUHJlc3NEaXJlY3RpdmUsXG4gIEJpenlPbmx5TnVtYmVyc0RpcmVjdGl2ZSxcbiAgQml6eU9ubHlQaG9uZURpZ2l0c0RpcmVjdGl2ZSxcbiAgQml6eU5nRm9yVHJhY2tCeUlkRGlyZWN0aXZlLFxuICBCaXp5VG9vbHRpcERpcmVjdGl2ZSxcbiAgQml6eUN1cnJlbmN5Rm9ybWF0RGlyZWN0aXZlXG5dO1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBESVJFQ1RJVkVTLFxuICBleHBvcnRzOiBESVJFQ1RJVkVTLFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RGlyZWN0aXZlc01vZHVsZSB7fVxuIl19