import { SuccessResponse, UppyFile } from '@uppy/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizyFileUploaderService {
    #private;
    get fileLoaded$(): Observable<UppyFile>;
    get fileRemoved$(): Observable<UppyFile>;
    get upload$(): Observable<void>;
    get uploadSuccess$(): Observable<{
        file: UppyFile;
        response: SuccessResponse;
    }>;
    get error$(): Observable<{
        file?: UppyFile;
        error: Error;
    }>;
    get cancelAll$(): Observable<void>;
    get complete$(): Observable<{
        successful: Array<UppyFile>;
        failed: Array<UppyFile>;
    }>;
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
    }): void;
    load(data: {
        id: string;
        file: File;
    }): void;
    upload(data: {
        endpoint: string;
        headers?: Record<string, string>;
    }): void;
    cleanAllFiles(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFileUploaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyFileUploaderService>;
}
