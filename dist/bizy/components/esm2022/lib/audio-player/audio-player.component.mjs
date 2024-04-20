import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Renderer2, Inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MIME_TYPE } from './audio-player.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../button/button.component";
export class BizyAudioPlayerComponent {
    document;
    renderer;
    id = String(Math.random());
    mimeType = MIME_TYPE.MPEG;
    audioURL;
    downloadURL;
    downloadFileName = 'bizy_audio';
    downloadButtonText = 'Descargar';
    onDownload = new EventEmitter();
    onTrackPlayerRate = new EventEmitter();
    _audioRef;
    _playbackRate = 1;
    #trackPlaybackRate$ = new Subject();
    #subscription = new Subscription();
    constructor(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    trackPlayerRate() {
        this.#subscription.add(this.#trackPlaybackRate$.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
            this.onTrackPlayerRate.emit(value);
        }));
    }
    _onTrackPlayerRate() {
        this._audioRef = this._audioRef ?? this.document.getElementById(this.id);
        if (this._audioRef) {
            switch (this._audioRef.playbackRate) {
                case 1:
                    this._audioRef.playbackRate = 1.5;
                    this._playbackRate = 1.5;
                    this.#trackPlaybackRate$.next('1.5');
                    break;
                case 1.5:
                    this._audioRef.playbackRate = 2;
                    this._playbackRate = 2;
                    this.#trackPlaybackRate$.next('2');
                    break;
                case 2:
                    this._audioRef.playbackRate = 1;
                    this._playbackRate = 1;
                    break;
                default:
                    this._audioRef.playbackRate = 1;
                    this._playbackRate = 1;
            }
        }
    }
    _onDownload() {
        const downloadButton = this.renderer.createElement('a');
        this.renderer.setAttribute(downloadButton, 'download', this.downloadFileName);
        this.renderer.setProperty(downloadButton, 'href', this.downloadURL);
        this.renderer.appendChild(this.document.body, downloadButton);
        downloadButton.click();
        this.renderer.removeChild(this.document.body, downloadButton);
        this.onDownload.emit();
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAudioPlayerComponent, deps: [{ token: DOCUMENT }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyAudioPlayerComponent, selector: "bizy-audio-player", inputs: { id: "id", mimeType: "mimeType", audioURL: "audioURL", downloadURL: "downloadURL", downloadFileName: "downloadFileName", downloadButtonText: "downloadButtonText" }, outputs: { onDownload: "onDownload", onTrackPlayerRate: "onTrackPlayerRate" }, ngImport: i0, template: "<div class=\"bizy-audio-player-component\">\n\n    <span class=\"bizy-audio-player__audio-controls\">\n      \n        <audio\n            *ngIf=\"audioURL\" \n            id=\"{{id}}\"\n            controls\n            controlslist=\"nodownload noplaybackrate\">\n            <source [src]=\"audioURL\" [type]=\"mimeType\">\n            {{audioPlayerError}}\n        </audio>\n\n        <bizy-button customClass=\"bizy-audio-player__audio-controls__playback-rate\" (onSelect)=\"_onTrackPlayerRate()\">\n            <h4>{{_playbackRate}}x</h4>\n        </bizy-button>\n\n    </span>\n\n    <bizy-button customClass=\"bizy-audio-player__download-button\" (onSelect)=\"_onDownload()\">\n        <svg \n            class=\"bizy-audio-player__download-button__icon\"\n            fill=\"none\"\n            stroke=\"currentColor\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            viewBox=\"0 0 24 24\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\"/>\n        </svg>\n        <h4>{{downloadButtonText}}</h4>\n    </bizy-button>\n\n</div>", styles: [":host{font-size:1rem}.bizy-audio-player-component{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;row-gap:2rem}.bizy-audio-player__audio-controls{width:100%;display:flex;align-items:center;column-gap:1rem}::ng-deep .bizy-audio-player__audio-controls__playback-rate{font-size:1rem;background-color:var(--bizy-audio-player-playback-rate-background-color);color:var(--bizy-audio-player-playback-rate-background-color);font-weight:700;border-radius:50%!important;width:4rem;height:2rem;display:grid;place-items:center;cursor:pointer}::ng-deep .bizy-audio-player__download-button{background-color:var(--bizy-audio-player-download-button-background-color)}::ng-deep .bizy-audio-player__download-button *{color:var(--bizy-audio-player-download-button-color)}.bizy-audio-player__download-button__icon{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.BizyButtonComponent, selector: "bizy-button", inputs: ["id", "disabled", "type", "customClass"], outputs: ["onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAudioPlayerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-audio-player', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-audio-player-component\">\n\n    <span class=\"bizy-audio-player__audio-controls\">\n      \n        <audio\n            *ngIf=\"audioURL\" \n            id=\"{{id}}\"\n            controls\n            controlslist=\"nodownload noplaybackrate\">\n            <source [src]=\"audioURL\" [type]=\"mimeType\">\n            {{audioPlayerError}}\n        </audio>\n\n        <bizy-button customClass=\"bizy-audio-player__audio-controls__playback-rate\" (onSelect)=\"_onTrackPlayerRate()\">\n            <h4>{{_playbackRate}}x</h4>\n        </bizy-button>\n\n    </span>\n\n    <bizy-button customClass=\"bizy-audio-player__download-button\" (onSelect)=\"_onDownload()\">\n        <svg \n            class=\"bizy-audio-player__download-button__icon\"\n            fill=\"none\"\n            stroke=\"currentColor\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            viewBox=\"0 0 24 24\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\"/>\n        </svg>\n        <h4>{{downloadButtonText}}</h4>\n    </bizy-button>\n\n</div>", styles: [":host{font-size:1rem}.bizy-audio-player-component{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;row-gap:2rem}.bizy-audio-player__audio-controls{width:100%;display:flex;align-items:center;column-gap:1rem}::ng-deep .bizy-audio-player__audio-controls__playback-rate{font-size:1rem;background-color:var(--bizy-audio-player-playback-rate-background-color);color:var(--bizy-audio-player-playback-rate-background-color);font-weight:700;border-radius:50%!important;width:4rem;height:2rem;display:grid;place-items:center;cursor:pointer}::ng-deep .bizy-audio-player__download-button{background-color:var(--bizy-audio-player-download-button-background-color)}::ng-deep .bizy-audio-player__download-button *{color:var(--bizy-audio-player-download-button-color)}.bizy-audio-player__download-button__icon{height:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], mimeType: [{
                type: Input
            }], audioURL: [{
                type: Input
            }], downloadURL: [{
                type: Input
            }], downloadFileName: [{
                type: Input
            }], downloadButtonText: [{
                type: Input
            }], onDownload: [{
                type: Output
            }], onTrackPlayerRate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8tcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9hdWRpby1wbGF5ZXIvYXVkaW8tcGxheWVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9hdWRpby1wbGF5ZXIvYXVkaW8tcGxheWVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBUWpELE1BQU0sT0FBTyx3QkFBd0I7SUFnQlA7SUFDQztJQWhCcEIsRUFBRSxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNuQyxRQUFRLEdBQVcsU0FBUyxDQUFDLElBQUksQ0FBQztJQUNsQyxRQUFRLENBQVM7SUFDakIsV0FBVyxDQUFTO0lBQ3BCLGdCQUFnQixHQUFXLFlBQVksQ0FBQztJQUN4QyxrQkFBa0IsR0FBVyxXQUFXLENBQUM7SUFDeEMsVUFBVSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFDdEMsaUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUV6RCxTQUFTLENBQW1CO0lBQzVCLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDbEIs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QXVCLENBQUMsTUFBTTs7MEJBa0I1QyxNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsU0FBUzs0Q0FoQlYsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0ksVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxpQkFBaUI7c0JBQTFCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNSU1FX1RZUEUgfSBmcm9tICcuL2F1ZGlvLXBsYXllci50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktYXVkaW8tcGxheWVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2F1ZGlvLXBsYXllci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXVkaW8tcGxheWVyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5QXVkaW9QbGF5ZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpO1xuICBASW5wdXQoKSBtaW1lVHlwZTogc3RyaW5nID0gTUlNRV9UWVBFLk1QRUc7XG4gIEBJbnB1dCgpIGF1ZGlvVVJMOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRvd25sb2FkVVJMOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRvd25sb2FkRmlsZU5hbWU6IHN0cmluZyA9ICdiaXp5X2F1ZGlvJztcbiAgQElucHV0KCkgZG93bmxvYWRCdXR0b25UZXh0OiBzdHJpbmcgPSAnRGVzY2FyZ2FyJztcbiAgQE91dHB1dCgpIG9uRG93bmxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBvblRyYWNrUGxheWVyUmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIF9hdWRpb1JlZjogSFRNTEF1ZGlvRWxlbWVudDtcbiAgX3BsYXliYWNrUmF0ZSA9IDE7XG4gICN0cmFja1BsYXliYWNrUmF0ZSQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgdHJhY2tQbGF5ZXJSYXRlKCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy4jdHJhY2tQbGF5YmFja1JhdGUkLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoNTAwKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm9uVHJhY2tQbGF5ZXJSYXRlLmVtaXQodmFsdWUpO1xuICAgIH0pKTtcbiAgfVxuXG4gIF9vblRyYWNrUGxheWVyUmF0ZSgpIHtcbiAgICB0aGlzLl9hdWRpb1JlZiA9IHRoaXMuX2F1ZGlvUmVmID8/IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkgYXMgSFRNTEF1ZGlvRWxlbWVudDtcbiAgICBpZiAodGhpcy5fYXVkaW9SZWYpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5fYXVkaW9SZWYucGxheWJhY2tSYXRlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0aGlzLl9hdWRpb1JlZi5wbGF5YmFja1JhdGUgPSAxLjU7XG4gICAgICAgICAgdGhpcy5fcGxheWJhY2tSYXRlID0gMS41O1xuICAgICAgICAgIHRoaXMuI3RyYWNrUGxheWJhY2tSYXRlJC5uZXh0KCcxLjUnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxLjU6XG4gICAgICAgICAgdGhpcy5fYXVkaW9SZWYucGxheWJhY2tSYXRlID0gMjtcbiAgICAgICAgICB0aGlzLl9wbGF5YmFja1JhdGUgPSAyO1xuICAgICAgICAgIHRoaXMuI3RyYWNrUGxheWJhY2tSYXRlJC5uZXh0KCcyJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICB0aGlzLl9hdWRpb1JlZi5wbGF5YmFja1JhdGUgPSAxO1xuICAgICAgICAgIHRoaXMuX3BsYXliYWNrUmF0ZSA9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5fYXVkaW9SZWYucGxheWJhY2tSYXRlID0gMTtcbiAgICAgICAgICB0aGlzLl9wbGF5YmFja1JhdGUgPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vbkRvd25sb2FkKCk6IHZvaWQge1xuICAgIGNvbnN0IGRvd25sb2FkQnV0dG9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZG93bmxvYWRCdXR0b24sICdkb3dubG9hZCcsIHRoaXMuZG93bmxvYWRGaWxlTmFtZSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShkb3dubG9hZEJ1dHRvbiwgJ2hyZWYnLCB0aGlzLmRvd25sb2FkVVJMKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgZG93bmxvYWRCdXR0b24pO1xuICAgIGRvd25sb2FkQnV0dG9uLmNsaWNrKCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIGRvd25sb2FkQnV0dG9uKTtcbiAgICB0aGlzLm9uRG93bmxvYWQuZW1pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJiaXp5LWF1ZGlvLXBsYXllci1jb21wb25lbnRcIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1hdWRpby1wbGF5ZXJfX2F1ZGlvLWNvbnRyb2xzXCI+XG4gICAgICBcbiAgICAgICAgPGF1ZGlvXG4gICAgICAgICAgICAqbmdJZj1cImF1ZGlvVVJMXCIgXG4gICAgICAgICAgICBpZD1cInt7aWR9fVwiXG4gICAgICAgICAgICBjb250cm9sc1xuICAgICAgICAgICAgY29udHJvbHNsaXN0PVwibm9kb3dubG9hZCBub3BsYXliYWNrcmF0ZVwiPlxuICAgICAgICAgICAgPHNvdXJjZSBbc3JjXT1cImF1ZGlvVVJMXCIgW3R5cGVdPVwibWltZVR5cGVcIj5cbiAgICAgICAgICAgIHt7YXVkaW9QbGF5ZXJFcnJvcn19XG4gICAgICAgIDwvYXVkaW8+XG5cbiAgICAgICAgPGJpenktYnV0dG9uIGN1c3RvbUNsYXNzPVwiYml6eS1hdWRpby1wbGF5ZXJfX2F1ZGlvLWNvbnRyb2xzX19wbGF5YmFjay1yYXRlXCIgKG9uU2VsZWN0KT1cIl9vblRyYWNrUGxheWVyUmF0ZSgpXCI+XG4gICAgICAgICAgICA8aDQ+e3tfcGxheWJhY2tSYXRlfX14PC9oND5cbiAgICAgICAgPC9iaXp5LWJ1dHRvbj5cblxuICAgIDwvc3Bhbj5cblxuICAgIDxiaXp5LWJ1dHRvbiBjdXN0b21DbGFzcz1cImJpenktYXVkaW8tcGxheWVyX19kb3dubG9hZC1idXR0b25cIiAob25TZWxlY3QpPVwiX29uRG93bmxvYWQoKVwiPlxuICAgICAgICA8c3ZnIFxuICAgICAgICAgICAgY2xhc3M9XCJiaXp5LWF1ZGlvLXBsYXllcl9fZG93bmxvYWQtYnV0dG9uX19pY29uXCJcbiAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICBzdHJva2UtbGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICAgIHN0cm9rZS13aWR0aD1cIjJcIlxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTIxIDE1djRhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ2LTRcIi8+PHBvbHlsaW5lIHBvaW50cz1cIjcgMTAgMTIgMTUgMTcgMTBcIi8+PGxpbmUgeDE9XCIxMlwiIHgyPVwiMTJcIiB5MT1cIjE1XCIgeTI9XCIzXCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgPGg0Pnt7ZG93bmxvYWRCdXR0b25UZXh0fX08L2g0PlxuICAgIDwvYml6eS1idXR0b24+XG5cbjwvZGl2PiJdfQ==