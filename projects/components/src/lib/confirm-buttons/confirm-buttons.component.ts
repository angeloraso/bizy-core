import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'bizy-confirm-buttons',
  templateUrl: './confirm-buttons.html',
  styleUrls: ['./confirm-buttons.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmButtonsComponent {
  @Input() confirmLabel: string = 'Confirmar';
  @Input() cancelLabel: string = 'Cancelar';
  @Input() position: 'fixed' | 'sticky';
  @Input() disabled: boolean = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
