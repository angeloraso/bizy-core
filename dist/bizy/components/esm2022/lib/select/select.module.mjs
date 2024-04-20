import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizySelectComponent } from './select.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizySelectOptionComponent } from './select-option/select-option.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizySelectComponent,
    BizySelectOptionComponent
];
export class BizySelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, declarations: [BizySelectComponent,
            BizySelectOptionComponent], imports: [CommonModule, FormsModule, OverlayModule], exports: [BizySelectComponent,
            BizySelectOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, imports: [CommonModule, FormsModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zZWxlY3Qvc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOztBQUVwRixNQUFNLFVBQVUsR0FBRztJQUNqQixtQkFBbUI7SUFDbkIseUJBQXlCO0NBQzFCLENBQUM7QUFPRixNQUFNLE9BQU8sZ0JBQWdCO3dHQUFoQixnQkFBZ0I7eUdBQWhCLGdCQUFnQixpQkFUM0IsbUJBQW1CO1lBQ25CLHlCQUF5QixhQUlmLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxhQUxsRCxtQkFBbUI7WUFDbkIseUJBQXlCO3lHQVFkLGdCQUFnQixZQUpqQixZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWE7OzRGQUl2QyxnQkFBZ0I7a0JBTDVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUM7b0JBQ25ELFlBQVksRUFBRSxVQUFVO29CQUN4QixPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQml6eVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQml6eVNlbGVjdE9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LW9wdGlvbi9zZWxlY3Qtb3B0aW9uLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIEJpenlTZWxlY3RDb21wb25lbnQsXG4gIEJpenlTZWxlY3RPcHRpb25Db21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIEJpenlTZWxlY3RNb2R1bGUge31cbiJdfQ==