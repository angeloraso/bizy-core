import * as i0 from '@angular/core';
import { EventEmitter, Renderer2, Component, ChangeDetectionStrategy, Inject, ViewChild, Input, Output, NgModule, ChangeDetectorRef, ElementRef, Directive, TemplateRef, ContentChild, ContentChildren, ViewContainerRef, Pipe } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule, DOCUMENT, DecimalPipe } from '@angular/common';
import * as i2$3 from '@angular/forms';
import { FormsModule, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, filter, take, Subject, Subscription, interval, fromEvent, skip as skip$1, debounceTime as debounceTime$1 } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, skip } from 'rxjs/operators';
import * as i2 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i2$1 from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import * as i2$2 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as echarts from 'echarts';

class BizyToggleComponent {
    renderer;
    bizyToggleInput;
    #afterViewInit = new BehaviorSubject(false);
    id = String(Math.random());
    label = '';
    labelPosition = 'after';
    disabled = false;
    onSelect = new EventEmitter();
    checkedChange = new EventEmitter();
    _checked = false;
    set checked(checked) {
        this.#afterViewInit.asObservable().pipe(filter(status => status === true), take(1)).subscribe(() => {
            if (checked) {
                this.renderer.setAttribute(this.bizyToggleInput.nativeElement, 'checked', 'true');
            }
            else {
                this.renderer.removeAttribute(this.bizyToggleInput.nativeElement, 'checked');
            }
            this._checked = Boolean(checked);
        });
    }
    ngAfterViewInit() {
        this.#afterViewInit.next(true);
    }
    constructor(renderer) {
        this.renderer = renderer;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleComponent, deps: [{ token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyToggleComponent, selector: "bizy-toggle", inputs: { id: "id", label: "label", labelPosition: "labelPosition", disabled: "disabled", checked: "checked" }, outputs: { onSelect: "onSelect", checkedChange: "checkedChange" }, viewQueries: [{ propertyName: "bizyToggleInput", first: true, predicate: ["bizyToggleInput"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-toggle\">\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'before'\">{{label}}</label>\n\n    <div class=\"bizy-toggle__slide\">\n        <input \n            #bizyToggleInput\n            id=\"{{id}}\"\n            type=\"checkbox\"\n            (change)=\"checkedChange.emit(!checked); onSelect.emit(!_checked)\"\n            class=\"bizy-toggle__slide__checkbox\"\n            [ngClass]=\"{'bizy-toggle__slide__checkbox--disabled': disabled}\">\n        <div class=\"bizy-toggle__slide__knobs\"></div>\n        <div class=\"bizy-toggle__slide__layer\"></div>\n    </div>\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'after'\">{{label}}</label>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-toggle{display:flex;width:-moz-fit-content;width:fit-content;column-gap:.5rem;align-items:center}.bizy-toggle__slide{position:relative;width:50px;height:25px}.bizy-toggle__slide__layer{border-radius:100px}.bizy-toggle__slide__checkbox{position:relative;width:100%;height:100%;padding:0;margin:0;opacity:0;cursor:pointer;z-index:3}.bizy-toggle__slide__knobs,.bizy-toggle__slide__layer{position:absolute;inset:0}.bizy-toggle__slide__knobs{z-index:2}.bizy-toggle__slide__knobs:before{content:\"\";position:absolute;top:4px;left:4px;width:20px;height:10px;color:#fff;font-size:10px;font-weight:700;text-align:center;line-height:1;padding:9px 4px;background-color:var(--bizy-toggle-off-color);border-radius:50%;transition:.3s cubic-bezier(.18,.89,.35,1.15) all}.bizy-toggle__slide__layer{width:100%;background-color:var(--bizy-toggle-off-background-color);transition:.3s ease all;z-index:1}.bizy-toggle__slide__checkbox:checked+.bizy-toggle__slide__knobs:before{content:\"\";left:25px;background-color:var(--bizy-toggle-on-color)}.bizy-toggle__slide__checkbox:checked~.bizy-toggle__slide__layer{background-color:var(--bizy-toggle-on-background-color)}.bizy-toggle__slide__knobs,.bizy-toggle__slide__knobs:before,.bizy-toggle__slide__layer{transition:.3s ease all}.bizy-toggle__slide__checkbox--disabled{pointer-events:none;cursor:default}.bizy-toggle__label{cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toggle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-toggle\">\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'before'\">{{label}}</label>\n\n    <div class=\"bizy-toggle__slide\">\n        <input \n            #bizyToggleInput\n            id=\"{{id}}\"\n            type=\"checkbox\"\n            (change)=\"checkedChange.emit(!checked); onSelect.emit(!_checked)\"\n            class=\"bizy-toggle__slide__checkbox\"\n            [ngClass]=\"{'bizy-toggle__slide__checkbox--disabled': disabled}\">\n        <div class=\"bizy-toggle__slide__knobs\"></div>\n        <div class=\"bizy-toggle__slide__layer\"></div>\n    </div>\n\n    <label class=\"bizy-toggle__label\" for=\"{{id}}\" *ngIf=\"labelPosition === 'after'\">{{label}}</label>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-toggle{display:flex;width:-moz-fit-content;width:fit-content;column-gap:.5rem;align-items:center}.bizy-toggle__slide{position:relative;width:50px;height:25px}.bizy-toggle__slide__layer{border-radius:100px}.bizy-toggle__slide__checkbox{position:relative;width:100%;height:100%;padding:0;margin:0;opacity:0;cursor:pointer;z-index:3}.bizy-toggle__slide__knobs,.bizy-toggle__slide__layer{position:absolute;inset:0}.bizy-toggle__slide__knobs{z-index:2}.bizy-toggle__slide__knobs:before{content:\"\";position:absolute;top:4px;left:4px;width:20px;height:10px;color:#fff;font-size:10px;font-weight:700;text-align:center;line-height:1;padding:9px 4px;background-color:var(--bizy-toggle-off-color);border-radius:50%;transition:.3s cubic-bezier(.18,.89,.35,1.15) all}.bizy-toggle__slide__layer{width:100%;background-color:var(--bizy-toggle-off-background-color);transition:.3s ease all;z-index:1}.bizy-toggle__slide__checkbox:checked+.bizy-toggle__slide__knobs:before{content:\"\";left:25px;background-color:var(--bizy-toggle-on-color)}.bizy-toggle__slide__checkbox:checked~.bizy-toggle__slide__layer{background-color:var(--bizy-toggle-on-background-color)}.bizy-toggle__slide__knobs,.bizy-toggle__slide__knobs:before,.bizy-toggle__slide__layer{transition:.3s ease all}.bizy-toggle__slide__checkbox--disabled{pointer-events:none;cursor:default}.bizy-toggle__label{cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { bizyToggleInput: [{
                type: ViewChild,
                args: ['bizyToggleInput']
            }], id: [{
                type: Input
            }], label: [{
                type: Input
            }], labelPosition: [{
                type: Input
            }], disabled: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], checkedChange: [{
                type: Output
            }], checked: [{
                type: Input
            }] } });

const COMPONENTS$j = [
    BizyToggleComponent,
];
class BizyToggleModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleModule, declarations: [BizyToggleComponent], imports: [CommonModule, FormsModule], exports: [BizyToggleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToggleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$j,
                    exports: COMPONENTS$j
                }]
        }] });

var MIME_TYPE;
(function (MIME_TYPE) {
    MIME_TYPE["OGG"] = "audio/ogg";
    MIME_TYPE["MPEG"] = "audio/mpeg";
    MIME_TYPE["WAV"] = "audio/wav";
})(MIME_TYPE || (MIME_TYPE = {}));

class BizyButtonComponent {
    id = String(Math.random());
    disabled = false;
    type = 'button';
    customClass = '';
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyButtonComponent, selector: "bizy-button", inputs: { id: "id", disabled: "disabled", type: "type", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    [type]=\"type\"\n    id=\"{{id}}\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n    <span class=\"bizy-button__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem}.bizy-button{display:flex;justify-content:space-between;align-items:center;column-gap:.5rem;width:100%;height:100%;padding:var(--bizy-button-padding);border-radius:.3rem;border:none;cursor:pointer;background-color:var(--bizy-button-background-color)}.bizy-button ::ng-deep *{color:var(--bizy-button-color)}.bizy-button:hover{filter:brightness(95%)}.bizy-button__content{width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    [type]=\"type\"\n    id=\"{{id}}\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n    <span class=\"bizy-button__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem}.bizy-button{display:flex;justify-content:space-between;align-items:center;column-gap:.5rem;width:100%;height:100%;padding:var(--bizy-button-padding);border-radius:.3rem;border:none;cursor:pointer;background-color:var(--bizy-button-background-color)}.bizy-button ::ng-deep *{color:var(--bizy-button-color)}.bizy-button:hover{filter:brightness(95%)}.bizy-button__content{width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"] }]
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

class BizyAudioPlayerComponent {
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyAudioPlayerComponent, selector: "bizy-audio-player", inputs: { id: "id", mimeType: "mimeType", audioURL: "audioURL", downloadURL: "downloadURL", downloadFileName: "downloadFileName", downloadButtonText: "downloadButtonText" }, outputs: { onDownload: "onDownload", onTrackPlayerRate: "onTrackPlayerRate" }, ngImport: i0, template: "<div class=\"bizy-audio-player-component\">\n\n    <span class=\"bizy-audio-player__audio-controls\">\n      \n        <audio\n            *ngIf=\"audioURL\" \n            id=\"{{id}}\"\n            controls\n            controlslist=\"nodownload noplaybackrate\">\n            <source [src]=\"audioURL\" [type]=\"mimeType\">\n            {{audioPlayerError}}\n        </audio>\n\n        <bizy-button customClass=\"bizy-audio-player__audio-controls__playback-rate\" (onSelect)=\"_onTrackPlayerRate()\">\n            <h4>{{_playbackRate}}x</h4>\n        </bizy-button>\n\n    </span>\n\n    <bizy-button customClass=\"bizy-audio-player__download-button\" (onSelect)=\"_onDownload()\">\n        <svg \n            class=\"bizy-audio-player__download-button__icon\"\n            fill=\"none\"\n            stroke=\"currentColor\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            viewBox=\"0 0 24 24\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\"/>\n        </svg>\n        <h4>{{downloadButtonText}}</h4>\n    </bizy-button>\n\n</div>", styles: [":host{font-size:1rem}.bizy-audio-player-component{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;row-gap:2rem}.bizy-audio-player__audio-controls{width:100%;display:flex;align-items:center;column-gap:1rem}::ng-deep .bizy-audio-player__audio-controls__playback-rate{font-size:1rem;background-color:var(--bizy-audio-player-playback-rate-background-color);color:var(--bizy-audio-player-playback-rate-background-color);font-weight:700;border-radius:50%!important;width:4rem;height:2rem;display:grid;place-items:center;cursor:pointer}::ng-deep .bizy-audio-player__download-button{background-color:var(--bizy-audio-player-download-button-background-color)}::ng-deep .bizy-audio-player__download-button *{color:var(--bizy-audio-player-download-button-color)}.bizy-audio-player__download-button__icon{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: BizyButtonComponent, selector: "bizy-button", inputs: ["id", "disabled", "type", "customClass"], outputs: ["onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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

const COMPONENTS$i = [
    BizyButtonComponent,
];
class BizyButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonModule, declarations: [BizyButtonComponent], imports: [CommonModule, FormsModule], exports: [BizyButtonComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$i,
                    exports: COMPONENTS$i
                }]
        }] });

const COMPONENTS$h = [
    BizyAudioPlayerComponent,
];
const MODULES = [CommonModule, FormsModule, BizyButtonModule];
class BizyAudioPlayerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAudioPlayerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyAudioPlayerModule, declarations: [BizyAudioPlayerComponent], imports: [CommonModule, FormsModule, BizyButtonModule], exports: [BizyAudioPlayerComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAudioPlayerModule, imports: [MODULES] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAudioPlayerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: MODULES,
                    declarations: COMPONENTS$h,
                    exports: COMPONENTS$h
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyBreadcrumbComponent, selector: "bizy-breadcrumb", inputs: { breadcrumbs: "breadcrumbs" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<ul class=\"bizy-breadcrumb\">\n  <li *ngFor=\"let breadcrumb of _breadcrumbs; let last = last; let i = index\">\n    <button \n      class=\"bizy-breadcrumb__link\"\n      [ngClass]=\"{'bizy-breadcrumb__link--skip': breadcrumb.skip || last}\"\n      type=\"button\" \n      (click)=\"goTo(breadcrumb)\">\n      {{breadcrumb.label}}\n    </button>\n    <button\n      type=\"button\"\n      *ngIf=\"last && showGoBack\"\n      class=\"bizy-breadcrumb__go-back\"\n      (click)=\"goBack()\">\n      <svg \n        class=\"bizy-breadcrumb__go-back__icon\"\n        fill=\"none\"\n        stroke=\"currentColor\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        viewBox=\"0 0 24 24\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M0 0h24v24H0z\" fill=\"none\" stroke=\"none\"/>\n        <path d=\"M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1\"/>\n      </svg>\n    </button>\n  </li>\n</ul>\n  ", styles: [":host{font-size:1rem}.bizy-breadcrumb{list-style:none;margin:0;padding:0}.bizy-breadcrumb li{display:inline}.bizy-breadcrumb li:before{content:\"/\";margin:0 .3rem}.bizy-breadcrumb li:first-child:before{content:\"\";margin:0}.bizy-breadcrumb__link{cursor:pointer;border:none;background-color:transparent;color:var(--bizy-breadcrumb-link-color)}.bizy-breadcrumb__link:hover{filter:brightness(95%)}.bizy-breadcrumb__link--skip{cursor:default;color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__link--skip:hover{color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__go-back{cursor:pointer;margin-left:.4rem;position:relative;top:.5rem;background-color:transparent;border:none}.bizy-breadcrumb__go-back__icon{color:var(--bizy-breadcrumb-link-color);height:1rem;position:relative;bottom:.3rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-breadcrumb', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ul class=\"bizy-breadcrumb\">\n  <li *ngFor=\"let breadcrumb of _breadcrumbs; let last = last; let i = index\">\n    <button \n      class=\"bizy-breadcrumb__link\"\n      [ngClass]=\"{'bizy-breadcrumb__link--skip': breadcrumb.skip || last}\"\n      type=\"button\" \n      (click)=\"goTo(breadcrumb)\">\n      {{breadcrumb.label}}\n    </button>\n    <button\n      type=\"button\"\n      *ngIf=\"last && showGoBack\"\n      class=\"bizy-breadcrumb__go-back\"\n      (click)=\"goBack()\">\n      <svg \n        class=\"bizy-breadcrumb__go-back__icon\"\n        fill=\"none\"\n        stroke=\"currentColor\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        viewBox=\"0 0 24 24\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M0 0h24v24H0z\" fill=\"none\" stroke=\"none\"/>\n        <path d=\"M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1\"/>\n      </svg>\n    </button>\n  </li>\n</ul>\n  ", styles: [":host{font-size:1rem}.bizy-breadcrumb{list-style:none;margin:0;padding:0}.bizy-breadcrumb li{display:inline}.bizy-breadcrumb li:before{content:\"/\";margin:0 .3rem}.bizy-breadcrumb li:first-child:before{content:\"\";margin:0}.bizy-breadcrumb__link{cursor:pointer;border:none;background-color:transparent;color:var(--bizy-breadcrumb-link-color)}.bizy-breadcrumb__link:hover{filter:brightness(95%)}.bizy-breadcrumb__link--skip{cursor:default;color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__link--skip:hover{color:var(--bizy-breadcrumb-path-color)}.bizy-breadcrumb__go-back{cursor:pointer;margin-left:.4rem;position:relative;top:.5rem;background-color:transparent;border:none}.bizy-breadcrumb__go-back__icon{color:var(--bizy-breadcrumb-link-color);height:1rem;position:relative;bottom:.3rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { onSelect: [{
                type: Output
            }], breadcrumbs: [{
                type: Input
            }] } });

const COMPONENTS$g = [BizyBreadcrumbComponent];
class BizyBreadcrumbModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbModule, declarations: [BizyBreadcrumbComponent], imports: [CommonModule,
            FormsModule], exports: [BizyBreadcrumbComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbModule, imports: [CommonModule,
            FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBreadcrumbModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: COMPONENTS$g,
                    exports: COMPONENTS$g,
                }]
        }] });

class BizyFabButtonComponent {
    id = String(Math.random());
    disabled = false;
    customClass = '';
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFabButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFabButtonComponent, selector: "bizy-fab-button", inputs: { id: "id", disabled: "disabled", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    class=\"bizy-fab-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n\n    <span class=\"bizy-fab-button__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem;z-index:1;position:sticky;bottom:0;right:0}.bizy-fab-button{display:flex;display:grid;place-items:center;border-radius:50%;color:var(--bizy-fab-button-color);border:none;background-color:var(--bizy-fab-button-background-color);cursor:pointer;position:absolute;bottom:0;right:0;z-index:1;padding:1.2rem 1.3rem}.bizy-fab-button:hover{filter:brightness(95%)}.bizy-fab-button__content{width:100%;justify-content:center;align-items:center;flex-direction:column;row-gap:.5rem}.bizy-fab-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFabButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-fab-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    class=\"bizy-fab-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n\n    <span class=\"bizy-fab-button__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem;z-index:1;position:sticky;bottom:0;right:0}.bizy-fab-button{display:flex;display:grid;place-items:center;border-radius:50%;color:var(--bizy-fab-button-color);border:none;background-color:var(--bizy-fab-button-background-color);cursor:pointer;position:absolute;bottom:0;right:0;z-index:1;padding:1.2rem 1.3rem}.bizy-fab-button:hover{filter:brightness(95%)}.bizy-fab-button__content{width:100%;justify-content:center;align-items:center;flex-direction:column;row-gap:.5rem}.bizy-fab-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS$f = [
    BizyFabButtonComponent,
];
class BizyFabButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFabButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFabButtonModule, declarations: [BizyFabButtonComponent], imports: [CommonModule, FormsModule], exports: [BizyFabButtonComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFabButtonModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFabButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$f,
                    exports: COMPONENTS$f
                }]
        }] });

