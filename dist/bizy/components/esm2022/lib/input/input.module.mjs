import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyInputComponent } from './input.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyInputOptionComponent } from './input-option/input-option.component';
import { BizyDirectivesModule } from '@bizy/directives';
import * as i0 from "@angular/core";
const COMPONENTS = [BizyInputComponent, BizyInputOptionComponent];
export class BizyInputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, declarations: [BizyInputComponent, BizyInputOptionComponent], imports: [CommonModule,
            FormsModule,
            OverlayModule,
            BizyDirectivesModule], exports: [BizyInputComponent, BizyInputOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, providers: [DecimalPipe], imports: [CommonModule,
            FormsModule,
            OverlayModule,
            BizyDirectivesModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        OverlayModule,
                        BizyDirectivesModule
                    ],
                    providers: [DecimalPipe],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2lucHV0L2lucHV0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFFeEQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBYWxFLE1BQU0sT0FBTyxlQUFlO3dHQUFmLGVBQWU7eUdBQWYsZUFBZSxpQkFiUixrQkFBa0IsRUFBRSx3QkFBd0IsYUFJNUQsWUFBWTtZQUNaLFdBQVc7WUFDWCxhQUFhO1lBQ2Isb0JBQW9CLGFBUEosa0JBQWtCLEVBQUUsd0JBQXdCO3lHQWFuRCxlQUFlLGFBSmYsQ0FBQyxXQUFXLENBQUMsWUFMdEIsWUFBWTtZQUNaLFdBQVc7WUFDWCxhQUFhO1lBQ2Isb0JBQW9COzs0RkFNWCxlQUFlO2tCQVgzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixvQkFBb0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQztvQkFDeEIsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQml6eUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEJpenlJbnB1dE9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQtb3B0aW9uL2lucHV0LW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eURpcmVjdGl2ZXNNb2R1bGUgfSBmcm9tICdAYml6eS9kaXJlY3RpdmVzJztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtCaXp5SW5wdXRDb21wb25lbnQsIEJpenlJbnB1dE9wdGlvbkNvbXBvbmVudF07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBCaXp5RGlyZWN0aXZlc01vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtEZWNpbWFsUGlwZV0sXG4gIGRlY2xhcmF0aW9uczogQ09NUE9ORU5UUyxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5SW5wdXRNb2R1bGUge31cbiJdfQ==