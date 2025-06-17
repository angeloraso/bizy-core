import { EventEmitter, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyLongPressDirective implements OnDestroy {
    #private;
    threshold: number;
    bizyLongPress: EventEmitter<void>;
    constructor();
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyLongPressDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyLongPressDirective, "[bizyLongPress]", never, { "threshold": { "alias": "threshold"; "required": false; }; }, { "bizyLongPress": "bizyLongPress"; }, never, never, true, never>;
}
