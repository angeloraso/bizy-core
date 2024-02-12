import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, Inject, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'bizy-confirm-buttons',
  templateUrl: './confirm-buttons.html',
  styleUrls: ['./confirm-buttons.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmButtonsComponent {
  @Input() confirmLabel: string = 'Confirmar';
  @Input() cancelLabel: string = 'Cancelar';
  @Input() fixed: boolean = false;
  @Input() disabled: boolean = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  constructor(
    @Inject(ElementRef) private componentRef: ElementRef,
    @Inject(Renderer2) private renderer: Renderer2
  ) {
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.componentRef.nativeElement, 'position', 'sticky');
    this.renderer.setStyle(this.componentRef.nativeElement, 'bottom', '0');
    this.renderer.setStyle(this.componentRef.nativeElement, 'left', '0');
    this.renderer.setStyle(this.componentRef.nativeElement, 'right', '0');
    this.renderer.setStyle(this.componentRef.nativeElement, 'width', '100%');
  }
}
