import * as i0 from '@angular/core';
import { EventEmitter, ChangeDetectorRef, Output, Input, Inject, ChangeDetectionStrategy, Component, NgModule, inject, Renderer2, ElementRef, Injectable, Directive, ViewChild, ContentChildren, ContentChild, Pipe, ViewContainerRef, TemplateRef, RendererFactory2, HostListener, Host } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule, DOCUMENT, registerLocaleData, DatePipe } from '@angular/common';
import { Subject, Subscription, BehaviorSubject, filter, take, skip, auditTime, throttleTime, debounceTime as debounceTime$1, interval, fromEvent, merge, timer, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, map, filter as filter$1, switchMap, take as take$1 } from 'rxjs/operators';
import * as echarts from 'echarts';
import html2canvas from 'html2canvas';
import * as i2 from 'angular-calendar';
import { CalendarNativeDateFormatter, CalendarModule, CalendarUtils, CalendarA11y, CalendarEventTitleFormatter, DateAdapter, CalendarDateFormatter } from 'angular-calendar';
import { isSameMonth, isSameDay } from 'date-fns';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeEs from '@angular/common/locales/es';
import * as i2$1 from '@angular/forms';
import { FormsModule, FormBuilder, Validators } from '@angular/forms';
import flatpickr from 'flatpickr';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import * as i2$2 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import AutoNumeric from 'autonumeric';
import Uppy from '@uppy/core';
import es_ES from '@uppy/locales/lib/es_ES';
import en_US from '@uppy/locales/lib/en_US';
import Dashboard from '@uppy/dashboard';
import XHRUpload from '@uppy/xhr-upload';
import * as i3 from '@angular/cdk/portal';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DIALOG_DATA, DialogRef, DialogModule, Dialog } from '@angular/cdk/dialog';
import * as i2$3 from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as i1$1 from '@angular/router';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import validator from 'validator';
import { Clipboard } from '@angular/cdk/clipboard';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import * as i1$2 from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import Fuse from 'fuse.js';

class BizyAccordionComponent {
    ref;
    id = `bizy-accordion-${Math.random()}`;
    customClass;
    disabled = false;
    opened = false;
    openedChange = new EventEmitter();
    onSelect = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.openedChange.emit(!this.opened);
        this.onSelect.emit(event);
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAccordionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyAccordionComponent, isStandalone: true, selector: "bizy-accordion", inputs: { id: "id", customClass: "customClass", disabled: "disabled", opened: "opened" }, outputs: { openedChange: "openedChange", onSelect: "onSelect" }, ngImport: i0, template: "<button \n  type=\"button\"\n  [id]=\"id\"\n  [ngClass]=\"{'bizy-accordion--disabled': disabled}\"\n  class=\"bizy-accordion {{customClass}}\"\n  (click)=\"_onSelect($event)\"\n  (keyup.enter)=\"_onSelect($event)\">\n\n  <span class=\"bizy-accordion__content\">\n    <ng-content></ng-content>\n  </span>\n\n  <svg \n    class=\"bizy-accordion__arrow\" \n    [ngClass]=\"{'bizy-accordion__arrow--opened': opened}\"\n    viewBox=\"0 0 96 96\" \n    xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n  </svg>\n\n</button>\n\n<span class=\"bizy-accordion__options\" [ngClass]=\"{'bizy-accordion__options--opened': opened}\">\n\n  <ng-content select=\"[accordion-option]\"></ng-content>\n\n</span>\n", styles: [":host{font-size:1rem;width:100%}:host:has(>.bizy-accordion__options:empty) .bizy-accordion>.bizy-accordion__arrow{display:none!important}.bizy-accordion{background-color:var(--bizy-accordion-background-color);border:none;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;width:100%;cursor:pointer;position:relative;border-top-left-radius:.3rem;border-bottom:var(--bizy-accordion-border-bottom)}.bizy-accordion--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-accordion__content{background-color:inherit;width:100%;flex:1}.bizy-accordion__arrow{height:var(--bizy-accordion-arrow-height);pointer-events:none;display:block;transition:transform .1s ease;fill:var(--bizy-accordion-arrow-color);position:absolute;right:.5rem}.bizy-accordion__arrow--opened{transform:rotate(180deg);transition:transform .2s ease}.bizy-accordion__options{max-height:0;overflow:hidden;display:flex;flex-direction:column;padding-left:var(--bizy-accordion-padding-left);transition:max-height .1s ease;border-left:var(--bizy-accordion-border)}.bizy-accordion__options--opened{max-height:100vh;transition:transform .2s ease}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-accordion', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n  type=\"button\"\n  [id]=\"id\"\n  [ngClass]=\"{'bizy-accordion--disabled': disabled}\"\n  class=\"bizy-accordion {{customClass}}\"\n  (click)=\"_onSelect($event)\"\n  (keyup.enter)=\"_onSelect($event)\">\n\n  <span class=\"bizy-accordion__content\">\n    <ng-content></ng-content>\n  </span>\n\n  <svg \n    class=\"bizy-accordion__arrow\" \n    [ngClass]=\"{'bizy-accordion__arrow--opened': opened}\"\n    viewBox=\"0 0 96 96\" \n    xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n  </svg>\n\n</button>\n\n<span class=\"bizy-accordion__options\" [ngClass]=\"{'bizy-accordion__options--opened': opened}\">\n\n  <ng-content select=\"[accordion-option]\"></ng-content>\n\n</span>\n", styles: [":host{font-size:1rem;width:100%}:host:has(>.bizy-accordion__options:empty) .bizy-accordion>.bizy-accordion__arrow{display:none!important}.bizy-accordion{background-color:var(--bizy-accordion-background-color);border:none;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;width:100%;cursor:pointer;position:relative;border-top-left-radius:.3rem;border-bottom:var(--bizy-accordion-border-bottom)}.bizy-accordion--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-accordion__content{background-color:inherit;width:100%;flex:1}.bizy-accordion__arrow{height:var(--bizy-accordion-arrow-height);pointer-events:none;display:block;transition:transform .1s ease;fill:var(--bizy-accordion-arrow-color);position:absolute;right:.5rem}.bizy-accordion__arrow--opened{transform:rotate(180deg);transition:transform .2s ease}.bizy-accordion__options{max-height:0;overflow:hidden;display:flex;flex-direction:column;padding-left:var(--bizy-accordion-padding-left);transition:max-height .1s ease;border-left:var(--bizy-accordion-border)}.bizy-accordion__options--opened{max-height:100vh;transition:transform .2s ease}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], opened: [{
                type: Input
            }], openedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$t = [
    BizyAccordionComponent,
];
class BizyAccordionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyAccordionModule, imports: [BizyAccordionComponent], exports: [BizyAccordionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAccordionModule, imports: [COMPONENTS$t] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$t,
                    exports: COMPONENTS$t
                }]
        }] });

var MIME_TYPE;
(function (MIME_TYPE) {
    MIME_TYPE["OGG"] = "audio/ogg";
    MIME_TYPE["MPEG"] = "audio/mpeg";
    MIME_TYPE["WAV"] = "audio/wav";
})(MIME_TYPE || (MIME_TYPE = {}));

class BizyButtonComponent {
    id = `bizy-button-${Math.random()}`;
    disabled = false;
    type = 'button';
    customClass = '';
    onSelect = new EventEmitter();
    _focused = false;
    _onSelect(event) {
        if (this.disabled || !this._focused) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyButtonComponent, isStandalone: true, selector: "bizy-button", inputs: { id: "id", disabled: "disabled", type: "type", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    [type]=\"type\"\n    [id]=\"id\"\n    (focus)=\"_focused = true\"\n    (blur)=\"_focused = false\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_focused = true; _onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n    <span class=\"bizy-button__content\" (click)=\"_focused = true; _onSelect($event); $event.stopPropagation()\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem;height:var(--bizy-button-height);width:var(--bizy-button-width);min-height:var(--bizy-button-min-height);min-width:var(--bizy-button-min-width);max-height:var(--bizy-button-max-height);max-width:var(--bizy-button-max-width)}.bizy-button{height:inherit;width:inherit;min-height:inherit;min-width:inherit;max-height:inherit;max-width:inherit;display:flex;justify-content:space-between;align-items:center;column-gap:.5rem;padding:var(--bizy-button-padding);border-radius:var(--bizy-button-border-radius);border:var(--bizy-button-border);cursor:pointer;background-color:var(--bizy-button-background-color)}::ng-deep .bizy-button *{color:var(--bizy-button-color);text-wrap:nowrap}.bizy-button:hover{filter:brightness(95%)}.bizy-button__content{width:100%;height:100%;display:flex;justify-content:center;align-items:center;column-gap:.3rem}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-button', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    [type]=\"type\"\n    [id]=\"id\"\n    (focus)=\"_focused = true\"\n    (blur)=\"_focused = false\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_focused = true; _onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n    <span class=\"bizy-button__content\" (click)=\"_focused = true; _onSelect($event); $event.stopPropagation()\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem;height:var(--bizy-button-height);width:var(--bizy-button-width);min-height:var(--bizy-button-min-height);min-width:var(--bizy-button-min-width);max-height:var(--bizy-button-max-height);max-width:var(--bizy-button-max-width)}.bizy-button{height:inherit;width:inherit;min-height:inherit;min-width:inherit;max-height:inherit;max-width:inherit;display:flex;justify-content:space-between;align-items:center;column-gap:.5rem;padding:var(--bizy-button-padding);border-radius:var(--bizy-button-border-radius);border:var(--bizy-button-border);cursor:pointer;background-color:var(--bizy-button-background-color)}::ng-deep .bizy-button *{color:var(--bizy-button-color);text-wrap:nowrap}.bizy-button:hover{filter:brightness(95%)}.bizy-button__content{width:100%;height:100%;display:flex;justify-content:center;align-items:center;column-gap:.3rem}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$s = [
    BizyButtonComponent,
];
class BizyButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyButtonModule, imports: [BizyButtonComponent], exports: [BizyButtonComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyButtonModule, imports: [COMPONENTS$s] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$s,
                    exports: COMPONENTS$s
                }]
        }] });

class BizyAudioPlayerComponent {
    #document = inject(DOCUMENT);
    #renderer = inject(Renderer2);
    id = `bizy-audio-player-${Math.random()}`;
    mimeType;
    audioPlayerError = 'Error';
    showDownload = true;
    autoplay = false;
    disabled = false;
    downloadURL;
    downloadFileName = 'bizy_audio';
    onDownload = new EventEmitter();
    canPlayThrough = new EventEmitter();
    onTrackPlayerRate = new EventEmitter();
    set audioURL(audioURL) {
        if (!audioURL) {
            return;
        }
        this._ready = false;
        this._audioURL = audioURL;
        if (!this.mimeType) {
            const isOGG = this._audioURL.toLowerCase().includes('ogg');
            if (isOGG) {
                this.mimeType = MIME_TYPE.OGG;
            }
            else {
                const isWAV = this._audioURL.toLowerCase().includes('wav');
                if (isWAV) {
                    this.mimeType = MIME_TYPE.WAV;
                }
                else {
                    this.mimeType = MIME_TYPE.MPEG;
                }
            }
        }
        this.#audioRef = this.#document.getElementById(this.id);
        if (this.#audioRef) {
            this.#audioRef.load();
            this._trackPlayerRate();
            if (this.autoplay) {
                this.#audioRef.play();
            }
        }
        else {
            const interval = setInterval(() => {
                this.#audioRef = this.#document.getElementById(this.id);
                if (this.#audioRef) {
                    this.#audioRef.load();
                    this._trackPlayerRate();
                    if (this.autoplay) {
                        this.#audioRef.play();
                    }
                    clearInterval(interval);
                }
            }, 300);
        }
    }
    _audioURL = null;
    _ready = false;
    #audioRef;
    _playbackRate = 1;
    #trackPlaybackRate$ = new Subject();
    #subscription = new Subscription();
    _trackPlayerRate() {
        this.#subscription.add(this.#trackPlaybackRate$.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
            this.onTrackPlayerRate.emit(value);
        }));
    }
    _onTrackPlayerRate() {
        if (!this.disabled) {
            return;
        }
        if (!this.#audioRef) {
            this.#audioRef = this.#document.getElementById(this.id);
        }
        if (this.#audioRef) {
            switch (this.#audioRef.playbackRate) {
                case 1:
                    this.#audioRef.playbackRate = 1.5;
                    this._playbackRate = 1.5;
                    this.#trackPlaybackRate$.next('1.5');
                    break;
                case 1.5:
                    this.#audioRef.playbackRate = 2;
                    this._playbackRate = 2;
                    this.#trackPlaybackRate$.next('2');
                    break;
                case 2:
                    this.#audioRef.playbackRate = 1;
                    this._playbackRate = 1;
                    this.#trackPlaybackRate$.next('1');
                    break;
                default:
                    this.#audioRef.playbackRate = 1;
                    this._playbackRate = 1;
                    this.#trackPlaybackRate$.next('1');
            }
        }
    }
    _onDownload() {
        if (this.disabled || !this.showDownload) {
            return;
        }
        const downloadButton = this.#renderer.createElement('a');
        this.#renderer.setAttribute(downloadButton, 'download', this.downloadFileName);
        this.#renderer.setProperty(downloadButton, 'href', this.downloadURL);
        this.#renderer.appendChild(this.#document.body, downloadButton);
        downloadButton.click();
        this.#renderer.removeChild(this.#document.body, downloadButton);
        this.onDownload.emit();
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAudioPlayerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyAudioPlayerComponent, isStandalone: true, selector: "bizy-audio-player", inputs: { id: "id", mimeType: "mimeType", audioPlayerError: "audioPlayerError", showDownload: "showDownload", autoplay: "autoplay", disabled: "disabled", downloadURL: "downloadURL", downloadFileName: "downloadFileName", audioURL: "audioURL" }, outputs: { onDownload: "onDownload", canPlayThrough: "canPlayThrough", onTrackPlayerRate: "onTrackPlayerRate" }, ngImport: i0, template: "<audio\n    class=\"bizy-audio-player__audio\"\n    [ngClass]=\"{'bizy-audio-player__audio--disabled': disabled || !_audioURL || !_ready}\"\n    [id]=\"id\"\n    [autoplay]=\"autoplay\"\n    controls\n    (canplaythrough)=\"_ready = true; canPlayThrough.emit($event)\"\n    controlslist=\"nodownload noplaybackrate\">\n    <source [src]=\"_audioURL\" [type]=\"mimeType\">\n    {{audioPlayerError}}\n</audio>\n\n<bizy-button customClass=\"bizy-audio-player__playback-rate\" (onSelect)=\"_onTrackPlayerRate()\" [disabled]=\"disabled || !_audioURL || !_ready\">\n    <span>{{_playbackRate}}x</span>\n</bizy-button>\n\n<bizy-button customClass=\"bizy-audio-player__download-button\" *ngIf=\"showDownload\" (onSelect)=\"_onDownload()\" [disabled]=\"disabled || !_audioURL || !_ready\">\n    <svg \n        class=\"bizy-audio-player__download-button__icon\"\n        fill=\"none\"\n        stroke=\"currentColor\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        viewBox=\"0 0 24 24\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\"/>\n    </svg>\n</bizy-button>\n", styles: [":host{font-size:1rem;width:100%;display:flex;align-items:center;column-gap:1rem}.bizy-audio-player__audio--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-audio-player__audio{flex:1;width:100%}::ng-deep .bizy-audio-player__playback-rate{font-size:1rem;--bizy-button-background-color: var(--bizy-audio-player-playback-rate-background-color);--bizy-button-color: var(--bizy-audio-player-playback-rate-color);font-weight:700;border-radius:50%!important;width:4rem;height:2rem;display:grid;place-items:center;cursor:pointer}::ng-deep .bizy-audio-player__download-button{--bizy-button-background-color: var(--bizy-audio-player-download-button-background-color);--bizy-button-color: var(--bizy-audio-player-download-button-color)}.bizy-audio-player__download-button__icon{height:1rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: BizyButtonModule }, { kind: "component", type: BizyButtonComponent, selector: "bizy-button", inputs: ["id", "disabled", "type", "customClass"], outputs: ["onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAudioPlayerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-audio-player', imports: [CommonModule, BizyButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<audio\n    class=\"bizy-audio-player__audio\"\n    [ngClass]=\"{'bizy-audio-player__audio--disabled': disabled || !_audioURL || !_ready}\"\n    [id]=\"id\"\n    [autoplay]=\"autoplay\"\n    controls\n    (canplaythrough)=\"_ready = true; canPlayThrough.emit($event)\"\n    controlslist=\"nodownload noplaybackrate\">\n    <source [src]=\"_audioURL\" [type]=\"mimeType\">\n    {{audioPlayerError}}\n</audio>\n\n<bizy-button customClass=\"bizy-audio-player__playback-rate\" (onSelect)=\"_onTrackPlayerRate()\" [disabled]=\"disabled || !_audioURL || !_ready\">\n    <span>{{_playbackRate}}x</span>\n</bizy-button>\n\n<bizy-button customClass=\"bizy-audio-player__download-button\" *ngIf=\"showDownload\" (onSelect)=\"_onDownload()\" [disabled]=\"disabled || !_audioURL || !_ready\">\n    <svg \n        class=\"bizy-audio-player__download-button__icon\"\n        fill=\"none\"\n        stroke=\"currentColor\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        viewBox=\"0 0 24 24\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\"/>\n    </svg>\n</bizy-button>\n", styles: [":host{font-size:1rem;width:100%;display:flex;align-items:center;column-gap:1rem}.bizy-audio-player__audio--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-audio-player__audio{flex:1;width:100%}::ng-deep .bizy-audio-player__playback-rate{font-size:1rem;--bizy-button-background-color: var(--bizy-audio-player-playback-rate-background-color);--bizy-button-color: var(--bizy-audio-player-playback-rate-color);font-weight:700;border-radius:50%!important;width:4rem;height:2rem;display:grid;place-items:center;cursor:pointer}::ng-deep .bizy-audio-player__download-button{--bizy-button-background-color: var(--bizy-audio-player-download-button-background-color);--bizy-button-color: var(--bizy-audio-player-download-button-color)}.bizy-audio-player__download-button__icon{height:1rem}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], mimeType: [{
                type: Input
            }], audioPlayerError: [{
                type: Input
            }], showDownload: [{
                type: Input
            }], autoplay: [{
                type: Input
            }], disabled: [{
                type: Input
            }], downloadURL: [{
                type: Input
            }], downloadFileName: [{
                type: Input
            }], onDownload: [{
                type: Output
            }], canPlayThrough: [{
                type: Output
            }], onTrackPlayerRate: [{
                type: Output
            }], audioURL: [{
                type: Input
            }] } });

const COMPONENTS$r = [
    BizyAudioPlayerComponent,
];
class BizyAudioPlayerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAudioPlayerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyAudioPlayerModule, imports: [BizyAudioPlayerComponent], exports: [BizyAudioPlayerComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAudioPlayerModule, imports: [COMPONENTS$r] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAudioPlayerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$r,
                    exports: COMPONENTS$r
                }]
        }] });

const MIN_CHART_SIZE$1 = 350; // px;
const Y_AXIS_OFFSET = 80;
const GRID_BOTTOM = 30;
class BizyBarLineChartComponent {
    elementRef;
    document;
    ref;
    renderer;
    resizeRef = null;
    tooltip = true;
    download = { hide: false, label: 'Descargar', name: 'Bizy' };
    axisPointer = 'line';
    xAxisLabels = [];
    onTooltipFormatter;
    onXAxisLabelFormatter;
    onDownload = new EventEmitter();
    onSelect = new EventEmitter();
    #echarts = null;
    #mutationObserver = null;
    #resizeObserver = null;
    #subscription = new Subscription();
    #chartContainer = null;
    #afterViewInit = new BehaviorSubject(false);
    #resize$ = new Subject();
    #data = [];
    #rightYAxis = 0;
    #leftYAxis = 0;
    #chartStacks = [];
    #chartNames = [];
    constructor(elementRef, document, ref, renderer) {
        this.elementRef = elementRef;
        this.document = document;
        this.ref = ref;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.elementRef && this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.offsetHeight)) {
                this.#afterViewInit.next(true);
                this.#mutationObserver.disconnect();
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    set data(data) {
        if (!data) {
            return;
        }
        if (data.length > 0) {
            this.#setChartData(data);
        }
        else {
            this.#deleteChartContainer();
        }
    }
    async #setChartData(data) {
        this.#data = data;
        this.#rightYAxis = 0;
        this.#leftYAxis = 0;
        this.#chartStacks = [];
        this.#chartNames = [];
        this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
            this.#createChartContainer();
            if (!this.#chartContainer) {
                return;
            }
            const series = [];
            const legends = [];
            const yAxis = [];
            this.#data.forEach((_d, _i) => {
                if (!_d.type) {
                    _d.type = 'bar';
                }
                if (!_d.values) {
                    _d.values = [];
                }
                const axisLine = {
                    show: true,
                    lineStyle: {}
                };
                const color = {
                    lineStyle: {
                        color: null
                    },
                    itemStyle: {
                        color: null
                    }
                };
                if (_d.color) {
                    axisLine.lineStyle = {
                        color: _d.color
                    };
                    color.lineStyle.color = _d.color;
                    color.itemStyle.color = _d.color;
                }
                let position = 'right';
                let offset = 0;
                let formatter = null;
                const xName = _d.xAxi && _d.xAxi.name ? _d.xAxi.name : _d.label;
                let yName = _d.label;
                if (_d.yAxi) {
                    formatter = _d.yAxi.onValueFormatter;
                    position = _d.yAxi.position ? _d.yAxi.position : _d.type === 'bar' ? 'right' : 'left';
                    if (_d.yAxi.name) {
                        yName = _d.yAxi.name;
                    }
                    if (_d.yAxi.hide) {
                        axisLine.show = false;
                        formatter = null;
                    }
                }
                if (!_d.yAxi || !_d.yAxi.hide) {
                    if (position === 'right') {
                        offset = this.#rightYAxis * Y_AXIS_OFFSET;
                        this.#rightYAxis++;
                    }
                    else {
                        offset = this.#leftYAxis * Y_AXIS_OFFSET;
                        this.#leftYAxis++;
                    }
                }
                yAxis.push({
                    type: 'value',
                    name: _d.yAxi && _d.yAxi.hide ? '' : yName,
                    position,
                    alignTicks: true,
                    offset,
                    axisLine,
                    axisLabel: { formatter }
                });
                legends.push(xName);
                let yAxisIndex = _i;
                if (_d.stack) {
                    const _index = this.#chartStacks.findIndex(_stack => _stack === _d.stack);
                    if (_index !== -1) {
                        yAxisIndex = _index;
                    }
                    else {
                        this.#chartStacks.push(_d.stack);
                    }
                }
                const _index = this.#chartNames.findIndex(_name => _name === yName);
                if (_index !== -1) {
                    yAxisIndex = _index;
                }
                else {
                    this.#chartNames.push(yName);
                }
                series.push({ ...{
                        type: _d.type,
                        name: xName,
                        yAxisIndex,
                        smooth: !_d.discrete,
                        stack: _d.stack,
                        data: _d.values
                    }, ...color });
            });
            const tooltip = {
                show: this.tooltip,
                trigger: 'axis',
                appendToBody: true,
                axisPointer: {
                    type: this.axisPointer
                },
                formatter: this.onTooltipFormatter
            };
            const grid = {
                left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
                right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
                bottom: GRID_BOTTOM,
                containLabel: true
            };
            const xAxis = [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: this.xAxisLabels,
                    axisLabel: {
                        formatter: this.onXAxisLabelFormatter,
                    }
                }
            ];
            const legend = {
                type: 'scroll',
                bottom: 0,
                data: legends
            };
            const textColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-color') ?? '#000';
            const textBackgroundColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-background-color') ?? '#fff';
            const borderColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-border-color') ?? '#fff';
            const toolbox = {
                show: true,
                feature: {
                    mySaveAsImage: {
                        show: !this.download.hide,
                        icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
                        title: this.download.label,
                        onclick: () => {
                            const showAllLegends = (chart) => {
                                const option = chart.getOption();
                                option.legend[0].type = 'plain';
                                option.grid = {
                                    left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    bottom: `${Math.max(option.legend[0].data.length, 5)}%`,
                                    containLabel: true
                                };
                                chart.setOption(option);
                            };
                            const restoreLegendType = (chart) => {
                                const option = chart.getOption();
                                option.legend[0].type = 'scroll';
                                option.grid = {
                                    left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    bottom: GRID_BOTTOM,
                                    containLabel: true
                                };
                                chart.setOption(option);
                            };
                            showAllLegends(this.#echarts);
                            setTimeout(() => {
                                html2canvas(this.#chartContainer).then(canvas => {
                                    var link = document.createElement('a');
                                    link.href = canvas.toDataURL('image/png');
                                    link.download = `${this.download.name}.png`;
                                    this.renderer.appendChild(this.document.body, link);
                                    link.click();
                                    this.renderer.removeChild(this.document.body, link);
                                    restoreLegendType(this.#echarts);
                                    this.onDownload.emit();
                                });
                            }, 500);
                        }
                    }
                },
                emphasis: {
                    iconStyle: {
                        color: textColor,
                        borderColor,
                        borderWidth: 1,
                        textBackgroundColor,
                        textPadding: 5,
                    }
                }
            };
            const option = {
                tooltip,
                legend,
                grid,
                xAxis,
                yAxis,
                toolbox,
                series
            };
            this.#echarts = echarts.init(this.#chartContainer);
            this.#echarts.setOption(option);
            this.#echarts.on('click', params => {
                this.onSelect.emit(params.name);
            });
            this.#resizeObserver = new ResizeObserver(() => this.#resize$.next());
            const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
            this.#resizeObserver.observe(resizeRef);
            this.#subscription.add(this.#resize$.pipe(skip(1), auditTime(300), throttleTime(500)).subscribe(() => {
                this.#deleteChartContainer();
                this.#createChartContainer();
                if (!this.#chartContainer) {
                    return;
                }
                this.#echarts = echarts.init(this.#chartContainer);
                this.#echarts.setOption(option);
                this.#echarts.on('click', params => {
                    this.onSelect.emit(params.name);
                });
            }));
        }));
    }
    #createChartContainer = () => {
        if (this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
            return;
        }
        let elementWidth = this.elementRef.nativeElement.offsetWidth || MIN_CHART_SIZE$1;
        let elementHeight = this.elementRef.nativeElement.offsetHeight || MIN_CHART_SIZE$1;
        let minWidth = MIN_CHART_SIZE$1;
        let minHeight = MIN_CHART_SIZE$1;
        const barChartMinWidth = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-width');
        const barChartMinHeight = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-height');
        if (Number(barChartMinWidth)) {
            minWidth = Number(barChartMinWidth);
        }
        if (Number(barChartMinHeight)) {
            minHeight = Number(barChartMinHeight);
        }
        const width = Math.max(elementWidth, minWidth);
        const height = Math.max(elementHeight, minHeight);
        this.#chartContainer = this.renderer.createElement('div');
        this.renderer.setStyle(this.#chartContainer, 'width', `${width}px`);
        this.renderer.setStyle(this.#chartContainer, 'height', `${height}px`);
        this.renderer.appendChild(this.elementRef.nativeElement, this.#chartContainer);
        this.ref.detectChanges();
    };
    #deleteChartContainer = () => {
        if (!this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
            return;
        }
        this.#echarts.clear();
        this.renderer.removeChild(this.elementRef.nativeElement, this.#chartContainer);
        this.#chartContainer = null;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
        if (this.#echarts) {
            this.#echarts.clear();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyBarLineChartComponent, deps: [{ token: ElementRef }, { token: DOCUMENT }, { token: ChangeDetectorRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyBarLineChartComponent, isStandalone: true, selector: "bizy-bar-line-chart", inputs: { resizeRef: "resizeRef", tooltip: "tooltip", download: "download", axisPointer: "axisPointer", xAxisLabels: "xAxisLabels", onTooltipFormatter: "onTooltipFormatter", onXAxisLabelFormatter: "onXAxisLabelFormatter", data: "data" }, outputs: { onDownload: "onDownload", onSelect: "onSelect" }, ngImport: i0, template: '', isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyBarLineChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-bar-line-chart',
                    template: '',
                    imports: [CommonModule],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }], propDecorators: { resizeRef: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], download: [{
                type: Input
            }], axisPointer: [{
                type: Input
            }], xAxisLabels: [{
                type: Input
            }], onTooltipFormatter: [{
                type: Input
            }], onXAxisLabelFormatter: [{
                type: Input
            }], onDownload: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], data: [{
                type: Input
            }] } });

const COMPONENTS$q = [
    BizyBarLineChartComponent,
];
class BizyBarLineChartModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyBarLineChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyBarLineChartModule, imports: [BizyBarLineChartComponent], exports: [BizyBarLineChartComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyBarLineChartModule, imports: [COMPONENTS$q] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyBarLineChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$q,
                    exports: COMPONENTS$q
                }]
        }] });

class BizyBreadcrumbComponent {
    ref;
    onSelect = new EventEmitter();
    _breadcrumbs = [];
    showGoBack = false;
    constructor(ref) {
        this.ref = ref;
    }
    set breadcrumbs(breadcrumbs) {
        if (breadcrumbs) {
            this._breadcrumbs = breadcrumbs;
            this.showGoBack = false;
            let counter = 0;
            for (let i = 0; i < breadcrumbs.length; i++) {
                if (!breadcrumbs[i].skip) {
                    counter++;
                }
                if (counter > 1) {
                    this.showGoBack = true;
                    this.ref.detectChanges();
                    break;
                }
            }
        }
    }
    goTo(breadcrumb) {
        if (breadcrumb.skip) {
            return;
        }
        this.onSelect.emit(breadcrumb);
    }
    goBack() {
        if (!this._breadcrumbs[this._breadcrumbs.length - 2]) {
            return;
        }
        for (let i = this._breadcrumbs.length; i > 0; i--) {
            if (!this._breadcrumbs[i - 2].skip) {
                this.onSelect.emit(this._breadcrumbs[i - 2]);
                break;
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyBreadcrumbComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyBreadcrumbComponent, isStandalone: true, selector: "bizy-breadcrumb", inputs: { breadcrumbs: "breadcrumbs" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<ul class=\"bizy-breadcrumb\">\n  <li *ngFor=\"let breadcrumb of _breadcrumbs; let last = last; let i = index\">\n    <button \n      class=\"bizy-breadcrumb__link\"\n      [ngClass]=\"{'bizy-breadcrumb__link--skip': breadcrumb.skip || last}\"\n      type=\"button\" \n      (click)=\"goTo(breadcrumb)\">\n      {{breadcrumb.label}}\n    </button>\n    <button\n      type=\"button\"\n      *ngIf=\"last && showGoBack\"\n      class=\"bizy-breadcrumb__go-back\"\n      (click)=\"goBack()\">\n      <svg \n        class=\"bizy-breadcrumb__go-back__icon\"\n        fill=\"none\"\n        stroke=\"currentColor\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        viewBox=\"0 0 24 24\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M0 0h24v24H0z\" fill=\"none\" stroke=\"none\"/>\n        <path d=\"M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1\"/>\n      </svg>\n    </button>\n  </li>\n</ul>\n  ", styles: [":host{font-size:1rem}.bizy-breadcrumb{list-style:none;margin:0;padding:0}.bizy-breadcrumb li{display:inline}.bizy-breadcrumb li:before{content:\"/\";margin:0 .3rem}.bizy-breadcrumb li:first-child:before{content:\"\";margin:0}.bizy-breadcrumb__link{cursor:pointer;border:none;background-color:transparent;color:var(--bizy-breadcrumb-link-color)}.bizy-breadcrumb__link:hover{filter:brightness(95%)}.bizy-breadcrumb__link--skip{cursor:default;color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__link--skip:hover{color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__go-back{cursor:pointer;margin-left:.4rem;position:relative;top:.5rem;background-color:transparent;border:none}.bizy-breadcrumb__go-back__icon{color:var(--bizy-breadcrumb-link-color);height:1rem;position:relative;bottom:.3rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyBreadcrumbComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-breadcrumb', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ul class=\"bizy-breadcrumb\">\n  <li *ngFor=\"let breadcrumb of _breadcrumbs; let last = last; let i = index\">\n    <button \n      class=\"bizy-breadcrumb__link\"\n      [ngClass]=\"{'bizy-breadcrumb__link--skip': breadcrumb.skip || last}\"\n      type=\"button\" \n      (click)=\"goTo(breadcrumb)\">\n      {{breadcrumb.label}}\n    </button>\n    <button\n      type=\"button\"\n      *ngIf=\"last && showGoBack\"\n      class=\"bizy-breadcrumb__go-back\"\n      (click)=\"goBack()\">\n      <svg \n        class=\"bizy-breadcrumb__go-back__icon\"\n        fill=\"none\"\n        stroke=\"currentColor\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        viewBox=\"0 0 24 24\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M0 0h24v24H0z\" fill=\"none\" stroke=\"none\"/>\n        <path d=\"M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1\"/>\n      </svg>\n    </button>\n  </li>\n</ul>\n  ", styles: [":host{font-size:1rem}.bizy-breadcrumb{list-style:none;margin:0;padding:0}.bizy-breadcrumb li{display:inline}.bizy-breadcrumb li:before{content:\"/\";margin:0 .3rem}.bizy-breadcrumb li:first-child:before{content:\"\";margin:0}.bizy-breadcrumb__link{cursor:pointer;border:none;background-color:transparent;color:var(--bizy-breadcrumb-link-color)}.bizy-breadcrumb__link:hover{filter:brightness(95%)}.bizy-breadcrumb__link--skip{cursor:default;color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__link--skip:hover{color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__go-back{cursor:pointer;margin-left:.4rem;position:relative;top:.5rem;background-color:transparent;border:none}.bizy-breadcrumb__go-back__icon{color:var(--bizy-breadcrumb-link-color);height:1rem;position:relative;bottom:.3rem}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { onSelect: [{
                type: Output
            }], breadcrumbs: [{
                type: Input
            }] } });

const COMPONENTS$p = [
    BizyBreadcrumbComponent,
];
class BizyBreadcrumbModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyBreadcrumbModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyBreadcrumbModule, imports: [BizyBreadcrumbComponent], exports: [BizyBreadcrumbComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyBreadcrumbModule, imports: [COMPONENTS$p] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyBreadcrumbModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$p,
                    exports: COMPONENTS$p
                }]
        }] });

var BIZY_CALENDAR_MODE;
(function (BIZY_CALENDAR_MODE) {
    BIZY_CALENDAR_MODE["MONTH"] = "month";
    BIZY_CALENDAR_MODE["WEEK"] = "week";
    BIZY_CALENDAR_MODE["DAY"] = "day";
})(BIZY_CALENDAR_MODE || (BIZY_CALENDAR_MODE = {}));
var BIZY_CALENDAR_DAY;
(function (BIZY_CALENDAR_DAY) {
    BIZY_CALENDAR_DAY[BIZY_CALENDAR_DAY["SUNDAY"] = 0] = "SUNDAY";
    BIZY_CALENDAR_DAY[BIZY_CALENDAR_DAY["MONDAY"] = 1] = "MONDAY";
    BIZY_CALENDAR_DAY[BIZY_CALENDAR_DAY["TUESDAY"] = 2] = "TUESDAY";
    BIZY_CALENDAR_DAY[BIZY_CALENDAR_DAY["WEDNESDAY"] = 3] = "WEDNESDAY";
    BIZY_CALENDAR_DAY[BIZY_CALENDAR_DAY["THURSDAY"] = 4] = "THURSDAY";
    BIZY_CALENDAR_DAY[BIZY_CALENDAR_DAY["FRIDAY"] = 5] = "FRIDAY";
    BIZY_CALENDAR_DAY[BIZY_CALENDAR_DAY["SATURDAY"] = 6] = "SATURDAY";
})(BIZY_CALENDAR_DAY || (BIZY_CALENDAR_DAY = {}));
var BIZY_CALENDAR_EVENT_ACTION;
(function (BIZY_CALENDAR_EVENT_ACTION) {
    BIZY_CALENDAR_EVENT_ACTION["DELETE"] = "DELETE";
})(BIZY_CALENDAR_EVENT_ACTION || (BIZY_CALENDAR_EVENT_ACTION = {}));
var BIZY_CALENDAR_LANGUAGE;
(function (BIZY_CALENDAR_LANGUAGE) {
    BIZY_CALENDAR_LANGUAGE["SPANISH"] = "es";
    BIZY_CALENDAR_LANGUAGE["ENGLISH"] = "en";
})(BIZY_CALENDAR_LANGUAGE || (BIZY_CALENDAR_LANGUAGE = {}));

class BizyCalendarFormatter extends CalendarNativeDateFormatter {
    weekViewHour({ date, locale }) {
        return new Intl.DateTimeFormat(locale, {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCalendarFormatter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCalendarFormatter });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCalendarFormatter, decorators: [{
            type: Injectable
        }] });

registerLocaleData(localeEs);
class BizyCalendarComponent {
    id = `bizy-calendar-${Math.random()}`;
    hideHeaderDate = false;
    preventExpand = false;
    dayStartHour = 0;
    dayEndHour = 24;
    hourMinutesDuration = 60;
    hourSegments = 2;
    language = BIZY_CALENDAR_LANGUAGE.SPANISH;
    excludeDays = [];
    weekendDays = [BIZY_CALENDAR_DAY.SATURDAY, BIZY_CALENDAR_DAY.SUNDAY];
    weekStartsOn = BIZY_CALENDAR_DAY.SUNDAY;
    mode = BIZY_CALENDAR_MODE.WEEK;
    customCalendarWeekEventTemplate = null;
    onEventSelect = new EventEmitter();
    onDateSelect = new EventEmitter();
    onEventDelete = new EventEmitter();
    BIZY_CALENDAR_MODE = BIZY_CALENDAR_MODE;
    _viewDate = new Date();
    _activeDayIsOpen = false;
    _refresh = new Subject();
    set viewDate(viewDate) {
        if (!viewDate) {
            return;
        }
        this._viewDate = new Date(viewDate);
    }
    _calendarEvents = [];
    _events = [];
    set events(events) {
        if (!events || events.length === 0) {
            return;
        }
        this._events.length = 0;
        this._calendarEvents = events.map(_event => {
            const id = _event.id || `bizy-calendar-event-${Math.random()}`;
            this._events.push({ ..._event, id });
            return {
                id,
                start: new Date(_event.start),
                end: new Date(_event.end),
                title: _event.description || '',
                color: {
                    primary: _event.color,
                    secondary: _event.backgroundColor
                },
                actions: this.#getCalendarEventActions(_event),
                allDay: false,
                cssClass: `bizy-calendar-event ${_event.customClass || ''}`,
                resizable: {
                    beforeStart: false,
                    afterEnd: false
                },
                draggable: false,
                meta: {
                    incrementsBadgeTotal: _event.incrementsBadgeTotal ?? true,
                    ..._event.meta
                }
            };
        });
        this._refresh.next();
    }
    beforeMonthViewRender({ body }) {
        body.forEach((day) => {
            day.badgeTotal = day.events.filter((event) => event.meta.incrementsBadgeTotal).length;
        });
    }
    dayClicked({ date, events, isOpen }) {
        if (this.preventExpand) {
            isOpen = false;
            this._activeDayIsOpen = false;
        }
        else if (isSameMonth(date, this._viewDate)) {
            if ((isSameDay(this._viewDate, date) && this._activeDayIsOpen === true) || events.length === 0) {
                this._activeDayIsOpen = false;
            }
            else {
                this._activeDayIsOpen = true;
            }
            this._viewDate = date;
        }
        const ids = events.map(_event => _event.id);
        const _events = this._events.filter(_event => ids.includes(_event.id));
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const startDate = startOfDay.getTime();
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        const endDate = endOfDay.getTime();
        this.onDateSelect.emit({
            start: startDate,
            end: endDate,
            events: _events
        });
    }
    eventClicked(event) {
        const _event = this._events.find(_e => _e.id === event.id);
        if (!_event) {
            return;
        }
        this.onEventSelect.emit(_event);
    }
    dayHeaderClicked(date) {
        if (!date) {
            return;
        }
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const startDate = startOfDay.getTime();
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        const endDate = endOfDay.getTime();
        const _events = this._events.filter(_event => _event.start >= startDate && _event.end <= endDate);
        this.onDateSelect.emit({
            start: startDate,
            end: endDate,
            events: _events
        });
    }
    hourSegmentClicked(date) {
        if (!date) {
            return;
        }
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0);
        const startDate = startOfDay.getTime();
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + this.hourMinutesDuration, 59, 999);
        const endDate = endOfDay.getTime();
        const _events = this._events.filter(_event => _event.start >= startDate && _event.end <= endDate);
        this.onDateSelect.emit({
            start: startDate,
            end: endDate,
            events: _events
        });
    }
    #getCalendarEventActions(event) {
        if (!event || !event.actions || event.actions.length === 0) {
            return [];
        }
        const actions = [];
        if (event.actions.includes(BIZY_CALENDAR_EVENT_ACTION.DELETE)) {
            actions.push({
                label: `<div class="bizy-calendar-event-delete-action__icon">
                    <div class="bizy-calendar-event-delete-action__icon__trash-lid"></div>
                    <div class="bizy-calendar-event-delete-action__icon__trash-container"></div>
                    <div class="bizy-calendar-event-delete-action__icon__trash-line-1"></div>
                    <div class="bizy-calendar-event-delete-action__icon__trash-line-2"></div>
                    <div class="bizy-calendar-event-delete-action__icon__trash-line-3"></div>
                </div>`,
                a11yLabel: 'delete',
                onClick: ({ event, sourceEvent }) => {
                    const _event = this._events.find(_e => _e.id === event.id);
                    if (!_event) {
                        return;
                    }
                    this.onEventDelete.emit({ event: _event, sourceEvent });
                },
            });
        }
        return actions;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCalendarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyCalendarComponent, isStandalone: true, selector: "bizy-calendar", inputs: { id: "id", hideHeaderDate: "hideHeaderDate", preventExpand: "preventExpand", dayStartHour: "dayStartHour", dayEndHour: "dayEndHour", hourMinutesDuration: "hourMinutesDuration", hourSegments: "hourSegments", language: "language", excludeDays: "excludeDays", weekendDays: "weekendDays", weekStartsOn: "weekStartsOn", mode: "mode", customCalendarWeekEventTemplate: "customCalendarWeekEventTemplate", viewDate: "viewDate", events: "events" }, outputs: { onEventSelect: "onEventSelect", onDateSelect: "onDateSelect", onEventDelete: "onEventDelete" }, providers: [
            CalendarUtils,
            CalendarA11y,
            CalendarEventTitleFormatter,
            {
                provide: DateAdapter,
                useFactory: adapterFactory,
            },
            {
                provide: CalendarDateFormatter,
                useClass: BizyCalendarFormatter
            }
        ], ngImport: i0, template: "<ng-template \n   #bizyCustomCalendarWeekEventTemplate\n   let-weekEvent=\"weekEvent\"\n   let-locale=\"locale\"\n   let-eventClicked=\"eventClicked\"\n   let-tooltipPlacement=\"tooltipPlacement\"\n   let-tooltipTemplate=\"tooltipTemplate\"\n   let-tooltipAppendToBody=\"tooltipAppendToBody\"\n   let-tooltipDisabled=\"tooltipDisabled\">\n\n   <ng-container *ngIf=\"customCalendarWeekEventTemplate\">\n      <ng-container *ngTemplateOutlet=\"customCalendarWeekEventTemplate; context: { $implicit: { id: weekEvent.event.id, start: weekEvent.event.start, end: weekEvent.event.end, description: weekEvent.event.title, color: weekEvent.event.color.primary, backgroundColor: weekEvent.event.color.secondary, meta: weekEvent.event.meta}}\"></ng-container>\n   </ng-container>\n\n</ng-template>\n\n\n<ng-container [ngSwitch]=\"mode\">\n\n   <mwl-calendar-month-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.MONTH\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [activeDayIsOpen]=\"_activeDayIsOpen\"\n      (beforeViewRender)=\"beforeMonthViewRender($event)\"\n      [excludeDays]=\"excludeDays\"\n      (dayClicked)=\"dayClicked($event.day)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-month-view>\n\n   <mwl-calendar-week-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.WEEK\"\n      [ngClass]=\"{'bizy-calendar--hide-header-date': hideHeaderDate}\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [dayStartHour]=\"dayStartHour\"\n      [dayEndHour]=\"dayEndHour\"\n      [hourDuration]=\"hourMinutesDuration\"\n      [hourSegments]=\"hourSegments\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [eventTemplate]=\"customCalendarWeekEventTemplate ? bizyCustomCalendarWeekEventTemplate : ''\"\n      [excludeDays]=\"excludeDays\"\n      (dayHeaderClicked)=\"dayHeaderClicked($event.day.date)\"\n      (hourSegmentClicked)=\"hourSegmentClicked($event.date)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-week-view>\n\n   <mwl-calendar-day-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.DAY\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [dayStartHour]=\"dayStartHour\"\n      [dayEndHour]=\"dayEndHour\"\n      [hourDuration]=\"hourMinutesDuration\"\n      [hourSegments]=\"hourSegments\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [excludeDays]=\"excludeDays\"\n      (hourSegmentClicked)=\"hourSegmentClicked($event.date)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-day-view>\n\n</ng-container>\n", styles: [":host{font-size:1rem}.custom-calendar-week-event{width:100%;height:100%;display:-webkit-box;-webkit-line-clamp:unset;-webkit-box-orient:vertical;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;line-height:1.2}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "ngmodule", type: CalendarModule }, { kind: "component", type: i2.CalendarMonthViewComponent, selector: "mwl-calendar-month-view", inputs: ["viewDate", "events", "excludeDays", "activeDayIsOpen", "activeDay", "refresh", "locale", "tooltipPlacement", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay", "weekStartsOn", "headerTemplate", "cellTemplate", "openDayEventsTemplate", "eventTitleTemplate", "eventActionsTemplate", "weekendDays"], outputs: ["beforeViewRender", "dayClicked", "eventClicked", "columnHeaderClicked", "eventTimesChanged"] }, { kind: "component", type: i2.CalendarWeekViewComponent, selector: "mwl-calendar-week-view", inputs: ["viewDate", "events", "excludeDays", "refresh", "locale", "tooltipPlacement", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay", "weekStartsOn", "headerTemplate", "eventTemplate", "eventTitleTemplate", "eventActionsTemplate", "precision", "weekendDays", "snapDraggedEvents", "hourSegments", "hourDuration", "hourSegmentHeight", "minimumEventHeight", "dayStartHour", "dayStartMinute", "dayEndHour", "dayEndMinute", "hourSegmentTemplate", "eventSnapSize", "allDayEventsLabelTemplate", "daysInWeek", "currentTimeMarkerTemplate", "validateEventTimesChanged", "resizeCursors"], outputs: ["dayHeaderClicked", "eventClicked", "eventTimesChanged", "beforeViewRender", "hourSegmentClicked"] }, { kind: "component", type: i2.CalendarDayViewComponent, selector: "mwl-calendar-day-view", inputs: ["viewDate", "events", "hourSegments", "hourSegmentHeight", "hourDuration", "minimumEventHeight", "dayStartHour", "dayStartMinute", "dayEndHour", "dayEndMinute", "refresh", "locale", "eventSnapSize", "tooltipPlacement", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay", "hourSegmentTemplate", "eventTemplate", "eventTitleTemplate", "eventActionsTemplate", "snapDraggedEvents", "allDayEventsLabelTemplate", "currentTimeMarkerTemplate", "validateEventTimesChanged", "resizeCursors"], outputs: ["eventClicked", "hourSegmentClicked", "eventTimesChanged", "beforeViewRender"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-calendar', imports: [CommonModule, CalendarModule], providers: [
                        CalendarUtils,
                        CalendarA11y,
                        CalendarEventTitleFormatter,
                        {
                            provide: DateAdapter,
                            useFactory: adapterFactory,
                        },
                        {
                            provide: CalendarDateFormatter,
                            useClass: BizyCalendarFormatter
                        }
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template \n   #bizyCustomCalendarWeekEventTemplate\n   let-weekEvent=\"weekEvent\"\n   let-locale=\"locale\"\n   let-eventClicked=\"eventClicked\"\n   let-tooltipPlacement=\"tooltipPlacement\"\n   let-tooltipTemplate=\"tooltipTemplate\"\n   let-tooltipAppendToBody=\"tooltipAppendToBody\"\n   let-tooltipDisabled=\"tooltipDisabled\">\n\n   <ng-container *ngIf=\"customCalendarWeekEventTemplate\">\n      <ng-container *ngTemplateOutlet=\"customCalendarWeekEventTemplate; context: { $implicit: { id: weekEvent.event.id, start: weekEvent.event.start, end: weekEvent.event.end, description: weekEvent.event.title, color: weekEvent.event.color.primary, backgroundColor: weekEvent.event.color.secondary, meta: weekEvent.event.meta}}\"></ng-container>\n   </ng-container>\n\n</ng-template>\n\n\n<ng-container [ngSwitch]=\"mode\">\n\n   <mwl-calendar-month-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.MONTH\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [activeDayIsOpen]=\"_activeDayIsOpen\"\n      (beforeViewRender)=\"beforeMonthViewRender($event)\"\n      [excludeDays]=\"excludeDays\"\n      (dayClicked)=\"dayClicked($event.day)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-month-view>\n\n   <mwl-calendar-week-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.WEEK\"\n      [ngClass]=\"{'bizy-calendar--hide-header-date': hideHeaderDate}\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [dayStartHour]=\"dayStartHour\"\n      [dayEndHour]=\"dayEndHour\"\n      [hourDuration]=\"hourMinutesDuration\"\n      [hourSegments]=\"hourSegments\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [eventTemplate]=\"customCalendarWeekEventTemplate ? bizyCustomCalendarWeekEventTemplate : ''\"\n      [excludeDays]=\"excludeDays\"\n      (dayHeaderClicked)=\"dayHeaderClicked($event.day.date)\"\n      (hourSegmentClicked)=\"hourSegmentClicked($event.date)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-week-view>\n\n   <mwl-calendar-day-view\n      *ngSwitchCase=\"BIZY_CALENDAR_MODE.DAY\"\n      [viewDate]=\"_viewDate\"\n      [events]=\"_calendarEvents\"\n      [weekendDays]=\"weekendDays\"\n      [weekStartsOn]=\"weekStartsOn\"\n      [dayStartHour]=\"dayStartHour\"\n      [dayEndHour]=\"dayEndHour\"\n      [hourDuration]=\"hourMinutesDuration\"\n      [hourSegments]=\"hourSegments\"\n      [refresh]=\"_refresh\"\n      [locale]=\"language\"\n      [excludeDays]=\"excludeDays\"\n      (hourSegmentClicked)=\"hourSegmentClicked($event.date)\"\n      (eventClicked)=\"eventClicked($event.event)\">\n   </mwl-calendar-day-view>\n\n</ng-container>\n", styles: [":host{font-size:1rem}.custom-calendar-week-event{width:100%;height:100%;display:-webkit-box;-webkit-line-clamp:unset;-webkit-box-orient:vertical;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;line-height:1.2}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], hideHeaderDate: [{
                type: Input
            }], preventExpand: [{
                type: Input
            }], dayStartHour: [{
                type: Input
            }], dayEndHour: [{
                type: Input
            }], hourMinutesDuration: [{
                type: Input
            }], hourSegments: [{
                type: Input
            }], language: [{
                type: Input
            }], excludeDays: [{
                type: Input
            }], weekendDays: [{
                type: Input
            }], weekStartsOn: [{
                type: Input
            }], mode: [{
                type: Input
            }], customCalendarWeekEventTemplate: [{
                type: Input
            }], onEventSelect: [{
                type: Output
            }], onDateSelect: [{
                type: Output
            }], onEventDelete: [{
                type: Output
            }], viewDate: [{
                type: Input
            }], events: [{
                type: Input
            }] } });

const COMPONENTS$o = [
    BizyCalendarComponent,
];
class BizyCalendarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyCalendarModule, imports: [BizyCalendarComponent], exports: [BizyCalendarComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCalendarModule, imports: [COMPONENTS$o] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$o,
                    exports: COMPONENTS$o
                }]
        }] });

class BizyCardComponent {
    id = `bizy-card-${Math.random()}`;
    disabled = false;
    selected = false;
    customClass = '';
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyCardComponent, isStandalone: true, selector: "bizy-card", inputs: { id: "id", disabled: "disabled", selected: "selected", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    class=\"bizy-card {{customClass}}\"\n    [ngClass]=\"{'bizy-card--disabled': disabled}\">\n\n    <span class=\"bizy-card__header\">\n\n        <span class=\"bizy-card__header__start bizy-card__slot\">\n            <ng-content select=\"[slot=header-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__header__end bizy-card__slot\">\n            <ng-content select=\"[slot=header-end]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-card__content\">\n\n        <ng-content></ng-content>\n\n    </span>\n\n    <span class=\"bizy-card__footer\">\n\n        <span class=\"bizy-card__footer__start bizy-card__slot\">\n            <ng-content select=\"[slot=footer-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__footer__end bizy-card__slot\">\n            <ng-content select=\"[slot=footer-end]\"></ng-content>\n        </span>\n\n    </span>\n\n</button>", styles: [":host{font-size:1rem;height:var(--bizy-card-height);min-height:var(--bizy-card-min-height);max-height:var(--bizy-card-max-height);width:var(--bizy-card-width);min-width:var(--bizy-card-min-width);max-width:var(--bizy-card-max-width)}.bizy-card{height:inherit;width:inherit;min-height:inherit;min-width:inherit;max-height:inherit;max-width:inherit;cursor:var(--bizy-card-cursor);border:var(--bizy-card-border);border-radius:var(--bizy-card-border-radius);overflow:hidden;padding:var(--bizy-card-padding);display:flex;flex-direction:column;justify-content:space-between;row-gap:.3rem;background-color:var(--bizy-card-background-color);transition:transform .25s ease-in-out;box-shadow:var(--bizy-card-box-shadow)}.bizy-card:hover{transform:translateY(-1px);box-shadow:var(--bizy-card-hover-box-shadow)}.bizy-card:has(>.bizy-card__content:empty)>.bizy-card__content{display:none}.bizy-card:has(>.bizy-card__content:empty)>.bizy-card__header:not(:empty){height:100%!important}.bizy-card:has(>.bizy-card__content:empty)>.bizy-card__footer:not(:empty){height:100%!important}.bizy-card--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-card__content:not(:empty){display:flex;align-items:center;column-gap:.5rem;height:100%;width:100%;background-color:var(--bizy-card-content-background-color)}.bizy-card__header:has(>.bizy-card__header__start:empty):has(>.bizy-card__header__end:empty){display:none}.bizy-card__header:not(:empty){width:100%;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem;background-color:var(--bizy-card-header-background-color)}.bizy-card__header__start{justify-content:flex-start}.bizy-card__header__end{justify-content:flex-end}.bizy-card__slot{width:100%;display:flex;align-items:center;column-gap:.5rem;height:100%;overflow:hidden}.bizy-card__footer:has(>.bizy-card__footer__start:empty):has(>.bizy-card__footer__end:empty){display:none}.bizy-card__footer:not(:empty){width:100%;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem;background-color:var(--bizy-card-footer-background-color)}.bizy-card__footer__start{justify-content:flex-start}.bizy-card__footer__end{justify-content:flex-end}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-card', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    class=\"bizy-card {{customClass}}\"\n    [ngClass]=\"{'bizy-card--disabled': disabled}\">\n\n    <span class=\"bizy-card__header\">\n\n        <span class=\"bizy-card__header__start bizy-card__slot\">\n            <ng-content select=\"[slot=header-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__header__end bizy-card__slot\">\n            <ng-content select=\"[slot=header-end]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-card__content\">\n\n        <ng-content></ng-content>\n\n    </span>\n\n    <span class=\"bizy-card__footer\">\n\n        <span class=\"bizy-card__footer__start bizy-card__slot\">\n            <ng-content select=\"[slot=footer-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__footer__end bizy-card__slot\">\n            <ng-content select=\"[slot=footer-end]\"></ng-content>\n        </span>\n\n    </span>\n\n</button>", styles: [":host{font-size:1rem;height:var(--bizy-card-height);min-height:var(--bizy-card-min-height);max-height:var(--bizy-card-max-height);width:var(--bizy-card-width);min-width:var(--bizy-card-min-width);max-width:var(--bizy-card-max-width)}.bizy-card{height:inherit;width:inherit;min-height:inherit;min-width:inherit;max-height:inherit;max-width:inherit;cursor:var(--bizy-card-cursor);border:var(--bizy-card-border);border-radius:var(--bizy-card-border-radius);overflow:hidden;padding:var(--bizy-card-padding);display:flex;flex-direction:column;justify-content:space-between;row-gap:.3rem;background-color:var(--bizy-card-background-color);transition:transform .25s ease-in-out;box-shadow:var(--bizy-card-box-shadow)}.bizy-card:hover{transform:translateY(-1px);box-shadow:var(--bizy-card-hover-box-shadow)}.bizy-card:has(>.bizy-card__content:empty)>.bizy-card__content{display:none}.bizy-card:has(>.bizy-card__content:empty)>.bizy-card__header:not(:empty){height:100%!important}.bizy-card:has(>.bizy-card__content:empty)>.bizy-card__footer:not(:empty){height:100%!important}.bizy-card--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-card__content:not(:empty){display:flex;align-items:center;column-gap:.5rem;height:100%;width:100%;background-color:var(--bizy-card-content-background-color)}.bizy-card__header:has(>.bizy-card__header__start:empty):has(>.bizy-card__header__end:empty){display:none}.bizy-card__header:not(:empty){width:100%;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem;background-color:var(--bizy-card-header-background-color)}.bizy-card__header__start{justify-content:flex-start}.bizy-card__header__end{justify-content:flex-end}.bizy-card__slot{width:100%;display:flex;align-items:center;column-gap:.5rem;height:100%;overflow:hidden}.bizy-card__footer:has(>.bizy-card__footer__start:empty):has(>.bizy-card__footer__end:empty){display:none}.bizy-card__footer:not(:empty){width:100%;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem;background-color:var(--bizy-card-footer-background-color)}.bizy-card__footer__start{justify-content:flex-start}.bizy-card__footer__end{justify-content:flex-end}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$n = [
    BizyCardComponent,
];
class BizyCardModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyCardModule, imports: [BizyCardComponent], exports: [BizyCardComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCardModule, imports: [COMPONENTS$n] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$n,
                    exports: COMPONENTS$n
                }]
        }] });

class BizyCheckboxComponent {
    id = `bizy-checkbox-${Math.random()}`;
    selected = false;
    disabled = false;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _checkboxId = `bizy-input-checkbox-${Math.random()}`;
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.selectedChange.emit(!this.selected);
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyCheckboxComponent, isStandalone: true, selector: "bizy-checkbox", inputs: { id: "id", selected: "selected", disabled: "disabled" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<button type=\"button\" [id]=\"id\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\" class=\"bizy-checkbox\" [ngClass]=\"{'bizy-checkbox--disabled': disabled}\">\n\n  <ng-content select=\"[slot=start]\"></ng-content>\n\n  <input class=\"bizy-checkbox__input\" type=\"checkbox\" [id]=\"_checkboxId\" [disabled]=\"disabled\" [ngModel]=\"selected\">\n\n  <ng-content select=\"[slot=end]\"></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-checkbox{display:flex;column-gap:.5rem;align-items:center;border:none;cursor:pointer;background-color:transparent}.bizy-checkbox:hover .bizy-checkbox__input:not(:checked){background-color:var(--bizy-checkbox-hover-color)}.bizy-checkbox--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-checkbox__input{position:relative;min-width:1rem;min-height:1rem;width:1rem;height:1rem;color:var(--bizy-checkbox-border-color);border:.1rem solid var(--bizy-checkbox-border-color);border-radius:.3rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;cursor:pointer;transition:background-color 175ms cubic-bezier(.1,.1,.25,1)}.bizy-checkbox__input:before{position:absolute;content:\"\";display:block;top:0;left:.25rem;width:.4rem;height:.7rem;border-style:solid;border-color:#fff;border-width:0 2px 2px 0;transform:rotate(45deg);opacity:0}.bizy-checkbox__input:checked{color:#fff;border-color:var(--bizy-checkbox-color);background-color:var(--bizy-checkbox-color)}.bizy-checkbox__input:checked:before{opacity:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2$1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-checkbox', imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button type=\"button\" [id]=\"id\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\" class=\"bizy-checkbox\" [ngClass]=\"{'bizy-checkbox--disabled': disabled}\">\n\n  <ng-content select=\"[slot=start]\"></ng-content>\n\n  <input class=\"bizy-checkbox__input\" type=\"checkbox\" [id]=\"_checkboxId\" [disabled]=\"disabled\" [ngModel]=\"selected\">\n\n  <ng-content select=\"[slot=end]\"></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-checkbox{display:flex;column-gap:.5rem;align-items:center;border:none;cursor:pointer;background-color:transparent}.bizy-checkbox:hover .bizy-checkbox__input:not(:checked){background-color:var(--bizy-checkbox-hover-color)}.bizy-checkbox--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-checkbox__input{position:relative;min-width:1rem;min-height:1rem;width:1rem;height:1rem;color:var(--bizy-checkbox-border-color);border:.1rem solid var(--bizy-checkbox-border-color);border-radius:.3rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;cursor:pointer;transition:background-color 175ms cubic-bezier(.1,.1,.25,1)}.bizy-checkbox__input:before{position:absolute;content:\"\";display:block;top:0;left:.25rem;width:.4rem;height:.7rem;border-style:solid;border-color:#fff;border-width:0 2px 2px 0;transform:rotate(45deg);opacity:0}.bizy-checkbox__input:checked{color:#fff;border-color:var(--bizy-checkbox-color);background-color:var(--bizy-checkbox-color)}.bizy-checkbox__input:checked:before{opacity:1}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$m = [
    BizyCheckboxComponent,
];
class BizyCheckboxModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyCheckboxModule, imports: [BizyCheckboxComponent], exports: [BizyCheckboxComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCheckboxModule, imports: [COMPONENTS$m] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$m,
                    exports: COMPONENTS$m
                }]
        }] });

class BizyInputOptionComponent {
    ref;
    id = `bizy-input-${Math.random()}`;
    disabled = false;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
        this.ref.detectChanges();
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyInputOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyInputOptionComponent, isStandalone: true, selector: "bizy-input-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-input-option--selected': selected, 'bizy-input-option--disabled': disabled}\"\n    class=\"bizy-input-option {{customClass}}\">\n\n    <span class=\"bizy-input-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-input-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-input-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-input-color);cursor:pointer}.bizy-input-option:hover{background-color:var(--bizy-input-option-hover-background-color)}.bizy-input-option--selected{background-color:var(--bizy-input-option-selected-background-color)!important}.bizy-input-option--selected ::ng-deep .bizy-input-option__content *{color:var(--bizy-input-option-selected-color)}.bizy-input-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyInputOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input-option', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-input-option--selected': selected, 'bizy-input-option--disabled': disabled}\"\n    class=\"bizy-input-option {{customClass}}\">\n\n    <span class=\"bizy-input-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-input-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-input-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-input-color);cursor:pointer}.bizy-input-option:hover{background-color:var(--bizy-input-option-hover-background-color)}.bizy-input-option--selected{background-color:var(--bizy-input-option-selected-background-color)!important}.bizy-input-option--selected ::ng-deep .bizy-input-option__content *{color:var(--bizy-input-option-selected-color)}.bizy-input-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizyCurrencyFormatDirective {
    elementRef;
    bizyCurrencyFormat = false;
    options = {};
    #autoNumericInstance;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (typeof this.bizyCurrencyFormat === 'undefined' || this.bizyCurrencyFormat === null || this.bizyCurrencyFormat === false) {
            return;
        }
        this.#autoNumericInstance = new AutoNumeric(this.elementRef.nativeElement, this.options);
        this.elementRef.nativeElement.getValue = this.getValue;
        this.elementRef.nativeElement.setValue = this.setValue;
    }
    ngOnDestroy() {
        if (this.#autoNumericInstance) {
            this.#autoNumericInstance.remove();
        }
    }
    getValue = () => {
        return this.#autoNumericInstance.getNumber();
    };
    setValue = (value) => {
        this.#autoNumericInstance.set(value);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCurrencyFormatDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyCurrencyFormatDirective, isStandalone: true, selector: "[bizyCurrencyFormat]", inputs: { bizyCurrencyFormat: "bizyCurrencyFormat", options: ["bizyCurrencyOptions", "options"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCurrencyFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyCurrencyFormat]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }], propDecorators: { bizyCurrencyFormat: [{
                type: Input,
                args: ['bizyCurrencyFormat']
            }], options: [{
                type: Input,
                args: ['bizyCurrencyOptions']
            }] } });

class BizyInputComponent {
    ref;
    options;
    bizyInputWrapper;
    bizyInput;
    id = `bizy-input-${Math.random()}`;
    name = `bizy-input-${Math.random()}`;
    type = 'text';
    customClass = '';
    placeholder = '';
    debounceTime = 250;
    rows = 4;
    disabled = false;
    readonly = false;
    valueChange = new EventEmitter();
    onChange = new EventEmitter();
    onEnter = new EventEmitter();
    onBackspace = new EventEmitter();
    onSelect = new EventEmitter();
    onBlur = new EventEmitter();
    onFocus = new EventEmitter();
    set autofocus(autofocus) {
        if (typeof autofocus === 'undefined' || autofocus === null) {
            return;
        }
        this.setFocus(autofocus);
    }
    set value(value) {
        if (typeof value === 'undefined') {
            return;
        }
        if (this.type === 'currency') {
            this._currencyValue = Number(value);
            if (this.bizyInput && this.bizyInput.nativeElement && this.bizyInput.nativeElement.getValue) {
                const _value = this.bizyInput.nativeElement.getValue();
                if (_value !== this._currencyValue) {
                    this.bizyInput.nativeElement.setValue(this._currencyValue);
                }
            }
            return;
        }
        this._value = value;
    }
    focused = false;
    touched = false;
    opened = false;
    _value = null;
    _currencyValue = null;
    currencyOptions = 'commaDecimalCharDotSeparator';
    #subscription = new Subscription();
    #optionSubscription = new Subscription();
    onChange$ = new Subject();
    constructor(ref) {
        this.ref = ref;
    }
    getWidth() {
        return this.bizyInputWrapper && this.bizyInputWrapper.nativeElement && this.bizyInputWrapper.nativeElement.offsetWidth ? this.bizyInputWrapper.nativeElement.offsetWidth : 0;
    }
    _onchange(value) {
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.type === 'currency' && this.bizyInput.nativeElement.getValue) {
            this._currencyValue = this.bizyInput.nativeElement.getValue();
            this.onChange$.next(this._currencyValue);
            return;
        }
        this.onChange$.next(value);
    }
    _onClick(event) {
        this.onSelect.emit(event);
        this.onOpen();
    }
    _onEnter(event) {
        if (this.disabled || this.readonly || !this.focused) {
            return;
        }
        this.onEnter.emit(event);
    }
    _onBlur(event) {
        if (this.type === 'currency') {
            this.bizyInput.nativeElement.setValue(this._currencyValue);
        }
        setTimeout(() => {
            this.focused = false;
            this.touched = true;
            this.ref.detectChanges();
            this.onBlur.emit(event);
        }, 250);
    }
    _onBackspace(event) {
        setTimeout(() => {
            this.onBackspace.emit(event);
        }, 250);
    }
    _onFocus(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.focused = true;
        this.ref.detectChanges();
        this.onFocus.emit(event);
    }
    setTouched(touched) {
        this.touched = touched;
        this.ref.detectChanges();
    }
    ngAfterViewInit() {
        if (this.type === 'currency' && this.bizyInput.nativeElement.setValue) {
            this.bizyInput.nativeElement.setValue(this._currencyValue);
        }
        this.#subscription.add(this.onChange$.pipe(debounceTime$1(this.debounceTime)).subscribe(value => {
            this.valueChange.emit(value);
            this.onChange.emit(value);
        }));
    }
    onOpen() {
        if (this.disabled) {
            return;
        }
        this.opened = !this.opened;
        this.ref.detectChanges();
        if (!this.options) {
            return;
        }
        this.#optionSubscription.unsubscribe();
        this.#optionSubscription = new Subscription();
        this.options.forEach(_option => {
            this.#optionSubscription.add(_option.onSelect.subscribe(() => {
                this.close();
                this.ref.detectChanges();
                this.#optionSubscription.unsubscribe();
            }));
        });
    }
    setFocus(focus) {
        const interval$ = interval(300);
        const finish$ = new Subject();
        this.#subscription.add(interval$.pipe(takeUntil(finish$)).subscribe(() => {
            if (this.bizyInput && this.bizyInput.nativeElement) {
                if (focus) {
                    this.bizyInput.nativeElement.focus();
                    this.focused = true;
                }
                else {
                    this.bizyInput.nativeElement.blur();
                    this.focused = false;
                }
                finish$.next();
                finish$.complete();
                this.ref.detectChanges();
            }
        }));
    }
    close = (event, button) => {
        if (button && event && event.target && event.target === button) {
            return;
        }
        this.opened = false;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyInputComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyInputComponent, isStandalone: true, selector: "bizy-input", inputs: { id: "id", name: "name", type: "type", customClass: "customClass", placeholder: "placeholder", debounceTime: "debounceTime", rows: "rows", disabled: "disabled", readonly: "readonly", autofocus: "autofocus", value: "value" }, outputs: { valueChange: "valueChange", onChange: "onChange", onEnter: "onEnter", onBackspace: "onBackspace", onSelect: "onSelect", onBlur: "onBlur", onFocus: "onFocus" }, queries: [{ propertyName: "options", predicate: BizyInputOptionComponent }], viewQueries: [{ propertyName: "bizyInputWrapper", first: true, predicate: ["bizyInputWrapper"], descendants: true }, { propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled, 'bizy-input--negative': type === 'currency' && _currencyValue < 0}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type === 'currency' ? 'tel' : type\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            [bizyCurrencyFormat]=\"type === 'currency'\"\n            [bizyCurrencyOptions]=\"currencyOptions\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n        \n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--negative,.bizy-input--negative .bizy-input__header,.bizy-input--negative .bizy-input__content,.bizy-input--negative .bizy-input__content__input{background-color:var(--bizy-input-negative-background-color)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "directive", type: BizyCurrencyFormatDirective, selector: "[bizyCurrencyFormat]", inputs: ["bizyCurrencyFormat", "bizyCurrencyOptions"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input', imports: [CommonModule, FormsModule, OverlayModule, BizyCurrencyFormatDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n    #bizyInputWrapper\n    type=\"button\"\n    (click)=\"_onClick($event)\"\n    (keyup)=\"_onClick($event)\"\n    class=\"bizy-input {{customClass}}\"\n    (focus)=\"bizyInput.nativeElement.focus()\"\n    cdkOverlayOrigin\n    #bizyInputTrigger=\"cdkOverlayOrigin\"\n    [ngClass]=\"{'bizy-input--disabled': disabled, 'bizy-input--negative': type === 'currency' && _currencyValue < 0}\">\n\n    <span class=\"bizy-input__header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </span>\n\n    <span class=\"bizy-input__content\" [ngClass]=\"{'bizy-input__content--readonly': readonly}\">\n        \n        <span class=\"bizy-input__content__prefix\">\n            <ng-content select=\"[slot=prefix]\"></ng-content>\n        </span>\n        \n        <input\n            #bizyInput\n            *ngIf=\"type !== 'textarea'\"\n            [id]=\"id\"\n            class=\"bizy-input__content__input\"\n            [type]=\"type === 'currency' ? 'tel' : type\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            [bizyCurrencyFormat]=\"type === 'currency'\"\n            [bizyCurrencyOptions]=\"currencyOptions\"\n            [bizyOnlyPhoneDigits]=\"type === 'tel'\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\"/>\n        \n        <textarea\n            #bizyInput\n            *ngIf=\"type === 'textarea'\"\n            [id]=\"id\"\n            [rows]=\"rows\"\n            [placeholder]=\"placeholder\"\n            [readonly]=\"readonly\"\n            class=\"bizy-input__content__input\"\n            (blur)=\"_onBlur($event)\"\n            (focus)=\"_onFocus($event)\"\n            (keyup.enter)=\"_onEnter($event)\"\n            (keyup.backspace)=\"_onBackspace($event)\"\n            [ngModel]=\"_value\"\n            (ngModelChange)=\"_onchange($event)\">\n        </textarea>\n\n        <span class=\"bizy-input__content__suffix\">\n            <ng-content select=\"[slot=suffix]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-input__bottom-line\" [ngClass]=\"{'bizy-input__bottom-line--visible': focused}\"></span>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInputWrapper?.offsetWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyInputTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInputWrapper)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-input__options\">\n\n        <ng-content select=\"bizy-input-option\"></ng-content>\n    \n    </span>\n\n</ng-template>\n\n<span class=\"bizy-input__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n", styles: [":host{width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex;flex-direction:column;row-gap:.3rem}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-input__errors:not(:empty)) .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-input{width:100%;background-color:var(--bizy-input-background-color);border:none;border-top-left-radius:.3rem;border-top-right-radius:.3rem;display:flex;padding:.3rem .3rem 0;flex-direction:column;cursor:var(--bizy-input-cursor)}.bizy-input--negative,.bizy-input--negative .bizy-input__header,.bizy-input--negative .bizy-input__content,.bizy-input--negative .bizy-input__content__input{background-color:var(--bizy-input-negative-background-color)}.bizy-input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input__header{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.5rem;padding-bottom:.1rem}.bizy-input__header:empty{display:none!important}.bizy-input__content{background-color:var(--bizy-input-background-color);width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-input__content--readonly{pointer-events:none;cursor:default!important}.bizy-input__content__prefix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__prefix:empty{display:none!important}.bizy-input__content__suffix{display:flex;align-items:center;column-gap:.3rem}.bizy-input__content__suffix:empty{display:none!important}.bizy-input__content__input{width:100%;background-color:var(--bizy-input-background-color);color:var(--bizy-input-color);flex:1;border:none;padding-block:0;padding-inline:0;padding:0 0 .2rem;font-size:1rem}.bizy-input__content__input:focus{outline:none;border:none}.bizy-input__content input[type=number]::-webkit-inner-spin-button,.bizy-input__content input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;margin:0}@keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-input__bottom-line{width:calc(100% + .6rem);position:relative;right:.3rem;height:.1rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-input-focus-color)}.bizy-input__bottom-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}.bizy-input__options{background-color:var(--bizy-input-background-color);display:flex;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-input-options-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-input__errors:empty{display:none!important}::ng-deep .bizy-input__errors *{color:var(--bizy-input-invalid-color)!important}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { options: [{
                type: ContentChildren,
                args: [BizyInputOptionComponent]
            }], bizyInputWrapper: [{
                type: ViewChild,
                args: ['bizyInputWrapper']
            }], bizyInput: [{
                type: ViewChild,
                args: ['bizyInput']
            }], id: [{
                type: Input
            }], name: [{
                type: Input
            }], type: [{
                type: Input
            }], customClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], debounceTime: [{
                type: Input
            }], rows: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], onChange: [{
                type: Output
            }], onEnter: [{
                type: Output
            }], onBackspace: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], autofocus: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

class BizyDatePickerComponent {
    bizyDatePicker;
    id = `bizy-date-picker-${Math.random()}`;
    disabled = false;
    customClass = '';
    opened = false;
    minDate = null;
    maxDate = null;
    enableSeconds = false;
    dateChange = new EventEmitter();
    rangeChange = new EventEmitter();
    onChange = new EventEmitter();
    openedChange = new EventEmitter();
    onOpen = new EventEmitter();
    onSelect = new EventEmitter();
    #datePipe = inject(DatePipe);
    #ref = inject(ChangeDetectorRef);
    dateFormat = 'Y-m-d';
    datePipeFormat = 'yyyy-MM-dd';
    enableTime = false;
    started = false;
    noCalendar = true;
    mode = 'single';
    dates = [Date.now()];
    time = Date.now();
    get touched() {
        return this.bizyDatePicker ? this.bizyDatePicker.touched : false;
    }
    set date(date) {
        if (typeof date === 'undefined' || date === null) {
            return;
        }
        this.mode = 'single';
        this.dates = [date];
        this.time = date;
        this.value = this.#datePipe.transform(date, this.datePipeFormat, undefined, 'es-AR');
        if (!this.enableTime || !this.started) {
            this.#start();
        }
    }
    set range(range) {
        if (!range) {
            return;
        }
        this.mode = 'range';
        this.dates = [range.from, range.to];
        this.time = range.from;
        this.value = `${this.#datePipe.transform(range.from, this.datePipeFormat, undefined, 'es-AR')} - ${this.#datePipe.transform(range.to, this.datePipeFormat, undefined, 'es-AR')}`;
        this.#start();
    }
    value = '';
    set type(type) {
        if (!type) {
            return;
        }
        switch (type) {
            case 'date':
                this.dateFormat = 'Y-m-d';
                this.datePipeFormat = 'yyyy-MM-dd';
                this.enableTime = false;
                this.noCalendar = false;
                break;
            case 'date-time':
                this.dateFormat = 'Y-m-d H:i:S';
                this.datePipeFormat = this.enableSeconds ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd HH:mm';
                this.enableTime = true;
                this.noCalendar = false;
                break;
            case 'time':
                this.dateFormat = 'H:i:S';
                this.datePipeFormat = this.enableSeconds ? 'HH:mm:ss' : 'HH:mm';
                this.enableTime = true;
                this.noCalendar = true;
                break;
            case 'year-month':
                this.dateFormat = 'Y-M';
                this.datePipeFormat = 'yyyy MMMM';
                this.enableTime = false;
                this.noCalendar = false;
                break;
            default:
                this.dateFormat = 'Y-m-d';
                this.datePipeFormat = 'yyyy-MM-dd';
                this.enableTime = false;
                this.noCalendar = false;
        }
    }
    ngAfterViewInit() {
        this.#start();
    }
    #start() {
        if (this.bizyDatePicker && this.bizyDatePicker.bizyInputWrapper && this.bizyDatePicker.bizyInputWrapper.nativeElement) {
            const plugins = [];
            if (this.dateFormat === 'Y-M') {
                plugins.push(monthSelectPlugin({
                    shorthand: true
                }));
            }
            flatpickr(this.bizyDatePicker.bizyInputWrapper.nativeElement, {
                locale: Spanish,
                mode: this.mode,
                dateFormat: this.dateFormat,
                enableTime: this.enableTime,
                enableSeconds: this.enableSeconds,
                plugins,
                minDate: this.minDate,
                maxDate: this.maxDate,
                noCalendar: this.noCalendar,
                disableMobile: true,
                time_24hr: true,
                defaultDate: this.mode === 'single' ? new Date(this.dates[0]) : this.dates.map(_date => new Date(_date)),
                defaultHour: this.#getHour(this.time),
                defaultMinute: this.#getMinute(this.time),
                onChange: (selectedDates) => {
                    if (this.mode === 'single' && selectedDates[0]) {
                        const date = new Date(selectedDates[0]);
                        this.dateChange.emit(date.getTime());
                        this.onChange.emit(date.getTime());
                    }
                    else if (selectedDates[0] && selectedDates[1]) {
                        const from = new Date(selectedDates[0]);
                        const to = new Date(selectedDates[1]);
                        to.setHours(23, 59, 59, 999);
                        const range = { from: from.getTime(), to: to.getTime() };
                        this.rangeChange.emit(range);
                        this.onChange.emit(range);
                    }
                },
                onOpen: () => {
                    this.opened = true;
                    this.openedChange.emit(this.opened);
                    this.onOpen.emit(this.opened);
                },
                onClose: () => {
                    this.opened = false;
                    this.openedChange.emit(this.opened);
                    this.onOpen.emit(this.opened);
                }
            });
            this.started = true;
        }
    }
    setTouched(touched) {
        if (this.bizyDatePicker) {
            this.bizyDatePicker.setTouched(touched);
            this.#ref.detectChanges();
        }
    }
    #getHour(time) {
        const date = new Date(time);
        return date.getHours();
    }
    #getMinute(time) {
        const date = new Date(time);
        return date.getMinutes();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDatePickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyDatePickerComponent, isStandalone: true, selector: "bizy-date-picker", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened", minDate: "minDate", maxDate: "maxDate", enableSeconds: "enableSeconds", date: "date", range: "range", type: "type" }, outputs: { dateChange: "dateChange", rangeChange: "rangeChange", onChange: "onChange", openedChange: "openedChange", onOpen: "onOpen", onSelect: "onSelect" }, providers: [DatePipe], viewQueries: [{ propertyName: "bizyDatePicker", first: true, predicate: ["bizyDatePicker"], descendants: true }], ngImport: i0, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\" *ngIf=\"touched\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "placeholder", "debounceTime", "rows", "disabled", "readonly", "autofocus", "value"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-date-picker', imports: [CommonModule, BizyInputComponent], providers: [DatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\" *ngIf=\"touched\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"] }]
        }], propDecorators: { bizyDatePicker: [{
                type: ViewChild,
                args: ['bizyDatePicker']
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], enableSeconds: [{
                type: Input
            }], dateChange: [{
                type: Output
            }], rangeChange: [{
                type: Output
            }], onChange: [{
                type: Output
            }], openedChange: [{
                type: Output
            }], onOpen: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], date: [{
                type: Input
            }], range: [{
                type: Input
            }], type: [{
                type: Input
            }] } });

const COMPONENTS$l = [
    BizyDatePickerComponent,
];
class BizyDatePickerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyDatePickerModule, imports: [BizyDatePickerComponent], exports: [BizyDatePickerComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDatePickerModule, imports: [COMPONENTS$l] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDatePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$l,
                    exports: COMPONENTS$l
                }]
        }] });

const ES = {
    ...es_ES,
    strings: {
        ...es_ES.strings,
        noDuplicates: 'Archivo duplicado: \'%{fileName}\'',
        browseFiles: 'buscar archivo',
        dropPasteFiles: 'Soltar archivo aquí, pegar o %{browse}'
    }
};
const EN = {
    ...en_US,
    strings: {
        ...en_US.strings,
        noDuplicates: 'Duplicated file: \'%{fileName}\'',
        browseFiles: 'browse file',
        dropPasteFiles: 'Drop a file here or %{browse}'
    }
};
class BizyFileUploaderService {
    #renderer = inject(Renderer2);
    #document = inject(DOCUMENT);
    #fileLoaded = new Subject();
    #fileRemoved = new Subject();
    #upload = new Subject();
    #uploadSuccess = new Subject();
    #error = new Subject();
    #cancelAll = new Subject();
    #complete = new Subject();
    #disableLocalFiles = false;
    #uppy = null;
    get fileLoaded$() {
        return this.#fileLoaded.asObservable();
    }
    get fileRemoved$() {
        return this.#fileRemoved.asObservable();
    }
    get upload$() {
        return this.#upload.asObservable();
    }
    get uploadSuccess$() {
        return this.#uploadSuccess.asObservable();
    }
    get error$() {
        return this.#error.asObservable();
    }
    get cancelAll$() {
        return this.#cancelAll.asObservable();
    }
    get complete$() {
        return this.#complete.asObservable();
    }
    createFileUploader(data) {
        const locale = data.language === 'es' ? ES : EN;
        this.#disableLocalFiles = data.disableLocalFiles;
        this.#uppy = new Uppy({
            locale,
            infoTimeout: 2500,
            restrictions: {
                maxFileSize: data.maxFileSize,
                minFileSize: data.minFileSize,
                maxTotalFileSize: data.maxTotalFileSize,
                maxNumberOfFiles: data.maxNumberOfFiles,
                minNumberOfFiles: data.minNumberOfFiles,
                allowedFileTypes: data.allowedFileTypes
            }
        })
            .use(Dashboard, {
            inline: true,
            singleFileFullScreen: false,
            target: `#${data.templateId}`,
            width: data.dragDropAreaWidth,
            height: data.dragDropAreaHeight,
            hideCancelButton: data.hideCancelButton,
            hideUploadButton: data.hideUploadButton,
            hidePauseResumeButton: data.hidePauseResumeButton,
            disableLocalFiles: data.disableLocalFiles
        })
            .use(XHRUpload, {
            endpoint: '',
            headers: data.headers,
            getResponseData: (responseText, response) => {
                return {
                    fileId: responseText,
                    response
                };
            }
        })
            .on('file-added', file => {
            this.#removeUnnecessaryOptions(this.#disableLocalFiles);
            this.#fileLoaded.next(file);
        })
            .on('file-removed', file => {
            this.#removeUnnecessaryOptions(this.#disableLocalFiles);
            this.#fileRemoved.next(file);
        })
            .on('upload', data => {
            this.#upload.next();
        })
            .on('upload-success', (file, response) => {
            if (file) {
                this.#uploadSuccess.next({ file, response });
            }
        })
            .on('upload-error', (file, error, response) => {
            this.#error.next({ file, error, response });
        })
            .on('restriction-failed', (file, error) => {
            this.#error.next({ file, error });
        })
            .on('error', error => {
            this.#error.next({ error });
        })
            .on('cancel-all', () => {
            this.#cancelAll.next();
        })
            .on('complete', result => {
            this.#removeUnnecessaryOptions(this.#disableLocalFiles);
            this.#complete.next(result);
        });
        this.#removeUnnecessaryOptions(this.#disableLocalFiles);
    }
    load = (data) => {
        if (!this.#uppy) {
            return;
        }
        this.#uppy.addFile({
            name: data.file.name, // File name
            type: data.file.type, // File type
            data: data.file, // File blob
            meta: {
                // Optional, store the directory path of a file so Uppy can tell identical files in different directories apart.
                relativePath: data.file.webkitRelativePath,
                referenceId: data.id
            },
            source: 'Local', // Optional, determines the source of the file, for example, Instagram.
            isRemote: false // Optional, set to true if actual file is not in the browser, but on some remote server, for example,
            // when using companion in combination with Instagram.
        });
    };
    disable(value) {
        if (!this.#uppy) {
            return;
        }
        const dashboard = this.#uppy.getPlugin('Dashboard');
        dashboard.setOptions({ disabled: value });
    }
    upload = (data) => {
        if (!this.#uppy) {
            return;
        }
        this.#uppy.getPlugin('XHRUpload').setOptions({
            endpoint: data.endpoint,
            headers: data.headers ?? {}
        });
        this.#uppy.upload();
    };
    cleanAllFiles = () => {
        if (!this.#uppy) {
            return;
        }
        this.#uppy.cancelAll();
    };
    #removeUnnecessaryOptions = (remove) => {
        setTimeout(() => {
            if (!remove) {
                return;
            }
            const browseButton = this.#document.getElementsByClassName('uppy-Dashboard-browse')[0];
            if (browseButton) {
                this.#renderer.setStyle(browseButton, 'display', 'none');
            }
            const dragAndDropText = this.#document.getElementsByClassName('uppy-Dashboard-AddFiles-title')[0];
            if (dragAndDropText) {
                this.#renderer.setStyle(dragAndDropText, 'display', 'none');
            }
            const addMoreFilesButton = this.#document.getElementsByClassName('uppy-DashboardContent-addMore')[0];
            if (addMoreFilesButton) {
                this.#renderer.setStyle(addMoreFilesButton, 'display', 'none');
            }
            const doneButton = this.#document.getElementsByClassName('uppy-StatusBar-actionBtn--done')[0];
            if (doneButton) {
                this.#renderer.setStyle(doneButton, 'display', 'none');
            }
        }, 0);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFileUploaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFileUploaderService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFileUploaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class BizyFileUploaderComponent {
    #fileUploader = inject(BizyFileUploaderService);
    dragDropAreaWidth = '100%';
    dragDropAreaHeight = '16rem';
    language = 'es';
    headers = {};
    maxFileSize = null;
    minFileSize = null;
    maxTotalFileSize = 31458000; // 30MB
    maxNumberOfFiles = null;
    minNumberOfFiles = null;
    allowedFileTypes = ['.wav'];
    hideUploadButton = true;
    hidePauseResumeButton = true;
    hideCancelButton = false;
    disableLocalFiles = false;
    load;
    upload;
    set disabled(value) {
        this.#fileUploader.disable(Boolean(value));
    }
    ;
    completed = new EventEmitter();
    loadedFiles = new EventEmitter();
    #subscription = new Subscription();
    #files = new Set();
    TEMPLATE_ID = 'bizy-file-uploader-template';
    ngAfterViewInit() {
        this.#fileUploader.createFileUploader({
            maxFileSize: this.maxFileSize,
            minFileSize: this.minFileSize,
            maxTotalFileSize: this.maxTotalFileSize,
            maxNumberOfFiles: this.maxNumberOfFiles,
            minNumberOfFiles: this.minNumberOfFiles,
            dragDropAreaWidth: this.dragDropAreaWidth,
            dragDropAreaHeight: this.dragDropAreaHeight,
            allowedFileTypes: this.allowedFileTypes,
            language: this.language,
            templateId: this.TEMPLATE_ID,
            hideCancelButton: this.hideCancelButton,
            hideUploadButton: this.hideUploadButton,
            hidePauseResumeButton: this.hidePauseResumeButton,
            disableLocalFiles: this.disableLocalFiles,
            headers: this.headers,
        });
        if (this.upload) {
            this.#subscription.add(this.upload.subscribe(data => {
                if (this.#files.size === 0 || (this.minNumberOfFiles && this.#files.size < this.minNumberOfFiles)) {
                    this.completed.emit({ successful: [], failed: [] });
                    return;
                }
                this.#fileUploader.upload(data);
            }));
        }
        if (this.load) {
            this.#subscription.add(this.load.subscribe(data => {
                if (this.maxNumberOfFiles && this.#files.size >= this.maxNumberOfFiles) {
                    return;
                }
                this.#fileUploader.load(data);
            }));
        }
        this.#subscription.add(this.#fileUploader.complete$.subscribe(res => {
            const successful = [];
            const failed = [];
            res.successful.forEach(_file => {
                if (_file.response && _file.response.body && _file.response.body.fileId) {
                    successful.push({ fileId: _file.response.body.fileId, meta: _file.meta });
                }
            });
            res.failed.forEach(_file => {
                if (_file.response && _file.response.body && _file.response.body.fileId) {
                    failed.push({ fileId: _file.response.body.fileId, meta: _file.meta });
                }
            });
            this.completed.emit({ successful, failed });
        }));
        this.#subscription.add(this.#fileUploader.fileLoaded$.subscribe(file => {
            this.#files.add(file);
            this.loadedFiles.emit(Array.from(this.#files));
        }));
        this.#subscription.add(this.#fileUploader.fileRemoved$.subscribe(file => {
            this.#files.delete(file);
            this.loadedFiles.emit(Array.from(this.#files));
        }));
    }
    ngOnDestroy() {
        this.#fileUploader.cleanAllFiles();
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFileUploaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyFileUploaderComponent, isStandalone: true, selector: "bizy-file-uploader", inputs: { dragDropAreaWidth: "dragDropAreaWidth", dragDropAreaHeight: "dragDropAreaHeight", language: "language", headers: "headers", maxFileSize: "maxFileSize", minFileSize: "minFileSize", maxTotalFileSize: "maxTotalFileSize", maxNumberOfFiles: "maxNumberOfFiles", minNumberOfFiles: "minNumberOfFiles", allowedFileTypes: "allowedFileTypes", hideUploadButton: "hideUploadButton", hidePauseResumeButton: "hidePauseResumeButton", hideCancelButton: "hideCancelButton", disableLocalFiles: "disableLocalFiles", load: "load", upload: "upload", disabled: "disabled" }, outputs: { completed: "completed", loadedFiles: "loadedFiles" }, providers: [BizyFileUploaderService], ngImport: i0, template: '<div [id]="TEMPLATE_ID"></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFileUploaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-file-uploader',
                    template: '<div [id]="TEMPLATE_ID"></div>',
                    providers: [BizyFileUploaderService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { dragDropAreaWidth: [{
                type: Input
            }], dragDropAreaHeight: [{
                type: Input
            }], language: [{
                type: Input
            }], headers: [{
                type: Input
            }], maxFileSize: [{
                type: Input
            }], minFileSize: [{
                type: Input
            }], maxTotalFileSize: [{
                type: Input
            }], maxNumberOfFiles: [{
                type: Input
            }], minNumberOfFiles: [{
                type: Input
            }], allowedFileTypes: [{
                type: Input
            }], hideUploadButton: [{
                type: Input
            }], hidePauseResumeButton: [{
                type: Input
            }], hideCancelButton: [{
                type: Input
            }], disableLocalFiles: [{
                type: Input
            }], load: [{
                type: Input
            }], upload: [{
                type: Input
            }], disabled: [{
                type: Input
            }], completed: [{
                type: Output
            }], loadedFiles: [{
                type: Output
            }] } });

const COMPONENTS$k = [
    BizyFileUploaderComponent,
];
class BizyFileUploaderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFileUploaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyFileUploaderModule, imports: [BizyFileUploaderComponent], exports: [BizyFileUploaderComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFileUploaderModule, providers: [BizyFileUploaderService] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFileUploaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$k,
                    exports: COMPONENTS$k,
                    providers: [BizyFileUploaderService]
                }]
        }] });

class BizyFilterSectionRangeOptionComponent {
    #fb = inject(FormBuilder);
    #ref = inject(ChangeDetectorRef);
    id = `bizy-filter-section-range-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    onChange = new EventEmitter();
    _minLimit;
    _maxLimit;
    #activated = new BehaviorSubject(false);
    get activated$() {
        return this.#activated.asObservable();
    }
    #form = this.#fb.group({
        minValue: [null],
        maxValue: [null]
    });
    ;
    set min(min) {
        if (typeof min === 'undefined' || min === null) {
            this.minValue.setValue(null);
        }
        else {
            this.minValue.setValue(Number(min));
        }
        this.#activated.next(Boolean(min) || min === 0 || Boolean(this.maxValue.value) || this.maxValue.value === 0);
        this.#ref.detectChanges();
    }
    ;
    set max(max) {
        if (typeof max === 'undefined' || max === null) {
            this.maxValue.setValue(null);
        }
        else {
            this.maxValue.setValue(Number(max));
        }
        this.#activated.next(Boolean(max) || max === 0 || Boolean(this.minValue.value) || this.minValue.value === 0);
        this.#ref.detectChanges();
    }
    ;
    set minLimit(min) {
        if (typeof min === 'undefined' || min === null) {
            return;
        }
        this._minLimit = min;
        if (typeof this._maxLimit === 'undefined' || this._maxLimit === null) {
            this.minValue.setValidators([Validators.max(min)]);
        }
        else {
            this.minValue.setValidators([Validators.max(this._maxLimit), Validators.min(min)]);
        }
    }
    ;
    set maxLimit(max) {
        if (typeof max === 'undefined' || max === null) {
            return;
        }
        this._maxLimit = max;
        if (typeof this._minLimit === 'undefined' || this._minLimit === null) {
            this.maxValue.setValidators([Validators.max(max)]);
        }
        else {
            this.maxValue.setValidators([Validators.min(this._minLimit), Validators.max(max)]);
        }
    }
    ;
    setMinValue(value) {
        let min = value === '' ? null : Number(value);
        const max = this.maxValue.value === null || this.maxValue.value === '' ? null : Number(this.maxValue.value);
        if (min !== null && max !== null && max < min) {
            return;
        }
        if (typeof this._minLimit !== 'undefined' && this._minLimit !== null && min && min < this._minLimit) {
            min = this._minLimit;
        }
        this.onChange.emit({ min, max });
        this.#activated.next(Boolean(min) || Boolean(max) || min === 0 || max === 0);
        this.#ref.detectChanges();
    }
    setMaxValue(value) {
        let max = !Boolean(value) && value !== 0 ? null : Number(value);
        const min = this.minValue.value === null || this.minValue.value === '' ? null : Number(this.minValue.value);
        if (min !== null && max !== null && max < min) {
            return;
        }
        if (typeof this._maxLimit !== 'undefined' && this._maxLimit !== null && max && max > this._maxLimit) {
            max = this._maxLimit;
        }
        this.onChange.emit({ min, max });
        this.#activated.next(Boolean(min) || Boolean(max) || min === 0 || max === 0);
        this.#ref.detectChanges();
    }
    get minValue() {
        return this.#form.get('minValue');
    }
    get maxValue() {
        return this.#form.get('maxValue');
    }
    onClean = () => {
        this.minValue.setValue(null);
        this.maxValue.setValue(null);
        this.onChange.emit({ min: null, max: null });
        this.#activated.next(false);
        this.#ref.detectChanges();
    };
    getId = () => {
        return this.id;
    };
    isActivated = () => {
        return this.#activated.value;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterSectionRangeOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyFilterSectionRangeOptionComponent, isStandalone: true, selector: "bizy-filter-section-range-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", min: "min", max: "max", minLimit: "minLimit", maxLimit: "maxLimit" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    [id]=\"id\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"minValue.value\"\n            (onChange)=\"setMinValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=min-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"maxValue.value\"\n            (onChange)=\"setMaxValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=max-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n    </span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}.bizy-filter-section-range-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "placeholder", "debounceTime", "rows", "disabled", "readonly", "autofocus", "value"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterSectionRangeOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-range-option', imports: [BizyInputComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    [id]=\"id\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"minValue.value\"\n            (onChange)=\"setMinValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=min-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"maxValue.value\"\n            (onChange)=\"setMaxValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=max-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n    </span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}.bizy-filter-section-range-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onChange: [{
                type: Output
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], minLimit: [{
                type: Input
            }], maxLimit: [{
                type: Input
            }] } });

class BizyFilterSectionCheckboxOptionComponent {
    ref;
    id = `bizy-filter-section-checkbox-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    onChange = new EventEmitter();
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        this._selected = selected;
        this.onSelect(selected);
    }
    _selected = true;
    constructor(ref) {
        this.ref = ref;
    }
    onSelect = (selected) => {
        if (this.disabled) {
            return;
        }
        this._selected = selected;
        this.onChange.emit(selected);
        this.ref.detectChanges();
    };
    getSelected = () => {
        return this._selected;
    };
    getId = () => {
        return this.id;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterSectionCheckboxOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyFilterSectionCheckboxOptionComponent, isStandalone: true, selector: "bizy-filter-section-checkbox-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    [id]=\"id\"\n    (click)=\"onSelect(!_selected)\"\n    (keyup.enter)=\"onSelect(!_selected)\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        class=\"bizy-filter-section-checkbox-option__checkbox\"\n        [selected]=\"_selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}.bizy-filter-section-checkbox-option__checkbox{pointer-events:none}\n"], dependencies: [{ kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterSectionCheckboxOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-checkbox-option', imports: [BizyCheckboxComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    [id]=\"id\"\n    (click)=\"onSelect(!_selected)\"\n    (keyup.enter)=\"onSelect(!_selected)\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        class=\"bizy-filter-section-checkbox-option__checkbox\"\n        [selected]=\"_selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}.bizy-filter-section-checkbox-option__checkbox{pointer-events:none}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onChange: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });

class BizyFilterSectionSearchOptionComponent {
    ref;
    id = `bizy-filter-section-search-option-${Math.random()}`;
    customClass = '';
    valueChange = new EventEmitter();
    onChange = new EventEmitter();
    _value = '';
    #activated = new BehaviorSubject(false);
    get activated$() {
        return this.#activated.asObservable();
    }
    set value(value) {
        if (typeof value === 'undefined' || value === null) {
            return;
        }
        if (Array.isArray(value)) {
            value = '';
        }
        this._value = value;
        this.#activated.next(Boolean(value));
        this.ref.detectChanges();
    }
    constructor(ref) {
        this.ref = ref;
    }
    _onChange(value) {
        this.valueChange.emit(value);
        this.onChange.emit(value);
        this.#activated.next(Boolean(value));
        this.ref.detectChanges();
    }
    getId = () => {
        return this.id;
    };
    getValue = () => {
        return this._value;
    };
    isActivated = () => {
        return this.#activated.value;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyFilterSectionSearchOptionComponent, isStandalone: true, selector: "bizy-filter-section-search-option", inputs: { id: "id", customClass: "customClass", value: "value" }, outputs: { valueChange: "valueChange", onChange: "onChange" }, ngImport: i0, template: "<bizy-input\n    [id]=\"id\" \n    (onChange)=\"_onChange($event)\"\n    [value]=\"_value\"\n    class=\"bizy-filter-section-search-option {{customClass}}\">\n\n    <span slot=\"header\"></span>\n\n    <ng-container slot=\"prefix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=suffix]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:100%}.bizy-filter-section-search-option{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "placeholder", "debounceTime", "rows", "disabled", "readonly", "autofocus", "value"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-search-option', imports: [BizyInputComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-input\n    [id]=\"id\" \n    (onChange)=\"_onChange($event)\"\n    [value]=\"_value\"\n    class=\"bizy-filter-section-search-option {{customClass}}\">\n\n    <span slot=\"header\"></span>\n\n    <ng-container slot=\"prefix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=suffix]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:100%}.bizy-filter-section-search-option{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], onChange: [{
                type: Output
            }], value: [{
                type: Input
            }] } });

class BizyFilterSectionComponent {
    document;
    ref;
    checkboxOptions;
    rangeOption;
    searchOption;
    id = `bizy-filter-section-${Math.random()}`;
    disabled = false;
    customClass = '';
    onSelect = new EventEmitter();
    #subscription = new Subscription();
    #mutationObserver;
    #checkboxOptions = [];
    _activated = false;
    constructor(document, ref) {
        this.document = document;
        this.ref = ref;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.checkboxOptions && (this.#checkboxOptions.length !== 0 || this.checkboxOptions.length !== 0) && !this.#optionsAreEqual(this.#checkboxOptions, this.checkboxOptions.toArray())) {
                this.#checkboxOptions = this.checkboxOptions.toArray();
                const selectedOptions = this.checkboxOptions.filter(_option => _option.getSelected() === true);
                this._activated = selectedOptions.length !== this.checkboxOptions.length;
                this.onSelect.emit(this._activated);
                this.ref.detectChanges();
                this.checkboxOptions.forEach(_option => {
                    this.#subscription.add(_option.onChange.subscribe(() => {
                        const selectedOptions = this.checkboxOptions.filter(_option => _option.getSelected() === true);
                        this._activated = selectedOptions.length !== this.checkboxOptions.length;
                        this.onSelect.emit(this._activated);
                        this.ref.detectChanges();
                    }));
                });
            }
            else if (this.rangeOption) {
                this.#subscription.add(this.rangeOption.activated$.subscribe(value => {
                    setTimeout(() => {
                        this._activated = value;
                        this.onSelect.emit(value);
                        this.ref.detectChanges();
                    });
                }));
                this.#mutationObserver.disconnect();
            }
            else if (this.searchOption) {
                this.#subscription.add(this.searchOption.activated$.subscribe(value => {
                    setTimeout(() => {
                        this._activated = value;
                        this.onSelect.emit(value);
                        this.ref.detectChanges();
                    });
                }));
                this.#mutationObserver.disconnect();
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onSelect = (selected) => {
        if (this.disabled || this.rangeOption) {
            return;
        }
        this.checkboxOptions.forEach(_option => {
            _option.onSelect(selected);
        });
    };
    onClean = () => {
        if (!this.rangeOption) {
            return;
        }
        this.rangeOption.onClean();
    };
    isActivated = () => {
        return this._activated;
    };
    getId = () => {
        return this.id;
    };
    #optionsAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort((a, b) => String(a.id).localeCompare(String(b.id)));
        arr2.sort((a, b) => String(a.id).localeCompare(String(b.id)));
        for (let i = 0; i < arr1.length; i++) {
            for (let key in arr1[i]) {
                if (arr1[i][key] !== arr2[i][key]) {
                    return false;
                }
            }
        }
        return true;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterSectionComponent, deps: [{ token: DOCUMENT }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyFilterSectionComponent, isStandalone: true, selector: "bizy-filter-section", inputs: { id: "id", disabled: "disabled", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "rangeOption", first: true, predicate: BizyFilterSectionRangeOptionComponent, descendants: true }, { propertyName: "searchOption", first: true, predicate: BizyFilterSectionSearchOptionComponent, descendants: true }, { propertyName: "checkboxOptions", predicate: BizyFilterSectionCheckboxOptionComponent }], ngImport: i0, template: "<div class=\"bizy-filter-section {{customClass}}\" [id]=\"id\">\n\n    <span class=\"bizy-filter-section__header\">\n\n        <ng-content select=\"[slot=header]\"></ng-content>\n\n        <bizy-checkbox \n            class=\"bizy-filter-section__header__checkbox\"\n            (onSelect)=\"_onSelect(_activated)\"\n            [selected]=\"!_activated\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n\n        <button \n            type=\"button\"\n            class=\"bizy-filter-section__header__clear-button\"\n            (click)=\"onClean()\"\n            (keyup.enter)=\"onClean()\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"bizy-filter-section__header__clear-icon\">\n                <path d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\"/>\n            </svg>\n        </button>\n        \n    </span>\n\n    <span class=\"bizy-filter-section__options\">\n\n        <ng-content select=\"bizy-filter-section-checkbox-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-range-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-search-option\"></ng-content>\n\n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1;min-width:var(--bizy-filter-section-min-width)}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__options{overflow-y:auto!important}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.3rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;border:none;background-color:transparent;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;min-height:fit-content;max-height:15rem;overflow-y:hidden;overflow-x:hidden}.bizy-filter-section__header__clear-button{width:fit-content;height:fit-content;border:none;background-color:transparent;cursor:pointer}.bizy-filter-section__header__clear-icon{fill:var(--bizy-filter-section-clear-color);pointer-events:none;height:1rem}\n"], dependencies: [{ kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterSectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section', imports: [BizyCheckboxComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-filter-section {{customClass}}\" [id]=\"id\">\n\n    <span class=\"bizy-filter-section__header\">\n\n        <ng-content select=\"[slot=header]\"></ng-content>\n\n        <bizy-checkbox \n            class=\"bizy-filter-section__header__checkbox\"\n            (onSelect)=\"_onSelect(_activated)\"\n            [selected]=\"!_activated\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n\n        <button \n            type=\"button\"\n            class=\"bizy-filter-section__header__clear-button\"\n            (click)=\"onClean()\"\n            (keyup.enter)=\"onClean()\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"bizy-filter-section__header__clear-icon\">\n                <path d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\"/>\n            </svg>\n        </button>\n        \n    </span>\n\n    <span class=\"bizy-filter-section__options\">\n\n        <ng-content select=\"bizy-filter-section-checkbox-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-range-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-search-option\"></ng-content>\n\n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1;min-width:var(--bizy-filter-section-min-width)}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__options{overflow-y:auto!important}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.3rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;border:none;background-color:transparent;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;min-height:fit-content;max-height:15rem;overflow-y:hidden;overflow-x:hidden}.bizy-filter-section__header__clear-button{width:fit-content;height:fit-content;border:none;background-color:transparent;cursor:pointer}.bizy-filter-section__header__clear-icon{fill:var(--bizy-filter-section-clear-color);pointer-events:none;height:1rem}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { checkboxOptions: [{
                type: ContentChildren,
                args: [BizyFilterSectionCheckboxOptionComponent]
            }], rangeOption: [{
                type: ContentChild,
                args: [BizyFilterSectionRangeOptionComponent]
            }], searchOption: [{
                type: ContentChild,
                args: [BizyFilterSectionSearchOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizyFilterSectionsComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterSectionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyFilterSectionsComponent, isStandalone: true, selector: "bizy-filter-sections", ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;background-color:inherit;width:fit-content;max-width:90vw;grid-template-columns:repeat(auto-fit,minmax(var(--bizy-filter-section-min-width),1fr));display:grid;gap:2rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterSectionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-sections', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;background-color:inherit;width:fit-content;max-width:90vw;grid-template-columns:repeat(auto-fit,minmax(var(--bizy-filter-section-min-width),1fr));display:grid;gap:2rem}\n"] }]
        }] });

class BizyFilterComponent {
    document;
    ref;
    sections;
    id = `bizy-filter-${Math.random()}`;
    disabled = false;
    customClass = '';
    opened = false;
    onOpen = new EventEmitter();
    onChange = new EventEmitter();
    _filterWidth;
    _activated = false;
    #subscription = new Subscription();
    constructor(document, ref) {
        this.document = document;
        this.ref = ref;
    }
    ngAfterViewInit() {
        const mutationObserver = new MutationObserver(() => {
            if (this.sections && this.sections.length > 0) {
                const activatedSections = this.sections.filter(_section => _section.isActivated() === true);
                const activated = activatedSections.length > 0;
                if (this._activated !== activated) {
                    this._activated = activated;
                    this.onChange.emit(this._activated);
                    this.ref.detectChanges();
                }
                this.sections.forEach(_section => {
                    this.#subscription.add(_section.onSelect.subscribe(() => {
                        const activatedSections = this.sections.filter(_section => _section.isActivated() === true);
                        const activated = activatedSections.length > 0;
                        if (this._activated !== activated) {
                            this._activated = activated;
                            this.onChange.emit(this._activated);
                            this.ref.detectChanges();
                        }
                    }));
                });
                mutationObserver.disconnect();
            }
        });
        mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onOpen = (event) => {
        if (this.disabled) {
            return;
        }
        this.opened = !this.opened;
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._filterWidth = event.srcElement.offsetWidth;
        }
        this.onOpen.emit(event);
    };
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this.opened = false;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterComponent, deps: [{ token: DOCUMENT }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyFilterComponent, isStandalone: true, selector: "bizy-filter", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen", onChange: "onChange" }, queries: [{ propertyName: "sections", predicate: BizyFilterSectionComponent, descendants: true }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections-wrapper\">\n\n        <bizy-filter-sections>\n    \n            <ng-content select=\"bizy-filter-section\"></ng-content>\n    \n        </bizy-filter-sections>\n\n        <ng-content select=\"bizy-filter-content\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding);color:var(--bizy-filter-color);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections-wrapper{background-color:var(--bizy-filter-background-color);display:flex;flex-direction:column;overflow-y:auto;max-height:30rem;max-width:90vw;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "component", type: BizyFilterSectionsComponent, selector: "bizy-filter-sections" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter', imports: [
                        CommonModule,
                        OverlayModule,
                        BizyFilterSectionsComponent
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections-wrapper\">\n\n        <bizy-filter-sections>\n    \n            <ng-content select=\"bizy-filter-section\"></ng-content>\n    \n        </bizy-filter-sections>\n\n        <ng-content select=\"bizy-filter-content\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding);color:var(--bizy-filter-color);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections-wrapper{background-color:var(--bizy-filter-background-color);display:flex;flex-direction:column;overflow-y:auto;max-height:30rem;max-width:90vw;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { sections: [{
                type: ContentChildren,
                args: [BizyFilterSectionComponent, { descendants: true }]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], onOpen: [{
                type: Output
            }], onChange: [{
                type: Output
            }] } });

class BizyFilterContentComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyFilterContentComponent, isStandalone: true, selector: "bizy-filter-content", ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-content', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem}\n"] }]
        }] });

class BizyFilterPipe {
    transform(items, property, states) {
        if (!items || items.length === 0) {
            return [];
        }
        if (!property || typeof states === 'undefined' || states === null) {
            return items;
        }
        if (!Array.isArray(states)) {
            return items.filter(_item => _item[property] === states);
        }
        if (states.length === 0) {
            return items;
        }
        const _selected = states.filter(_state => _state.selected);
        if (_selected.length === states.length) {
            return items;
        }
        let output = [];
        states.forEach(state => {
            if (!state.selected) {
                return;
            }
            const res = items.filter(_item => {
                let _state = _item;
                const nestedProperty = property.split('.');
                nestedProperty.forEach(_property => {
                    _state = _state[_property];
                });
                if (typeof state.id === 'boolean') {
                    return Boolean(_state) === state.id;
                }
                if (Array.isArray(_state)) {
                    return _state.includes(state.id);
                }
                return _state === state.id;
            });
            output = output.concat(res);
        });
        function safeStringify(obj) {
            const seen = new WeakSet();
            function replacer(_key, value) {
                // Handle circular references
                if (typeof value === 'object' && value !== null) {
                    if (seen.has(value))
                        return '[Circular]';
                    seen.add(value);
                }
                // Handle BigInt
                if (typeof value === 'bigint')
                    return value.toString() + 'n';
                // Handle Symbol and Function
                if (typeof value === 'symbol')
                    return value.toString();
                if (typeof value === 'function')
                    return `[Function: ${value.name || 'anonymous'}]`;
                // Preserve Dates
                if (value instanceof Date)
                    return `__DATE__:${value.toISOString()}`;
                return value;
            }
            return JSON.stringify(obj, replacer);
        }
        function uniqueObjects(items) {
            const seen = new Set();
            const result = [];
            for (const item of items) {
                const str = safeStringify(item);
                if (!seen.has(str)) {
                    seen.add(str);
                    result.push(item);
                }
            }
            return result;
        }
        return uniqueObjects(output);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterPipe, isStandalone: true, name: "bizyFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyFilter'
                }]
        }] });

class BizyRangeFilterPipe {
    transform(items, property, range) {
        if (!items || items.length === 0) {
            return [];
        }
        if (!property || !range) {
            return items;
        }
        const min = range.min ?? null;
        const max = range.max ?? null;
        let itemsWithoutProperty = [];
        const output = items.filter(_item => {
            let _value = _item;
            const nestedProperty = property.split('.');
            for (let i = 0; i < nestedProperty.length; i++) {
                const _property = nestedProperty[i];
                if (typeof _value[_property] === 'undefined' || _value[_property] === null) {
                    itemsWithoutProperty.push(_item);
                    return false;
                }
                _value = _value[_property];
            }
            if (isNaN(_value)) {
                return false;
            }
            return (min === null || _value >= min) && (max === null || _value <= max);
        });
        return itemsWithoutProperty.length === items.length ? items : output;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRangeFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyRangeFilterPipe, isStandalone: true, name: "bizyRangeFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRangeFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyRangeFilter'
                }]
        }] });

const COMPONENTS$j = [
    BizyFilterComponent,
    BizyFilterSectionComponent,
    BizyFilterContentComponent,
    BizyFilterSectionCheckboxOptionComponent,
    BizyFilterSectionRangeOptionComponent,
    BizyFilterSectionSearchOptionComponent,
    BizyFilterSectionsComponent
];
const PIPES$1 = [
    BizyFilterPipe,
    BizyRangeFilterPipe
];
class BizyFilterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterModule, imports: [BizyFilterComponent,
            BizyFilterSectionComponent,
            BizyFilterContentComponent,
            BizyFilterSectionCheckboxOptionComponent,
            BizyFilterSectionRangeOptionComponent,
            BizyFilterSectionSearchOptionComponent,
            BizyFilterSectionsComponent, BizyFilterPipe,
            BizyRangeFilterPipe], exports: [BizyFilterComponent,
            BizyFilterSectionComponent,
            BizyFilterContentComponent,
            BizyFilterSectionCheckboxOptionComponent,
            BizyFilterSectionRangeOptionComponent,
            BizyFilterSectionSearchOptionComponent,
            BizyFilterSectionsComponent, BizyFilterPipe,
            BizyRangeFilterPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterModule, providers: PIPES$1, imports: [BizyFilterComponent,
            BizyFilterSectionComponent,
            BizyFilterSectionCheckboxOptionComponent,
            BizyFilterSectionRangeOptionComponent,
            BizyFilterSectionSearchOptionComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$j.concat(PIPES$1),
                    exports: COMPONENTS$j.concat(PIPES$1),
                    providers: PIPES$1
                }]
        }] });

class BizySelectOptionComponent {
    elementRef;
    ref;
    id = `bizy-select-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    onSelect = new EventEmitter();
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        this.#selected.next(selected);
    }
    #selected = new BehaviorSubject(false);
    get selected$() {
        return this.#selected.asObservable();
    }
    constructor(elementRef, ref) {
        this.elementRef = elementRef;
        this.ref = ref;
    }
    _onSelect() {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit();
        this.ref.detectChanges();
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.#selected.value;
    };
    getValue = () => {
        const value = this.elementRef?.nativeElement?.firstChild?.children[0]?.innerText;
        return value ?? '';
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySelectOptionComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySelectOptionComponent, isStandalone: true, selector: "bizy-select-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': (selected$ | async), 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color)}.bizy-select-option--selected{background-color:var(--bizy-select-option-selected-background-color)!important}.bizy-select-option--selected ::ng-deep .bizy-select-option__content *{color:var(--bizy-select-option-selected-color)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySelectOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select-option', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': (selected$ | async), 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color)}.bizy-select-option--selected{background-color:var(--bizy-select-option-selected-background-color)!important}.bizy-select-option--selected ::ng-deep .bizy-select-option__content *{color:var(--bizy-select-option-selected-color)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });

class BizySelectComponent {
    ref;
    #viewContainerRef = inject(ViewContainerRef);
    templatePortalContent;
    options;
    bizyInput;
    id = `bizy-select-${Math.random()}`;
    disabled = false;
    readonly = false;
    placeholder = '';
    customClass = '';
    opened = false;
    openedChange = new EventEmitter();
    onSelect = new EventEmitter();
    onOpen = new EventEmitter();
    _optionValue = '';
    optionPortal;
    templatePortal = null;
    #subscription = new Subscription();
    #contentChildrenSubscription = new Subscription();
    constructor(ref) {
        this.ref = ref;
    }
    get touched() {
        return this.bizyInput ? this.bizyInput.touched : false;
    }
    ngAfterViewInit() {
        this.templatePortal = new TemplatePortal(this.templatePortalContent, this.#viewContainerRef);
        this._optionValue = '';
        const option = this.options.find(_option => _option.getSelected());
        if (option) {
            this._optionValue = option.getValue();
        }
        this.options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(() => {
                this.close();
                this.ref.detectChanges();
            }));
            this.#subscription.add(_option.selected$.pipe(filter(_value => _value === true)).subscribe(() => {
                this._optionValue = _option.getValue();
                this.ref.detectChanges();
            }));
        });
        this.#contentChildrenSubscription.add(this.options.changes.subscribe(() => {
            this.#subscription.unsubscribe();
            this.#subscription = new Subscription();
            this.options.forEach(_option => {
                this.#subscription.add(_option.onSelect.subscribe(() => {
                    this.close();
                    this.ref.detectChanges();
                }));
                this.#subscription.add(_option.selected$.pipe(filter(_value => _value === true)).subscribe(() => {
                    this._optionValue = _option.getValue();
                    this.ref.detectChanges();
                }));
            });
        }));
        this.ref.detectChanges();
    }
    _onOpen(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.opened = !this.opened;
        this.onSelect.emit(event);
        this.openedChange.emit(this.opened);
        this.onOpen.emit(this.opened);
        if (this.bizyInput) {
            this.bizyInput.setFocus(true);
        }
        this.ref.detectChanges();
    }
    close = (event, select) => {
        if (select && event && event.target && event.target === select.bizyInputWrapper.nativeElement) {
            return;
        }
        this.opened = false;
        this.openedChange.emit(this.opened);
        this.onOpen.emit(this.opened);
        this.ref.detectChanges();
    };
    setTouched(touched) {
        if (this.bizyInput) {
            this.bizyInput.setTouched(touched);
            this.ref.detectChanges();
        }
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#contentChildrenSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySelectComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySelectComponent, isStandalone: true, selector: "bizy-select", inputs: { id: "id", disabled: "disabled", readonly: "readonly", placeholder: "placeholder", customClass: "customClass", opened: "opened" }, outputs: { openedChange: "openedChange", onSelect: "onSelect", onOpen: "onOpen" }, queries: [{ propertyName: "options", predicate: BizySelectOptionComponent }], viewQueries: [{ propertyName: "templatePortalContent", first: true, predicate: ["templatePortalContent"], descendants: true }, { propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<bizy-input\n    #bizyInput\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    [id]=\"id\"\n    [placeholder]=\"placeholder\"\n    [value]=\"_optionValue\"\n    [ngClass]=\"{'bizy-select--readonly': readonly}\"\n    (onSelect)=\"_onOpen($event); bizyInput?.setTouched(true)\"\n    (onEnter)=\"_onOpen($event); bizyInput?.setTouched(true)\"\n    class=\"bizy-select {{customClass}}\"\n    cdkOverlayOrigin\n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-select-arrow\"\n        *ngIf=\"!readonly\"\n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"prefix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n\n<span class=\"bizy-select__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n\n<ng-template #templatePortalContent>\n    <ng-content select=\"bizy-select-option\"></ng-content>\n</ng-template>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInput.getWidth()\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInput)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-template [cdkPortalOutlet]=\"templatePortal\"></ng-template>\n    \n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem;width:var(--bizy-select-width);min-width:var(--bizy-select-min-width);max-width:var(--bizy-select-max-width);display:flex;flex-direction:column;row-gap:.3rem;--bizy-input-focus-color: transparent}:host:has(>.bizy-select__errors:not(:empty)) ::ng-deep .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-select__errors:not(:empty)) ::ng-deep .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-select{--bizy-input-cursor: pointer;--bizy-input-background-color: var(--bizy-select-background-color);--bizy-input-color: var(--bizy-select-color)}.bizy-select--readonly{--bizy-input-cursor: default}.bizy-select__arrow{height:var(--bizy-select-arrow-height);pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-select-color)}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__options{background-color:var(--bizy-select-background-color);display:flex;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-select-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-select__options::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-select__options::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-select-scroll-bar-color)}.bizy-select__options::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-select-scroll-bar-hover-color)}.bizy-select__options::-webkit-scrollbar-button{height:1rem}.bizy-select__options__search{position:sticky;z-index:1;top:0}::ng-deep .bizy-select__options__search{--bizy-input-width: auto;--bizy-input-background-color: #fff;--bizy-input-min-width: var(--bizy-select-min-width);--bizy-input-max-width: auto;margin-bottom:.3rem}.bizy-select__errors:empty{display:none!important}::ng-deep .bizy-select__errors *{color:var(--bizy-input-invalid-color)!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "placeholder", "debounceTime", "rows", "disabled", "readonly", "autofocus", "value"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "ngmodule", type: PortalModule }, { kind: "directive", type: i3.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select', imports: [CommonModule, BizyInputComponent, OverlayModule, PortalModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-input\n    #bizyInput\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    [id]=\"id\"\n    [placeholder]=\"placeholder\"\n    [value]=\"_optionValue\"\n    [ngClass]=\"{'bizy-select--readonly': readonly}\"\n    (onSelect)=\"_onOpen($event); bizyInput?.setTouched(true)\"\n    (onEnter)=\"_onOpen($event); bizyInput?.setTouched(true)\"\n    class=\"bizy-select {{customClass}}\"\n    cdkOverlayOrigin\n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-select-arrow\"\n        *ngIf=\"!readonly\"\n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"prefix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n\n<span class=\"bizy-select__errors\" *ngIf=\"touched\">\n    <ng-content select=\"[slot=error]\"></ng-content>\n</span>\n\n<ng-template #templatePortalContent>\n    <ng-content select=\"bizy-select-option\"></ng-content>\n</ng-template>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"bizyInput.getWidth()\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event, bizyInput)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-template [cdkPortalOutlet]=\"templatePortal\"></ng-template>\n    \n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem;width:var(--bizy-select-width);min-width:var(--bizy-select-min-width);max-width:var(--bizy-select-max-width);display:flex;flex-direction:column;row-gap:.3rem;--bizy-input-focus-color: transparent}:host:has(>.bizy-select__errors:not(:empty)) ::ng-deep .bizy-input__bottom-line{background-color:var(--bizy-input-invalid-color)!important;visibility:visible!important}:host:has(>.bizy-select__errors:not(:empty)) ::ng-deep .bizy-input__content__input{color:var(--bizy-input-invalid-color)!important}.bizy-select{--bizy-input-cursor: pointer;--bizy-input-background-color: var(--bizy-select-background-color);--bizy-input-color: var(--bizy-select-color)}.bizy-select--readonly{--bizy-input-cursor: default}.bizy-select__arrow{height:var(--bizy-select-arrow-height);pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-select-color)}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__options{background-color:var(--bizy-select-background-color);display:flex;min-width:fit-content;width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:var(--bizy-select-height);overflow-y:auto;overflow-x:hidden;position:relative}.bizy-select__options::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-select__options::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-select-scroll-bar-color)}.bizy-select__options::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-select-scroll-bar-hover-color)}.bizy-select__options::-webkit-scrollbar-button{height:1rem}.bizy-select__options__search{position:sticky;z-index:1;top:0}::ng-deep .bizy-select__options__search{--bizy-input-width: auto;--bizy-input-background-color: #fff;--bizy-input-min-width: var(--bizy-select-min-width);--bizy-input-max-width: auto;margin-bottom:.3rem}.bizy-select__errors:empty{display:none!important}::ng-deep .bizy-select__errors *{color:var(--bizy-input-invalid-color)!important}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { templatePortalContent: [{
                type: ViewChild,
                args: ['templatePortalContent']
            }], options: [{
                type: ContentChildren,
                args: [BizySelectOptionComponent]
            }], bizyInput: [{
                type: ViewChild,
                args: ['bizyInput']
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], openedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onOpen: [{
                type: Output
            }] } });

class BizyFormComponent {
    inputs;
    selects;
    datePickers;
    id = `bizy-form-${Math.random()}`;
    customClass = '';
    onSubmit(event) {
        this.setTouched();
        event.preventDefault();
    }
    setTouched = () => {
        if (this.inputs.length > 0) {
            this.inputs.forEach(component => {
                component.setTouched(true);
            });
        }
        if (this.selects.length > 0) {
            this.selects.forEach(component => {
                component.setTouched(true);
            });
        }
        if (this.datePickers.length > 0) {
            this.datePickers.forEach(component => {
                component.setTouched(true);
            });
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyFormComponent, isStandalone: true, selector: "bizy-form", inputs: { id: "id", customClass: "customClass" }, queries: [{ propertyName: "inputs", predicate: BizyInputComponent, descendants: true }, { propertyName: "selects", predicate: BizySelectComponent, descendants: true }, { propertyName: "datePickers", predicate: BizyDatePickerComponent, descendants: true }], ngImport: i0, template: "<form class=\"bizy-form {{customClass}}\" [id]=\"id\" (ngSubmit)=\"onSubmit($event)\">\n    <ng-content></ng-content>\n</form>", styles: [":host{font-size:1rem;max-width:var(--bizy-form-max-width)}.bizy-form{max-width:inherit;display:flex;flex-direction:column;row-gap:var(--bizy-form-row-gap);--bizy-input-max-width: 100%;--bizy-select-max-width: 100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2$1.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-form', imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<form class=\"bizy-form {{customClass}}\" [id]=\"id\" (ngSubmit)=\"onSubmit($event)\">\n    <ng-content></ng-content>\n</form>", styles: [":host{font-size:1rem;max-width:var(--bizy-form-max-width)}.bizy-form{max-width:inherit;display:flex;flex-direction:column;row-gap:var(--bizy-form-row-gap);--bizy-input-max-width: 100%;--bizy-select-max-width: 100%}\n"] }]
        }], propDecorators: { inputs: [{
                type: ContentChildren,
                args: [BizyInputComponent, { descendants: true }]
            }], selects: [{
                type: ContentChildren,
                args: [BizySelectComponent, { descendants: true }]
            }], datePickers: [{
                type: ContentChildren,
                args: [BizyDatePickerComponent, { descendants: true }]
            }], id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

const COMPONENTS$i = [
    BizyFormComponent,
];
class BizyFormModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyFormModule, imports: [BizyFormComponent], exports: [BizyFormComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFormModule, imports: [COMPONENTS$i] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$i,
                    exports: COMPONENTS$i,
                }]
        }] });

class BizyGridForDirective {
    viewContainerRef = inject(ViewContainerRef);
    templateRef = inject(TemplateRef);
    #items = new BehaviorSubject([]);
    get items$() {
        return this.#items.asObservable();
    }
    set gridForOf(items) {
        this.#items.next(items);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyGridForDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyGridForDirective, isStandalone: true, selector: "[gridFor]", inputs: { gridForOf: "gridForOf" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyGridForDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gridFor]',
                }]
        }], propDecorators: { gridForOf: [{
                type: Input,
                args: ['gridForOf']
            }] } });

class BizyGridRowComponent {
    #elementRef = inject(ElementRef);
    #ref = inject(ChangeDetectorRef);
    #renderer = inject(Renderer2);
    rowHeight = 100; // Px
    set itemsPerRow(itemsPerRow) {
        if (!this.#elementRef.nativeElement) {
            return;
        }
        if (!itemsPerRow) {
            itemsPerRow = 1;
        }
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'gridTemplateRows', `${this.rowHeight}px`);
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'gridTemplateColumns', `repeat(${itemsPerRow}, minmax(0, 1fr)`);
        this.#ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyGridRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyGridRowComponent, isStandalone: true, selector: "bizy-grid-row", inputs: { rowHeight: "rowHeight", itemsPerRow: "itemsPerRow" }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:grid;column-gap:var(--bizy-grid-gap);margin-bottom:var(--bizy-grid-gap)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyGridRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-grid-row', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:grid;column-gap:var(--bizy-grid-gap);margin-bottom:var(--bizy-grid-gap)}\n"] }]
        }], propDecorators: { rowHeight: [{
                type: Input
            }], itemsPerRow: [{
                type: Input
            }] } });

class BizyGridComponent {
    ref;
    document;
    renderer;
    elementRef;
    content;
    gridDirective;
    resizeRef = null;
    #rowScrollingMutationObserver;
    #resizeObserver;
    #subscription = new Subscription();
    #view;
    notifier$ = new Subject();
    rowHeight = 100;
    itemRows = [];
    items = [];
    itemTemplate;
    itemsPerRow = 1;
    constructor(ref, document, renderer, elementRef) {
        this.ref = ref;
        this.document = document;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        if (this.gridDirective) {
            this.#initView();
        }
        else {
            this.#rowScrollingMutationObserver = new MutationObserver(() => {
                if (!this.gridDirective) {
                    return;
                }
                this.#initView();
                this.#rowScrollingMutationObserver.disconnect();
                this.ref.detectChanges();
            });
            this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });
        }
    }
    #initView = () => {
        this.#subscription.add(this.gridDirective.items$.subscribe(items => {
            if (this.items.length === 0 && items.length === 0) {
                return;
            }
            this.items = items;
            this.#updateView();
        }));
        if (!this.#view) {
            this.#view = this.gridDirective.viewContainerRef;
            this.#view.createEmbeddedView(this.content);
        }
        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
        const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
        this.#resizeObserver.observe(resizeRef);
        this.#subscription.add(this.notifier$.pipe(debounceTime$1(50)).subscribe(() => {
            this.#updateView();
        }));
    };
    #updateView = () => {
        this.itemTemplate = this.gridDirective.templateRef;
        const rowWidth = this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.firstChild.offsetWidth;
        let columnWidth = 100;
        const fontSize = Number(getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size').split('px')[0]);
        const rowHeightParameter = getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--bizy-grid-row-height');
        if (rowHeightParameter && rowHeightParameter.includes('rem')) {
            this.rowHeight = fontSize * Number(rowHeightParameter.split('rem')[0]);
        }
        else if (rowHeightParameter && rowHeightParameter.includes('px')) {
            this.rowHeight = Number(rowHeightParameter.split('px')[0]);
        }
        let gap = 10;
        const gapParameter = getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--bizy-grid-gap');
        if (gapParameter && gapParameter.includes('rem')) {
            gap = fontSize * Number(gapParameter.split('rem')[0]);
        }
        else if (gapParameter && gapParameter.includes('px')) {
            gap = Number(gapParameter.split('px')[0]);
        }
        const columnWidthParameter = getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--bizy-grid-column-width');
        if (columnWidthParameter && columnWidthParameter.includes('rem')) {
            columnWidth = fontSize * Number(columnWidthParameter.split('rem')[0]);
        }
        else if (columnWidthParameter && columnWidthParameter.includes('px')) {
            columnWidth = Number(columnWidthParameter.split('px')[0]);
        }
        columnWidth += gap;
        const count = Math.trunc(rowWidth / (columnWidth));
        if (Math.round((gap * (count - 1)) + (columnWidth * count)) <= (rowWidth)) {
            this.itemsPerRow = count <= 0 ? 1 : count;
        }
        else {
            this.itemsPerRow = (count - 1) <= 0 ? 1 : count - 1;
        }
        const itemRows = [];
        for (let i = 0; i < this.items.length; i += this.itemsPerRow) {
            const row = this.items.slice(i, i + this.itemsPerRow);
            itemRows.push(row);
        }
        this.itemRows = itemRows;
        this.ref.detectChanges();
    };
    trackById(index, item) {
        return item?.id ?? index;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#rowScrollingMutationObserver) {
            this.#rowScrollingMutationObserver.disconnect();
        }
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyGridComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: Renderer2 }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyGridComponent, isStandalone: true, selector: "bizy-grid", inputs: { resizeRef: "resizeRef" }, queries: [{ propertyName: "gridDirective", first: true, predicate: BizyGridForDirective, descendants: true }], viewQueries: [{ propertyName: "content", first: true, predicate: ["gridScrollingContent"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-grid\" [ngClass]=\"{'bizy-grid--empty': items && items.length === 0}\">\n\n    <cdk-virtual-scroll-viewport\n        class=\"bizy-grid__rows\"\n        [itemSize]=\"rowHeight\"\n        [minBufferPx]=\"rowHeight + (rowHeight * 5)\"\n        [maxBufferPx]=\"rowHeight + (rowHeight * 10)\">\n\n        <ng-content></ng-content>\n        \n        <ng-template #gridScrollingContent>\n            <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"itemRows\">\n                <bizy-grid-row [rowHeight]=\"rowHeight\" [itemsPerRow]=\"itemsPerRow\">\n                    <ng-container *ngFor=\"let it of item; trackBy: trackById\">\n                        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: it }\"></ng-template>\n                    </ng-container>\n                </bizy-grid-row>\n            </ng-template>\n        </ng-template>\n    </cdk-virtual-scroll-viewport>\n\n</div>\n", styles: [":host{display:inline-block!important;min-height:var(--bizy-grid-min-height);max-height:var(--bizy-grid-max-height);height:var(--bizy-grid-height);width:var(--bizy-grid-width);flex:1;overflow-x:auto;overflow-y:hidden;font-size:1rem}:host:has(.bizy-grid--empty){height:0!important;min-height:0!important;max-height:0!important}.bizy-grid{width:inherit;height:inherit;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-grid-background-color)}.bizy-grid__rows{width:100%;display:flex;flex-direction:column;min-width:fit-content;overflow-x:hidden}::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scroll-content-wrapper{min-width:100%;max-width:100%}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-grid-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-grid-scroll-bar-hover-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "directive", type: i2$2.ɵɵCdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2$2.ɵɵCdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2$2.ɵɵCdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "component", type: BizyGridRowComponent, selector: "bizy-grid-row", inputs: ["rowHeight", "itemsPerRow"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-grid', imports: [CommonModule, ScrollingModule, BizyGridRowComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-grid\" [ngClass]=\"{'bizy-grid--empty': items && items.length === 0}\">\n\n    <cdk-virtual-scroll-viewport\n        class=\"bizy-grid__rows\"\n        [itemSize]=\"rowHeight\"\n        [minBufferPx]=\"rowHeight + (rowHeight * 5)\"\n        [maxBufferPx]=\"rowHeight + (rowHeight * 10)\">\n\n        <ng-content></ng-content>\n        \n        <ng-template #gridScrollingContent>\n            <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"itemRows\">\n                <bizy-grid-row [rowHeight]=\"rowHeight\" [itemsPerRow]=\"itemsPerRow\">\n                    <ng-container *ngFor=\"let it of item; trackBy: trackById\">\n                        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: it }\"></ng-template>\n                    </ng-container>\n                </bizy-grid-row>\n            </ng-template>\n        </ng-template>\n    </cdk-virtual-scroll-viewport>\n\n</div>\n", styles: [":host{display:inline-block!important;min-height:var(--bizy-grid-min-height);max-height:var(--bizy-grid-max-height);height:var(--bizy-grid-height);width:var(--bizy-grid-width);flex:1;overflow-x:auto;overflow-y:hidden;font-size:1rem}:host:has(.bizy-grid--empty){height:0!important;min-height:0!important;max-height:0!important}.bizy-grid{width:inherit;height:inherit;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-grid-background-color)}.bizy-grid__rows{width:100%;display:flex;flex-direction:column;min-width:fit-content;overflow-x:hidden}::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scroll-content-wrapper{min-width:100%;max-width:100%}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-grid-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-grid-scroll-bar-hover-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }], propDecorators: { content: [{
                type: ViewChild,
                args: ['gridScrollingContent']
            }], gridDirective: [{
                type: ContentChild,
                args: [BizyGridForDirective]
            }], resizeRef: [{
                type: Input
            }] } });

const COMPONENTS$h = [
    BizyGridComponent,
    BizyGridRowComponent
];
const DIRECTIVES$2 = [
    BizyGridForDirective,
];
class BizyGridModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyGridModule, imports: [BizyGridComponent,
            BizyGridRowComponent, BizyGridForDirective], exports: [BizyGridComponent,
            BizyGridRowComponent, BizyGridForDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyGridModule, imports: [BizyGridComponent,
            BizyGridRowComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyGridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$h.concat(DIRECTIVES$2),
                    exports: COMPONENTS$h.concat(DIRECTIVES$2),
                }]
        }] });

const COMPONENTS$g = [
    BizyInputComponent,
    BizyInputOptionComponent
];
class BizyInputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyInputModule, imports: [BizyInputComponent,
            BizyInputOptionComponent], exports: [BizyInputComponent,
            BizyInputOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyInputModule, imports: [COMPONENTS$g] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$g,
                    exports: COMPONENTS$g,
                }]
        }] });

class BizyListComponent {
    id = `bizy-list-${Math.random()}`;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyListComponent, isStandalone: true, selector: "bizy-list", inputs: { id: "id" }, host: { properties: { "id": "id" } }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;height:var(--bizy-list-height);overflow:auto;width:var(--bizy-list-width);display:flex;flex-direction:var(--bizy-list-flex-direction);column-gap:var(--bizy-list-column-gap);row-gap:var(--bizy-list-row-gap);justify-content:var(--bizy-list-justify-content);align-items:var(--bizy-list-align-items)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-list', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[id]': 'id'
                    }, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;height:var(--bizy-list-height);overflow:auto;width:var(--bizy-list-width);display:flex;flex-direction:var(--bizy-list-flex-direction);column-gap:var(--bizy-list-column-gap);row-gap:var(--bizy-list-row-gap);justify-content:var(--bizy-list-justify-content);align-items:var(--bizy-list-align-items)}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }] } });

const COMPONENTS$f = [
    BizyListComponent,
];
class BizyListModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyListModule, imports: [BizyListComponent], exports: [BizyListComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyListModule, imports: [COMPONENTS$f] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$f,
                    exports: COMPONENTS$f,
                }]
        }] });

class BizyMenuOptionComponent {
    id = `bizy-menu-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyMenuOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyMenuOptionComponent, isStandalone: true, selector: "bizy-menu-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-menu-option--selected': selected, 'bizy-menu-option--disabled': disabled}\"\n    class=\"bizy-menu-option {{customClass}}\">\n\n    <span class=\"bizy-menu-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<span class=\"bizy-menu-option__menu\">\n    <ng-content select=\"bizy-menu\"></ng-content>\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu-option__menu:not(:empty)) .bizy-menu-option{display:none!important}.bizy-menu-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-menu-option-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-menu-option-color);cursor:pointer}.bizy-menu-option:hover{background-color:var(--bizy-menu-option-hover-background-color)}.bizy-menu-option--selected{color:var(--bizy-menu-option-selected-color)!important;background-color:var(--bizy-menu-option-selected-background-color)!important}::ng-deep .bizy-menu-option--selected *{color:var(--bizy-menu-option-selected-color)!important}.bizy-menu-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-menu-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;width:100%}::ng-deep .bizy-menu-option__menu *{color:var(--bizy-menu-option-color);fill:var(--bizy-menu-option-color)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyMenuOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu-option', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-menu-option--selected': selected, 'bizy-menu-option--disabled': disabled}\"\n    class=\"bizy-menu-option {{customClass}}\">\n\n    <span class=\"bizy-menu-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<span class=\"bizy-menu-option__menu\">\n    <ng-content select=\"bizy-menu\"></ng-content>\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu-option__menu:not(:empty)) .bizy-menu-option{display:none!important}.bizy-menu-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-menu-option-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-menu-option-color);cursor:pointer}.bizy-menu-option:hover{background-color:var(--bizy-menu-option-hover-background-color)}.bizy-menu-option--selected{color:var(--bizy-menu-option-selected-color)!important;background-color:var(--bizy-menu-option-selected-background-color)!important}::ng-deep .bizy-menu-option--selected *{color:var(--bizy-menu-option-selected-color)!important}.bizy-menu-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-menu-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;width:100%}::ng-deep .bizy-menu-option__menu *{color:var(--bizy-menu-option-color);fill:var(--bizy-menu-option-color)}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizyMenuComponent {
    #ref = inject(ChangeDetectorRef);
    options;
    id = `bizy-menu-${Math.random()}`;
    disabled = false;
    offsetX = 0;
    offsetY = 0;
    customClass = '';
    hideArrow = false;
    opened = false;
    onSelect = new EventEmitter();
    _menuWidth;
    #subscription = new Subscription();
    bizyMenuOptionsId = 'bizyMenuOptionsId';
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
        if (this.options && this.options.length > 0) {
            this.selectButton(event);
        }
    }
    selectButton(event) {
        this.opened = !this.opened;
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._menuWidth = event.srcElement.offsetWidth;
        }
        if (this.opened) {
            this.#subscription = new Subscription();
            this.#subscription.add(fromEvent(window, 'scroll', { capture: true }).subscribe(() => {
                if (event && event.target && event.target.id && (event.target.id === this.id || event.target.id === this.bizyMenuOptionsId)) {
                    return;
                }
                this.opened = false;
                this.#ref.detectChanges();
                this.#subscription.unsubscribe();
            }));
            if (this.options) {
                this.options.forEach((option) => {
                    this.#subscription.add(option.onSelect.subscribe(event => {
                        this.close(event);
                    }));
                });
            }
        }
        else {
            this.#subscription.unsubscribe();
        }
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this.opened = false;
        this.#subscription.unsubscribe();
        this.#ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyMenuComponent, isStandalone: true, selector: "bizy-menu", inputs: { id: "id", disabled: "disabled", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", hideArrow: "hideArrow", opened: "opened" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizyMenuOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\"\n        *ngIf=\"!hideArrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayPush]=\"true\"\n    [cdkConnectedOverlayFlexibleDimensions]=\"true\"\n    [cdkConnectedOverlayViewportMargin]=\"8\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\" [id]=\"bizyMenuOptionsId\">\n\n        <span class=\"bizy-menu__options__header\">\n            <ng-content select=\"bizy-menu-title\"></ng-content>\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu__options:empty) .bizy-menu>.bizy-menu__arrow{display:none!important}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:var(--bizy-menu-padding);color:var(--bizy-menu-color);cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:var(--bizy-menu-arrow-height);pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-menu-color)}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color);min-width:var(--bizy-menu-min-width);max-width:var(--bizy-menu-max-width);max-height:var(--bizy-menu-max-height);overflow-y:auto;overflow-x:hidden;width:100%;display:flex;flex-direction:column;position:relative;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-menu__options::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-menu__options::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-menu-scroll-bar-color)}.bizy-menu__options::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-menu-scroll-bar-hover-color)}.bizy-menu__options::-webkit-scrollbar-button{height:1rem}.bizy-menu__options__header{position:sticky;z-index:1;top:0;display:flex;flex-direction:column;row-gap:.3rem;background-color:#fff}::ng-deep .bizy-menu__options__header{--bizy-input-width: auto;--bizy-input-background-color: #fff;--bizy-input-min-width: var(--bizy-select-min-width);--bizy-input-max-width: auto}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu', imports: [CommonModule, FormsModule, OverlayModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\"\n        *ngIf=\"!hideArrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayPush]=\"true\"\n    [cdkConnectedOverlayFlexibleDimensions]=\"true\"\n    [cdkConnectedOverlayViewportMargin]=\"8\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\" [id]=\"bizyMenuOptionsId\">\n\n        <span class=\"bizy-menu__options__header\">\n            <ng-content select=\"bizy-menu-title\"></ng-content>\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu__options:empty) .bizy-menu>.bizy-menu__arrow{display:none!important}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:var(--bizy-menu-padding);color:var(--bizy-menu-color);cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:var(--bizy-menu-arrow-height);pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-menu-color)}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color);min-width:var(--bizy-menu-min-width);max-width:var(--bizy-menu-max-width);max-height:var(--bizy-menu-max-height);overflow-y:auto;overflow-x:hidden;width:100%;display:flex;flex-direction:column;position:relative;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-menu__options::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-menu__options::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-menu-scroll-bar-color)}.bizy-menu__options::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-menu-scroll-bar-hover-color)}.bizy-menu__options::-webkit-scrollbar-button{height:1rem}.bizy-menu__options__header{position:sticky;z-index:1;top:0;display:flex;flex-direction:column;row-gap:.3rem;background-color:#fff}::ng-deep .bizy-menu__options__header{--bizy-input-width: auto;--bizy-input-background-color: #fff;--bizy-input-min-width: var(--bizy-select-min-width);--bizy-input-max-width: auto}\n"] }]
        }], propDecorators: { options: [{
                type: ContentChildren,
                args: [BizyMenuOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], offsetX: [{
                type: Input
            }], offsetY: [{
                type: Input
            }], customClass: [{
                type: Input
            }], hideArrow: [{
                type: Input
            }], opened: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizyMenuTitleComponent {
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyMenuTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyMenuTitleComponent, isStandalone: true, selector: "bizy-menu-title", inputs: { customClass: "customClass" }, ngImport: i0, template: "<span class=\"bizy-menu-title {{customClass}}\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem}.bizy-menu-title{background-color:var(--bizy-menu-title-background-color);color:var(--bizy-menu-title-color);padding:.5rem;cursor:default;text-decoration:underline .1rem var(--bizy-menu-title-underline-color);text-underline-offset:.3rem;display:flex;align-items:center}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyMenuTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-menu-title {{customClass}}\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem}.bizy-menu-title{background-color:var(--bizy-menu-title-background-color);color:var(--bizy-menu-title-color);padding:.5rem;cursor:default;text-decoration:underline .1rem var(--bizy-menu-title-underline-color);text-underline-offset:.3rem;display:flex;align-items:center}\n"] }]
        }], propDecorators: { customClass: [{
                type: Input
            }] } });

const COMPONENTS$e = [
    BizyMenuComponent,
    BizyMenuOptionComponent,
    BizyMenuTitleComponent
];
class BizyMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyMenuModule, imports: [BizyMenuComponent,
            BizyMenuOptionComponent,
            BizyMenuTitleComponent], exports: [BizyMenuComponent,
            BizyMenuOptionComponent,
            BizyMenuTitleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyMenuModule, imports: [BizyMenuComponent,
            BizyMenuOptionComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$e,
                    exports: COMPONENTS$e,
                }]
        }] });

const EMPTY_CHART = [0];
const MIN_CHART_SIZE = 350; // px;
class BizyPieChartComponent {
    elementRef;
    document;
    ref;
    renderer;
    resizeRef = null;
    tooltip = true;
    type = 'pie';
    download = { hide: false, label: 'Descargar', name: 'Bizy' };
    onLabelFormatter;
    onTooltipFormatter;
    onSelect = new EventEmitter();
    onDownload = new EventEmitter();
    #echarts = null;
    #mutationObserver = null;
    #resizeObserver = null;
    #subscription = new Subscription();
    #chartContainer = null;
    #afterViewInit = new BehaviorSubject(false);
    #resize$ = new Subject();
    #data = EMPTY_CHART;
    constructor(elementRef, document, ref, renderer) {
        this.elementRef = elementRef;
        this.document = document;
        this.ref = ref;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.elementRef && this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.offsetHeight)) {
                this.#afterViewInit.next(true);
                this.#mutationObserver.disconnect();
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    set data(data) {
        if (!data) {
            return;
        }
        if (data.length > 0) {
            this.#setChartData(data);
        }
        else {
            this.#deleteChartContainer();
            this.#setChartData(EMPTY_CHART);
        }
    }
    async #setChartData(data) {
        this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
            this.#createChartContainer();
            if (!this.#chartContainer) {
                return;
            }
            if (data && data.length > 0 && data[0] !== 0) {
                this.#data = [];
                data.forEach(_d => {
                    if (!_d.value) {
                        _d.value = 0;
                    }
                    if (!_d.name) {
                        _d.name = '---';
                    }
                    const itemStyle = _d.color ? { color: _d.color } : {};
                    this.#data.push({
                        name: _d.name,
                        value: _d.value,
                        itemStyle
                    });
                });
            }
            else {
                this.#data = EMPTY_CHART;
            }
            const itemStyle = this.type === 'pie' ? {
                emphasis: {
                    label: {
                        show: true
                    }
                },
                normal: {
                    label: {
                        position: 'outer',
                        formatter: this.onLabelFormatter
                    },
                    labelLine: {
                        show: true
                    }
                }
            } :
                {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                };
            const label = this.type === 'pie' ? undefined : { show: false, position: 'center' };
            const series = [{
                    type: 'pie',
                    radius: this.type === 'pie' ? '50%' : ['40%', '55%'],
                    center: ['50%', '50%'],
                    data: this.#data,
                    itemStyle,
                    label
                }];
            const textColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-color') ?? '#000';
            const textBackgroundColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-background-color') ?? '#fff';
            const borderColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-border-color') ?? '#fff';
            const toolbox = {
                show: true,
                feature: {
                    mySaveAsImage: {
                        show: !this.download.hide,
                        icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
                        title: this.download.label,
                        onclick: () => {
                            setTimeout(() => {
                                html2canvas(this.#chartContainer).then(canvas => {
                                    var link = document.createElement('a');
                                    link.href = canvas.toDataURL('image/png');
                                    link.download = `${this.download.name}.png`;
                                    this.renderer.appendChild(this.document.body, link);
                                    link.click();
                                    this.renderer.removeChild(this.document.body, link);
                                    this.onDownload.emit();
                                });
                            }, 500);
                        }
                    }
                },
                emphasis: {
                    iconStyle: {
                        color: textColor,
                        borderColor,
                        borderWidth: 1,
                        textBackgroundColor,
                        textPadding: 5,
                    }
                }
            };
            const tooltip = {
                show: this.tooltip,
                trigger: 'item',
                appendToBody: true,
                formatter: this.onTooltipFormatter
            };
            const legend = this.type === 'pie' ? { show: false } : { show: true, orient: 'vertical', left: 'left' };
            const option = {
                tooltip,
                toolbox,
                legend,
                series
            };
            this.#echarts = echarts.init(this.#chartContainer);
            this.#echarts.setOption(option);
            this.#echarts.on('click', params => {
                this.onSelect.emit(params.name);
            });
            this.#resizeObserver = new ResizeObserver(() => this.#resize$.next());
            const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
            this.#resizeObserver.observe(resizeRef);
            this.#subscription.add(this.#resize$.pipe(skip(1), auditTime(300), throttleTime(500)).subscribe(() => {
                this.#deleteChartContainer();
                this.#createChartContainer();
                if (!this.#chartContainer) {
                    return;
                }
                this.#echarts = echarts.init(this.#chartContainer);
                this.#echarts.setOption({ ...option, series: option.series.map(_serie => { return { ..._serie, data: this.#data }; }) });
                this.#echarts.on('click', params => {
                    this.onSelect.emit(params.name);
                });
            }));
        }));
    }
    #createChartContainer = () => {
        if (this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
            return;
        }
        let elementWidth = this.elementRef.nativeElement.offsetWidth || MIN_CHART_SIZE;
        let elementHeight = this.elementRef.nativeElement.offsetHeight || MIN_CHART_SIZE;
        let minWidth = MIN_CHART_SIZE;
        let minHeight = MIN_CHART_SIZE;
        const chartMinWidth = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-width');
        const pieChartMinHeight = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-height');
        if (Number(chartMinWidth)) {
            minWidth = Number(chartMinWidth);
        }
        if (Number(pieChartMinHeight)) {
            minHeight = Number(pieChartMinHeight);
        }
        const width = Math.max(elementWidth, minWidth);
        const height = Math.max(elementHeight, minHeight);
        this.#chartContainer = this.renderer.createElement('div');
        this.renderer.setStyle(this.#chartContainer, 'width', `${width}px`);
        this.renderer.setStyle(this.#chartContainer, 'height', `${height}px`);
        this.renderer.appendChild(this.elementRef.nativeElement, this.#chartContainer);
        this.ref.detectChanges();
    };
    #deleteChartContainer = () => {
        if (!this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
            return;
        }
        this.#echarts.clear();
        this.renderer.removeChild(this.elementRef.nativeElement, this.#chartContainer);
        this.#chartContainer = null;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
        if (this.#echarts) {
            this.#echarts.clear();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPieChartComponent, deps: [{ token: ElementRef }, { token: DOCUMENT }, { token: ChangeDetectorRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyPieChartComponent, isStandalone: true, selector: "bizy-pie-chart", inputs: { resizeRef: "resizeRef", tooltip: "tooltip", type: "type", download: "download", onLabelFormatter: "onLabelFormatter", onTooltipFormatter: "onTooltipFormatter", data: "data" }, outputs: { onSelect: "onSelect", onDownload: "onDownload" }, ngImport: i0, template: '', isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPieChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-pie-chart',
                    template: '',
                    imports: [CommonModule],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }], propDecorators: { resizeRef: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], type: [{
                type: Input
            }], download: [{
                type: Input
            }], onLabelFormatter: [{
                type: Input
            }], onTooltipFormatter: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], onDownload: [{
                type: Output
            }], data: [{
                type: Input
            }] } });

const COMPONENTS$d = [
    BizyPieChartComponent,
];
class BizyPieChartModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPieChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyPieChartModule, imports: [BizyPieChartComponent], exports: [BizyPieChartComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPieChartModule, imports: [COMPONENTS$d] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPieChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$d,
                    exports: COMPONENTS$d,
                }]
        }] });

class BizyPopupWrapperComponent {
    dynamicComponentContainer;
    #data = inject(DIALOG_DATA);
    #dialogRef = inject(DialogRef);
    #popup = inject(BizyPopupService);
    #ref = inject(ChangeDetectorRef);
    disabled = false;
    disableClose = false;
    disableDrag = false;
    position = null;
    ngOnInit() {
        if (this.#data) {
            if (this.#data.position) {
                this.position = this.#data.position;
            }
            if (this.#data.disableClose) {
                this.disableClose = this.#data.disableClose;
            }
            if (this.#data.disableDrag) {
                this.disableDrag = this.#data.disableDrag;
            }
        }
    }
    ngAfterViewInit() {
        this.loadDynamicComponent();
    }
    loadDynamicComponent = () => {
        if (this.#data && this.#data.component) {
            this.dynamicComponentContainer.clear();
            this.dynamicComponentContainer.createComponent(this.#data.component);
            this.#ref.detectChanges();
        }
    };
    async close() {
        this.disabled = true;
        this.#popup.close({ id: this.#dialogRef.id });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPopupWrapperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyPopupWrapperComponent, isStandalone: true, selector: "bizy-popup-wrapper", host: { properties: { "style.top": "position && position.top ? position.top : position ? \"\" : \"50%\"", "style.right": "position && position.right ? position.right : position ? \"\" : \"50%\"", "style.bottom": "position && position.bottom ? position.bottom : position ? \"\" : \"50%\"", "style.left": "position && position.left ? position.left : position ? \"\" : \"50%\"", "style.transform": "position ? \"\" : \"translate(-50%, -50%)\"" } }, viewQueries: [{ propertyName: "dynamicComponentContainer", first: true, predicate: ["dynamicComponentContainer"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<div class=\"bizy-popup-wrapper\" cdkDrag *ngIf=\"!disableDrag\">\n\n    <button class=\"bizy-popup-wrapper__drag-button\" cdkDragHandle>\n\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"bizy-popup-wrapper__drag-button__icon\">\n            <path d=\"M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z\"/>\n        </svg>\n\n    </button>\n\n    <button *ngIf=\"!disableClose\" class=\"bizy-popup-wrapper__close-button\" (click)=\"close()\" (keyup.enter)=\"close()\">\n\n\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" class=\"bizy-popup-wrapper__close-button__icon\">\n            <path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>\n\n<div class=\"bizy-popup-wrapper\" *ngIf=\"disableDrag\">\n\n    <button *ngIf=\"!disableClose\" class=\"bizy-popup-wrapper__close-button\" (click)=\"close()\" (keyup.enter)=\"close()\">\n\n\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" class=\"bizy-popup-wrapper__close-button__icon\">\n            <path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>", styles: [":host{font-size:1rem;position:fixed!important;min-height:150px;min-width:150px;width:fit-content;height:fit-content;z-index:10}.bizy-popup-wrapper{position:relative;padding:var(--bizy-popup-padding);background-color:var(--bizy-popup-background-color);min-width:var(--bizy-popup-min-width);width:var(--bizy-popup-width);max-width:var(--bizy-popup-max-width)}.bizy-popup-wrapper__drag-button{position:absolute;left:-.9rem;top:-.9rem;border:var(--bizy-popup-drag-button-border);border-radius:50%;padding:.2rem;place-items:center;display:grid;background-color:var(--bizy-popup-drag-button-background-color);cursor:pointer;transition:transform .2s;z-index:1}.bizy-popup-wrapper__drag-button:hover{transform:scale(1.1)}.bizy-popup-wrapper__drag-button__icon{height:1rem}.bizy-popup-wrapper__drag-button__icon{fill:var(--bizy-popup-drag-button-color)}.bizy-popup-wrapper__close-button{position:absolute;right:-.9rem;top:-.9rem;border:var(--bizy-popup-close-button-border);border-radius:50%;padding:.25rem .35rem;place-items:center;display:grid;background-color:var(--bizy-popup-close-button-background-color);cursor:pointer;transition:transform .2s;z-index:1}.bizy-popup-wrapper__close-button:hover .bizy-popup-wrapper__close-button__icon{transform:scale(1.1)}.bizy-popup-wrapper__close-button:hover .bizy-popup-wrapper__close-button__icon{fill:var(--bizy-popup-close-button-hover-color)}.bizy-popup-wrapper__close-button__icon{height:1rem;transition:fill .2s ease,}.bizy-popup-wrapper__close-button__icon{fill:var(--bizy-popup-close-button-color)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: DialogModule }, { kind: "ngmodule", type: DragDropModule }, { kind: "directive", type: i2$3.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer", "cdkDragScale"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "directive", type: i2$3.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPopupWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-popup-wrapper', imports: [CommonModule, DialogModule, DragDropModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[style.top]': 'position && position.top ? position.top : position ? "" : "50%"',
                        '[style.right]': 'position && position.right ? position.right : position ? "" : "50%"',
                        '[style.bottom]': 'position && position.bottom ? position.bottom : position ? "" : "50%"',
                        '[style.left]': 'position && position.left ? position.left : position ? "" : "50%"',
                        '[style.transform]': 'position ? "" : "translate(-50%, -50%)"'
                    }, template: "<div class=\"bizy-popup-wrapper\" cdkDrag *ngIf=\"!disableDrag\">\n\n    <button class=\"bizy-popup-wrapper__drag-button\" cdkDragHandle>\n\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"bizy-popup-wrapper__drag-button__icon\">\n            <path d=\"M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z\"/>\n        </svg>\n\n    </button>\n\n    <button *ngIf=\"!disableClose\" class=\"bizy-popup-wrapper__close-button\" (click)=\"close()\" (keyup.enter)=\"close()\">\n\n\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" class=\"bizy-popup-wrapper__close-button__icon\">\n            <path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>\n\n<div class=\"bizy-popup-wrapper\" *ngIf=\"disableDrag\">\n\n    <button *ngIf=\"!disableClose\" class=\"bizy-popup-wrapper__close-button\" (click)=\"close()\" (keyup.enter)=\"close()\">\n\n\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" class=\"bizy-popup-wrapper__close-button__icon\">\n            <path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>", styles: [":host{font-size:1rem;position:fixed!important;min-height:150px;min-width:150px;width:fit-content;height:fit-content;z-index:10}.bizy-popup-wrapper{position:relative;padding:var(--bizy-popup-padding);background-color:var(--bizy-popup-background-color);min-width:var(--bizy-popup-min-width);width:var(--bizy-popup-width);max-width:var(--bizy-popup-max-width)}.bizy-popup-wrapper__drag-button{position:absolute;left:-.9rem;top:-.9rem;border:var(--bizy-popup-drag-button-border);border-radius:50%;padding:.2rem;place-items:center;display:grid;background-color:var(--bizy-popup-drag-button-background-color);cursor:pointer;transition:transform .2s;z-index:1}.bizy-popup-wrapper__drag-button:hover{transform:scale(1.1)}.bizy-popup-wrapper__drag-button__icon{height:1rem}.bizy-popup-wrapper__drag-button__icon{fill:var(--bizy-popup-drag-button-color)}.bizy-popup-wrapper__close-button{position:absolute;right:-.9rem;top:-.9rem;border:var(--bizy-popup-close-button-border);border-radius:50%;padding:.25rem .35rem;place-items:center;display:grid;background-color:var(--bizy-popup-close-button-background-color);cursor:pointer;transition:transform .2s;z-index:1}.bizy-popup-wrapper__close-button:hover .bizy-popup-wrapper__close-button__icon{transform:scale(1.1)}.bizy-popup-wrapper__close-button:hover .bizy-popup-wrapper__close-button__icon{fill:var(--bizy-popup-close-button-hover-color)}.bizy-popup-wrapper__close-button__icon{height:1rem;transition:fill .2s ease,}.bizy-popup-wrapper__close-button__icon{fill:var(--bizy-popup-close-button-color)}\n"] }]
        }], propDecorators: { dynamicComponentContainer: [{
                type: ViewChild,
                args: ['dynamicComponentContainer', { read: ViewContainerRef }]
            }] } });

var BIZY_ANIMATION;
(function (BIZY_ANIMATION) {
    BIZY_ANIMATION["FADE_IN"] = "fade-in";
    BIZY_ANIMATION["FADE_OUT"] = "fade-out";
    BIZY_ANIMATION["FADE_IN_UP"] = "fade-in-up";
    BIZY_ANIMATION["FADE_IN_RIGHT"] = "fade-in-right";
    BIZY_ANIMATION["FADE_IN_DOWN"] = "fade-in-down";
    BIZY_ANIMATION["FADE_IN_LEFT"] = "fade-in-left";
    BIZY_ANIMATION["SLIDE_IN_UP"] = "slide-in-up";
    BIZY_ANIMATION["SLIDE_IN_RIGHT"] = "slide-in-right";
    BIZY_ANIMATION["SLIDE_IN_DOWN"] = "slide-in-down";
    BIZY_ANIMATION["SLIDE_IN_LEFT"] = "slide-in-left";
    BIZY_ANIMATION["SLIDE_OUT_UP"] = "slide-out-up";
    BIZY_ANIMATION["SLIDE_OUT_DOWN"] = "slide-out-down";
    BIZY_ANIMATION["SLIDE_OUT_RIGHT"] = "slide-out-right";
    BIZY_ANIMATION["SLIDE_OUT_LEFT"] = "slide-out-left";
})(BIZY_ANIMATION || (BIZY_ANIMATION = {}));
class BizyAnimationService {
    rendererFactory;
    #renderer;
    constructor(rendererFactory) {
        this.rendererFactory = rendererFactory;
        this.#renderer = this.rendererFactory.createRenderer(null, null);
    }
    setAnimation(element, animation) {
        return new Promise(resolve => {
            if (!element || !animation || !this.#renderer) {
                return;
            }
            const root = this.#renderer.selectRootElement(':root', true);
            const animationTimeout = getComputedStyle(root).getPropertyValue('--bizy-animation-timeout').trim();
            this.#renderer.addClass(element, 'animated');
            this.#renderer.addClass(element, animation);
            setTimeout(() => {
                this.#renderer.removeClass(element, 'animated');
                this.#renderer.removeClass(element, animation);
                resolve();
            }, Number(animationTimeout.match(/\d/g).join('')));
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAnimationService, deps: [{ token: RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAnimationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAnimationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i0.RendererFactory2, decorators: [{
                    type: Inject,
                    args: [RendererFactory2]
                }] }] });

class BizyViewportService {
    window;
    #viewportSizeChanged;
    get sizeChange$() {
        return this.#viewportSizeChanged.asObservable();
    }
    constructor(window) {
        this.window = window;
        this.#viewportSizeChanged = new BehaviorSubject({
            width: this.window.innerWidth,
            height: this.window.innerHeight
        });
        fromEvent(window, 'resize')
            .pipe(debounceTime(200), map((event) => ({
            width: event.currentTarget.innerWidth,
            height: event.currentTarget.innerHeight
        })))
            .subscribe(windowSize => {
            this.#viewportSizeChanged.next(windowSize);
        });
    }
    width() {
        return this.window.screen.availWidth;
    }
    height() {
        return this.window.screen.availHeight;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyViewportService, deps: [{ token: Window }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyViewportService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyViewportService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: Window, decorators: [{
                    type: Inject,
                    args: [Window]
                }] }] });

class BizyKeyboardService {
    document;
    #shiftHolding = new BehaviorSubject(false);
    #controlHolding = new BehaviorSubject(false);
    get shiftHolding$() {
        return this.#shiftHolding.asObservable();
    }
    get controlHolding$() {
        return this.#controlHolding.asObservable();
    }
    constructor(document) {
        this.document = document;
        this.document.addEventListener('visibilitychange', () => {
            this.#shiftHolding.next(false);
            this.#controlHolding.next(false);
        });
        this.document.addEventListener('keydown', (event) => {
            if (event.key === 'Shift') {
                this.#shiftHolding.next(true);
            }
            if (event.key === 'Meta' || event.key === 'Control') {
                this.#controlHolding.next(true);
            }
        });
        this.document.addEventListener('keyup', (event) => {
            if (event.key === 'Shift') {
                this.#shiftHolding.next(false);
            }
            if (event.key === 'Meta' || event.key === 'Control') {
                this.#controlHolding.next(false);
            }
        });
    }
    isShiftHolding() {
        return this.#shiftHolding.value;
    }
    isControlHolding() {
        return this.#controlHolding.value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyKeyboardService, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyKeyboardService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyKeyboardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });

class BizyExportToCSVService {
    document;
    rendererFactory;
    #loading = false;
    #renderer;
    constructor(document, rendererFactory) {
        this.document = document;
        this.rendererFactory = rendererFactory;
        this.#renderer = this.rendererFactory.createRenderer(null, null);
    }
    download(data) {
        if (this.#loading || !data.items || !Array.isArray(data.items) || !data.model) {
            return;
        }
        try {
            this.#loading = true;
            const csv = this.getCSV(data);
            if (!data.fileName) {
                data.fileName = 'bizy-csv';
            }
            this.#downloadCSV({ csv, fileName: data.fileName });
        }
        finally {
            this.#loading = false;
        }
    }
    getCSV(data) {
        let csv = '';
        function escapeCommas(str) {
            return str.includes(',') ? `"${str}"` : str;
        }
        for (const key in data.model) {
            if (key) {
                csv += `${data.model[key]},`;
            }
        }
        data.items.forEach(_item => {
            // Remove the last character (',')
            csv = csv.slice(0, -1);
            csv += '\n';
            for (const key in data.model) {
                let value = _item;
                const nestedProperty = key.split('.');
                for (let i = 0; i < nestedProperty.length; i++) {
                    const _property = nestedProperty[i];
                    if (value) {
                        value = value[_property];
                    }
                    else {
                        break;
                    }
                }
                if (typeof value !== undefined && value !== null) {
                    csv += `${escapeCommas(String(value).replace(/\n/g, ''))},`;
                }
                else {
                    csv += ',';
                }
            }
        });
        if (csv && csv[csv.length - 1] === ',') {
            // Remove the last character (',')
            csv = csv.slice(0, -1);
        }
        return csv;
    }
    #downloadCSV(data) {
        const blob = new Blob([data.csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const downloadButton = this.#renderer.createElement('a');
        downloadButton.setAttribute('download', data.fileName);
        downloadButton.href = url;
        this.#renderer.appendChild(this.document.body, downloadButton);
        downloadButton.click();
        this.#renderer.removeChild(this.document.body, downloadButton);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyExportToCSVService, deps: [{ token: DOCUMENT }, { token: RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyExportToCSVService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyExportToCSVService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2, decorators: [{
                    type: Inject,
                    args: [RendererFactory2]
                }] }] });

class BizyRouterService {
    router;
    static backPath = '';
    transitionsEnd$;
    transitionsStart$;
    popStateEvent$;
    routeChange$;
    constructor(router) {
        this.router = router;
        this.transitionsEnd$ = this.router.events.pipe(filter$1(event => event instanceof NavigationEnd), map((event) => event.id), distinctUntilChanged(), map(() => this.router.routerState.snapshot.root));
        this.transitionsStart$ = this.router.events.pipe(filter$1(event => event instanceof NavigationStart), map((event) => event.id), distinctUntilChanged(), map(() => this.router.routerState.snapshot.root));
        this.popStateEvent$ = fromEvent(window, 'popstate');
        this.routeChange$ = merge(this.transitionsEnd$, this.popStateEvent$).pipe(map(() => void 0));
    }
    getURL() {
        return window.location.pathname;
    }
    getBackPath() {
        return BizyRouterService.backPath;
    }
    getId(activatedRoute, param) {
        return activatedRoute.snapshot.paramMap.get(param);
    }
    getQueryParam(activatedRoute, param) {
        return activatedRoute.snapshot.queryParamMap.get(param);
    }
    getAllQueryParam() {
        const params = new URL(window.location.href).searchParams;
        const queryParams = {};
        for (const [key, value] of params.entries()) {
            queryParams[key] = value;
        }
        return queryParams;
    }
    goTo(data) {
        if (data.replace) {
            BizyRouterService.backPath = '';
        }
        else {
            BizyRouterService.backPath = this.getURL();
        }
        if (data.path[0] === '/') {
            this.router.navigateByUrl(`${data.path}${this._serialize(data.params)}`, { replaceUrl: data.replace ?? false, skipLocationChange: data.skip ?? false });
            return;
        }
        const path = this.getURL();
        const index = path.indexOf('?');
        const url = index !== -1 ? path.substring(0, index) : path;
        this.router.navigateByUrl(`${url}/${data.path}${this._serialize(data.params)}`, { replaceUrl: data.replace ?? false, skipLocationChange: data.skip ?? false });
    }
    goBack(data) {
        if (BizyRouterService.backPath) {
            history.back();
            BizyRouterService.backPath = '';
        }
        else if (data && data.path) {
            this.router.navigateByUrl(data.path, { replaceUrl: true });
        }
        else {
            const index = this.getURL().lastIndexOf('/');
            const backURL = this.getURL().substring(0, index);
            this.router.navigateByUrl(backURL, { replaceUrl: true });
        }
    }
    reload(force) {
        if (force) {
            window.location.reload();
        }
        else {
            setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.goTo({ path: this.getURL(), params: this.getAllQueryParam() });
                });
            }, 1);
        }
    }
    _serialize(params) {
        if (!params) {
            return '';
        }
        const str = [];
        for (const param in params) {
            if (params[param]) {
                str.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
            }
        }
        const queryParams = str.length > 0 ? `?${str.join('&')}` : '';
        return queryParams;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRouterService, deps: [{ token: Router }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRouterService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRouterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1$1.Router, decorators: [{
                    type: Inject,
                    args: [Router]
                }] }] });

class BizyCacheService {
    router;
    CACHE_PREFIX = 'BIZY-CACHE';
    constructor(router) {
        this.router = router;
    }
    getData(key) {
        if (!key) {
            key = this.router.getURL();
        }
        const data = sessionStorage.getItem(`${this.CACHE_PREFIX}-${key}`);
        if (data) {
            const _data = JSON.parse(data);
            return Date.now() < _data.expiresAt ? _data.value : {};
        }
        return {};
    }
    setData(value, key, expiresAt) {
        if (typeof value === 'undefined' || value === null) {
            return;
        }
        if (!key) {
            key = this.router.getURL();
        }
        if (!expiresAt) {
            const date = new Date();
            date.setHours(23, 59, 59);
            expiresAt = date.getTime();
        }
        const data = {
            expiresAt,
            value
        };
        sessionStorage.setItem(`${this.CACHE_PREFIX}-${key}`, JSON.stringify(data));
    }
    remove(key) {
        if (!key) {
            key = this.router.getURL();
        }
        sessionStorage.removeItem(`${this.CACHE_PREFIX}-${key}`);
    }
    removeAll() {
        const cacheKeys = Object.keys(sessionStorage).filter(key => {
            return key.includes(this.CACHE_PREFIX);
        });
        cacheKeys.forEach(value => {
            sessionStorage.removeItem(value);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCacheService, deps: [{ token: BizyRouterService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCacheService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: BizyRouterService, decorators: [{
                    type: Inject,
                    args: [BizyRouterService]
                }] }] });

class BizyValidatorService {
    isEmail = (value) => validator.isEmail(value, { allow_utf8_local_part: false });
    dateIsAfter = (data) => {
        if (!data || !data.date || !data.comparisonDate) {
            return false;
        }
        const date = new Date(data.date);
        const comparisonDate = new Date(data.comparisonDate);
        return validator.isAfter(date.toString(), comparisonDate.toString());
    };
    dateIsBefore = (data) => {
        if (!data || !data.date || !data.comparisonDate) {
            return false;
        }
        const date = new Date(data.date);
        const comparisonDate = new Date(data.comparisonDate);
        return validator.isBefore(date.toString(), comparisonDate.toString());
    };
    isAlpha = (value) => validator.isAlpha(value);
    isAlphanumeric = (value) => validator.isAlphanumeric(value);
    isNumeric = (value) => validator.isNumeric(value);
    isNumber(number) {
        const regex = /^-?\d+(\.\d+)?$/;
        return regex.test(String(number).toLowerCase());
    }
    isString(string) {
        return typeof string === 'string' || string instanceof String;
    }
    isInteger = (value) => validator.isInt(value);
    isBoolean = (value) => validator.isBoolean(value);
    isCreditCard = (value) => validator.isCreditCard(value);
    isDataURI = (value) => validator.isDataURI(value);
    isURL = (value) => validator.isURL(value);
    isDate = (value) => validator.isDate(value);
    isJSON = (value) => validator.isJSON(value);
    isIP = (value, version) => validator.isIP(value, { version });
    isJWT = (value) => validator.isJWT(value);
    isLowercase = (value) => validator.isLowercase(value);
    isUppercase = (value) => validator.isUppercase(value);
    isMobilePhone = (data) => validator.isMobilePhone(data.value, data.locale);
    isCUIT(cuit) {
        if (!cuit) {
            return false;
        }
        if (this.isString(cuit)) {
            cuit = cuit.replace(/[-]/g, '');
        }
        else {
            cuit = String(cuit);
        }
        // 20, 23, 24, 25, 26 y 27 Personas Físicas
        // 30, 33 y 34 Personas Jurídicas.
        if (!/^(20|23|24|25|26|27|30|33|34)\d{8}\d$/.test(cuit)) {
            return false;
        }
        const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
        const digits = cuit.split('').map(Number);
        const checkDigit = digits[10];
        const sum = multipliers.reduce((acc, _multiplier, i) => acc + _multiplier * digits[i], 0);
        const mod11 = 11 - (sum % 11);
        const expectedDigit = mod11 === 11 ? 0 : mod11 === 10 ? 9 : mod11;
        return checkDigit === expectedDigit;
    }
    isDNI(dni) {
        const regex = /(^[1-9]{1}[0-9]{7}$)/i;
        return regex.test(String(dni).toLowerCase());
    }
    isCBU(cbu) {
        const _isLengthOk = (cbu) => {
            return cbu.length === 22;
        };
        const _isValidAccount = (account) => {
            if (account.length !== 14) {
                return false;
            }
            const sum = Number(account[0]) * 3 +
                Number(account[1]) * 9 +
                Number(account[2]) * 7 +
                Number(account[3]) * 1 +
                Number(account[4]) * 3 +
                Number(account[5]) * 9 +
                Number(account[6]) * 7 +
                Number(account[7]) * 1 +
                Number(account[8]) * 3 +
                Number(account[9]) * 9 +
                Number(account[10]) * 7 +
                Number(account[11]) * 1 +
                Number(account[12]) * 3;
            const diff = (10 - (sum % 10)) % 10; // The result of this should be only 1 digit
            const checksum = Number(account[13]);
            return diff === checksum;
        };
        const _isValidBankCode = (code) => {
            if (code.length !== 8) {
                return false;
            }
            const bank = code.substring(0, 3);
            const checksumOne = code[3];
            const branch = code.substring(4, 4 + 3);
            const checksumTwo = code[7];
            const sum = (Number(bank[0]) * 7) +
                (Number(bank[1]) * 1) +
                (Number(bank[2]) * 3) +
                (Number(checksumOne) * 9) +
                (Number(branch[0]) * 7) +
                (Number(branch[1]) * 1) +
                (Number(branch[2]) * 3);
            const diff = (10 - (sum % 10)) % 10; // The result of this should be only 1 digit
            return diff === Number(checksumTwo);
        };
        const bankCode = cbu.substring(0, 8);
        const accountCode = cbu.substring(8, 8 + 14);
        return (_isLengthOk(cbu) &&
            _isValidBankCode(bankCode) &&
            _isValidAccount(accountCode));
    }
    emailValidator() {
        return (control) => {
            return !control.value || (control.value && this.isEmail(control.value))
                ? null
                : { bizyEmail: true };
        };
    }
    mobilePhoneValidator(locale) {
        return (control) => {
            return !control.value || !locale ||
                (control.value && locale && this.isMobilePhone({ value: control.value, locale }))
                ? null
                : { bizyMobilePhone: true };
        };
    }
    numberValidator() {
        return (control) => {
            return !control.value || (control.value && this.isNumber(control.value))
                ? null
                : { bizyNumber: true };
        };
    }
    numericValidator() {
        return (control) => {
            return !control.value || (control.value && this.isNumeric(control.value))
                ? null
                : { bizyNumeric: true };
        };
    }
    dateIsAfterValidator(comparisonDate) {
        return (control) => {
            return !control.value || !comparisonDate || (control.value && comparisonDate && !this.dateIsAfter({ date: control.value, comparisonDate }))
                ? null
                : { bizyDateIsAfter: true };
        };
    }
    dateIsBeforeValidator(comparisonDate) {
        return (control) => {
            return !control.value || !comparisonDate || (control.value && comparisonDate && !this.dateIsBefore({ date: control.value, comparisonDate }))
                ? null
                : { bizyDateIsBefore: true };
        };
    }
    alphaValidator() {
        return (control) => {
            return !control.value || (control.value && this.isAlpha(control.value))
                ? null
                : { bizyAlpha: true };
        };
    }
    alphanumericValidator() {
        return (control) => {
            return !control.value || (control.value && this.isAlphanumeric(control.value))
                ? null
                : { bizyAlphanumeric: true };
        };
    }
    integerValidator() {
        return (control) => {
            return !control.value || (control.value && this.isInteger(control.value))
                ? null
                : { bizyInteger: true };
        };
    }
    dataURIValidator() {
        return (control) => {
            return !control.value || (control.value && this.isDataURI(control.value))
                ? null
                : { bizyDataURI: true };
        };
    }
    urlValidator() {
        return (control) => {
            return !control.value || (control.value && this.isURL(control.value))
                ? null
                : { bizyURL: true };
        };
    }
    jsonValidator() {
        return (control) => {
            return !control.value || (control.value && this.isJSON(control.value))
                ? null
                : { bizyJSON: true };
        };
    }
    jwtValidator() {
        return (control) => {
            return !control.value || (control.value && this.isJWT(control.value))
                ? null
                : { bizyJWT: true };
        };
    }
    lowerCaseValidator() {
        return (control) => {
            return !control.value || (control.value && this.isLowercase(control.value))
                ? null
                : { bizyLowerCase: true };
        };
    }
    upperCaseValidator() {
        return (control) => {
            return !control.value || (control.value && this.isUppercase(control.value))
                ? null
                : { bizyUpperCase: true };
        };
    }
    cuitValidator() {
        return (control) => {
            return !control.value || (control.value && this.isCUIT(control.value))
                ? null
                : { bizyCUIT: true };
        };
    }
    dniValidator() {
        return (control) => {
            return !control.value || (control.value && this.isDNI(control.value))
                ? null
                : { bizyDNI: true };
        };
    }
    cbuValidator() {
        return (control) => {
            return !control.value || (control.value && this.isCBU(control.value))
                ? null
                : { bizyCBU: true };
        };
    }
    creditCardValidator() {
        return (control) => {
            return !control.value || (control.value && this.isCreditCard(control.value))
                ? null
                : { bizyCreditCard: true };
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyValidatorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyValidatorService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class BizyStorageService {
    get(key) {
        const item = localStorage.getItem(key);
        try {
            return JSON.parse(item);
        }
        catch (e) {
            return item;
        }
    }
    set(key, value) {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else if (typeof value === 'string') {
            localStorage.setItem(key, value);
        }
        else {
            localStorage.setItem(key, String(value));
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyStorageService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

var COLOR;
(function (COLOR) {
    COLOR["DEFAULT"] = "#666666";
    COLOR["INFO"] = "#2484C6";
    COLOR["SUCCESS"] = "#65BF6C";
    COLOR["WARNING"] = "#F7A64C";
    COLOR["ERROR"] = "#EF4C59";
})(COLOR || (COLOR = {}));
class BizyLogService {
    #lastLogTimestamp = 0;
    #log(log, color, param) {
        const difference = this.#lastLogTimestamp ? Date.now() - this.#lastLogTimestamp : 0;
        this.#lastLogTimestamp = Date.now();
        const timestampStyles = 'color: #EE5DFF';
        const logStyles = `color: ${color}; font-size: 12px;`;
        const date = new Date();
        if (param) {
            console.log(`%c${date.toLocaleString()}: %c${log} %c(+${difference}ms)`, timestampStyles, logStyles, timestampStyles, param);
        }
        else {
            console.log(`%c${date.toLocaleString()}: %c${log} %c(+${difference}ms)`, timestampStyles, logStyles, timestampStyles);
        }
    }
    debug(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.DEFAULT, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Debug', color: COLOR.DEFAULT });
        }
    }
    info(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.INFO, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Info', color: COLOR.INFO });
        }
    }
    success(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.SUCCESS, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Success', color: COLOR.SUCCESS });
        }
    }
    warning(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.WARNING, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Warning', color: COLOR.WARNING });
        }
    }
    error(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.ERROR, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Error', color: COLOR.ERROR });
        }
    }
    /** DEPRECATED */
    templateDebug(data) {
        this.#template({ ...data, title: 'Debug', color: COLOR.DEFAULT });
    }
    /** DEPRECATED */
    templateSucc(data) {
        this.#template({ ...data, title: 'Success', color: COLOR.SUCCESS });
    }
    /** DEPRECATED */
    templateInfo(data) {
        this.#template({ ...data, title: 'Info', color: COLOR.INFO });
    }
    /** DEPRECATED */
    templateWarn(data) {
        this.#template({ ...data, title: 'Warning', color: COLOR.WARNING });
    }
    /** DEPRECATED */
    templateError(data) {
        this.#template({ ...data, title: 'Error', color: COLOR.ERROR });
    }
    #template(data) {
        const log = `(${data.title}) ${data.fileName} - ${data.functionName}`;
        this.#log(log, data.color, data.param);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyLogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyLogService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyLogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class BizyCopyToClipboardService {
    #clipboard = inject(Clipboard);
    copy(data) {
        return new Promise((resolve, reject) => {
            try {
                if (!data) {
                    resolve();
                    return;
                }
                setTimeout(() => {
                    let toCopy = '';
                    if (typeof data === 'string' || data instanceof String) {
                        toCopy = data;
                    }
                    else if (data.items && data.items.length > 0 && data.model) {
                        for (const key in data.model) {
                            if (key) {
                                toCopy += `${data.model[key]},`;
                            }
                        }
                        data.items.forEach(_item => {
                            // Remove the last character (',')
                            toCopy = toCopy.slice(0, -2);
                            toCopy += '\n';
                            for (const key in data.model) {
                                let value = _item;
                                const nestedProperty = key.split('.');
                                nestedProperty.forEach(_property => {
                                    value = value[_property];
                                });
                                if (typeof value !== undefined && value !== null) {
                                    toCopy += `${String(value).replace(/\n/g, '')},`;
                                }
                                else {
                                    toCopy += ',';
                                }
                            }
                        });
                    }
                    const pending = this.#clipboard.beginCopy(toCopy);
                    let remainingAttempts = 3;
                    const attempt = () => {
                        const result = pending.copy();
                        if (!result && --remainingAttempts) {
                            setTimeout(attempt);
                        }
                        else {
                            // Remember to destroy when you're done!
                            pending.destroy();
                            resolve();
                        }
                    };
                    attempt();
                }, 100);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCopyToClipboardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCopyToClipboardService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCopyToClipboardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

var BIZY_FORMAT_SECONDS_LANGUAGE;
(function (BIZY_FORMAT_SECONDS_LANGUAGE) {
    BIZY_FORMAT_SECONDS_LANGUAGE["SPANISH"] = "es";
    BIZY_FORMAT_SECONDS_LANGUAGE["ENGLISH"] = "en";
})(BIZY_FORMAT_SECONDS_LANGUAGE || (BIZY_FORMAT_SECONDS_LANGUAGE = {}));
var BIZY_FORMAT_SECONDS_FORMAT;
(function (BIZY_FORMAT_SECONDS_FORMAT) {
    BIZY_FORMAT_SECONDS_FORMAT["DATE_TIME"] = "date-time";
    BIZY_FORMAT_SECONDS_FORMAT["TIME"] = "time";
})(BIZY_FORMAT_SECONDS_FORMAT || (BIZY_FORMAT_SECONDS_FORMAT = {}));
class BizyFormatSecondsService {
    #options = {
        language: BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH,
        format: BIZY_FORMAT_SECONDS_FORMAT.TIME
    };
    getOptions() {
        return this.#options;
    }
    setOptions(options) {
        if (options && options.language) {
            this.#options.language = options.language;
        }
        if (options && options.format) {
            this.#options.format = options.format;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFormatSecondsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFormatSecondsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFormatSecondsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// This function's role is to enable smooth transition to the brave new world of
// User-Agent Client Hints. If you have legacy code that relies on
// `navigator.userAgent` and which relies on entropy that will go away by
// default, you *need* to refactor it to use UA-CH. This function is to be used
// as a stop gap, to enable smooth transition during that period.
/**
* @param {string[]} hints
* @return {Promise<string|undefined>} A Promise that resolves to a string if a
*   UA could be synthesized from client hints, otherwise undefined.
*/
async function getUserAgentUsingClientHints(hints) {
    // Helper functions for platform specific strings
    const GetCrosSpecificString = (values) => {
        let osCPUFragment = '';
        if (values.bitness == '64') {
            if (values.architecture == 'x86') {
                osCPUFragment = 'x86_64';
            }
            else if (values.architecture == 'arm') {
                osCPUFragment = 'aarch64';
            }
        }
        else if (values.architecture == 'arm' && values.bitness == '32') {
            osCPUFragment = 'armv7l';
        }
        if (osCPUFragment == '') {
            return `X11; CrOS ${values.platformVersion}`;
        }
        return `X11; CrOS ${osCPUFragment} ${values.platformVersion}`;
    };
    const GetWindowsSpecificString = (values) => {
        let osCPUFragment = '';
        if (values.architecture == 'x86' && values.bitness == '64') {
            osCPUFragment = '; Win64; x64';
        }
        else if (values.architecture == 'arm') {
            osCPUFragment = '; ARM';
        }
        else if (values.wow64 === true) {
            osCPUFragment = '; WOW64';
        }
        return `Windows NT ${getWindowsPlatformVersion(values.platformVersion)}${osCPUFragment}`;
    };
    const GetMacSpecificString = (values) => {
        let newUA = 'Macintosh;';
        newUA += values.architecture === 'arm' ? ' ARM ' : ' Intel ';
        newUA += 'Mac OS X ';
        let macVersion = values.platformVersion;
        if (macVersion.indexOf('.') > -1) {
            macVersion = macVersion.split('.').join('_');
        }
        newUA += macVersion;
        return newUA;
    };
    const GetAndroidSpecificString = (values) => {
        let newUA = 'Linux; Android ';
        newUA += values.platformVersion;
        if (values.model) {
            newUA += '; ';
            newUA += values.model;
        }
        return newUA;
    };
    const Initialize = (values) => {
        if (!values.architecture) {
            values.architecture = 'x86';
        }
        if (!values.bitness) {
            values.bitness = '64';
        }
        if (!values.model) {
            values.model = '';
        }
        if (!values.platform) {
            values.platform = 'Windows';
        }
        if (!values.platformVersion) {
            values.platformVersion = '10.0';
        }
        if (!values.wow64) {
            values.wow64 = false;
        }
        return values;
    };
    // @ts-ignore-error
    if (!navigator.userAgentData) {
        return Promise.resolve('');
    }
    // Verify that this is a Chromium-based browser
    let isChromium = false;
    let chromiumVersion;
    // eslint-disable-next-line prefer-regex-literals
    const isChromeUAPattern = new RegExp('AppleWebKit/537.36 \\(KHTML, like Gecko\\) Chrome/\\d+.\\d+.\\d+.\\d+ (Mobile )?Safari/537.36$');
    // @ts-ignore-error
    navigator.userAgentData.brands.forEach(value => {
        if (value.brand == 'Chromium') {
            // Let's double check the UA string as well, so we don't accidentally
            // capture a headless browser or friendly bot (which should report as
            // HeadlessChrome or something entirely different).
            isChromium = isChromeUAPattern.test(navigator.userAgent);
            chromiumVersion = value.version;
        }
    });
    // @ts-ignore
    if (!isChromium || chromiumVersion < 100) {
        // If this is not a Chromium-based browser, the UA string should be very
        // different. Or, if this is a Chromium lower than 100, it doesn't have
        // all the hints we rely on. So let's bail.
        return Promise.resolve('');
    }
    // Main logic
    return new Promise(resolve => {
        // @ts-ignore-error
        navigator.userAgentData.getHighEntropyValues(hints).then(values => {
            let initialValues = {
                // @ts-ignore-error
                platform: navigator.userAgentData?.platform,
                version: chromiumVersion
            };
            values = Object.assign(initialValues, values);
            values = Initialize(values);
            let newUA = 'Mozilla/5.0 (';
            if (['Chrome OS', 'Chromium OS'].includes(values.platform)) {
                newUA += GetCrosSpecificString(values);
            }
            else if (values.platform == 'Windows') {
                newUA += GetWindowsSpecificString(values);
            }
            else if (values.platform == 'macOS') {
                newUA += GetMacSpecificString(values);
            }
            else if (values.platform == 'Android') {
                newUA += GetAndroidSpecificString(values);
            }
            else {
                newUA += 'X11; Linux x86_64';
            }
            newUA += ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/';
            newUA += getVersion(values?.fullVersionList, initialValues.version);
            // @ts-ignore-error
            if (navigator.userAgentData.mobile) {
                newUA += ' Mobile';
            }
            newUA += ' Safari/537.36';
            resolve(newUA);
        });
    });
}
function getVersion(fullVersionList, majorVersion) {
    // If we don't get a fullVersionList, or it's somehow undefined, return
    // the reduced version number.
    return (fullVersionList?.find((item) => item.brand == 'Google Chrome')?.version ||
        `${majorVersion}.0.0.0`);
}
function getWindowsPlatformVersion(platformVersion) {
    // https://wicg.github.io/ua-client-hints/#get-the-legacy-windows-version-number
    const versionMap = new Map([
        ['0.3.0', '6.3'], // Windows 8.1
        ['0.2.0', '6.2'], // Windows 8
        ['0.1.0', '6.1'] // Windows 7
    ]);
    if (versionMap.has(platformVersion)) {
        return versionMap.get(platformVersion);
    }
    // Windows 10 and above send "Windows NT 10.0"
    return '10.0';
}
/**
   * @param {string[]} hints
   * @return {Promise<string|undefined>} A Promise that resolves on overriding the
   *   navigator.userAgent string.
   */
async function overrideUserAgentUsingClientHints(hints) {
    return new Promise(resolve => {
        getUserAgentUsingClientHints(hints).then(newUA => {
            if (newUA) {
                // Got a new UA value. Now override `navigator.userAgent`.
                Object.defineProperty(navigator, 'userAgent', {
                    value: newUA,
                    writable: false,
                    configurable: true
                });
            }
            else {
                newUA = navigator.userAgent;
            }
            resolve(newUA);
        });
    });
}
const exportedForTests = { getVersion, getWindowsPlatformVersion };

class BizyDeviceService {
    #device = inject(DeviceDetectorService);
    async getUserAgent() {
        try {
            const userAgent = await overrideUserAgentUsingClientHints([
                'architecture',
                'bitness',
                'model',
                'platformVersion',
                'uaFullVersion',
                'fullVersionList'
            ]);
            return userAgent;
        }
        catch {
            return window.navigator.userAgent;
        }
    }
    isMobile = () => this.#device.isMobile();
    isTablet = () => this.#device.isTablet();
    isDesktop = () => this.#device.isDesktop();
    isPortrait = () => this.#device.orientation === 'portrait';
    isLandscape = () => this.#device.orientation === 'landscape';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDeviceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDeviceService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDeviceService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const SERVICES = [
    BizyAnimationService,
    BizyDeviceService,
    BizyCacheService,
    BizyCopyToClipboardService,
    BizyExportToCSVService,
    BizyFormatSecondsService,
    BizyKeyboardService,
    BizyLogService,
    BizyRouterService,
    BizyStorageService,
    BizyValidatorService,
    BizyViewportService
];
class BizyServicesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyServicesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyServicesModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyServicesModule, providers: SERVICES });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyServicesModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: SERVICES
                }]
        }] });

class BizyPopupService {
    #animation = inject(BizyAnimationService);
    #validator = inject(BizyValidatorService);
    #dialog = inject(Dialog);
    static dialogs = new Set();
    #data = null;
    /**
     *
     * @param data.disableClose Deprecated
     */
    open(data, callback) {
        this.#data = data.data;
        const component = data.fullScreen ? BizyFullScreenPopupWrapperComponent : BizyPopupWrapperComponent;
        const dialogRef = this.#dialog.open(component, ({
            id: data.id,
            data: {
                component: data.component,
                disableClose: data.disableCloseButton ?? false,
                disableDrag: data.disableDragButton ?? false,
                position: data.position,
            },
            autoFocus: true,
            hasBackdrop: true,
            disableClose: typeof data.disableBackdropClose !== 'undefined' && data.disableBackdropClose !== null ? data.disableBackdropClose : typeof data.disableClose !== 'undefined' && data.disableClose !== null ? data.disableClose : true,
            panelClass: Array.isArray(data.customClass) ? data.customClass : this.#validator.isString(data.customClass) ? [data.customClass] : []
        }));
        BizyPopupService.dialogs.add(dialogRef);
        dialogRef.closed.pipe(take(1)).subscribe(response => {
            BizyPopupService.dialogs.delete(dialogRef);
            if (callback) {
                callback(response);
            }
        });
    }
    getData() {
        return this.#data;
    }
    async close(data) {
        let dialogRef = null;
        if (data && data.id) {
            dialogRef = Array.from(BizyPopupService.dialogs).find(_dialogRef => _dialogRef.id === data.id);
        }
        else {
            dialogRef = Array.from(BizyPopupService.dialogs).pop();
        }
        if (dialogRef) {
            if (dialogRef.componentInstance instanceof BizyFullScreenPopupWrapperComponent && dialogRef.overlayRef && dialogRef.overlayRef.overlayElement) {
                const nativeElement = dialogRef.overlayRef.overlayElement.querySelector('bizy-full-screen-popup-wrapper');
                await this.#animation.setAnimation(nativeElement, BIZY_ANIMATION.SLIDE_OUT_DOWN);
            }
            dialogRef.close(data ? data.response : null);
            BizyPopupService.dialogs.delete(dialogRef);
        }
    }
    closeAll() {
        Array.from(BizyPopupService.dialogs).forEach(_dialogRef => {
            _dialogRef.close();
        });
        BizyPopupService.dialogs.clear();
    }
    openedPopups() {
        return BizyPopupService.dialogs.size;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPopupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPopupService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPopupService, decorators: [{
            type: Injectable
        }] });

class BizyFullScreenPopupWrapperComponent {
    dynamicComponentContainer;
    #data = inject(DIALOG_DATA);
    #dialogRef = inject(DialogRef);
    #popup = inject(BizyPopupService);
    #ref = inject(ChangeDetectorRef);
    disabled = false;
    disableClose = false;
    disableDrag = false;
    ngOnInit() {
        if (this.#data) {
            if (this.#data.disableClose) {
                this.disableClose = this.#data.disableClose;
            }
            if (this.#data.disableDrag) {
                this.disableDrag = this.#data.disableDrag;
            }
        }
    }
    ngAfterViewInit() {
        this.loadDynamicComponent();
    }
    loadDynamicComponent = () => {
        if (this.#data && this.#data.component) {
            this.dynamicComponentContainer.clear();
            this.dynamicComponentContainer.createComponent(this.#data.component);
            this.#ref.detectChanges();
        }
    };
    async close() {
        this.disabled = true;
        this.#popup.close({ id: this.#dialogRef.id });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFullScreenPopupWrapperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyFullScreenPopupWrapperComponent, isStandalone: true, selector: "bizy-full-screen-popup-wrapper", host: { classAttribute: "animated slide-in-up" }, viewQueries: [{ propertyName: "dynamicComponentContainer", first: true, predicate: ["dynamicComponentContainer"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<div class=\"bizy-full-screen-popup-wrapper\" [ngClass]=\"{'bizy-full-screen-popup-wrapper--disabled': disabled}\">\n\n    <button *ngIf=\"!disableClose\" class=\"bizy-full-screen-popup-wrapper__close-button\" (click)=\"close()\" (keyup.enter)=\"close()\">\n\n\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" class=\"bizy-full-screen-popup-wrapper__close-button__icon\">\n            <path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>", styles: [":host{font-size:1rem;height:var(--bizy-popup-full-screen-height);width:100vw;display:inline-block;position:absolute;bottom:0;left:0;right:0}.bizy-full-screen-popup-wrapper--disabled{pointer-events:none;cursor:default}.bizy-full-screen-popup-wrapper{position:relative;padding:var(--bizy-popup-full-screen-padding);background-color:var(--bizy-popup-full-screen-background-color);height:100%;width:100%;border-top-left-radius:var(--bizy-popup-full-screen-border-radius);border-top-right-radius:var(--bizy-popup-full-screen-border-radius)}.bizy-full-screen-popup-wrapper__close-button{position:absolute;right:1rem;top:1rem;border:var(--bizy-popup-full-screen-close-button-border);border-radius:50%;padding:.25rem .35rem;place-items:center;display:grid;background-color:var(--bizy-popup-full-screen-close-button-background-color);cursor:pointer;transition:transform .2s;z-index:1}.bizy-full-screen-popup-wrapper__close-button:hover .bizy-full-screen-popup-wrapper__close-button__icon{transform:scale(1.1)}.bizy-full-screen-popup-wrapper__close-button:hover .bizy-full-screen-popup-wrapper__close-button__icon{fill:var(--bizy-popup-full-screen-close-button-hover-color)}.bizy-full-screen-popup-wrapper__close-button__icon{height:1rem;transition:fill .2s ease,}.bizy-full-screen-popup-wrapper__close-button__icon{fill:var(--bizy-popup-full-screen-close-button-color)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: DialogModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFullScreenPopupWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-full-screen-popup-wrapper', imports: [CommonModule, DialogModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'class': 'animated slide-in-up'
                    }, template: "<div class=\"bizy-full-screen-popup-wrapper\" [ngClass]=\"{'bizy-full-screen-popup-wrapper--disabled': disabled}\">\n\n    <button *ngIf=\"!disableClose\" class=\"bizy-full-screen-popup-wrapper__close-button\" (click)=\"close()\" (keyup.enter)=\"close()\">\n\n\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" class=\"bizy-full-screen-popup-wrapper__close-button__icon\">\n            <path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>", styles: [":host{font-size:1rem;height:var(--bizy-popup-full-screen-height);width:100vw;display:inline-block;position:absolute;bottom:0;left:0;right:0}.bizy-full-screen-popup-wrapper--disabled{pointer-events:none;cursor:default}.bizy-full-screen-popup-wrapper{position:relative;padding:var(--bizy-popup-full-screen-padding);background-color:var(--bizy-popup-full-screen-background-color);height:100%;width:100%;border-top-left-radius:var(--bizy-popup-full-screen-border-radius);border-top-right-radius:var(--bizy-popup-full-screen-border-radius)}.bizy-full-screen-popup-wrapper__close-button{position:absolute;right:1rem;top:1rem;border:var(--bizy-popup-full-screen-close-button-border);border-radius:50%;padding:.25rem .35rem;place-items:center;display:grid;background-color:var(--bizy-popup-full-screen-close-button-background-color);cursor:pointer;transition:transform .2s;z-index:1}.bizy-full-screen-popup-wrapper__close-button:hover .bizy-full-screen-popup-wrapper__close-button__icon{transform:scale(1.1)}.bizy-full-screen-popup-wrapper__close-button:hover .bizy-full-screen-popup-wrapper__close-button__icon{fill:var(--bizy-popup-full-screen-close-button-hover-color)}.bizy-full-screen-popup-wrapper__close-button__icon{height:1rem;transition:fill .2s ease,}.bizy-full-screen-popup-wrapper__close-button__icon{fill:var(--bizy-popup-full-screen-close-button-color)}\n"] }]
        }], propDecorators: { dynamicComponentContainer: [{
                type: ViewChild,
                args: ['dynamicComponentContainer', { read: ViewContainerRef }]
            }] } });

const COMPONENTS$c = [
    BizyPopupWrapperComponent,
    BizyFullScreenPopupWrapperComponent
];
class BizyPopupModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPopupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyPopupModule, imports: [BizyPopupWrapperComponent,
            BizyFullScreenPopupWrapperComponent], exports: [BizyPopupWrapperComponent,
            BizyFullScreenPopupWrapperComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPopupModule, providers: [BizyPopupService], imports: [COMPONENTS$c] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPopupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$c,
                    exports: COMPONENTS$c,
                    providers: [BizyPopupService]
                }]
        }] });

class BizyRadioComponent {
    id = `bizy-radio-${Math.random()}`;
    name;
    selected = false;
    disabled = false;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.selectedChange.emit(!this.selected);
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRadioComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyRadioComponent, isStandalone: true, selector: "bizy-radio", inputs: { id: "id", name: "name", selected: "selected", disabled: "disabled" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<button type=\"button\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\" class=\"bizy-radio\" [ngClass]=\"{'bizy-radio--disabled': disabled}\">\n    <input \n        class=\"bizy-radio__input\"\n        [id]=\"id\"\n        [disabled]=\"disabled\"\n        type=\"radio\"\n        [name]=\"name\"\n        [checked]=\"selected\"/>\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <span class=\"bizy-radio__radio\"></span>\n    \n    <ng-content select=\"[slot=end]\"></ng-content>\n</button>\n", styles: [":host{font-size:1rem}.bizy-radio{border:none;background-color:transparent;cursor:pointer;position:relative;width:fit-content;display:flex;column-gap:.5rem;align-items:center}.bizy-radio__input{position:absolute;visibility:hidden;pointer-events:none}.bizy-radio__input:checked+.bizy-radio__radio:before{box-shadow:inset 0 0 0 .3rem var(--bizy-radio-color)}.bizy-radio__radio{display:flex;align-items:center;transition:.25s ease}.bizy-radio__radio:before{display:flex;flex-shrink:0;content:\"\";background-color:#fff;min-width:1rem;min-height:1rem;border-radius:50%;transition:.25s ease;box-shadow:inset 0 0 0 .1rem var(--bizy-radio-color)}.bizy-radio__input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-radio', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button type=\"button\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\" class=\"bizy-radio\" [ngClass]=\"{'bizy-radio--disabled': disabled}\">\n    <input \n        class=\"bizy-radio__input\"\n        [id]=\"id\"\n        [disabled]=\"disabled\"\n        type=\"radio\"\n        [name]=\"name\"\n        [checked]=\"selected\"/>\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <span class=\"bizy-radio__radio\"></span>\n    \n    <ng-content select=\"[slot=end]\"></ng-content>\n</button>\n", styles: [":host{font-size:1rem}.bizy-radio{border:none;background-color:transparent;cursor:pointer;position:relative;width:fit-content;display:flex;column-gap:.5rem;align-items:center}.bizy-radio__input{position:absolute;visibility:hidden;pointer-events:none}.bizy-radio__input:checked+.bizy-radio__radio:before{box-shadow:inset 0 0 0 .3rem var(--bizy-radio-color)}.bizy-radio__radio{display:flex;align-items:center;transition:.25s ease}.bizy-radio__radio:before{display:flex;flex-shrink:0;content:\"\";background-color:#fff;min-width:1rem;min-height:1rem;border-radius:50%;transition:.25s ease;box-shadow:inset 0 0 0 .1rem var(--bizy-radio-color)}.bizy-radio__input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], name: [{
                type: Input
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$b = [
    BizyRadioComponent,
];
class BizyRadioModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyRadioModule, imports: [BizyRadioComponent], exports: [BizyRadioComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRadioModule, imports: [COMPONENTS$b] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$b,
                    exports: COMPONENTS$b,
                }]
        }] });

class BizySectionComponent {
    id = `bizy-section-${Math.random()}`;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySectionComponent, isStandalone: true, selector: "bizy-section", inputs: { id: "id" }, host: { properties: { "id": "id" } }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:flex;height:var(--bizy-section-height);width:var(--bizy-section-width);background-color:var(--bizy-section-background-color);flex-direction:var(--bizy-section-flex-direction);column-gap:var(--bizy-section-column-gap);row-gap:var(--bizy-section-row-gap);justify-content:var(--bizy-section-justify-content);align-items:var(--bizy-section-align-items);flex-wrap:var(--bizy-section-flex-wrap)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-section', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[id]': 'id'
                    }, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:flex;height:var(--bizy-section-height);width:var(--bizy-section-width);background-color:var(--bizy-section-background-color);flex-direction:var(--bizy-section-flex-direction);column-gap:var(--bizy-section-column-gap);row-gap:var(--bizy-section-row-gap);justify-content:var(--bizy-section-justify-content);align-items:var(--bizy-section-align-items);flex-wrap:var(--bizy-section-flex-wrap)}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }] } });

class BizySectionStartComponent {
    id = `bizy-section-start-${Math.random()}`;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionStartComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySectionStartComponent, isStandalone: true, selector: "bizy-section-start", inputs: { id: "id" }, host: { properties: { "id": "id" } }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:flex;flex:var(--bizy-section-start-flex);height:var(--bizy-section-start-height);width:var(--bizy-section-start-width);background-color:var(--bizy-section-start-background-color);justify-content:var(--bizy-section-start-justify-content);align-items:var(--bizy-section-start-align-items);column-gap:var(--bizy-section-start-column-gap);row-gap:var(--bizy-section-start-row-gap)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionStartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-section-start', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[id]': 'id'
                    }, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:flex;flex:var(--bizy-section-start-flex);height:var(--bizy-section-start-height);width:var(--bizy-section-start-width);background-color:var(--bizy-section-start-background-color);justify-content:var(--bizy-section-start-justify-content);align-items:var(--bizy-section-start-align-items);column-gap:var(--bizy-section-start-column-gap);row-gap:var(--bizy-section-start-row-gap)}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }] } });

class BizySectionCenterComponent {
    id = `bizy-center-start-${Math.random()}`;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionCenterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySectionCenterComponent, isStandalone: true, selector: "bizy-section-center", inputs: { id: "id" }, host: { properties: { "id": "id" } }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:flex;flex:var(--bizy-section-center-flex);height:var(--bizy-section-center-height);width:var(--bizy-section-center-width);background-color:var(--bizy-section-center-background-color);justify-content:var(--bizy-section-center-justify-content);align-items:var(--bizy-section-center-align-items);column-gap:var(--bizy-section-center-column-gap);row-gap:var(--bizy-section-center-row-gap)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionCenterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-section-center', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[id]': 'id'
                    }, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:flex;flex:var(--bizy-section-center-flex);height:var(--bizy-section-center-height);width:var(--bizy-section-center-width);background-color:var(--bizy-section-center-background-color);justify-content:var(--bizy-section-center-justify-content);align-items:var(--bizy-section-center-align-items);column-gap:var(--bizy-section-center-column-gap);row-gap:var(--bizy-section-center-row-gap)}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }] } });

class BizySectionEndComponent {
    id = `bizy-section-end-${Math.random()}`;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionEndComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySectionEndComponent, isStandalone: true, selector: "bizy-section-end", inputs: { id: "id" }, host: { properties: { "id": "id" } }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:flex;flex:var(--bizy-section-end-flex);height:var(--bizy-section-end-height);width:var(--bizy-section-end-width);background-color:var(--bizy-section-end-background-color);justify-content:var(--bizy-section-end-justify-content);align-items:var(--bizy-section-end-align-items);column-gap:var(--bizy-section-end-column-gap);row-gap:var(--bizy-section-end-row-gap)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionEndComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-section-end', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[id]': 'id'
                    }, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:flex;flex:var(--bizy-section-end-flex);height:var(--bizy-section-end-height);width:var(--bizy-section-end-width);background-color:var(--bizy-section-end-background-color);justify-content:var(--bizy-section-end-justify-content);align-items:var(--bizy-section-end-align-items);column-gap:var(--bizy-section-end-column-gap);row-gap:var(--bizy-section-end-row-gap)}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }] } });

const COMPONENTS$a = [
    BizySectionComponent,
    BizySectionStartComponent,
    BizySectionCenterComponent,
    BizySectionEndComponent
];
class BizySectionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizySectionModule, imports: [BizySectionComponent,
            BizySectionStartComponent,
            BizySectionCenterComponent,
            BizySectionEndComponent], exports: [BizySectionComponent,
            BizySectionStartComponent,
            BizySectionCenterComponent,
            BizySectionEndComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionModule, imports: [COMPONENTS$a] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySectionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$a,
                    exports: COMPONENTS$a,
                }]
        }] });

const COMPONENTS$9 = [
    BizySelectComponent,
    BizySelectOptionComponent
];
class BizySelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizySelectModule, imports: [BizySelectComponent,
            BizySelectOptionComponent], exports: [BizySelectComponent,
            BizySelectOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySelectModule, imports: [COMPONENTS$9] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$9,
                    exports: COMPONENTS$9,
                }]
        }] });

class BizySidebarOptionComponent {
    ref;
    options;
    id = `bizy-sidebar-option-${Math.random()}`;
    disabled = false;
    selectable = true;
    customClass = '';
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _turnOn$ = new BehaviorSubject(false);
    _selected = false;
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        const turnOn = selected && selected !== this._selected;
        this._turnOn$.next(turnOn);
        this._selected = selected;
        this.ref.detectChanges();
    }
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect(event) {
        if (this.disabled || !this.selectable) {
            return;
        }
        this.selectedChange.emit(!this._selected);
        this.onSelect.emit(event);
    }
    _setSelected(selected) {
        this._selected = selected;
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this._selected;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySidebarOptionComponent, isStandalone: true, selector: "bizy-sidebar-option", inputs: { id: "id", disabled: "disabled", selectable: "selectable", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    [id]=\"id\"\n    customClass=\"bizy-sidebar-option {{_selected && (!options || options.length === 0) ? 'bizy-sidebar-option--selected' : ''}} {{!selectable ? 'bizy-sidebar-option--no-selectable' : ''}} {{disabled ? 'bizy-sidebar-option--disabled' : ''}}\"\n    [opened]=\"_selected\"\n    (onSelect)=\"_onSelect($event)\">\n\n    <ng-content></ng-content>\n\n    <ng-container accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </ng-container>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}:host:not(:has(.bizy-sidebar-option--disabled)) ::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-accordion__options{position:sticky}:host ::ng-deep .bizy-accordion__options:before{content:\"\";position:absolute;inset:0;background-color:#000;opacity:.3}::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}::ng-deep .bizy-sidebar-option--no-selectable{pointer-events:none;cursor:default!important}::ng-deep .bizy-sidebar-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-accordion__options--opened{max-height:100%!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: BizyAccordionComponent, selector: "bizy-accordion", inputs: ["id", "customClass", "disabled", "opened"], outputs: ["openedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-option', imports: [CommonModule, BizyAccordionComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    [id]=\"id\"\n    customClass=\"bizy-sidebar-option {{_selected && (!options || options.length === 0) ? 'bizy-sidebar-option--selected' : ''}} {{!selectable ? 'bizy-sidebar-option--no-selectable' : ''}} {{disabled ? 'bizy-sidebar-option--disabled' : ''}}\"\n    [opened]=\"_selected\"\n    (onSelect)=\"_onSelect($event)\">\n\n    <ng-content></ng-content>\n\n    <ng-container accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </ng-container>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}:host:not(:has(.bizy-sidebar-option--disabled)) ::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-accordion__options{position:sticky}:host ::ng-deep .bizy-accordion__options:before{content:\"\";position:absolute;inset:0;background-color:#000;opacity:.3}::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}::ng-deep .bizy-sidebar-option--no-selectable{pointer-events:none;cursor:default!important}::ng-deep .bizy-sidebar-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-accordion__options--opened{max-height:100%!important}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectable: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });

class BizySidebarFloatingOptionComponent {
    ref;
    options;
    id = `bizy-sidebar-floating-option-${Math.random()}`;
    disabled = false;
    selectable = true;
    offsetX = 0;
    offsetY = 0;
    customClass = '';
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _turnOn$ = new BehaviorSubject(false);
    _selected = false;
    _opened = false;
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        const turnOn = selected && selected !== this._selected;
        this._turnOn$.next(turnOn);
        this._opened = turnOn;
        this._selected = selected;
        this.ref.detectChanges();
    }
    #subscription = new Subscription();
    #optionSubscription = new Subscription();
    constructor(ref) {
        this.ref = ref;
    }
    ngAfterContentInit() {
        if (this.options && this.options.length > 0) {
            this.#listenOptionChanges(this.options.toArray());
            this.#subscription.add(this.options.changes.subscribe(() => {
                this.#optionSubscription.unsubscribe();
                this.#optionSubscription = new Subscription();
                this.#listenOptionChanges(this.options.toArray());
            }));
        }
    }
    _onSelect(event) {
        if (this.disabled || !this.selectable) {
            return;
        }
        this._opened = !this._opened;
        this.ref.detectChanges();
        this.selectedChange.emit(this._opened);
        this.onSelect.emit(event);
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this._opened = false;
        this.ref.detectChanges();
    };
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    #listenOptionChanges = (options) => {
        options.forEach(_option => {
            this.#optionSubscription.add(_option._turnOn$.subscribe(turnOn => {
                if (turnOn) {
                    if (!_option.options || _option.options.length === 0) {
                        this._opened = false;
                        this.ref.detectChanges();
                    }
                    this.#selectParents(this.options.toArray(), _option);
                }
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenOptionChanges(_option.options.toArray());
            }
        });
    };
    #selectParents = (options, option) => {
        let founded = false;
        for (let i = 0; i < options.length; i++) {
            if (options[i].getId() === option.getId()) {
                founded = true;
            }
            else if (options[i].options && options[i].options.length > 0) {
                const _founded = this.#selectParents(options[i].options.toArray(), option);
                if (_founded) {
                    founded = true;
                    options[i].selectedChange.emit(true);
                }
                else {
                    options[i].selectedChange.emit(false);
                }
            }
            else {
                options[i].selectedChange.emit(false);
            }
        }
        return founded;
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarFloatingOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySidebarFloatingOptionComponent, isStandalone: true, selector: "bizy-sidebar-floating-option", inputs: { id: "id", disabled: "disabled", selectable: "selectable", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--selected': _selected, 'bizy-sidebar-floating-option--no-selectable': !selectable, 'bizy-sidebar-floating-option--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened && options && options.length > 0\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--no-selectable{pointer-events:none;cursor:default!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:calc(100% + 2rem);max-width:calc(100vw - 2rem);border-radius:.3rem;max-height:30rem;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarFloatingOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-floating-option', imports: [CommonModule, OverlayModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--selected': _selected, 'bizy-sidebar-floating-option--no-selectable': !selectable, 'bizy-sidebar-floating-option--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened && options && options.length > 0\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--no-selectable{pointer-events:none;cursor:default!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:calc(100% + 2rem);max-width:calc(100vw - 2rem);border-radius:.3rem;max-height:30rem;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectable: [{
                type: Input
            }], offsetX: [{
                type: Input
            }], offsetY: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });

class BizySidebarComponent {
    id = `bizy-sidebar-${Math.random()}`;
    options;
    floatingOptions;
    toggleChange = new EventEmitter();
    onToggle = new EventEmitter();
    _toggle = false;
    #subscription = new Subscription();
    #optionSubscription = new Subscription();
    #floatingOptionSubscription = new Subscription();
    set toggle(toggle) {
        if (typeof toggle === 'undefined' || toggle === null) {
            return;
        }
        this._toggle = toggle;
        this.#unsubscribe();
        this.#subscription = new Subscription();
        this.#optionSubscription = new Subscription();
        this.#floatingOptionSubscription = new Subscription();
        setTimeout(() => {
            this.#listenOptions();
        }, 500);
    }
    ngAfterContentInit() {
        this.#listenOptions();
    }
    #listenOptions() {
        if (this.options && this.options.length > 0) {
            this.#listenOptionChanges(this.options.toArray());
            this.#subscription.add(this.options.changes.subscribe(() => {
                this.#optionSubscription.unsubscribe();
                this.#optionSubscription = new Subscription();
                this.#listenOptionChanges(this.options.toArray());
            }));
        }
        if (this.floatingOptions && this.floatingOptions.length > 0) {
            this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
            this.#subscription.add(this.floatingOptions.changes.subscribe(() => {
                this.#floatingOptionSubscription.unsubscribe();
                this.#floatingOptionSubscription = new Subscription();
                this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
            }));
        }
    }
    #listenOptionChanges = (options) => {
        options.forEach(_option => {
            this.#optionSubscription.add(_option._turnOn$.subscribe(turnOn => {
                if (turnOn) {
                    this.#selectParents(this.options.toArray(), _option);
                }
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenOptionChanges(_option.options.toArray());
            }
        });
    };
    #listenFloatingOptionChanges = (options) => {
        options.forEach(_option => {
            this.#floatingOptionSubscription.add(_option._turnOn$.subscribe(turnOn => {
                if (turnOn) {
                    this.floatingOptions.forEach(__option => {
                        if (__option.getId() !== _option.getId()) {
                            setTimeout(() => {
                                __option.selectedChange.emit(false);
                            }, 100);
                        }
                    });
                }
            }));
        });
    };
    #selectParents = (options, option) => {
        let founded = false;
        for (let i = 0; i < options.length; i++) {
            if (options[i].getId() === option.getId()) {
                founded = true;
            }
            else if (options[i].options && options[i].options.length > 0) {
                const _founded = this.#selectParents(options[i].options.toArray(), option);
                if (_founded) {
                    founded = true;
                    setTimeout(() => {
                        options[i].selectedChange.emit(true);
                    }, 100);
                }
                else {
                    setTimeout(() => {
                        options[i].selectedChange.emit(false);
                    }, 100);
                }
            }
            else {
                setTimeout(() => {
                    options[i].selectedChange.emit(false);
                }, 100);
            }
        }
        return founded;
    };
    #unsubscribe() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
        this.#floatingOptionSubscription.unsubscribe();
    }
    _onToggle(event) {
        this.toggleChange.emit(!this._toggle);
        this.onToggle.emit(event);
    }
    ngOnDestroy() {
        this.#unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySidebarComponent, isStandalone: true, selector: "bizy-sidebar", inputs: { id: "id", toggle: "toggle" }, outputs: { toggleChange: "toggleChange", onToggle: "onToggle" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }, { propertyName: "floatingOptions", predicate: BizySidebarFloatingOptionComponent }], ngImport: i0, template: "<div class=\"bizy-sidebar\" [id]=\"id\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"_onToggle($event)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"_toggle\"/>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__top\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__bottom\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}.bizy-sidebar{min-width:fit-content;height:100%;max-height:100vh;background-color:var(--bizy-sidebar-background-color);position:relative;transition:width .2s ease;display:grid;grid-template-columns:100%;grid-template-rows:auto 1fr auto}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__top{overflow:hidden;align-self:start}.bizy-sidebar__top:empty{display:none}.bizy-sidebar__bottom{overflow:hidden;align-self:end}.bizy-sidebar__bottom:empty{display:none}.bizy-sidebar__content{display:flex;min-height:var(--bizy-sidebar-section-min-height);width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding:var(--bizy-sidebar-padding);overflow-x:hidden;transition:width .2s ease}.bizy-sidebar__content--shrinked{width:var(--bizy-sidebar-shrinked-width);padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-scroll-bar-color)}.bizy-sidebar__content::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-sidebar-scroll-bar-hover-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: OverlayModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar', imports: [
                        CommonModule,
                        OverlayModule
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-sidebar\" [id]=\"id\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"_onToggle($event)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"_toggle\"/>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__top\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__bottom\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}.bizy-sidebar{min-width:fit-content;height:100%;max-height:100vh;background-color:var(--bizy-sidebar-background-color);position:relative;transition:width .2s ease;display:grid;grid-template-columns:100%;grid-template-rows:auto 1fr auto}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__top{overflow:hidden;align-self:start}.bizy-sidebar__top:empty{display:none}.bizy-sidebar__bottom{overflow:hidden;align-self:end}.bizy-sidebar__bottom:empty{display:none}.bizy-sidebar__content{display:flex;min-height:var(--bizy-sidebar-section-min-height);width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding:var(--bizy-sidebar-padding);overflow-x:hidden;transition:width .2s ease}.bizy-sidebar__content--shrinked{width:var(--bizy-sidebar-shrinked-width);padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-scroll-bar-color)}.bizy-sidebar__content::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-sidebar-scroll-bar-hover-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], floatingOptions: [{
                type: ContentChildren,
                args: [BizySidebarFloatingOptionComponent]
            }], toggleChange: [{
                type: Output
            }], onToggle: [{
                type: Output
            }], toggle: [{
                type: Input
            }] } });

class BizySidebarFloatingOptionTitleComponent {
    id = `bizy-sidebar-floating-option-title-${Math.random()}`;
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarFloatingOptionTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySidebarFloatingOptionTitleComponent, isStandalone: true, selector: "bizy-sidebar-floating-option-title", inputs: { id: "id", customClass: "customClass" }, ngImport: i0, template: "<span class=\"bizy-sidebar-floating-option-title {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem;background-color:var(--bizy-sidebar-floating-option-title-background-color);position:sticky;top:0;z-index:1}.bizy-sidebar-floating-option-title{background-color:inherit;color:var(--bizy-sidebar-floating-option-title-color);padding:.5rem;cursor:default;text-decoration:underline .1rem var(--bizy-sidebar-floating-option-title-underline-color);text-underline-offset:.2rem;display:flex;align-items:center}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarFloatingOptionTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-floating-option-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-sidebar-floating-option-title {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem;background-color:var(--bizy-sidebar-floating-option-title-background-color);position:sticky;top:0;z-index:1}.bizy-sidebar-floating-option-title{background-color:inherit;color:var(--bizy-sidebar-floating-option-title-color);padding:.5rem;cursor:default;text-decoration:underline .1rem var(--bizy-sidebar-floating-option-title-underline-color);text-underline-offset:.2rem;display:flex;align-items:center}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

const COMPONENTS$8 = [
    BizySidebarComponent,
    BizySidebarFloatingOptionComponent,
    BizySidebarFloatingOptionTitleComponent,
    BizySidebarOptionComponent
];
class BizySidebarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarModule, imports: [BizySidebarComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarFloatingOptionTitleComponent,
            BizySidebarOptionComponent], exports: [BizySidebarComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarFloatingOptionTitleComponent,
            BizySidebarOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarModule, imports: [BizySidebarComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarOptionComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$8,
                    exports: COMPONENTS$8,
                }]
        }] });

var BIZY_SKELETON_SHAPE;
(function (BIZY_SKELETON_SHAPE) {
    BIZY_SKELETON_SHAPE["CIRCLE"] = "circle";
    BIZY_SKELETON_SHAPE["SQUARE"] = "square";
})(BIZY_SKELETON_SHAPE || (BIZY_SKELETON_SHAPE = {}));

class BizySkeletonComponent {
    id = `bizy-skeleton-${Math.random()}`;
    shape = BIZY_SKELETON_SHAPE.SQUARE;
    height;
    width;
    customClass = '';
    BIZY_SKELETON_SHAPE = BIZY_SKELETON_SHAPE;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySkeletonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySkeletonComponent, isStandalone: true, selector: "bizy-skeleton", inputs: { id: "id", shape: "shape", height: "height", width: "width", customClass: "customClass" }, host: { properties: { "id": "id", "style.width": "width", "style.min-width": "width", "style.height": "height", "style.min-height": "height", "class": "customClass", "style.border-radius": "shape === BIZY_SKELETON_SHAPE.CIRCLE ? \"50%\" : \"0\"" } }, ngImport: i0, template: "", styles: [":host{font-size:1rem;height:var(--bizy-skeleton-height);width:var(--bizy-skeleton-width);display:inline-block;background:linear-gradient(90deg,#eee 25%,#f5f5f5,#eee 75%);background-size:200% 100%;animation:bizy-skeleton-animation 1.5s infinite linear}@keyframes bizy-skeleton-animation{0%{background-position:-200% 0}to{background-position:200% 0}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySkeletonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-skeleton', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[id]': 'id',
                        '[style.width]': 'width',
                        '[style.min-width]': 'width',
                        '[style.height]': 'height',
                        '[style.min-height]': 'height',
                        '[class]': 'customClass',
                        '[style.border-radius]': 'shape === BIZY_SKELETON_SHAPE.CIRCLE ? "50%" : "0"'
                    }, template: "", styles: [":host{font-size:1rem;height:var(--bizy-skeleton-height);width:var(--bizy-skeleton-width);display:inline-block;background:linear-gradient(90deg,#eee 25%,#f5f5f5,#eee 75%);background-size:200% 100%;animation:bizy-skeleton-animation 1.5s infinite linear}@keyframes bizy-skeleton-animation{0%{background-position:-200% 0}to{background-position:200% 0}}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], shape: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

const COMPONENTS$7 = [
    BizySkeletonComponent,
];
class BizySkeletonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySkeletonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizySkeletonModule, imports: [BizySkeletonComponent], exports: [BizySkeletonComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySkeletonModule, imports: [COMPONENTS$7] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySkeletonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$7,
                    exports: COMPONENTS$7,
                }]
        }] });

class BizySliderComponent {
    fromSlider;
    toSlider;
    minLimit = 0;
    maxLimit = 100;
    onChange = new EventEmitter();
    _min = 0;
    _max = 100;
    set min(min) {
        if (typeof min === 'undefined' || min == null) {
            return;
        }
        this._min = min;
    }
    ;
    set max(max) {
        if (typeof max === 'undefined' || max == null) {
            return;
        }
        this._max = max;
    }
    ;
    setFromSlider(value) {
        if (value > this._max) {
            this._min = this._max;
            this.fromSlider.nativeElement.value = this._max;
        }
        else {
            this._min = value;
        }
        this.onChange.emit({ min: this._min, max: this._max });
    }
    setToSlider(value) {
        if (value < this._min) {
            this._max = this._min;
            this.toSlider.nativeElement.value = this._min;
        }
        else {
            this._max = value;
        }
        this.onChange.emit({ min: this._min, max: this._max });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizySliderComponent, isStandalone: true, selector: "bizy-slider", inputs: { minLimit: "minLimit", maxLimit: "maxLimit", min: "min", max: "max" }, outputs: { onChange: "onChange" }, viewQueries: [{ propertyName: "fromSlider", first: true, predicate: ["fromSlider"], descendants: true }, { propertyName: "toSlider", first: true, predicate: ["toSlider"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{-webkit-appearance:none;appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.RangeValueAccessor, selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-slider', imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{-webkit-appearance:none;appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"] }]
        }], propDecorators: { fromSlider: [{
                type: ViewChild,
                args: ['fromSlider']
            }], toSlider: [{
                type: ViewChild,
                args: ['toSlider']
            }], minLimit: [{
                type: Input
            }], maxLimit: [{
                type: Input
            }], onChange: [{
                type: Output
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }] } });

const COMPONENTS$6 = [
    BizySliderComponent,
];
class BizySliderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizySliderModule, imports: [BizySliderComponent], exports: [BizySliderComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySliderModule, imports: [COMPONENTS$6] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$6,
                    exports: COMPONENTS$6,
                }]
        }] });

class BizyTableScrollingDirective {
    viewContainerRef;
    template;
    ref;
    #items = new BehaviorSubject([]);
    get items$() {
        return this.#items.asObservable();
    }
    set tableForIn(value) {
        this.#items.next(value);
    }
    constructor(viewContainerRef, template, ref) {
        this.viewContainerRef = viewContainerRef;
        this.template = template;
        this.ref = ref;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableScrollingDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyTableScrollingDirective, isStandalone: true, selector: "[tableFor]", inputs: { tableForIn: "tableForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableScrollingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tableFor]',
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef, decorators: [{
                    type: Inject,
                    args: [ViewContainerRef]
                }] }, { type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { tableForIn: [{
                type: Input
            }] } });

class BizyTableColumnFixedDirective {
    #elementRef = inject(ElementRef);
    #renderer = inject(Renderer2);
    #originalBoxShadow = '';
    #originalBackgroundColor = '';
    #originalZIndex = '';
    #originalPosition = '';
    ngAfterViewInit() {
        const computedStyle = window.getComputedStyle(this.#elementRef.nativeElement);
        this.#originalBoxShadow = computedStyle.boxShadow;
        this.#originalZIndex = computedStyle.zIndex;
        this.#originalBackgroundColor = computedStyle.backgroundColor;
        this.#originalPosition = computedStyle.position;
    }
    set tableColumnFixed(value) {
        if (typeof value === 'undefined' || value === null) {
            return;
        }
        if (value) {
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'zIndex', '1');
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'backgroundColor', 'inherit');
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'position', 'relative');
            this.#elementRef.nativeElement.setMarginLeft = this.setMarginLeft;
        }
        else {
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'zIndex', this.#originalZIndex);
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'position', this.#originalPosition);
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'backgroundColor', this.#originalBackgroundColor);
            this.#elementRef.nativeElement.setMarginLeft = null;
        }
    }
    setMarginLeft = (marginLeft) => {
        if (marginLeft > 0) {
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'boxShadow', '16px 0px 15px -5px rgba(0,0,0,0.37)');
        }
        else {
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'zIndex', '0');
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'boxShadow', this.#originalBoxShadow);
        }
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'left', `${marginLeft - 5}px`);
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'paddingLeft', '5px');
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableColumnFixedDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyTableColumnFixedDirective, isStandalone: true, selector: "[bizyTableColumnFixed]", inputs: { tableColumnFixed: ["bizyTableColumnFixed", "tableColumnFixed"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableColumnFixedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyTableColumnFixed]',
                }]
        }], propDecorators: { tableColumnFixed: [{
                type: Input,
                args: ['bizyTableColumnFixed']
            }] } });

class BizyTableColumnComponent {
    id = `bizy-table-column-${Math.random()}`;
    customClass = '';
    contextMenu = new EventEmitter();
    onSelect = new EventEmitter();
    #elementRef = inject(ElementRef);
    onRightClick(event) {
        this.contextMenu.emit(event);
    }
    getId = () => {
        return this.id;
    };
    setMarginLeft(margin) {
        if (!this.#elementRef.nativeElement || !this.#elementRef.nativeElement.setMarginLeft) {
            return;
        }
        this.#elementRef.nativeElement.setMarginLeft(margin);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableColumnComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTableColumnComponent, isStandalone: true, selector: "bizy-table-column", inputs: { id: "id", customClass: "customClass" }, outputs: { contextMenu: "contextMenu", onSelect: "onSelect" }, host: { listeners: { "contextmenu": "onRightClick($event)" } }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"onSelect.emit($event)\"\n    (keyup.enter)=\"onSelect.emit($event)\"\n    class=\"bizy-table-column {{customClass}}\">\n\n    <ng-content></ng-content>\n    \n</button>", styles: [":host{font-size:1rem;flex:1;background-color:inherit;min-height:var(--bizy-table-row-height);display:flex;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}:host:has(.bizy-table-column-arrows) .bizy-table-column{cursor:pointer!important}.bizy-table-column{font-size:1rem;min-width:var(--bizy-table-column-min-width);width:100%;cursor:var(--bizy-table-column-cursor);border-top:var(--bizy-table-column-border-top);border-right:var(--bizy-table-column-border-right);border-bottom:var(--bizy-table-column-border-bottom);border-left:var(--bizy-table-column-border-left);background-color:var(--bizy-table-column-background-color);display:flex;align-items:center;justify-content:var(--bizy-table-column-justify-content);column-gap:.3rem;padding-right:.3rem}::ng-deep .bizy-table-column *{text-align:start}::ng-deep .bizy-table-column:hover .bizy-table-column-arrows{display:inline-block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableColumnComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-column', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"onSelect.emit($event)\"\n    (keyup.enter)=\"onSelect.emit($event)\"\n    class=\"bizy-table-column {{customClass}}\">\n\n    <ng-content></ng-content>\n    \n</button>", styles: [":host{font-size:1rem;flex:1;background-color:inherit;min-height:var(--bizy-table-row-height);display:flex;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}:host:has(.bizy-table-column-arrows) .bizy-table-column{cursor:pointer!important}.bizy-table-column{font-size:1rem;min-width:var(--bizy-table-column-min-width);width:100%;cursor:var(--bizy-table-column-cursor);border-top:var(--bizy-table-column-border-top);border-right:var(--bizy-table-column-border-right);border-bottom:var(--bizy-table-column-border-bottom);border-left:var(--bizy-table-column-border-left);background-color:var(--bizy-table-column-background-color);display:flex;align-items:center;justify-content:var(--bizy-table-column-justify-content);column-gap:.3rem;padding-right:.3rem}::ng-deep .bizy-table-column *{text-align:start}::ng-deep .bizy-table-column:hover .bizy-table-column-arrows{display:inline-block}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], contextMenu: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onRightClick: [{
                type: HostListener,
                args: ['contextmenu', ['$event']]
            }] } });

class BizyTableHeaderComponent {
    ref;
    elementRef;
    columns;
    id = `bizy-table-header-${Math.random()}`;
    customClass = '';
    selected = false;
    selectable = null;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    marginRight = 0;
    constructor(ref, elementRef) {
        this.ref = ref;
        this.elementRef = elementRef;
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    setSelectable = (selectable) => {
        if (this.selectable === false) {
            return;
        }
        this.selectable = selectable;
        this.ref.detectChanges();
    };
    setMarginRight(margin) {
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    setMarginLeft(margin) {
        if (this.columns.length === 0) {
            return;
        }
        this.columns.forEach(_column => {
            _column.setMarginLeft(margin);
            this.ref.detectChanges();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableHeaderComponent, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTableHeaderComponent, isStandalone: true, selector: "bizy-table-header", inputs: { id: "id", customClass: "customClass", selected: "selected", selectable: "selectable" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "columns", predicate: BizyTableColumnComponent }], ngImport: i0, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-header', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }], propDecorators: { columns: [{
                type: ContentChildren,
                args: [BizyTableColumnComponent]
            }], id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectable: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

class BizyTableFooterComponent {
    ref;
    elementRef;
    columns;
    id = `bizy-table-footer-${Math.random()}`;
    customClass = '';
    marginRight = 0;
    _selectable = false;
    constructor(ref, elementRef) {
        this.ref = ref;
        this.elementRef = elementRef;
    }
    getId = () => {
        return this.id;
    };
    setSelectable = (selectable) => {
        this._selectable = selectable;
        this.ref.detectChanges();
    };
    setMarginRight(margin) {
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    setMarginLeft(margin) {
        if (this.columns.length === 0) {
            return;
        }
        this.columns.forEach(_column => {
            _column.setMarginLeft(margin);
            this.ref.detectChanges();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableFooterComponent, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTableFooterComponent, isStandalone: true, selector: "bizy-table-footer", inputs: { id: "id", customClass: "customClass" }, queries: [{ propertyName: "columns", predicate: BizyTableColumnComponent }], ngImport: i0, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height);width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-footer-background-color)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-footer', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height);width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-footer-background-color)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }], propDecorators: { columns: [{
                type: ContentChildren,
                args: [BizyTableColumnComponent]
            }], id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

class BizyTableRowComponent {
    ref;
    columns;
    id = `bizy-table-row-${Math.random()}`;
    customClass = '';
    disabled = false;
    selected = false;
    opened = false;
    selectable = null;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    openedChange = new EventEmitter();
    onOpen = new EventEmitter();
    marginRight = 0;
    constructor(ref) {
        this.ref = ref;
    }
    _onOpen(event) {
        if (this.disabled) {
            return;
        }
        this.openedChange.emit(!this.opened);
        this.onOpen.emit(event);
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    setSelectable = (selectable) => {
        if (this.selectable === false) {
            return;
        }
        this.selectable = selectable;
        this.ref.detectChanges();
    };
    setSelected = (selected) => {
        if (this.selectable === false) {
            return;
        }
        this.selected = selected;
        this.selectedChange.emit(selected);
        this.ref.detectChanges();
    };
    setMarginRight(margin) {
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    setMarginLeft(margin) {
        if (this.columns.length === 0) {
            return;
        }
        this.columns.forEach(_column => {
            _column.setMarginLeft(margin);
            this.ref.detectChanges();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableRowComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTableRowComponent, isStandalone: true, selector: "bizy-table-row", inputs: { id: "id", customClass: "customClass", disabled: "disabled", selected: "selected", opened: "opened", selectable: "selectable" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect", openedChange: "openedChange", onOpen: "onOpen" }, queries: [{ propertyName: "columns", predicate: BizyTableColumnComponent }], ngImport: i0, template: "<bizy-accordion \n    class=\"bizy-table-row__accordion\"\n    customClass=\"bizy-table-row__accordion {{disabled ? 'bizy-table-row--disabled' : ''}} {{selected ? 'bizy-table-row--selected' : ''}} {{opened ? 'bizy-table-row--opened' : ''}}\"\n    [(opened)]=\"opened\"\n    (onSelect)=\"_onOpen($event)\">\n\n    <button\n        type=\"button\"\n        [id]=\"id\"\n        class=\"bizy-table-row {{customClass}}\"\n        (click)=\"selectedChange.emit(!selected)\"\n        (keyup.enter)=\"selectedChange.emit(!selected)\"\n        [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n        <ng-content select=\"bizy-table-column\"></ng-content>\n\n        <bizy-checkbox \n            *ngIf=\"selectable !== null\"\n            class=\"bizy-table-row__checkbox\"\n            [ngStyle]=\"{right: marginRight + 'px'}\"\n            [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event); $event.stopPropagation()\">\n        </bizy-checkbox>\n        \n    </button>\n\n    <ng-content accordion-option select=\"bizy-table-row-expand-content\"></ng-content>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;width:100%;background-color:var(--bizy-table-row-background-color);display:flex;min-width:fit-content;margin-bottom:.1rem}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row__accordion:hover ::ng-deep .bizy-table-row:before{opacity:1}::ng-deep .bizy-table-row__accordion{padding:0!important;--bizy-accordion-background-color: var(--bizy-table-row-background-color);--bizy-accordion-padding-left: 0}::ng-deep .bizy-table-row__accordion .bizy-accordion__options{--bizy-accordion-padding-left: 0}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:fit-content;border:none;min-height:var(--bizy-table-row-height);background-color:inherit;border-bottom:inherit}::ng-deep .bizy-table-row:before{content:\"\";position:absolute;inset:0;background-color:var(--bizy-table-row-hover-background-color);opacity:0;pointer-events:none;z-index:1}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color)!important}:host(:has(bizy-table-row-expand-content)) ::ng-deep .bizy-table-row--opened{background-color:var(--bizy-table-row-opened-background-color)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: BizyAccordionComponent, selector: "bizy-accordion", inputs: ["id", "customClass", "disabled", "opened"], outputs: ["openedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row', imports: [CommonModule, BizyAccordionComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-accordion \n    class=\"bizy-table-row__accordion\"\n    customClass=\"bizy-table-row__accordion {{disabled ? 'bizy-table-row--disabled' : ''}} {{selected ? 'bizy-table-row--selected' : ''}} {{opened ? 'bizy-table-row--opened' : ''}}\"\n    [(opened)]=\"opened\"\n    (onSelect)=\"_onOpen($event)\">\n\n    <button\n        type=\"button\"\n        [id]=\"id\"\n        class=\"bizy-table-row {{customClass}}\"\n        (click)=\"selectedChange.emit(!selected)\"\n        (keyup.enter)=\"selectedChange.emit(!selected)\"\n        [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n        <ng-content select=\"bizy-table-column\"></ng-content>\n\n        <bizy-checkbox \n            *ngIf=\"selectable !== null\"\n            class=\"bizy-table-row__checkbox\"\n            [ngStyle]=\"{right: marginRight + 'px'}\"\n            [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event); $event.stopPropagation()\">\n        </bizy-checkbox>\n        \n    </button>\n\n    <ng-content accordion-option select=\"bizy-table-row-expand-content\"></ng-content>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;width:100%;background-color:var(--bizy-table-row-background-color);display:flex;min-width:fit-content;margin-bottom:.1rem}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row__accordion:hover ::ng-deep .bizy-table-row:before{opacity:1}::ng-deep .bizy-table-row__accordion{padding:0!important;--bizy-accordion-background-color: var(--bizy-table-row-background-color);--bizy-accordion-padding-left: 0}::ng-deep .bizy-table-row__accordion .bizy-accordion__options{--bizy-accordion-padding-left: 0}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:fit-content;border:none;min-height:var(--bizy-table-row-height);background-color:inherit;border-bottom:inherit}::ng-deep .bizy-table-row:before{content:\"\";position:absolute;inset:0;background-color:var(--bizy-table-row-hover-background-color);opacity:0;pointer-events:none;z-index:1}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color)!important}:host(:has(bizy-table-row-expand-content)) ::ng-deep .bizy-table-row--opened{background-color:var(--bizy-table-row-opened-background-color)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { columns: [{
                type: ContentChildren,
                args: [BizyTableColumnComponent]
            }], id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], opened: [{
                type: Input
            }], selectable: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], openedChange: [{
                type: Output
            }], onOpen: [{
                type: Output
            }] } });

// FIX: This components fixes the bug with Angular CDK virtual scrolling not supporting content projection.
// https://github.com/angular/components/issues/15277
class BizyTableScrollingComponent {
    document;
    elementRef;
    ref;
    viewport;
    content;
    #view;
    items$;
    itemTemplate;
    itemSize;
    #subscription = new Subscription();
    #scrollTop = 0;
    constructor(document, elementRef, ref) {
        this.document = document;
        this.elementRef = elementRef;
        this.ref = ref;
    }
    /** Called by the virtual-for directive inside of the viewport. */
    attachView(tableDirective) {
        if (this.#view) {
            return;
        }
        let itemSize = 30;
        const rowHeight = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-table-row-height');
        const fontSize = getComputedStyle(this.document.documentElement).getPropertyValue('font-size');
        const gap = Number(fontSize.split('px')[0]) * 0.1;
        if (rowHeight && rowHeight.includes('rem')) {
            itemSize = Number(fontSize.split('px')[0]) * Number(rowHeight.split('rem')[0]);
        }
        else if (rowHeight && rowHeight.includes('px')) {
            itemSize = Number(rowHeight.split('px')[0]);
        }
        this.itemSize = itemSize + gap;
        this.items$ = tableDirective.items$;
        this.itemTemplate = tableDirective.template;
        this.#view = tableDirective.viewContainerRef;
        this.#view.createEmbeddedView(this.content);
        this.ref.detectChanges();
        this.#subscription.add(fromEvent(this.elementRef.nativeElement, 'scroll', { capture: true }).pipe(debounceTime$1(100)).subscribe(() => {
            this.#scrollTop = this.viewport.measureScrollOffset();
        }));
        this.#subscription.add(this.items$.pipe(skip(1)).subscribe(() => {
            if (this.viewport) {
                this.viewport.scrollToOffset(this.#scrollTop);
                this.ref.detectChanges();
            }
        }));
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableScrollingComponent, deps: [{ token: DOCUMENT }, { token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTableScrollingComponent, isStandalone: true, selector: "bizy-table-scrolling", viewQueries: [{ propertyName: "viewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true }, { propertyName: "content", first: true, predicate: ["tableScrollingContent"], descendants: true }], ngImport: i0, template: "<cdk-virtual-scroll-viewport \n    [itemSize]=\"itemSize\"\n    [minBufferPx]=\"itemSize + (itemSize * 20)\"\n    [maxBufferPx]=\"itemSize + (itemSize * 40)\">\n    \n    <ng-content></ng-content>\n\n    <ng-template #tableScrollingContent>\n      <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"items$ | async\">\n        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\"></ng-template>\n      </ng-template>\n    </ng-template>\n</cdk-virtual-scroll-viewport>", styles: ["::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-table-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-table-scroll-bar-hover-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }, { kind: "ngmodule", type: ScrollingModule }, { kind: "directive", type: i2$2.ɵɵCdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2$2.ɵɵCdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2$2.ɵɵCdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableScrollingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-scrolling', imports: [CommonModule, ScrollingModule], template: "<cdk-virtual-scroll-viewport \n    [itemSize]=\"itemSize\"\n    [minBufferPx]=\"itemSize + (itemSize * 20)\"\n    [maxBufferPx]=\"itemSize + (itemSize * 40)\">\n    \n    <ng-content></ng-content>\n\n    <ng-template #tableScrollingContent>\n      <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"items$ | async\">\n        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\"></ng-template>\n      </ng-template>\n    </ng-template>\n</cdk-virtual-scroll-viewport>", styles: ["::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-table-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-table-scroll-bar-hover-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { viewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport]
            }], content: [{
                type: ViewChild,
                args: ['tableScrollingContent']
            }] } });

class BizyTableComponent {
    ref;
    document;
    renderer;
    elementRef;
    viewport;
    virtualFor;
    rows;
    headers;
    footers;
    resizeRef = null;
    #selectableMutationObserver;
    #rowScrollingMutationObserver;
    #afterContentInitObserver;
    #resizeObserver;
    notifier$ = new Subject();
    #subscription = new Subscription();
    marginRight = 0;
    marginLeft = 0;
    set selectable(selectable) {
        this.#selectableMutationObserver = new MutationObserver(() => {
            if (!this.rows || this.rows.length === 0) {
                return;
            }
            this.rows.forEach(_row => {
                _row.setSelectable(selectable);
                _row.setMarginRight(this.marginRight);
                _row.setMarginLeft(this.marginLeft);
            });
            this.headers.forEach(_header => {
                _header.setSelectable(selectable);
            });
            this.footers.forEach(_footer => {
                _footer.setSelectable(selectable);
            });
            this.ref.detectChanges();
        });
        this.#selectableMutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    ;
    constructor(ref, document, renderer, elementRef) {
        this.ref = ref;
        this.document = document;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        this.#rowScrollingMutationObserver = new MutationObserver(() => {
            if (!this.virtualFor || !this.viewport) {
                return;
            }
            if (this.elementRef.nativeElement.offsetHeight) {
                const fontSize = getComputedStyle(this.document.documentElement).getPropertyValue('font-size');
                const gap = Number(fontSize.split('px')[0]) * 0.3;
                let headersHeight = 0;
                this.headers.forEach(_header => {
                    headersHeight += _header.elementRef.nativeElement.offsetHeight + gap;
                });
                let footersHeight = 0;
                this.footers.forEach(_footer => {
                    footersHeight += _footer.elementRef.nativeElement.offsetHeight + gap;
                });
                this.renderer.setStyle(this.viewport.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.offsetHeight - headersHeight - footersHeight}px`);
            }
            this.viewport.attachView(this.virtualFor);
            this.#rowScrollingMutationObserver.disconnect();
            this.ref.detectChanges();
            this.#afterContentInitObserver = new MutationObserver(() => {
                if (!this.elementRef.nativeElement.offsetWidth) {
                    return;
                }
                this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
                this.marginLeft = this.elementRef.nativeElement.scrollLeft;
                this.rows.forEach(_row => {
                    _row.setMarginRight(this.marginRight);
                    _row.setMarginLeft(this.marginLeft);
                });
                this.headers.forEach(_header => {
                    _header.setMarginRight(this.marginRight);
                    _header.setMarginLeft(this.marginLeft);
                });
                this.footers.forEach(_footer => {
                    _footer.setMarginRight(this.marginRight);
                    _footer.setMarginLeft(this.marginLeft);
                });
                this.#subscription.add(fromEvent(this.elementRef.nativeElement, 'scroll', { capture: true }).subscribe(() => {
                    this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
                    this.marginLeft = this.elementRef.nativeElement.scrollLeft;
                    this.rows.forEach(_row => {
                        _row.setMarginRight(this.marginRight);
                        _row.setMarginLeft(this.marginLeft);
                    });
                    this.headers.forEach(_header => {
                        _header.setMarginRight(this.marginRight);
                        _header.setMarginLeft(this.marginLeft);
                    });
                    this.footers.forEach(_footer => {
                        _footer.setMarginRight(this.marginRight);
                        _footer.setMarginLeft(this.marginLeft);
                    });
                }));
                this.#afterContentInitObserver.disconnect();
                this.ref.detectChanges();
            });
            this.#afterContentInitObserver.observe(this.document.body, { childList: true, subtree: true });
        });
        this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });
        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
        const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
        this.#resizeObserver.observe(resizeRef);
        this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime$1(200)).subscribe(() => {
            if (this.viewport && this.elementRef.nativeElement.offsetHeight) {
                const fontSize = getComputedStyle(this.document.documentElement).getPropertyValue('font-size');
                const gap = Number(fontSize.split('px')[0]) * 0.3;
                let headersHeight = 0;
                this.headers.forEach(_header => {
                    headersHeight += _header.elementRef.nativeElement.offsetHeight + gap;
                });
                let footersHeight = 0;
                this.footers.forEach(_footer => {
                    footersHeight += _footer.elementRef.nativeElement.offsetHeight + gap;
                });
                this.renderer.setStyle(this.viewport.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.offsetHeight - headersHeight - footersHeight}px`);
            }
            this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
            this.marginLeft = this.elementRef.nativeElement.scrollLeft;
            this.rows.forEach(_row => {
                _row.setMarginRight(this.marginRight);
                _row.setMarginLeft(this.marginLeft);
            });
            this.headers.forEach(_header => {
                _header.setMarginRight(this.marginRight);
                _header.setMarginLeft(this.marginLeft);
            });
            this.footers.forEach(_footer => {
                _footer.setMarginRight(this.marginRight);
                _footer.setMarginLeft(this.marginLeft);
            });
        }));
        this.notifier$.next();
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#selectableMutationObserver) {
            this.#selectableMutationObserver.disconnect();
        }
        if (this.#rowScrollingMutationObserver) {
            this.#rowScrollingMutationObserver.disconnect();
        }
        if (this.#afterContentInitObserver) {
            this.#afterContentInitObserver.disconnect();
        }
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: Renderer2 }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTableComponent, isStandalone: true, selector: "bizy-table", inputs: { resizeRef: "resizeRef", selectable: "selectable" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyTableScrollingDirective, descendants: true }, { propertyName: "rows", predicate: BizyTableRowComponent }, { propertyName: "headers", predicate: BizyTableHeaderComponent }, { propertyName: "footers", predicate: BizyTableFooterComponent }], viewQueries: [{ propertyName: "viewport", first: true, predicate: BizyTableScrollingComponent, descendants: true }], ngImport: i0, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-table-min-height);max-height:var(--bizy-table-max-height);height:var(--bizy-table-height);width:var(--bizy-table-width);flex:1;overflow-x:auto;overflow-y:hidden}.bizy-table{width:inherit;height:inherit;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{width:100%;display:flex;flex-direction:column;min-width:fit-content;overflow-x:hidden}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: BizyTableScrollingComponent, selector: "bizy-table-scrolling" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table', imports: [
                        CommonModule,
                        ScrollingModule,
                        BizyTableScrollingComponent
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-table-min-height);max-height:var(--bizy-table-max-height);height:var(--bizy-table-height);width:var(--bizy-table-width);flex:1;overflow-x:auto;overflow-y:hidden}.bizy-table{width:inherit;height:inherit;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{width:100%;display:flex;flex-direction:column;min-width:fit-content;overflow-x:hidden}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }], propDecorators: { viewport: [{
                type: ViewChild,
                args: [BizyTableScrollingComponent]
            }], virtualFor: [{
                type: ContentChild,
                args: [BizyTableScrollingDirective]
            }], rows: [{
                type: ContentChildren,
                args: [BizyTableRowComponent]
            }], headers: [{
                type: ContentChildren,
                args: [BizyTableHeaderComponent]
            }], footers: [{
                type: ContentChildren,
                args: [BizyTableFooterComponent]
            }], resizeRef: [{
                type: Input
            }], selectable: [{
                type: Input
            }] } });

class BizyTableColumnArrowsComponent {
    order = null;
    show = false;
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableColumnArrowsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTableColumnArrowsComponent, isStandalone: true, selector: "bizy-table-column-arrows", inputs: { order: "order", show: "show", customClass: "customClass" }, ngImport: i0, template: "<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 448 512\"\n    *ngIf=\"order !== 'asc' && order !== 'desc'\"\n    name=\"bizy-table-column-arrows\"\n    class=\"bizy-table-column-arrows bizy-table-column-arrows__down-up animated fade-in {{customClass}}\">\n    <path d=\"M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z\"/>\n</svg>\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'desc'\"\n    name=\"bizy-table-column-down-arrow\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\">\n    <path d=\"M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z\"/>\n</svg>\n\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'asc'\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\"\n    name=\"bizy-table-column-up-arrow\">\n    <path d=\"M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z\"/>\n</svg>\n", styles: [":host{font-size:1rem}.bizy-table-column-arrows__down-up{transform:rotate(90deg)}.bizy-table-column-arrows{display:none;font-size:1rem;height:1rem;fill:var(--bizy-table-column-arrows-color)}.bizy-table-column-arrows--visible{display:inline-block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableColumnArrowsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-column-arrows', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 448 512\"\n    *ngIf=\"order !== 'asc' && order !== 'desc'\"\n    name=\"bizy-table-column-arrows\"\n    class=\"bizy-table-column-arrows bizy-table-column-arrows__down-up animated fade-in {{customClass}}\">\n    <path d=\"M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z\"/>\n</svg>\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'desc'\"\n    name=\"bizy-table-column-down-arrow\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\">\n    <path d=\"M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z\"/>\n</svg>\n\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'asc'\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\"\n    name=\"bizy-table-column-up-arrow\">\n    <path d=\"M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z\"/>\n</svg>\n", styles: [":host{font-size:1rem}.bizy-table-column-arrows__down-up{transform:rotate(90deg)}.bizy-table-column-arrows{display:none;font-size:1rem;height:1rem;fill:var(--bizy-table-column-arrows-color)}.bizy-table-column-arrows--visible{display:inline-block}\n"] }]
        }], propDecorators: { order: [{
                type: Input
            }], show: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

class BizyTableRowExpandContentComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableRowExpandContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTableRowExpandContentComponent, isStandalone: true, selector: "bizy-table-row-expand-content", ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;width:100%;background-color:var(--bizy-table-row-expand-content-background-color);border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;padding:.5rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableRowExpandContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row-expand-content', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;width:100%;background-color:var(--bizy-table-row-expand-content-background-color);border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;padding:.5rem}\n"] }]
        }] });

const COMPONENTS$5 = [
    BizyTableComponent,
    BizyTableColumnComponent,
    BizyTableColumnArrowsComponent,
    BizyTableFooterComponent,
    BizyTableHeaderComponent,
    BizyTableRowComponent,
    BizyTableRowExpandContentComponent,
    BizyTableScrollingComponent
];
const DIRECTIVES$1 = [
    BizyTableScrollingDirective,
    BizyTableColumnFixedDirective
];
class BizyTableModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyTableModule, imports: [BizyTableComponent,
            BizyTableColumnComponent,
            BizyTableColumnArrowsComponent,
            BizyTableFooterComponent,
            BizyTableHeaderComponent,
            BizyTableRowComponent,
            BizyTableRowExpandContentComponent,
            BizyTableScrollingComponent, BizyTableScrollingDirective,
            BizyTableColumnFixedDirective], exports: [BizyTableComponent,
            BizyTableColumnComponent,
            BizyTableColumnArrowsComponent,
            BizyTableFooterComponent,
            BizyTableHeaderComponent,
            BizyTableRowComponent,
            BizyTableRowExpandContentComponent,
            BizyTableScrollingComponent, BizyTableScrollingDirective,
            BizyTableColumnFixedDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableModule, imports: [BizyTableComponent,
            BizyTableColumnComponent,
            BizyTableColumnArrowsComponent,
            BizyTableFooterComponent,
            BizyTableHeaderComponent,
            BizyTableRowComponent,
            BizyTableScrollingComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$5.concat(DIRECTIVES$1),
                    exports: COMPONENTS$5.concat(DIRECTIVES$1),
                }]
        }] });

class BizyTabComponent {
    elementRef;
    id = `bizy-tab-${Math.random()}`;
    disabled = false;
    selected = false;
    linePosition = 'bottom';
    customClass;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.selectedChange.emit(true);
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTabComponent, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTabComponent, isStandalone: true, selector: "bizy-tab", inputs: { id: "id", disabled: "disabled", selected: "selected", linePosition: "linePosition", customClass: "customClass" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'top'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected}\"></span>\n\n<button \n  type=\"button\"\n  [id]=\"id\"\n  [ngClass]=\"{'bizy-tab--selected': selected, 'bizy-tab--disabled': disabled}\"\n  class=\"bizy-tab {{customClass}}\"\n  (click)=\"_onSelect($event)\"\n  (keyup.enter)=\"_onSelect($event)\">\n\n  <ng-content></ng-content>\n\n</button>\n\n<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'bottom'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected}\"></span>\n", styles: [":host{font-size:1rem;height:100%;flex:var(--bizy-tab-flex);overflow:hidden;display:flex;flex-direction:column}.bizy-tab{width:100%;height:100%;min-width:fit-content;display:flex;flex-direction:column;row-gap:var(--bizy-tab-row-gap);align-items:center;text-wrap:nowrap;border-top:var(--bizy-tab-border-top);border-right:var(--bizy-tab-border-right);border-bottom:var(--bizy-tab-border-bottom);border-left:var(--bizy-tab-border-left);border-radius:var(--bizy-tab-border-radius);padding:var(--bizy-tab-padding);background-color:var(--bizy-tab-background-color);color:var(--bizy-tab-color);cursor:pointer}::ng-deep .bizy-tab *{color:var(--bizy-tab-color);background-color:var(--bizy-tab-background-color)}.bizy-tab--selected{color:var(--bizy-tab-selected-color);background-color:var(--bizy-tab-selected-background-color)}::ng-deep .bizy-tab--selected *{color:var(--bizy-tab-selected-color);background-color:var(--bizy-tab-selected-background-color)}.bizy-tab--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}@keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-tab__selected-line{width:100%;height:var(--bizy-tab-selected-bar-height);visibility:hidden;pointer-events:none;background-color:var(--bizy-tab-selected-bar-color)}.bizy-tab__selected-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tab', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'top'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected}\"></span>\n\n<button \n  type=\"button\"\n  [id]=\"id\"\n  [ngClass]=\"{'bizy-tab--selected': selected, 'bizy-tab--disabled': disabled}\"\n  class=\"bizy-tab {{customClass}}\"\n  (click)=\"_onSelect($event)\"\n  (keyup.enter)=\"_onSelect($event)\">\n\n  <ng-content></ng-content>\n\n</button>\n\n<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'bottom'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected}\"></span>\n", styles: [":host{font-size:1rem;height:100%;flex:var(--bizy-tab-flex);overflow:hidden;display:flex;flex-direction:column}.bizy-tab{width:100%;height:100%;min-width:fit-content;display:flex;flex-direction:column;row-gap:var(--bizy-tab-row-gap);align-items:center;text-wrap:nowrap;border-top:var(--bizy-tab-border-top);border-right:var(--bizy-tab-border-right);border-bottom:var(--bizy-tab-border-bottom);border-left:var(--bizy-tab-border-left);border-radius:var(--bizy-tab-border-radius);padding:var(--bizy-tab-padding);background-color:var(--bizy-tab-background-color);color:var(--bizy-tab-color);cursor:pointer}::ng-deep .bizy-tab *{color:var(--bizy-tab-color);background-color:var(--bizy-tab-background-color)}.bizy-tab--selected{color:var(--bizy-tab-selected-color);background-color:var(--bizy-tab-selected-background-color)}::ng-deep .bizy-tab--selected *{color:var(--bizy-tab-selected-color);background-color:var(--bizy-tab-selected-background-color)}.bizy-tab--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}@keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-tab__selected-line{width:100%;height:var(--bizy-tab-selected-bar-height);visibility:hidden;pointer-events:none;background-color:var(--bizy-tab-selected-bar-color)}.bizy-tab__selected-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.2s;animation-fill-mode:both}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], linePosition: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

class BizyTabsComponent {
    ref;
    tabs;
    bizyTabs;
    bizyTabsWrapper;
    customClass;
    #SCROLL_STEP = 50;
    showLeftButton = false;
    showRightButton = false;
    #resizeObserver = null;
    #subscription = new Subscription();
    #resize$ = new Subject();
    #initialScroll = 0;
    constructor(ref) {
        this.ref = ref;
    }
    ngAfterViewInit() {
        this.bizyTabsWrapper.nativeElement.scrollLeft = this.#initialScroll;
        this.#resizeObserver = new ResizeObserver(() => this.#resize$.next());
        this.#resizeObserver.observe(this.bizyTabs.nativeElement);
        this.#subscription.add(this.#resize$.pipe(debounceTime$1(100)).subscribe(() => {
            this.#checkButtons();
        }));
    }
    ngAfterContentInit() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs.get(i).selected) {
                this.#initialScroll = this.tabs.get(i).elementRef.nativeElement.offsetLeft;
                break;
            }
        }
    }
    onScrollLeft() {
        this.bizyTabsWrapper.nativeElement.scrollLeft = this.bizyTabsWrapper.nativeElement.scrollLeft - this.#SCROLL_STEP < 0 ? 0 : this.bizyTabsWrapper.nativeElement.scrollLeft - this.#SCROLL_STEP;
        this.#checkButtons();
    }
    onScrollRight() {
        this.bizyTabsWrapper.nativeElement.scrollLeft = (this.bizyTabsWrapper.nativeElement.scrollLeft + this.#SCROLL_STEP) > this.bizyTabsWrapper.nativeElement.scrollWidth ? this.bizyTabsWrapper.nativeElement.scrollWidth : this.bizyTabsWrapper.nativeElement.scrollLeft + this.#SCROLL_STEP;
        this.#checkButtons();
    }
    #checkButtons() {
        this.showLeftButton = this.bizyTabsWrapper.nativeElement.scrollLeft > 0;
        this.showRightButton = (this.bizyTabsWrapper.nativeElement.scrollWidth - this.bizyTabs.nativeElement.offsetWidth) > 0 && (this.bizyTabsWrapper.nativeElement.scrollLeft < (this.bizyTabsWrapper.nativeElement.scrollWidth - this.bizyTabs.nativeElement.offsetWidth));
        this.ref.detectChanges();
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#resizeObserver.disconnect();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTabsComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTabsComponent, isStandalone: true, selector: "bizy-tabs", inputs: { customClass: "customClass" }, queries: [{ propertyName: "tabs", predicate: BizyTabComponent }], viewQueries: [{ propertyName: "bizyTabs", first: true, predicate: ["bizyTabs"], descendants: true }, { propertyName: "bizyTabsWrapper", first: true, predicate: ["bizyTabsWrapper"], descendants: true }], ngImport: i0, template: "<div #bizyTabs class=\"bizy-tabs {{customClass}}\">\n\n    <button \n        type=\"button\"\n        class=\"bizy-tabs__scroll-button bizy-tabs__scroll-button--left\"\n        *ngIf=\"showLeftButton\"\n        (click)=\"onScrollLeft()\"\n        (keyup.enter)=\"onScrollLeft()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\" class=\"bizy-tabs__scroll-button__arrow\">\n            <path d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z\"/>\n        </svg>\n    </button>\n\n    <span class=\"bizy-tabs__wrapper\" #bizyTabsWrapper>\n\n        <ng-content select=\"bizy-tab\"></ng-content>\n\n    </span>\n\n    <button \n        type=\"button\"\n        class=\"bizy-tabs__scroll-button bizy-tabs__scroll-button--right\"\n        *ngIf=\"showRightButton\"\n        (click)=\"onScrollRight()\"\n        (keyup.enter)=\"onScrollRight()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\" class=\"bizy-tabs__scroll-button__arrow\">\n            <path d=\"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z\"/>\n        </svg>\n    </button>\n\n</div>", styles: [":host{font-size:1rem}.bizy-tabs{display:flex;width:100%;height:100%;overflow:hidden;background-color:transparent}.bizy-tabs__wrapper{display:flex;align-items:center;width:100%;height:100%;position:relative;overflow-y:hidden;overflow-x:auto;scroll-behavior:smooth;column-gap:var(--bizy-tabs-column-gap);background-color:var(--bizy-tabs-background-color)}.bizy-tabs__wrapper::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-tabs__wrapper::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-tabs-scroll-bar-color)}.bizy-tabs__wrapper::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-tabs-scroll-bar-hover-color)}.bizy-tabs__wrapper::-webkit-scrollbar-button{height:1rem}.bizy-tabs__scroll-button{width:2rem;border:none;background-color:var(--bizy-tabs-arrow-button-background-color);display:flex;align-items:center;padding:.3rem;justify-content:center;box-shadow:0 0 47px -5px #000;-webkit-box-shadow:0px 0px 47px -5px rgba(0,0,0,1);-moz-box-shadow:0px 0px 47px -5px rgba(0,0,0,1)}.bizy-tabs__scroll-button--left{border-right:.1rem solid #6666}.bizy-tabs__scroll-button--right{border-left:.1rem solid #6666}.bizy-tabs__scroll-button__arrow{height:1rem;fill:var(--bizy-tabs-arrow-button-color)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tabs', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div #bizyTabs class=\"bizy-tabs {{customClass}}\">\n\n    <button \n        type=\"button\"\n        class=\"bizy-tabs__scroll-button bizy-tabs__scroll-button--left\"\n        *ngIf=\"showLeftButton\"\n        (click)=\"onScrollLeft()\"\n        (keyup.enter)=\"onScrollLeft()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\" class=\"bizy-tabs__scroll-button__arrow\">\n            <path d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z\"/>\n        </svg>\n    </button>\n\n    <span class=\"bizy-tabs__wrapper\" #bizyTabsWrapper>\n\n        <ng-content select=\"bizy-tab\"></ng-content>\n\n    </span>\n\n    <button \n        type=\"button\"\n        class=\"bizy-tabs__scroll-button bizy-tabs__scroll-button--right\"\n        *ngIf=\"showRightButton\"\n        (click)=\"onScrollRight()\"\n        (keyup.enter)=\"onScrollRight()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\" class=\"bizy-tabs__scroll-button__arrow\">\n            <path d=\"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z\"/>\n        </svg>\n    </button>\n\n</div>", styles: [":host{font-size:1rem}.bizy-tabs{display:flex;width:100%;height:100%;overflow:hidden;background-color:transparent}.bizy-tabs__wrapper{display:flex;align-items:center;width:100%;height:100%;position:relative;overflow-y:hidden;overflow-x:auto;scroll-behavior:smooth;column-gap:var(--bizy-tabs-column-gap);background-color:var(--bizy-tabs-background-color)}.bizy-tabs__wrapper::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-tabs__wrapper::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-tabs-scroll-bar-color)}.bizy-tabs__wrapper::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-tabs-scroll-bar-hover-color)}.bizy-tabs__wrapper::-webkit-scrollbar-button{height:1rem}.bizy-tabs__scroll-button{width:2rem;border:none;background-color:var(--bizy-tabs-arrow-button-background-color);display:flex;align-items:center;padding:.3rem;justify-content:center;box-shadow:0 0 47px -5px #000;-webkit-box-shadow:0px 0px 47px -5px rgba(0,0,0,1);-moz-box-shadow:0px 0px 47px -5px rgba(0,0,0,1)}.bizy-tabs__scroll-button--left{border-right:.1rem solid #6666}.bizy-tabs__scroll-button--right{border-left:.1rem solid #6666}.bizy-tabs__scroll-button__arrow{height:1rem;fill:var(--bizy-tabs-arrow-button-color)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { tabs: [{
                type: ContentChildren,
                args: [BizyTabComponent]
            }], bizyTabs: [{
                type: ViewChild,
                args: ['bizyTabs']
            }], bizyTabsWrapper: [{
                type: ViewChild,
                args: ['bizyTabsWrapper']
            }], customClass: [{
                type: Input
            }] } });

const COMPONENTS$4 = [
    BizyTabsComponent,
    BizyTabComponent
];
class BizyTabsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyTabsModule, imports: [BizyTabsComponent,
            BizyTabComponent], exports: [BizyTabsComponent,
            BizyTabComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTabsModule, imports: [COMPONENTS$4] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTabsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$4,
                    exports: COMPONENTS$4,
                }]
        }] });

var BIZY_TAG_TYPE;
(function (BIZY_TAG_TYPE) {
    BIZY_TAG_TYPE["DEFAULT"] = "default";
    BIZY_TAG_TYPE["SUCCESS"] = "success";
    BIZY_TAG_TYPE["INFO"] = "info";
    BIZY_TAG_TYPE["WARNING"] = "warning";
    BIZY_TAG_TYPE["DANGER"] = "danger";
})(BIZY_TAG_TYPE || (BIZY_TAG_TYPE = {}));
;

class BizyTagComponent {
    id = `bizy-tag-${Math.random()}`;
    customClass = '';
    disabled = false;
    type = BIZY_TAG_TYPE.DEFAULT;
    onSelect = new EventEmitter();
    _focused = false;
    _onSelect(event) {
        if (this.disabled || !this._focused) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTagComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTagComponent, isStandalone: true, selector: "bizy-tag", inputs: { id: "id", customClass: "customClass", disabled: "disabled", type: "type" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (focus)=\"_focused = true\"\n    (blur)=\"_focused = false\"\n    [ngClass]=\"{'bizy-tag--disabled': disabled}\"\n    class=\"bizy-tag bizy-tag--{{type}} {{customClass}}\"\n    (click)=\"_focused = true; _onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n\n    <ng-content></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-tag{border:none;padding:var(--bizy-tag-padding);border-radius:.3rem;display:flex;justify-content:center;cursor:pointer;column-gap:.5rem;align-items:center;text-wrap:nowrap;width:fit-content}.bizy-tag--default{background-color:var(--bizy-tag-default-background-color)}::ng-deep .bizy-tag--default *{color:var(--bizy-tag-default-color)!important}.bizy-tag--info{background-color:var(--bizy-tag-info-background-color)}::ng-deep .bizy-tag--info *{color:var(--bizy-tag-info-color)!important}.bizy-tag--success{background-color:var(--bizy-tag-success-background-color)}::ng-deep .bizy-tag--success *{color:var(--bizy-tag-success-color)!important}.bizy-tag--warning{background-color:var(--bizy-tag-warning-background-color)}::ng-deep .bizy-tag--warning *{color:var(--bizy-tag-warning-color)!important}.bizy-tag--danger{background-color:var(--bizy-tag-danger-background-color)}::ng-deep .bizy-tag--danger *{color:var(--bizy-tag-danger-color)!important}.bizy-tag--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tag', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (focus)=\"_focused = true\"\n    (blur)=\"_focused = false\"\n    [ngClass]=\"{'bizy-tag--disabled': disabled}\"\n    class=\"bizy-tag bizy-tag--{{type}} {{customClass}}\"\n    (click)=\"_focused = true; _onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n\n    <ng-content></ng-content>\n\n</button>", styles: [":host{font-size:1rem}.bizy-tag{border:none;padding:var(--bizy-tag-padding);border-radius:.3rem;display:flex;justify-content:center;cursor:pointer;column-gap:.5rem;align-items:center;text-wrap:nowrap;width:fit-content}.bizy-tag--default{background-color:var(--bizy-tag-default-background-color)}::ng-deep .bizy-tag--default *{color:var(--bizy-tag-default-color)!important}.bizy-tag--info{background-color:var(--bizy-tag-info-background-color)}::ng-deep .bizy-tag--info *{color:var(--bizy-tag-info-color)!important}.bizy-tag--success{background-color:var(--bizy-tag-success-background-color)}::ng-deep .bizy-tag--success *{color:var(--bizy-tag-success-color)!important}.bizy-tag--warning{background-color:var(--bizy-tag-warning-background-color)}::ng-deep .bizy-tag--warning *{color:var(--bizy-tag-warning-color)!important}.bizy-tag--danger{background-color:var(--bizy-tag-danger-background-color)}::ng-deep .bizy-tag--danger *{color:var(--bizy-tag-danger-color)!important}.bizy-tag--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$3 = [
    BizyTagComponent,
];
class BizyTagModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTagModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyTagModule, imports: [BizyTagComponent], exports: [BizyTagComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTagModule, imports: [COMPONENTS$3] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTagModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$3,
                    exports: COMPONENTS$3,
                }]
        }] });

class BizyTimelineComponent {
    id = `bizy-timeline-${Math.random()}`;
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTimelineComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTimelineComponent, isStandalone: true, selector: "bizy-timeline", inputs: { id: "id", customClass: "customClass" }, host: { properties: { "id": "id", "class": "customClass" } }, ngImport: i0, template: "<ng-content select=\"bizy-timeline-event\"></ng-content>\n", styles: [":host{font-size:1rem;display:flex;flex-direction:column;align-items:center;row-gap:var(--bizy-timeline-row-gap);height:100%;width:100%}:host:not(:has(.bizy-timeline-event--start:not(:empty))) ::ng-deep bizy-timeline-event{grid-template-columns:fit-content(100%) 1fr!important}:host:not(:has(.bizy-timeline-event--start:not(:empty))) ::ng-deep .bizy-timeline-event--start{display:none}:host:not(:has(.bizy-timeline-event--end:not(:empty))) ::ng-deep bizy-timeline-event{grid-template-columns:1fr fit-content(100%)!important}:host:not(:has(.bizy-timeline-event--end:not(:empty))) ::ng-deep .bizy-timeline-event--end{display:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTimelineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-timeline', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[id]': 'id',
                        '[class]': 'customClass'
                    }, template: "<ng-content select=\"bizy-timeline-event\"></ng-content>\n", styles: [":host{font-size:1rem;display:flex;flex-direction:column;align-items:center;row-gap:var(--bizy-timeline-row-gap);height:100%;width:100%}:host:not(:has(.bizy-timeline-event--start:not(:empty))) ::ng-deep bizy-timeline-event{grid-template-columns:fit-content(100%) 1fr!important}:host:not(:has(.bizy-timeline-event--start:not(:empty))) ::ng-deep .bizy-timeline-event--start{display:none}:host:not(:has(.bizy-timeline-event--end:not(:empty))) ::ng-deep bizy-timeline-event{grid-template-columns:1fr fit-content(100%)!important}:host:not(:has(.bizy-timeline-event--end:not(:empty))) ::ng-deep .bizy-timeline-event--end{display:none}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

class BizyTimelineEventComponent {
    id = `bizy-timeline-event-${Math.random()}`;
    customClass = '';
    showLine = true;
    disabled = false;
    onSelect = new EventEmitter();
    _focused = false;
    _onSelect(event) {
        if (this.disabled || !this._focused) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTimelineEventComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyTimelineEventComponent, isStandalone: true, selector: "bizy-timeline-event", inputs: { id: "id", customClass: "customClass", showLine: "showLine", disabled: "disabled" }, outputs: { onSelect: "onSelect" }, host: { properties: { "id": "id", "class": "customClass" } }, ngImport: i0, template: "\n<span class=\"bizy-timeline-event--start\">\n  <ng-content select=\"[slot=start]\"></ng-content>\n</span>\n\n<span class=\"bizy-timeline-event-content\" [ngClass]=\"{'bizy-timeline-event--disabled': disabled}\">\n\n  <button \n      type=\"button\"\n      (focus)=\"_focused = true\"\n      (blur)=\"_focused = false\"\n      class=\"bizy-timeline-event-bullet\"\n      (click)=\"_focused = true; _onSelect($event)\"\n      (keyup.enter)=\"_onSelect($event)\">\n\n      <ng-content select=\"[slot=bullet]\"></ng-content>\n      \n  </button>\n\n  <span class=\"bizy-timeline-event-line\" *ngIf=\"showLine\"></span>\n\n</span>\n\n<span class=\"bizy-timeline-event--end\">\n  <ng-content select=\"[slot=end]\"></ng-content>\n</span>", styles: [":host{font-size:1rem;display:grid;grid-template-columns:1fr fit-content(100%) 1fr;column-gap:var(--bizy-timeline-event-column-gap);min-height:fit-content;width:100%}.bizy-timeline-event--start,.bizy-timeline-event--end{width:100%}.bizy-timeline-event-content{justify-self:center;display:flex;flex-direction:column;align-items:center;min-width:var(--bizy-timeline-bullet-section-min-width)}.bizy-timeline-event-bullet{min-width:var(--bizy-timeline-bullet-min-width);min-height:var(--bizy-timeline-bullet-min-height);display:grid;place-items:center;border-radius:50%;border:var(--bizy-timeline-bullet-border);background-color:var(--bizy-timeline-bullet-background-color);cursor:pointer;padding:var(--bizy-timeline-bullet-padding)}.bizy-timeline-event--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}.bizy-timeline-event-line{height:100%;min-height:var(--bizy-timeline-line-min-height);width:var(--bizy-timeline-line-width);background-color:var(--bizy-timeline-line-background-color);display:inline-block;border-radius:.3rem;margin-top:var(--bizy-timeline-row-gap)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTimelineEventComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-timeline-event', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[id]': 'id',
                        '[class]': 'customClass'
                    }, template: "\n<span class=\"bizy-timeline-event--start\">\n  <ng-content select=\"[slot=start]\"></ng-content>\n</span>\n\n<span class=\"bizy-timeline-event-content\" [ngClass]=\"{'bizy-timeline-event--disabled': disabled}\">\n\n  <button \n      type=\"button\"\n      (focus)=\"_focused = true\"\n      (blur)=\"_focused = false\"\n      class=\"bizy-timeline-event-bullet\"\n      (click)=\"_focused = true; _onSelect($event)\"\n      (keyup.enter)=\"_onSelect($event)\">\n\n      <ng-content select=\"[slot=bullet]\"></ng-content>\n      \n  </button>\n\n  <span class=\"bizy-timeline-event-line\" *ngIf=\"showLine\"></span>\n\n</span>\n\n<span class=\"bizy-timeline-event--end\">\n  <ng-content select=\"[slot=end]\"></ng-content>\n</span>", styles: [":host{font-size:1rem;display:grid;grid-template-columns:1fr fit-content(100%) 1fr;column-gap:var(--bizy-timeline-event-column-gap);min-height:fit-content;width:100%}.bizy-timeline-event--start,.bizy-timeline-event--end{width:100%}.bizy-timeline-event-content{justify-self:center;display:flex;flex-direction:column;align-items:center;min-width:var(--bizy-timeline-bullet-section-min-width)}.bizy-timeline-event-bullet{min-width:var(--bizy-timeline-bullet-min-width);min-height:var(--bizy-timeline-bullet-min-height);display:grid;place-items:center;border-radius:50%;border:var(--bizy-timeline-bullet-border);background-color:var(--bizy-timeline-bullet-background-color);cursor:pointer;padding:var(--bizy-timeline-bullet-padding)}.bizy-timeline-event--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}.bizy-timeline-event-line{height:100%;min-height:var(--bizy-timeline-line-min-height);width:var(--bizy-timeline-line-width);background-color:var(--bizy-timeline-line-background-color);display:inline-block;border-radius:.3rem;margin-top:var(--bizy-timeline-row-gap)}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], showLine: [{
                type: Input
            }], disabled: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$2 = [
    BizyTimelineComponent,
    BizyTimelineEventComponent
];
class BizyTimelineModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTimelineModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyTimelineModule, imports: [BizyTimelineComponent,
            BizyTimelineEventComponent], exports: [BizyTimelineComponent,
            BizyTimelineEventComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTimelineModule, imports: [COMPONENTS$2] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTimelineModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$2,
                    exports: COMPONENTS$2,
                }]
        }] });

var _a;
var TOAST;
(function (TOAST) {
    TOAST["DEBUG"] = "debug";
    TOAST["SUCCESS"] = "success";
    TOAST["INFO"] = "info";
    TOAST["WARNING"] = "warning";
    TOAST["DANGER"] = "danger";
})(TOAST || (TOAST = {}));
class BizyToastService {
    #document = inject(DOCUMENT);
    #dialog = inject(Dialog);
    static toasts = new Set();
    duration = 3000;
    defaultDebugTitle = 'Ha sucedido un evento';
    defaultInfoTitle = 'Observación';
    defaultSuccessTitle = 'Operación exitosa';
    defaultWarningTitle = 'Advertencia';
    defaultDangerTitle = 'Hubo un problema';
    #open(data) {
        if (typeof data.data !== 'string' && data.data.duration) {
            this.duration = data.data.duration;
            this.#document.documentElement.style.setProperty('--bizy-toast-duration', `${data.data.duration}ms`);
        }
        const id = `bizy-toast-${Math.random()}`;
        const toastRef = this.#dialog.open(BizyToastWrapperComponent, {
            id,
            data: {
                type: data.type,
                duration: this.duration,
                id,
                title: typeof data.data === 'string' ? data.data : data.data.title,
                msg: typeof data.data === 'string' ? '' : data.data.msg
            },
            autoFocus: false,
            hasBackdrop: false,
            disableClose: false,
            panelClass: ['bizy-toast', 'bizy-toast--in']
        });
        _a.toasts.add(toastRef);
    }
    config(data) {
        if (!data) {
            return;
        }
        if (data.defaultDebugTitle) {
            this.defaultDebugTitle = data.defaultDebugTitle;
        }
        if (data.defaultInfoTitle) {
            this.defaultInfoTitle = data.defaultInfoTitle;
        }
        if (data.defaultSuccessTitle) {
            this.defaultSuccessTitle = data.defaultSuccessTitle;
        }
        if (data.defaultWarningTitle) {
            this.defaultWarningTitle = data.defaultWarningTitle;
        }
        if (data.defaultDangerTitle) {
            this.defaultDangerTitle = data.defaultDangerTitle;
        }
        if (data.duration) {
            this.duration = data.duration;
            this.#document.documentElement.style.setProperty('--bizy-toast-duration', `${data.duration}ms`);
        }
    }
    debug(data) {
        this.#open({ type: TOAST.DEBUG, data });
    }
    info(data) {
        this.#open({ type: TOAST.INFO, data });
    }
    success(data = this.defaultSuccessTitle) {
        this.#open({ type: TOAST.SUCCESS, data });
    }
    warning(data) {
        this.#open({ type: TOAST.WARNING, data });
    }
    danger(data = this.defaultDangerTitle) {
        this.#open({ type: TOAST.DANGER, data });
    }
    close = (id) => {
        if (!id) {
            return;
        }
        let toastRef = null;
        toastRef = Array.from(_a.toasts).find(_toastRef => _toastRef.id === id);
        if (toastRef) {
            toastRef.removePanelClass('bizy-toast--in');
            toastRef.addPanelClass('bizy-toast--out');
            setTimeout(() => {
                toastRef.close();
                _a.toasts.delete(toastRef);
            }, 500);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToastService });
}
_a = BizyToastService;
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToastService, decorators: [{
            type: Injectable
        }] });

class BizyToastWrapperComponent {
    data;
    toast;
    type = TOAST.INFO;
    title = '';
    msg = '';
    id;
    constructor(data, toast) {
        this.data = data;
        this.toast = toast;
        this.type = this.data.type;
        this.title = this.data.title;
        this.msg = this.data.msg;
        this.id = this.data.id;
        setTimeout(() => {
            this.close();
        }, this.data.duration || 3000);
    }
    close() {
        this.toast.close(this.id);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToastWrapperComponent, deps: [{ token: DIALOG_DATA }, { token: BizyToastService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyToastWrapperComponent, isStandalone: true, selector: "bizy-toast-wrapper", providers: [BizyToastService], ngImport: i0, template: "<div class=\"bizy-toast-wrapper bizy-toast-wrapper--{{type}}\">\n\n    <span class=\"bizy-toast-wrapper__content\">\n\n        <h4 class=\"bizy-toast-wrapper__title--{{type}}\" *ngIf=\"title\">{{title}}</h4>\n    \n        <h6 *ngIf=\"msg\">{{msg}}</h6>\n\n    </span>\n\n    <button (click)=\"close()\" (keyup.enter)=\"close()\" class=\"bizy-toast-wrapper__close-button\">\n\n        <svg \n            data-name=\"Cancel button\"\n            id=\"bizy-toast-wrapper-close-svg\" \n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path id=\"bizy-toast-wrapper-close-svg-content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n\n    </button>\n\n    <span class=\"bizy-toast__progress bizy-toast__progress--{{type}}\"></span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-toast-wrapper{position:relative;width:100%;min-width:20rem;max-width:min(30rem,80dvw);height:fit-content;min-height:3rem;max-height:95dvh;overflow-y:auto;border-top-width:var(--bizy-toast-border-top-width);border-right-width:var(--bizy-toast-border-right-width);border-bottom-width:var(--bizy-toast-border-bottom-width);border-left-width:var(--bizy-toast-border-left-width);border-top-style:var(--bizy-toast-border-top-style);border-right-style:var(--bizy-toast-border-right-style);border-bottom-style:var(--bizy-toast-border-bottom-style);border-left-style:var(--bizy-toast-border-left-style);border-top-left-radius:var(--bizy-toast-border-top-left-radius);border-top-right-radius:var(--bizy-toast-border-top-right-radius);border-bottom-left-radius:var(--bizy-toast-border-bottom-left-radius);border-bottom-right-radius:var(--bizy-toast-border-bottom-right-radius);display:flex;align-items:center;column-gap:.5rem;padding:.5rem;box-shadow:0 18px 25px #32325d40,0 3px 6px #0000001a}.bizy-toast-wrapper::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-toast-wrapper::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-toast-scroll-bar-color)}.bizy-toast-wrapper::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-toast-scroll-bar-hover-color)}.bizy-toast-wrapper__content{flex:1;display:flex;flex-direction:column;row-gap:.1rem}.bizy-toast-wrapper--debug{background-color:var(--bizy-toast-debug-background-color, );border-top-color:var(--bizy-toast-debug-color);border-right-color:var(--bizy-toast-debug-color);border-bottom-color:var(--bizy-toast-debug-color);border-left-color:var(--bizy-toast-debug-color)}.bizy-toast-wrapper__title--debug{color:var(--bizy-toast-debug-color)}.bizy-toast-wrapper--info{background-color:var(--bizy-toast-info-background-color, );border-top-color:var(--bizy-toast-info-color);border-right-color:var(--bizy-toast-info-color);border-bottom-color:var(--bizy-toast-info-color);border-left-color:var(--bizy-toast-info-color)}.bizy-toast-wrapper__title--info{color:var(--bizy-toast-info-color)}.bizy-toast-wrapper--success{background-color:var(--bizy-toast-success-background-color);border-top-color:var(--bizy-toast-success-color);border-right-color:var(--bizy-toast-success-color);border-bottom-color:var(--bizy-toast-success-color);border-left-color:var(--bizy-toast-success-color)}.bizy-toast-wrapper__title--success{color:var(--bizy-toast-success-color)}.bizy-toast-wrapper--warning{background-color:var(--bizy-toast-warning-background-color);border-top-color:var(--bizy-toast-warning-color);border-right-color:var(--bizy-toast-warning-color);border-bottom-color:var(--bizy-toast-warning-color);border-left-color:var(--bizy-toast-warning-color)}.bizy-toast-wrapper__title--warning{color:var(--bizy-toast-warning-color)}.bizy-toast-wrapper--danger{background-color:var(--bizy-toast-danger-background-color);border-top-color:var(--bizy-toast-danger-color);border-right-color:var(--bizy-toast-danger-color);border-bottom-color:var(--bizy-toast-danger-color);border-left-color:var(--bizy-toast-danger-color)}.bizy-toast-wrapper__title--danger{color:var(--bizy-toast-danger-color)}.bizy-toast-wrapper__close-button{border:none;cursor:pointer;align-self:flex-start;background-color:transparent;transition:color .2s;justify-self:flex-start}.bizy-toast-wrapper__close-button #bizy-toast-wrapper-close-svg{height:1rem}.bizy-toast-wrapper__close-button #bizy-toast-wrapper-close-svg-content{fill:var(--bizy-toast-close-button-color)}.bizy-toast-wrapper__close-button:hover #bizy-toast-wrapper-close-svg-content{fill:var(--bizy-toast-close-button-hover-color)}.bizy-toast__progress{width:100%;height:var(--bizy-toast-progress-bar-height);display:inline-block;position:fixed;bottom:0;left:0;right:0;overflow:hidden}.bizy-toast__progress--debug{background-color:var(--bizy-toast-debug-color)}.bizy-toast__progress--info{background-color:var(--bizy-toast-info-color)}.bizy-toast__progress--success{background-color:var(--bizy-toast-success-color)}.bizy-toast__progress--warning{background-color:var(--bizy-toast-warning-color)}.bizy-toast__progress--danger{background-color:var(--bizy-toast-danger-color)}.bizy-toast__progress:after{content:\"\";box-sizing:border-box;width:0;height:var(--bizy-toast-progress-bar-height);background-color:#fff;position:absolute;top:0;left:0;animation:progress var(--bizy-toast-duration) linear infinite}@keyframes progress{0%{width:0}to{width:100%}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: DialogModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToastWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toast-wrapper', imports: [CommonModule, DialogModule], providers: [BizyToastService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-toast-wrapper bizy-toast-wrapper--{{type}}\">\n\n    <span class=\"bizy-toast-wrapper__content\">\n\n        <h4 class=\"bizy-toast-wrapper__title--{{type}}\" *ngIf=\"title\">{{title}}</h4>\n    \n        <h6 *ngIf=\"msg\">{{msg}}</h6>\n\n    </span>\n\n    <button (click)=\"close()\" (keyup.enter)=\"close()\" class=\"bizy-toast-wrapper__close-button\">\n\n        <svg \n            data-name=\"Cancel button\"\n            id=\"bizy-toast-wrapper-close-svg\" \n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path id=\"bizy-toast-wrapper-close-svg-content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n\n    </button>\n\n    <span class=\"bizy-toast__progress bizy-toast__progress--{{type}}\"></span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-toast-wrapper{position:relative;width:100%;min-width:20rem;max-width:min(30rem,80dvw);height:fit-content;min-height:3rem;max-height:95dvh;overflow-y:auto;border-top-width:var(--bizy-toast-border-top-width);border-right-width:var(--bizy-toast-border-right-width);border-bottom-width:var(--bizy-toast-border-bottom-width);border-left-width:var(--bizy-toast-border-left-width);border-top-style:var(--bizy-toast-border-top-style);border-right-style:var(--bizy-toast-border-right-style);border-bottom-style:var(--bizy-toast-border-bottom-style);border-left-style:var(--bizy-toast-border-left-style);border-top-left-radius:var(--bizy-toast-border-top-left-radius);border-top-right-radius:var(--bizy-toast-border-top-right-radius);border-bottom-left-radius:var(--bizy-toast-border-bottom-left-radius);border-bottom-right-radius:var(--bizy-toast-border-bottom-right-radius);display:flex;align-items:center;column-gap:.5rem;padding:.5rem;box-shadow:0 18px 25px #32325d40,0 3px 6px #0000001a}.bizy-toast-wrapper::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-toast-wrapper::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-toast-scroll-bar-color)}.bizy-toast-wrapper::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-toast-scroll-bar-hover-color)}.bizy-toast-wrapper__content{flex:1;display:flex;flex-direction:column;row-gap:.1rem}.bizy-toast-wrapper--debug{background-color:var(--bizy-toast-debug-background-color, );border-top-color:var(--bizy-toast-debug-color);border-right-color:var(--bizy-toast-debug-color);border-bottom-color:var(--bizy-toast-debug-color);border-left-color:var(--bizy-toast-debug-color)}.bizy-toast-wrapper__title--debug{color:var(--bizy-toast-debug-color)}.bizy-toast-wrapper--info{background-color:var(--bizy-toast-info-background-color, );border-top-color:var(--bizy-toast-info-color);border-right-color:var(--bizy-toast-info-color);border-bottom-color:var(--bizy-toast-info-color);border-left-color:var(--bizy-toast-info-color)}.bizy-toast-wrapper__title--info{color:var(--bizy-toast-info-color)}.bizy-toast-wrapper--success{background-color:var(--bizy-toast-success-background-color);border-top-color:var(--bizy-toast-success-color);border-right-color:var(--bizy-toast-success-color);border-bottom-color:var(--bizy-toast-success-color);border-left-color:var(--bizy-toast-success-color)}.bizy-toast-wrapper__title--success{color:var(--bizy-toast-success-color)}.bizy-toast-wrapper--warning{background-color:var(--bizy-toast-warning-background-color);border-top-color:var(--bizy-toast-warning-color);border-right-color:var(--bizy-toast-warning-color);border-bottom-color:var(--bizy-toast-warning-color);border-left-color:var(--bizy-toast-warning-color)}.bizy-toast-wrapper__title--warning{color:var(--bizy-toast-warning-color)}.bizy-toast-wrapper--danger{background-color:var(--bizy-toast-danger-background-color);border-top-color:var(--bizy-toast-danger-color);border-right-color:var(--bizy-toast-danger-color);border-bottom-color:var(--bizy-toast-danger-color);border-left-color:var(--bizy-toast-danger-color)}.bizy-toast-wrapper__title--danger{color:var(--bizy-toast-danger-color)}.bizy-toast-wrapper__close-button{border:none;cursor:pointer;align-self:flex-start;background-color:transparent;transition:color .2s;justify-self:flex-start}.bizy-toast-wrapper__close-button #bizy-toast-wrapper-close-svg{height:1rem}.bizy-toast-wrapper__close-button #bizy-toast-wrapper-close-svg-content{fill:var(--bizy-toast-close-button-color)}.bizy-toast-wrapper__close-button:hover #bizy-toast-wrapper-close-svg-content{fill:var(--bizy-toast-close-button-hover-color)}.bizy-toast__progress{width:100%;height:var(--bizy-toast-progress-bar-height);display:inline-block;position:fixed;bottom:0;left:0;right:0;overflow:hidden}.bizy-toast__progress--debug{background-color:var(--bizy-toast-debug-color)}.bizy-toast__progress--info{background-color:var(--bizy-toast-info-color)}.bizy-toast__progress--success{background-color:var(--bizy-toast-success-color)}.bizy-toast__progress--warning{background-color:var(--bizy-toast-warning-color)}.bizy-toast__progress--danger{background-color:var(--bizy-toast-danger-color)}.bizy-toast__progress:after{content:\"\";box-sizing:border-box;width:0;height:var(--bizy-toast-progress-bar-height);background-color:#fff;position:absolute;top:0;left:0;animation:progress var(--bizy-toast-duration) linear infinite}@keyframes progress{0%{width:0}to{width:100%}}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DIALOG_DATA]
                }] }, { type: BizyToastService, decorators: [{
                    type: Inject,
                    args: [BizyToastService]
                }] }] });

class BizyToastModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyToastModule, imports: [BizyToastWrapperComponent], exports: [BizyToastWrapperComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToastModule, providers: [BizyToastService], imports: [BizyToastWrapperComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BizyToastWrapperComponent],
                    exports: [BizyToastWrapperComponent],
                    providers: [BizyToastService]
                }]
        }] });

class BizyToggleComponent {
    id = `bizy-toggle-${Math.random()}`;
    disabled = false;
    selected = false;
    onSelect = new EventEmitter();
    selectedChange = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.selectedChange.emit(!this.selected);
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyToggleComponent, isStandalone: true, selector: "bizy-toggle", inputs: { id: "id", disabled: "disabled", selected: "selected" }, outputs: { onSelect: "onSelect", selectedChange: "selectedChange" }, ngImport: i0, template: "<button type=\"button\" class=\"bizy-toggle\" [ngClass]=\"{'bizy-toggle--disabled': disabled}\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <input \n        class=\"bizy-toggle__toggle\"\n        type=\"checkbox\"\n        [id]=\"id\"\n        [disabled]=\"disabled\"\n        [checked]=\"selected\"\n        readonly\n        [ngClass]=\"{'bizy-toggle__toggle--disabled': disabled}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n</button>", styles: [".bizy-toggle{width:fit-content;min-height:1.3rem;display:flex;column-gap:.5rem;align-items:center;border:none;cursor:pointer;background-color:transparent}.bizy-toggle--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-toggle__toggle{position:relative;pointer-events:none;height:.8rem;width:2.2rem;min-width:2.2rem;cursor:pointer;appearance:none;-webkit-appearance:none;border-radius:9999px;background-color:var(--bizy-toggle-background-color);transition:all .3s ease}.bizy-toggle__toggle:before{position:absolute;pointer-events:none;content:\"\";left:-.2rem;top:-.2rem;display:block;height:1.2rem;width:1.2rem;cursor:pointer;background-color:var(--bizy-toggle-color);border-radius:9999px;transition:all .3s ease}.bizy-toggle__toggle:checked{background-color:var(--bizy-toggle-selected-background-color)}.bizy-toggle__toggle:checked:before{background-color:var(--bizy-toggle-selected-color);transform:translate(100%)}.bizy-toggle__toggle--disabled{pointer-events:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toggle', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button type=\"button\" class=\"bizy-toggle\" [ngClass]=\"{'bizy-toggle--disabled': disabled}\" (click)=\"_onSelect($event)\" (keyup.enter)=\"_onSelect($event)\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <input \n        class=\"bizy-toggle__toggle\"\n        type=\"checkbox\"\n        [id]=\"id\"\n        [disabled]=\"disabled\"\n        [checked]=\"selected\"\n        readonly\n        [ngClass]=\"{'bizy-toggle__toggle--disabled': disabled}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n</button>", styles: [".bizy-toggle{width:fit-content;min-height:1.3rem;display:flex;column-gap:.5rem;align-items:center;border:none;cursor:pointer;background-color:transparent}.bizy-toggle--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-toggle__toggle{position:relative;pointer-events:none;height:.8rem;width:2.2rem;min-width:2.2rem;cursor:pointer;appearance:none;-webkit-appearance:none;border-radius:9999px;background-color:var(--bizy-toggle-background-color);transition:all .3s ease}.bizy-toggle__toggle:before{position:absolute;pointer-events:none;content:\"\";left:-.2rem;top:-.2rem;display:block;height:1.2rem;width:1.2rem;cursor:pointer;background-color:var(--bizy-toggle-color);border-radius:9999px;transition:all .3s ease}.bizy-toggle__toggle:checked{background-color:var(--bizy-toggle-selected-background-color)}.bizy-toggle__toggle:checked:before{background-color:var(--bizy-toggle-selected-color);transform:translate(100%)}.bizy-toggle__toggle--disabled{pointer-events:none}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], selectedChange: [{
                type: Output
            }] } });

const COMPONENTS$1 = [
    BizyToggleComponent,
];
class BizyToggleModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToggleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyToggleModule, imports: [BizyToggleComponent], exports: [BizyToggleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToggleModule, imports: [COMPONENTS$1] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToggleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS$1,
                    exports: COMPONENTS$1,
                }]
        }] });

class BizyToolbarComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: BizyToolbarComponent, isStandalone: true, selector: "bizy-toolbar", ngImport: i0, template: "<div class=\"bizy-toolbar\">\n\n    <span class=\"bizy-toolbar__start\">\n        \n        <ng-content select=\"[slot=start]\"></ng-content>\n\n    </span>\n\n    <span class=\"bizy-toolbar__end\">\n\n        <ng-content select=\"[slot=end]\"></ng-content>\n\n    </span>\n\n</div>\n", styles: [":host{font-size:1rem}.bizy-toolbar{min-height:var(--bizy-toolbar-min-height);height:var(--bizy-toolbar-height);width:100%;background-color:var(--bizy-toolbar-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:var(--bizy-toolbar-column-gap);padding:var(--bizy-toolbar-padding)}.bizy-toolbar__start{height:100%;display:flex;align-items:center;column-gap:var(--bizy-toolbar-column-gap)}.bizy-toolbar__end{height:100%;display:flex;align-items:center;justify-content:flex-end;column-gap:var(--bizy-toolbar-column-gap)}::ng-deep .bizy-toolbar *[toolbar-option]{height:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toolbar', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-toolbar\">\n\n    <span class=\"bizy-toolbar__start\">\n        \n        <ng-content select=\"[slot=start]\"></ng-content>\n\n    </span>\n\n    <span class=\"bizy-toolbar__end\">\n\n        <ng-content select=\"[slot=end]\"></ng-content>\n\n    </span>\n\n</div>\n", styles: [":host{font-size:1rem}.bizy-toolbar{min-height:var(--bizy-toolbar-min-height);height:var(--bizy-toolbar-height);width:100%;background-color:var(--bizy-toolbar-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:var(--bizy-toolbar-column-gap);padding:var(--bizy-toolbar-padding)}.bizy-toolbar__start{height:100%;display:flex;align-items:center;column-gap:var(--bizy-toolbar-column-gap)}.bizy-toolbar__end{height:100%;display:flex;align-items:center;justify-content:flex-end;column-gap:var(--bizy-toolbar-column-gap)}::ng-deep .bizy-toolbar *[toolbar-option]{height:100%}\n"] }]
        }] });

const COMPONENTS = [
    BizyToolbarComponent,
];
class BizyToolbarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToolbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyToolbarModule, imports: [BizyToolbarComponent], exports: [BizyToolbarComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToolbarModule, imports: [COMPONENTS] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyToolbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS,
                    exports: COMPONENTS,
                }]
        }] });

var LANGUAGE;
(function (LANGUAGE) {
    LANGUAGE["SPANISH"] = "es";
    LANGUAGE["ENGLISH"] = "en";
})(LANGUAGE || (LANGUAGE = {}));
class BizyTranslateService {
    #translate = inject(TranslateService);
    loadTranslations(...args) {
        const locales = [...args];
        locales.forEach(locale => {
            this.#translate.setTranslation(locale.lang, locale.translations, true);
        });
    }
    addLangs(langs) {
        this.#translate.addLangs(langs);
    }
    getLangs() {
        return this.#translate.getLangs();
    }
    setDefault(lang) {
        this.#translate.setDefaultLang(lang);
    }
    getCurrentLang() {
        return this.#translate.currentLang;
    }
    use(lang) {
        this.#translate.use(lang);
    }
    get(translation) {
        return this.#translate.instant(translation);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTranslateService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTranslateService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTranslateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class BizyTranslatePipe {
    translate;
    constructor(translate) {
        this.translate = translate;
    }
    transform(label) {
        return this.translate.get(label);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTranslatePipe, deps: [{ token: BizyTranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyTranslatePipe, isStandalone: true, name: "translate" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTranslatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'translate',
                }]
        }], ctorParameters: () => [{ type: BizyTranslateService, decorators: [{
                    type: Inject,
                    args: [BizyTranslateService]
                }] }] });

class BizyTranslateModule {
    static forRoot = TranslateModule.forRoot;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTranslateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyTranslateModule, imports: [BizyTranslatePipe], exports: [BizyTranslatePipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTranslateModule, providers: [BizyTranslateService] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTranslateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BizyTranslatePipe],
                    exports: [BizyTranslatePipe],
                    providers: [BizyTranslateService]
                }]
        }] });

class BizyExtractNumbersPipe {
    transform(value) {
        if (!value) {
            return '';
        }
        const numbers = value.match(/\d+/g);
        return numbers ? numbers.join('') : '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyExtractNumbersPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyExtractNumbersPipe, isStandalone: true, name: "bizyExtractNumbers" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyExtractNumbersPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyExtractNumbers'
                }]
        }] });

class BizyRepeatPipe {
    transform(value) {
        return Array.from({ length: value }, (_, i) => i);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRepeatPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyRepeatPipe, isStandalone: true, name: "bizyRepeat" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyRepeatPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyRepeat'
                }]
        }] });

class BizySetToArrayPipe {
    transform(items) {
        if (!items) {
            return [];
        }
        return Array.from(items);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySetToArrayPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizySetToArrayPipe, isStandalone: true, name: "bizySetToArray" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySetToArrayPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySetToArray'
                }]
        }] });

class BizyEnumToArrayPipe {
    transform(enumObj) {
        return Object.keys(enumObj)
            .filter(key => isNaN(Number(key))) // Only keep the keys, not the reverse mappings in numeric enums
            .map(key => ({ key, value: enumObj[key] }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyEnumToArrayPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyEnumToArrayPipe, isStandalone: true, name: "bizyEnumToArray" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyEnumToArrayPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyEnumToArray'
                }]
        }] });

class BizyOrderByPipe {
    transform(items, order = null, property = '') {
        // No items
        if (!items || !order) {
            return items;
        }
        // Array with only one item
        if (items.length <= 1) {
            return items;
        }
        const sortByString = (items, order) => {
            return items.sort((a, b) => {
                let aValue = getValue(a);
                let bValue = getValue(b);
                if ((typeof aValue === 'undefined' || aValue === null) && (typeof bValue === 'undefined' || bValue === null)) {
                    return 0;
                }
                if ((typeof aValue === 'undefined' || aValue === null) && (typeof bValue !== 'undefined' && bValue !== null)) {
                    return order === 'desc' ? 1 : -1;
                }
                if ((typeof aValue !== 'undefined' && aValue !== null) && (typeof bValue === 'undefined' || bValue === null)) {
                    return order === 'desc' ? -1 : 1;
                }
                if (aValue === bValue) {
                    return 0;
                }
                if (order === 'desc') {
                    return (this.#removeAccentsAndDiacritics(String(aValue)).toLowerCase() > this.#removeAccentsAndDiacritics(String(bValue)).toLowerCase() ? -1 : 1);
                }
                return (this.#removeAccentsAndDiacritics(String(bValue)).toLowerCase() > this.#removeAccentsAndDiacritics(String(aValue)).toLowerCase() ? -1 : 1);
            });
        };
        const sortByNumber = (items, order) => {
            if (order === 'asc') {
                return items.sort((a, b) => Number(getValue(a)) - Number(getValue(b)));
            }
            else {
                return items.sort((a, b) => Number(getValue(b)) - Number(getValue(a)));
            }
        };
        const sortByDate = (items, order) => {
            return items.sort((a, b) => {
                const aDate = parseDateString(getValue(a));
                const bDate = parseDateString(getValue(b));
                return order === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
            });
        };
        const isDate = (value) => {
            const ddMMYYYYhhmmss = /^\d{1,2}\/\d{1,2}\/\d{4}( \d{1,2}:\d{1,2}(:\d{1,2})?)?$/;
            return ddMMYYYYhhmmss.test(value);
        };
        const parseDateString = (value) => {
            const [datePart, timePart] = value.split(' ');
            const separator = value.includes('/') ? '/' : '-';
            const [day, month, year] = datePart.split(separator).map(Number);
            let hours = 0, minutes = 0, seconds = 0;
            if (timePart) {
                const [hourStr, minuteStr, secondStr] = timePart.split(':').map(Number);
                hours = isNaN(hourStr) ? 0 : hourStr;
                minutes = isNaN(minuteStr) ? 0 : minuteStr;
                seconds = isNaN(secondStr) ? 0 : secondStr;
            }
            return new Date(year, month - 1, day, hours, minutes, seconds);
        };
        const getValue = (item) => {
            let value = item;
            if (property) {
                const nestedProperty = property.split('.');
                for (let i = 0; i < nestedProperty.length; i++) {
                    const property = nestedProperty[i];
                    if (!property || typeof value[property] === 'undefined' || value[property] === null) {
                        value = null;
                        break;
                    }
                    value = value[property];
                }
            }
            return value;
        };
        let output = [...items];
        const index = output.findIndex(_item => {
            const value = getValue(_item);
            return typeof value !== 'undefined' && value !== null;
        });
        if (index === -1) {
            return output;
        }
        const value = getValue(output[index]);
        if (typeof value === 'number' && !isNaN(value)) {
            return sortByNumber(output, order);
        }
        else if (isDate(value)) {
            return sortByDate(output, order);
        }
        else {
            return sortByString(output, order);
        }
    }
    #removeAccentsAndDiacritics(search) {
        if (!search) {
            return '';
        }
        return search.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyOrderByPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyOrderByPipe, isStandalone: true, name: "bizyOrderBy" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyOrderByPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyOrderBy'
                }]
        }] });

class BizyReducePipe {
    transform(items, key, fixedTo = 2) {
        if (!items || items.length === 0) {
            return 0;
        }
        if (!key) {
            const reduce = items.reduce((acc, value) => acc + value, 0);
            return Number(reduce.toFixed(fixedTo));
        }
        const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);
        return Number(reduce.toFixed(fixedTo));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyReducePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyReducePipe, isStandalone: true, name: "bizyReduce" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyReducePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyReduce'
                }]
        }] });

class BizySafePipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type) {
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default: throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySafePipe, deps: [{ token: DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizySafePipe, isStandalone: true, name: "bizySafe" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySafePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySafe'
                }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer, decorators: [{
                    type: Inject,
                    args: [DomSanitizer]
                }] }] });

class BizyAveragePipe {
    transform(items, key, fixedTo = 2) {
        if (!items || items.length === 0) {
            return 0;
        }
        if (!key) {
            const reduce = items.reduce((acc, value) => acc + value, 0);
            return Number((reduce / items.length).toFixed(fixedTo));
        }
        const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);
        return Number((reduce / items.length).toFixed(fixedTo));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAveragePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyAveragePipe, isStandalone: true, name: "bizyAverage" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAveragePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyAverage'
                }]
        }] });

class BizySearchPipeOptions {
    isCaseSensitive;
    distance;
    findAllMatches;
    ignoreLocation;
    ignoreFieldNorm;
    includeMatches;
    includeScore;
    location;
    minMatchCharLength;
    shouldSort;
    threshold;
    useExtendedSearch;
    keys;
    constructor(options, keys) {
        // Si se desea cambiar algun valor por default, este es el lugar indicado
        if (!keys) {
            keys = [];
        }
        const defaultOptions = {
            // Se activa includeScore para poder buscar internamente en propiedades de tipo array
            includeScore: true,
            // Cuando es verdadero, la búsqueda ignorará la ubicación y la distancia, por lo que no importará en qué parte de la cadena aparezca el patrón
            ignoreLocation: true,
            // Se reduce a 0.1 el threshold (default: 0.6) para aumentar precisión en resultados
            threshold: 0.1
        };
        if (options) {
            options = { ...defaultOptions, ...options };
        }
        else {
            options = defaultOptions;
        }
        Object.assign(this, { ...options, keys: keys });
    }
}

class BizySearchPipe {
    searchPipeOptions;
    fuse;
    items;
    perfectMatch = {
        threshold: 0.0
    };
    transform(items, search, keys, options) {
        if (typeof search === 'undefined' || search === null || search === '' || (Array.isArray(search) && search.length === 0)) {
            return items;
        }
        let _keys = [];
        if (keys) {
            if (Array.isArray(keys)) {
                _keys = keys;
            }
            else {
                _keys = [keys];
            }
        }
        if (!Array.isArray(search)) {
            search = [this.#removeAccentsAndDiacritics(String(search))];
        }
        else {
            search = search.map(_search => this.#removeAccentsAndDiacritics(String(_search)));
        }
        const getFn = (item, keys) => {
            const value = keys.reduce((acc, key) => acc && acc[key], item);
            return typeof value === 'string' ? this.#removeAccentsAndDiacritics(value) : String(value);
        };
        const isNumber = (number) => {
            const regex = /^[0-9]*$/;
            return regex.test(String(number).toLowerCase());
        };
        const isEmail = (email) => {
            const regex = /^(([^ñ<>()[\]\\.,;:\s@"]+(\.[^ñ<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(email).toLowerCase());
        };
        // Remove empty items
        search = search.filter(n => n);
        search.forEach(_keyword => {
            if (!isNumber(_keyword) && !isEmail(_keyword)) {
                this.searchPipeOptions = new BizySearchPipeOptions({ ...options, getFn }, _keys);
                this.fuse = new Fuse(items, this.searchPipeOptions);
            }
            else {
                // Apply perfect match if "search" is a number or is an email
                this.searchPipeOptions = new BizySearchPipeOptions({ ...options, ...this.perfectMatch, getFn }, _keys);
                this.fuse = new Fuse(items, this.searchPipeOptions);
            }
            const fuseResult = this.fuse.search(String(_keyword));
            // Get each fuse result item
            items = fuseResult.map(match => match.item);
        });
        return items;
    }
    #removeAccentsAndDiacritics(search) {
        if (!search) {
            return '';
        }
        return search.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizySearchPipe, isStandalone: true, name: "bizySearch" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizySearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySearch'
                }]
        }] });

class BizyFormatSecondsPipe {
    bizyFormatSecondsService;
    constructor(bizyFormatSecondsService) {
        this.bizyFormatSecondsService = bizyFormatSecondsService;
    }
    transform(seconds, options) {
        if (!seconds) {
            return '00:00:00';
        }
        const regex = /^-?\d+(\.\d+)?$/;
        const isNumber = regex.test(String(seconds).toLowerCase());
        if (!isNumber || seconds <= 0) {
            return '00:00:00';
        }
        const defaultOptions = this.bizyFormatSecondsService.getOptions();
        const language = options?.language ?? defaultOptions.language;
        const format = options?.format ?? defaultOptions.format;
        const DAY = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Día' : 'Day';
        const DAYS = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Días' : 'Days';
        const MONTH = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Mes' : 'Month';
        const MONTHS = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Meses' : 'Months';
        const YEAR = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Año' : 'Year';
        const YEARS = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Años' : 'Years';
        let _seconds = Number(seconds);
        const SECONDS_IN_YEAR = 365.25 * 24 * 3600;
        const SECONDS_IN_MONTH = 30.44 * 24 * 3600;
        const SECONDS_IN_DAY = 24 * 3600;
        const SECONDS_IN_HOUR = 3600;
        const SECONDS_IN_MINUTE = 60;
        if (format === BIZY_FORMAT_SECONDS_FORMAT.DATE_TIME) {
            const years = Math.floor(_seconds / SECONDS_IN_YEAR);
            _seconds %= SECONDS_IN_YEAR;
            const months = Math.floor(_seconds / SECONDS_IN_MONTH);
            _seconds %= SECONDS_IN_MONTH;
            const days = Math.floor(_seconds / SECONDS_IN_DAY);
            _seconds %= SECONDS_IN_DAY;
            const hours = Math.floor(_seconds / SECONDS_IN_HOUR);
            _seconds %= SECONDS_IN_HOUR;
            const minutes = Math.floor(_seconds / SECONDS_IN_MINUTE);
            _seconds %= SECONDS_IN_MINUTE;
            const parts = [];
            if (years > 0) {
                parts.push(years + (years === 1 ? ` ${YEAR}` : ` ${YEARS}`));
            }
            if (months > 0) {
                parts.push(months + (months === 1 ? ` ${MONTH}` : ` ${MONTHS}`));
            }
            if (days > 0) {
                parts.push(days + (days === 1 ? ` ${DAY}` : ` ${DAYS}`));
            }
            parts.push(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${_seconds < 10 ? '0' + Math.trunc(_seconds) : Math.trunc(_seconds)}`);
            return parts.join(' ');
        }
        else {
            const hours = Math.floor(_seconds / SECONDS_IN_HOUR);
            _seconds %= SECONDS_IN_HOUR;
            const minutes = Math.floor(_seconds / SECONDS_IN_MINUTE);
            _seconds %= SECONDS_IN_MINUTE;
            const parts = [];
            parts.push(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${_seconds < 10 ? '0' + Math.trunc(_seconds) : Math.trunc(_seconds)}`);
            return parts.join(' ');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFormatSecondsPipe, deps: [{ token: BizyFormatSecondsService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyFormatSecondsPipe, isStandalone: true, name: "bizyFormatSeconds" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyFormatSecondsPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyFormatSeconds'
                }]
        }], ctorParameters: () => [{ type: BizyFormatSecondsService, decorators: [{
                    type: Inject,
                    args: [BizyFormatSecondsService]
                }] }] });

const PIPES = [
    BizyRepeatPipe,
    BizySetToArrayPipe,
    BizyEnumToArrayPipe,
    BizyOrderByPipe,
    BizyReducePipe,
    BizySafePipe,
    BizyAveragePipe,
    BizySearchPipe,
    BizyFormatSecondsPipe,
    BizyExtractNumbersPipe
];
class BizyPipesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyPipesModule, imports: [BizyRepeatPipe,
            BizySetToArrayPipe,
            BizyEnumToArrayPipe,
            BizyOrderByPipe,
            BizyReducePipe,
            BizySafePipe,
            BizyAveragePipe,
            BizySearchPipe,
            BizyFormatSecondsPipe,
            BizyExtractNumbersPipe], exports: [BizyRepeatPipe,
            BizySetToArrayPipe,
            BizyEnumToArrayPipe,
            BizyOrderByPipe,
            BizyReducePipe,
            BizySafePipe,
            BizyAveragePipe,
            BizySearchPipe,
            BizyFormatSecondsPipe,
            BizyExtractNumbersPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPipesModule, providers: PIPES });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyPipesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: PIPES,
                    exports: PIPES,
                    providers: PIPES
                }]
        }] });

class BizyCopyToClipboardDirective {
    elementRef;
    renderer;
    copyToClipboard;
    onCopy = new EventEmitter();
    #svgElement;
    #COPY_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/>
  </svg>`;
    #CHECK_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
  </svg>`;
    #ERROR_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
  </svg>`;
    constructor(elementRef, renderer, copyToClipboard) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.copyToClipboard = copyToClipboard;
        this.#svgElement = this.renderer.createElement('div');
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
        this.renderer.setStyle(this.#svgElement, 'position', 'absolute');
        this.renderer.setStyle(this.#svgElement, 'right', '0');
        this.renderer.setStyle(this.#svgElement, 'opacity', '0');
        this.renderer.setStyle(this.#svgElement, 'background', 'linear-gradient(to left, rgb(255, 255, 255), rgba(0, 0, 0, 0))');
        this.renderer.setStyle(this.#svgElement, 'paddingLeft', '5rem');
        this.renderer.setStyle(this.#svgElement, 'transition', 'opacity 0.2s ease-in-out');
        this.renderer.appendChild(this.elementRef.nativeElement, this.#svgElement);
    }
    onMouseEnter() {
        this.#svgElement.innerHTML = this.#COPY_ICON;
        this.renderer.setStyle(this.#svgElement, 'fill', 'var(--bizy-copy-to-clipboard-default-color)');
        const elementHeight = this.elementRef.nativeElement.offsetHeight - 4;
        this.renderer.setStyle(this.#svgElement, 'height', `${elementHeight}px`);
        const svg = this.#svgElement.querySelector('svg');
        if (svg) {
            this.renderer.setStyle(svg, 'height', '100%');
            this.renderer.setStyle(svg, 'width', 'auto');
            this.renderer.setStyle(svg, 'pointerEvents', 'none');
        }
        this.#setVisibility(true);
    }
    onMouseLeave() {
        this.#setVisibility(false);
    }
    onClick(event) {
        if (!this.elementRef.nativeElement.innerText) {
            return;
        }
        event.stopPropagation();
        this.copyToClipboard.copy(this.elementRef.nativeElement.innerText.trim()).then(() => {
            this.renderer.setStyle(this.#svgElement, 'fill', 'var(--bizy-copy-to-clipboard-success-color)');
            this.#svgElement.innerHTML = this.#CHECK_ICON;
            this.onCopy.emit();
        }).catch(() => {
            this.renderer.setStyle(this.#svgElement, 'fill', 'var(--bizy-copy-to-clipboard-danger-color)');
            this.#svgElement.innerHTML = this.#ERROR_ICON;
        }).finally(() => {
            const elementHeight = this.elementRef.nativeElement.offsetHeight - 1;
            this.renderer.setStyle(this.#svgElement, 'height', `${elementHeight}px`);
            const svg = this.#svgElement.querySelector('svg');
            if (svg) {
                this.renderer.setStyle(svg, 'height', '100%');
                this.renderer.setStyle(svg, 'width', 'auto');
                this.renderer.setStyle(svg, 'pointerEvents', 'none');
            }
        });
    }
    #setVisibility(visible) {
        this.renderer.setStyle(this.#svgElement, 'opacity', visible ? '1' : '0');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCopyToClipboardDirective, deps: [{ token: ElementRef }, { token: Renderer2 }, { token: BizyCopyToClipboardService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyCopyToClipboardDirective, isStandalone: true, selector: "[bizyCopyToClipboard]", outputs: { onCopy: "onCopy" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "click": "onClick($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyCopyToClipboardDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyCopyToClipboard]',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: BizyCopyToClipboardService, decorators: [{
                    type: Inject,
                    args: [BizyCopyToClipboardService]
                }] }], propDecorators: { onCopy: [{
                type: Output
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

var LOADING_TYPE;
(function (LOADING_TYPE) {
    LOADING_TYPE["SPINNER"] = "spinner";
    LOADING_TYPE["BAR"] = "bar";
})(LOADING_TYPE || (LOADING_TYPE = {}));
class BizyLoadingDirective {
    elementRef;
    renderer;
    set bizyLoading(value) {
        this.#setLoading(value);
    }
    bizyLoadingType = LOADING_TYPE.SPINNER;
    #loadingElement;
    #originalElement;
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    #setLoading(value) {
        if (value) {
            this.#originalElement = this.elementRef.nativeElement;
            const width = this.elementRef.nativeElement.offsetWidth;
            const height = this.elementRef.nativeElement.offsetHeight;
            const loadingWrapper = this.renderer.createElement('span');
            this.renderer.setStyle(loadingWrapper, 'width', width ? `${this.elementRef.nativeElement.offsetWidth}px` : '1rem');
            this.renderer.setStyle(loadingWrapper, 'height', height ? `${this.elementRef.nativeElement.offsetHeight}px` : '1rem');
            this.renderer.setStyle(loadingWrapper, 'display', 'grid');
            this.renderer.setStyle(loadingWrapper, 'placeItems', 'center');
            const backgroundColor = window.getComputedStyle(this.elementRef.nativeElement, null).getPropertyValue('background-color');
            this.renderer.setStyle(loadingWrapper, 'backgroundColor', backgroundColor);
            this.renderer.setStyle(loadingWrapper, 'pointer-events', 'none');
            const loading = this.renderer.createElement('span');
            this.renderer.addClass(loading, `bizy-loading--${this.bizyLoadingType}`);
            if (this.bizyLoadingType === LOADING_TYPE.SPINNER) {
                let minSize = 0;
                if (this.elementRef.nativeElement.offsetWidth > 0 && this.elementRef.nativeElement.offsetHeight > 0) {
                    minSize = Math.min(this.elementRef.nativeElement.offsetWidth, this.elementRef.nativeElement.offsetHeight);
                }
                this.renderer.setStyle(loading, 'width', minSize ? `min(15rem, ${minSize}px)` : '1rem');
                this.renderer.setStyle(loading, 'height', minSize ? `min(15rem, ${minSize}px)` : '1rem');
            }
            this.renderer.appendChild(loadingWrapper, loading);
            this.#loadingElement = loadingWrapper;
            this.renderer.insertBefore(this.#originalElement.parentNode, this.#loadingElement, this.#originalElement);
            this.renderer.removeChild(this.#originalElement.parentNode, this.#originalElement);
        }
        else if (this.#loadingElement && this.#originalElement && value === false) {
            this.renderer.insertBefore(this.#loadingElement.parentNode, this.#originalElement, this.#loadingElement);
            this.renderer.removeChild(this.#loadingElement.parentNode, this.#loadingElement);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyLoadingDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyLoadingDirective, isStandalone: true, selector: "[bizyLoading]", inputs: { bizyLoading: "bizyLoading", bizyLoadingType: "bizyLoadingType" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyLoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyLoading]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }], propDecorators: { bizyLoading: [{
                type: Input
            }], bizyLoadingType: [{
                type: Input
            }] } });

class BizyLongPressDirective {
    elementRef;
    threshold = 500;
    press = new EventEmitter();
    #event;
    constructor(elementRef) {
        this.elementRef = elementRef;
        const mousedown = fromEvent(this.elementRef.nativeElement, 'mousedown').pipe(filter$1((event) => event.button == 0), // Only allow left button (Primary button)
        map(() => true) // turn on threshold counter
        );
        const touchstart = fromEvent(this.elementRef.nativeElement, 'touchstart').pipe(map(() => true));
        const touchEnd = fromEvent(this.elementRef.nativeElement, 'touchend').pipe(map(() => false));
        const mouseup = fromEvent(window, 'mouseup').pipe(filter$1((event) => event.button == 0), // Only allow left button (Primary button)
        map(() => false) // reset threshold counter
        );
        this.#event = merge(mousedown, mouseup, touchstart, touchEnd)
            .pipe(switchMap(state => (state ? timer(this.threshold, 100) : of(null))), filter$1(value => Boolean(value)))
            .subscribe(() => this.press.emit());
    }
    ngOnDestroy() {
        if (this.#event) {
            this.#event.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyLongPressDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyLongPressDirective, isStandalone: true, selector: "[bizyLongPress]", inputs: { threshold: "threshold" }, outputs: { press: "press" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyLongPressDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyLongPress]',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }], propDecorators: { threshold: [{
                type: Input
            }], press: [{
                type: Output
            }] } });

class BizyOnlyNumbersDirective {
    elementRef;
    onlyNumbers;
    #regex = new RegExp(/^-?\d+([.,]?\d+)*$/);
    #specialKeys = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    onInput(event) {
        if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
            return;
        }
        const inputElement = this.elementRef.nativeElement;
        const value = inputElement.value;
        // Format and validate input value
        const formattedValue = this.#formatValue(value);
        if (formattedValue !== value) {
            inputElement.value = formattedValue;
            event.stopImmediatePropagation();
        }
    }
    onKeyDown(event) {
        if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
            return;
        }
        // Allow special keys
        if (this.#specialKeys.indexOf(event.key) !== -1 ||
            // Allow: Ctrl+A
            (event.key === 'a' && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+C
            (event.key === 'c' && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+V
            (event.key === 'v' && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+X
            (event.key === 'x' && (event.ctrlKey || event.metaKey)) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // Let it happen, don't do anything
            return;
        }
        // Allow numbers and decimals
        let current = this.elementRef.nativeElement.value;
        let next = current.concat(event.key);
        if (next && !String(next).match(this.#regex)) {
            event.preventDefault();
        }
    }
    #formatValue(value) {
        // Remove all non-numeric characters except . , and -
        let newValue = value.replace(/[^0-9.,-]/g, '');
        // Ensure that '-' is only at the beginning and only once
        if (newValue.indexOf('-') !== newValue.lastIndexOf('-') || (newValue.indexOf('-') !== 0)) {
            newValue = newValue.replace(/-+/g, ''); // Remove all '-' characters
        }
        // Ensure only one '-' at the beginning
        if (newValue.startsWith('-') && newValue.indexOf('-') > 0) {
            newValue = '-' + newValue.replace(/^-+/, ''); // Remove additional '-' characters
        }
        // Ensure only one decimal separator
        const parts = newValue.split(/[,\.]/);
        if (parts.length > 2) {
            newValue = `${parts[0]}.${parts.slice(1).join('')}`;
        }
        return newValue;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyOnlyNumbersDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyOnlyNumbersDirective, isStandalone: true, selector: "[bizyOnlyNumbers]", inputs: { onlyNumbers: ["bizyOnlyNumbers", "onlyNumbers"] }, host: { listeners: { "input": "onInput($event)", "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyOnlyNumbersDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyOnlyNumbers]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }], propDecorators: { onlyNumbers: [{
                type: Input,
                args: ['bizyOnlyNumbers']
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

class BizyOnlyPhoneDigitsDirective {
    onlyPhoneNumbers;
    regexStr = '^[0-9*#+]*$';
    onKeyDown(event) {
        if (typeof this.onlyPhoneNumbers === 'undefined' || this.onlyPhoneNumbers === null || this.onlyPhoneNumbers === false) {
            return;
        }
        let e = event;
        const ignore = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];
        if (ignore.indexOf(e.key) !== -1 ||
            (e.ctrlKey || e.metaKey) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // Let it happen, don't do anything
            return;
        }
        let regEx = new RegExp(this.regexStr);
        if (!regEx.test(e.key)) {
            e.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyOnlyPhoneDigitsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyOnlyPhoneDigitsDirective, isStandalone: true, selector: "[bizyOnlyPhoneDigits]", inputs: { onlyPhoneNumbers: ["bizyOnlyPhoneDigits", "onlyPhoneNumbers"] }, host: { listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyOnlyPhoneDigitsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyOnlyPhoneDigits]'
                }]
        }], propDecorators: { onlyPhoneNumbers: [{
                type: Input,
                args: ['bizyOnlyPhoneDigits']
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

class BizyTextEllipsisDirective {
    #elementRef = inject(ElementRef);
    #renderer = inject(Renderer2);
    resizeRef = null;
    #resizeObserver;
    notifier$ = new Subject();
    #subscription = new Subscription();
    ngAfterViewInit() {
        this.#applyClamp();
        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
        const resizeRef = this.resizeRef ? this.resizeRef : this.#renderer.parentNode(this.#elementRef.nativeElement) ? this.#renderer.parentNode(this.#elementRef.nativeElement) : this.#elementRef.nativeElement;
        this.#resizeObserver.observe(resizeRef);
        this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime$1(150)).subscribe(() => {
            this.#applyClamp();
        }));
    }
    #applyClamp() {
        const parent = this.#elementRef.nativeElement.parentElement;
        const element = this.#elementRef.nativeElement;
        const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
        const parentHeight = parent.offsetHeight;
        if (lineHeight && parentHeight) {
            const lineClamp = Math.floor(parentHeight / lineHeight);
            this.#renderer.setStyle(element, 'display', '-webkit-box');
            this.#renderer.setStyle(element, 'text-overflow', 'ellipsis');
            this.#renderer.setStyle(element, '-webkit-box-orient', 'vertical');
            this.#renderer.setStyle(element, 'overflow', 'hidden');
            this.#renderer.setStyle(element, 'word-wrap', 'break-word');
            this.#renderer.setStyle(element, 'text-wrap', 'auto');
            this.#renderer.setStyle(element, 'white-space', 'pre-wrap');
            this.#renderer.setStyle(element, 'word-break', 'break-word');
            this.#renderer.setStyle(element, '-webkit-line-clamp', lineClamp ? lineClamp.toString() : '1');
        }
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTextEllipsisDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyTextEllipsisDirective, isStandalone: true, selector: "[bizyTextEllipsis]", inputs: { resizeRef: "resizeRef" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTextEllipsisDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyTextEllipsis]',
                }]
        }], propDecorators: { resizeRef: [{
                type: Input
            }] } });

class BizyTooltipDirective {
    tooltipCustomClass = '';
    tooltipPlacement = 'top';
    tooltipDelay = 0; // Milliseconds
    tooltipLongPressDuration = 500; // Milliseconds
    #elementRef = inject(ElementRef);
    #renderer = inject(Renderer2);
    #document = inject(DOCUMENT);
    #tooltip;
    #hiding;
    #longPressTimeout = null;
    #lineClamp = 0;
    #text = null;
    set tooltipLineClamp(lineClamp) {
        if (!lineClamp && lineClamp <= 0) {
            return;
        }
        this.#lineClamp = lineClamp;
        const computedStyle = window.getComputedStyle(this.#elementRef.nativeElement);
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'width', '100%');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'min-width', '0');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'overflow', 'hidden');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'text-overflow', 'ellipsis');
        if (lineClamp === 1) {
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'white-space', 'nowrap');
        }
        else {
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'display', '-webkit-box');
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'line-clamp', this.#lineClamp);
            this.#renderer.setStyle(this.#elementRef.nativeElement, '-webkit-line-clamp', this.#lineClamp);
            this.#renderer.setStyle(this.#elementRef.nativeElement, '-webkit-box-orient', 'vertical');
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'max-height', `calc(${this.#lineClamp} * ${computedStyle.lineHeight})`);
        }
    }
    set tooltipText(tooltipText) {
        if (!tooltipText) {
            return;
        }
        this.#text = tooltipText;
    }
    // Deprecated
    set placement(placement) {
        if (!placement) {
            return;
        }
        this.tooltipPlacement = placement;
    }
    // Deprecated
    set delay(delay) {
        if (typeof delay === 'undefined' || delay === null) {
            return;
        }
        this.tooltipDelay = delay;
    }
    onMouseEnter() {
        if (!this.#tooltip) {
            if (!this.#text) {
                this.#text = this.#elementRef.nativeElement.textContent;
            }
            if (!this.#text) {
                return;
            }
            this.#hiding = false;
            this.show();
        }
    }
    onMouseLeave() {
        if (this.#longPressTimeout) {
            clearTimeout(this.#longPressTimeout);
        }
        if (this.#tooltip && !this.#hiding) {
            if (!this.#text) {
                return;
            }
            this.#hiding = true;
            this.hide();
        }
        // Fix fixed tooltips
        this.#document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
            this.#renderer.removeChild(this.#document.body, element);
        });
    }
    onMouseUp() {
        if (this.#longPressTimeout) {
            clearTimeout(this.#longPressTimeout);
        }
    }
    onClick() {
        if (this.#tooltip && !this.#hiding) {
            this.#hiding = true;
            this.hide();
            return;
        }
        if (!this.#text) {
            this.#text = this.#elementRef.nativeElement.textContent;
        }
        if (!this.#tooltip && this.#text) {
            this.#longPressTimeout = setTimeout(() => {
                this.#hiding = false;
                this.show();
            }, this.tooltipLongPressDuration);
        }
    }
    show() {
        if (this.#lineClamp > 0 && !this.#isTextTruncated(this.#elementRef.nativeElement)) {
            return;
        }
        this.create();
        this.setPosition();
        this.#renderer.addClass(this.#tooltip, 'bizy-tooltip-identify');
        this.#renderer.addClass(this.#tooltip, 'bizy-tooltip--show');
        if (this.tooltipCustomClass) {
            this.#renderer.addClass(this.#tooltip, this.tooltipCustomClass);
        }
    }
    hide() {
        this.#renderer.removeClass(this.#tooltip, 'bizy-tooltip--show');
        window.setTimeout(() => {
            this.#renderer.removeChild(this.#document.body, this.#tooltip);
            this.#tooltip = null;
        }, this.tooltipDelay);
    }
    create() {
        this.#tooltip = this.#renderer.createElement('span');
        const sentences = String(this.#text).split('</br>');
        sentences.forEach(_sentence => {
            this.#renderer.appendChild(this.#tooltip, this.#renderer.createText(_sentence));
            this.#renderer.appendChild(this.#tooltip, this.#renderer.createElement('br'));
        });
        this.#renderer.appendChild(this.#document.body, this.#tooltip);
        this.#renderer.addClass(this.#tooltip, 'bizy-tooltip');
        this.#renderer.addClass(this.#tooltip, 'bizy-tooltip-' + this.tooltipPlacement);
        if (this.tooltipDelay > 0) {
            this.#renderer.setStyle(this.#tooltip, '-webkit-transition', 'opacity ' + this.tooltipDelay + 'ms');
            this.#renderer.setStyle(this.#tooltip, '-moz-transition', 'opacity ' + this.tooltipDelay + 'ms');
            this.#renderer.setStyle(this.#tooltip, '-o-transition', 'opacity ' + this.tooltipDelay + 'ms');
            this.#renderer.setStyle(this.#tooltip, 'transition', 'opacity ' + this.tooltipDelay + 'ms');
        }
    }
    setPosition() {
        const elRefPosition = this.#elementRef.nativeElement.getBoundingClientRect();
        const tooltipPos = this.#tooltip?.getBoundingClientRect();
        const scrollPos = window.pageYOffset || this.#document.documentElement.scrollTop || this.#document.body.scrollTop || 0;
        let top;
        let left;
        if (this.tooltipPlacement === 'top') {
            // @ts-ignore
            top = elRefPosition.top - tooltipPos.height - 10;
            // @ts-ignore
            left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
        }
        else if (this.tooltipPlacement === 'right') {
            // @ts-ignore
            top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
            left = elRefPosition.right + 10;
        }
        else if (this.tooltipPlacement === 'bottom') {
            top = elRefPosition.bottom + 10;
            // @ts-ignore
            left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
        }
        else if (this.tooltipPlacement === 'left') {
            // @ts-ignore
            top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
            // @ts-ignore
            left = elRefPosition.left - tooltipPos.width - 10;
        }
        this.#renderer.setStyle(this.#tooltip, 'top', (top + scrollPos) + 'px');
        this.#renderer.setStyle(this.#tooltip, 'left', left + 'px');
    }
    #isTextTruncated = (element) => {
        const { scrollHeight, clientHeight } = element;
        return scrollHeight > clientHeight;
    };
    ngOnDestroy() {
        this.#document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
            this.#renderer.removeChild(this.#document.body, element);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTooltipDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyTooltipDirective, isStandalone: true, selector: "[bizyTooltip]", inputs: { tooltipCustomClass: "tooltipCustomClass", tooltipPlacement: "tooltipPlacement", tooltipDelay: "tooltipDelay", tooltipLongPressDuration: "tooltipLongPressDuration", tooltipLineClamp: "tooltipLineClamp", tooltipText: ["bizyTooltip", "tooltipText"], placement: "placement", delay: "delay" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "mouseup": "onMouseUp()", "click": "onClick()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyTooltip]'
                }]
        }], propDecorators: { tooltipCustomClass: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], tooltipDelay: [{
                type: Input
            }], tooltipLongPressDuration: [{
                type: Input
            }], tooltipLineClamp: [{
                type: Input
            }], tooltipText: [{
                type: Input,
                args: ['bizyTooltip']
            }], placement: [{
                type: Input
            }], delay: [{
                type: Input
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], onMouseUp: [{
                type: HostListener,
                args: ['mouseup']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class BizyTrackByIdDirective {
    ngFor;
    constructor(ngFor) {
        this.ngFor = ngFor;
        this.ngFor.ngForTrackBy = (_index, item) => item.id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTrackByIdDirective, deps: [{ token: i1.NgForOf, host: true }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyTrackByIdDirective, isStandalone: true, selector: "[bizyTrackById]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyTrackByIdDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyTrackById]'
                }]
        }], ctorParameters: () => [{ type: i1.NgForOf, decorators: [{
                    type: Host
                }] }] });

class BizyAutoFocusDirective {
    elementRef;
    ref;
    autoFocus;
    constructor(elementRef, ref) {
        this.elementRef = elementRef;
        this.ref = ref;
    }
    ngAfterViewInit() {
        if (typeof this.autoFocus !== 'undefined' && this.autoFocus !== null && this.autoFocus !== false) {
            this.setFocus();
        }
    }
    setFocus() {
        const interval = setInterval(() => {
            this.elementRef.nativeElement.focus();
            this.ref.detectChanges();
        }, 300);
        fromEvent(this.elementRef.nativeElement, 'focus').pipe(take$1(1)).subscribe(() => {
            clearInterval(interval);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAutoFocusDirective, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.10", type: BizyAutoFocusDirective, isStandalone: true, selector: "[bizyAutoFocus]", inputs: { autoFocus: ["bizyAutoFocus", "autoFocus"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyAutoFocusDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyAutoFocus]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }], propDecorators: { autoFocus: [{
                type: Input,
                args: ['bizyAutoFocus']
            }] } });

const DIRECTIVES = [
    BizyCopyToClipboardDirective,
    BizyCurrencyFormatDirective,
    BizyLoadingDirective,
    BizyLongPressDirective,
    BizyOnlyNumbersDirective,
    BizyOnlyPhoneDigitsDirective,
    BizyTextEllipsisDirective,
    BizyTooltipDirective,
    BizyTrackByIdDirective,
    BizyAutoFocusDirective
];
class BizyDirectivesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: BizyDirectivesModule, imports: [BizyCopyToClipboardDirective,
            BizyCurrencyFormatDirective,
            BizyLoadingDirective,
            BizyLongPressDirective,
            BizyOnlyNumbersDirective,
            BizyOnlyPhoneDigitsDirective,
            BizyTextEllipsisDirective,
            BizyTooltipDirective,
            BizyTrackByIdDirective,
            BizyAutoFocusDirective], exports: [BizyCopyToClipboardDirective,
            BizyCurrencyFormatDirective,
            BizyLoadingDirective,
            BizyLongPressDirective,
            BizyOnlyNumbersDirective,
            BizyOnlyPhoneDigitsDirective,
            BizyTextEllipsisDirective,
            BizyTooltipDirective,
            BizyTrackByIdDirective,
            BizyAutoFocusDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDirectivesModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BizyDirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: DIRECTIVES,
                    exports: DIRECTIVES
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BIZY_ANIMATION, BIZY_CALENDAR_DAY, BIZY_CALENDAR_EVENT_ACTION, BIZY_CALENDAR_LANGUAGE, BIZY_CALENDAR_MODE, BIZY_FORMAT_SECONDS_FORMAT, BIZY_FORMAT_SECONDS_LANGUAGE, BIZY_SKELETON_SHAPE, BIZY_TAG_TYPE, BizyAccordionComponent, BizyAccordionModule, BizyAnimationService, BizyAudioPlayerComponent, BizyAudioPlayerModule, BizyAutoFocusDirective, BizyAveragePipe, BizyBarLineChartComponent, BizyBarLineChartModule, BizyBreadcrumbComponent, BizyBreadcrumbModule, BizyButtonComponent, BizyButtonModule, BizyCacheService, BizyCalendarComponent, BizyCalendarModule, BizyCardComponent, BizyCardModule, BizyCheckboxComponent, BizyCheckboxModule, BizyCopyToClipboardDirective, BizyCopyToClipboardService, BizyCurrencyFormatDirective, BizyDatePickerComponent, BizyDatePickerModule, BizyDeviceService, BizyDirectivesModule, BizyEnumToArrayPipe, BizyExportToCSVService, BizyExtractNumbersPipe, BizyFileUploaderComponent, BizyFileUploaderModule, BizyFileUploaderService, BizyFilterComponent, BizyFilterContentComponent, BizyFilterModule, BizyFilterPipe, BizyFilterSectionCheckboxOptionComponent, BizyFilterSectionComponent, BizyFilterSectionRangeOptionComponent, BizyFilterSectionSearchOptionComponent, BizyFilterSectionsComponent, BizyFormComponent, BizyFormModule, BizyFormatSecondsPipe, BizyFormatSecondsService, BizyFullScreenPopupWrapperComponent, BizyGridComponent, BizyGridForDirective, BizyGridModule, BizyGridRowComponent, BizyInputComponent, BizyInputModule, BizyInputOptionComponent, BizyKeyboardService, BizyListComponent, BizyListModule, BizyLoadingDirective, BizyLogService, BizyLongPressDirective, BizyMenuComponent, BizyMenuModule, BizyMenuOptionComponent, BizyMenuTitleComponent, BizyOnlyNumbersDirective, BizyOnlyPhoneDigitsDirective, BizyOrderByPipe, BizyPieChartComponent, BizyPieChartModule, BizyPipesModule, BizyPopupModule, BizyPopupService, BizyPopupWrapperComponent, BizyRadioComponent, BizyRadioModule, BizyRangeFilterPipe, BizyReducePipe, BizyRepeatPipe, BizyRouterService, BizySafePipe, BizySearchPipe, BizySectionCenterComponent, BizySectionComponent, BizySectionEndComponent, BizySectionModule, BizySectionStartComponent, BizySelectComponent, BizySelectModule, BizySelectOptionComponent, BizyServicesModule, BizySetToArrayPipe, BizySidebarComponent, BizySidebarFloatingOptionComponent, BizySidebarFloatingOptionTitleComponent, BizySidebarModule, BizySidebarOptionComponent, BizySkeletonComponent, BizySkeletonModule, BizySliderComponent, BizySliderModule, BizyStorageService, BizyTabComponent, BizyTableColumnArrowsComponent, BizyTableColumnComponent, BizyTableColumnFixedDirective, BizyTableComponent, BizyTableFooterComponent, BizyTableHeaderComponent, BizyTableModule, BizyTableRowComponent, BizyTableRowExpandContentComponent, BizyTableScrollingComponent, BizyTableScrollingDirective, BizyTabsComponent, BizyTabsModule, BizyTagComponent, BizyTagModule, BizyTextEllipsisDirective, BizyTimelineComponent, BizyTimelineEventComponent, BizyTimelineModule, BizyToastModule, BizyToastService, BizyToastWrapperComponent, BizyToggleComponent, BizyToggleModule, BizyToolbarComponent, BizyToolbarModule, BizyTooltipDirective, BizyTrackByIdDirective, BizyTranslateModule, BizyTranslatePipe, BizyTranslateService, BizyValidatorService, BizyViewportService, LANGUAGE, LOADING_TYPE, MIME_TYPE };
//# sourceMappingURL=bizy-core.mjs.map
