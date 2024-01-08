import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class OnlyNumbersDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: OnlyNumbersDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.11", type: OnlyNumbersDirective, selector: "[bizyOnlyNumbers]", inputs: { onlyNumbers: ["bizyOnlyNumbers", "onlyNumbers"] }, host: { listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: OnlyNumbersDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25seS1udW1iZXJzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RpcmVjdGl2ZXMvc3JjL2xpYi9vbmx5LW51bWJlcnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLL0QsTUFBTSxPQUFPLG9CQUFvQjtJQUNFLFdBQVcsQ0FBVTtJQUN0RCxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBRWUsU0FBUyxDQUFDLEtBQW9CO1FBQ2pFLElBQUksT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUN0RyxPQUFNO1NBQ1A7UUFFRCxJQUFJLENBQUMsR0FBa0IsS0FBSyxDQUFDO1FBQzdCLE1BQU0sTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxSSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixnQkFBZ0I7WUFDaEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLGdCQUFnQjtZQUNoQixDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsZ0JBQWdCO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxnQkFBZ0I7WUFDaEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLGdDQUFnQztZQUNoQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDdEMsbUNBQW1DO1lBQ25DLE9BQU87U0FDUjtRQUVELElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzt3R0E5QlUsb0JBQW9COzRGQUFwQixvQkFBb0I7OzRGQUFwQixvQkFBb0I7a0JBSGhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDOUI7OEJBRWtDLFdBQVc7c0JBQTNDLEtBQUs7dUJBQUMsaUJBQWlCO2dCQUdhLFNBQVM7c0JBQTdDLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tiaXp5T25seU51bWJlcnNdJ1xufSlcbmV4cG9ydCBjbGFzcyBPbmx5TnVtYmVyc0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgnYml6eU9ubHlOdW1iZXJzJykgcHVibGljIG9ubHlOdW1iZXJzOiBib29sZWFuO1xuICByZWdleFN0ciA9ICdeWzAtOV0qJCc7XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vbmx5TnVtYmVycyA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5vbmx5TnVtYmVycyA9PT0gbnVsbCB8fCB0aGlzLm9ubHlOdW1iZXJzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGUgPSA8S2V5Ym9hcmRFdmVudD5ldmVudDtcbiAgICBjb25zdCBpZ25vcmUgPSBbJ0JhY2tzcGFjZScsICdiYWNrc3BhY2UnLCAnZGVsZXRlJywgJ0RlbGV0ZScsICdUYWInLCAndGFiJywgJ0VzY2FwZScsICdlc2NhcGUnLCAnRW50ZXInLCAnZW50ZXInLCAnU3VidHJhY3QnLCAnc3VidHJhY3QnXTtcbiAgICBpZiAoaWdub3JlLmluZGV4T2YoZS5rZXkpICE9PSAtMSB8fFxuICAgICAgLy8gQWxsb3c6IEN0cmwrQVxuICAgICAgKGUua2V5ID09PSAnYScgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpKSB8fFxuICAgICAgLy8gQWxsb3c6IEN0cmwrQ1xuICAgICAgKGUua2V5ID09PSAnYycgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpKSB8fFxuICAgICAgLy8gQWxsb3c6IEN0cmwrVlxuICAgICAgKGUua2V5ID09PSAndicgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpKSB8fFxuICAgICAgLy8gQWxsb3c6IEN0cmwrWFxuICAgICAgKGUua2V5ID09PSAneCcgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpKSB8fFxuICAgICAgLy8gQWxsb3c6IGhvbWUsIGVuZCwgbGVmdCwgcmlnaHRcbiAgICAgIChlLmtleUNvZGUgPj0gMzUgJiYgZS5rZXlDb2RlIDw9IDM5KSkge1xuICAgICAgLy8gTGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcmVnRXggPSBuZXcgUmVnRXhwKHRoaXMucmVnZXhTdHIpO1xuICAgIGlmICghcmVnRXgudGVzdChlLmtleSkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==