import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyOnlyPhoneDigitsDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOnlyPhoneDigitsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyOnlyPhoneDigitsDirective, selector: "[bizyOnlyPhoneDigits]", inputs: { onlyPhoneNumbers: ["bizyOnlyPhoneDigits", "onlyPhoneNumbers"] }, host: { listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOnlyPhoneDigitsDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25seS1waG9uZS1kaWdpdHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGlyZWN0aXZlcy9zcmMvbGliL29ubHktcGhvbmUtZGlnaXRzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSy9ELE1BQU0sT0FBTyw0QkFBNEI7SUFDRixnQkFBZ0IsQ0FBVTtJQUUvRCxRQUFRLEdBQUcsYUFBYSxDQUFDO0lBRVksU0FBUyxDQUFDLEtBQW9CO1FBQ2pFLElBQUksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLEtBQUssRUFBRTtZQUNySCxPQUFNO1NBQ1A7UUFFRCxJQUFJLENBQUMsR0FBa0IsS0FBSyxDQUFDO1FBQzdCLE1BQU0sTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxSSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN4QixnQ0FBZ0M7WUFDaEMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQ3RDLG1DQUFtQztZQUNuQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7d0dBeEJVLDRCQUE0Qjs0RkFBNUIsNEJBQTRCOzs0RkFBNUIsNEJBQTRCO2tCQUh4QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7aUJBQ2xDOzhCQUVzQyxnQkFBZ0I7c0JBQXBELEtBQUs7dUJBQUMscUJBQXFCO2dCQUlTLFNBQVM7c0JBQTdDLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tiaXp5T25seVBob25lRGlnaXRzXSdcbn0pXG5leHBvcnQgY2xhc3MgQml6eU9ubHlQaG9uZURpZ2l0c0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgnYml6eU9ubHlQaG9uZURpZ2l0cycpIHB1YmxpYyBvbmx5UGhvbmVOdW1iZXJzOiBib29sZWFuO1xuXG4gIHJlZ2V4U3RyID0gJ15bMC05KiMrXSokJztcblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSkgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9ubHlQaG9uZU51bWJlcnMgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMub25seVBob25lTnVtYmVycyA9PT0gbnVsbCB8fCB0aGlzLm9ubHlQaG9uZU51bWJlcnMgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgZSA9IDxLZXlib2FyZEV2ZW50PmV2ZW50O1xuICAgIGNvbnN0IGlnbm9yZSA9IFsnQmFja3NwYWNlJywgJ2JhY2tzcGFjZScsICdkZWxldGUnLCAnRGVsZXRlJywgJ1RhYicsICd0YWInLCAnRXNjYXBlJywgJ2VzY2FwZScsICdFbnRlcicsICdlbnRlcicsICdTdWJ0cmFjdCcsICdzdWJ0cmFjdCddO1xuICAgIGlmIChpZ25vcmUuaW5kZXhPZihlLmtleSkgIT09IC0xIHx8XG4gICAgICAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkgfHxcbiAgICAgIC8vIEFsbG93OiBob21lLCBlbmQsIGxlZnQsIHJpZ2h0XG4gICAgICAoZS5rZXlDb2RlID49IDM1ICYmIGUua2V5Q29kZSA8PSAzOSkpIHtcbiAgICAgIC8vIExldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHJlZ0V4ID0gbmV3IFJlZ0V4cCh0aGlzLnJlZ2V4U3RyKTtcbiAgICBpZiAoIXJlZ0V4LnRlc3QoZS5rZXkpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=