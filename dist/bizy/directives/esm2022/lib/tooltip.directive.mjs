import { DOCUMENT } from '@angular/common';
import { Directive, Input, ElementRef, HostListener, Renderer2, inject } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyTooltipDirective {
    tooltipCustomClass = '';
    tooltipPlacement = 'top';
    tooltipDelay = 0; // Milliseconds
    tooltipLongPressDuration = 500; // Milliseconds
    #elementRef = inject(ElementRef);
    #renderer = inject(Renderer2);
    #document = inject(DOCUMENT);
    #tooltip;
    #hiding;
    #longPressTimeout = null;
    #lineClamp = 0;
    #text = null;
    set tooltipLineClamp(lineClamp) {
        if (!lineClamp && lineClamp <= 0) {
            return;
        }
        this.#lineClamp = lineClamp;
        const computedStyle = window.getComputedStyle(this.#elementRef.nativeElement);
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'width', '100%');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'min-width', '0');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'overflow', 'hidden');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'text-overflow', 'ellipsis');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'display', '-webkit-box');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'line-clamp', this.#lineClamp);
        this.#renderer.setStyle(this.#elementRef.nativeElement, '-webkit-line-clamp', this.#lineClamp);
        this.#renderer.setStyle(this.#elementRef.nativeElement, '-webkit-box-orient', 'vertical');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'max-height', `calc(${this.#lineClamp} * ${computedStyle.lineHeight})`);
    }
    set tooltipText(tooltipText) {
        if (!tooltipText) {
            return;
        }
        this.#text = tooltipText;
    }
    // Deprecated
    set placement(placement) {
        if (!placement) {
            return;
        }
        this.tooltipPlacement = placement;
    }
    // Deprecated
    set delay(delay) {
        if (typeof delay === 'undefined' || delay === null) {
            return;
        }
        this.tooltipDelay = delay;
    }
    onMouseEnter() {
        if (!this.#tooltip) {
            if (!this.#text) {
                this.#text = this.#elementRef.nativeElement.textContent;
            }
            if (!this.#text) {
                return;
            }
            this.#hiding = false;
            this.show();
        }
    }
    onMouseLeave() {
        if (this.#longPressTimeout) {
            clearTimeout(this.#longPressTimeout);
        }
        if (this.#tooltip && !this.#hiding) {
            if (!this.#text) {
                return;
            }
            this.#hiding = true;
            this.hide();
        }
        // Fix fixed tooltips
        this.#document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
            this.#renderer.removeChild(this.#document.body, element);
        });
    }
    onMouseUp() {
        if (this.#longPressTimeout) {
            clearTimeout(this.#longPressTimeout);
        }
    }
    onClick() {
        if (this.#tooltip && !this.#hiding) {
            this.#hiding = true;
            this.hide();
            return;
        }
        if (!this.#text) {
            this.#text = this.#elementRef.nativeElement.textContent;
        }
        if (!this.#tooltip && this.#text) {
            this.#longPressTimeout = setTimeout(() => {
                this.#hiding = false;
                this.show();
            }, this.tooltipLongPressDuration);
        }
    }
    show() {
        if (this.#lineClamp > 0 && !this.#isTextTruncated(this.#elementRef.nativeElement)) {
            return;
        }
        this.create();
        this.setPosition();
        this.#renderer.addClass(this.#tooltip, 'bizy-tooltip-identify');
        this.#renderer.addClass(this.#tooltip, 'bizy-tooltip--show');
        if (this.tooltipCustomClass) {
            this.#renderer.addClass(this.#tooltip, this.tooltipCustomClass);
        }
    }
    hide() {
        this.#renderer.removeClass(this.#tooltip, 'bizy-tooltip--show');
        window.setTimeout(() => {
            this.#renderer.removeChild(this.#document.body, this.#tooltip);
            this.#tooltip = null;
        }, this.tooltipDelay);
    }
    create() {
        this.#tooltip = this.#renderer.createElement('span');
        const sentences = String(this.#text).split('</br>');
        sentences.forEach(_sentence => {
            this.#renderer.appendChild(this.#tooltip, this.#renderer.createText(_sentence));
            this.#renderer.appendChild(this.#tooltip, this.#renderer.createElement('br'));
        });
        this.#renderer.appendChild(this.#document.body, this.#tooltip);
        this.#renderer.addClass(this.#tooltip, 'bizy-tooltip');
        this.#renderer.addClass(this.#tooltip, 'bizy-tooltip-' + this.tooltipPlacement);
        if (this.tooltipDelay > 0) {
            this.#renderer.setStyle(this.#tooltip, '-webkit-transition', 'opacity ' + this.tooltipDelay + 'ms');
            this.#renderer.setStyle(this.#tooltip, '-moz-transition', 'opacity ' + this.tooltipDelay + 'ms');
            this.#renderer.setStyle(this.#tooltip, '-o-transition', 'opacity ' + this.tooltipDelay + 'ms');
            this.#renderer.setStyle(this.#tooltip, 'transition', 'opacity ' + this.tooltipDelay + 'ms');
        }
    }
    setPosition() {
        const elRefPosition = this.#elementRef.nativeElement.getBoundingClientRect();
        const tooltipPos = this.#tooltip?.getBoundingClientRect();
        const scrollPos = window.pageYOffset || this.#document.documentElement.scrollTop || this.#document.body.scrollTop || 0;
        let top;
        let left;
        if (this.tooltipPlacement === 'top') {
            // @ts-ignore
            top = elRefPosition.top - tooltipPos.height - 10;
            // @ts-ignore
            left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
        }
        else if (this.tooltipPlacement === 'right') {
            // @ts-ignore
            top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
            left = elRefPosition.right + 10;
        }
        else if (this.tooltipPlacement === 'bottom') {
            top = elRefPosition.bottom + 10;
            // @ts-ignore
            left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
        }
        else if (this.tooltipPlacement === 'left') {
            // @ts-ignore
            top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
            // @ts-ignore
            left = elRefPosition.left - tooltipPos.width - 10;
        }
        this.#renderer.setStyle(this.#tooltip, 'top', (top + scrollPos) + 'px');
        this.#renderer.setStyle(this.#tooltip, 'left', left + 'px');
    }
    #isTextTruncated = (element) => {
        const { scrollHeight, clientHeight } = element;
        return scrollHeight > clientHeight;
    };
    ngOnDestroy() {
        this.#document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
            this.#renderer.removeChild(this.#document.body, element);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTooltipDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyTooltipDirective, selector: "[bizyTooltip]", inputs: { tooltipCustomClass: "tooltipCustomClass", tooltipPlacement: "tooltipPlacement", tooltipDelay: "tooltipDelay", tooltipLongPressDuration: "tooltipLongPressDuration", tooltipLineClamp: "tooltipLineClamp", tooltipText: ["bizyTooltip", "tooltipText"], placement: "placement", delay: "delay" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "mouseup": "onMouseUp()", "click": "onClick()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyTooltip]'
                }]
        }], propDecorators: { tooltipCustomClass: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], tooltipDelay: [{
                type: Input
            }], tooltipLongPressDuration: [{
                type: Input
            }], tooltipLineClamp: [{
                type: Input
            }], tooltipText: [{
                type: Input,
                args: ['bizyTooltip']
            }], placement: [{
                type: Input
            }], delay: [{
                type: Input
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], onMouseUp: [{
                type: HostListener,
                args: ['mouseup']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBS2pILE1BQU0sT0FBTyxvQkFBb0I7SUFDdEIsa0JBQWtCLEdBQVcsRUFBRSxDQUFDO0lBQ2hDLGdCQUFnQixHQUF3QyxLQUFLLENBQUM7SUFDOUQsWUFBWSxHQUFXLENBQUMsQ0FBQyxDQUFDLGVBQWU7SUFDekMsd0JBQXdCLEdBQVcsR0FBRyxDQUFDLENBQUMsZUFBZTtJQUV2RCxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV0QyxRQUFRLENBQXFCO0lBQzdCLE9BQU8sQ0FBVTtJQUNqQixpQkFBaUIsR0FBUSxJQUFJLENBQUM7SUFDOUIsVUFBVSxHQUFXLENBQUMsQ0FBQztJQUN2QixLQUFLLEdBQWtCLElBQUksQ0FBQztJQUU1QixJQUFhLGdCQUFnQixDQUFDLFNBQWlCO1FBQzdDLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRTtZQUNoQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUU1QixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5RSxJQUFJ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LENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7d0dBeE5VLG9CQUFvQjs0RkFBcEIsb0JBQW9COzs0RkFBcEIsb0JBQW9CO2tCQUhoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs4QkFFVSxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQVlPLGdCQUFnQjtzQkFBNUIsS0FBSztnQkFtQm9CLFdBQVc7c0JBQXBDLEtBQUs7dUJBQUMsYUFBYTtnQkFTUCxTQUFTO3NCQUFyQixLQUFLO2dCQVNPLEtBQUs7c0JBQWpCLEtBQUs7Z0JBUXNCLFlBQVk7c0JBQXZDLFlBQVk7dUJBQUMsWUFBWTtnQkFnQkUsWUFBWTtzQkFBdkMsWUFBWTt1QkFBQyxZQUFZO2dCQW9CRCxTQUFTO3NCQUFqQyxZQUFZO3VCQUFDLFNBQVM7Z0JBTUEsT0FBTztzQkFBN0IsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlcjIsIEluamVjdCwgT25EZXN0cm95LCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JpenlUb29sdGlwXSdcbn0pXG5leHBvcnQgY2xhc3MgQml6eVRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB0b29sdGlwQ3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiAndG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICdsZWZ0JyA9ICd0b3AnO1xuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciA9IDA7IC8vIE1pbGxpc2Vjb25kc1xuICBASW5wdXQoKSB0b29sdGlwTG9uZ1ByZXNzRHVyYXRpb246IG51bWJlciA9IDUwMDsgLy8gTWlsbGlzZWNvbmRzXG5cbiAgcmVhZG9ubHkgI2VsZW1lbnRSZWYgPSBpbmplY3QoRWxlbWVudFJlZik7XG4gIHJlYWRvbmx5ICNyZW5kZXJlciA9IGluamVjdChSZW5kZXJlcjIpO1xuICByZWFkb25seSAjZG9jdW1lbnQgPSBpbmplY3QoRE9DVU1FTlQpOyAgXG5cbiAgI3Rvb2x0aXA6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgI2hpZGluZzogYm9vbGVhbjtcbiAgI2xvbmdQcmVzc1RpbWVvdXQ6IGFueSA9IG51bGw7XG4gICNsaW5lQ2xhbXA6IG51bWJlciA9IDA7XG4gICN0ZXh0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKSBzZXQgdG9vbHRpcExpbmVDbGFtcChsaW5lQ2xhbXA6IG51bWJlcikge1xuICAgIGlmICghbGluZUNsYW1wICYmIGxpbmVDbGFtcCA8PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4jbGluZUNsYW1wID0gbGluZUNsYW1wO1xuXG4gICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpO1xuICAgIHRoaXMuI3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21pbi13aWR0aCcsICcwJyk7XG4gICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndGV4dC1vdmVyZmxvdycsICdlbGxpcHNpcycpO1xuICAgIHRoaXMuI3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnLXdlYmtpdC1ib3gnKTtcbiAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdsaW5lLWNsYW1wJywgdGhpcy4jbGluZUNsYW1wKTtcbiAgICB0aGlzLiNyZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICctd2Via2l0LWxpbmUtY2xhbXAnLCB0aGlzLiNsaW5lQ2xhbXApO1xuICAgIHRoaXMuI3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJy13ZWJraXQtYm94LW9yaWVudCcsICd2ZXJ0aWNhbCcpO1xuICAgIHRoaXMuI3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21heC1oZWlnaHQnLCBgY2FsYygke3RoaXMuI2xpbmVDbGFtcH0gKiAke2NvbXB1dGVkU3R5bGUubGluZUhlaWdodH0pYCk7XG4gIH1cblxuICBASW5wdXQoJ2JpenlUb29sdGlwJykgc2V0IHRvb2x0aXBUZXh0KHRvb2x0aXBUZXh0OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRvb2x0aXBUZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4jdGV4dCA9IHRvb2x0aXBUZXh0O1xuICB9XG5cbiAgLy8gRGVwcmVjYXRlZFxuICBASW5wdXQoKSBzZXQgcGxhY2VtZW50KHBsYWNlbWVudDogJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCcpIHtcbiAgICBpZiAoIXBsYWNlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudG9vbHRpcFBsYWNlbWVudCA9IHBsYWNlbWVudDtcbiAgfVxuXG4gIC8vIERlcHJlY2F0ZWRcbiAgQElucHV0KCkgc2V0IGRlbGF5KGRlbGF5OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIGRlbGF5ID09PSAndW5kZWZpbmVkJyB8fCBkZWxheSA9PT0gbnVsbCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRvb2x0aXBEZWxheSA9IGRlbGF5O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpIG9uTW91c2VFbnRlcigpIHtcbiAgICBpZiAoIXRoaXMuI3Rvb2x0aXApIHtcbiAgICAgIFxuICAgICAgaWYgKCF0aGlzLiN0ZXh0KSB7XG4gICAgICAgIHRoaXMuI3RleHQgPSB0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy4jdGV4dCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuI2hpZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIG9uTW91c2VMZWF2ZSgpIHtcbiAgICBpZiAodGhpcy4jbG9uZ1ByZXNzVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuI2xvbmdQcmVzc1RpbWVvdXQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiN0b29sdGlwICYmICF0aGlzLiNoaWRpbmcpIHtcbiAgICAgIGlmICghdGhpcy4jdGV4dCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuI2hpZGluZyA9IHRydWU7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBGaXggZml4ZWQgdG9vbHRpcHNcbiAgICB0aGlzLiNkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYml6eS10b29sdGlwLWlkZW50aWZ5JykuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHRoaXMuI3JlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuI2RvY3VtZW50LmJvZHksIGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2V1cCcpIG9uTW91c2VVcCgpIHtcbiAgICBpZiAodGhpcy4jbG9uZ1ByZXNzVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuI2xvbmdQcmVzc1RpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcbiAgICBpZiAodGhpcy4jdG9vbHRpcCAmJiAhdGhpcy4jaGlkaW5nKSB7XG4gICAgICB0aGlzLiNoaWRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICBpZiAoIXRoaXMuI3RleHQpIHtcbiAgICAgIHRoaXMuI3RleHQgPSB0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLiN0b29sdGlwICYmIHRoaXMuI3RleHQpIHtcbiAgICAgIHRoaXMuI2xvbmdQcmVzc1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy4jaGlkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfSwgdGhpcy50b29sdGlwTG9uZ1ByZXNzRHVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuI2xpbmVDbGFtcCA+IDAgJiYgIXRoaXMuI2lzVGV4dFRydW5jYXRlZCh0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jcmVhdGUoKTtcbiAgICB0aGlzLnNldFBvc2l0aW9uKCk7XG4gICAgdGhpcy4jcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy4jdG9vbHRpcCwgJ2JpenktdG9vbHRpcC1pZGVudGlmeScpO1xuICAgIHRoaXMuI3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuI3Rvb2x0aXAsICdiaXp5LXRvb2x0aXAtLXNob3cnKTtcbiAgICBpZiAodGhpcy50b29sdGlwQ3VzdG9tQ2xhc3MpIHtcbiAgICAgIHRoaXMuI3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuI3Rvb2x0aXAsIHRoaXMudG9vbHRpcEN1c3RvbUNsYXNzKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuI3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuI3Rvb2x0aXAsICdiaXp5LXRvb2x0aXAtLXNob3cnKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLiNyZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLiNkb2N1bWVudC5ib2R5LCB0aGlzLiN0b29sdGlwKTtcbiAgICAgIHRoaXMuI3Rvb2x0aXAgPSBudWxsO1xuICAgIH0sIHRoaXMudG9vbHRpcERlbGF5KTtcbiAgfVxuXG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLiN0b29sdGlwID0gdGhpcy4jcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgY29uc3Qgc2VudGVuY2VzID0gU3RyaW5nKHRoaXMuI3RleHQpLnNwbGl0KCc8L2JyPicpO1xuICAgIHNlbnRlbmNlcy5mb3JFYWNoKF9zZW50ZW5jZSA9PiB7XG4gICAgICB0aGlzLiNyZW5kZXJlci5hcHBlbmRDaGlsZChcbiAgICAgICAgdGhpcy4jdG9vbHRpcCxcbiAgICAgICAgdGhpcy4jcmVuZGVyZXIuY3JlYXRlVGV4dChfc2VudGVuY2UpXG4gICAgICApO1xuICAgICAgdGhpcy4jcmVuZGVyZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIHRoaXMuI3Rvb2x0aXAsXG4gICAgICAgIHRoaXMuI3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2JyJylcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNyZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLiNkb2N1bWVudC5ib2R5LCB0aGlzLiN0b29sdGlwKTtcblxuICAgIHRoaXMuI3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuI3Rvb2x0aXAsICdiaXp5LXRvb2x0aXAnKTtcbiAgICB0aGlzLiNyZW5kZXJlci5hZGRDbGFzcyh0aGlzLiN0b29sdGlwLCAnYml6eS10b29sdGlwLScgKyB0aGlzLnRvb2x0aXBQbGFjZW1lbnQpO1xuXG4gICAgaWYgKHRoaXMudG9vbHRpcERlbGF5ID4gMCkge1xuICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jdG9vbHRpcCwgJy13ZWJraXQtdHJhbnNpdGlvbicsICdvcGFjaXR5ICcgKyB0aGlzLnRvb2x0aXBEZWxheSArICdtcycpO1xuICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jdG9vbHRpcCwgJy1tb3otdHJhbnNpdGlvbicsICdvcGFjaXR5ICcgKyB0aGlzLnRvb2x0aXBEZWxheSArICdtcycpO1xuICAgICAgdGhpcy4jcmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jdG9vbHRpcCwgJy1vLXRyYW5zaXRpb24nLCAnb3BhY2l0eSAnICsgdGhpcy50b29sdGlwRGVsYXkgKyAnbXMnKTtcbiAgICAgIHRoaXMuI3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuI3Rvb2x0aXAsICd0cmFuc2l0aW9uJywgJ29wYWNpdHkgJyArIHRoaXMudG9vbHRpcERlbGF5ICsgJ21zJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0UG9zaXRpb24oKSB7XG4gICAgY29uc3QgZWxSZWZQb3NpdGlvbiA9IHRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNvbnN0IHRvb2x0aXBQb3MgPSB0aGlzLiN0b29sdGlwPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNvbnN0IHNjcm9sbFBvcyA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB0aGlzLiNkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IHRoaXMuI2RvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDA7XG5cbiAgICBsZXQgdG9wO1xuICAgIGxldCBsZWZ0O1xuXG4gICAgaWYgKHRoaXMudG9vbHRpcFBsYWNlbWVudCA9PT0gJ3RvcCcpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRvcCA9IGVsUmVmUG9zaXRpb24udG9wIC0gdG9vbHRpcFBvcy5oZWlnaHQgLSAxMDtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGxlZnQgPSBlbFJlZlBvc2l0aW9uLmxlZnQgKyAoKGVsUmVmUG9zaXRpb24ud2lkdGggLSB0b29sdGlwUG9zLndpZHRoKSAvIDIpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b29sdGlwUGxhY2VtZW50ID09PSAncmlnaHQnKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0b3AgPSBlbFJlZlBvc2l0aW9uLnRvcCArICgoZWxSZWZQb3NpdGlvbi5oZWlnaHQgLSB0b29sdGlwUG9zLmhlaWdodCkgLyAyKTtcbiAgICAgIGxlZnQgPSBlbFJlZlBvc2l0aW9uLnJpZ2h0ICsgMTA7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRvb2x0aXBQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgICB0b3AgPSBlbFJlZlBvc2l0aW9uLmJvdHRvbSArIDEwO1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgbGVmdCA9IGVsUmVmUG9zaXRpb24ubGVmdCArICgoZWxSZWZQb3NpdGlvbi53aWR0aCAtIHRvb2x0aXBQb3Mud2lkdGgpIC8gMik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRvb2x0aXBQbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdG9wID0gZWxSZWZQb3NpdGlvbi50b3AgKyAoKGVsUmVmUG9zaXRpb24uaGVpZ2h0IC0gdG9vbHRpcFBvcy5oZWlnaHQpIC8gMik7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBsZWZ0ID0gZWxSZWZQb3NpdGlvbi5sZWZ0IC0gdG9vbHRpcFBvcy53aWR0aCAtIDEwO1xuICAgIH1cblxuICAgIHRoaXMuI3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuI3Rvb2x0aXAsICd0b3AnLCAodG9wICsgc2Nyb2xsUG9zKSArICdweCcpO1xuICAgIHRoaXMuI3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuI3Rvb2x0aXAsICdsZWZ0JywgbGVmdCArICdweCcpO1xuICB9XG5cbiAgI2lzVGV4dFRydW5jYXRlZCA9IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IHsgc2Nyb2xsSGVpZ2h0LCBjbGllbnRIZWlnaHQgfSA9IGVsZW1lbnQ7XG4gICAgcmV0dXJuIHNjcm9sbEhlaWdodCA+IGNsaWVudEhlaWdodDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaXp5LXRvb2x0aXAtaWRlbnRpZnknKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgdGhpcy4jcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy4jZG9jdW1lbnQuYm9keSwgZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==