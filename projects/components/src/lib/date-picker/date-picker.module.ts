import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyDatePickerComponent } from './date-picker.component';
import { BizyInputModule } from '../input';

const COMPONENTS = [
  BizyDatePickerComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, BizyInputModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [DatePipe]
})
export class BizyDatePickerModule {}
