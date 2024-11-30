import { Subject, Subscription } from 'rxjs';
import { UppyFile } from '@uppy/core';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, inject, Inject, Input, OnDestroy, Output } from '@angular/core';
import { BizyFileUploaderService } from './file-uploader.service';
@Component({
  selector: 'bizy-file-uploader',
  template: '<div [id]="TEMPLATE_ID"></div>',
  providers: [BizyFileUploaderService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFileUploaderComponent implements AfterViewInit, OnDestroy {
  readonly #fileUploader = inject(BizyFileUploaderService);
  @Input() dragDropAreaWidth: string = '100%';
  @Input() dragDropAreaHeight: string = '16rem';
  @Input() language: 'es' | 'en' = 'es';
  @Input() headers: Record<string, string> = {};
  @Input() maxFileSize: number | null = null;
  @Input() minFileSize: number | null = null;
  @Input() maxTotalFileSize: number | null = 31458000; // 30MB
  @Input() maxNumberOfFiles: number | null = null;
  @Input() minNumberOfFiles: number | null = null;
  @Input() allowedFileTypes = ['.wav'];
  @Input() hideUploadButton: boolean = true;
  @Input() hidePauseResumeButton: boolean = true;
  @Input() hideCancelButton: boolean = false;
  @Input() disableLocalFiles: boolean = false;
  @Input() load: Subject<{id: string; file: File}>;
  @Input() upload: Subject<{endpoint: string, headers?: Record<string,string>}>;

  @Input() set disabled(value: boolean) {
    this.#fileUploader.disable(Boolean(value));
  };

  @Output() completed = new EventEmitter<{successful: Array<{fileId: string, meta: unknown}>, failed: Array<{fileId: string, meta: unknown}>}>();
  @Output() loadedFiles = new EventEmitter<Array<UppyFile>>();
  

  #subscription = new Subscription();
  #files: Set<UppyFile> = new Set();

  readonly TEMPLATE_ID = 'bizy-file-uploader-template';

  ngAfterViewInit(): void {
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
          this.completed.emit({successful: [], failed: []});
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
      const successful: Array<{fileId: string, meta: unknown}> = [];
      const failed: Array<{fileId: string, meta: unknown}> = [];
      res.successful.forEach(_file => {
        if (_file.response && _file.response.body && _file.response.body.fileId) {
          successful.push({fileId: _file.response.body.fileId as string, meta: _file.meta});
        }
      });
      res.failed.forEach(_file => {
        if (_file.response && _file.response.body && _file.response.body.fileId) {
          failed.push({fileId: _file.response.body.fileId as string, meta: _file.meta});
        }
      });
      this.completed.emit({successful, failed});
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
}
