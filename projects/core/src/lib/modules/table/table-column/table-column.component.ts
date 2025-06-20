import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, inject, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'bizy-table-column',
  templateUrl: './table-column.html',
  styleUrls: ['./table-column.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableColumnComponent {
  @Input() id: string = `bizy-table-column-${Math.random()}`;
  @Input() customClass: string = '';
  @Output() contextMenu = new EventEmitter<MouseEvent>();
  @Output() onSelect = new EventEmitter<PointerEvent>();

  readonly #elementRef = inject(ElementRef);

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    this.contextMenu.emit(event);
  }

  getId = (): string => {
    return this.id;
  }

  setMarginLeft(margin: number): void {
    if (!this.#elementRef.nativeElement || !this.#elementRef.nativeElement.setMarginLeft) {
      return;
    }

    this.#elementRef.nativeElement.setMarginLeft(margin);
  }
}