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
import * as i0 from "@angular/core";
const COMPONENTS = [
    TableComponent,
    TableHeaderComponent,
    TableFooterComponent,
    TableRowComponent,
    TableColumnComponent,
    TableColumnArrowsComponent
];
export class TableModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TableModule, declarations: [TableComponent,
            TableHeaderComponent,
            TableFooterComponent,
            TableRowComponent,
            TableColumnComponent,
            TableColumnArrowsComponent], imports: [CommonModule, FormsModule, ScrollingModule, CheckboxModule], exports: [TableComponent,
            TableHeaderComponent,
            TableFooterComponent,
            TableRowComponent,
            TableColumnComponent,
            TableColumnArrowsComponent] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYmxlL3RhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDOztBQUVqRyxNQUFNLFVBQVUsR0FBZTtJQUM3QixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLDBCQUEwQjtDQUMzQixDQUFDO0FBT0YsTUFBTSxPQUFPLFdBQVc7d0dBQVgsV0FBVzt5R0FBWCxXQUFXLGlCQWJ0QixjQUFjO1lBQ2Qsb0JBQW9CO1lBQ3BCLG9CQUFvQjtZQUNwQixpQkFBaUI7WUFDakIsb0JBQW9CO1lBQ3BCLDBCQUEwQixhQUloQixZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxjQUFjLGFBVHBFLGNBQWM7WUFDZCxvQkFBb0I7WUFDcEIsb0JBQW9CO1lBQ3BCLGlCQUFpQjtZQUNqQixvQkFBb0I7WUFDcEIsMEJBQTBCO3lHQVFmLFdBQVcsWUFKWixZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxjQUFjOzs0RkFJekQsV0FBVztrQkFMdkIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUM7b0JBQ3JFLFlBQVksRUFBRSxVQUFVO29CQUN4QixPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY2hlY2tib3gnO1xuaW1wb3J0IHsgVGFibGVIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWhlYWRlci90YWJsZS1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1mb290ZXIvdGFibGUtZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJsZVJvd0NvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtcm93L3RhYmxlLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWNvbHVtbi90YWJsZS1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlQ29sdW1uQXJyb3dzQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1jb2x1bW4tYXJyb3dzL3RhYmxlLWNvbHVtbi1hcnJvd3MuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUzogQXJyYXk8YW55PiA9IFtcbiAgVGFibGVDb21wb25lbnQsXG4gIFRhYmxlSGVhZGVyQ29tcG9uZW50LFxuICBUYWJsZUZvb3RlckNvbXBvbmVudCxcbiAgVGFibGVSb3dDb21wb25lbnQsXG4gIFRhYmxlQ29sdW1uQ29tcG9uZW50LFxuICBUYWJsZUNvbHVtbkFycm93c0NvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFNjcm9sbGluZ01vZHVsZSwgQ2hlY2tib3hNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IENPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVNb2R1bGUge31cbiJdfQ==