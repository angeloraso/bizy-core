import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/dialog";
export class BizyPopupWrapperComponent {
    component;
    dialogRef;
    ref;
    dynamicComponentContainer;
    constructor(component, dialogRef, ref) {
        this.component = component;
        this.dialogRef = dialogRef;
        this.ref = ref;
    }
    ngAfterViewInit() {
        this.loadDynamicComponent();
    }
    loadDynamicComponent() {
        if (this.component) {
            this.dynamicComponentContainer.clear();
            this.dynamicComponentContainer.createComponent(this.component);
            this.ref.detectChanges();
        }
    }
    close() {
        this.dialogRef.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupWrapperComponent, deps: [{ token: DIALOG_DATA }, { token: DialogRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyPopupWrapperComponent, selector: "bizy-popup-wrapper", viewQueries: [{ propertyName: "dynamicComponentContainer", first: true, predicate: ["dynamicComponentContainer"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<div class=\"bizy-popup-wrapper\">\n\n    <button (click)=\"close()\" (keyup.enter)=\"close()\" class=\"bizy-popup-wrapper__close-button\">\n\n        <svg \n            data-name=\"Cancel button\"\n            id=\"bizy-popup-wrapper-close-svg\" \n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path id=\"bizy-popup-wrapper-close-svg-content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>", styles: [".bizy-popup-wrapper{position:relative;background-color:var(--bizy-popup-background-color);min-width:min(80vw,26rem);height:-moz-fit-content;height:fit-content}.bizy-popup-wrapper__close-button{position:absolute;right:.5rem;top:.5rem;border:none;cursor:pointer;background-color:transparent;transition:color .3s;z-index:1}.bizy-popup-wrapper__close-button #bizy-popup-wrapper-close-svg{height:1rem}.bizy-popup-wrapper__close-button #bizy-popup-wrapper-close-svg-content{fill:var(--bizy-popup-close-button-color)}.bizy-popup-wrapper__close-button:hover #bizy-popup-wrapper-close-svg-content{fill:var(--bizy-popup-close-button-hover-color)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-popup-wrapper', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-popup-wrapper\">\n\n    <button (click)=\"close()\" (keyup.enter)=\"close()\" class=\"bizy-popup-wrapper__close-button\">\n\n        <svg \n            data-name=\"Cancel button\"\n            id=\"bizy-popup-wrapper-close-svg\" \n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path id=\"bizy-popup-wrapper-close-svg-content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>", styles: [".bizy-popup-wrapper{position:relative;background-color:var(--bizy-popup-background-color);min-width:min(80vw,26rem);height:-moz-fit-content;height:fit-content}.bizy-popup-wrapper__close-button{position:absolute;right:.5rem;top:.5rem;border:none;cursor:pointer;background-color:transparent;transition:color .3s;z-index:1}.bizy-popup-wrapper__close-button #bizy-popup-wrapper-close-svg{height:1rem}.bizy-popup-wrapper__close-button #bizy-popup-wrapper-close-svg-content{fill:var(--bizy-popup-close-button-color)}.bizy-popup-wrapper__close-button:hover #bizy-popup-wrapper-close-svg-content{fill:var(--bizy-popup-close-button-hover-color)}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DIALOG_DATA]
                }] }, { type: i1.DialogRef, decorators: [{
                    type: Inject,
                    args: [DialogRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { dynamicComponentContainer: [{
                type: ViewChild,
                args: ['dynamicComponentContainer', { read: ViewContainerRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3BvcHVwL3BvcHVwLXdyYXBwZXIvcG9wdXAtd3JhcHBlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3BvcHVwL3BvcHVwLXdyYXBwZXIvcG9wdXAtd3JhcHBlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFRM0gsTUFBTSxPQUFPLHlCQUF5QjtJQUlMO0lBQ0Y7SUFDUTtJQUwrQix5QkFBeUIsQ0FBbUI7SUFFaEgsWUFDK0IsU0FBMkIsRUFDN0IsU0FBMEIsRUFDbEIsR0FBc0I7UUFGNUIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDN0IsY0FBUyxHQUFULFNBQVMsQ0FBaUI7UUFDbEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDeEQsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDO3dHQXZCVSx5QkFBeUIsa0JBSTFCLFdBQVcsYUFDWCxTQUFTLGFBQ1QsaUJBQWlCOzRGQU5oQix5QkFBeUIsNktBQ1ksZ0JBQWdCLDZCQ1hsRSx5b0JBZ0JNOzs0RkROTyx5QkFBeUI7a0JBTnJDLFNBQVM7K0JBQ0Usb0JBQW9CLG1CQUdiLHVCQUF1QixDQUFDLE1BQU07OzBCQU01QyxNQUFNOzJCQUFDLFdBQVc7OzBCQUNsQixNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLGlCQUFpQjs0Q0FMeUMseUJBQXlCO3NCQUE1RixTQUFTO3VCQUFDLDJCQUEyQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRElBTE9HX0RBVEEsIERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kaWFsb2cnO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEluamVjdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktcG9wdXAtd3JhcHBlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wb3B1cC13cmFwcGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wb3B1cC13cmFwcGVyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5UG9wdXBXcmFwcGVyQ29tcG9uZW50PFQ+IHtcbiAgQFZpZXdDaGlsZCgnZHluYW1pY0NvbXBvbmVudENvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBkeW5hbWljQ29tcG9uZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRElBTE9HX0RBVEEpIHByaXZhdGUgY29tcG9uZW50OiBDb21wb25lbnRUeXBlPFQ+LFxuICAgIEBJbmplY3QoRGlhbG9nUmVmKSBwcml2YXRlIGRpYWxvZ1JlZjogRGlhbG9nUmVmPHZvaWQ+LFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMubG9hZER5bmFtaWNDb21wb25lbnQoKTtcbiAgfVxuXG4gIGxvYWREeW5hbWljQ29tcG9uZW50KCkge1xuICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgdGhpcy5keW5hbWljQ29tcG9uZW50Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KHRoaXMuY29tcG9uZW50KTtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG59IiwiPGRpdiBjbGFzcz1cImJpenktcG9wdXAtd3JhcHBlclwiPlxuXG4gICAgPGJ1dHRvbiAoY2xpY2spPVwiY2xvc2UoKVwiIChrZXl1cC5lbnRlcik9XCJjbG9zZSgpXCIgY2xhc3M9XCJiaXp5LXBvcHVwLXdyYXBwZXJfX2Nsb3NlLWJ1dHRvblwiPlxuXG4gICAgICAgIDxzdmcgXG4gICAgICAgICAgICBkYXRhLW5hbWU9XCJDYW5jZWwgYnV0dG9uXCJcbiAgICAgICAgICAgIGlkPVwiYml6eS1wb3B1cC13cmFwcGVyLWNsb3NlLXN2Z1wiIFxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyMDAgMjAwXCJcbiAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgIDxwYXRoIGlkPVwiYml6eS1wb3B1cC13cmFwcGVyLWNsb3NlLXN2Zy1jb250ZW50XCIgZD1cIk0xMTQsMTAwbDQ5LTQ5YTkuOSw5LjksMCwwLDAtMTQtMTRMMTAwLDg2LDUxLDM3QTkuOSw5LjksMCwwLDAsMzcsNTFsNDksNDlMMzcsMTQ5YTkuOSw5LjksMCwwLDAsMTQsMTRsNDktNDksNDksNDlhOS45LDkuOSwwLDAsMCwxNC0xNFpcIi8+XG4gICAgICAgIDwvc3ZnPlxuXG4gICAgPC9idXR0b24+XG5cbiAgICA8bmctY29udGFpbmVyICNkeW5hbWljQ29tcG9uZW50Q29udGFpbmVyPjwvbmctY29udGFpbmVyPlxuXG48L2Rpdj4iXX0=