import type Uppy from '@uppy/core';
import { Observable, Subject } from 'rxjs';
import { Injectable, Renderer2, inject, DOCUMENT } from '@angular/core';
import { BizyFileUploaderErrorResponse, BizyFileUploaderFile, BizyFileUploaderInputFile, BizyFileUploaderLoadFile, BizyFileUploaderMeta, BizyFileUploaderResponseBody, BizyFileUploaderSuccessResponse } from './file-uploader.types';

@Injectable()
export class BizyFileUploaderService {
  #renderer = inject(Renderer2);
  #document = inject(DOCUMENT);
  #fileLoaded = new Subject<BizyFileUploaderFile>();
  #fileRemoved = new Subject<BizyFileUploaderFile>();
  #upload = new Subject<void>();
  #uploadSuccess = new Subject<{file: BizyFileUploaderFile, response: BizyFileUploaderSuccessResponse}>();
  #error = new Subject<{ file?: BizyFileUploaderFile; error: Error, response?: BizyFileUploaderErrorResponse }>();
  #cancelAll = new Subject<void>();
  #complete = new Subject<{ successful: Array<BizyFileUploaderFile>; failed: Array<BizyFileUploaderFile> }>();
  #disableLocalFiles: boolean = false;
  #uppy: Uppy<BizyFileUploaderMeta, BizyFileUploaderResponseBody> | null = null;

  get fileLoaded$(): Observable<BizyFileUploaderFile> {
    return this.#fileLoaded.asObservable();
  }

  get fileRemoved$(): Observable<BizyFileUploaderFile> {
    return this.#fileRemoved.asObservable();
  }

  get upload$(): Observable<void> {
    return this.#upload.asObservable();
  }

  get uploadSuccess$(): Observable<{file: BizyFileUploaderFile, response: BizyFileUploaderSuccessResponse}> {
    return this.#uploadSuccess.asObservable();
  }

  get error$(): Observable<{ file?: BizyFileUploaderFile; error: Error; response?: BizyFileUploaderErrorResponse }> {
    return this.#error.asObservable();
  }

  get cancelAll$(): Observable<void> {
    return this.#cancelAll.asObservable();
  }

  get complete$(): Observable<{ successful: Array<BizyFileUploaderFile>; failed: Array<BizyFileUploaderFile> }> {
    return this.#complete.asObservable();
  }

