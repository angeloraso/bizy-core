import { Inject, Injectable } from "@angular/core";
import { Subject, take } from "rxjs";
import { PopupWrapperComponent } from "./popup-wrapper/popup-wrapper.component";
import { Dialog } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/dialog";
export class PopupService {
    dialog;
    #dialogs = new Set();
    closed$ = new Subject();
    #data;
    constructor(dialog) {
        this.dialog = dialog;
    }
    open(data) {
        this.#data = data.data;
        const dialogRef = this.dialog.open(PopupWrapperComponent, {
            id: data.id,
            data: data.component,
            autoFocus: true,
            hasBackdrop: true,
            disableClose: data.disableClose ?? false,
            panelClass: ['bizy-popup', data.customClass]
        });
        this.#dialogs.add(dialogRef);
        dialogRef.closed.pipe(take(1)).subscribe(result => {
            this.#dialogs.delete(dialogRef);
            this.closed$.next(result);
        });
    }
    getData() {
        return this.#data;
    }
    close(data) {
        let dialogRef;
        if (data && data.id) {
            dialogRef = Array.from(this.#dialogs).find(_dialogRef => _dialogRef.id === data.id);
        }
        else {
            dialogRef = Array.from(this.#dialogs).pop();
        }
        if (dialogRef) {
            dialogRef.close(data ? data.data : null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvcG9wdXAvcG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxFQUEyQixNQUFNLHFCQUFxQixDQUFDOzs7QUFHdEUsTUFBTSxPQUFPLFlBQVk7SUFPYTtJQU5wQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQTBDLENBQUM7SUFFN0QsT0FBTyxHQUFHLElBQUksT0FBTyxFQUFLLENBQUM7SUFFM0IsS0FBSyxDQUFVO0lBRWYsWUFBb0MsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBSSxDQUFDO0lBR3ZELElBQUksQ0FBQyxJQUE4RztRQUNqSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQXVDLHFCQUFxQixFQUFHO1lBQy9GLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztZQUNwQixTQUFTLEVBQUUsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUs7WUFDeEMsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDcUIsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdCLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBOEI7UUFDbEMsSUFBSSxTQUFpRCxDQUFDO1FBQ3RELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDbkIsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3JGO2FBQU07WUFDTCxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDN0M7UUFFRCxJQUFJLFNBQVMsRUFBRTtZQUNiLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7d0dBeERVLFlBQVksa0JBT0gsTUFBTTs0R0FQZixZQUFZOzs0RkFBWixZQUFZO2tCQUR4QixVQUFVOzswQkFRSSxNQUFNOzJCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9wb3J0YWxcIjtcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTdWJqZWN0LCB0YWtlIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IFBvcHVwV3JhcHBlckNvbXBvbmVudCB9IGZyb20gXCIuL3BvcHVwLXdyYXBwZXIvcG9wdXAtd3JhcHBlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nQ29uZmlnLCBEaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvZGlhbG9nJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZTxULCBSPiB7XG4gICNkaWFsb2dzID0gbmV3IFNldDxEaWFsb2dSZWY8UiwgUG9wdXBXcmFwcGVyQ29tcG9uZW50PFQ+Pj4oKTtcbiAgXG4gIGNsb3NlZCQgPSBuZXcgU3ViamVjdDxSPigpO1xuXG4gICNkYXRhOiB1bmtub3duO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRGlhbG9nKSBwcml2YXRlIGRpYWxvZzogRGlhbG9nKSB7IH1cblxuXG4gIG9wZW4oZGF0YToge2NvbXBvbmVudDogQ29tcG9uZW50VHlwZTxUPiwgZGF0YT86IHVua25vd24sIGN1c3RvbUNsYXNzPzogc3RyaW5nLCBkaXNhYmxlQ2xvc2U/OiBib29sZWFuLCBpZD86IHN0cmluZ30pIHtcbiAgICB0aGlzLiNkYXRhID0gZGF0YS5kYXRhO1xuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW48UiwgdW5rbm93biwgUG9wdXBXcmFwcGVyQ29tcG9uZW50PFQ+PihQb3B1cFdyYXBwZXJDb21wb25lbnQsICh7XG4gICAgICBpZDogZGF0YS5pZCxcbiAgICAgIGRhdGE6IGRhdGEuY29tcG9uZW50LFxuICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxuICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgICBkaXNhYmxlQ2xvc2U6IGRhdGEuZGlzYWJsZUNsb3NlID8/IGZhbHNlLFxuICAgICAgcGFuZWxDbGFzczogWydiaXp5LXBvcHVwJywgZGF0YS5jdXN0b21DbGFzc10gXG4gICAgfSBhcyBEaWFsb2dDb25maWc8dW5rbm93biwgRGlhbG9nUmVmPFIsIFBvcHVwV3JhcHBlckNvbXBvbmVudDxUPj4+KSk7XG5cbiAgICB0aGlzLiNkaWFsb2dzLmFkZChkaWFsb2dSZWYpO1xuXG4gICAgZGlhbG9nUmVmLmNsb3NlZC5waXBlKHRha2UoMSkpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy4jZGlhbG9ncy5kZWxldGUoZGlhbG9nUmVmKTtcbiAgICAgIHRoaXMuY2xvc2VkJC5uZXh0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXREYXRhPFM+KCkge1xuICAgIHJldHVybiB0aGlzLiNkYXRhIGFzIFM7XG4gIH1cblxuICBjbG9zZShkYXRhPzoge2lkPzogc3RyaW5nLCBkYXRhPzogUn0pIHtcbiAgICBsZXQgZGlhbG9nUmVmOiBEaWFsb2dSZWY8UiwgUG9wdXBXcmFwcGVyQ29tcG9uZW50PFQ+PjtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmlkKSB7XG4gICAgICBkaWFsb2dSZWYgPSBBcnJheS5mcm9tKHRoaXMuI2RpYWxvZ3MpLmZpbmQoX2RpYWxvZ1JlZiA9PiBfZGlhbG9nUmVmLmlkID09PSBkYXRhLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlhbG9nUmVmID0gQXJyYXkuZnJvbSh0aGlzLiNkaWFsb2dzKS5wb3AoKTtcbiAgICB9XG5cbiAgICBpZiAoZGlhbG9nUmVmKSB7XG4gICAgICBkaWFsb2dSZWYuY2xvc2UoZGF0YSA/IGRhdGEuZGF0YSA6IG51bGwpO1xuICAgICAgdGhpcy4jZGlhbG9ncy5kZWxldGUoZGlhbG9nUmVmKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZUFsbCgpIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuI2RpYWxvZ3MpLmZvckVhY2goX2RpYWxvZ1JlZiA9PiB7XG4gICAgICBfZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfSk7XG4gICAgdGhpcy4jZGlhbG9ncy5jbGVhcigpO1xuICB9XG5cbiAgb3BlbmVkUG9wdXBzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuI2RpYWxvZ3Muc2l6ZTtcbiAgfVxufSJdfQ==