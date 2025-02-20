import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyInputComponent } from './input.component';
import { BizyDirectivesModule } from '@bizy/directives';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyInputOptionComponent } from './input-option/input-option.component';

const COMPONENTS = [BizyInputComponent, BizyInputOptionComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BizyDirectivesModule,
    OverlayModule
  ],
  providers: [DecimalPipe],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyInputModule {}
