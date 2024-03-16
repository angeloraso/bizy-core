import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { CheckboxModule } from '../checkbox';
import { FilterPipe, RangeFilterPipe } from './pipes';
import { FilterSectionRangeOptionComponent } from './filter-section-range-option/filter-section-range-option.component';
import { InputModule } from '../input';
import { SliderModule } from '../slider';
import { FilterSectionCheckboxOptionComponent } from './filter-section-checkbox-option/filter-section-checkbox-option.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    FilterComponent,
    FilterSectionComponent,
    FilterSectionCheckboxOptionComponent,
    FilterSectionRangeOptionComponent,
    FilterPipe,
    RangeFilterPipe,
];
export class FilterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, declarations: [FilterComponent,
            FilterSectionComponent,
            FilterSectionCheckboxOptionComponent,
            FilterSectionRangeOptionComponent,
            FilterPipe,
            RangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule, InputModule, SliderModule], exports: [FilterComponent,
            FilterSectionComponent,
            FilterSectionCheckboxOptionComponent,
            FilterSectionRangeOptionComponent,
            FilterPipe,
            RangeFilterPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, providers: [FilterPipe, RangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule, InputModule, SliderModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule, InputModule, SliderModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS,
                    providers: [FilterPipe, RangeFilterPipe]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSwyRUFBMkUsQ0FBQzs7QUFFakksTUFBTSxVQUFVLEdBQUc7SUFDakIsZUFBZTtJQUNmLHNCQUFzQjtJQUN0QixvQ0FBb0M7SUFDcEMsaUNBQWlDO0lBQ2pDLFVBQVU7SUFDVixlQUFlO0NBQ2hCLENBQUM7QUFRRixNQUFNLE9BQU8sWUFBWTt3R0FBWixZQUFZO3lHQUFaLFlBQVksaUJBZHZCLGVBQWU7WUFDZixzQkFBc0I7WUFDdEIsb0NBQW9DO1lBQ3BDLGlDQUFpQztZQUNqQyxVQUFVO1lBQ1YsZUFBZSxhQUlMLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsWUFBWSxhQVQ3RixlQUFlO1lBQ2Ysc0JBQXNCO1lBQ3RCLG9DQUFvQztZQUNwQyxpQ0FBaUM7WUFDakMsVUFBVTtZQUNWLGVBQWU7eUdBU0osWUFBWSxhQUZaLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxZQUg5QixZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLFlBQVk7OzRGQUtsRixZQUFZO2tCQU54QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDO29CQUM5RixZQUFZLEVBQUUsVUFBVTtvQkFDeEIsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFNBQVMsRUFBRSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUM7aUJBQ3pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRmlsdGVyU2VjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLXNlY3Rpb24vZmlsdGVyLXNlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY2hlY2tib3gnO1xuaW1wb3J0IHsgRmlsdGVyUGlwZSwgUmFuZ2VGaWx0ZXJQaXBlIH0gZnJvbSAnLi9waXBlcyc7XG5pbXBvcnQgeyBGaWx0ZXJTZWN0aW9uUmFuZ2VPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi9maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IElucHV0TW9kdWxlIH0gZnJvbSAnLi4vaW5wdXQnO1xuaW1wb3J0IHsgU2xpZGVyTW9kdWxlIH0gZnJvbSAnLi4vc2xpZGVyJztcbmltcG9ydCB7IEZpbHRlclNlY3Rpb25DaGVja2JveE9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uL2ZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbi5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBGaWx0ZXJDb21wb25lbnQsXG4gIEZpbHRlclNlY3Rpb25Db21wb25lbnQsXG4gIEZpbHRlclNlY3Rpb25DaGVja2JveE9wdGlvbkNvbXBvbmVudCxcbiAgRmlsdGVyU2VjdGlvblJhbmdlT3B0aW9uQ29tcG9uZW50LFxuICBGaWx0ZXJQaXBlLFxuICBSYW5nZUZpbHRlclBpcGUsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgT3ZlcmxheU1vZHVsZSwgQ2hlY2tib3hNb2R1bGUsIElucHV0TW9kdWxlLCBTbGlkZXJNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IENPTVBPTkVOVFMsXG4gIHByb3ZpZGVyczogW0ZpbHRlclBpcGUsIFJhbmdlRmlsdGVyUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyTW9kdWxlIHt9XG4iXX0=