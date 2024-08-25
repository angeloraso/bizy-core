import { Subject, Subscription } from 'rxjs';
import { UppyFile } from '@uppy/core';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { BizyFileUploaderService } from './file-uploader.service';
@Component({
  selector: 'bizy-file-uploader',
  templateUrl: './file-uploader.html',
  providers: [BizyFileUploaderService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFileUploaderComponent implements AfterViewInit, OnDestroy {
  @Input() tenantId: number | null = null;
  @Input() dragDropAreaWidth: string = '100%';
  @Input() dragDropAreaHeight: string = '16rem';
  @Input() language: 'es' | 'en' = 'es';
  @Input() maxFileSize: number | null = null;
  @Input() minFileSize: number | null = null;
  @Input() maxTotalFileSize: number | null = 31458000; // 30MB
  @Input() maxNumberOfFiles: number | null = null;
  @Input() minNumberOfFiles: number | null = null;
  @Input() allowedFileTypes = ['.wav'];
  @Input() upload: Subject<{url: string, token: string}>;

  @Output() completed = new EventEmitter<{successful: Array<string>, failed: Array<string>}>();
  @Output() loadedFiles = new EventEmitter<Array<UppyFile>>();

  #subscription = new Subscription();
  #files: Set<UppyFile> = new Set();

  readonly TEMPLATE_ID = 'bizy-file-uploader-template';

  constructor(
    @Inject(BizyFileUploaderService) private fileUploader: BizyFileUploaderService,
  ) {}

  ngAfterViewInit(): void {
    if (!this.tenantId) {
      return;
    }

    this.fileUploader.createFileUploader({
      maxFileSize: this.maxFileSize,
      minFileSize: this.minFileSize,
      maxTotalFileSize: this.maxTotalFileSize,
      maxNumberOfFiles: this.maxNumberOfFiles,
      minNumberOfFiles: this.minNumberOfFiles,
      dragDropAreaWidth: this.dragDropAreaWidth,
      dragDropAreaHeight: this.dragDropAreaHeight,
      allowedFileTypes: this.allowedFileTypes,
      tenantId: String(this.tenantId),
      language: this.language,
      templateId: this.TEMPLATE_ID
    });

    this.#subscription.add(this.upload.subscribe(data => {
      if (this.#files.size === 0 || (this.minNumberOfFiles && this.#files.size < this.minNumberOfFiles)) {
        this.completed.emit({successful: [], failed: []});
        return;
      }

      this.fileUploader.upload(data);
    }));

    this.#subscription.add(this.fileUploader.complete$.subscribe(res => {
      const successful: Array<string> = [];
      const failed: Array<string> = [];
      res.successful.forEach(_file => {
        if (_file.response && _file.response.body && _file.response.body.fileId) {
          successful.push(_file.response.body.fileId as string);
        }
      });
      res.failed.forEach(_file => {
        if (_file.response && _file.response.body && _file.response.body.fileId) {
          successful.push(_file.response.body.fileId as string);
        }
      });
      this.completed.emit({successful, failed});
    }));

    this.#subscription.add(this.fileUploader.fileLoaded$.subscribe(file => {
      this.#files.add(file);
      this.loadedFiles.emit(Array.from(this.#files));
    }));

    this.#subscription.add(this.fileUploader.fileRemoved$.subscribe(file => {
      this.#files.delete(file);
      this.loadedFiles.emit(Array.from(this.#files));
    }));
  }

  ngOnDestroy() {
    this.fileUploader.cleanAllFiles();
    this.#subscription.unsubscribe();
  }
}
