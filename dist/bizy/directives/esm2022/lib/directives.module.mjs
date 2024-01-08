import { OnlyNumbersDirective } from './only-numbers.directive';
import { NgModule } from '@angular/core';
import { LoadingDirective } from './loading.directive';
import { OnlyPhoneDigitsDirective } from './only-phone-digits.directive';
import { NgForTrackByIdDirective } from './track-by-id.directive';
import { LongPressDirective } from './long-press.directive';
import * as i0 from "@angular/core";
const DIRECTIVES = [
    LoadingDirective,
    LongPressDirective,
    OnlyNumbersDirective,
    OnlyPhoneDigitsDirective,
    NgForTrackByIdDirective,
];
export class DirectivesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: DirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.11", ngImport: i0, type: DirectivesModule, declarations: [LoadingDirective,
            LongPressDirective,
            OnlyNumbersDirective,
            OnlyPhoneDigitsDirective,
            NgForTrackByIdDirective], exports: [LoadingDirective,
            LongPressDirective,
            OnlyNumbersDirective,
            OnlyPhoneDigitsDirective,
            NgForTrackByIdDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: DirectivesModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: DirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: DIRECTIVES,
                    exports: DIRECTIVES,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvZGlyZWN0aXZlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFFNUQsTUFBTSxVQUFVLEdBQUc7SUFDakIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixvQkFBb0I7SUFDcEIsd0JBQXdCO0lBQ3hCLHVCQUF1QjtDQUN4QixDQUFDO0FBS0YsTUFBTSxPQUFPLGdCQUFnQjt3R0FBaEIsZ0JBQWdCO3lHQUFoQixnQkFBZ0IsaUJBVjNCLGdCQUFnQjtZQUNoQixrQkFBa0I7WUFDbEIsb0JBQW9CO1lBQ3BCLHdCQUF3QjtZQUN4Qix1QkFBdUIsYUFKdkIsZ0JBQWdCO1lBQ2hCLGtCQUFrQjtZQUNsQixvQkFBb0I7WUFDcEIsd0JBQXdCO1lBQ3hCLHVCQUF1Qjt5R0FNWixnQkFBZ0I7OzRGQUFoQixnQkFBZ0I7a0JBSjVCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ubHlOdW1iZXJzRGlyZWN0aXZlIH0gZnJvbSAnLi9vbmx5LW51bWJlcnMuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2FkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9sb2FkaW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPbmx5UGhvbmVEaWdpdHNEaXJlY3RpdmUgfSBmcm9tICcuL29ubHktcGhvbmUtZGlnaXRzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOZ0ZvclRyYWNrQnlJZERpcmVjdGl2ZSB9IGZyb20gJy4vdHJhY2stYnktaWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IExvbmdQcmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vbG9uZy1wcmVzcy5kaXJlY3RpdmUnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBMb2FkaW5nRGlyZWN0aXZlLFxuICBMb25nUHJlc3NEaXJlY3RpdmUsXG4gIE9ubHlOdW1iZXJzRGlyZWN0aXZlLFxuICBPbmx5UGhvbmVEaWdpdHNEaXJlY3RpdmUsXG4gIE5nRm9yVHJhY2tCeUlkRGlyZWN0aXZlLFxuXTtcbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogRElSRUNUSVZFUyxcbiAgZXhwb3J0czogRElSRUNUSVZFUyxcbn0pXG5leHBvcnQgY2xhc3MgRGlyZWN0aXZlc01vZHVsZSB7fVxuIl19