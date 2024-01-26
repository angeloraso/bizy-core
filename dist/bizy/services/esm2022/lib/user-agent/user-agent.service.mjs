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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserAgentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserAgentService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserAgentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hZ2VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi91c2VyLWFnZW50L3VzZXItYWdlbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFLaEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixHQUFHO1FBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBUyxPQUFPLENBQUMsRUFBRTtZQUNuQyxZQUFZLENBQUM7Z0JBQ1gsY0FBYztnQkFDZCxTQUFTO2dCQUNULE9BQU87Z0JBQ1AsaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLGlCQUFpQjthQUNsQixDQUFDO2lCQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDaEIsT0FBTyxDQUFDLFNBQW1CLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDVixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt3R0FsQlUsZ0JBQWdCOzRHQUFoQixnQkFBZ0IsY0FGZixNQUFNOzs0RkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZ2V0VXNlckFnZW50IH0gZnJvbSAnLi91YWNoLXJldHJvZmlsbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJBZ2VudFNlcnZpY2Uge1xuICBnZXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4ocmVzb2x2ZSA9PiB7XG4gICAgICBnZXRVc2VyQWdlbnQoW1xuICAgICAgICAnYXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ2JpdG5lc3MnLFxuICAgICAgICAnbW9kZWwnLFxuICAgICAgICAncGxhdGZvcm1WZXJzaW9uJyxcbiAgICAgICAgJ3VhRnVsbFZlcnNpb24nLFxuICAgICAgICAnZnVsbFZlcnNpb25MaXN0J1xuICAgICAgXSlcbiAgICAgICAgLnRoZW4odXNlckFnZW50ID0+IHtcbiAgICAgICAgICByZXNvbHZlKHVzZXJBZ2VudCBhcyBzdHJpbmcpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19