  async createFileUploader(data: {
      maxFileSize: number | null;
      minFileSize: number | null;
      maxTotalFileSize: number | null;
      maxNumberOfFiles: number | null;
      minNumberOfFiles: number | null;
      dragDropAreaWidth: string;
      dragDropAreaHeight: string;
      allowedFileTypes: Array<string> | null;
      language: 'es' | 'en';
      templateId: string;
      hideCancelButton: boolean,
      hideUploadButton: boolean,
      hidePauseResumeButton: boolean,
      disableLocalFiles: boolean,
      enableUpload: boolean,
      headers: Record<string, string>;
  }): Promise<void> {
    const [
      { default: UppyConstructor },
      { default: es_ES },
      { default: en_US },
      { default: Dashboard },
      { default: XHRUpload }
    ] = await Promise.all([
      import('@uppy/core'),
      import('@uppy/locales/lib/es_ES'),
      import('@uppy/locales/lib/en_US'),
      import('@uppy/dashboard'),
      import('@uppy/xhr-upload')
    ]);

    const ES = {
      ...es_ES,
      strings: {
        ...es_ES.strings,
        noDuplicates: 'Archivo duplicado: \'%{fileName}\'',
        browseFiles: 'buscar archivo',
        dropPasteFiles: 'Soltar archivo aquí, pegar o %{browseFiles}'
      }
    };
    const EN = {
      ...en_US,
      strings: {
        ...en_US.strings,
        noDuplicates: 'Duplicated file: \'%{fileName}\'',
        browseFiles: 'browse file',
        dropPasteFiles: 'Drop a file here or %{browseFiles}'
      }
    };

    const locale = data.language === 'es' ? ES : EN;
    this.#disableLocalFiles = data.disableLocalFiles;
    this.#uppy = new UppyConstructor<BizyFileUploaderMeta, BizyFileUploaderResponseBody>({
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
    });

    this.#uppy
      .use(Dashboard, {
        inline: true,
        singleFileFullScreen: false,
        target: `#${data.templateId}`,
        width: data.dragDropAreaWidth,
        height: data.dragDropAreaHeight,
        hideCancelButton: data.hideCancelButton,
        hideUploadButton: !data.enableUpload || data.hideUploadButton,
        hidePauseResumeButton: data.hidePauseResumeButton,
        disableLocalFiles: data.disableLocalFiles
      });

    if (data.enableUpload) {
      this.#uppy.use(XHRUpload, {
        endpoint: '',
        headers: data.headers,
        getResponseData: xhr => {
          return {
            fileId: xhr.responseText,
            response: xhr
          };
        }
      });
    }

    this.#uppy
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
          this.#uploadSuccess.next({file, response});
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
        this.#complete.next({
          successful: result.successful ?? [],
          failed: result.failed ?? []
        });
      });
      
      this.#removeUnnecessaryOptions(this.#disableLocalFiles);
  }

  load = (data: BizyFileUploaderInputFile): string | null => {
    if (!this.#uppy) {
      return null;
    }

    const loadFile = this.#normalizeLoadFile(data);
    return this.#uppy.addFile({
      name: loadFile.file.name, // File name
      type: loadFile.file.type, // File type
      data: loadFile.file, // File blob
      meta: {
        // Optional, store the directory path of a file so Uppy can tell identical files in different directories apart.
        relativePath: loadFile.file.webkitRelativePath,
        referenceId: loadFile.id
      },
      source: 'Local', // Optional, determines the source of the file, for example, Instagram.
      isRemote: false // Optional, set to true if actual file is not in the browser, but on some remote server, for example,
      // when using companion in combination with Instagram.
    });
  }

  remove = (fileId: string): void => {
    if (!this.#uppy) {
      return;
    }

    this.#uppy.removeFile(fileId);
  }

  disable(value: boolean) {
    if (!this.#uppy) {
      return;
    }

    const dashboard = this.#uppy.getPlugin('Dashboard');
    if (dashboard) {
      dashboard.setOptions({ disabled: value });
    }
  }

  upload = (data: {endpoint: string, headers?: Record<string,string>}) => {
    if (!this.#uppy) {
      return;
    }

    const xhrUpload = this.#uppy.getPlugin('XHRUpload');
    if (!xhrUpload) {
      return;
    }

    xhrUpload.setOptions({
      endpoint: data.endpoint,
      headers: data.headers ?? {}
    });
    this.#uppy.upload();
  }

  cleanAllFiles = () => {
    if (!this.#uppy) {
      return;
    }

    this.#uppy.cancelAll();
  }

  destroy = (): void => {
    this.#uppy?.destroy();
    this.#uppy = null;
  }

  #normalizeLoadFile = (data: BizyFileUploaderInputFile): Partial<BizyFileUploaderLoadFile> & {file: File} => {
    if (this.#isLoadFile(data)) {
      return data;
    }

    return { file: data };
  }

  #isLoadFile = (data: BizyFileUploaderInputFile): data is BizyFileUploaderLoadFile => {
    return typeof data === 'object' && data !== null && 'file' in data;
  }

  #removeUnnecessaryOptions = (remove: boolean) => {
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

      const addMoreFilesButton = this.#document.getElementsByClassName(
        'uppy-DashboardContent-addMore'
      )[0];
      if (addMoreFilesButton) {
        this.#renderer.setStyle(addMoreFilesButton, 'display', 'none');
      }

      const doneButton = this.#document.getElementsByClassName('uppy-StatusBar-actionBtn--done')[0];
      if (doneButton) {
        this.#renderer.setStyle(doneButton, 'display', 'none');
      }
    }, 0);
  }
}
