import { inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MIME_TYPE } from './audio-player.types';
import { BizyButtonModule } from '../button';

@Component({
  selector: 'bizy-audio-player',
  templateUrl: './audio-player.html',
  styleUrls: ['./audio-player.css'],
  imports: [CommonModule, BizyButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyAudioPlayerComponent {
  readonly #document = inject(DOCUMENT);
  readonly #renderer = inject(Renderer2);
  @Input() id: string = `bizy-audio-player-${Math.random()}`;
  @Input() mimeType: string;
  @Input() audioPlayerError: string = 'Error';
  @Input() showDownload: boolean = true;
  @Input() autoplay: boolean = false;
  @Input() disabled: boolean = false;
  @Input() downloadURL: string;
  @Input() downloadFileName: string = 'bizy_audio';
  @Output() onDownload = new EventEmitter<void>();
  @Output() canPlayThrough = new EventEmitter<Event>();
  @Output() onTrackPlayerRate = new EventEmitter<string>();

  @Input() set audioURL(audioURL: string) {
    if (!audioURL) {
      return;
    }

    this._ready = false;
    this._audioURL = audioURL;

    if (!this.mimeType) {
      const isOGG = this._audioURL.toLowerCase().includes('ogg');
      if (isOGG) {
        this.mimeType = MIME_TYPE.OGG;
      } else {
        const isWAV = this._audioURL.toLowerCase().includes('wav');
        if (isWAV) {
          this.mimeType = MIME_TYPE.WAV;
        } else {
          this.mimeType = MIME_TYPE.MPEG;
        }
      }
    }

    this.#audioRef = this.#document.getElementById(this.id) as HTMLAudioElement;

    if (this.#audioRef) {
      this.#audioRef.load();

      if (this.autoplay) {
        this.#audioRef.play();
      } 
    } else {
      const interval = setInterval(() => {
        this.#audioRef = this.#document.getElementById(this.id) as HTMLAudioElement;
        if (this.#audioRef) {
          this.#audioRef.load();

          if (this.autoplay) {
            this.#audioRef.play();
          }
          clearInterval(interval);
        }
      }, 300);
    }
  }

  _audioURL: string | null = null;
  _ready: boolean = false;
  #audioRef: HTMLAudioElement;
  _playbackRate = 1;
  #trackPlaybackRate$ = new Subject<string>();
  #subscription = new Subscription();

  trackPlayerRate() {
    this.#subscription.add(this.#trackPlaybackRate$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.onTrackPlayerRate.emit(value);
    }));
  }

  _onTrackPlayerRate() {
    if (!this.disabled) {
      return;
    }

    if (!this.#audioRef) {
      this.#audioRef = this.#document.getElementById(this.id) as HTMLAudioElement;
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
          break;
        default:
          this.#audioRef.playbackRate = 1;
          this._playbackRate = 1;
      }
    }
  }

  _onDownload(): void {
    if (!this.disabled) {
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
}
