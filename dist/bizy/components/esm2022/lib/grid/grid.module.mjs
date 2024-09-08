import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BizyGridComponent } from './grid.component';
import { BizyGridForDirective } from './grid.directive';
import { BizyGridRowComponent } from './grid-row/grid-row.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizyGridComponent,
    BizyGridForDirective,
    BizyGridRowComponent
];
export class BizyGridModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyGridModule, declarations: [BizyGridComponent,
            BizyGridForDirective,
            BizyGridRowComponent], imports: [CommonModule, FormsModule, ScrollingModule], exports: [BizyGridComponent,
            BizyGridForDirective,
            BizyGridRowComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridModule, imports: [CommonModule, FormsModule, ScrollingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ScrollingModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZ3JpZC9ncmlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUVyRSxNQUFNLFVBQVUsR0FBZTtJQUM3QixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtDQUNyQixDQUFDO0FBT0YsTUFBTSxPQUFPLGNBQWM7d0dBQWQsY0FBYzt5R0FBZCxjQUFjLGlCQVZ6QixpQkFBaUI7WUFDakIsb0JBQW9CO1lBQ3BCLG9CQUFvQixhQUlWLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxhQU5wRCxpQkFBaUI7WUFDakIsb0JBQW9CO1lBQ3BCLG9CQUFvQjt5R0FRVCxjQUFjLFlBSmYsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlOzs0RkFJekMsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQztvQkFDckQsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IEJpenlHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5R3JpZEZvckRpcmVjdGl2ZSB9IGZyb20gJy4vZ3JpZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQml6eUdyaWRSb3dDb21wb25lbnQgfSBmcm9tICcuL2dyaWQtcm93L2dyaWQtcm93LmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFM6IEFycmF5PGFueT4gPSBbXG4gIEJpenlHcmlkQ29tcG9uZW50LFxuICBCaXp5R3JpZEZvckRpcmVjdGl2ZSxcbiAgQml6eUdyaWRSb3dDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBTY3JvbGxpbmdNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IENPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgQml6eUdyaWRNb2R1bGUge31cbiJdfQ==