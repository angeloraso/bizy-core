import { Directive, ElementRef, Renderer2, Input, inject, } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyTableColumnFixedDirective {
    #elementRef = inject(ElementRef);
    #renderer = inject(Renderer2);
    #originalBoxShadow = '';
    #originalBackgroundColor = '';
    #originalZIndex = '';
    #originalPosition = '';
    ngAfterViewInit() {
        const computedStyle = window.getComputedStyle(this.#elementRef.nativeElement);
        this.#originalBoxShadow = computedStyle.boxShadow;
        this.#originalZIndex = computedStyle.zIndex;
        this.#originalBackgroundColor = computedStyle.backgroundColor;
        this.#originalPosition = computedStyle.position;
    }
    set tableColumnFixed(value) {
        if (typeof value === 'undefined' || value === null) {
            return;
        }
        if (value) {
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'zIndex', '1');
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'backgroundColor', 'inherit');
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'position', 'relative');
            this.#elementRef.nativeElement.setMarginLeft = this.setMarginLeft;
        }
        else {
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'zIndex', this.#originalZIndex);
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'position', this.#originalPosition);
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'backgroundColor', this.#originalBackgroundColor);
            this.#elementRef.nativeElement.setMarginLeft = null;
        }
    }
    setMarginLeft = (marginLeft) => {
        if (marginLeft > 0) {
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'boxShadow', '16px 0px 15px -5px rgba(0,0,0,0.37)');
        }
        else {
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'boxShadow', this.#originalBoxShadow);
        }
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'left', `${marginLeft - 5}px`);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnFixedDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableColumnFixedDirective, selector: "[bizyTableColumnFixed]", inputs: { tableColumnFixed: ["bizyTableColumnFixed", "tableColumnFixed"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnFixedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyTableColumnFixed]',
                }]
        }], propDecorators: { tableColumnFixed: [{
                type: Input,
                args: ['bizyTableColumnFixed']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1uLWZpeGVkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS9kaXJlY3RpdmVzL3RhYmxlLWNvbHVtbi1maXhlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7O0FBS3ZCLE1BQU0sT0FBTyw2QkFBNkI7SUFDL0IsV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLGtCQUFrQixHQUFXLEVBQUUsQ0FBQztJQUNoQyx3QkFBd0IsR0FBVyxFQUFFLENBQUM7SUFDdEMsZUFBZSxHQUFXLEVBQUUsQ0FBQztJQUM3QixpQkFBaUIsR0FBVyxFQUFFLENBQUM7SUFFL0IsZUFBZTtRQUNiLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQztRQUM5RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUNsRCxDQUFDO0lBR0QsSUFBbUMsZ0JBQWdCLENBQUMsS0FBYztRQUM5RCxJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xELE9BQU87U0FDUjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUVoRixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUNuRTthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDMUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUNyRDtJQUNMLENBQUM7SUFFRCxhQUFhLEdBQUcsQ0FBQyxVQUFrQixFQUFRLEVBQUU7UUFDM0MsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO1NBQzdHO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDL0Y7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsR0FBRyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RixDQUFDLENBQUE7d0dBNUNVLDZCQUE2Qjs0RkFBN0IsNkJBQTZCOzs0RkFBN0IsNkJBQTZCO2tCQUh6QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DOzhCQWtCb0MsZ0JBQWdCO3NCQUFsRCxLQUFLO3VCQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBJbnB1dCxcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JpenlUYWJsZUNvbHVtbkZpeGVkXScsXG59KVxuZXhwb3J0IGNsYXNzIEJpenlUYWJsZUNvbHVtbkZpeGVkRGlyZWN0aXZlIHtcbiAgcmVhZG9ubHkgI2VsZW1lbnRSZWYgPSBpbmplY3QoRWxlbWVudFJlZik7XG4gIHJlYWRvbmx5ICNyZW5kZXJlciA9IGluamVjdChSZW5kZXJlcjIpO1xuICAjb3JpZ2luYWxCb3hTaGFkb3c6IHN0cmluZyA9ICcnO1xuICAjb3JpZ2luYWxCYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyA9ICcnO1xuICAjb3JpZ2luYWxaSW5kZXg6IHN0cmluZyA9ICcnO1xuICAjb3JpZ2luYWxQb3NpdGlvbjogc3RyaW5nID0gJyc7XG4gIFxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy4jb3JpZ2luYWxCb3hTaGFkb3cgPSBjb21wdXRlZFN0eWxlLmJveFNoYWRvdztcbiAgICB0aGlzLiNvcmlnaW5hbFpJbmRleCA9IGNvbXB1dGVkU3R5bGUuekluZGV4O1xuICAgIHRoaXMuI29yaWdpbmFsQmFja2dyb3VuZENvbG9yID0gY29tcHV0ZWRTdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgdGhpcy4jb3JpZ2luYWxQb3NpdGlvbiA9IGNvbXB1dGVkU3R5bGUucG9zaXRpb247XG4gIH1cblxuXG4gIEBJbnB1dCgnYml6eVRhYmxlQ29sdW1uRml4ZWQnKSBzZXQgdGFibGVDb2x1bW5GaXhlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnekluZGV4JywgJzEnKTtcbiAgICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZENvbG9yJywgJ2luaGVyaXQnKTtcbiAgICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblxuICAgICAgICB0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0TWFyZ2luTGVmdCA9IHRoaXMuc2V0TWFyZ2luTGVmdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuI3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3pJbmRleCcsIHRoaXMuI29yaWdpbmFsWkluZGV4KTtcbiAgICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCB0aGlzLiNvcmlnaW5hbFBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZENvbG9yJywgdGhpcy4jb3JpZ2luYWxCYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgICB0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0TWFyZ2luTGVmdCA9IG51bGw7XG4gICAgICB9XG4gIH1cblxuICBzZXRNYXJnaW5MZWZ0ID0gKG1hcmdpbkxlZnQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIGlmIChtYXJnaW5MZWZ0ID4gMCkge1xuICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYm94U2hhZG93JywgJzE2cHggMHB4IDE1cHggLTVweCByZ2JhKDAsMCwwLDAuMzcpJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2JveFNoYWRvdycsIHRoaXMuI29yaWdpbmFsQm94U2hhZG93KTtcbiAgICB9XG5cbiAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgYCR7bWFyZ2luTGVmdCAtIDV9cHhgKTtcbiAgfVxufVxuXG4iXX0=