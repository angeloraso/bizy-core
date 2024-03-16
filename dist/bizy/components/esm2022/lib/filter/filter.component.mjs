import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
export class FilterComponent {
    document;
    ref;
    sections;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    opened = false;
    onOpen = new EventEmitter();
    _filterWidth;
    _sections = [];
    _activated = false;
    #subscription = new Subscription();
    constructor(document, ref) {
        this.document = document;
        this.ref = ref;
    }
    ngAfterViewInit() {
        if (this.sections && this.sections.length > 0) {
            this.sections.forEach(_section => {
                this._sections.push({ id: _section.getId(), selected: _section.getSelected() });
            });
            const selectedSections = this._sections.filter(_section => _section.selected === true);
            this._activated = selectedSections.length !== this._sections.length;
            this.#listenSectionChanges();
        }
        else {
            const mutationObserver = new MutationObserver(() => {
                if (this.sections && this.sections.length > 0) {
                    this.sections.forEach(_section => {
                        this._sections.push({ id: _section.getId(), selected: _section.getSelected() });
                    });
                    const selectedSections = this._sections.filter(_section => _section.selected === true);
                    this._activated = selectedSections.length !== this._sections.length;
                    this.#listenSectionChanges();
                    mutationObserver.disconnect();
                }
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        }
    }
    _onOpen(event) {
        if (this.disabled) {
            return;
        }
        this.opened = !this.opened;
        if (event && event.srcElement && event.srcElement.offsetWidth) {
            this._filterWidth = event.srcElement.offsetWidth;
        }
        this.onOpen.emit(event);
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this.opened = false;
        this.ref.detectChanges();
    };
    #listenSectionChanges = () => {
        if (!this.sections) {
            return;
        }
        this.sections.forEach(_section => {
            this.#subscription.add(_section.onSelect.subscribe(() => {
                const index = this._sections.findIndex(__section => __section.id === _section.id);
                if (index !== -1) {
                    this._sections[index] = { id: _section.getId(), selected: _section.getSelected() };
                }
                else {
                    this._sections.push({ id: _section.getId(), selected: _section.getSelected() });
                }
                const selectedSections = this._sections.filter(_section => _section.selected === true);
                this._activated = selectedSections.length !== this._sections.length;
                this.ref.detectChanges();
            }));
            this.#subscription.add(_section.onRange.subscribe(() => {
                const index = this._sections.findIndex(__section => __section.id === _section.id);
                if (index !== -1) {
                    this._sections[index] = { id: _section.getId(), selected: _section.getSelected() };
                }
                else {
                    this._sections.push({ id: _section.getId(), selected: _section.getSelected() });
                }
                const selectedOptions = this._sections.filter(_section => _section.selected === true);
                this._activated = selectedOptions.length !== this._sections.length;
                this.ref.detectChanges();
            }));
        });
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterComponent, deps: [{ token: DOCUMENT }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FilterComponent, selector: "bizy-filter", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened" }, outputs: { onOpen: "onOpen" }, queries: [{ propertyName: "sections", predicate: FilterSectionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections\">\n\n        <ng-content select=\"bizy-filter-section\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding, 0);color:var(--bizy-filter-color, #fff);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color, #e76565);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections{max-width:75vw;background-color:var(--bizy-filter-background-color, #fff);min-width:100%;display:flex;column-gap:1.2rem;flex-wrap:wrap;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-filter {{customClass}}\"\n    [ngClass]=\"{'bizy-filter--disabled': disabled}\"\n    id=\"{{id}}\"\n    (click)=\"_onOpen($event)\"\n    (keyup.enter)=\"_onOpen($event)\"\n    cdkOverlayOrigin \n    #bizyFilterTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-filter__content\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"bizy-filter__badge\" [ngClass]=\"{'bizy-filter__badge--visible': _activated}\"></span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayMinWidth]=\"_filterWidth\"\n    [cdkConnectedOverlayOrigin]=\"bizyFilterTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"opened\">\n\n    <span class=\"bizy-filter__sections\">\n\n        <ng-content select=\"bizy-filter-section\"></ng-content>\n\n    </span>\n\n</ng-template>\n", styles: [":host{font-size:1rem}.bizy-filter{font-size:1rem;width:100%;border:none;background-color:transparent;display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;cursor:pointer;padding:var(--bizy-filter-padding, 0);color:var(--bizy-filter-color, #fff);position:relative}.bizy-filter--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-filter__badge{position:absolute;top:-.2rem;right:-.2rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--bizy-filter-badge-color, #e76565);display:none}.bizy-filter__badge--visible{display:block!important}.bizy-filter__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-filter__sections{max-width:75vw;background-color:var(--bizy-filter-background-color, #fff);min-width:100%;display:flex;column-gap:1.2rem;flex-wrap:wrap;padding:.5rem;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { sections: [{
                type: ContentChildren,
                args: [FilterSectionComponent]
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3ZKLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBUXBDLE1BQU0sT0FBTyxlQUFlO0lBZ0JFO0lBQ1M7SUFoQlksUUFBUSxDQUFvQztJQUNwRixFQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixNQUFNLEdBQVksS0FBSyxDQUFDO0lBQ3ZCLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUVwRCxZQUFZLENBQVM7SUFDckIsU0FBUyxHQUEyQyxFQUFFLENBQUM7SUFFdkQsVUFBVSxHQUFZLEtBQUssQ0FBQztJQUU1QixhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVuQyxZQUM0QixRQUFrQixFQUNULEdBQXNCO1FBRC9CLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDVCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN4RCxDQUFDO0lB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RkRyQmEsZUFBZTtrQkFOM0IsU0FBUzsrQkFDRSxhQUFhLG1CQUdOLHVCQUF1QixDQUFDLE1BQU07OzBCQWtCNUMsTUFBTTsyQkFBQyxRQUFROzswQkFDZixNQUFNOzJCQUFDLGlCQUFpQjs0Q0FoQnNCLFFBQVE7c0JBQXhELGVBQWU7dUJBQUMsc0JBQXNCO2dCQUM5QixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJTZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXItc2VjdGlvbi9maWx0ZXItc2VjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbHRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsdGVyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJDb21wb25lbnQge1xuICBAQ29udGVudENoaWxkcmVuKEZpbHRlclNlY3Rpb25Db21wb25lbnQpIHByaXZhdGUgc2VjdGlvbnM6IFF1ZXJ5TGlzdDxGaWx0ZXJTZWN0aW9uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIG9uT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIF9maWx0ZXJXaWR0aDogbnVtYmVyO1xuICBfc2VjdGlvbnM6IEFycmF5PHtpZDogc3RyaW5nLCBzZWxlY3RlZDogYm9vbGVhbn0+ID0gW107XG5cbiAgX2FjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuc2VjdGlvbnMgJiYgdGhpcy5zZWN0aW9ucy5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHRoaXMuc2VjdGlvbnMuZm9yRWFjaChfc2VjdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX3NlY3Rpb25zLnB1c2goe2lkOiBfc2VjdGlvbi5nZXRJZCgpLCBzZWxlY3RlZDogX3NlY3Rpb24uZ2V0U2VsZWN0ZWQoKX0pXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgY29uc3Qgc2VsZWN0ZWRTZWN0aW9ucyA9IHRoaXMuX3NlY3Rpb25zLmZpbHRlcihfc2VjdGlvbiA9PiBfc2VjdGlvbi5zZWxlY3RlZCA9PT0gdHJ1ZSk7XG4gICAgICB0aGlzLl9hY3RpdmF0ZWQgPSBzZWxlY3RlZFNlY3Rpb25zLmxlbmd0aCAhPT0gdGhpcy5fc2VjdGlvbnMubGVuZ3RoO1xuXG4gICAgICB0aGlzLiNsaXN0ZW5TZWN0aW9uQ2hhbmdlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zZWN0aW9ucyAmJiB0aGlzLnNlY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnNlY3Rpb25zLmZvckVhY2goX3NlY3Rpb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5fc2VjdGlvbnMucHVzaCh7aWQ6IF9zZWN0aW9uLmdldElkKCksIHNlbGVjdGVkOiBfc2VjdGlvbi5nZXRTZWxlY3RlZCgpfSlcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkU2VjdGlvbnMgPSB0aGlzLl9zZWN0aW9ucy5maWx0ZXIoX3NlY3Rpb24gPT4gX3NlY3Rpb24uc2VsZWN0ZWQgPT09IHRydWUpO1xuICAgICAgICAgIHRoaXMuX2FjdGl2YXRlZCA9IHNlbGVjdGVkU2VjdGlvbnMubGVuZ3RoICE9PSB0aGlzLl9zZWN0aW9ucy5sZW5ndGg7XG5cbiAgICAgICAgICB0aGlzLiNsaXN0ZW5TZWN0aW9uQ2hhbmdlcygpO1xuICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgXG4gICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBfb25PcGVuKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xuXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnNyY0VsZW1lbnQgJiYgZXZlbnQuc3JjRWxlbWVudC5vZmZzZXRXaWR0aCkge1xuICAgICAgdGhpcy5fZmlsdGVyV2lkdGggPSAgZXZlbnQuc3JjRWxlbWVudC5vZmZzZXRXaWR0aDsgXG4gICAgfVxuXG4gICAgdGhpcy5vbk9wZW4uZW1pdChldmVudCk7XG4gIH1cblxuICBjbG9zZSA9IChldmVudDogUG9pbnRlckV2ZW50ICYge3RhcmdldDoge2lkOiBzdHJpbmd9fSkgPT4ge1xuICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkICYmIGV2ZW50LnRhcmdldC5pZCA9PT0gdGhpcy5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgI2xpc3RlblNlY3Rpb25DaGFuZ2VzID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5zZWN0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VjdGlvbnMuZm9yRWFjaChfc2VjdGlvbiA9PiB7XG5cbiAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQoX3NlY3Rpb24ub25TZWxlY3Quc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9zZWN0aW9ucy5maW5kSW5kZXgoX19zZWN0aW9uID0+IF9fc2VjdGlvbi5pZCA9PT0gX3NlY3Rpb24uaWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5fc2VjdGlvbnNbaW5kZXhdID0ge2lkOiBfc2VjdGlvbi5nZXRJZCgpLCBzZWxlY3RlZDogX3NlY3Rpb24uZ2V0U2VsZWN0ZWQoKX07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fc2VjdGlvbnMucHVzaCh7aWQ6IF9zZWN0aW9uLmdldElkKCksIHNlbGVjdGVkOiBfc2VjdGlvbi5nZXRTZWxlY3RlZCgpfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWxlY3RlZFNlY3Rpb25zID0gdGhpcy5fc2VjdGlvbnMuZmlsdGVyKF9zZWN0aW9uID0+IF9zZWN0aW9uLnNlbGVjdGVkID09PSB0cnVlKTtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVkID0gc2VsZWN0ZWRTZWN0aW9ucy5sZW5ndGggIT09IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSkpO1xuXG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKF9zZWN0aW9uLm9uUmFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9zZWN0aW9ucy5maW5kSW5kZXgoX19zZWN0aW9uID0+IF9fc2VjdGlvbi5pZCA9PT0gX3NlY3Rpb24uaWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5fc2VjdGlvbnNbaW5kZXhdID0ge2lkOiBfc2VjdGlvbi5nZXRJZCgpLCBzZWxlY3RlZDogX3NlY3Rpb24uZ2V0U2VsZWN0ZWQoKX07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fc2VjdGlvbnMucHVzaCh7aWQ6IF9zZWN0aW9uLmdldElkKCksIHNlbGVjdGVkOiBfc2VjdGlvbi5nZXRTZWxlY3RlZCgpfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLl9zZWN0aW9ucy5maWx0ZXIoX3NlY3Rpb24gPT4gX3NlY3Rpb24uc2VsZWN0ZWQgPT09IHRydWUpO1xuICAgICAgICB0aGlzLl9hY3RpdmF0ZWQgPSBzZWxlY3RlZE9wdGlvbnMubGVuZ3RoICE9PSB0aGlzLl9zZWN0aW9ucy5sZW5ndGg7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59IiwiPGJ1dHRvbiBcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cImJpenktZmlsdGVyIHt7Y3VzdG9tQ2xhc3N9fVwiXG4gICAgW25nQ2xhc3NdPVwieydiaXp5LWZpbHRlci0tZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxuICAgIGlkPVwie3tpZH19XCJcbiAgICAoY2xpY2spPVwiX29uT3BlbigkZXZlbnQpXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwiX29uT3BlbigkZXZlbnQpXCJcbiAgICBjZGtPdmVybGF5T3JpZ2luIFxuICAgICNiaXp5RmlsdGVyVHJpZ2dlcj1cImNka092ZXJsYXlPcmlnaW5cIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1maWx0ZXJfX2NvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1maWx0ZXJfX2JhZGdlXCIgW25nQ2xhc3NdPVwieydiaXp5LWZpbHRlcl9fYmFkZ2UtLXZpc2libGUnOiBfYWN0aXZhdGVkfVwiPjwvc3Bhbj5cbiAgICBcbjwvYnV0dG9uPlxuXG48bmctdGVtcGxhdGVcbiAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlNaW5XaWR0aF09XCJfZmlsdGVyV2lkdGhcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cImJpenlGaWx0ZXJUcmlnZ2VyXCJcbiAgICAob3ZlcmxheU91dHNpZGVDbGljayk9XCJjbG9zZSgkZXZlbnQpXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwib3BlbmVkXCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktZmlsdGVyX19zZWN0aW9uc1wiPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktZmlsdGVyLXNlY3Rpb25cIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8L3NwYW4+XG5cbjwvbmctdGVtcGxhdGU+XG4iXX0=