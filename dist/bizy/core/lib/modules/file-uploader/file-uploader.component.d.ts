import { Subject } from 'rxjs';
import { UppyFile } from '@uppy/core';
import { AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyFileUploaderComponent implements AfterViewInit, OnDestroy {
    #private;
    dragDropAreaWidth: string;
    dragDropAreaHeight: string;
    language: 'es' | 'en';
    headers: Record<string, string>;
    maxFileSize: number | null;
    minFileSize: number | null;
    maxTotalFileSize: number | null;
    maxNumberOfFiles: number | null;
    minNumberOfFiles: number | null;
    allowedFileTypes: string[];
    hideUploadButton: boolean;
    hidePauseResumeButton: boolean;
    hideCancelButton: boolean;
    disableLocalFiles: boolean;
    load: Subject<{
        id: string;
        file: File;
    }>;
    upload: Subject<{
        endpoint: string;
        headers?: Record<string, string>;
    }>;
    set disabled(value: boolean);
    completed: EventEmitter<{
        successful: Array<{
            fileId: string;
            meta: unknown;
        }>;
        failed: Array<{
            fileId: string;
            meta: unknown;
        }>;
    }>;
    loadedFiles: EventEmitter<UppyFile[]>;
    readonly TEMPLATE_ID = "bizy-file-uploader-template";
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFileUploaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFileUploaderComponent, "bizy-file-uploader", never, { "dragDropAreaWidth": { "alias": "dragDropAreaWidth"; "required": false; }; "dragDropAreaHeight": { "alias": "dragDropAreaHeight"; "required": false; }; "language": { "alias": "language"; "required": false; }; "headers": { "alias": "headers"; "required": false; }; "maxFileSize": { "alias": "maxFileSize"; "required": false; }; "minFileSize": { "alias": "minFileSize"; "required": false; }; "maxTotalFileSize": { "alias": "maxTotalFileSize"; "required": false; }; "maxNumberOfFiles": { "alias": "maxNumberOfFiles"; "required": false; }; "minNumberOfFiles": { "alias": "minNumberOfFiles"; "required": false; }; "allowedFileTypes": { "alias": "allowedFileTypes"; "required": false; }; "hideUploadButton": { "alias": "hideUploadButton"; "required": false; }; "hidePauseResumeButton": { "alias": "hidePauseResumeButton"; "required": false; }; "hideCancelButton": { "alias": "hideCancelButton"; "required": false; }; "disableLocalFiles": { "alias": "disableLocalFiles"; "required": false; }; "load": { "alias": "load"; "required": false; }; "upload": { "alias": "upload"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "completed": "completed"; "loadedFiles": "loadedFiles"; }, never, never, true, never>;
}
