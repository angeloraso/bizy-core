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
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCopyToClipboardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Clipboard, decorators: [{
                    type: Inject,
                    args: [Clipboard]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS10by1jbGlwYm9hcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvY29weS10by1jbGlwYm9hcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7OztBQUtuRCxNQUFNLE9BQU8sMEJBQTBCO0lBR1I7SUFEN0IsWUFDNkIsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUM5QyxDQUFDO0lBRUosSUFBSSxDQUFDLElBQXFFO1FBQ3hFLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsSUFBSTtnQkFDRixJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNULE9BQU8sRUFBRSxDQUFDO29CQUNWLE9BQU87aUJBQ1I7Z0JBRUQsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBRWhCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksWUFBWSxNQUFNLEVBQUU7d0JBQ3RELE1BQU0sR0FBRyxJQUFjLENBQUM7cUJBQ3pCO3lCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDNUQsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUM1QixJQUFJLEdBQUcsRUFBRTtnQ0FDUCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7NkJBQ2pDO3lCQUNGO3dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUN6QixrQ0FBa0M7NEJBQ2xDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM3QixNQUFNLElBQUksSUFBSSxDQUFDOzRCQUVmLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQ0FDNUIsSUFBSSxLQUFLLEdBQVEsS0FBSyxDQUFDO2dDQUN2QixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUN0QyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29DQUNqQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUMzQixDQUFDLENBQUMsQ0FBQztnQ0FFSCxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO29DQUNoRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDO2lDQUNsRDtxQ0FBTTtvQ0FDTCxNQUFNLElBQUksR0FBRyxDQUFDO2lDQUNmOzZCQUNGO3dCQUNILENBQUMsQ0FBQyxDQUFDO3FCQUNKO29CQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNqRCxJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQztvQkFDMUIsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO3dCQUNuQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxpQkFBaUIsRUFBRTs0QkFDbEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNyQjs2QkFBTTs0QkFDTCx3Q0FBd0M7NEJBQ3hDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDbEIsT0FBTyxFQUFFLENBQUM7eUJBQ1g7b0JBQ0gsQ0FBQyxDQUFDO29CQUVGLE9BQU8sRUFBRSxDQUFDO2dCQUNaLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNUO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7d0dBbEVVLDBCQUEwQixrQkFHM0IsU0FBUzs0R0FIUiwwQkFBMEIsY0FGekIsTUFBTTs7NEZBRVAsMEJBQTBCO2tCQUh0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBSUksTUFBTTsyQkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbGlwYm9hcmQgfSBmcm9tICdAYW5ndWxhci9jZGsvY2xpcGJvYXJkJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQml6eUNvcHlUb0NsaXBib2FyZFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2xpcGJvYXJkKSBwcml2YXRlIGNsaXBib2FyZDogQ2xpcGJvYXJkLFxuICApIHt9XG5cbiAgY29weShkYXRhOiBzdHJpbmcgfCB7aXRlbXM6IEFycmF5PHVua25vd24+LCBtb2RlbDogUmVjb3JkPHN0cmluZywgc3RyaW5nPn0pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICBcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgbGV0IHRvQ29weSA9ICcnO1xuICBcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnIHx8IGRhdGEgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgIHRvQ29weSA9IGRhdGEgYXMgc3RyaW5nO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pdGVtcyAmJiBkYXRhLml0ZW1zLmxlbmd0aCA+IDAgJiYgZGF0YS5tb2RlbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YS5tb2RlbCkge1xuICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdG9Db3B5ICs9IGAke2RhdGEubW9kZWxba2V5XX0sYDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICBcbiAgICAgICAgICAgIGRhdGEuaXRlbXMuZm9yRWFjaChfaXRlbSA9PiB7XG4gICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBjaGFyYWN0ZXIgKCcsJylcbiAgICAgICAgICAgICAgdG9Db3B5ID0gdG9Db3B5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgICAgICAgdG9Db3B5ICs9ICdcXG4nO1xuICBcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YS5tb2RlbCkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogYW55ID0gX2l0ZW07XG4gICAgICAgICAgICAgICAgY29uc3QgbmVzdGVkUHJvcGVydHkgPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICBuZXN0ZWRQcm9wZXJ0eS5mb3JFYWNoKF9wcm9wZXJ0eSA9PiB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW19wcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgfSk7XG4gIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgdG9Db3B5ICs9IGAke1N0cmluZyh2YWx1ZSkucmVwbGFjZSgvXFxuL2csICcnKX0sYDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdG9Db3B5ICs9ICcsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgY29uc3QgcGVuZGluZyA9IHRoaXMuY2xpcGJvYXJkLmJlZ2luQ29weSh0b0NvcHkpO1xuICAgICAgICAgIGxldCByZW1haW5pbmdBdHRlbXB0cyA9IDM7XG4gICAgICAgICAgY29uc3QgYXR0ZW1wdCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBlbmRpbmcuY29weSgpO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQgJiYgLS1yZW1haW5pbmdBdHRlbXB0cykge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGF0dGVtcHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdG8gZGVzdHJveSB3aGVuIHlvdSdyZSBkb25lIVxuICAgICAgICAgICAgICBwZW5kaW5nLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gIFxuICAgICAgICAgIGF0dGVtcHQoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==