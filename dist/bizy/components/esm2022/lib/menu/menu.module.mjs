import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuOptionComponent } from './menu-option/menu-option.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    MenuComponent,
    MenuOptionComponent
];
export class MenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: MenuModule, declarations: [MenuComponent,
            MenuOptionComponent], imports: [CommonModule, FormsModule, OverlayModule], exports: [MenuComponent,
            MenuOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuModule, imports: [CommonModule, FormsModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvbWVudS9tZW51Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7QUFFMUUsTUFBTSxVQUFVLEdBQUc7SUFDakIsYUFBYTtJQUNiLG1CQUFtQjtDQUNwQixDQUFDO0FBT0YsTUFBTSxPQUFPLFVBQVU7d0dBQVYsVUFBVTt5R0FBVixVQUFVLGlCQVRyQixhQUFhO1lBQ2IsbUJBQW1CLGFBSVQsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLGFBTGxELGFBQWE7WUFDYixtQkFBbUI7eUdBUVIsVUFBVSxZQUpYLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYTs7NEZBSXZDLFVBQVU7a0JBTHRCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUM7b0JBQ25ELFlBQVksRUFBRSxVQUFVO29CQUN4QixPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE1lbnVPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL21lbnUtb3B0aW9uL21lbnUtb3B0aW9uLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIE1lbnVDb21wb25lbnQsXG4gIE1lbnVPcHRpb25Db21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVNb2R1bGUge31cbiJdfQ==