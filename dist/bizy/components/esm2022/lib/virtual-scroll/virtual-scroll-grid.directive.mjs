import { takeUntil } from 'rxjs/operators';
import { Directive, ElementRef, Inject, Renderer2 } from '@angular/core';
import { interval, Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class VirtualScrollGridDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollGridDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.9", type: VirtualScrollGridDirective, selector: "[virtualScrollGrid]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: VirtualScrollGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualScrollGrid]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtZ3JpZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwtZ3JpZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBaUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUt6QyxNQUFNLE9BQU8sMEJBQTBCO0lBRVA7SUFDRDtJQUY3QixZQUM4QixLQUFpQixFQUNsQixRQUFtQjtRQURsQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVc7SUFDN0MsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4RSxNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ3JDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDN0MsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3pDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNwQixNQUFNLDBCQUEwQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztnQkFDbEgsSUFBSSxhQUFhLEdBQVcsMEJBQTBCLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNyRixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNwRyxhQUFhLEdBQUcsR0FBRyxhQUFhLElBQUksQ0FBQztpQkFDdEM7Z0JBRUQsSUFBSSxZQUFZLEdBQVcsMEJBQTBCLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNuRixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNqRyxZQUFZLEdBQUcsR0FBRyxZQUFZLElBQUksQ0FBQztpQkFDcEM7Z0JBRUQsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNoQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3ZHLElBQUksUUFBUSxFQUFFO3dCQUNaLFlBQVksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztxQkFDNUQ7aUJBQ0Y7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUUsNEJBQTRCLFlBQVksU0FBUyxDQUFDLENBQUM7Z0JBQzNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3JGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3VHQXZDVSwwQkFBMEIsa0JBRTNCLFVBQVUsYUFDVixTQUFTOzJGQUhSLDBCQUEwQjs7MkZBQTFCLDBCQUEwQjtrQkFIdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO2lCQUNoQzs7MEJBR0ksTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIEFmdGVyVmlld0luaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3ZpcnR1YWxTY3JvbGxHcmlkXSdcbn0pXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbEdyaWREaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnZ3JpZCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZ2FwJywgJzFlbScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbWFyZ2luQm90dG9tJywgJzFlbScpO1xuXG4gICAgY29uc3Qgbm90aWZpZXIgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIGNvbnN0IGNoZWNrID0gaW50ZXJ2YWwoMTAwKTtcbiAgICBjaGVjay5waXBlKHRha2VVbnRpbChub3RpZmllcikpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudCkge1xuICAgICAgICBub3RpZmllci5uZXh0KCk7XG4gICAgICAgIG5vdGlmaWVyLmNvbXBsZXRlKCk7XG4gICAgICAgIGNvbnN0IGJpenlWaXJ0dWFsU2Nyb2xsQ29tcG9uZW50ID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBsZXQgaXRlbU1pbkhlaWdodDogc3RyaW5nID0gYml6eVZpcnR1YWxTY3JvbGxDb21wb25lbnQuZ2V0QXR0cmlidXRlKCdpdGVtbWluaGVpZ2h0Jyk7XG4gICAgICAgIGlmICghaXRlbU1pbkhlaWdodC5pbmNsdWRlcygnZW0nKSAmJiAhaXRlbU1pbkhlaWdodC5pbmNsdWRlcygncmVtJykgJiYgIWl0ZW1NaW5IZWlnaHQuaW5jbHVkZXMoJ3B4JykpIHtcbiAgICAgICAgICBpdGVtTWluSGVpZ2h0ID0gYCR7aXRlbU1pbkhlaWdodH1weGA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXRlbU1pbldpZHRoOiBzdHJpbmcgPSBiaXp5VmlydHVhbFNjcm9sbENvbXBvbmVudC5nZXRBdHRyaWJ1dGUoJ2l0ZW1taW53aWR0aCcpO1xuICAgICAgICBpZiAoIWl0ZW1NaW5XaWR0aC5pbmNsdWRlcygnZW0nKSAmJiAhaXRlbU1pbldpZHRoLmluY2x1ZGVzKCdyZW0nKSAmJiAhaXRlbU1pbldpZHRoLmluY2x1ZGVzKCdweCcpKSB7XG4gICAgICAgICAgaXRlbU1pbldpZHRoID0gYCR7aXRlbU1pbldpZHRofXB4YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtTWluV2lkdGguaW5jbHVkZXMoJ3JlbScpKSB7XG4gICAgICAgICAgY29uc3QgZm9udFNpemUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ2ZvbnQtc2l6ZScpO1xuICAgICAgICAgIGlmIChmb250U2l6ZSkge1xuICAgICAgICAgICAgaXRlbU1pbldpZHRoID0gYCR7TnVtYmVyKGl0ZW1NaW5XaWR0aC5zcGxpdCgncmVtJylbMF0pfWVtYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2dyaWRUZW1wbGF0ZUNvbHVtbnMnLCBgcmVwZWF0KGF1dG8tZmlsbCwgbWlubWF4KCR7aXRlbU1pbldpZHRofSwgMWZyKSlgKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdncmlkVGVtcGxhdGVSb3dzJywgaXRlbU1pbkhlaWdodCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==