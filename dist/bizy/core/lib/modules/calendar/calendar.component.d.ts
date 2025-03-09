import { EventEmitter, TemplateRef } from '@angular/core';
import { BIZY_CALENDAR_MODE, IBizyCalendarEvent, BIZY_CALENDAR_LANGUAGE, BIZY_CALENDAR_DAY } from './calendar.types';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizyCalendarComponent {
    #private;
    id: string;
    hideHeaderDate: boolean;
    preventExpand: boolean;
    dayStartHour: number;
    dayEndHour: number;
    hourMinutesDuration: number;
    hourSegments: number;
    language: BIZY_CALENDAR_LANGUAGE;
    excludeDays: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;
    weekendDays: Array<BIZY_CALENDAR_DAY>;
    weekStartsOn: BIZY_CALENDAR_DAY;
    mode: BIZY_CALENDAR_MODE;
    customCalendarWeekEventTemplate: TemplateRef<any> | null;
    onEventSelect: EventEmitter<IBizyCalendarEvent>;
    onDateSelect: EventEmitter<{
        start: number;
        end: number;
        events: Array<IBizyCalendarEvent>;
    }>;
    onEventDelete: EventEmitter<{
        event: IBizyCalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }>;
    readonly BIZY_CALENDAR_MODE: typeof BIZY_CALENDAR_MODE;
    _viewDate: Date;
    _activeDayIsOpen: boolean;
    _refresh: Subject<void>;
    viewDate(viewDate: number): void;
    _calendarEvents: Array<CalendarEvent>;
    _events: Array<IBizyCalendarEvent>;
    set events(events: Array<IBizyCalendarEvent>);
    dayClicked({ date, events, isOpen }: {
        date: Date;
        events: CalendarEvent[];
        isOpen: boolean;
    }): void;
    eventClicked(event: CalendarEvent): void;
    dayHeaderClicked(date: Date): void;
    hourSegmentClicked(date: Date): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCalendarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyCalendarComponent, "bizy-calendar", never, { "id": { "alias": "id"; "required": false; }; "hideHeaderDate": { "alias": "hideHeaderDate"; "required": false; }; "preventExpand": { "alias": "preventExpand"; "required": false; }; "dayStartHour": { "alias": "dayStartHour"; "required": false; }; "dayEndHour": { "alias": "dayEndHour"; "required": false; }; "hourMinutesDuration": { "alias": "hourMinutesDuration"; "required": false; }; "hourSegments": { "alias": "hourSegments"; "required": false; }; "language": { "alias": "language"; "required": false; }; "excludeDays": { "alias": "excludeDays"; "required": false; }; "weekendDays": { "alias": "weekendDays"; "required": false; }; "weekStartsOn": { "alias": "weekStartsOn"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; "customCalendarWeekEventTemplate": { "alias": "customCalendarWeekEventTemplate"; "required": false; }; "viewDate": { "alias": "viewDate"; "required": false; }; "events": { "alias": "events"; "required": false; }; }, { "onEventSelect": "onEventSelect"; "onDateSelect": "onDateSelect"; "onEventDelete": "onEventDelete"; }, never, never, true, never>;
}
