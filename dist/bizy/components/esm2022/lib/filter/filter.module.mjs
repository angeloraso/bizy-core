import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyFilterComponent } from './filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyFilterSectionComponent } from './filter-section/filter-section.component';
import { BizyCheckboxModule } from '../checkbox';
import { BizyFilterPipe, BizyRangeFilterPipe } from './pipes';
import { BizyFilterSectionRangeOptionComponent } from './filter-section-range-option/filter-section-range-option.component';
import { BizyFilterSectionCheckboxOptionComponent } from './filter-section-checkbox-option/filter-section-checkbox-option.component';
import { BizyFilterSectionSearchOptionComponent } from './filter-section-search-option/filter-section-search-option.component';
import { BizyInputModule } from '../input';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizyFilterComponent,
    BizyFilterSectionComponent,
    BizyFilterSectionCheckboxOptionComponent,
    BizyFilterSectionRangeOptionComponent,
    BizyFilterSectionSearchOptionComponent,
    BizyFilterPipe,
    BizyRangeFilterPipe,
];
export class BizyFilterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, declarations: [BizyFilterComponent,
            BizyFilterSectionComponent,
            BizyFilterSectionCheckboxOptionComponent,
            BizyFilterSectionRangeOptionComponent,
            BizyFilterSectionSearchOptionComponent,
            BizyFilterPipe,
            BizyRangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule], exports: [BizyFilterComponent,
            BizyFilterSectionComponent,
            BizyFilterSectionCheckboxOptionComponent,
            BizyFilterSectionRangeOptionComponent,
            BizyFilterSectionSearchOptionComponent,
            BizyFilterPipe,
            BizyRangeFilterPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, providers: [BizyFilterPipe, BizyRangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS,
                    providers: [BizyFilterPipe, BizyRangeFilterPipe]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzlELE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQzVILE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLDJFQUEyRSxDQUFDO0FBQ3JJLE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLHVFQUF1RSxDQUFDO0FBQy9ILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBRTNDLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLG1CQUFtQjtJQUNuQiwwQkFBMEI7SUFDMUIsd0NBQXdDO0lBQ3hDLHFDQUFxQztJQUNyQyxzQ0FBc0M7SUFDdEMsY0FBYztJQUNkLG1CQUFtQjtDQUNwQixDQUFDO0FBUUYsTUFBTSxPQUFPLGdCQUFnQjt3R0FBaEIsZ0JBQWdCO3lHQUFoQixnQkFBZ0IsaUJBZjNCLG1CQUFtQjtZQUNuQiwwQkFBMEI7WUFDMUIsd0NBQXdDO1lBQ3hDLHFDQUFxQztZQUNyQyxzQ0FBc0M7WUFDdEMsY0FBYztZQUNkLG1CQUFtQixhQUlULFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsYUFWdkYsbUJBQW1CO1lBQ25CLDBCQUEwQjtZQUMxQix3Q0FBd0M7WUFDeEMscUNBQXFDO1lBQ3JDLHNDQUFzQztZQUN0QyxjQUFjO1lBQ2QsbUJBQW1CO3lHQVNSLGdCQUFnQixhQUZoQixDQUFDLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxZQUh0QyxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxlQUFlOzs0RkFLNUUsZ0JBQWdCO2tCQU41QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsQ0FBQztvQkFDeEYsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO29CQUNuQixTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUM7aUJBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJpenlGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEJpenlGaWx0ZXJTZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXItc2VjdGlvbi9maWx0ZXItc2VjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eUNoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY2hlY2tib3gnO1xuaW1wb3J0IHsgQml6eUZpbHRlclBpcGUsIEJpenlSYW5nZUZpbHRlclBpcGUgfSBmcm9tICcuL3BpcGVzJztcbmltcG9ydCB7IEJpenlGaWx0ZXJTZWN0aW9uUmFuZ2VPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi9maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlGaWx0ZXJTZWN0aW9uQ2hlY2tib3hPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbi9maWx0ZXItc2VjdGlvbi1jaGVja2JveC1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlGaWx0ZXJTZWN0aW9uU2VhcmNoT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXItc2VjdGlvbi1zZWFyY2gtb3B0aW9uL2ZpbHRlci1zZWN0aW9uLXNlYXJjaC1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlJbnB1dE1vZHVsZSB9IGZyb20gJy4uL2lucHV0JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQml6eUZpbHRlckNvbXBvbmVudCxcbiAgQml6eUZpbHRlclNlY3Rpb25Db21wb25lbnQsXG4gIEJpenlGaWx0ZXJTZWN0aW9uQ2hlY2tib3hPcHRpb25Db21wb25lbnQsXG4gIEJpenlGaWx0ZXJTZWN0aW9uUmFuZ2VPcHRpb25Db21wb25lbnQsXG4gIEJpenlGaWx0ZXJTZWN0aW9uU2VhcmNoT3B0aW9uQ29tcG9uZW50LFxuICBCaXp5RmlsdGVyUGlwZSxcbiAgQml6eVJhbmdlRmlsdGVyUGlwZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBCaXp5Q2hlY2tib3hNb2R1bGUsIEJpenlJbnB1dE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogQ09NUE9ORU5UUyxcbiAgZXhwb3J0czogQ09NUE9ORU5UUyxcbiAgcHJvdmlkZXJzOiBbQml6eUZpbHRlclBpcGUsIEJpenlSYW5nZUZpbHRlclBpcGVdXG59KVxuZXhwb3J0IGNsYXNzIEJpenlGaWx0ZXJNb2R1bGUge31cbiJdfQ==