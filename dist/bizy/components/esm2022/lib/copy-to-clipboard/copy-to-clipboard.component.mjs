import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, Inject, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/clipboard";
/**
 * "items" is an item array to copy to clipboard as plain text
 * "model" is the item data model that helps to print the item array correctly
 * Example:
 *  items = [{name: "Name 1", lastName: "Last name 1"}, {name: "Name 2", lastName: "Last name 2"}, {name: "Name 3", lastName: "Last name 3"}]
 *  model = {name: "Name", lastName: "Last name"}
 */
export class BizyCopyToClipboardComponent {
    clipboard;
    customClass = '';
    items;
    text;
    model;
    copied = new EventEmitter();
    #loading = new BehaviorSubject(false);
    get loading$() {
        return this.#loading.asObservable();
    }
    constructor(clipboard) {
        this.clipboard = clipboard;
    }
    // Copy to clipboard in CSV format
    async copyToClipboard() {
        if (this.#loading.value || (!Array.isArray(this.items) && !this.text) || (!this.model && !this.text)) {
            return;
        }
        try {
            this.#loading.next(true);
            await this.initCopy();
            this.copied.emit();
        }
        finally {
            this.#loading.next(false);
        }
    }
    initCopy() {
        return new Promise(resolve => {
            setTimeout(() => {
                let toCopy = '';
                for (const key in this.model) {
                    if (key) {
                        toCopy += `${this.model[key]},`;
                    }
                }
                if (this.text) {
                    toCopy = this.text;
                }
                else {
                    this.items.forEach(_item => {
                        // Remove the last character (',')
                        toCopy = toCopy.slice(0, -2);
                        toCopy += '\n';
                        for (const key in this.model) {
                            let value = _item;
                            const nestedProperty = key.split('.');
                            nestedProperty.forEach(_property => {
                                value = value[_property];
                            });
                            if (value) {
                                toCopy += `${value},`;
                            }
                            else {
                                toCopy += ',';
                            }
                        }
                    });
                }
                const pending = this.clipboard.beginCopy(toCopy);
                let remainingAttempts = 3;
                const attempt = () => {
                    const result = pending.copy();
                    if (!result && --remainingAttempts) {
                        setTimeout(attempt);
                    }
                    else {
                        // Remember to destroy when you're done!
                        pending.destroy();
                        resolve();
                    }
                };
                attempt();
            }, 100);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardComponent, deps: [{ token: Clipboard }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyCopyToClipboardComponent, selector: "bizy-copy-to-clipboard", inputs: { customClass: "customClass", items: "items", text: "text", model: "model" }, outputs: { copied: "copied" }, ngImport: i0, template: "<button \n  class=\"bizy-copy-to-clipboard {{customClass}}\"\n  type=\"button\"\n  [disabled]=\"(loading$ | async)\"\n  (click)=\"copyToClipboard(); $event.stopPropagation()\">\n  <i *ngIf=\"(loading$ | async)\" class=\"fas fa-spinner fa-spin\"></i>\n  <i *ngIf=\"!(loading$ | async)\" class=\"fas fa-copy\"></i>\n</button>\n", styles: [":host{font-size:1rem}.bizy-copy-to-clipboard{border:none;background-color:transparent;cursor:pointer;color:var(--bizy-copy-to-clipboard-color)}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-copy-to-clipboard', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n  class=\"bizy-copy-to-clipboard {{customClass}}\"\n  type=\"button\"\n  [disabled]=\"(loading$ | async)\"\n  (click)=\"copyToClipboard(); $event.stopPropagation()\">\n  <i *ngIf=\"(loading$ | async)\" class=\"fas fa-spinner fa-spin\"></i>\n  <i *ngIf=\"!(loading$ | async)\" class=\"fas fa-copy\"></i>\n</button>\n", styles: [":host{font-size:1rem}.bizy-copy-to-clipboard{border:none;background-color:transparent;cursor:pointer;color:var(--bizy-copy-to-clipboard-color)}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.Clipboard, decorators: [{
                    type: Inject,
                    args: [Clipboard]
                }] }]; }, propDecorators: { customClass: [{
                type: Input
            }], items: [{
                type: Input
            }], text: [{
                type: Input
            }], model: [{
                type: Input
            }], copied: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS10by1jbGlwYm9hcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2NvcHktdG8tY2xpcGJvYXJkL2NvcHktdG8tY2xpcGJvYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9jb3B5LXRvLWNsaXBib2FyZC9jb3B5LXRvLWNsaXBib2FyZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBQ3ZDOzs7Ozs7R0FNRztBQU9ILE1BQU0sT0FBTyw0QkFBNEI7SUFjVjtJQWJwQixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLEtBQUssQ0FBYTtJQUNsQixJQUFJLENBQVM7SUFDYixLQUFLLENBQXlCO0lBQzdCLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBRTVDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUUvQyxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELFlBQzZCLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDOUMsQ0FBQztJQUVKLGtDQUFrQztJQUNsQyxLQUFLLENBQUMsZUFBZTtRQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElB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QkFBbkIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGlwYm9hcmQgfSBmcm9tICdAYW5ndWxhci9jZGsvY2xpcGJvYXJkJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbi8qKlxuICogXCJpdGVtc1wiIGlzIGFuIGl0ZW0gYXJyYXkgdG8gY29weSB0byBjbGlwYm9hcmQgYXMgcGxhaW4gdGV4dFxuICogXCJtb2RlbFwiIGlzIHRoZSBpdGVtIGRhdGEgbW9kZWwgdGhhdCBoZWxwcyB0byBwcmludCB0aGUgaXRlbSBhcnJheSBjb3JyZWN0bHlcbiAqIEV4YW1wbGU6XG4gKiAgaXRlbXMgPSBbe25hbWU6IFwiTmFtZSAxXCIsIGxhc3ROYW1lOiBcIkxhc3QgbmFtZSAxXCJ9LCB7bmFtZTogXCJOYW1lIDJcIiwgbGFzdE5hbWU6IFwiTGFzdCBuYW1lIDJcIn0sIHtuYW1lOiBcIk5hbWUgM1wiLCBsYXN0TmFtZTogXCJMYXN0IG5hbWUgM1wifV1cbiAqICBtb2RlbCA9IHtuYW1lOiBcIk5hbWVcIiwgbGFzdE5hbWU6IFwiTGFzdCBuYW1lXCJ9XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktY29weS10by1jbGlwYm9hcmQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29weS10by1jbGlwYm9hcmQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvcHktdG8tY2xpcGJvYXJkLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5Q29weVRvQ2xpcGJvYXJkQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBpdGVtczogQXJyYXk8YW55PjtcbiAgQElucHV0KCkgdGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSBtb2RlbDogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgQE91dHB1dCgpIGNvcGllZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAjbG9hZGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGdldCBsb2FkaW5nJCgpIHtcbiAgICByZXR1cm4gdGhpcy4jbG9hZGluZy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2xpcGJvYXJkKSBwcml2YXRlIGNsaXBib2FyZDogQ2xpcGJvYXJkLFxuICApIHt9XG5cbiAgLy8gQ29weSB0byBjbGlwYm9hcmQgaW4gQ1NWIGZvcm1hdFxuICBhc3luYyBjb3B5VG9DbGlwYm9hcmQoKSB7XG4gICAgaWYgKHRoaXMuI2xvYWRpbmcudmFsdWUgfHwgKCFBcnJheS5pc0FycmF5KHRoaXMuaXRlbXMpICYmICF0aGlzLnRleHQpIHx8ICghdGhpcy5tb2RlbCAmJiAhdGhpcy50ZXh0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLiNsb2FkaW5nLm5leHQodHJ1ZSk7XG4gICAgICBhd2FpdCB0aGlzLmluaXRDb3B5KCk7XG4gICAgICB0aGlzLmNvcGllZC5lbWl0KCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuI2xvYWRpbmcubmV4dChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdENvcHkoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGxldCB0b0NvcHkgPSAnJztcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgdG9Db3B5ICs9IGAke3RoaXMubW9kZWxba2V5XX0sYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50ZXh0KSB7XG4gICAgICAgICAgdG9Db3B5ID0gdGhpcy50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaChfaXRlbSA9PiB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGxhc3QgY2hhcmFjdGVyICgnLCcpXG4gICAgICAgICAgICB0b0NvcHkgPSB0b0NvcHkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAgICAgdG9Db3B5ICs9ICdcXG4nO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICAgIGxldCB2YWx1ZTogYW55ID0gX2l0ZW07XG4gICAgICAgICAgICAgIGNvbnN0IG5lc3RlZFByb3BlcnR5ID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgIG5lc3RlZFByb3BlcnR5LmZvckVhY2goX3Byb3BlcnR5ID0+IHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW19wcm9wZXJ0eV07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0b0NvcHkgKz0gYCR7dmFsdWV9LGA7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9Db3B5ICs9ICcsJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGVuZGluZyA9IHRoaXMuY2xpcGJvYXJkLmJlZ2luQ29weSh0b0NvcHkpO1xuICAgICAgICBsZXQgcmVtYWluaW5nQXR0ZW1wdHMgPSAzO1xuICAgICAgICBjb25zdCBhdHRlbXB0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBlbmRpbmcuY29weSgpO1xuICAgICAgICAgIGlmICghcmVzdWx0ICYmIC0tcmVtYWluaW5nQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoYXR0ZW1wdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRvIGRlc3Ryb3kgd2hlbiB5b3UncmUgZG9uZSFcbiAgICAgICAgICAgIHBlbmRpbmcuZGVzdHJveSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhdHRlbXB0KCk7XG4gICAgICB9LCAxMDApO1xuICAgIH0pO1xuICB9XG59XG4iLCI8YnV0dG9uIFxuICBjbGFzcz1cImJpenktY29weS10by1jbGlwYm9hcmQge3tjdXN0b21DbGFzc319XCJcbiAgdHlwZT1cImJ1dHRvblwiXG4gIFtkaXNhYmxlZF09XCIobG9hZGluZyQgfCBhc3luYylcIlxuICAoY2xpY2spPVwiY29weVRvQ2xpcGJvYXJkKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICA8aSAqbmdJZj1cIihsb2FkaW5nJCB8IGFzeW5jKVwiIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT5cbiAgPGkgKm5nSWY9XCIhKGxvYWRpbmckIHwgYXN5bmMpXCIgY2xhc3M9XCJmYXMgZmEtY29weVwiPjwvaT5cbjwvYnV0dG9uPlxuIl19