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
        if (keys && !Array.isArray(keys)) {
            keys = [keys];
        }
        else if (!keys) {
            keys = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waXBlcy9zcmMvbGliL3NlYXJjaC9zZWFyY2gucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sSUFBSSxNQUFNLFNBQVMsQ0FBQzs7QUFJM0IsTUFBTSxPQUFPLGNBQWM7SUFDekIsV0FBVyxDQUFlO0lBQzFCLElBQUksQ0FBWTtJQUNoQixLQUFLLENBQWlCO0lBRWIsWUFBWSxHQUFHO1FBQ3RCLFNBQVMsRUFBRSxHQUFHO0tBQ2YsQ0FBQztJQUVGLFNBQVMsQ0FDUCxLQUFlLEVBQ2YsTUFBZ0QsRUFDaEQsSUFBNkIsRUFDN0IsT0FBc0I7UUFFdEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3ZILE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDZjthQUFNLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDaEIsSUFBSSxHQUFHLEVBQUUsQ0FBQTtTQUNWO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDMUIsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDM0I7UUFFRCxJQUFJLE1BQU0sR0FBYSxLQUFLLENBQUM7UUFDN0IscUJBQXFCO1FBQ3JCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4Qiw2REFBNkQ7WUFDN0QsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVoRixJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFDLEVBQUUsSUFBcUIsQ0FBQyxDQUFDO2dCQUM5RixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFRLEVBQUUsSUFBcUIsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDaEQ7WUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQXVCLENBQUM7WUFDNUUsNEJBQTRCO1lBQzVCLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzt3R0FqRFUsY0FBYztzR0FBZCxjQUFjOzs0RkFBZCxjQUFjO2tCQUgxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUZ1c2VPcHRpb25zLCBJRnVzZVJlc3VsdCwgRnVzZU9wdGlvbnN9IGZyb20gJy4vc2VhcmNoLm1vZGVsJztcbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgRnVzZSBmcm9tICdmdXNlLmpzJztcbkBQaXBlKHtcbiAgbmFtZTogJ2JpenlTZWFyY2gnXG59KVxuZXhwb3J0IGNsYXNzIEJpenlTZWFyY2hQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGZ1c2VPcHRpb25zOiBJRnVzZU9wdGlvbnM7XG4gIGZ1c2U6IEZ1c2U8YW55PjtcbiAgaXRlbXM6IEFycmF5PHVua25vd24+O1xuXG4gIHJlYWRvbmx5IHBlcmZlY3RNYXRjaCA9IHtcbiAgICB0aHJlc2hvbGQ6IDAuMFxuICB9O1xuXG4gIHRyYW5zZm9ybTxUPihcbiAgICBpdGVtczogQXJyYXk8VD4sXG4gICAgc2VhcmNoOiBzdHJpbmcgfCBudW1iZXIgfCBBcnJheTxzdHJpbmcgfCBudW1iZXI+LFxuICAgIGtleXM/OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LFxuICAgIG9wdGlvbnM/OiBJRnVzZU9wdGlvbnNcbiAgKTogQXJyYXk8VD4ge1xuICAgIGlmICh0eXBlb2Ygc2VhcmNoID09PSAndW5kZWZpbmVkJyB8fCBzZWFyY2ggPT09IG51bGwgfHwgc2VhcmNoID09PSAnJyB8fCAoQXJyYXkuaXNBcnJheShzZWFyY2gpICYmIHNlYXJjaC5sZW5ndGggPT09IDApKSB7XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG4gICAgaWYgKGtleXMgJiYgIUFycmF5LmlzQXJyYXkoa2V5cykpIHtcbiAgICAgIGtleXMgPSBba2V5c107XG4gICAgfSBlbHNlIGlmICgha2V5cykge1xuICAgICAga2V5cyA9IFtdXG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNlYXJjaCkpIHtcbiAgICAgIHNlYXJjaCA9IFtTdHJpbmcoc2VhcmNoKV07XG4gICAgfVxuXG4gICAgbGV0IG91dHB1dDogQXJyYXk8VD4gPSBpdGVtcztcbiAgICAvLyBSZW1vdmUgZW1wdHkgaXRlbXNcbiAgICBzZWFyY2ggPSBzZWFyY2guZmlsdGVyKG4gPT4gbik7XG4gICAgc2VhcmNoLmZvckVhY2goX2tleXdvcmQgPT4ge1xuICAgICAgLy8gQXBwbHkgcGVyZmVjdCBtYXRjaCBpZiBcInNlYXJjaFwiIGlzIGEgbnVtYmVyIG9yIGlzIGFuIGVtYWlsXG4gICAgICBjb25zdCBzZWFyY2hJc1RleHQgPSBpc05hTihOdW1iZXIoX2tleXdvcmQpKSAmJiAhU3RyaW5nKF9rZXl3b3JkKS5pbmNsdWRlcygnQCcpO1xuXG4gICAgICBpZiAoIXNlYXJjaElzVGV4dCkge1xuICAgICAgICB0aGlzLmZ1c2VPcHRpb25zID0gbmV3IEZ1c2VPcHRpb25zKHsuLi5vcHRpb25zLCAuLi50aGlzLnBlcmZlY3RNYXRjaH0sIGtleXMgYXMgQXJyYXk8c3RyaW5nPik7XG4gICAgICAgIHRoaXMuZnVzZSA9IG5ldyBGdXNlKG91dHB1dCwgdGhpcy5mdXNlT3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZ1c2VPcHRpb25zID0gbmV3IEZ1c2VPcHRpb25zKG9wdGlvbnMhLCBrZXlzIGFzIEFycmF5PHN0cmluZz4pO1xuICAgICAgICB0aGlzLmZ1c2UgPSBuZXcgRnVzZShvdXRwdXQsIHRoaXMuZnVzZU9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmdXNlUmVzdWx0ID0gdGhpcy5mdXNlLnNlYXJjaChTdHJpbmcoX2tleXdvcmQpKSBhcyBBcnJheTxJRnVzZVJlc3VsdD47XG4gICAgICAvLyBHZXQgZWFjaCBmdXNlIHJlc3VsdCBpdGVtXG4gICAgICBvdXRwdXQgPSBmdXNlUmVzdWx0Lm1hcChtYXRjaCA9PiBtYXRjaC5pdGVtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG59XG4iXX0=