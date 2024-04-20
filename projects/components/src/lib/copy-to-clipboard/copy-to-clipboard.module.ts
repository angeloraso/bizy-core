import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BizyCopyToClipboardComponent } from './copy-to-clipboard.component';

const COMPONENTS = [
  BizyCopyToClipboardComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, ClipboardModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyCopyToClipboardModule {}
