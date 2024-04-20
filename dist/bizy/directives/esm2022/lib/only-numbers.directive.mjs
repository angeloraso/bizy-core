import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyOnlyNumbersDirective {
    onlyNumbers;
    regexStr = '^[0-9]*$';
    onKeyDown(event) {
        if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
            return;
        }
        let e = event;
        const ignore = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];
        if (ignore.indexOf(e.key) !== -1 ||
            // Allow: Ctrl+A
            (e.key === 'a' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+C
            (e.key === 'c' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+V
            (e.key === 'v' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+X
            (e.key === 'x' && (e.ctrlKey || e.metaKey)) ||
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOnlyNumbersDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyOnlyNumbersDirective, selector: "[bizyOnlyNumbers]", inputs: { onlyNumbers: ["bizyOnlyNumbers", "onlyNumbers"] }, host: { listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOnlyNumbersDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyOnlyNumbers]'
                }]
        }], propDecorators: { onlyNumbers: [{
                type: Input,
                args: ['bizyOnlyNumbers']
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25seS1udW1iZXJzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RpcmVjdGl2ZXMvc3JjL2xpYi9vbmx5LW51bWJlcnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLL0QsTUFBTSxPQUFPLHdCQUF3QjtJQUNGLFdBQVcsQ0FBVTtJQUN0RCxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBRWUsU0FBUyxDQUFDLEtBQW9CO1FBQ2pFLElBQUksT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUN0RyxPQUFNO1NBQ1A7UUFFRCxJQUFJLENBQUMsR0FBa0IsS0FBSyxDQUFDO1FBQzdCLE1BQU0sTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxSSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixnQkFBZ0I7WUFDaEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLGdCQUFnQjtZQUNoQixDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsZ0JBQWdCO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxnQkFBZ0I7WUFDaEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLGdDQUFnQztZQUNoQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDdEMsbUNBQW1DO1lBQ25DLE9BQU87U0FDUjtRQUVELElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzt3R0E5QlUsd0JBQXdCOzRGQUF4Qix3QkFBd0I7OzRGQUF4Qix3QkFBd0I7a0JBSHBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDOUI7OEJBRWtDLFdBQVc7c0JBQTNDLEtBQUs7dUJBQUMsaUJBQWlCO2dCQUdhLFNBQVM7c0JBQTdDLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tiaXp5T25seU51bWJlcnNdJ1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5T25seU51bWJlcnNEaXJlY3RpdmUge1xuICBASW5wdXQoJ2JpenlPbmx5TnVtYmVycycpIHB1YmxpYyBvbmx5TnVtYmVyczogYm9vbGVhbjtcbiAgcmVnZXhTdHIgPSAnXlswLTldKiQnO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKSBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub25seU51bWJlcnMgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMub25seU51bWJlcnMgPT09IG51bGwgfHwgdGhpcy5vbmx5TnVtYmVycyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBlID0gPEtleWJvYXJkRXZlbnQ+ZXZlbnQ7XG4gICAgY29uc3QgaWdub3JlID0gWydCYWNrc3BhY2UnLCAnYmFja3NwYWNlJywgJ2RlbGV0ZScsICdEZWxldGUnLCAnVGFiJywgJ3RhYicsICdFc2NhcGUnLCAnZXNjYXBlJywgJ0VudGVyJywgJ2VudGVyJywgJ1N1YnRyYWN0JywgJ3N1YnRyYWN0J107XG4gICAgaWYgKGlnbm9yZS5pbmRleE9mKGUua2V5KSAhPT0gLTEgfHxcbiAgICAgIC8vIEFsbG93OiBDdHJsK0FcbiAgICAgIChlLmtleSA9PT0gJ2EnICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSkgfHxcbiAgICAgIC8vIEFsbG93OiBDdHJsK0NcbiAgICAgIChlLmtleSA9PT0gJ2MnICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSkgfHxcbiAgICAgIC8vIEFsbG93OiBDdHJsK1ZcbiAgICAgIChlLmtleSA9PT0gJ3YnICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSkgfHxcbiAgICAgIC8vIEFsbG93OiBDdHJsK1hcbiAgICAgIChlLmtleSA9PT0gJ3gnICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSkgfHxcbiAgICAgIC8vIEFsbG93OiBob21lLCBlbmQsIGxlZnQsIHJpZ2h0XG4gICAgICAoZS5rZXlDb2RlID49IDM1ICYmIGUua2V5Q29kZSA8PSAzOSkpIHtcbiAgICAgIC8vIExldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHJlZ0V4ID0gbmV3IFJlZ0V4cCh0aGlzLnJlZ2V4U3RyKTtcbiAgICBpZiAoIXJlZ0V4LnRlc3QoZS5rZXkpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=