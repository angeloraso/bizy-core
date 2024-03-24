import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bizy-table-header',
  templateUrl: './table-header.html',
  styleUrls: ['./table-header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableHeaderComponent {
  @Input() id: string = String(Math.random());
  @Input() customClass: string = '';
  @Input() selected: boolean = false;
  @Input() selectable: boolean | null = null;
  @Output() onSelect = new EventEmitter<boolean>();

  marginRight = 0;

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  getId = (): string => {
    return this.id;
  }

  getSelected = (): boolean => {
    return this.selected;
  }

  setSelectable = (selectable: boolean): void => {
    if (this.selectable === false) {
      return;
    }

    this.selectable = selectable;
    this.ref.detectChanges();
  }

  setMarginRight(margin: number) {
    this.marginRight = margin - 5;
    this.ref.detectChanges();
  }
}