import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../input/input.component";
export class BizyFilterSectionSearchOptionComponent {
    id = String(Math.random());
    customClass = '';
    onChange = new EventEmitter();
    searchChange = new EventEmitter();
    _control = new FormControl('');
    #subscription = new Subscription();
    ngOnInit() {
        this.#subscription.add(this._control.valueChanges.pipe(debounceTime(250)).subscribe(value => {
            this.searchChange.emit([value]);
            this.onChange.emit([value]);
        }));
    }
    set search(search) {
        if (!search) {
            return;
        }
        this._control.setValue('');
        search.forEach(value => {
            this._control.setValue(`${this._control.value}${this._control.value ? ` ${value}` : value}`);
        });
    }
    getId = () => {
        return this.id;
    };
    isActivated = () => {
        return Boolean(this._control.value);
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionSearchOptionComponent, selector: "bizy-filter-section-search-option", inputs: { id: "id", customClass: "customClass", search: "search" }, outputs: { onChange: "onChange", searchChange: "searchChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-search-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <bizy-input\n        class=\"bizy-filter-section-search-option__input\"\n        [autoFocus]=\"true\"\n        [control]=\"_control\">\n    </bizy-input>\n\n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-search-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-search-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: i1.BizyInputComponent, selector: "bizy-input", inputs: ["id", "disabled", "readonly", "multiple", "clear", "autoFocus", "autoCapitalize", "autoCorrect", "browserAutoComplete", "type", "label", "max", "maxLength", "min", "minLength", "control", "value", "placeholder", "cancelLabel", "confirmLabel", "customClass"], outputs: ["onFocus", "onEnter", "onBlur"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-search-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-search-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <bizy-input\n        class=\"bizy-filter-section-search-option__input\"\n        [autoFocus]=\"true\"\n        [control]=\"_control\">\n    </bizy-input>\n\n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-search-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-search-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onChange: [{
                type: Output
            }], searchChange: [{
                type: Output
            }], search: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLXNlYXJjaC1vcHRpb24vZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLXNlYXJjaC1vcHRpb24vZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBUWxELE1BQU0sT0FBTyxzQ0FBc0M7SUFDeEMsRUFBRSxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNuQyxXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJQUM3QyxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFFM0QsUUFBUSxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRS9CLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5DLFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFhLE1BQU0sQ0FBQyxNQUFxQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9GLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEtBQUssR0FBRyxHQUFXLEVBQUU7UUFDbkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFZLEVBQUU7UUFDMUIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUE7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO3dHQXRDVSxzQ0FBc0M7NEZBQXRDLHNDQUFzQyw4TUNWbkQsdVFBVU07OzRGREFPLHNDQUFzQztrQkFObEQsU0FBUzsrQkFDRSxtQ0FBbUMsbUJBRzVCLHVCQUF1QixDQUFDLE1BQU07OEJBR3RDLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFhTSxNQUFNO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWZpbHRlci1zZWN0aW9uLXNlYXJjaC1vcHRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eUZpbHRlclNlY3Rpb25TZWFyY2hPcHRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSk7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxzdHJpbmc+PigpO1xuICBAT3V0cHV0KCkgc2VhcmNoQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxzdHJpbmc+PigpO1xuXG4gIF9jb250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcblxuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5fY29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShkZWJvdW5jZVRpbWUoMjUwKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuc2VhcmNoQ2hhbmdlLmVtaXQoW3ZhbHVlXSk7XG4gICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoW3ZhbHVlXSk7XG4gICAgfSkpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNlYXJjaChzZWFyY2g6IEFycmF5PHN0cmluZz4pIHtcbiAgICBpZiAoIXNlYXJjaCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnRyb2wuc2V0VmFsdWUoJycpO1xuICAgIHNlYXJjaC5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuX2NvbnRyb2wuc2V0VmFsdWUoYCR7dGhpcy5fY29udHJvbC52YWx1ZX0ke3RoaXMuX2NvbnRyb2wudmFsdWUgPyBgICR7dmFsdWV9YCA6IHZhbHVlfWApO1xuICAgIH0pXG4gIH1cblxuICBnZXRJZCA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgaXNBY3RpdmF0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5fY29udHJvbC52YWx1ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufSIsIjxkaXYgXG4gICAgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uLXNlYXJjaC1vcHRpb24ge3tjdXN0b21DbGFzc319XCJcbiAgICBpZD1cInt7aWR9fVwiPlxuXG4gICAgPGJpenktaW5wdXRcbiAgICAgICAgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uLXNlYXJjaC1vcHRpb25fX2lucHV0XCJcbiAgICAgICAgW2F1dG9Gb2N1c109XCJ0cnVlXCJcbiAgICAgICAgW2NvbnRyb2xdPVwiX2NvbnRyb2xcIj5cbiAgICA8L2JpenktaW5wdXQ+XG5cbjwvZGl2PiJdfQ==