import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { BizyToastService } from './toast.service';
import { DialogModule } from '@angular/cdk/dialog';

const COMPONENTS = [
  BizyToastWrapperComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, DialogModule],
  declarations: COMPONENTS,
  providers: [BizyToastService]
})
export class BizyToastModule {}
