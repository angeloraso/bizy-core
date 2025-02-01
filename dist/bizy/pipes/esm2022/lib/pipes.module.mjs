import { NgModule } from '@angular/core';
import { BizyOrderByPipe } from './orderBy.pipe';
import { BizyReducePipe } from './reduce.pipe';
import { BizySafePipe } from './safe.pipe';
import { BizySearchPipe } from './search';
import { BizySelectedPipe } from './selected.pipe';
import { BizySetToArrayPipe } from './setToArray.pipe';
import { BizyFormatSecondsPipe, BizyFormatSecondsService } from './formatSeconds';
import { BizyAveragePipe } from './average.pipe';
import { BizyRepeatPipe } from './repeat.pipe';
import { BizyEnumToArrayPipe } from './enumToArray.pipe';
import * as i0 from "@angular/core";
const PIPES = [
    BizyOrderByPipe,
    BizyReducePipe,
    BizySafePipe,
    BizySearchPipe,
    BizySelectedPipe,
    BizySetToArrayPipe,
    BizyFormatSecondsPipe,
    BizyAveragePipe,
    BizyRepeatPipe,
    BizyEnumToArrayPipe
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
            BizyAveragePipe,
            BizyRepeatPipe,
            BizyEnumToArrayPipe], exports: [BizyOrderByPipe,
            BizyReducePipe,
            BizySafePipe,
            BizySearchPipe,
            BizySelectedPipe,
            BizySetToArrayPipe,
            BizyFormatSecondsPipe,
            BizyAveragePipe,
            BizyRepeatPipe,
            BizyEnumToArrayPipe] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlwZXMvc3JjL2xpYi9waXBlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHdCQUF3QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRXpELE1BQU0sS0FBSyxHQUFlO0lBQ3hCLGVBQWU7SUFDZixjQUFjO0lBQ2QsWUFBWTtJQUNaLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixlQUFlO0lBQ2YsY0FBYztJQUNkLG1CQUFtQjtDQUNwQixDQUFDO0FBTUYsTUFBTSxPQUFPLGVBQWU7d0dBQWYsZUFBZTt5R0FBZixlQUFlLGlCQWhCMUIsZUFBZTtZQUNmLGNBQWM7WUFDZCxZQUFZO1lBQ1osY0FBYztZQUNkLGdCQUFnQjtZQUNoQixrQkFBa0I7WUFDbEIscUJBQXFCO1lBQ3JCLGVBQWU7WUFDZixjQUFjO1lBQ2QsbUJBQW1CLGFBVG5CLGVBQWU7WUFDZixjQUFjO1lBQ2QsWUFBWTtZQUNaLGNBQWM7WUFDZCxnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLHFCQUFxQjtZQUNyQixlQUFlO1lBQ2YsY0FBYztZQUNkLG1CQUFtQjt5R0FPUixlQUFlLGFBRmYsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUM7OzRGQUV4QyxlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxLQUFLO29CQUNuQixPQUFPLEVBQUUsS0FBSztvQkFDZCxTQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUM7aUJBQ3BEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlPcmRlckJ5UGlwZSB9IGZyb20gJy4vb3JkZXJCeS5waXBlJztcbmltcG9ydCB7IEJpenlSZWR1Y2VQaXBlIH0gZnJvbSAnLi9yZWR1Y2UucGlwZSc7XG5pbXBvcnQgeyBCaXp5U2FmZVBpcGUgfSBmcm9tICcuL3NhZmUucGlwZSc7XG5pbXBvcnQgeyBCaXp5U2VhcmNoUGlwZSB9IGZyb20gJy4vc2VhcmNoJztcbmltcG9ydCB7IEJpenlTZWxlY3RlZFBpcGUgfSBmcm9tICcuL3NlbGVjdGVkLnBpcGUnO1xuaW1wb3J0IHsgQml6eVNldFRvQXJyYXlQaXBlIH0gZnJvbSAnLi9zZXRUb0FycmF5LnBpcGUnO1xuaW1wb3J0IHsgQml6eUZvcm1hdFNlY29uZHNQaXBlLCBCaXp5Rm9ybWF0U2Vjb25kc1NlcnZpY2UgfSBmcm9tICcuL2Zvcm1hdFNlY29uZHMnO1xuaW1wb3J0IHsgQml6eUF2ZXJhZ2VQaXBlIH0gZnJvbSAnLi9hdmVyYWdlLnBpcGUnO1xuaW1wb3J0IHsgQml6eVJlcGVhdFBpcGUgfSBmcm9tICcuL3JlcGVhdC5waXBlJztcbmltcG9ydCB7IEJpenlFbnVtVG9BcnJheVBpcGUgfSBmcm9tICcuL2VudW1Ub0FycmF5LnBpcGUnO1xuXG5jb25zdCBQSVBFUzogQXJyYXk8YW55PiA9IFtcbiAgQml6eU9yZGVyQnlQaXBlLFxuICBCaXp5UmVkdWNlUGlwZSxcbiAgQml6eVNhZmVQaXBlLFxuICBCaXp5U2VhcmNoUGlwZSxcbiAgQml6eVNlbGVjdGVkUGlwZSxcbiAgQml6eVNldFRvQXJyYXlQaXBlLFxuICBCaXp5Rm9ybWF0U2Vjb25kc1BpcGUsXG4gIEJpenlBdmVyYWdlUGlwZSxcbiAgQml6eVJlcGVhdFBpcGUsXG4gIEJpenlFbnVtVG9BcnJheVBpcGVcbl07XG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFBJUEVTLFxuICBleHBvcnRzOiBQSVBFUyxcbiAgcHJvdmlkZXJzOiBQSVBFUy5jb25jYXQoW0JpenlGb3JtYXRTZWNvbmRzU2VydmljZV0pXG59KVxuZXhwb3J0IGNsYXNzIEJpenlQaXBlc01vZHVsZSB7fVxuIl19