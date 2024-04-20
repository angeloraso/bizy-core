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
    BizyTableRowExpandContentComponent
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
            BizyTableRowExpandContentComponent], imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule], exports: [BizyTableComponent,
            BizyTableHeaderComponent,
            BizyTableFooterComponent,
            BizyTableRowComponent,
            BizyTableColumnComponent,
            BizyTableColumnArrowsComponent,
            BizyTableScrollingDirective,
            BizyTableScrollingComponent,
            BizyTableRowExpandContentComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYmxlL3RhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNyRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sK0RBQStELENBQUM7O0FBRW5ILE1BQU0sVUFBVSxHQUFlO0lBQzdCLGtCQUFrQjtJQUNsQix3QkFBd0I7SUFDeEIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQix3QkFBd0I7SUFDeEIsOEJBQThCO0lBQzlCLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0Isa0NBQWtDO0NBQ25DLENBQUM7QUFPRixNQUFNLE9BQU8sZUFBZTt3R0FBZixlQUFlO3lHQUFmLGVBQWUsaUJBaEIxQixrQkFBa0I7WUFDbEIsd0JBQXdCO1lBQ3hCLHdCQUF3QjtZQUN4QixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5QiwyQkFBMkI7WUFDM0IsMkJBQTJCO1lBQzNCLGtDQUFrQyxhQUl4QixZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsYUFaN0Ysa0JBQWtCO1lBQ2xCLHdCQUF3QjtZQUN4Qix3QkFBd0I7WUFDeEIscUJBQXFCO1lBQ3JCLHdCQUF3QjtZQUN4Qiw4QkFBOEI7WUFDOUIsMkJBQTJCO1lBQzNCLDJCQUEyQjtZQUMzQixrQ0FBa0M7eUdBUXZCLGVBQWUsWUFKaEIsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1COzs0RkFJbEYsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQztvQkFDOUYsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCaXp5VGFibGVDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IEJpenlDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2NoZWNrYm94JztcbmltcG9ydCB7IEJpenlUYWJsZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtaGVhZGVyL3RhYmxlLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eVRhYmxlRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1mb290ZXIvdGFibGUtZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5VGFibGVSb3dDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLXJvdy90YWJsZS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtY29sdW1uL3RhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eVRhYmxlQ29sdW1uQXJyb3dzQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1jb2x1bW4tYXJyb3dzL3RhYmxlLWNvbHVtbi1hcnJvd3MuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtc2Nyb2xsaW5nL3RhYmxlLXNjcm9sbGluZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQml6eVRhYmxlU2Nyb2xsaW5nQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5QWNjb3JkaW9uTW9kdWxlIH0gZnJvbSAnLi4vYWNjb3JkaW9uJztcbmltcG9ydCB7IEJpenlUYWJsZVJvd0V4cGFuZENvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLXJvdy1leHBhbmQtY29udGVudC90YWJsZS1yb3ctZXhwYW5kLWNvbnRlbnQuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUzogQXJyYXk8YW55PiA9IFtcbiAgQml6eVRhYmxlQ29tcG9uZW50LFxuICBCaXp5VGFibGVIZWFkZXJDb21wb25lbnQsXG4gIEJpenlUYWJsZUZvb3RlckNvbXBvbmVudCxcbiAgQml6eVRhYmxlUm93Q29tcG9uZW50LFxuICBCaXp5VGFibGVDb2x1bW5Db21wb25lbnQsXG4gIEJpenlUYWJsZUNvbHVtbkFycm93c0NvbXBvbmVudCxcbiAgQml6eVRhYmxlU2Nyb2xsaW5nRGlyZWN0aXZlLFxuICBCaXp5VGFibGVTY3JvbGxpbmdDb21wb25lbnQsXG4gIEJpenlUYWJsZVJvd0V4cGFuZENvbnRlbnRDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBTY3JvbGxpbmdNb2R1bGUsIEJpenlDaGVja2JveE1vZHVsZSwgQml6eUFjY29yZGlvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogQ09NUE9ORU5UUyxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5VGFibGVNb2R1bGUge31cbiJdfQ==