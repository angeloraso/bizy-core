import { FuseOptions } from './search.model';
import { Pipe } from '@angular/core';
import Fuse from 'fuse.js';
import * as i0 from "@angular/core";
export class BizySearchPipe {
    fuseOptions;
    fuse;
    elements;
    searchIsText;
    perfectMatch = {
        ignoreLocation: true,
        threshold: 0.0
    };
    transform(elements, search, keys, options) {
        if (!search || search.length === 0) {
            return elements;
        }
        if (typeof search === 'string' || search instanceof String) {
            // @ts-ignore
            search = [search];
        }
        let output = elements;
        // Remove empty elements
        search = search.filter(n => n);
        search.forEach(_keyword => {
            // Apply perfect match if "search" is a number or is an email
            this.searchIsText = isNaN(Number(_keyword)) && !_keyword.includes('@');
            if (!this.searchIsText) {
                this.fuseOptions = new FuseOptions({ ...options, ...this.perfectMatch }, keys);
                this.fuse = new Fuse(output, this.fuseOptions);
            }
            else {
                this.fuseOptions = new FuseOptions(options, keys);
                this.fuse = new Fuse(output, this.fuseOptions);
            }
            const fuseResult = this.fuse.search(_keyword);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waXBlcy9zcmMvbGliL3NlYXJjaC9zZWFyY2gucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sSUFBSSxNQUFNLFNBQVMsQ0FBQzs7QUFJM0IsTUFBTSxPQUFPLGNBQWM7SUFDekIsV0FBVyxDQUFlO0lBQzFCLElBQUksQ0FBWTtJQUNoQixRQUFRLENBQWlCO0lBQ3pCLFlBQVksQ0FBVTtJQUViLFlBQVksR0FBRztRQUN0QixjQUFjLEVBQUUsSUFBSTtRQUNwQixTQUFTLEVBQUUsR0FBRztLQUNmLENBQUM7SUFFRixTQUFTLENBQ1AsUUFBa0IsRUFDbEIsTUFBcUIsRUFDckIsSUFBb0IsRUFDcEIsT0FBc0I7UUFFdEIsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQyxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUVELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sWUFBWSxNQUFNLEVBQUU7WUFDMUQsYUFBYTtZQUNiLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25CO1FBRUQsSUFBSSxNQUFNLEdBQWEsUUFBUSxDQUFDO1FBQ2hDLHdCQUF3QjtRQUN4QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEIsNkRBQTZEO1lBQzdELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV2RSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFDLEdBQUcsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNoRDtZQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBdUIsQ0FBQztZQUNwRSw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO3dHQTlDVSxjQUFjO3NHQUFkLGNBQWM7OzRGQUFkLGNBQWM7a0JBSDFCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFlBQVk7aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJRnVzZU9wdGlvbnMsIElGdXNlUmVzdWx0LCBGdXNlT3B0aW9uc30gZnJvbSAnLi9zZWFyY2gubW9kZWwnO1xuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBGdXNlIGZyb20gJ2Z1c2UuanMnO1xuQFBpcGUoe1xuICBuYW1lOiAnYml6eVNlYXJjaCdcbn0pXG5leHBvcnQgY2xhc3MgQml6eVNlYXJjaFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgZnVzZU9wdGlvbnM6IElGdXNlT3B0aW9ucztcbiAgZnVzZTogRnVzZTxhbnk+O1xuICBlbGVtZW50czogQXJyYXk8dW5rbm93bj47XG4gIHNlYXJjaElzVGV4dDogYm9vbGVhbjtcblxuICByZWFkb25seSBwZXJmZWN0TWF0Y2ggPSB7XG4gICAgaWdub3JlTG9jYXRpb246IHRydWUsXG4gICAgdGhyZXNob2xkOiAwLjBcbiAgfTtcblxuICB0cmFuc2Zvcm08VD4oXG4gICAgZWxlbWVudHM6IEFycmF5PFQ+LFxuICAgIHNlYXJjaDogQXJyYXk8c3RyaW5nPixcbiAgICBrZXlzPzogQXJyYXk8c3RyaW5nPixcbiAgICBvcHRpb25zPzogSUZ1c2VPcHRpb25zXG4gICk6IEFycmF5PFQ+IHtcbiAgICBpZiAoIXNlYXJjaCB8fCBzZWFyY2gubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzZWFyY2ggPT09ICdzdHJpbmcnIHx8IHNlYXJjaCBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgc2VhcmNoID0gW3NlYXJjaF07XG4gICAgfVxuXG4gICAgbGV0IG91dHB1dDogQXJyYXk8VD4gPSBlbGVtZW50cztcbiAgICAvLyBSZW1vdmUgZW1wdHkgZWxlbWVudHNcbiAgICBzZWFyY2ggPSBzZWFyY2guZmlsdGVyKG4gPT4gbik7XG4gICAgc2VhcmNoLmZvckVhY2goX2tleXdvcmQgPT4ge1xuICAgICAgLy8gQXBwbHkgcGVyZmVjdCBtYXRjaCBpZiBcInNlYXJjaFwiIGlzIGEgbnVtYmVyIG9yIGlzIGFuIGVtYWlsXG4gICAgICB0aGlzLnNlYXJjaElzVGV4dCA9IGlzTmFOKE51bWJlcihfa2V5d29yZCkpICYmICFfa2V5d29yZC5pbmNsdWRlcygnQCcpO1xuXG4gICAgICBpZiAoIXRoaXMuc2VhcmNoSXNUZXh0KSB7XG4gICAgICAgIHRoaXMuZnVzZU9wdGlvbnMgPSBuZXcgRnVzZU9wdGlvbnMoey4uLm9wdGlvbnMsIC4uLnRoaXMucGVyZmVjdE1hdGNofSwga2V5cyk7XG4gICAgICAgIHRoaXMuZnVzZSA9IG5ldyBGdXNlKG91dHB1dCwgdGhpcy5mdXNlT3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZ1c2VPcHRpb25zID0gbmV3IEZ1c2VPcHRpb25zKG9wdGlvbnMhLCBrZXlzKTtcbiAgICAgICAgdGhpcy5mdXNlID0gbmV3IEZ1c2Uob3V0cHV0LCB0aGlzLmZ1c2VPcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZnVzZVJlc3VsdCA9IHRoaXMuZnVzZS5zZWFyY2goX2tleXdvcmQpIGFzIEFycmF5PElGdXNlUmVzdWx0PjtcbiAgICAgIC8vIEdldCBlYWNoIGZ1c2UgcmVzdWx0IGl0ZW1cbiAgICAgIG91dHB1dCA9IGZ1c2VSZXN1bHQubWFwKG1hdGNoID0+IG1hdGNoLml0ZW0pO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cbiJdfQ==