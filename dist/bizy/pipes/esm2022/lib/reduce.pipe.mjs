import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyReducePipe {
    transform(items, key, fixedTo = 2) {
        if (!items || items.length === 0) {
            return 0;
        }
        if (!key) {
            const reduce = items.reduce((acc, value) => acc + value, 0);
            return Number(reduce.toFixed(fixedTo));
        }
        const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);
        return Number(reduce.toFixed(fixedTo));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waXBlcy9zcmMvbGliL3JlZHVjZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sY0FBYztJQUN6QixTQUFTLENBQUMsS0FBcUIsRUFBRSxHQUFXLEVBQUUsVUFBa0IsQ0FBQztRQUMvRCxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsTUFBTSxNQUFNLEdBQW1CLEtBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUN4QztRQUVELE1BQU0sTUFBTSxHQUFtQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVoRyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQzt3R0FkVSxjQUFjO3NHQUFkLGNBQWM7OzRGQUFkLGNBQWM7a0JBSDFCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFlBQVk7aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdiaXp5UmVkdWNlJ1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5UmVkdWNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaXRlbXM6IEFycmF5PHVua25vd24+LCBrZXk6IHN0cmluZywgZml4ZWRUbzogbnVtYmVyID0gMik6IG51bWJlciB7XG4gICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmICgha2V5KSB7XG4gICAgICBjb25zdCByZWR1Y2UgPSAoPEFycmF5PG51bWJlcj4+aXRlbXMpLnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4gYWNjICsgdmFsdWUsIDApO1xuICAgICAgcmV0dXJuIE51bWJlcihyZWR1Y2UudG9GaXhlZChmaXhlZFRvKSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVkdWNlID0gKDxBcnJheTxudW1iZXI+Pml0ZW1zLm1hcChfZCA9PiBfZFtrZXldKSkucmVkdWNlKChhY2MsIHZhbHVlKSA9PiBhY2MgKyB2YWx1ZSwgMCk7XG5cbiAgICByZXR1cm4gTnVtYmVyKHJlZHVjZS50b0ZpeGVkKGZpeGVkVG8pKTtcbiAgfVxufVxuIl19