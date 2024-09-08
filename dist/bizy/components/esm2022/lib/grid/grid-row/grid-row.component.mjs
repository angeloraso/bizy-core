import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyGridRowComponent {
    elementRef;
    ref;
    renderer;
    rowHeight = 100; // Px
    set itemsPerRow(itemsPerRow) {
        if (!this.elementRef.nativeElement) {
            return;
        }
        if (!itemsPerRow) {
            itemsPerRow = 1;
        }
        let gridTemplateColumnsStyle = '1fr';
        for (let i = 1; i < itemsPerRow; i++) {
            gridTemplateColumnsStyle += ' 1fr';
        }
        this.renderer.setStyle(this.elementRef.nativeElement, 'gridTemplateRows', `${this.rowHeight}px`);
        this.renderer.setStyle(this.elementRef.nativeElement, 'gridTemplateColumns', gridTemplateColumnsStyle);
        this.ref.detectChanges();
    }
    constructor(elementRef, ref, renderer) {
        this.elementRef = elementRef;
        this.ref = ref;
        this.renderer = renderer;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridRowComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyGridRowComponent, selector: "bizy-grid-row", inputs: { rowHeight: "rowHeight", itemsPerRow: "itemsPerRow" }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:grid;column-gap:var(--bizy-grid-gap);margin-bottom:var(--bizy-grid-gap)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-grid-row', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", styles: [":host{font-size:1rem;display:grid;column-gap:var(--bizy-grid-gap);margin-bottom:var(--bizy-grid-gap)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { rowHeight: [{
                type: Input
            }], itemsPerRow: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2dyaWQvZ3JpZC1yb3cvZ3JpZC1yb3cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2dyaWQvZ3JpZC1yb3cvZ3JpZC1yb3cuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRNUgsTUFBTSxPQUFPLG9CQUFvQjtJQXVCRDtJQUNPO0lBQ1I7SUF4QnBCLFNBQVMsR0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFLO0lBRXZDLElBQWEsV0FBVyxDQUFDLFdBQW1CO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTtZQUNsQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLFdBQVcsR0FBRyxDQUFDLENBQUM7U0FDakI7UUFFRCxJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLHdCQUF3QixJQUFJLE1BQU0sQ0FBQztTQUNwQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxZQUM4QixVQUFzQixFQUNmLEdBQXNCLEVBQzlCLFFBQW1CO1FBRmxCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDZixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQzdDLENBQUM7d0dBMUJPLG9CQUFvQixrQkF1QnJCLFVBQVUsYUFDVixpQkFBaUIsYUFDakIsU0FBUzs0RkF6QlIsb0JBQW9CLHFIQ1JqQywyQkFBeUI7OzRGRFFaLG9CQUFvQjtrQkFOaEMsU0FBUzsrQkFDRSxlQUFlLG1CQUdSLHVCQUF1QixDQUFDLE1BQU07OzBCQXlCNUMsTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUN4QixNQUFNOzJCQUFDLFNBQVM7NENBeEJWLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRU8sV0FBVztzQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1ncmlkLXJvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLXJvdy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC1yb3cuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlHcmlkUm93Q29tcG9uZW50IHtcbiAgQElucHV0KCkgcm93SGVpZ2h0OiBudW1iZXIgPSAxMDA7IC8vIFB4XG5cbiAgQElucHV0KCkgc2V0IGl0ZW1zUGVyUm93KGl0ZW1zUGVyUm93OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFpdGVtc1BlclJvdykge1xuICAgICAgaXRlbXNQZXJSb3cgPSAxO1xuICAgIH1cblxuICAgIGxldCBncmlkVGVtcGxhdGVDb2x1bW5zU3R5bGUgPSAnMWZyJztcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGl0ZW1zUGVyUm93OyBpKyspIHtcbiAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnNTdHlsZSArPSAnIDFmcic7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2dyaWRUZW1wbGF0ZVJvd3MnLCBgJHt0aGlzLnJvd0hlaWdodH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdncmlkVGVtcGxhdGVDb2x1bW5zJywgZ3JpZFRlbXBsYXRlQ29sdW1uc1N0eWxlKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG59XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+Il19