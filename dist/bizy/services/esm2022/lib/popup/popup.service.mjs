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
            panelClass: [data.customClass]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvcG9wdXAvcG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxNQUFNLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBR3hELE1BQU0sT0FBTyxnQkFBZ0I7SUFLUztJQUpwQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQTBELENBQUM7SUFFN0UsS0FBSyxDQUFVO0lBRWYsWUFBb0MsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBSSxDQUFDO0lBR3ZELElBQUksQ0FBSSxJQUFvSCxFQUFFLFFBQTJCO1FBQ3ZKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQzdELEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztZQUNwQixTQUFTLEVBQUUsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUs7WUFDeEMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMvQixDQUFDLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdCLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxJQUFJLFFBQVEsRUFBRTtnQkFDWixRQUFRLENBQUMsUUFBYSxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBd0M7UUFDNUMsSUFBSSxTQUFTLEdBQWtFLElBQUksQ0FBQztRQUNwRixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ25CLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyRjthQUFNO1lBQ0wsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzdDO1FBRUQsSUFBSSxTQUFTLEVBQUU7WUFDYixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3QyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUM1QixDQUFDO3dHQXhEVSxnQkFBZ0Isa0JBS1AsTUFBTTs0R0FMZixnQkFBZ0I7OzRGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVU7OzBCQU1JLE1BQU07MkJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tIFwiQGFuZ3VsYXIvY2RrL3BvcnRhbFwiO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IHRha2UgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgQml6eVBvcHVwV3JhcHBlckNvbXBvbmVudCB9IGZyb20gXCIuL3BvcHVwLXdyYXBwZXIvcG9wdXAtd3JhcHBlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RpYWxvZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCaXp5UG9wdXBTZXJ2aWNlIHtcbiAgI2RpYWxvZ3MgPSBuZXcgU2V0PERpYWxvZ1JlZjx1bmtub3duLCBCaXp5UG9wdXBXcmFwcGVyQ29tcG9uZW50PHVua25vd24+Pj4oKTtcbiAgXG4gICNkYXRhOiB1bmtub3duO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRGlhbG9nKSBwcml2YXRlIGRpYWxvZzogRGlhbG9nKSB7IH1cblxuXG4gIG9wZW48Uj4oZGF0YToge2NvbXBvbmVudDogQ29tcG9uZW50VHlwZTx1bmtub3duPiwgZGF0YT86IHVua25vd24sIGN1c3RvbUNsYXNzPzogc3RyaW5nLCBkaXNhYmxlQ2xvc2U/OiBib29sZWFuLCBpZD86IHN0cmluZ30sIGNhbGxiYWNrPzogKHJlczogUikgPT4gdm9pZCkge1xuICAgIHRoaXMuI2RhdGEgPSBkYXRhLmRhdGE7XG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihCaXp5UG9wdXBXcmFwcGVyQ29tcG9uZW50LCAoe1xuICAgICAgaWQ6IGRhdGEuaWQsXG4gICAgICBkYXRhOiBkYXRhLmNvbXBvbmVudCxcbiAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgZGlzYWJsZUNsb3NlOiBkYXRhLmRpc2FibGVDbG9zZSA/PyBmYWxzZSxcbiAgICAgIHBhbmVsQ2xhc3M6IFtkYXRhLmN1c3RvbUNsYXNzXSBcbiAgICB9KSk7XG5cbiAgICB0aGlzLiNkaWFsb2dzLmFkZChkaWFsb2dSZWYpO1xuXG4gICAgZGlhbG9nUmVmLmNsb3NlZC5waXBlKHRha2UoMSkpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICB0aGlzLiNkaWFsb2dzLmRlbGV0ZShkaWFsb2dSZWYpO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlIGFzIFIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGF0YTxEPigpIHtcbiAgICByZXR1cm4gdGhpcy4jZGF0YSBhcyBEO1xuICB9XG5cbiAgY2xvc2UoZGF0YT86IHtpZD86IHN0cmluZywgcmVzcG9uc2U/OiB1bmtub3dufSkge1xuICAgIGxldCBkaWFsb2dSZWY6IERpYWxvZ1JlZjx1bmtub3duLCBCaXp5UG9wdXBXcmFwcGVyQ29tcG9uZW50PHVua25vd24+PiB8IG51bGwgPSBudWxsO1xuICAgIGlmIChkYXRhICYmIGRhdGEuaWQpIHtcbiAgICAgIGRpYWxvZ1JlZiA9IEFycmF5LmZyb20odGhpcy4jZGlhbG9ncykuZmluZChfZGlhbG9nUmVmID0+IF9kaWFsb2dSZWYuaWQgPT09IGRhdGEuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaWFsb2dSZWYgPSBBcnJheS5mcm9tKHRoaXMuI2RpYWxvZ3MpLnBvcCgpO1xuICAgIH1cblxuICAgIGlmIChkaWFsb2dSZWYpIHtcbiAgICAgIGRpYWxvZ1JlZi5jbG9zZShkYXRhID8gZGF0YS5yZXNwb25zZSA6IG51bGwpO1xuICAgICAgdGhpcy4jZGlhbG9ncy5kZWxldGUoZGlhbG9nUmVmKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZUFsbCgpIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuI2RpYWxvZ3MpLmZvckVhY2goX2RpYWxvZ1JlZiA9PiB7XG4gICAgICBfZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfSk7XG4gICAgdGhpcy4jZGlhbG9ncy5jbGVhcigpO1xuICB9XG5cbiAgb3BlbmVkUG9wdXBzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuI2RpYWxvZ3Muc2l6ZTtcbiAgfVxufSJdfQ==