import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class OnlyPhoneDigitsDirective {
    onlyPhoneNumbers;
    regexStr = '^[0-9*#+]*$';
    onKeyDown(event) {
        if (typeof this.onlyPhoneNumbers === 'undefined' || this.onlyPhoneNumbers === null || this.onlyPhoneNumbers === false) {
            return;
        }
        let e = event;
        const ignore = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];
        if (ignore.indexOf(e.key) !== -1 ||
            (e.ctrlKey || e.metaKey) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // Let it happen, don't do anything
            return;
        }
        let regEx = new RegExp(this.regexStr);
        if (!regEx.test(e.key)) {
            e.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OnlyPhoneDigitsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: OnlyPhoneDigitsDirective, selector: "[bizyOnlyPhoneDigits]", inputs: { onlyPhoneNumbers: ["bizyOnlyPhoneDigits", "onlyPhoneNumbers"] }, host: { listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OnlyPhoneDigitsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyOnlyPhoneDigits]'
                }]
        }], propDecorators: { onlyPhoneNumbers: [{
                type: Input,
                args: ['bizyOnlyPhoneDigits']
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25seS1waG9uZS1kaWdpdHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGlyZWN0aXZlcy9zcmMvbGliL29ubHktcGhvbmUtZGlnaXRzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSy9ELE1BQU0sT0FBTyx3QkFBd0I7SUFDRSxnQkFBZ0IsQ0FBVTtJQUUvRCxRQUFRLEdBQUcsYUFBYSxDQUFDO0lBRVksU0FBUyxDQUFDLEtBQW9CO1FBQ2pFLElBQUksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLEtBQUssRUFBRTtZQUNySCxPQUFNO1NBQ1A7UUFFRCxJQUFJLENBQUMsR0FBa0IsS0FBSyxDQUFDO1FBQzdCLE1BQU0sTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxSSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN4QixnQ0FBZ0M7WUFDaEMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQ3RDLG1DQUFtQztZQUNuQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7d0dBeEJVLHdCQUF3Qjs0RkFBeEIsd0JBQXdCOzs0RkFBeEIsd0JBQXdCO2tCQUhwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7aUJBQ2xDOzhCQUVzQyxnQkFBZ0I7c0JBQXBELEtBQUs7dUJBQUMscUJBQXFCO2dCQUlTLFNBQVM7c0JBQTdDLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tiaXp5T25seVBob25lRGlnaXRzXSdcbn0pXG5leHBvcnQgY2xhc3MgT25seVBob25lRGlnaXRzRGlyZWN0aXZlIHtcbiAgQElucHV0KCdiaXp5T25seVBob25lRGlnaXRzJykgcHVibGljIG9ubHlQaG9uZU51bWJlcnM6IGJvb2xlYW47XG5cbiAgcmVnZXhTdHIgPSAnXlswLTkqIytdKiQnO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKSBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub25seVBob25lTnVtYmVycyA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5vbmx5UGhvbmVOdW1iZXJzID09PSBudWxsIHx8IHRoaXMub25seVBob25lTnVtYmVycyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBlID0gPEtleWJvYXJkRXZlbnQ+ZXZlbnQ7XG4gICAgY29uc3QgaWdub3JlID0gWydCYWNrc3BhY2UnLCAnYmFja3NwYWNlJywgJ2RlbGV0ZScsICdEZWxldGUnLCAnVGFiJywgJ3RhYicsICdFc2NhcGUnLCAnZXNjYXBlJywgJ0VudGVyJywgJ2VudGVyJywgJ1N1YnRyYWN0JywgJ3N1YnRyYWN0J107XG4gICAgaWYgKGlnbm9yZS5pbmRleE9mKGUua2V5KSAhPT0gLTEgfHxcbiAgICAgIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB8fFxuICAgICAgLy8gQWxsb3c6IGhvbWUsIGVuZCwgbGVmdCwgcmlnaHRcbiAgICAgIChlLmtleUNvZGUgPj0gMzUgJiYgZS5rZXlDb2RlIDw9IDM5KSkge1xuICAgICAgLy8gTGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcmVnRXggPSBuZXcgUmVnRXhwKHRoaXMucmVnZXhTdHIpO1xuICAgIGlmICghcmVnRXgudGVzdChlLmtleSkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==