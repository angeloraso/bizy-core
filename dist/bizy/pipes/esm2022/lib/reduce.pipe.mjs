import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class ReducePipe {
    transform(items, key) {
        if (!items) {
            return 0;
        }
        const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);
        return reduce.toFixed(2);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ReducePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ReducePipe, name: "bizyReduce" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ReducePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyReduce'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waXBlcy9zcmMvbGliL3JlZHVjZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sVUFBVTtJQUNyQixTQUFTLENBQUMsS0FBcUIsRUFBRSxHQUFXO1FBQzFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLENBQUMsQ0FBQztTQUNWO1FBRUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFL0UsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7d0dBVFUsVUFBVTtzR0FBVixVQUFVOzs0RkFBVixVQUFVO2tCQUh0QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnYml6eVJlZHVjZSdcbn0pXG5leHBvcnQgY2xhc3MgUmVkdWNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaXRlbXM6IEFycmF5PHVua25vd24+LCBrZXk6IHN0cmluZyk6IG51bWJlciB7XG4gICAgaWYgKCFpdGVtcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgY29uc3QgcmVkdWNlID0gaXRlbXMubWFwKF9kID0+IF9kW2tleV0pLnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4gYWNjICsgdmFsdWUsIDApO1xuXG4gICAgcmV0dXJuIHJlZHVjZS50b0ZpeGVkKDIpO1xuICB9XG59XG4iXX0=