import { Directive, Input, ElementRef, Inject, Renderer2, } from '@angular/core';
import * as i0 from "@angular/core";
export var LOADING_TYPE;
(function (LOADING_TYPE) {
    LOADING_TYPE["SPINNER"] = "spinner";
    LOADING_TYPE["BAR"] = "bar";
})(LOADING_TYPE || (LOADING_TYPE = {}));
export class BizyLoadingDirective {
    elementRef;
    renderer;
    set bizyLoading(value) {
        this.#setLoading(value);
    }
    bizyLoadingType = LOADING_TYPE.SPINNER;
    #loadingElement;
    #originalElement;
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    #setLoading(value) {
        if (value) {
            this.#originalElement = this.elementRef.nativeElement;
            const width = this.elementRef.nativeElement.offsetWidth;
            const height = this.elementRef.nativeElement.offsetHeight;
            const loadingWrapper = this.renderer.createElement('span');
            this.renderer.setStyle(loadingWrapper, 'width', width ? `${this.elementRef.nativeElement.offsetWidth}px` : '1rem');
            this.renderer.setStyle(loadingWrapper, 'height', height ? `${this.elementRef.nativeElement.offsetHeight}px` : '1rem');
            this.renderer.setStyle(loadingWrapper, 'display', 'grid');
            this.renderer.setStyle(loadingWrapper, 'placeItems', 'center');
            const backgroundColor = window.getComputedStyle(this.elementRef.nativeElement, null).getPropertyValue('background-color');
            this.renderer.setStyle(loadingWrapper, 'backgroundColor', backgroundColor);
            this.renderer.setStyle(loadingWrapper, 'pointer-events', 'none');
            const loading = this.renderer.createElement('span');
            this.renderer.addClass(loading, `bizy-loading--${this.bizyLoadingType}`);
            if (this.bizyLoadingType === LOADING_TYPE.SPINNER) {
                let minSize = 0;
                if (this.elementRef.nativeElement.offsetWidth > 0 && this.elementRef.nativeElement.offsetHeight > 0) {
                    minSize = Math.min(this.elementRef.nativeElement.offsetWidth, this.elementRef.nativeElement.offsetHeight);
                }
                this.renderer.setStyle(loading, 'width', minSize ? `min(15rem, ${minSize}px)` : '1rem');
                this.renderer.setStyle(loading, 'height', minSize ? `min(15rem, ${minSize}px)` : '1rem');
            }
            this.renderer.appendChild(loadingWrapper, loading);
            this.#loadingElement = loadingWrapper;
            this.renderer.insertBefore(this.#originalElement.parentNode, this.#loadingElement, this.#originalElement);
            this.renderer.removeChild(this.#originalElement.parentNode, this.#originalElement);
        }
        else if (this.#loadingElement && this.#originalElement && value === false) {
            this.renderer.insertBefore(this.#loadingElement.parentNode, this.#originalElement, this.#loadingElement);
            this.renderer.removeChild(this.#loadingElement.parentNode, this.#loadingElement);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLoadingDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyLoadingDirective, selector: "[bizyLoading]", inputs: { bizyLoading: "bizyLoading", bizyLoadingType: "bizyLoadingType" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyLoading]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { bizyLoading: [{
                type: Input
            }], bizyLoadingType: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvbG9hZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7O0FBRXZCLE1BQU0sQ0FBTixJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDdEIsbUNBQW1CLENBQUE7SUFDbkIsMkJBQVcsQ0FBQTtBQUNiLENBQUMsRUFIVyxZQUFZLEtBQVosWUFBWSxRQUd2QjtBQUlELE1BQU0sT0FBTyxvQkFBb0I7SUFXRDtJQUNEO0lBWDdCLElBQWEsV0FBVyxDQUFDLEtBQWM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRVEsZUFBZSxHQUFpQixZQUFZLENBQUMsT0FBTyxDQUFDO0lBRTlELGVBQWUsQ0FBTTtJQUNyQixnQkFBZ0IsQ0FBYztJQUU5QixZQUM4QixVQUFzQixFQUN2QixRQUFtQjtRQURsQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLGFBQVEsR0FBUixRQUFRLENBQVc7SUFDN0MsQ0FBQztJQUVKLFdBQVcsQ0FBQyxLQUFjO1FBQ3hCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3RELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUN4RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFDMUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFB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SUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO1lBQzNFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ2xGO0lBQ0gsQ0FBQzt3R0FuRFUsb0JBQW9CLGtCQVdyQixVQUFVLGFBQ1YsU0FBUzs0RkFaUixvQkFBb0I7OzRGQUFwQixvQkFBb0I7a0JBSGhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzswQkFZSSxNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFNBQVM7NENBWE4sV0FBVztzQkFBdkIsS0FBSztnQkFJRyxlQUFlO3NCQUF2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZW51bSBMT0FESU5HX1RZUEUge1xuICBTUElOTkVSID0gJ3NwaW5uZXInLFxuICBCQVIgPSAnYmFyJ1xufVxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JpenlMb2FkaW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgQml6eUxvYWRpbmdEaXJlY3RpdmUge1xuICBASW5wdXQoKSBzZXQgYml6eUxvYWRpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLiNzZXRMb2FkaW5nKHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGJpenlMb2FkaW5nVHlwZTogTE9BRElOR19UWVBFID0gTE9BRElOR19UWVBFLlNQSU5ORVI7XG5cbiAgI2xvYWRpbmdFbGVtZW50OiBhbnk7XG4gICNvcmlnaW5hbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7fVxuXG4gICNzZXRMb2FkaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLiNvcmlnaW5hbEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICBjb25zdCBsb2FkaW5nV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ3dpZHRoJywgd2lkdGggPyBgJHt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aH1weGAgOiAnMXJlbScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ2hlaWdodCcsIGhlaWdodCA/IGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodH1weGAgOiAnMXJlbScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ2Rpc3BsYXknLCAnZ3JpZCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ3BsYWNlSXRlbXMnLCAnY2VudGVyJyk7XG4gICAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnYmFja2dyb3VuZC1jb2xvcicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ2JhY2tncm91bmRDb2xvcicsIGJhY2tncm91bmRDb2xvcik7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgXG4gICAgICBjb25zdCBsb2FkaW5nID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGxvYWRpbmcsIGBiaXp5LWxvYWRpbmctLSR7dGhpcy5iaXp5TG9hZGluZ1R5cGV9YCk7XG5cbiAgICAgIGlmICh0aGlzLmJpenlMb2FkaW5nVHlwZSA9PT0gTE9BRElOR19UWVBFLlNQSU5ORVIpIHtcbiAgICAgICAgbGV0IG1pblNpemUgPSAwO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggPiAwICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCA+IDApIHtcbiAgICAgICAgICBtaW5TaXplID0gTWF0aC5taW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nLCAnd2lkdGgnLCBtaW5TaXplID8gYG1pbigxNXJlbSwgJHttaW5TaXplfXB4KWAgOiAnMXJlbScpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmcsICdoZWlnaHQnLCBtaW5TaXplID8gYG1pbigxNXJlbSwgJHttaW5TaXplfXB4KWAgOiAnMXJlbScpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGxvYWRpbmdXcmFwcGVyLCBsb2FkaW5nKTtcblxuICAgICAgdGhpcy4jbG9hZGluZ0VsZW1lbnQgPSBsb2FkaW5nV3JhcHBlcjtcbiAgICAgICAgXG4gICAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZSh0aGlzLiNvcmlnaW5hbEVsZW1lbnQucGFyZW50Tm9kZSx0aGlzLiNsb2FkaW5nRWxlbWVudCx0aGlzLiNvcmlnaW5hbEVsZW1lbnQpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLiNvcmlnaW5hbEVsZW1lbnQucGFyZW50Tm9kZSwgdGhpcy4jb3JpZ2luYWxFbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuI2xvYWRpbmdFbGVtZW50ICYmIHRoaXMuI29yaWdpbmFsRWxlbWVudCAmJiB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuaW5zZXJ0QmVmb3JlKHRoaXMuI2xvYWRpbmdFbGVtZW50LnBhcmVudE5vZGUsIHRoaXMuI29yaWdpbmFsRWxlbWVudCwgdGhpcy4jbG9hZGluZ0VsZW1lbnQpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLiNsb2FkaW5nRWxlbWVudC5wYXJlbnROb2RlLCB0aGlzLiNsb2FkaW5nRWxlbWVudCk7XG4gICAgfVxuICB9XG59XG4iXX0=