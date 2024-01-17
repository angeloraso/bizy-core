import { Directive, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { fromEvent, merge, of, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class LongPressDirective {
    elementRef;
    threshold = 500;
    press = new EventEmitter();
    #event;
    constructor(elementRef) {
        this.elementRef = elementRef;
        const mousedown = fromEvent(elementRef.nativeElement, 'mousedown').pipe(filter((event) => event.button == 0), // Only allow left button (Primary button)
        map(() => true) // turn on threshold counter
        );
        const touchstart = fromEvent(elementRef.nativeElement, 'touchstart').pipe(map(() => true));
        const touchEnd = fromEvent(elementRef.nativeElement, 'touchend').pipe(map(() => false));
        const mouseup = fromEvent(window, 'mouseup').pipe(filter((event) => event.button == 0), // Only allow left button (Primary button)
        map(() => false) // reset threshold counter
        );
        this.#event = merge(mousedown, mouseup, touchstart, touchEnd)
            .pipe(switchMap(state => (state ? timer(this.threshold, 100) : of(null))), filter(value => Boolean(value)))
            .subscribe(() => this.press.emit());
    }
    ngOnDestroy() {
        if (this.#event) {
            this.#event.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: LongPressDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.9", type: LongPressDirective, selector: "[bizyLongPress]", inputs: { threshold: "threshold" }, outputs: { press: "press" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: LongPressDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyLongPress]',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }], propDecorators: { threshold: [{
                type: Input
            }], press: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZy1wcmVzcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvbG9uZy1wcmVzcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBZ0IsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUt4RCxNQUFNLE9BQU8sa0JBQWtCO0lBTVc7SUFML0IsU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUNmLEtBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBRTNDLE1BQU0sQ0FBZTtJQUVyQixZQUF3QyxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQzVELE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBYSxVQUFVLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDakYsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFLDBDQUEwQztRQUNoRixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsNEJBQTRCO1NBQzdDLENBQUM7UUFFRixNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFM0YsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXhGLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBYSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUMzRCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsMENBQTBDO1FBQ2hGLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQywwQkFBMEI7U0FDNUMsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQzthQUMxRCxJQUFJLENBQ0gsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNuRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDaEM7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7dUdBakNVLGtCQUFrQixrQkFNVCxVQUFVOzJGQU5uQixrQkFBa0I7OzJGQUFsQixrQkFBa0I7a0JBSDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7OzBCQU9jLE1BQU07MkJBQUMsVUFBVTt5Q0FMckIsU0FBUztzQkFBakIsS0FBSztnQkFDSSxLQUFLO3NCQUFkLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgbWVyZ2UsIG9mLCBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYml6eUxvbmdQcmVzc10nLFxufSlcbmV4cG9ydCBjbGFzcyBMb25nUHJlc3NEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB0aHJlc2hvbGQgPSA1MDA7XG4gIEBPdXRwdXQoKSBwcmVzcyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgXG4gICNldmVudDogU3Vic2NyaXB0aW9uO1xuICBcbiAgY29uc3RydWN0b3IoQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBjb25zdCBtb3VzZWRvd24gPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJykucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LmJ1dHRvbiA9PSAwKSwgLy8gT25seSBhbGxvdyBsZWZ0IGJ1dHRvbiAoUHJpbWFyeSBidXR0b24pXG4gICAgICBtYXAoKCkgPT4gdHJ1ZSkgLy8gdHVybiBvbiB0aHJlc2hvbGQgY291bnRlclxuICAgICk7XG5cbiAgICBjb25zdCB0b3VjaHN0YXJ0ID0gZnJvbUV2ZW50KGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RvdWNoc3RhcnQnKS5waXBlKG1hcCgoKSA9PiB0cnVlKSk7XG5cbiAgICBjb25zdCB0b3VjaEVuZCA9IGZyb21FdmVudChlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0b3VjaGVuZCcpLnBpcGUobWFwKCgpID0+IGZhbHNlKSk7XG4gICAgXG4gICAgY29uc3QgbW91c2V1cCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pih3aW5kb3csICdtb3VzZXVwJykucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LmJ1dHRvbiA9PSAwKSwgLy8gT25seSBhbGxvdyBsZWZ0IGJ1dHRvbiAoUHJpbWFyeSBidXR0b24pXG4gICAgICBtYXAoKCkgPT4gZmFsc2UpIC8vIHJlc2V0IHRocmVzaG9sZCBjb3VudGVyXG4gICAgKTtcblxuICAgIHRoaXMuI2V2ZW50ID0gbWVyZ2UobW91c2Vkb3duLCBtb3VzZXVwLCB0b3VjaHN0YXJ0LCB0b3VjaEVuZClcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoc3RhdGUgPT4gKHN0YXRlID8gdGltZXIodGhpcy50aHJlc2hvbGQsIDEwMCkgOiBvZihudWxsKSkpLFxuICAgICAgICBmaWx0ZXIodmFsdWUgPT4gQm9vbGVhbih2YWx1ZSkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucHJlc3MuZW1pdCgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLiNldmVudCkge1xuICAgICAgdGhpcy4jZXZlbnQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==