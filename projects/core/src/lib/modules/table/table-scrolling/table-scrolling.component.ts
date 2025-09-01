import { debounceTime, fromEvent, Observable, skip, Subscription } from 'rxjs';
import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  Inject,
  ElementRef,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  DOCUMENT,
  inject
} from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';
import { BizyTableScrollingDirective } from './table-scrolling.directive';
import { CommonModule } from '@angular/common';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'bizy-table-scrolling',
  templateUrl: './table-scrolling.html',
  styleUrls: ['./table-scrolling.css'],
  imports: [CommonModule, ScrollingModule]
})

// FIX: This components fixes the bug with Angular CDK virtual scrolling not supporting content projection.
// https://github.com/angular/components/issues/15277
export class BizyTableScrollingComponent implements OnDestroy {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #ref = inject(ChangeDetectorRef);

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  @ViewChild('tableScrollingContent') content: TemplateRef<object>;

  #view: ViewContainerRef;
  items$: Observable<Array<unknown>>;
  itemTemplate: TemplateRef<BizyTableRowComponent>;

  itemSize: number;
  
  #subscription = new Subscription();
  #scrollTop: number = 0;

  /** Called by the virtual-for directive inside of the viewport. */
  public attachView(tableDirective: BizyTableScrollingDirective) {
    if (this.#view) {
      return;
    }
    
    let itemSize = 30;
    const rowHeight = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-table-row-height');
    const fontSize =  getComputedStyle(this.#document.documentElement).getPropertyValue('font-size');
    const gap = Number(fontSize.split('px')[0]) * 0.1;
    if (rowHeight && rowHeight.includes('rem')) {
      itemSize = Number(fontSize.split('px')[0]) * Number(rowHeight.split('rem')[0]);
    } else if (rowHeight && rowHeight.includes('px')) {
      itemSize = Number(rowHeight.split('px')[0]);
    }
    this.itemSize = itemSize + gap;
    this.items$ = tableDirective.items$;
    this.itemTemplate = tableDirective.template;
    this.#view = tableDirective.viewContainerRef;
    this.#view.createEmbeddedView(this.content);
    this.#ref.detectChanges();

    this.#subscription.add(fromEvent(this.#elementRef.nativeElement, 'scroll', { capture: true }).pipe(debounceTime(100)).subscribe(() => {
      this.#scrollTop = this.viewport.measureScrollOffset();
    }));

    this.#subscription.add(this.items$.pipe(skip(1)).subscribe(() => {
      if (this.viewport) {
        this.viewport.scrollToOffset(this.#scrollTop);
        this.#ref.detectChanges();
      }
    }));
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  #getClosestCssVariable = (element: HTMLElement, cssVariable: string): string | null => {
    while (element) {
      const value = getComputedStyle(element).getPropertyValue(cssVariable).trim();
      if (value) {
        return value;
      }
      element = element.parentElement as HTMLElement;
    }

    const rootValue = getComputedStyle(this.#document.documentElement).getPropertyValue(cssVariable).trim();
    return rootValue || null;
  }


  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}
