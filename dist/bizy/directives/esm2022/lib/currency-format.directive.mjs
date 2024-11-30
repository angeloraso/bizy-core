import { Directive, ElementRef, Input, Inject } from '@angular/core';
import AutoNumeric from 'autonumeric';
import * as i0 from "@angular/core";
export class BizyCurrencyFormatDirective {
    elementRef;
    bizyCurrencyFormat = false;
    options = {};
    #autoNumericInstance;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (typeof this.bizyCurrencyFormat === 'undefined' || this.bizyCurrencyFormat === null || this.bizyCurrencyFormat === false) {
            return;
        }
        this.#autoNumericInstance = new AutoNumeric(this.elementRef.nativeElement, this.options);
        this.elementRef.nativeElement.getValue = this.getValue;
        this.elementRef.nativeElement.setValue = this.setValue;
    }
    ngOnDestroy() {
        if (this.#autoNumericInstance) {
            this.#autoNumericInstance.remove();
        }
    }
    getValue = () => {
        return this.#autoNumericInstance.getNumber();
    };
    setValue = (value) => {
        this.#autoNumericInstance.set(value);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCurrencyFormatDirective, deps: [{ token: ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BizyCurrencyFormatDirective, selector: "[bizyCurrencyFormat]", inputs: { bizyCurrencyFormat: "bizyCurrencyFormat", options: ["bizyCurrencyOptions", "options"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCurrencyFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bizyCurrencyFormat]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { bizyCurrencyFormat: [{
                type: Input,
                args: ['bizyCurrencyFormat']
            }], options: [{
                type: Input,
                args: ['bizyCurrencyOptions']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktZm9ybWF0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RpcmVjdGl2ZXMvc3JjL2xpYi9jdXJyZW5jeS1mb3JtYXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQzs7QUFLdEMsTUFBTSxPQUFPLDJCQUEyQjtJQU1FO0lBTFgsa0JBQWtCLEdBQVksS0FBSyxDQUFDO0lBQ25DLE9BQU8sR0FBd0IsRUFBRSxDQUFDO0lBRWhFLG9CQUFvQixDQUFlO0lBRW5DLFlBQXdDLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBRWxFLFFBQVE7UUFDTixJQUFJLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxLQUFLLEVBQUU7WUFDM0gsT0FBTTtTQUNQO1FBRUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6RCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRCxRQUFRLEdBQUcsR0FBVyxFQUFFO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9DLENBQUMsQ0FBQTtJQUVELFFBQVEsR0FBRyxDQUFDLEtBQWEsRUFBUSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFBO3dHQTlCVSwyQkFBMkIsa0JBTWxCLFVBQVU7NEZBTm5CLDJCQUEyQjs7NEZBQTNCLDJCQUEyQjtrQkFIdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2lCQUNqQzs7MEJBT2MsTUFBTTsyQkFBQyxVQUFVOzRDQUxELGtCQUFrQjtzQkFBOUMsS0FBSzt1QkFBQyxvQkFBb0I7Z0JBQ0csT0FBTztzQkFBcEMsS0FBSzt1QkFBQyxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgQXV0b051bWVyaWMgZnJvbSAnYXV0b251bWVyaWMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYml6eUN1cnJlbmN5Rm9ybWF0XSdcbn0pXG5leHBvcnQgY2xhc3MgQml6eUN1cnJlbmN5Rm9ybWF0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ2JpenlDdXJyZW5jeUZvcm1hdCcpIGJpenlDdXJyZW5jeUZvcm1hdDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2JpenlDdXJyZW5jeU9wdGlvbnMnKSBvcHRpb25zOiBBdXRvTnVtZXJpYy5PcHRpb25zID0ge307XG5cbiAgI2F1dG9OdW1lcmljSW5zdGFuY2UhOiBBdXRvTnVtZXJpYztcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuYml6eUN1cnJlbmN5Rm9ybWF0ID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmJpenlDdXJyZW5jeUZvcm1hdCA9PT0gbnVsbCB8fCB0aGlzLmJpenlDdXJyZW5jeUZvcm1hdCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuI2F1dG9OdW1lcmljSW5zdGFuY2UgPSBuZXcgQXV0b051bWVyaWModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0VmFsdWUgPSB0aGlzLmdldFZhbHVlO1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldFZhbHVlID0gdGhpcy5zZXRWYWx1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLiNhdXRvTnVtZXJpY0luc3RhbmNlKSB7XG4gICAgICB0aGlzLiNhdXRvTnVtZXJpY0luc3RhbmNlLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldFZhbHVlID0gKCk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIHRoaXMuI2F1dG9OdW1lcmljSW5zdGFuY2UuZ2V0TnVtYmVyKCk7XG4gIH1cblxuICBzZXRWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgdGhpcy4jYXV0b051bWVyaWNJbnN0YW5jZS5zZXQodmFsdWUpO1xuICB9XG59XG4iXX0=