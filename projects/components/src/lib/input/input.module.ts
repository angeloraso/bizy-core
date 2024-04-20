import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyInputComponent } from './input.component';
import { IonicModule } from '@ionic/angular';
import { BizyErrorModule } from '../error';
import { BizyConfirmButtonsModule } from '../confirm-buttons';

const COMPONENTS = [BizyInputComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BizyErrorModule,
    BizyConfirmButtonsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class BizyInputModule {}
