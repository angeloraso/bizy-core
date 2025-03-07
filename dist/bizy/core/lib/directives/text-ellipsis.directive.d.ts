import { ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizyTextEllipsisDirective implements AfterViewInit {
    #private;
    resizeRef: ElementRef;
    notifier$: Subject<void>;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTextEllipsisDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTextEllipsisDirective, "[bizyTextEllipsis]", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; }, {}, never, never, true, never>;
}
