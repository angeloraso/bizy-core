import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BIZY_CALENDAR_MODE, BIZY_CALENDAR_LANGUAGE, BIZY_CALENDAR_EVENT_ACTION, BIZY_CALENDAR_DAY } from './calendar.types';
import { CalendarDateFormatter } from 'angular-calendar';
import { Subject } from 'rxjs';
import { isSameDay, isSameMonth } from 'date-fns';
import { BizyCalendarFormatter } from './calendar.formatter';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "angular-calendar";
export class BizyCalendarComponent {
    id = `bizy-calendar-${Math.random()}`;
    hideHeaderDate = false;
    dayStartHour = 0;
    dayEndHour = 24;
    hourMinutesDuration = 60;
    hourSegments = 2;
    language = BIZY_CALENDAR_LANGUAGE.SPANISH;
    excludeDays = [];
    weekendDays = [BIZY_CALENDAR_DAY.SATURDAY, BIZY_CALENDAR_DAY.SUNDAY];
    weekStartsOn = BIZY_CALENDAR_DAY.SUNDAY;
    mode = BIZY_CALENDAR_MODE.WEEK;
    customCalendarWeekEventTemplate = null;
    onEventSelect = new EventEmitter();
    onDateSelect = new EventEmitter();
    onEventDelete = new EventEmitter();
    BIZY_CALENDAR_MODE = BIZY_CALENDAR_MODE;
    _viewDate = new Date();
    _activeDayIsOpen = false;
    _refresh = new Subject();
    viewDate(viewDate) {
        if (!viewDate) {
            return;
        }
        this._viewDate = new Date(viewDate);
    }
    _calendarEvents = [];
    _events = [];
    set events(events) {
        if (!events || events.length === 0) {
            return;
        }
        this._events.length = 0;
        this._calendarEvents = events.map(_event => {
            const id = _event.id || `bizy-calendar-event-${Math.random()}`;
            this._events.push({ ..._event, id });
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
            };
        });
        this._refresh.next();
    }
    dayClicked({ date, events }) {
        if (isSameMonth(date, this._viewDate)) {
            if ((isSameDay(this._viewDate, date) && this._activeDayIsOpen === true) || events.length === 0) {
                this._activeDayIsOpen = false;
            }
            else {
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
        });
    }
    eventClicked(event) {
        const _event = this._events.find(_e => _e.id === event.id);
        if (!_event) {
            return;
        }
        this.onEventSelect.emit(_event);
    }
    dayHeaderClicked(date) {
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
        });
    }
    hourSegmentClicked(date) {
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
        });
    }
    #getCalendarEventActions(event) {
        if (!event || !event.actions || event.actions.length === 0) {
            return [];
        }
        const actions = [];
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
                onClick: ({ event, sourceEvent }) => {
                    const _event = this._events.find(_e => _e.id === event.id);
                    if (!_event) {
                        return;
                    }
                    this.onEventDelete.emit({ event: _event, sourceEvent });
                },
            });
        }
        return actions;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCalendarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyCalendarComponent, selector: "bizy-calendar", inputs: { id: "id", hideHeaderDate: "hideHeaderDate", dayStartHour: "dayStartHour", dayEndHour: "dayEndHour", hourMinutesDuration: "hourMinutesDuration", hourSegments: "hourSegments", language: "language", excludeDays: "excludeDays", weekendDays: "weekendDays", weekStartsOn: "weekStartsOn", mode: "mode", customCalendarWeekEventTemplate: "customCalendarWeekEventTemplate", viewDate: "viewDate", events: "events" }, outputs: { onEventSelect: "onEventSelect", onDateSelect: "onDateSelect", onEventDelete: "onEventDelete" }, providers: [
            {
                provide: CalendarDateFormatter,
                useClass: BizyCalendarFormatter
            }
        ], ngImport: i0, template: "<ng-template \n   #bizyCustomCalendarWeekEventTemplate\n   let-weekEvent=\"weekEvent\"\n   let-locale=\"locale\"\n   let-eventClicked=\"eventClicked\"\n   let-tooltipPlacement=\"tooltipPlacement\"\n   let-tooltipTemplate=\"tooltipTemplate\"\n   let-tooltipAppendToBody=\"tooltipAppendToBody\"\n   let-tooltipDisabled=\"tooltipDisabled\">\n\n   <ng-container *ngIf=\"customCalendarWeekEventTemplate\">\n      <ng-container *ngTemplateOutlet=\"customCalendarWeekEventTemplate; context: { $implicit: { id: weekEvent.event.id, start: weekEvent.event.start, end: weekEvent.event.end, description: weekEvent.event.title, color: weekEvent.event.color.primary, backgroundColor: weekEvent.event.color.secondary, meta: weekEvent.event.meta}}\"></ng-container>\n   </ng-container>\n\n</ng-template>\n\n\n<ng-container [ngSwitch]=\"mode\">\n\n   <mwl-calendar-month-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.MONTH\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [activeDayIsOpen]=\"_activeDayIsOpen\"\n      [excludeDays]=\"excludeDays\"\n      (dayClicked)=\"dayClicked($event.day)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-month-view>\n\n   <mwl-calendar-week-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.WEEK\"\n      [ngClass]=\"{'bizy-calendar--hide-header-date': hideHeaderDate}\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [dayStartHour]=\"dayStartHour\"\n      [dayEndHour]=\"dayEndHour\"\n      [hourDuration]=\"hourMinutesDuration\"\n      [hourSegments]=\"hourSegments\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [eventTemplate]=\"customCalendarWeekEventTemplate ? bizyCustomCalendarWeekEventTemplate : ''\"\n      [excludeDays]=\"excludeDays\"\n      (dayHeaderClicked)=\"dayHeaderClicked($event.day.date)\"\n      (hourSegmentClicked)=\"hourSegmentClicked($event.date)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-week-view>\n\n   <mwl-calendar-day-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.DAY\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [dayStartHour]=\"dayStartHour\"\n      [dayEndHour]=\"dayEndHour\"\n      [hourDuration]=\"hourMinutesDuration\"\n      [hourSegments]=\"hourSegments\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [excludeDays]=\"excludeDays\"\n      (hourSegmentClicked)=\"hourSegmentClicked($event.date)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-day-view>\n\n</ng-container>\n", styles: [":host{font-size:1rem}.custom-calendar-week-event{width:100%;height:100%;display:-webkit-box;-webkit-line-clamp:unset;-webkit-box-orient:vertical;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;line-height:1.2}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i2.CalendarMonthViewComponent, selector: "mwl-calendar-month-view", inputs: ["viewDate", "events", "excludeDays", "activeDayIsOpen", "activeDay", "refresh", "locale", "tooltipPlacement", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay", "weekStartsOn", "headerTemplate", "cellTemplate", "openDayEventsTemplate", "eventTitleTemplate", "eventActionsTemplate", "weekendDays"], outputs: ["beforeViewRender", "dayClicked", "eventClicked", "columnHeaderClicked", "eventTimesChanged"] }, { kind: "component", type: i2.CalendarWeekViewComponent, selector: "mwl-calendar-week-view", inputs: ["viewDate", "events", "excludeDays", "refresh", "locale", "tooltipPlacement", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay", "weekStartsOn", "headerTemplate", "eventTemplate", "eventTitleTemplate", "eventActionsTemplate", "precision", "weekendDays", "snapDraggedEvents", "hourSegments", "hourDuration", "hourSegmentHeight", "minimumEventHeight", "dayStartHour", "dayStartMinute", "dayEndHour", "dayEndMinute", "hourSegmentTemplate", "eventSnapSize", "allDayEventsLabelTemplate", "daysInWeek", "currentTimeMarkerTemplate", "validateEventTimesChanged", "resizeCursors"], outputs: ["dayHeaderClicked", "eventClicked", "eventTimesChanged", "beforeViewRender", "hourSegmentClicked"] }, { kind: "component", type: i2.CalendarDayViewComponent, selector: "mwl-calendar-day-view", inputs: ["viewDate", "events", "hourSegments", "hourSegmentHeight", "hourDuration", "minimumEventHeight", "dayStartHour", "dayStartMinute", "dayEndHour", "dayEndMinute", "refresh", "locale", "eventSnapSize", "tooltipPlacement", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay", "hourSegmentTemplate", "eventTemplate", "eventTitleTemplate", "eventActionsTemplate", "snapDraggedEvents", "allDayEventsLabelTemplate", "currentTimeMarkerTemplate", "validateEventTimesChanged", "resizeCursors"], outputs: ["eventClicked", "hourSegmentClicked", "eventTimesChanged", "beforeViewRender"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-calendar', providers: [
                        {
                            provide: CalendarDateFormatter,
                            useClass: BizyCalendarFormatter
                        }
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template \n   #bizyCustomCalendarWeekEventTemplate\n   let-weekEvent=\"weekEvent\"\n   let-locale=\"locale\"\n   let-eventClicked=\"eventClicked\"\n   let-tooltipPlacement=\"tooltipPlacement\"\n   let-tooltipTemplate=\"tooltipTemplate\"\n   let-tooltipAppendToBody=\"tooltipAppendToBody\"\n   let-tooltipDisabled=\"tooltipDisabled\">\n\n   <ng-container *ngIf=\"customCalendarWeekEventTemplate\">\n      <ng-container *ngTemplateOutlet=\"customCalendarWeekEventTemplate; context: { $implicit: { id: weekEvent.event.id, start: weekEvent.event.start, end: weekEvent.event.end, description: weekEvent.event.title, color: weekEvent.event.color.primary, backgroundColor: weekEvent.event.color.secondary, meta: weekEvent.event.meta}}\"></ng-container>\n   </ng-container>\n\n</ng-template>\n\n\n<ng-container [ngSwitch]=\"mode\">\n\n   <mwl-calendar-month-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.MONTH\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [activeDayIsOpen]=\"_activeDayIsOpen\"\n      [excludeDays]=\"excludeDays\"\n      (dayClicked)=\"dayClicked($event.day)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-month-view>\n\n   <mwl-calendar-week-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.WEEK\"\n      [ngClass]=\"{'bizy-calendar--hide-header-date': hideHeaderDate}\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [dayStartHour]=\"dayStartHour\"\n      [dayEndHour]=\"dayEndHour\"\n      [hourDuration]=\"hourMinutesDuration\"\n      [hourSegments]=\"hourSegments\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [eventTemplate]=\"customCalendarWeekEventTemplate ? bizyCustomCalendarWeekEventTemplate : ''\"\n      [excludeDays]=\"excludeDays\"\n      (dayHeaderClicked)=\"dayHeaderClicked($event.day.date)\"\n      (hourSegmentClicked)=\"hourSegmentClicked($event.date)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-week-view>\n\n   <mwl-calendar-day-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.DAY\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [dayStartHour]=\"dayStartHour\"\n      [dayEndHour]=\"dayEndHour\"\n      [hourDuration]=\"hourMinutesDuration\"\n      [hourSegments]=\"hourSegments\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [excludeDays]=\"excludeDays\"\n      (hourSegmentClicked)=\"hourSegmentClicked($event.date)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-day-view>\n\n</ng-container>\n", styles: [":host{font-size:1rem}.custom-calendar-week-event{width:100%;height:100%;display:-webkit-box;-webkit-line-clamp:unset;-webkit-box-orient:vertical;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;line-height:1.2}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], hideHeaderDate: [{
                type: Input
            }], dayStartHour: [{
                type: Input
            }], dayEndHour: [{
                type: Input
            }], hourMinutesDuration: [{
                type: Input
            }], hourSegments: [{
                type: Input
            }], language: [{
                type: Input
            }], excludeDays: [{
                type: Input
            }], weekendDays: [{
                type: Input
            }], weekStartsOn: [{
                type: Input
            }], mode: [{
                type: Input
            }], customCalendarWeekEventTemplate: [{
                type: Input
            }], onEventSelect: [{
                type: Output
            }], onDateSelect: [{
                type: Output
            }], onEventDelete: [{
                type: Output
            }], viewDate: [{
                type: Input
            }], events: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9jYWxlbmRhci9jYWxlbmRhci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLGtCQUFrQixFQUFzQixzQkFBc0IsRUFBRSwwQkFBMEIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pKLE9BQU8sRUFBRSxxQkFBcUIsRUFBc0MsTUFBTSxrQkFBa0IsQ0FBQztBQUM3RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBYzdELE1BQU0sT0FBTyxxQkFBcUI7SUFDdkIsRUFBRSxHQUFXLGlCQUFpQixJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUM5QyxjQUFjLEdBQVcsS0FBSyxDQUFDO0lBQy9CLFlBQVksR0FBVyxDQUFDLENBQUM7SUFDekIsVUFBVSxHQUFXLEVBQUUsQ0FBQztJQUN4QixtQkFBbUIsR0FBVyxFQUFFLENBQUM7SUFDakMsWUFBWSxHQUFXLENBQUMsQ0FBQztJQUN6QixRQUFRLEdBQTJCLHNCQUFzQixDQUFDLE9BQU8sQ0FBQztJQUNsRSxXQUFXLEdBQXFDLEVBQUUsQ0FBQztJQUNuRCxXQUFXLEdBQTZCLENBQUMsaUJBQWlCLENB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S0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLCtCQUErQjtzQkFBdkMsS0FBSztnQkFDSSxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFTRSxRQUFRO3NCQUFoQixLQUFLO2dCQVdPLE1BQU07c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCSVpZX0NBTEVOREFSX01PREUsIElCaXp5Q2FsZW5kYXJFdmVudCwgQklaWV9DQUxFTkRBUl9MQU5HVUFHRSwgQklaWV9DQUxFTkRBUl9FVkVOVF9BQ1RJT04sIEJJWllfQ0FMRU5EQVJfREFZIH0gZnJvbSAnLi9jYWxlbmRhci50eXBlcyc7XG5pbXBvcnQgeyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsIENhbGVuZGFyRXZlbnQsIENhbGVuZGFyRXZlbnRBY3Rpb24gfSBmcm9tICdhbmd1bGFyLWNhbGVuZGFyJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGlzU2FtZURheSwgaXNTYW1lTW9udGggfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBCaXp5Q2FsZW5kYXJGb3JtYXR0ZXIgfSBmcm9tICcuL2NhbGVuZGFyLmZvcm1hdHRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktY2FsZW5kYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLmNzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsXG4gICAgICB1c2VDbGFzczogQml6eUNhbGVuZGFyRm9ybWF0dGVyXG4gICAgfVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5Q2FsZW5kYXJDb21wb25lbnQge1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYGJpenktY2FsZW5kYXItJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGhpZGVIZWFkZXJEYXRlOiBib29sZWFuID1mYWxzZTtcbiAgQElucHV0KCkgZGF5U3RhcnRIb3VyOiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBkYXlFbmRIb3VyOiBudW1iZXIgPSAyNDtcbiAgQElucHV0KCkgaG91ck1pbnV0ZXNEdXJhdGlvbjogbnVtYmVyID0gNjA7XG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50czogbnVtYmVyID0gMjtcbiAgQElucHV0KCkgbGFuZ3VhZ2U6IEJJWllfQ0FMRU5EQVJfTEFOR1VBR0UgPSBCSVpZX0NBTEVOREFSX0xBTkdVQUdFLlNQQU5JU0g7XG4gIEBJbnB1dCgpIGV4Y2x1ZGVEYXlzOiBBcnJheTwwIHwgMSB8IDIgfCAzIHwgNCB8IDUgfCA2PiA9IFtdO1xuICBASW5wdXQoKSB3ZWVrZW5kRGF5czogQXJyYXk8QklaWV9DQUxFTkRBUl9EQVk+ID0gW0JJWllfQ0FMRU5EQVJfREFZLlNBVFVSREFZLCBCSVpZX0NBTEVOREFSX0RBWS5TVU5EQVldO1xuICBASW5wdXQoKSB3ZWVrU3RhcnRzT246IEJJWllfQ0FMRU5EQVJfREFZID0gQklaWV9DQUxFTkRBUl9EQVkuU1VOREFZO1xuICBASW5wdXQoKSBtb2RlOiBCSVpZX0NBTEVOREFSX01PREUgPSBCSVpZX0NBTEVOREFSX01PREUuV0VFSztcbiAgQElucHV0KCkgY3VzdG9tQ2FsZW5kYXJXZWVrRXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwgPSBudWxsO1xuICBAT3V0cHV0KCkgb25FdmVudFNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8SUJpenlDYWxlbmRhckV2ZW50PigpO1xuICBAT3V0cHV0KCkgb25EYXRlU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjx7c3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGV2ZW50czogQXJyYXk8SUJpenlDYWxlbmRhckV2ZW50Pn0+KCk7XG4gIEBPdXRwdXQoKSBvbkV2ZW50RGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBJQml6eUNhbGVuZGFyRXZlbnQsIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCB9PigpO1xuXG4gIHJlYWRvbmx5IEJJWllfQ0FMRU5EQVJfTU9ERSA9IEJJWllfQ0FMRU5EQVJfTU9ERTtcblxuICBfdmlld0RhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICBfYWN0aXZlRGF5SXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgX3JlZnJlc2ggPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIEBJbnB1dCgpIHZpZXdEYXRlKHZpZXdEYXRlOiBudW1iZXIpIHtcbiAgICBpZiAoIXZpZXdEYXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fdmlld0RhdGUgPSBuZXcgRGF0ZSh2aWV3RGF0ZSk7XG4gIH1cblxuICBfY2FsZW5kYXJFdmVudHM6IEFycmF5PENhbGVuZGFyRXZlbnQ+ID0gW107XG4gIF9ldmVudHM6IEFycmF5PElCaXp5Q2FsZW5kYXJFdmVudD4gPSBbXTtcblxuICBASW5wdXQoKSBzZXQgZXZlbnRzKGV2ZW50czogQXJyYXk8SUJpenlDYWxlbmRhckV2ZW50Pikge1xuICAgIGlmICghZXZlbnRzIHx8IGV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9ldmVudHMubGVuZ3RoID0gMDtcblxuICAgIHRoaXMuX2NhbGVuZGFyRXZlbnRzID0gZXZlbnRzLm1hcChfZXZlbnQgPT4ge1xuICAgICAgY29uc3QgaWQgPSBfZXZlbnQuaWQgfHwgYGJpenktY2FsZW5kYXItZXZlbnQtJHtNYXRoLnJhbmRvbSgpfWA7XG4gICAgICB0aGlzLl9ldmVudHMucHVzaCh7Li4uX2V2ZW50LCBpZH0pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZCxcbiAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKF9ldmVudC5zdGFydCksXG4gICAgICAgIGVuZDogbmV3IERhdGUoX2V2ZW50LmVuZCksXG4gICAgICAgIHRpdGxlOiBfZXZlbnQuZGVzY3JpcHRpb24gfHwgJycsXG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgcHJpbWFyeTogX2V2ZW50LmNvbG9yLFxuICAgICAgICAgIHNlY29uZGFyeTogX2V2ZW50LmJhY2tncm91bmRDb2xvclxuICAgICAgICB9LFxuICAgICAgICBhY3Rpb25zOiB0aGlzLiNnZXRDYWxlbmRhckV2ZW50QWN0aW9ucyhfZXZlbnQpLFxuICAgICAgICBhbGxEYXk6IGZhbHNlLFxuICAgICAgICBjc3NDbGFzczogYGJpenktY2FsZW5kYXItZXZlbnQgJHtfZXZlbnQuY3VzdG9tQ2xhc3MgfHwgJyd9YCxcbiAgICAgICAgcmVzaXphYmxlOiB7XG4gICAgICAgICAgICBiZWZvcmVTdGFydDogZmFsc2UsXG4gICAgICAgICAgICBhZnRlckVuZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgbWV0YTogX2V2ZW50Lm1ldGFcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5fcmVmcmVzaC5uZXh0KCk7XG4gIH1cblxuICBkYXlDbGlja2VkKHsgZGF0ZSwgZXZlbnRzIH06IHsgZGF0ZTogRGF0ZTsgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gfSk6IHZvaWQge1xuICAgIGlmIChpc1NhbWVNb250aChkYXRlLCB0aGlzLl92aWV3RGF0ZSkpIHtcbiAgICAgIGlmICgoaXNTYW1lRGF5KHRoaXMuX3ZpZXdEYXRlLCBkYXRlKSAmJiB0aGlzLl9hY3RpdmVEYXlJc09wZW4gPT09IHRydWUpIHx8IGV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlRGF5SXNPcGVuID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9hY3RpdmVEYXlJc09wZW4gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl92aWV3RGF0ZSA9IGRhdGU7XG4gICAgfVxuXG4gICAgY29uc3QgaWRzID0gZXZlbnRzLm1hcChfZXZlbnQgPT4gX2V2ZW50LmlkKTtcblxuICAgIGNvbnN0IF9ldmVudHMgPSB0aGlzLl9ldmVudHMuZmlsdGVyKF9ldmVudCA9PiBpZHMuaW5jbHVkZXMoX2V2ZW50LmlkKSk7XG5cbiAgICBjb25zdCBzdGFydE9mRGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICBjb25zdCBzdGFydERhdGUgPSBzdGFydE9mRGF5LmdldFRpbWUoKTtcbiAgICBjb25zdCBlbmRPZkRheSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSwgMjMsIDU5LCA1OSwgOTk5KTtcbiAgICBjb25zdCBlbmREYXRlID0gZW5kT2ZEYXkuZ2V0VGltZSgpO1xuXG4gICAgdGhpcy5vbkRhdGVTZWxlY3QuZW1pdCh7XG4gICAgICBzdGFydDogc3RhcnREYXRlLFxuICAgICAgZW5kOiBlbmREYXRlLFxuICAgICAgZXZlbnRzOiBfZXZlbnRzXG4gICAgfSlcbiAgfVxuXG4gIGV2ZW50Q2xpY2tlZChldmVudDogQ2FsZW5kYXJFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IF9ldmVudCA9IHRoaXMuX2V2ZW50cy5maW5kKF9lID0+IF9lLmlkID09PSBldmVudC5pZCk7XG4gICAgaWYgKCFfZXZlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9uRXZlbnRTZWxlY3QuZW1pdChfZXZlbnQpXG4gIH1cblxuICBkYXlIZWFkZXJDbGlja2VkKGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGFydE9mRGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICBjb25zdCBzdGFydERhdGUgPSBzdGFydE9mRGF5LmdldFRpbWUoKTtcbiAgICBjb25zdCBlbmRPZkRheSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSwgMjMsIDU5LCA1OSwgOTk5KTtcbiAgICBjb25zdCBlbmREYXRlID0gZW5kT2ZEYXkuZ2V0VGltZSgpO1xuXG4gICAgY29uc3QgX2V2ZW50cyA9IHRoaXMuX2V2ZW50cy5maWx0ZXIoX2V2ZW50ID0+IF9ldmVudC5zdGFydCA+PSBzdGFydERhdGUgJiYgX2V2ZW50LmVuZCA8PSBlbmREYXRlKTtcblxuICAgIHRoaXMub25EYXRlU2VsZWN0LmVtaXQoe1xuICAgICAgc3RhcnQ6IHN0YXJ0RGF0ZSxcbiAgICAgIGVuZDogZW5kRGF0ZSxcbiAgICAgIGV2ZW50czogX2V2ZW50c1xuICAgIH0pXG4gIH1cblxuICBob3VyU2VnbWVudENsaWNrZWQoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIGlmICghZGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0T2ZEYXkgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIDAsIDApO1xuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHN0YXJ0T2ZEYXkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGVuZE9mRGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpLCBkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpICsgdGhpcy5ob3VyTWludXRlc0R1cmF0aW9uLCA1OSwgOTk5KTtcbiAgICBjb25zdCBlbmREYXRlID0gZW5kT2ZEYXkuZ2V0VGltZSgpO1xuXG4gICAgY29uc3QgX2V2ZW50cyA9IHRoaXMuX2V2ZW50cy5maWx0ZXIoX2V2ZW50ID0+IF9ldmVudC5zdGFydCA+PSBzdGFydERhdGUgJiYgX2V2ZW50LmVuZCA8PSBlbmREYXRlKTtcblxuICAgIHRoaXMub25EYXRlU2VsZWN0LmVtaXQoe1xuICAgICAgc3RhcnQ6IHN0YXJ0RGF0ZSxcbiAgICAgIGVuZDogZW5kRGF0ZSxcbiAgICAgIGV2ZW50czogX2V2ZW50c1xuICAgIH0pXG4gIH1cblxuICAjZ2V0Q2FsZW5kYXJFdmVudEFjdGlvbnMoZXZlbnQ6IElCaXp5Q2FsZW5kYXJFdmVudCk6IEFycmF5PENhbGVuZGFyRXZlbnRBY3Rpb24+IHtcbiAgICBpZiAoIWV2ZW50IHx8ICFldmVudC5hY3Rpb25zIHx8IGV2ZW50LmFjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aW9uczogQXJyYXk8Q2FsZW5kYXJFdmVudEFjdGlvbj4gPSBbXTtcblxuICAgIGlmIChldmVudC5hY3Rpb25zLmluY2x1ZGVzKEJJWllfQ0FMRU5EQVJfRVZFTlRfQUNUSU9OLkRFTEVURSkpIHtcbiAgICAgIGFjdGlvbnMucHVzaCh7XG4gICAgICAgIGxhYmVsOiBgPGRpdiBjbGFzcz1cImJpenktY2FsZW5kYXItZXZlbnQtZGVsZXRlLWFjdGlvbl9faWNvblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYml6eS1jYWxlbmRhci1ldmVudC1kZWxldGUtYWN0aW9uX19pY29uX190cmFzaC1saWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJpenktY2FsZW5kYXItZXZlbnQtZGVsZXRlLWFjdGlvbl9faWNvbl9fdHJhc2gtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiaXp5LWNhbGVuZGFyLWV2ZW50LWRlbGV0ZS1hY3Rpb25fX2ljb25fX3RyYXNoLWxpbmUtMVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYml6eS1jYWxlbmRhci1ldmVudC1kZWxldGUtYWN0aW9uX19pY29uX190cmFzaC1saW5lLTJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJpenktY2FsZW5kYXItZXZlbnQtZGVsZXRlLWFjdGlvbl9faWNvbl9fdHJhc2gtbGluZS0zXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+YCxcbiAgICAgICAgYTExeUxhYmVsOiAnZGVsZXRlJyxcbiAgICAgICAgb25DbGljazogKHsgZXZlbnQsIHNvdXJjZUV2ZW50IH06IHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQsIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCB9KTogdm9pZCA9PiB7XG4gICAgICAgICAgY29uc3QgX2V2ZW50ID0gdGhpcy5fZXZlbnRzLmZpbmQoX2UgPT4gX2UuaWQgPT09IGV2ZW50LmlkKTtcbiAgICAgICAgICBpZiAoIV9ldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMub25FdmVudERlbGV0ZS5lbWl0KHsgZXZlbnQ6IF9ldmVudCwgc291cmNlRXZlbnQgfSk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb25zO1xuICB9XG59IiwiPG5nLXRlbXBsYXRlIFxuICAgI2JpenlDdXN0b21DYWxlbmRhcldlZWtFdmVudFRlbXBsYXRlXG4gICBsZXQtd2Vla0V2ZW50PVwid2Vla0V2ZW50XCJcbiAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIlxuICAgbGV0LWV2ZW50Q2xpY2tlZD1cImV2ZW50Q2xpY2tlZFwiXG4gICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgbGV0LXRvb2x0aXBUZW1wbGF0ZT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICBsZXQtdG9vbHRpcEFwcGVuZFRvQm9keT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgbGV0LXRvb2x0aXBEaXNhYmxlZD1cInRvb2x0aXBEaXNhYmxlZFwiPlxuXG4gICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VzdG9tQ2FsZW5kYXJXZWVrRXZlbnRUZW1wbGF0ZVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImN1c3RvbUNhbGVuZGFyV2Vla0V2ZW50VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB7IGlkOiB3ZWVrRXZlbnQuZXZlbnQuaWQsIHN0YXJ0OiB3ZWVrRXZlbnQuZXZlbnQuc3RhcnQsIGVuZDogd2Vla0V2ZW50LmV2ZW50LmVuZCwgZGVzY3JpcHRpb246IHdlZWtFdmVudC5ldmVudC50aXRsZSwgY29sb3I6IHdlZWtFdmVudC5ldmVudC5jb2xvci5wcmltYXJ5LCBiYWNrZ3JvdW5kQ29sb3I6IHdlZWtFdmVudC5ldmVudC5jb2xvci5zZWNvbmRhcnksIG1ldGE6IHdlZWtFdmVudC5ldmVudC5tZXRhfX1cIj48L25nLWNvbnRhaW5lcj5cbiAgIDwvbmctY29udGFpbmVyPlxuXG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm1vZGVcIj5cblxuICAgPG13bC1jYWxlbmRhci1tb250aC12aWV3XG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiQklaWV9DQUxFTkRBUl9NT0RFLk1PTlRIXCJcbiAgICAgIFt2aWV3RGF0ZV09XCJfdmlld0RhdGVcIlxuICAgICAgW2V2ZW50c109XCJfY2FsZW5kYXJFdmVudHNcIlxuICAgICAgW3dlZWtlbmREYXlzXT1cIndlZWtlbmREYXlzXCJcbiAgICAgIFt3ZWVrU3RhcnRzT25dPVwid2Vla1N0YXJ0c09uXCJcbiAgICAgIFtyZWZyZXNoXT1cIl9yZWZyZXNoXCJcbiAgICAgIFtsb2NhbGVdPVwibGFuZ3VhZ2VcIlxuICAgICAgW2FjdGl2ZURheUlzT3Blbl09XCJfYWN0aXZlRGF5SXNPcGVuXCJcbiAgICAgIFtleGNsdWRlRGF5c109XCJleGNsdWRlRGF5c1wiXG4gICAgICAoZGF5Q2xpY2tlZCk9XCJkYXlDbGlja2VkKCRldmVudC5kYXkpXCJcbiAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkKCRldmVudC5ldmVudClcIj5cbiAgIDwvbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXc+XG5cbiAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3XG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiQklaWV9DQUxFTkRBUl9NT0RFLldFRUtcIlxuICAgICAgW25nQ2xhc3NdPVwieydiaXp5LWNhbGVuZGFyLS1oaWRlLWhlYWRlci1kYXRlJzogaGlkZUhlYWRlckRhdGV9XCJcbiAgICAgIFt2aWV3RGF0ZV09XCJfdmlld0RhdGVcIlxuICAgICAgW2V2ZW50c109XCJfY2FsZW5kYXJFdmVudHNcIlxuICAgICAgW3dlZWtlbmREYXlzXT1cIndlZWtlbmREYXlzXCJcbiAgICAgIFt3ZWVrU3RhcnRzT25dPVwid2Vla1N0YXJ0c09uXCJcbiAgICAgIFtkYXlTdGFydEhvdXJdPVwiZGF5U3RhcnRIb3VyXCJcbiAgICAgIFtkYXlFbmRIb3VyXT1cImRheUVuZEhvdXJcIlxuICAgICAgW2hvdXJEdXJhdGlvbl09XCJob3VyTWludXRlc0R1cmF0aW9uXCJcbiAgICAgIFtob3VyU2VnbWVudHNdPVwiaG91clNlZ21lbnRzXCJcbiAgICAgIFtyZWZyZXNoXT1cIl9yZWZyZXNoXCJcbiAgICAgIFtsb2NhbGVdPVwibGFuZ3VhZ2VcIlxuICAgICAgW2V2ZW50VGVtcGxhdGVdPVwiY3VzdG9tQ2FsZW5kYXJXZWVrRXZlbnRUZW1wbGF0ZSA/IGJpenlDdXN0b21DYWxlbmRhcldlZWtFdmVudFRlbXBsYXRlIDogJydcIlxuICAgICAgW2V4Y2x1ZGVEYXlzXT1cImV4Y2x1ZGVEYXlzXCJcbiAgICAgIChkYXlIZWFkZXJDbGlja2VkKT1cImRheUhlYWRlckNsaWNrZWQoJGV2ZW50LmRheS5kYXRlKVwiXG4gICAgICAoaG91clNlZ21lbnRDbGlja2VkKT1cImhvdXJTZWdtZW50Q2xpY2tlZCgkZXZlbnQuZGF0ZSlcIlxuICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQoJGV2ZW50LmV2ZW50KVwiPlxuICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3PlxuXG4gICA8bXdsLWNhbGVuZGFyLWRheS12aWV3XG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiQklaWV9DQUxFTkRBUl9NT0RFLkRBWVwiXG4gICAgICBbdmlld0RhdGVdPVwiX3ZpZXdEYXRlXCJcbiAgICAgIFtldmVudHNdPVwiX2NhbGVuZGFyRXZlbnRzXCJcbiAgICAgIFt3ZWVrZW5kRGF5c109XCJ3ZWVrZW5kRGF5c1wiXG4gICAgICBbd2Vla1N0YXJ0c09uXT1cIndlZWtTdGFydHNPblwiXG4gICAgICBbZGF5U3RhcnRIb3VyXT1cImRheVN0YXJ0SG91clwiXG4gICAgICBbZGF5RW5kSG91cl09XCJkYXlFbmRIb3VyXCJcbiAgICAgIFtob3VyRHVyYXRpb25dPVwiaG91ck1pbnV0ZXNEdXJhdGlvblwiXG4gICAgICBbaG91clNlZ21lbnRzXT1cImhvdXJTZWdtZW50c1wiXG4gICAgICBbcmVmcmVzaF09XCJfcmVmcmVzaFwiXG4gICAgICBbbG9jYWxlXT1cImxhbmd1YWdlXCJcbiAgICAgIFtleGNsdWRlRGF5c109XCJleGNsdWRlRGF5c1wiXG4gICAgICAoaG91clNlZ21lbnRDbGlja2VkKT1cImhvdXJTZWdtZW50Q2xpY2tlZCgkZXZlbnQuZGF0ZSlcIlxuICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQoJGV2ZW50LmV2ZW50KVwiPlxuICAgPC9td2wtY2FsZW5kYXItZGF5LXZpZXc+XG5cbjwvbmctY29udGFpbmVyPlxuIl19