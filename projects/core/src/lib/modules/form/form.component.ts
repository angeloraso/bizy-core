import { BizyDatePickerComponent } from './../date-picker/date-picker.component';
import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { BizyInputComponent } from '../input/input.component';
import { BizySelectComponent } from '../select/select.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bizy-form',
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFormComponent {
  @ContentChildren(BizyInputComponent, { descendants: true }) inputs: QueryList<BizyInputComponent>;
  @ContentChildren(BizySelectComponent, { descendants: true }) selects: QueryList<BizySelectComponent>;
  @ContentChildren(BizyDatePickerComponent, { descendants: true }) datePickers: QueryList<BizyDatePickerComponent>;
  @Input() id: string = `bizy-form-${Math.random()}`;
  @Input() customClass: string = '';

  onSubmit(event: Event) {
    this.setTouched();
    event.preventDefault();
  }

  setTouched = () => {
    if (this.inputs.length > 0) {
      this.inputs.forEach(component => {
        component.setTouched(true);
      });
    }

    if (this.selects.length > 0) {
      this.selects.forEach(component => {
        component.setTouched(true);
      });
    }

    if (this.datePickers.length > 0) {
      this.datePickers.forEach(component => {
        component.setTouched(true);
      });
    }
  }
}