import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyPopupWrapperComponent } from './popup-wrapper/popup-wrapper.component';
import { BizyPopupService } from './popup.service';
import { DialogModule } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizyPopupWrapperComponent,
];
export class BizyPopupModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, declarations: [BizyPopupWrapperComponent], imports: [CommonModule, FormsModule, DialogModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, providers: [BizyPopupService], imports: [CommonModule, FormsModule, DialogModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, DialogModule],
                    declarations: COMPONENTS,
                    providers: [BizyPopupService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi9wb3B1cC9wb3B1cC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFbkQsTUFBTSxVQUFVLEdBQUc7SUFDakIseUJBQXlCO0NBQzFCLENBQUM7QUFPRixNQUFNLE9BQU8sZUFBZTt3R0FBZixlQUFlO3lHQUFmLGVBQWUsaUJBUjFCLHlCQUF5QixhQUlmLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWTt5R0FJdEMsZUFBZSxhQUZmLENBQUMsZ0JBQWdCLENBQUMsWUFGbkIsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZOzs0RkFJdEMsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQztvQkFDbEQsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCaXp5UG9wdXBXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9wb3B1cC13cmFwcGVyL3BvcHVwLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RpYWxvZyc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIEJpenlQb3B1cFdyYXBwZXJDb21wb25lbnQsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgRGlhbG9nTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBwcm92aWRlcnM6IFtCaXp5UG9wdXBTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBCaXp5UG9wdXBNb2R1bGUge31cbiJdfQ==