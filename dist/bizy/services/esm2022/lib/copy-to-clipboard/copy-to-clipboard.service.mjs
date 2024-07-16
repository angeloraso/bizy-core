import { Inject, Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/clipboard";
export class BizyCopyToClipboardService {
    clipboard;
    constructor(clipboard) {
        this.clipboard = clipboard;
    }
    copy(data) {
        return new Promise((resolve, reject) => {
            try {
                if (!data) {
                    resolve();
                    return;
                }
                setTimeout(() => {
                    let toCopy = '';
                    if (typeof data === 'string' || data instanceof String) {
                        toCopy = data;
                    }
                    else if (data.items && data.items.length > 0 && data.model) {
                        for (const key in data.model) {
                            if (key) {
                                toCopy += `${data.model[key]},`;
                            }
                        }
                        data.items.forEach(_item => {
                            // Remove the last character (',')
                            toCopy = toCopy.slice(0, -2);
                            toCopy += '\n';
                            for (const key in data.model) {
                                let value = _item;
                                const nestedProperty = key.split('.');
                                nestedProperty.forEach(_property => {
                                    value = value[_property];
                                });
                                if (typeof value !== undefined && value !== null) {
                                    toCopy += `${String(value).replace(/\n/g, '')},`;
                                }
                                else {
                                    toCopy += ',';
                                }
                            }
                        });
                    }
                    const pending = this.clipboard.beginCopy(toCopy);
                    let remainingAttempts = 3;
                    const attempt = () => {
                        const result = pending.copy();
                        if (!result && --remainingAttempts) {
                            setTimeout(attempt);
                        }
                        else {
                            // Remember to destroy when you're done!
                            pending.destroy();
                            resolve();
                        }
                    };
                    attempt();
                }, 100);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardService, deps: [{ token: Clipboard }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Clipboard, decorators: [{
                    type: Inject,
                    args: [Clipboard]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS10by1jbGlwYm9hcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvY29weS10by1jbGlwYm9hcmQvY29weS10by1jbGlwYm9hcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7OztBQUduRCxNQUFNLE9BQU8sMEJBQTBCO0lBR1I7SUFEN0IsWUFDNkIsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUM5QyxDQUFDO0lBRUosSUFBSSxDQUFDLElBQXFFO1FBQ3hFLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsSUFBSTtnQkFDRixJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNULE9BQU8sRUFBRSxDQUFDO29CQUNWLE9BQU87aUJBQ1I7Z0JBRUQsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBRWhCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksWUFBWSxNQUFNLEVBQUU7d0JBQ3RELE1BQU0sR0FBRyxJQUFjLENBQUM7cUJBQ3pCO3lCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDNUQsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUM1QixJQUFJLEdBQUcsRUFBRTtnQ0FDUCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7NkJBQ2pDO3lCQUNGO3dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUN6QixrQ0FBa0M7NEJBQ2xDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM3QixNQUFNLElBQUksSUFBSSxDQUFDOzRCQUVmLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQ0FDNUIsSUFBSSxLQUFLLEdBQVEsS0FBSyxDQUFDO2dDQUN2QixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUN0QyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29DQUNqQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUMzQixDQUFDLENBQUMsQ0FBQztnQ0FFSCxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO29DQUNoRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDO2lDQUNsRDtxQ0FBTTtvQ0FDTCxNQUFNLElBQUksR0FBRyxDQUFDO2lDQUNmOzZCQUNGO3dCQUNILENBQUMsQ0FBQyxDQUFDO3FCQUNKO29CQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNqRCxJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQztvQkFDMUIsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO3dCQUNuQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxpQkFBaUIsRUFBRTs0QkFDbEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNyQjs2QkFBTTs0QkFDTCx3Q0FBd0M7NEJBQ3hDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDbEIsT0FBTyxFQUFFLENBQUM7eUJBQ1g7b0JBQ0gsQ0FBQyxDQUFDO29CQUVGLE9BQU8sRUFBRSxDQUFDO2dCQUNaLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNUO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7d0dBbEVVLDBCQUEwQixrQkFHM0IsU0FBUzs0R0FIUiwwQkFBMEI7OzRGQUExQiwwQkFBMEI7a0JBRHRDLFVBQVU7OzBCQUlOLE1BQU07MkJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xpcGJvYXJkIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NsaXBib2FyZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCaXp5Q29weVRvQ2xpcGJvYXJkU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDbGlwYm9hcmQpIHByaXZhdGUgY2xpcGJvYXJkOiBDbGlwYm9hcmQsXG4gICkge31cblxuICBjb3B5KGRhdGE6IHN0cmluZyB8IHtpdGVtczogQXJyYXk8dW5rbm93bj4sIG1vZGVsOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gIFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBsZXQgdG9Db3B5ID0gJyc7XG4gIFxuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgfHwgZGF0YSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICAgICAgdG9Db3B5ID0gZGF0YSBhcyBzdHJpbmc7XG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhLml0ZW1zICYmIGRhdGEuaXRlbXMubGVuZ3RoID4gMCAmJiBkYXRhLm1vZGVsKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhLm1vZGVsKSB7XG4gICAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICB0b0NvcHkgKz0gYCR7ZGF0YS5tb2RlbFtrZXldfSxgO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gIFxuICAgICAgICAgICAgZGF0YS5pdGVtcy5mb3JFYWNoKF9pdGVtID0+IHtcbiAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBsYXN0IGNoYXJhY3RlciAoJywnKVxuICAgICAgICAgICAgICB0b0NvcHkgPSB0b0NvcHkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAgICAgICB0b0NvcHkgKz0gJ1xcbic7XG4gIFxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhLm1vZGVsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSBfaXRlbTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXN0ZWRQcm9wZXJ0eSA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgIG5lc3RlZFByb3BlcnR5LmZvckVhY2goX3Byb3BlcnR5ID0+IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbX3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB0b0NvcHkgKz0gYCR7U3RyaW5nKHZhbHVlKS5yZXBsYWNlKC9cXG4vZywgJycpfSxgO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0b0NvcHkgKz0gJywnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBjb25zdCBwZW5kaW5nID0gdGhpcy5jbGlwYm9hcmQuYmVnaW5Db3B5KHRvQ29weSk7XG4gICAgICAgICAgbGV0IHJlbWFpbmluZ0F0dGVtcHRzID0gMztcbiAgICAgICAgICBjb25zdCBhdHRlbXB0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGVuZGluZy5jb3B5KCk7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCAmJiAtLXJlbWFpbmluZ0F0dGVtcHRzKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoYXR0ZW1wdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBSZW1lbWJlciB0byBkZXN0cm95IHdoZW4geW91J3JlIGRvbmUhXG4gICAgICAgICAgICAgIHBlbmRpbmcuZGVzdHJveSgpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgXG4gICAgICAgICAgYXR0ZW1wdCgpO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19