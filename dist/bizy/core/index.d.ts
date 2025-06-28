import * as i0 from '@angular/core';
import { EventEmitter, ChangeDetectorRef, OnDestroy, AfterViewInit, ElementRef, Renderer2, TemplateRef, PipeTransform, QueryList, ViewContainerRef, AfterContentInit, RendererFactory2, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { UppyFile, SuccessResponse } from '@uppy/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Portal, TemplatePortal, ComponentType } from '@angular/cdk/portal';
import { DialogRef } from '@angular/cdk/dialog';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import Fuse, { FuseGetFunction } from 'fuse.js';
import AutoNumeric from 'autonumeric';
import { NgForOf } from '@angular/common';

declare class BizyAccordionComponent {
    private ref;
    id: string;
    customClass: string;
    disabled: boolean;
    opened: boolean;
    openedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    constructor(ref: ChangeDetectorRef);
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAccordionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyAccordionComponent, "bizy-accordion", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "openedChange": "openedChange"; "onSelect": "onSelect"; }, never, ["*", "[accordion-option]"], true, never>;
}

declare class BizyAccordionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAccordionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyAccordionModule, never, [typeof BizyAccordionComponent], [typeof BizyAccordionComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyAccordionModule>;
}

declare enum MIME_TYPE {
    OGG = "audio/ogg",
    MPEG = "audio/mpeg",
    WAV = "audio/wav"
}

