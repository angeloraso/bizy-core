import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, inject, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyTableColumnComponent {
    id = `bizy-table-column-${Math.random()}`;
    customClass = '';
    onSelect = new EventEmitter();
    #elementRef = inject(ElementRef);
    getId = () => {
        return this.id;
    };
    setMarginLeft(margin) {
        if (!this.#elementRef.nativeElement || !this.#elementRef.nativeElement.setMarginLeft) {
            return;
        }
        this.#elementRef.nativeElement.setMarginLeft(margin);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableColumnComponent, selector: "bizy-table-column", inputs: { id: "id", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"onSelect.emit($event)\"\n    (keyup.enter)=\"onSelect.emit($event)\"\n    class=\"bizy-table-column {{customClass}}\">\n\n    <ng-content></ng-content>\n    \n</button>", styles: [":host{font-size:1rem;flex:1;background-color:inherit;height:var(--bizy-table-row-height);display:flex;-webkit-user-select:text;user-select:text}:host:has(.bizy-table-column-arrows) .bizy-table-column{cursor:pointer!important}.bizy-table-column{font-size:1rem;min-width:var(--bizy-table-column-min-width);width:100%;cursor:var(--bizy-table-column-cursor);border-top:var(--bizy-table-column-border-top);border-right:var(--bizy-table-column-border-right);border-bottom:var(--bizy-table-column-border-bottom);border-left:var(--bizy-table-column-border-left);background-color:var(--bizy-table-column-background-color);display:flex;align-items:center;justify-content:var(--bizy-table-column-justify-content);column-gap:.3rem;padding-right:.3rem}::ng-deep .bizy-table-column *{text-align:start}::ng-deep .bizy-table-column:hover .bizy-table-column-arrows{display:inline-block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableColumnComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-column', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"onSelect.emit($event)\"\n    (keyup.enter)=\"onSelect.emit($event)\"\n    class=\"bizy-table-column {{customClass}}\">\n\n    <ng-content></ng-content>\n    \n</button>", styles: [":host{font-size:1rem;flex:1;background-color:inherit;height:var(--bizy-table-row-height);display:flex;-webkit-user-select:text;user-select:text}:host:has(.bizy-table-column-arrows) .bizy-table-column{cursor:pointer!important}.bizy-table-column{font-size:1rem;min-width:var(--bizy-table-column-min-width);width:100%;cursor:var(--bizy-table-column-cursor);border-top:var(--bizy-table-column-border-top);border-right:var(--bizy-table-column-border-right);border-bottom:var(--bizy-table-column-border-bottom);border-left:var(--bizy-table-column-border-left);background-color:var(--bizy-table-column-background-color);display:flex;align-items:center;justify-content:var(--bizy-table-column-justify-content);column-gap:.3rem;padding-right:.3rem}::ng-deep .bizy-table-column *{text-align:start}::ng-deep .bizy-table-column:hover .bizy-table-column-arrows{display:inline-block}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1jb2x1bW4vdGFibGUtY29sdW1uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1jb2x1bW4vdGFibGUtY29sdW1uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVFwSCxNQUFNLE9BQU8sd0JBQXdCO0lBQzFCLEVBQUUsR0FBVyxxQkFBcUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDbEQsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN4QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFFN0MsV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUxQyxLQUFLLEdBQUcsR0FBVyxFQUFFO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUE7SUFFRCxhQUFhLENBQUMsTUFBYztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7WUFDcEYsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7d0dBakJVLHdCQUF3Qjs0RkFBeEIsd0JBQXdCLDhJQ1JyQyx3T0FTUzs7NEZEREksd0JBQXdCO2tCQU5wQyxTQUFTOytCQUNFLG1CQUFtQixtQkFHWix1QkFBdUIsQ0FBQyxNQUFNOzhCQUd0QyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBpbmplY3QsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS10YWJsZS1jb2x1bW4nLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUtY29sdW1uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS1jb2x1bW4uY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlUYWJsZUNvbHVtbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS10YWJsZS1jb2x1bW4tJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG5cbiAgcmVhZG9ubHkgI2VsZW1lbnRSZWYgPSBpbmplY3QoRWxlbWVudFJlZik7XG5cbiAgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIHNldE1hcmdpbkxlZnQobWFyZ2luOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuI2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCB8fCAhdGhpcy4jZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldE1hcmdpbkxlZnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLiNlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0TWFyZ2luTGVmdChtYXJnaW4pO1xuICB9XG59IiwiPGJ1dHRvbiBcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBbaWRdPVwiaWRcIlxuICAgIChjbGljayk9XCJvblNlbGVjdC5lbWl0KCRldmVudClcIlxuICAgIChrZXl1cC5lbnRlcik9XCJvblNlbGVjdC5lbWl0KCRldmVudClcIlxuICAgIGNsYXNzPVwiYml6eS10YWJsZS1jb2x1bW4ge3tjdXN0b21DbGFzc319XCI+XG5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgXG48L2J1dHRvbj4iXX0=