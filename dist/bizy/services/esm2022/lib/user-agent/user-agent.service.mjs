import { Injectable } from '@angular/core';
import { getUserAgent } from './uach-retrofill';
import * as i0 from "@angular/core";
export class BizyUserAgentService {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyUserAgentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyUserAgentService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyUserAgentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hZ2VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi91c2VyLWFnZW50L3VzZXItYWdlbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFLaEQsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixHQUFHO1FBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBUyxPQUFPLENBQUMsRUFBRTtZQUNuQyxZQUFZLENBQUM7Z0JBQ1gsY0FBYztnQkFDZCxTQUFTO2dCQUNULE9BQU87Z0JBQ1AsaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLGlCQUFpQjthQUNsQixDQUFDO2lCQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDaEIsT0FBTyxDQUFDLFNBQW1CLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDVixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt3R0FsQlUsb0JBQW9COzRHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7NEZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGdldFVzZXJBZ2VudCB9IGZyb20gJy4vdWFjaC1yZXRyb2ZpbGwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5VXNlckFnZW50U2VydmljZSB7XG4gIGdldCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPihyZXNvbHZlID0+IHtcbiAgICAgIGdldFVzZXJBZ2VudChbXG4gICAgICAgICdhcmNoaXRlY3R1cmUnLFxuICAgICAgICAnYml0bmVzcycsXG4gICAgICAgICdtb2RlbCcsXG4gICAgICAgICdwbGF0Zm9ybVZlcnNpb24nLFxuICAgICAgICAndWFGdWxsVmVyc2lvbicsXG4gICAgICAgICdmdWxsVmVyc2lvbkxpc3QnXG4gICAgICBdKVxuICAgICAgICAudGhlbih1c2VyQWdlbnQgPT4ge1xuICAgICAgICAgIHJlc29sdmUodXNlckFnZW50IGFzIHN0cmluZyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=