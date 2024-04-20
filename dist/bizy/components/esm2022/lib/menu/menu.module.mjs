import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyMenuComponent } from './menu.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyMenuOptionComponent } from './menu-option/menu-option.component';
import { BizyMenuTitleComponent } from './menu-title/menu-title.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizyMenuComponent,
    BizyMenuOptionComponent,
    BizyMenuTitleComponent
];
export class BizyMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, declarations: [BizyMenuComponent,
            BizyMenuOptionComponent,
            BizyMenuTitleComponent], imports: [CommonModule, FormsModule, OverlayModule], exports: [BizyMenuComponent,
            BizyMenuOptionComponent,
            BizyMenuTitleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, imports: [CommonModule, FormsModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvbWVudS9tZW51Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztBQUUzRSxNQUFNLFVBQVUsR0FBRztJQUNqQixpQkFBaUI7SUFDakIsdUJBQXVCO0lBQ3ZCLHNCQUFzQjtDQUN2QixDQUFDO0FBT0YsTUFBTSxPQUFPLGNBQWM7d0dBQWQsY0FBYzt5R0FBZCxjQUFjLGlCQVZ6QixpQkFBaUI7WUFDakIsdUJBQXVCO1lBQ3ZCLHNCQUFzQixhQUlaLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxhQU5sRCxpQkFBaUI7WUFDakIsdUJBQXVCO1lBQ3ZCLHNCQUFzQjt5R0FRWCxjQUFjLFlBSmYsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhOzs0RkFJdkMsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQztvQkFDbkQsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCaXp5TWVudUNvbXBvbmVudCB9IGZyb20gJy4vbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEJpenlNZW51T3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9tZW51LW9wdGlvbi9tZW51LW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eU1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vbWVudS10aXRsZS9tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIEJpenlNZW51Q29tcG9uZW50LFxuICBCaXp5TWVudU9wdGlvbkNvbXBvbmVudCxcbiAgQml6eU1lbnVUaXRsZUNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE92ZXJsYXlNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IENPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgQml6eU1lbnVNb2R1bGUge31cbiJdfQ==