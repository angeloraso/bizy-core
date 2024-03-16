import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CheckboxModule } from '../checkbox';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableRowComponent } from './table-row/table-row.component';
import { TableColumnComponent } from './table-column/table-column.component';
import { TableColumnArrowsComponent } from './table-column-arrows/table-column-arrows.component';
import { TableScrollingDirective } from './table-scrolling/table-scrolling.directive';
import { TableScrollingComponent } from './table-scrolling/table-scrolling.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    TableComponent,
    TableHeaderComponent,
    TableFooterComponent,
    TableRowComponent,
    TableColumnComponent,
    TableColumnArrowsComponent,
    TableScrollingDirective,
    TableScrollingComponent
];
export class TableModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TableModule, declarations: [TableComponent,
            TableHeaderComponent,
            TableFooterComponent,
            TableRowComponent,
            TableColumnComponent,
            TableColumnArrowsComponent,
            TableScrollingDirective,
            TableScrollingComponent], imports: [CommonModule, FormsModule, ScrollingModule, CheckboxModule], exports: [TableComponent,
            TableHeaderComponent,
            TableFooterComponent,
            TableRowComponent,
            TableColumnComponent,
            TableColumnArrowsComponent,
            TableScrollingDirective,
            TableScrollingComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableModule, imports: [CommonModule, FormsModule, ScrollingModule, CheckboxModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ScrollingModule, CheckboxModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYmxlL3RhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOztBQUV0RixNQUFNLFVBQVUsR0FBZTtJQUM3QixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLDBCQUEwQjtJQUMxQix1QkFBdUI7SUFDdkIsdUJBQXVCO0NBQ3hCLENBQUM7QUFPRixNQUFNLE9BQU8sV0FBVzt3R0FBWCxXQUFXO3lHQUFYLFdBQVcsaUJBZnRCLGNBQWM7WUFDZCxvQkFBb0I7WUFDcEIsb0JBQW9CO1lBQ3BCLGlCQUFpQjtZQUNqQixvQkFBb0I7WUFDcEIsMEJBQTBCO1lBQzFCLHVCQUF1QjtZQUN2Qix1QkFBdUIsYUFJYixZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxjQUFjLGFBWHBFLGNBQWM7WUFDZCxvQkFBb0I7WUFDcEIsb0JBQW9CO1lBQ3BCLGlCQUFpQjtZQUNqQixvQkFBb0I7WUFDcEIsMEJBQTBCO1lBQzFCLHVCQUF1QjtZQUN2Qix1QkFBdUI7eUdBUVosV0FBVyxZQUpaLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGNBQWM7OzRGQUl6RCxXQUFXO2tCQUx2QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQztvQkFDckUsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQ2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9jaGVja2JveCc7XG5pbXBvcnQgeyBUYWJsZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtaGVhZGVyL3RhYmxlLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWZvb3Rlci90YWJsZS1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlUm93Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1yb3cvdGFibGUtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtY29sdW1uL3RhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVDb2x1bW5BcnJvd3NDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWNvbHVtbi1hcnJvd3MvdGFibGUtY29sdW1uLWFycm93cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVTY3JvbGxpbmdEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLXNjcm9sbGluZy90YWJsZS1zY3JvbGxpbmcuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRhYmxlU2Nyb2xsaW5nQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFM6IEFycmF5PGFueT4gPSBbXG4gIFRhYmxlQ29tcG9uZW50LFxuICBUYWJsZUhlYWRlckNvbXBvbmVudCxcbiAgVGFibGVGb290ZXJDb21wb25lbnQsXG4gIFRhYmxlUm93Q29tcG9uZW50LFxuICBUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgVGFibGVDb2x1bW5BcnJvd3NDb21wb25lbnQsXG4gIFRhYmxlU2Nyb2xsaW5nRGlyZWN0aXZlLFxuICBUYWJsZVNjcm9sbGluZ0NvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFNjcm9sbGluZ01vZHVsZSwgQ2hlY2tib3hNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IENPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVNb2R1bGUge31cbiJdfQ==