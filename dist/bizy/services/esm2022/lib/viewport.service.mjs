import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class BizyViewportService {
    window;
    #viewportSizeChanged;
    get sizeChange$() {
        return this.#viewportSizeChanged.asObservable();
    }
    constructor(window) {
        this.window = window;
        this.#viewportSizeChanged = new BehaviorSubject({
            width: this.window.innerWidth,
            height: this.window.innerHeight
        });
        fromEvent(window, 'resize')
            .pipe(debounceTime(200), map((event) => ({
            width: event.currentTarget.innerWidth,
            height: event.currentTarget.innerHeight
        })))
            .subscribe(windowSize => {
            this.#viewportSizeChanged.next(windowSize);
        });
    }
    width() {
        return this.window.screen.availWidth;
    }
    height() {
        return this.window.screen.availHeight;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyViewportService, deps: [{ token: Window }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyViewportService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyViewportService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: Window, decorators: [{
                    type: Inject,
                    args: [Window]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3BvcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvdmlld3BvcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFjLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQVFuRCxNQUFNLE9BQU8sbUJBQW1CO0lBT007SUFOcEMsb0JBQW9CLENBQWlDO0lBRXJELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRCxZQUFvQyxNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNoRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQStCO1lBQzVFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVU7WUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVztTQUNoQyxDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQzthQUN4QixJQUFJLENBQ0gsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixHQUFHLENBQ0QsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUNiLENBQWU7WUFDYixLQUFLLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFVO1lBQ3JDLE1BQU0sRUFBRSxLQUFLLENBQUMsYUFBYSxDQUFDLFdBQVc7U0FDeEMsQ0FBQSxDQUNKLENBQ0Y7YUFDQSxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdkMsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN4QyxDQUFDO3dHQW5DVSxtQkFBbUIsa0JBT1YsTUFBTTs0R0FQZixtQkFBbUIsY0FGbEIsTUFBTTs7NEZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBUWMsTUFBTTsyQkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbnRlcmZhY2UgSVZpZXdwb3J0U2l6ZSB7XG4gIGhlaWdodDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xufVxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQml6eVZpZXdwb3J0U2VydmljZSB7XG4gICN2aWV3cG9ydFNpemVDaGFuZ2VkOiBCZWhhdmlvclN1YmplY3Q8SVZpZXdwb3J0U2l6ZT47XG5cbiAgZ2V0IHNpemVDaGFuZ2UkKCk6IE9ic2VydmFibGU8SVZpZXdwb3J0U2l6ZT4ge1xuICAgIHJldHVybiB0aGlzLiN2aWV3cG9ydFNpemVDaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChXaW5kb3cpIHByaXZhdGUgd2luZG93OiBXaW5kb3cpIHtcbiAgICB0aGlzLiN2aWV3cG9ydFNpemVDaGFuZ2VkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxJVmlld3BvcnRTaXplPig8SVZpZXdwb3J0U2l6ZT57XG4gICAgICB3aWR0aDogdGhpcy53aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy53aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9KTtcblxuICAgIGZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKGV2ZW50OiBhbnkpID0+XG4gICAgICAgICAgICA8SVZpZXdwb3J0U2l6ZT57XG4gICAgICAgICAgICAgIHdpZHRoOiBldmVudC5jdXJyZW50VGFyZ2V0LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgIGhlaWdodDogZXZlbnQuY3VycmVudFRhcmdldC5pbm5lckhlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHdpbmRvd1NpemUgPT4ge1xuICAgICAgICB0aGlzLiN2aWV3cG9ydFNpemVDaGFuZ2VkLm5leHQod2luZG93U2l6ZSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLndpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aDtcbiAgfVxuXG4gIGhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy53aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0O1xuICB9XG59XG4iXX0=