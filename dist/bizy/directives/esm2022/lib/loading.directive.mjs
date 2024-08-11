import { DOCUMENT } from '@angular/common';
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
    bizyLoadingType = LOADING_TYPE.SPINNER;
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
            this.renderer.addClass(loading, `bizy-loading--${this.bizyLoadingType}`);
            if (this.bizyLoadingType === LOADING_TYPE.SPINNER) {
                const minSize = Math.min(this.elementRef.nativeElement.offsetWidth, this.elementRef.nativeElement.offsetHeight);
                this.renderer.setStyle(loading, 'width', `${minSize * 0.8}px`);
                this.renderer.setStyle(loading, 'height', `${minSize * 0.8}px`);
                this.renderer.setStyle(loading, 'minWidth', '1rem');
                this.renderer.setStyle(loading, 'minHeight', '1rem');
                this.renderer.setStyle(loading, 'maxWidth', '15vmax');
                this.renderer.setStyle(loading, 'maxHeight', '15vmax');
            }
            else if (this.bizyLoadingType === LOADING_TYPE.BAR) {
                this.renderer.setStyle(loading, 'height', `${this.elementRef.nativeElement.offsetHeight}px`);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLoadingDirective, deps: [{ token: ElementRef }, { token: Renderer2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
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
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { bizyLoading: [{
                type: Input
            }], bizyLoadingType: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvbG9hZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDOztBQUV2QixNQUFNLENBQU4sSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3RCLG1DQUFtQixDQUFBO0lBQ25CLDJCQUFXLENBQUE7QUFDYixDQUFDLEVBSFcsWUFBWSxLQUFaLFlBQVksUUFHdkI7QUFJRCxNQUFNLE9BQU8sb0JBQW9CO0lBeUJEO0lBQ0Q7SUFDRDtJQTFCNUIsSUFBYSxXQUFXLENBQUMsS0FBYztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ3RLLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ3RLLE9BQU87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SSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6RyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDbEY7SUFDSCxDQUFDO3dHQWxFVSxvQkFBb0Isa0JBeUJyQixVQUFVLGFBQ1YsU0FBUyxhQUNULFFBQVE7NEZBM0JQLG9CQUFvQjs7NEZBQXBCLG9CQUFvQjtrQkFIaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7OzBCQTBCSSxNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLFFBQVE7NENBMUJMLFdBQVc7c0JBQXZCLEtBQUs7Z0JBa0JHLGVBQWU7c0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBlbnVtIExPQURJTkdfVFlQRSB7XG4gIFNQSU5ORVIgPSAnc3Bpbm5lcicsXG4gIEJBUiA9ICdiYXInXG59XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYml6eUxvYWRpbmddJ1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5TG9hZGluZ0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIHNldCBiaXp5TG9hZGluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICgodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgJiYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoID09PSAwIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCA9PT0gMCkgJiYgIXRoaXMuI29yaWdpbmFsRWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgIGlmICgodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgJiYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoID09PSAwIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCA9PT0gMCkgJiYgIXRoaXMuI29yaWdpbmFsRWxlbWVudCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiNzZXRMb2FkaW5nKHZhbHVlKTtcblxuICAgICAgICBtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH0pO1xuXG4gICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4jc2V0TG9hZGluZyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgYml6eUxvYWRpbmdUeXBlOiBMT0FESU5HX1RZUEUgPSBMT0FESU5HX1RZUEUuU1BJTk5FUjtcblxuICAjbG9hZGluZ0VsZW1lbnQ6IGFueTtcbiAgI29yaWdpbmFsRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudFxuICApIHt9XG5cbiAgI3NldExvYWRpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuI29yaWdpbmFsRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgY29uc3QgbG9hZGluZ1dyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICd3aWR0aCcsIGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRofXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAnaGVpZ2h0JywgYCR7dGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAnZGlzcGxheScsICdncmlkJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAncGxhY2VJdGVtcycsICdjZW50ZXInKTtcbiAgICAgIGNvbnN0IGJhY2tncm91bmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAnYmFja2dyb3VuZENvbG9yJywgYmFja2dyb3VuZENvbG9yKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG4gICAgICBcbiAgICAgIGNvbnN0IGxvYWRpbmcgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobG9hZGluZywgYGJpenktbG9hZGluZy0tJHt0aGlzLmJpenlMb2FkaW5nVHlwZX1gKTtcbiAgICAgIGlmICh0aGlzLmJpenlMb2FkaW5nVHlwZSA9PT0gTE9BRElOR19UWVBFLlNQSU5ORVIpIHtcbiAgICAgICAgY29uc3QgbWluU2l6ZSA9IE1hdGgubWluKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmcsICd3aWR0aCcsIGAke21pblNpemUgKiAwLjh9cHhgKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nLCAnaGVpZ2h0JywgYCR7bWluU2l6ZSAqIDAuOH1weGApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmcsICdtaW5XaWR0aCcsICcxcmVtJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZywgJ21pbkhlaWdodCcsICcxcmVtJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZywgJ21heFdpZHRoJywgJzE1dm1heCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmcsICdtYXhIZWlnaHQnLCAnMTV2bWF4Jyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYml6eUxvYWRpbmdUeXBlID09PSBMT0FESU5HX1RZUEUuQkFSKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZywgJ2hlaWdodCcsIGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodH1weGApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGxvYWRpbmdXcmFwcGVyLCBsb2FkaW5nKTtcblxuICAgICAgdGhpcy4jbG9hZGluZ0VsZW1lbnQgPSBsb2FkaW5nV3JhcHBlcjtcbiAgICAgICAgXG4gICAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZSh0aGlzLiNvcmlnaW5hbEVsZW1lbnQucGFyZW50Tm9kZSx0aGlzLiNsb2FkaW5nRWxlbWVudCx0aGlzLiNvcmlnaW5hbEVsZW1lbnQpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLiNvcmlnaW5hbEVsZW1lbnQucGFyZW50Tm9kZSwgdGhpcy4jb3JpZ2luYWxFbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuI2xvYWRpbmdFbGVtZW50ICYmIHRoaXMuI29yaWdpbmFsRWxlbWVudCAmJiB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuaW5zZXJ0QmVmb3JlKHRoaXMuI2xvYWRpbmdFbGVtZW50LnBhcmVudE5vZGUsIHRoaXMuI29yaWdpbmFsRWxlbWVudCwgdGhpcy4jbG9hZGluZ0VsZW1lbnQpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLiNsb2FkaW5nRWxlbWVudC5wYXJlbnROb2RlLCB0aGlzLiNsb2FkaW5nRWxlbWVudCk7XG4gICAgfVxuICB9XG59XG4iXX0=