class BizyConfirmButtonsComponent {
    confirmLabel = 'Confirmar';
    cancelLabel = 'Cancelar';
    position;
    disabled = false;
    cancel = new EventEmitter();
    confirm = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyConfirmButtonsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyConfirmButtonsComponent, selector: "bizy-confirm-buttons", inputs: { confirmLabel: "confirmLabel", cancelLabel: "cancelLabel", position: "position", disabled: "disabled" }, outputs: { cancel: "cancel", confirm: "confirm" }, ngImport: i0, template: "<div class=\"bizy-confirm-buttons bizy-confirm-buttons--{{position}}\">\n\n    <bizy-button \n        class=\"bizy-confirm-buttons__cancel-button\"\n        type=\"button\"\n        (onSelect)=\"cancel.emit()\">\n        <svg \n            data-name=\"Cancel button\"\n            class=\"bizy-confirm-buttons__svg\"\n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__cancel-button__svg__content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n        <h4 class=\"bizy-confirm-buttons__cancel-button__label\">{{cancelLabel}}</h4>\n    </bizy-button>\n\n    <bizy-button \n        class=\"bizy-confirm-buttons__confirm-button\"\n        [disabled]=\"disabled\"\n        type=\"submit\"\n        (onSelect)=\"confirm.emit()\">\n        <h4 class=\"bizy-confirm-buttons__confirm-button__label\">{{confirmLabel}}</h4>\n        \n        <svg \n            viewBox=\"0 0 512 512\"\n            class=\"bizy-confirm-buttons__svg\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__confirm-button__svg__content\" d=\"M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z\"/>\n        </svg>\n\n    </bizy-button>\n\n</div>", styles: [":host{font-size:1rem}.bizy-confirm-buttons{background-color:transparent;height:auto;display:flex;align-items:center;justify-content:space-evenly;column-gap:1rem;width:100%}.bizy-confirm-buttons--fixed{position:fixed;bottom:0;right:0;left:0}.bizy-confirm-buttons--sticky{position:sticky;bottom:0;right:0;left:0}.bizy-confirm-buttons__confirm-button{--bizy-button-background-color: var(--bizy-confirm-buttons-confirm-background-color)}.bizy-confirm-buttons__cancel-button{--bizy-button-background-color: var(--bizy-confirm-buttons-cancel-background-color)}.bizy-confirm-buttons__svg{height:1rem}.bizy-confirm-buttons__cancel-button__svg__content{fill:var(--bizy-confirm-buttons-cancel-color)}.bizy-confirm-buttons__cancel-button__label{color:var(--bizy-confirm-buttons-cancel-color)}.bizy-confirm-buttons__confirm-button__svg__content{fill:var(--bizy-confirm-buttons-confirm-color)}.bizy-confirm-buttons__confirm-button__label{color:var(--bizy-confirm-buttons-confirm-color)}\n"], dependencies: [{ kind: "component", type: BizyButtonComponent, selector: "bizy-button", inputs: ["id", "disabled", "type", "customClass"], outputs: ["onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyConfirmButtonsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-confirm-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-confirm-buttons bizy-confirm-buttons--{{position}}\">\n\n    <bizy-button \n        class=\"bizy-confirm-buttons__cancel-button\"\n        type=\"button\"\n        (onSelect)=\"cancel.emit()\">\n        <svg \n            data-name=\"Cancel button\"\n            class=\"bizy-confirm-buttons__svg\"\n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__cancel-button__svg__content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n        <h4 class=\"bizy-confirm-buttons__cancel-button__label\">{{cancelLabel}}</h4>\n    </bizy-button>\n\n    <bizy-button \n        class=\"bizy-confirm-buttons__confirm-button\"\n        [disabled]=\"disabled\"\n        type=\"submit\"\n        (onSelect)=\"confirm.emit()\">\n        <h4 class=\"bizy-confirm-buttons__confirm-button__label\">{{confirmLabel}}</h4>\n        \n        <svg \n            viewBox=\"0 0 512 512\"\n            class=\"bizy-confirm-buttons__svg\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path class=\"bizy-confirm-buttons__confirm-button__svg__content\" d=\"M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z\"/>\n        </svg>\n\n    </bizy-button>\n\n</div>", styles: [":host{font-size:1rem}.bizy-confirm-buttons{background-color:transparent;height:auto;display:flex;align-items:center;justify-content:space-evenly;column-gap:1rem;width:100%}.bizy-confirm-buttons--fixed{position:fixed;bottom:0;right:0;left:0}.bizy-confirm-buttons--sticky{position:sticky;bottom:0;right:0;left:0}.bizy-confirm-buttons__confirm-button{--bizy-button-background-color: var(--bizy-confirm-buttons-confirm-background-color)}.bizy-confirm-buttons__cancel-button{--bizy-button-background-color: var(--bizy-confirm-buttons-cancel-background-color)}.bizy-confirm-buttons__svg{height:1rem}.bizy-confirm-buttons__cancel-button__svg__content{fill:var(--bizy-confirm-buttons-cancel-color)}.bizy-confirm-buttons__cancel-button__label{color:var(--bizy-confirm-buttons-cancel-color)}.bizy-confirm-buttons__confirm-button__svg__content{fill:var(--bizy-confirm-buttons-confirm-color)}.bizy-confirm-buttons__confirm-button__label{color:var(--bizy-confirm-buttons-confirm-color)}\n"] }]
        }], propDecorators: { confirmLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], position: [{
                type: Input
            }], disabled: [{
                type: Input
            }], cancel: [{
                type: Output
            }], confirm: [{
                type: Output
            }] } });

const COMPONENTS$e = [
    BizyConfirmButtonsComponent,
];
class BizyConfirmButtonsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyConfirmButtonsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyConfirmButtonsModule, declarations: [BizyConfirmButtonsComponent], imports: [CommonModule, FormsModule, BizyButtonModule], exports: [BizyConfirmButtonsComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyConfirmButtonsModule, imports: [CommonModule, FormsModule, BizyButtonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyConfirmButtonsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, BizyButtonModule],
                    declarations: COMPONENTS$e,
                    exports: COMPONENTS$e
                }]
        }] });

class BizyVirtualScrollGridDirective {
    elRef;
    renderer;
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
        this.renderer.setStyle(this.elRef.nativeElement, 'gap', '1em');
        this.renderer.setStyle(this.elRef.nativeElement, 'marginBottom', '1em');
        const notifier = new Subject();
        const check = interval(100);
        check.pipe(takeUntil(notifier)).subscribe(() => {
            if (this.elRef.nativeElement.offsetParent) {
                notifier.next();
                notifier.complete();
                const bizyVirtualScrollComponent = this.elRef.nativeElement.offsetParent.offsetParent.parentElement.parentElement;
                let itemMinHeight = bizyVirtualScrollComponent.getAttribute('itemminheight');
                if (!itemMinHeight.includes('em') && !itemMinHeight.includes('rem') && !itemMinHeight.includes('px')) {
                    itemMinHeight = `${itemMinHeight}px`;
                }
                let itemMinWidth = bizyVirtualScrollComponent.getAttribute('itemminwidth');
                if (!itemMinWidth.includes('em') && !itemMinWidth.includes('rem') && !itemMinWidth.includes('px')) {
                    itemMinWidth = `${itemMinWidth}px`;
                }
                if (itemMinWidth.includes('rem')) {
                    const fontSize = window.getComputedStyle(this.elRef.nativeElement, null).getPropertyValue('font-size');
                    if (fontSize) {
                        itemMinWidth = `${Number(itemMinWidth.split('rem')[0])}em`;
                    }
                }
                this.renderer.setStyle(this.elRef.nativeElement, 'gridTemplateColumns', `repeat(auto-fill, minmax(${itemMinWidth}, 1fr))`);
                this.renderer.setStyle(this.elRef.nativeElement, 'gridTemplateRows', itemMinHeight);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollGridDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyVirtualScrollGridDirective, selector: "[virtualScrollGrid]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualScrollGrid]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; } });

class BizyVirtualScrollNgForDirective {
    template;
    _items = new BehaviorSubject([]);
    get items() {
        return this._items.asObservable();
    }
    set virtualNgForIn(items) {
        this._items.next(items);
    }
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollNgForDirective, deps: [{ token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyVirtualScrollNgForDirective, selector: "[virtualNgFor]", inputs: { virtualNgForIn: "virtualNgForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollNgForDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualNgFor]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }]; }, propDecorators: { virtualNgForIn: [{
                type: Input
            }] } });

const MIN_VIRTUAL_SCROLL_WIDTH = 300;
class BizyVirtualScrollComponent {
    elementRef;
    ref;
    document;
    virtualFor;
    itemMinHeight;
    itemMinWidth;
    emptyText = 'Sin elementos para mostrar';
    viewportHeight; // css height value  
    virtualScrollItems = [];
    itemsByRow;
    items;
    _itemMinHeight;
    bizyVirtualScrollWidth;
    notifier$ = new Subject();
    #fontSize = 0;
    #resizeObserver;
    #mutationObserver;
    #subscription = new Subscription();
    constructor(elementRef, ref, document) {
        this.elementRef = elementRef;
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        if (this.#isString(this.itemMinHeight) && this.itemMinHeight.includes('rem')) {
            this._itemMinHeight = Number(this.itemMinHeight.split('rem')[0]) * 14; // 14 font size aprox
        }
        else {
            this._itemMinHeight = this.itemMinHeight;
        }
        this.#mutationObserver = new MutationObserver(() => {
            const virtualScrollWidth = this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.firstChild.offsetWidth;
            if (!virtualScrollWidth) {
                return;
            }
            this.bizyVirtualScrollWidth = virtualScrollWidth;
            this.#subscription.add(this.virtualFor.items.subscribe(items => {
                if (!items) {
                    return;
                }
                if (items.length > 0) {
                    this.items = items;
                    this.#fillVirtualScroll();
                    if (!this.#resizeObserver) {
                        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
                        this.#resizeObserver.observe(this.elementRef.nativeElement.parentElement?.parentElement);
                        this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
                            if (this.elementRef.nativeElement?.firstChild?.firstChild?.clientWidth) {
                                this.bizyVirtualScrollWidth = this.elementRef.nativeElement.firstChild.firstChild.clientWidth;
                                this.#fillVirtualScroll();
                            }
                        }));
                        this.notifier$.next();
                    }
                }
                else {
                    this.virtualScrollItems = [];
                    this.ref.detectChanges();
                }
            }));
            this.#mutationObserver.disconnect();
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    #fillVirtualScroll = () => {
        if (this.bizyVirtualScrollWidth < MIN_VIRTUAL_SCROLL_WIDTH) {
            this.itemsByRow = 1;
        }
        else {
            if (!this.#fontSize) {
                const fontSize = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size');
                this.#fontSize = Number(fontSize.split('px')[0]);
            }
            const gridGap = this.#fontSize || 14;
            let itemMinWidth = 1;
            if (this.#isString(this.itemMinWidth)) {
                if (this.itemMinWidth.includes('rem')) {
                    itemMinWidth = Number(this.itemMinWidth.split('rem')[0]) * gridGap;
                }
                else if (this.itemMinWidth.includes('em')) {
                    itemMinWidth = Number(this.itemMinWidth.split('em')[0]) * gridGap;
                }
            }
            else {
                itemMinWidth = this.itemMinWidth;
            }
            const count = Math.trunc(this.bizyVirtualScrollWidth / (itemMinWidth));
            if (((gridGap * (count - 1)) + (itemMinWidth * count)) <= (this.bizyVirtualScrollWidth)) {
                this.itemsByRow = count;
            }
            else {
                this.itemsByRow = count - 1;
            }
        }
        this.#setItems();
    };
    #setItems = () => {
        const array = [];
        const itemsLength = this.items.length;
        let i;
        for (i = 0; i < itemsLength; i++) {
            array.push(this.items.slice(i, i + this.itemsByRow));
            i += this.itemsByRow - 1;
        }
        this.virtualScrollItems.length = 0;
        this.virtualScrollItems = array;
        this.ref.detectChanges();
    };
    #isString(string) {
        return typeof string === 'string' || string instanceof String;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyVirtualScrollComponent, selector: "bizy-virtual-scroll", inputs: { itemMinHeight: "itemMinHeight", itemMinWidth: "itemMinWidth", emptyText: "emptyText", viewportHeight: "viewportHeight" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyVirtualScrollNgForDirective, descendants: true }], ngImport: i0, template: "<cdk-virtual-scroll-viewport \n  class=\"bizy-virtual-scroll\"\n  [ngClass]=\"{'bizy-virtual-scroll--hidden': !virtualScrollItems || virtualScrollItems.length === 0}\"\n  [itemSize]=\"_itemMinHeight\"\n  [ngStyle]=\"{'height': viewportHeight}\"\n  [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n  [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n  <ng-content></ng-content>\n  <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n    <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n  </div>\n</cdk-virtual-scroll-viewport>\n  ", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1rem;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--hidden{height:0!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-virtual-scroll', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cdk-virtual-scroll-viewport \n  class=\"bizy-virtual-scroll\"\n  [ngClass]=\"{'bizy-virtual-scroll--hidden': !virtualScrollItems || virtualScrollItems.length === 0}\"\n  [itemSize]=\"_itemMinHeight\"\n  [ngStyle]=\"{'height': viewportHeight}\"\n  [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n  [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n  <ng-content></ng-content>\n  <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n    <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n  </div>\n</cdk-virtual-scroll-viewport>\n  ", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1rem;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--hidden{height:0!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { virtualFor: [{
                type: ContentChild,
                args: [BizyVirtualScrollNgForDirective]
            }], itemMinHeight: [{
                type: Input
            }], itemMinWidth: [{
                type: Input
            }], emptyText: [{
                type: Input
            }], viewportHeight: [{
                type: Input
            }] } });

class BizyVirtualScrollModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, declarations: [BizyVirtualScrollComponent,
            BizyVirtualScrollGridDirective,
            BizyVirtualScrollNgForDirective], imports: [CommonModule, ScrollingModule], exports: [BizyVirtualScrollComponent,
            BizyVirtualScrollGridDirective,
            BizyVirtualScrollNgForDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, imports: [CommonModule, ScrollingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ScrollingModule],
                    declarations: [
                        BizyVirtualScrollComponent,
                        BizyVirtualScrollGridDirective,
                        BizyVirtualScrollNgForDirective,
                    ],
                    exports: [
                        BizyVirtualScrollComponent,
                        BizyVirtualScrollGridDirective,
                        BizyVirtualScrollNgForDirective,
                    ],
                }]
        }] });

class BizyInputComponent {
    ref;
    bizyInput;
    id = `bizy-input-${Math.random()}`;
    disabled = false;
    readonly = false;
    clear = true;
    autoFocus = true;
    autoCapitalize = false;
    autoCorrect = false;
    browserAutoComplete = true;
    type = 'text';
    label = '';
    max;
    maxLength;
    min;
    minLength;
    control;
    value;
    placeholder = '';
    cancelLabel = 'Cancelar';
    confirmLabel = 'Confirmar';
    customClass;
    onFocus = new EventEmitter();
    onEnter = new EventEmitter();
    onBlur = new EventEmitter();
    valueChange = new EventEmitter();
    onChange = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    onInput = (event) => {
        if (!event || !event.target) {
            return;
        }
        if (this.control) {
            this.control.markAsTouched();
            this.control.setValue(event.target.value ?? null);
        }
        else {
            this.valueChange.emit(event.target.value);
            this.onChange.emit(event.target.value);
        }
        this.ref.detectChanges();
    };
    _onBlur() {
        if (this.control) {
            this.control.markAsTouched();
        }
        this.onBlur.emit();
    }
    focus() {
        if (!this.bizyInput || !this.bizyInput.setFocus) {
            return;
        }
        this.bizyInput.setFocus();
    }
    cancel(modal, dateTime) {
        if (!modal || !dateTime) {
            return;
        }
        dateTime.cancel();
        modal.dismiss();
    }
    confirm(modal, dateTime) {
        if (!modal || !dateTime || !dateTime.value) {
            return;
        }
        dateTime.confirm();
        setTimeout(() => {
            this.onInput({ target: { value: String(dateTime.value) } });
            modal.dismiss();
        }, 1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyInputComponent, selector: "bizy-input", inputs: { id: "id", disabled: "disabled", readonly: "readonly", clear: "clear", autoFocus: "autoFocus", autoCapitalize: "autoCapitalize", autoCorrect: "autoCorrect", browserAutoComplete: "browserAutoComplete", type: "type", label: "label", max: "max", maxLength: "maxLength", min: "min", minLength: "minLength", control: "control", value: "value", placeholder: "placeholder", cancelLabel: "cancelLabel", confirmLabel: "confirmLabel", customClass: "customClass" }, outputs: { onFocus: "onFocus", onEnter: "onEnter", onBlur: "onBlur", valueChange: "valueChange", onChange: "onChange" }, viewQueries: [{ propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<ion-input \n    #bizyInput\n    *ngIf=\"type !== 'date' && type !== 'date-time' && type !== 'time' && type !== 'month-year' && type !== 'year' && type !== 'month' && type !== 'search'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    [type]=\"type\"\n    [inputmode]=\"type\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly\"\n    [value]=\"control ? control.value : value\"\n    [spellcheck]=\"true\"\n    [autocapitalize]=\"autoCapitalize ? 'on' : 'off'\"\n    [autocorrect]=\"autoCorrect ? 'on' : 'off'\"\n    [autocomplete]=\"browserAutoComplete ? 'on' : 'off'\"\n    [autofocus]=\"autoFocus\"\n    fill=\"solid\"\n    [max]=\"max\"\n    [maxlength]=\"maxLength\"\n    [min]=\"min\"\n    [minlength]=\"minLength\"\n    [debounce]=\"300\"\n    (ionBlur)=\"_onBlur()\"\n    (ionInput)=\"onInput($event)\"\n    (keyup.enter)=\"onEnter.emit()\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <h4 slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></h4>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<ion-input \n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    type=\"text\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"true\"\n    [value]=\"(control ? control.value : value) | date : (type === 'date' ? 'dd/MM/yyyy' : type === 'date-time' ? 'dd/MM/yyyy hh:mm' : type === 'time' ? 'hh:mm' : type === 'month-year' ? 'MMMM yyyy' : type === 'year' ? 'yyyy' : 'MMMM')\"\n    fill=\"solid\"\n    (ionBlur)=\"_onBlur()\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <h4 slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></h4>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<span class=\"bizy-input__errors\" *ngIf=\"control && control.touched && control.invalid\">\n    <ng-content select=\"[input-error]\"></ng-content>\n</span>\n\n<ion-modal \n    #bizyInputDateTimeModal\n    trigger=\"{{id}}\"\n    class=\"bizy-date-input\"\n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\">\n    <ng-template>\n\n        <ion-datetime \n            #bizyInputDateTime\n            [presentation]=\"type\" \n            [firstDayOfWeek]=\"1\"\n            [min]=\"min\"\n            [max]=\"max\"\n            locale=\"es-AR\"\n            hourCycle=\"h24\"\n            [showDefaultButtons]=\"true\"\n            [cancelText]=\"cancelLabel\"\n            [doneText]=\"confirmLabel\"\n            [value]=\"control ? control.value : value\">\n\n            <bizy-confirm-buttons\n                slot=\"buttons\"\n                (cancel)=\"cancel(bizyInputDateTimeModal, bizyInputDateTime)\"\n                (confirm)=\"confirm(bizyInputDateTimeModal, bizyInputDateTime)\">\n            </bizy-confirm-buttons>\n        </ion-datetime>\n\n    </ng-template>\n</ion-modal>\n\n", styles: [":host{font-size:1rem;width:100%}::ng-deep .bizy-input{--color: var(--bizy-input-color) !important;--background: var(--bizy-input-background-color) !important;--placeholder-color: var(--bizy-input-placeholder-color) !important;--placeholder-opacity: .8 !important;--padding-start: .3rem !important;--padding-end: .3rem !important;--inner-padding-end: 0 !important;--border-radius: .3rem .3rem 0 0 !important;border-bottom:.1rem solid var(--bizy-input-color)}::ng-deep .bizy-input__errors{margin-top:.5rem;display:flex;flex-direction:column;row-gap:.3rem}::ng-deep .bizy-input--error{border-bottom-color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input--error [slot=label]{color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input [slot=label]{color:var(--bizy-input-label-color)}::ng-deep .bizy-input [slot=start]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .bizy-input [slot=end]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .input-clear-icon.sc-ion-input-ios{width:auto!important;height:auto!important}::ng-deep .bizy-date-input{--width: auto !important;--height: auto !important}::ng-deep ion-datetime{--ion-color-base: var(--bizy-input-date-color);--ion-color-contrast: var(--bizy-input-date-contrast-color) !important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$1.IonDatetime, selector: "ion-datetime", inputs: ["cancelText", "clearText", "color", "dayValues", "disabled", "doneText", "firstDayOfWeek", "highlightedDates", "hourCycle", "hourValues", "isDateEnabled", "locale", "max", "min", "minuteValues", "mode", "monthValues", "multiple", "name", "preferWheel", "presentation", "readonly", "showClearButton", "showDefaultButtons", "showDefaultTimeLabel", "showDefaultTitle", "size", "titleSelectedDatesFormatter", "value", "yearValues"] }, { kind: "component", type: i2$1.IonInput, selector: "ion-input", inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "legacy", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "size", "spellcheck", "step", "type", "value"] }, { kind: "component", type: i2$1.IonModal, selector: "ion-modal" }, { kind: "directive", type: i2$1.SelectValueAccessor, selector: "ion-select, ion-radio-group, ion-segment, ion-datetime" }, { kind: "directive", type: i2$1.TextValueAccessor, selector: "ion-input:not([type=number]),ion-textarea,ion-searchbar,ion-range" }, { kind: "component", type: BizyConfirmButtonsComponent, selector: "bizy-confirm-buttons", inputs: ["confirmLabel", "cancelLabel", "position", "disabled"], outputs: ["cancel", "confirm"] }, { kind: "pipe", type: i1.DatePipe, name: "date" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ion-input \n    #bizyInput\n    *ngIf=\"type !== 'date' && type !== 'date-time' && type !== 'time' && type !== 'month-year' && type !== 'year' && type !== 'month' && type !== 'search'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    [type]=\"type\"\n    [inputmode]=\"type\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly\"\n    [value]=\"control ? control.value : value\"\n    [spellcheck]=\"true\"\n    [autocapitalize]=\"autoCapitalize ? 'on' : 'off'\"\n    [autocorrect]=\"autoCorrect ? 'on' : 'off'\"\n    [autocomplete]=\"browserAutoComplete ? 'on' : 'off'\"\n    [autofocus]=\"autoFocus\"\n    fill=\"solid\"\n    [max]=\"max\"\n    [maxlength]=\"maxLength\"\n    [min]=\"min\"\n    [minlength]=\"minLength\"\n    [debounce]=\"300\"\n    (ionBlur)=\"_onBlur()\"\n    (ionInput)=\"onInput($event)\"\n    (keyup.enter)=\"onEnter.emit()\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <h4 slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></h4>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<ion-input \n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\"\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    type=\"text\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"true\"\n    [value]=\"(control ? control.value : value) | date : (type === 'date' ? 'dd/MM/yyyy' : type === 'date-time' ? 'dd/MM/yyyy hh:mm' : type === 'time' ? 'hh:mm' : type === 'month-year' ? 'MMMM yyyy' : type === 'year' ? 'yyyy' : 'MMMM')\"\n    fill=\"solid\"\n    (ionBlur)=\"_onBlur()\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <h4 slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></h4>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<span class=\"bizy-input__errors\" *ngIf=\"control && control.touched && control.invalid\">\n    <ng-content select=\"[input-error]\"></ng-content>\n</span>\n\n<ion-modal \n    #bizyInputDateTimeModal\n    trigger=\"{{id}}\"\n    class=\"bizy-date-input\"\n    *ngIf=\"type === 'date' || type === 'date-time' || type === 'time' || type === 'month-year' || type === 'year' || type === 'month'\">\n    <ng-template>\n\n        <ion-datetime \n            #bizyInputDateTime\n            [presentation]=\"type\" \n            [firstDayOfWeek]=\"1\"\n            [min]=\"min\"\n            [max]=\"max\"\n            locale=\"es-AR\"\n            hourCycle=\"h24\"\n            [showDefaultButtons]=\"true\"\n            [cancelText]=\"cancelLabel\"\n            [doneText]=\"confirmLabel\"\n            [value]=\"control ? control.value : value\">\n\n            <bizy-confirm-buttons\n                slot=\"buttons\"\n                (cancel)=\"cancel(bizyInputDateTimeModal, bizyInputDateTime)\"\n                (confirm)=\"confirm(bizyInputDateTimeModal, bizyInputDateTime)\">\n            </bizy-confirm-buttons>\n        </ion-datetime>\n\n    </ng-template>\n</ion-modal>\n\n", styles: [":host{font-size:1rem;width:100%}::ng-deep .bizy-input{--color: var(--bizy-input-color) !important;--background: var(--bizy-input-background-color) !important;--placeholder-color: var(--bizy-input-placeholder-color) !important;--placeholder-opacity: .8 !important;--padding-start: .3rem !important;--padding-end: .3rem !important;--inner-padding-end: 0 !important;--border-radius: .3rem .3rem 0 0 !important;border-bottom:.1rem solid var(--bizy-input-color)}::ng-deep .bizy-input__errors{margin-top:.5rem;display:flex;flex-direction:column;row-gap:.3rem}::ng-deep .bizy-input--error{border-bottom-color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input--error [slot=label]{color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input [slot=label]{color:var(--bizy-input-label-color)}::ng-deep .bizy-input [slot=start]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .bizy-input [slot=end]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .input-clear-icon.sc-ion-input-ios{width:auto!important;height:auto!important}::ng-deep .bizy-date-input{--width: auto !important;--height: auto !important}::ng-deep ion-datetime{--ion-color-base: var(--bizy-input-date-color);--ion-color-contrast: var(--bizy-input-date-contrast-color) !important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { bizyInput: [{
                type: ViewChild,
                args: ['bizyInput']
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], clear: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], autoCapitalize: [{
                type: Input
            }], autoCorrect: [{
                type: Input
            }], browserAutoComplete: [{
                type: Input
            }], type: [{
                type: Input
            }], label: [{
                type: Input
            }], max: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], min: [{
                type: Input
            }], minLength: [{
                type: Input
            }], control: [{
                type: Input
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], confirmLabel: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onFocus: [{
                type: Output
            }], onEnter: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], valueChange: [{
                type: Output
            }], onChange: [{
                type: Output
            }] } });

class BizyErrorComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyErrorComponent, selector: "bizy-error", ngImport: i0, template: "<ng-content></ng-content>\n", styles: [":host{font-size:1rem;animation-name:fade-in;animation-duration:.5s;animation-fill-mode:both;color:var(--bizy-error-color);fill:var(--bizy-error-color)}:host ::ng-deep *{color:var(--bizy-error-color);fill:var(--bizy-error-color);font-weight:700}@keyframes fade-in{0%{opacity:0}to{opacity:1}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-error', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n", styles: [":host{font-size:1rem;animation-name:fade-in;animation-duration:.5s;animation-fill-mode:both;color:var(--bizy-error-color);fill:var(--bizy-error-color)}:host ::ng-deep *{color:var(--bizy-error-color);fill:var(--bizy-error-color);font-weight:700}@keyframes fade-in{0%{opacity:0}to{opacity:1}}\n"] }]
        }] });

const COMPONENTS$d = [
    BizyErrorComponent,
];
class BizyErrorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyErrorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyErrorModule, declarations: [BizyErrorComponent], imports: [CommonModule, FormsModule], exports: [BizyErrorComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyErrorModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyErrorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$d,
                    exports: COMPONENTS$d
                }]
        }] });

const COMPONENTS$c = [BizyInputComponent];
class BizyInputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, declarations: [BizyInputComponent], imports: [CommonModule,
            FormsModule,
            IonicModule,
            BizyErrorModule,
            BizyConfirmButtonsModule], exports: [BizyInputComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, imports: [CommonModule,
            FormsModule,
            IonicModule,
            BizyErrorModule,
            BizyConfirmButtonsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        IonicModule,
                        BizyErrorModule,
                        BizyConfirmButtonsModule
                    ],
                    declarations: COMPONENTS$c,
                    exports: COMPONENTS$c,
                }]
        }] });

class BizyTabComponent {
    ref;
    id = String(Math.random());
    disabled = false;
    linePosition = 'top';
    customClass = '';
    selected = false;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect() {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit();
    }
    setSelected = (selected) => {
        this.selected = selected;
        this.selectedChange.emit(selected);
        this.ref.detectChanges();
    };
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTabComponent, selector: "bizy-tab", inputs: { id: "id", disabled: "disabled", linePosition: "linePosition", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'top'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected && !disabled}\"></span>\n\n<button \n  type=\"button\"\n  id=\"{{id}}\"\n  [ngClass]=\"{'bizy-tab--selected': selected, 'bizy-tab--disabled': disabled}\"\n  class=\"bizy-tab {{customClass}}\"\n  (click)=\"onSelect.emit()\"\n  (keyup.enter)=\"onSelect.emit()\">\n\n  <ng-content></ng-content>\n\n</button>\n\n<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'bottom'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected && !disabled}\"></span>\n", styles: [":host{font-size:1rem;position:relative}.bizy-tab{width:100%;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:var(--bizy-tab-flex-direction);align-items:center;border-top:var(--bizy-tab-border-top);border-right:var(--bizy-tab-border-right);border-bottom:var(--bizy-tab-border-bottom);border-left:var(--bizy-tab-border-left);border-radius:var(--bizy-tab-border-radius);padding:var(--bizy-tab-padding);background-color:var(--bizy-tab-background-color);cursor:pointer}.bizy-tab--selected{color:var(--bizy-tab-selected-color);background-color:var(--bizy-tab-selected-background-color)}.bizy-tab--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-tab__selected-line{position:absolute;width:100%;height:.2rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-tab-selected-color)}.bizy-tab__selected-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.3s;animation-fill-mode:both}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tab', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'top'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected && !disabled}\"></span>\n\n<button \n  type=\"button\"\n  id=\"{{id}}\"\n  [ngClass]=\"{'bizy-tab--selected': selected, 'bizy-tab--disabled': disabled}\"\n  class=\"bizy-tab {{customClass}}\"\n  (click)=\"onSelect.emit()\"\n  (keyup.enter)=\"onSelect.emit()\">\n\n  <ng-content></ng-content>\n\n</button>\n\n<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'bottom'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected && !disabled}\"></span>\n", styles: [":host{font-size:1rem;position:relative}.bizy-tab{width:100%;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:var(--bizy-tab-flex-direction);align-items:center;border-top:var(--bizy-tab-border-top);border-right:var(--bizy-tab-border-right);border-bottom:var(--bizy-tab-border-bottom);border-left:var(--bizy-tab-border-left);border-radius:var(--bizy-tab-border-radius);padding:var(--bizy-tab-padding);background-color:var(--bizy-tab-background-color);cursor:pointer}.bizy-tab--selected{color:var(--bizy-tab-selected-color);background-color:var(--bizy-tab-selected-background-color)}.bizy-tab--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-tab__selected-line{position:absolute;width:100%;height:.2rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-tab-selected-color)}.bizy-tab__selected-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.3s;animation-fill-mode:both}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], linePosition: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

class BizyTabsComponent {
    ref;
    document;
    tabs;
    customClass;
    #subscription = new Subscription();
    #mutationObserver;
    #tabs = [];
    constructor(ref, document) {
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.tabs && (this.#tabs.length !== 0 || this.tabs.length !== 0) && !this.#tabsAreEqual(this.#tabs, this.tabs.toArray())) {
                this.#tabs = this.tabs.toArray();
                this.#listenTabChanges(this.tabs.toArray());
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    #listenTabChanges = (tabs) => {
        tabs.forEach(_tab => {
            this.#subscription.add(_tab.onSelect.subscribe(() => {
                this.tabs.toArray().forEach(_tab => {
                    _tab.setSelected(false);
                });
                _tab.setSelected(true);
                this.ref.detectChanges();
            }));
        });
    };
    #tabsAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort((a, b) => a.id.localeCompare(b.id));
        arr2.sort((a, b) => a.id.localeCompare(b.id));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTabsComponent, selector: "bizy-tabs", inputs: { customClass: "customClass" }, queries: [{ propertyName: "tabs", predicate: BizyTabComponent }], ngImport: i0, template: "<div class=\"bizy-tabs {{customClass}}\">\n\n    <ng-content select=\"bizy-tab\"></ng-content>\n\n</div>", styles: [":host{font-size:1rem}.bizy-tabs{display:flex;align-items:center;column-gap:var(--bizy-tabs-column-gap);background-color:var(--bizy-tabs-background-color)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tabs', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-tabs {{customClass}}\">\n\n    <ng-content select=\"bizy-tab\"></ng-content>\n\n</div>", styles: [":host{font-size:1rem}.bizy-tabs{display:flex;align-items:center;column-gap:var(--bizy-tabs-column-gap);background-color:var(--bizy-tabs-background-color)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { tabs: [{
                type: ContentChildren,
                args: [BizyTabComponent]
            }], customClass: [{
                type: Input
            }] } });

const COMPONENTS$b = [
    BizyTabsComponent,
    BizyTabComponent
];
class BizyTabsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsModule, declarations: [BizyTabsComponent,
            BizyTabComponent], imports: [CommonModule, FormsModule], exports: [BizyTabsComponent,
            BizyTabComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$b,
                    exports: COMPONENTS$b
                }]
        }] });

class BizyToolbarComponent {
    id = `bizy-toolbar-${Math.random()}`;
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyToolbarComponent, selector: "bizy-toolbar", inputs: { id: "id", customClass: "customClass" }, ngImport: i0, template: "<div id=\"{{id}}\" class=\"bizy-toolbar {{customClass}}\">\n\n    <span class=\"bizy-toolbar__start\">\n        \n        <ng-content select=\"[slot=start]\"></ng-content>\n\n    </span>\n\n    <span class=\"bizy-toolbar__end\">\n\n        <ng-content select=\"[slot=end]\"></ng-content>\n\n    </span>\n  \n\n</div>\n", styles: [":host{font-size:1rem}.bizy-toolbar{height:var(--bizy-toolbar-height);width:100%;background-color:var(--bizy-toolbar-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:1rem;padding:var(--bizy-toolbar-padding)}.bizy-toolbar__start{height:100%;display:flex;align-items:center;column-gap:.5rem}.bizy-toolbar__end{height:100%;display:flex;align-items:center;justify-content:flex-end;column-gap:.5rem}::ng-deep .bizy-toolbar *[toolbar-option]{height:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-toolbar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div id=\"{{id}}\" class=\"bizy-toolbar {{customClass}}\">\n\n    <span class=\"bizy-toolbar__start\">\n        \n        <ng-content select=\"[slot=start]\"></ng-content>\n\n    </span>\n\n    <span class=\"bizy-toolbar__end\">\n\n        <ng-content select=\"[slot=end]\"></ng-content>\n\n    </span>\n  \n\n</div>\n", styles: [":host{font-size:1rem}.bizy-toolbar{height:var(--bizy-toolbar-height);width:100%;background-color:var(--bizy-toolbar-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:1rem;padding:var(--bizy-toolbar-padding)}.bizy-toolbar__start{height:100%;display:flex;align-items:center;column-gap:.5rem}.bizy-toolbar__end{height:100%;display:flex;align-items:center;justify-content:flex-end;column-gap:.5rem}::ng-deep .bizy-toolbar *[toolbar-option]{height:100%}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

const COMPONENTS$a = [
    BizyToolbarComponent,
];
class BizyToolbarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarModule, declarations: [BizyToolbarComponent], imports: [CommonModule, FormsModule], exports: [BizyToolbarComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyToolbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$a,
                    exports: COMPONENTS$a
                }]
        }] });

