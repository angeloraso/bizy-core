import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/dialog";
export class PopupWrapperComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PopupWrapperComponent, deps: [{ token: DIALOG_DATA }, { token: DialogRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: PopupWrapperComponent, selector: "bizy-popup-wrapper", viewQueries: [{ propertyName: "dynamicComponentContainer", first: true, predicate: ["dynamicComponentContainer"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<div class=\"bizy-popup-wrapper\">\n\n    <button (click)=\"close()\" (keyup.enter)=\"close()\" class=\"bizy-popup-wrapper__close-button\">\n\n        <svg \n            data-name=\"Cancel button\"\n            id=\"bizy-popup-wrapper-close-svg\" \n            viewBox=\"0 0 200 200\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path id=\"bizy-popup-wrapper-close-svg-content\" d=\"M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z\"/>\n        </svg>\n\n    </button>\n\n    <ng-container #dynamicComponentContainer></ng-container>\n\n</div>", styles: [".bizy-popup-wrapper{position:relative;background-color:var(--bizy-popup-background-color);min-width:min(80vw,26rem);height:-moz-fit-content;height:fit-content}.bizy-popup-wrapper__close-button{position:absolute;right:.5rem;top:.5rem;border:none;cursor:pointer;background-color:transparent;transition:color .3s;z-index:1}.bizy-popup-wrapper__close-button #bizy-popup-wrapper-close-svg{height:1rem}.bizy-popup-wrapper__close-button #bizy-popup-wrapper-close-svg-content{fill:var(--bizy-popup-close-button-color)}.bizy-popup-wrapper__close-button:hover #bizy-popup-wrapper-close-svg-content{fill:var(--bizy-popup-close-button-hover-color)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PopupWrapperComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3BvcHVwL3BvcHVwLXdyYXBwZXIvcG9wdXAtd3JhcHBlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3BvcHVwL3BvcHVwLXdyYXBwZXIvcG9wdXAtd3JhcHBlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBZ0IsTUFBTSxFQUFVLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUWpKLE1BQU0sT0FBTyxxQkFBcUI7SUFJRDtJQUNGO0lBQ1E7SUFMK0IseUJBQXlCLENBQW1CO0lBRWhILFlBQytCLFNBQTJCLEVBQzdCLFNBQTBCLEVBQ2xCLEdBQXNCO1FBRjVCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzdCLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQ2xCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQ3hELENBQUM7SUFFSixlQUFlO1FBQ2IsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQzt3R0F2QlUscUJBQXFCLGtCQUl0QixXQUFXLGFBQ1gsU0FBUyxhQUNULGlCQUFpQjs0RkFOaEIscUJBQXFCLDZLQUNnQixnQkFBZ0IsNkJDWGxFLHlvQkFnQk07OzRGRE5PLHFCQUFxQjtrQkFOakMsU0FBUzsrQkFDRSxvQkFBb0IsbUJBR2IsdUJBQXVCLENBQUMsTUFBTTs7MEJBTTVDLE1BQU07MkJBQUMsV0FBVzs7MEJBQ2xCLE1BQU07MkJBQUMsU0FBUzs7MEJBQ2hCLE1BQU07MkJBQUMsaUJBQWlCOzRDQUx5Qyx5QkFBeUI7c0JBQTVGLFNBQVM7dUJBQUMsMkJBQTJCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBESUFMT0dfREFUQSwgRGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RpYWxvZyc7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIE91dHB1dCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktcG9wdXAtd3JhcHBlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wb3B1cC13cmFwcGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wb3B1cC13cmFwcGVyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cFdyYXBwZXJDb21wb25lbnQ8VD4ge1xuICBAVmlld0NoaWxkKCdkeW5hbWljQ29tcG9uZW50Q29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIGR5bmFtaWNDb21wb25lbnRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChESUFMT0dfREFUQSkgcHJpdmF0ZSBjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8VD4sXG4gICAgQEluamVjdChEaWFsb2dSZWYpIHByaXZhdGUgZGlhbG9nUmVmOiBEaWFsb2dSZWY8dm9pZD4sXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5sb2FkRHluYW1pY0NvbXBvbmVudCgpO1xuICB9XG5cbiAgbG9hZER5bmFtaWNDb21wb25lbnQoKSB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRDb250YWluZXIuY2xlYXIoKTtcbiAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQodGhpcy5jb21wb25lbnQpO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cbn0iLCI8ZGl2IGNsYXNzPVwiYml6eS1wb3B1cC13cmFwcGVyXCI+XG5cbiAgICA8YnV0dG9uIChjbGljayk9XCJjbG9zZSgpXCIgKGtleXVwLmVudGVyKT1cImNsb3NlKClcIiBjbGFzcz1cImJpenktcG9wdXAtd3JhcHBlcl9fY2xvc2UtYnV0dG9uXCI+XG5cbiAgICAgICAgPHN2ZyBcbiAgICAgICAgICAgIGRhdGEtbmFtZT1cIkNhbmNlbCBidXR0b25cIlxuICAgICAgICAgICAgaWQ9XCJiaXp5LXBvcHVwLXdyYXBwZXItY2xvc2Utc3ZnXCIgXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDIwMCAyMDBcIlxuICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgPHBhdGggaWQ9XCJiaXp5LXBvcHVwLXdyYXBwZXItY2xvc2Utc3ZnLWNvbnRlbnRcIiBkPVwiTTExNCwxMDBsNDktNDlhOS45LDkuOSwwLDAsMC0xNC0xNEwxMDAsODYsNTEsMzdBOS45LDkuOSwwLDAsMCwzNyw1MWw0OSw0OUwzNywxNDlhOS45LDkuOSwwLDAsMCwxNCwxNGw0OS00OSw0OSw0OWE5LjksOS45LDAsMCwwLDE0LTE0WlwiLz5cbiAgICAgICAgPC9zdmc+XG5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxuZy1jb250YWluZXIgI2R5bmFtaWNDb21wb25lbnRDb250YWluZXI+PC9uZy1jb250YWluZXI+XG5cbjwvZGl2PiJdfQ==