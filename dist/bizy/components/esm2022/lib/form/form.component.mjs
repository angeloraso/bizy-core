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
        }));
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormComponent, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFormComponent, selector: "bizy-form", inputs: { id: "id", customClass: "customClass" }, queries: [{ propertyName: "inputs", predicate: BizyInputComponent, descendants: true }, { propertyName: "selects", predicate: BizySelectComponent, descendants: true }], ngImport: i0, template: "<form class=\"bizy-form {{customClass}}\" [id]=\"id\">\n    <ng-content></ng-content>\n</form>", styles: [":host{font-size:1rem;max-width:var(--bizy-form-max-width)}.bizy-form{max-width:inherit;display:flex;flex-direction:column;row-gap:var(--bizy-form-row-gap);--bizy-input-max-width: 100%;--bizy-select-max-width: 100%}\n"], dependencies: [{ kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
            }], id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZm9ybS9mb3JtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9mb3JtL2Zvcm0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ3BKLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7QUFRaEQsTUFBTSxPQUFPLGlCQUFpQjtJQVNFO0lBUjhCLE1BQU0sQ0FBZ0M7SUFDckMsT0FBTyxDQUFpQztJQUM1RixFQUFFLEdBQVcsYUFBYSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUMxQyxXQUFXLEdBQVcsRUFBRSxDQUFDO0lBRWxDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5DLFlBQzhCLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDakQsQ0FBQztJQUVKLGVBQWU7UUFDYixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzFELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDOUIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDL0IsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzt3R0EvQlUsaUJBQWlCLGtCQVNsQixVQUFVOzRGQVRULGlCQUFpQiwwSEFDWCxrQkFBa0IsNkRBQ2xCLG1CQUFtQixnRENidEMsZ0dBRU87OzRGRFNNLGlCQUFpQjtrQkFON0IsU0FBUzsrQkFDRSxXQUFXLG1CQUdKLHVCQUF1QixDQUFDLE1BQU07OzBCQVc1QyxNQUFNOzJCQUFDLFVBQVU7NENBUndDLE1BQU07c0JBQWpFLGVBQWU7dUJBQUMsa0JBQWtCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2dCQUNHLE9BQU87c0JBQW5FLGVBQWU7dUJBQUMsbUJBQW1CLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2dCQUNsRCxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uLCB0YWtlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCaXp5SW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9pbnB1dCc7XG5pbXBvcnQgeyBCaXp5U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2VsZWN0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1mb3JtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Zvcm0uY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihCaXp5SW5wdXRDb21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgaW5wdXRzOiBRdWVyeUxpc3Q8Qml6eUlucHV0Q29tcG9uZW50PjtcbiAgQENvbnRlbnRDaGlsZHJlbihCaXp5U2VsZWN0Q29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIHNlbGVjdHM6IFF1ZXJ5TGlzdDxCaXp5U2VsZWN0Q29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LWZvcm0tJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcblxuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3Qgc3VibWl0JCA9IGZyb21FdmVudCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3N1Ym1pdCcpO1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQoc3VibWl0JC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pbnB1dHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmlucHV0cy5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XG4gICAgICAgICAgY29tcG9uZW50LnNldFRvdWNoZWQodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zZWxlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RzLmZvckVhY2goY29tcG9uZW50ID0+IHtcbiAgICAgICAgICBjb21wb25lbnQuc2V0VG91Y2hlZCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn0iLCI8Zm9ybSBjbGFzcz1cImJpenktZm9ybSB7e2N1c3RvbUNsYXNzfX1cIiBbaWRdPVwiaWRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Zvcm0+Il19