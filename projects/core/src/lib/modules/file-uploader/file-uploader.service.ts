import Uppy, { ErrorResponse, SuccessResponse, UppyFile } from '@uppy/core';
import { Observable, Subject } from 'rxjs';
import { Injectable, Renderer2, inject, DOCUMENT } from '@angular/core';
import es_ES from '@uppy/locales/lib/es_ES';
import en_US from '@uppy/locales/lib/en_US';
import Dashboard from '@uppy/dashboard';
import XHRUpload from '@uppy/xhr-upload';


const ES = { 
  ...es_ES,
  strings: {
    ...es_ES.strings,
    noDuplicates: 'Archivo duplicado: \'%{fileName}\'',
    browseFiles: 'buscar archivo',
    dropPasteFiles: 'Soltar archivo aquí, pegar o %{browse}'

  }
};

const EN = { 
  ...en_US,
  strings: {
    ...en_US.strings,
    noDuplicates: 'Duplicated file: \'%{fileName}\'',
    browseFiles: 'browse file',
    dropPasteFiles: 'Drop a file here or %{browse}'
  }
};

@Injectable({
  providedIn: 'root'
})
export class BizyFileUploaderService {
  #renderer = inject(Renderer2);
  #document = inject(DOCUMENT);
  #fileLoaded = new Subject<UppyFile>();
  #fileRemoved = new Subject<UppyFile>();
  #upload = new Subject<void>();
  #uploadSuccess = new Subject<{file: UppyFile, response: SuccessResponse}>();
  #error = new Subject<{ file?: UppyFile; error: Error, response?: ErrorResponse }>();
  #cancelAll = new Subject<void>();
  #complete = new Subject<{ successful: Array<UppyFile>; failed: Array<UppyFile> }>();
  #disableLocalFiles: boolean = false;

  #uppy: Uppy | null = null;

  get fileLoaded$(): Observable<UppyFile> {
    return this.#fileLoaded.asObservable();
  }

  get fileRemoved$(): Observable<UppyFile> {
    return this.#fileRemoved.asObservable();
  }

  get upload$(): Observable<void> {
    return this.#upload.asObservable();
  }

  get uploadSuccess$(): Observable<{file: UppyFile, response: SuccessResponse}> {
    return this.#uploadSuccess.asObservable();
  }

  get error$(): Observable<{ file?: UppyFile; error: Error }> {
    return this.#error.asObservable();
  }

  get cancelAll$(): Observable<void> {
    return this.#cancelAll.asObservable();
  }

  get complete$(): Observable<{ successful: Array<UppyFile>; failed: Array<UppyFile> }> {
    return this.#complete.asObservable();
  }

  createFileUploader(data: {
      maxFileSize: number | null;
      minFileSize: number | null;
      maxTotalFileSize: number | null;
      maxNumberOfFiles: number | null;
      minNumberOfFiles: number | null;
      dragDropAreaWidth: string;
      dragDropAreaHeight: string;
      allowedFileTypes: Array<string>;
      language: 'es' | 'en';
      templateId: string;
      hideCancelButton: boolean,
      hideUploadButton: boolean,
      hidePauseResumeButton: boolean,
      disableLocalFiles: boolean,
      headers: Record<string, string>;
  }): void {
    const locale = data.language === 'es' ? ES : EN;
    this.#disableLocalFiles = data.disableLocalFiles;
    this.#uppy = new Uppy({
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
    })
      .use(Dashboard, {
        inline: true,
        singleFileFullScreen: false,
        target: `#${data.templateId}`,
        width: data.dragDropAreaWidth,
        height: data.dragDropAreaHeight,
        hideCancelButton: data.hideCancelButton,
        hideUploadButton: data.hideUploadButton,
        hidePauseResumeButton: data.hidePauseResumeButton,
        disableLocalFiles: data.disableLocalFiles
      })
      .use(XHRUpload, {
        endpoint: '',
        headers: data.headers,
        getResponseData: (responseText, response) => {
          return {
            fileId: responseText,
            response
          };
        }
      })
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
        this.#complete.next(result);
      });
      
      this.#removeUnnecessaryOptions(this.#disableLocalFiles);
  }

  load = (data: { id: string; file: File }): void => {
    if (!this.#uppy) {
      return;
    }

    this.#uppy.addFile({
      name: data.file.name, // File name
      type: data.file.type, // File type
      data: data.file, // File blob
      meta: {
        // Optional, store the directory path of a file so Uppy can tell identical files in different directories apart.
        relativePath: data.file.webkitRelativePath,
        referenceId: data.id
      },
      source: 'Local', // Optional, determines the source of the file, for example, Instagram.
      isRemote: false // Optional, set to true if actual file is not in the browser, but on some remote server, for example,
      // when using companion in combination with Instagram.
    });
  }

  disable(value: boolean) {
    if (!this.#uppy) {
      return;
    }

    const dashboard = this.#uppy.getPlugin('Dashboard');
    dashboard.setOptions({ disabled: value });
  }

  upload = (data: {endpoint: string, headers?: Record<string,string>}) => {
    if (!this.#uppy) {
      return;
    }

    this.#uppy.getPlugin('XHRUpload')!.setOptions({
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
