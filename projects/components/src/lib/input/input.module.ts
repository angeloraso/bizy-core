import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyInputComponent } from './input.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyInputOptionComponent } from './input-option/input-option.component';
import { BizyDirectivesModule } from '@bizy/directives';

const COMPONENTS = [BizyInputComponent, BizyInputOptionComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    BizyDirectivesModule
  ],
  providers: [DecimalPipe],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyInputModule {}
