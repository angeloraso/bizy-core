import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyStorageService {
    get(key) {
        const item = localStorage.getItem(key);
        try {
            return JSON.parse(item);
        }
        catch (e) {
            return item;
        }
    }
    set(key, value) {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else if (typeof value === 'string') {
            localStorage.setItem(key, value);
        }
        else {
            localStorage.setItem(key, String(value));
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyStorageService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi9zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUU3QixHQUFHLENBQUksR0FBVztRQUNoQixNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUk7WUFDRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFNLENBQUM7U0FDOUI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sSUFBUyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBYztRQUM3QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDbEQ7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNwQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSztRQUNILFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2QixDQUFDO3dHQTNCVSxrQkFBa0I7NEdBQWxCLGtCQUFrQixjQUZqQixNQUFNOzs0RkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5U3RvcmFnZVNlcnZpY2Uge1xuXG4gIGdldDxUPihrZXk6IHN0cmluZyk6IFQge1xuICAgIGNvbnN0IGl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKSBhcyBUO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBpdGVtIGFzIFQ7XG4gICAgfVxuICB9XG5cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBTdHJpbmcodmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gIH1cbn0iXX0=