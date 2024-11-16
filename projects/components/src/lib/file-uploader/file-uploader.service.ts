import Uppy, { ErrorResponse, SuccessResponse, UppyFile } from '@uppy/core';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
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

@Injectable()
export class BizyFileUploaderService {
    #fileLoaded = new Subject<UppyFile>();
    #fileRemoved = new Subject<UppyFile>();
    #upload = new Subject<void>();
    #uploadSuccess = new Subject<{file: UppyFile, response: SuccessResponse}>();
    #error = new Subject<{ file?: UppyFile; error: Error, response?: ErrorResponse }>();
    #cancelAll = new Subject<void>();
    #complete = new Subject<{ successful: Array<UppyFile>; failed: Array<UppyFile> }>();

    #uppy: Uppy;

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
        headers: Record<string, string>;
    }): void {
      const locale = data.language === 'es' ? ES : EN;
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
          target: `#${data.templateId}`,
          width: data.dragDropAreaWidth,
          height: data.dragDropAreaHeight,
          hideUploadButton: true,
          hidePauseResumeButton: true
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
          this.#fileLoaded.next(file);
        })
        .on('file-removed', file => {
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
          this.#complete.next(result);
        });
    }

    load(data: { id: string; file: File }): void {
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

    upload(data: {endpoint: string, headers?: Record<string,string>}) {
      this.#uppy.getPlugin('XHRUpload')!.setOptions({
        endpoint: data.endpoint,
        headers: data.headers ?? {}
      });
      this.#uppy.upload();
    }

    cleanAllFiles() {
      this.#uppy.cancelAll();
    }
}
