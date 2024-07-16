import { Directive, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { fromEvent, merge, of, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class BizyLongPressDirective {
    elementRef;
    threshold = 500;
    press = new EventEmitter();
    #event;
    constructor(elementRef) {
        this.elementRef = elementRef;
        const mousedown = fromEvent(this.elementRef.nativeElement, 'mousedown').pipe(filter((event) => event.button == 0), // Only allow left button (Primary button)
        map(() => true) // turn on threshold counter
        );
        const touchstart = fromEvent(this.elementRef.nativeElement, 'touchstart').pipe(map(() => true));
        const touchEnd = fromEvent(this.elementRef.nativeElement, 'touchend').pipe(map(() => false));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLongPressDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyLongPressDirective, selector: "[bizyLongPress]", inputs: { threshold: "threshold" }, outputs: { press: "press" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLongPressDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyLongPress]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { threshold: [{
                type: Input
            }], press: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZy1wcmVzcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvbG9uZy1wcmVzcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBZ0IsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUt4RCxNQUFNLE9BQU8sc0JBQXNCO0lBTU87SUFML0IsU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUNmLEtBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBRTNDLE1BQU0sQ0FBZTtJQUVyQixZQUF3QyxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQzVELE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ3RGLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSwwQ0FBMEM7UUFDaEYsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLDRCQUE0QjtTQUM3QyxDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVoRyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTdGLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBYSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUMzRCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsMENBQTBDO1FBQ2hGLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQywwQkFBMEI7U0FDNUMsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQzthQUMxRCxJQUFJLENBQ0gsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNuRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDaEM7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7d0dBakNVLHNCQUFzQixrQkFNYixVQUFVOzRGQU5uQixzQkFBc0I7OzRGQUF0QixzQkFBc0I7a0JBSGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7OzBCQU9jLE1BQU07MkJBQUMsVUFBVTs0Q0FMckIsU0FBUztzQkFBakIsS0FBSztnQkFDSSxLQUFLO3NCQUFkLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgbWVyZ2UsIG9mLCBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYml6eUxvbmdQcmVzc10nLFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5TG9uZ1ByZXNzRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdGhyZXNob2xkID0gNTAwO1xuICBAT3V0cHV0KCkgcHJlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIFxuICAjZXZlbnQ6IFN1YnNjcmlwdGlvbjtcbiAgXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgY29uc3QgbW91c2Vkb3duID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJykucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LmJ1dHRvbiA9PSAwKSwgLy8gT25seSBhbGxvdyBsZWZ0IGJ1dHRvbiAoUHJpbWFyeSBidXR0b24pXG4gICAgICBtYXAoKCkgPT4gdHJ1ZSkgLy8gdHVybiBvbiB0aHJlc2hvbGQgY291bnRlclxuICAgICk7XG5cbiAgICBjb25zdCB0b3VjaHN0YXJ0ID0gZnJvbUV2ZW50KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndG91Y2hzdGFydCcpLnBpcGUobWFwKCgpID0+IHRydWUpKTtcblxuICAgIGNvbnN0IHRvdWNoRW5kID0gZnJvbUV2ZW50KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndG91Y2hlbmQnKS5waXBlKG1hcCgoKSA9PiBmYWxzZSkpO1xuICAgIFxuICAgIGNvbnN0IG1vdXNldXAgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4od2luZG93LCAnbW91c2V1cCcpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGV2ZW50KSA9PiBldmVudC5idXR0b24gPT0gMCksIC8vIE9ubHkgYWxsb3cgbGVmdCBidXR0b24gKFByaW1hcnkgYnV0dG9uKVxuICAgICAgbWFwKCgpID0+IGZhbHNlKSAvLyByZXNldCB0aHJlc2hvbGQgY291bnRlclxuICAgICk7XG5cbiAgICB0aGlzLiNldmVudCA9IG1lcmdlKG1vdXNlZG93biwgbW91c2V1cCwgdG91Y2hzdGFydCwgdG91Y2hFbmQpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKHN0YXRlID0+IChzdGF0ZSA/IHRpbWVyKHRoaXMudGhyZXNob2xkLCAxMDApIDogb2YobnVsbCkpKSxcbiAgICAgICAgZmlsdGVyKHZhbHVlID0+IEJvb2xlYW4odmFsdWUpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnByZXNzLmVtaXQoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy4jZXZlbnQpIHtcbiAgICAgIHRoaXMuI2V2ZW50LnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=