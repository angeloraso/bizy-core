import { DOCUMENT } from '@angular/common';
import { Directive, Input, ElementRef, Inject, Renderer2, } from '@angular/core';
import * as i0 from "@angular/core";
export class LoadingDirective {
    elementRef;
    renderer;
    document;
    set bizyLoading(value) {
        this.#currentValue = value;
        this.setLoading();
    }
    type = 'spinner';
    #loadingElement;
    #originalElement;
    #currentValue;
    constructor(elementRef, renderer, document) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.document = document;
    }
    setLoading = () => {
        const mutationObserver = new MutationObserver(() => {
            if ((this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth === 0 || this.elementRef.nativeElement.offsetHeight === 0) && !this.#originalElement)) {
                return;
            }
            if (this.#currentValue) {
                this.#originalElement = this.elementRef.nativeElement;
                const loadingWrapper = this.renderer.createElement('span');
                this.renderer.setStyle(loadingWrapper, 'width', `${this.elementRef.nativeElement.offsetWidth}px`);
                this.renderer.setStyle(loadingWrapper, 'height', `${this.elementRef.nativeElement.offsetHeight}px`);
                this.renderer.setStyle(loadingWrapper, 'display', 'grid');
                this.renderer.setStyle(loadingWrapper, 'placeItems', 'center');
                const backgroundColor = window.getComputedStyle(this.elementRef.nativeElement, null).getPropertyValue('background-color');
                this.renderer.setStyle(loadingWrapper, 'backgroundColor', backgroundColor);
                this.renderer.setStyle(loadingWrapper, 'pointer-events', 'none');
                const loading = this.renderer.createElement('span');
                this.renderer.addClass(loading, `bizy-loading--${this.type}`);
                const minSize = Math.min(this.elementRef.nativeElement.offsetWidth, this.elementRef.nativeElement.offsetHeight);
                this.renderer.setStyle(loading, 'width', `${minSize * 0.8}px`);
                this.renderer.setStyle(loading, 'height', `${minSize * 0.8}px`);
                this.renderer.setStyle(loading, 'maxWidth', '20vmax');
                this.renderer.setStyle(loading, 'maxHeight', '20vmax');
                this.renderer.appendChild(loadingWrapper, loading);
                this.#loadingElement = loadingWrapper;
                this.renderer.insertBefore(this.#originalElement.parentNode, this.#loadingElement, this.#originalElement);
                this.renderer.removeChild(this.#originalElement.parentNode, this.#originalElement);
            }
            else if (this.#loadingElement && this.#originalElement && this.#currentValue === false) {
                this.renderer.insertBefore(this.#loadingElement.parentNode, this.#originalElement, this.#loadingElement);
                this.renderer.removeChild(this.#loadingElement.parentNode, this.#loadingElement);
            }
            mutationObserver.disconnect();
        });
        mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LoadingDirective, deps: [{ token: ElementRef }, { token: Renderer2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: LoadingDirective, selector: "[bizyLoading]", inputs: { bizyLoading: "bizyLoading", type: "type" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LoadingDirective, decorators: [{
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
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { bizyLoading: [{
                type: Input
            }], type: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvbG9hZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDOztBQU92QixNQUFNLE9BQU8sZ0JBQWdCO0lBYUc7SUFDRDtJQUNEO0lBZDVCLElBQWEsV0FBVyxDQUFDLEtBQWM7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFUSxJQUFJLEdBQWdCLFNBQVMsQ0FBQztJQUV2QyxlQUFlLENBQU07SUFDckIsZ0JBQWdCLENBQWM7SUFDOUIsYUFBYSxDQUFVO0lBRXZCLFlBQzhCLFVBQXNCLEVBQ3ZCLFFBQW1CLEVBQ3BCLFFBQWtCO1FBRmhCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQzNDLENBQUM7SUFFSixVQUFVLEdBQUcsR0FBRyxFQUFFO1FBQ2hCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7WUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFD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QUFLLEVBQUU7Z0JBQ3hGLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3pHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNsRjtZQUVELGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRixDQUFDLENBQUE7d0dBMURVLGdCQUFnQixrQkFhakIsVUFBVSxhQUNWLFNBQVMsYUFDVCxRQUFROzRGQWZQLGdCQUFnQjs7NEZBQWhCLGdCQUFnQjtrQkFINUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7OzBCQWNJLE1BQU07MkJBQUMsVUFBVTs7MEJBQ2pCLE1BQU07MkJBQUMsU0FBUzs7MEJBQ2hCLE1BQU07MkJBQUMsUUFBUTs0Q0FkTCxXQUFXO3NCQUF2QixLQUFLO2dCQUtHLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxudHlwZSBMb2FkaW5nVHlwZSA9ICdzcGlubmVyJyB8ICdjYXJkJyB8ICdpdGVtJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JpenlMb2FkaW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIHNldCBiaXp5TG9hZGluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuI2N1cnJlbnRWYWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuc2V0TG9hZGluZygpO1xuICB9XG5cbiAgQElucHV0KCkgdHlwZTogTG9hZGluZ1R5cGUgPSAnc3Bpbm5lcic7XG5cbiAgI2xvYWRpbmdFbGVtZW50OiBhbnk7XG4gICNvcmlnaW5hbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAjY3VycmVudFZhbHVlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcbiAgKSB7fVxuXG4gIHNldExvYWRpbmcgPSAoKSA9PiB7XG4gICAgY29uc3QgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICgodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgJiYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoID09PSAwIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCA9PT0gMCkgJiYgIXRoaXMuI29yaWdpbmFsRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy4jY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuI29yaWdpbmFsRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBsb2FkaW5nV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAnd2lkdGgnLCBgJHt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aH1weGApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAnaGVpZ2h0JywgYCR7dGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4YCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICdkaXNwbGF5JywgJ2dyaWQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ3BsYWNlSXRlbXMnLCAnY2VudGVyJyk7XG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICdiYWNrZ3JvdW5kQ29sb3InLCBiYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbG9hZGluZyA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGxvYWRpbmcsIGBiaXp5LWxvYWRpbmctLSR7dGhpcy50eXBlfWApO1xuICAgICAgICBjb25zdCBtaW5TaXplID0gTWF0aC5taW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZywgJ3dpZHRoJywgYCR7bWluU2l6ZSAqIDAuOH1weGApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmcsICdoZWlnaHQnLCBgJHttaW5TaXplICogMC44fXB4YCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZywgJ21heFdpZHRoJywgJzIwdm1heCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmcsICdtYXhIZWlnaHQnLCAnMjB2bWF4Jyk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChsb2FkaW5nV3JhcHBlciwgbG9hZGluZyk7XG5cbiAgICAgICAgdGhpcy4jbG9hZGluZ0VsZW1lbnQgPSBsb2FkaW5nV3JhcHBlcjtcbiAgICAgICAgICBcbiAgICAgICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUodGhpcy4jb3JpZ2luYWxFbGVtZW50LnBhcmVudE5vZGUsdGhpcy4jbG9hZGluZ0VsZW1lbnQsdGhpcy4jb3JpZ2luYWxFbGVtZW50KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLiNvcmlnaW5hbEVsZW1lbnQucGFyZW50Tm9kZSwgdGhpcy4jb3JpZ2luYWxFbGVtZW50KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy4jbG9hZGluZ0VsZW1lbnQgJiYgdGhpcy4jb3JpZ2luYWxFbGVtZW50ICYmIHRoaXMuI2N1cnJlbnRWYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUodGhpcy4jbG9hZGluZ0VsZW1lbnQucGFyZW50Tm9kZSwgdGhpcy4jb3JpZ2luYWxFbGVtZW50LCB0aGlzLiNsb2FkaW5nRWxlbWVudCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy4jbG9hZGluZ0VsZW1lbnQucGFyZW50Tm9kZSwgdGhpcy4jbG9hZGluZ0VsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcblxuICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICB9XG59XG4iXX0=