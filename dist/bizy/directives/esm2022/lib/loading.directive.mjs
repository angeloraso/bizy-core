import { DOCUMENT } from '@angular/common';
import { Directive, Input, ElementRef, Inject, Renderer2, } from '@angular/core';
import * as i0 from "@angular/core";
export class LoadingDirective {
    elementRef;
    renderer;
    document;
    set bizyLoading(value) {
        if ((this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth === 0 || this.elementRef.nativeElement.offsetHeight === 0) && !this.#originalElement)) {
            const mutationObserver = new MutationObserver(() => {
                if ((this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth === 0 || this.elementRef.nativeElement.offsetHeight === 0) && !this.#originalElement)) {
                    return;
                }
                this.#setLoading(value);
                mutationObserver.disconnect();
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        }
        else {
            this.#setLoading(value);
        }
    }
    type = 'spinner';
    #loadingElement;
    #originalElement;
    constructor(elementRef, renderer, document) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.document = document;
    }
    #setLoading(value) {
        if (value) {
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
            this.renderer.setStyle(loading, 'maxWidth', '15vmax');
            this.renderer.setStyle(loading, 'maxHeight', '15vmax');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvbG9hZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDOztBQU92QixNQUFNLE9BQU8sZ0JBQWdCO0lBeUJHO0lBQ0Q7SUFDRDtJQTFCNUIsSUFBYSxXQUFXLENBQUMsS0FBYztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ3RLLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ3RLLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFeEIsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxnQkFB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TyxDQUFDLENBQUM7WUFFbkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7WUFFdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDcEY7YUFBTSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDM0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6RyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDbEY7SUFDSCxDQUFDO3dHQTVEVSxnQkFBZ0Isa0JBeUJqQixVQUFVLGFBQ1YsU0FBUyxhQUNULFFBQVE7NEZBM0JQLGdCQUFnQjs7NEZBQWhCLGdCQUFnQjtrQkFINUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7OzBCQTBCSSxNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLFFBQVE7NENBMUJMLFdBQVc7c0JBQXZCLEtBQUs7Z0JBa0JHLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxudHlwZSBMb2FkaW5nVHlwZSA9ICdzcGlubmVyJyB8ICdjYXJkJyB8ICdpdGVtJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JpenlMb2FkaW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIHNldCBiaXp5TG9hZGluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICgodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgJiYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoID09PSAwIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCA9PT0gMCkgJiYgIXRoaXMuI29yaWdpbmFsRWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgIGlmICgodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgJiYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoID09PSAwIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCA9PT0gMCkgJiYgIXRoaXMuI29yaWdpbmFsRWxlbWVudCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiNzZXRMb2FkaW5nKHZhbHVlKTtcblxuICAgICAgICBtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH0pO1xuXG4gICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4jc2V0TG9hZGluZyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgdHlwZTogTG9hZGluZ1R5cGUgPSAnc3Bpbm5lcic7XG5cbiAgI2xvYWRpbmdFbGVtZW50OiBhbnk7XG4gICNvcmlnaW5hbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcbiAgKSB7fVxuXG4gICNzZXRMb2FkaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLiNvcmlnaW5hbEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGxvYWRpbmdXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAnd2lkdGgnLCBgJHt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ2hlaWdodCcsIGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ2Rpc3BsYXknLCAnZ3JpZCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ3BsYWNlSXRlbXMnLCAnY2VudGVyJyk7XG4gICAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnYmFja2dyb3VuZC1jb2xvcicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ2JhY2tncm91bmRDb2xvcicsIGJhY2tncm91bmRDb2xvcik7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgXG4gICAgICBjb25zdCBsb2FkaW5nID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGxvYWRpbmcsIGBiaXp5LWxvYWRpbmctLSR7dGhpcy50eXBlfWApO1xuICAgICAgY29uc3QgbWluU2l6ZSA9IE1hdGgubWluKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nLCAnd2lkdGgnLCBgJHttaW5TaXplICogMC44fXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmcsICdoZWlnaHQnLCBgJHttaW5TaXplICogMC44fXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmcsICdtYXhXaWR0aCcsICcxNXZtYXgnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZywgJ21heEhlaWdodCcsICcxNXZtYXgnKTtcblxuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChsb2FkaW5nV3JhcHBlciwgbG9hZGluZyk7XG5cbiAgICAgIHRoaXMuI2xvYWRpbmdFbGVtZW50ID0gbG9hZGluZ1dyYXBwZXI7XG4gICAgICAgIFxuICAgICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUodGhpcy4jb3JpZ2luYWxFbGVtZW50LnBhcmVudE5vZGUsdGhpcy4jbG9hZGluZ0VsZW1lbnQsdGhpcy4jb3JpZ2luYWxFbGVtZW50KTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy4jb3JpZ2luYWxFbGVtZW50LnBhcmVudE5vZGUsIHRoaXMuI29yaWdpbmFsRWxlbWVudCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLiNsb2FkaW5nRWxlbWVudCAmJiB0aGlzLiNvcmlnaW5hbEVsZW1lbnQgJiYgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZSh0aGlzLiNsb2FkaW5nRWxlbWVudC5wYXJlbnROb2RlLCB0aGlzLiNvcmlnaW5hbEVsZW1lbnQsIHRoaXMuI2xvYWRpbmdFbGVtZW50KTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy4jbG9hZGluZ0VsZW1lbnQucGFyZW50Tm9kZSwgdGhpcy4jbG9hZGluZ0VsZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuIl19