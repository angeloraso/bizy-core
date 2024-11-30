import { BizyMenuOptionComponent } from './menu-option/menu-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
export class BizyMenuComponent {
    ref;
    options;
    id = `bizy-menu-${Math.random()}`;
    disabled = false;
    offsetX = 0;
    offsetY = 0;
    customClass = '';
    hideArrow = false;
    opened = false;
    onSelect = new EventEmitter();
    _menuWidth;
    #subscription = new Subscription();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
        if (this.options && this.options.length > 0) {
            this.selectButton(event);
        }
    }
    selectButton(event) {
        this.opened = !this.opened;
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._menuWidth = event.srcElement.offsetWidth;
        }
        if (this.opened) {
            if (this.options) {
                this.options.forEach((option) => {
                    this.#subscription.add(option.onSelect.subscribe(event => {
                        this.close(event);
                    }));
                });
            }
        }
        else {
            this.#subscription.unsubscribe();
        }
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this.opened = false;
        this.ref.detectChanges();
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyMenuComponent, selector: "bizy-menu", inputs: { id: "id", disabled: "disabled", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", hideArrow: "hideArrow", opened: "opened" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizyMenuOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\"\n        *ngIf=\"!hideArrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayPush]=\"true\"\n    [cdkConnectedOverlayFlexibleDimensions]=\"true\"\n    [cdkConnectedOverlayViewportMargin]=\"8\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\">\n\n        <span class=\"bizy-menu__options__header\">\n            <ng-content select=\"bizy-menu-title\"></ng-content>\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu__options:empty) .bizy-menu>.bizy-menu__arrow{display:none!important}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:var(--bizy-menu-padding);color:var(--bizy-menu-color);cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:var(--bizy-menu-arrow-height);pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-menu-color)}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color);min-width:-moz-fit-content;min-width:fit-content;max-width:var(--bizy-menu-max-width);max-height:var(--bizy-menu-max-height);overflow-y:auto;overflow-x:hidden;width:100%;display:flex;flex-direction:column;position:relative;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-menu__options::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-menu__options::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-menu-scroll-bar-color)}.bizy-menu__options::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-menu-scroll-bar-hover-color)}.bizy-menu__options::-webkit-scrollbar-button{height:1rem}.bizy-menu__options__header{position:sticky;z-index:1;top:0;display:flex;flex-direction:column;row-gap:.3rem;background-color:#fff}::ng-deep .bizy-menu__options__header{--bizy-input-width: auto;--bizy-input-background-color: #fff;--bizy-input-min-width: var(--bizy-select-min-width);--bizy-input-max-width: auto}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\"\n        *ngIf=\"!hideArrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayPush]=\"true\"\n    [cdkConnectedOverlayFlexibleDimensions]=\"true\"\n    [cdkConnectedOverlayViewportMargin]=\"8\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\">\n\n        <span class=\"bizy-menu__options__header\">\n            <ng-content select=\"bizy-menu-title\"></ng-content>\n            <ng-content select=\"bizy-input\"></ng-content>\n        </span>\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu__options:empty) .bizy-menu>.bizy-menu__arrow{display:none!important}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:var(--bizy-menu-padding);color:var(--bizy-menu-color);cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:var(--bizy-menu-arrow-height);pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-menu-color)}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color);min-width:-moz-fit-content;min-width:fit-content;max-width:var(--bizy-menu-max-width);max-height:var(--bizy-menu-max-height);overflow-y:auto;overflow-x:hidden;width:100%;display:flex;flex-direction:column;position:relative;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-menu__options::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-menu__options::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-menu-scroll-bar-color)}.bizy-menu__options::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-menu-scroll-bar-hover-color)}.bizy-menu__options::-webkit-scrollbar-button{height:1rem}.bizy-menu__options__header{position:sticky;z-index:1;top:0;display:flex;flex-direction:column;row-gap:.3rem;background-color:#fff}::ng-deep .bizy-menu__options__header{--bizy-input-width: auto;--bizy-input-background-color: #fff;--bizy-input-min-width: var(--bizy-select-min-width);--bizy-input-max-width: auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizyMenuOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], offsetX: [{
                type: Input
            }], offsetY: [{
                type: Input
            }], customClass: [{
                type: Input
            }], hideArrow: [{
                type: Input
            }], opened: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvbWVudS9tZW51LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9tZW51L21lbnUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdkosT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQVFwQyxNQUFNLE9BQU8saUJBQWlCO0lBZW1CO0lBZEwsT0FBTyxDQUFzQztJQUM5RSxFQUFFLEdBQVcsYUFBYSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUMxQyxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLE9BQU8sR0FBVyxDQUFDLENBQUM7SUFDcEIsT0FBTyxHQUFXLENBQUMsQ0FBQztJQUNwQixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLFNBQVMsR0FBWSxLQUFLLENBQUM7SUFDM0IsTUFBTSxHQUFZLEtBQUssQ0FBQztJQUN2QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFFdEQsVUFBVSxDQUFTO0lBRW5CLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5DLFlBQStDLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQUcsQ0FBQztJQUV6RSxTQUFTLENBQUMsS0FBVTtRQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFVO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTNCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFVBQVUsR0FBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztTQUNqRDtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUErQixFQUFFLEVBQUU7b0JBQ3ZELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRCxLQUFLLEdBQUcsQ0FBQyxLQUE0QyxFQUFFLEVBQUU7UUFDdkQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQzNFLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFBO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzt3R0E1RFUsaUJBQWlCLGtCQWVSLGlCQUFpQjs0RkFmMUIsaUJBQWlCLHNRQUNYLHVCQUF1Qiw2QkNaMUMsc25EQWdEQTs7NEZEckNhLGlCQUFpQjtrQkFON0IsU0FBUzsrQkFDRSxXQUFXLG1CQUdKLHVCQUF1QixDQUFDLE1BQU07OzBCQWlCbEMsTUFBTTsyQkFBQyxpQkFBaUI7NENBZEssT0FBTztzQkFBaEQsZUFBZTt1QkFBQyx1QkFBdUI7Z0JBQy9CLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29ubmVjdGVkUG9zaXRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBCaXp5TWVudU9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbWVudS1vcHRpb24vbWVudS1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVudS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVudS5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eU1lbnVDb21wb25lbnQge1xuICBAQ29udGVudENoaWxkcmVuKEJpenlNZW51T3B0aW9uQ29tcG9uZW50KSBvcHRpb25zITogUXVlcnlMaXN0PEJpenlNZW51T3B0aW9uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LW1lbnUtJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG9mZnNldFg6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIG9mZnNldFk6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgaGlkZUFycm93OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG9wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcblxuICBfbWVudVdpZHRoOiBudW1iZXI7XG5cbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgX29uU2VsZWN0KGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNlbGVjdEJ1dHRvbihldmVudClcbiAgICB9XG4gIH1cblxuICBzZWxlY3RCdXR0b24oZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xuXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnNyY0VsZW1lbnQgJiYgZXZlbnQuc3JjRWxlbWVudC5vZmZzZXRXaWR0aCkge1xuICAgICAgdGhpcy5fbWVudVdpZHRoID0gIGV2ZW50LnNyY0VsZW1lbnQub2Zmc2V0V2lkdGg7IFxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wZW5lZCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uOiBCaXp5TWVudU9wdGlvbkNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQob3B0aW9uLm9uU2VsZWN0LnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKGV2ZW50KTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSA9IChldmVudDogUG9pbnRlckV2ZW50ICYge3RhcmdldDoge2lkOiBzdHJpbmd9fSkgPT4ge1xuICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkICYmIGV2ZW50LnRhcmdldC5pZCA9PT0gdGhpcy5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn0iLCI8YnV0dG9uIFxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNsYXNzPVwiYml6eS1tZW51IHt7Y3VzdG9tQ2xhc3N9fVwiXG4gICAgW25nQ2xhc3NdPVwieydiaXp5LW1lbnUtLWRpc2FibGVkJzogZGlzYWJsZWR9XCJcbiAgICBbaWRdPVwiaWRcIlxuICAgIChjbGljayk9XCJfb25TZWxlY3QoJGV2ZW50KVwiXG4gICAgKGtleXVwLmVudGVyKT1cIl9vblNlbGVjdCgkZXZlbnQpXCJcbiAgICBjZGtPdmVybGF5T3JpZ2luIFxuICAgICNiaXp5TWVudVRyaWdnZXI9XCJjZGtPdmVybGF5T3JpZ2luXCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktbWVudV9fY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICAgIFxuICAgIDxzdmcgXG4gICAgICAgIGNsYXNzPVwiYml6eS1tZW51X19hcnJvd1wiXG4gICAgICAgICpuZ0lmPVwiIWhpZGVBcnJvd1wiIFxuICAgICAgICB2aWV3Qm94PVwiMCAwIDk2IDk2XCIgXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnYml6eS1tZW51X19hcnJvdy0tb3BlbmVkJzogb3BlbmVkfVwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgPHBhdGggZD1cIk04MS44NDU3LDI1LjM4NzZhNi4wMjM5LDYuMDIzOSwwLDAsMC04LjQ1Ljc2NzZMNDgsNTYuNjI1N2wtMjUuMzk2LTMwLjQ3YTUuOTk5LDUuOTk5LDAsMSwwLTkuMjExNCw3LjY4NzlMNDMuMzk0Myw2OS44NDUyYTUuOTk2OSw1Ljk5NjksMCwwLDAsOS4yMTE0LDBMODIuNjA3NCwzMy44NDMxQTYuMDA3Niw2LjAwNzYsMCwwLDAsODEuODQ1NywyNS4zODc2WlwiLz5cbiAgICA8L3N2Zz5cbjwvYnV0dG9uPlxuXG48bmctdGVtcGxhdGVcbiAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPZmZzZXRYXT1cIm9mZnNldFhcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T2Zmc2V0WV09XCJvZmZzZXRZXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU1pbldpZHRoXT1cIl9tZW51V2lkdGhcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cImJpenlNZW51VHJpZ2dlclwiXG4gICAgKG92ZXJsYXlPdXRzaWRlQ2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlQdXNoXT1cInRydWVcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5RmxleGlibGVEaW1lbnNpb25zXT1cInRydWVcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5Vmlld3BvcnRNYXJnaW5dPVwiOFwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cIm9wZW5lZFwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LW1lbnVfX29wdGlvbnNcIj5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cImJpenktbWVudV9fb3B0aW9uc19faGVhZGVyXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LW1lbnUtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LWlucHV0XCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1tZW51LW9wdGlvblwiPjwvbmctY29udGVudD5cblxuICAgIDwvc3Bhbj5cblxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==