class BizySidebarFloatingOptionTitleComponent {
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarFloatingOptionTitleComponent, selector: "bizy-sidebar-floating-option-title", inputs: { customClass: "customClass" }, ngImport: i0, template: "<span class=\"bizy-sidebar-floating-option-title {{customClass}}\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem}.bizy-sidebar-floating-option-title{background-color:var(--bizy-sidebar-floating-option-title-background-color);color:var(--bizy-sidebar-floating-option-title-color);padding:.5rem;cursor:default;-webkit-text-decoration:underline .1rem var(--bizy-sidebar-floating-option-title-underline-color);text-decoration:underline .1rem var(--bizy-sidebar-floating-option-title-underline-color);text-underline-offset:.2rem;display:flex;align-items:center}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-floating-option-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-sidebar-floating-option-title {{customClass}}\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem}.bizy-sidebar-floating-option-title{background-color:var(--bizy-sidebar-floating-option-title-background-color);color:var(--bizy-sidebar-floating-option-title-color);padding:.5rem;cursor:default;-webkit-text-decoration:underline .1rem var(--bizy-sidebar-floating-option-title-underline-color);text-decoration:underline .1rem var(--bizy-sidebar-floating-option-title-underline-color);text-underline-offset:.2rem;display:flex;align-items:center}\n"] }]
        }], propDecorators: { customClass: [{
                type: Input
            }] } });

class BizyAccordionComponent {
    customClass;
    opened = false;
    onOpen = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyAccordionComponent, selector: "bizy-accordion", inputs: { customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen" }, ngImport: i0, template: "<button \n  type=\"button\"\n  [ngClass]=\"{'bizy-accordion--opened': opened}\"\n  class=\"bizy-accordion {{customClass}}\"\n  (click)=\"opened = !opened; onOpen.emit(opened)\"\n  (keyup.enter)=\"opened = !opened; onOpen.emit(opened)\">\n\n  <span class=\"bizy-accordion__content\">\n    <ng-content></ng-content>\n  </span>\n\n  <svg \n    class=\"bizy-accordion__arrow\" \n    [ngClass]=\"{'bizy-accordion__arrow--opened': opened}\"\n    viewBox=\"0 0 96 96\" \n    xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n  </svg>\n\n</button>\n\n<span class=\"bizy-accordion__options\" [ngClass]=\"{'bizy-accordion__options--opened': opened}\">\n\n  <ng-content select=\"[accordion-option]\"></ng-content>\n\n</span>\n", styles: [":host{font-size:1rem;width:100%}:host:has(>.bizy-accordion__options:empty) .bizy-accordion>.bizy-accordion__arrow{display:none!important}.bizy-accordion{background-color:var(--bizy-accordion-background-color);border:none;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;width:100%;cursor:pointer;position:relative;border-top-left-radius:.3rem;border-bottom:var(--bizy-accordion-border-bottom)}.bizy-accordion__content{width:100%;flex:1}.bizy-accordion__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:var(--bizy-accordion-arrow-color);position:absolute;right:.5rem}.bizy-accordion__arrow--opened{transform:rotate(180deg)}.bizy-accordion__options{max-height:0;overflow:hidden;display:flex;flex-direction:column;padding-left:var(--bizy-accordion-padding-left);transition:max-height .3s ease;border-left:var(--bizy-accordion-border)}.bizy-accordion__options--opened{max-height:100vh}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-accordion', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n  type=\"button\"\n  [ngClass]=\"{'bizy-accordion--opened': opened}\"\n  class=\"bizy-accordion {{customClass}}\"\n  (click)=\"opened = !opened; onOpen.emit(opened)\"\n  (keyup.enter)=\"opened = !opened; onOpen.emit(opened)\">\n\n  <span class=\"bizy-accordion__content\">\n    <ng-content></ng-content>\n  </span>\n\n  <svg \n    class=\"bizy-accordion__arrow\" \n    [ngClass]=\"{'bizy-accordion__arrow--opened': opened}\"\n    viewBox=\"0 0 96 96\" \n    xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n  </svg>\n\n</button>\n\n<span class=\"bizy-accordion__options\" [ngClass]=\"{'bizy-accordion__options--opened': opened}\">\n\n  <ng-content select=\"[accordion-option]\"></ng-content>\n\n</span>\n", styles: [":host{font-size:1rem;width:100%}:host:has(>.bizy-accordion__options:empty) .bizy-accordion>.bizy-accordion__arrow{display:none!important}.bizy-accordion{background-color:var(--bizy-accordion-background-color);border:none;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;width:100%;cursor:pointer;position:relative;border-top-left-radius:.3rem;border-bottom:var(--bizy-accordion-border-bottom)}.bizy-accordion__content{width:100%;flex:1}.bizy-accordion__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:var(--bizy-accordion-arrow-color);position:absolute;right:.5rem}.bizy-accordion__arrow--opened{transform:rotate(180deg)}.bizy-accordion__options{max-height:0;overflow:hidden;display:flex;flex-direction:column;padding-left:var(--bizy-accordion-padding-left);transition:max-height .3s ease;border-left:var(--bizy-accordion-border)}.bizy-accordion__options--opened{max-height:100vh}\n"] }]
        }], propDecorators: { customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], onOpen: [{
                type: Output
            }] } });

class BizySidebarOptionComponent {
    ref;
    options;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    selected = false;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect() {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit();
    }
    setSelected = (selected) => {
        this.selected = selected;
        this.selectedChange.emit(selected);
        this.ref.detectChanges();
    };
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarOptionComponent, selector: "bizy-sidebar-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    customClass=\"bizy-sidebar-option {{selected ? 'bizy-sidebar-option--selected' : ''}} {{disabled ? 'bizy-sidebar-option--disabled' : ''}}\"\n    [opened]=\"selected\"\n    (onOpen)=\"_onSelect()\">\n\n    <ng-content></ng-content>\n\n    <span accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </span>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}:host:not(:has(.bizy-sidebar-option--disabled)) ::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}::ng-deep .bizy-sidebar-option--disabled{cursor:default!important}::ng-deep .bizy-accordion__options--opened{max-height:100%!important}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: BizyAccordionComponent, selector: "bizy-accordion", inputs: ["customClass", "opened"], outputs: ["onOpen"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    customClass=\"bizy-sidebar-option {{selected ? 'bizy-sidebar-option--selected' : ''}} {{disabled ? 'bizy-sidebar-option--disabled' : ''}}\"\n    [opened]=\"selected\"\n    (onOpen)=\"_onSelect()\">\n\n    <ng-content></ng-content>\n\n    <span accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </span>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}:host:not(:has(.bizy-sidebar-option--disabled)) ::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}::ng-deep .bizy-sidebar-option--disabled{cursor:default!important}::ng-deep .bizy-accordion__options--opened{max-height:100%!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

class BizySidebarFloatingOptionComponent {
    ref;
    document;
    options;
    id = String(Math.random());
    disabled = false;
    offsetX = 0;
    offsetY = 0;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    _opened = false;
    #mutationObserver;
    #subscription = new Subscription();
    #options = [];
    constructor(ref, document) {
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.options && (this.#options.length !== 0 || this.options.length !== 0) && !this.#optionsAreEqual(this.#options, this.options.toArray())) {
                this.#options = this.options.toArray();
                this.#listenOptionChanges(this.options.toArray());
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this._opened = !this._opened;
        this.selected = true;
        this.onSelect.emit(event);
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this._opened = false;
        this.ref.detectChanges();
    };
    setSelected = (selected) => {
        this.selected = selected;
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
            this.#subscription.add(_option.onSelect.subscribe(() => {
                if (!_option.options || _option.options.length === 0) {
                    this._opened = false;
                    this.ref.detectChanges();
                }
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenOptionChanges(_option.options.toArray());
            }
        });
    };
    #optionsAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort((a, b) => a.id.localeCompare(b.id));
        arr2.sort((a, b) => a.id.localeCompare(b.id));
        for (let i = 0; i < arr1.length; i++) {
            for (let key in arr1[i]) {
                if (arr1[i][key] !== arr2[i][key]) {
                    return false;
                }
            }
        }
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarFloatingOptionComponent, selector: "bizy-sidebar-floating-option", inputs: { id: "id", disabled: "disabled", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--disabled': disabled, 'bizy-sidebar-floating-option--selected': selected}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:10rem;border-radius:.3rem;width:100%;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-floating-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--disabled': disabled, 'bizy-sidebar-floating-option--selected': selected}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:10rem;border-radius:.3rem;width:100%;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
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
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizySidebarComponent {
    ref;
    document;
    options;
    floatingOptions;
    toggle = false;
    onToggle = new EventEmitter();
    #subscription = new Subscription();
    #mutationObserver;
    #options = [];
    #floatingOptions = [];
    constructor(ref, document) {
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.options && (this.#options.length !== 0 || this.options.length !== 0) && !this.#optionsAreEqual(this.#options, this.options.toArray())) {
                this.#options = this.options.toArray();
                const option = this.#getSelected(this.options.toArray());
                if (option) {
                    this.#unselect(this.options.toArray());
                    this.#select(this.options.toArray(), option);
                }
                this.#listenOptionChanges(this.options.toArray());
            }
            if (this.floatingOptions && (this.#floatingOptions.length !== 0 || this.floatingOptions.length !== 0) && !this.#optionsAreEqual(this.#floatingOptions, this.floatingOptions.toArray())) {
                this.#floatingOptions = this.floatingOptions.toArray();
                const option = this.#getSelected(this.floatingOptions.toArray());
                if (option) {
                    this.#unselect(this.floatingOptions.toArray());
                    this.#select(this.floatingOptions.toArray(), option);
                }
                this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    #listenOptionChanges = (options) => {
        options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(() => {
                if (_option.getSelected()) {
                    this.#select(this.options.toArray(), _option);
                }
                else {
                    this.#unselect(this.options.toArray());
                    this.#select(this.options.toArray(), _option);
                }
                this.ref.detectChanges();
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenOptionChanges(_option.options.toArray());
            }
        });
    };
    #listenFloatingOptionChanges = (options) => {
        options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(() => {
                if (_option.getSelected()) {
                    this.#select(this.options.toArray(), _option);
                }
                else {
                    this.#unselect(this.floatingOptions.toArray());
                    this.#select(this.floatingOptions.toArray(), _option);
                }
                this.ref.detectChanges();
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenFloatingOptionChanges(_option.options.toArray());
            }
        });
    };
    #select = (options, option) => {
        let optionSelected = false;
        options.forEach(_option => {
            if (_option.getId() === option.getId()) {
                if (_option.options && _option.options.length > 0) {
                    option.setSelected(!_option.getSelected());
                }
                else {
                    option.setSelected(true);
                }
                optionSelected = true;
                return;
            }
            else if (_option.options && _option.options.length > 0) {
                const _optionSelected = this.#select(_option.options.toArray(), option);
                if (_optionSelected) {
                    optionSelected = true;
                    _option.setSelected(true);
                    return;
                }
            }
        });
        return optionSelected;
    };
    #unselect = (options) => {
        options.forEach(_option => {
            _option.setSelected(false);
            if (_option.options && _option.options.length > 0) {
                this.#unselect(_option.options.toArray());
            }
        });
    };
    #optionsAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort((a, b) => a.id.localeCompare(b.id));
        arr2.sort((a, b) => a.id.localeCompare(b.id));
        for (let i = 0; i < arr1.length; i++) {
            for (let key in arr1[i]) {
                if (arr1[i][key] !== arr2[i][key]) {
                    return false;
                }
            }
        }
        return true;
    }
    #getSelected(options) {
        let selectedOption = null;
        if (!options || options.length === 0) {
            return null;
        }
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedOption = options[i];
                break;
            }
            if (options[i].options) {
                selectedOption = this.#getSelected(options[i].options.toArray());
                if (selectedOption) {
                    break;
                }
            }
        }
        return selectedOption;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarComponent, selector: "bizy-sidebar", inputs: { toggle: "toggle" }, outputs: { onToggle: "onToggle" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }, { propertyName: "floatingOptions", predicate: BizySidebarFloatingOptionComponent }], ngImport: i0, template: "<div class=\"bizy-sidebar\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"toggle = !toggle; onToggle.emit(toggle)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"toggle\"/>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__top\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__bottom\"  [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width)}.bizy-sidebar{width:-moz-fit-content;width:fit-content;height:100%;max-height:100vh;background-color:var(--bizy-sidebar-background-color);position:relative;transition:width .3s ease;display:grid;grid-template-columns:100%;grid-template-rows:auto 1fr auto}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__top{overflow:hidden;align-self:start}.bizy-sidebar__bottom{overflow:hidden;align-self:end}.bizy-sidebar__content{display:flex;min-height:var(--bizy-sidebar-section-min-height);width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding-left:.5rem;overflow-x:hidden;transition:width .3s ease}.bizy-sidebar__content--shrinked{padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-option-selected-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-sidebar\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"toggle = !toggle; onToggle.emit(toggle)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"toggle\"/>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__top\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__bottom\"  [ngClass]=\"{'bizy-sidebar__content--shrinked': toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width)}.bizy-sidebar{width:-moz-fit-content;width:fit-content;height:100%;max-height:100vh;background-color:var(--bizy-sidebar-background-color);position:relative;transition:width .3s ease;display:grid;grid-template-columns:100%;grid-template-rows:auto 1fr auto}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__top{overflow:hidden;align-self:start}.bizy-sidebar__bottom{overflow:hidden;align-self:end}.bizy-sidebar__content{display:flex;min-height:var(--bizy-sidebar-section-min-height);width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding-left:.5rem;overflow-x:hidden;transition:width .3s ease}.bizy-sidebar__content--shrinked{padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-option-selected-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], floatingOptions: [{
                type: ContentChildren,
                args: [BizySidebarFloatingOptionComponent]
            }], toggle: [{
                type: Input
            }], onToggle: [{
                type: Output
            }] } });

const COMPONENTS$9 = [
    BizyAccordionComponent,
];
class BizyAccordionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionModule, declarations: [BizyAccordionComponent], imports: [CommonModule, FormsModule], exports: [BizyAccordionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$9,
                    exports: COMPONENTS$9
                }]
        }] });

const COMPONENTS$8 = [
    BizySidebarComponent,
    BizySidebarOptionComponent,
    BizySidebarFloatingOptionComponent,
    BizySidebarFloatingOptionTitleComponent
];
class BizySidebarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, declarations: [BizySidebarComponent,
            BizySidebarOptionComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarFloatingOptionTitleComponent], imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule], exports: [BizySidebarComponent,
            BizySidebarOptionComponent,
            BizySidebarFloatingOptionComponent,
            BizySidebarFloatingOptionTitleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule],
                    declarations: COMPONENTS$8,
                    exports: COMPONENTS$8
                }]
        }] });

class BizyTableRowExpandContentComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableRowExpandContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableRowExpandContentComponent, selector: "bizy-table-row-expand-content", ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;width:100%;background-color:var(--bizy-table-row-expand-content-background-color);border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;padding:.5rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableRowExpandContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row-expand-content', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;width:100%;background-color:var(--bizy-table-row-expand-content-background-color);border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;padding:.5rem}\n"] }]
        }] });

// FIX: This components fixes the bug with Angular CDK virtual scrolling not supporting content projection.
// https://github.com/angular/components/issues/15277
class BizyTableScrollingComponent {
    elementRef;
    content;
    #view;
    items$;
    itemTemplate;
    itemSize;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    /** Called by the virtual-for directive inside of the viewport. */
    attachView(tableDirective) {
        if (this.#view) {
            return;
        }
        const fontSize = window
            .getComputedStyle(this.elementRef.nativeElement)
            .getPropertyValue('font-size');
        this.itemSize = (Number(fontSize.split('px')[0]) || 14) * 2;
        this.items$ = tableDirective.items$;
        this.itemTemplate = tableDirective.template;
        this.#view = tableDirective.viewContainerRef;
        this.#view.createEmbeddedView(this.content);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingComponent, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableScrollingComponent, selector: "bizy-table-scrolling", viewQueries: [{ propertyName: "content", first: true, predicate: ["tableScrollingContent"], descendants: true }], ngImport: i0, template: "<cdk-virtual-scroll-viewport \n    [itemSize]=\"itemSize\"\n    [minBufferPx]=\"itemSize + (itemSize * 20)\"\n    [maxBufferPx]=\"itemSize + (itemSize * 40)\">\n    \n    <ng-content></ng-content>\n\n    <ng-template #tableScrollingContent>\n      <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"items$ | async\">\n        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\"></ng-template>\n      </ng-template>\n    </ng-template>\n</cdk-virtual-scroll-viewport>", styles: ["::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:scroll!important;overflow-x:hidden!important;contain:inline-size!important}\n"], dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-scrolling', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cdk-virtual-scroll-viewport \n    [itemSize]=\"itemSize\"\n    [minBufferPx]=\"itemSize + (itemSize * 20)\"\n    [maxBufferPx]=\"itemSize + (itemSize * 40)\">\n    \n    <ng-content></ng-content>\n\n    <ng-template #tableScrollingContent>\n      <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"items$ | async\">\n        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\"></ng-template>\n      </ng-template>\n    </ng-template>\n</cdk-virtual-scroll-viewport>", styles: ["::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:scroll!important;overflow-x:hidden!important;contain:inline-size!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['tableScrollingContent']
            }] } });

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableScrollingDirective, selector: "[tableFor]", inputs: { tableForIn: "tableForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tableFor]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef, decorators: [{
                    type: Inject,
                    args: [ViewContainerRef]
                }] }, { type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { tableForIn: [{
                type: Input
            }] } });

