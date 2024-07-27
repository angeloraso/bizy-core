import { NgModule } from '@angular/core';
import { BizyOrderByPipe } from './orderBy.pipe';
import { BizyReducePipe } from './reduce.pipe';
import { BizySafePipe } from './safe.pipe';
import { BizySearchPipe } from './search';
import { BizySelectedPipe } from './selected.pipe';
import { BizySetToArrayPipe } from './setToArray.pipe';
import { BizyFormatSecondsPipe } from './formatSeconds.pipe';
import { BizyAveragePipe } from './average.pipe';
import * as i0 from "@angular/core";
const PIPES = [
    BizyOrderByPipe,
    BizyReducePipe,
    BizySafePipe,
    BizySearchPipe,
    BizySelectedPipe,
    BizySetToArrayPipe,
    BizyFormatSecondsPipe,
    BizyAveragePipe
];
export class BizyPipesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, declarations: [BizyOrderByPipe,
            BizyReducePipe,
            BizySafePipe,
            BizySearchPipe,
            BizySelectedPipe,
            BizySetToArrayPipe,
            BizyFormatSecondsPipe,
            BizyAveragePipe], exports: [BizyOrderByPipe,
            BizyReducePipe,
            BizySafePipe,
            BizySearchPipe,
            BizySelectedPipe,
            BizySetToArrayPipe,
            BizyFormatSecondsPipe,
            BizyAveragePipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, providers: PIPES });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: PIPES,
                    exports: PIPES,
                    providers: PIPES
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlwZXMvc3JjL2xpYi9waXBlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUVqRCxNQUFNLEtBQUssR0FBRztJQUNaLGVBQWU7SUFDZixjQUFjO0lBQ2QsWUFBWTtJQUNaLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixlQUFlO0NBQ2hCLENBQUM7QUFNRixNQUFNLE9BQU8sZUFBZTt3R0FBZixlQUFlO3lHQUFmLGVBQWUsaUJBZDFCLGVBQWU7WUFDZixjQUFjO1lBQ2QsWUFBWTtZQUNaLGNBQWM7WUFDZCxnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLHFCQUFxQjtZQUNyQixlQUFlLGFBUGYsZUFBZTtZQUNmLGNBQWM7WUFDZCxZQUFZO1lBQ1osY0FBYztZQUNkLGdCQUFnQjtZQUNoQixrQkFBa0I7WUFDbEIscUJBQXFCO1lBQ3JCLGVBQWU7eUdBT0osZUFBZSxhQUZmLEtBQUs7OzRGQUVMLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLEtBQUs7b0JBQ25CLE9BQU8sRUFBRSxLQUFLO29CQUNkLFNBQVMsRUFBRSxLQUFLO2lCQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5T3JkZXJCeVBpcGUgfSBmcm9tICcuL29yZGVyQnkucGlwZSc7XG5pbXBvcnQgeyBCaXp5UmVkdWNlUGlwZSB9IGZyb20gJy4vcmVkdWNlLnBpcGUnO1xuaW1wb3J0IHsgQml6eVNhZmVQaXBlIH0gZnJvbSAnLi9zYWZlLnBpcGUnO1xuaW1wb3J0IHsgQml6eVNlYXJjaFBpcGUgfSBmcm9tICcuL3NlYXJjaCc7XG5pbXBvcnQgeyBCaXp5U2VsZWN0ZWRQaXBlIH0gZnJvbSAnLi9zZWxlY3RlZC5waXBlJztcbmltcG9ydCB7IEJpenlTZXRUb0FycmF5UGlwZSB9IGZyb20gJy4vc2V0VG9BcnJheS5waXBlJztcbmltcG9ydCB7IEJpenlGb3JtYXRTZWNvbmRzUGlwZSB9IGZyb20gJy4vZm9ybWF0U2Vjb25kcy5waXBlJztcbmltcG9ydCB7IEJpenlBdmVyYWdlUGlwZSB9IGZyb20gJy4vYXZlcmFnZS5waXBlJztcblxuY29uc3QgUElQRVMgPSBbXG4gIEJpenlPcmRlckJ5UGlwZSxcbiAgQml6eVJlZHVjZVBpcGUsXG4gIEJpenlTYWZlUGlwZSxcbiAgQml6eVNlYXJjaFBpcGUsXG4gIEJpenlTZWxlY3RlZFBpcGUsXG4gIEJpenlTZXRUb0FycmF5UGlwZSxcbiAgQml6eUZvcm1hdFNlY29uZHNQaXBlLFxuICBCaXp5QXZlcmFnZVBpcGVcbl07XG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFBJUEVTLFxuICBleHBvcnRzOiBQSVBFUyxcbiAgcHJvdmlkZXJzOiBQSVBFU1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5UGlwZXNNb2R1bGUge31cbiJdfQ==