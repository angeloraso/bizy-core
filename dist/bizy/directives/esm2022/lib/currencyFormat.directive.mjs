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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3lGb3JtYXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGlyZWN0aXZlcy9zcmMvbGliL2N1cnJlbmN5Rm9ybWF0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7O0FBS3RDLE1BQU0sT0FBTywyQkFBMkI7SUFNRTtJQUxYLGtCQUFrQixHQUFZLEtBQUssQ0FBQztJQUNuQyxPQUFPLEdBQXdCLEVBQUUsQ0FBQztJQUVoRSxvQkFBb0IsQ0FBZTtJQUVuQyxZQUF3QyxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUVsRSxRQUFRO1FBQ04sSUFBSSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssS0FBSyxFQUFFO1lBQzNILE9BQU07U0FDUDtRQUVELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRUQsUUFBUSxHQUFHLEdBQVcsRUFBRTtRQUN0QixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMvQyxDQUFDLENBQUE7SUFFRCxRQUFRLEdBQUcsQ0FBQyxLQUFhLEVBQVEsRUFBRTtRQUNqQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQTt3R0E5QlUsMkJBQTJCLGtCQU1sQixVQUFVOzRGQU5uQiwyQkFBMkI7OzRGQUEzQiwyQkFBMkI7a0JBSHZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtpQkFDakM7OzBCQU9jLE1BQU07MkJBQUMsVUFBVTs0Q0FMRCxrQkFBa0I7c0JBQTlDLEtBQUs7dUJBQUMsb0JBQW9CO2dCQUNHLE9BQU87c0JBQXBDLEtBQUs7dUJBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IEF1dG9OdW1lcmljIGZyb20gJ2F1dG9udW1lcmljJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JpenlDdXJyZW5jeUZvcm1hdF0nXG59KVxuZXhwb3J0IGNsYXNzIEJpenlDdXJyZW5jeUZvcm1hdERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCdiaXp5Q3VycmVuY3lGb3JtYXQnKSBiaXp5Q3VycmVuY3lGb3JtYXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdiaXp5Q3VycmVuY3lPcHRpb25zJykgb3B0aW9uczogQXV0b051bWVyaWMuT3B0aW9ucyA9IHt9O1xuXG4gICNhdXRvTnVtZXJpY0luc3RhbmNlITogQXV0b051bWVyaWM7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmJpenlDdXJyZW5jeUZvcm1hdCA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5iaXp5Q3VycmVuY3lGb3JtYXQgPT09IG51bGwgfHwgdGhpcy5iaXp5Q3VycmVuY3lGb3JtYXQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLiNhdXRvTnVtZXJpY0luc3RhbmNlID0gbmV3IEF1dG9OdW1lcmljKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldFZhbHVlID0gdGhpcy5nZXRWYWx1ZTtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRWYWx1ZSA9IHRoaXMuc2V0VmFsdWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy4jYXV0b051bWVyaWNJbnN0YW5jZSkge1xuICAgICAgdGhpcy4jYXV0b051bWVyaWNJbnN0YW5jZS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZSA9ICgpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiB0aGlzLiNhdXRvTnVtZXJpY0luc3RhbmNlLmdldE51bWJlcigpO1xuICB9XG5cbiAgc2V0VmFsdWUgPSAodmFsdWU6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIHRoaXMuI2F1dG9OdW1lcmljSW5zdGFuY2Uuc2V0KHZhbHVlKTtcbiAgfVxufVxuIl19