import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyCalendarComponent } from './calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import localeEs from '@angular/common/locales/es';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import * as i0 from "@angular/core";
import * as i1 from "angular-calendar";
registerLocaleData(localeEs);
const COMPONENTS = [
    BizyCalendarComponent
];
export class BizyCalendarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyCalendarModule, declarations: [BizyCalendarComponent], imports: [CommonModule,
            FormsModule, i1.CalendarModule], exports: [BizyCalendarComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCalendarModule, imports: [CommonModule,
            FormsModule,
            CalendarModule.forRoot({
                provide: DateAdapter,
                useFactory: adapterFactory
            })] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        CalendarModule.forRoot({
                            provide: DateAdapter,
                            useFactory: adapterFactory
                        })
                    ],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2NhbGVuZGFyL2NhbGVuZGFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvRCxPQUFPLFFBQVEsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUNBQXlDLENBQUM7OztBQUV6RSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUU3QixNQUFNLFVBQVUsR0FBRztJQUNqQixxQkFBcUI7Q0FDdEIsQ0FBQztBQWNGLE1BQU0sT0FBTyxrQkFBa0I7d0dBQWxCLGtCQUFrQjt5R0FBbEIsa0JBQWtCLGlCQWY3QixxQkFBcUIsYUFLbkIsWUFBWTtZQUNaLFdBQVcsZ0NBTmIscUJBQXFCO3lHQWVWLGtCQUFrQixZQVYzQixZQUFZO1lBQ1osV0FBVztZQUNYLGNBQWMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JCLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixVQUFVLEVBQUUsY0FBYzthQUMzQixDQUFDOzs0RkFLTyxrQkFBa0I7a0JBWjlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxjQUFjLENBQUMsT0FBTyxDQUFDOzRCQUNyQixPQUFPLEVBQUUsV0FBVzs0QkFDcEIsVUFBVSxFQUFFLGNBQWM7eUJBQzNCLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIHJlZ2lzdGVyTG9jYWxlRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJpenlDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyTW9kdWxlLCBEYXRlQWRhcHRlciB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuaW1wb3J0IGxvY2FsZUVzIGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9sb2NhbGVzL2VzJztcbmltcG9ydCB7IGFkYXB0ZXJGYWN0b3J5IH0gZnJvbSAnYW5ndWxhci1jYWxlbmRhci9kYXRlLWFkYXB0ZXJzL2RhdGUtZm5zJztcblxucmVnaXN0ZXJMb2NhbGVEYXRhKGxvY2FsZUVzKTtcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQml6eUNhbGVuZGFyQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIENhbGVuZGFyTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsXG4gICAgICB1c2VGYWN0b3J5OiBhZGFwdGVyRmFjdG9yeVxuICAgIH0pXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogQ09NUE9ORU5UUyxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5Q2FsZW5kYXJNb2R1bGUge31cbiJdfQ==