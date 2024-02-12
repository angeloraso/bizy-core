import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { FilterSectionOptionComponent } from './filter-section-option/filter-section-option.component';
import { CheckboxModule } from '../checkbox';
import { FilterPipe } from './filter.pipe';
import * as i0 from "@angular/core";
const COMPONENTS = [
    FilterComponent,
    FilterSectionComponent,
    FilterSectionOptionComponent,
    FilterPipe
];
export class FilterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, declarations: [FilterComponent,
            FilterSectionComponent,
            FilterSectionOptionComponent,
            FilterPipe], imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule], exports: [FilterComponent,
            FilterSectionComponent,
            FilterSectionOptionComponent,
            FilterPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, providers: [FilterPipe], imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS,
                    providers: [FilterPipe]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLGVBQWU7SUFDZixzQkFBc0I7SUFDdEIsNEJBQTRCO0lBQzVCLFVBQVU7Q0FDWCxDQUFDO0FBUUYsTUFBTSxPQUFPLFlBQVk7d0dBQVosWUFBWTt5R0FBWixZQUFZLGlCQVp2QixlQUFlO1lBQ2Ysc0JBQXNCO1lBQ3RCLDRCQUE0QjtZQUM1QixVQUFVLGFBSUEsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsY0FBYyxhQVBsRSxlQUFlO1lBQ2Ysc0JBQXNCO1lBQ3RCLDRCQUE0QjtZQUM1QixVQUFVO3lHQVNDLFlBQVksYUFGWixDQUFDLFVBQVUsQ0FBQyxZQUhiLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGNBQWM7OzRGQUt2RCxZQUFZO2tCQU54QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGNBQWMsQ0FBQztvQkFDbkUsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO29CQUNuQixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRmlsdGVyU2VjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLXNlY3Rpb24vZmlsdGVyLXNlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlclNlY3Rpb25PcHRpb25Db21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1zZWN0aW9uLW9wdGlvbi9maWx0ZXItc2VjdGlvbi1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY2hlY2tib3gnO1xuaW1wb3J0IHsgRmlsdGVyUGlwZSB9IGZyb20gJy4vZmlsdGVyLnBpcGUnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBGaWx0ZXJDb21wb25lbnQsXG4gIEZpbHRlclNlY3Rpb25Db21wb25lbnQsXG4gIEZpbHRlclNlY3Rpb25PcHRpb25Db21wb25lbnQsXG4gIEZpbHRlclBpcGVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBDaGVja2JveE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogQ09NUE9ORU5UUyxcbiAgZXhwb3J0czogQ09NUE9ORU5UUyxcbiAgcHJvdmlkZXJzOiBbRmlsdGVyUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyTW9kdWxlIHt9XG4iXX0=