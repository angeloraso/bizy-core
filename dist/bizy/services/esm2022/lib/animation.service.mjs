import { Inject, Injectable, RendererFactory2 } from '@angular/core';
import * as i0 from "@angular/core";
export var BIZY_ANIMATION;
(function (BIZY_ANIMATION) {
    BIZY_ANIMATION["FADE_IN"] = "fade-in";
    BIZY_ANIMATION["FADE_OUT"] = "fade-out";
    BIZY_ANIMATION["FADE_IN_UP"] = "fade-in-up";
    BIZY_ANIMATION["FADE_IN_RIGHT"] = "fade-in-right";
    BIZY_ANIMATION["FADE_IN_DOWN"] = "fade-in-down";
    BIZY_ANIMATION["FADE_IN_LEFT"] = "fade-in-left";
    BIZY_ANIMATION["SLIDE_IN_UP"] = "slide-in-up";
    BIZY_ANIMATION["SLIDE_IN_RIGHT"] = "slide-in-right";
    BIZY_ANIMATION["SLIDE_IN_DOWN"] = "slide-in-down";
    BIZY_ANIMATION["SLIDE_IN_LEFT"] = "slide-in-left";
    BIZY_ANIMATION["SLIDE_OUT_RIGHT"] = "slide-out-right";
    BIZY_ANIMATION["SLIDE_OUT_LEFT"] = "slide-out-left";
})(BIZY_ANIMATION || (BIZY_ANIMATION = {}));
export class BizyAnimationService {
    rendererFactory;
    #renderer;
    constructor(rendererFactory) {
        this.rendererFactory = rendererFactory;
        this.#renderer = this.rendererFactory.createRenderer(null, null);
    }
    setAnimation(element, animation) {
        return new Promise(resolve => {
            if (!element || !animation || !this.#renderer) {
                return;
            }
            const root = this.#renderer.selectRootElement(':root', true);
            const animationTimeout = getComputedStyle(root).getPropertyValue('--bizy-animation-timeout').trim();
            this.#renderer.addClass(element, 'animated');
            this.#renderer.addClass(element, animation);
            setTimeout(() => {
                this.#renderer.removeClass(element, 'animated');
                this.#renderer.removeClass(element, animation);
                resolve();
            }, Number(animationTimeout.match(/\d/g).join('')));
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAnimationService, deps: [{ token: RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAnimationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAnimationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.RendererFactory2, decorators: [{
                    type: Inject,
                    args: [RendererFactory2]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL2FuaW1hdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUVoRixNQUFNLENBQU4sSUFBWSxjQWFYO0FBYkQsV0FBWSxjQUFjO0lBQ3hCLHFDQUFtQixDQUFBO0lBQ25CLHVDQUFxQixDQUFBO0lBQ3JCLDJDQUF5QixDQUFBO0lBQ3pCLGlEQUErQixDQUFBO0lBQy9CLCtDQUE2QixDQUFBO0lBQzdCLCtDQUE2QixDQUFBO0lBQzdCLDZDQUEyQixDQUFBO0lBQzNCLG1EQUFpQyxDQUFBO0lBQ2pDLGlEQUErQixDQUFBO0lBQy9CLGlEQUErQixDQUFBO0lBQy9CLHFEQUFtQyxDQUFBO0lBQ25DLG1EQUFpQyxDQUFBO0FBQ25DLENBQUMsRUFiVyxjQUFjLEtBQWQsY0FBYyxRQWF6QjtBQUtELE1BQU0sT0FBTyxvQkFBb0I7SUFHZTtJQUY5QyxTQUFTLENBQVk7SUFFckIsWUFBOEMsZUFBaUM7UUFBakMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQzdFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBb0IsRUFBRSxTQUF5QjtRQUMxRCxPQUFPLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUM3QyxPQUFPO2FBQ1I7WUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3RCxNQUFNLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFcEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM1QyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDcEQsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO3dHQXhCVSxvQkFBb0Isa0JBR1gsZ0JBQWdCOzRHQUh6QixvQkFBb0IsY0FGbkIsTUFBTTs7NEZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBSWMsTUFBTTsyQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZW51bSBCSVpZX0FOSU1BVElPTiB7XG4gIEZBREVfSU4gPSAnZmFkZS1pbicsXG4gIEZBREVfT1VUID0gJ2ZhZGUtb3V0JyxcbiAgRkFERV9JTl9VUCA9ICdmYWRlLWluLXVwJyxcbiAgRkFERV9JTl9SSUdIVCA9ICdmYWRlLWluLXJpZ2h0JyxcbiAgRkFERV9JTl9ET1dOID0gJ2ZhZGUtaW4tZG93bicsXG4gIEZBREVfSU5fTEVGVCA9ICdmYWRlLWluLWxlZnQnLFxuICBTTElERV9JTl9VUCA9ICdzbGlkZS1pbi11cCcsXG4gIFNMSURFX0lOX1JJR0hUID0gJ3NsaWRlLWluLXJpZ2h0JyxcbiAgU0xJREVfSU5fRE9XTiA9ICdzbGlkZS1pbi1kb3duJyxcbiAgU0xJREVfSU5fTEVGVCA9ICdzbGlkZS1pbi1sZWZ0JyxcbiAgU0xJREVfT1VUX1JJR0hUID0gJ3NsaWRlLW91dC1yaWdodCcsXG4gIFNMSURFX09VVF9MRUZUID0gJ3NsaWRlLW91dC1sZWZ0Jyxcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQml6eUFuaW1hdGlvblNlcnZpY2Uge1xuICAjcmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFJlbmRlcmVyRmFjdG9yeTIpIHByaXZhdGUgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyKSB7XG4gICAgdGhpcy4jcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcbiAgfVxuXG4gIHNldEFuaW1hdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCwgYW5pbWF0aW9uOiBCSVpZX0FOSU1BVElPTikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIGlmICghZWxlbWVudCB8fCAhYW5pbWF0aW9uIHx8ICF0aGlzLiNyZW5kZXJlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gIFxuICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuI3JlbmRlcmVyLnNlbGVjdFJvb3RFbGVtZW50KCc6cm9vdCcsIHRydWUpO1xuICAgICAgY29uc3QgYW5pbWF0aW9uVGltZW91dCA9IGdldENvbXB1dGVkU3R5bGUocm9vdCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWFuaW1hdGlvbi10aW1lb3V0JykudHJpbSgpO1xuICBcbiAgICAgIHRoaXMuI3JlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsICdhbmltYXRlZCcpO1xuICAgICAgdGhpcy4jcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgYW5pbWF0aW9uKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLiNyZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtZW50LCAnYW5pbWF0ZWQnKTtcbiAgICAgICAgdGhpcy4jcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbWVudCwgYW5pbWF0aW9uKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSwgTnVtYmVyKGFuaW1hdGlvblRpbWVvdXQubWF0Y2goL1xcZC9nKS5qb2luKCcnKSkpXG4gICAgfSlcbiAgfVxufSJdfQ==