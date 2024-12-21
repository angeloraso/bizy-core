import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, Output } from '@angular/core';
import { BizySidebarOptionComponent } from '../sidebar-option/sidebar-option.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
export class BizySidebarFloatingOptionComponent {
    ref;
    options;
    id = `bizy-sidebar-floating-option-${Math.random()}`;
    disabled = false;
    selectable = true;
    offsetX = 0;
    offsetY = 0;
    customClass = '';
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _turnOn$ = new BehaviorSubject(false);
    _selected = false;
    _opened = false;
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        const turnOn = selected && selected !== this._selected;
        this._turnOn$.next(turnOn);
        this._opened = turnOn;
        this._selected = selected;
        this.ref.detectChanges();
    }
    #subscription = new Subscription();
    #optionSubscription = new Subscription();
    constructor(ref) {
        this.ref = ref;
    }
    ngAfterContentInit() {
        if (this.options && this.options.length > 0) {
            this.#listenOptionChanges(this.options.toArray());
            this.#subscription.add(this.options.changes.subscribe(() => {
                this.#optionSubscription.unsubscribe();
                this.#optionSubscription = new Subscription();
                this.#listenOptionChanges(this.options.toArray());
            }));
        }
    }
    _onSelect(event) {
        if (this.disabled || !this.selectable) {
            return;
        }
        this._opened = !this._opened;
        this.ref.detectChanges();
        this.selectedChange.emit(this._opened);
        this.onSelect.emit(event);
    }
    close = (event) => {
        if (event && event.target && event.target.id && event.target.id === this.id) {
            return;
        }
        this._opened = false;
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
            this.#optionSubscription.add(_option._turnOn$.subscribe(turnOn => {
                if (turnOn) {
                    if (!_option.options || _option.options.length === 0) {
                        this._opened = false;
                        this.ref.detectChanges();
                    }
                    this.#selectParents(this.options.toArray(), _option);
                }
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenOptionChanges(_option.options.toArray());
            }
        });
    };
    #selectParents = (options, option) => {
        let founded = false;
        for (let i = 0; i < options.length; i++) {
            if (options[i].getId() === option.getId()) {
                founded = true;
            }
            else if (options[i].options && options[i].options.length > 0) {
                const _founded = this.#selectParents(options[i].options.toArray(), option);
                if (_founded) {
                    founded = true;
                    options[i].selectedChange.emit(true);
                }
                else {
                    options[i].selectedChange.emit(false);
                }
            }
            else {
                options[i].selectedChange.emit(false);
            }
        }
        return founded;
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarFloatingOptionComponent, selector: "bizy-sidebar-floating-option", inputs: { id: "id", disabled: "disabled", selectable: "selectable", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--selected': _selected, 'bizy-sidebar-floating-option--no-selectable': !selectable, 'bizy-sidebar-floating-option--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened && options && options.length > 0\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--no-selectable{pointer-events:none;cursor:default!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:calc(100% + 2rem);max-width:calc(100vw - 2rem);border-radius:.3rem;max-height:30rem;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-floating-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--selected': _selected, 'bizy-sidebar-floating-option--no-selectable': !selectable, 'bizy-sidebar-floating-option--disabled': disabled}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened && options && options.length > 0\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--no-selectable{pointer-events:none;cursor:default!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:calc(100% + 2rem);max-width:calc(100vw - 2rem);border-radius:.3rem;max-height:30rem;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectable: [{
                type: Input
            }], offsetX: [{
                type: Input
            }], offsetY: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1mbG9hdGluZy1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1mbG9hdGluZy1vcHRpb24vc2lkZWJhci1mbG9hdGluZy1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1mbG9hdGluZy1vcHRpb24vc2lkZWJhci1mbG9hdGluZy1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ2pMLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBUXJELE1BQU0sT0FBTyxrQ0FBa0M7SUErQlI7SUE5QlEsT0FBTyxDQUF5QztJQUNwRixFQUFFLEdBQVcsZ0NBQWdDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQzdELFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsVUFBVSxHQUFZLElBQUksQ0FBQztJQUMzQixPQUFPLEdBQVcsQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sR0FBVyxDQUFDLENBQUM7SUFDcEIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN4QixjQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUM3QyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFFdEQsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxD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TU0sUUFBUTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQml6eVNpZGViYXJPcHRpb25Db21wb25lbnQgfSBmcm9tICcuLi9zaWRlYmFyLW9wdGlvbi9zaWRlYmFyLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZWJhci1mbG9hdGluZy1vcHRpb24uY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudCkgb3B0aW9ucyE6IFF1ZXJ5TGlzdDxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD47XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIG9mZnNldFg6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIG9mZnNldFk6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcblxuICBfdHVybk9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX29wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNldCBzZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWQgPT09ICd1bmRlZmluZWQnIHx8IHNlbGVjdGVkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdHVybk9uID0gc2VsZWN0ZWQgJiYgc2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGVkO1xuICAgIHRoaXMuX3R1cm5PbiQubmV4dCh0dXJuT24pO1xuICAgIHRoaXMuX29wZW5lZCA9IHR1cm5PbjtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICNvcHRpb25TdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy4jbGlzdGVuT3B0aW9uQ2hhbmdlcyh0aGlzLm9wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5vcHRpb25zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy4jbGlzdGVuT3B0aW9uQ2hhbmdlcyh0aGlzLm9wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIF9vblNlbGVjdChldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuc2VsZWN0YWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX29wZW5lZCA9ICF0aGlzLl9vcGVuZWQ7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLl9vcGVuZWQpO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudCk7XG4gIH1cblxuICBjbG9zZSA9IChldmVudDogUG9pbnRlckV2ZW50ICYge3RhcmdldDoge2lkOiBzdHJpbmd9fSkgPT4ge1xuICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkICYmIGV2ZW50LnRhcmdldC5pZCA9PT0gdGhpcy5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX29wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGdldElkID0gKCk6IHN0cmluZyAgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWQgPSAoKTogYm9vbGVhbiAgPT4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgI2xpc3Rlbk9wdGlvbkNoYW5nZXMgPSAob3B0aW9uczogQXJyYXk8Qml6eVNpZGViYXJPcHRpb25Db21wb25lbnQ+KSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLmFkZChfb3B0aW9uLl90dXJuT24kLnN1YnNjcmliZSh0dXJuT24gPT4ge1xuICAgICAgICBpZiAodHVybk9uKSB7XG4gICAgICAgICAgaWYgKCFfb3B0aW9uLm9wdGlvbnMgfHwgX29wdGlvbi5vcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4jc2VsZWN0UGFyZW50cyh0aGlzLm9wdGlvbnMudG9BcnJheSgpLCBfb3B0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuXG4gICAgICBpZiAoX29wdGlvbi5vcHRpb25zICYmIF9vcHRpb24ub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuI2xpc3Rlbk9wdGlvbkNoYW5nZXMoX29wdGlvbi5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAjc2VsZWN0UGFyZW50cyA9IChvcHRpb25zOiBBcnJheTxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD4sIG9wdGlvbjogQml6eVNpZGViYXJPcHRpb25Db21wb25lbnQpOiBib29sZWFuID0+IHtcbiAgICBsZXQgZm91bmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9wdGlvbnNbaV0uZ2V0SWQoKSA9PT0gb3B0aW9uLmdldElkKCkpIHtcbiAgICAgICAgZm91bmRlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnNbaV0ub3B0aW9ucyAmJiBvcHRpb25zW2ldLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBfZm91bmRlZCA9IHRoaXMuI3NlbGVjdFBhcmVudHMob3B0aW9uc1tpXS5vcHRpb25zLnRvQXJyYXkoKSwgb3B0aW9uKTtcbiAgICAgICAgaWYgKF9mb3VuZGVkKSB7XG4gICAgICAgICAgZm91bmRlZCA9IHRydWU7XG4gICAgICAgICAgb3B0aW9uc1tpXS5zZWxlY3RlZENoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnNbaV0uc2VsZWN0ZWRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmb3VuZGVkO1xuICB9O1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59IiwiPGJ1dHRvbiBcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cImJpenktc2lkZWJhci1mbG9hdGluZy1vcHRpb24ge3tjdXN0b21DbGFzc319XCJcbiAgICBbbmdDbGFzc109XCJ7J2Jpenktc2lkZWJhci1mbG9hdGluZy1vcHRpb24tLXNlbGVjdGVkJzogX3NlbGVjdGVkLCAnYml6eS1zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi0tbm8tc2VsZWN0YWJsZSc6ICFzZWxlY3RhYmxlLCAnYml6eS1zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi0tZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxuICAgIFtpZF09XCJpZFwiXG4gICAgKGNsaWNrKT1cIl9vblNlbGVjdCgkZXZlbnQpXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwiX29uU2VsZWN0KCRldmVudClcIlxuICAgIGNka092ZXJsYXlPcmlnaW4gXG4gICAgI2JpenlTaWRlYmFyRmxvYXRpbmdPcHRpb25UcmlnZ2VyPVwiY2RrT3ZlcmxheU9yaWdpblwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LXNpZGViYXItZmxvYXRpbmctb3B0aW9uX19jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG4gICAgXG48L2J1dHRvbj5cblxuPG5nLXRlbXBsYXRlXG4gICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T2Zmc2V0WF09XCJvZmZzZXRYXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9mZnNldFldPVwib2Zmc2V0WVwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwiYml6eVNpZGViYXJGbG9hdGluZ09wdGlvblRyaWdnZXJcIlxuICAgIChvdmVybGF5T3V0c2lkZUNsaWNrKT1cImNsb3NlKCRldmVudClcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJfb3BlbmVkICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5sZW5ndGggPiAwXCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktc2lkZWJhci1mbG9hdGluZy1vcHRpb25fX29wdGlvbnNcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXNpZGViYXItZmxvYXRpbmctb3B0aW9uLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktc2lkZWJhci1vcHRpb25cIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8L3NwYW4+XG5cbjwvbmctdGVtcGxhdGU+Il19