import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyAveragePipe {
    transform(items, key, fixedTo = 2) {
        if (!items || items.length === 0) {
            return 0;
        }
        if (!key) {
            const reduce = items.reduce((acc, value) => acc + value, 0);
            return Number((reduce / items.length).toFixed(fixedTo));
        }
        const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);
        return Number((reduce / items.length).toFixed(fixedTo));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAveragePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyAveragePipe, name: "bizyAverage" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyAveragePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyAverage'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZlcmFnZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlwZXMvc3JjL2xpYi9hdmVyYWdlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBS3BELE1BQU0sT0FBTyxlQUFlO0lBQzFCLFNBQVMsQ0FBQyxLQUFxQixFQUFFLEdBQVcsRUFBRSxVQUFrQixDQUFDO1FBQy9ELElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixNQUFNLE1BQU0sR0FBbUIsS0FBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0UsT0FBTyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsTUFBTSxNQUFNLEdBQW1CLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLE9BQU8sTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO3dHQWJVLGVBQWU7c0dBQWYsZUFBZTs7NEZBQWYsZUFBZTtrQkFIM0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2JpenlBdmVyYWdlJ1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5QXZlcmFnZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGl0ZW1zOiBBcnJheTx1bmtub3duPiwga2V5OiBzdHJpbmcsIGZpeGVkVG86IG51bWJlciA9IDIpOiBudW1iZXIge1xuICAgIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAoIWtleSkge1xuICAgICAgY29uc3QgcmVkdWNlID0gKDxBcnJheTxudW1iZXI+Pml0ZW1zKS5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IGFjYyArIHZhbHVlLCAwKTtcbiAgICAgIHJldHVybiBOdW1iZXIoKHJlZHVjZSAvIGl0ZW1zLmxlbmd0aCkudG9GaXhlZChmaXhlZFRvKSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVkdWNlID0gKDxBcnJheTxudW1iZXI+Pml0ZW1zLm1hcChfZCA9PiBfZFtrZXldKSkucmVkdWNlKChhY2MsIHZhbHVlKSA9PiBhY2MgKyB2YWx1ZSwgMCk7XG4gICAgcmV0dXJuIE51bWJlcigocmVkdWNlIC8gaXRlbXMubGVuZ3RoKS50b0ZpeGVkKGZpeGVkVG8pKTtcbiAgfVxufVxuIl19