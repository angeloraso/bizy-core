import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyTimelineEventComponent {
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
