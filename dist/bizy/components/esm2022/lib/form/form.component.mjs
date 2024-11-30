import { BizyDatePickerComponent } from './../date-picker/date-picker.component';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, Input } from '@angular/core';
import { fromEvent, Subscription, take } from 'rxjs';
import { BizyInputComponent } from '../input';
import { BizySelectComponent } from '../select';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class BizyFormComponent {
    elementRef;
    inputs;
    selects;
    datePickers;
    id = `bizy-form-${Math.random()}`;
    customClass = '';
    #subscription = new Subscription();
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngAfterViewInit() {
        const submit$ = fromEvent(this.elementRef.nativeElement, 'submit');
        this.#subscription.add(submit$.pipe(take(1)).subscribe(() => {
            if (this.inputs.length > 0) {
                this.inputs.forEach(component => {
                    component.setTouched(true);
                });
            }
            if (this.selects.length > 0) {
                this.selects.forEach(component => {
                    component.setTouched(true);
                });
            }
            if (this.datePickers.length > 0) {
                this.datePickers.forEach(component => {
                    component.setTouched(true);
                });
            }
        }));
        const keyPress$ = fromEvent(this.elementRef.nativeElement, 'keypress');
        this.#subscription.add(keyPress$.subscribe((event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        }));
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormComponent, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFormComponent, selector: "bizy-form", inputs: { id: "id", customClass: "customClass" }, queries: [{ propertyName: "inputs", predicate: BizyInputComponent, descendants: true }, { propertyName: "selects", predicate: BizySelectComponent, descendants: true }, { propertyName: "datePickers", predicate: BizyDatePickerComponent, descendants: true }], ngImport: i0, template: "<form class=\"bizy-form {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</form>", styles: [":host{font-size:1rem;max-width:var(--bizy-form-max-width)}.bizy-form{max-width:inherit;display:flex;flex-direction:column;row-gap:var(--bizy-form-row-gap);--bizy-input-max-width: 100%;--bizy-select-max-width: 100%}\n"], dependencies: [{ kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form class=\"bizy-form {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</form>", styles: [":host{font-size:1rem;max-width:var(--bizy-form-max-width)}.bizy-form{max-width:inherit;display:flex;flex-direction:column;row-gap:var(--bizy-form-row-gap);--bizy-input-max-width: 100%;--bizy-select-max-width: 100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { inputs: [{
                type: ContentChildren,
                args: [BizyInputComponent, { descendants: true }]
            }], selects: [{
                type: ContentChildren,
                args: [BizySelectComponent, { descendants: true }]
            }], datePickers: [{
                type: ContentChildren,
                args: [BizyDatePickerComponent, { descendants: true }]
            }], id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZm9ybS9mb3JtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9mb3JtL2Zvcm0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRixPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ3BKLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7QUFRaEQsTUFBTSxPQUFPLGlCQUFpQjtJQVVFO0lBVDhCLE1BQU0sQ0FBZ0M7SUFDckMsT0FBTyxDQUFpQztJQUNwQyxXQUFXLENBQXFDO0lBQ3hHLEVBQUUsR0FBVyxhQUFhLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQzFDLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFFbEMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkMsWUFDOEIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUNqRCxDQUFDO0lBRUosZUFBZTtRQUNiLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDMUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUM5QixTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUMvQixTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNuQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBb0IsRUFBRSxFQUFFO1lBQ2xFLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7Z0JBQ3pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzt3R0E3Q1UsaUJBQWlCLGtCQVVsQixVQUFVOzRGQVZULGlCQUFpQiwwSEFDWCxrQkFBa0IsNkRBQ2xCLG1CQUFtQixpRUFDbkIsdUJBQXVCLGdEQ2YxQyxnR0FFTzs7NEZEVU0saUJBQWlCO2tCQU43QixTQUFTOytCQUNFLFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTTs7MEJBWTVDLE1BQU07MkJBQUMsVUFBVTs0Q0FUd0MsTUFBTTtzQkFBakUsZUFBZTt1QkFBQyxrQkFBa0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBQ0csT0FBTztzQkFBbkUsZUFBZTt1QkFBQyxtQkFBbUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBQ00sV0FBVztzQkFBM0UsZUFBZTt1QkFBQyx1QkFBdUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBQ3RELEVBQUU7c0JBQVYsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQml6eURhdGVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuLy4uL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiwgdGFrZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQml6eUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vaW5wdXQnO1xuaW1wb3J0IHsgQml6eVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4uL3NlbGVjdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZm9ybScsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mb3JtLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5Rm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eUlucHV0Q29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGlucHV0czogUXVlcnlMaXN0PEJpenlJbnB1dENvbXBvbmVudD47XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eVNlbGVjdENvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBzZWxlY3RzOiBRdWVyeUxpc3Q8Qml6eVNlbGVjdENvbXBvbmVudD47XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eURhdGVQaWNrZXJDb21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgZGF0ZVBpY2tlcnM6IFF1ZXJ5TGlzdDxCaXp5RGF0ZVBpY2tlckNvbXBvbmVudD47XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1mb3JtLSR7TWF0aC5yYW5kb20oKX1gO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG5cbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHN1Ym1pdCQgPSBmcm9tRXZlbnQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdzdWJtaXQnKTtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHN1Ym1pdCQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaW5wdXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5pbnB1dHMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudC5zZXRUb3VjaGVkKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc2VsZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0cy5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XG4gICAgICAgICAgY29tcG9uZW50LnNldFRvdWNoZWQodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kYXRlUGlja2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlcnMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudC5zZXRUb3VjaGVkKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICBjb25zdCBrZXlQcmVzcyQgPSBmcm9tRXZlbnQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdrZXlwcmVzcycpO1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQoa2V5UHJlc3MkLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufSIsIjxmb3JtIGNsYXNzPVwiYml6eS1mb3JtIHt7Y3VzdG9tQ2xhc3N9fVwiIFtpZF09XCJpZFwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZm9ybT4iXX0=