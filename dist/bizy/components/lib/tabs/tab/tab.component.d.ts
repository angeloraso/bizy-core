import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyTabComponent {
    id: string;
    selected: boolean;
    linePosition: 'bottom' | 'top';
    customClass: string;
    onSelect: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTabComponent, "bizy-tab", never, { "id": { "alias": "id"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "linePosition": { "alias": "linePosition"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["[tab-icon]", "[tab-label]"], false, never>;
}
