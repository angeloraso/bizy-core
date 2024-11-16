import { Subject } from 'rxjs';
import { UppyFile } from '@uppy/core';
import { AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { BizyFileUploaderService } from './file-uploader.service';
import * as i0 from "@angular/core";
export declare class BizyFileUploaderComponent implements AfterViewInit, OnDestroy {
    #private;
    private fileUploader;
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
    upload: Subject<{
        endpoint: string;
        headers?: Record<string, string>;
    }>;
    completed: EventEmitter<{
        successful: Array<string>;
        failed: Array<string>;
    }>;
    loadedFiles: EventEmitter<UppyFile[]>;
    readonly TEMPLATE_ID = "bizy-file-uploader-template";
    constructor(fileUploader: BizyFileUploaderService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFileUploaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFileUploaderComponent, "bizy-file-uploader", never, { "dragDropAreaWidth": { "alias": "dragDropAreaWidth"; "required": false; }; "dragDropAreaHeight": { "alias": "dragDropAreaHeight"; "required": false; }; "language": { "alias": "language"; "required": false; }; "headers": { "alias": "headers"; "required": false; }; "maxFileSize": { "alias": "maxFileSize"; "required": false; }; "minFileSize": { "alias": "minFileSize"; "required": false; }; "maxTotalFileSize": { "alias": "maxTotalFileSize"; "required": false; }; "maxNumberOfFiles": { "alias": "maxNumberOfFiles"; "required": false; }; "minNumberOfFiles": { "alias": "minNumberOfFiles"; "required": false; }; "allowedFileTypes": { "alias": "allowedFileTypes"; "required": false; }; "upload": { "alias": "upload"; "required": false; }; }, { "completed": "completed"; "loadedFiles": "loadedFiles"; }, never, never, false, never>;
}
