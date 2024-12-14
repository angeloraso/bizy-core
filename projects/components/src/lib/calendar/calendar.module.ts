import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyCalendarComponent } from './calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import localeEs from '@angular/common/locales/es';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

registerLocaleData(localeEs);

const COMPONENTS = [
  BizyCalendarComponent
];

@NgModule({
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
})
export class BizyCalendarModule {}
