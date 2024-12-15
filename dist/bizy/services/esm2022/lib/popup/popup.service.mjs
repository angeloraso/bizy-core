import { Inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { BizyPopupWrapperComponent } from "./popup-wrapper/popup-wrapper.component";
import { Dialog } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/dialog";
export class BizyPopupService {
    dialog;
    static dialogs = new Set();
    #data;
    constructor(dialog) {
        this.dialog = dialog;
    }
    open(data, callback) {
        this.#data = data.data;
        const dialogRef = this.dialog.open(BizyPopupWrapperComponent, ({
            id: data.id,
            data: data.component,
            autoFocus: true,
            hasBackdrop: true,
            disableClose: data.disableClose ?? false,
            panelClass: ['bizy-popup', data.customClass]
        }));
        BizyPopupService.dialogs.add(dialogRef);
        dialogRef.closed.pipe(take(1)).subscribe(response => {
            BizyPopupService.dialogs.delete(dialogRef);
            if (callback) {
                callback(response);
            }
        });
    }
    getData() {
        return this.#data;
    }
    close(data) {
        let dialogRef = null;
        if (data && data.id) {
            dialogRef = Array.from(BizyPopupService.dialogs).find(_dialogRef => _dialogRef.id === data.id);
        }
        else {
            dialogRef = Array.from(BizyPopupService.dialogs).pop();
        }
        if (dialogRef) {
            dialogRef.close(data ? data.response : null);
            BizyPopupService.dialogs.delete(dialogRef);
        }
    }
    closeAll() {
        Array.from(BizyPopupService.dialogs).forEach(_dialogRef => {
            _dialogRef.close();
        });
        BizyPopupService.dialogs.clear();
    }
    openedPopups() {
        return BizyPopupService.dialogs.size;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupService, deps: [{ token: Dialog }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPopupService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Dialog, decorators: [{
                    type: Inject,
                    args: [Dialog]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvcG9wdXAvcG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxNQUFNLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBR3hELE1BQU0sT0FBTyxnQkFBZ0I7SUFLUztJQUpwQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUEwRCxDQUFDO0lBRW5GLEtBQUssQ0FBVTtJQUVmLFlBQW9DLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUksQ0FBQztJQUd2RCxJQUFJLENBQUksSUFBb0gsRUFBRSxRQUEyQjtRQUN2SixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUM3RCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDcEIsU0FBUyxFQUFFLElBQUk7WUFDZixXQUFXLEVBQUUsSUFBSTtZQUNqQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxLQUFLO1lBQ3hDLFVBQVUsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUosZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4QyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQyxJQUFJLFFBQVEsRUFBRTtnQkFDWixRQUFRLENBQUMsUUFBYSxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBd0M7UUFDNUMsSUFBSSxTQUFTLEdBQWtFLElBQUksQ0FBQztRQUNwRixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ25CLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2hHO2FBQU07WUFDTCxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN4RDtRQUVELElBQUksU0FBUyxFQUFFO1lBQ2IsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3hELFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztJQUN2QyxDQUFDO3dHQXhEVSxnQkFBZ0Isa0JBS1AsTUFBTTs0R0FMZixnQkFBZ0I7OzRGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVU7OzBCQU1JLE1BQU07MkJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tIFwiQGFuZ3VsYXIvY2RrL3BvcnRhbFwiO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IHRha2UgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgQml6eVBvcHVwV3JhcHBlckNvbXBvbmVudCB9IGZyb20gXCIuL3BvcHVwLXdyYXBwZXIvcG9wdXAtd3JhcHBlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RpYWxvZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCaXp5UG9wdXBTZXJ2aWNlIHtcbiAgc3RhdGljIGRpYWxvZ3MgPSBuZXcgU2V0PERpYWxvZ1JlZjx1bmtub3duLCBCaXp5UG9wdXBXcmFwcGVyQ29tcG9uZW50PHVua25vd24+Pj4oKTtcbiAgXG4gICNkYXRhOiB1bmtub3duO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRGlhbG9nKSBwcml2YXRlIGRpYWxvZzogRGlhbG9nKSB7IH1cblxuXG4gIG9wZW48Uj4oZGF0YToge2NvbXBvbmVudDogQ29tcG9uZW50VHlwZTx1bmtub3duPiwgZGF0YT86IHVua25vd24sIGN1c3RvbUNsYXNzPzogc3RyaW5nLCBkaXNhYmxlQ2xvc2U/OiBib29sZWFuLCBpZD86IHN0cmluZ30sIGNhbGxiYWNrPzogKHJlczogUikgPT4gdm9pZCkge1xuICAgIHRoaXMuI2RhdGEgPSBkYXRhLmRhdGE7XG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihCaXp5UG9wdXBXcmFwcGVyQ29tcG9uZW50LCAoe1xuICAgICAgaWQ6IGRhdGEuaWQsXG4gICAgICBkYXRhOiBkYXRhLmNvbXBvbmVudCxcbiAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgZGlzYWJsZUNsb3NlOiBkYXRhLmRpc2FibGVDbG9zZSA/PyBmYWxzZSxcbiAgICAgIHBhbmVsQ2xhc3M6IFsnYml6eS1wb3B1cCcsIGRhdGEuY3VzdG9tQ2xhc3NdIFxuICAgIH0pKTtcblxuICAgIEJpenlQb3B1cFNlcnZpY2UuZGlhbG9ncy5hZGQoZGlhbG9nUmVmKTtcblxuICAgIGRpYWxvZ1JlZi5jbG9zZWQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgQml6eVBvcHVwU2VydmljZS5kaWFsb2dzLmRlbGV0ZShkaWFsb2dSZWYpO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlIGFzIFIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGF0YTxEPigpIHtcbiAgICByZXR1cm4gdGhpcy4jZGF0YSBhcyBEO1xuICB9XG5cbiAgY2xvc2UoZGF0YT86IHtpZD86IHN0cmluZywgcmVzcG9uc2U/OiB1bmtub3dufSkge1xuICAgIGxldCBkaWFsb2dSZWY6IERpYWxvZ1JlZjx1bmtub3duLCBCaXp5UG9wdXBXcmFwcGVyQ29tcG9uZW50PHVua25vd24+PiB8IG51bGwgPSBudWxsO1xuICAgIGlmIChkYXRhICYmIGRhdGEuaWQpIHtcbiAgICAgIGRpYWxvZ1JlZiA9IEFycmF5LmZyb20oQml6eVBvcHVwU2VydmljZS5kaWFsb2dzKS5maW5kKF9kaWFsb2dSZWYgPT4gX2RpYWxvZ1JlZi5pZCA9PT0gZGF0YS5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpYWxvZ1JlZiA9IEFycmF5LmZyb20oQml6eVBvcHVwU2VydmljZS5kaWFsb2dzKS5wb3AoKTtcbiAgICB9XG5cbiAgICBpZiAoZGlhbG9nUmVmKSB7XG4gICAgICBkaWFsb2dSZWYuY2xvc2UoZGF0YSA/IGRhdGEucmVzcG9uc2UgOiBudWxsKTtcbiAgICAgIEJpenlQb3B1cFNlcnZpY2UuZGlhbG9ncy5kZWxldGUoZGlhbG9nUmVmKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZUFsbCgpIHtcbiAgICBBcnJheS5mcm9tKEJpenlQb3B1cFNlcnZpY2UuZGlhbG9ncykuZm9yRWFjaChfZGlhbG9nUmVmID0+IHtcbiAgICAgIF9kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9KTtcbiAgICBCaXp5UG9wdXBTZXJ2aWNlLmRpYWxvZ3MuY2xlYXIoKTtcbiAgfVxuXG4gIG9wZW5lZFBvcHVwcygpOiBudW1iZXIge1xuICAgIHJldHVybiBCaXp5UG9wdXBTZXJ2aWNlLmRpYWxvZ3Muc2l6ZTtcbiAgfVxufSJdfQ==