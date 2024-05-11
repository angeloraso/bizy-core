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
        if (!Array.isArray(keys)) {
            keys = [keys];
        }
        if (!Array.isArray(search)) {
            search = [String(search)];
        }
        let output = items;
        // Remove empty items
        search = search.filter(n => n);
        search.forEach(_keyword => {
            // Apply perfect match if "search" is a number or is an email
            const searchIsText = isNaN(Number(_keyword)) && !String(_keyword).includes('@');
            if (!searchIsText) {
                this.fuseOptions = new FuseOptions({ ...options, ...this.perfectMatch }, keys);
                this.fuse = new Fuse(output, this.fuseOptions);
            }
            else {
                this.fuseOptions = new FuseOptions(options, keys);
                this.fuse = new Fuse(output, this.fuseOptions);
            }
            const fuseResult = this.fuse.search(String(_keyword));
            // Get each fuse result item
            output = fuseResult.map(match => match.item);
        });
        return output;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waXBlcy9zcmMvbGliL3NlYXJjaC9zZWFyY2gucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sSUFBSSxNQUFNLFNBQVMsQ0FBQzs7QUFJM0IsTUFBTSxPQUFPLGNBQWM7SUFDekIsV0FBVyxDQUFlO0lBQzFCLElBQUksQ0FBWTtJQUNoQixLQUFLLENBQWlCO0lBRWIsWUFBWSxHQUFHO1FBQ3RCLFNBQVMsRUFBRSxHQUFHO0tBQ2YsQ0FBQztJQUVGLFNBQVMsQ0FDUCxLQUFlLEVBQ2YsTUFBZ0QsRUFDaEQsSUFBNkIsRUFDN0IsT0FBc0I7UUFFdEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3ZILE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNmO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDMUIsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDM0I7UUFFRCxJQUFJLE1BQU0sR0FBYSxLQUFLLENBQUM7UUFDN0IscUJBQXFCO1FBQ3JCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4Qiw2REFBNkQ7WUFDN0QsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVoRixJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFDLEVBQUUsSUFBcUIsQ0FBQyxDQUFDO2dCQUM5RixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFRLEVBQUUsSUFBcUIsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDaEQ7WUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQXVCLENBQUM7WUFDNUUsNEJBQTRCO1lBQzVCLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzt3R0EvQ1UsY0FBYztzR0FBZCxjQUFjOzs0RkFBZCxjQUFjO2tCQUgxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUZ1c2VPcHRpb25zLCBJRnVzZVJlc3VsdCwgRnVzZU9wdGlvbnN9IGZyb20gJy4vc2VhcmNoLm1vZGVsJztcbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgRnVzZSBmcm9tICdmdXNlLmpzJztcbkBQaXBlKHtcbiAgbmFtZTogJ2JpenlTZWFyY2gnXG59KVxuZXhwb3J0IGNsYXNzIEJpenlTZWFyY2hQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGZ1c2VPcHRpb25zOiBJRnVzZU9wdGlvbnM7XG4gIGZ1c2U6IEZ1c2U8YW55PjtcbiAgaXRlbXM6IEFycmF5PHVua25vd24+O1xuXG4gIHJlYWRvbmx5IHBlcmZlY3RNYXRjaCA9IHtcbiAgICB0aHJlc2hvbGQ6IDAuMFxuICB9O1xuXG4gIHRyYW5zZm9ybTxUPihcbiAgICBpdGVtczogQXJyYXk8VD4sXG4gICAgc2VhcmNoOiBzdHJpbmcgfCBudW1iZXIgfCBBcnJheTxzdHJpbmcgfCBudW1iZXI+LFxuICAgIGtleXM/OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LFxuICAgIG9wdGlvbnM/OiBJRnVzZU9wdGlvbnNcbiAgKTogQXJyYXk8VD4ge1xuICAgIGlmICh0eXBlb2Ygc2VhcmNoID09PSAndW5kZWZpbmVkJyB8fCBzZWFyY2ggPT09IG51bGwgfHwgc2VhcmNoID09PSAnJyB8fCAoQXJyYXkuaXNBcnJheShzZWFyY2gpICYmIHNlYXJjaC5sZW5ndGggPT09IDApKSB7XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGtleXMpKSB7XG4gICAgICBrZXlzID0gW2tleXNdO1xuICAgIH1cblxuICAgIGlmICghQXJyYXkuaXNBcnJheShzZWFyY2gpKSB7XG4gICAgICBzZWFyY2ggPSBbU3RyaW5nKHNlYXJjaCldO1xuICAgIH1cblxuICAgIGxldCBvdXRwdXQ6IEFycmF5PFQ+ID0gaXRlbXM7XG4gICAgLy8gUmVtb3ZlIGVtcHR5IGl0ZW1zXG4gICAgc2VhcmNoID0gc2VhcmNoLmZpbHRlcihuID0+IG4pO1xuICAgIHNlYXJjaC5mb3JFYWNoKF9rZXl3b3JkID0+IHtcbiAgICAgIC8vIEFwcGx5IHBlcmZlY3QgbWF0Y2ggaWYgXCJzZWFyY2hcIiBpcyBhIG51bWJlciBvciBpcyBhbiBlbWFpbFxuICAgICAgY29uc3Qgc2VhcmNoSXNUZXh0ID0gaXNOYU4oTnVtYmVyKF9rZXl3b3JkKSkgJiYgIVN0cmluZyhfa2V5d29yZCkuaW5jbHVkZXMoJ0AnKTtcblxuICAgICAgaWYgKCFzZWFyY2hJc1RleHQpIHtcbiAgICAgICAgdGhpcy5mdXNlT3B0aW9ucyA9IG5ldyBGdXNlT3B0aW9ucyh7Li4ub3B0aW9ucywgLi4udGhpcy5wZXJmZWN0TWF0Y2h9LCBrZXlzIGFzIEFycmF5PHN0cmluZz4pO1xuICAgICAgICB0aGlzLmZ1c2UgPSBuZXcgRnVzZShvdXRwdXQsIHRoaXMuZnVzZU9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mdXNlT3B0aW9ucyA9IG5ldyBGdXNlT3B0aW9ucyhvcHRpb25zISwga2V5cyBhcyBBcnJheTxzdHJpbmc+KTtcbiAgICAgICAgdGhpcy5mdXNlID0gbmV3IEZ1c2Uob3V0cHV0LCB0aGlzLmZ1c2VPcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZnVzZVJlc3VsdCA9IHRoaXMuZnVzZS5zZWFyY2goU3RyaW5nKF9rZXl3b3JkKSkgYXMgQXJyYXk8SUZ1c2VSZXN1bHQ+O1xuICAgICAgLy8gR2V0IGVhY2ggZnVzZSByZXN1bHQgaXRlbVxuICAgICAgb3V0cHV0ID0gZnVzZVJlc3VsdC5tYXAobWF0Y2ggPT4gbWF0Y2guaXRlbSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxufVxuIl19