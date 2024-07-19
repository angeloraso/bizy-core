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
        // Filter out duplicates by serializing objects to JSON
        output = output.filter((obj, index, self) => index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(obj)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL3BpcGVzL2ZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sY0FBYztJQUN6QixTQUFTLENBQ1AsS0FBZSxFQUNmLFFBQWdCLEVBQ2hCLE1BQW1FO1FBRW5FLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0MsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUdELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDdEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNuQixPQUFPO2FBQ1I7WUFFRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMvQixJQUFJLE1BQU0sR0FBTSxLQUFLLENBQUM7Z0JBQ3RCLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2pDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksT0FBTyxLQUFLLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBRTtvQkFDakMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQztpQkFDckM7Z0JBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUN6QixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNsQztnQkFFRCxPQUFPLE1BQU0sS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFSCx1REFBdUQ7UUFDdkQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzt3R0FqRFUsY0FBYztzR0FBZCxjQUFjOzs0RkFBZCxjQUFjO2tCQUgxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnYml6eUZpbHRlcidcbn0pXG5leHBvcnQgY2xhc3MgQml6eUZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtPFQ+KFxuICAgIGl0ZW1zOiBBcnJheTxUPixcbiAgICBwcm9wZXJ0eTogc3RyaW5nLFxuICAgIHN0YXRlczogQXJyYXk8eyBpZDogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbjsgc2VsZWN0ZWQ6IGJvb2xlYW4gfT5cbiAgKTogQXJyYXk8VD4ge1xuICAgIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKCFwcm9wZXJ0eSB8fCAhc3RhdGVzIHx8IHN0YXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBpdGVtcztcbiAgICB9XG5cblxuICAgIGNvbnN0IF9zZWxlY3RlZCA9IHN0YXRlcy5maWx0ZXIoX3N0YXRlID0+IF9zdGF0ZS5zZWxlY3RlZCk7XG4gICAgaWYgKF9zZWxlY3RlZC5sZW5ndGggPT09IHN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBpdGVtcztcbiAgICB9XG5cbiAgICBsZXQgb3V0cHV0OiBBcnJheTxUPiA9IFtdO1xuICAgIHN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgIGlmICghc3RhdGUuc2VsZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXMgPSBpdGVtcy5maWx0ZXIoX2l0ZW0gPT4ge1xuICAgICAgICBsZXQgX3N0YXRlOiBUID0gX2l0ZW07XG4gICAgICAgIGNvbnN0IG5lc3RlZFByb3BlcnR5ID0gcHJvcGVydHkuc3BsaXQoJy4nKTtcbiAgICAgICAgbmVzdGVkUHJvcGVydHkuZm9yRWFjaChfcHJvcGVydHkgPT4ge1xuICAgICAgICAgIF9zdGF0ZSA9IF9zdGF0ZVtfcHJvcGVydHldO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlLmlkID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICByZXR1cm4gQm9vbGVhbihfc3RhdGUpID09PSBzdGF0ZS5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KF9zdGF0ZSkpIHtcbiAgICAgICAgICByZXR1cm4gX3N0YXRlLmluY2x1ZGVzKHN0YXRlLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBfc3RhdGUgPT09IHN0YXRlLmlkO1xuICAgICAgfSk7XG4gICAgICBvdXRwdXQgPSBvdXRwdXQuY29uY2F0KHJlcyk7XG4gICAgfSk7XG5cbiAgICAvLyBGaWx0ZXIgb3V0IGR1cGxpY2F0ZXMgYnkgc2VyaWFsaXppbmcgb2JqZWN0cyB0byBKU09OXG4gICAgb3V0cHV0ID0gb3V0cHV0LmZpbHRlcigob2JqLCBpbmRleCwgc2VsZikgPT4gaW5kZXggPT09IHNlbGYuZmluZEluZGV4KCh0KSA9PiBKU09OLnN0cmluZ2lmeSh0KSA9PT0gSlNPTi5zdHJpbmdpZnkob2JqKSkpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cbiJdfQ==