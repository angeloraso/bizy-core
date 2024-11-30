import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
export declare class BizyDatePickerComponent {
    #private;
    private datePipe;
    private ref;
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
    constructor(datePipe: DatePipe, ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    setTouched(touched: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyDatePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyDatePickerComponent, "bizy-date-picker", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "enableSeconds": { "alias": "enableSeconds"; "required": false; }; "date": { "alias": "date"; "required": false; }; "range": { "alias": "range"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, { "dateChange": "dateChange"; "rangeChange": "rangeChange"; "onChange": "onChange"; "openedChange": "openedChange"; "onOpen": "onOpen"; "onSelect": "onSelect"; }, never, ["[slot=header]", "[slot=prefix]", "[slot=error]"], false, never>;
}
