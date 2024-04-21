import { BizyOnlyNumbersDirective } from './only-numbers.directive';
import { NgModule } from '@angular/core';
import { BizyLoadingDirective } from './loading.directive';
import { BizyOnlyPhoneDigitsDirective } from './only-phone-digits.directive';
import { BizyNgForTrackByIdDirective } from './track-by-id.directive';
import { BizyLongPressDirective } from './long-press.directive';
import { BizyTooltipDirective } from './tooltip.directive';
import * as i0 from "@angular/core";
const DIRECTIVES = [
    BizyLoadingDirective,
    BizyLongPressDirective,
    BizyOnlyNumbersDirective,
    BizyOnlyPhoneDigitsDirective,
    BizyNgForTrackByIdDirective,
    BizyTooltipDirective
];
export class BizyDirectivesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, declarations: [BizyLoadingDirective,
            BizyLongPressDirective,
            BizyOnlyNumbersDirective,
            BizyOnlyPhoneDigitsDirective,
            BizyNgForTrackByIdDirective,
            BizyTooltipDirective], exports: [BizyLoadingDirective,
            BizyLongPressDirective,
            BizyOnlyNumbersDirective,
            BizyOnlyPhoneDigitsDirective,
            BizyNgForTrackByIdDirective,
            BizyTooltipDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: DIRECTIVES,
                    exports: DIRECTIVES,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvZGlyZWN0aXZlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFM0QsTUFBTSxVQUFVLEdBQUc7SUFDakIsb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsNEJBQTRCO0lBQzVCLDJCQUEyQjtJQUMzQixvQkFBb0I7Q0FDckIsQ0FBQztBQUtGLE1BQU0sT0FBTyxvQkFBb0I7d0dBQXBCLG9CQUFvQjt5R0FBcEIsb0JBQW9CLGlCQVgvQixvQkFBb0I7WUFDcEIsc0JBQXNCO1lBQ3RCLHdCQUF3QjtZQUN4Qiw0QkFBNEI7WUFDNUIsMkJBQTJCO1lBQzNCLG9CQUFvQixhQUxwQixvQkFBb0I7WUFDcEIsc0JBQXNCO1lBQ3RCLHdCQUF3QjtZQUN4Qiw0QkFBNEI7WUFDNUIsMkJBQTJCO1lBQzNCLG9CQUFvQjt5R0FNVCxvQkFBb0I7OzRGQUFwQixvQkFBb0I7a0JBSmhDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJpenlPbmx5TnVtYmVyc0RpcmVjdGl2ZSB9IGZyb20gJy4vb25seS1udW1iZXJzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQml6eUxvYWRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2xvYWRpbmcuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJpenlPbmx5UGhvbmVEaWdpdHNEaXJlY3RpdmUgfSBmcm9tICcuL29ubHktcGhvbmUtZGlnaXRzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCaXp5TmdGb3JUcmFja0J5SWREaXJlY3RpdmUgfSBmcm9tICcuL3RyYWNrLWJ5LWlkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCaXp5TG9uZ1ByZXNzRGlyZWN0aXZlIH0gZnJvbSAnLi9sb25nLXByZXNzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCaXp5VG9vbHRpcERpcmVjdGl2ZSB9IGZyb20gJy4vdG9vbHRpcC5kaXJlY3RpdmUnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBCaXp5TG9hZGluZ0RpcmVjdGl2ZSxcbiAgQml6eUxvbmdQcmVzc0RpcmVjdGl2ZSxcbiAgQml6eU9ubHlOdW1iZXJzRGlyZWN0aXZlLFxuICBCaXp5T25seVBob25lRGlnaXRzRGlyZWN0aXZlLFxuICBCaXp5TmdGb3JUcmFja0J5SWREaXJlY3RpdmUsXG4gIEJpenlUb29sdGlwRGlyZWN0aXZlXG5dO1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBESVJFQ1RJVkVTLFxuICBleHBvcnRzOiBESVJFQ1RJVkVTLFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RGlyZWN0aXZlc01vZHVsZSB7fVxuIl19