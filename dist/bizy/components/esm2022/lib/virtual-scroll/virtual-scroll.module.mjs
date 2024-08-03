import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BizyVirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { BizyVirtualScrollComponent } from './virtual-scroll.component';
import * as i0 from "@angular/core";
export class BizyVirtualScrollModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, declarations: [BizyVirtualScrollComponent,
            BizyVirtualScrollNgForDirective], imports: [CommonModule, ScrollingModule], exports: [BizyVirtualScrollComponent,
            BizyVirtualScrollNgForDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, imports: [CommonModule, ScrollingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ScrollingModule],
                    declarations: [
                        BizyVirtualScrollComponent,
                        BizyVirtualScrollNgForDirective
                    ],
                    exports: [
                        BizyVirtualScrollComponent,
                        BizyVirtualScrollNgForDirective
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBYXhFLE1BQU0sT0FBTyx1QkFBdUI7d0dBQXZCLHVCQUF1Qjt5R0FBdkIsdUJBQXVCLGlCQVJoQywwQkFBMEI7WUFDMUIsK0JBQStCLGFBSHZCLFlBQVksRUFBRSxlQUFlLGFBTXJDLDBCQUEwQjtZQUMxQiwrQkFBK0I7eUdBR3RCLHVCQUF1QixZQVZ4QixZQUFZLEVBQUUsZUFBZTs7NEZBVTVCLHVCQUF1QjtrQkFYbkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN4QyxZQUFZLEVBQUU7d0JBQ1osMEJBQTBCO3dCQUMxQiwrQkFBK0I7cUJBQ2hDO29CQUNELE9BQU8sRUFBRTt3QkFDUCwwQkFBMEI7d0JBQzFCLCtCQUErQjtxQkFDaEM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQml6eVZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtbmctZm9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCaXp5VmlydHVhbFNjcm9sbENvbXBvbmVudCB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2Nyb2xsaW5nTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQml6eVZpcnR1YWxTY3JvbGxDb21wb25lbnQsXG4gICAgQml6eVZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQml6eVZpcnR1YWxTY3JvbGxDb21wb25lbnQsXG4gICAgQml6eVZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5VmlydHVhbFNjcm9sbE1vZHVsZSB7fVxuIl19