import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyInputComponent } from './input.component';
import { IonicModule } from '@ionic/angular';
import { BizyErrorModule } from '../error';
import { BizyConfirmButtonsModule } from '../confirm-buttons';
import * as i0 from "@angular/core";
const COMPONENTS = [BizyInputComponent];
export class BizyInputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, declarations: [BizyInputComponent], imports: [CommonModule,
            FormsModule,
            IonicModule,
            BizyErrorModule,
            BizyConfirmButtonsModule], exports: [BizyInputComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, imports: [CommonModule,
            FormsModule,
            IonicModule,
            BizyErrorModule,
            BizyConfirmButtonsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        IonicModule,
                        BizyErrorModule,
                        BizyConfirmButtonsModule
                    ],
                    declarations: COMPONENTS,
                    exports: COMPONENTS,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2lucHV0L2lucHV0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRTlELE1BQU0sVUFBVSxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQWF4QyxNQUFNLE9BQU8sZUFBZTt3R0FBZixlQUFlO3lHQUFmLGVBQWUsaUJBYlIsa0JBQWtCLGFBSWxDLFlBQVk7WUFDWixXQUFXO1lBQ1gsV0FBVztZQUNYLGVBQWU7WUFDZix3QkFBd0IsYUFSUixrQkFBa0I7eUdBYXpCLGVBQWUsWUFUeEIsWUFBWTtZQUNaLFdBQVc7WUFDWCxXQUFXO1lBQ1gsZUFBZTtZQUNmLHdCQUF3Qjs7NEZBS2YsZUFBZTtrQkFYM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFdBQVc7d0JBQ1gsZUFBZTt3QkFDZix3QkFBd0I7cUJBQ3pCO29CQUNELFlBQVksRUFBRSxVQUFVO29CQUN4QixPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQml6eUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW9uaWNNb2R1bGUgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5pbXBvcnQgeyBCaXp5RXJyb3JNb2R1bGUgfSBmcm9tICcuLi9lcnJvcic7XG5pbXBvcnQgeyBCaXp5Q29uZmlybUJ1dHRvbnNNb2R1bGUgfSBmcm9tICcuLi9jb25maXJtLWJ1dHRvbnMnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW0JpenlJbnB1dENvbXBvbmVudF07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSW9uaWNNb2R1bGUsXG4gICAgQml6eUVycm9yTW9kdWxlLFxuICAgIEJpenlDb25maXJtQnV0dG9uc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IENPTVBPTkVOVFMsXG59KVxuZXhwb3J0IGNsYXNzIEJpenlJbnB1dE1vZHVsZSB7fVxuIl19