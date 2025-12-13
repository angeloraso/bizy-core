import { DOCUMENT } from '@angular/common';
import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  Output,
  EventEmitter,
  Input,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'bizy-audio-recorder',
  templateUrl: './audio-recorder.html',
  styleUrls: ['./audio-recorder.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyAudioRecorderComponent implements AfterViewInit, OnDestroy {
  readonly #ref = inject(ChangeDetectorRef);
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);

  @ViewChild('waveformCanvas') waveformCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('bizyRecordButton') recordButton!: ElementRef<HTMLButtonElement>;
  @Input() disabled: boolean = false;
  @Input() duration: number | null = 60 * 1000;
  @Output() onStart = new EventEmitter<void>();
  @Output() onStop = new EventEmitter<void>();
  @Output() onError = new EventEmitter<Error>();
  @Output() onRecording = new EventEmitter<string>();

  _isRecording = false;

  #audioUrl: string | null = null;
  #mediaRecorder: MediaRecorder | null = null;
  #audioChunks: Blob[] = [];
  #audioContext: AudioContext | null = null;
  #analyser: AnalyserNode | null = null;
  #dataArray: Uint8Array | null = null;
  #animationId: number | null = null;

  #startTime: number = 0;
  #timerInterval: any = null;
  #autoStopTimeout: any = null;

  circumference = 0;
  strokeDashoffset = 0;
  circleRadius = 0;
  circleCenter = 0;
  svgViewBox = '';
  canvasSize = 0;
  strokeColor: string = '';

  get isRecording(): boolean {
    return this._isRecording;
  }

  ngAfterViewInit() {
    const rect = this.recordButton.nativeElement.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const svgSize = Math.max(width, height) + 20;
    this.circleRadius = (svgSize / 2) - 10;
    this.circleCenter = svgSize / 2;
    this.svgViewBox = `0 0 ${svgSize} ${svgSize}`;
    this.circumference = 2 * Math.PI * this.circleRadius;
    this.canvasSize = Math.min(width, height) * 0.8;
  }

  async startRecording() {
    if (this.disabled || this._isRecording) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.#audioChunks = [];
      this.#audioUrl = null;
      this.#startTime = Date.now();
      this.strokeDashoffset = 0;

      this.strokeColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-audio-recorder-record-button-progress-color')!;

      let mimeType = 'audio/webm';

      const supportedTypes = [
        'audio/ogg',
        'audio/wav',
        'audio/mpeg',
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4'
      ];

      for (const type of supportedTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          mimeType = type;
          break;
        }
      }

      this.#mediaRecorder = new MediaRecorder(stream, { mimeType });
      this.#mediaRecorder.ondataavailable = event => {
        this.#audioChunks.push(event.data);
      };

      this.#mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.#audioChunks, { type: mimeType });
        this.#audioUrl = URL.createObjectURL(audioBlob);
        this.#cleanup();
        this.onStop.emit();
        this.onRecording.emit(this.#audioUrl);
      };

      this._isRecording = true;
      this.#ref.detectChanges();

      if (this.duration) {
        if (this.#mediaRecorder) {
          this.#mediaRecorder.start();
          this.#setupAudioVisualization(stream);
          this.#startProgressTimer();

          this.#autoStopTimeout = setTimeout(() => {
            if (this._isRecording) {
              this.stopRecording();
            }
          }, this.duration!);
        }
      }

      this.onStart.emit();
    } catch (error) {
      this._isRecording = false;
      this.#ref.detectChanges();
      this.onError.emit(error);
    }
  }

  stopRecording() {
    if (this.disabled || !this._isRecording || !this.#mediaRecorder) {
      return;
    }

    this.#mediaRecorder.stop();
    this.#mediaRecorder.stream.getTracks().forEach(track => track.stop());
  }

  #setupAudioVisualization(stream: MediaStream) {
    if (!this.waveformCanvas) {
      console.log('Canvas no disponible');
      return;
    }

    this.#audioContext = new AudioContext();
    this.#analyser = this.#audioContext.createAnalyser();
    const source = this.#audioContext.createMediaStreamSource(stream);

    source.connect(this.#analyser);
    this.#analyser.fftSize = 256;

    const bufferLength = this.#analyser.frequencyBinCount;
    this.#dataArray = new Uint8Array(bufferLength);

    this.#drawWaveform();
  }

  #drawWaveform() {
    if (!this._isRecording || !this.waveformCanvas) {
      return;
    }

    const canvas = this.waveformCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx || !this.#analyser || !this.#dataArray) {
      return;
    }

    this.#animationId = requestAnimationFrame(() => this.#drawWaveform());

    this.#analyser.getByteTimeDomainData(this.#dataArray as any);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;

    ctx.strokeStyle = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-audio-recorder-record-button-recording-color')!;
    ctx.beginPath();

    const sliceWidth = canvas.width / this.#dataArray.length;
    let x = 0;

    for (let i = 0; i < this.#dataArray.length; i++) {
      const v = this.#dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }

  #startProgressTimer = () => {
    if (!this.duration) {
      return;
    }

    this.#timerInterval = setInterval(() => {
      const elapsed = Date.now() - this.#startTime;
      const progress = elapsed / this.duration!;

      this.strokeDashoffset = this.circumference * (1 - progress);

      if (elapsed >= this.duration!) {
        this.stopRecording();
      }

      this.#ref.detectChanges();
    }, 100);
  }

  #cleanup = () => {
    this._isRecording = false;

    if (this.#animationId !== null) {
      cancelAnimationFrame(this.#animationId);
      this.#animationId = null;
    }

    if (this.#timerInterval) {
      clearInterval(this.#timerInterval);
      this.#timerInterval = null;
    }

    if (this.#autoStopTimeout) {
      clearTimeout(this.#autoStopTimeout);
      this.#autoStopTimeout = null;
    }

    if (this.#audioContext) {
      this.#audioContext.close();
      this.#audioContext = null;
    }

    this.#analyser = null;
    this.#dataArray = null;
    this.#ref.detectChanges();
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

  ngOnDestroy() {
    this.stopRecording();
    this.#cleanup();
  }
}