declare class BizyAudioPlayerComponent {
    #private;
    id: string;
    mimeType: string;
    audioPlayerError: string;
    showDownload: boolean;
    autoplay: boolean;
    disabled: boolean;
    downloadURL: string;
    downloadFileName: string;
    onDownload: EventEmitter<void>;
    canPlayThrough: EventEmitter<Event>;
    onTrackPlayerRate: EventEmitter<string>;
    set audioURL(audioURL: string);
    _audioURL: string | null;
    _ready: boolean;
    _playbackRate: number;
    _trackPlayerRate(): void;
    _onTrackPlayerRate(): void;
    _onDownload(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAudioPlayerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyAudioPlayerComponent, "bizy-audio-player", never, { "id": { "alias": "id"; "required": false; }; "mimeType": { "alias": "mimeType"; "required": false; }; "audioPlayerError": { "alias": "audioPlayerError"; "required": false; }; "showDownload": { "alias": "showDownload"; "required": false; }; "autoplay": { "alias": "autoplay"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "downloadURL": { "alias": "downloadURL"; "required": false; }; "downloadFileName": { "alias": "downloadFileName"; "required": false; }; "audioURL": { "alias": "audioURL"; "required": false; }; }, { "onDownload": "onDownload"; "canPlayThrough": "canPlayThrough"; "onTrackPlayerRate": "onTrackPlayerRate"; }, never, never, true, never>;
}

declare class BizyAudioPlayerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAudioPlayerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyAudioPlayerModule, never, [typeof BizyAudioPlayerComponent], [typeof BizyAudioPlayerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyAudioPlayerModule>;
}

interface IBizyBarLineChartData {
    values?: Array<number>;
    type?: 'bar' | 'line';
    label?: string;
    discrete?: boolean;
    color?: string;
    stack?: string;
    xAxi?: {
        name: string;
    };
    yAxi?: {
        name?: string;
        hide?: boolean;
        position?: 'left' | 'right';
        onValueFormatter?: (item: any) => string;
    };
}

declare class BizyBarLineChartComponent implements OnDestroy, AfterViewInit {
    #private;
    private elementRef;
    private document;
    private ref;
    private renderer;
    resizeRef: HTMLElement | null;
    tooltip: boolean;
    download: {
        hide?: boolean;
        label: string;
        name: string;
    };
    axisPointer: 'line' | 'cross';
    xAxisLabels: Array<string>;
    onTooltipFormatter: (item: any) => string;
    onXAxisLabelFormatter: (item: any) => string;
    onDownload: EventEmitter<void>;
    onSelect: EventEmitter<string>;
    constructor(elementRef: ElementRef, document: Document, ref: ChangeDetectorRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    set data(data: Array<IBizyBarLineChartData>);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyBarLineChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyBarLineChartComponent, "bizy-bar-line-chart", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "download": { "alias": "download"; "required": false; }; "axisPointer": { "alias": "axisPointer"; "required": false; }; "xAxisLabels": { "alias": "xAxisLabels"; "required": false; }; "onTooltipFormatter": { "alias": "onTooltipFormatter"; "required": false; }; "onXAxisLabelFormatter": { "alias": "onXAxisLabelFormatter"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, { "onDownload": "onDownload"; "onSelect": "onSelect"; }, never, never, true, never>;
}

declare class BizyBarLineChartModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyBarLineChartModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyBarLineChartModule, never, [typeof BizyBarLineChartComponent], [typeof BizyBarLineChartComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyBarLineChartModule>;
}

interface IBizyBreadcrumb {
    label: string;
    path: string;
    icon: string;
    skip: boolean;
}

declare class BizyBreadcrumbComponent {
    private ref;
    onSelect: EventEmitter<IBizyBreadcrumb>;
    _breadcrumbs: Array<IBizyBreadcrumb>;
    showGoBack: boolean;
    constructor(ref: ChangeDetectorRef);
    set breadcrumbs(breadcrumbs: Array<IBizyBreadcrumb>);
    goTo(breadcrumb: IBizyBreadcrumb): void;
    goBack(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyBreadcrumbComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyBreadcrumbComponent, "bizy-breadcrumb", never, { "breadcrumbs": { "alias": "breadcrumbs"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, true, never>;
}

declare class BizyBreadcrumbModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyBreadcrumbModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyBreadcrumbModule, never, [typeof BizyBreadcrumbComponent], [typeof BizyBreadcrumbComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyBreadcrumbModule>;
}

declare class BizyButtonComponent {
    id: string;
    disabled: boolean;
    type: 'button' | 'submit';
    customClass: string;
    onSelect: EventEmitter<PointerEvent>;
    _focused: boolean;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyButtonComponent, "bizy-button", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], true, never>;
}

declare class BizyButtonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyButtonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyButtonModule, never, [typeof BizyButtonComponent], [typeof BizyButtonComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyButtonModule>;
}

declare enum BIZY_CALENDAR_MODE {
    MONTH = "month",
    WEEK = "week",
    DAY = "day"
}
declare enum BIZY_CALENDAR_DAY {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6
}
declare enum BIZY_CALENDAR_EVENT_ACTION {
    DELETE = "DELETE"
}
interface IBizyCalendarEvent {
    start: number;
    end: number;
    description?: string;
    id?: number | string;
    color?: string;
    backgroundColor?: string;
    customClass?: string;
    meta?: Record<string, unknown>;
    actions?: Array<BIZY_CALENDAR_EVENT_ACTION>;
    incrementsBadgeTotal?: boolean;
}
declare enum BIZY_CALENDAR_LANGUAGE {
    SPANISH = "es",
    ENGLISH = "en"
}

declare class BizyCalendarComponent {
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
    set viewDate(viewDate: number);
    _calendarEvents: Array<CalendarEvent>;
    _events: Array<IBizyCalendarEvent>;
    set events(events: Array<IBizyCalendarEvent>);
    beforeMonthViewRender({ body }: {
        body: CalendarMonthViewDay[];
    }): void;
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

declare class BizyCalendarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCalendarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyCalendarModule, never, [typeof BizyCalendarComponent], [typeof BizyCalendarComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyCalendarModule>;
}

declare class BizyCardComponent {
    id: string;
    disabled: boolean;
    selected: boolean;
    customClass: string;
    onSelect: EventEmitter<PointerEvent>;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyCardComponent, "bizy-card", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["[slot=header-start]", "[slot=header-end]", "*", "[slot=footer-start]", "[slot=footer-end]"], true, never>;
}

declare class BizyCardModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCardModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyCardModule, never, [typeof BizyCardComponent], [typeof BizyCardComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyCardModule>;
}

declare class BizyCheckboxComponent {
    id: string;
    selected: boolean;
    disabled: boolean;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    _checkboxId: string;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyCheckboxComponent, "bizy-checkbox", never, { "id": { "alias": "id"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, never, ["[slot=start]", "[slot=end]"], true, never>;
}

declare class BizyCheckboxModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCheckboxModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyCheckboxModule, never, [typeof BizyCheckboxComponent], [typeof BizyCheckboxComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyCheckboxModule>;
}

declare class BizyDatePickerComponent {
    #private;
    private bizyDatePicker;
    id: string;
    disabled: boolean;
    customClass: string;
    opened: boolean;
    minDate: number | null;
    maxDate: number | null;
    enableSeconds: boolean;
    dateChange: EventEmitter<number>;
    rangeChange: EventEmitter<{
        from: number;
        to: number;
    }>;
    onChange: EventEmitter<number | {
        from: number;
        to: number;
    }>;
    openedChange: EventEmitter<boolean>;
    onOpen: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    dateFormat: string;
    datePipeFormat: string;
    enableTime: boolean;
    started: boolean;
    noCalendar: boolean;
    mode: 'single' | 'range';
    dates: Array<number>;
    time: number;
    get touched(): boolean;
    set date(date: number);
    set range(range: {
        from: number;
        to: number;
    });
    value: string;
    set type(type: 'date' | 'date-time' | 'time' | 'year-month');
    ngAfterViewInit(): void;
    setTouched(touched: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyDatePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyDatePickerComponent, "bizy-date-picker", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "enableSeconds": { "alias": "enableSeconds"; "required": false; }; "date": { "alias": "date"; "required": false; }; "range": { "alias": "range"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, { "dateChange": "dateChange"; "rangeChange": "rangeChange"; "onChange": "onChange"; "openedChange": "openedChange"; "onOpen": "onOpen"; "onSelect": "onSelect"; }, never, ["[slot=header]", "[slot=prefix]", "[slot=error]"], true, never>;
}

declare class BizyDatePickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyDatePickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyDatePickerModule, never, [typeof BizyDatePickerComponent], [typeof BizyDatePickerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyDatePickerModule>;
}

declare class BizyFileUploaderComponent implements AfterViewInit, OnDestroy {
    #private;
    dragDropAreaWidth: string;
    dragDropAreaHeight: string;
    language: 'es' | 'en';
    headers: Record<string, string>;
    maxFileSize: number | null;
    minFileSize: number | null;
    maxTotalFileSize: number | null;
    maxNumberOfFiles: number | null;
    minNumberOfFiles: number | null;
    allowedFileTypes: string[];
    hideUploadButton: boolean;
    hidePauseResumeButton: boolean;
    hideCancelButton: boolean;
    disableLocalFiles: boolean;
    load: Subject<{
        id: string;
        file: File;
    }>;
    upload: Subject<{
        endpoint: string;
        headers?: Record<string, string>;
    }>;
    set disabled(value: boolean);
    completed: EventEmitter<{
        successful: Array<{
            fileId: string;
            meta: unknown;
        }>;
        failed: Array<{
            fileId: string;
            meta: unknown;
        }>;
    }>;
    loadedFiles: EventEmitter<UppyFile[]>;
    readonly TEMPLATE_ID = "bizy-file-uploader-template";
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFileUploaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFileUploaderComponent, "bizy-file-uploader", never, { "dragDropAreaWidth": { "alias": "dragDropAreaWidth"; "required": false; }; "dragDropAreaHeight": { "alias": "dragDropAreaHeight"; "required": false; }; "language": { "alias": "language"; "required": false; }; "headers": { "alias": "headers"; "required": false; }; "maxFileSize": { "alias": "maxFileSize"; "required": false; }; "minFileSize": { "alias": "minFileSize"; "required": false; }; "maxTotalFileSize": { "alias": "maxTotalFileSize"; "required": false; }; "maxNumberOfFiles": { "alias": "maxNumberOfFiles"; "required": false; }; "minNumberOfFiles": { "alias": "minNumberOfFiles"; "required": false; }; "allowedFileTypes": { "alias": "allowedFileTypes"; "required": false; }; "hideUploadButton": { "alias": "hideUploadButton"; "required": false; }; "hidePauseResumeButton": { "alias": "hidePauseResumeButton"; "required": false; }; "hideCancelButton": { "alias": "hideCancelButton"; "required": false; }; "disableLocalFiles": { "alias": "disableLocalFiles"; "required": false; }; "load": { "alias": "load"; "required": false; }; "upload": { "alias": "upload"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "completed": "completed"; "loadedFiles": "loadedFiles"; }, never, never, true, never>;
}

declare class BizyFileUploaderModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFileUploaderModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyFileUploaderModule, never, [typeof BizyFileUploaderComponent], [typeof BizyFileUploaderComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyFileUploaderModule>;
}

declare class BizyFileUploaderService {
    #private;
    get fileLoaded$(): Observable<UppyFile>;
    get fileRemoved$(): Observable<UppyFile>;
    get upload$(): Observable<void>;
    get uploadSuccess$(): Observable<{
        file: UppyFile;
        response: SuccessResponse;
    }>;
    get error$(): Observable<{
        file?: UppyFile;
        error: Error;
    }>;
    get cancelAll$(): Observable<void>;
    get complete$(): Observable<{
        successful: Array<UppyFile>;
        failed: Array<UppyFile>;
    }>;
    createFileUploader(data: {
        maxFileSize: number | null;
        minFileSize: number | null;
        maxTotalFileSize: number | null;
        maxNumberOfFiles: number | null;
        minNumberOfFiles: number | null;
        dragDropAreaWidth: string;
        dragDropAreaHeight: string;
        allowedFileTypes: Array<string>;
        language: 'es' | 'en';
        templateId: string;
        hideCancelButton: boolean;
        hideUploadButton: boolean;
        hidePauseResumeButton: boolean;
        disableLocalFiles: boolean;
        headers: Record<string, string>;
    }): void;
    load: (data: {
        id: string;
        file: File;
    }) => void;
    disable(value: boolean): void;
    upload: (data: {
        endpoint: string;
        headers?: Record<string, string>;
    }) => void;
    cleanAllFiles: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFileUploaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyFileUploaderService>;
}

declare class BizyFilterComponent {
    #private;
    private document;
    private ref;
    private sections;
    id: string;
    disabled: boolean;
    customClass: string;
    opened: boolean;
    onOpen: EventEmitter<PointerEvent>;
    onChange: EventEmitter<boolean>;
    _filterWidth: number;
    _activated: boolean;
    constructor(document: Document, ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    _onOpen: (event: any) => void;
    close: (event: PointerEvent & {
        target: {
            id: string;
        };
    }) => void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterComponent, "bizy-filter", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "onOpen": "onOpen"; "onChange": "onChange"; }, ["sections"], ["*", "bizy-filter-section", "bizy-filter-content"], true, never>;
}

declare class BizyFilterSectionComponent {
    #private;
    private document;
    private ref;
    private checkboxOptions;
    private rangeOption;
    private searchOption;
    id: string;
    disabled: boolean;
    customClass: string;
    onSelect: EventEmitter<boolean>;
    _activated: boolean;
    constructor(document: Document, ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    _onSelect: (selected: boolean) => void;
    onClean: () => void;
    isActivated: () => boolean;
    getId: () => string;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionComponent, "bizy-filter-section", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, ["rangeOption", "searchOption", "checkboxOptions"], ["[slot=header]", "bizy-filter-section-checkbox-option", "bizy-filter-section-range-option", "bizy-filter-section-search-option"], true, never>;
}

declare class BizyFilterContentComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterContentComponent, "bizy-filter-content", never, {}, {}, never, ["*"], true, never>;
}

declare class BizyFilterSectionCheckboxOptionComponent {
    private ref;
    id: string;
    disabled: boolean;
    customClass: string;
    onChange: EventEmitter<boolean>;
    set selected(selected: boolean);
    _selected: boolean;
    constructor(ref: ChangeDetectorRef);
    onSelect: (selected: boolean) => void;
    getSelected: () => boolean;
    getId: () => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionCheckboxOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionCheckboxOptionComponent, "bizy-filter-section-checkbox-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onChange": "onChange"; }, never, ["*"], true, never>;
}

declare class BizyFilterSectionRangeOptionComponent {
    #private;
    id: string;
    disabled: boolean;
    customClass: string;
    onChange: EventEmitter<{
        min: number | null;
        max: number | null;
    }>;
    _minLimit: number;
    _maxLimit: number;
    get activated$(): Observable<boolean>;
    set min(min: number | null);
    set max(max: number | null);
    set minLimit(min: number | null);
    set maxLimit(max: number | null);
    setMinValue(value: number | string): void;
    setMaxValue(value: number | string | null): void;
    get minValue(): AbstractControl<number | string>;
    get maxValue(): AbstractControl<number | string>;
    onClean: () => void;
    getId: () => string;
    isActivated: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionRangeOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionRangeOptionComponent, "bizy-filter-section-range-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "minLimit": { "alias": "minLimit"; "required": false; }; "maxLimit": { "alias": "maxLimit"; "required": false; }; }, { "onChange": "onChange"; }, never, ["[slot=min-header]", "[slot=max-header]"], true, never>;
}

declare class BizyFilterSectionSearchOptionComponent {
    #private;
    private ref;
    id: string;
    customClass: string;
    valueChange: EventEmitter<string>;
    onChange: EventEmitter<string>;
    _value: string;
    get activated$(): Observable<boolean>;
    set value(value: string);
    constructor(ref: ChangeDetectorRef);
    _onChange(value: string): void;
    getId: () => string;
    getValue: () => string;
    isActivated: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionSearchOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionSearchOptionComponent, "bizy-filter-section-search-option", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "valueChange": "valueChange"; "onChange": "onChange"; }, never, ["[slot=prefix]", "[slot=suffix]"], true, never>;
}

declare class BizyFilterSectionsComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionsComponent, "bizy-filter-sections", never, {}, {}, never, ["*"], true, never>;
}

declare class BizyFilterPipe implements PipeTransform {
    transform<T>(items: Array<T>, property: string, states?: string | number | boolean | Array<{
        id: string | number | boolean;
        selected: boolean;
    }>): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyFilterPipe, "bizyFilter", true>;
}

declare class BizyRangeFilterPipe implements PipeTransform {
    transform<T>(items: Array<T>, property: string, range: {
        min: number | null;
        max: number | null;
    }): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyRangeFilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyRangeFilterPipe, "bizyRangeFilter", true>;
}

declare class BizyFilterModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyFilterModule, never, [typeof BizyFilterComponent, typeof BizyFilterSectionComponent, typeof BizyFilterContentComponent, typeof BizyFilterSectionCheckboxOptionComponent, typeof BizyFilterSectionRangeOptionComponent, typeof BizyFilterSectionSearchOptionComponent, typeof BizyFilterSectionsComponent, typeof BizyFilterPipe, typeof BizyRangeFilterPipe], [typeof BizyFilterComponent, typeof BizyFilterSectionComponent, typeof BizyFilterContentComponent, typeof BizyFilterSectionCheckboxOptionComponent, typeof BizyFilterSectionRangeOptionComponent, typeof BizyFilterSectionSearchOptionComponent, typeof BizyFilterSectionsComponent, typeof BizyFilterPipe, typeof BizyRangeFilterPipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyFilterModule>;
}

declare class BizyInputOptionComponent {
    private ref;
    id: string;
    disabled: boolean;
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<PointerEvent>;
    constructor(ref: ChangeDetectorRef);
    _onSelect(event: PointerEvent): void;
    getId: () => string;
    getSelected: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyInputOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyInputOptionComponent, "bizy-input-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], true, never>;
}

declare class BizyInputComponent implements OnDestroy {
    #private;
    private ref;
    options: QueryList<BizyInputOptionComponent>;
    bizyInputWrapper: ElementRef;
    bizyInput: ElementRef;
    id: string;
    name: string;
    type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'textarea' | 'currency';
    customClass: string;
    placeholder: string;
    debounceTime: number;
    rows: number;
    disabled: boolean;
    readonly: boolean;
    valueChange: EventEmitter<string | number>;
    onChange: EventEmitter<string | number>;
    onEnter: EventEmitter<PointerEvent>;
    onBackspace: EventEmitter<PointerEvent>;
    onSelect: EventEmitter<PointerEvent>;
    onBlur: EventEmitter<PointerEvent>;
    onFocus: EventEmitter<PointerEvent>;
    set autofocus(autofocus: boolean);
    set value(value: string | number | null);
    focused: boolean;
    touched: boolean;
    opened: boolean;
    _value: string | number | null;
    _currencyValue: number | null;
    currencyOptions: string;
    onChange$: Subject<string | number>;
    constructor(ref: ChangeDetectorRef);
    getWidth(): number;
    _onchange(value: string): void;
    _onClick(event: PointerEvent): void;
    _onEnter(event: PointerEvent): void;
    _onBlur(event: PointerEvent): void;
    _onBackspace(event: PointerEvent): void;
    _onFocus(event: PointerEvent): void;
    setTouched(touched: boolean): void;
    ngAfterViewInit(): void;
    onOpen(): void;
    setFocus(focus: boolean): void;
    close: (event?: PointerEvent & {
        target: {
            id: string;
        };
    }, button?: HTMLButtonElement) => void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyInputComponent, "bizy-input", never, { "id": { "alias": "id"; "required": false; }; "name": { "alias": "name"; "required": false; }; "type": { "alias": "type"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "debounceTime": { "alias": "debounceTime"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "autofocus": { "alias": "autofocus"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "valueChange": "valueChange"; "onChange": "onChange"; "onEnter": "onEnter"; "onBackspace": "onBackspace"; "onSelect": "onSelect"; "onBlur": "onBlur"; "onFocus": "onFocus"; }, ["options"], ["[slot=header]", "[slot=prefix]", "[slot=suffix]", "bizy-input-option", "[slot=error]"], true, never>;
}

declare class BizySelectOptionComponent {
    #private;
    private elementRef;
    private ref;
    id: string;
    disabled: boolean;
    customClass: string;
    onSelect: EventEmitter<void>;
    set selected(selected: boolean);
    get selected$(): Observable<boolean>;
    constructor(elementRef: ElementRef, ref: ChangeDetectorRef);
    _onSelect(): void;
    getId: () => string;
    getSelected: () => boolean;
    getValue: () => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySelectOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySelectOptionComponent, "bizy-select-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], true, never>;
}

declare class BizySelectComponent implements AfterViewInit {
    #private;
    private ref;
    templatePortalContent: TemplateRef<unknown>;
    options: QueryList<BizySelectOptionComponent>;
    bizyInput: BizyInputComponent;
    id: string;
    disabled: boolean;
    readonly: boolean;
    placeholder: string;
    customClass: string;
    opened: boolean;
    openedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    onOpen: EventEmitter<boolean>;
    _optionValue: string;
    optionPortal: Portal<any>;
    templatePortal: TemplatePortal<any> | null;
    constructor(ref: ChangeDetectorRef);
    get touched(): boolean;
    ngAfterViewInit(): void;
    _onOpen(event: PointerEvent): void;
    close: (event?: PointerEvent & {
        target: {
            id: string;
        };
    }, select?: BizyInputComponent) => void;
    setTouched(touched: boolean): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySelectComponent, "bizy-select", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "openedChange": "openedChange"; "onSelect": "onSelect"; "onOpen": "onOpen"; }, ["options"], ["[slot=header]", "[slot=prefix]", "[slot=error]", "bizy-select-option", "bizy-input"], true, never>;
}

declare class BizyFormComponent {
    inputs: QueryList<BizyInputComponent>;
    selects: QueryList<BizySelectComponent>;
    datePickers: QueryList<BizyDatePickerComponent>;
    id: string;
    customClass: string;
    onSubmit(event: Event): void;
    setTouched: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFormComponent, "bizy-form", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, ["inputs", "selects", "datePickers"], ["*"], true, never>;
}

declare class BizyFormModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFormModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyFormModule, never, [typeof BizyFormComponent], [typeof BizyFormComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyFormModule>;
}

declare class BizyGridForDirective {
    #private;
    readonly viewContainerRef: ViewContainerRef;
    readonly templateRef: TemplateRef<any>;
    get items$(): Observable<Array<unknown>>;
    set gridForOf(items: Array<unknown>);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyGridForDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyGridForDirective, "[gridFor]", never, { "gridForOf": { "alias": "gridForOf"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BizyGridComponent implements AfterContentInit {
    #private;
    private ref;
    private document;
    private renderer;
    private elementRef;
    content: TemplateRef<object>;
    gridDirective: BizyGridForDirective;
    resizeRef: ElementRef | null;
    notifier$: Subject<void>;
    rowHeight: number;
    itemRows: Array<Array<unknown>>;
    items: Array<unknown>;
    itemTemplate: TemplateRef<unknown>;
    itemsPerRow: number;
    constructor(ref: ChangeDetectorRef, document: Document, renderer: Renderer2, elementRef: ElementRef);
    ngAfterContentInit(): void;
    trackById(index: number, item: any): any;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyGridComponent, "bizy-grid", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; }, {}, ["gridDirective"], ["*"], true, never>;
}

declare class BizyGridRowComponent {
    #private;
    rowHeight: number;
    set itemsPerRow(itemsPerRow: number);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyGridRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyGridRowComponent, "bizy-grid-row", never, { "rowHeight": { "alias": "rowHeight"; "required": false; }; "itemsPerRow": { "alias": "itemsPerRow"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class BizyGridModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyGridModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyGridModule, never, [typeof BizyGridComponent, typeof BizyGridRowComponent, typeof BizyGridForDirective], [typeof BizyGridComponent, typeof BizyGridRowComponent, typeof BizyGridForDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyGridModule>;
}

declare class BizyInputModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyInputModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyInputModule, never, [typeof BizyInputComponent, typeof BizyInputOptionComponent], [typeof BizyInputComponent, typeof BizyInputOptionComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyInputModule>;
}

declare class BizyListComponent {
    id: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyListComponent, "bizy-list", never, { "id": { "alias": "id"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class BizyListModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyListModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyListModule, never, [typeof BizyListComponent], [typeof BizyListComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyListModule>;
}

declare class BizyMenuOptionComponent {
    id: string;
    disabled: boolean;
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<PointerEvent & {
        target: {
            id: string;
        };
    }>;
    _onSelect(event: PointerEvent & {
        target: {
            id: string;
        };
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyMenuOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyMenuOptionComponent, "bizy-menu-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*", "bizy-menu"], true, never>;
}

declare class BizyMenuComponent {
    #private;
    options: QueryList<BizyMenuOptionComponent>;
    id: string;
    disabled: boolean;
    offsetX: number;
    offsetY: number;
    customClass: string;
    hideArrow: boolean;
    opened: boolean;
    onSelect: EventEmitter<PointerEvent>;
    _menuWidth: number;
    readonly bizyMenuOptionsId = "bizyMenuOptionsId";
    _onSelect(event: any): void;
    selectButton(event: any): void;
    close: (event: Event & {
        target: {
            id: string;
        };
    }) => void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyMenuComponent, "bizy-menu", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "offsetX": { "alias": "offsetX"; "required": false; }; "offsetY": { "alias": "offsetY"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "hideArrow": { "alias": "hideArrow"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "onSelect": "onSelect"; }, ["options"], ["*", "bizy-menu-title", "bizy-input", "bizy-menu-option"], true, never>;
}

declare class BizyMenuTitleComponent {
    id: string;
    customClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyMenuTitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyMenuTitleComponent, "bizy-menu-title", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class BizyMenuModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyMenuModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyMenuModule, never, [typeof BizyMenuComponent, typeof BizyMenuOptionComponent, typeof BizyMenuTitleComponent], [typeof BizyMenuComponent, typeof BizyMenuOptionComponent, typeof BizyMenuTitleComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyMenuModule>;
}

interface IBizyPieChartData {
    name: string;
    value: number;
    color?: string;
}

declare class BizyPieChartComponent {
    #private;
    private elementRef;
    private document;
    private ref;
    private renderer;
    resizeRef: HTMLElement | null;
    tooltip: boolean;
    type: 'pie' | 'donut';
    download: {
        hide?: boolean;
        label: string;
        name: string;
    };
    onLabelFormatter: (item: any) => string;
    onTooltipFormatter: (item: any) => string;
    onSelect: EventEmitter<string>;
    onDownload: EventEmitter<void>;
    constructor(elementRef: ElementRef, document: Document, ref: ChangeDetectorRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    set data(data: Array<IBizyPieChartData>);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPieChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyPieChartComponent, "bizy-pie-chart", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "type": { "alias": "type"; "required": false; }; "download": { "alias": "download"; "required": false; }; "onLabelFormatter": { "alias": "onLabelFormatter"; "required": false; }; "onTooltipFormatter": { "alias": "onTooltipFormatter"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, { "onSelect": "onSelect"; "onDownload": "onDownload"; }, never, never, true, never>;
}

declare class BizyPieChartModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPieChartModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyPieChartModule, never, [typeof BizyPieChartComponent], [typeof BizyPieChartComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyPieChartModule>;
}

declare class BizyFullScreenPopupWrapperComponent<T> {
    #private;
    dynamicComponentContainer: ViewContainerRef;
    disabled: boolean;
    disableClose: boolean;
    disableDrag: boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    loadDynamicComponent: () => void;
    close(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFullScreenPopupWrapperComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFullScreenPopupWrapperComponent<any>, "bizy-full-screen-popup-wrapper", never, {}, {}, never, never, true, never>;
}

declare class BizyPopupWrapperComponent<T> {
    #private;
    dynamicComponentContainer: ViewContainerRef;
    disabled: boolean;
    disableClose: boolean;
    disableDrag: boolean;
    position: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    } | null;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    loadDynamicComponent: () => void;
    close(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPopupWrapperComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyPopupWrapperComponent<any>, "bizy-popup-wrapper", never, {}, {}, never, never, true, never>;
}

declare class BizyPopupModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPopupModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyPopupModule, never, [typeof BizyPopupWrapperComponent, typeof BizyFullScreenPopupWrapperComponent], [typeof BizyPopupWrapperComponent, typeof BizyFullScreenPopupWrapperComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyPopupModule>;
}

interface IBizyPopupResponse {
    id: string;
    response: unknown;
}

declare class BizyPopupService {
    #private;
    static dialogs: Set<DialogRef<unknown, any>>;
    /**
     *
     * @param data.disableClose Deprecated
     */
    open<R>(data: {
        component: ComponentType<unknown>;
        data?: unknown;
        customClass?: Array<string> | string;
        fullScreen?: boolean;
        disableClose?: boolean;
        disableBackdropClose?: boolean;
        id?: string;
        disableCloseButton?: boolean;
        disableDragButton?: boolean;
        position?: {
            top?: string;
            right?: string;
            bottom?: string;
            left?: string;
        };
    }, callback?: (res: R) => void): void;
    getData<D>(): D;
    close(data?: {
        id?: string;
        response?: unknown;
    }): Promise<void>;
    closeAll(): void;
    openedPopups(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPopupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyPopupService>;
}

declare class BizyRadioComponent {
    id: string;
    name: string;
    selected: boolean;
    disabled: boolean;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyRadioComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyRadioComponent, "bizy-radio", never, { "id": { "alias": "id"; "required": false; }; "name": { "alias": "name"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, never, ["[slot=start]", "[slot=end]"], true, never>;
}

declare class BizyRadioModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyRadioModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyRadioModule, never, [typeof BizyRadioComponent], [typeof BizyRadioComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyRadioModule>;
}

declare class BizySectionComponent {
    id: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySectionComponent, "bizy-section", never, { "id": { "alias": "id"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class BizySectionStartComponent {
    id: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySectionStartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySectionStartComponent, "bizy-section-start", never, { "id": { "alias": "id"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class BizySectionCenterComponent {
    id: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySectionCenterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySectionCenterComponent, "bizy-section-center", never, { "id": { "alias": "id"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class BizySectionEndComponent {
    id: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySectionEndComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySectionEndComponent, "bizy-section-end", never, { "id": { "alias": "id"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class BizySectionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySectionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizySectionModule, never, [typeof BizySectionComponent, typeof BizySectionStartComponent, typeof BizySectionCenterComponent, typeof BizySectionEndComponent], [typeof BizySectionComponent, typeof BizySectionStartComponent, typeof BizySectionCenterComponent, typeof BizySectionEndComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizySectionModule>;
}

declare class BizySelectModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySelectModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizySelectModule, never, [typeof BizySelectComponent, typeof BizySelectOptionComponent], [typeof BizySelectComponent, typeof BizySelectOptionComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizySelectModule>;
}

declare class BizySidebarOptionComponent {
    private ref;
    options: QueryList<BizySidebarOptionComponent>;
    id: string;
    disabled: boolean;
    selectable: boolean;
    customClass: string;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    _turnOn$: BehaviorSubject<boolean>;
    _selected: boolean;
    set selected(selected: boolean);
    constructor(ref: ChangeDetectorRef);
    _onSelect(event: PointerEvent): void;
    _setSelected(selected: boolean): void;
    getId: () => string;
    getSelected: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySidebarOptionComponent, "bizy-sidebar-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, ["options"], ["*", "bizy-sidebar-option"], true, never>;
}

declare class BizySidebarFloatingOptionComponent implements AfterContentInit {
    #private;
    private ref;
    options: QueryList<BizySidebarOptionComponent>;
    id: string;
    disabled: boolean;
    selectable: boolean;
    offsetX: number;
    offsetY: number;
    customClass: string;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    _turnOn$: BehaviorSubject<boolean>;
    _selected: boolean;
    _opened: boolean;
    set selected(selected: boolean);
    constructor(ref: ChangeDetectorRef);
    ngAfterContentInit(): void;
    _onSelect(event: PointerEvent): void;
    close: (event: PointerEvent & {
        target: {
            id: string;
        };
    }) => void;
    getId: () => string;
    getSelected: () => boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarFloatingOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySidebarFloatingOptionComponent, "bizy-sidebar-floating-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; "offsetX": { "alias": "offsetX"; "required": false; }; "offsetY": { "alias": "offsetY"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, ["options"], ["*", "bizy-sidebar-floating-option-title", "bizy-sidebar-option"], true, never>;
}

declare class BizySidebarComponent implements AfterContentInit {
    #private;
    id: string;
    options: QueryList<BizySidebarOptionComponent>;
    floatingOptions: QueryList<BizySidebarFloatingOptionComponent>;
    toggleChange: EventEmitter<boolean>;
    onToggle: EventEmitter<PointerEvent>;
    _toggle: boolean;
    set toggle(toggle: boolean);
    ngAfterContentInit(): void;
    _onToggle(event: PointerEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySidebarComponent, "bizy-sidebar", never, { "id": { "alias": "id"; "required": false; }; "toggle": { "alias": "toggle"; "required": false; }; }, { "toggleChange": "toggleChange"; "onToggle": "onToggle"; }, ["options", "floatingOptions"], ["[slot=start]", "[slot=start]", "*", "[slot=end]"], true, never>;
}

declare class BizySidebarFloatingOptionTitleComponent {
    id: string;
    customClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarFloatingOptionTitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySidebarFloatingOptionTitleComponent, "bizy-sidebar-floating-option-title", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class BizySidebarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizySidebarModule, never, [typeof BizySidebarComponent, typeof BizySidebarFloatingOptionComponent, typeof BizySidebarFloatingOptionTitleComponent, typeof BizySidebarOptionComponent], [typeof BizySidebarComponent, typeof BizySidebarFloatingOptionComponent, typeof BizySidebarFloatingOptionTitleComponent, typeof BizySidebarOptionComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizySidebarModule>;
}

declare enum BIZY_SKELETON_SHAPE {
    CIRCLE = "circle",
    SQUARE = "square"
}

declare class BizySkeletonComponent {
    id: string;
    shape: BIZY_SKELETON_SHAPE;
    height: string;
    width: string;
    customClass: string;
    readonly BIZY_SKELETON_SHAPE: typeof BIZY_SKELETON_SHAPE;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySkeletonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySkeletonComponent, "bizy-skeleton", never, { "id": { "alias": "id"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; "height": { "alias": "height"; "required": false; }; "width": { "alias": "width"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BizySkeletonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySkeletonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizySkeletonModule, never, [typeof BizySkeletonComponent], [typeof BizySkeletonComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizySkeletonModule>;
}

declare class BizySliderComponent {
    fromSlider: ElementRef;
    toSlider: ElementRef;
    minLimit: number;
    maxLimit: number;
    onChange: EventEmitter<{
        min: number;
        max: number;
    }>;
    _min: number;
    _max: number;
    set min(min: number);
    set max(max: number);
    setFromSlider(value: number): void;
    setToSlider(value: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySliderComponent, "bizy-slider", never, { "minLimit": { "alias": "minLimit"; "required": false; }; "maxLimit": { "alias": "maxLimit"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; }, { "onChange": "onChange"; }, never, never, true, never>;
}

declare class BizySliderModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySliderModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizySliderModule, never, [typeof BizySliderComponent], [typeof BizySliderComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizySliderModule>;
}

declare class BizyTableColumnComponent {
    #private;
    id: string;
    customClass: string;
    contextMenu: EventEmitter<MouseEvent>;
    onSelect: EventEmitter<PointerEvent>;
    onRightClick(event: MouseEvent): void;
    getId: () => string;
    setMarginLeft(margin: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableColumnComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableColumnComponent, "bizy-table-column", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "contextMenu": "contextMenu"; "onSelect": "onSelect"; }, never, ["*"], true, never>;
}

declare class BizyTableHeaderComponent {
    private ref;
    elementRef: ElementRef;
    columns: QueryList<BizyTableColumnComponent>;
    id: string;
    customClass: string;
    selected: boolean;
    selectable: boolean | null;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    marginRight: number;
    constructor(ref: ChangeDetectorRef, elementRef: ElementRef);
    getId: () => string;
    getSelected: () => boolean;
    setSelectable: (selectable: boolean) => void;
    setMarginRight(margin: number): void;
    setMarginLeft(margin: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableHeaderComponent, "bizy-table-header", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, ["columns"], ["bizy-table-column"], true, never>;
}

declare class BizyTableFooterComponent {
    private ref;
    elementRef: ElementRef;
    columns: QueryList<BizyTableColumnComponent>;
    id: string;
    customClass: string;
    marginRight: number;
    _selectable: boolean;
    constructor(ref: ChangeDetectorRef, elementRef: ElementRef);
    getId: () => string;
    setSelectable: (selectable: boolean) => void;
    setMarginRight(margin: number): void;
    setMarginLeft(margin: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableFooterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableFooterComponent, "bizy-table-footer", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, ["columns"], ["bizy-table-column"], true, never>;
}

declare class BizyTableRowComponent {
    private ref;
    columns: QueryList<BizyTableColumnComponent>;
    id: string;
    customClass: string;
    disabled: boolean;
    selected: boolean;
    opened: boolean;
    selectable: boolean | null;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    openedChange: EventEmitter<boolean>;
    onOpen: EventEmitter<PointerEvent>;
    marginRight: number;
    constructor(ref: ChangeDetectorRef);
    _onOpen(event: PointerEvent): void;
    getId: () => string;
    getSelected: () => boolean;
    setSelectable: (selectable: boolean) => void;
    setSelected: (selected: boolean) => void;
    setMarginRight(margin: number): void;
    setMarginLeft(margin: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableRowComponent, "bizy-table-row", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; "openedChange": "openedChange"; "onOpen": "onOpen"; }, ["columns"], ["bizy-table-column", "bizy-table-row-expand-content"], true, never>;
}

declare class BizyTableScrollingDirective {
    #private;
    viewContainerRef: ViewContainerRef;
    template: TemplateRef<BizyTableRowComponent>;
    ref: ChangeDetectorRef;
    get items$(): Observable<Array<unknown>>;
    set tableForIn(value: Array<unknown>);
    constructor(viewContainerRef: ViewContainerRef, template: TemplateRef<BizyTableRowComponent>, ref: ChangeDetectorRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableScrollingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTableScrollingDirective, "[tableFor]", never, { "tableForIn": { "alias": "tableForIn"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BizyTableScrollingComponent implements OnDestroy {
    #private;
    private document;
    elementRef: ElementRef;
    ref: ChangeDetectorRef;
    viewport: CdkVirtualScrollViewport;
    content: TemplateRef<object>;
    items$: Observable<Array<unknown>>;
    itemTemplate: TemplateRef<BizyTableRowComponent>;
    itemSize: number;
    constructor(document: Document, elementRef: ElementRef, ref: ChangeDetectorRef);
    /** Called by the virtual-for directive inside of the viewport. */
    attachView(tableDirective: BizyTableScrollingDirective): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableScrollingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableScrollingComponent, "bizy-table-scrolling", never, {}, {}, never, ["*"], true, never>;
}

declare class BizyTableComponent implements AfterContentInit {
    #private;
    private ref;
    private document;
    private renderer;
    private elementRef;
    viewport: BizyTableScrollingComponent;
    virtualFor: BizyTableScrollingDirective;
    rows: QueryList<BizyTableRowComponent>;
    headers: QueryList<BizyTableHeaderComponent>;
    footers: QueryList<BizyTableFooterComponent>;
    resizeRef: ElementRef;
    notifier$: Subject<void>;
    marginRight: number;
    marginLeft: number;
    set selectable(selectable: boolean);
    constructor(ref: ChangeDetectorRef, document: Document, renderer: Renderer2, elementRef: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableComponent, "bizy-table", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; }, {}, ["virtualFor", "rows", "headers", "footers"], ["bizy-table-header", "bizy-table-row", "bizy-table-footer"], true, never>;
}

declare class BizyTableColumnArrowsComponent {
    order: 'asc' | 'desc' | null;
    show: boolean;
    customClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableColumnArrowsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableColumnArrowsComponent, "bizy-table-column-arrows", never, { "order": { "alias": "order"; "required": false; }; "show": { "alias": "show"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BizyTableRowExpandContentComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableRowExpandContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableRowExpandContentComponent, "bizy-table-row-expand-content", never, {}, {}, never, ["*"], true, never>;
}

declare class BizyTableColumnFixedDirective {
    #private;
    ngAfterViewInit(): void;
    set tableColumnFixed(value: boolean);
    setMarginLeft: (marginLeft: number) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableColumnFixedDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTableColumnFixedDirective, "[bizyTableColumnFixed]", never, { "tableColumnFixed": { "alias": "bizyTableColumnFixed"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BizyTableModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyTableModule, never, [typeof BizyTableComponent, typeof BizyTableColumnComponent, typeof BizyTableColumnArrowsComponent, typeof BizyTableFooterComponent, typeof BizyTableHeaderComponent, typeof BizyTableRowComponent, typeof BizyTableRowExpandContentComponent, typeof BizyTableScrollingComponent, typeof BizyTableScrollingDirective, typeof BizyTableColumnFixedDirective], [typeof BizyTableComponent, typeof BizyTableColumnComponent, typeof BizyTableColumnArrowsComponent, typeof BizyTableFooterComponent, typeof BizyTableHeaderComponent, typeof BizyTableRowComponent, typeof BizyTableRowExpandContentComponent, typeof BizyTableScrollingComponent, typeof BizyTableScrollingDirective, typeof BizyTableColumnFixedDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyTableModule>;
}

declare class BizyTabComponent {
    elementRef: ElementRef;
    id: string;
    disabled: boolean;
    selected: boolean;
    linePosition: 'bottom' | 'top';
    customClass: string;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    constructor(elementRef: ElementRef);
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTabComponent, "bizy-tab", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "linePosition": { "alias": "linePosition"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, never, ["*"], true, never>;
}

declare class BizyTabsComponent implements AfterViewInit, AfterContentInit {
    #private;
    private ref;
    tabs: QueryList<BizyTabComponent>;
    private bizyTabs;
    private bizyTabsWrapper;
    customClass: string;
    showLeftButton: boolean;
    showRightButton: boolean;
    constructor(ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    onScrollLeft(): void;
    onScrollRight(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTabsComponent, "bizy-tabs", never, { "customClass": { "alias": "customClass"; "required": false; }; }, {}, ["tabs"], ["bizy-tab"], true, never>;
}

declare class BizyTabsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTabsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyTabsModule, never, [typeof BizyTabsComponent, typeof BizyTabComponent], [typeof BizyTabsComponent, typeof BizyTabComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyTabsModule>;
}

declare enum BIZY_TAG_TYPE {
    DEFAULT = "default",
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    DANGER = "danger"
}

declare class BizyTagComponent {
    id: string;
    customClass: string;
    disabled: boolean;
    type: BIZY_TAG_TYPE;
    onSelect: EventEmitter<PointerEvent>;
    _focused: boolean;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTagComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTagComponent, "bizy-tag", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], true, never>;
}

declare class BizyTagModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTagModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyTagModule, never, [typeof BizyTagComponent], [typeof BizyTagComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyTagModule>;
}

declare class BizyTimelineComponent {
    id: string;
    customClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTimelineComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTimelineComponent, "bizy-timeline", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, never, ["bizy-timeline-event"], true, never>;
}

declare class BizyTimelineEventComponent {
    id: string;
    customClass: string;
    showLine: boolean;
    disabled: boolean;
    onSelect: EventEmitter<PointerEvent>;
    _focused: boolean;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTimelineEventComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTimelineEventComponent, "bizy-timeline-event", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "showLine": { "alias": "showLine"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["[slot=start]", "[slot=bullet]", "[slot=end]"], true, never>;
}

declare class BizyTimelineModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTimelineModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyTimelineModule, never, [typeof BizyTimelineComponent, typeof BizyTimelineEventComponent], [typeof BizyTimelineComponent, typeof BizyTimelineEventComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyTimelineModule>;
}

declare enum TOAST {
    DEBUG = "debug",
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    DANGER = "danger"
}
declare class BizyToastService {
    #private;
    static toasts: Set<DialogRef<BizyToastWrapperComponent, unknown>>;
    duration: number;
    defaultDebugTitle: string;
    defaultInfoTitle: string;
    defaultSuccessTitle: string;
    defaultWarningTitle: string;
    defaultDangerTitle: string;
    config(data: {
        defaultDebugTitle?: string;
        defaultInfoTitle?: string;
        defaultSuccessTitle?: string;
        defaultWarningTitle?: string;
        defaultDangerTitle?: string;
        duration?: number;
    }): void;
    debug(data: string | {
        title: string;
        msg?: string;
        duration?: number;
    }): void;
    info(data: string | {
        title: string;
        msg?: string;
        duration?: number;
    }): void;
    success(data?: string | {
        title: string;
        msg?: string;
        duration?: number;
    }): void;
    warning(data: string | {
        title: string;
        msg?: string;
        duration?: number;
    }): void;
    danger(data?: string | {
        title: string;
        msg?: string;
        duration?: number;
    }): void;
    close: (id: string) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyToastService>;
}

declare class BizyToastWrapperComponent {
    private data;
    private toast;
    type: TOAST;
    title: string;
    msg: string;
    id: string;
    constructor(data: {
        type: TOAST;
        title: string;
        msg: string;
        id: string;
        duration: number;
    }, toast: BizyToastService);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToastWrapperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyToastWrapperComponent, "bizy-toast-wrapper", never, {}, {}, never, never, true, never>;
}

declare class BizyToastModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToastModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyToastModule, never, [typeof BizyToastWrapperComponent], [typeof BizyToastWrapperComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyToastModule>;
}

declare class BizyToggleComponent {
    id: string;
    disabled: boolean;
    selected: boolean;
    onSelect: EventEmitter<PointerEvent>;
    selectedChange: EventEmitter<boolean>;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyToggleComponent, "bizy-toggle", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; "selectedChange": "selectedChange"; }, never, ["[slot=start]", "[slot=end]"], true, never>;
}

declare class BizyToggleModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToggleModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyToggleModule, never, [typeof BizyToggleComponent], [typeof BizyToggleComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyToggleModule>;
}

type LabelPosition = 'before' | 'after';

declare class BizyToolbarComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToolbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyToolbarComponent, "bizy-toolbar", never, {}, {}, never, ["[slot=start]", "[slot=end]"], true, never>;
}

declare class BizyToolbarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToolbarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyToolbarModule, never, [typeof BizyToolbarComponent], [typeof BizyToolbarComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyToolbarModule>;
}

declare enum LANGUAGE {
    SPANISH = "es",
    ENGLISH = "en"
}
interface ILocale {
    lang: LANGUAGE;
    translations: Record<string, unknown>;
}
declare class BizyTranslateService {
    #private;
    loadTranslations(...args: ILocale[]): void;
    addLangs(langs: Array<LANGUAGE>): void;
    getLangs(): Array<LANGUAGE>;
    setDefault(lang: LANGUAGE): void;
    getCurrentLang(): LANGUAGE;
    use(lang: LANGUAGE): void;
    get(translation: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTranslateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyTranslateService>;
}

declare class BizyTranslatePipe implements PipeTransform {
    private translate;
    constructor(translate: BizyTranslateService);
    transform(label: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyTranslatePipe, "translate", true>;
}

declare class BizyTranslateModule {
    static forRoot: typeof TranslateModule.forRoot;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTranslateModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyTranslateModule, never, [typeof BizyTranslatePipe], [typeof BizyTranslatePipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyTranslateModule>;
}

declare class BizyServicesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyServicesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyServicesModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyServicesModule>;
}

declare enum BIZY_ANIMATION {
    FADE_IN = "fade-in",
    FADE_OUT = "fade-out",
    FADE_IN_UP = "fade-in-up",
    FADE_IN_RIGHT = "fade-in-right",
    FADE_IN_DOWN = "fade-in-down",
    FADE_IN_LEFT = "fade-in-left",
    SLIDE_IN_UP = "slide-in-up",
    SLIDE_IN_RIGHT = "slide-in-right",
    SLIDE_IN_DOWN = "slide-in-down",
    SLIDE_IN_LEFT = "slide-in-left",
    SLIDE_OUT_UP = "slide-out-up",
    SLIDE_OUT_DOWN = "slide-out-down",
    SLIDE_OUT_RIGHT = "slide-out-right",
    SLIDE_OUT_LEFT = "slide-out-left"
}
declare class BizyAnimationService {
    #private;
    private rendererFactory;
    constructor(rendererFactory: RendererFactory2);
    setAnimation(element: HTMLElement, animation: BIZY_ANIMATION): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAnimationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyAnimationService>;
}

declare class BizyDeviceService {
    #private;
    getUserAgent(): Promise<string>;
    isMobile: () => boolean;
    isTablet: () => boolean;
    isDesktop: () => boolean;
    isPortrait: () => boolean;
    isLandscape: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyDeviceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyDeviceService>;
}

declare class BizyRouterService {
    private router;
    static backPath: string;
    transitionsEnd$: Observable<ActivatedRouteSnapshot>;
    transitionsStart$: Observable<ActivatedRouteSnapshot>;
    popStateEvent$: Observable<PopStateEvent>;
    routeChange$: Observable<void>;
    constructor(router: Router);
    getURL(): string;
    getBackPath(): string;
    getId(activatedRoute: ActivatedRoute, param: string): string | null;
    getQueryParam(activatedRoute: ActivatedRoute, param: string): string | null;
    getAllQueryParam(): Record<string, string>;
    goTo(data: {
        path: string;
        params?: Record<string, string>;
        replace?: boolean;
        skip?: boolean;
    }): void;
    goBack(data?: {
        path: string;
    }): void;
    reload(force?: boolean): void;
    private _serialize;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyRouterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyRouterService>;
}

declare class BizyCacheService {
    private router;
    readonly CACHE_PREFIX = "BIZY-CACHE";
    constructor(router: BizyRouterService);
    getData<T>(key?: string): T;
    setData<T>(value: T, key?: string, expiresAt?: number): void;
    remove(key?: string): void;
    removeAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyCacheService>;
}

declare class BizyCopyToClipboardService {
    #private;
    copy(data: string | {
        items: Array<unknown>;
        model: Record<string, string>;
    }): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCopyToClipboardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyCopyToClipboardService>;
}

declare class BizyExportToCSVService {
    #private;
    private document;
    private rendererFactory;
    constructor(document: Document, rendererFactory: RendererFactory2);
    download(data: {
        items: Array<unknown>;
        model: Record<string, string>;
        fileName: string;
    }): void;
    getCSV(data: {
        items: Array<any>;
        model: Record<string, string>;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyExportToCSVService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyExportToCSVService>;
}

declare enum BIZY_FORMAT_SECONDS_LANGUAGE {
    SPANISH = "es",
    ENGLISH = "en"
}
declare enum BIZY_FORMAT_SECONDS_FORMAT {
    DATE_TIME = "date-time",
    TIME = "time"
}
declare class BizyFormatSecondsService {
    #private;
    getOptions(): {
        language: BIZY_FORMAT_SECONDS_LANGUAGE;
        format: BIZY_FORMAT_SECONDS_FORMAT;
    };
    setOptions(options: {
        language?: BIZY_FORMAT_SECONDS_LANGUAGE;
        format?: BIZY_FORMAT_SECONDS_FORMAT;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFormatSecondsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyFormatSecondsService>;
}

declare class BizyKeyboardService {
    #private;
    private document;
    get shiftHolding$(): Observable<boolean>;
    get controlHolding$(): Observable<boolean>;
    constructor(document: Document);
    isShiftHolding(): boolean;
    isControlHolding(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyKeyboardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyKeyboardService>;
}

interface ILogData {
    fileName: string;
    functionName: string;
    param?: unknown;
}
declare class BizyLogService {
    #private;
    debug(data: string | ILogData, param?: unknown): void;
    info(data: string | ILogData, param?: unknown): void;
    success(data: string | ILogData, param?: unknown): void;
    warning(data: string | ILogData, param?: unknown): void;
    error(data: string | ILogData, param?: unknown): void;
    /** DEPRECATED */
    templateDebug(data: ILogData): void;
    /** DEPRECATED */
    templateSucc(data: ILogData): void;
    /** DEPRECATED */
    templateInfo(data: ILogData): void;
    /** DEPRECATED */
    templateWarn(data: ILogData): void;
    /** DEPRECATED */
    templateError(data: ILogData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyLogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyLogService>;
}

declare class BizyStorageService {
    get<T>(key: string): T;
    set(key: string, value: unknown): void;
    remove(key: string): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyStorageService>;
}

declare class BizyValidatorService {
    isEmail: (value: string) => boolean;
    dateIsAfter: (data: {
        date: string | number | Date;
        comparisonDate: string | number | Date;
    }) => boolean;
    dateIsBefore: (data: {
        date: string | number | Date;
        comparisonDate: string | number | Date;
    }) => boolean;
    isAlpha: (value: string) => boolean;
    isAlphanumeric: (value: string) => boolean;
    isNumeric: (value: string | number) => boolean;
    isNumber(number: unknown): number is number;
    isString(string: unknown): string is string;
    isInteger: (value: string | number) => boolean;
    isBoolean: (value: unknown) => boolean;
    isCreditCard: (value: string | number) => boolean;
    isDataURI: (value: string) => boolean;
    isURL: (value: string) => boolean;
    isDate: (value: string) => boolean;
    isJSON: (value: string) => boolean;
    isIP: (value: string, version: 4 | 6 | "4" | "6") => boolean;
    isJWT: (value: string) => boolean;
    isLowercase: (value: string) => boolean;
    isUppercase: (value: string) => boolean;
    isMobilePhone: (data: {
        value: string;
        locale: string;
    }) => boolean;
    isCUIT(cuit: string): boolean;
    isDNI(dni: string): boolean;
    isCBU(cbu: string): boolean;
    emailValidator(): ValidatorFn;
    mobilePhoneValidator(locale: string): ValidatorFn;
    numberValidator(): ValidatorFn;
    numericValidator(): ValidatorFn;
    dateIsAfterValidator(comparisonDate: string | number | Date): ValidatorFn;
    dateIsBeforeValidator(comparisonDate: string | number | Date): ValidatorFn;
    alphaValidator(): ValidatorFn;
    alphanumericValidator(): ValidatorFn;
    integerValidator(): ValidatorFn;
    dataURIValidator(): ValidatorFn;
    urlValidator(): ValidatorFn;
    jsonValidator(): ValidatorFn;
    jwtValidator(): ValidatorFn;
    lowerCaseValidator(): ValidatorFn;
    upperCaseValidator(): ValidatorFn;
    cuitValidator(): ValidatorFn;
    dniValidator(): ValidatorFn;
    cbuValidator(): ValidatorFn;
    creditCardValidator(): ValidatorFn;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyValidatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyValidatorService>;
}

interface IViewportSize {
    height: number;
    width: number;
}
declare class BizyViewportService {
    #private;
    private window;
    get sizeChange$(): Observable<IViewportSize>;
    constructor(window: Window);
    width(): number;
    height(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyViewportService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyViewportService>;
}

declare class BizyExtractNumbersPipe implements PipeTransform {
    transform(value: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyExtractNumbersPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyExtractNumbersPipe, "bizyExtractNumbers", true>;
}

declare class BizyRepeatPipe implements PipeTransform {
    transform(value: number): number[];
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyRepeatPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyRepeatPipe, "bizyRepeat", true>;
}

declare class BizySetToArrayPipe implements PipeTransform {
    transform<T>(items: Set<T>): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySetToArrayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizySetToArrayPipe, "bizySetToArray", true>;
}

declare class BizyEnumToArrayPipe implements PipeTransform {
    transform(enumObj: any): {
        key: string;
        value: any;
    }[];
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyEnumToArrayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyEnumToArrayPipe, "bizyEnumToArray", true>;
}

declare class BizyOrderByPipe implements PipeTransform {
    #private;
    transform<T>(items: Array<T>, order?: 'asc' | 'desc' | null, property?: string): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyOrderByPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyOrderByPipe, "bizyOrderBy", true>;
}

declare class BizyReducePipe implements PipeTransform {
    transform(items: Array<unknown>, key: string, fixedTo?: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyReducePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyReducePipe, "bizyReduce", true>;
}

declare class BizySafePipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySafePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizySafePipe, "bizySafe", true>;
}

declare class BizyAveragePipe implements PipeTransform {
    transform(items: Array<unknown>, key: string, fixedTo?: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAveragePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyAveragePipe, "bizyAverage", true>;
}

interface IOptions {
    isCaseSensitive?: boolean;
    includeScore?: boolean;
    includeMatches?: boolean;
    shouldSort?: boolean;
    findAllMatches?: boolean;
    minMatchCharLength?: number;
    location?: number;
    threshold?: number;
    distance?: number;
    useExtendedSearch?: boolean;
    ignoreLocation?: boolean;
    ignoreFieldNorm?: boolean;
    getFn?: FuseGetFunction<any>;
}
/**
 * NOTA:
 * - Para comprender mejor cómo location, threshold y distance funcionan juntos, leer en https://fusejs.io/concepts/scoring-theory.html#scoring-theory
 * - El único momento en que tiene sentido establecer ignoreFieldNorm en true es cuando no importa cuántos términos haya, sino solo que el término de consulta exista.
 */
interface IBizySearchPipeOptions extends IOptions {
    keys?: Array<string>;
}

declare class BizySearchPipe implements PipeTransform {
    #private;
    searchPipeOptions: IBizySearchPipeOptions;
    fuse: Fuse<any>;
    items: Array<unknown>;
    readonly perfectMatch: {
        threshold: number;
    };
    transform<T>(items: Array<T>, search: string | number | Array<string | number>, keys?: string | Array<string>, options?: IBizySearchPipeOptions): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySearchPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizySearchPipe, "bizySearch", true>;
}

declare class BizyFormatSecondsPipe implements PipeTransform {
    private bizyFormatSecondsService;
    constructor(bizyFormatSecondsService: BizyFormatSecondsService);
    transform(seconds: number, options?: {
        format: BIZY_FORMAT_SECONDS_FORMAT;
        language: BIZY_FORMAT_SECONDS_LANGUAGE;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFormatSecondsPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyFormatSecondsPipe, "bizyFormatSeconds", true>;
}

declare class BizyPipesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPipesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyPipesModule, never, [typeof BizyRepeatPipe, typeof BizySetToArrayPipe, typeof BizyEnumToArrayPipe, typeof BizyOrderByPipe, typeof BizyReducePipe, typeof BizySafePipe, typeof BizyAveragePipe, typeof BizySearchPipe, typeof BizyFormatSecondsPipe, typeof BizyExtractNumbersPipe], [typeof BizyRepeatPipe, typeof BizySetToArrayPipe, typeof BizyEnumToArrayPipe, typeof BizyOrderByPipe, typeof BizyReducePipe, typeof BizySafePipe, typeof BizyAveragePipe, typeof BizySearchPipe, typeof BizyFormatSecondsPipe, typeof BizyExtractNumbersPipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyPipesModule>;
}

declare class BizyReloadDirective {
    #private;
    threshold: number;
    bizyReload: EventEmitter<void>;
    onTouchStart(event: TouchEvent): void;
    onTouchMove(event: TouchEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyReloadDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyReloadDirective, "[bizyReload]", never, { "threshold": { "alias": "threshold"; "required": false; }; }, { "bizyReload": "bizyReload"; }, never, never, true, never>;
}

declare class BizyCopyToClipboardDirective {
    #private;
    private elementRef;
    private renderer;
    private copyToClipboard;
    onCopy: EventEmitter<void>;
    constructor(elementRef: ElementRef, renderer: Renderer2, copyToClipboard: BizyCopyToClipboardService);
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCopyToClipboardDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyCopyToClipboardDirective, "[bizyCopyToClipboard]", never, {}, { "onCopy": "onCopy"; }, never, never, true, never>;
}

declare class BizyCurrencyFormatDirective implements OnInit, OnDestroy {
    #private;
    private elementRef;
    bizyCurrencyFormat: boolean;
    options: AutoNumeric.Options;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getValue: () => number;
    setValue: (value: number) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCurrencyFormatDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyCurrencyFormatDirective, "[bizyCurrencyFormat]", never, { "bizyCurrencyFormat": { "alias": "bizyCurrencyFormat"; "required": false; }; "options": { "alias": "bizyCurrencyOptions"; "required": false; }; }, {}, never, never, true, never>;
}

declare enum LOADING_TYPE {
    SPINNER = "spinner",
    BAR = "bar"
}
declare class BizyLoadingDirective {
    #private;
    private elementRef;
    private renderer;
    set bizyLoading(value: boolean);
    bizyLoadingType: LOADING_TYPE;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyLoadingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyLoadingDirective, "[bizyLoading]", never, { "bizyLoading": { "alias": "bizyLoading"; "required": false; }; "bizyLoadingType": { "alias": "bizyLoadingType"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BizyLongPressDirective implements OnDestroy {
    #private;
    threshold: number;
    bizyLongPress: EventEmitter<MouseEvent | TouchEvent>;
    onPressStart(event: MouseEvent | TouchEvent): void;
    onPressEnd(): void;
    private clearTimeout;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyLongPressDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyLongPressDirective, "[bizyLongPress]", never, { "threshold": { "alias": "threshold"; "required": false; }; }, { "bizyLongPress": "bizyLongPress"; }, never, never, true, never>;
}

declare class BizyOnlyNumbersDirective {
    #private;
    private elementRef;
    onlyNumbers: boolean;
    constructor(elementRef: ElementRef);
    onInput(event: Event): void;
    onKeyDown(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyOnlyNumbersDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyOnlyNumbersDirective, "[bizyOnlyNumbers]", never, { "onlyNumbers": { "alias": "bizyOnlyNumbers"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BizyOnlyPhoneDigitsDirective {
    onlyPhoneNumbers: boolean;
    regexStr: string;
    onKeyDown(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyOnlyPhoneDigitsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyOnlyPhoneDigitsDirective, "[bizyOnlyPhoneDigits]", never, { "onlyPhoneNumbers": { "alias": "bizyOnlyPhoneDigits"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BizyTextEllipsisDirective implements AfterViewInit {
    #private;
    resizeRef: ElementRef;
    notifier$: Subject<void>;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTextEllipsisDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTextEllipsisDirective, "[bizyTextEllipsis]", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BizyTooltipDirective implements OnDestroy {
    #private;
    tooltipCustomClass: string;
    tooltipPlacement: 'top' | 'right' | 'bottom' | 'left';
    tooltipDelay: number;
    tooltipLongPressDuration: number;
    set tooltipLineClamp(lineClamp: number);
    set tooltipText(tooltipText: string);
    set placement(placement: 'top' | 'right' | 'bottom' | 'left');
    set delay(delay: number);
    onMouseEnter(): void;
    onMouseLeave(): void;
    onMouseUp(): void;
    onClick(): void;
    show(): void;
    hide(): void;
    create(): void;
    setPosition(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTooltipDirective, "[bizyTooltip]", never, { "tooltipCustomClass": { "alias": "tooltipCustomClass"; "required": false; }; "tooltipPlacement": { "alias": "tooltipPlacement"; "required": false; }; "tooltipDelay": { "alias": "tooltipDelay"; "required": false; }; "tooltipLongPressDuration": { "alias": "tooltipLongPressDuration"; "required": false; }; "tooltipLineClamp": { "alias": "tooltipLineClamp"; "required": false; }; "tooltipText": { "alias": "bizyTooltip"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "delay": { "alias": "delay"; "required": false; }; }, {}, never, never, true, never>;
}

interface Item {
    id: string;
}
declare class BizyTrackByIdDirective<T extends Item> {
    private readonly ngFor;
    constructor(ngFor: NgForOf<T>);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTrackByIdDirective<any>, [{ host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTrackByIdDirective<any>, "[bizyTrackById]", never, {}, {}, never, never, true, never>;
}

declare class BizyAutoFocusDirective implements AfterViewInit {
    private elementRef;
    private ref;
    autoFocus: boolean;
    constructor(elementRef: ElementRef, ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    setFocus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAutoFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyAutoFocusDirective, "[bizyAutoFocus]", never, { "autoFocus": { "alias": "bizyAutoFocus"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BizyDirectivesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyDirectivesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BizyDirectivesModule, never, [typeof BizyCopyToClipboardDirective, typeof BizyCurrencyFormatDirective, typeof BizyLoadingDirective, typeof BizyLongPressDirective, typeof BizyOnlyNumbersDirective, typeof BizyOnlyPhoneDigitsDirective, typeof BizyTextEllipsisDirective, typeof BizyTooltipDirective, typeof BizyTrackByIdDirective, typeof BizyAutoFocusDirective, typeof BizyReloadDirective], [typeof BizyCopyToClipboardDirective, typeof BizyCurrencyFormatDirective, typeof BizyLoadingDirective, typeof BizyLongPressDirective, typeof BizyOnlyNumbersDirective, typeof BizyOnlyPhoneDigitsDirective, typeof BizyTextEllipsisDirective, typeof BizyTooltipDirective, typeof BizyTrackByIdDirective, typeof BizyAutoFocusDirective, typeof BizyReloadDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BizyDirectivesModule>;
}

export { BIZY_ANIMATION, BIZY_CALENDAR_DAY, BIZY_CALENDAR_EVENT_ACTION, BIZY_CALENDAR_LANGUAGE, BIZY_CALENDAR_MODE, BIZY_FORMAT_SECONDS_FORMAT, BIZY_FORMAT_SECONDS_LANGUAGE, BIZY_SKELETON_SHAPE, BIZY_TAG_TYPE, BizyAccordionComponent, BizyAccordionModule, BizyAnimationService, BizyAudioPlayerComponent, BizyAudioPlayerModule, BizyAutoFocusDirective, BizyAveragePipe, BizyBarLineChartComponent, BizyBarLineChartModule, BizyBreadcrumbComponent, BizyBreadcrumbModule, BizyButtonComponent, BizyButtonModule, BizyCacheService, BizyCalendarComponent, BizyCalendarModule, BizyCardComponent, BizyCardModule, BizyCheckboxComponent, BizyCheckboxModule, BizyCopyToClipboardDirective, BizyCopyToClipboardService, BizyCurrencyFormatDirective, BizyDatePickerComponent, BizyDatePickerModule, BizyDeviceService, BizyDirectivesModule, BizyEnumToArrayPipe, BizyExportToCSVService, BizyExtractNumbersPipe, BizyFileUploaderComponent, BizyFileUploaderModule, BizyFileUploaderService, BizyFilterComponent, BizyFilterContentComponent, BizyFilterModule, BizyFilterPipe, BizyFilterSectionCheckboxOptionComponent, BizyFilterSectionComponent, BizyFilterSectionRangeOptionComponent, BizyFilterSectionSearchOptionComponent, BizyFilterSectionsComponent, BizyFormComponent, BizyFormModule, BizyFormatSecondsPipe, BizyFormatSecondsService, BizyFullScreenPopupWrapperComponent, BizyGridComponent, BizyGridForDirective, BizyGridModule, BizyGridRowComponent, BizyInputComponent, BizyInputModule, BizyInputOptionComponent, BizyKeyboardService, BizyListComponent, BizyListModule, BizyLoadingDirective, BizyLogService, BizyLongPressDirective, BizyMenuComponent, BizyMenuModule, BizyMenuOptionComponent, BizyMenuTitleComponent, BizyOnlyNumbersDirective, BizyOnlyPhoneDigitsDirective, BizyOrderByPipe, BizyPieChartComponent, BizyPieChartModule, BizyPipesModule, BizyPopupModule, BizyPopupService, BizyPopupWrapperComponent, BizyRadioComponent, BizyRadioModule, BizyRangeFilterPipe, BizyReducePipe, BizyReloadDirective, BizyRepeatPipe, BizyRouterService, BizySafePipe, BizySearchPipe, BizySectionCenterComponent, BizySectionComponent, BizySectionEndComponent, BizySectionModule, BizySectionStartComponent, BizySelectComponent, BizySelectModule, BizySelectOptionComponent, BizyServicesModule, BizySetToArrayPipe, BizySidebarComponent, BizySidebarFloatingOptionComponent, BizySidebarFloatingOptionTitleComponent, BizySidebarModule, BizySidebarOptionComponent, BizySkeletonComponent, BizySkeletonModule, BizySliderComponent, BizySliderModule, BizyStorageService, BizyTabComponent, BizyTableColumnArrowsComponent, BizyTableColumnComponent, BizyTableColumnFixedDirective, BizyTableComponent, BizyTableFooterComponent, BizyTableHeaderComponent, BizyTableModule, BizyTableRowComponent, BizyTableRowExpandContentComponent, BizyTableScrollingComponent, BizyTableScrollingDirective, BizyTabsComponent, BizyTabsModule, BizyTagComponent, BizyTagModule, BizyTextEllipsisDirective, BizyTimelineComponent, BizyTimelineEventComponent, BizyTimelineModule, BizyToastModule, BizyToastService, BizyToastWrapperComponent, BizyToggleComponent, BizyToggleModule, BizyToolbarComponent, BizyToolbarModule, BizyTooltipDirective, BizyTrackByIdDirective, BizyTranslateModule, BizyTranslatePipe, BizyTranslateService, BizyValidatorService, BizyViewportService, LANGUAGE, LOADING_TYPE, MIME_TYPE };
export type { IBizyBarLineChartData, IBizyBreadcrumb, IBizyCalendarEvent, IBizyPieChartData, IBizyPopupResponse, IBizySearchPipeOptions, ILocale, LabelPosition };
