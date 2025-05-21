import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyAudioPlayerComponent {
    #private;
    id: string;
    mimeType: string;
    audioPlayerError: string;
    showDownload: boolean;
    autoplay: boolean;
    disabled: boolean;
    downloadURL: string;
    downloadFileName: string;
    onDownload: EventEmitter<void>;
    canPlayThrough: EventEmitter<Event>;
    onTrackPlayerRate: EventEmitter<string>;
    set audioURL(audioURL: string);
    _audioURL: string | null;
    _ready: boolean;
    _playbackRate: number;
    trackPlayerRate(): void;
    _onTrackPlayerRate(): void;
    _onDownload(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAudioPlayerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyAudioPlayerComponent, "bizy-audio-player", never, { "id": { "alias": "id"; "required": false; }; "mimeType": { "alias": "mimeType"; "required": false; }; "audioPlayerError": { "alias": "audioPlayerError"; "required": false; }; "showDownload": { "alias": "showDownload"; "required": false; }; "autoplay": { "alias": "autoplay"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "downloadURL": { "alias": "downloadURL"; "required": false; }; "downloadFileName": { "alias": "downloadFileName"; "required": false; }; "audioURL": { "alias": "audioURL"; "required": false; }; }, { "onDownload": "onDownload"; "canPlayThrough": "canPlayThrough"; "onTrackPlayerRate": "onTrackPlayerRate"; }, never, never, true, never>;
}
