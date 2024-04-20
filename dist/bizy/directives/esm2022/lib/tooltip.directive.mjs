import { DOCUMENT } from '@angular/common';
import { Directive, Input, ElementRef, HostListener, Renderer2, Inject } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyTooltipDirective {
    elRef;
    renderer;
    document;
    tooltipTitle = '';
    customClass = '';
    clickeable = false;
    placement = 'top';
    delay; // Milliseconds, Ej; 500, 1000, etc
    tooltip;
    hiding;
    constructor(elRef, renderer, document) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.document = document;
    }
    onMouseEnter() {
        if (!this.tooltip) {
            if (!this.tooltipTitle) {
                return;
            }
            this.hiding = false;
            this.show();
        }
    }
    onMouseLeave() {
        if (this.tooltip && !this.hiding) {
            if (!this.tooltipTitle) {
                return;
            }
            this.hiding = true;
            this.hide();
        }
        // Fix fixed tooltips
        this.document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
            this.renderer.removeChild(this.document.body, element);
        });
    }
    onClick() {
        if (this.tooltip && !this.hiding) {
            this.hiding = true;
            this.hide();
            return;
        }
        if (!this.tooltip && this.tooltipTitle && this.clickeable) {
            this.hiding = false;
            this.show();
        }
    }
    show() {
        this.create();
        this.setPosition();
        this.renderer.addClass(this.tooltip, 'bizy-tooltip-identify');
        this.renderer.addClass(this.tooltip, 'bizy-tooltip--show');
        if (this.customClass) {
            this.renderer.addClass(this.tooltip, this.customClass);
        }
    }
    hide() {
        this.renderer.removeClass(this.tooltip, 'bizy-tooltip--show');
        window.setTimeout(() => {
            this.renderer.removeChild(this.document.body, this.tooltip);
            this.tooltip = null;
        }, Number(this.delay));
    }
    create() {
        this.tooltip = this.renderer.createElement('span');
        const sentences = String(this.tooltipTitle).split('</br>');
        sentences.forEach(_sentence => {
            this.renderer.appendChild(this.tooltip, this.renderer.createText(_sentence));
            this.renderer.appendChild(this.tooltip, this.renderer.createElement('br'));
        });
        this.renderer.appendChild(this.document.body, this.tooltip);
        this.renderer.addClass(this.tooltip, 'bizy-tooltip');
        this.renderer.addClass(this.tooltip, 'bizy-tooltip-' + this.placement);
        if (this.delay) {
            this.renderer.setStyle(this.tooltip, '-webkit-transition', 'opacity ' + this.delay + 'ms');
            this.renderer.setStyle(this.tooltip, '-moz-transition', 'opacity ' + this.delay + 'ms');
            this.renderer.setStyle(this.tooltip, '-o-transition', 'opacity ' + this.delay + 'ms');
            this.renderer.setStyle(this.tooltip, 'transition', 'opacity ' + this.delay + 'ms');
        }
    }
    setPosition() {
        const elRefPosition = this.elRef.nativeElement.getBoundingClientRect();
        const tooltipPos = this.tooltip?.getBoundingClientRect();
        const scrollPos = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        let top;
        let left;
        if (this.placement === 'top') {
            // @ts-ignore
            top = elRefPosition.top - tooltipPos.height - 10;
            // @ts-ignore
            left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
        }
        else if (this.placement === 'right') {
            // @ts-ignore
            top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
            left = elRefPosition.right + 10;
        }
        else if (this.placement === 'bottom') {
            top = elRefPosition.bottom + 10;
            // @ts-ignore
            left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
        }
        else if (this.placement === 'left') {
            // @ts-ignore
            top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
            // @ts-ignore
            left = elRefPosition.left - tooltipPos.width - 10;
        }
        this.renderer.setStyle(this.tooltip, 'top', (top + scrollPos) + 'px');
        this.renderer.setStyle(this.tooltip, 'left', left + 'px');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTooltipDirective, deps: [{ token: ElementRef }, { token: Renderer2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyTooltipDirective, selector: "[bizyTooltip]", inputs: { tooltipTitle: ["bizyTooltip", "tooltipTitle"], customClass: "customClass", clickeable: "clickeable", placement: "placement", delay: "delay" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "click": "onClick()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyTooltip]'
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
                }] }]; }, propDecorators: { tooltipTitle: [{
                type: Input,
                args: ['bizyTooltip']
            }], customClass: [{
                type: Input
            }], clickeable: [{
                type: Input
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
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLOUYsTUFBTSxPQUFPLG9CQUFvQjtJQVVEO0lBQ0Q7SUFDRDtJQVhOLFlBQVksR0FBVyxFQUFFLENBQUM7SUFDdkMsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixVQUFVLEdBQVksS0FBSyxDQUFDO0lBQzVCLFNBQVMsR0FBd0MsS0FBSyxDQUFDO0lBQ3ZELEtBQUssQ0FBUyxDQUFDLG1DQUFtQztJQUMzRCxPQUFPLENBQXFCO0lBQzVCLE1BQU0sQ0FBVTtJQUVoQixZQUM4QixLQUFpQixFQUNsQixRQUFtQixFQUNwQixRQUFrQjtRQUZoQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFJLENBQUM7SUFFdkIsWUFBWTtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRTJCLFlBQVk7UUFDdEMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFD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LElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNuRDtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDO3dHQXBJVSxvQkFBb0Isa0JBVXJCLFVBQVUsYUFDVixTQUFTLGFBQ1QsUUFBUTs0RkFaUCxvQkFBb0I7OzRGQUFwQixvQkFBb0I7a0JBSGhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzswQkFXSSxNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLFFBQVE7NENBWEksWUFBWTtzQkFBakMsS0FBSzt1QkFBQyxhQUFhO2dCQUNYLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFTc0IsWUFBWTtzQkFBdkMsWUFBWTt1QkFBQyxZQUFZO2dCQVdFLFlBQVk7c0JBQXZDLFlBQVk7dUJBQUMsWUFBWTtnQkFnQkgsT0FBTztzQkFBN0IsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlcjIsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYml6eVRvb2x0aXBdJ1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5VG9vbHRpcERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgnYml6eVRvb2x0aXAnKSB0b29sdGlwVGl0bGU6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGNsaWNrZWFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcGxhY2VtZW50OiAndG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICdsZWZ0JyA9ICd0b3AnO1xuICBASW5wdXQoKSBkZWxheTogc3RyaW5nOyAvLyBNaWxsaXNlY29uZHMsIEVqOyA1MDAsIDEwMDAsIGV0Y1xuICB0b29sdGlwOiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIGhpZGluZzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpIG9uTW91c2VFbnRlcigpIHtcbiAgICBpZiAoIXRoaXMudG9vbHRpcCkge1xuICAgICAgaWYgKCF0aGlzLnRvb2x0aXBUaXRsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGlkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25Nb3VzZUxlYXZlKCkge1xuICAgIGlmICh0aGlzLnRvb2x0aXAgJiYgIXRoaXMuaGlkaW5nKSB7XG4gICAgICBpZiAoIXRoaXMudG9vbHRpcFRpdGxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5oaWRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgLy8gRml4IGZpeGVkIHRvb2x0aXBzXG4gICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYml6eS10b29sdGlwLWlkZW50aWZ5JykuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCBlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcbiAgICBpZiAodGhpcy50b29sdGlwICYmICF0aGlzLmhpZGluZykge1xuICAgICAgdGhpcy5oaWRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnRvb2x0aXAgJiYgdGhpcy50b29sdGlwVGl0bGUgJiYgdGhpcy5jbGlja2VhYmxlKSB7XG4gICAgICB0aGlzLmhpZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudG9vbHRpcCwgJ2JpenktdG9vbHRpcC1pZGVudGlmeScpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b29sdGlwLCAnYml6eS10b29sdGlwLS1zaG93Jyk7XG4gICAgaWYgKHRoaXMuY3VzdG9tQ2xhc3MpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b29sdGlwLCB0aGlzLmN1c3RvbUNsYXNzKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy50b29sdGlwLCAnYml6eS10b29sdGlwLS1zaG93Jyk7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMudG9vbHRpcCk7XG4gICAgICB0aGlzLnRvb2x0aXAgPSBudWxsO1xuICAgIH0sIE51bWJlcih0aGlzLmRlbGF5KSk7XG4gIH1cblxuICBjcmVhdGUoKSB7XG4gICAgdGhpcy50b29sdGlwID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICBjb25zdCBzZW50ZW5jZXMgPSBTdHJpbmcodGhpcy50b29sdGlwVGl0bGUpLnNwbGl0KCc8L2JyPicpO1xuICAgIHNlbnRlbmNlcy5mb3JFYWNoKF9zZW50ZW5jZSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKFxuICAgICAgICB0aGlzLnRvb2x0aXAsXG4gICAgICAgIHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dChfc2VudGVuY2UpXG4gICAgICApO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChcbiAgICAgICAgdGhpcy50b29sdGlwLFxuICAgICAgICB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2JyJylcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy50b29sdGlwKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b29sdGlwLCAnYml6eS10b29sdGlwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXAsICdiaXp5LXRvb2x0aXAtJyArIHRoaXMucGxhY2VtZW50KTtcblxuICAgIGlmICh0aGlzLmRlbGF5KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJy13ZWJraXQtdHJhbnNpdGlvbicsICdvcGFjaXR5ICcgKyB0aGlzLmRlbGF5ICsgJ21zJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJy1tb3otdHJhbnNpdGlvbicsICdvcGFjaXR5ICcgKyB0aGlzLmRlbGF5ICsgJ21zJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJy1vLXRyYW5zaXRpb24nLCAnb3BhY2l0eSAnICsgdGhpcy5kZWxheSArICdtcycpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICd0cmFuc2l0aW9uJywgJ29wYWNpdHkgJyArIHRoaXMuZGVsYXkgKyAnbXMnKTtcbiAgICB9XG4gIH1cblxuICBzZXRQb3NpdGlvbigpIHtcbiAgICBjb25zdCBlbFJlZlBvc2l0aW9uID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgdG9vbHRpcFBvcyA9IHRoaXMudG9vbHRpcD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBzY3JvbGxQb3MgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IHRoaXMuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMDtcblxuICAgIGxldCB0b3A7XG4gICAgbGV0IGxlZnQ7XG5cbiAgICBpZiAodGhpcy5wbGFjZW1lbnQgPT09ICd0b3AnKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0b3AgPSBlbFJlZlBvc2l0aW9uLnRvcCAtIHRvb2x0aXBQb3MuaGVpZ2h0IC0gMTA7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBsZWZ0ID0gZWxSZWZQb3NpdGlvbi5sZWZ0ICsgKChlbFJlZlBvc2l0aW9uLndpZHRoIC0gdG9vbHRpcFBvcy53aWR0aCkgLyAyKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGxhY2VtZW50ID09PSAncmlnaHQnKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0b3AgPSBlbFJlZlBvc2l0aW9uLnRvcCArICgoZWxSZWZQb3NpdGlvbi5oZWlnaHQgLSB0b29sdGlwUG9zLmhlaWdodCkgLyAyKTtcbiAgICAgIGxlZnQgPSBlbFJlZlBvc2l0aW9uLnJpZ2h0ICsgMTA7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgIHRvcCA9IGVsUmVmUG9zaXRpb24uYm90dG9tICsgMTA7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBsZWZ0ID0gZWxSZWZQb3NpdGlvbi5sZWZ0ICsgKChlbFJlZlBvc2l0aW9uLndpZHRoIC0gdG9vbHRpcFBvcy53aWR0aCkgLyAyKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGxhY2VtZW50ID09PSAnbGVmdCcpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRvcCA9IGVsUmVmUG9zaXRpb24udG9wICsgKChlbFJlZlBvc2l0aW9uLmhlaWdodCAtIHRvb2x0aXBQb3MuaGVpZ2h0KSAvIDIpO1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgbGVmdCA9IGVsUmVmUG9zaXRpb24ubGVmdCAtIHRvb2x0aXBQb3Mud2lkdGggLSAxMDtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJ3RvcCcsICh0b3AgKyBzY3JvbGxQb3MpICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICdsZWZ0JywgbGVmdCArICdweCcpO1xuICB9XG59XG4iXX0=