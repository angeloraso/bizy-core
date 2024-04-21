import { ChangeDetectionStrategy, Component, Input, ContentChildren, Inject, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { BizyTabComponent } from './tab/tab.component';
import * as i0 from "@angular/core";
export class BizyTabsComponent {
    ref;
    document;
    tabs;
    customClass;
    #subscription = new Subscription();
    #mutationObserver;
    #tabs = [];
    constructor(ref, document) {
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.tabs && (this.#tabs.length !== 0 || this.tabs.length !== 0) && !this.#tabsAreEqual(this.#tabs, this.tabs.toArray())) {
                this.#tabs = this.tabs.toArray();
                this.#listenTabChanges(this.tabs.toArray());
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    #listenTabChanges = (tabs) => {
        tabs.forEach(_tab => {
            this.#subscription.add(_tab.onSelect.subscribe(() => {
                this.tabs.toArray().forEach(_tab => {
                    _tab.setSelected(false);
                });
                _tab.setSelected(true);
                this.ref.detectChanges();
            }));
        });
    };
    #tabsAreEqual(arr1, arr2) {
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
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTabsComponent, selector: "bizy-tabs", inputs: { customClass: "customClass" }, queries: [{ propertyName: "tabs", predicate: BizyTabComponent }], ngImport: i0, template: "<div class=\"bizy-tabs {{customClass}}\">\n\n    <ng-content select=\"bizy-tab\"></ng-content>\n\n</div>", styles: [":host{font-size:1rem}.bizy-tabs{display:flex;align-items:center;column-gap:var(--bizy-tabs-column-gap);background-color:var(--bizy-tabs-background-color)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tabs', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-tabs {{customClass}}\">\n\n    <ng-content select=\"bizy-tab\"></ng-content>\n\n</div>", styles: [":host{font-size:1rem}.bizy-tabs{display:flex;align-items:center;column-gap:var(--bizy-tabs-column-gap);background-color:var(--bizy-tabs-background-color)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { tabs: [{
                type: ContentChildren,
                args: [BizyTabComponent]
            }], customClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvdGFicy90YWJzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJzL3RhYnMuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQWEsTUFBTSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQVF2RCxNQUFNLE9BQU8saUJBQWlCO0lBU1M7SUFDVDtJQVRPLElBQUksQ0FBK0I7SUFDN0QsV0FBVyxDQUFRO0lBRTVCLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ25DLGlCQUFpQixDQUFtQjtJQUNwQyxLQUFLLEdBQTRCLEVBQUUsQ0FBQztJQUVwQyxZQUNxQyxHQUFzQixFQUMvQixRQUFrQjtRQURULFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDM0MsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7WUFDakQsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJ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VztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJpenlUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi90YWIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS10YWJzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYnMuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYnMuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlUYWJzQ29tcG9uZW50IHtcbiAgQENvbnRlbnRDaGlsZHJlbihCaXp5VGFiQ29tcG9uZW50KSB0YWJzITogUXVlcnlMaXN0PEJpenlUYWJDb21wb25lbnQ+O1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nXG5cbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI211dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICN0YWJzOiBBcnJheTxCaXp5VGFiQ29tcG9uZW50PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRhYnMgJiYgKHRoaXMuI3RhYnMubGVuZ3RoICE9PSAwIHx8IHRoaXMudGFicy5sZW5ndGggIT09IDApICYmICF0aGlzLiN0YWJzQXJlRXF1YWwodGhpcy4jdGFicywgdGhpcy50YWJzLnRvQXJyYXkoKSkpIHtcbiAgICAgICAgdGhpcy4jdGFicyA9IHRoaXMudGFicy50b0FycmF5KCk7XG5cbiAgICAgICAgdGhpcy4jbGlzdGVuVGFiQ2hhbmdlcyh0aGlzLnRhYnMudG9BcnJheSgpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICB9XG5cbiAgI2xpc3RlblRhYkNoYW5nZXMgPSAodGFiczogQXJyYXk8Qml6eVRhYkNvbXBvbmVudD4pID0+IHtcbiAgICB0YWJzLmZvckVhY2goX3RhYiA9PiB7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKF90YWIub25TZWxlY3Quc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnRhYnMudG9BcnJheSgpLmZvckVhY2goX3RhYiA9PiB7XG4gICAgICAgICAgICBfdGFiLnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBfdGFiLnNldFNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gICN0YWJzQXJlRXF1YWwoYXJyMTogQXJyYXk8Qml6eVRhYkNvbXBvbmVudD4sIGFycjI6IEFycmF5PEJpenlUYWJDb21wb25lbnQ+KSB7XG4gICAgaWYgKGFycjEubGVuZ3RoICE9PSBhcnIyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYXJyMS5zb3J0KChhLCBiKSA9PiBhLmlkLmxvY2FsZUNvbXBhcmUoYi5pZCkpO1xuICAgIGFycjIuc29ydCgoYSwgYikgPT4gYS5pZC5sb2NhbGVDb21wYXJlKGIuaWQpKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXJyMVtpXSkge1xuICAgICAgICAgICAgaWYgKGFycjFbaV1ba2V5XSAhPT0gYXJyMltpXVtrZXldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy4jbXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG59IiwiPGRpdiBjbGFzcz1cImJpenktdGFicyB7e2N1c3RvbUNsYXNzfX1cIj5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFiXCI+PC9uZy1jb250ZW50PlxuXG48L2Rpdj4iXX0=