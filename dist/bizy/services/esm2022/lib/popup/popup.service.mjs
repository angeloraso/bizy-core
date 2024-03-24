import { Inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { PopupWrapperComponent } from "./popup-wrapper/popup-wrapper.component";
import { Dialog } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/dialog";
export class PopupService {
    dialog;
    #dialogs = new Set();
    #data;
    constructor(dialog) {
        this.dialog = dialog;
    }
    open(data, callback) {
        this.#data = data.data;
        const dialogRef = this.dialog.open(PopupWrapperComponent, ({
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PopupService, deps: [{ token: Dialog }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PopupService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PopupService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Dialog, decorators: [{
                    type: Inject,
                    args: [Dialog]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvcG9wdXAvcG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBR3hELE1BQU0sT0FBTyxZQUFZO0lBS2E7SUFKcEMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFzRCxDQUFDO0lBRXpFLEtBQUssQ0FBVTtJQUVmLFlBQW9DLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUksQ0FBQztJQUd2RCxJQUFJLENBQUksSUFBb0gsRUFBRSxRQUEyQjtRQUN2SixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN6RCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDcEIsU0FBUyxFQUFFLElBQUk7WUFDZixXQUFXLEVBQUUsSUFBSTtZQUNqQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxLQUFLO1lBQ3hDLFVBQVUsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksUUFBUSxFQUFFO2dCQUNaLFFBQVEsQ0FBQyxRQUFhLENBQUMsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxLQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUF3QztRQUM1QyxJQUFJLFNBQVMsR0FBOEQsSUFBSSxDQUFDO1FBQ2hGLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDbkIsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3JGO2FBQU07WUFDTCxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDN0M7UUFFRCxJQUFJLFNBQVMsRUFBRTtZQUNiLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7d0dBeERVLFlBQVksa0JBS0gsTUFBTTs0R0FMZixZQUFZOzs0RkFBWixZQUFZO2tCQUR4QixVQUFVOzswQkFNSSxNQUFNOzJCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9wb3J0YWxcIjtcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IFBvcHVwV3JhcHBlckNvbXBvbmVudCB9IGZyb20gXCIuL3BvcHVwLXdyYXBwZXIvcG9wdXAtd3JhcHBlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RpYWxvZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2Uge1xuICAjZGlhbG9ncyA9IG5ldyBTZXQ8RGlhbG9nUmVmPHVua25vd24sIFBvcHVwV3JhcHBlckNvbXBvbmVudDx1bmtub3duPj4+KCk7XG4gIFxuICAjZGF0YTogdW5rbm93bjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERpYWxvZykgcHJpdmF0ZSBkaWFsb2c6IERpYWxvZykgeyB9XG5cblxuICBvcGVuPFI+KGRhdGE6IHtjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8dW5rbm93bj4sIGRhdGE/OiB1bmtub3duLCBjdXN0b21DbGFzcz86IHN0cmluZywgZGlzYWJsZUNsb3NlPzogYm9vbGVhbiwgaWQ/OiBzdHJpbmd9LCBjYWxsYmFjaz86IChyZXM6IFIpID0+IHZvaWQpIHtcbiAgICB0aGlzLiNkYXRhID0gZGF0YS5kYXRhO1xuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oUG9wdXBXcmFwcGVyQ29tcG9uZW50LCAoe1xuICAgICAgaWQ6IGRhdGEuaWQsXG4gICAgICBkYXRhOiBkYXRhLmNvbXBvbmVudCxcbiAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgZGlzYWJsZUNsb3NlOiBkYXRhLmRpc2FibGVDbG9zZSA/PyBmYWxzZSxcbiAgICAgIHBhbmVsQ2xhc3M6IFsnYml6eS1wb3B1cCcsIGRhdGEuY3VzdG9tQ2xhc3NdIFxuICAgIH0pKTtcblxuICAgIHRoaXMuI2RpYWxvZ3MuYWRkKGRpYWxvZ1JlZik7XG5cbiAgICBkaWFsb2dSZWYuY2xvc2VkLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuI2RpYWxvZ3MuZGVsZXRlKGRpYWxvZ1JlZik7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UgYXMgUik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXREYXRhPEQ+KCkge1xuICAgIHJldHVybiB0aGlzLiNkYXRhIGFzIEQ7XG4gIH1cblxuICBjbG9zZShkYXRhPzoge2lkPzogc3RyaW5nLCByZXNwb25zZT86IHVua25vd259KSB7XG4gICAgbGV0IGRpYWxvZ1JlZjogRGlhbG9nUmVmPHVua25vd24sIFBvcHVwV3JhcHBlckNvbXBvbmVudDx1bmtub3duPj4gfCBudWxsID0gbnVsbDtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmlkKSB7XG4gICAgICBkaWFsb2dSZWYgPSBBcnJheS5mcm9tKHRoaXMuI2RpYWxvZ3MpLmZpbmQoX2RpYWxvZ1JlZiA9PiBfZGlhbG9nUmVmLmlkID09PSBkYXRhLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlhbG9nUmVmID0gQXJyYXkuZnJvbSh0aGlzLiNkaWFsb2dzKS5wb3AoKTtcbiAgICB9XG5cbiAgICBpZiAoZGlhbG9nUmVmKSB7XG4gICAgICBkaWFsb2dSZWYuY2xvc2UoZGF0YSA/IGRhdGEucmVzcG9uc2UgOiBudWxsKTtcbiAgICAgIHRoaXMuI2RpYWxvZ3MuZGVsZXRlKGRpYWxvZ1JlZik7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VBbGwoKSB7XG4gICAgQXJyYXkuZnJvbSh0aGlzLiNkaWFsb2dzKS5mb3JFYWNoKF9kaWFsb2dSZWYgPT4ge1xuICAgICAgX2RpYWxvZ1JlZi5jbG9zZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuI2RpYWxvZ3MuY2xlYXIoKTtcbiAgfVxuXG4gIG9wZW5lZFBvcHVwcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiNkaWFsb2dzLnNpemU7XG4gIH1cbn0iXX0=