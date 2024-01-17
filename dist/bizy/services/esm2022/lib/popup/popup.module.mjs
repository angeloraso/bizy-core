import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupWrapperComponent } from './popup-wrapper/popup-wrapper.component';
import { PopupService } from './popup.service';
import { DialogModule } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
const COMPONENTS = [
    PopupWrapperComponent,
];
export class PopupModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: PopupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.9", ngImport: i0, type: PopupModule, declarations: [PopupWrapperComponent], imports: [CommonModule, FormsModule, DialogModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: PopupModule, providers: [PopupService], imports: [CommonModule, FormsModule, DialogModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: PopupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, DialogModule],
                    declarations: COMPONENTS,
                    providers: [PopupService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi9wb3B1cC9wb3B1cC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRW5ELE1BQU0sVUFBVSxHQUFHO0lBQ2pCLHFCQUFxQjtDQUN0QixDQUFDO0FBT0YsTUFBTSxPQUFPLFdBQVc7dUdBQVgsV0FBVzt3R0FBWCxXQUFXLGlCQVJ0QixxQkFBcUIsYUFJWCxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVk7d0dBSXRDLFdBQVcsYUFGWCxDQUFDLFlBQVksQ0FBQyxZQUZmLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWTs7MkZBSXRDLFdBQVc7a0JBTHZCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7b0JBQ2xELFlBQVksRUFBRSxVQUFVO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBvcHVwV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vcG9wdXAtd3JhcHBlci9wb3B1cC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RpYWxvZyc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIFBvcHVwV3JhcHBlckNvbXBvbmVudCxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBEaWFsb2dNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIHByb3ZpZGVyczogW1BvcHVwU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBNb2R1bGUge31cbiJdfQ==