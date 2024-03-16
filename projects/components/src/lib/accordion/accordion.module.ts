import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionComponent } from './accordion.component';

const COMPONENTS = [
  AccordionComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AccordionModule {}
