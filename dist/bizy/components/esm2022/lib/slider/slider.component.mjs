import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
export class SliderComponent {
    fromSlider;
    toSlider;
    minLimit = 0;
    maxLimit = 100;
    onChange = new EventEmitter();
    _min = 0;
    _max = 100;
    set min(min) {
        if (typeof min === 'undefined' || min == null) {
            return;
        }
        this._min = min;
    }
    ;
    set max(max) {
        if (typeof max === 'undefined' || max == null) {
            return;
        }
        this._max = max;
    }
    ;
    setFromSlider(value) {
        if (value > this._max) {
            this._min = this._max;
            this.fromSlider.nativeElement.value = this._max;
        }
        else {
            this._min = value;
        }
        this.onChange.emit({ min: this._min, max: this._max });
    }
    setToSlider(value) {
        if (value < this._min) {
            this._max = this._min;
            this.toSlider.nativeElement.value = this._min;
        }
        else {
            this._max = value;
        }
        this.onChange.emit({ min: this._min, max: this._max });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: SliderComponent, selector: "bizy-slider", inputs: { minLimit: "minLimit", maxLimit: "maxLimit", min: "min", max: "max" }, outputs: { onChange: "onChange" }, viewQueries: [{ propertyName: "fromSlider", first: true, predicate: ["fromSlider"], descendants: true }, { propertyName: "toSlider", first: true, predicate: ["toSlider"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem;--bizy-slider-color: #666666;--bizy-slider-range-color: #16aa88;--bizy-slider-accent-color: #2484C6}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:#fff;border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:#fff;border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"], dependencies: [{ kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.RangeValueAccessor, selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-slider', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem;--bizy-slider-color: #666666;--bizy-slider-range-color: #16aa88;--bizy-slider-accent-color: #2484C6}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:#fff;border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:#fff;border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"] }]
        }], propDecorators: { fromSlider: [{
                type: ViewChild,
                args: ['fromSlider']
            }], toSlider: [{
                type: ViewChild,
                args: ['toSlider']
            }], minLimit: [{
                type: Input
            }], maxLimit: [{
                type: Input
            }], onChange: [{
                type: Output
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zbGlkZXIvc2xpZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDOzs7O0FBUXZCLE1BQU0sT0FBTyxlQUFlO0lBQ0QsVUFBVSxDQUFZO0lBQ3hCLFFBQVEsQ0FBWTtJQUNsQyxRQUFRLEdBQVcsQ0FBQyxDQUFDO0lBQ3JCLFFBQVEsR0FBVyxHQUFHLENBQUM7SUFDdEIsUUFBUSxHQUFHLElBQUksWUFBWSxFQUE4QixDQUFDO0lBRXBFLElBQUksR0FBVyxDQUFDLENBQUM7SUFDakIsSUFBSSxHQUFXLEdBQUcsQ0FBQztJQUduQixJQUFhLEdBQUcsQ0FBQyxHQUFXO1FBQzFCLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDN0MsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUFBLENBQUM7SUFFRixJQUFhLEdBQUcsQ0FBQyxHQUFXO1FBQzFCLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDN0MsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUFBLENBQUM7SUFFRixhQUFhLENBQUMsS0FBYTtRQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFHO1lBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNqRDthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksR0FBSSxLQUFLLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWE7UUFDdkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRztZQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDL0M7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEdBQUksS0FBSyxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUE7SUFDdEQsQ0FBQzt3R0EvQ1UsZUFBZTs0RkFBZixlQUFlLHVXQ2hCNUIsMjdCQW1CTTs7NEZESE8sZUFBZTtrQkFOM0IsU0FBUzsrQkFDRSxhQUFhLG1CQUdOLHVCQUF1QixDQUFDLE1BQU07OEJBR3RCLFVBQVU7c0JBQWxDLFNBQVM7dUJBQUMsWUFBWTtnQkFDQSxRQUFRO3NCQUE5QixTQUFTO3VCQUFDLFVBQVU7Z0JBQ1osUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBTU0sR0FBRztzQkFBZixLQUFLO2dCQVFPLEdBQUc7c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1zbGlkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vc2xpZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zbGlkZXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJDb21wb25lbnQge1xuICBAVmlld0NoaWxkKCdmcm9tU2xpZGVyJykgZnJvbVNsaWRlcjogRWxlbWVudFJlZlxuICBAVmlld0NoaWxkKCd0b1NsaWRlcicpIHRvU2xpZGVyOiBFbGVtZW50UmVmXG4gIEBJbnB1dCgpIG1pbkxpbWl0OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBtYXhMaW1pdDogbnVtYmVyID0gMTAwO1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHttaW46IG51bWJlciwgbWF4OiBudW1iZXJ9PigpO1xuXG4gIF9taW46IG51bWJlciA9IDA7XG4gIF9tYXg6IG51bWJlciA9IDEwMDtcblxuXG4gIEBJbnB1dCgpIHNldCBtaW4obWluOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIG1pbiA9PT0gJ3VuZGVmaW5lZCcgfHwgbWluID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9taW4gPSBtaW47XG4gIH07XG5cbiAgQElucHV0KCkgc2V0IG1heChtYXg6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbWF4ID09PSAndW5kZWZpbmVkJyB8fCBtYXggPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX21heCA9IG1heDtcbiAgfTtcblxuICBzZXRGcm9tU2xpZGVyKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPiB0aGlzLl9tYXggKSB7XG4gICAgICB0aGlzLl9taW4gPSB0aGlzLl9tYXg7XG4gICAgICB0aGlzLmZyb21TbGlkZXIubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuX21heDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbWluID0gIHZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7bWluOiB0aGlzLl9taW4sIG1heDogdGhpcy5fbWF4fSlcbiAgfVxuXG4gIHNldFRvU2xpZGVyKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPCB0aGlzLl9taW4gKSB7XG4gICAgICB0aGlzLl9tYXggPSB0aGlzLl9taW47XG4gICAgICB0aGlzLnRvU2xpZGVyLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLl9taW47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21heCA9ICB2YWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe21pbjogdGhpcy5fbWluLCBtYXg6IHRoaXMuX21heH0pXG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJiaXp5LXNsaWRlclwiPlxuXG4gICAgPGlucHV0IFxuICAgICAgICAjZnJvbVNsaWRlclxuICAgICAgICBjbGFzcz1cImJpenktc2xpZGVyX19mcm9tXCJcbiAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgW25nTW9kZWxdPVwiX21pblwiXG4gICAgICAgIFttaW5dPVwibWluTGltaXRcIlxuICAgICAgICBbbWF4XT1cIm1heExpbWl0XCJcbiAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwic2V0RnJvbVNsaWRlcigkZXZlbnQpXCIvPlxuXG4gICAgPGlucHV0IFxuICAgICAgICAjdG9TbGlkZXJcbiAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgW25nU3R5bGVdPVwieyd6LWluZGV4JzogMiwgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCh0byByaWdodCwgdmFyKC0tYml6eS1zbGlkZXItY29sb3IpIDAlLCB2YXIoLS1iaXp5LXNsaWRlci1jb2xvcikgJyArICgoX21pbiAtIG1pbkxpbWl0KSAvIChtYXhMaW1pdCAtIG1pbkxpbWl0KSkgKiAxMDAgKyAnJSwgdmFyKC0tYml6eS1zbGlkZXItcmFuZ2UtY29sb3IpICcgKyAoKF9taW4gLSBtaW5MaW1pdCkgLyAobWF4TGltaXQgLSBtaW5MaW1pdCkpICogMTAwICsgJyUsIHZhcigtLWJpenktc2xpZGVyLXJhbmdlLWNvbG9yKSAnICsgKChfbWF4IC0gbWluTGltaXQpIC8gKG1heExpbWl0IC0gbWluTGltaXQpKSAqIDEwMCArICclLCB2YXIoLS1iaXp5LXNsaWRlci1jb2xvcikgJyArICgoX21heCAtIG1pbkxpbWl0KSAvIChtYXhMaW1pdCAtIG1pbkxpbWl0KSkgKiAxMDAgKyAnJSwgdmFyKC0tYml6eS1zbGlkZXItY29sb3IpIDEwMCUpJ31cIlxuICAgICAgICBbbmdNb2RlbF09XCJfbWF4XCJcbiAgICAgICAgW21pbl09XCJtaW5MaW1pdFwiXG4gICAgICAgIFttYXhdPVwibWF4TGltaXRcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJzZXRUb1NsaWRlcigkZXZlbnQpXCIvPlxuPC9kaXY+Il19