class BizyTableColumnArrowsComponent {
    order = null;
    show = false;
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnArrowsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableColumnArrowsComponent, selector: "bizy-table-column-arrows", inputs: { order: "order", show: "show", customClass: "customClass" }, ngImport: i0, template: "<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 448 512\"\n    *ngIf=\"order !== 'asc' && order !== 'desc'\"\n    name=\"bizy-table-column-arrows\"\n    class=\"bizy-table-column-arrows bizy-table-column-arrows__down-up animated fade-in {{customClass}}\">\n    <path d=\"M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z\"/>\n</svg>\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'desc'\"\n    name=\"bizy-table-column-down-arrow\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\">\n    <path d=\"M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z\"/>\n</svg>\n\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'asc'\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\"\n    name=\"bizy-table-column-up-arrow\">\n    <path d=\"M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z\"/>\n</svg>\n", styles: [":host{font-size:1rem}.bizy-table-column-arrows__down-up{transform:rotate(90deg)}.bizy-table-column-arrows{display:none;font-size:1rem;height:1rem;fill:var(--bizy-table-column-arrows-color)}.bizy-table-column-arrows--visible{display:inline-block}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnArrowsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-column-arrows', changeDetection: ChangeDetectionStrategy.OnPush, template: "<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 448 512\"\n    *ngIf=\"order !== 'asc' && order !== 'desc'\"\n    name=\"bizy-table-column-arrows\"\n    class=\"bizy-table-column-arrows bizy-table-column-arrows__down-up animated fade-in {{customClass}}\">\n    <path d=\"M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z\"/>\n</svg>\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'desc'\"\n    name=\"bizy-table-column-down-arrow\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\">\n    <path d=\"M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z\"/>\n</svg>\n\n\n<svg \n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 576 512\"\n    *ngIf=\"order === 'asc'\"\n    class=\"bizy-table-column-arrows animated fade-in {{customClass}}\"\n    [ngClass]=\"{'bizy-table-column-arrows--visible': show}\"\n    name=\"bizy-table-column-up-arrow\">\n    <path d=\"M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z\"/>\n</svg>\n", styles: [":host{font-size:1rem}.bizy-table-column-arrows__down-up{transform:rotate(90deg)}.bizy-table-column-arrows{display:none;font-size:1rem;height:1rem;fill:var(--bizy-table-column-arrows-color)}.bizy-table-column-arrows--visible{display:inline-block}\n"] }]
        }], propDecorators: { order: [{
                type: Input
            }], show: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

class BizyTableColumnComponent {
    id = String(Math.random());
    customClass = '';
    onSelect = new EventEmitter();
    getId = () => {
        return this.id;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableColumnComponent, selector: "bizy-table-column", inputs: { id: "id", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"onSelect.emit($event)\"\n    (keyup.enter)=\"onSelect.emit($event)\"\n    class=\"bizy-table-column {{customClass}}\">\n\n    <ng-content></ng-content>\n    \n</button>", styles: [":host{font-size:1rem;flex:1;height:100%;display:flex;-webkit-user-select:text;user-select:text}:host:has(.bizy-table-column-arrows) .bizy-table-column{cursor:pointer!important}.bizy-table-column{font-size:1rem;min-width:var(--bizy-table-column-min-width);width:100%;border:none;background-color:transparent;display:flex;align-items:center;column-gap:.3rem;padding-right:.3rem}::ng-deep .bizy-table-column *{text-align:start}::ng-deep .bizy-table-column:hover .bizy-table-column-arrows{display:inline-block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-column', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"onSelect.emit($event)\"\n    (keyup.enter)=\"onSelect.emit($event)\"\n    class=\"bizy-table-column {{customClass}}\">\n\n    <ng-content></ng-content>\n    \n</button>", styles: [":host{font-size:1rem;flex:1;height:100%;display:flex;-webkit-user-select:text;user-select:text}:host:has(.bizy-table-column-arrows) .bizy-table-column{cursor:pointer!important}.bizy-table-column{font-size:1rem;min-width:var(--bizy-table-column-min-width);width:100%;border:none;background-color:transparent;display:flex;align-items:center;column-gap:.3rem;padding-right:.3rem}::ng-deep .bizy-table-column *{text-align:start}::ng-deep .bizy-table-column:hover .bizy-table-column-arrows{display:inline-block}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizyCheckboxComponent {
    id = String(Math.random());
    name;
    selected = false;
    disabled = false;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _checkboxId = String(Math.random());
    setSelected() {
        if (this.disabled) {
            return;
        }
        this.selected = !this.selected;
        this.selectedChange.emit(this.selected);
        this.onSelect.emit(this.selected);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: { id: "id", name: "name", selected: "selected", disabled: "disabled" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<div class=\"bizy-checkbox\">\n    <input \n        class=\"bizy-checkbox__input\"\n        [ngClass]=\"{'bizy-checkbox__input--disabled': disabled}\"\n        id=\"{{id}}\"\n        [disabled]=\"disabled\"\n        type=\"checkbox\"\n        [ngModel]=\"selected\"\n        (ngModelChange)=\"setSelected()\"/>\n    <label class=\"bizy-checkbox__checkbox\" for=\"{{id}}\">\n        <span>\n            <svg width=\"12px\" height=\"10px\">\n            <use attr.xlink:href=\"#{{_checkboxId}}\"></use>\n            </svg>\n        </span>\n    </label>\n    <svg class=\"inline-svg\">\n      <symbol id=\"{{_checkboxId}}\" viewbox=\"0 0 12 10\">\n        <polyline points=\"1.5 6 4.5 9 10.5 1\"></polyline>\n      </symbol>\n    </svg>\n</div>\n", styles: [":host{font-size:1rem}.bizy-checkbox .bizy-checkbox__checkbox{-webkit-user-select:none;user-select:none;cursor:pointer;padding:.1rem;border-radius:.5rem;overflow:hidden;transition:all .2s ease;display:inline-block}.bizy-checkbox .bizy-checkbox__checkbox:hover{background:var(--bizy-checkbox-hover-color)}.bizy-checkbox .bizy-checkbox__checkbox span{float:left;vertical-align:middle;transform:translateZ(0)}.bizy-checkbox .bizy-checkbox__checkbox span:first-child{position:relative;width:1.1rem;height:1.1rem;border-radius:.25rem;transform:scale(1);border:.1rem solid var(--bizy-checkbox-border-color);transition:all .2s ease;box-shadow:0 1px 1px #00104b0d}.bizy-checkbox .bizy-checkbox__checkbox span:first-child svg{position:absolute;top:.2rem;left:.15rem;fill:none!important;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1.1rem;stroke-dashoffset:1.1rem;transition:all .3s ease;transition-delay:.1s;transform:translateZ(0)}.bizy-checkbox .bizy-checkbox__checkbox:hover span:first-child{border-color:var(--bizy-checkbox-selected-color)}.bizy-checkbox .bizy-checkbox__input{position:absolute;visibility:hidden}.bizy-checkbox__input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-checkbox .bizy-checkbox__input:checked+.bizy-checkbox__checkbox span:first-child{background-color:var(--bizy-checkbox-selected-color);border-color:var(--bizy-checkbox-selected-color);animation:bizy-checkbox-wave .4s ease}.bizy-checkbox .bizy-checkbox__input:checked+.bizy-checkbox__checkbox span:first-child svg{stroke-dashoffset:0}.bizy-checkbox .inline-svg{position:absolute;width:0;height:0;pointer-events:none;-webkit-user-select:none;user-select:none}@keyframes bizy-checkbox-wave{50%{transform:scale(.9)}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$3.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2$3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-checkbox', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-checkbox\">\n    <input \n        class=\"bizy-checkbox__input\"\n        [ngClass]=\"{'bizy-checkbox__input--disabled': disabled}\"\n        id=\"{{id}}\"\n        [disabled]=\"disabled\"\n        type=\"checkbox\"\n        [ngModel]=\"selected\"\n        (ngModelChange)=\"setSelected()\"/>\n    <label class=\"bizy-checkbox__checkbox\" for=\"{{id}}\">\n        <span>\n            <svg width=\"12px\" height=\"10px\">\n            <use attr.xlink:href=\"#{{_checkboxId}}\"></use>\n            </svg>\n        </span>\n    </label>\n    <svg class=\"inline-svg\">\n      <symbol id=\"{{_checkboxId}}\" viewbox=\"0 0 12 10\">\n        <polyline points=\"1.5 6 4.5 9 10.5 1\"></polyline>\n      </symbol>\n    </svg>\n</div>\n", styles: [":host{font-size:1rem}.bizy-checkbox .bizy-checkbox__checkbox{-webkit-user-select:none;user-select:none;cursor:pointer;padding:.1rem;border-radius:.5rem;overflow:hidden;transition:all .2s ease;display:inline-block}.bizy-checkbox .bizy-checkbox__checkbox:hover{background:var(--bizy-checkbox-hover-color)}.bizy-checkbox .bizy-checkbox__checkbox span{float:left;vertical-align:middle;transform:translateZ(0)}.bizy-checkbox .bizy-checkbox__checkbox span:first-child{position:relative;width:1.1rem;height:1.1rem;border-radius:.25rem;transform:scale(1);border:.1rem solid var(--bizy-checkbox-border-color);transition:all .2s ease;box-shadow:0 1px 1px #00104b0d}.bizy-checkbox .bizy-checkbox__checkbox span:first-child svg{position:absolute;top:.2rem;left:.15rem;fill:none!important;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1.1rem;stroke-dashoffset:1.1rem;transition:all .3s ease;transition-delay:.1s;transform:translateZ(0)}.bizy-checkbox .bizy-checkbox__checkbox:hover span:first-child{border-color:var(--bizy-checkbox-selected-color)}.bizy-checkbox .bizy-checkbox__input{position:absolute;visibility:hidden}.bizy-checkbox__input--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-checkbox .bizy-checkbox__input:checked+.bizy-checkbox__checkbox span:first-child{background-color:var(--bizy-checkbox-selected-color);border-color:var(--bizy-checkbox-selected-color);animation:bizy-checkbox-wave .4s ease}.bizy-checkbox .bizy-checkbox__input:checked+.bizy-checkbox__checkbox span:first-child svg{stroke-dashoffset:0}.bizy-checkbox .inline-svg{position:absolute;width:0;height:0;pointer-events:none;-webkit-user-select:none;user-select:none}@keyframes bizy-checkbox-wave{50%{transform:scale(.9)}}\n"] }]
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

class BizyTableRowComponent {
    ref;
    id = String(Math.random());
    customClass = '';
    disabled = false;
    selected = false;
    opened = false;
    selectable = null;
    onSelect = new EventEmitter();
    onOpen = new EventEmitter();
    marginRight = 0;
    constructor(ref) {
        this.ref = ref;
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
        this.onSelect.emit(selected);
        this.ref.detectChanges();
    };
    setMarginRight(margin) {
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableRowComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableRowComponent, selector: "bizy-table-row", inputs: { id: "id", customClass: "customClass", disabled: "disabled", selected: "selected", opened: "opened", selectable: "selectable" }, outputs: { onSelect: "onSelect", onOpen: "onOpen" }, ngImport: i0, template: "<bizy-accordion \n    class=\"bizy-table-row__accordion\"\n    customClass=\"bizy-table-row__accordion {{disabled ? 'bizy-table-row--disabled' : ''}} {{selected ? 'bizy-table-row--selected' : ''}} {{opened ? 'bizy-table-row--opened' : ''}}\"\n    [opened]=\"opened\"\n    (onOpen)=\"onOpen.emit($event)\">\n\n    <button\n        type=\"button\"\n        id=\"{{id}}\"\n        class=\"bizy-table-row {{customClass}}\"\n        (click)=\"onSelect.emit(!selected)\"\n        (keyup.enter)=\"onSelect.emit(!selected)\"\n        [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n        <ng-content select=\"bizy-table-column\"></ng-content>\n\n        <bizy-checkbox \n            *ngIf=\"selectable !== null\"\n            class=\"bizy-table-row__checkbox\"\n            [ngStyle]=\"{right: marginRight + 'px'}\"\n            [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\"\n            (click)=\"$event.stopPropagation()\"\n            (onSelect)=\"onSelect.emit($event)\">\n        </bizy-checkbox>\n        \n    </button>\n\n    <ng-content accordion-option select=\"bizy-table-row-expand-content\"></ng-content>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;width:100%;display:flex;min-width:-moz-fit-content;min-width:fit-content;margin-bottom:.1rem}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row__accordion:hover{background-color:var(--bizy-table-row-hover-background-color)!important}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row:hover{background-color:inherit!important}::ng-deep .bizy-table-row__accordion{padding:0!important;--bizy-accordion-background-color: var(--bizy-table-row-background-color);--bizy-accordion-padding-left: 0}::ng-deep .bizy-table-row__accordion .bizy-accordion__options{--bizy-accordion-padding-left: 0}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:-moz-fit-content;height:fit-content;border:none;min-height:var(--bizy-table-row-height);background-color:inherit;border-bottom:inherit}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color)!important}::ng-deep .bizy-table-row--opened{background-color:var(--bizy-table-row-opened-background-color)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }, { kind: "component", type: BizyAccordionComponent, selector: "bizy-accordion", inputs: ["customClass", "opened"], outputs: ["onOpen"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-accordion \n    class=\"bizy-table-row__accordion\"\n    customClass=\"bizy-table-row__accordion {{disabled ? 'bizy-table-row--disabled' : ''}} {{selected ? 'bizy-table-row--selected' : ''}} {{opened ? 'bizy-table-row--opened' : ''}}\"\n    [opened]=\"opened\"\n    (onOpen)=\"onOpen.emit($event)\">\n\n    <button\n        type=\"button\"\n        id=\"{{id}}\"\n        class=\"bizy-table-row {{customClass}}\"\n        (click)=\"onSelect.emit(!selected)\"\n        (keyup.enter)=\"onSelect.emit(!selected)\"\n        [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n        <ng-content select=\"bizy-table-column\"></ng-content>\n\n        <bizy-checkbox \n            *ngIf=\"selectable !== null\"\n            class=\"bizy-table-row__checkbox\"\n            [ngStyle]=\"{right: marginRight + 'px'}\"\n            [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n            [selected]=\"selected\"\n            [disabled]=\"disabled\"\n            (click)=\"$event.stopPropagation()\"\n            (onSelect)=\"onSelect.emit($event)\">\n        </bizy-checkbox>\n        \n    </button>\n\n    <ng-content accordion-option select=\"bizy-table-row-expand-content\"></ng-content>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;width:100%;display:flex;min-width:-moz-fit-content;min-width:fit-content;margin-bottom:.1rem}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row__accordion:hover{background-color:var(--bizy-table-row-hover-background-color)!important}:host:not(:has(.bizy-table-row--selected)) ::ng-deep .bizy-table-row:hover{background-color:inherit!important}::ng-deep .bizy-table-row__accordion{padding:0!important;--bizy-accordion-background-color: var(--bizy-table-row-background-color);--bizy-accordion-padding-left: 0}::ng-deep .bizy-table-row__accordion .bizy-accordion__options{--bizy-accordion-padding-left: 0}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:-moz-fit-content;height:fit-content;border:none;min-height:var(--bizy-table-row-height);background-color:inherit;border-bottom:inherit}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color)!important}::ng-deep .bizy-table-row--opened{background-color:var(--bizy-table-row-opened-background-color)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
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
            }], onSelect: [{
                type: Output
            }], onOpen: [{
                type: Output
            }] } });

class BizyTableFooterComponent {
    ref;
    id = String(Math.random());
    customClass = '';
    marginRight = 0;
    _selectable = false;
    constructor(ref) {
        this.ref = ref;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableFooterComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableFooterComponent, selector: "bizy-table-footer", inputs: { id: "id", customClass: "customClass" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-footer-background-color)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-footer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-footer-background-color)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });

class BizyTableHeaderComponent {
    ref;
    id = String(Math.random());
    customClass = '';
    selected = false;
    selectable = null;
    onSelect = new EventEmitter();
    marginRight = 0;
    constructor(ref) {
        this.ref = ref;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableHeaderComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableHeaderComponent, selector: "bizy-table-header", inputs: { id: "id", customClass: "customClass", selected: "selected", selectable: "selectable" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectable: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

class BizyTableComponent {
    ref;
    document;
    elementRef;
    viewport;
    virtualFor;
    header;
    rows;
    footer;
    #selectableMutationObserver;
    #rowScrollingMutationObserver;
    #afterContentInitObserver;
    #resizeObserver;
    notifier$ = new Subject();
    #subscription = new Subscription();
    marginRight = 0;
    set selectable(selectable) {
        this.#selectableMutationObserver = new MutationObserver(() => {
            if (!this.rows || this.rows.length === 0) {
                return;
            }
            this.rows.forEach(_row => {
                _row.setSelectable(selectable);
                _row.setMarginRight(this.marginRight);
            });
            if (this.header) {
                this.header.setSelectable(selectable);
            }
            if (this.footer) {
                this.footer.setSelectable(selectable);
            }
            this.ref.detectChanges();
        });
        this.#selectableMutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    ;
    constructor(ref, document, elementRef) {
        this.ref = ref;
        this.document = document;
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        this.#rowScrollingMutationObserver = new MutationObserver(() => {
            if (!this.virtualFor) {
                return;
            }
            this.viewport.attachView(this.virtualFor);
            this.#rowScrollingMutationObserver.disconnect();
            this.ref.detectChanges();
            this.#afterContentInitObserver = new MutationObserver(() => {
                if (!this.elementRef.nativeElement.offsetWidth) {
                    return;
                }
                this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
                this.rows.forEach(_row => {
                    _row.setMarginRight(this.marginRight);
                });
                if (this.header) {
                    this.header.setMarginRight(this.marginRight);
                }
                if (this.footer) {
                    this.footer.setMarginRight(this.marginRight);
                }
                this.#subscription.add(fromEvent(this.elementRef.nativeElement, 'scroll', { capture: true }).subscribe(() => {
                    this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
                    this.rows.forEach(_row => {
                        _row.setMarginRight(this.marginRight);
                    });
                    if (this.header) {
                        this.header.setMarginRight(this.marginRight);
                    }
                    if (this.footer) {
                        this.footer.setMarginRight(this.marginRight);
                    }
                }));
                this.#afterContentInitObserver.disconnect();
                this.ref.detectChanges();
            });
            this.#afterContentInitObserver.observe(this.document.body, { childList: true, subtree: true });
        });
        this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });
        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
        this.#resizeObserver.observe(this.elementRef.nativeElement);
        this.#subscription.add(this.notifier$.pipe(skip$1(1), debounceTime$1(100)).subscribe(() => {
            this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
            this.rows.forEach(_row => {
                _row.setMarginRight(this.marginRight);
            });
            if (this.header) {
                this.header.setMarginRight(this.marginRight);
            }
            if (this.footer) {
                this.footer.setMarginRight(this.marginRight);
            }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableComponent, selector: "bizy-table", inputs: { selectable: "selectable" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyTableScrollingDirective, descendants: true }, { propertyName: "header", first: true, predicate: BizyTableHeaderComponent, descendants: true }, { propertyName: "footer", first: true, predicate: BizyTableFooterComponent, descendants: true }, { propertyName: "rows", predicate: BizyTableRowComponent }], viewQueries: [{ propertyName: "viewport", first: true, predicate: BizyTableScrollingComponent, descendants: true }], ngImport: i0, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%;overflow-x:scroll;overflow-y:hidden}.bizy-table{width:100%;min-width:-moz-fit-content;min-width:fit-content;height:100%;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{display:flex;flex-direction:column;height:var(--bizy-table-height);width:var(--bizy-table-width);min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"], dependencies: [{ kind: "component", type: BizyTableScrollingComponent, selector: "bizy-table-scrolling" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%;overflow-x:scroll;overflow-y:hidden}.bizy-table{width:100%;min-width:-moz-fit-content;min-width:fit-content;height:100%;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{display:flex;flex-direction:column;height:var(--bizy-table-height);width:var(--bizy-table-width);min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { viewport: [{
                type: ViewChild,
                args: [BizyTableScrollingComponent]
            }], virtualFor: [{
                type: ContentChild,
                args: [BizyTableScrollingDirective]
            }], header: [{
                type: ContentChild,
                args: [BizyTableHeaderComponent]
            }], rows: [{
                type: ContentChildren,
                args: [BizyTableRowComponent]
            }], footer: [{
                type: ContentChild,
                args: [BizyTableFooterComponent]
            }], selectable: [{
                type: Input
            }] } });

