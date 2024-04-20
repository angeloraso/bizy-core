import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BizyVirtualScrollGridDirective } from './virtual-scroll-grid.directive';
import { BizyVirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { BizyVirtualScrollComponent } from './virtual-scroll.component';
import * as i0 from "@angular/core";
export class BizyVirtualScrollModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, declarations: [BizyVirtualScrollComponent,
            BizyVirtualScrollGridDirective,
            BizyVirtualScrollNgForDirective], imports: [CommonModule, ScrollingModule], exports: [BizyVirtualScrollComponent,
            BizyVirtualScrollGridDirective,
            BizyVirtualScrollNgForDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, imports: [CommonModule, ScrollingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ScrollingModule],
                    declarations: [
                        BizyVirtualScrollComponent,
                        BizyVirtualScrollGridDirective,
                        BizyVirtualScrollNgForDirective,
                    ],
                    exports: [
                        BizyVirtualScrollComponent,
                        BizyVirtualScrollGridDirective,
                        BizyVirtualScrollNgForDirective,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDakYsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBZXhFLE1BQU0sT0FBTyx1QkFBdUI7d0dBQXZCLHVCQUF1Qjt5R0FBdkIsdUJBQXVCLGlCQVZoQywwQkFBMEI7WUFDMUIsOEJBQThCO1lBQzlCLCtCQUErQixhQUp2QixZQUFZLEVBQUUsZUFBZSxhQU9yQywwQkFBMEI7WUFDMUIsOEJBQThCO1lBQzlCLCtCQUErQjt5R0FHdEIsdUJBQXVCLFlBWnhCLFlBQVksRUFBRSxlQUFlOzs0RkFZNUIsdUJBQXVCO2tCQWJuQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUM7b0JBQ3hDLFlBQVksRUFBRTt3QkFDWiwwQkFBMEI7d0JBQzFCLDhCQUE4Qjt3QkFDOUIsK0JBQStCO3FCQUNoQztvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsMEJBQTBCO3dCQUMxQiw4QkFBOEI7d0JBQzlCLCtCQUErQjtxQkFDaEM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQml6eVZpcnR1YWxTY3JvbGxHcmlkRGlyZWN0aXZlIH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC1ncmlkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCaXp5VmlydHVhbFNjcm9sbE5nRm9yRGlyZWN0aXZlIH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC1uZy1mb3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJpenlWaXJ0dWFsU2Nyb2xsQ29tcG9uZW50IH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTY3JvbGxpbmdNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBCaXp5VmlydHVhbFNjcm9sbENvbXBvbmVudCxcbiAgICBCaXp5VmlydHVhbFNjcm9sbEdyaWREaXJlY3RpdmUsXG4gICAgQml6eVZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEJpenlWaXJ0dWFsU2Nyb2xsQ29tcG9uZW50LFxuICAgIEJpenlWaXJ0dWFsU2Nyb2xsR3JpZERpcmVjdGl2ZSxcbiAgICBCaXp5VmlydHVhbFNjcm9sbE5nRm9yRGlyZWN0aXZlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5VmlydHVhbFNjcm9sbE1vZHVsZSB7fVxuIl19