import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren } from '@angular/core';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { Subscription } from 'rxjs';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizySidebarComponent {
    id = `bizy-sidebar-${Math.random()}`;
    options;
    floatingOptions;
    toggleChange = new EventEmitter();
    onToggle = new EventEmitter();
    _toggle = false;
    #subscription = new Subscription();
    #optionSubscription = new Subscription();
    #floatingOptionSubscription = new Subscription();
    set toggle(toggle) {
        if (typeof toggle === 'undefined' || toggle === null) {
            return;
        }
        this._toggle = toggle;
        this.#unsubscribe();
        this.#subscription = new Subscription();
        this.#optionSubscription = new Subscription();
        this.#floatingOptionSubscription = new Subscription();
        setTimeout(() => {
            this.#listenOptions();
        }, 500);
    }
    ngAfterContentInit() {
        this.#listenOptions();
    }
    #listenOptions() {
        if (this.options && this.options.length > 0) {
            this.#listenOptionChanges(this.options.toArray());
            this.#subscription.add(this.options.changes.subscribe(() => {
                this.#optionSubscription.unsubscribe();
                this.#optionSubscription = new Subscription();
                this.#listenOptionChanges(this.options.toArray());
            }));
        }
        if (this.floatingOptions && this.floatingOptions.length > 0) {
            this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
            this.#subscription.add(this.floatingOptions.changes.subscribe(() => {
                this.#floatingOptionSubscription.unsubscribe();
                this.#floatingOptionSubscription = new Subscription();
                this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
            }));
        }
    }
    #listenOptionChanges = (options) => {
        options.forEach(_option => {
            this.#optionSubscription.add(_option._turnOn$.subscribe(turnOn => {
                if (turnOn) {
                    this.#selectParents(this.options.toArray(), _option);
                }
            }));
            if (_option.options && _option.options.length > 0) {
                this.#listenOptionChanges(_option.options.toArray());
            }
        });
    };
    #listenFloatingOptionChanges = (options) => {
        options.forEach(_option => {
            this.#floatingOptionSubscription.add(_option._turnOn$.subscribe(turnOn => {
                if (turnOn) {
                    this.floatingOptions.forEach(__option => {
                        if (__option.getId() !== _option.getId()) {
                            setTimeout(() => {
                                __option.selectedChange.emit(false);
                            }, 100);
                        }
                    });
                }
            }));
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
                    }, 100);
                }
                else {
                    setTimeout(() => {
                        options[i].selectedChange.emit(false);
                    }, 100);
                }
            }
            else {
                setTimeout(() => {
                    options[i].selectedChange.emit(false);
                }, 100);
            }
        }
        return founded;
    };
    #unsubscribe() {
        this.#subscription.unsubscribe();
        this.#optionSubscription.unsubscribe();
        this.#floatingOptionSubscription.unsubscribe();
    }
    _onToggle(event) {
        this.toggleChange.emit(!this._toggle);
        this.onToggle.emit(event);
    }
    ngOnDestroy() {
        this.#unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarComponent, selector: "bizy-sidebar", inputs: { id: "id", toggle: "toggle" }, outputs: { toggleChange: "toggleChange", onToggle: "onToggle" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }, { propertyName: "floatingOptions", predicate: BizySidebarFloatingOptionComponent }], ngImport: i0, template: "<div class=\"bizy-sidebar\" [id]=\"id\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"_onToggle($event)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"_toggle\"/>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__top\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__bottom\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width)}.bizy-sidebar{min-width:-moz-fit-content;min-width:fit-content;height:100%;max-height:100vh;background-color:var(--bizy-sidebar-background-color);position:relative;transition:width .2s ease;display:grid;grid-template-columns:100%;grid-template-rows:auto 1fr auto}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__top{overflow:hidden;align-self:start}.bizy-sidebar__bottom{overflow:hidden;align-self:end}.bizy-sidebar__content{display:flex;min-height:var(--bizy-sidebar-section-min-height);width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding:var(--bizy-sidebar-padding);overflow-x:hidden;transition:width .2s ease}.bizy-sidebar__content--shrinked{padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-scroll-bar-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-sidebar\" [id]=\"id\">\n\n  <span class=\"bizy-sidebar__tab\" id=\"bizy-sidebar-tab\" (click)=\"_onToggle($event)\">\n    <svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bizy-sidebar__tab__svg\">\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z\"/>\n      <path class=\"bizy-sidebar__tab__svg__path\" d=\"M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z\"/>\n    </svg>\n  </span>\n\n  <input class=\"bizy-sidebar__toggle\" id=\"bizy-sidebar-toggle\" type=\"checkbox\" [checked]=\"_toggle\"/>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__top\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=start]\"></ng-content>\n\n    <ng-content></ng-content>\n\n  </span>\n\n  <span class=\"bizy-sidebar__content bizy-sidebar__bottom\" [ngClass]=\"{'bizy-sidebar__content--shrinked': _toggle}\">\n\n    <ng-content select=\"[slot=end]\"></ng-content>\n\n  </span>\n\n</div>\n", styles: [":host{font-size:1rem}:host:has(.bizy-sidebar__toggle:checked) .bizy-sidebar .bizy-sidebar__content{width:var(--bizy-sidebar-shrinked-width)}.bizy-sidebar{min-width:-moz-fit-content;min-width:fit-content;height:100%;max-height:100vh;background-color:var(--bizy-sidebar-background-color);position:relative;transition:width .2s ease;display:grid;grid-template-columns:100%;grid-template-rows:auto 1fr auto}.bizy-sidebar input[type=checkbox]{display:none}.bizy-sidebar__tab{cursor:pointer;height:var(--bizy-sidebar-tab-height);min-height:2.6rem;width:var(--bizy-sidebar-tab-width);position:absolute;left:100%;top:var(--bizy-sidebar-tab-top);background-color:var(--bizy-sidebar-tab-background-color);z-index:999;border-top-right-radius:.7rem;border-bottom-right-radius:.7rem;display:flex;justify-content:center;align-items:center;margin-left:.2rem}.bizy-sidebar__tab__svg{height:100%;width:100%}.bizy-sidebar__tab__svg__path{fill:var(--bizy-sidebar-tab-color)}.bizy-sidebar__top{overflow:hidden;align-self:start}.bizy-sidebar__bottom{overflow:hidden;align-self:end}.bizy-sidebar__content{display:flex;min-height:var(--bizy-sidebar-section-min-height);width:var(--bizy-sidebar-width);flex-direction:column;direction:rtl;padding:var(--bizy-sidebar-padding);overflow-x:hidden;transition:width .2s ease}.bizy-sidebar__content--shrinked{padding-left:0!important}.bizy-sidebar__content::-webkit-scrollbar{width:.5rem;height:.5rem}.bizy-sidebar__content::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-sidebar-scroll-bar-color)}.bizy-sidebar__content::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], floatingOptions: [{
                type: ContentChildren,
                args: [BizySidebarFloatingOptionComponent]
            }], toggleChange: [{
                type: Output
            }], onToggle: [{
                type: Output
            }], toggle: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zaWRlYmFyL3NpZGViYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBOEIsTUFBTSxlQUFlLENBQUM7QUFDN0ksT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSw2REFBNkQsQ0FBQzs7O0FBUWpILE1BQU0sT0FBTyxvQkFBb0I7SUFDdEIsRUFBRSxHQUFXLGdCQUFnQixJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNULE9BQU8sQ0FBeUM7SUFDeEMsZUFBZSxDQUFpRDtJQUMzRyxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUMzQyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFFdEQsT0FBTyxHQUFZLEtBQUssQ0FBQztJQUN6QixhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNuQyxtQkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3pDLDJCQUEyQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFakQsSUFBYSxNQUFNLENBQUMsTUFBZTtRQUNqQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3BELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxP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LHVCQUF1QixDQUFDLE1BQU07OEJBR3RDLEVBQUU7c0JBQVYsS0FBSztnQkFDdUMsT0FBTztzQkFBbkQsZUFBZTt1QkFBQywwQkFBMEI7Z0JBQ1UsZUFBZTtzQkFBbkUsZUFBZTt1QkFBQyxrQ0FBa0M7Z0JBQ3pDLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFPTSxNQUFNO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQWZ0ZXJDb250ZW50SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vc2lkZWJhci1vcHRpb24vc2lkZWJhci1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vc2lkZWJhci1mbG9hdGluZy1vcHRpb24vc2lkZWJhci1mbG9hdGluZy1vcHRpb24uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1zaWRlYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZGViYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NpZGViYXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlTaWRlYmFyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1zaWRlYmFyLSR7TWF0aC5yYW5kb20oKX1gO1xuICBAQ29udGVudENoaWxkcmVuKEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50KSBvcHRpb25zITogUXVlcnlMaXN0PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50PjtcbiAgQENvbnRlbnRDaGlsZHJlbihCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50KSBmbG9hdGluZ09wdGlvbnMhOiBRdWVyeUxpc3Q8Qml6eVNpZGViYXJGbG9hdGluZ09wdGlvbkNvbXBvbmVudD47XG4gIEBPdXRwdXQoKSB0b2dnbGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7IFxuICBAT3V0cHV0KCkgb25Ub2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTsgXG5cbiAgX3RvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAjb3B0aW9uU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAjZmxvYXRpbmdPcHRpb25TdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgQElucHV0KCkgc2V0IHRvZ2dsZSh0b2dnbGU6IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIHRvZ2dsZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdG9nZ2xlID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fdG9nZ2xlID0gdG9nZ2xlO1xuXG4gICAgdGhpcy4jdW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMuI2Zsb2F0aW5nT3B0aW9uU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLiNsaXN0ZW5PcHRpb25zKCk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLiNsaXN0ZW5PcHRpb25zKCk7XG4gIH1cblxuICAjbGlzdGVuT3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLiNsaXN0ZW5PcHRpb25DaGFuZ2VzKHRoaXMub3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLm9wdGlvbnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLiNvcHRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLiNsaXN0ZW5PcHRpb25DaGFuZ2VzKHRoaXMub3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgfSkpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmxvYXRpbmdPcHRpb25zICYmIHRoaXMuZmxvYXRpbmdPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuI2xpc3RlbkZsb2F0aW5nT3B0aW9uQ2hhbmdlcyh0aGlzLmZsb2F0aW5nT3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmZsb2F0aW5nT3B0aW9ucy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuI2Zsb2F0aW5nT3B0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuI2Zsb2F0aW5nT3B0aW9uU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLiNsaXN0ZW5GbG9hdGluZ09wdGlvbkNoYW5nZXModGhpcy5mbG9hdGluZ09wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gICNsaXN0ZW5PcHRpb25DaGFuZ2VzID0gKG9wdGlvbnM6IEFycmF5PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50PikgPT4ge1xuICAgIG9wdGlvbnMuZm9yRWFjaChfb3B0aW9uID0+IHtcbiAgICAgIHRoaXMuI29wdGlvblN1YnNjcmlwdGlvbi5hZGQoX29wdGlvbi5fdHVybk9uJC5zdWJzY3JpYmUodHVybk9uID0+IHtcbiAgICAgICAgaWYgKHR1cm5Pbikge1xuICAgICAgICAgIHRoaXMuI3NlbGVjdFBhcmVudHModGhpcy5vcHRpb25zLnRvQXJyYXkoKSwgX29wdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgICAgaWYgKF9vcHRpb24ub3B0aW9ucyAmJiBfb3B0aW9uLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLiNsaXN0ZW5PcHRpb25DaGFuZ2VzKF9vcHRpb24ub3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgI2xpc3RlbkZsb2F0aW5nT3B0aW9uQ2hhbmdlcyA9IChvcHRpb25zOiBBcnJheTxCaXp5U2lkZWJhckZsb2F0aW5nT3B0aW9uQ29tcG9uZW50PikgPT4ge1xuICAgIG9wdGlvbnMuZm9yRWFjaChfb3B0aW9uID0+IHtcbiAgICAgIHRoaXMuI2Zsb2F0aW5nT3B0aW9uU3Vic2NyaXB0aW9uLmFkZChfb3B0aW9uLl90dXJuT24kLnN1YnNjcmliZSh0dXJuT24gPT4ge1xuICAgICAgICBpZiAodHVybk9uKSB7XG4gICAgICAgICAgdGhpcy5mbG9hdGluZ09wdGlvbnMuZm9yRWFjaChfX29wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoX19vcHRpb24uZ2V0SWQoKSAhPT0gX29wdGlvbi5nZXRJZCgpKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIF9fb3B0aW9uLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gICNzZWxlY3RQYXJlbnRzID0gKG9wdGlvbnM6IEFycmF5PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50Piwgb3B0aW9uOiBCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudCk6IGJvb2xlYW4gPT4ge1xuICAgIGxldCBmb3VuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAob3B0aW9uc1tpXS5nZXRJZCgpID09PSBvcHRpb24uZ2V0SWQoKSkge1xuICAgICAgICBmb3VuZGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9uc1tpXS5vcHRpb25zICYmIG9wdGlvbnNbaV0ub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IF9mb3VuZGVkID0gdGhpcy4jc2VsZWN0UGFyZW50cyhvcHRpb25zW2ldLm9wdGlvbnMudG9BcnJheSgpLCBvcHRpb24pO1xuICAgICAgICBpZiAoX2ZvdW5kZWQpIHtcbiAgICAgICAgICBmb3VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnNbaV0uc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgICAgICB9LCAxMDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIG9wdGlvbnNbaV0uc2VsZWN0ZWRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgIH0sIDEwMClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmRlZDtcbiAgfTtcblxuICAjdW5zdWJzY3JpYmUoKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy4jb3B0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy4jZmxvYXRpbmdPcHRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIF9vblRvZ2dsZShldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgdGhpcy50b2dnbGVDaGFuZ2UuZW1pdCghdGhpcy5fdG9nZ2xlKTtcbiAgICB0aGlzLm9uVG9nZ2xlLmVtaXQoZXZlbnQpXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiN1bnN1YnNjcmliZSgpO1xuICB9XG59IiwiPGRpdiBjbGFzcz1cImJpenktc2lkZWJhclwiIFtpZF09XCJpZFwiPlxuXG4gIDxzcGFuIGNsYXNzPVwiYml6eS1zaWRlYmFyX190YWJcIiBpZD1cImJpenktc2lkZWJhci10YWJcIiAoY2xpY2spPVwiX29uVG9nZ2xlKCRldmVudClcIj5cbiAgICA8c3ZnIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImJpenktc2lkZWJhcl9fdGFiX19zdmdcIj5cbiAgICAgIDxwYXRoIGNsYXNzPVwiYml6eS1zaWRlYmFyX190YWJfX3N2Z19fcGF0aFwiIGQ9XCJNMTAgNkM4Ljg5NTQzIDYgOCA1LjEwNDU3IDggNEM4IDIuODk1NDMgOC44OTU0MyAyIDEwIDJDMTEuMTA0NiAyIDEyIDIuODk1NDMgMTIgNEMxMiA1LjEwNDU3IDExLjEwNDYgNiAxMCA2WlwiLz5cbiAgICAgIDxwYXRoIGNsYXNzPVwiYml6eS1zaWRlYmFyX190YWJfX3N2Z19fcGF0aFwiIGQ9XCJNMTAgMTJDOC44OTU0MyAxMiA4IDExLjEwNDYgOCAxMEM4IDguODk1NDMgOC44OTU0MyA4IDEwIDhDMTEuMTA0NiA4IDEyIDguODk1NDMgMTIgMTBDMTIgMTEuMTA0NiAxMS4xMDQ2IDEyIDEwIDEyWlwiLz5cbiAgICAgIDxwYXRoIGNsYXNzPVwiYml6eS1zaWRlYmFyX190YWJfX3N2Z19fcGF0aFwiIGQ9XCJNMTAgMThDOC44OTU0MyAxOCA4IDE3LjEwNDYgOCAxNkM4IDE0Ljg5NTQgOC44OTU0MyAxNCAxMCAxNEMxMS4xMDQ2IDE0IDEyIDE0Ljg5NTQgMTIgMTZDMTIgMTcuMTA0NiAxMS4xMDQ2IDE4IDEwIDE4WlwiLz5cbiAgICA8L3N2Zz5cbiAgPC9zcGFuPlxuXG4gIDxpbnB1dCBjbGFzcz1cImJpenktc2lkZWJhcl9fdG9nZ2xlXCIgaWQ9XCJiaXp5LXNpZGViYXItdG9nZ2xlXCIgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiX3RvZ2dsZVwiLz5cblxuICA8c3BhbiBjbGFzcz1cImJpenktc2lkZWJhcl9fY29udGVudCBiaXp5LXNpZGViYXJfX3RvcFwiIFtuZ0NsYXNzXT1cInsnYml6eS1zaWRlYmFyX19jb250ZW50LS1zaHJpbmtlZCc6IF90b2dnbGV9XCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1zdGFydF1cIj48L25nLWNvbnRlbnQ+XG5cbiAgPC9zcGFuPlxuXG4gIDxzcGFuIGNsYXNzPVwiYml6eS1zaWRlYmFyX19jb250ZW50XCIgW25nQ2xhc3NdPVwieydiaXp5LXNpZGViYXJfX2NvbnRlbnQtLXNocmlua2VkJzogX3RvZ2dsZX1cIj5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PXN0YXJ0XVwiPjwvbmctY29udGVudD5cblxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuICA8L3NwYW4+XG5cbiAgPHNwYW4gY2xhc3M9XCJiaXp5LXNpZGViYXJfX2NvbnRlbnQgYml6eS1zaWRlYmFyX19ib3R0b21cIiBbbmdDbGFzc109XCJ7J2Jpenktc2lkZWJhcl9fY29udGVudC0tc2hyaW5rZWQnOiBfdG9nZ2xlfVwiPlxuXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9ZW5kXVwiPjwvbmctY29udGVudD5cblxuICA8L3NwYW4+XG5cbjwvZGl2PlxuIl19