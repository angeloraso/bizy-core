import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Renderer2, Inject } from '@angular/core';
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
  @Input() id: string = `bizy-audio-player-${Math.random()}`;
  @Input() mimeType: string = MIME_TYPE.MPEG;
  @Input() showDownload: boolean = true;
  @Input() autoplay: boolean = false;
  @Input() downloadURL: string;
  @Input() downloadFileName: string = 'bizy_audio';
  @Output() onDownload = new EventEmitter<void>();
  @Output() onTrackPlayerRate = new EventEmitter<string>();

  @Input() set audioURL(audioURL: string) {
    if (!audioURL) {
      return;
    }

    this._audioURL = audioURL;
    this._audioRef = this._audioRef ?? this.document.getElementById(this.id) as HTMLAudioElement;
    if (this._audioRef) {
      this._audioRef.load();

      if (this.autoplay) {
        this._audioRef.play();
      }
    }
  }



  _audioURL: string | null = null;
  _audioRef: HTMLAudioElement;
  _playbackRate = 1;
  #trackPlaybackRate$ = new Subject<string>();
  #subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(Renderer2) private renderer: Renderer2
  ) {}

  trackPlayerRate() {
    this.#subscription.add(this.#trackPlaybackRate$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.onTrackPlayerRate.emit(value);
    }));
  }

  _onTrackPlayerRate() {
    this._audioRef = this._audioRef ?? this.document.getElementById(this.id) as HTMLAudioElement;
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

  _onDownload(): void {
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
}
