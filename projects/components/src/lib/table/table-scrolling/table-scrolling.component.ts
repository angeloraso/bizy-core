import { Observable } from 'rxjs';
import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  Inject,
  ElementRef,
} from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';
import { BizyTableScrollingDirective } from './table-scrolling.directive';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'bizy-table-scrolling',
  templateUrl: './table-scrolling.html',
  styleUrls: ['./table-scrolling.css']
})

// FIX: This components fixes the bug with Angular CDK virtual scrolling not supporting content projection.
// https://github.com/angular/components/issues/15277
export class BizyTableScrollingComponent {
  @ViewChild('tableScrollingContent') content: TemplateRef<object>;

  #view: ViewContainerRef;
  items$: Observable<Array<unknown>>;
  itemTemplate: TemplateRef<BizyTableRowComponent>;

  itemSize: number;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(ElementRef) public elementRef: ElementRef
  ) {}

  /** Called by the virtual-for directive inside of the viewport. */
  public attachView(tableDirective: BizyTableScrollingDirective) {
    if (this.#view) {
      return;
    }
    
    let itemSize = 30;
    const rowHeight = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-table-row-height');
    const fontSize =  getComputedStyle(this.document.documentElement).getPropertyValue('font-size');
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
  }
}
