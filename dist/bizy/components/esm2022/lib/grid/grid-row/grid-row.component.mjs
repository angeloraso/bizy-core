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
        this.renderer.setStyle(this.elementRef.nativeElement, 'gridTemplateRows', `${this.rowHeight}px`);
        this.renderer.setStyle(this.elementRef.nativeElement, 'gridTemplateColumns', `repeat(${itemsPerRow}, minmax(0, 1fr)`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2dyaWQvZ3JpZC1yb3cvZ3JpZC1yb3cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2dyaWQvZ3JpZC1yb3cvZ3JpZC1yb3cuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRNUgsTUFBTSxPQUFPLG9CQUFvQjtJQWlCRDtJQUNPO0lBQ1I7SUFsQnBCLFNBQVMsR0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFLO0lBRXZDLElBQWEsV0FBVyxDQUFDLFdBQW1CO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTtZQUNsQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLFdBQVcsR0FBRyxDQUFDLENBQUM7U0FDakI7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLHFCQUFxQixFQUFFLFVBQVUsV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO1FBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNySixDQUFDO0lBRUQsWUFDOEIsVUFBc0IsRUFDZixHQUFzQixFQUM5QixRQUFtQjtRQUZsQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2YsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUM3QyxDQUFDO3dHQXBCTyxvQkFBb0Isa0JBaUJyQixVQUFVLGFBQ1YsaUJBQWlCLGFBQ2pCLFNBQVM7NEZBbkJSLG9CQUFvQixxSENSakMsMkJBQXlCOzs0RkRRWixvQkFBb0I7a0JBTmhDLFNBQVM7K0JBQ0UsZUFBZSxtQkFHUix1QkFBdUIsQ0FBQyxNQUFNOzswQkFtQjVDLE1BQU07MkJBQUMsVUFBVTs7MEJBQ2pCLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDeEIsTUFBTTsyQkFBQyxTQUFTOzRDQWxCVixTQUFTO3NCQUFqQixLQUFLO2dCQUVPLFdBQVc7c0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZ3JpZC1yb3cnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC1yb3cuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dyaWQtcm93LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5R3JpZFJvd0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHJvd0hlaWdodDogbnVtYmVyID0gMTAwOyAvLyBQeFxuXG4gIEBJbnB1dCgpIHNldCBpdGVtc1BlclJvdyhpdGVtc1BlclJvdzogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXRlbXNQZXJSb3cpIHtcbiAgICAgIGl0ZW1zUGVyUm93ID0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZ3JpZFRlbXBsYXRlUm93cycsIGAke3RoaXMucm93SGVpZ2h0fXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2dyaWRUZW1wbGF0ZUNvbHVtbnMnLCBgcmVwZWF0KCR7aXRlbXNQZXJSb3d9LCBtaW5tYXgoMCwgMWZyKWApOyAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG59XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+Il19