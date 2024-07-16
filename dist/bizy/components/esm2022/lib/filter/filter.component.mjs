import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, Output } from '@angular/core';
import { BizyFilterSectionComponent } from './filter-section/filter-section.component';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
export class BizyFilterComponent {
    document;
    ref;
    sections;
    id = `bizy-filter-${Math.random()}`;
    disabled = false;
    customClass = '';
    opened = false;
    onOpen = new EventEmitter();
    onChange = new EventEmitter();
    _filterWidth;
    _activated = false;
    #subscription = new Subscription();
    constructor(document, ref) {
        this.document = document;
        this.ref = ref;
    }
    ngAfterViewInit() {
        const mutationObserver = new MutationObserver(() => {
            if (this.sections && this.sections.length > 0) {
                const activatedSections = this.sections.filter(_section => _section.isActivated() === true);
                const activated = activatedSections.length > 0;
                if (this._activated !== activated) {
                    this._activated = activated;
                    this.onChange.emit(this._activated);
                    this.ref.detectChanges();
                }
                this.sections.forEach(_section => {
                    this.#subscription.add(_section.onSelect.subscribe(() => {
                        const activatedSections = this.sections.filter(_section => _section.isActivated() === true);
                        const activated = activatedSections.length > 0;
                        if (this._activated !== activated) {
                            this._activated = activated;
                            this.onChange.emit(this._activated);
                            this.ref.detectChanges();
                        }
                    }));
                });
                mutationObserver.disconnect();
            }
        });
        mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    _onOpen = (event) => {
        if (this.disabled) {
            return;
        }
        this.opened = !this.opened;
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._filterWidth = event.srcElement.offsetWidth;
        }
        this.onOpen.emit(event);
    };
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterComponent, deps: [{ token: DOCUMENT }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterComponent, selector: "bizy-filter", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen", onChange: "onChange" }, queries: [{ propertyName: "sections", predicate: BizyFilterSectionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections\">\n\n        <ng-content select=\"bizy-filter-section\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding);color:var(--bizy-filter-color);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections{max-width:75vw;background-color:var(--bizy-filter-background-color);min-width:100%;display:flex;column-gap:1.2rem;flex-wrap:wrap;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections\">\n\n        <ng-content select=\"bizy-filter-section\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding);color:var(--bizy-filter-color);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections{max-width:75vw;background-color:var(--bizy-filter-background-color);min-width:100%;display:flex;column-gap:1.2rem;flex-wrap:wrap;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { sections: [{
                type: ContentChildren,
                args: [BizyFilterSectionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], onOpen: [{
                type: Output
            }], onChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3ZKLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBUXBDLE1BQU0sT0FBTyxtQkFBbUI7SUFnQkY7SUFDUztJQWhCZ0IsUUFBUSxDQUF3QztJQUM1RixFQUFFLEdBQVcsZUFBZSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUM1QyxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDekIsTUFBTSxHQUFZLEtBQUssQ0FBQztJQUN2QixNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFDMUMsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFFakQsWUFBWSxDQUFTO0lBRXJCLFVBQVUsR0FBWSxLQUFLLENBQUM7SUFFNUIsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkMsWUFDNEIsUUFBa0IsRUFDVCxHQUFzQjtRQUQvQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ1QsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDeEQs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QUFBO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzt3R0EzRVUsbUJBQW1CLGtCQWdCcEIsUUFBUSxhQUNSLGlCQUFpQjs0RkFqQmhCLG1CQUFtQiwyTkFDYiwwQkFBMEIsNkJDWjdDLDAzQkFnQ0E7OzRGRHJCYSxtQkFBbUI7a0JBTi9CLFNBQVM7K0JBQ0UsYUFBYSxtQkFHTix1QkFBdUIsQ0FBQyxNQUFNOzswQkFrQjVDLE1BQU07MkJBQUMsUUFBUTs7MEJBQ2YsTUFBTTsyQkFBQyxpQkFBaUI7NENBaEIwQixRQUFRO3NCQUE1RCxlQUFlO3VCQUFDLDBCQUEwQjtnQkFDbEMsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0ksTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5RmlsdGVyU2VjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLXNlY3Rpb24vZmlsdGVyLXNlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWx0ZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbHRlci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eUZpbHRlckNvbXBvbmVudCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eUZpbHRlclNlY3Rpb25Db21wb25lbnQpIHByaXZhdGUgc2VjdGlvbnM6IFF1ZXJ5TGlzdDxCaXp5RmlsdGVyU2VjdGlvbkNvbXBvbmVudD47XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1maWx0ZXItJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBvbk9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIF9maWx0ZXJXaWR0aDogbnVtYmVyO1xuXG4gIF9hY3RpdmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zZWN0aW9ucyAmJiB0aGlzLnNlY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgYWN0aXZhdGVkU2VjdGlvbnMgPSB0aGlzLnNlY3Rpb25zLmZpbHRlcihfc2VjdGlvbiA9PiBfc2VjdGlvbi5pc0FjdGl2YXRlZCgpID09PSB0cnVlKTtcbiAgICAgICAgY29uc3QgYWN0aXZhdGVkID0gYWN0aXZhdGVkU2VjdGlvbnMubGVuZ3RoID4gMDtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2YXRlZCAhPT0gYWN0aXZhdGVkKSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZhdGVkID0gYWN0aXZhdGVkO1xuICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0aGlzLl9hY3RpdmF0ZWQpO1xuICAgICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VjdGlvbnMuZm9yRWFjaChfc2VjdGlvbiA9PiB7XG4gICAgICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZChfc2VjdGlvbi5vblNlbGVjdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZhdGVkU2VjdGlvbnMgPSB0aGlzLnNlY3Rpb25zLmZpbHRlcihfc2VjdGlvbiA9PiBfc2VjdGlvbi5pc0FjdGl2YXRlZCgpID09PSB0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2YXRlZCA9IGFjdGl2YXRlZFNlY3Rpb25zLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZhdGVkICE9PSBhY3RpdmF0ZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fYWN0aXZhdGVkID0gYWN0aXZhdGVkO1xuICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodGhpcy5fYWN0aXZhdGVkKTtcbiAgICAgICAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIF9vbk9wZW4gPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuZWQgPSAhdGhpcy5vcGVuZWQ7XG5cbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3JjRWxlbWVudCAmJiBldmVudC5zcmNFbGVtZW50Lm9mZnNldFdpZHRoKSB7XG4gICAgICB0aGlzLl9maWx0ZXJXaWR0aCA9ICBldmVudC5zcmNFbGVtZW50Lm9mZnNldFdpZHRoOyBcbiAgICB9XG5cbiAgICB0aGlzLm9uT3Blbi5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGNsb3NlID0gKGV2ZW50OiBQb2ludGVyRXZlbnQgJiB7dGFyZ2V0OiB7aWQ6IHN0cmluZ319KSA9PiB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQgJiYgZXZlbnQudGFyZ2V0LmlkID09PSB0aGlzLmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufSIsIjxidXR0b24gXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY2xhc3M9XCJiaXp5LWZpbHRlciB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIFtuZ0NsYXNzXT1cInsnYml6eS1maWx0ZXItLWRpc2FibGVkJzogZGlzYWJsZWR9XCJcbiAgICBbaWRdPVwiaWRcIlxuICAgIChjbGljayk9XCJfb25PcGVuKCRldmVudClcIlxuICAgIChrZXl1cC5lbnRlcik9XCJfb25PcGVuKCRldmVudClcIlxuICAgIGNka092ZXJsYXlPcmlnaW4gXG4gICAgI2JpenlGaWx0ZXJUcmlnZ2VyPVwiY2RrT3ZlcmxheU9yaWdpblwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWZpbHRlcl9fY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWZpbHRlcl9fYmFkZ2VcIiBbbmdDbGFzc109XCJ7J2JpenktZmlsdGVyX19iYWRnZS0tdmlzaWJsZSc6IF9hY3RpdmF0ZWR9XCI+PC9zcGFuPlxuICAgIFxuPC9idXR0b24+XG5cbjxuZy10ZW1wbGF0ZVxuICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU1pbldpZHRoXT1cIl9maWx0ZXJXaWR0aFwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwiYml6eUZpbHRlclRyaWdnZXJcIlxuICAgIChvdmVybGF5T3V0c2lkZUNsaWNrKT1cImNsb3NlKCRldmVudClcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJvcGVuZWRcIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1maWx0ZXJfX3NlY3Rpb25zXCI+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1maWx0ZXItc2VjdGlvblwiPjwvbmctY29udGVudD5cblxuICAgIDwvc3Bhbj5cblxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==