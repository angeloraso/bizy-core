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
            backdropClass: 'bizy-popup-backdrop',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NlcnZpY2VzL3NyYy9saWIvcG9wdXAvcG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxFQUEyQixNQUFNLHFCQUFxQixDQUFDOzs7QUFHdEUsTUFBTSxPQUFPLFlBQVk7SUFPYTtJQU5wQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQTBDLENBQUM7SUFFN0QsT0FBTyxHQUFHLElBQUksT0FBTyxFQUFLLENBQUM7SUFFM0IsS0FBSyxDQUFVO0lBRWYsWUFBb0MsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBSSxDQUFDO0lBR3ZELElBQUksQ0FBQyxJQUE4RztRQUNqSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQXVDLHFCQUFxQixFQUFHO1lBQy9GLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztZQUNwQixTQUFTLEVBQUUsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUs7WUFDeEMsYUFBYSxFQUFFLHFCQUFxQjtZQUNwQyxVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNxQixDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxLQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUE4QjtRQUNsQyxJQUFJLFNBQWlELENBQUM7UUFDdEQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNuQixTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDckY7YUFBTTtZQUNMLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUM3QztRQUVELElBQUksU0FBUyxFQUFFO1lBQ2IsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDN0MsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDNUIsQ0FBQzt3R0F6RFUsWUFBWSxrQkFPSCxNQUFNOzRHQVBmLFlBQVk7OzRGQUFaLFlBQVk7a0JBRHhCLFVBQVU7OzBCQVFJLE1BQU07MkJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tIFwiQGFuZ3VsYXIvY2RrL3BvcnRhbFwiO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFN1YmplY3QsIHRha2UgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgUG9wdXBXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vcG9wdXAtd3JhcHBlci9wb3B1cC13cmFwcGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRGlhbG9nLCBEaWFsb2dDb25maWcsIERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kaWFsb2cnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9wdXBTZXJ2aWNlPFQsIFI+IHtcbiAgI2RpYWxvZ3MgPSBuZXcgU2V0PERpYWxvZ1JlZjxSLCBQb3B1cFdyYXBwZXJDb21wb25lbnQ8VD4+PigpO1xuICBcbiAgY2xvc2VkJCA9IG5ldyBTdWJqZWN0PFI+KCk7XG5cbiAgI2RhdGE6IHVua25vd247XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChEaWFsb2cpIHByaXZhdGUgZGlhbG9nOiBEaWFsb2cpIHsgfVxuXG5cbiAgb3BlbihkYXRhOiB7Y29tcG9uZW50OiBDb21wb25lbnRUeXBlPFQ+LCBkYXRhPzogdW5rbm93biwgY3VzdG9tQ2xhc3M/OiBzdHJpbmcsIGRpc2FibGVDbG9zZT86IGJvb2xlYW4sIGlkPzogc3RyaW5nfSkge1xuICAgIHRoaXMuI2RhdGEgPSBkYXRhLmRhdGE7XG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbjxSLCB1bmtub3duLCBQb3B1cFdyYXBwZXJDb21wb25lbnQ8VD4+KFBvcHVwV3JhcHBlckNvbXBvbmVudCwgKHtcbiAgICAgIGlkOiBkYXRhLmlkLFxuICAgICAgZGF0YTogZGF0YS5jb21wb25lbnQsXG4gICAgICBhdXRvRm9jdXM6IHRydWUsXG4gICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgIGRpc2FibGVDbG9zZTogZGF0YS5kaXNhYmxlQ2xvc2UgPz8gZmFsc2UsXG4gICAgICBiYWNrZHJvcENsYXNzOiAnYml6eS1wb3B1cC1iYWNrZHJvcCcsXG4gICAgICBwYW5lbENsYXNzOiBbJ2JpenktcG9wdXAnLCBkYXRhLmN1c3RvbUNsYXNzXSBcbiAgICB9IGFzIERpYWxvZ0NvbmZpZzx1bmtub3duLCBEaWFsb2dSZWY8UiwgUG9wdXBXcmFwcGVyQ29tcG9uZW50PFQ+Pj4pKTtcblxuICAgIHRoaXMuI2RpYWxvZ3MuYWRkKGRpYWxvZ1JlZik7XG5cbiAgICBkaWFsb2dSZWYuY2xvc2VkLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLiNkaWFsb2dzLmRlbGV0ZShkaWFsb2dSZWYpO1xuICAgICAgdGhpcy5jbG9zZWQkLm5leHQocmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldERhdGE8Uz4oKSB7XG4gICAgcmV0dXJuIHRoaXMuI2RhdGEgYXMgUztcbiAgfVxuXG4gIGNsb3NlKGRhdGE/OiB7aWQ/OiBzdHJpbmcsIGRhdGE/OiBSfSkge1xuICAgIGxldCBkaWFsb2dSZWY6IERpYWxvZ1JlZjxSLCBQb3B1cFdyYXBwZXJDb21wb25lbnQ8VD4+O1xuICAgIGlmIChkYXRhICYmIGRhdGEuaWQpIHtcbiAgICAgIGRpYWxvZ1JlZiA9IEFycmF5LmZyb20odGhpcy4jZGlhbG9ncykuZmluZChfZGlhbG9nUmVmID0+IF9kaWFsb2dSZWYuaWQgPT09IGRhdGEuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaWFsb2dSZWYgPSBBcnJheS5mcm9tKHRoaXMuI2RpYWxvZ3MpLnBvcCgpO1xuICAgIH1cblxuICAgIGlmIChkaWFsb2dSZWYpIHtcbiAgICAgIGRpYWxvZ1JlZi5jbG9zZShkYXRhID8gZGF0YS5kYXRhIDogbnVsbCk7XG4gICAgICB0aGlzLiNkaWFsb2dzLmRlbGV0ZShkaWFsb2dSZWYpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlQWxsKCkge1xuICAgIEFycmF5LmZyb20odGhpcy4jZGlhbG9ncykuZm9yRWFjaChfZGlhbG9nUmVmID0+IHtcbiAgICAgIF9kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9KTtcbiAgICB0aGlzLiNkaWFsb2dzLmNsZWFyKCk7XG4gIH1cblxuICBvcGVuZWRQb3B1cHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4jZGlhbG9ncy5zaXplO1xuICB9XG59Il19