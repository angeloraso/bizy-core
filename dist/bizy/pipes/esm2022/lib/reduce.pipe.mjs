import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyReducePipe {
    transform(items, key) {
        if (!items) {
            return 0;
        }
        const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);
        return reduce.toFixed(2);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyReducePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyReducePipe, name: "bizyReduce" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyReducePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyReduce'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waXBlcy9zcmMvbGliL3JlZHVjZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sY0FBYztJQUN6QixTQUFTLENBQUMsS0FBcUIsRUFBRSxHQUFXO1FBQzFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLENBQUMsQ0FBQztTQUNWO1FBRUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFL0UsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7d0dBVFUsY0FBYztzR0FBZCxjQUFjOzs0RkFBZCxjQUFjO2tCQUgxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnYml6eVJlZHVjZSdcbn0pXG5leHBvcnQgY2xhc3MgQml6eVJlZHVjZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGl0ZW1zOiBBcnJheTx1bmtub3duPiwga2V5OiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGlmICghaXRlbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHJlZHVjZSA9IGl0ZW1zLm1hcChfZCA9PiBfZFtrZXldKS5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IGFjYyArIHZhbHVlLCAwKTtcblxuICAgIHJldHVybiByZWR1Y2UudG9GaXhlZCgyKTtcbiAgfVxufVxuIl19