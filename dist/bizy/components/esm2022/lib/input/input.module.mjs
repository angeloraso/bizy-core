import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyInputComponent } from './input.component';
import { BizyDirectivesModule } from '@bizy/directives';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyInputOptionComponent } from './input-option/input-option.component';
import * as i0 from "@angular/core";
const COMPONENTS = [BizyInputComponent, BizyInputOptionComponent];
export class BizyInputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, declarations: [BizyInputComponent, BizyInputOptionComponent], imports: [CommonModule,
            FormsModule,
            BizyDirectivesModule,
            OverlayModule], exports: [BizyInputComponent, BizyInputOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, providers: [DecimalPipe], imports: [CommonModule,
            FormsModule,
            BizyDirectivesModule,
            OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        BizyDirectivesModule,
                        OverlayModule
                    ],
                    providers: [DecimalPipe],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2lucHV0L2lucHV0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFFakYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBYWxFLE1BQU0sT0FBTyxlQUFlO3dHQUFmLGVBQWU7eUdBQWYsZUFBZSxpQkFiUixrQkFBa0IsRUFBRSx3QkFBd0IsYUFJNUQsWUFBWTtZQUNaLFdBQVc7WUFDWCxvQkFBb0I7WUFDcEIsYUFBYSxhQVBHLGtCQUFrQixFQUFFLHdCQUF3Qjt5R0FhbkQsZUFBZSxhQUpmLENBQUMsV0FBVyxDQUFDLFlBTHRCLFlBQVk7WUFDWixXQUFXO1lBQ1gsb0JBQW9CO1lBQ3BCLGFBQWE7OzRGQU1KLGVBQWU7a0JBWDNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxvQkFBb0I7d0JBQ3BCLGFBQWE7cUJBQ2Q7b0JBQ0QsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUN4QixZQUFZLEVBQUUsVUFBVTtvQkFDeEIsT0FBTyxFQUFFLFVBQVU7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRGVjaW1hbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCaXp5SW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2lucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5RGlyZWN0aXZlc01vZHVsZSB9IGZyb20gJ0BiaXp5L2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEJpenlJbnB1dE9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQtb3B0aW9uL2lucHV0LW9wdGlvbi5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW0JpenlJbnB1dENvbXBvbmVudCwgQml6eUlucHV0T3B0aW9uQ29tcG9uZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBCaXp5RGlyZWN0aXZlc01vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW0RlY2ltYWxQaXBlXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIEJpenlJbnB1dE1vZHVsZSB7fVxuIl19