import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BizyCopyToClipboardComponent } from './copy-to-clipboard.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizyCopyToClipboardComponent,
];
export class BizyCopyToClipboardModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardModule, declarations: [BizyCopyToClipboardComponent], imports: [CommonModule, FormsModule, ClipboardModule], exports: [BizyCopyToClipboardComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardModule, imports: [CommonModule, FormsModule, ClipboardModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ClipboardModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS10by1jbGlwYm9hcmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2NvcHktdG8tY2xpcGJvYXJkL2NvcHktdG8tY2xpcGJvYXJkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUU3RSxNQUFNLFVBQVUsR0FBRztJQUNqQiw0QkFBNEI7Q0FDN0IsQ0FBQztBQU9GLE1BQU0sT0FBTyx5QkFBeUI7d0dBQXpCLHlCQUF5Qjt5R0FBekIseUJBQXlCLGlCQVJwQyw0QkFBNEIsYUFJbEIsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLGFBSnBELDRCQUE0Qjt5R0FRakIseUJBQXlCLFlBSjFCLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZTs7NEZBSXpDLHlCQUF5QjtrQkFMckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQztvQkFDckQsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDbGlwYm9hcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvY2xpcGJvYXJkJztcbmltcG9ydCB7IEJpenlDb3B5VG9DbGlwYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL2NvcHktdG8tY2xpcGJvYXJkLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIEJpenlDb3B5VG9DbGlwYm9hcmRDb21wb25lbnQsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgQ2xpcGJvYXJkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIEJpenlDb3B5VG9DbGlwYm9hcmRNb2R1bGUge31cbiJdfQ==