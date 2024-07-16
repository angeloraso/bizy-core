import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizySelectComponent } from './select.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizySelectOptionComponent } from './select-option/select-option.component';
import { BizyInputModule } from '../input';
import * as i0 from "@angular/core";
const COMPONENTS = [
    BizySelectComponent,
    BizySelectOptionComponent
];
export class BizySelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, declarations: [BizySelectComponent,
            BizySelectOptionComponent], imports: [CommonModule, FormsModule, BizyInputModule, OverlayModule], exports: [BizySelectComponent,
            BizySelectOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, imports: [CommonModule, FormsModule, BizyInputModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, BizyInputModule, OverlayModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zZWxlY3Qvc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBRTNDLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLG1CQUFtQjtJQUNuQix5QkFBeUI7Q0FDMUIsQ0FBQztBQU9GLE1BQU0sT0FBTyxnQkFBZ0I7d0dBQWhCLGdCQUFnQjt5R0FBaEIsZ0JBQWdCLGlCQVQzQixtQkFBbUI7WUFDbkIseUJBQXlCLGFBSWYsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsYUFBYSxhQUxuRSxtQkFBbUI7WUFDbkIseUJBQXlCO3lHQVFkLGdCQUFnQixZQUpqQixZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhOzs0RkFJeEQsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQztvQkFDcEUsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCaXp5U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBCaXp5U2VsZWN0T3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Qtb3B0aW9uL3NlbGVjdC1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlJbnB1dE1vZHVsZSB9IGZyb20gJy4uL2lucHV0JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQml6eVNlbGVjdENvbXBvbmVudCxcbiAgQml6eVNlbGVjdE9wdGlvbkNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEJpenlJbnB1dE1vZHVsZSwgT3ZlcmxheU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogQ09NUE9ORU5UUyxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5U2VsZWN0TW9kdWxlIHt9XG4iXX0=