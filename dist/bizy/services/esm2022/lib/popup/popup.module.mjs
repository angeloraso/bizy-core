import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyPopupWrapperComponent } from './popup-wrapper/popup-wrapper.component';
import { BizyPopupService } from './popup.service';
import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizyPopupWrapperComponent,
];
export class BizyPopupModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, declarations: [BizyPopupWrapperComponent], imports: [CommonModule, FormsModule, DialogModule, DragDropModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, providers: [BizyPopupService], imports: [CommonModule, FormsModule, DialogModule, DragDropModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, DialogModule, DragDropModule],
                    declarations: COMPONENTS,
                    providers: [BizyPopupService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi9wb3B1cC9wb3B1cC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBRXhELE1BQU0sVUFBVSxHQUFHO0lBQ2pCLHlCQUF5QjtDQUMxQixDQUFDO0FBT0YsTUFBTSxPQUFPLGVBQWU7d0dBQWYsZUFBZTt5R0FBZixlQUFlLGlCQVIxQix5QkFBeUIsYUFJZixZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjO3lHQUl0RCxlQUFlLGFBRmYsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUZuQixZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjOzs0RkFJdEQsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUM7b0JBQ2xFLFlBQVksRUFBRSxVQUFVO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQml6eVBvcHVwV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vcG9wdXAtd3JhcHBlci9wb3B1cC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5UG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcbmltcG9ydCB7IERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kaWFsb2cnO1xuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQml6eVBvcHVwV3JhcHBlckNvbXBvbmVudCxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBEaWFsb2dNb2R1bGUsIERyYWdEcm9wTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBwcm92aWRlcnM6IFtCaXp5UG9wdXBTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBCaXp5UG9wdXBNb2R1bGUge31cbiJdfQ==