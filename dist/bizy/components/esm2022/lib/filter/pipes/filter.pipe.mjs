import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyFilterPipe {
    transform(items, property, states) {
        if (!items || items.length === 0) {
            return [];
        }
        if (!property || !states || states.length === 0) {
            return items;
        }
        const _selected = states.filter(_state => _state.selected);
        if (_selected.length === states.length) {
            return items;
        }
        let output = [];
        states.forEach(state => {
            if (!state.selected) {
                return;
            }
            const res = items.filter(_item => {
                let _state = _item;
                const nestedProperty = property.split('.');
                nestedProperty.forEach(_property => {
                    _state = _state[_property];
                });
                return _state === state.id;
            });
            output = output.concat(res);
        });
        return output;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, name: "bizyFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyFilter'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL3BpcGVzL2ZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sY0FBYztJQUN6QixTQUFTLENBQ1AsS0FBZSxFQUNmLFFBQWdCLEVBQ2hCLE1BQW1FO1FBRW5FLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0MsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUdELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDdEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNuQixPQUFPO2FBQ1I7WUFFRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMvQixJQUFJLE1BQU0sR0FBTSxLQUFLLENBQUM7Z0JBQ3RCLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2pDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUVILE9BQU8sTUFBTSxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7d0dBdkNVLGNBQWM7c0dBQWQsY0FBYzs7NEZBQWQsY0FBYztrQkFIMUIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsWUFBWTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2JpenlGaWx0ZXInXG59KVxuZXhwb3J0IGNsYXNzIEJpenlGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybTxUPihcbiAgICBpdGVtczogQXJyYXk8VD4sXG4gICAgcHJvcGVydHk6IHN0cmluZyxcbiAgICBzdGF0ZXM6IEFycmF5PHsgaWQ6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW47IHNlbGVjdGVkOiBib29sZWFuIH0+XG4gICk6IEFycmF5PFQ+IHtcbiAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmICghcHJvcGVydHkgfHwgIXN0YXRlcyB8fCBzdGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG5cbiAgICBjb25zdCBfc2VsZWN0ZWQgPSBzdGF0ZXMuZmlsdGVyKF9zdGF0ZSA9PiBfc3RhdGUuc2VsZWN0ZWQpO1xuICAgIGlmIChfc2VsZWN0ZWQubGVuZ3RoID09PSBzdGF0ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG4gICAgbGV0IG91dHB1dDogQXJyYXk8VD4gPSBbXTtcbiAgICBzdGF0ZXMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICBpZiAoIXN0YXRlLnNlbGVjdGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzID0gaXRlbXMuZmlsdGVyKF9pdGVtID0+IHtcbiAgICAgICAgbGV0IF9zdGF0ZTogVCA9IF9pdGVtO1xuICAgICAgICBjb25zdCBuZXN0ZWRQcm9wZXJ0eSA9IHByb3BlcnR5LnNwbGl0KCcuJyk7XG4gICAgICAgIG5lc3RlZFByb3BlcnR5LmZvckVhY2goX3Byb3BlcnR5ID0+IHtcbiAgICAgICAgICBfc3RhdGUgPSBfc3RhdGVbX3Byb3BlcnR5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIF9zdGF0ZSA9PT0gc3RhdGUuaWQ7XG4gICAgICB9KTtcbiAgICAgIG91dHB1dCA9IG91dHB1dC5jb25jYXQocmVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cbiJdfQ==