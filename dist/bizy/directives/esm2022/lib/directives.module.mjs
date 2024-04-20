import { BizyOnlyNumbersDirective } from './only-numbers.directive';
import { NgModule } from '@angular/core';
import { BizyLoadingDirective } from './loading.directive';
import { BizyOnlyPhoneDigitsDirective } from './only-phone-digits.directive';
import { BizyNgForTrackByIdDirective } from './track-by-id.directive';
import { BizyLongPressDirective } from './long-press.directive';
import * as i0 from "@angular/core";
const DIRECTIVES = [
    BizyLoadingDirective,
    BizyLongPressDirective,
    BizyOnlyNumbersDirective,
    BizyOnlyPhoneDigitsDirective,
    BizyNgForTrackByIdDirective,
];
export class BizyDirectivesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, declarations: [BizyLoadingDirective,
            BizyLongPressDirective,
            BizyOnlyNumbersDirective,
            BizyOnlyPhoneDigitsDirective,
            BizyNgForTrackByIdDirective], exports: [BizyLoadingDirective,
            BizyLongPressDirective,
            BizyOnlyNumbersDirective,
            BizyOnlyPhoneDigitsDirective,
            BizyNgForTrackByIdDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: DIRECTIVES,
                    exports: DIRECTIVES,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvZGlyZWN0aXZlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFFaEUsTUFBTSxVQUFVLEdBQUc7SUFDakIsb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsNEJBQTRCO0lBQzVCLDJCQUEyQjtDQUM1QixDQUFDO0FBS0YsTUFBTSxPQUFPLG9CQUFvQjt3R0FBcEIsb0JBQW9CO3lHQUFwQixvQkFBb0IsaUJBVi9CLG9CQUFvQjtZQUNwQixzQkFBc0I7WUFDdEIsd0JBQXdCO1lBQ3hCLDRCQUE0QjtZQUM1QiwyQkFBMkIsYUFKM0Isb0JBQW9CO1lBQ3BCLHNCQUFzQjtZQUN0Qix3QkFBd0I7WUFDeEIsNEJBQTRCO1lBQzVCLDJCQUEyQjt5R0FNaEIsb0JBQW9COzs0RkFBcEIsb0JBQW9CO2tCQUpoQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxVQUFVO29CQUN4QixPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaXp5T25seU51bWJlcnNEaXJlY3RpdmUgfSBmcm9tICcuL29ubHktbnVtYmVycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlMb2FkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9sb2FkaW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCaXp5T25seVBob25lRGlnaXRzRGlyZWN0aXZlIH0gZnJvbSAnLi9vbmx5LXBob25lLWRpZ2l0cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQml6eU5nRm9yVHJhY2tCeUlkRGlyZWN0aXZlIH0gZnJvbSAnLi90cmFjay1ieS1pZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQml6eUxvbmdQcmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vbG9uZy1wcmVzcy5kaXJlY3RpdmUnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBCaXp5TG9hZGluZ0RpcmVjdGl2ZSxcbiAgQml6eUxvbmdQcmVzc0RpcmVjdGl2ZSxcbiAgQml6eU9ubHlOdW1iZXJzRGlyZWN0aXZlLFxuICBCaXp5T25seVBob25lRGlnaXRzRGlyZWN0aXZlLFxuICBCaXp5TmdGb3JUcmFja0J5SWREaXJlY3RpdmUsXG5dO1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBESVJFQ1RJVkVTLFxuICBleHBvcnRzOiBESVJFQ1RJVkVTLFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RGlyZWN0aXZlc01vZHVsZSB7fVxuIl19