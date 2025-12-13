import { ChangeDetectorRef, ElementRef, inject, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Renderer2
} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import playAnimation from '../../assets/animations/play.json';
import muteAnimation from '../../assets/animations/mute.json';
import { MIME_TYPE } from './audio-player.types';
import { BizyAudioPlayerFormatSecondsPipe } from './audio-player-format-seconds.pipe';

const DEFAULT_DOWNLOAD = {
  show: true,
  name: 'Bizy'
};

const DEFAULT_PLAYBACK_RATE = {
  show: true,
  default: 1
};
@Component({
  selector: 'bizy-audio-player',
  templateUrl: './audio-player.html',
  styleUrls: ['./audio-player.css'],
  imports: [BizyAudioPlayerFormatSecondsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BizyAudioPlayerComponent {
  readonly #document = inject(DOCUMENT);
  readonly #renderer = inject(Renderer2);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #elementRef = inject(ElementRef);

  @ViewChild('bizyAudioPlayerPlayButtonRef') playButtonRef: ElementRef<HTMLButtonElement>;
  @ViewChild('bizyAudioPlayerAudioRef') audioRef: ElementRef<HTMLAudioElement>;
  @ViewChild('bizyAudioPlayerSeekSliderRef') seekSliderRef: ElementRef<HTMLInputElement>;
  @ViewChild('bizyAudioPlayerMuteButtonRef') muteButtonRef: ElementRef<HTMLButtonElement>;

  @Output() onPlaybackRate = new EventEmitter<string>();
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
  @Output() onSeeked = new EventEmitter<Event>();
  @Output() onSeeking = new EventEmitter<Event>();
  @Output() onSuspend = new EventEmitter<Event>();
  @Output() onTimeUpdate = new EventEmitter<Event>();
  @Output() onVolumeChange = new EventEmitter<Event>();
  @Output() onWaiting = new EventEmitter<Event>();

  @Input() enableLogs: boolean = false;
  @Input() disabled: boolean = false;
  @Input() autoplay: boolean = false;
  @Input() set download(download: {show?: boolean, url?: string, name?: string}) {
    if (!download) {
      return;
    }

    this._showDownload = download.show ?? DEFAULT_DOWNLOAD.show;
    this._downloadURL = download.url ?? null;
    this._downloadFileName = download.name ?? DEFAULT_DOWNLOAD.name;
  };

  @Input() set playbackRate(playbackRate: {show?: boolean, default?: number}) {
    if (!playbackRate) {
      return;
    }

    this._showPlaybackRate = playbackRate.show ?? DEFAULT_PLAYBACK_RATE.show;
    this._playbackRate = playbackRate.default ?? DEFAULT_PLAYBACK_RATE.default;
  };

  @Input() set src(src: string) {
    if (!src) {
      this.#removeListeners();
      this._currentTime = 0;
      this._duration = 0;
      this._paused = true;
      this.#audio = null;
      this.#ref.detectChanges();
      return;
    }

    this._src = src;

    if (this.#audio) {
      this.#audio.load();
    }
  }

  #subscription = new Subscription();
  #playAnimation: AnimationItem | null = null;
  #muteAnimation: AnimationItem | null = null;
  #audio: HTMLAudioElement | null = null;
  #seekSlider: HTMLInputElement | null = null;
  #playbackRate$ = new Subject<string>();
  #currentTime$ = new Subject<number>();
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
  #seekSliderAbortController = new AbortController();

  _duration: number = 0;
  _currentTime: number = 0;
  _paused: boolean = true;
  _muted: boolean = false;
  _src: string | null = null;
  _showDownload = DEFAULT_DOWNLOAD.show;
  _downloadURL: string | null = null;
  _downloadFileName: string | null = DEFAULT_DOWNLOAD.name;
  _showPlaybackRate: boolean = DEFAULT_PLAYBACK_RATE.show;
  _playbackRate: number = DEFAULT_PLAYBACK_RATE.default;

  readonly MIME_TYPE = MIME_TYPE;
  readonly BACKWARD_SECONDS = -15;
  readonly FORWARD_SECONDS = 15;


  get duration(): number {
    return this._duration;
  }

  get currentTime(): number {
    return this._currentTime;
  }

  get paused(): boolean {
    return this._paused;
  }

  get muted(): boolean {
    return this._muted;
  }

  ngAfterViewInit() {
    this.#subscription = new Subscription();
    this.#subscription.add(this.#playbackRate$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.onPlaybackRate.emit(value);
    }));

    this.#subscription.add(this.#currentTime$.pipe(
      debounceTime(100),
    ).subscribe(value => {
      this.seekTo(value);
    }));

    import('lottie-web').then(module => {
      const lottieWeb = module.default;
      this.#playAnimation = lottieWeb.loadAnimation({
        container: this.playButtonRef.nativeElement,
        animationData: playAnimation,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        name: 'Bizy audio player play Animation'
      });

      this.#playAnimation.setSpeed(2.5);

      this.#playAnimation.addEventListener('DOMLoaded', this.#setPlayButtonColor);

      this.#muteAnimation = lottieWeb.loadAnimation({
        container: this.muteButtonRef.nativeElement,
        animationData: muteAnimation,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        name: 'Bizy audio player mute Animation'
      });

      this.#muteAnimation.setSpeed(2);

      this.#muteAnimation.addEventListener('DOMLoaded', this.#setMuteButtonColor);

      this.#audio = this.audioRef.nativeElement;
      this.#seekSlider = this.seekSliderRef.nativeElement;

      if (this.#audio) {
        this.#addEventListeners();

        this.#audio.playbackRate = this._playbackRate;
        this.#audio.load();
      }

      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', () => {
          this.play();
        });

        navigator.mediaSession.setActionHandler('pause', () => {
          this.pause();
        });

        navigator.mediaSession.setActionHandler('seekbackward', details => {
          this.backward(details.seekOffset);
        });

        navigator.mediaSession.setActionHandler('seekforward', details => {
          this.forward(details.seekOffset);
        });

        navigator.mediaSession.setActionHandler('seekto', details => {
          this.seekTo(details.seekTime);
        });

        navigator.mediaSession.setActionHandler('stop', () => {
          this.stop();
        });
      }
    });
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  togglePlay = async () => {
    if (this.disabled) {
      return;
    }

    if (this._paused) {
      await this.play();
    } else {
      await this.pause();
    }
  }

  toggleMute = () => {
    if (this.disabled) {
      return;
    }

    if (this._muted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  play = async (): Promise<void> => {
    try {
      if (this.disabled || !this._src || !this._paused) {
        return Promise.resolve();
      }

      this._paused = false;
      this.#ref.detectChanges();

      if (!this.#audio) {
        this._paused = true;
        this.#ref.detectChanges();
        return Promise.resolve();
      }

      if (this.#playAnimation) {
        this.#playAnimation.playSegments([0, 27], true);
        this.#ref.detectChanges();
      }

      await this.#audio.play();
    } catch (error) {
      this._paused = true;
      return Promise.reject();
    }
  }

  pause = async (): Promise<void> => {
    try {
      if (this.disabled || !this._src || this._paused) {
        return Promise.resolve();
      }

      this._paused = true;
      this.#ref.detectChanges();

      if (!this.#audio) {
        this._paused = false;
        this.#ref.detectChanges();
        return Promise.resolve();
      }

      if (this.#playAnimation) {
        this.#playAnimation.playSegments([27, 0], true);
        this.#ref.detectChanges();
      }

      await this.#audio.pause();
    } catch (error) {
      this._paused = false;
      return Promise.reject();
    }
  }

  mute = (): void => {
    if (this.disabled || !this.#audio || this.#audio.muted) {
      return;
    }

    this.#audio.muted = true;

    if (this.#muteAnimation) {
      this.#muteAnimation.playSegments([0, 25], true);
    }

    this.#ref.detectChanges();
  }

  unmute = (): void => {
    if (this.disabled || !this.#audio || !this.#audio.muted) {
      return;
    }

    this.#audio.muted = false;

    if (this.#muteAnimation) {
      this.#muteAnimation.playSegments([25, 0], true);
    }

    this.#ref.detectChanges();
  }

  stop = async (): Promise<void> => {
    if (this.disabled || !this._src) {
      return Promise.resolve();
    }

    await this.pause();

    this.seekTo(0);

    if (this.#seekSlider) {
      this.#seekSlider.value = '0';
      this.#elementRef.nativeElement.style.setProperty('--bizy-audio-player-seek-before-width', '0%');
    }
  }

  backward = (seconds: number) => {
    if (this.disabled || !this.#audio) {
      return;
    }
  
    this.seekTo(this.#audio.currentTime - (seconds || this.FORWARD_SECONDS))
  }

  forward = (seconds: number) => {
    if (this.disabled || !this.#audio) {
      return;
    }
  
    this.seekTo(this.#audio.currentTime + (seconds || this.FORWARD_SECONDS))
  }

  seekTo(seconds: number) {
    if (this.disabled || !this.#audio || typeof seconds === 'undefined' || seconds === null) {
      return;
    }

    if (!this.#audio.duration) {
      return;
    }

    if (seconds > this.#audio.duration) {
      seconds = this.#audio.duration
    }

    if (seconds < 0) {
      seconds = 0;
    }

    if (this.#audio.fastSeek) {
      this.#audio.fastSeek(seconds);
    } else {
      this.#audio.currentTime = seconds;
    }

    this.#ref.detectChanges();
  }

  setPlaybackRate() {
    if (this.disabled || !this.#audio) {
      return;
    }

    switch (this.#audio.playbackRate) {
      case 1:
        this.#audio.playbackRate = 1.5;
        break;
      case 1.5:
        this.#audio.playbackRate = 2;
        break;
      case 2:
        this.#audio.playbackRate = 1;
        break;
      default:
        this.#audio.playbackRate = DEFAULT_PLAYBACK_RATE.default;
    }
  }

  downloadAudio = (): void => {
    if (this.disabled || !this._showDownload) {
      return;
    }

    const downloadButton = this.#renderer.createElement('a');
    this.#renderer.setAttribute(downloadButton, 'download', this._downloadFileName);
    this.#renderer.setProperty(downloadButton, 'href', this._downloadURL ?? this._src);
    this.#renderer.appendChild(this.#document.body, downloadButton);
    downloadButton.click();
    this.#renderer.removeChild(this.#document.body, downloadButton);
    this.onDownload.emit();
  }

  #addEventListeners = () => {
    if (!this.#audio || !this.#seekSlider) {
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
    this.#seekSliderAbortController = new AbortController();

    this.#audio.addEventListener('abort', (event: any) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - abort', event);
      }

      this.onAbort.emit(event);
    }, {
      signal: this.#abortAbortController.signal
    });

    this.#audio.addEventListener('canplay', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - canplay', event);
      }

      if (this.autoplay) {
        this.play();
      }

      this.canPlay.emit(event);
    }, {
      once: true,
      signal: this.#canPlayAbortController.signal
    });

    this.#audio.addEventListener('canplaythrough', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - canplaythrough', event);
      }

      this.canPlayThrough.emit(event);
    }, {
      signal: this.#canPlayThroughAbortController.signal
    });

    this.#audio.addEventListener('durationchange', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - durationchange', event);
      }

      this.durationChange.emit(event);
    }, {
      signal: this.#durationChangeAbortController.signal
    });

    this.#audio.addEventListener('emptied', (event: any) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - emptied', event);
      }

      this.onEmptied.emit(event);
    }, {
      signal: this.#emptiedAbortController.signal
    });

    this.#audio.addEventListener('ended', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - ended', event);
      }

      this.stop();
      this.onEnded.emit(event);
    }, {
      signal: this.#endedAbortController.signal
    });

    this.#audio.addEventListener('error', (event: any) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - error', event);
      }

      this.onError.emit(event);
    }, {
      signal: this.#errorAbortController.signal
    });

    this.#audio.addEventListener('loadeddata', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - loadeddata', event);
      }

      this._duration = this.#audio!.duration;
      this.#ref.detectChanges();
      this.onLoadedData.emit(event);
    }, {
      signal: this.#loadedDataAbortController.signal
    });

    this.#audio.addEventListener('loadedmetadata', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - loadedmetadata', event);
      }

      this.onLoadedMetadata.emit(event);
    }, {
      signal: this.#loadedMetadataAbortController.signal
    });

    this.#audio.addEventListener('loadstart', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - loadstart', event);
      }

      this.onLoadStart.emit(event);
    }, {
      signal: this.#loadStartAbortController.signal
    });

    this.#audio.addEventListener('pause', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - pause', event);
      }

      this.onPause.emit(event);
    }, {
      signal: this.#pauseAbortController.signal
    });

    this.#audio.addEventListener('play', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - play', event);
      }

      this.onPlay.emit(event);
    }, {
      signal: this.#playAbortController.signal
    });

    this.#audio.addEventListener('playing', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - playing', event);
      }

      this.onPlaying.emit(event);
    }, {
      signal: this.#playingAbortController.signal
    });

    this.#audio.addEventListener('progress', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - progress', event);
      }

      const bufferedAmount = Math.floor(this.#audio!.buffered.end(this.#audio!.buffered.length - 1));
      this.#elementRef.nativeElement.style.setProperty('--bizy-audio-player-buffered-width', Number(this.#seekSlider!.max) ? `${(bufferedAmount / Number(this.#seekSlider!.max)) * 100}%` : '0%');
      this.#ref.detectChanges();

      this.onProgress.emit(event);
    }, {
      signal: this.#progressAbortController.signal
    });

    this.#audio.addEventListener('ratechange', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - ratechange', event);
      }

      this._playbackRate = this.#audio.playbackRate;
      this.#playbackRate$.next(String(this.#audio.playbackRate));
    }, {
      signal: this.#rateChangeAbortController.signal
    });

    this.#audio.addEventListener('seeked', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - seeked', event);
      }

      this.onSeeked.emit(event);
    }, {
      signal: this.#seekedAbortController.signal
    });

    this.#audio.addEventListener('seeking', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - seeking', event);
      }

      this.onSeeking.emit(event);
    }, {
      signal: this.#seekingAbortController.signal
    });

    this.#audio.addEventListener('stalled', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - stalled', event);
      }

      this.onStalled.emit(event);
    }, {
      signal: this.#stalledAbortController.signal
    });

    this.#audio.addEventListener('suspend', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - suspend', event);
      }

      this.onSuspend.emit(event);
    }, {
      signal: this.#suspendAbortController.signal
    });

    this.#audio.addEventListener('timeupdate', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - timeupdate', event);
      }

      this._currentTime = this.#audio!.currentTime;
      this.#elementRef.nativeElement.style.setProperty('--bizy-audio-player-seek-before-width', this._duration ? `${(this._currentTime / this._duration) * 100}%` : '0%');
      this.#ref.detectChanges();
      this.onTimeUpdate.emit(event);
    }, {
      signal: this.#timeUpdateAbortController.signal
    });

    this.#audio.addEventListener('volumechange', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - volumechange', event);
      }

      this._muted = this.#audio!.muted;

      this.onVolumeChange.emit(event);
    }, {
      signal: this.#volumeChangeAbortController.signal
    });

    this.#audio.addEventListener('waiting', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - waiting', event);
      }

      this.onWaiting.emit(event);
    }, {
      signal: this.#waitingAbortController.signal
    });

    this.#seekSlider.addEventListener('input', (event: Event) => {
      if (this.enableLogs) {
        console.debug('bizy audio player - seeked', event);
      }

      this.#currentTime$.next(Number(this.#seekSlider!.value));
    }, {
      signal: this.#seekSliderAbortController.signal
    });
  }

  #setPlayButtonColor = () => {
    const playButtonColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-audio-player-play-button-color')!;
    const svg = this.playButtonRef.nativeElement;
    if (svg) {
      svg.querySelectorAll('path').forEach((path: SVGPathElement) => {
        this.#renderer.setAttribute(path, 'fill', playButtonColor);
        this.#renderer.setAttribute(path, 'stroke', playButtonColor);
      });
    }
  }

  #setMuteButtonColor = () => {
    const playButtonColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-audio-player-mute-button-color')!;
    const svg = this.muteButtonRef.nativeElement;
    if (svg) {
      svg.querySelectorAll('path').forEach((path: SVGPathElement) => {
        this.#renderer.setAttribute(path, 'fill', playButtonColor);
        this.#renderer.setAttribute(path, 'stroke', playButtonColor);
      });
    }
  }

  #getClosestCssVariable = (element: HTMLElement, cssVariable: string): string | null => {
    while (element) {
      const value = getComputedStyle(element).getPropertyValue(cssVariable).trim();
      if (value) {
        return value;
      }

      element = element.parentElement as HTMLElement;
    }

    const rootValue = getComputedStyle(this.#document.documentElement).getPropertyValue(cssVariable).trim();
    return rootValue || null;
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
    this.#playAnimation?.removeEventListener('DOMLoaded', this.#setPlayButtonColor);
    this.#muteAnimation?.removeEventListener('DOMLoaded', this.#setMuteButtonColor);
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    this.#removeListeners();
  }
}
