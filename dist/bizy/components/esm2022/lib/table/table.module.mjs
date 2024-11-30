import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyTableComponent } from './table.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BizyCheckboxModule } from '../checkbox';
import { BizyTableHeaderComponent } from './table-header/table-header.component';
import { BizyTableFooterComponent } from './table-footer/table-footer.component';
import { BizyTableRowComponent } from './table-row/table-row.component';
import { BizyTableColumnComponent } from './table-column/table-column.component';
import { BizyTableColumnArrowsComponent } from './table-column-arrows/table-column-arrows.component';
import { BizyTableScrollingDirective } from './table-scrolling/table-scrolling.directive';
import { BizyTableScrollingComponent } from './table-scrolling/table-scrolling.component';
import { BizyAccordionModule } from '../accordion';
import { BizyTableRowExpandContentComponent } from './table-row-expand-content/table-row-expand-content.component';
import { BizyTableColumnFixedDirective } from './directives';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizyTableComponent,
    BizyTableHeaderComponent,
    BizyTableFooterComponent,
    BizyTableRowComponent,
    BizyTableColumnComponent,
    BizyTableColumnArrowsComponent,
    BizyTableScrollingDirective,
    BizyTableScrollingComponent,
    BizyTableRowExpandContentComponent,
];
const DIRECTIVES = [
    BizyTableColumnFixedDirective
];
export class BizyTableModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, declarations: [BizyTableComponent,
            BizyTableHeaderComponent,
            BizyTableFooterComponent,
            BizyTableRowComponent,
            BizyTableColumnComponent,
            BizyTableColumnArrowsComponent,
            BizyTableScrollingDirective,
            BizyTableScrollingComponent,
            BizyTableRowExpandContentComponent, BizyTableColumnFixedDirective], imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule], exports: [BizyTableComponent,
            BizyTableHeaderComponent,
            BizyTableFooterComponent,
            BizyTableRowComponent,
            BizyTableColumnComponent,
            BizyTableColumnArrowsComponent,
            BizyTableScrollingDirective,
            BizyTableScrollingComponent,
            BizyTableRowExpandContentComponent, BizyTableColumnFixedDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule],
                    declarations: COMPONENTS.concat(DIRECTIVES),
                    exports: COMPONENTS.concat(DIRECTIVES)
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYmxlL3RhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNyRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDbkgsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sY0FBYyxDQUFDOztBQUU3RCxNQUFNLFVBQVUsR0FBZTtJQUM3QixrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsd0JBQXdCO0lBQ3hCLDhCQUE4QjtJQUM5QiwyQkFBMkI7SUFDM0IsMkJBQTJCO0lBQzNCLGtDQUFrQztDQUNuQyxDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQWU7SUFDN0IsNkJBQTZCO0NBQzlCLENBQUE7QUFPRCxNQUFNLE9BQU8sZUFBZTt3R0FBZixlQUFlO3lHQUFmLGVBQWUsaUJBcEIxQixrQkFBa0I7WUFDbEIsd0JBQXdCO1lBQ3hCLHdCQUF3QjtZQUN4QixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5QiwyQkFBMkI7WUFDM0IsMkJBQTJCO1lBQzNCLGtDQUFrQyxFQUlsQyw2QkFBNkIsYUFJbkIsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLGFBaEI3RixrQkFBa0I7WUFDbEIsd0JBQXdCO1lBQ3hCLHdCQUF3QjtZQUN4QixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5QiwyQkFBMkI7WUFDM0IsMkJBQTJCO1lBQzNCLGtDQUFrQyxFQUlsQyw2QkFBNkI7eUdBUWxCLGVBQWUsWUFKaEIsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1COzs0RkFJbEYsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQztvQkFDOUYsWUFBWSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO29CQUMzQyxPQUFPLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7aUJBQ3ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJpenlUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQml6eUNoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY2hlY2tib3gnO1xuaW1wb3J0IHsgQml6eVRhYmxlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5VGFibGVGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWZvb3Rlci90YWJsZS1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlUYWJsZVJvd0NvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtcm93L3RhYmxlLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eVRhYmxlQ29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1jb2x1bW4vdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5VGFibGVDb2x1bW5BcnJvd3NDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWNvbHVtbi1hcnJvd3MvdGFibGUtY29sdW1uLWFycm93cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eVRhYmxlU2Nyb2xsaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCaXp5VGFibGVTY3JvbGxpbmdDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLXNjcm9sbGluZy90YWJsZS1zY3JvbGxpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlBY2NvcmRpb25Nb2R1bGUgfSBmcm9tICcuLi9hY2NvcmRpb24nO1xuaW1wb3J0IHsgQml6eVRhYmxlUm93RXhwYW5kQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtcm93LWV4cGFuZC1jb250ZW50L3RhYmxlLXJvdy1leHBhbmQtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eVRhYmxlQ29sdW1uRml4ZWREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMnO1xuXG5jb25zdCBDT01QT05FTlRTOiBBcnJheTxhbnk+ID0gW1xuICBCaXp5VGFibGVDb21wb25lbnQsXG4gIEJpenlUYWJsZUhlYWRlckNvbXBvbmVudCxcbiAgQml6eVRhYmxlRm9vdGVyQ29tcG9uZW50LFxuICBCaXp5VGFibGVSb3dDb21wb25lbnQsXG4gIEJpenlUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgQml6eVRhYmxlQ29sdW1uQXJyb3dzQ29tcG9uZW50LFxuICBCaXp5VGFibGVTY3JvbGxpbmdEaXJlY3RpdmUsXG4gIEJpenlUYWJsZVNjcm9sbGluZ0NvbXBvbmVudCxcbiAgQml6eVRhYmxlUm93RXhwYW5kQ29udGVudENvbXBvbmVudCxcbl07XG5cbmNvbnN0IERJUkVDVElWRVM6IEFycmF5PGFueT4gPSBbXG4gIEJpenlUYWJsZUNvbHVtbkZpeGVkRGlyZWN0aXZlXG5dXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBTY3JvbGxpbmdNb2R1bGUsIEJpenlDaGVja2JveE1vZHVsZSwgQml6eUFjY29yZGlvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogQ09NUE9ORU5UUy5jb25jYXQoRElSRUNUSVZFUyksXG4gIGV4cG9ydHM6IENPTVBPTkVOVFMuY29uY2F0KERJUkVDVElWRVMpXG59KVxuZXhwb3J0IGNsYXNzIEJpenlUYWJsZU1vZHVsZSB7fVxuIl19