import { CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';
import { Injectable } from '@angular/core';

@Injectable()
export class BizyCalendarFormatter extends CalendarNativeDateFormatter {
  override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}
