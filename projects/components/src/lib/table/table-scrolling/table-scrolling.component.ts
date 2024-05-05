import { Observable } from 'rxjs';
import {
  Component,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
  ViewContainerRef,
  Inject,
  ElementRef,
} from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';
import { BizyTableScrollingDirective } from './table-scrolling.directive';

@Component({
  selector: 'bizy-table-scrolling',
  templateUrl: './table-scrolling.html',
  styleUrls: ['./table-scrolling.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

// FIX: This components fixes the bug with Angular CDK virtual scrolling not supporting content projection.
// https://github.com/angular/components/issues/15277
export class BizyTableScrollingComponent<T> {
  @ViewChild('tableScrollingContent') content: TemplateRef<object>;

  #view: ViewContainerRef;
  items$: Observable<Array<T>>;
  itemTemplate: TemplateRef<BizyTableRowComponent>;

  itemSize: number;

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef
  ) {}

  /** Called by the virtual-for directive inside of the viewport. */
  public attachView(tableDirective: BizyTableScrollingDirective<T>) {
    if (this.#view) {
      return;
    }
    
    const fontSize = window
      .getComputedStyle(this.elementRef.nativeElement)
      .getPropertyValue('font-size');
    this.itemSize = (Number(fontSize.split('px')[0]) || 14) * 2;
    this.items$ = tableDirective.items$;
    this.itemTemplate = tableDirective.template;
    this.#view = tableDirective.viewContainerRef;
    this.#view.createEmbeddedView(this.content);
  }
}
