import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { BizyFileUploaderService } from './file-uploader.service';
import * as i0 from "@angular/core";
import * as i1 from "./file-uploader.service";
export class BizyFileUploaderComponent {
    fileUploader;
    dragDropAreaWidth = '100%';
    dragDropAreaHeight = '16rem';
    language = 'es';
    headers = {};
    maxFileSize = null;
    minFileSize = null;
    maxTotalFileSize = 31458000; // 30MB
    maxNumberOfFiles = null;
    minNumberOfFiles = null;
    allowedFileTypes = ['.wav'];
    upload;
    completed = new EventEmitter();
    loadedFiles = new EventEmitter();
    #subscription = new Subscription();
    #files = new Set();
    TEMPLATE_ID = 'bizy-file-uploader-template';
    constructor(fileUploader) {
        this.fileUploader = fileUploader;
    }
    ngAfterViewInit() {
        this.fileUploader.createFileUploader({
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
            headers: this.headers,
        });
        this.#subscription.add(this.upload.subscribe(data => {
            if (this.#files.size === 0 || (this.minNumberOfFiles && this.#files.size < this.minNumberOfFiles)) {
                this.completed.emit({ successful: [], failed: [] });
                return;
            }
            this.fileUploader.upload(data);
        }));
        this.#subscription.add(this.fileUploader.complete$.subscribe(res => {
            const successful = [];
            const failed = [];
            res.successful.forEach(_file => {
                if (_file.response && _file.response.body && _file.response.body.fileId) {
                    successful.push(_file.response.body.fileId);
                }
            });
            res.failed.forEach(_file => {
                if (_file.response && _file.response.body && _file.response.body.fileId) {
                    successful.push(_file.response.body.fileId);
                }
            });
            this.completed.emit({ successful, failed });
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderComponent, deps: [{ token: BizyFileUploaderService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFileUploaderComponent, selector: "bizy-file-uploader", inputs: { dragDropAreaWidth: "dragDropAreaWidth", dragDropAreaHeight: "dragDropAreaHeight", language: "language", headers: "headers", maxFileSize: "maxFileSize", minFileSize: "minFileSize", maxTotalFileSize: "maxTotalFileSize", maxNumberOfFiles: "maxNumberOfFiles", minNumberOfFiles: "minNumberOfFiles", allowedFileTypes: "allowedFileTypes", upload: "upload" }, outputs: { completed: "completed", loadedFiles: "loadedFiles" }, providers: [BizyFileUploaderService], ngImport: i0, template: "<div [id]=\"TEMPLATE_ID\"></div>", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-file-uploader', providers: [BizyFileUploaderService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [id]=\"TEMPLATE_ID\"></div>" }]
        }], ctorParameters: function () { return [{ type: i1.BizyFileUploaderService, decorators: [{
                    type: Inject,
                    args: [BizyFileUploaderService]
                }] }]; }, propDecorators: { dragDropAreaWidth: [{
                type: Input
            }], dragDropAreaHeight: [{
                type: Input
            }], language: [{
                type: Input
            }], headers: [{
                type: Input
            }], maxFileSize: [{
                type: Input
            }], minFileSize: [{
                type: Input
            }], maxTotalFileSize: [{
                type: Input
            }], maxNumberOfFiles: [{
                type: Input
            }], minNumberOfFiles: [{
                type: Input
            }], allowedFileTypes: [{
                type: Input
            }], upload: [{
                type: Input
            }], completed: [{
                type: Output
            }], loadedFiles: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsZS11cGxvYWRlci9maWxlLXVwbG9hZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVcsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE9BQU8sRUFBaUIsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBT2xFLE1BQU0sT0FBTyx5QkFBeUI7SUFzQk87SUFyQmxDLGlCQUFpQixHQUFXLE1BQU0sQ0FBQztJQUNuQyxrQkFBa0IsR0FBVyxPQUFPLENBQUM7SUFDckMsUUFBUSxHQUFnQixJQUFJLENBQUM7SUFDN0IsT0FBTyxHQUEyQixFQUFFLENBQUM7SUFDckMsV0FBVyxHQUFrQixJQUFJLENBQUM7SUFDbEMsV0FBVyxHQUFrQixJQUFJLENBQUM7SUFDbEMsZ0JBQWdCLEdBQWtCLFFBQVEsQ0FBQyxDQUFDLE9BQU87SUFDbkQsZ0JBQWdCLEdBQWtCLElBQUksQ0FBQztJQUN2QyxnQkFBZ0IsR0FBa0IsSUFBSSxDQUFDO0lBQ3ZDLGdCQUFnQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsTUFBTSxDQUErRDtJQUVwRSxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQXNELENBQUM7SUFDbkYsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO0lBRTVELGFBQWEsR0FBRyxJQUFJLFlBQVksRUFB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Z0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUVJLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXBweUZpbGUgfSBmcm9tICdAdXBweS9jb3JlJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlGaWxlVXBsb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9maWxlLXVwbG9hZGVyLnNlcnZpY2UnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1maWxlLXVwbG9hZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtdXBsb2FkZXIuaHRtbCcsXG4gIHByb3ZpZGVyczogW0JpenlGaWxlVXBsb2FkZXJTZXJ2aWNlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eUZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGRyYWdEcm9wQXJlYVdpZHRoOiBzdHJpbmcgPSAnMTAwJSc7XG4gIEBJbnB1dCgpIGRyYWdEcm9wQXJlYUhlaWdodDogc3RyaW5nID0gJzE2cmVtJztcbiAgQElucHV0KCkgbGFuZ3VhZ2U6ICdlcycgfCAnZW4nID0gJ2VzJztcbiAgQElucHV0KCkgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBASW5wdXQoKSBtYXhGaWxlU2l6ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG1pbkZpbGVTaXplOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbWF4VG90YWxGaWxlU2l6ZTogbnVtYmVyIHwgbnVsbCA9IDMxNDU4MDAwOyAvLyAzME1CXG4gIEBJbnB1dCgpIG1heE51bWJlck9mRmlsZXM6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBtaW5OdW1iZXJPZkZpbGVzOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgYWxsb3dlZEZpbGVUeXBlcyA9IFsnLndhdiddO1xuICBASW5wdXQoKSB1cGxvYWQ6IFN1YmplY3Q8e2VuZHBvaW50OiBzdHJpbmcsIGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLHN0cmluZz59PjtcblxuICBAT3V0cHV0KCkgY29tcGxldGVkID0gbmV3IEV2ZW50RW1pdHRlcjx7c3VjY2Vzc2Z1bDogQXJyYXk8c3RyaW5nPiwgZmFpbGVkOiBBcnJheTxzdHJpbmc+fT4oKTtcbiAgQE91dHB1dCgpIGxvYWRlZEZpbGVzID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxVcHB5RmlsZT4+KCk7XG5cbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI2ZpbGVzOiBTZXQ8VXBweUZpbGU+ID0gbmV3IFNldCgpO1xuXG4gIHJlYWRvbmx5IFRFTVBMQVRFX0lEID0gJ2JpenktZmlsZS11cGxvYWRlci10ZW1wbGF0ZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChCaXp5RmlsZVVwbG9hZGVyU2VydmljZSkgcHJpdmF0ZSBmaWxlVXBsb2FkZXI6IEJpenlGaWxlVXBsb2FkZXJTZXJ2aWNlLFxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZmlsZVVwbG9hZGVyLmNyZWF0ZUZpbGVVcGxvYWRlcih7XG4gICAgICBtYXhGaWxlU2l6ZTogdGhpcy5tYXhGaWxlU2l6ZSxcbiAgICAgIG1pbkZpbGVTaXplOiB0aGlzLm1pbkZpbGVTaXplLFxuICAgICAgbWF4VG90YWxGaWxlU2l6ZTogdGhpcy5tYXhUb3RhbEZpbGVTaXplLFxuICAgICAgbWF4TnVtYmVyT2ZGaWxlczogdGhpcy5tYXhOdW1iZXJPZkZpbGVzLFxuICAgICAgbWluTnVtYmVyT2ZGaWxlczogdGhpcy5taW5OdW1iZXJPZkZpbGVzLFxuICAgICAgZHJhZ0Ryb3BBcmVhV2lkdGg6IHRoaXMuZHJhZ0Ryb3BBcmVhV2lkdGgsXG4gICAgICBkcmFnRHJvcEFyZWFIZWlnaHQ6IHRoaXMuZHJhZ0Ryb3BBcmVhSGVpZ2h0LFxuICAgICAgYWxsb3dlZEZpbGVUeXBlczogdGhpcy5hbGxvd2VkRmlsZVR5cGVzLFxuICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICB0ZW1wbGF0ZUlkOiB0aGlzLlRFTVBMQVRFX0lELFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pO1xuXG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnVwbG9hZC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBpZiAodGhpcy4jZmlsZXMuc2l6ZSA9PT0gMCB8fCAodGhpcy5taW5OdW1iZXJPZkZpbGVzICYmIHRoaXMuI2ZpbGVzLnNpemUgPCB0aGlzLm1pbk51bWJlck9mRmlsZXMpKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkLmVtaXQoe3N1Y2Nlc3NmdWw6IFtdLCBmYWlsZWQ6IFtdfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maWxlVXBsb2FkZXIudXBsb2FkKGRhdGEpO1xuICAgIH0pKTtcblxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5maWxlVXBsb2FkZXIuY29tcGxldGUkLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgY29uc3Qgc3VjY2Vzc2Z1bDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgY29uc3QgZmFpbGVkOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICByZXMuc3VjY2Vzc2Z1bC5mb3JFYWNoKF9maWxlID0+IHtcbiAgICAgICAgaWYgKF9maWxlLnJlc3BvbnNlICYmIF9maWxlLnJlc3BvbnNlLmJvZHkgJiYgX2ZpbGUucmVzcG9uc2UuYm9keS5maWxlSWQpIHtcbiAgICAgICAgICBzdWNjZXNzZnVsLnB1c2goX2ZpbGUucmVzcG9uc2UuYm9keS5maWxlSWQgYXMgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXMuZmFpbGVkLmZvckVhY2goX2ZpbGUgPT4ge1xuICAgICAgICBpZiAoX2ZpbGUucmVzcG9uc2UgJiYgX2ZpbGUucmVzcG9uc2UuYm9keSAmJiBfZmlsZS5yZXNwb25zZS5ib2R5LmZpbGVJZCkge1xuICAgICAgICAgIHN1Y2Nlc3NmdWwucHVzaChfZmlsZS5yZXNwb25zZS5ib2R5LmZpbGVJZCBhcyBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY29tcGxldGVkLmVtaXQoe3N1Y2Nlc3NmdWwsIGZhaWxlZH0pO1xuICAgIH0pKTtcblxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5maWxlVXBsb2FkZXIuZmlsZUxvYWRlZCQuc3Vic2NyaWJlKGZpbGUgPT4ge1xuICAgICAgdGhpcy4jZmlsZXMuYWRkKGZpbGUpO1xuICAgICAgdGhpcy5sb2FkZWRGaWxlcy5lbWl0KEFycmF5LmZyb20odGhpcy4jZmlsZXMpKTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuZmlsZVVwbG9hZGVyLmZpbGVSZW1vdmVkJC5zdWJzY3JpYmUoZmlsZSA9PiB7XG4gICAgICB0aGlzLiNmaWxlcy5kZWxldGUoZmlsZSk7XG4gICAgICB0aGlzLmxvYWRlZEZpbGVzLmVtaXQoQXJyYXkuZnJvbSh0aGlzLiNmaWxlcykpO1xuICAgIH0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZmlsZVVwbG9hZGVyLmNsZWFuQWxsRmlsZXMoKTtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGRpdiBbaWRdPVwiVEVNUExBVEVfSURcIj48L2Rpdj4iXX0=