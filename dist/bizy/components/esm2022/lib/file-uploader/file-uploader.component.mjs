import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BizyFileUploaderService } from './file-uploader.service';
import * as i0 from "@angular/core";
export class BizyFileUploaderComponent {
    #fileUploader = inject(BizyFileUploaderService);
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
    hideUploadButton = true;
    hidePauseResumeButton = true;
    hideCancelButton = false;
    disableLocalFiles = false;
    load;
    upload;
    set disabled(value) {
        this.#fileUploader.disable(Boolean(value));
    }
    ;
    completed = new EventEmitter();
    loadedFiles = new EventEmitter();
    #subscription = new Subscription();
    #files = new Set();
    TEMPLATE_ID = 'bizy-file-uploader-template';
    ngAfterViewInit() {
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
                    this.completed.emit({ successful: [], failed: [] });
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
            const successful = [];
            const failed = [];
            res.successful.forEach(_file => {
                if (_file.response && _file.response.body && _file.response.body.fileId) {
                    successful.push({ fileId: _file.response.body.fileId, meta: _file.meta });
                }
            });
            res.failed.forEach(_file => {
                if (_file.response && _file.response.body && _file.response.body.fileId) {
                    failed.push({ fileId: _file.response.body.fileId, meta: _file.meta });
                }
            });
            this.completed.emit({ successful, failed });
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFileUploaderComponent, selector: "bizy-file-uploader", inputs: { dragDropAreaWidth: "dragDropAreaWidth", dragDropAreaHeight: "dragDropAreaHeight", language: "language", headers: "headers", maxFileSize: "maxFileSize", minFileSize: "minFileSize", maxTotalFileSize: "maxTotalFileSize", maxNumberOfFiles: "maxNumberOfFiles", minNumberOfFiles: "minNumberOfFiles", allowedFileTypes: "allowedFileTypes", hideUploadButton: "hideUploadButton", hidePauseResumeButton: "hidePauseResumeButton", hideCancelButton: "hideCancelButton", disableLocalFiles: "disableLocalFiles", load: "load", upload: "upload", disabled: "disabled" }, outputs: { completed: "completed", loadedFiles: "loadedFiles" }, providers: [BizyFileUploaderService], ngImport: i0, template: '<div [id]="TEMPLATE_ID"></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-file-uploader',
                    template: '<div [id]="TEMPLATE_ID"></div>',
                    providers: [BizyFileUploaderService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { dragDropAreaWidth: [{
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
            }], hideUploadButton: [{
                type: Input
            }], hidePauseResumeButton: [{
                type: Input
            }], hideCancelButton: [{
                type: Input
            }], disableLocalFiles: [{
                type: Input
            }], load: [{
                type: Input
            }], upload: [{
                type: Input
            }], disabled: [{
                type: Input
            }], completed: [{
                type: Output
            }], loadedFiles: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsZS11cGxvYWRlci9maWxlLXVwbG9hZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVcsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE9BQU8sRUFBaUIsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQVUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFPbEUsTUFBTSxPQUFPLHlCQUF5QjtJQUMzQixhQUFhLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDaEQsaUJBQWlCLEdBQVcsTUFBTSxDQUFDO0lBQ25DLGtCQUFrQixHQUFXLE9BQU8sQ0FBQztJQUNyQyxRQUFRLEdBQWdCLElBQUksQ0FBQztJQUM3QixPQUFPLEdBQTJCLEVBQUUsQ0FBQztJQUNyQyxXQUFXLEdBQWtCLElBQUksQ0FBQztJQUNsQyxXQUFXLEdBQWtCLElBQUksQ0FBQztJQUNsQyxnQkFBZ0IsR0FBa0IsUUFBUSxDQUFDLENBQUMsT0FBTztJQUNuRCxnQkFBZ0IsR0FBa0IsSUFBSSxDQUFDO0lBQ3ZDLGdCQUFnQixHQUFrQixJQUFJLENBQUM7SUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixnQkFBZ0IsR0FBWSxJQUFJLENBQUM7SUFDakMscUJBQXFCLEdBQVksSUFBSSxDQUFDO0lBQ3RDLGdCQUFnQixHQUFZLEtBQUssQ0FBQztJQUNsQyxpQkFBaUIsR0FBWSxLQUFLLENBQUM7SUFDbkMsSUFBSSxDQUFvQztJQUN4QyxNQUFNLENBQStEO0lBRTlFLElBQWEsUUFBUSxDQUFD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LEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFFTyxRQUFRO3NCQUFwQixLQUFLO2dCQUlJLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXBweUZpbGUgfSBmcm9tICdAdXBweS9jb3JlJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgaW5qZWN0LCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQml6eUZpbGVVcGxvYWRlclNlcnZpY2UgfSBmcm9tICcuL2ZpbGUtdXBsb2FkZXIuc2VydmljZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWZpbGUtdXBsb2FkZXInLFxuICB0ZW1wbGF0ZTogJzxkaXYgW2lkXT1cIlRFTVBMQVRFX0lEXCI+PC9kaXY+JyxcbiAgcHJvdmlkZXJzOiBbQml6eUZpbGVVcGxvYWRlclNlcnZpY2VdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RmlsZVVwbG9hZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgI2ZpbGVVcGxvYWRlciA9IGluamVjdChCaXp5RmlsZVVwbG9hZGVyU2VydmljZSk7XG4gIEBJbnB1dCgpIGRyYWdEcm9wQXJlYVdpZHRoOiBzdHJpbmcgPSAnMTAwJSc7XG4gIEBJbnB1dCgpIGRyYWdEcm9wQXJlYUhlaWdodDogc3RyaW5nID0gJzE2cmVtJztcbiAgQElucHV0KCkgbGFuZ3VhZ2U6ICdlcycgfCAnZW4nID0gJ2VzJztcbiAgQElucHV0KCkgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBASW5wdXQoKSBtYXhGaWxlU2l6ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG1pbkZpbGVTaXplOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbWF4VG90YWxGaWxlU2l6ZTogbnVtYmVyIHwgbnVsbCA9IDMxNDU4MDAwOyAvLyAzME1CXG4gIEBJbnB1dCgpIG1heE51bWJlck9mRmlsZXM6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBtaW5OdW1iZXJPZkZpbGVzOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgYWxsb3dlZEZpbGVUeXBlcyA9IFsnLndhdiddO1xuICBASW5wdXQoKSBoaWRlVXBsb2FkQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgaGlkZVBhdXNlUmVzdW1lQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgaGlkZUNhbmNlbEJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBkaXNhYmxlTG9jYWxGaWxlczogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBsb2FkOiBTdWJqZWN0PHtpZDogc3RyaW5nOyBmaWxlOiBGaWxlfT47XG4gIEBJbnB1dCgpIHVwbG9hZDogU3ViamVjdDx7ZW5kcG9pbnQ6IHN0cmluZywgaGVhZGVycz86IFJlY29yZDxzdHJpbmcsc3RyaW5nPn0+O1xuXG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuI2ZpbGVVcGxvYWRlci5kaXNhYmxlKEJvb2xlYW4odmFsdWUpKTtcbiAgfTtcblxuICBAT3V0cHV0KCkgY29tcGxldGVkID0gbmV3IEV2ZW50RW1pdHRlcjx7c3VjY2Vzc2Z1bDogQXJyYXk8e2ZpbGVJZDogc3RyaW5nLCBtZXRhOiB1bmtub3dufT4sIGZhaWxlZDogQXJyYXk8e2ZpbGVJZDogc3RyaW5nLCBtZXRhOiB1bmtub3dufT59PigpO1xuICBAT3V0cHV0KCkgbG9hZGVkRmlsZXMgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PFVwcHlGaWxlPj4oKTtcbiAgXG5cbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI2ZpbGVzOiBTZXQ8VXBweUZpbGU+ID0gbmV3IFNldCgpO1xuXG4gIHJlYWRvbmx5IFRFTVBMQVRFX0lEID0gJ2JpenktZmlsZS11cGxvYWRlci10ZW1wbGF0ZSc7XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuI2ZpbGVVcGxvYWRlci5jcmVhdGVGaWxlVXBsb2FkZXIoe1xuICAgICAgbWF4RmlsZVNpemU6IHRoaXMubWF4RmlsZVNpemUsXG4gICAgICBtaW5GaWxlU2l6ZTogdGhpcy5taW5GaWxlU2l6ZSxcbiAgICAgIG1heFRvdGFsRmlsZVNpemU6IHRoaXMubWF4VG90YWxGaWxlU2l6ZSxcbiAgICAgIG1heE51bWJlck9mRmlsZXM6IHRoaXMubWF4TnVtYmVyT2ZGaWxlcyxcbiAgICAgIG1pbk51bWJlck9mRmlsZXM6IHRoaXMubWluTnVtYmVyT2ZGaWxlcyxcbiAgICAgIGRyYWdEcm9wQXJlYVdpZHRoOiB0aGlzLmRyYWdEcm9wQXJlYVdpZHRoLFxuICAgICAgZHJhZ0Ryb3BBcmVhSGVpZ2h0OiB0aGlzLmRyYWdEcm9wQXJlYUhlaWdodCxcbiAgICAgIGFsbG93ZWRGaWxlVHlwZXM6IHRoaXMuYWxsb3dlZEZpbGVUeXBlcyxcbiAgICAgIGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxuICAgICAgdGVtcGxhdGVJZDogdGhpcy5URU1QTEFURV9JRCxcbiAgICAgIGhpZGVDYW5jZWxCdXR0b246IHRoaXMuaGlkZUNhbmNlbEJ1dHRvbixcbiAgICAgIGhpZGVVcGxvYWRCdXR0b246IHRoaXMuaGlkZVVwbG9hZEJ1dHRvbixcbiAgICAgIGhpZGVQYXVzZVJlc3VtZUJ1dHRvbjogdGhpcy5oaWRlUGF1c2VSZXN1bWVCdXR0b24sXG4gICAgICBkaXNhYmxlTG9jYWxGaWxlczogdGhpcy5kaXNhYmxlTG9jYWxGaWxlcyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnVwbG9hZCkge1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnVwbG9hZC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIGlmICh0aGlzLiNmaWxlcy5zaXplID09PSAwIHx8ICh0aGlzLm1pbk51bWJlck9mRmlsZXMgJiYgdGhpcy4jZmlsZXMuc2l6ZSA8IHRoaXMubWluTnVtYmVyT2ZGaWxlcykpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlZC5lbWl0KHtzdWNjZXNzZnVsOiBbXSwgZmFpbGVkOiBbXX0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICBcbiAgICAgICAgdGhpcy4jZmlsZVVwbG9hZGVyLnVwbG9hZChkYXRhKTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2FkKSB7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMubG9hZC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1heE51bWJlck9mRmlsZXMgJiYgdGhpcy4jZmlsZXMuc2l6ZSA+PSB0aGlzLm1heE51bWJlck9mRmlsZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHRoaXMuI2ZpbGVVcGxvYWRlci5sb2FkKGRhdGEpO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy4jZmlsZVVwbG9hZGVyLmNvbXBsZXRlJC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3NmdWw6IEFycmF5PHtmaWxlSWQ6IHN0cmluZywgbWV0YTogdW5rbm93bn0+ID0gW107XG4gICAgICBjb25zdCBmYWlsZWQ6IEFycmF5PHtmaWxlSWQ6IHN0cmluZywgbWV0YTogdW5rbm93bn0+ID0gW107XG4gICAgICByZXMuc3VjY2Vzc2Z1bC5mb3JFYWNoKF9maWxlID0+IHtcbiAgICAgICAgaWYgKF9maWxlLnJlc3BvbnNlICYmIF9maWxlLnJlc3BvbnNlLmJvZHkgJiYgX2ZpbGUucmVzcG9uc2UuYm9keS5maWxlSWQpIHtcbiAgICAgICAgICBzdWNjZXNzZnVsLnB1c2goe2ZpbGVJZDogX2ZpbGUucmVzcG9uc2UuYm9keS5maWxlSWQgYXMgc3RyaW5nLCBtZXRhOiBfZmlsZS5tZXRhfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzLmZhaWxlZC5mb3JFYWNoKF9maWxlID0+IHtcbiAgICAgICAgaWYgKF9maWxlLnJlc3BvbnNlICYmIF9maWxlLnJlc3BvbnNlLmJvZHkgJiYgX2ZpbGUucmVzcG9uc2UuYm9keS5maWxlSWQpIHtcbiAgICAgICAgICBmYWlsZWQucHVzaCh7ZmlsZUlkOiBfZmlsZS5yZXNwb25zZS5ib2R5LmZpbGVJZCBhcyBzdHJpbmcsIG1ldGE6IF9maWxlLm1ldGF9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmNvbXBsZXRlZC5lbWl0KHtzdWNjZXNzZnVsLCBmYWlsZWR9KTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuI2ZpbGVVcGxvYWRlci5maWxlTG9hZGVkJC5zdWJzY3JpYmUoZmlsZSA9PiB7XG4gICAgICB0aGlzLiNmaWxlcy5hZGQoZmlsZSk7XG4gICAgICB0aGlzLmxvYWRlZEZpbGVzLmVtaXQoQXJyYXkuZnJvbSh0aGlzLiNmaWxlcykpO1xuICAgIH0pKTtcblxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy4jZmlsZVVwbG9hZGVyLmZpbGVSZW1vdmVkJC5zdWJzY3JpYmUoZmlsZSA9PiB7XG4gICAgICB0aGlzLiNmaWxlcy5kZWxldGUoZmlsZSk7XG4gICAgICB0aGlzLmxvYWRlZEZpbGVzLmVtaXQoQXJyYXkuZnJvbSh0aGlzLiNmaWxlcykpO1xuICAgIH0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI2ZpbGVVcGxvYWRlci5jbGVhbkFsbEZpbGVzKCk7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==