const COMPONENTS$7 = [
    BizyCheckboxComponent,
];
class BizyCheckboxModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxModule, declarations: [BizyCheckboxComponent], imports: [CommonModule, FormsModule], exports: [BizyCheckboxComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$7,
                    exports: COMPONENTS$7
                }]
        }] });

const COMPONENTS$6 = [
    BizyTableComponent,
    BizyTableHeaderComponent,
    BizyTableFooterComponent,
    BizyTableRowComponent,
    BizyTableColumnComponent,
    BizyTableColumnArrowsComponent,
    BizyTableScrollingDirective,
    BizyTableScrollingComponent,
    BizyTableRowExpandContentComponent
];
class BizyTableModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, declarations: [BizyTableComponent,
            BizyTableHeaderComponent,
            BizyTableFooterComponent,
            BizyTableRowComponent,
            BizyTableColumnComponent,
            BizyTableColumnArrowsComponent,
            BizyTableScrollingDirective,
            BizyTableScrollingComponent,
            BizyTableRowExpandContentComponent], imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule], exports: [BizyTableComponent,
            BizyTableHeaderComponent,
            BizyTableFooterComponent,
            BizyTableRowComponent,
            BizyTableColumnComponent,
            BizyTableColumnArrowsComponent,
            BizyTableScrollingDirective,
            BizyTableScrollingComponent,
            BizyTableRowExpandContentComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule],
                    declarations: COMPONENTS$6,
                    exports: COMPONENTS$6
                }]
        }] });

class BizyMenuTitleComponent {
    customClass = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyMenuTitleComponent, selector: "bizy-menu-title", inputs: { customClass: "customClass" }, ngImport: i0, template: "<span class=\"bizy-menu-title {{customClass}}\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem}.bizy-menu-title{background-color:var(--bizy-menu-title-background-color);color:var(--bizy-menu-title-color);padding:.5rem;cursor:default;-webkit-text-decoration:underline .1rem var(--bizy-menu-title-underline-color);text-decoration:underline .1rem var(--bizy-menu-title-underline-color);text-underline-offset:.3rem;display:flex;align-items:center}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-menu-title {{customClass}}\">\n    <ng-content></ng-content>\n</span>\n", styles: [":host{font-size:1rem}.bizy-menu-title{background-color:var(--bizy-menu-title-background-color);color:var(--bizy-menu-title-color);padding:.5rem;cursor:default;-webkit-text-decoration:underline .1rem var(--bizy-menu-title-underline-color);text-decoration:underline .1rem var(--bizy-menu-title-underline-color);text-underline-offset:.3rem;display:flex;align-items:center}\n"] }]
        }], propDecorators: { customClass: [{
                type: Input
            }] } });

class BizyMenuOptionComponent {
    id = String(Math.random());
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyMenuOptionComponent, selector: "bizy-menu-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-menu-option--selected': selected, 'bizy-menu-option--disabled': disabled}\"\n    class=\"bizy-menu-option {{customClass}}\">\n\n    <span class=\"bizy-menu-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<span class=\"bizy-menu-option__menu\">\n    <ng-content select=\"bizy-menu\"></ng-content>\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu-option__menu:not(:empty)) .bizy-menu-option{display:none!important}.bizy-menu-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-menu-option-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-menu-option-color);cursor:pointer}.bizy-menu-option:hover{background-color:var(--bizy-menu-option-hover-background-color)}.bizy-menu-option--selected{color:var(--bizy-menu-option-selected-color)!important;background-color:var(--bizy-menu-option-selected-background-color)!important}.bizy-menu-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-menu-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;width:100%}::ng-deep .bizy-menu-option__menu *{color:var(--bizy-menu-option-color);fill:var(--bizy-menu-option-color)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-menu-option--selected': selected, 'bizy-menu-option--disabled': disabled}\"\n    class=\"bizy-menu-option {{customClass}}\">\n\n    <span class=\"bizy-menu-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<span class=\"bizy-menu-option__menu\">\n    <ng-content select=\"bizy-menu\"></ng-content>\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu-option__menu:not(:empty)) .bizy-menu-option{display:none!important}.bizy-menu-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-menu-option-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-menu-option-color);cursor:pointer}.bizy-menu-option:hover{background-color:var(--bizy-menu-option-hover-background-color)}.bizy-menu-option--selected{color:var(--bizy-menu-option-selected-color)!important;background-color:var(--bizy-menu-option-selected-background-color)!important}.bizy-menu-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-menu-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;width:100%}::ng-deep .bizy-menu-option__menu *{color:var(--bizy-menu-option-color);fill:var(--bizy-menu-option-color)}\n"] }]
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
    ref;
    options;
    id = String(Math.random());
    disabled = false;
    offsetX = 0;
    offsetY = 0;
    customClass = '';
    hideArrow = false;
    opened = false;
    onSelect = new EventEmitter();
    _menuWidth;
    #subscription = new Subscription();
    constructor(ref) {
        this.ref = ref;
    }
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
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyMenuComponent, selector: "bizy-menu", inputs: { id: "id", disabled: "disabled", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", hideArrow: "hideArrow", opened: "opened" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizyMenuOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\"\n        *ngIf=\"!hideArrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\">\n\n        <ng-content select=\"bizy-menu-title\"></ng-content>\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu__options:empty) .bizy-menu>.bizy-menu__arrow{display:none!important}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:var(--bizy-menu-padding);color:var(--bizy-menu-color);cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:var(--bizy-menu-color)}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color);min-width:10rem;width:100%;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\"\n        *ngIf=\"!hideArrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\">\n\n        <ng-content select=\"bizy-menu-title\"></ng-content>\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu__options:empty) .bizy-menu>.bizy-menu__arrow{display:none!important}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:var(--bizy-menu-padding);color:var(--bizy-menu-color);cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:var(--bizy-menu-color)}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color);min-width:10rem;width:100%;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { options: [{
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

const COMPONENTS$5 = [
    BizyMenuComponent,
    BizyMenuOptionComponent,
    BizyMenuTitleComponent
];
class BizyMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, declarations: [BizyMenuComponent,
            BizyMenuOptionComponent,
            BizyMenuTitleComponent], imports: [CommonModule, FormsModule, OverlayModule], exports: [BizyMenuComponent,
            BizyMenuOptionComponent,
            BizyMenuTitleComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, imports: [CommonModule, FormsModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule],
                    declarations: COMPONENTS$5,
                    exports: COMPONENTS$5
                }]
        }] });

class BizyFilterSectionSearchOptionComponent {
    id = String(Math.random());
    value = '';
    customClass = '';
    onChange = new EventEmitter();
    valueChange = new EventEmitter();
    setValue(value) {
        this.valueChange.emit(value);
        this.onChange.emit(value);
    }
    getId = () => {
        return this.id;
    };
    isActivated = () => {
        return Boolean(this.value);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionSearchOptionComponent, selector: "bizy-filter-section-search-option", inputs: { id: "id", value: "value", customClass: "customClass" }, outputs: { onChange: "onChange", valueChange: "valueChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-search-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <bizy-input\n        class=\"bizy-filter-section-search-option__input\"\n        [autoFocus]=\"true\"\n        [value]=\"value\"\n        (onChange)=\"setValue($event)\">\n    </bizy-input>\n\n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-search-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-search-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: BizyInputComponent, selector: "bizy-input", inputs: ["id", "disabled", "readonly", "clear", "autoFocus", "autoCapitalize", "autoCorrect", "browserAutoComplete", "type", "label", "max", "maxLength", "min", "minLength", "control", "value", "placeholder", "cancelLabel", "confirmLabel", "customClass"], outputs: ["onFocus", "onEnter", "onBlur", "valueChange", "onChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-search-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-search-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <bizy-input\n        class=\"bizy-filter-section-search-option__input\"\n        [autoFocus]=\"true\"\n        [value]=\"value\"\n        (onChange)=\"setValue($event)\">\n    </bizy-input>\n\n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-search-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-search-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], value: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onChange: [{
                type: Output
            }], valueChange: [{
                type: Output
            }] } });

class BizyFilterSectionCheckboxOptionComponent {
    ref;
    id = String(Math.random());
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionCheckboxOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionCheckboxOptionComponent, selector: "bizy-filter-section-checkbox-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    id=\"{{id}}\"\n    (click)=\"onSelect(!_selected)\"\n    (keyup.enter)=\"onSelect(!_selected)\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        class=\"bizy-filter-section-checkbox-option__checkbox\"\n        [selected]=\"_selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}.bizy-filter-section-checkbox-option__checkbox{pointer-events:none}\n"], dependencies: [{ kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionCheckboxOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-checkbox-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    id=\"{{id}}\"\n    (click)=\"onSelect(!_selected)\"\n    (keyup.enter)=\"onSelect(!_selected)\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        class=\"bizy-filter-section-checkbox-option__checkbox\"\n        [selected]=\"_selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}.bizy-filter-section-checkbox-option__checkbox{pointer-events:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
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

class BizyFilterSectionRangeOptionComponent {
    fb;
    id = String(Math.random());
    disabled = false;
    minLabel = 'Mayor o igual';
    maxLabel = 'Menor o igual';
    customClass = '';
    onChange = new EventEmitter();
    _minLimit;
    _maxLimit;
    form;
    #subscription = new Subscription();
    set min(min) {
        if (typeof min === 'undefined' || min === null) {
            this.minValue.setValue('');
            return;
        }
        this.minValue.setValue(min);
    }
    ;
    set max(max) {
        if (typeof max === 'undefined' || max === null) {
            this.maxValue.setValue('');
            return;
        }
        this.maxValue.setValue(max);
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
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({
            minValue: [null],
            maxValue: [null]
        });
    }
    ngAfterViewInit() {
        this.#subscription.add(this.minValue.valueChanges.pipe(debounceTime$1(300)).subscribe(_value => {
            const min = _value === '' ? null : Number(_value);
            if (typeof this._minLimit !== 'undefined' && this._minLimit !== null && min && min < this._minLimit) {
                this.minValue.setValue(this._minLimit);
                return;
            }
            const max = this.maxValue.value === null || this.maxValue.value === '' ? null : Number(this.maxValue.value);
            if (min !== null && max !== null && max < min) {
                return;
            }
            this.onChange.emit({ min, max });
        }));
        this.#subscription.add(this.maxValue.valueChanges.pipe(debounceTime$1(300)).subscribe(_value => {
            const max = _value === '' ? null : Number(_value);
            if (typeof this._maxLimit !== 'undefined' && this._maxLimit !== null && max && max > this._maxLimit) {
                this.maxValue.setValue(this._maxLimit);
                return;
            }
            const min = this.minValue.value === null || this.minValue.value === '' ? null : Number(this.minValue.value);
            if (min !== null && max !== null && max < min) {
                return;
            }
            this.onChange.emit({ min, max });
        }));
    }
    get minValue() {
        return this.form.get('minValue');
    }
    get maxValue() {
        return this.form.get('maxValue');
    }
    onClear = () => {
        this.minValue.setValue('');
        this.maxValue.setValue('');
    };
    getId = () => {
        return this.id;
    };
    isActivated = () => {
        return (this.minValue.value || this.minValue.value === 0 || this.maxValue.value || this.maxValue.value === 0) && (this.minValue.value !== this._minLimit || this.maxValue.value !== this._maxLimit);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionRangeOptionComponent, deps: [{ token: FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionRangeOptionComponent, selector: "bizy-filter-section-range-option", inputs: { id: "id", disabled: "disabled", minLabel: "minLabel", maxLabel: "maxLabel", customClass: "customClass", min: "min", max: "max", minLimit: "minLimit", maxLimit: "maxLimit" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            [title]=\"minLabel\"\n            type=\"number\"\n            [control]=\"minValue\">\n        </bizy-input>\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            [title]=\"maxLabel\"\n            type=\"number\"\n            [control]=\"maxValue\">\n        </bizy-input>\n\n    </span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}.bizy-filter-section-range-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: BizyInputComponent, selector: "bizy-input", inputs: ["id", "disabled", "readonly", "clear", "autoFocus", "autoCapitalize", "autoCorrect", "browserAutoComplete", "type", "label", "max", "maxLength", "min", "minLength", "control", "value", "placeholder", "cancelLabel", "confirmLabel", "customClass"], outputs: ["onFocus", "onEnter", "onBlur", "valueChange", "onChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionRangeOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-range-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            [title]=\"minLabel\"\n            type=\"number\"\n            [control]=\"minValue\">\n        </bizy-input>\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            [title]=\"maxLabel\"\n            type=\"number\"\n            [control]=\"maxValue\">\n        </bizy-input>\n\n    </span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}.bizy-filter-section-range-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], ctorParameters: function () { return [{ type: i2$3.FormBuilder, decorators: [{
                    type: Inject,
                    args: [FormBuilder]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], minLabel: [{
                type: Input
            }], maxLabel: [{
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

class BizyFilterPipe {
    transform(items, property, states) {
        if (!items || items.length === 0) {
            return [];
        }
        if (!property || !states || states.length === 0) {
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
                return _state === state.id;
            });
            output = output.concat(res);
        });
        return output;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, name: "bizyFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, decorators: [{
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
        const output = items.filter(_item => {
            let _value = _item;
            const nestedProperty = property.split('.');
            nestedProperty.forEach(_property => {
                _value = _value[_property];
            });
            if (isNaN(_value)) {
                return false;
            }
            return (min === null || _value >= min) && (max === null || _value <= max);
        });
        return output;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRangeFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyRangeFilterPipe, name: "bizyRangeFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRangeFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyRangeFilter'
                }]
        }] });

