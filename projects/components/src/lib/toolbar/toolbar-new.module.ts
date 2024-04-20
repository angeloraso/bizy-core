import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyToolbarNewComponent } from './toolbar-new.component';

const COMPONENTS = [
  BizyToolbarNewComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyToolbarNewModule {}
