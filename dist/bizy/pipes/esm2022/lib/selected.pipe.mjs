import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class BizySelectedPipe {
    transform(items) {
        if (!items || items.length === 0) {
            return [];
        }
        return items.filter((_item) => _item.selected === true);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectedPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: BizySelectedPipe, name: "bizySelected" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectedPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySelected',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpcGVzL3NyYy9saWIvc2VsZWN0ZWQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixTQUFTLENBQUksS0FBcUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNoQyxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7d0dBUFUsZ0JBQWdCO3NHQUFoQixnQkFBZ0I7OzRGQUFoQixnQkFBZ0I7a0JBSDVCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLGNBQWM7aUJBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdiaXp5U2VsZWN0ZWQnLFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5U2VsZWN0ZWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybTxUPihpdGVtczogQXJyYXk8VCAmIHtzZWxlY3RlZDogYm9vbGVhbn0+KTogQXJyYXk8VCAmIHtzZWxlY3RlZDogYm9vbGVhbn0+IHtcbiAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKF9pdGVtKSA9PiBfaXRlbS5zZWxlY3RlZCA9PT0gdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==