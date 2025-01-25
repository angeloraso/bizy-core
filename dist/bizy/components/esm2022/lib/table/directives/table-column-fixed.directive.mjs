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
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'zIndex', '0');
            this.#renderer.setStyle(this.#elementRef.nativeElement, 'boxShadow', this.#originalBoxShadow);
        }
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'left', `${marginLeft - 5}px`);
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'paddingLeft', '5px');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1uLWZpeGVkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS9kaXJlY3RpdmVzL3RhYmxlLWNvbHVtbi1maXhlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7O0FBS3ZCLE1BQU0sT0FBTyw2QkFBNkI7SUFDL0IsV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLGtCQUFrQixHQUFXLEVBQUUsQ0FBQztJQUNoQyx3QkFBd0IsR0FBVyxFQUFFLENBQUM7SUFDdEMsZUFBZSxHQUFXLEVBQUUsQ0FBQztJQUM3QixpQkFBaUIsR0FBVyxFQUFFLENBQUM7SUFFL0IsZUFBZTtRQUNiLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQztRQUM5RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUNsRCxDQUFDO0lBR0QsSUFBbUMsZ0JBQWdCLENBQUMsS0FBYztRQUM5RCxJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xELE9BQU87U0FDUjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUVoRixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUNuRTthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDMUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUNyRDtJQUNMLENBQUM7SUFFRCxhQUFhLEdBQUcsQ0FBQyxVQUFrQixFQUFRLEVBQUU7UUFDM0MsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO1NBQzdHO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQy9GO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLEdBQUcsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hGLENBQUMsQ0FBQTt3R0E5Q1UsNkJBQTZCOzRGQUE3Qiw2QkFBNkI7OzRGQUE3Qiw2QkFBNkI7a0JBSHpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtpQkFDbkM7OEJBa0JvQyxnQkFBZ0I7c0JBQWxELEtBQUs7dUJBQUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIElucHV0LFxuICBpbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYml6eVRhYmxlQ29sdW1uRml4ZWRdJyxcbn0pXG5leHBvcnQgY2xhc3MgQml6eVRhYmxlQ29sdW1uRml4ZWREaXJlY3RpdmUge1xuICByZWFkb25seSAjZWxlbWVudFJlZiA9IGluamVjdChFbGVtZW50UmVmKTtcbiAgcmVhZG9ubHkgI3JlbmRlcmVyID0gaW5qZWN0KFJlbmRlcmVyMik7XG4gICNvcmlnaW5hbEJveFNoYWRvdzogc3RyaW5nID0gJyc7XG4gICNvcmlnaW5hbEJhY2tncm91bmRDb2xvcjogc3RyaW5nID0gJyc7XG4gICNvcmlnaW5hbFpJbmRleDogc3RyaW5nID0gJyc7XG4gICNvcmlnaW5hbFBvc2l0aW9uOiBzdHJpbmcgPSAnJztcbiAgXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLiNvcmlnaW5hbEJveFNoYWRvdyA9IGNvbXB1dGVkU3R5bGUuYm94U2hhZG93O1xuICAgIHRoaXMuI29yaWdpbmFsWkluZGV4ID0gY29tcHV0ZWRTdHlsZS56SW5kZXg7XG4gICAgdGhpcy4jb3JpZ2luYWxCYWNrZ3JvdW5kQ29sb3IgPSBjb21wdXRlZFN0eWxlLmJhY2tncm91bmRDb2xvcjtcbiAgICB0aGlzLiNvcmlnaW5hbFBvc2l0aW9uID0gY29tcHV0ZWRTdHlsZS5wb3NpdGlvbjtcbiAgfVxuXG5cbiAgQElucHV0KCdiaXp5VGFibGVDb2x1bW5GaXhlZCcpIHNldCB0YWJsZUNvbHVtbkZpeGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd6SW5kZXgnLCAnMScpO1xuICAgICAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kQ29sb3InLCAnaW5oZXJpdCcpO1xuICAgICAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXG4gICAgICAgIHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRNYXJnaW5MZWZ0ID0gdGhpcy5zZXRNYXJnaW5MZWZ0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnekluZGV4JywgdGhpcy4jb3JpZ2luYWxaSW5kZXgpO1xuICAgICAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsIHRoaXMuI29yaWdpbmFsUG9zaXRpb24pO1xuICAgICAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kQ29sb3InLCB0aGlzLiNvcmlnaW5hbEJhY2tncm91bmRDb2xvcik7XG4gICAgICAgIHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRNYXJnaW5MZWZ0ID0gbnVsbDtcbiAgICAgIH1cbiAgfVxuXG4gIHNldE1hcmdpbkxlZnQgPSAobWFyZ2luTGVmdDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgaWYgKG1hcmdpbkxlZnQgPiAwKSB7XG4gICAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdib3hTaGFkb3cnLCAnMTZweCAwcHggMTVweCAtNXB4IHJnYmEoMCwwLDAsMC4zNyknKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnekluZGV4JywgJzAnKTtcbiAgICAgIHRoaXMuI3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2JveFNoYWRvdycsIHRoaXMuI29yaWdpbmFsQm94U2hhZG93KTtcbiAgICB9XG5cbiAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgYCR7bWFyZ2luTGVmdCAtIDV9cHhgKTtcbiAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdwYWRkaW5nTGVmdCcsICc1cHgnKTtcbiAgfVxufVxuXG4iXX0=