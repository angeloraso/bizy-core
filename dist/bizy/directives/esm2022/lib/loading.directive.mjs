import { DOCUMENT } from '@angular/common';
import { Directive, Input, ElementRef, Inject, Renderer2, } from '@angular/core';
import * as i0 from "@angular/core";
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLoadingDirective, deps: [{ token: ElementRef }, { token: Renderer2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyLoadingDirective, selector: "[bizyLoading]", inputs: { bizyLoading: "bizyLoading", type: "type" }, ngImport: i0 });
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
            }], type: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvbG9hZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDOztBQU92QixNQUFNLE9BQU8sb0JBQW9CO0lBeUJEO0lBQ0Q7SUFDRDtJQTFCNUIsSUFBYSxXQUFXLENBQUMsS0FBYztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ3RLLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ3RLLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFeEIsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxnQkFB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TyxDQUFDLENBQUM7WUFFbkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7WUFFdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDcEY7YUFBTSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDM0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6RyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDbEY7SUFDSCxDQUFDO3dHQTVEVSxvQkFBb0Isa0JBeUJyQixVQUFVLGFBQ1YsU0FBUyxhQUNULFFBQVE7NEZBM0JQLG9CQUFvQjs7NEZBQXBCLG9CQUFvQjtrQkFIaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7OzBCQTBCSSxNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLFFBQVE7NENBMUJMLFdBQVc7c0JBQXZCLEtBQUs7Z0JBa0JHLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxudHlwZSBMb2FkaW5nVHlwZSA9ICdzcGlubmVyJyB8ICdjYXJkJyB8ICdpdGVtJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JpenlMb2FkaW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgQml6eUxvYWRpbmdEaXJlY3RpdmUge1xuICBASW5wdXQoKSBzZXQgYml6eUxvYWRpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA9PT0gMCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgPT09IDApICYmICF0aGlzLiNvcmlnaW5hbEVsZW1lbnQpKSB7XG4gICAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICBpZiAoKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA9PT0gMCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgPT09IDApICYmICF0aGlzLiNvcmlnaW5hbEVsZW1lbnQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4jc2V0TG9hZGluZyh2YWx1ZSk7XG5cbiAgICAgICAgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9KTtcblxuICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI3NldExvYWRpbmcodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHR5cGU6IExvYWRpbmdUeXBlID0gJ3NwaW5uZXInO1xuXG4gICNsb2FkaW5nRWxlbWVudDogYW55O1xuICAjb3JpZ2luYWxFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XG4gICkge31cblxuICAjc2V0TG9hZGluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy4jb3JpZ2luYWxFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBsb2FkaW5nV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ3dpZHRoJywgYCR7dGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGh9cHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICdoZWlnaHQnLCBgJHt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHR9cHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICdkaXNwbGF5JywgJ2dyaWQnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICdwbGFjZUl0ZW1zJywgJ2NlbnRlcicpO1xuICAgICAgY29uc3QgYmFja2dyb3VuZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQtY29sb3InKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICdiYWNrZ3JvdW5kQ29sb3InLCBiYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgIFxuICAgICAgY29uc3QgbG9hZGluZyA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhsb2FkaW5nLCBgYml6eS1sb2FkaW5nLS0ke3RoaXMudHlwZX1gKTtcbiAgICAgIGNvbnN0IG1pblNpemUgPSBNYXRoLm1pbih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCwgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZywgJ3dpZHRoJywgYCR7bWluU2l6ZSAqIDAuOH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nLCAnaGVpZ2h0JywgYCR7bWluU2l6ZSAqIDAuOH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nLCAnbWF4V2lkdGgnLCAnMTV2bWF4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmcsICdtYXhIZWlnaHQnLCAnMTV2bWF4Jyk7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobG9hZGluZ1dyYXBwZXIsIGxvYWRpbmcpO1xuXG4gICAgICB0aGlzLiNsb2FkaW5nRWxlbWVudCA9IGxvYWRpbmdXcmFwcGVyO1xuICAgICAgICBcbiAgICAgIHRoaXMucmVuZGVyZXIuaW5zZXJ0QmVmb3JlKHRoaXMuI29yaWdpbmFsRWxlbWVudC5wYXJlbnROb2RlLHRoaXMuI2xvYWRpbmdFbGVtZW50LHRoaXMuI29yaWdpbmFsRWxlbWVudCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuI29yaWdpbmFsRWxlbWVudC5wYXJlbnROb2RlLCB0aGlzLiNvcmlnaW5hbEVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy4jbG9hZGluZ0VsZW1lbnQgJiYgdGhpcy4jb3JpZ2luYWxFbGVtZW50ICYmIHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUodGhpcy4jbG9hZGluZ0VsZW1lbnQucGFyZW50Tm9kZSwgdGhpcy4jb3JpZ2luYWxFbGVtZW50LCB0aGlzLiNsb2FkaW5nRWxlbWVudCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuI2xvYWRpbmdFbGVtZW50LnBhcmVudE5vZGUsIHRoaXMuI2xvYWRpbmdFbGVtZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==