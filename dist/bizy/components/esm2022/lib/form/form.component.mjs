import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, Input } from '@angular/core';
import { fromEvent, Subscription, take } from 'rxjs';
import { BizyInputComponent } from '../input';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class BizyFormComponent {
    elementRef;
    inputs;
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
        }));
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormComponent, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFormComponent, selector: "bizy-form", inputs: { id: "id", customClass: "customClass" }, queries: [{ propertyName: "inputs", predicate: BizyInputComponent }], ngImport: i0, template: "<form class=\"bizy-form {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</form>", styles: [":host{font-size:1rem;max-width:var(--anura-form-max-width)}.bizy-form{max-width:inherit;display:flex;flex-direction:column;row-gap:var(--bizy-form-row-gap);--bizy-input-max-width: 100%;--bizy-select-max-width: 100%}\n"], dependencies: [{ kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form class=\"bizy-form {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</form>", styles: [":host{font-size:1rem;max-width:var(--anura-form-max-width)}.bizy-form{max-width:inherit;display:flex;flex-direction:column;row-gap:var(--bizy-form-row-gap);--bizy-input-max-width: 100%;--bizy-select-max-width: 100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { inputs: [{
                type: ContentChildren,
                args: [BizyInputComponent]
            }], id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZm9ybS9mb3JtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9mb3JtL2Zvcm0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ3BKLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQVE5QyxNQUFNLE9BQU8saUJBQWlCO0lBUUU7SUFQTyxNQUFNLENBQWdDO0lBQ2xFLEVBQUUsR0FBVyxhQUFhLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQzFDLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFFbEMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkMsWUFDOEIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUNqRCxDQUFDO0lBRUosZUFBZTtRQUNiLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDMUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUM5QixTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO3dHQXhCVSxpQkFBaUIsa0JBUWxCLFVBQVU7NEZBUlQsaUJBQWlCLDBIQUNYLGtCQUFrQiw2QkNYckMsZ0dBRU87OzRGRFFNLGlCQUFpQjtrQkFON0IsU0FBUzsrQkFDRSxXQUFXLG1CQUdKLHVCQUF1QixDQUFDLE1BQU07OzBCQVU1QyxNQUFNOzJCQUFDLFVBQVU7NENBUGlCLE1BQU07c0JBQTFDLGVBQWU7dUJBQUMsa0JBQWtCO2dCQUMxQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uLCB0YWtlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCaXp5SW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9pbnB1dCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZm9ybScsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mb3JtLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5Rm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eUlucHV0Q29tcG9uZW50KSBpbnB1dHM6IFF1ZXJ5TGlzdDxCaXp5SW5wdXRDb21wb25lbnQ+O1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYGJpenktZm9ybS0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuXG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBzdWJtaXQkID0gZnJvbUV2ZW50KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc3VibWl0Jyk7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZChzdWJtaXQkLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlucHV0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuaW5wdXRzLmZvckVhY2goY29tcG9uZW50ID0+IHtcbiAgICAgICAgICBjb21wb25lbnQuc2V0VG91Y2hlZCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn0iLCI8Zm9ybSBjbGFzcz1cImJpenktZm9ybSB7e2N1c3RvbUNsYXNzfX1cIiBbaWRdPVwiaWRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Zvcm0+Il19