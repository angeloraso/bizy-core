import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonDatetime, IonInput } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';

@Component({
  selector: 'bizy-input',
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyInputComponent {
  @ViewChild('bizyInput') bizyInput: IonInput;
  @Input() id: string = `bizy-input-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() multiple: boolean = false;
  @Input() clear: boolean = true;
  @Input() autoFocus: boolean = true;
  @Input() autoCapitalize: boolean = false;
  @Input() autoCorrect: boolean = false;
  @Input() browserAutoComplete: boolean = true;
  @Input() type: 'text' | 'date' | 'date-time' | 'time' | 'month-year' | 'month' | 'year' | 'password' | 'email' | 'number' | 'search' | 'tel' = 'text';
  @Input() label: string = '';
  @Input() max: number;
  @Input() maxLength: number;
  @Input() min: number;
  @Input() minLength: number;
  @Input() control: FormControl;
  @Input() value: string | number;
  @Input() placeholder: string = '';
  @Input() cancelLabel: string = 'Cancelar';
  @Input() confirmLabel: string = 'Confirmar';
  @Input() customClass: string;
  @Output() onFocus = new EventEmitter<void>();
  @Output() onEnter = new EventEmitter<void>();
  @Output() onBlur = new EventEmitter<void>();

  constructor(@Inject(ChangeDetectorRef) private ref: ChangeDetectorRef) {}

  onInput = (event: {target: {value: string | number}}) => {
    if (!event || !event.target) {
      return;
    }

    if (this.control) {
      this.control.markAsTouched();
      this.control.setValue(event.target.value ?? null);
    } else {
      this.value = event.target.value;
    }
    this.ref.detectChanges();
  }

  _onBlur() {
    if (this.control) {
      this.control.markAsTouched();
    }

    this.onBlur.emit();
  }

  focus() {
    if (!this.bizyInput || !this.bizyInput.setFocus) {
      return;
    }

    this.bizyInput.setFocus();
  }

  cancel(modal: IonModal, dateTime: IonDatetime) {
    if (!modal || !dateTime) {
      return;
    }

    dateTime.cancel();
    modal.dismiss();
  }

  confirm(modal: IonModal, dateTime: IonDatetime) {
    if (!modal || !dateTime || !dateTime.value) {
      return;
    }

    dateTime.confirm();

    setTimeout(() => {
      this.onInput({target: {value: String(dateTime.value) }})
      modal.dismiss();
    }, 1)
  }
}