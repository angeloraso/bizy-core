import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, Inject } from '@angular/core';
import { FilterSectionOptionComponent } from '../filter-section-option/filter-section-option.component';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "../../checkbox/checkbox.component";
export class FilterSectionComponent {
    document;
    options;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    selected = true;
    onSelect = new EventEmitter();
    #subscription = new Subscription();
    _options = [];
    constructor(document) {
        this.document = document;
    }
    ngAfterViewInit() {
        if (this.options && this.options.length > 0) {
            this.options.forEach(_option => {
                this._options.push({ id: _option.getId(), selected: _option.getSelected() });
            });
            const selectedOptions = this._options.filter(_option => _option.selected === true);
            this.selected = selectedOptions.length === this._options.length;
            this.#listenOptionChanges();
        }
        else {
            const mutationObserver = new MutationObserver(() => {
                if (this.options && this.options.length > 0) {
                    this.options.forEach(_option => {
                        this._options.push({ id: _option.getId(), selected: _option.getSelected() });
                    });
                    const selectedOptions = this._options.filter(_option => _option.selected === true);
                    this.selected = selectedOptions.length === this._options.length;
                    this.#listenOptionChanges();
                    mutationObserver.disconnect();
                }
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        }
    }
    _onSelect() {
        if (this.disabled) {
            return;
        }
        this.selected = !this.selected;
        this._options = this._options.map(_option => {
            return { ..._option, selected: this.selected };
        });
        this.options.forEach(_option => {
            _option.setSelect(this.selected);
        });
    }
    #listenOptionChanges = () => {
        if (!this.options) {
            return;
        }
        this.options.forEach(_option => {
            this.#subscription.add(_option.onSelect.subscribe(data => {
                const index = this._options.findIndex(_option => _option.id === data.id);
                if (index !== -1) {
                    this._options[index] = data;
                }
                else {
                    this._options.push(data);
                }
                const selectedOptions = this._options.filter(_option => _option.selected === true);
                this.selected = selectedOptions.length === this._options.length;
                this.onSelect.emit(this._options);
            }));
        });
    };
    getSelected() {
        return this.selected;
    }
    getId() {
        return this.id;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionComponent, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FilterSectionComponent, selector: "bizy-filter-section", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: FilterSectionOptionComponent }], ngImport: i0, template: "<div class=\"bizy-filter-section {{customClass}}\" id=\"{{id}}\">\n\n    <button \n        type=\"button\"\n        class=\"bizy-filter-section__header\"\n        (click)=\"_onSelect()\"\n        (keyup.enter)=\"_onSelect()\">\n\n        <ng-content></ng-content>\n\n        <bizy-checkbox \n            [selected]=\"selected\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n        \n    </button>\n\n    <span class=\"bizy-filter-section__options\">\n        <ng-content select=\"bizy-filter-section-option\"></ng-content>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.7rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;column-gap:.5rem;cursor:pointer;border:none;background-color:transparent;justify-content:space-between;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;row-gap:.5rem;min-height:6rem;max-height:20rem;overflow-y:scroll;overflow-x:hidden}\n"], dependencies: [{ kind: "component", type: i1.CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-filter-section {{customClass}}\" id=\"{{id}}\">\n\n    <button \n        type=\"button\"\n        class=\"bizy-filter-section__header\"\n        (click)=\"_onSelect()\"\n        (keyup.enter)=\"_onSelect()\">\n\n        <ng-content></ng-content>\n\n        <bizy-checkbox \n            [selected]=\"selected\"\n            [disabled]=\"disabled\">\n        </bizy-checkbox>\n        \n    </button>\n\n    <span class=\"bizy-filter-section__options\">\n        <ng-content select=\"bizy-filter-section-option\"></ng-content>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;flex:1}.bizy-filter-section{width:100%;background-color:transparent;display:flex;flex-direction:column;row-gap:.7rem}.bizy-filter-section__header{width:100%;display:flex;align-items:center;column-gap:.5rem;cursor:pointer;border:none;background-color:transparent;justify-content:space-between;text-align:start}.bizy-filter-section__options{width:100%;max-width:100%;display:flex;flex-direction:column;row-gap:.5rem;min-height:6rem;max-height:20rem;overflow-y:scroll;overflow-x:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [FilterSectionOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2ZpbHRlci9maWx0ZXItc2VjdGlvbi9maWx0ZXItc2VjdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uL2ZpbHRlci1zZWN0aW9uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFRM0MsTUFBTSxPQUFPLHNCQUFzQjtJQWFMO0lBWjJCLE9BQU8sQ0FBMEM7SUFDL0YsRUFBRSxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNuQyxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDekIsUUFBUSxHQUFZLElBQUksQ0FBQztJQUN4QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQTBDLENBQUM7SUFFaEYsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkMsUUFBUSxHQUEyQyxFQUFFLENBQUM7SUFFdEQsWUFDNEIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUMzQyxDQUFDO0lBRUosZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sSUFB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TztzQkFBN0QsZUFBZTt1QkFBQyw0QkFBNEI7Z0JBQ3BDLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJTZWN0aW9uT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLXNlY3Rpb24tb3B0aW9uL2ZpbHRlci1zZWN0aW9uLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZmlsdGVyLXNlY3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLXNlY3Rpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbHRlci1zZWN0aW9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJTZWN0aW9uQ29tcG9uZW50IHtcbiAgQENvbnRlbnRDaGlsZHJlbihGaWx0ZXJTZWN0aW9uT3B0aW9uQ29tcG9uZW50KSBwcml2YXRlIG9wdGlvbnM6IFF1ZXJ5TGlzdDxGaWx0ZXJTZWN0aW9uT3B0aW9uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbiA9IHRydWU7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8e2lkOiBzdHJpbmcsIHNlbGVjdGVkOiBib29sZWFufT4+KCk7XG5cbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBfb3B0aW9uczogQXJyYXk8e2lkOiBzdHJpbmcsIHNlbGVjdGVkOiBib29sZWFufT4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudFxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCA+IDApIHtcblxuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goX29wdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMucHVzaCh7aWQ6IF9vcHRpb24uZ2V0SWQoKSwgc2VsZWN0ZWQ6IF9vcHRpb24uZ2V0U2VsZWN0ZWQoKX0pXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5fb3B0aW9ucy5maWx0ZXIoX29wdGlvbiA9PiBfb3B0aW9uLnNlbGVjdGVkID09PSB0cnVlKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZE9wdGlvbnMubGVuZ3RoID09PSB0aGlzLl9vcHRpb25zLmxlbmd0aDtcblxuICAgICAgdGhpcy4jbGlzdGVuT3B0aW9uQ2hhbmdlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goX29wdGlvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnB1c2goe2lkOiBfb3B0aW9uLmdldElkKCksIHNlbGVjdGVkOiBfb3B0aW9uLmdldFNlbGVjdGVkKCl9KVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5fb3B0aW9ucy5maWx0ZXIoX29wdGlvbiA9PiBfb3B0aW9uLnNlbGVjdGVkID09PSB0cnVlKTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA9PT0gdGhpcy5fb3B0aW9ucy5sZW5ndGg7XG5cbiAgICAgICAgICB0aGlzLiNsaXN0ZW5PcHRpb25DaGFuZ2VzKCk7XG4gICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICBcbiAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIF9vblNlbGVjdCgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcblxuICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLl9vcHRpb25zLm1hcChfb3B0aW9uID0+IHtcbiAgICAgIHJldHVybiB7Li4uX29wdGlvbiwgc2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWR9O1xuICAgIH0pXG5cbiAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChfb3B0aW9uID0+IHtcbiAgICAgIF9vcHRpb24uc2V0U2VsZWN0KHRoaXMuc2VsZWN0ZWQpO1xuICAgIH0pXG4gIH1cblxuICAjbGlzdGVuT3B0aW9uQ2hhbmdlcyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKF9vcHRpb24gPT4ge1xuXG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKF9vcHRpb24ub25TZWxlY3Quc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX29wdGlvbnMuZmluZEluZGV4KF9vcHRpb24gPT4gX29wdGlvbi5pZCA9PT0gZGF0YS5pZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLl9vcHRpb25zW2luZGV4XSA9IGRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fb3B0aW9ucy5wdXNoKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5fb3B0aW9ucy5maWx0ZXIoX29wdGlvbiA9PiBfb3B0aW9uLnNlbGVjdGVkID09PSB0cnVlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPT09IHRoaXMuX29wdGlvbnMubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh0aGlzLl9vcHRpb25zKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufSIsIjxkaXYgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uIHt7Y3VzdG9tQ2xhc3N9fVwiIGlkPVwie3tpZH19XCI+XG5cbiAgICA8YnV0dG9uIFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uX19oZWFkZXJcIlxuICAgICAgICAoY2xpY2spPVwiX29uU2VsZWN0KClcIlxuICAgICAgICAoa2V5dXAuZW50ZXIpPVwiX29uU2VsZWN0KClcIj5cblxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbiAgICAgICAgPGJpenktY2hlY2tib3ggXG4gICAgICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgIDwvYml6eS1jaGVja2JveD5cbiAgICAgICAgXG4gICAgPC9idXR0b24+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb25fX29wdGlvbnNcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1maWx0ZXItc2VjdGlvbi1vcHRpb25cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuXG48L2Rpdj4iXX0=