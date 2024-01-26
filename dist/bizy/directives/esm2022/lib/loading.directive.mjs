import { Directive, Input, ElementRef, Inject, Renderer2, } from '@angular/core';
import { Subject, interval, take, takeUntil, } from 'rxjs';
import * as i0 from "@angular/core";
export class LoadingDirective {
    elementRef;
    renderer;
    set bizyLoading(value) {
        this.#currentValue = value;
        this.setLoading();
    }
    type = 'spinner';
    #loadingElement;
    #originalElement;
    #currentValue;
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    setLoading() {
        const interval$ = interval(500);
        const viewInit$ = new Subject();
        interval$.pipe(takeUntil(viewInit$), take(6)).subscribe(() => {
            if ((this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth === 0 || this.elementRef.nativeElement.offsetHeight === 0) && !this.#originalElement)) {
                return;
            }
            viewInit$.next();
            viewInit$.complete();
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
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LoadingDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: LoadingDirective, selector: "[bizyLoading]", inputs: { bizyLoading: "bizyLoading", type: "type" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyLoading]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { bizyLoading: [{
                type: Input
            }], type: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvbG9hZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLE9BQU8sRUFDUCxRQUFRLEVBQ1IsSUFBSSxFQUNKLFNBQVMsR0FDVixNQUFNLE1BQU0sQ0FBQzs7QUFPZCxNQUFNLE9BQU8sZ0JBQWdCO0lBYUc7SUFDRDtJQWI3QixJQUFhLFdBQVcsQ0FBQyxLQUFjO1FBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVEsSUFBSSxHQUFnQixTQUFTLENBQUM7SUFFdkMsZUFBZSxDQUFNO0lBQ3JCLGdCQUFnQixDQUFjO0lBQzlCLGFBQWEsQ0FBVTtJQUV2QixZQUM4QixVQUFzQixFQUN2QixRQUFtQjtRQURsQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLGFBQVEsR0FBUixRQUFRLENBQVc7SUFDN0MsQ0FBQztJQUVKLFVBQVU7UUFDUixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsTUFBTSxTQUFTLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7UUFDL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFX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SUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNwRjtpQkFBTSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssS0FBSyxFQUFFO2dCQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN6RyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDbEY7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7d0dBM0RVLGdCQUFnQixrQkFhakIsVUFBVSxhQUNWLFNBQVM7NEZBZFIsZ0JBQWdCOzs0RkFBaEIsZ0JBQWdCO2tCQUg1QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7MEJBY0ksTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxTQUFTOzRDQWJOLFdBQVc7c0JBQXZCLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU3ViamVjdCxcbiAgaW50ZXJ2YWwsXG4gIHRha2UsXG4gIHRha2VVbnRpbCxcbn0gZnJvbSAncnhqcyc7XG5cbnR5cGUgTG9hZGluZ1R5cGUgPSAnc3Bpbm5lcicgfCAnY2FyZCcgfCAnaXRlbSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tiaXp5TG9hZGluZ10nLFxufSlcbmV4cG9ydCBjbGFzcyBMb2FkaW5nRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgc2V0IGJpenlMb2FkaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy4jY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5zZXRMb2FkaW5nKCk7XG4gIH1cblxuICBASW5wdXQoKSB0eXBlOiBMb2FkaW5nVHlwZSA9ICdzcGlubmVyJztcblxuICAjbG9hZGluZ0VsZW1lbnQ6IGFueTtcbiAgI29yaWdpbmFsRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICNjdXJyZW50VmFsdWU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgc2V0TG9hZGluZygpIHtcbiAgICBjb25zdCBpbnRlcnZhbCQgPSBpbnRlcnZhbCg1MDApO1xuICAgIGNvbnN0IHZpZXdJbml0JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgaW50ZXJ2YWwkLnBpcGUodGFrZVVudGlsKHZpZXdJbml0JCksIHRha2UoNikpLnN1YnNjcmliZSgoKSA9PiB7XG5cbiAgICAgIGlmICgodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgJiYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoID09PSAwIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCA9PT0gMCkgJiYgIXRoaXMuI29yaWdpbmFsRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICB2aWV3SW5pdCQubmV4dCgpO1xuICAgICAgdmlld0luaXQkLmNvbXBsZXRlKCk7XG5cbiAgICAgIGlmICh0aGlzLiNjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy4jb3JpZ2luYWxFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGxvYWRpbmdXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICd3aWR0aCcsIGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRofXB4YCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICdoZWlnaHQnLCBgJHt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHR9cHhgKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ2Rpc3BsYXknLCAnZ3JpZCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGxvYWRpbmdXcmFwcGVyLCAncGxhY2VJdGVtcycsICdjZW50ZXInKTtcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQtY29sb3InKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nV3JhcHBlciwgJ2JhY2tncm91bmRDb2xvcicsIGJhY2tncm91bmRDb2xvcik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZ1dyYXBwZXIsICdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBsb2FkaW5nID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobG9hZGluZywgYGJpenktbG9hZGluZy0tJHt0aGlzLnR5cGV9YCk7XG4gICAgICAgIGNvbnN0IG1pblNpemUgPSBNYXRoLm1pbih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCwgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nLCAnd2lkdGgnLCBgJHttaW5TaXplICogMC44fXB4YCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZywgJ2hlaWdodCcsIGAke21pblNpemUgKiAwLjh9cHhgKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShsb2FkaW5nLCAnbWF4V2lkdGgnLCAnMjB2bWF4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobG9hZGluZywgJ21heEhlaWdodCcsICcyMHZtYXgnKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGxvYWRpbmdXcmFwcGVyLCBsb2FkaW5nKTtcblxuICAgICAgICB0aGlzLiNsb2FkaW5nRWxlbWVudCA9IGxvYWRpbmdXcmFwcGVyO1xuICAgICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZSh0aGlzLiNvcmlnaW5hbEVsZW1lbnQucGFyZW50Tm9kZSx0aGlzLiNsb2FkaW5nRWxlbWVudCx0aGlzLiNvcmlnaW5hbEVsZW1lbnQpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuI29yaWdpbmFsRWxlbWVudC5wYXJlbnROb2RlLCB0aGlzLiNvcmlnaW5hbEVsZW1lbnQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLiNsb2FkaW5nRWxlbWVudCAmJiB0aGlzLiNvcmlnaW5hbEVsZW1lbnQgJiYgdGhpcy4jY3VycmVudFZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZSh0aGlzLiNsb2FkaW5nRWxlbWVudC5wYXJlbnROb2RlLCB0aGlzLiNvcmlnaW5hbEVsZW1lbnQsIHRoaXMuI2xvYWRpbmdFbGVtZW50KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLiNsb2FkaW5nRWxlbWVudC5wYXJlbnROb2RlLCB0aGlzLiNsb2FkaW5nRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==