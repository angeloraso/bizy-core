import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyFilterPipe {
    transform(items, property, states) {
        if (!items || items.length === 0) {
            return [];
        }
        if (!property || !states || states.length === 0) {
            return items;
        }
        const _selected = states.filter(_state => _state.selected);
        if (_selected.length === states.length) {
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
                if (typeof state.id === 'boolean') {
                    return Boolean(_state) === state.id;
                }
                if (Array.isArray(_state)) {
                    return _state.includes(state.id);
                }
                return _state === state.id;
            });
            output = output.concat(res);
        });
        return output;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, name: "bizyFilter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyFilter'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL3BpcGVzL2ZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sY0FBYztJQUN6QixTQUFTLENBQ1AsS0FBZSxFQUNmLFFBQWdCLEVBQ2hCLE1BQW1FO1FBRW5FLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0MsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUdELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDdEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNuQixPQUFPO2FBQ1I7WUFFRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMvQixJQUFJLE1BQU0sR0FBTSxLQUFLLENBQUM7Z0JBQ3RCLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2pDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksT0FBTyxLQUFLLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBRTtvQkFDakMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQztpQkFDckM7Z0JBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUN6QixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNsQztnQkFFRCxPQUFPLE1BQU0sS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO3dHQS9DVSxjQUFjO3NHQUFkLGNBQWM7OzRGQUFkLGNBQWM7a0JBSDFCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFlBQVk7aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdiaXp5RmlsdGVyJ1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5RmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm08VD4oXG4gICAgaXRlbXM6IEFycmF5PFQ+LFxuICAgIHByb3BlcnR5OiBzdHJpbmcsXG4gICAgc3RhdGVzOiBBcnJheTx7IGlkOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuOyBzZWxlY3RlZDogYm9vbGVhbiB9PlxuICApOiBBcnJheTxUPiB7XG4gICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAoIXByb3BlcnR5IHx8ICFzdGF0ZXMgfHwgc3RhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuXG4gICAgY29uc3QgX3NlbGVjdGVkID0gc3RhdGVzLmZpbHRlcihfc3RhdGUgPT4gX3N0YXRlLnNlbGVjdGVkKTtcbiAgICBpZiAoX3NlbGVjdGVkLmxlbmd0aCA9PT0gc3RhdGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIGxldCBvdXRwdXQ6IEFycmF5PFQ+ID0gW107XG4gICAgc3RhdGVzLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgaWYgKCFzdGF0ZS5zZWxlY3RlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcyA9IGl0ZW1zLmZpbHRlcihfaXRlbSA9PiB7XG4gICAgICAgIGxldCBfc3RhdGU6IFQgPSBfaXRlbTtcbiAgICAgICAgY29uc3QgbmVzdGVkUHJvcGVydHkgPSBwcm9wZXJ0eS5zcGxpdCgnLicpO1xuICAgICAgICBuZXN0ZWRQcm9wZXJ0eS5mb3JFYWNoKF9wcm9wZXJ0eSA9PiB7XG4gICAgICAgICAgX3N0YXRlID0gX3N0YXRlW19wcm9wZXJ0eV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUuaWQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgIHJldHVybiBCb29sZWFuKF9zdGF0ZSkgPT09IHN0YXRlLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoX3N0YXRlKSkge1xuICAgICAgICAgIHJldHVybiBfc3RhdGUuaW5jbHVkZXMoc3RhdGUuaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF9zdGF0ZSA9PT0gc3RhdGUuaWQ7XG4gICAgICB9KTtcbiAgICAgIG91dHB1dCA9IG91dHB1dC5jb25jYXQocmVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cbiJdfQ==