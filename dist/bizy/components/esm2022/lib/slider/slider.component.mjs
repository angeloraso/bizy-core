import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
export class BizySliderComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySliderComponent, selector: "bizy-slider", inputs: { minLimit: "minLimit", maxLimit: "maxLimit", min: "min", max: "max" }, outputs: { onChange: "onChange" }, viewQueries: [{ propertyName: "fromSlider", first: true, predicate: ["fromSlider"], descendants: true }, { propertyName: "toSlider", first: true, predicate: ["toSlider"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"], dependencies: [{ kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.RangeValueAccessor, selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-slider', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-slider\">\n\n    <input \n        #fromSlider\n        class=\"bizy-slider__from\"\n        type=\"range\"\n        [ngModel]=\"_min\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setFromSlider($event)\"/>\n\n    <input \n        #toSlider\n        type=\"range\"\n        [ngStyle]=\"{'z-index': 2, background: 'linear-gradient(to right, var(--bizy-slider-color) 0%, var(--bizy-slider-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_min - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-range-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) ' + ((_max - minLimit) / (maxLimit - minLimit)) * 100 + '%, var(--bizy-slider-color) 100%)'}\"\n        [ngModel]=\"_max\"\n        [min]=\"minLimit\"\n        [max]=\"maxLimit\"\n        (ngModelChange)=\"setToSlider($event)\"/>\n</div>", styles: [":host{font-size:1rem}.bizy-slider{position:relative;min-height:1rem}.bizy-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:1.6rem;height:1.6rem;background-color:var(--bizy-slider-background-color);border-radius:50%;box-shadow:0 0 0 1px var(--bizy-slider-color);cursor:pointer}.bizy-slider input[type=range]::-webkit-slider-thumb:hover{background:#f7f7f7}.bizy-slider input[type=range]::-webkit-slider-thumb:active{box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color);-webkit-box-shadow:inset 0 0 3px var(--bizy-slider-accent-color),0 0 9px var(--bizy-slider-accent-color)}.bizy-slider input[type=range]{appearance:none;height:.2rem;width:calc(100% - .2rem);position:absolute;background-color:var(--bizy-slider-color);pointer-events:none}.bizy-slider__from{height:0;z-index:1}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9zbGlkZXIvc2xpZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDOzs7O0FBUXZCLE1BQU0sT0FBTyxtQkFBbUI7SUFDTCxVQUFVLENBQVk7SUFDeEIsUUFBUSxDQUFZO0lBQ2xDLFFBQVEsR0FBVyxDQUFDLENBQUM7SUFDckIsUUFBUSxHQUFXLEdBQUcsQ0FBQztJQUN0QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQThCLENBQUM7SUFFcEUsSUFBSSxHQUFXLENBQUMsQ0FBQztJQUNqQixJQUFJLEdBQVcsR0FBRyxDQUFDO0lBR25CLElBQWEsR0FBRyxDQUFDLEdBQVc7UUFDMUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUM3QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBQUEsQ0FBQztJQUVGLElBQWEsR0FBRyxDQUFDLEdBQVc7UUFDMUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUM3QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBQUEsQ0FBQztJQUVGLGFBQWEsQ0FBQyxLQUFhO1FBQ3pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUc7WUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2pEO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxHQUFJLEtBQUssQ0FBQztTQUNwQjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFHO1lBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUMvQzthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksR0FBSSxLQUFLLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQTtJQUN0RCxDQUFDO3dHQS9DVSxtQkFBbUI7NEZBQW5CLG1CQUFtQix1V0NoQmhDLDI3QkFtQk07OzRGREhPLG1CQUFtQjtrQkFOL0IsU0FBUzsrQkFDRSxhQUFhLG1CQUdOLHVCQUF1QixDQUFDLE1BQU07OEJBR3RCLFVBQVU7c0JBQWxDLFNBQVM7dUJBQUMsWUFBWTtnQkFDQSxRQUFRO3NCQUE5QixTQUFTO3VCQUFDLFVBQVU7Z0JBQ1osUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBTU0sR0FBRztzQkFBZixLQUFLO2dCQVFPLEdBQUc7c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1zbGlkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vc2xpZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zbGlkZXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5U2xpZGVyQ29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZCgnZnJvbVNsaWRlcicpIGZyb21TbGlkZXI6IEVsZW1lbnRSZWZcbiAgQFZpZXdDaGlsZCgndG9TbGlkZXInKSB0b1NsaWRlcjogRWxlbWVudFJlZlxuICBASW5wdXQoKSBtaW5MaW1pdDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgbWF4TGltaXQ6IG51bWJlciA9IDEwMDtcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7bWluOiBudW1iZXIsIG1heDogbnVtYmVyfT4oKTtcblxuICBfbWluOiBudW1iZXIgPSAwO1xuICBfbWF4OiBudW1iZXIgPSAxMDA7XG5cblxuICBASW5wdXQoKSBzZXQgbWluKG1pbjogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBtaW4gPT09ICd1bmRlZmluZWQnIHx8IG1pbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbWluID0gbWluO1xuICB9O1xuXG4gIEBJbnB1dCgpIHNldCBtYXgobWF4OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcgfHwgbWF4ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXggPSBtYXg7XG4gIH07XG5cbiAgc2V0RnJvbVNsaWRlcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlID4gdGhpcy5fbWF4ICkge1xuICAgICAgdGhpcy5fbWluID0gdGhpcy5fbWF4O1xuICAgICAgdGhpcy5mcm9tU2xpZGVyLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLl9tYXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21pbiA9ICB2YWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe21pbjogdGhpcy5fbWluLCBtYXg6IHRoaXMuX21heH0pXG4gIH1cblxuICBzZXRUb1NsaWRlcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDwgdGhpcy5fbWluICkge1xuICAgICAgdGhpcy5fbWF4ID0gdGhpcy5fbWluO1xuICAgICAgdGhpcy50b1NsaWRlci5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5fbWluO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tYXggPSAgdmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHttaW46IHRoaXMuX21pbiwgbWF4OiB0aGlzLl9tYXh9KVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYml6eS1zbGlkZXJcIj5cblxuICAgIDxpbnB1dCBcbiAgICAgICAgI2Zyb21TbGlkZXJcbiAgICAgICAgY2xhc3M9XCJiaXp5LXNsaWRlcl9fZnJvbVwiXG4gICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgIFtuZ01vZGVsXT1cIl9taW5cIlxuICAgICAgICBbbWluXT1cIm1pbkxpbWl0XCJcbiAgICAgICAgW21heF09XCJtYXhMaW1pdFwiXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInNldEZyb21TbGlkZXIoJGV2ZW50KVwiLz5cblxuICAgIDxpbnB1dCBcbiAgICAgICAgI3RvU2xpZGVyXG4gICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cInsnei1pbmRleCc6IDIsIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHZhcigtLWJpenktc2xpZGVyLWNvbG9yKSAwJSwgdmFyKC0tYml6eS1zbGlkZXItY29sb3IpICcgKyAoKF9taW4gLSBtaW5MaW1pdCkgLyAobWF4TGltaXQgLSBtaW5MaW1pdCkpICogMTAwICsgJyUsIHZhcigtLWJpenktc2xpZGVyLXJhbmdlLWNvbG9yKSAnICsgKChfbWluIC0gbWluTGltaXQpIC8gKG1heExpbWl0IC0gbWluTGltaXQpKSAqIDEwMCArICclLCB2YXIoLS1iaXp5LXNsaWRlci1yYW5nZS1jb2xvcikgJyArICgoX21heCAtIG1pbkxpbWl0KSAvIChtYXhMaW1pdCAtIG1pbkxpbWl0KSkgKiAxMDAgKyAnJSwgdmFyKC0tYml6eS1zbGlkZXItY29sb3IpICcgKyAoKF9tYXggLSBtaW5MaW1pdCkgLyAobWF4TGltaXQgLSBtaW5MaW1pdCkpICogMTAwICsgJyUsIHZhcigtLWJpenktc2xpZGVyLWNvbG9yKSAxMDAlKSd9XCJcbiAgICAgICAgW25nTW9kZWxdPVwiX21heFwiXG4gICAgICAgIFttaW5dPVwibWluTGltaXRcIlxuICAgICAgICBbbWF4XT1cIm1heExpbWl0XCJcbiAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwic2V0VG9TbGlkZXIoJGV2ZW50KVwiLz5cbjwvZGl2PiJdfQ==