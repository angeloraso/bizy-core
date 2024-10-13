import { Inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { BizyPopupWrapperComponent } from "./popup-wrapper/popup-wrapper.component";
import { Dialog } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/dialog";
export class BizyPopupService {
    dialog;
    #dialogs = new Set();
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
        this.#dialogs.add(dialogRef);
        dialogRef.closed.pipe(take(1)).subscribe(response => {
            this.#dialogs.delete(dialogRef);
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
            dialogRef = Array.from(this.#dialogs).find(_dialogRef => _dialogRef.id === data.id);
        }
        else {
            dialogRef = Array.from(this.#dialogs).pop();
        }
        if (dialogRef) {
            dialogRef.close(data ? data.response : null);
            this.#dialogs.delete(dialogRef);
        }
    }
    closeAll() {
        Array.from(this.#dialogs).forEach(_dialogRef => {
            _dialogRef.close();
        });
        this.#dialogs.clear();
    }
    openedPopups() {
        return this.#dialogs.size;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvcG9wdXAvcG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxNQUFNLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBR3hELE1BQU0sT0FBTyxnQkFBZ0I7SUFLUztJQUpwQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQTBELENBQUM7SUFFN0UsS0FBSyxDQUFVO0lBRWYsWUFBb0MsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBSSxDQUFDO0lBR3ZELElBQUksQ0FBSSxJQUFvSCxFQUFFLFFBQTJCO1FBQ3ZKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQzdELEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztZQUNwQixTQUFTLEVBQUUsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUs7WUFDeEMsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDN0MsQ0FBQyxDQUFDLENBQUM7UUFFSixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU3QixTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osUUFBUSxDQUFDLFFBQWEsQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLEtBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQXdDO1FBQzVDLElBQUksU0FBUyxHQUFrRSxJQUFJLENBQUM7UUFDcEYsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNuQixTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDckY7YUFBTTtZQUNMLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUM3QztRQUVELElBQUksU0FBUyxFQUFFO1lBQ2IsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDN0MsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDNUIsQ0FBQzt3R0F4RFUsZ0JBQWdCLGtCQUtQLE1BQU07NEdBTGYsZ0JBQWdCOzs0RkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVOzswQkFNSSxNQUFNOzJCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9wb3J0YWxcIjtcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IEJpenlQb3B1cFdyYXBwZXJDb21wb25lbnQgfSBmcm9tIFwiLi9wb3B1cC13cmFwcGVyL3BvcHVwLXdyYXBwZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEaWFsb2csIERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kaWFsb2cnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQml6eVBvcHVwU2VydmljZSB7XG4gICNkaWFsb2dzID0gbmV3IFNldDxEaWFsb2dSZWY8dW5rbm93biwgQml6eVBvcHVwV3JhcHBlckNvbXBvbmVudDx1bmtub3duPj4+KCk7XG4gIFxuICAjZGF0YTogdW5rbm93bjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERpYWxvZykgcHJpdmF0ZSBkaWFsb2c6IERpYWxvZykgeyB9XG5cblxuICBvcGVuPFI+KGRhdGE6IHtjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8dW5rbm93bj4sIGRhdGE/OiB1bmtub3duLCBjdXN0b21DbGFzcz86IHN0cmluZywgZGlzYWJsZUNsb3NlPzogYm9vbGVhbiwgaWQ/OiBzdHJpbmd9LCBjYWxsYmFjaz86IChyZXM6IFIpID0+IHZvaWQpIHtcbiAgICB0aGlzLiNkYXRhID0gZGF0YS5kYXRhO1xuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQml6eVBvcHVwV3JhcHBlckNvbXBvbmVudCwgKHtcbiAgICAgIGlkOiBkYXRhLmlkLFxuICAgICAgZGF0YTogZGF0YS5jb21wb25lbnQsXG4gICAgICBhdXRvRm9jdXM6IHRydWUsXG4gICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgIGRpc2FibGVDbG9zZTogZGF0YS5kaXNhYmxlQ2xvc2UgPz8gZmFsc2UsXG4gICAgICBwYW5lbENsYXNzOiBbJ2JpenktcG9wdXAnLCBkYXRhLmN1c3RvbUNsYXNzXSBcbiAgICB9KSk7XG5cbiAgICB0aGlzLiNkaWFsb2dzLmFkZChkaWFsb2dSZWYpO1xuXG4gICAgZGlhbG9nUmVmLmNsb3NlZC5waXBlKHRha2UoMSkpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICB0aGlzLiNkaWFsb2dzLmRlbGV0ZShkaWFsb2dSZWYpO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlIGFzIFIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGF0YTxEPigpIHtcbiAgICByZXR1cm4gdGhpcy4jZGF0YSBhcyBEO1xuICB9XG5cbiAgY2xvc2UoZGF0YT86IHtpZD86IHN0cmluZywgcmVzcG9uc2U/OiB1bmtub3dufSkge1xuICAgIGxldCBkaWFsb2dSZWY6IERpYWxvZ1JlZjx1bmtub3duLCBCaXp5UG9wdXBXcmFwcGVyQ29tcG9uZW50PHVua25vd24+PiB8IG51bGwgPSBudWxsO1xuICAgIGlmIChkYXRhICYmIGRhdGEuaWQpIHtcbiAgICAgIGRpYWxvZ1JlZiA9IEFycmF5LmZyb20odGhpcy4jZGlhbG9ncykuZmluZChfZGlhbG9nUmVmID0+IF9kaWFsb2dSZWYuaWQgPT09IGRhdGEuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaWFsb2dSZWYgPSBBcnJheS5mcm9tKHRoaXMuI2RpYWxvZ3MpLnBvcCgpO1xuICAgIH1cblxuICAgIGlmIChkaWFsb2dSZWYpIHtcbiAgICAgIGRpYWxvZ1JlZi5jbG9zZShkYXRhID8gZGF0YS5yZXNwb25zZSA6IG51bGwpO1xuICAgICAgdGhpcy4jZGlhbG9ncy5kZWxldGUoZGlhbG9nUmVmKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZUFsbCgpIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuI2RpYWxvZ3MpLmZvckVhY2goX2RpYWxvZ1JlZiA9PiB7XG4gICAgICBfZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfSk7XG4gICAgdGhpcy4jZGlhbG9ncy5jbGVhcigpO1xuICB9XG5cbiAgb3BlbmVkUG9wdXBzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuI2RpYWxvZ3Muc2l6ZTtcbiAgfVxufSJdfQ==