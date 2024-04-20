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
    id = String(Math.random());
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterComponent, selector: "bizy-filter", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen", onChange: "onChange" }, queries: [{ propertyName: "sections", predicate: BizyFilterSectionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections\">\n\n        <ng-content select=\"bizy-filter-section\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding);color:var(--bizy-filter-color);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections{max-width:75vw;background-color:var(--bizy-filter-background-color);min-width:100%;display:flex;column-gap:1.2rem;flex-wrap:wrap;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections\">\n\n        <ng-content select=\"bizy-filter-section\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding);color:var(--bizy-filter-color);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections{max-width:75vw;background-color:var(--bizy-filter-background-color);min-width:100%;display:flex;column-gap:1.2rem;flex-wrap:wrap;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3ZKLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBUXBDLE1BQU0sT0FBTyxtQkFBbUI7SUFnQkY7SUFDUztJQWhCZ0IsUUFBUSxDQUF3QztJQUM1RixFQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixNQUFNLEdBQVksS0FBSyxDQUFDO0lBQ3ZCLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUMxQyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUVqRCxZQUFZLENBQVM7SUFFckIsVUFBVSxHQUFZLEtBQUssQ0FBQztJQUU1QixhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVuQyxZQUM0QixRQUFrQixFQUNULEdBQXNCO1FBRC9CLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDVCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN4RCxDQUFDO0lBRUosZUFBZTtRQUNiLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7WUFDakQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDN0MsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDNUYsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtvQkFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7b0JBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDMUI7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTt3QkFDdEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDNUYsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt3QkFDL0MsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTs0QkFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7NEJBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQzt5QkFDMUI7b0JBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztnQkFFSCxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUMvQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsT0FBTyxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTNCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFlBQVksR0FBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztTQUNuRDtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQTtJQUVELEtBQUssR0FBRyxDQUFDLEtBQTRDLEVBQUUsRUFBRTtRQUN2RCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDM0UsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO3dHQTNFVSxtQkFBbUIsa0JBZ0JwQixRQUFRLGFBQ1IsaUJBQWlCOzRGQWpCaEIsbUJBQW1CLDJOQUNiLDBCQUEwQiw2QkNaN0MsNDNCQWdDQTs7NEZEckJhLG1CQUFtQjtrQkFOL0IsU0FBUzsrQkFDRSxhQUFhLG1CQUdOLHVCQUF1QixDQUFDLE1BQU07OzBCQWtCNUMsTUFBTTsyQkFBQyxRQUFROzswQkFDZixNQUFNOzJCQUFDLGlCQUFpQjs0Q0FoQjBCLFFBQVE7c0JBQTVELGVBQWU7dUJBQUMsMEJBQTBCO2dCQUNsQyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlGaWx0ZXJTZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXItc2VjdGlvbi9maWx0ZXItc2VjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbHRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsdGVyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RmlsdGVyQ29tcG9uZW50IHtcbiAgQENvbnRlbnRDaGlsZHJlbihCaXp5RmlsdGVyU2VjdGlvbkNvbXBvbmVudCkgcHJpdmF0ZSBzZWN0aW9uczogUXVlcnlMaXN0PEJpenlGaWx0ZXJTZWN0aW9uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIG9uT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgX2ZpbHRlcldpZHRoOiBudW1iZXI7XG5cbiAgX2FjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnNlY3Rpb25zICYmIHRoaXMuc2VjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBhY3RpdmF0ZWRTZWN0aW9ucyA9IHRoaXMuc2VjdGlvbnMuZmlsdGVyKF9zZWN0aW9uID0+IF9zZWN0aW9uLmlzQWN0aXZhdGVkKCkgPT09IHRydWUpO1xuICAgICAgICBjb25zdCBhY3RpdmF0ZWQgPSBhY3RpdmF0ZWRTZWN0aW9ucy5sZW5ndGggPiAwO1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZhdGVkICE9PSBhY3RpdmF0ZWQpIHtcbiAgICAgICAgICB0aGlzLl9hY3RpdmF0ZWQgPSBhY3RpdmF0ZWQ7XG4gICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRoaXMuX2FjdGl2YXRlZCk7XG4gICAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWN0aW9ucy5mb3JFYWNoKF9zZWN0aW9uID0+IHtcbiAgICAgICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKF9zZWN0aW9uLm9uU2VsZWN0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmF0ZWRTZWN0aW9ucyA9IHRoaXMuc2VjdGlvbnMuZmlsdGVyKF9zZWN0aW9uID0+IF9zZWN0aW9uLmlzQWN0aXZhdGVkKCkgPT09IHRydWUpO1xuICAgICAgICAgICAgY29uc3QgYWN0aXZhdGVkID0gYWN0aXZhdGVkU2VjdGlvbnMubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmF0ZWQgIT09IGFjdGl2YXRlZCkge1xuICAgICAgICAgICAgICB0aGlzLl9hY3RpdmF0ZWQgPSBhY3RpdmF0ZWQ7XG4gICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0aGlzLl9hY3RpdmF0ZWQpO1xuICAgICAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICB9XG5cbiAgX29uT3BlbiA9IChldmVudDogYW55KSA9PiB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9wZW5lZCA9ICF0aGlzLm9wZW5lZDtcblxuICAgIGlmIChldmVudCAmJiBldmVudC5zcmNFbGVtZW50ICYmIGV2ZW50LnNyY0VsZW1lbnQub2Zmc2V0V2lkdGgpIHtcbiAgICAgIHRoaXMuX2ZpbHRlcldpZHRoID0gIGV2ZW50LnNyY0VsZW1lbnQub2Zmc2V0V2lkdGg7IFxuICAgIH1cblxuICAgIHRoaXMub25PcGVuLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgY2xvc2UgPSAoZXZlbnQ6IFBvaW50ZXJFdmVudCAmIHt0YXJnZXQ6IHtpZDogc3RyaW5nfX0pID0+IHtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5pZCAmJiBldmVudC50YXJnZXQuaWQgPT09IHRoaXMuaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59IiwiPGJ1dHRvbiBcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cImJpenktZmlsdGVyIHt7Y3VzdG9tQ2xhc3N9fVwiXG4gICAgW25nQ2xhc3NdPVwieydiaXp5LWZpbHRlci0tZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxuICAgIGlkPVwie3tpZH19XCJcbiAgICAoY2xpY2spPVwiX29uT3BlbigkZXZlbnQpXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwiX29uT3BlbigkZXZlbnQpXCJcbiAgICBjZGtPdmVybGF5T3JpZ2luIFxuICAgICNiaXp5RmlsdGVyVHJpZ2dlcj1cImNka092ZXJsYXlPcmlnaW5cIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1maWx0ZXJfX2NvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1maWx0ZXJfX2JhZGdlXCIgW25nQ2xhc3NdPVwieydiaXp5LWZpbHRlcl9fYmFkZ2UtLXZpc2libGUnOiBfYWN0aXZhdGVkfVwiPjwvc3Bhbj5cbiAgICBcbjwvYnV0dG9uPlxuXG48bmctdGVtcGxhdGVcbiAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlNaW5XaWR0aF09XCJfZmlsdGVyV2lkdGhcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cImJpenlGaWx0ZXJUcmlnZ2VyXCJcbiAgICAob3ZlcmxheU91dHNpZGVDbGljayk9XCJjbG9zZSgkZXZlbnQpXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwib3BlbmVkXCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktZmlsdGVyX19zZWN0aW9uc1wiPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktZmlsdGVyLXNlY3Rpb25cIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8L3NwYW4+XG5cbjwvbmctdGVtcGxhdGU+XG4iXX0=