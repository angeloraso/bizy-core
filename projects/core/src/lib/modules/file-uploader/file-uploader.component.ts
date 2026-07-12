import { Subject, Subscription } from 'rxjs';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { BizyFileUploaderService } from './file-uploader.service';
import { BIZY_FILE_UPLOADER_MODE, BizyFileUploaderAttachment, BizyFileUploaderFile, BizyFileUploaderInputFile, BizyFileUploaderLoadFile } from './file-uploader.types';

@Component({
  selector: 'bizy-file-uploader',
  template: '<div [id]="TEMPLATE_ID"></div>',
  providers: [BizyFileUploaderService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFileUploaderComponent implements AfterViewInit, OnDestroy {
  readonly #elementRef = inject(ElementRef);
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
  @Input() allowedFileTypes: Array<string> | string | null = null;
  @Input() hideUploadButton: boolean = true;
  @Input() hidePauseResumeButton: boolean = true;
  @Input() hideCancelButton: boolean = false;
  @Input() disableLocalFiles: boolean = false;
  @Input() mode: BIZY_FILE_UPLOADER_MODE = BIZY_FILE_UPLOADER_MODE.UPLOAD;
  @Input() load: Subject<BizyFileUploaderLoadFile> | null = null;
  @Input() upload: Subject<{endpoint: string, headers?: Record<string,string>}> | null = null;

  @Input() set files(value: Array<BizyFileUploaderInputFile> | null | undefined) {
    this.#inputFiles = value ?? [];
    this.#syncInputFiles();
  }

  get files(): Array<BizyFileUploaderInputFile> {
    return this.#inputFiles;
  }

  @Input() set disabled(value: boolean) {
    this.#fileUploader.disable(Boolean(value));
  };

  @Output() completed = new EventEmitter<{successful: Array<{fileId: string, meta: unknown}>, failed: Array<{fileId: string, meta: unknown}>}>();
  @Output() loadedFiles = new EventEmitter<Array<BizyFileUploaderFile>>();
  @Output() attachedFiles = new EventEmitter<Array<BizyFileUploaderAttachment>>();
  

  #subscription = new Subscription();
  #files: Set<BizyFileUploaderFile> = new Set();
  #inputFiles: Array<BizyFileUploaderInputFile> = [];
  #inputFileIds = new Map<string, string>();
  #isFileUploaderReady = false;

  readonly TEMPLATE_ID = 'bizy-file-uploader-template';

  ngAfterViewInit(): void {
    const allowedFileTypes = this.#getAllowedFileTypes();
    this.#fileUploader.createFileUploader({
      maxFileSize: this.maxFileSize,
      minFileSize: this.minFileSize,
      maxTotalFileSize: this.maxTotalFileSize,
      maxNumberOfFiles: this.maxNumberOfFiles,
      minNumberOfFiles: this.minNumberOfFiles,
      dragDropAreaWidth: this.dragDropAreaWidth,
      dragDropAreaHeight: this.dragDropAreaHeight,
      allowedFileTypes,
      language: this.language,
      templateId: this.TEMPLATE_ID,
      hideCancelButton: this.hideCancelButton,
      hideUploadButton: this.hideUploadButton,
      hidePauseResumeButton: this.hidePauseResumeButton,
      disableLocalFiles: this.disableLocalFiles,
      enableUpload: this.mode === BIZY_FILE_UPLOADER_MODE.UPLOAD,
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
      this.#emitFiles();
    }));

    this.#subscription.add(this.#fileUploader.fileRemoved$.subscribe(file => {
      this.#files.delete(file);
      this.#removeTrackedInputFile(file.id);
      this.#emitFiles();
    }));

    this.#isFileUploaderReady = true;
    this.#syncInputFiles();
  }

  #getAllowedFileTypes = (): Array<string> | null => {
    if (typeof this.allowedFileTypes === 'string') {
      return [this.allowedFileTypes];
    }

    if (Array.isArray(this.allowedFileTypes) && this.allowedFileTypes.length > 0) {
      return this.allowedFileTypes;
    }

    return null;
  }

  #syncInputFiles = (): void => {
    if (!this.#isFileUploaderReady) {
      return;
    }

    const nextInputKeys = new Set(this.#inputFiles.map(this.#getInputFileKey));
    Array.from(this.#inputFileIds.entries()).forEach(([key, fileId]) => {
      if (!nextInputKeys.has(key)) {
        this.#fileUploader.remove(fileId);
        this.#inputFileIds.delete(key);
      }
    });

    this.#inputFiles.forEach(inputFile => {
      const key = this.#getInputFileKey(inputFile);
      if (this.#inputFileIds.has(key) || (this.maxNumberOfFiles && this.#files.size >= this.maxNumberOfFiles)) {
        return;
      }

      try {
        const fileId = this.#fileUploader.load(inputFile);
        if (fileId) {
          this.#inputFileIds.set(key, fileId);
        }
      } catch {
        return;
      }
    });
  }

  #getInputFileKey = (inputFile: BizyFileUploaderInputFile): string => {
    if (this.#isLoadFile(inputFile)) {
      return `id:${inputFile.id}`;
    }

    return `file:${inputFile.name}:${inputFile.size}:${inputFile.type}:${inputFile.lastModified}`;
  }

  #isLoadFile = (inputFile: BizyFileUploaderInputFile): inputFile is BizyFileUploaderLoadFile => {
    return typeof inputFile === 'object' && inputFile !== null && 'file' in inputFile;
  }

  #removeTrackedInputFile = (fileId: string): void => {
    Array.from(this.#inputFileIds.entries()).forEach(([key, trackedFileId]) => {
      if (trackedFileId === fileId) {
        this.#inputFileIds.delete(key);
      }
    });
  }

  #emitFiles = (): void => {
    const files = Array.from(this.#files);
    this.loadedFiles.emit(files);
    this.attachedFiles.emit(this.#mapAttachedFiles(files));
  }

  #mapAttachedFiles = (files: Array<BizyFileUploaderFile>): Array<BizyFileUploaderAttachment> => {
    return files.flatMap(file => {
      if (file.isRemote === true || !file.data) {
        return [];
      }

      return [{
        id: file.id,
        file: file.data,
        meta: file.meta,
        name: file.name,
        size: file.size,
        type: file.type
      }];
    });
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  ngOnDestroy() {
    this.#fileUploader.cleanAllFiles();
    this.#subscription.unsubscribe();
  }
}
