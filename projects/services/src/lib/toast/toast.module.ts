import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { ToastService } from './toast.service';
import { DialogModule } from '@angular/cdk/dialog';

const COMPONENTS = [
  ToastWrapperComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, DialogModule],
  declarations: COMPONENTS,
  providers: [ToastService]
})
export class ToastModule {}
