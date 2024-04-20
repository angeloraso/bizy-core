import { Inject, Injectable } from '@angular/core';
import { BizyRouterService } from './router.service';
import * as i0 from "@angular/core";
import * as i1 from "./router.service";
export class BizyCacheService {
    router;
    CACHE_PREFIX = 'BIZY-CACHE';
    constructor(router) {
        this.router = router;
    }
    getData(key) {
        if (!key) {
            key = `${this.CACHE_PREFIX}-${this.router.getURL()}`;
        }
        const data = sessionStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return {};
    }
    setData(value, key) {
        if (!value) {
            return;
        }
        if (!key) {
            key = `${this.CACHE_PREFIX}-${this.router.getURL()}`;
        }
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    remove(key) {
        if (!key) {
            key = `${this.CACHE_PREFIX}-${this.router.getURL()}`;
        }
        sessionStorage.removeItem(key);
    }
    removeAll() {
        const cacheKeys = Object.keys(sessionStorage).filter(key => {
            return key.includes(this.CACHE_PREFIX);
        });
        cacheKeys.forEach(value => {
            sessionStorage.removeItem(value);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCacheService, deps: [{ token: BizyRouterService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCacheService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCacheService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.BizyRouterService, decorators: [{
                    type: Inject,
                    args: [BizyRouterService]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvY2FjaGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBRXJELE1BQU0sT0FBTyxnQkFBZ0I7SUFFb0I7SUFEdEMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxZQUErQyxNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtJQUFHLENBQUM7SUFFNUUsT0FBTyxDQUFJLEdBQVk7UUFDckIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQ3REO1FBRUQsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUVELE9BQU8sRUFBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxPQUFPLENBQUksS0FBUSxFQUFFLEdBQVk7UUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUN0RDtRQUVELGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVk7UUFDakIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQ3REO1FBRUQsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsU0FBUztRQUNQLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pELE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDSCxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3dHQTVDVSxnQkFBZ0Isa0JBRVAsaUJBQWlCOzRHQUYxQixnQkFBZ0I7OzRGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVU7OzBCQUdJLE1BQU07MkJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5Um91dGVyU2VydmljZSB9IGZyb20gJy4vcm91dGVyLnNlcnZpY2UnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJpenlDYWNoZVNlcnZpY2Uge1xuICByZWFkb25seSBDQUNIRV9QUkVGSVggPSAnQklaWS1DQUNIRSc7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQml6eVJvdXRlclNlcnZpY2UpIHByaXZhdGUgcm91dGVyOiBCaXp5Um91dGVyU2VydmljZSkge31cblxuICBnZXREYXRhPFQ+KGtleT86IHN0cmluZyk6IFQge1xuICAgIGlmICgha2V5KSB7XG4gICAgICBrZXkgPSBgJHt0aGlzLkNBQ0hFX1BSRUZJWH0tJHt0aGlzLnJvdXRlci5nZXRVUkwoKX1gO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSEpO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge30gYXMgVDtcbiAgfVxuXG4gIHNldERhdGE8VD4odmFsdWU6IFQsIGtleT86IHN0cmluZykge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWtleSkge1xuICAgICAga2V5ID0gYCR7dGhpcy5DQUNIRV9QUkVGSVh9LSR7dGhpcy5yb3V0ZXIuZ2V0VVJMKCl9YDtcbiAgICB9XG5cbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxuXG4gIHJlbW92ZShrZXk/OiBzdHJpbmcpIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAga2V5ID0gYCR7dGhpcy5DQUNIRV9QUkVGSVh9LSR7dGhpcy5yb3V0ZXIuZ2V0VVJMKCl9YDtcbiAgICB9XG5cbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICByZW1vdmVBbGwoKSB7XG4gICAgY29uc3QgY2FjaGVLZXlzID0gT2JqZWN0LmtleXMoc2Vzc2lvblN0b3JhZ2UpLmZpbHRlcihrZXkgPT4ge1xuICAgICAgcmV0dXJuIGtleS5pbmNsdWRlcyh0aGlzLkNBQ0hFX1BSRUZJWCk7XG4gICAgfSk7XG4gICAgY2FjaGVLZXlzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==