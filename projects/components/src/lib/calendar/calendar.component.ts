import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BIZY_CALENDAR_MODE, IBizyCalendarEvent, BIZY_CALENDAR_LANGUAGE, BIZY_CALENDAR_EVENT_ACTION, BIZY_CALENDAR_DAY } from './calendar.types';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { Subject } from 'rxjs';
import { isSameDay, isSameMonth } from 'date-fns';
import { BizyCalendarFormatter } from './calendar.formatter';

@Component({
  selector: 'bizy-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: BizyCalendarFormatter
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyCalendarComponent {
  @Input() id: string = `bizy-calendar-${Math.random()}`;
  @Input() hideHeaderDate: boolean =false;
  @Input() dayStartHour: number = 0;
  @Input() dayEndHour: number = 24;
  @Input() hourMinutesDuration: number = 60;
  @Input() hourSegments: number = 2;
  @Input() language: BIZY_CALENDAR_LANGUAGE = BIZY_CALENDAR_LANGUAGE.SPANISH;
  @Input() excludeDays: Array<0 | 1 | 2 | 3 | 4 | 5 | 6> = [];
  @Input() weekendDays: Array<BIZY_CALENDAR_DAY> = [BIZY_CALENDAR_DAY.SATURDAY, BIZY_CALENDAR_DAY.SUNDAY];
  @Input() weekStartsOn: BIZY_CALENDAR_DAY = BIZY_CALENDAR_DAY.SUNDAY;
  @Input() mode: BIZY_CALENDAR_MODE = BIZY_CALENDAR_MODE.WEEK;
  @Output() onEventSelect = new EventEmitter<IBizyCalendarEvent>();
  @Output() onDateSelect = new EventEmitter<{start: number, end: number, events: Array<IBizyCalendarEvent>}>();
  @Output() onEventDelete = new EventEmitter<{ event: IBizyCalendarEvent, sourceEvent: MouseEvent | KeyboardEvent }>();

  readonly BIZY_CALENDAR_MODE = BIZY_CALENDAR_MODE;

  _viewDate: Date = new Date();
  _activeDayIsOpen: boolean = false;

  _refresh = new Subject<void>();

  @Input() viewDate(viewDate: number) {
    if (!viewDate) {
      return;
    }

    this._viewDate = new Date(viewDate);
  }

  _calendarEvents: Array<CalendarEvent> = [];
  _events: Array<IBizyCalendarEvent> = [];

  @Input() set events(events: Array<IBizyCalendarEvent>) {
    if (!events || events.length === 0) {
      return;
    }

    this._events.length = 0;

    this._calendarEvents = events.map(_event => {
      const id = _event.id || `bizy-calendar-event-${Math.random()}`;
      this._events.push({..._event, id})
      return {
        id,
        start: new Date(_event.start),
        end: new Date(_event.end),
        title: _event.description || '',
        color: {
          primary: _event.color,
          secondary: _event.backgroundColor
        },
        actions: this.#getCalendarEventActions(_event),
        allDay: false,
        cssClass: `bizy-calendar-event ${_event.customClass || ''}`,
        resizable: {
            beforeStart: false,
            afterEnd: false
        },
        draggable: false,
        meta: _event.meta
      }
    })

    this._refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this._viewDate)) {
      if ((isSameDay(this._viewDate, date) && this._activeDayIsOpen === true) || events.length === 0) {
        this._activeDayIsOpen = false;
      } else {
        this._activeDayIsOpen = true;
      }

      this._viewDate = date;
    }

    const ids = events.map(_event => _event.id);

    const _events = this._events.filter(_event => ids.includes(_event.id));

    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const startDate = startOfDay.getTime();
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    const endDate = endOfDay.getTime();

    this.onDateSelect.emit({
      start: startDate,
      end: endDate,
      events: _events
    })
  }

  eventClicked(event: CalendarEvent): void {
    const _event = this._events.find(_e => _e.id === event.id);
    if (!_event) {
      return;
    }

    this.onEventSelect.emit(_event)
  }

  dayHeaderClicked(date: Date): void {
    if (!date) {
      return;
    }

    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const startDate = startOfDay.getTime();
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    const endDate = endOfDay.getTime();

    const _events = this._events.filter(_event => _event.start >= startDate && _event.end <= endDate);

    this.onDateSelect.emit({
      start: startDate,
      end: endDate,
      events: _events
    })
  }

  hourSegmentClicked(date: Date): void {
    if (!date) {
      return;
    }

    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0);
    const startDate = startOfDay.getTime();
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + this.hourMinutesDuration, 59, 999);
    const endDate = endOfDay.getTime();

    const _events = this._events.filter(_event => _event.start >= startDate && _event.end <= endDate);

    this.onDateSelect.emit({
      start: startDate,
      end: endDate,
      events: _events
    })
  }

  #getCalendarEventActions(event: IBizyCalendarEvent): Array<CalendarEventAction> {
    if (!event || !event.actions || event.actions.length === 0) {
      return [];
    }

    const actions: Array<CalendarEventAction> = [];

    if (event.actions.includes(BIZY_CALENDAR_EVENT_ACTION.DELETE)) {
      actions.push({
        label: `<div class="bizy-calendar-event-delete-action__icon">
                    <div class="bizy-calendar-event-delete-action__icon__trash-lid"></div>
                    <div class="bizy-calendar-event-delete-action__icon__trash-container"></div>
                    <div class="bizy-calendar-event-delete-action__icon__trash-line-1"></div>
                    <div class="bizy-calendar-event-delete-action__icon__trash-line-2"></div>
                    <div class="bizy-calendar-event-delete-action__icon__trash-line-3"></div>
                </div>`,
        a11yLabel: 'delete',
        onClick: ({ event, sourceEvent }: { event: CalendarEvent, sourceEvent: MouseEvent | KeyboardEvent }): void => {
          const _event = this._events.find(_e => _e.id === event.id);
          if (!_event) {
            return;
          }

          this.onEventDelete.emit({ event: _event, sourceEvent });
        },
      })
    }

    return actions;
  }
}