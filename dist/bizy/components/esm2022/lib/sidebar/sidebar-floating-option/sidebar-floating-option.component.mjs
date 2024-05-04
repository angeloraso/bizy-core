import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, Output } from '@angular/core';
import { BizySidebarOptionComponent } from '../sidebar-option/sidebar-option.component';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
export class BizySidebarFloatingOptionComponent {
    ref;
    document;
    options;
    id = String(Math.random());
    disabled = false;
    offsetX = 0;
    offsetY = 0;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    _opened = false;
    #mutationObserver;
    #subscription = new Subscription();
    #options = [];
    constructor(ref, document) {
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.options && (this.#options.length !== 0 || this.options.length !== 0) && !this.#optionsAreEqual(this.#options, this.options.toArray())) {
                this.#options = this.options.toArray();
                this.#listenOptionChanges(this.options.toArray());
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this._opened = !this._opened;
        this.selected = true;
        this.onSelect.emit(event);
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this._opened = false;
        this.ref.detectChanges();
    };
    setSelected = (selected) => {
        this.selected = selected;
        this.ref.detectChanges();
    };
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    #listenOptionChanges = (options) => {
        options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(() => {
                if (!_option.options || _option.options.length === 0) {
                    this._opened = false;
                    this.ref.detectChanges();
                }
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenOptionChanges(_option.options.toArray());
            }
        });
    };
    #optionsAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort((a, b) => a.id.localeCompare(b.id));
        arr2.sort((a, b) => a.id.localeCompare(b.id));
        for (let i = 0; i < arr1.length; i++) {
            for (let key in arr1[i]) {
                if (arr1[i][key] !== arr2[i][key]) {
                    return false;
                }
            }
        }
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarFloatingOptionComponent, selector: "bizy-sidebar-floating-option", inputs: { id: "id", disabled: "disabled", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--disabled': disabled, 'bizy-sidebar-floating-option--selected': selected}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:10rem;border-radius:.3rem;width:100%;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-floating-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--disabled': disabled, 'bizy-sidebar-floating-option--selected': selected}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:10rem;border-radius:.3rem;width:100%;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
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
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1mbG9hdGluZy1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1mbG9hdGluZy1vcHRpb24vc2lkZWJhci1mbG9hdGluZy1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1mbG9hdGluZy1vcHRpb24vc2lkZWJhci1mbG9hdGluZy1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDL0osT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFRM0MsTUFBTSxPQUFPLGtDQUFrQztJQWlCUjtJQUNUO0lBakJpQixPQUFPLENBQXlDO0lBQ3BGLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixPQUFPLEdBQVcsQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sR0FBVyxDQUFDLENBQUM7SUFDcEIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQ3pCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUV0RCxPQUFPLEdBQVksS0FBSyxDQUFDO0lBRXpCLGlCQUFp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QyxxUUFDNUIsMEJBQTBCLDZCQ1o3QyxtaUNBZ0NjOzs0RkRyQkQsa0NBQWtDO2tCQU45QyxTQUFTOytCQUNFLDhCQUE4QixtQkFHdkIsdUJBQXVCLENBQUMsTUFBTTs7MEJBbUI1QyxNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsUUFBUTs0Q0FqQjJCLE9BQU87c0JBQW5ELGVBQWU7dUJBQUMsMEJBQTBCO2dCQUNsQyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL3NpZGViYXItb3B0aW9uL3NpZGViYXItb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZWJhci1mbG9hdGluZy1vcHRpb24uY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAQ29udGVudENoaWxkcmVuKEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50KSBvcHRpb25zITogUXVlcnlMaXN0PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgb2Zmc2V0WDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgb2Zmc2V0WTogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcblxuICBfb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgI211dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICNvcHRpb25zOiBBcnJheTxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zICYmICh0aGlzLiNvcHRpb25zLmxlbmd0aCAhPT0gMCB8fCB0aGlzLm9wdGlvbnMubGVuZ3RoICE9PSAwKSAmJiAhdGhpcy4jb3B0aW9uc0FyZUVxdWFsKHRoaXMuI29wdGlvbnMsIHRoaXMub3B0aW9ucy50b0FycmF5KCkpKSB7XG4gICAgICAgIHRoaXMuI29wdGlvbnMgPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpO1xuXG4gICAgICAgIHRoaXMuI2xpc3Rlbk9wdGlvbkNoYW5nZXModGhpcy5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIF9vblNlbGVjdChldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9vcGVuZWQgPSAhdGhpcy5fb3BlbmVkO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudCk7XG4gIH1cblxuICBjbG9zZSA9IChldmVudDogUG9pbnRlckV2ZW50ICYge3RhcmdldDoge2lkOiBzdHJpbmd9fSkgPT4ge1xuICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkICYmIGV2ZW50LnRhcmdldC5pZCA9PT0gdGhpcy5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX29wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkID0gKHNlbGVjdGVkOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGdldElkID0gKCk6IHN0cmluZyAgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWQgPSAoKTogYm9vbGVhbiAgPT4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgI2xpc3Rlbk9wdGlvbkNoYW5nZXMgPSAob3B0aW9uczogQXJyYXk8Qml6eVNpZGViYXJPcHRpb25Db21wb25lbnQ+KSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZChfb3B0aW9uLm9uU2VsZWN0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICghX29wdGlvbi5vcHRpb25zIHx8IF9vcHRpb24ub3B0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9vcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgICAgaWYgKF9vcHRpb24ub3B0aW9ucyAmJiBfb3B0aW9uLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLiNsaXN0ZW5PcHRpb25DaGFuZ2VzKF9vcHRpb24ub3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgI29wdGlvbnNBcmVFcXVhbChhcnIxOiBBcnJheTxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD4sIGFycjI6IEFycmF5PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50Pikge1xuICAgIGlmIChhcnIxLmxlbmd0aCAhPT0gYXJyMi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGFycjEuc29ydCgoYSwgYikgPT4gYS5pZC5sb2NhbGVDb21wYXJlKGIuaWQpKTtcbiAgICBhcnIyLnNvcnQoKGEsIGIpID0+IGEuaWQubG9jYWxlQ29tcGFyZShiLmlkKSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycjEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFycjFbaV0pIHtcbiAgICAgICAgICAgIGlmIChhcnIxW2ldW2tleV0gIT09IGFycjJbaV1ba2V5XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59IiwiPGJ1dHRvbiBcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cImJpenktc2lkZWJhci1mbG9hdGluZy1vcHRpb24ge3tjdXN0b21DbGFzc319XCJcbiAgICBbbmdDbGFzc109XCJ7J2Jpenktc2lkZWJhci1mbG9hdGluZy1vcHRpb24tLWRpc2FibGVkJzogZGlzYWJsZWQsICdiaXp5LXNpZGViYXItZmxvYXRpbmctb3B0aW9uLS1zZWxlY3RlZCc6IHNlbGVjdGVkfVwiXG4gICAgaWQ9XCJ7e2lkfX1cIlxuICAgIChjbGljayk9XCJfb25TZWxlY3QoJGV2ZW50KVwiXG4gICAgKGtleXVwLmVudGVyKT1cIl9vblNlbGVjdCgkZXZlbnQpXCJcbiAgICBjZGtPdmVybGF5T3JpZ2luIFxuICAgICNiaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uVHJpZ2dlcj1cImNka092ZXJsYXlPcmlnaW5cIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbl9fY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICAgIFxuPC9idXR0b24+XG5cbjxuZy10ZW1wbGF0ZVxuICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9mZnNldFhdPVwib2Zmc2V0WFwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPZmZzZXRZXT1cIm9mZnNldFlcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cImJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25UcmlnZ2VyXCJcbiAgICAob3ZlcmxheU91dHNpZGVDbGljayk9XCJjbG9zZSgkZXZlbnQpXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwiX29wZW5lZFwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LXNpZGViYXItZmxvYXRpbmctb3B0aW9uX19vcHRpb25zXCI+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi10aXRsZVwiPjwvbmctY29udGVudD5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXNpZGViYXItb3B0aW9uXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPC9zcGFuPlxuXG48L25nLXRlbXBsYXRlPiJdfQ==