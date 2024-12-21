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
            key = this.router.getURL();
        }
        const data = sessionStorage.getItem(`${this.CACHE_PREFIX}-${key}`);
        if (data) {
            const _data = JSON.parse(data);
            return Date.now() < _data.expiresAt ? _data.value : {};
        }
        return {};
    }
    setData(value, key, expiresAt) {
        if (typeof value === 'undefined' || value === null) {
            return;
        }
        if (!key) {
            key = this.router.getURL();
        }
        if (!expiresAt) {
            const date = new Date();
            date.setHours(23, 59, 59);
            expiresAt = date.getTime();
        }
        const data = {
            expiresAt,
            value
        };
        sessionStorage.setItem(`${this.CACHE_PREFIX}-${key}`, JSON.stringify(data));
    }
    remove(key) {
        if (!key) {
            key = this.router.getURL();
        }
        sessionStorage.removeItem(`${this.CACHE_PREFIX}-${key}`);
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
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCacheService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.BizyRouterService, decorators: [{
                    type: Inject,
                    args: [BizyRouterService]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvY2FjaGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBSXJELE1BQU0sT0FBTyxnQkFBZ0I7SUFFb0I7SUFEdEMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxZQUErQyxNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtJQUFHLENBQUM7SUFFNUUsT0FBTyxDQUFJLEdBQVk7UUFDckIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzVCO1FBRUQsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFrQyxDQUFBO1lBQy9ELE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQU8sQ0FBQTtTQUM1RDtRQUVELE9BQU8sRUFBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxPQUFPLENBQUksS0FBUSxFQUFFLEdBQVksRUFBRSxTQUFrQjtRQUNuRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxQixTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCO1FBRUQsTUFBTSxJQUFJLEdBQUc7WUFDWCxTQUFTO1lBQ1QsS0FBSztTQUNOLENBQUE7UUFFRCxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFZO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM1QjtRQUVELGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFNBQVM7UUFDUCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6RCxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt3R0F4RFUsZ0JBQWdCLGtCQUVQLGlCQUFpQjs0R0FGMUIsZ0JBQWdCLGNBRmYsTUFBTTs7NEZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBR2MsTUFBTTsyQkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlSb3V0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9yb3V0ZXIuc2VydmljZSc7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5Q2FjaGVTZXJ2aWNlIHtcbiAgcmVhZG9ubHkgQ0FDSEVfUFJFRklYID0gJ0JJWlktQ0FDSEUnO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEJpenlSb3V0ZXJTZXJ2aWNlKSBwcml2YXRlIHJvdXRlcjogQml6eVJvdXRlclNlcnZpY2UpIHt9XG5cbiAgZ2V0RGF0YTxUPihrZXk/OiBzdHJpbmcpOiBUIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAga2V5ID0gdGhpcy5yb3V0ZXIuZ2V0VVJMKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5DQUNIRV9QUkVGSVh9LSR7a2V5fWApO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBjb25zdCBfZGF0YSA9IEpTT04ucGFyc2UoZGF0YSkgYXMge2V4cGlyZXNBdDogbnVtYmVyLCB2YWx1ZTogVH1cbiAgICAgIHJldHVybiBEYXRlLm5vdygpIDwgX2RhdGEuZXhwaXJlc0F0ID8gX2RhdGEudmFsdWUgOiB7fSBhcyBUXG4gICAgfVxuXG4gICAgcmV0dXJuIHt9IGFzIFQ7XG4gIH1cblxuICBzZXREYXRhPFQ+KHZhbHVlOiBULCBrZXk/OiBzdHJpbmcsIGV4cGlyZXNBdD86IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIGtleSA9IHRoaXMucm91dGVyLmdldFVSTCgpO1xuICAgIH1cblxuICAgIGlmICghZXhwaXJlc0F0KSB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIGRhdGUuc2V0SG91cnMoMjMsIDU5LCA1OSk7XG4gICAgICBleHBpcmVzQXQgPSBkYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgZXhwaXJlc0F0LFxuICAgICAgdmFsdWVcbiAgICB9XG5cbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMuQ0FDSEVfUFJFRklYfS0ke2tleX1gLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH1cblxuICByZW1vdmUoa2V5Pzogc3RyaW5nKSB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIGtleSA9IHRoaXMucm91dGVyLmdldFVSTCgpO1xuICAgIH1cblxuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oYCR7dGhpcy5DQUNIRV9QUkVGSVh9LSR7a2V5fWApO1xuICB9XG5cbiAgcmVtb3ZlQWxsKCkge1xuICAgIGNvbnN0IGNhY2hlS2V5cyA9IE9iamVjdC5rZXlzKHNlc3Npb25TdG9yYWdlKS5maWx0ZXIoa2V5ID0+IHtcbiAgICAgIHJldHVybiBrZXkuaW5jbHVkZXModGhpcy5DQUNIRV9QUkVGSVgpO1xuICAgIH0pO1xuICAgIGNhY2hlS2V5cy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0odmFsdWUpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=