import { Directive, HostListener, Inject, Input, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyOnlyNumbersDirective {
    elementRef;
    onlyNumbers;
    #regex = new RegExp(/^-?\d*[.,]?\d*$/);
    #specialKeys = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    onInput(event) {
        if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
            return;
        }
        const inputElement = this.elementRef.nativeElement;
        const value = inputElement.value;
        // Format and validate input value
        const formattedValue = this.#formatValue(value);
        if (formattedValue !== value) {
            inputElement.value = formattedValue;
            event.stopImmediatePropagation();
        }
    }
    onKeyDown(event) {
        if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
            return;
        }
        // Allow special keys
        if (this.#specialKeys.indexOf(event.key) !== -1 ||
            // Allow: Ctrl+A
            (event.key === 'a' && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+C
            (event.key === 'c' && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+V
            (event.key === 'v' && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+X
            (event.key === 'x' && (event.ctrlKey || event.metaKey)) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // Let it happen, don't do anything
            return;
        }
        // Allow numbers and decimals
        let current = this.elementRef.nativeElement.value;
        let next = current.concat(event.key);
        if (next && !String(next).match(this.#regex)) {
            event.preventDefault();
        }
    }
    #formatValue(value) {
        // Remove all non-numeric characters except . , and -
        let newValue = value.replace(/[^0-9.,-]/g, '');
        // Ensure that '-' is only at the beginning and only once
        if (newValue.indexOf('-') !== newValue.lastIndexOf('-') || (newValue.indexOf('-') !== 0)) {
            newValue = newValue.replace(/-+/g, ''); // Remove all '-' characters
        }
        // Ensure only one '-' at the beginning
        if (newValue.startsWith('-') && newValue.indexOf('-') > 0) {
            newValue = '-' + newValue.replace(/^-+/, ''); // Remove additional '-' characters
        }
        // Ensure only one decimal separator
        const parts = newValue.split(/[,\.]/);
        if (parts.length > 2) {
            newValue = `${parts[0]}.${parts.slice(1).join('')}`;
        }
        return newValue;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOnlyNumbersDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyOnlyNumbersDirective, selector: "[bizyOnlyNumbers]", inputs: { onlyNumbers: ["bizyOnlyNumbers", "onlyNumbers"] }, host: { listeners: { "input": "onInput($event)", "keydown": "onKeyDown($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyOnlyNumbersDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyOnlyNumbers]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { onlyNumbers: [{
                type: Input,
                args: ['bizyOnlyNumbers']
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25seS1udW1iZXJzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RpcmVjdGl2ZXMvc3JjL2xpYi9vbmx5LW51bWJlcnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUtuRixNQUFNLE9BQU8sd0JBQXdCO0lBS0s7SUFKUCxXQUFXLENBQVU7SUFDdEQsTUFBTSxHQUFXLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDL0MsWUFBWSxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUUxSSxZQUF3QyxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUUsQ0FBQztJQUdqRSxPQUFPLENBQUMsS0FBWTtRQUNsQixJQUFJLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7WUFDdEcsT0FBTTtTQUNQO1FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFpQyxDQUFDO1FBQ3ZFLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFakMsa0NBQWtDO1FBQ2xDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFO1lBQzVCLFlBQVksQ0FBQyxLQUFLLEdB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QUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDckQ7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO3dHQTNFVSx3QkFBd0Isa0JBS2YsVUFBVTs0RkFMbkIsd0JBQXdCOzs0RkFBeEIsd0JBQXdCO2tCQUhwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7aUJBQzlCOzswQkFNYyxNQUFNOzJCQUFDLFVBQVU7NENBSkcsV0FBVztzQkFBM0MsS0FBSzt1QkFBQyxpQkFBaUI7Z0JBT3hCLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBaUJJLFNBQVM7c0JBQTdDLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JpenlPbmx5TnVtYmVyc10nXG59KVxuZXhwb3J0IGNsYXNzIEJpenlPbmx5TnVtYmVyc0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgnYml6eU9ubHlOdW1iZXJzJykgcHVibGljIG9ubHlOdW1iZXJzOiBib29sZWFuO1xuICAjcmVnZXg6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoL14tP1xcZCpbLixdP1xcZCokLyk7XG4gICNzcGVjaWFsS2V5cyA9IFsnQmFja3NwYWNlJywgJ2JhY2tzcGFjZScsICdkZWxldGUnLCAnRGVsZXRlJywgJ1RhYicsICd0YWInLCAnRXNjYXBlJywgJ2VzY2FwZScsICdFbnRlcicsICdlbnRlcicsICdTdWJ0cmFjdCcsICdzdWJ0cmFjdCddO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKXt9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICBvbklucHV0KGV2ZW50OiBFdmVudCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vbmx5TnVtYmVycyA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5vbmx5TnVtYmVycyA9PT0gbnVsbCB8fCB0aGlzLm9ubHlOdW1iZXJzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgdmFsdWUgPSBpbnB1dEVsZW1lbnQudmFsdWU7XG5cbiAgICAvLyBGb3JtYXQgYW5kIHZhbGlkYXRlIGlucHV0IHZhbHVlXG4gICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLiNmb3JtYXRWYWx1ZSh2YWx1ZSk7XG4gICAgaWYgKGZvcm1hdHRlZFZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gZm9ybWF0dGVkVmFsdWU7XG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cbiAgXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKSBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub25seU51bWJlcnMgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMub25seU51bWJlcnMgPT09IG51bGwgfHwgdGhpcy5vbmx5TnVtYmVycyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIEFsbG93IHNwZWNpYWwga2V5c1xuICAgIGlmICh0aGlzLiNzcGVjaWFsS2V5cy5pbmRleE9mKGV2ZW50LmtleSkgIT09IC0xIHx8XG4gICAgICAvLyBBbGxvdzogQ3RybCtBXG4gICAgICAoZXZlbnQua2V5ID09PSAnYScgJiYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkpIHx8XG4gICAgICAvLyBBbGxvdzogQ3RybCtDXG4gICAgICAoZXZlbnQua2V5ID09PSAnYycgJiYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkpIHx8XG4gICAgICAvLyBBbGxvdzogQ3RybCtWXG4gICAgICAoZXZlbnQua2V5ID09PSAndicgJiYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkpIHx8XG4gICAgICAvLyBBbGxvdzogQ3RybCtYXG4gICAgICAoZXZlbnQua2V5ID09PSAneCcgJiYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkpIHx8XG4gICAgICAvLyBBbGxvdzogaG9tZSwgZW5kLCBsZWZ0LCByaWdodFxuICAgICAgKGV2ZW50LmtleUNvZGUgPj0gMzUgJiYgZXZlbnQua2V5Q29kZSA8PSAzOSkpIHtcbiAgICAgIC8vIExldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgbnVtYmVycyBhbmQgZGVjaW1hbHNcbiAgICBsZXQgY3VycmVudDogc3RyaW5nID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgbGV0IG5leHQ6IHN0cmluZyA9IGN1cnJlbnQuY29uY2F0KGV2ZW50LmtleSk7XG5cbiAgICBpZiAobmV4dCAmJiAhU3RyaW5nKG5leHQpLm1hdGNoKHRoaXMuI3JlZ2V4KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICAjZm9ybWF0VmFsdWUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gUmVtb3ZlIGFsbCBub24tbnVtZXJpYyBjaGFyYWN0ZXJzIGV4Y2VwdCAuICwgYW5kIC1cbiAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXjAtOS4sLV0vZywgJycpO1xuXG4gICAgLy8gRW5zdXJlIHRoYXQgJy0nIGlzIG9ubHkgYXQgdGhlIGJlZ2lubmluZyBhbmQgb25seSBvbmNlXG4gICAgaWYgKG5ld1ZhbHVlLmluZGV4T2YoJy0nKSAhPT0gbmV3VmFsdWUubGFzdEluZGV4T2YoJy0nKSB8fCAobmV3VmFsdWUuaW5kZXhPZignLScpICE9PSAwKSkge1xuICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZS5yZXBsYWNlKC8tKy9nLCAnJyk7IC8vIFJlbW92ZSBhbGwgJy0nIGNoYXJhY3RlcnNcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgb25seSBvbmUgJy0nIGF0IHRoZSBiZWdpbm5pbmdcbiAgICBpZiAobmV3VmFsdWUuc3RhcnRzV2l0aCgnLScpICYmIG5ld1ZhbHVlLmluZGV4T2YoJy0nKSA+IDApIHtcbiAgICAgIG5ld1ZhbHVlID0gJy0nICsgbmV3VmFsdWUucmVwbGFjZSgvXi0rLywgJycpOyAvLyBSZW1vdmUgYWRkaXRpb25hbCAnLScgY2hhcmFjdGVyc1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSBvbmx5IG9uZSBkZWNpbWFsIHNlcGFyYXRvclxuICAgIGNvbnN0IHBhcnRzID0gbmV3VmFsdWUuc3BsaXQoL1ssXFwuXS8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPiAyKSB7XG4gICAgICBuZXdWYWx1ZSA9IGAke3BhcnRzWzBdfS4ke3BhcnRzLnNsaWNlKDEpLmpvaW4oJycpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xuICB9XG59XG4iXX0=