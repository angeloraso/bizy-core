import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { BizyFileUploaderService } from './file-uploader.service';
import * as i0 from "@angular/core";
import * as i1 from "./file-uploader.service";
export class BizyFileUploaderComponent {
    fileUploader;
    tenantId = null;
    dragDropAreaWidth = '100%';
    dragDropAreaHeight = '16rem';
    language = 'es';
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFileUploaderComponent, selector: "bizy-file-uploader", inputs: { tenantId: "tenantId", dragDropAreaWidth: "dragDropAreaWidth", dragDropAreaHeight: "dragDropAreaHeight", language: "language", maxFileSize: "maxFileSize", minFileSize: "minFileSize", maxTotalFileSize: "maxTotalFileSize", maxNumberOfFiles: "maxNumberOfFiles", minNumberOfFiles: "minNumberOfFiles", allowedFileTypes: "allowedFileTypes", upload: "upload" }, outputs: { completed: "completed", loadedFiles: "loadedFiles" }, providers: [BizyFileUploaderService], ngImport: i0, template: "<div [id]=\"TEMPLATE_ID\"></div>", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFileUploaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-file-uploader', providers: [BizyFileUploaderService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [id]=\"TEMPLATE_ID\"></div>" }]
        }], ctorParameters: function () { return [{ type: i1.BizyFileUploaderService, decorators: [{
                    type: Inject,
                    args: [BizyFileUploaderService]
                }] }]; }, propDecorators: { tenantId: [{
                type: Input
            }], dragDropAreaWidth: [{
                type: Input
            }], dragDropAreaHeight: [{
                type: Input
            }], language: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsZS11cGxvYWRlci9maWxlLXVwbG9hZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVcsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE9BQU8sRUFBaUIsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBT2xFLE1BQU0sT0FBTyx5QkFBeUI7SUFzQk87SUFyQmxDLFFBQVEsR0FBa0IsSUFBSSxDQUFDO0lBQy9CLGlCQUFpQixHQUFXLE1BQU0sQ0FBQztJQUNuQyxrQkFBa0IsR0FBVyxPQUFPLENBQUM7SUFDckMsUUFBUSxHQUFnQixJQUFJLENBQUM7SUFDN0IsV0FBVyxHQUFrQixJQUFJLENBQUM7SUFDbEMsV0FBVyxHQUFrQixJQUFJLENBQUM7SUFDbEMsZ0JBQWdCLEdBQWtCLFFBQVEsQ0FBQyxDQUFDLE9BQU87SUFDbkQsZ0JBQWdCLEdBQWtCLElBQUksQ0FBQztJQUN2QyxnQkFBZ0IsR0FBa0IsSUFBSSxDQUFDO0lBQ3ZDLGdCQUFnQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsTUFBTSxDQUF3QztJQUU3QyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQXNELENBQUM7SUFDbkYsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO0lBRTVELGFBQWEsR0FBRyxJQUFJLFlBQVksRUFB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O3NCQUFuQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFFSSxTQUFTO3NCQUFsQixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVwcHlGaWxlIH0gZnJvbSAnQHVwcHkvY29yZSc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5RmlsZVVwbG9hZGVyU2VydmljZSB9IGZyb20gJy4vZmlsZS11cGxvYWRlci5zZXJ2aWNlJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZmlsZS11cGxvYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLXVwbG9hZGVyLmh0bWwnLFxuICBwcm92aWRlcnM6IFtCaXp5RmlsZVVwbG9hZGVyU2VydmljZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlGaWxlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB0ZW5hbnRJZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRyYWdEcm9wQXJlYVdpZHRoOiBzdHJpbmcgPSAnMTAwJSc7XG4gIEBJbnB1dCgpIGRyYWdEcm9wQXJlYUhlaWdodDogc3RyaW5nID0gJzE2cmVtJztcbiAgQElucHV0KCkgbGFuZ3VhZ2U6ICdlcycgfCAnZW4nID0gJ2VzJztcbiAgQElucHV0KCkgbWF4RmlsZVNpemU6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBtaW5GaWxlU2l6ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG1heFRvdGFsRmlsZVNpemU6IG51bWJlciB8IG51bGwgPSAzMTQ1ODAwMDsgLy8gMzBNQlxuICBASW5wdXQoKSBtYXhOdW1iZXJPZkZpbGVzOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbWluTnVtYmVyT2ZGaWxlczogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGFsbG93ZWRGaWxlVHlwZXMgPSBbJy53YXYnXTtcbiAgQElucHV0KCkgdXBsb2FkOiBTdWJqZWN0PHt1cmw6IHN0cmluZywgdG9rZW46IHN0cmluZ30+O1xuXG4gIEBPdXRwdXQoKSBjb21wbGV0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtzdWNjZXNzZnVsOiBBcnJheTxzdHJpbmc+LCBmYWlsZWQ6IEFycmF5PHN0cmluZz59PigpO1xuICBAT3V0cHV0KCkgbG9hZGVkRmlsZXMgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PFVwcHlGaWxlPj4oKTtcblxuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAjZmlsZXM6IFNldDxVcHB5RmlsZT4gPSBuZXcgU2V0KCk7XG5cbiAgcmVhZG9ubHkgVEVNUExBVEVfSUQgPSAnYml6eS1maWxlLXVwbG9hZGVyLXRlbXBsYXRlJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEJpenlGaWxlVXBsb2FkZXJTZXJ2aWNlKSBwcml2YXRlIGZpbGVVcGxvYWRlcjogQml6eUZpbGVVcGxvYWRlclNlcnZpY2UsXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRlbmFudElkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5maWxlVXBsb2FkZXIuY3JlYXRlRmlsZVVwbG9hZGVyKHtcbiAgICAgIG1heEZpbGVTaXplOiB0aGlzLm1heEZpbGVTaXplLFxuICAgICAgbWluRmlsZVNpemU6IHRoaXMubWluRmlsZVNpemUsXG4gICAgICBtYXhUb3RhbEZpbGVTaXplOiB0aGlzLm1heFRvdGFsRmlsZVNpemUsXG4gICAgICBtYXhOdW1iZXJPZkZpbGVzOiB0aGlzLm1heE51bWJlck9mRmlsZXMsXG4gICAgICBtaW5OdW1iZXJPZkZpbGVzOiB0aGlzLm1pbk51bWJlck9mRmlsZXMsXG4gICAgICBkcmFnRHJvcEFyZWFXaWR0aDogdGhpcy5kcmFnRHJvcEFyZWFXaWR0aCxcbiAgICAgIGRyYWdEcm9wQXJlYUhlaWdodDogdGhpcy5kcmFnRHJvcEFyZWFIZWlnaHQsXG4gICAgICBhbGxvd2VkRmlsZVR5cGVzOiB0aGlzLmFsbG93ZWRGaWxlVHlwZXMsXG4gICAgICB0ZW5hbnRJZDogU3RyaW5nKHRoaXMudGVuYW50SWQpLFxuICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICB0ZW1wbGF0ZUlkOiB0aGlzLlRFTVBMQVRFX0lEXG4gICAgfSk7XG5cbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMudXBsb2FkLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGlmICh0aGlzLiNmaWxlcy5zaXplID09PSAwIHx8ICh0aGlzLm1pbk51bWJlck9mRmlsZXMgJiYgdGhpcy4jZmlsZXMuc2l6ZSA8IHRoaXMubWluTnVtYmVyT2ZGaWxlcykpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQuZW1pdCh7c3VjY2Vzc2Z1bDogW10sIGZhaWxlZDogW119KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpbGVVcGxvYWRlci51cGxvYWQoZGF0YSk7XG4gICAgfSkpO1xuXG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmZpbGVVcGxvYWRlci5jb21wbGV0ZSQuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBjb25zdCBzdWNjZXNzZnVsOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICBjb25zdCBmYWlsZWQ6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgIHJlcy5zdWNjZXNzZnVsLmZvckVhY2goX2ZpbGUgPT4ge1xuICAgICAgICBpZiAoX2ZpbGUucmVzcG9uc2UgJiYgX2ZpbGUucmVzcG9uc2UuYm9keSAmJiBfZmlsZS5yZXNwb25zZS5ib2R5LmZpbGVJZCkge1xuICAgICAgICAgIHN1Y2Nlc3NmdWwucHVzaChfZmlsZS5yZXNwb25zZS5ib2R5LmZpbGVJZCBhcyBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlcy5mYWlsZWQuZm9yRWFjaChfZmlsZSA9PiB7XG4gICAgICAgIGlmIChfZmlsZS5yZXNwb25zZSAmJiBfZmlsZS5yZXNwb25zZS5ib2R5ICYmIF9maWxlLnJlc3BvbnNlLmJvZHkuZmlsZUlkKSB7XG4gICAgICAgICAgc3VjY2Vzc2Z1bC5wdXNoKF9maWxlLnJlc3BvbnNlLmJvZHkuZmlsZUlkIGFzIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5jb21wbGV0ZWQuZW1pdCh7c3VjY2Vzc2Z1bCwgZmFpbGVkfSk7XG4gICAgfSkpO1xuXG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmZpbGVVcGxvYWRlci5maWxlTG9hZGVkJC5zdWJzY3JpYmUoZmlsZSA9PiB7XG4gICAgICB0aGlzLiNmaWxlcy5hZGQoZmlsZSk7XG4gICAgICB0aGlzLmxvYWRlZEZpbGVzLmVtaXQoQXJyYXkuZnJvbSh0aGlzLiNmaWxlcykpO1xuICAgIH0pKTtcblxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5maWxlVXBsb2FkZXIuZmlsZVJlbW92ZWQkLnN1YnNjcmliZShmaWxlID0+IHtcbiAgICAgIHRoaXMuI2ZpbGVzLmRlbGV0ZShmaWxlKTtcbiAgICAgIHRoaXMubG9hZGVkRmlsZXMuZW1pdChBcnJheS5mcm9tKHRoaXMuI2ZpbGVzKSk7XG4gICAgfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5maWxlVXBsb2FkZXIuY2xlYW5BbGxGaWxlcygpO1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8ZGl2IFtpZF09XCJURU1QTEFURV9JRFwiPjwvZGl2PiJdfQ==