import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TabComponent {
    id: string;
    selected: boolean;
    customClass: string;
    onSelect: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabComponent, "bizy-tab", never, { "id": { "alias": "id"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["[tab-icon]", "[tab-label]"], false, never>;
}
