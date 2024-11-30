import { debounceTime, fromEvent, skip, Subscription } from 'rxjs';
import { Component, ViewChild, Inject, ElementRef, ChangeDetectorRef, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/scrolling";
// FIX: This components fixes the bug with Angular CDK virtual scrolling not supporting content projection.
// https://github.com/angular/components/issues/15277
export class BizyTableScrollingComponent {
    document;
    elementRef;
    ref;
    viewport;
    content;
    #view;
    items$;
    itemTemplate;
    itemSize;
    #subscription = new Subscription();
    #scrollTop = 0;
    constructor(document, elementRef, ref) {
        this.document = document;
        this.elementRef = elementRef;
        this.ref = ref;
    }
    /** Called by the virtual-for directive inside of the viewport. */
    attachView(tableDirective) {
        if (this.#view) {
            return;
        }
        let itemSize = 30;
        const rowHeight = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-table-row-height');
        const fontSize = getComputedStyle(this.document.documentElement).getPropertyValue('font-size');
        const gap = Number(fontSize.split('px')[0]) * 0.1;
        if (rowHeight && rowHeight.includes('rem')) {
            itemSize = Number(fontSize.split('px')[0]) * Number(rowHeight.split('rem')[0]);
        }
        else if (rowHeight && rowHeight.includes('px')) {
            itemSize = Number(rowHeight.split('px')[0]);
        }
        this.itemSize = itemSize + gap;
        this.items$ = tableDirective.items$;
        this.itemTemplate = tableDirective.template;
        this.#view = tableDirective.viewContainerRef;
        this.#view.createEmbeddedView(this.content);
        this.ref.detectChanges();
        this.#subscription.add(fromEvent(this.elementRef.nativeElement, 'scroll', { capture: true }).pipe(debounceTime(100)).subscribe(() => {
            this.#scrollTop = this.viewport.measureScrollOffset();
        }));
        this.#subscription.add(this.items$.pipe(skip(1)).subscribe(() => {
            if (this.viewport) {
                this.viewport.scrollToOffset(this.#scrollTop);
                this.ref.detectChanges();
            }
        }));
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingComponent, deps: [{ token: DOCUMENT }, { token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableScrollingComponent, selector: "bizy-table-scrolling", viewQueries: [{ propertyName: "viewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true }, { propertyName: "content", first: true, predicate: ["tableScrollingContent"], descendants: true }], ngImport: i0, template: "<cdk-virtual-scroll-viewport \n    [itemSize]=\"itemSize\"\n    [minBufferPx]=\"itemSize + (itemSize * 20)\"\n    [maxBufferPx]=\"itemSize + (itemSize * 40)\">\n    \n    <ng-content></ng-content>\n\n    <ng-template #tableScrollingContent>\n      <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"items$ | async\">\n        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\"></ng-template>\n      </ng-template>\n    </ng-template>\n</cdk-virtual-scroll-viewport>", styles: ["::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-table-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-table-scroll-bar-hover-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableScrollingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-scrolling', template: "<cdk-virtual-scroll-viewport \n    [itemSize]=\"itemSize\"\n    [minBufferPx]=\"itemSize + (itemSize * 20)\"\n    [maxBufferPx]=\"itemSize + (itemSize * 40)\">\n    \n    <ng-content></ng-content>\n\n    <ng-template #tableScrollingContent>\n      <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"items$ | async\">\n        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\"></ng-template>\n      </ng-template>\n    </ng-template>\n</cdk-virtual-scroll-viewport>", styles: ["::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-table-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-table-scroll-bar-hover-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { viewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport]
            }], content: [{
                type: ViewChild,
                args: ['tableScrollingContent']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc2Nyb2xsaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQWMsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvRSxPQUFPLEVBQ0wsU0FBUyxFQUVULFNBQVMsRUFFVCxNQUFNLEVBQ04sVUFBVSxFQUdWLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFRbEUsMkdBQTJHO0FBQzNHLHFEQUFxRDtBQUNyRCxNQUFNLE9BQU8sMkJBQTJCO0lBY1Y7SUFDQztJQUNPO0lBZkMsUUFBUSxDQUE0QjtJQUNyQyxPQUFPLENBQXNCO0lBRWpFLEtBQUssQ0FBbUI7SUFDeEIsTUFBTSxDQUE2QjtJQUNuQyxZQUFZLENBQXFDO0lBRWpELFFBQVEsQ0FBUztJQUVqQixhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNuQyxVQUFVLEdBQVcsQ0FBQyxDQUFDO0lBRXZCLFlBQzRCLFFBQWtCLEVBQ2pCLFVBQXNCLEVBQ2YsR0FBc0I7UUFGOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNqQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2YsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDdkQsQ0FBQztJ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QUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsVUFBVTs7MEJBQ2pCLE1BQU07MkJBQUMsaUJBQWlCOzRDQWZVLFFBQVE7c0JBQTVDLFNBQVM7dUJBQUMsd0JBQXdCO2dCQUNDLE9BQU87c0JBQTFDLFNBQVM7dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmcm9tRXZlbnQsIE9ic2VydmFibGUsIHNraXAsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBJbmplY3QsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlUYWJsZVJvd0NvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLXJvdy90YWJsZS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS10YWJsZS1zY3JvbGxpbmcnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUtc2Nyb2xsaW5nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS1zY3JvbGxpbmcuY3NzJ11cbn0pXG5cbi8vIEZJWDogVGhpcyBjb21wb25lbnRzIGZpeGVzIHRoZSBidWcgd2l0aCBBbmd1bGFyIENESyB2aXJ0dWFsIHNjcm9sbGluZyBub3Qgc3VwcG9ydGluZyBjb250ZW50IHByb2plY3Rpb24uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xNTI3N1xuZXhwb3J0IGNsYXNzIEJpenlUYWJsZVNjcm9sbGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0KSB2aWV3cG9ydCE6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydDtcbiAgQFZpZXdDaGlsZCgndGFibGVTY3JvbGxpbmdDb250ZW50JykgY29udGVudDogVGVtcGxhdGVSZWY8b2JqZWN0PjtcblxuICAjdmlldzogVmlld0NvbnRhaW5lclJlZjtcbiAgaXRlbXMkOiBPYnNlcnZhYmxlPEFycmF5PHVua25vd24+PjtcbiAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxCaXp5VGFibGVSb3dDb21wb25lbnQ+O1xuXG4gIGl0ZW1TaXplOiBudW1iZXI7XG4gIFxuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAjc2Nyb2xsVG9wOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHVibGljIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIC8qKiBDYWxsZWQgYnkgdGhlIHZpcnR1YWwtZm9yIGRpcmVjdGl2ZSBpbnNpZGUgb2YgdGhlIHZpZXdwb3J0LiAqL1xuICBwdWJsaWMgYXR0YWNoVmlldyh0YWJsZURpcmVjdGl2ZTogQml6eVRhYmxlU2Nyb2xsaW5nRGlyZWN0aXZlKSB7XG4gICAgaWYgKHRoaXMuI3ZpZXcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgbGV0IGl0ZW1TaXplID0gMzA7XG4gICAgY29uc3Qgcm93SGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRhYmxlLXJvdy1oZWlnaHQnKTtcbiAgICBjb25zdCBmb250U2l6ZSA9ICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKTtcbiAgICBjb25zdCBnYXAgPSBOdW1iZXIoZm9udFNpemUuc3BsaXQoJ3B4JylbMF0pICogMC4xO1xuICAgIGlmIChyb3dIZWlnaHQgJiYgcm93SGVpZ2h0LmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgaXRlbVNpemUgPSBOdW1iZXIoZm9udFNpemUuc3BsaXQoJ3B4JylbMF0pICogTnVtYmVyKHJvd0hlaWdodC5zcGxpdCgncmVtJylbMF0pO1xuICAgIH0gZWxzZSBpZiAocm93SGVpZ2h0ICYmIHJvd0hlaWdodC5pbmNsdWRlcygncHgnKSkge1xuICAgICAgaXRlbVNpemUgPSBOdW1iZXIocm93SGVpZ2h0LnNwbGl0KCdweCcpWzBdKTtcbiAgICB9XG4gICAgdGhpcy5pdGVtU2l6ZSA9IGl0ZW1TaXplICsgZ2FwO1xuICAgIHRoaXMuaXRlbXMkID0gdGFibGVEaXJlY3RpdmUuaXRlbXMkO1xuICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gdGFibGVEaXJlY3RpdmUudGVtcGxhdGU7XG4gICAgdGhpcy4jdmlldyA9IHRhYmxlRGlyZWN0aXZlLnZpZXdDb250YWluZXJSZWY7XG4gICAgdGhpcy4jdmlldy5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5jb250ZW50KTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKGZyb21FdmVudCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcsIHsgY2FwdHVyZTogdHJ1ZSB9KS5waXBlKGRlYm91bmNlVGltZSgxMDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy4jc2Nyb2xsVG9wID0gdGhpcy52aWV3cG9ydC5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgfSkpO1xuXG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLml0ZW1zJC5waXBlKHNraXAoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy52aWV3cG9ydCkge1xuICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbFRvT2Zmc2V0KHRoaXMuI3Njcm9sbFRvcCk7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCBcbiAgICBbaXRlbVNpemVdPVwiaXRlbVNpemVcIlxuICAgIFttaW5CdWZmZXJQeF09XCJpdGVtU2l6ZSArIChpdGVtU2l6ZSAqIDIwKVwiXG4gICAgW21heEJ1ZmZlclB4XT1cIml0ZW1TaXplICsgKGl0ZW1TaXplICogNDApXCI+XG4gICAgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG4gICAgPG5nLXRlbXBsYXRlICN0YWJsZVNjcm9sbGluZ0NvbnRlbnQ+XG4gICAgICA8bmctdGVtcGxhdGUgbGV0LWl0ZW0gY2RrVmlydHVhbEZvciBbY2RrVmlydHVhbEZvck9mXT1cIml0ZW1zJCB8IGFzeW5jXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctdGVtcGxhdGU+XG48L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD4iXX0=