import { OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyTooltipDirective implements OnDestroy {
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
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTooltipDirective, "[bizyTooltip]", never, { "tooltipCustomClass": { "alias": "tooltipCustomClass"; "required": false; }; "tooltipPlacement": { "alias": "tooltipPlacement"; "required": false; }; "tooltipDelay": { "alias": "tooltipDelay"; "required": false; }; "tooltipLongPressDuration": { "alias": "tooltipLongPressDuration"; "required": false; }; "tooltipLineClamp": { "alias": "tooltipLineClamp"; "required": false; }; "tooltipText": { "alias": "bizyTooltip"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "delay": { "alias": "delay"; "required": false; }; }, {}, never, never, false, never>;
}
