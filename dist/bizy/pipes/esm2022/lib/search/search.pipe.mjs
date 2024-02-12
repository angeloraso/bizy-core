import { FuseOptions } from './search.model';
import { Pipe } from '@angular/core';
import Fuse from 'fuse.js';
import * as i0 from "@angular/core";
export class SearchPipe {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: SearchPipe, name: "bizySearch" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySearch'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waXBlcy9zcmMvbGliL3NlYXJjaC9zZWFyY2gucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sSUFBSSxNQUFNLFNBQVMsQ0FBQzs7QUFJM0IsTUFBTSxPQUFPLFVBQVU7SUFDckIsV0FBVyxDQUFlO0lBQzFCLElBQUksQ0FBWTtJQUNoQixRQUFRLENBQWlCO0lBQ3pCLFlBQVksQ0FBVTtJQUViLFlBQVksR0FBRztRQUN0QixjQUFjLEVBQUUsSUFBSTtRQUNwQixTQUFTLEVBQUUsR0FBRztLQUNmLENBQUM7SUFFRixTQUFTLENBQ1AsUUFBa0IsRUFDbEIsTUFBcUIsRUFDckIsSUFBb0IsRUFDcEIsT0FBc0I7UUFFdEIsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQyxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUVELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sWUFBWSxNQUFNLEVBQUU7WUFDMUQsYUFBYTtZQUNiLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25CO1FBRUQsSUFBSSxNQUFNLEdBQWEsUUFBUSxDQUFDO1FBQ2hDLHdCQUF3QjtRQUN4QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEIsNkRBQTZEO1lBQzdELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV2RSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFDLEdBQUcsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNoRDtZQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBdUIsQ0FBQztZQUNwRSw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO3dHQTlDVSxVQUFVO3NHQUFWLFVBQVU7OzRGQUFWLFVBQVU7a0JBSHRCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFlBQVk7aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJRnVzZU9wdGlvbnMsIElGdXNlUmVzdWx0LCBGdXNlT3B0aW9uc30gZnJvbSAnLi9zZWFyY2gubW9kZWwnO1xuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBGdXNlIGZyb20gJ2Z1c2UuanMnO1xuQFBpcGUoe1xuICBuYW1lOiAnYml6eVNlYXJjaCdcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBmdXNlT3B0aW9uczogSUZ1c2VPcHRpb25zO1xuICBmdXNlOiBGdXNlPGFueT47XG4gIGVsZW1lbnRzOiBBcnJheTx1bmtub3duPjtcbiAgc2VhcmNoSXNUZXh0OiBib29sZWFuO1xuXG4gIHJlYWRvbmx5IHBlcmZlY3RNYXRjaCA9IHtcbiAgICBpZ25vcmVMb2NhdGlvbjogdHJ1ZSxcbiAgICB0aHJlc2hvbGQ6IDAuMFxuICB9O1xuXG4gIHRyYW5zZm9ybTxUPihcbiAgICBlbGVtZW50czogQXJyYXk8VD4sXG4gICAgc2VhcmNoOiBBcnJheTxzdHJpbmc+LFxuICAgIGtleXM/OiBBcnJheTxzdHJpbmc+LFxuICAgIG9wdGlvbnM/OiBJRnVzZU9wdGlvbnNcbiAgKTogQXJyYXk8VD4ge1xuICAgIGlmICghc2VhcmNoIHx8IHNlYXJjaC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBlbGVtZW50cztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNlYXJjaCA9PT0gJ3N0cmluZycgfHwgc2VhcmNoIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBzZWFyY2ggPSBbc2VhcmNoXTtcbiAgICB9XG5cbiAgICBsZXQgb3V0cHV0OiBBcnJheTxUPiA9IGVsZW1lbnRzO1xuICAgIC8vIFJlbW92ZSBlbXB0eSBlbGVtZW50c1xuICAgIHNlYXJjaCA9IHNlYXJjaC5maWx0ZXIobiA9PiBuKTtcbiAgICBzZWFyY2guZm9yRWFjaChfa2V5d29yZCA9PiB7XG4gICAgICAvLyBBcHBseSBwZXJmZWN0IG1hdGNoIGlmIFwic2VhcmNoXCIgaXMgYSBudW1iZXIgb3IgaXMgYW4gZW1haWxcbiAgICAgIHRoaXMuc2VhcmNoSXNUZXh0ID0gaXNOYU4oTnVtYmVyKF9rZXl3b3JkKSkgJiYgIV9rZXl3b3JkLmluY2x1ZGVzKCdAJyk7XG5cbiAgICAgIGlmICghdGhpcy5zZWFyY2hJc1RleHQpIHtcbiAgICAgICAgdGhpcy5mdXNlT3B0aW9ucyA9IG5ldyBGdXNlT3B0aW9ucyh7Li4ub3B0aW9ucywgLi4udGhpcy5wZXJmZWN0TWF0Y2h9LCBrZXlzKTtcbiAgICAgICAgdGhpcy5mdXNlID0gbmV3IEZ1c2Uob3V0cHV0LCB0aGlzLmZ1c2VPcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZnVzZU9wdGlvbnMgPSBuZXcgRnVzZU9wdGlvbnMob3B0aW9ucyEsIGtleXMpO1xuICAgICAgICB0aGlzLmZ1c2UgPSBuZXcgRnVzZShvdXRwdXQsIHRoaXMuZnVzZU9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmdXNlUmVzdWx0ID0gdGhpcy5mdXNlLnNlYXJjaChfa2V5d29yZCkgYXMgQXJyYXk8SUZ1c2VSZXN1bHQ+O1xuICAgICAgLy8gR2V0IGVhY2ggZnVzZSByZXN1bHQgaXRlbVxuICAgICAgb3V0cHV0ID0gZnVzZVJlc3VsdC5tYXAobWF0Y2ggPT4gbWF0Y2guaXRlbSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxufVxuIl19