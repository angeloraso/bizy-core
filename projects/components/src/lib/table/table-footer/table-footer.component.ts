import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input } from '@angular/core';

@Component({
  selector: 'bizy-table-footer',
  templateUrl: './table-footer.html',
  styleUrls: ['./table-footer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableFooterComponent {
  @Input() id: string = `bizy-table-footer-${Math.random()}`;
  @Input() customClass: string = '';

  marginRight = 0;

  _selectable: boolean = false;

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(ElementRef) public elementRef: ElementRef
  ) {}

  getId = (): string => {
    return this.id;
  }

  setSelectable = (selectable: boolean): void => {
    this._selectable = selectable;
    this.ref.detectChanges();
  }

  setMarginRight(margin: number) {
    this.marginRight = margin - 5;
    this.ref.detectChanges();
  }
}