import { Injectable } from '@angular/core';
import { getUserAgent } from './uach-retrofill';
import * as i0 from "@angular/core";
export class UserAgentService {
    get() {
        return new Promise(resolve => {
            getUserAgent([
                'architecture',
                'bitness',
                'model',
                'platformVersion',
                'uaFullVersion',
                'fullVersionList'
            ])
                .then(userAgent => {
                resolve(userAgent);
            })
                .catch(() => {
                resolve(window.navigator.userAgent);
            });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: UserAgentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: UserAgentService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: UserAgentService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hZ2VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi91c2VyLWFnZW50L3VzZXItYWdlbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFHaEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixHQUFHO1FBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBUyxPQUFPLENBQUMsRUFBRTtZQUNuQyxZQUFZLENBQUM7Z0JBQ1gsY0FBYztnQkFDZCxTQUFTO2dCQUNULE9BQU87Z0JBQ1AsaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLGlCQUFpQjthQUNsQixDQUFDO2lCQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDaEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3VHQWxCVSxnQkFBZ0I7MkdBQWhCLGdCQUFnQjs7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGdldFVzZXJBZ2VudCB9IGZyb20gJy4vdWFjaC1yZXRyb2ZpbGwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckFnZW50U2VydmljZSB7XG4gIGdldCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPihyZXNvbHZlID0+IHtcbiAgICAgIGdldFVzZXJBZ2VudChbXG4gICAgICAgICdhcmNoaXRlY3R1cmUnLFxuICAgICAgICAnYml0bmVzcycsXG4gICAgICAgICdtb2RlbCcsXG4gICAgICAgICdwbGF0Zm9ybVZlcnNpb24nLFxuICAgICAgICAndWFGdWxsVmVyc2lvbicsXG4gICAgICAgICdmdWxsVmVyc2lvbkxpc3QnXG4gICAgICBdKVxuICAgICAgICAudGhlbih1c2VyQWdlbnQgPT4ge1xuICAgICAgICAgIHJlc29sdmUodXNlckFnZW50KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==