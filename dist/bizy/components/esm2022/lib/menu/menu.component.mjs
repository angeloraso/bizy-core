import { BizyMenuOptionComponent } from './menu-option/menu-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
export class BizyMenuComponent {
    ref;
    options;
    id = String(Math.random());
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyMenuComponent, selector: "bizy-menu", inputs: { id: "id", disabled: "disabled", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", hideArrow: "hideArrow", opened: "opened" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizyMenuOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\"\n        *ngIf=\"!hideArrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\">\n\n        <ng-content select=\"bizy-menu-title\"></ng-content>\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu__options:empty) .bizy-menu>.bizy-menu__arrow{display:none!important}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:var(--bizy-menu-padding);color:var(--bizy-menu-color);cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:var(--bizy-menu-color)}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color);min-width:10rem;width:100%;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-menu {{customClass}}\"\n    [ngClass]=\"{'bizy-menu--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizyMenuTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-menu__content\">\n        <ng-content></ng-content>\n    </span>\n    \n    <svg \n        class=\"bizy-menu__arrow\"\n        *ngIf=\"!hideArrow\" \n        viewBox=\"0 0 96 96\" \n        [ngClass]=\"{'bizy-menu__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z\"/>\n    </svg>\n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayMinWidth]=\"_menuWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyMenuTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-menu__options\">\n\n        <ng-content select=\"bizy-menu-title\"></ng-content>\n\n        <ng-content select=\"bizy-menu-option\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu__options:empty) .bizy-menu>.bizy-menu__arrow{display:none!important}.bizy-menu{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:var(--bizy-menu-padding);color:var(--bizy-menu-color);cursor:pointer}.bizy-menu--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-menu__arrow{height:1rem;pointer-events:none;display:block;transition:transform .3s ease;fill:var(--bizy-menu-color)}.bizy-menu__arrow--opened{transform:rotate(180deg)}.bizy-menu__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-menu__options{background-color:var(--bizy-menu-background-color);min-width:10rem;width:100%;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvbWVudS9tZW51LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9tZW51L21lbnUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdkosT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQVFwQyxNQUFNLE9BQU8saUJBQWlCO0lBZW1CO0lBZEwsT0FBTyxDQUFzQztJQUM5RSxFQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsT0FBTyxHQUFXLENBQUMsQ0FBQztJQUNwQixPQUFPLEdBQVcsQ0FBQyxDQUFDO0lBQ3BCLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDekIsU0FBUyxHQUFZLEtBQUssQ0FBQztJQUMzQixNQUFNLEdBQVksS0FBSyxDQUFDO0lBQ3ZCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUV0RCxVQUFVLENBQVM7SUFFbkIsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkMsWUFBK0MsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFBRyxDQUFDO0lBRXpFLFNBQVMsQ0FBQyxLQUFVO1FBQ2xCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDekI7SUFDSCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVU7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFM0IsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUM3RCxJQUFJLENBQUMsVUFBVSxHQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1NBQ2pEO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQStCLEVBQUUsRUFBRTtvQkFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELEtBQUssR0FBRyxDQUFDLEtBQTRDLEVBQUUsRUFBRTtRQUN2RCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDM0UsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO3dHQTVEVSxpQkFBaUIsa0JBZVIsaUJBQWlCOzRGQWYxQixpQkFBaUIsc1FBQ1gsdUJBQXVCLDZCQ1gxQyxvMkNBMENBOzs0RkRoQ2EsaUJBQWlCO2tCQU43QixTQUFTOytCQUNFLFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTTs7MEJBaUJsQyxNQUFNOzJCQUFDLGlCQUFpQjs0Q0FkSyxPQUFPO3NCQUFoRCxlQUFlO3VCQUFDLHVCQUF1QjtnQkFDL0IsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaXp5TWVudU9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbWVudS1vcHRpb24vbWVudS1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVudS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVudS5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eU1lbnVDb21wb25lbnQge1xuICBAQ29udGVudENoaWxkcmVuKEJpenlNZW51T3B0aW9uQ29tcG9uZW50KSBvcHRpb25zITogUXVlcnlMaXN0PEJpenlNZW51T3B0aW9uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgb2Zmc2V0WDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgb2Zmc2V0WTogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBoaWRlQXJyb3c6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIF9tZW51V2lkdGg6IG51bWJlcjtcblxuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBfb25TZWxlY3QoZXZlbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KGV2ZW50KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2VsZWN0QnV0dG9uKGV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEJ1dHRvbihldmVudDogYW55KSB7XG4gICAgdGhpcy5vcGVuZWQgPSAhdGhpcy5vcGVuZWQ7XG5cbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3JjRWxlbWVudCAmJiBldmVudC5zcmNFbGVtZW50Lm9mZnNldFdpZHRoKSB7XG4gICAgICB0aGlzLl9tZW51V2lkdGggPSAgZXZlbnQuc3JjRWxlbWVudC5vZmZzZXRXaWR0aDsgXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb246IEJpenlNZW51T3B0aW9uQ29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZChvcHRpb24ub25TZWxlY3Quc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlID0gKGV2ZW50OiBQb2ludGVyRXZlbnQgJiB7dGFyZ2V0OiB7aWQ6IHN0cmluZ319KSA9PiB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQgJiYgZXZlbnQudGFyZ2V0LmlkID09PSB0aGlzLmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufSIsIjxidXR0b24gXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY2xhc3M9XCJiaXp5LW1lbnUge3tjdXN0b21DbGFzc319XCJcbiAgICBbbmdDbGFzc109XCJ7J2JpenktbWVudS0tZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxuICAgIGlkPVwie3tpZH19XCJcbiAgICAoY2xpY2spPVwiX29uU2VsZWN0KCRldmVudClcIlxuICAgIChrZXl1cC5lbnRlcik9XCJfb25TZWxlY3QoJGV2ZW50KVwiXG4gICAgY2RrT3ZlcmxheU9yaWdpbiBcbiAgICAjYml6eU1lbnVUcmlnZ2VyPVwiY2RrT3ZlcmxheU9yaWdpblwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LW1lbnVfX2NvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cbiAgICBcbiAgICA8c3ZnIFxuICAgICAgICBjbGFzcz1cImJpenktbWVudV9fYXJyb3dcIlxuICAgICAgICAqbmdJZj1cIiFoaWRlQXJyb3dcIiBcbiAgICAgICAgdmlld0JveD1cIjAgMCA5NiA5NlwiIFxuICAgICAgICBbbmdDbGFzc109XCJ7J2JpenktbWVudV9fYXJyb3ctLW9wZW5lZCc6IG9wZW5lZH1cIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNODEuODQ1NywyNS4zODc2YTYuMDIzOSw2LjAyMzksMCwwLDAtOC40NS43Njc2TDQ4LDU2LjYyNTdsLTI1LjM5Ni0zMC40N2E1Ljk5OSw1Ljk5OSwwLDEsMC05LjIxMTQsNy42ODc5TDQzLjM5NDMsNjkuODQ1MmE1Ljk5NjksNS45OTY5LDAsMCwwLDkuMjExNCwwTDgyLjYwNzQsMzMuODQzMUE2LjAwNzYsNi4wMDc2LDAsMCwwLDgxLjg0NTcsMjUuMzg3NlpcIi8+XG4gICAgPC9zdmc+XG48L2J1dHRvbj5cblxuPG5nLXRlbXBsYXRlXG4gICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T2Zmc2V0WF09XCJvZmZzZXRYXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9mZnNldFldPVwib2Zmc2V0WVwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlNaW5XaWR0aF09XCJfbWVudVdpZHRoXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJiaXp5TWVudVRyaWdnZXJcIlxuICAgIChvdmVybGF5T3V0c2lkZUNsaWNrKT1cImNsb3NlKCRldmVudClcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJvcGVuZWRcIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1tZW51X19vcHRpb25zXCI+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1tZW51LXRpdGxlXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktbWVudS1vcHRpb25cIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8L3NwYW4+XG5cbjwvbmctdGVtcGxhdGU+XG4iXX0=