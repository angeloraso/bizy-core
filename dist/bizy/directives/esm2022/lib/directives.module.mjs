import { BizyOnlyNumbersDirective } from './only-numbers.directive';
import { NgModule } from '@angular/core';
import { BizyLoadingDirective } from './loading.directive';
import { BizyOnlyPhoneDigitsDirective } from './only-phone-digits.directive';
import { BizyNgForTrackByIdDirective } from './track-by-id.directive';
import { BizyLongPressDirective } from './long-press.directive';
import { BizyTooltipDirective } from './tooltip.directive';
import { BizyCurrencyFormatDirective } from './currency-format.directive';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvZGlyZWN0aXZlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFFMUUsTUFBTSxVQUFVLEdBQUc7SUFDakIsb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsNEJBQTRCO0lBQzVCLDJCQUEyQjtJQUMzQixvQkFBb0I7SUFDcEIsMkJBQTJCO0NBQzVCLENBQUM7QUFLRixNQUFNLE9BQU8sb0JBQW9CO3dHQUFwQixvQkFBb0I7eUdBQXBCLG9CQUFvQixpQkFaL0Isb0JBQW9CO1lBQ3BCLHNCQUFzQjtZQUN0Qix3QkFBd0I7WUFDeEIsNEJBQTRCO1lBQzVCLDJCQUEyQjtZQUMzQixvQkFBb0I7WUFDcEIsMkJBQTJCLGFBTjNCLG9CQUFvQjtZQUNwQixzQkFBc0I7WUFDdEIsd0JBQXdCO1lBQ3hCLDRCQUE0QjtZQUM1QiwyQkFBMkI7WUFDM0Isb0JBQW9CO1lBQ3BCLDJCQUEyQjt5R0FNaEIsb0JBQW9COzs0RkFBcEIsb0JBQW9CO2tCQUpoQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxVQUFVO29CQUN4QixPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaXp5T25seU51bWJlcnNEaXJlY3RpdmUgfSBmcm9tICcuL29ubHktbnVtYmVycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlMb2FkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9sb2FkaW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCaXp5T25seVBob25lRGlnaXRzRGlyZWN0aXZlIH0gZnJvbSAnLi9vbmx5LXBob25lLWRpZ2l0cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQml6eU5nRm9yVHJhY2tCeUlkRGlyZWN0aXZlIH0gZnJvbSAnLi90cmFjay1ieS1pZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQml6eUxvbmdQcmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vbG9uZy1wcmVzcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQml6eVRvb2x0aXBEaXJlY3RpdmUgfSBmcm9tICcuL3Rvb2x0aXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJpenlDdXJyZW5jeUZvcm1hdERpcmVjdGl2ZSB9IGZyb20gJy4vY3VycmVuY3ktZm9ybWF0LmRpcmVjdGl2ZSc7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIEJpenlMb2FkaW5nRGlyZWN0aXZlLFxuICBCaXp5TG9uZ1ByZXNzRGlyZWN0aXZlLFxuICBCaXp5T25seU51bWJlcnNEaXJlY3RpdmUsXG4gIEJpenlPbmx5UGhvbmVEaWdpdHNEaXJlY3RpdmUsXG4gIEJpenlOZ0ZvclRyYWNrQnlJZERpcmVjdGl2ZSxcbiAgQml6eVRvb2x0aXBEaXJlY3RpdmUsXG4gIEJpenlDdXJyZW5jeUZvcm1hdERpcmVjdGl2ZVxuXTtcbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogRElSRUNUSVZFUyxcbiAgZXhwb3J0czogRElSRUNUSVZFUyxcbn0pXG5leHBvcnQgY2xhc3MgQml6eURpcmVjdGl2ZXNNb2R1bGUge31cbiJdfQ==