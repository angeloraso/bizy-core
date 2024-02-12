import { NgModule } from '@angular/core';
import { OrderByPipe } from './orderBy.pipe';
import { ReducePipe } from './reduce.pipe';
import { SafePipe } from './safe.pipe';
import { SearchPipe } from './search';
import * as i0 from "@angular/core";
const PIPES = [
    OrderByPipe,
    ReducePipe,
    SafePipe,
    SearchPipe
];
export class PipesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: PipesModule, declarations: [OrderByPipe,
            ReducePipe,
            SafePipe,
            SearchPipe], exports: [OrderByPipe,
            ReducePipe,
            SafePipe,
            SearchPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PipesModule, providers: [SearchPipe, OrderByPipe] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: PIPES,
                    exports: PIPES,
                    providers: [SearchPipe, OrderByPipe]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlwZXMvc3JjL2xpYi9waXBlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBRXRDLE1BQU0sS0FBSyxHQUFHO0lBQ1osV0FBVztJQUNYLFVBQVU7SUFDVixRQUFRO0lBQ1IsVUFBVTtDQUNYLENBQUM7QUFNRixNQUFNLE9BQU8sV0FBVzt3R0FBWCxXQUFXO3lHQUFYLFdBQVcsaUJBVnRCLFdBQVc7WUFDWCxVQUFVO1lBQ1YsUUFBUTtZQUNSLFVBQVUsYUFIVixXQUFXO1lBQ1gsVUFBVTtZQUNWLFFBQVE7WUFDUixVQUFVO3lHQU9DLFdBQVcsYUFGWCxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUM7OzRGQUV6QixXQUFXO2tCQUx2QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxLQUFLO29CQUNuQixPQUFPLEVBQUUsS0FBSztvQkFDZCxTQUFTLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmRlckJ5UGlwZSB9IGZyb20gJy4vb3JkZXJCeS5waXBlJztcbmltcG9ydCB7IFJlZHVjZVBpcGUgfSBmcm9tICcuL3JlZHVjZS5waXBlJztcbmltcG9ydCB7IFNhZmVQaXBlIH0gZnJvbSAnLi9zYWZlLnBpcGUnO1xuaW1wb3J0IHsgU2VhcmNoUGlwZSB9IGZyb20gJy4vc2VhcmNoJztcblxuY29uc3QgUElQRVMgPSBbXG4gIE9yZGVyQnlQaXBlLFxuICBSZWR1Y2VQaXBlLFxuICBTYWZlUGlwZSxcbiAgU2VhcmNoUGlwZVxuXTtcbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogUElQRVMsXG4gIGV4cG9ydHM6IFBJUEVTLFxuICBwcm92aWRlcnM6IFtTZWFyY2hQaXBlLCBPcmRlckJ5UGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgUGlwZXNNb2R1bGUge31cbiJdfQ==