class BizyFilterSectionComponent {
    document;
    ref;
    checkboxOptions;
    rangeOption;
    searchOption;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    onSelect = new EventEmitter();
    #subscription = new Subscription();
    _options = [];
    _activated = false;
    constructor(document, ref) {
        this.document = document;
        this.ref = ref;
    }
    ngAfterViewInit() {
        const mutationObserver = new MutationObserver(() => {
            if (this.checkboxOptions && this.checkboxOptions.length > 0) {
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
                mutationObserver.disconnect();
            }
            if (this.rangeOption) {
                this._activated = this.rangeOption.isActivated();
                this.ref.detectChanges();
                this.#subscription.add(this.rangeOption.onChange.subscribe(() => {
                    this._activated = this.rangeOption.isActivated();
                    this.onSelect.emit(this._activated);
                    this.ref.detectChanges();
                }));
                mutationObserver.disconnect();
            }
            if (this.searchOption) {
                this._activated = this.searchOption.isActivated();
                this.ref.detectChanges();
                this.#subscription.add(this.searchOption.onChange.subscribe(() => {
                    this._activated = this.searchOption.isActivated();
                    this.onSelect.emit(this.searchOption.isActivated());
                    this.ref.detectChanges();
                }));
                mutationObserver.disconnect();
            }
        });
        mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onSelect = (selected) => {
        if (this.disabled || this.rangeOption) {
            return;
        }
        this.checkboxOptions.forEach(_option => {
            _option.onSelect(selected);
        });
    };
    onClear = () => {
        if (!this.rangeOption) {
            return;
        }
        this.rangeOption.onClear();
    };
    isActivated = () => {
        return this._activated;
    };
    getId = () => {
        return this.id;
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionComponent, deps: [{ token: DOCUMENT }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionComponent, selector: "bizy-filter-section", inputs: { id: "id", disabled: "disabled", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "rangeOption", first: true, predicate: BizyFilterSectionRangeOptionComponent, descendants: true }, { propertyName: "searchOption", first: true, predicate: BizyFilterSectionSearchOptionComponent, descendants: true }, { propertyName: "checkboxOptions", predicate: BizyFilterSectionCheckboxOptionComponent }], ngImport: i0, template: "<div class=\"bizy-filter-section {{customClass}}\" id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section__header\">\n\n        <ng-content select=\"[filter-section-title]\"></ng-content>\n        <ng-content></ng-content>\n\n        <bizy-checkbox \n            class=\"bizy-filter-section__header__checkbox\"\n            (onSelect)=\"_onSelect(_activated)\"\n            [selected]=\"!_activated\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n\n        <button \n            type=\"button\"\n            class=\"bizy-filter-section__header__clear-button\"\n            (click)=\"onClear()\"\n            (keyup.enter)=\"onClear()\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"bizy-filter-section__header__clear-icon\">\n                <path d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\"/>\n            </svg>\n        </button>\n        \n    </span>\n\n    <span class=\"bizy-filter-section__options\">\n\n        <ng-content select=\"bizy-filter-section-checkbox-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-range-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-search-option\"></ng-content>\n\n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__options{overflow-y:scroll!important;min-height:6rem!important}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.9rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;border:none;background-color:transparent;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;row-gap:.7rem;min-height:-moz-fit-content;min-height:fit-content;max-height:20rem;overflow-y:hidden;overflow-x:hidden}.bizy-filter-section__header__clear-button{width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;border:none;background-color:transparent;cursor:pointer}.bizy-filter-section__header__clear-icon{fill:var(--bizy-filter-section-clear-color);pointer-events:none;height:1rem}\n"], dependencies: [{ kind: "component", type: BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-filter-section {{customClass}}\" id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section__header\">\n\n        <ng-content select=\"[filter-section-title]\"></ng-content>\n        <ng-content></ng-content>\n\n        <bizy-checkbox \n            class=\"bizy-filter-section__header__checkbox\"\n            (onSelect)=\"_onSelect(_activated)\"\n            [selected]=\"!_activated\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n\n        <button \n            type=\"button\"\n            class=\"bizy-filter-section__header__clear-button\"\n            (click)=\"onClear()\"\n            (keyup.enter)=\"onClear()\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"bizy-filter-section__header__clear-icon\">\n                <path d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\"/>\n            </svg>\n        </button>\n        \n    </span>\n\n    <span class=\"bizy-filter-section__options\">\n\n        <ng-content select=\"bizy-filter-section-checkbox-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-range-option\"></ng-content>\n\n        <ng-content select=\"bizy-filter-section-search-option\"></ng-content>\n\n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1}:host:has(.bizy-filter-section-range-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__checkbox{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-search-option) .bizy-filter-section__header__clear-button{display:none!important}:host:has(.bizy-filter-section-checkbox-option) .bizy-filter-section__options{overflow-y:scroll!important;min-height:6rem!important}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.9rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;border:none;background-color:transparent;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;row-gap:.7rem;min-height:-moz-fit-content;min-height:fit-content;max-height:20rem;overflow-y:hidden;overflow-x:hidden}.bizy-filter-section__header__clear-button{width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;border:none;background-color:transparent;cursor:pointer}.bizy-filter-section__header__clear-icon{fill:var(--bizy-filter-section-clear-color);pointer-events:none;height:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { checkboxOptions: [{
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

class BizyFilterComponent {
    document;
    ref;
    sections;
    id = String(Math.random());
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterComponent, deps: [{ token: DOCUMENT }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterComponent, selector: "bizy-filter", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen", onChange: "onChange" }, queries: [{ propertyName: "sections", predicate: BizyFilterSectionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections\">\n\n        <ng-content select=\"bizy-filter-section\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding);color:var(--bizy-filter-color);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections{max-width:75vw;background-color:var(--bizy-filter-background-color);min-width:100%;display:flex;column-gap:1.2rem;flex-wrap:wrap;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections\">\n\n        <ng-content select=\"bizy-filter-section\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding);color:var(--bizy-filter-color);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections{max-width:75vw;background-color:var(--bizy-filter-background-color);min-width:100%;display:flex;column-gap:1.2rem;flex-wrap:wrap;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { sections: [{
                type: ContentChildren,
                args: [BizyFilterSectionComponent]
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

const COMPONENTS$4 = [
    BizyFilterComponent,
    BizyFilterSectionComponent,
    BizyFilterSectionCheckboxOptionComponent,
    BizyFilterSectionRangeOptionComponent,
    BizyFilterSectionSearchOptionComponent,
    BizyFilterPipe,
    BizyRangeFilterPipe,
];
class BizyFilterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, declarations: [BizyFilterComponent,
            BizyFilterSectionComponent,
            BizyFilterSectionCheckboxOptionComponent,
            BizyFilterSectionRangeOptionComponent,
            BizyFilterSectionSearchOptionComponent,
            BizyFilterPipe,
            BizyRangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule], exports: [BizyFilterComponent,
            BizyFilterSectionComponent,
            BizyFilterSectionCheckboxOptionComponent,
            BizyFilterSectionRangeOptionComponent,
            BizyFilterSectionSearchOptionComponent,
            BizyFilterPipe,
            BizyRangeFilterPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, providers: [BizyFilterPipe, BizyRangeFilterPipe], imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule],
                    declarations: COMPONENTS$4,
                    exports: COMPONENTS$4,
                    providers: [BizyFilterPipe, BizyRangeFilterPipe]
                }]
        }] });

class BizySelectOptionComponent {
    elementRef;
    ref;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
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
        return this.selected;
    };
    getValue = () => {
        const value = this.elementRef?.nativeElement?.firstChild?.children[0]?.innerText;
        return value ?? '';
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectOptionComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySelectOptionComponent, selector: "bizy-select-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': selected, 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}:host:has(>.bizy-select-option__select:not(:empty)) .bizy-select-option{display:none!important}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color)}.bizy-select-option--selected{color:var(--bizy-select-option-selected-color);background-color:var(--bizy-select-option-selected-background-color)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': selected, 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}:host:has(>.bizy-select-option__select:not(:empty)) .bizy-select-option{display:none!important}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color)}.bizy-select-option--selected{color:var(--bizy-select-option-selected-color);background-color:var(--bizy-select-option-selected-background-color)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
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

class BizySelectComponent {
    ref;
    document;
    options;
    id = String(Math.random());
    disabled = false;
    label = '';
    customClass = '';
    opened = false;
    onOpen = new EventEmitter();
    _selectWidth;
    _optionValue = '';
    #options = [];
    #subscription = new Subscription();
    #mutationObserver;
    constructor(ref, document) {
        this.ref = ref;
        this.document = document;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (!this.options || (this.#options.length === 0 && this.options.length === 0)) {
                return;
            }
            if (this.#optionsAreEqual(this.#options, this.options.toArray())) {
                return;
            }
            this.#options = this.options.toArray();
            this._optionValue = '';
            const option = this.#options.find(_option => _option.getSelected());
            if (option) {
                this._optionValue = option.getValue();
            }
            this.ref.detectChanges();
            this.#listenOptionChanges();
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onOpen(event) {
        if (this.disabled) {
            return;
        }
        this.opened = !this.opened;
        this.onOpen.emit(event);
        if (!this.opened) {
            return;
        }
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._selectWidth = event.srcElement.offsetWidth;
        }
        this.ref.detectChanges();
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this.opened = false;
        this.ref.detectChanges();
    };
    #listenOptionChanges = () => {
        this.options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(() => {
                this._optionValue = _option.getValue();
                this.close(null);
                this.ref.detectChanges();
            }));
        });
    };
    #optionsAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort((a, b) => a.id.localeCompare(b.id));
        arr2.sort((a, b) => a.id.localeCompare(b.id));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySelectComponent, selector: "bizy-select", inputs: { id: "id", disabled: "disabled", label: "label", customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen" }, queries: [{ propertyName: "options", predicate: BizySelectOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-select {{customClass}}\"\n    [ngClass]=\"{'bizy-select--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-select__content\">\n        <h4 class=\"bizy-select__content__label\" *ngIf=\"label\">{{label}}</h4>\n        <span>{{_optionValue}}</span>\n    </span>\n\n    <svg \n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        id=\"bizy-select-arrow\"\n        version=\"1.1\"\n        viewBox=\"0 0 512 512\"\n        xml:space=\"preserve\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <path d=\"M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z\"/>\n    </svg>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_selectWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-select-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-select{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;color:var(--bizy-select-color);padding:.25rem .5rem 0;cursor:pointer;min-height:3.3rem;border-top-left-radius:.3rem;border-top-right-radius:.3rem;border-bottom:.1rem solid var(--bizy-select-border-color)}.bizy-select--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-select__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:var(--bizy-select-color)}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__content{font-size:1rem;background-color:transparent;display:flex;flex-direction:column;align-items:flex-start;row-gap:.5rem;pointer-events:none;align-self:flex-start;text-align:start}.bizy-select__content__label{font-weight:700;color:var(--bizy-select-label-color)}.bizy-select__hidden-options{visibility:hidden;height:0;width:0;display:block;pointer-events:none}.bizy-select__options{background-color:var(--bizy-select-background-color);display:flex;min-width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:20rem;overflow-y:scroll;position:relative;max-width:min(75%,25rem)}.bizy-select__options__search{position:sticky;z-index:1;top:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-select {{customClass}}\"\n    [ngClass]=\"{'bizy-select--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizySelectTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-select__content\">\n        <h4 class=\"bizy-select__content__label\" *ngIf=\"label\">{{label}}</h4>\n        <span>{{_optionValue}}</span>\n    </span>\n\n    <svg \n        class=\"bizy-select__arrow\"\n        [ngClass]=\"{'bizy-select__arrow--opened': opened}\"\n        id=\"bizy-select-arrow\"\n        version=\"1.1\"\n        viewBox=\"0 0 512 512\"\n        xml:space=\"preserve\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <path d=\"M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z\"/>\n    </svg>\n\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_selectWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizySelectTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-select__options\">\n\n        <span class=\"bizy-select__options__search\">\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-select-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-select{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;color:var(--bizy-select-color);padding:.25rem .5rem 0;cursor:pointer;min-height:3.3rem;border-top-left-radius:.3rem;border-top-right-radius:.3rem;border-bottom:.1rem solid var(--bizy-select-border-color)}.bizy-select--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-select__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:var(--bizy-select-color)}.bizy-select__arrow--opened{transform:rotate(180deg)}.bizy-select__content{font-size:1rem;background-color:transparent;display:flex;flex-direction:column;align-items:flex-start;row-gap:.5rem;pointer-events:none;align-self:flex-start;text-align:start}.bizy-select__content__label{font-weight:700;color:var(--bizy-select-label-color)}.bizy-select__hidden-options{visibility:hidden;height:0;width:0;display:block;pointer-events:none}.bizy-select__options{background-color:var(--bizy-select-background-color);display:flex;min-width:100%;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014;max-height:20rem;overflow-y:scroll;position:relative;max-width:min(75%,25rem)}.bizy-select__options__search{position:sticky;z-index:1;top:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySelectOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], label: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], onOpen: [{
                type: Output
            }] } });

const COMPONENTS$3 = [
    BizySelectComponent,
    BizySelectOptionComponent
];
class BizySelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, declarations: [BizySelectComponent,
            BizySelectOptionComponent], imports: [CommonModule, FormsModule, OverlayModule], exports: [BizySelectComponent,
            BizySelectOptionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, imports: [CommonModule, FormsModule, OverlayModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule],
                    declarations: COMPONENTS$3,
                    exports: COMPONENTS$3
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySliderComponent, selector: "bizy-slider", inputs: { minLimit: "minLimit", maxLimit: "maxLimit", min: "min", max: "max" }, outputs: { onChange: "onChange" }, viewQueries: [{ propertyName: "fromSlider", first: true, predicate: ["fromSlider"], descendants: true }, { propertyName: "toSlider", first: true, predicate: ["toSlider"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"], dependencies: [{ kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2$3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$3.RangeValueAccessor, selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]" }, { kind: "directive", type: i2$3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-slider', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"] }]
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

const COMPONENTS$2 = [
    BizySliderComponent,
];
class BizySliderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySliderModule, declarations: [BizySliderComponent], imports: [CommonModule, FormsModule], exports: [BizySliderComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$2,
                    exports: COMPONENTS$2
                }]
        }] });

class BizyLineChartComponent {
    renderer;
    elementRef;
    document;
    decimalPipe;
    saveAsImageButtonLabel = 'Descargar';
    xLabelPrefix = '';
    xLabelSuffix = '';
    yLabelPrefix = '';
    yLabelSuffix = '';
    labelsX = [];
    height;
    width;
    tooltip = true;
    chartContainer = null;
    set data(data) {
        if (data && data.length > 0) {
            this.#setChartData(data);
        }
    }
    constructor(renderer, elementRef, document, decimalPipe) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.document = document;
        this.decimalPipe = decimalPipe;
    }
    async #setChartData(data) {
        let size = { width: this.width, height: this.height };
        if (!this.width || !this.height) {
            size = await this.#getChartSize();
        }
        if (!this.chartContainer) {
            this.chartContainer = this.renderer.createElement('div');
            this.renderer.setStyle(this.chartContainer, 'width', `${size.width}px`);
            this.renderer.setStyle(this.chartContainer, 'height', `${size.height}px`);
            this.renderer.appendChild(this.elementRef.nativeElement, this.chartContainer);
        }
        const color = [];
        const _data = [];
        const legendData = [];
        data.forEach(_d => {
            if (_d.color) {
                color.push(_d.color);
            }
            legendData.push(_d.name);
            _data.push({
                type: 'line',
                id: _d.id ?? String(Math.random()),
                name: _d.name,
                smooth: true,
                data: !_d.values || _d.values.length === 0 ? [0] : _d.values
            });
        });
        const option = {
            tooltip: {
                show: this.tooltip,
                trigger: 'axis',
                appendToBody: true,
                formatter: this.#tooltipFormatter
            },
            legend: {
                y: 'bottom',
                padding: [0, 0, 0, 0],
                data: legendData
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true,
                        title: this.saveAsImageButtonLabel
                    }
                },
                iconStyle: {
                    emphasis: {
                        textAlign: 'right'
                    }
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.labelsX,
                    axisLabel: {
                        formatter: `${this.xLabelPrefix}{value}${this.xLabelSuffix}`,
                        fontSize: 10,
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: `${this.yLabelPrefix}{value}${this.yLabelSuffix}`,
                        fontSize: 10
                    }
                }
            ],
            series: _data
        };
        option.grid = {
            bottom: `${Math.max(legendData.length * 2.4, 10)}%`,
            containLabel: true,
            left: '3%',
            right: '3%'
        };
        if (color.length > 0) {
            option.color = color;
        }
        if ((legendData.length / 18) > 1) {
            this.renderer.setStyle(this.chartContainer, 'height', `${this.height * (legendData.length / 18)}px`);
        }
        echarts.init(this.chartContainer).setOption(option);
    }
    #tooltipFormatter = (params) => {
        let tooltip = `${params[0].name}`;
        const lineParam = params.filter(_param => _param.componentSubType === 'line');
        lineParam.forEach(_param => {
            const line = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">-</span>`;
            tooltip += `<br/>${line} ${_param.seriesName} : ${this.yLabelPrefix}${this.decimalPipe.transform(_param.value, '1.2-2')}${this.yLabelSuffix}`;
        });
        return tooltip;
    };
    #getChartSize() {
        return new Promise(resolve => {
            const mutationObserver = new MutationObserver(() => {
                const parentRef = this.renderer.parentNode(this.elementRef.nativeElement);
                if (parentRef && parentRef.offsetWidth && parentRef.offsetHeight) {
                    let width = (this.width || parentRef.offsetWidth);
                    let height = (this.height || parentRef.offsetHeight);
                    mutationObserver.disconnect();
                    resolve({ width, height });
                }
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLineChartComponent, deps: [{ token: Renderer2 }, { token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyLineChartComponent, selector: "bizy-line-chart", inputs: { saveAsImageButtonLabel: "saveAsImageButtonLabel", xLabelPrefix: "xLabelPrefix", xLabelSuffix: "xLabelSuffix", yLabelPrefix: "yLabelPrefix", yLabelSuffix: "yLabelSuffix", labelsX: "labelsX", height: "height", width: "width", tooltip: "tooltip", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLineChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-line-chart',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.DecimalPipe, decorators: [{
                    type: Inject,
                    args: [DecimalPipe]
                }] }]; }, propDecorators: { saveAsImageButtonLabel: [{
                type: Input
            }], xLabelPrefix: [{
                type: Input
            }], xLabelSuffix: [{
                type: Input
            }], yLabelPrefix: [{
                type: Input
            }], yLabelSuffix: [{
                type: Input
            }], labelsX: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], data: [{
                type: Input
            }] } });

class BizyLineChartModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLineChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyLineChartModule, declarations: [BizyLineChartComponent], imports: [CommonModule], exports: [BizyLineChartComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLineChartModule, providers: [DecimalPipe], imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLineChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [BizyLineChartComponent],
                    exports: [BizyLineChartComponent],
                    providers: [DecimalPipe]
                }]
        }] });

