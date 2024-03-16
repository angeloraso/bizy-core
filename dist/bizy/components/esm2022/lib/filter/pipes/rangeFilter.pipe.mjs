import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class RangeFilterPipe {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RangeFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: RangeFilterPipe, name: "bizyRangeFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RangeFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyRangeFilter'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2VGaWx0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvcGlwZXMvcmFuZ2VGaWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLGVBQWU7SUFDMUIsU0FBUyxDQUNQLEtBQWUsRUFDZixRQUFnQixFQUNoQixLQUFpRDtRQUVqRCxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQztRQUM5QixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQztRQUU5QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLElBQUksTUFBTSxHQUFRLEtBQUssQ0FBQztZQUN4QixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ2pDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDakIsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUVELE9BQU8sQ0FBQyxHQUFHLEtBQUssSUFBSSxJQUFJLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzt3R0FoQ1UsZUFBZTtzR0FBZixlQUFlOzs0RkFBZixlQUFlO2tCQUgzQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxpQkFBaUI7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdiaXp5UmFuZ2VGaWx0ZXInXG59KVxuZXhwb3J0IGNsYXNzIFJhbmdlRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm08VD4oXG4gICAgaXRlbXM6IEFycmF5PFQ+LFxuICAgIHByb3BlcnR5OiBzdHJpbmcsXG4gICAgcmFuZ2U6IHsgbWluOiBudW1iZXIgfCBudWxsOyBtYXg6IG51bWJlciB8IG51bGwgfVxuICApOiBBcnJheTxUPiB7XG4gICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAoIXByb3BlcnR5IHx8ICFyYW5nZSkge1xuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIGNvbnN0IG1pbiA9IHJhbmdlLm1pbiA/PyBudWxsO1xuICAgIGNvbnN0IG1heCA9IHJhbmdlLm1heCA/PyBudWxsO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gaXRlbXMuZmlsdGVyKF9pdGVtID0+IHtcbiAgICAgIGxldCBfdmFsdWU6IGFueSA9IF9pdGVtO1xuICAgICAgY29uc3QgbmVzdGVkUHJvcGVydHkgPSBwcm9wZXJ0eS5zcGxpdCgnLicpO1xuICAgICAgbmVzdGVkUHJvcGVydHkuZm9yRWFjaChfcHJvcGVydHkgPT4ge1xuICAgICAgICBfdmFsdWUgPSBfdmFsdWVbX3Byb3BlcnR5XTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaXNOYU4oX3ZhbHVlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAobWluID09PSBudWxsIHx8IF92YWx1ZSA+PSBtaW4pICYmIChtYXggPT09IG51bGwgfHwgX3ZhbHVlIDw9IG1heCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG59XG4iXX0=