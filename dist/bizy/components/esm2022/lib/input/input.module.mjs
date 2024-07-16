import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyInputComponent } from './input.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyInputOptionComponent } from './input-option/input-option.component';
import * as i0 from "@angular/core";
const COMPONENTS = [BizyInputComponent, BizyInputOptionComponent];
export class BizyInputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, declarations: [BizyInputComponent, BizyInputOptionComponent], imports: [CommonModule,
            FormsModule,
            OverlayModule], exports: [BizyInputComponent, BizyInputOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, imports: [CommonModule,
            FormsModule,
            OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        OverlayModule
                    ],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2lucHV0L2lucHV0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQUVqRixNQUFNLFVBQVUsR0FBRyxDQUFDLGtCQUFrQixFQUFFLHdCQUF3QixDQUFDLENBQUM7QUFXbEUsTUFBTSxPQUFPLGVBQWU7d0dBQWYsZUFBZTt5R0FBZixlQUFlLGlCQVhSLGtCQUFrQixFQUFFLHdCQUF3QixhQUk1RCxZQUFZO1lBQ1osV0FBVztZQUNYLGFBQWEsYUFORyxrQkFBa0IsRUFBRSx3QkFBd0I7eUdBV25ELGVBQWUsWUFQeEIsWUFBWTtZQUNaLFdBQVc7WUFDWCxhQUFhOzs0RkFLSixlQUFlO2tCQVQzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsYUFBYTtxQkFDZDtvQkFDRCxZQUFZLEVBQUUsVUFBVTtvQkFDeEIsT0FBTyxFQUFFLFVBQVU7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJpenlJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBCaXp5SW5wdXRPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL2lucHV0LW9wdGlvbi9pbnB1dC1vcHRpb24uY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtCaXp5SW5wdXRDb21wb25lbnQsIEJpenlJbnB1dE9wdGlvbkNvbXBvbmVudF07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IENPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgQml6eUlucHV0TW9kdWxlIHt9XG4iXX0=