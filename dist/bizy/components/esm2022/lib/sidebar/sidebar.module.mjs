import { NgModule } from '@angular/core';
import { BizySidebarComponent } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyAccordionModule } from '../accordion';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizySidebarFloatingOptionTitleComponent } from './sidebar-floating-option-title/sidebar-floating-option-title.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizySidebarComponent,
    BizySidebarOptionComponent,
    BizySidebarFloatingOptionComponent,
    BizySidebarFloatingOptionTitleComponent
];
export class BizySidebarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, declarations: [BizySidebarComponent,
            BizySidebarOptionComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarFloatingOptionTitleComponent], imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule], exports: [BizySidebarComponent,
            BizySidebarOptionComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarFloatingOptionTitleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvc2lkZWJhci9zaWRlYmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQ2pILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsdUNBQXVDLEVBQUUsTUFBTSx5RUFBeUUsQ0FBQzs7QUFFbEksTUFBTSxVQUFVLEdBQUc7SUFDakIsb0JBQW9CO0lBQ3BCLDBCQUEwQjtJQUMxQixrQ0FBa0M7SUFDbEMsdUNBQXVDO0NBQ3hDLENBQUM7QUFPRixNQUFNLE9BQU8saUJBQWlCO3dHQUFqQixpQkFBaUI7eUdBQWpCLGlCQUFpQixpQkFYNUIsb0JBQW9CO1lBQ3BCLDBCQUEwQjtZQUMxQixrQ0FBa0M7WUFDbEMsdUNBQXVDLGFBSTdCLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxhQVB2RSxvQkFBb0I7WUFDcEIsMEJBQTBCO1lBQzFCLGtDQUFrQztZQUNsQyx1Q0FBdUM7eUdBUTVCLGlCQUFpQixZQUpsQixZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLGFBQWE7OzRGQUk1RCxpQkFBaUI7a0JBTDdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxhQUFhLENBQUM7b0JBQ3hFLFlBQVksRUFBRSxVQUFVO29CQUN4QixPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQml6eVNpZGViYXJDb21wb25lbnQgfSBmcm9tICcuL3NpZGViYXIuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJpenlBY2NvcmRpb25Nb2R1bGUgfSBmcm9tICcuLi9hY2NvcmRpb24nO1xuaW1wb3J0IHsgQml6eVNpZGViYXJPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL3NpZGViYXItb3B0aW9uL3NpZGViYXItb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi9zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25UaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vc2lkZWJhci1mbG9hdGluZy1vcHRpb24tdGl0bGUvc2lkZWJhci1mbG9hdGluZy1vcHRpb24tdGl0bGUuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQml6eVNpZGViYXJDb21wb25lbnQsXG4gIEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50LFxuICBCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50LFxuICBCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uVGl0bGVDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBCaXp5QWNjb3JkaW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIEJpenlTaWRlYmFyTW9kdWxlIHt9XG4iXX0=