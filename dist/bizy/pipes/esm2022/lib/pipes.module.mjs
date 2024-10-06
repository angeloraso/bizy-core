import { NgModule } from '@angular/core';
import { BizyOrderByPipe } from './orderBy.pipe';
import { BizyReducePipe } from './reduce.pipe';
import { BizySafePipe } from './safe.pipe';
import { BizySearchPipe } from './search';
import { BizySelectedPipe } from './selected.pipe';
import { BizySetToArrayPipe } from './setToArray.pipe';
import { BizyFormatSecondsPipe, BizyFormatSecondsService } from './formatSeconds';
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
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, providers: PIPES.concat([BizyFormatSecondsService]) });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: PIPES,
                    exports: PIPES,
                    providers: PIPES.concat([BizyFormatSecondsService])
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlwZXMvc3JjL2xpYi9waXBlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHdCQUF3QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUVqRCxNQUFNLEtBQUssR0FBZTtJQUN4QixlQUFlO0lBQ2YsY0FBYztJQUNkLFlBQVk7SUFDWixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIsZUFBZTtDQUNoQixDQUFDO0FBTUYsTUFBTSxPQUFPLGVBQWU7d0dBQWYsZUFBZTt5R0FBZixlQUFlLGlCQWQxQixlQUFlO1lBQ2YsY0FBYztZQUNkLFlBQVk7WUFDWixjQUFjO1lBQ2QsZ0JBQWdCO1lBQ2hCLGtCQUFrQjtZQUNsQixxQkFBcUI7WUFDckIsZUFBZSxhQVBmLGVBQWU7WUFDZixjQUFjO1lBQ2QsWUFBWTtZQUNaLGNBQWM7WUFDZCxnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLHFCQUFxQjtZQUNyQixlQUFlO3lHQU9KLGVBQWUsYUFGZixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQzs7NEZBRXhDLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLEtBQUs7b0JBQ25CLE9BQU8sRUFBRSxLQUFLO29CQUNkLFNBQVMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQztpQkFDcEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQml6eU9yZGVyQnlQaXBlIH0gZnJvbSAnLi9vcmRlckJ5LnBpcGUnO1xuaW1wb3J0IHsgQml6eVJlZHVjZVBpcGUgfSBmcm9tICcuL3JlZHVjZS5waXBlJztcbmltcG9ydCB7IEJpenlTYWZlUGlwZSB9IGZyb20gJy4vc2FmZS5waXBlJztcbmltcG9ydCB7IEJpenlTZWFyY2hQaXBlIH0gZnJvbSAnLi9zZWFyY2gnO1xuaW1wb3J0IHsgQml6eVNlbGVjdGVkUGlwZSB9IGZyb20gJy4vc2VsZWN0ZWQucGlwZSc7XG5pbXBvcnQgeyBCaXp5U2V0VG9BcnJheVBpcGUgfSBmcm9tICcuL3NldFRvQXJyYXkucGlwZSc7XG5pbXBvcnQgeyBCaXp5Rm9ybWF0U2Vjb25kc1BpcGUsIEJpenlGb3JtYXRTZWNvbmRzU2VydmljZSB9IGZyb20gJy4vZm9ybWF0U2Vjb25kcyc7XG5pbXBvcnQgeyBCaXp5QXZlcmFnZVBpcGUgfSBmcm9tICcuL2F2ZXJhZ2UucGlwZSc7XG5cbmNvbnN0IFBJUEVTOiBBcnJheTxhbnk+ID0gW1xuICBCaXp5T3JkZXJCeVBpcGUsXG4gIEJpenlSZWR1Y2VQaXBlLFxuICBCaXp5U2FmZVBpcGUsXG4gIEJpenlTZWFyY2hQaXBlLFxuICBCaXp5U2VsZWN0ZWRQaXBlLFxuICBCaXp5U2V0VG9BcnJheVBpcGUsXG4gIEJpenlGb3JtYXRTZWNvbmRzUGlwZSxcbiAgQml6eUF2ZXJhZ2VQaXBlXG5dO1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBQSVBFUyxcbiAgZXhwb3J0czogUElQRVMsXG4gIHByb3ZpZGVyczogUElQRVMuY29uY2F0KFtCaXp5Rm9ybWF0U2Vjb25kc1NlcnZpY2VdKVxufSlcbmV4cG9ydCBjbGFzcyBCaXp5UGlwZXNNb2R1bGUge31cbiJdfQ==