import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyDatePickerComponent } from './date-picker.component';
import { BizyInputModule } from '../input';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizyDatePickerComponent,
];
export class BizyDatePickerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerModule, declarations: [BizyDatePickerComponent], imports: [CommonModule, FormsModule, BizyInputModule], exports: [BizyDatePickerComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerModule, providers: [DatePipe], imports: [CommonModule, FormsModule, BizyInputModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, BizyInputModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS,
                    providers: [DatePipe]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBRTNDLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLHVCQUF1QjtDQUN4QixDQUFDO0FBUUYsTUFBTSxPQUFPLG9CQUFvQjt3R0FBcEIsb0JBQW9CO3lHQUFwQixvQkFBb0IsaUJBVC9CLHVCQUF1QixhQUliLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxhQUpwRCx1QkFBdUI7eUdBU1osb0JBQW9CLGFBRnBCLENBQUMsUUFBUSxDQUFDLFlBSFgsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlOzs0RkFLekMsb0JBQW9CO2tCQU5oQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDO29CQUNyRCxZQUFZLEVBQUUsVUFBVTtvQkFDeEIsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJpenlEYXRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eUlucHV0TW9kdWxlIH0gZnJvbSAnLi4vaW5wdXQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBCaXp5RGF0ZVBpY2tlckNvbXBvbmVudCxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBCaXp5SW5wdXRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IENPTVBPTkVOVFMsXG4gIHByb3ZpZGVyczogW0RhdGVQaXBlXVxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RGF0ZVBpY2tlck1vZHVsZSB7fVxuIl19