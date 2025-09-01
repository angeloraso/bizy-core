import { ChangeDetectorRef, ElementRef, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, skipWhile, take } from 'rxjs/operators';
import { MIME_TYPE, MODE } from './audio-player.types';
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
  readonly #ref = inject(ChangeDetectorRef);
  readonly #elementRef = inject(ElementRef);

  @Input() id: string = `bizy-audio-player-${Math.random()}`;
  @Input() enableLogs: boolean = false;
  @Input() audioPlayerError: string = 'Error';
  @Input() showDownload: boolean = true;
  @Input() autoplay: boolean = false;
  @Input() disabled: boolean = false;
  @Input() downloadURL: string;
  @Input() downloadFileName: string = 'bizy_audio';

  @Output() onTrackPlayerRate = new EventEmitter<string>();
  @Output() onDownload = new EventEmitter<void>();
  @Output() canPlay = new EventEmitter<Event>();
  @Output() onPause = new EventEmitter<Event>();
  @Output() onEnded = new EventEmitter<Event>();
  @Output() onStalled = new EventEmitter<Event>();
  @Output() onAbort = new EventEmitter<MediaError>();
  @Output() onError = new EventEmitter<MediaError>();
  @Output() onEmptied = new EventEmitter<Event>();
  @Output() canPlayThrough = new EventEmitter<Event>();
  @Output() durationChange = new EventEmitter<Event>();
  @Output() onLoadedData = new EventEmitter<Event>();
  @Output() onLoadedMetadata = new EventEmitter<Event>();
  @Output() onLoadStart = new EventEmitter<Event>();
  @Output() onPlay = new EventEmitter<Event>();
  @Output() onPlaying = new EventEmitter<Event>();
  @Output() onProgress = new EventEmitter<Event>();
  @Output() onRateChange = new EventEmitter<Event>();
  @Output() onSeeked = new EventEmitter<Event>();
  @Output() onSeeking = new EventEmitter<Event>();
  @Output() onSuspend = new EventEmitter<Event>();
  @Output() onTimeUpdate = new EventEmitter<Event>();
  @Output() onVolumeChange = new EventEmitter<Event>();
  @Output() onWaiting = new EventEmitter<Event>();

  #abortAbortController = new AbortController();
  #canPlayAbortController = new AbortController();
  #canPlayThroughAbortController = new AbortController();
  #pauseAbortController = new AbortController();
  #endedAbortController = new AbortController();
  #emptiedAbortController = new AbortController();
  #errorAbortController = new AbortController();
  #stalledAbortController = new AbortController();
  #durationChangeAbortController = new AbortController();
  #loadedDataAbortController = new AbortController();
  #loadedMetadataAbortController = new AbortController();
  #loadStartAbortController = new AbortController();
  #playAbortController = new AbortController();
  #playingAbortController = new AbortController();
  #progressAbortController = new AbortController();
  #rateChangeAbortController = new AbortController();
  #seekedAbortController = new AbortController();
  #seekingAbortController = new AbortController();
  #suspendAbortController = new AbortController();
  #timeUpdateAbortController = new AbortController();
  #volumeChangeAbortController = new AbortController();
  #waitingAbortController = new AbortController();

  #afterViewInit = new BehaviorSubject<boolean>(false);

  readonly MIME_TYPE = MIME_TYPE;
  readonly MODE = MODE;

  readonly BACKWARD_SECONDS = -15;
  readonly FORWARD_SECONDS = 15;

  _duration: number = 0;
  _currentTime: number = 0;
  _paused: boolean = true;
  #normalRef: HTMLAudioElement;
  _mode: MODE = MODE.NORMAL;
  _audioURL: string | null = null;
  _playbackRate = 1;
  _loading: boolean = false;
  #trackPlaybackRate$ = new Subject<string>();
  #subscription = new Subscription();

  get duration(): number {
    return this._duration;
  }

  get currentTime(): number {
    return this._currentTime;
  }

  get paused(): boolean {
    return this._paused;
  }

  @Input() set audioURL(audioURL: string) {
    if (!audioURL) {
      this.#removeListeners();
      this._currentTime = 0;
      this._duration = 0;
      this._paused = true;
      this.#normalRef = null;
      this.#ref.detectChanges();
      return;
    }

    this._audioURL = audioURL;

    if (this._mode === MODE.NORMAL) {
      this.#onNormal()
    }
  }

  @Input() set mode(mode: MODE) {
    if (!mode) {
      return;
    }

    this._mode = mode;
    this.#ref.detectChanges();

    if (this._audioURL) {
      if (this._mode === MODE.NORMAL) {
        this.#onNormal()
      }
    }
  }

  ngAfterViewInit() {
    this.#afterViewInit.next(true);
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  #onNormal(): void {
    this.#removeListeners();
    this.#subscription = new Subscription();

    this.#subscription.add(this.#afterViewInit.pipe(skipWhile(val => !val), take(1)).subscribe(() => {
      this.#normalRef = this.#document.getElementById(this.id) as HTMLAudioElement;
  
      if (!this.#normalRef) {
        return;
      }
  
      this.#addEventListeners(this.#normalRef);

      this.#normalRef.load();

      if (this.autoplay) {
        this.play();
      }

      this.#trackPlayerRate();
      this.#normalRef.playbackRate = this._playbackRate;
      this.#ref.detectChanges();
    }));
  } 

  #trackPlayerRate() {
    this.#subscription.add(this.#trackPlaybackRate$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.onTrackPlayerRate.emit(value);
    }));
  }

  #addEventListeners = (audio: HTMLAudioElement) => {
    if (!audio) {
      return;
    }

    this.#abortAbortController = new AbortController();
    this.#canPlayAbortController = new AbortController();
    this.#canPlayThroughAbortController = new AbortController();
    this.#durationChangeAbortController = new AbortController();
    this.#emptiedAbortController = new AbortController();
    this.#endedAbortController = new AbortController();
    this.#errorAbortController = new AbortController();
    this.#loadedDataAbortController = new AbortController();
    this.#loadedMetadataAbortController = new AbortController();
    this.#loadStartAbortController = new AbortController();
    this.#pauseAbortController = new AbortController();
    this.#playAbortController = new AbortController();
    this.#playingAbortController = new AbortController();
    this.#progressAbortController = new AbortController();
    this.#rateChangeAbortController = new AbortController();
    this.#seekedAbortController = new AbortController();
    this.#seekingAbortController = new AbortController();
    this.#stalledAbortController = new AbortController();
    this.#suspendAbortController = new AbortController();
    this.#timeUpdateAbortController = new AbortController();
    this.#volumeChangeAbortController = new AbortController();
    this.#waitingAbortController = new AbortController();

    audio.addEventListener('abort', (event: any) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - abort', event);
      }

      this.onAbort.emit(event);
    }, {
      signal: this.#abortAbortController.signal
    });

    audio.addEventListener('canplay', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - canplay', event);
      }

      this.canPlay.emit(event);
    }, {
      once: true,
      signal: this.#canPlayAbortController.signal
    });

    audio.addEventListener('canplaythrough', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - canplaythrough', event);
      }

      this.canPlayThrough.emit(event);
    }, {
      signal: this.#canPlayThroughAbortController.signal
    });

    audio.addEventListener('durationchange', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - durationchange', event);
      }

      this.durationChange.emit(event);
    }, {
      signal: this.#durationChangeAbortController.signal
    });

    audio.addEventListener('emptied', (event: any) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - emptied', event);
      }

      this.onEmptied.emit(event);
    }, {
      signal: this.#emptiedAbortController.signal
    });

    audio.addEventListener('ended', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - ended', event);
      }

      this._paused = true;
      this.#ref.detectChanges();
      this.onEnded.emit(event);
    }, {
      signal: this.#endedAbortController.signal
    });

    audio.addEventListener('error', (event: any) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - error', event);
      }

      this.onError.emit(event);
    }, {
      signal: this.#errorAbortController.signal
    });

    audio.addEventListener('loadeddata', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - loadeddata', event);
      }

      const audio = this.#normalRef;
      this._duration = audio.duration;

      this.onLoadedData.emit(event);
    }, {
      signal: this.#loadedDataAbortController.signal
    });

    audio.addEventListener('loadedmetadata', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - loadedmetadata', event);
      }

      this.onLoadedMetadata.emit(event);
    }, {
      signal: this.#loadedMetadataAbortController.signal
    });

    audio.addEventListener('loadstart', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - loadstart', event);
      }

      this.onLoadStart.emit(event);
    }, {
      signal: this.#loadStartAbortController.signal
    });

    audio.addEventListener('pause', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - pause', event);
      }

      this._paused = true;
      this.#ref.detectChanges();
      this.onPause.emit(event);
    }, {
      signal: this.#pauseAbortController.signal
    });

    audio.addEventListener('play', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - play', event);
      }

      this._paused = false;
      this.#ref.detectChanges();
      this.onPlay.emit(event);
    }, {
      signal: this.#playAbortController.signal
    });

    audio.addEventListener('playing', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - playing', event);
      }

      this._paused = false;
      this.#ref.detectChanges();
      this.onPlaying.emit(event);
    }, {
      signal: this.#playingAbortController.signal
    });

    audio.addEventListener('progress', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - progress', event);
      }

      this.onProgress.emit(event);
    }, {
      signal: this.#progressAbortController.signal
    });

    audio.addEventListener('ratechange', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - ratechange', event);
      }

      this.onRateChange.emit(event);
    }, {
      signal: this.#rateChangeAbortController.signal
    });

    audio.addEventListener('seeked', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - seeked', event);
      }

      this.onSeeked.emit(event);
    }, {
      signal: this.#seekedAbortController.signal
    });

    audio.addEventListener('seeking', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - seeking', event);
      }

      this.onSeeking.emit(event);
    }, {
      signal: this.#seekingAbortController.signal
    });

    audio.addEventListener('stalled', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - stalled', event);
      }
      
      this.onStalled.emit(event);
    }, {
      signal: this.#stalledAbortController.signal
    });

    audio.addEventListener('suspend', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - suspend', event);
      }

      this.onSuspend.emit(event);
    }, {
      signal: this.#suspendAbortController.signal
    });

    audio.addEventListener('timeupdate', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - timeupdate', event);
      }

      this._currentTime = audio.currentTime;
      this.onTimeUpdate.emit(event);
    }, {
      signal: this.#timeUpdateAbortController.signal
    });

    audio.addEventListener('volumechange', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - volumechange', event);
      }

      this.onVolumeChange.emit(event);
    }, {
      signal: this.#volumeChangeAbortController.signal
    });

    audio.addEventListener('waiting', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - waiting', event);
      }

      this.onWaiting.emit(event);
    }, {
      signal: this.#waitingAbortController.signal
    });
  }

  #removeListeners = () => {
    this.#subscription.unsubscribe();
    this.#abortAbortController.abort();
    this.#canPlayAbortController.abort();
    this.#canPlayThroughAbortController.abort();
    this.#durationChangeAbortController.abort();
    this.#emptiedAbortController.abort();
    this.#endedAbortController.abort();
    this.#errorAbortController.abort();
    this.#loadedDataAbortController.abort();
    this.#loadedMetadataAbortController.abort();
    this.#loadStartAbortController.abort();
    this.#pauseAbortController.abort();
    this.#playAbortController.abort();
    this.#playingAbortController.abort();
    this.#progressAbortController.abort();
    this.#rateChangeAbortController.abort();
    this.#seekedAbortController.abort();
    this.#seekingAbortController.abort();
    this.#stalledAbortController.abort();
    this.#suspendAbortController.abort();
    this.#timeUpdateAbortController.abort();
    this.#volumeChangeAbortController.abort();
    this.#waitingAbortController.abort();
  }

  async play(): Promise<void> {
    try {
      if (this.disabled || !this._audioURL || !this._paused) {
        return Promise.resolve();
      }

      this._paused = false;
      this.#ref.detectChanges();
      const audio = this.#normalRef;
      if (!audio) {
        this._paused = true;
        this.#ref.detectChanges();
        return Promise.resolve();
      }

      await audio.play();
    } catch (error) {
      this._paused = true;
      return Promise.reject();
    }
  }

  async pause(): Promise<void> {
    try {
      if (this.disabled || !this._audioURL || this._paused) {
        return Promise.resolve();
      }

      this._paused = true;
      this.#ref.detectChanges();
      const audio = this.#normalRef;
      if (!audio) {
        this._paused = false;
        this.#ref.detectChanges();
        return Promise.resolve();
      }

      await audio.pause();
    } catch (error) {
      this._paused = false;
      return Promise.reject();
    }
  }

  async stop(): Promise<void> {
    if (this.disabled || !this._audioURL) {
      return Promise.resolve();
    }

    await this.pause();
    this.seekTo(0);
  }

  seekTo(seconds: number) {
    if (this.disabled || this._loading) {
      return;
    }

    const audio = this.#normalRef;

    if (audio.duration && seconds <= audio.duration) {
        audio.currentTime = seconds;
    }
  }

  _onTrackPlayerRate() {
    if (this.disabled || this._loading) {
      return;
    }

    const audio = this.#normalRef;

    if (audio) {
      switch (audio.playbackRate) {
        case 1:
          audio.playbackRate = 1.5;
          this._playbackRate = 1.5;
          this.#trackPlaybackRate$.next('1.5');
          break;
        case 1.5:
          audio.playbackRate = 2;
          this._playbackRate = 2;
          this.#trackPlaybackRate$.next('2');
          break;
        case 2:
          audio.playbackRate = 1;
          this._playbackRate = 1;
          this.#trackPlaybackRate$.next('1');
          break;
        default:
          audio.playbackRate = 1;
          this._playbackRate = 1;
          this.#trackPlaybackRate$.next('1');
      }
    }
  }

  _onDownload(): void {
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
    this.#removeListeners();
  }
}
