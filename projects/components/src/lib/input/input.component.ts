import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'bizy-input',
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
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
  @Input() type: 'text' | 'date' | 'password' | 'email' | 'number' | 'search' | 'tel' = 'text';
  @Input() label: string = '';
  @Input() max: number;
  @Input() maxLength: number;
  @Input() min: number;
  @Input() minLength: number;
  @Input() control: FormControl;
  @Input() placeholder: string = '';
  @Input() customClass: string;
  @Output() onFocus = new EventEmitter<void>();


  onInput(event: {target: {value: string | number}}) {
    if (!event || !event.target) {
      return;
    }

    this.control.markAsTouched();
    this.control.setValue(event.target.value ?? null);
  }

  onBlur() {
    this.control.markAsTouched();
  }

  focus() {
    if (!this.bizyInput || !this.bizyInput.setFocus) {
      return;
    }

    this.bizyInput.setFocus();
  }
}