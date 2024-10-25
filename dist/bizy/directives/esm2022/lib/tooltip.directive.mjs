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
    ngOnDestroy() {
        this.document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
            this.renderer.removeChild(this.document.body, element);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kaXJlY3RpdmVzL3NyYy9saWIvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQzs7QUFLekcsTUFBTSxPQUFPLG9CQUFvQjtJQVVEO0lBQ0Q7SUFDRDtJQVhOLFlBQVksR0FBVyxFQUFFLENBQUM7SUFDdkMsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixVQUFVLEdBQVksS0FBSyxDQUFDO0lBQzVCLFNBQVMsR0FBd0MsS0FBSyxDQUFDO0lBQ3ZELEtBQUssQ0FBUyxDQUFDLG1DQUFtQztJQUMzRCxPQUFPLENBQXFCO0lBQzVCLE1BQU0sQ0FBVTtJQUVoQixZQUM4QixLQUFpQixFQUNsQixRQUFtQixFQUNwQixRQUFrQjtRQUZoQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFJLENBQUM7SUFFdkIsWUFBWTtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRTJCLFlBQVk7UUFDdEMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFD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aW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlcjIsIEluamVjdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tiaXp5VG9vbHRpcF0nXG59KVxuZXhwb3J0IGNsYXNzIEJpenlUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCdiaXp5VG9vbHRpcCcpIHRvb2x0aXBUaXRsZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgY2xpY2tlYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnID0gJ3RvcCc7XG4gIEBJbnB1dCgpIGRlbGF5OiBzdHJpbmc7IC8vIE1pbGxpc2Vjb25kcywgRWo7IDUwMCwgMTAwMCwgZXRjXG4gIHRvb2x0aXA6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgaGlkaW5nOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50KSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJykgb25Nb3VzZUVudGVyKCkge1xuICAgIGlmICghdGhpcy50b29sdGlwKSB7XG4gICAgICBpZiAoIXRoaXMudG9vbHRpcFRpdGxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5oaWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKSBvbk1vdXNlTGVhdmUoKSB7XG4gICAgaWYgKHRoaXMudG9vbHRpcCAmJiAhdGhpcy5oaWRpbmcpIHtcbiAgICAgIGlmICghdGhpcy50b29sdGlwVGl0bGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGluZyA9IHRydWU7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBGaXggZml4ZWQgdG9vbHRpcHNcbiAgICB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaXp5LXRvb2x0aXAtaWRlbnRpZnknKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBvbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLnRvb2x0aXAgJiYgIXRoaXMuaGlkaW5nKSB7XG4gICAgICB0aGlzLmhpZGluZyA9IHRydWU7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudG9vbHRpcCAmJiB0aGlzLnRvb2x0aXBUaXRsZSAmJiB0aGlzLmNsaWNrZWFibGUpIHtcbiAgICAgIHRoaXMuaGlkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgdGhpcy5zZXRQb3NpdGlvbigpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b29sdGlwLCAnYml6eS10b29sdGlwLWlkZW50aWZ5Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXAsICdiaXp5LXRvb2x0aXAtLXNob3cnKTtcbiAgICBpZiAodGhpcy5jdXN0b21DbGFzcykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXAsIHRoaXMuY3VzdG9tQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLnRvb2x0aXAsICdiaXp5LXRvb2x0aXAtLXNob3cnKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy50b29sdGlwKTtcbiAgICAgIHRoaXMudG9vbHRpcCA9IG51bGw7XG4gICAgfSwgTnVtYmVyKHRoaXMuZGVsYXkpKTtcbiAgfVxuXG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLnRvb2x0aXAgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgIGNvbnN0IHNlbnRlbmNlcyA9IFN0cmluZyh0aGlzLnRvb2x0aXBUaXRsZSkuc3BsaXQoJzwvYnI+Jyk7XG4gICAgc2VudGVuY2VzLmZvckVhY2goX3NlbnRlbmNlID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIHRoaXMudG9vbHRpcCxcbiAgICAgICAgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KF9zZW50ZW5jZSlcbiAgICAgICk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKFxuICAgICAgICB0aGlzLnRvb2x0aXAsXG4gICAgICAgIHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnYnInKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLnRvb2x0aXApO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXAsICdiaXp5LXRvb2x0aXAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudG9vbHRpcCwgJ2JpenktdG9vbHRpcC0nICsgdGhpcy5wbGFjZW1lbnQpO1xuXG4gICAgaWYgKHRoaXMuZGVsYXkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAnLXdlYmtpdC10cmFuc2l0aW9uJywgJ29wYWNpdHkgJyArIHRoaXMuZGVsYXkgKyAnbXMnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAnLW1vei10cmFuc2l0aW9uJywgJ29wYWNpdHkgJyArIHRoaXMuZGVsYXkgKyAnbXMnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAnLW8tdHJhbnNpdGlvbicsICdvcGFjaXR5ICcgKyB0aGlzLmRlbGF5ICsgJ21zJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJ3RyYW5zaXRpb24nLCAnb3BhY2l0eSAnICsgdGhpcy5kZWxheSArICdtcycpO1xuICAgIH1cbiAgfVxuXG4gIHNldFBvc2l0aW9uKCkge1xuICAgIGNvbnN0IGVsUmVmUG9zaXRpb24gPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCB0b29sdGlwUG9zID0gdGhpcy50b29sdGlwPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNvbnN0IHNjcm9sbFBvcyA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgdGhpcy5kb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwO1xuXG4gICAgbGV0IHRvcDtcbiAgICBsZXQgbGVmdDtcblxuICAgIGlmICh0aGlzLnBsYWNlbWVudCA9PT0gJ3RvcCcpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRvcCA9IGVsUmVmUG9zaXRpb24udG9wIC0gdG9vbHRpcFBvcy5oZWlnaHQgLSAxMDtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGxlZnQgPSBlbFJlZlBvc2l0aW9uLmxlZnQgKyAoKGVsUmVmUG9zaXRpb24ud2lkdGggLSB0b29sdGlwUG9zLndpZHRoKSAvIDIpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wbGFjZW1lbnQgPT09ICdyaWdodCcpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRvcCA9IGVsUmVmUG9zaXRpb24udG9wICsgKChlbFJlZlBvc2l0aW9uLmhlaWdodCAtIHRvb2x0aXBQb3MuaGVpZ2h0KSAvIDIpO1xuICAgICAgbGVmdCA9IGVsUmVmUG9zaXRpb24ucmlnaHQgKyAxMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGxhY2VtZW50ID09PSAnYm90dG9tJykge1xuICAgICAgdG9wID0gZWxSZWZQb3NpdGlvbi5ib3R0b20gKyAxMDtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGxlZnQgPSBlbFJlZlBvc2l0aW9uLmxlZnQgKyAoKGVsUmVmUG9zaXRpb24ud2lkdGggLSB0b29sdGlwUG9zLndpZHRoKSAvIDIpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdG9wID0gZWxSZWZQb3NpdGlvbi50b3AgKyAoKGVsUmVmUG9zaXRpb24uaGVpZ2h0IC0gdG9vbHRpcFBvcy5oZWlnaHQpIC8gMik7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBsZWZ0ID0gZWxSZWZQb3NpdGlvbi5sZWZ0IC0gdG9vbHRpcFBvcy53aWR0aCAtIDEwO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAndG9wJywgKHRvcCArIHNjcm9sbFBvcykgKyAncHgnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJ2xlZnQnLCBsZWZ0ICsgJ3B4Jyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaXp5LXRvb2x0aXAtaWRlbnRpZnknKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=