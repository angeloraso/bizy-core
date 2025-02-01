import { FuseOptions } from './search.model';
import { Pipe } from '@angular/core';
import Fuse from 'fuse.js';
import * as i0 from "@angular/core";
export class BizySearchPipe {
    fuseOptions;
    fuse;
    items;
    perfectMatch = {
        threshold: 0.0
    };
    transform(items, search, keys, options) {
        if (typeof search === 'undefined' || search === null || search === '' || (Array.isArray(search) && search.length === 0)) {
            return items;
        }
        let _keys = [];
        if (keys) {
            if (Array.isArray(keys)) {
                _keys = keys;
            }
            else {
                _keys = [keys];
            }
        }
        if (!Array.isArray(search)) {
            search = [this.#removeAccentsAndDiacritics(String(search))];
        }
        else {
            search = search.map(_search => this.#removeAccentsAndDiacritics(String(_search)));
        }
        const getFn = (item, keys) => {
            const value = keys.reduce((acc, key) => acc && acc[key], item);
            return typeof value === 'string' ? this.#removeAccentsAndDiacritics(value) : value;
        };
        // Remove empty items
        search = search.filter(n => n);
        search.forEach(_keyword => {
            // Apply perfect match if "search" is a number or is an email
            const searchIsText = isNaN(Number(_keyword)) && !String(_keyword).includes('@');
            if (searchIsText) {
                this.fuseOptions = new FuseOptions({ ...options, getFn }, _keys);
                this.fuse = new Fuse(items, this.fuseOptions);
            }
            else {
                this.fuseOptions = new FuseOptions({ ...options, ...this.perfectMatch, getFn }, _keys);
                this.fuse = new Fuse(items, this.fuseOptions);
            }
            const fuseResult = this.fuse.search(String(_keyword));
            // Get each fuse result item
            items = fuseResult.map(match => match.item);
        });
        return items;
    }
    #removeAccentsAndDiacritics(search) {
        if (!search) {
            return '';
        }
        return search.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySearchPipe, name: "bizySearch" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySearch'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waXBlcy9zcmMvbGliL3NlYXJjaC9zZWFyY2gucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sSUFBSSxNQUFNLFNBQVMsQ0FBQzs7QUFJM0IsTUFBTSxPQUFPLGNBQWM7SUFDekIsV0FBVyxDQUFlO0lBQzFCLElBQUksQ0FBWTtJQUNoQixLQUFLLENBQWlCO0lBRWIsWUFBWSxHQUFHO1FBQ3RCLFNBQVMsRUFBRSxHQUFHO0tBQ2YsQ0FBQztJQUVGLFNBQVMsQ0FDUCxLQUFlLEVBQ2YsTUFBZ0QsRUFDaEQsSUFBNkIsRUFDN0IsT0FBc0I7UUFFdEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3ZILE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLEtBQUssR0FBa0IsRUFBRSxDQUFDO1FBRTlCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0wsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEI7U0FDRjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFCLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ2xGO1FBRUQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFPLEVBQUUsSUFBbUIsRUFBRSxFQUFFO1lBQzdDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQy9ELE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNyRixDQUFDLENBQUE7UUFFRCxxQkFBcUI7UUFDckIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hCLDZEQUE2RDtZQUM3RCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWhGLElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUMsR0FBRyxPQUFPLEVBQUUsS0FBSyxFQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMvQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDL0M7WUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQXVCLENBQUM7WUFDNUUsNEJBQTRCO1lBQzVCLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsMkJBQTJCLENBQUMsTUFBYztRQUN4QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQzt3R0FwRVUsY0FBYztzR0FBZCxjQUFjOzs0RkFBZCxjQUFjO2tCQUgxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUZ1c2VPcHRpb25zLCBJRnVzZVJlc3VsdCwgRnVzZU9wdGlvbnN9IGZyb20gJy4vc2VhcmNoLm1vZGVsJztcbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgRnVzZSBmcm9tICdmdXNlLmpzJztcbkBQaXBlKHtcbiAgbmFtZTogJ2JpenlTZWFyY2gnXG59KVxuZXhwb3J0IGNsYXNzIEJpenlTZWFyY2hQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGZ1c2VPcHRpb25zOiBJRnVzZU9wdGlvbnM7XG4gIGZ1c2U6IEZ1c2U8YW55PjtcbiAgaXRlbXM6IEFycmF5PHVua25vd24+O1xuXG4gIHJlYWRvbmx5IHBlcmZlY3RNYXRjaCA9IHtcbiAgICB0aHJlc2hvbGQ6IDAuMFxuICB9O1xuXG4gIHRyYW5zZm9ybTxUPihcbiAgICBpdGVtczogQXJyYXk8VD4sXG4gICAgc2VhcmNoOiBzdHJpbmcgfCBudW1iZXIgfCBBcnJheTxzdHJpbmcgfCBudW1iZXI+LFxuICAgIGtleXM/OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LFxuICAgIG9wdGlvbnM/OiBJRnVzZU9wdGlvbnNcbiAgKTogQXJyYXk8VD4ge1xuICAgIGlmICh0eXBlb2Ygc2VhcmNoID09PSAndW5kZWZpbmVkJyB8fCBzZWFyY2ggPT09IG51bGwgfHwgc2VhcmNoID09PSAnJyB8fCAoQXJyYXkuaXNBcnJheShzZWFyY2gpICYmIHNlYXJjaC5sZW5ndGggPT09IDApKSB7XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG4gICAgbGV0IF9rZXlzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICBpZiAoa2V5cykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5cykpIHtcbiAgICAgICAgX2tleXMgPSBrZXlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2tleXMgPSBba2V5c107XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNlYXJjaCkpIHtcbiAgICAgIHNlYXJjaCA9IFt0aGlzLiNyZW1vdmVBY2NlbnRzQW5kRGlhY3JpdGljcyhTdHJpbmcoc2VhcmNoKSldO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWFyY2ggPSBzZWFyY2gubWFwKF9zZWFyY2ggPT4gdGhpcy4jcmVtb3ZlQWNjZW50c0FuZERpYWNyaXRpY3MoU3RyaW5nKF9zZWFyY2gpKSlcbiAgICB9XG5cbiAgICBjb25zdCBnZXRGbiA9IChpdGVtOiBULCBrZXlzOiBBcnJheTxzdHJpbmc+KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGtleXMucmVkdWNlKChhY2MsIGtleSkgPT4gYWNjICYmIGFjY1trZXldLCBpdGVtKTtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdGhpcy4jcmVtb3ZlQWNjZW50c0FuZERpYWNyaXRpY3ModmFsdWUpIDogdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGVtcHR5IGl0ZW1zXG4gICAgc2VhcmNoID0gc2VhcmNoLmZpbHRlcihuID0+IG4pO1xuICAgIHNlYXJjaC5mb3JFYWNoKF9rZXl3b3JkID0+IHtcbiAgICAgIC8vIEFwcGx5IHBlcmZlY3QgbWF0Y2ggaWYgXCJzZWFyY2hcIiBpcyBhIG51bWJlciBvciBpcyBhbiBlbWFpbFxuICAgICAgY29uc3Qgc2VhcmNoSXNUZXh0ID0gaXNOYU4oTnVtYmVyKF9rZXl3b3JkKSkgJiYgIVN0cmluZyhfa2V5d29yZCkuaW5jbHVkZXMoJ0AnKTtcblxuICAgICAgaWYgKHNlYXJjaElzVGV4dCkge1xuICAgICAgICB0aGlzLmZ1c2VPcHRpb25zID0gbmV3IEZ1c2VPcHRpb25zKHsuLi5vcHRpb25zLCBnZXRGbn0sIF9rZXlzKTtcbiAgICAgICAgdGhpcy5mdXNlID0gbmV3IEZ1c2UoaXRlbXMsIHRoaXMuZnVzZU9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mdXNlT3B0aW9ucyA9IG5ldyBGdXNlT3B0aW9ucyh7Li4ub3B0aW9ucywgLi4udGhpcy5wZXJmZWN0TWF0Y2gsIGdldEZufSwgX2tleXMpO1xuICAgICAgICB0aGlzLmZ1c2UgPSBuZXcgRnVzZShpdGVtcywgdGhpcy5mdXNlT3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZ1c2VSZXN1bHQgPSB0aGlzLmZ1c2Uuc2VhcmNoKFN0cmluZyhfa2V5d29yZCkpIGFzIEFycmF5PElGdXNlUmVzdWx0PjtcbiAgICAgIC8vIEdldCBlYWNoIGZ1c2UgcmVzdWx0IGl0ZW1cbiAgICAgIGl0ZW1zID0gZnVzZVJlc3VsdC5tYXAobWF0Y2ggPT4gbWF0Y2guaXRlbSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuICAjcmVtb3ZlQWNjZW50c0FuZERpYWNyaXRpY3Moc2VhcmNoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghc2VhcmNoKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlYXJjaC5ub3JtYWxpemUoJ05GRCcpIS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XG4gIH1cbn1cbiJdfQ==