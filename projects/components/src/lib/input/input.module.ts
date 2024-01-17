import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { IonicModule } from '@ionic/angular';
import { ErrorModule } from '../error';

const COMPONENTS = [InputComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class InputModule {}
