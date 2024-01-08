import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bizy-input',
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  @Input() title: string = '';
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  @Input() type: string = 'text';
  @Input() control: FormControl<string | number>;


  updateDate(dateISOString: string) {
    this.control.setValue(dateISOString);
  }

  focus() {
    
  }
}