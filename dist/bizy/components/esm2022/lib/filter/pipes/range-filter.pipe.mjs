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
        let itemsWithoutProperty = [];
        const output = items.filter(_item => {
            let _value = _item;
            const nestedProperty = property.split('.');
            for (let i = 0; i < nestedProperty.length; i++) {
                const _property = nestedProperty[i];
                if (typeof _value[_property] === 'undefined' || _value[_property] === null) {
                    itemsWithoutProperty.push(_item);
                    return false;
                }
                _value = _value[_property];
            }
            if (isNaN(_value)) {
                return false;
            }
            return (min === null || _value >= min) && (max === null || _value <= max);
        });
        return itemsWithoutProperty.length === items.length ? items : output;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL3BpcGVzL3JhbmdlLWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFNBQVMsQ0FDUCxLQUFlLEVBQ2YsUUFBZ0IsRUFDaEIsS0FBaUQ7UUFFakQsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNoQyxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7UUFDOUIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7UUFFOUIsSUFBSSxvQkFBb0IsR0FBYSxFQUFFLENBQUM7UUFFeEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQyxJQUFJLE1BQU0sR0FBUSxLQUFLLENBQUM7WUFDeEIsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUMxRSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pDLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUVELE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDNUI7WUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDakIsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUVELE9BQU8sQ0FBQyxHQUFHLEtBQUssSUFBSSxJQUFJLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDdkUsQ0FBQzt3R0F4Q1UsbUJBQW1CO3NHQUFuQixtQkFBbUI7OzRGQUFuQixtQkFBbUI7a0JBSC9CLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLGlCQUFpQjtpQkFDeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2JpenlSYW5nZUZpbHRlcidcbn0pXG5leHBvcnQgY2xhc3MgQml6eVJhbmdlRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm08VD4oXG4gICAgaXRlbXM6IEFycmF5PFQ+LFxuICAgIHByb3BlcnR5OiBzdHJpbmcsXG4gICAgcmFuZ2U6IHsgbWluOiBudW1iZXIgfCBudWxsOyBtYXg6IG51bWJlciB8IG51bGwgfVxuICApOiBBcnJheTxUPiB7XG4gICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAoIXByb3BlcnR5IHx8ICFyYW5nZSkge1xuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIGNvbnN0IG1pbiA9IHJhbmdlLm1pbiA/PyBudWxsO1xuICAgIGNvbnN0IG1heCA9IHJhbmdlLm1heCA/PyBudWxsO1xuXG4gICAgbGV0IGl0ZW1zV2l0aG91dFByb3BlcnR5OiBBcnJheTxUPiA9IFtdO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gaXRlbXMuZmlsdGVyKF9pdGVtID0+IHtcbiAgICAgIGxldCBfdmFsdWU6IGFueSA9IF9pdGVtO1xuICAgICAgY29uc3QgbmVzdGVkUHJvcGVydHkgPSBwcm9wZXJ0eS5zcGxpdCgnLicpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXN0ZWRQcm9wZXJ0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBfcHJvcGVydHkgPSBuZXN0ZWRQcm9wZXJ0eVtpXTtcbiAgICAgICAgaWYgKHR5cGVvZiBfdmFsdWVbX3Byb3BlcnR5XSA9PT0gJ3VuZGVmaW5lZCcgfHwgX3ZhbHVlW19wcm9wZXJ0eV0gPT09IG51bGwpIHtcbiAgICAgICAgICBpdGVtc1dpdGhvdXRQcm9wZXJ0eS5wdXNoKF9pdGVtKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBfdmFsdWUgPSBfdmFsdWVbX3Byb3BlcnR5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTmFOKF92YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKG1pbiA9PT0gbnVsbCB8fCBfdmFsdWUgPj0gbWluKSAmJiAobWF4ID09PSBudWxsIHx8IF92YWx1ZSA8PSBtYXgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGl0ZW1zV2l0aG91dFByb3BlcnR5Lmxlbmd0aCA9PT0gaXRlbXMubGVuZ3RoID8gaXRlbXMgOiBvdXRwdXQ7XG4gIH1cbn1cbiJdfQ==