import { Directive, ElementRef, Renderer2, HostListener, Inject, Output, EventEmitter, } from '@angular/core';
import { BizyCopyToClipboardService } from './copy-to-clipboard.service';
import * as i0 from "@angular/core";
import * as i1 from "./copy-to-clipboard.service";
export class BizyCopyToClipboardDirective {
    elementRef;
    renderer;
    copyToClipboard;
    onCopy = new EventEmitter();
    #svgElement;
    #COPY_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/>
  </svg>`;
    #CHECK_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
  </svg>`;
    #ERROR_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
  </svg>`;
    constructor(elementRef, renderer, copyToClipboard) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.copyToClipboard = copyToClipboard;
        this.#svgElement = this.renderer.createElement('div');
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
        this.renderer.setStyle(this.#svgElement, 'position', 'absolute');
        this.renderer.setStyle(this.#svgElement, 'right', '0');
        this.renderer.setStyle(this.#svgElement, 'opacity', '0');
        this.renderer.setStyle(this.#svgElement, 'background', 'linear-gradient(to left, rgb(255, 255, 255), rgba(0, 0, 0, 0))');
        this.renderer.setStyle(this.#svgElement, 'paddingLeft', '5rem');
        this.renderer.setStyle(this.#svgElement, 'transition', 'opacity 0.2s ease-in-out');
        this.renderer.appendChild(this.elementRef.nativeElement, this.#svgElement);
    }
    onMouseEnter() {
        this.#svgElement.innerHTML = this.#COPY_ICON;
        this.renderer.setStyle(this.#svgElement, 'fill', 'var(--bizy-copy-to-clipboard-default-color)');
        const elementHeight = this.elementRef.nativeElement.offsetHeight - 4;
        this.renderer.setStyle(this.#svgElement, 'height', `${elementHeight}px`);
        const svg = this.#svgElement.querySelector('svg');
        if (svg) {
            this.renderer.setStyle(svg, 'height', '100%');
            this.renderer.setStyle(svg, 'width', 'auto');
            this.renderer.setStyle(svg, 'pointerEvents', 'none');
        }
        this.#setVisibility(true);
    }
    onMouseLeave() {
        this.#setVisibility(false);
    }
    onClick(event) {
        if (!this.elementRef.nativeElement.innerText) {
            return;
        }
        event.stopPropagation();
        this.copyToClipboard.copy(this.elementRef.nativeElement.innerText.trim()).then(() => {
            this.renderer.setStyle(this.#svgElement, 'fill', 'var(--bizy-copy-to-clipboard-success-color)');
            this.#svgElement.innerHTML = this.#CHECK_ICON;
            this.onCopy.emit();
        }).catch(() => {
            this.renderer.setStyle(this.#svgElement, 'fill', 'var(--bizy-copy-to-clipboard-danger-color)');
            this.#svgElement.innerHTML = this.#ERROR_ICON;
        }).finally(() => {
            const elementHeight = this.elementRef.nativeElement.offsetHeight - 1;
            this.renderer.setStyle(this.#svgElement, 'height', `${elementHeight}px`);
            const svg = this.#svgElement.querySelector('svg');
            if (svg) {
                this.renderer.setStyle(svg, 'height', '100%');
                this.renderer.setStyle(svg, 'width', 'auto');
                this.renderer.setStyle(svg, 'pointerEvents', 'none');
            }
        });
    }
    #setVisibility(visible) {
        this.renderer.setStyle(this.#svgElement, 'opacity', visible ? '1' : '0');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardDirective, deps: [{ token: ElementRef }, { token: Renderer2 }, { token: BizyCopyToClipboardService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyCopyToClipboardDirective, selector: "[bizyCopyToClipboard]", outputs: { onCopy: "onCopy" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "click": "onClick($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyCopyToClipboard]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i1.BizyCopyToClipboardService, decorators: [{
                    type: Inject,
                    args: [BizyCopyToClipboardService]
                }] }]; }, propDecorators: { onCopy: [{
                type: Output
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS10by1jbGlwYm9hcmQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi9jb3B5LXRvLWNsaXBib2FyZC9jb3B5LXRvLWNsaXBib2FyZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sTUFBTSxFQUNOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBS3pFLE1BQU0sT0FBTyw0QkFBNEI7SUFvQlQ7SUFDRDtJQUNpQjtJQXJCcEMsTUFBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFDNUMsV0FBVyxDQUFjO0lBRWhCLFVBQVUsR0FBRzs7O1NBR2YsQ0FBQztJQUVDLFdBQVcsR0FBRzs7O1NBR2hCLENBQUM7SUFFQyxXQUFXLEdBQUc7OztTQUdoQixDQUFBO0lBRVAsWUFDOEIsVUFBc0IsRUFDdkIsUUFBbUIsRUFDRixlQUEyQztRQUYzRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDRixvQkFBZSxHQUFmLGVBQWUsQ0FBNEI7UUFFdkYsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFD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LE1BQU07MkJBQUMsMEJBQTBCOzRDQXJCMUIsTUFBTTtzQkFBZixNQUFNO2dCQWtDcUIsWUFBWTtzQkFBdkMsWUFBWTt1QkFBQyxZQUFZO2dCQWNFLFlBQVk7c0JBQXZDLFlBQVk7dUJBQUMsWUFBWTtnQkFJUyxPQUFPO3NCQUF6QyxZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQml6eUNvcHlUb0NsaXBib2FyZFNlcnZpY2UgfSBmcm9tICcuL2NvcHktdG8tY2xpcGJvYXJkLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYml6eUNvcHlUb0NsaXBib2FyZF0nLFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5Q29weVRvQ2xpcGJvYXJkRGlyZWN0aXZlIHtcbiAgQE91dHB1dCgpIG9uQ29weSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgI3N2Z0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIHJlYWRvbmx5ICNDT1BZX0lDT04gPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiPlxuICAgIDxwYXRoIGQ9XCJNMjA4IDBIMzMyLjFjMTIuNyAwIDI0LjkgNS4xIDMzLjkgMTQuMWw2Ny45IDY3LjljOSA5IDE0LjEgMjEuMiAxNC4xIDMzLjlWMzM2YzAgMjYuNS0yMS41IDQ4LTQ4IDQ4SDIwOGMtMjYuNSAwLTQ4LTIxLjUtNDgtNDhWNDhjMC0yNi41IDIxLjUtNDggNDgtNDh6TTQ4IDEyOGg4MHY2NEg2NFY0NDhIMjU2VjQxNmg2NHY0OGMwIDI2LjUtMjEuNSA0OC00OCA0OEg0OGMtMjYuNSAwLTQ4LTIxLjUtNDgtNDhWMTc2YzAtMjYuNSAyMS41LTQ4IDQ4LTQ4elwiLz5cbiAgPC9zdmc+YDtcblxuICByZWFkb25seSAjQ0hFQ0tfSUNPTiA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+XG4gICAgPHBhdGggZD1cIk0yNTYgNDhhMjA4IDIwOCAwIDEgMSAwIDQxNiAyMDggMjA4IDAgMSAxIDAtNDE2em0wIDQ2NEEyNTYgMjU2IDAgMSAwIDI1NiAwYTI1NiAyNTYgMCAxIDAgMCA1MTJ6TTM2OSAyMDljOS40LTkuNCA5LjQtMjQuNiAwLTMzLjlzLTI0LjYtOS40LTMzLjkgMGwtMTExIDExMS00Ny00N2MtOS40LTkuNC0yNC42LTkuNC0zMy45IDBzLTkuNCAyNC42IDAgMzMuOWw2NCA2NGM5LjQgOS40IDI0LjYgOS40IDMzLjkgMEwzNjkgMjA5elwiLz5cbiAgPC9zdmc+YDtcblxuICByZWFkb25seSAjRVJST1JfSUNPTiA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+XG4gICAgPHBhdGggZD1cIk0yNTYgNDhhMjA4IDIwOCAwIDEgMSAwIDQxNiAyMDggMjA4IDAgMSAxIDAtNDE2em0wIDQ2NEEyNTYgMjU2IDAgMSAwIDI1NiAwYTI1NiAyNTYgMCAxIDAgMCA1MTJ6TTE3NSAxNzVjLTkuNCA5LjQtOS40IDI0LjYgMCAzMy45bDQ3IDQ3LTQ3IDQ3Yy05LjQgOS40LTkuNCAyNC42IDAgMzMuOXMyNC42IDkuNCAzMy45IDBsNDctNDcgNDcgNDdjOS40IDkuNCAyNC42IDkuNCAzMy45IDBzOS40LTI0LjYgMC0zMy45bC00Ny00NyA0Ny00N2M5LjQtOS40IDkuNC0yNC42IDAtMzMuOXMtMjQuNi05LjQtMzMuOSAwbC00NyA0Ny00Ny00N2MtOS40LTkuNC0yNC42LTkuNC0zMy45IDB6XCIvPlxuICA8L3N2Zz5gXG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KEJpenlDb3B5VG9DbGlwYm9hcmRTZXJ2aWNlKSBwcml2YXRlIGNvcHlUb0NsaXBib2FyZDogQml6eUNvcHlUb0NsaXBib2FyZFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy4jc3ZnRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNzdmdFbGVtZW50LCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI3N2Z0VsZW1lbnQsICdyaWdodCcsICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNzdmdFbGVtZW50LCAnb3BhY2l0eScsICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNzdmdFbGVtZW50LCAnYmFja2dyb3VuZCcsICdsaW5lYXItZ3JhZGllbnQodG8gbGVmdCwgcmdiKDI1NSwgMjU1LCAyNTUpLCByZ2JhKDAsIDAsIDAsIDApKScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jc3ZnRWxlbWVudCwgJ3BhZGRpbmdMZWZ0JywgJzVyZW0nKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI3N2Z0VsZW1lbnQsICd0cmFuc2l0aW9uJywgJ29wYWNpdHkgMC4ycyBlYXNlLWluLW91dCcpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuI3N2Z0VsZW1lbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpIG9uTW91c2VFbnRlcigpIHtcbiAgICB0aGlzLiNzdmdFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuI0NPUFlfSUNPTjtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI3N2Z0VsZW1lbnQsICdmaWxsJywgJ3ZhcigtLWJpenktY29weS10by1jbGlwYm9hcmQtZGVmYXVsdC1jb2xvciknKTtcbiAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gNDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI3N2Z0VsZW1lbnQsICdoZWlnaHQnLCBgJHtlbGVtZW50SGVpZ2h0fXB4YCk7XG4gICAgY29uc3Qgc3ZnID0gdGhpcy4jc3ZnRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcbiAgICBpZiAoc3ZnKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHN2ZywgJ2hlaWdodCcsICcxMDAlJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHN2ZywgJ3dpZHRoJywgJ2F1dG8nKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc3ZnLCAncG9pbnRlckV2ZW50cycsICdub25lJyk7XG4gICAgfVxuICAgIHRoaXMuI3NldFZpc2liaWxpdHkodHJ1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25Nb3VzZUxlYXZlKCkge1xuICAgIHRoaXMuI3NldFZpc2liaWxpdHkoZmFsc2UpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQpe1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5jb3B5VG9DbGlwYm9hcmQuY29weSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQudHJpbSgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNzdmdFbGVtZW50LCAnZmlsbCcsICd2YXIoLS1iaXp5LWNvcHktdG8tY2xpcGJvYXJkLXN1Y2Nlc3MtY29sb3IpJyk7XG4gICAgICAgIHRoaXMuI3N2Z0VsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy4jQ0hFQ0tfSUNPTjtcbiAgICAgICAgdGhpcy5vbkNvcHkuZW1pdCgpO1xuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNzdmdFbGVtZW50LCAnZmlsbCcsICd2YXIoLS1iaXp5LWNvcHktdG8tY2xpcGJvYXJkLWRhbmdlci1jb2xvciknKTtcbiAgICAgICAgdGhpcy4jc3ZnRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLiNFUlJPUl9JQ09OO1xuICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gMTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNzdmdFbGVtZW50LCAnaGVpZ2h0JywgYCR7ZWxlbWVudEhlaWdodH1weGApO1xuICAgICAgICBjb25zdCBzdmcgPSB0aGlzLiNzdmdFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuICAgICAgICBpZiAoc3ZnKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHN2ZywgJ2hlaWdodCcsICcxMDAlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHN2ZywgJ3dpZHRoJywgJ2F1dG8nKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc3ZnLCAncG9pbnRlckV2ZW50cycsICdub25lJyk7XG4gICAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgI3NldFZpc2liaWxpdHkodmlzaWJsZTogYm9vbGVhbikge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jc3ZnRWxlbWVudCwgJ29wYWNpdHknLCB2aXNpYmxlID8gJzEnIDogJzAnKTtcbiAgfVxufVxuIl19