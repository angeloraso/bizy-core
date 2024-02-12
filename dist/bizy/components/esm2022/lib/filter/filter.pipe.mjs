import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FilterPipe {
    transform(items, property, states) {
        if (!items || items.length === 0) {
            return [];
        }
        if (!property || !states || states.length === 0) {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, name: "bizyFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyFilter'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sVUFBVTtJQUNyQixTQUFTLENBQ1AsS0FBZSxFQUNmLFFBQWdCLEVBQ2hCLE1BQWdEO1FBRWhELElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0MsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNuQixPQUFPO2FBQ1I7WUFFRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMvQixJQUFJLE1BQU0sR0FBTSxLQUFLLENBQUM7Z0JBQ3RCLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2pDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUVILE9BQU8sTUFBTSxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7d0dBakNVLFVBQVU7c0dBQVYsVUFBVTs7NEZBQVYsVUFBVTtrQkFIdEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsWUFBWTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2JpenlGaWx0ZXInXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtPFQ+KFxuICAgIGl0ZW1zOiBBcnJheTxUPixcbiAgICBwcm9wZXJ0eTogc3RyaW5nLFxuICAgIHN0YXRlczogQXJyYXk8eyBpZDogc3RyaW5nOyBzZWxlY3RlZDogYm9vbGVhbiB9PlxuICApOiBBcnJheTxUPiB7XG4gICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAoIXByb3BlcnR5IHx8ICFzdGF0ZXMgfHwgc3RhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIGxldCBvdXRwdXQ6IEFycmF5PFQ+ID0gW107XG4gICAgc3RhdGVzLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgaWYgKCFzdGF0ZS5zZWxlY3RlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcyA9IGl0ZW1zLmZpbHRlcihfaXRlbSA9PiB7XG4gICAgICAgIGxldCBfc3RhdGU6IFQgPSBfaXRlbTtcbiAgICAgICAgY29uc3QgbmVzdGVkUHJvcGVydHkgPSBwcm9wZXJ0eS5zcGxpdCgnLicpO1xuICAgICAgICBuZXN0ZWRQcm9wZXJ0eS5mb3JFYWNoKF9wcm9wZXJ0eSA9PiB7XG4gICAgICAgICAgX3N0YXRlID0gX3N0YXRlW19wcm9wZXJ0eV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBfc3RhdGUgPT09IHN0YXRlLmlkO1xuICAgICAgfSk7XG4gICAgICBvdXRwdXQgPSBvdXRwdXQuY29uY2F0KHJlcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG59XG4iXX0=