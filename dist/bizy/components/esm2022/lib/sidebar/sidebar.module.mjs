import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarFooterComponent } from './sidebar-footer/sidebar-footer.component';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { SidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarOptionComponent,
    SidebarFooterComponent
];
export class SidebarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: SidebarModule, declarations: [SidebarComponent,
            SidebarHeaderComponent,
            SidebarOptionComponent,
            SidebarFooterComponent], imports: [CommonModule, FormsModule], exports: [SidebarComponent,
            SidebarHeaderComponent,
            SidebarOptionComponent,
            SidebarFooterComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SidebarModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvc2lkZWJhci9zaWRlYmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBRW5GLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLGdCQUFnQjtJQUNoQixzQkFBc0I7SUFDdEIsc0JBQXNCO0lBQ3RCLHNCQUFzQjtDQUN2QixDQUFDO0FBT0YsTUFBTSxPQUFPLGFBQWE7d0dBQWIsYUFBYTt5R0FBYixhQUFhLGlCQVh4QixnQkFBZ0I7WUFDaEIsc0JBQXNCO1lBQ3RCLHNCQUFzQjtZQUN0QixzQkFBc0IsYUFJWixZQUFZLEVBQUUsV0FBVyxhQVBuQyxnQkFBZ0I7WUFDaEIsc0JBQXNCO1lBQ3RCLHNCQUFzQjtZQUN0QixzQkFBc0I7eUdBUVgsYUFBYSxZQUpkLFlBQVksRUFBRSxXQUFXOzs0RkFJeEIsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO29CQUNwQyxZQUFZLEVBQUUsVUFBVTtvQkFDeEIsT0FBTyxFQUFFLFVBQVU7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNpZGViYXJDb21wb25lbnQgfSBmcm9tICcuL3NpZGViYXIuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNpZGViYXJGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3NpZGViYXItZm9vdGVyL3NpZGViYXItZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaWRlYmFySGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zaWRlYmFyLWhlYWRlci9zaWRlYmFyLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2lkZWJhck9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vc2lkZWJhci1vcHRpb24vc2lkZWJhci1vcHRpb24uY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgU2lkZWJhckNvbXBvbmVudCxcbiAgU2lkZWJhckhlYWRlckNvbXBvbmVudCxcbiAgU2lkZWJhck9wdGlvbkNvbXBvbmVudCxcbiAgU2lkZWJhckZvb3RlckNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IENPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgU2lkZWJhck1vZHVsZSB7fVxuIl19