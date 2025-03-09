import { EventEmitter, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyAudioPlayerComponent {
    #private;
    private document;
    private renderer;
    id: string;
    mimeType: string;
    showDownload: boolean;
    autoplay: boolean;
    downloadURL: string;
    downloadFileName: string;
    onDownload: EventEmitter<void>;
    onTrackPlayerRate: EventEmitter<string>;
    set audioURL(audioURL: string);
    _audioURL: string | null;
    _audioRef: HTMLAudioElement;
    _playbackRate: number;
    constructor(document: Document, renderer: Renderer2);
    trackPlayerRate(): void;
    _onTrackPlayerRate(): void;
    _onDownload(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAudioPlayerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyAudioPlayerComponent, "bizy-audio-player", never, { "id": { "alias": "id"; "required": false; }; "mimeType": { "alias": "mimeType"; "required": false; }; "showDownload": { "alias": "showDownload"; "required": false; }; "autoplay": { "alias": "autoplay"; "required": false; }; "downloadURL": { "alias": "downloadURL"; "required": false; }; "downloadFileName": { "alias": "downloadFileName"; "required": false; }; "audioURL": { "alias": "audioURL"; "required": false; }; }, { "onDownload": "onDownload"; "onTrackPlayerRate": "onTrackPlayerRate"; }, never, never, true, never>;
}
