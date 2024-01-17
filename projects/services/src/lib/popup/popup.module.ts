import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupWrapperComponent } from './popup-wrapper/popup-wrapper.component';
import { PopupService } from './popup.service';
import { DialogModule } from '@angular/cdk/dialog';

const COMPONENTS = [
  PopupWrapperComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, DialogModule],
  declarations: COMPONENTS,
  providers: [PopupService]
})
export class PopupModule {}
