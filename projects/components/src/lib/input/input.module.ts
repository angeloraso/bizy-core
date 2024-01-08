import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HelpModule } from '../help';
import { DirectivesModule } from '../../directives';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const COMPONENTS = [
  InputComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, HelpModule, DirectivesModule, MatDatepickerModule, MatNativeDateModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } // Change date picker format to dd/MM/yyyy
  ]
})
export class InputModule {}
