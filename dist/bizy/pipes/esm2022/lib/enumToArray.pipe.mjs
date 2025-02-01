import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyEnumToArrayPipe {
    transform(enumObj) {
        return Object.keys(enumObj)
            .filter(key => isNaN(Number(key))) // Only keep the keys, not the reverse mappings in numeric enums
            .map(key => ({ key, value: enumObj[key] }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyEnumToArrayPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizyEnumToArrayPipe, name: "bizyEnumToArray" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyEnumToArrayPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizyEnumToArray'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bVRvQXJyYXkucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpcGVzL3NyYy9saWIvZW51bVRvQXJyYXkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixTQUFTLENBQUMsT0FBWTtRQUNwQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdFQUFnRTthQUNsRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzt3R0FMVSxtQkFBbUI7c0dBQW5CLG1CQUFtQjs7NEZBQW5CLG1CQUFtQjtrQkFIL0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsaUJBQWlCO2lCQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnYml6eUVudW1Ub0FycmF5J1xufSlcbmV4cG9ydCBjbGFzcyBCaXp5RW51bVRvQXJyYXlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShlbnVtT2JqOiBhbnkpOiB7IGtleTogc3RyaW5nOyB2YWx1ZTogYW55IH1bXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGVudW1PYmopXG4gICAgICAuZmlsdGVyKGtleSA9PiBpc05hTihOdW1iZXIoa2V5KSkpIC8vIE9ubHkga2VlcCB0aGUga2V5cywgbm90IHRoZSByZXZlcnNlIG1hcHBpbmdzIGluIG51bWVyaWMgZW51bXNcbiAgICAgIC5tYXAoa2V5ID0+ICh7IGtleSwgdmFsdWU6IGVudW1PYmpba2V5XSB9KSk7XG4gIH1cbn0iXX0=