class BizyBarChartComponent {
    renderer;
    elementRef;
    document;
    decimalPipe;
    saveAsImageButtonLabel = 'Descargar';
    xLabelPrefix = '';
    xLabelSuffix = '';
    yLabelPrefix = '';
    yLabelSuffix = '';
    labelsX = [];
    height;
    width;
    tooltip = true;
    chartContainer = null;
    set data(data) {
        if (data && data.length > 0) {
            this.#setChartData(data);
        }
    }
    constructor(renderer, elementRef, document, decimalPipe) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.document = document;
        this.decimalPipe = decimalPipe;
    }
    async #setChartData(data) {
        let size = { width: this.width, height: this.height };
        if (!this.width || !this.height) {
            size = await this.#getChartSize();
        }
        if (!this.chartContainer) {
            this.chartContainer = this.renderer.createElement('div');
            this.renderer.setStyle(this.chartContainer, 'width', `${size.width}px`);
            this.renderer.setStyle(this.chartContainer, 'height', `${size.height}px`);
            this.renderer.appendChild(this.elementRef.nativeElement, this.chartContainer);
        }
        const color = [];
        const _data = [];
        const legendData = [];
        data.forEach(_d => {
            if (_d.color) {
                color.push(_d.color);
            }
            legendData.push(_d.name);
            _data.push({
                type: 'bar',
                id: _d.id ?? String(Math.random()),
                name: _d.name,
                smooth: true,
                data: !_d.values || _d.values.length === 0 ? [0] : _d.values
            });
        });
        const option = {
            tooltip: {
                show: this.tooltip,
                trigger: 'axis',
                appendToBody: true,
                formatter: this.#tooltipFormatter
            },
            legend: {
                y: 'bottom',
                padding: [0, 0, 0, 0],
                data: legendData
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true,
                        title: this.saveAsImageButtonLabel
                    }
                },
                iconStyle: {
                    emphasis: {
                        textAlign: 'right'
                    }
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.labelsX,
                    axisLabel: {
                        formatter: `${this.xLabelPrefix}{value}${this.xLabelSuffix}`,
                        fontSize: 10,
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: `${this.yLabelPrefix}{value}${this.yLabelSuffix}`,
                        fontSize: 10
                    }
                }
            ],
            series: _data
        };
        option.grid = {
            bottom: `${Math.max(legendData.length * 2.4, 10)}%`,
            containLabel: true,
            left: '3%',
            right: '3%'
        };
        if (color.length > 0) {
            option.color = color;
        }
        if ((legendData.length / 18) > 1) {
            this.renderer.setStyle(this.chartContainer, 'height', `${this.height * (legendData.length / 18)}px`);
        }
        echarts.init(this.chartContainer).setOption(option);
    }
    #tooltipFormatter = (params) => {
        let tooltip = `${params[0].name}`;
        const barParam = params.filter(_param => _param.componentSubType === 'bar');
        barParam.forEach(_param => {
            const bullet = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">&#8226;</span>`;
            tooltip += `<br/>${bullet} ${_param.seriesName} : ${this.yLabelPrefix}${this.decimalPipe.transform(_param.value, '1.2-2')}${this.yLabelSuffix}`;
        });
        return tooltip;
    };
    #getChartSize() {
        return new Promise(resolve => {
            const mutationObserver = new MutationObserver(() => {
                const parentRef = this.renderer.parentNode(this.elementRef.nativeElement);
                if (parentRef && parentRef.offsetWidth && parentRef.offsetHeight) {
                    let width = (this.width || parentRef.offsetWidth);
                    let height = (this.height || parentRef.offsetHeight);
                    mutationObserver.disconnect();
                    resolve({ width, height });
                }
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarChartComponent, deps: [{ token: Renderer2 }, { token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyBarChartComponent, selector: "bizy-bar-chart", inputs: { saveAsImageButtonLabel: "saveAsImageButtonLabel", xLabelPrefix: "xLabelPrefix", xLabelSuffix: "xLabelSuffix", yLabelPrefix: "yLabelPrefix", yLabelSuffix: "yLabelSuffix", labelsX: "labelsX", height: "height", width: "width", tooltip: "tooltip", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-bar-chart',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.DecimalPipe, decorators: [{
                    type: Inject,
                    args: [DecimalPipe]
                }] }]; }, propDecorators: { saveAsImageButtonLabel: [{
                type: Input
            }], xLabelPrefix: [{
                type: Input
            }], xLabelSuffix: [{
                type: Input
            }], yLabelPrefix: [{
                type: Input
            }], yLabelSuffix: [{
                type: Input
            }], labelsX: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], data: [{
                type: Input
            }] } });

class BizyBarChartModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyBarChartModule, declarations: [BizyBarChartComponent], imports: [CommonModule], exports: [BizyBarChartComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarChartModule, providers: [DecimalPipe], imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [BizyBarChartComponent],
                    exports: [BizyBarChartComponent],
                    providers: [DecimalPipe]
                }]
        }] });

const EMPTY_CHART = [0];
class BizyPieChartComponent {
    elementRef;
    document;
    decimalPipe;
    prefix = '';
    suffix = '';
    downloadLabel = 'Descargar';
    #mutationObserver = null;
    #subscription = new Subscription();
    #afterViewInit = new BehaviorSubject(false);
    constructor(elementRef, document, decimalPipe) {
        this.elementRef = elementRef;
        this.document = document;
        this.decimalPipe = decimalPipe;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.elementRef.nativeElement && this.elementRef.nativeElement.offsetWidth && this.elementRef.nativeElement.offsetHeight) {
                this.#afterViewInit.next(true);
                this.#mutationObserver.disconnect();
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    set data(data) {
        if (data && data.length > 0) {
            this.#setChartData(data);
        }
        else if (data && data.length === 0) {
            this.#setChartData(EMPTY_CHART);
        }
    }
    async #setChartData(data) {
        this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
            const color = [];
            let total = 0;
            data.forEach(_d => {
                total += _d.value;
                if (_d.color) {
                    color.push(_d.color);
                }
            });
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: (item) => `${item.name}: ${this.prefix}${this.decimalPipe.transform(item.value, '1.2-2')}${this.suffix} (${item.percent.toFixed(2)}%)`
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            show: true,
                            title: this.downloadLabel
                        }
                    },
                    iconStyle: {
                        emphasis: {
                            textAlign: 'right'
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
                        data,
                        itemStyle: {
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            normal: {
                                label: {
                                    position: 'outer',
                                    formatter: (item) => {
                                        return `${item.name}: ${this.prefix}${this.decimalPipe.transform(item.value, '1.2-2')}${this.suffix} (${item.percent.toFixed(2)}%)`;
                                    }
                                },
                                labelLine: {
                                    show: true
                                }
                            }
                        }
                    }
                ]
            };
            if (color.length > 0 && color.length === data.length) {
                option.color = color;
            }
            echarts.init(this.elementRef.nativeElement).setOption(option);
        }));
    }
    ngOnDestroy() {
        this.#mutationObserver.disconnect();
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartComponent, deps: [{ token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyPieChartComponent, selector: "bizy-pie-chart", inputs: { prefix: "prefix", suffix: "suffix", downloadLabel: "downloadLabel", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-pie-chart',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.DecimalPipe, decorators: [{
                    type: Inject,
                    args: [DecimalPipe]
                }] }]; }, propDecorators: { prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], downloadLabel: [{
                type: Input
            }], data: [{
                type: Input
            }] } });

class BizyPieChartModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartModule, declarations: [BizyPieChartComponent], imports: [CommonModule], exports: [BizyPieChartComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartModule, providers: [DecimalPipe], imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [BizyPieChartComponent],
                    exports: [BizyPieChartComponent],
                    providers: [DecimalPipe]
                }]
        }] });

class BizyTagComponent {
    elementRef;
    renderer;
    set type(type) {
        if (!type || !this.elementRef || !this.elementRef.nativeElement) {
            return;
        }
        this.renderer.setAttribute(this.elementRef.nativeElement, 'type', type);
    }
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTagComponent, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTagComponent, selector: "bizy-tag", inputs: { type: "type" }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;padding:.3rem;border-radius:.3rem;cursor:inherit;display:flex;justify-content:center;align-items:center;text-wrap:nowrap;width:-moz-fit-content;width:fit-content;color:var(--bizy-tag-color);background-color:var(--bizy-tag-background-color)}:host ::ng-deep *{text-wrap:nowrap;color:var(--bizy-tag-color);fill:var(--bizy-tag-color)}:host[type=default]{color:var(--bizy-tag-default-color);background-color:var(--bizy-tag-default-background-color)}:host[type=default] ::ng-deep *{color:var(--bizy-tag-default-color);fill:var(--bizy-tag-default-color)}:host[type=success]{color:var(--bizy-tag-success-color);background-color:var(--bizy-tag-success-background-color)}:host[type=success] ::ng-deep *{color:var(--bizy-tag-success-color);fill:var(--bizy-tag-success-color)}:host[type=info]{color:var(--bizy-tag-info-color);background-color:var(--bizy-tag-info-background-color)}:host[type=info] ::ng-deep *{color:var(--bizy-tag-info-color);fill:var(--bizy-tag-info-color)}:host[type=warning]{color:var(--bizy-tag-warning-color);background-color:var(--bizy-tag-warning-background-color)}:host[type=warning] ::ng-deep *{color:var(--bizy-tag-warning-color);fill:var(--bizy-tag-warning-color)}:host[type=danger]{color:var(--bizy-tag-danger-color);background-color:var(--bizy-tag-danger-background-color)}:host[type=danger] ::ng-deep *{color:var(--bizy-tag-danger-color);fill:var(--bizy-tag-danger-color)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tag', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;padding:.3rem;border-radius:.3rem;cursor:inherit;display:flex;justify-content:center;align-items:center;text-wrap:nowrap;width:-moz-fit-content;width:fit-content;color:var(--bizy-tag-color);background-color:var(--bizy-tag-background-color)}:host ::ng-deep *{text-wrap:nowrap;color:var(--bizy-tag-color);fill:var(--bizy-tag-color)}:host[type=default]{color:var(--bizy-tag-default-color);background-color:var(--bizy-tag-default-background-color)}:host[type=default] ::ng-deep *{color:var(--bizy-tag-default-color);fill:var(--bizy-tag-default-color)}:host[type=success]{color:var(--bizy-tag-success-color);background-color:var(--bizy-tag-success-background-color)}:host[type=success] ::ng-deep *{color:var(--bizy-tag-success-color);fill:var(--bizy-tag-success-color)}:host[type=info]{color:var(--bizy-tag-info-color);background-color:var(--bizy-tag-info-background-color)}:host[type=info] ::ng-deep *{color:var(--bizy-tag-info-color);fill:var(--bizy-tag-info-color)}:host[type=warning]{color:var(--bizy-tag-warning-color);background-color:var(--bizy-tag-warning-background-color)}:host[type=warning] ::ng-deep *{color:var(--bizy-tag-warning-color);fill:var(--bizy-tag-warning-color)}:host[type=danger]{color:var(--bizy-tag-danger-color);background-color:var(--bizy-tag-danger-background-color)}:host[type=danger] ::ng-deep *{color:var(--bizy-tag-danger-color);fill:var(--bizy-tag-danger-color)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { type: [{
                type: Input
            }] } });

const COMPONENTS$1 = [
    BizyTagComponent,
];
class BizyTagModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTagModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyTagModule, declarations: [BizyTagComponent], imports: [CommonModule, FormsModule], exports: [BizyTagComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTagModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTagModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS$1,
                    exports: COMPONENTS$1
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyCardComponent, selector: "bizy-card", inputs: { id: "id", disabled: "disabled", selected: "selected", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    class=\"bizy-card {{customClass}}\"\n    [ngClass]=\"{'bizy-card--selected': selected, 'bizy-card--disabled': disabled}\">\n\n    <span class=\"bizy-card__header\">\n\n        <span class=\"bizy-card__header__start bizy-card__slot\">\n            <ng-content select=\"[card-header-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__header__end bizy-card__slot\">\n            <ng-content select=\"[card-header-end]\"></ng-content>\n        </span>\n\n    </span>\n\n    <ng-content></ng-content>\n\n    <span class=\"bizy-card__footer\">\n\n        <span class=\"bizy-card__footer__start bizy-card__slot\">\n            <ng-content select=\"[card-footer-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__footer__end bizy-card__slot\">\n            <ng-content select=\"[card-footer-end]\"></ng-content>\n        </span>\n\n    </span>\n\n</button>", styles: [":host{font-size:1rem;height:100%;width:100%}.bizy-card{height:100%;width:100%;cursor:default;border:none;border-radius:.3rem;overflow:hidden;padding:.5rem;display:flex;flex-direction:column;justify-content:space-between;row-gap:.3rem;background-color:var(--bizy-card-background-color);transition:transform .25s ease-in-out;box-shadow:0 4px 6px #32325d1c,0 1px 3px #00000014}.bizy-card:hover{transform:translateY(-1px);box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-card--selected{background-color:var(--bizy-card-selected-background-color)}.bizy-card--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-card__header:has(.bizy-card__header__start:empty):has(.bizy-card__header__end:empty){display:none}.bizy-card__header:not(:empty){width:100%;display:flex;justify-content:space-between;column-gap:1rem}.bizy-card__slot{display:flex;align-items:center;column-gap:.5rem}.bizy-card__footer:has(.bizy-card__footer__start:empty):has(.bizy-card__footer__end:empty){display:none}.bizy-card__footer:not(:empty){width:100%;display:flex;justify-content:space-between;column-gap:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-card', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    class=\"bizy-card {{customClass}}\"\n    [ngClass]=\"{'bizy-card--selected': selected, 'bizy-card--disabled': disabled}\">\n\n    <span class=\"bizy-card__header\">\n\n        <span class=\"bizy-card__header__start bizy-card__slot\">\n            <ng-content select=\"[card-header-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__header__end bizy-card__slot\">\n            <ng-content select=\"[card-header-end]\"></ng-content>\n        </span>\n\n    </span>\n\n    <ng-content></ng-content>\n\n    <span class=\"bizy-card__footer\">\n\n        <span class=\"bizy-card__footer__start bizy-card__slot\">\n            <ng-content select=\"[card-footer-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__footer__end bizy-card__slot\">\n            <ng-content select=\"[card-footer-end]\"></ng-content>\n        </span>\n\n    </span>\n\n</button>", styles: [":host{font-size:1rem;height:100%;width:100%}.bizy-card{height:100%;width:100%;cursor:default;border:none;border-radius:.3rem;overflow:hidden;padding:.5rem;display:flex;flex-direction:column;justify-content:space-between;row-gap:.3rem;background-color:var(--bizy-card-background-color);transition:transform .25s ease-in-out;box-shadow:0 4px 6px #32325d1c,0 1px 3px #00000014}.bizy-card:hover{transform:translateY(-1px);box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-card--selected{background-color:var(--bizy-card-selected-background-color)}.bizy-card--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-card__header:has(.bizy-card__header__start:empty):has(.bizy-card__header__end:empty){display:none}.bizy-card__header:not(:empty){width:100%;display:flex;justify-content:space-between;column-gap:1rem}.bizy-card__slot{display:flex;align-items:center;column-gap:.5rem}.bizy-card__footer:has(.bizy-card__footer__start:empty):has(.bizy-card__footer__end:empty){display:none}.bizy-card__footer:not(:empty){width:100%;display:flex;justify-content:space-between;column-gap:1rem}\n"] }]
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

const COMPONENTS = [
    BizyCardComponent,
];
class BizyCardModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyCardModule, declarations: [BizyCardComponent], imports: [CommonModule, FormsModule], exports: [BizyCardComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });

class BizyComponentsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyComponentsModule, imports: [i2$1.IonicModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyComponentsModule, imports: [IonicModule.forRoot({ mode: 'ios' })] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [IonicModule.forRoot({ mode: 'ios' })],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BizyAccordionComponent, BizyAccordionModule, BizyAudioPlayerComponent, BizyAudioPlayerModule, BizyBarChartComponent, BizyBarChartModule, BizyBreadcrumbComponent, BizyBreadcrumbModule, BizyButtonComponent, BizyButtonModule, BizyCardComponent, BizyCardModule, BizyCheckboxComponent, BizyCheckboxModule, BizyComponentsModule, BizyConfirmButtonsComponent, BizyConfirmButtonsModule, BizyErrorComponent, BizyErrorModule, BizyFabButtonComponent, BizyFabButtonModule, BizyFilterComponent, BizyFilterModule, BizyFilterPipe, BizyFilterSectionCheckboxOptionComponent, BizyFilterSectionComponent, BizyFilterSectionRangeOptionComponent, BizyFilterSectionSearchOptionComponent, BizyInputComponent, BizyInputModule, BizyLineChartComponent, BizyLineChartModule, BizyMenuComponent, BizyMenuModule, BizyMenuOptionComponent, BizyMenuTitleComponent, BizyPieChartComponent, BizyPieChartModule, BizyRangeFilterPipe, BizySelectComponent, BizySelectModule, BizySelectOptionComponent, BizySidebarComponent, BizySidebarFloatingOptionComponent, BizySidebarFloatingOptionTitleComponent, BizySidebarModule, BizySidebarOptionComponent, BizySliderComponent, BizySliderModule, BizyTabComponent, BizyTableColumnArrowsComponent, BizyTableColumnComponent, BizyTableComponent, BizyTableFooterComponent, BizyTableHeaderComponent, BizyTableModule, BizyTableRowComponent, BizyTableRowExpandContentComponent, BizyTableScrollingComponent, BizyTableScrollingDirective, BizyTabsComponent, BizyTabsModule, BizyTagComponent, BizyTagModule, BizyToggleComponent, BizyToggleModule, BizyToolbarComponent, BizyToolbarModule, BizyVirtualScrollComponent, BizyVirtualScrollGridDirective, BizyVirtualScrollModule, BizyVirtualScrollNgForDirective, MIME_TYPE };
//# sourceMappingURL=bizy-components.mjs.map
