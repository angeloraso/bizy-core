import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyFilterComponent } from './filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyFilterSectionComponent } from './filter-section/filter-section.component';
import { BizyCheckboxModule } from '../checkbox';
import { BizyFilterPipe, BizyRangeFilterPipe } from './pipes';
import { BizyFilterSectionRangeOptionComponent } from './filter-section-range-option/filter-section-range-option.component';
import { BizyInputModule } from '../input';
import { BizyFilterSectionCheckboxOptionComponent } from './filter-section-checkbox-option/filter-section-checkbox-option.component';
import { BizyFilterSectionSearchOptionComponent } from './filter-section-search-option/filter-section-search-option.component';
import { BizyFilterSectionsComponent } from './filter-sections/filter-sections.component';
import { BizyFilterContentComponent } from './filter-content/filter-content.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizyFilterComponent,
    BizyFilterContentComponent,
    BizyFilterSectionsComponent,
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
            BizyFilterContentComponent,
            BizyFilterSectionsComponent,
            BizyFilterSectionComponent,
            BizyFilterSectionCheckboxOptionComponent,
            BizyFilterSectionRangeOptionComponent,
            BizyFilterSectionSearchOptionComponent,
            BizyFilterPipe,
            BizyRangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule], exports: [BizyFilterComponent,
            BizyFilterContentComponent,
            BizyFilterSectionsComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzlELE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQzVILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sMkVBQTJFLENBQUM7QUFDckksT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sdUVBQXVFLENBQUM7QUFDL0gsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBRXZGLE1BQU0sVUFBVSxHQUFlO0lBQzdCLG1CQUFtQjtJQUNuQiwwQkFBMEI7SUFDMUIsMkJBQTJCO0lBQzNCLDBCQUEwQjtJQUMxQix3Q0FBd0M7SUFDeEMscUNBQXFDO0lBQ3JDLHNDQUFzQztJQUN0QyxjQUFjO0lBQ2QsbUJBQW1CO0NBQ3BCLENBQUM7QUFRRixNQUFNLE9BQU8sZ0JBQWdCO3dHQUFoQixnQkFBZ0I7eUdBQWhCLGdCQUFnQixpQkFqQjNCLG1CQUFtQjtZQUNuQiwwQkFBMEI7WUFDMUIsMkJBQTJCO1lBQzNCLDBCQUEwQjtZQUMxQix3Q0FBd0M7WUFDeEMscUNBQXFDO1lBQ3JDLHNDQUFzQztZQUN0QyxjQUFjO1lBQ2QsbUJBQW1CLGFBSVQsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxhQVp2RixtQkFBbUI7WUFDbkIsMEJBQTBCO1lBQzFCLDJCQUEyQjtZQUMzQiwwQkFBMEI7WUFDMUIsd0NBQXdDO1lBQ3hDLHFDQUFxQztZQUNyQyxzQ0FBc0M7WUFDdEMsY0FBYztZQUNkLG1CQUFtQjt5R0FTUixnQkFBZ0IsYUFGaEIsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsWUFIdEMsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsZUFBZTs7NEZBSzVFLGdCQUFnQjtrQkFONUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLENBQUM7b0JBQ3hGLFlBQVksRUFBRSxVQUFVO29CQUN4QixPQUFPLEVBQUUsVUFBVTtvQkFDbkIsU0FBUyxFQUFFLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDO2lCQUNqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCaXp5RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBCaXp5RmlsdGVyU2VjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLXNlY3Rpb24vZmlsdGVyLXNlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2NoZWNrYm94JztcbmltcG9ydCB7IEJpenlGaWx0ZXJQaXBlLCBCaXp5UmFuZ2VGaWx0ZXJQaXBlIH0gZnJvbSAnLi9waXBlcyc7XG5pbXBvcnQgeyBCaXp5RmlsdGVyU2VjdGlvblJhbmdlT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb24vZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5SW5wdXRNb2R1bGUgfSBmcm9tICcuLi9pbnB1dCc7XG5pbXBvcnQgeyBCaXp5RmlsdGVyU2VjdGlvbkNoZWNrYm94T3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXItc2VjdGlvbi1jaGVja2JveC1vcHRpb24vZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5RmlsdGVyU2VjdGlvblNlYXJjaE9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi9maWx0ZXItc2VjdGlvbi1zZWFyY2gtb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5RmlsdGVyU2VjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1zZWN0aW9ucy9maWx0ZXItc2VjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlGaWx0ZXJDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXItY29udGVudC9maWx0ZXItY29udGVudC5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTOiBBcnJheTxhbnk+ID0gW1xuICBCaXp5RmlsdGVyQ29tcG9uZW50LFxuICBCaXp5RmlsdGVyQ29udGVudENvbXBvbmVudCxcbiAgQml6eUZpbHRlclNlY3Rpb25zQ29tcG9uZW50LFxuICBCaXp5RmlsdGVyU2VjdGlvbkNvbXBvbmVudCxcbiAgQml6eUZpbHRlclNlY3Rpb25DaGVja2JveE9wdGlvbkNvbXBvbmVudCxcbiAgQml6eUZpbHRlclNlY3Rpb25SYW5nZU9wdGlvbkNvbXBvbmVudCxcbiAgQml6eUZpbHRlclNlY3Rpb25TZWFyY2hPcHRpb25Db21wb25lbnQsXG4gIEJpenlGaWx0ZXJQaXBlLFxuICBCaXp5UmFuZ2VGaWx0ZXJQaXBlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIEJpenlDaGVja2JveE1vZHVsZSwgQml6eUlucHV0TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBleHBvcnRzOiBDT01QT05FTlRTLFxuICBwcm92aWRlcnM6IFtCaXp5RmlsdGVyUGlwZSwgQml6eVJhbmdlRmlsdGVyUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgQml6eUZpbHRlck1vZHVsZSB7fVxuIl19