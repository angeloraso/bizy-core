import { Clipboard } from '@angular/cdk/clipboard';
import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * "items" is an item array to copy to clipboard as plain text
 * "model" is the item data model that helps to print the item array correctly
 * Example:
 *  items = [{name: "Name 1", lastName: "Last name 1"}, {name: "Name 2", lastName: "Last name 2"}, {name: "Name 3", lastName: "Last name 3"}]
 *  model = {name: "Name", lastName: "Last name"}
 */
export declare class BizyCopyToClipboardComponent {
    #private;
    private clipboard;
    customClass: string;
    items: Array<any>;
    text: string;
    model: Record<string, string>;
    copied: EventEmitter<void>;
    get loading$(): import("rxjs").Observable<boolean>;
    constructor(clipboard: Clipboard);
    copyToClipboard(): Promise<void>;
    initCopy(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCopyToClipboardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyCopyToClipboardComponent, "bizy-copy-to-clipboard", never, { "customClass": { "alias": "customClass"; "required": false; }; "items": { "alias": "items"; "required": false; }; "text": { "alias": "text"; "required": false; }; "model": { "alias": "model"; "required": false; }; }, { "copied": "copied"; }, never, never, false, never>;
}
