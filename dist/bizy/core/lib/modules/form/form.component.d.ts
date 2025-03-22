import { BizyDatePickerComponent } from './../date-picker/date-picker.component';
import { QueryList } from '@angular/core';
import { BizyInputComponent } from '../input/input.component';
import { BizySelectComponent } from '../select/select.component';
import * as i0 from "@angular/core";
export declare class BizyFormComponent {
    inputs: QueryList<BizyInputComponent>;
    selects: QueryList<BizySelectComponent>;
    datePickers: QueryList<BizyDatePickerComponent>;
    id: string;
    customClass: string;
    onSubmit(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFormComponent, "bizy-form", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, ["inputs", "selects", "datePickers"], ["*"], true, never>;
}
