import { takeUntil } from 'rxjs/operators';
import { Directive, ElementRef, Inject, Renderer2 } from '@angular/core';
import { interval, Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class BizyVirtualScrollGridDirective {
    elRef;
    renderer;
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
        this.renderer.setStyle(this.elRef.nativeElement, 'gap', '1em');
        this.renderer.setStyle(this.elRef.nativeElement, 'marginBottom', '1em');
        const notifier = new Subject();
        const check = interval(100);
        check.pipe(takeUntil(notifier)).subscribe(() => {
            if (this.elRef.nativeElement.offsetParent) {
                notifier.next();
                notifier.complete();
                const bizyVirtualScrollComponent = this.elRef.nativeElement.offsetParent.offsetParent.parentElement.parentElement;
                let itemMinHeight = bizyVirtualScrollComponent.getAttribute('itemminheight');
                if (!itemMinHeight.includes('em') && !itemMinHeight.includes('rem') && !itemMinHeight.includes('px')) {
                    itemMinHeight = `${itemMinHeight}px`;
                }
                let itemMinWidth = bizyVirtualScrollComponent.getAttribute('itemminwidth');
                if (!itemMinWidth.includes('em') && !itemMinWidth.includes('rem') && !itemMinWidth.includes('px')) {
                    itemMinWidth = `${itemMinWidth}px`;
                }
                if (itemMinWidth.includes('rem')) {
                    const fontSize = window.getComputedStyle(this.elRef.nativeElement, null).getPropertyValue('font-size');
                    if (fontSize) {
                        itemMinWidth = `${Number(itemMinWidth.split('rem')[0])}em`;
                    }
                }
                this.renderer.setStyle(this.elRef.nativeElement, 'gridTemplateColumns', `repeat(auto-fill, minmax(${itemMinWidth}, 1fr))`);
                this.renderer.setStyle(this.elRef.nativeElement, 'gridTemplateRows', itemMinHeight);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollGridDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyVirtualScrollGridDirective, selector: "[virtualScrollGrid]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualScrollGrid]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtZ3JpZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwtZ3JpZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBaUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUt6QyxNQUFNLE9BQU8sOEJBQThCO0lBRVg7SUFDRDtJQUY3QixZQUM4QixLQUFpQixFQUNsQixRQUFtQjtRQURsQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVc7SUFDN0MsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4RSxNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ3JDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDN0MsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3pDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNwQixNQUFNLDBCQUEwQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztnQkFDbEgsSUFBSSxhQUFhLEdBQVcsMEJBQTBCLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNyRixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNwRyxhQUFhLEdBQUcsR0FBRyxhQUFhLElBQUksQ0FBQztpQkFDdEM7Z0JBRUQsSUFBSSxZQUFZLEdBQVcsMEJBQTBCLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNuRixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNqRyxZQUFZLEdBQUcsR0FBRyxZQUFZLElBQUksQ0FBQztpQkFDcEM7Z0JBRUQsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNoQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3ZHLElBQUksUUFBUSxFQUFFO3dCQUNaLFlBQVksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztxQkFDNUQ7aUJBQ0Y7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUUsNEJBQTRCLFlBQVksU0FBUyxDQUFDLENBQUM7Z0JBQzNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3JGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3dHQXZDVSw4QkFBOEIsa0JBRS9CLFVBQVUsYUFDVixTQUFTOzRGQUhSLDhCQUE4Qjs7NEZBQTlCLDhCQUE4QjtrQkFIMUMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO2lCQUNoQzs7MEJBR0ksTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIEFmdGVyVmlld0luaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3ZpcnR1YWxTY3JvbGxHcmlkXSdcbn0pXG5leHBvcnQgY2xhc3MgQml6eVZpcnR1YWxTY3JvbGxHcmlkRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2dyaWQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2dhcCcsICcxZW0nKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ21hcmdpbkJvdHRvbScsICcxZW0nKTtcblxuICAgIGNvbnN0IG5vdGlmaWVyID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBjb25zdCBjaGVjayA9IGludGVydmFsKDEwMCk7XG4gICAgY2hlY2sucGlwZSh0YWtlVW50aWwobm90aWZpZXIpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgbm90aWZpZXIubmV4dCgpO1xuICAgICAgICBub3RpZmllci5jb21wbGV0ZSgpO1xuICAgICAgICBjb25zdCBiaXp5VmlydHVhbFNjcm9sbENvbXBvbmVudCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgbGV0IGl0ZW1NaW5IZWlnaHQ6IHN0cmluZyA9IGJpenlWaXJ0dWFsU2Nyb2xsQ29tcG9uZW50LmdldEF0dHJpYnV0ZSgnaXRlbW1pbmhlaWdodCcpO1xuICAgICAgICBpZiAoIWl0ZW1NaW5IZWlnaHQuaW5jbHVkZXMoJ2VtJykgJiYgIWl0ZW1NaW5IZWlnaHQuaW5jbHVkZXMoJ3JlbScpICYmICFpdGVtTWluSGVpZ2h0LmluY2x1ZGVzKCdweCcpKSB7XG4gICAgICAgICAgaXRlbU1pbkhlaWdodCA9IGAke2l0ZW1NaW5IZWlnaHR9cHhgO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGl0ZW1NaW5XaWR0aDogc3RyaW5nID0gYml6eVZpcnR1YWxTY3JvbGxDb21wb25lbnQuZ2V0QXR0cmlidXRlKCdpdGVtbWlud2lkdGgnKTtcbiAgICAgICAgaWYgKCFpdGVtTWluV2lkdGguaW5jbHVkZXMoJ2VtJykgJiYgIWl0ZW1NaW5XaWR0aC5pbmNsdWRlcygncmVtJykgJiYgIWl0ZW1NaW5XaWR0aC5pbmNsdWRlcygncHgnKSkge1xuICAgICAgICAgIGl0ZW1NaW5XaWR0aCA9IGAke2l0ZW1NaW5XaWR0aH1weGA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbU1pbldpZHRoLmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgICAgIGNvbnN0IGZvbnRTaXplID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKTtcbiAgICAgICAgICBpZiAoZm9udFNpemUpIHtcbiAgICAgICAgICAgIGl0ZW1NaW5XaWR0aCA9IGAke051bWJlcihpdGVtTWluV2lkdGguc3BsaXQoJ3JlbScpWzBdKX1lbWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdncmlkVGVtcGxhdGVDb2x1bW5zJywgYHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgke2l0ZW1NaW5XaWR0aH0sIDFmcikpYCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZ3JpZFRlbXBsYXRlUm93cycsIGl0ZW1NaW5IZWlnaHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=