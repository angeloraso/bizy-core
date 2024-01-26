import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VirtualScrollGridDirective } from './virtual-scroll-grid.directive';
import { VirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { VirtualScrollComponent } from './virtual-scroll.component';
import * as i0 from "@angular/core";
export class VirtualScrollModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollModule, declarations: [VirtualScrollComponent,
            VirtualScrollGridDirective,
            VirtualScrollNgForDirective], imports: [CommonModule, ScrollingModule], exports: [VirtualScrollComponent,
            VirtualScrollGridDirective,
            VirtualScrollNgForDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollModule, imports: [CommonModule, ScrollingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ScrollingModule],
                    declarations: [
                        VirtualScrollComponent,
                        VirtualScrollGridDirective,
                        VirtualScrollNgForDirective,
                    ],
                    exports: [
                        VirtualScrollComponent,
                        VirtualScrollGridDirective,
                        VirtualScrollNgForDirective,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBZXBFLE1BQU0sT0FBTyxtQkFBbUI7d0dBQW5CLG1CQUFtQjt5R0FBbkIsbUJBQW1CLGlCQVY1QixzQkFBc0I7WUFDdEIsMEJBQTBCO1lBQzFCLDJCQUEyQixhQUpuQixZQUFZLEVBQUUsZUFBZSxhQU9yQyxzQkFBc0I7WUFDdEIsMEJBQTBCO1lBQzFCLDJCQUEyQjt5R0FHbEIsbUJBQW1CLFlBWnBCLFlBQVksRUFBRSxlQUFlOzs0RkFZNUIsbUJBQW1CO2tCQWIvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUM7b0JBQ3hDLFlBQVksRUFBRTt3QkFDWixzQkFBc0I7d0JBQ3RCLDBCQUEwQjt3QkFDMUIsMkJBQTJCO3FCQUM1QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asc0JBQXNCO3dCQUN0QiwwQkFBMEI7d0JBQzFCLDJCQUEyQjtxQkFDNUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbEdyaWREaXJlY3RpdmUgfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLWdyaWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtbmctZm9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsQ29tcG9uZW50IH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTY3JvbGxpbmdNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBWaXJ0dWFsU2Nyb2xsQ29tcG9uZW50LFxuICAgIFZpcnR1YWxTY3JvbGxHcmlkRGlyZWN0aXZlLFxuICAgIFZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFZpcnR1YWxTY3JvbGxDb21wb25lbnQsXG4gICAgVmlydHVhbFNjcm9sbEdyaWREaXJlY3RpdmUsXG4gICAgVmlydHVhbFNjcm9sbE5nRm9yRGlyZWN0aXZlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsTW9kdWxlIHt9XG4iXX0=