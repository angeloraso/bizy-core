import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyRangeFilterPipe {
    transform(items, property, range) {
        if (!items || items.length === 0) {
            return [];
        }
        if (!property || !range) {
            return items;
        }
        const min = range.min ?? null;
        const max = range.max ?? null;
        const output = items.filter(_item => {
            let _value = _item;
            const nestedProperty = property.split('.');
            nestedProperty.forEach(_property => {
                _value = _value[_property];
            });
            if (isNaN(_value)) {
                return false;
            }
            return (min === null || _value >= min) && (max === null || _value <= max);
        });
        return output;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRangeFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyRangeFilterPipe, name: "bizyRangeFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyRangeFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyRangeFilter'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2VGaWx0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvcGlwZXMvcmFuZ2VGaWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixTQUFTLENBQ1AsS0FBZSxFQUNmLFFBQWdCLEVBQ2hCLEtBQWlEO1FBRWpELElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO1FBQzlCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO1FBRTlCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEMsSUFBSSxNQUFNLEdBQVEsS0FBSyxDQUFDO1lBQ3hCLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDakMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNqQixPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsT0FBTyxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxNQUFNLElBQUksR0FBRyxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO3dHQWhDVSxtQkFBbUI7c0dBQW5CLG1CQUFtQjs7NEZBQW5CLG1CQUFtQjtrQkFIL0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsaUJBQWlCO2lCQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnYml6eVJhbmdlRmlsdGVyJ1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5UmFuZ2VGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybTxUPihcbiAgICBpdGVtczogQXJyYXk8VD4sXG4gICAgcHJvcGVydHk6IHN0cmluZyxcbiAgICByYW5nZTogeyBtaW46IG51bWJlciB8IG51bGw7IG1heDogbnVtYmVyIHwgbnVsbCB9XG4gICk6IEFycmF5PFQ+IHtcbiAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmICghcHJvcGVydHkgfHwgIXJhbmdlKSB7XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG4gICAgY29uc3QgbWluID0gcmFuZ2UubWluID8/IG51bGw7XG4gICAgY29uc3QgbWF4ID0gcmFuZ2UubWF4ID8/IG51bGw7XG5cbiAgICBjb25zdCBvdXRwdXQgPSBpdGVtcy5maWx0ZXIoX2l0ZW0gPT4ge1xuICAgICAgbGV0IF92YWx1ZTogYW55ID0gX2l0ZW07XG4gICAgICBjb25zdCBuZXN0ZWRQcm9wZXJ0eSA9IHByb3BlcnR5LnNwbGl0KCcuJyk7XG4gICAgICBuZXN0ZWRQcm9wZXJ0eS5mb3JFYWNoKF9wcm9wZXJ0eSA9PiB7XG4gICAgICAgIF92YWx1ZSA9IF92YWx1ZVtfcHJvcGVydHldO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChpc05hTihfdmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChtaW4gPT09IG51bGwgfHwgX3ZhbHVlID49IG1pbikgJiYgKG1heCA9PT0gbnVsbCB8fCBfdmFsdWUgPD0gbWF4KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cbiJdfQ==