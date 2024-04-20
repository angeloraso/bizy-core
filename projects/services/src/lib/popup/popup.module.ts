import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyPopupWrapperComponent } from './popup-wrapper/popup-wrapper.component';
import { BizyPopupService } from './popup.service';
import { DialogModule } from '@angular/cdk/dialog';

const COMPONENTS = [
  BizyPopupWrapperComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, DialogModule],
  declarations: COMPONENTS,
  providers: [BizyPopupService]
})
export class BizyPopupModule {}
