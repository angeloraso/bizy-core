import { NgModule } from '@angular/core';
import { BizySidebarNewComponent } from './sidebar-new.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyAccordionModule } from '../accordion';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizySidebarFloatingOptionTitleComponent } from './sidebar-floating-option-title/sidebar-floating-option-title.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizySidebarNewComponent,
    BizySidebarOptionComponent,
    BizySidebarFloatingOptionComponent,
    BizySidebarFloatingOptionTitleComponent
];
export class BizySidebarNewModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarNewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarNewModule, declarations: [BizySidebarNewComponent,
            BizySidebarOptionComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarFloatingOptionTitleComponent], imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule], exports: [BizySidebarNewComponent,
            BizySidebarOptionComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarFloatingOptionTitleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarNewModule, imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarNewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1uZXcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1uZXcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDakgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLHlFQUF5RSxDQUFDOztBQUVsSSxNQUFNLFVBQVUsR0FBRztJQUNqQix1QkFBdUI7SUFDdkIsMEJBQTBCO0lBQzFCLGtDQUFrQztJQUNsQyx1Q0FBdUM7Q0FDeEMsQ0FBQztBQU9GLE1BQU0sT0FBTyxvQkFBb0I7d0dBQXBCLG9CQUFvQjt5R0FBcEIsb0JBQW9CLGlCQVgvQix1QkFBdUI7WUFDdkIsMEJBQTBCO1lBQzFCLGtDQUFrQztZQUNsQyx1Q0FBdUMsYUFJN0IsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxhQUFhLGFBUHZFLHVCQUF1QjtZQUN2QiwwQkFBMEI7WUFDMUIsa0NBQWtDO1lBQ2xDLHVDQUF1Qzt5R0FRNUIsb0JBQW9CLFlBSnJCLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsYUFBYTs7NEZBSTVELG9CQUFvQjtrQkFMaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLGFBQWEsQ0FBQztvQkFDeEUsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5U2lkZWJhck5ld0NvbXBvbmVudCB9IGZyb20gJy4vc2lkZWJhci1uZXcuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJpenlBY2NvcmRpb25Nb2R1bGUgfSBmcm9tICcuLi9hY2NvcmRpb24nO1xuaW1wb3J0IHsgQml6eVNpZGViYXJPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL3NpZGViYXItb3B0aW9uL3NpZGViYXItb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi9zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25UaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vc2lkZWJhci1mbG9hdGluZy1vcHRpb24tdGl0bGUvc2lkZWJhci1mbG9hdGluZy1vcHRpb24tdGl0bGUuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQml6eVNpZGViYXJOZXdDb21wb25lbnQsXG4gIEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50LFxuICBCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50LFxuICBCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uVGl0bGVDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBCaXp5QWNjb3JkaW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIEJpenlTaWRlYmFyTmV3TW9kdWxlIHt9XG4iXX0=