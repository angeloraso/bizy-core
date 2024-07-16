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
        if (this.disabled) {
            return;
        }
        this._opened = !this._opened;
        this.ref.detectChanges();
        setTimeout(() => {
            this.selectedChange.emit(this._opened);
            this.onSelect.emit(event);
        }, 50);
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
                    setTimeout(() => {
                        options[i].selectedChange.emit(true);
                    }, 50);
                }
                else {
                    setTimeout(() => {
                        options[i].selectedChange.emit(false);
                    }, 50);
                }
            }
            else {
                setTimeout(() => {
                    options[i].selectedChange.emit(false);
                }, 50);
            }
        }
        return founded;
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarFloatingOptionComponent, selector: "bizy-sidebar-floating-option", inputs: { id: "id", disabled: "disabled", offsetX: "offsetX", offsetY: "offsetY", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--disabled': disabled, 'bizy-sidebar-floating-option--selected': _selected}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened && options && options.length > 0\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:calc(100% + 2rem);max-width:calc(100vw - 2rem);border-radius:.3rem;max-height:30rem;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarFloatingOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-floating-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    class=\"bizy-sidebar-floating-option {{customClass}}\"\n    [ngClass]=\"{'bizy-sidebar-floating-option--disabled': disabled, 'bizy-sidebar-floating-option--selected': _selected}\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    cdkOverlayOrigin \n    #bizySidebarFloatingOptionTrigger=\"cdkOverlayOrigin\">\n\n    <span class=\"bizy-sidebar-floating-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOffsetX]=\"offsetX\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    [cdkConnectedOverlayOrigin]=\"bizySidebarFloatingOptionTrigger\"\n    (overlayOutsideClick)=\"close($event)\"\n    [cdkConnectedOverlayOpen]=\"_opened && options && options.length > 0\">\n\n    <span class=\"bizy-sidebar-floating-option__options\">\n\n        <ng-content select=\"bizy-sidebar-floating-option-title\"></ng-content>\n\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n\n    </span>\n\n</ng-template>", styles: [":host{font-size:1rem;direction:ltr}.bizy-sidebar-floating-option{background-color:var(--bizy-sidebar-floating-option-background-color);color:var(--bizy-sidebar-floating-option-color);border:none;display:flex;align-items:center;justify-content:center;column-gap:.5rem;padding:1rem;width:100%;cursor:pointer;border-top-left-radius:.3rem}.bizy-sidebar-floating-option:hover{background-color:var(--bizy-sidebar-option-hover-color)}.bizy-sidebar-floating-option--selected{background-color:var(--bizy-sidebar-option-selected-color)!important}.bizy-sidebar-floating-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-sidebar-floating-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;pointer-events:none}.bizy-sidebar-floating-option__options{background-color:var(--bizy-sidebar-floating-option-background-color);min-width:calc(100% + 2rem);max-width:calc(100vw - 2rem);border-radius:.3rem;max-height:30rem;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1mbG9hdGluZy1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1mbG9hdGluZy1vcHRpb24vc2lkZWJhci1mbG9hdGluZy1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1mbG9hdGluZy1vcHRpb24vc2lkZWJhci1mbG9hdGluZy1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ2pMLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBUXJELE1BQU0sT0FBTyxrQ0FBa0M7SUE4QlI7SUE3QlEsT0FBTyxDQUF5QztJQUNwRixFQUFFLEdBQVcsZ0NBQWdDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQzdELFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsT0FBTyxHQUFXLENBQUMsQ0FBQztJQUNwQixPQUFPLEdBQVcsQ0FBQyxDQUFDO0lBQ3BCLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDeEIsY0FBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFDN0MsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDO0lBRXRELFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMvQyxTQUFTLEdBQVksS0FBSyxD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RTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNJLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFNTSxRQUFRO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL3NpZGViYXItb3B0aW9uL3NpZGViYXItb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXNpZGViYXItZmxvYXRpbmctb3B0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZGViYXItZmxvYXRpbmctb3B0aW9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50KSBvcHRpb25zITogUXVlcnlMaXN0PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LXNpZGViYXItZmxvYXRpbmctb3B0aW9uLSR7TWF0aC5yYW5kb20oKX1gO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBvZmZzZXRYOiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBvZmZzZXRZOiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG5cbiAgX3R1cm5PbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgX3NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIF9vcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdGVkID09PSAndW5kZWZpbmVkJyB8fCBzZWxlY3RlZCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHR1cm5PbiA9IHNlbGVjdGVkICYmIHNlbGVjdGVkICE9PSB0aGlzLl9zZWxlY3RlZDtcbiAgICB0aGlzLl90dXJuT24kLm5leHQodHVybk9uKTtcbiAgICB0aGlzLl9vcGVuZWQgPSB0dXJuT247XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAjb3B0aW9uU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuI2xpc3Rlbk9wdGlvbkNoYW5nZXModGhpcy5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMub3B0aW9ucy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLiNvcHRpb25TdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMuI2xpc3Rlbk9wdGlvbkNoYW5nZXModGhpcy5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICB9KSlcbiAgICB9XG4gIH1cblxuICBfb25TZWxlY3QoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fb3BlbmVkID0gIXRoaXMuX29wZW5lZDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5fb3BlbmVkKTtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudCk7XG4gICAgfSwgNTApXG4gIH1cblxuICBjbG9zZSA9IChldmVudDogUG9pbnRlckV2ZW50ICYge3RhcmdldDoge2lkOiBzdHJpbmd9fSkgPT4ge1xuICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkICYmIGV2ZW50LnRhcmdldC5pZCA9PT0gdGhpcy5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX29wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGdldElkID0gKCk6IHN0cmluZyAgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWQgPSAoKTogYm9vbGVhbiAgPT4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgI2xpc3Rlbk9wdGlvbkNoYW5nZXMgPSAob3B0aW9uczogQXJyYXk8Qml6eVNpZGViYXJPcHRpb25Db21wb25lbnQ+KSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuICAgICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLmFkZChfb3B0aW9uLl90dXJuT24kLnN1YnNjcmliZSh0dXJuT24gPT4ge1xuICAgICAgICBpZiAodHVybk9uKSB7XG4gICAgICAgICAgaWYgKCFfb3B0aW9uLm9wdGlvbnMgfHwgX29wdGlvbi5vcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4jc2VsZWN0UGFyZW50cyh0aGlzLm9wdGlvbnMudG9BcnJheSgpLCBfb3B0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuXG4gICAgICBpZiAoX29wdGlvbi5vcHRpb25zICYmIF9vcHRpb24ub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuI2xpc3Rlbk9wdGlvbkNoYW5nZXMoX29wdGlvbi5vcHRpb25zLnRvQXJyYXkoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAjc2VsZWN0UGFyZW50cyA9IChvcHRpb25zOiBBcnJheTxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD4sIG9wdGlvbjogQml6eVNpZGViYXJPcHRpb25Db21wb25lbnQpOiBib29sZWFuID0+IHtcbiAgICBsZXQgZm91bmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9wdGlvbnNbaV0uZ2V0SWQoKSA9PT0gb3B0aW9uLmdldElkKCkpIHtcbiAgICAgICAgZm91bmRlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnNbaV0ub3B0aW9ucyAmJiBvcHRpb25zW2ldLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBfZm91bmRlZCA9IHRoaXMuI3NlbGVjdFBhcmVudHMob3B0aW9uc1tpXS5vcHRpb25zLnRvQXJyYXkoKSwgb3B0aW9uKTtcbiAgICAgICAgaWYgKF9mb3VuZGVkKSB7XG4gICAgICAgICAgZm91bmRlZCA9IHRydWU7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgfSwgNTApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgIH0sIDUwKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgb3B0aW9uc1tpXS5zZWxlY3RlZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgfSwgNTApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kZWQ7XG4gIH07XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn0iLCI8YnV0dG9uIFxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNsYXNzPVwiYml6eS1zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbiB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIFtuZ0NsYXNzXT1cInsnYml6eS1zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbi0tZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ2Jpenktc2lkZWJhci1mbG9hdGluZy1vcHRpb24tLXNlbGVjdGVkJzogX3NlbGVjdGVkfVwiXG4gICAgW2lkXT1cImlkXCJcbiAgICAoY2xpY2spPVwiX29uU2VsZWN0KCRldmVudClcIlxuICAgIChrZXl1cC5lbnRlcik9XCJfb25TZWxlY3QoJGV2ZW50KVwiXG4gICAgY2RrT3ZlcmxheU9yaWdpbiBcbiAgICAjYml6eVNpZGViYXJGbG9hdGluZ09wdGlvblRyaWdnZXI9XCJjZGtPdmVybGF5T3JpZ2luXCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktc2lkZWJhci1mbG9hdGluZy1vcHRpb25fX2NvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cbiAgICBcbjwvYnV0dG9uPlxuXG48bmctdGVtcGxhdGVcbiAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPZmZzZXRYXT1cIm9mZnNldFhcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T2Zmc2V0WV09XCJvZmZzZXRZXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJiaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uVHJpZ2dlclwiXG4gICAgKG92ZXJsYXlPdXRzaWRlQ2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cIl9vcGVuZWQgJiYgb3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCA+IDBcIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1zaWRlYmFyLWZsb2F0aW5nLW9wdGlvbl9fb3B0aW9uc1wiPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktc2lkZWJhci1mbG9hdGluZy1vcHRpb24tdGl0bGVcIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1zaWRlYmFyLW9wdGlvblwiPjwvbmctY29udGVudD5cblxuICAgIDwvc3Bhbj5cblxuPC9uZy10ZW1wbGF0ZT4iXX0=