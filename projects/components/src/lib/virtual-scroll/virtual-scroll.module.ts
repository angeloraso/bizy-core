import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BizyVirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { BizyVirtualScrollComponent } from './virtual-scroll.component';

@NgModule({
  imports: [CommonModule, ScrollingModule],
  declarations: [
    BizyVirtualScrollComponent,
    BizyVirtualScrollNgForDirective
  ],
  exports: [
    BizyVirtualScrollComponent,
    BizyVirtualScrollNgForDirective
  ],
})
export class BizyVirtualScrollModule {}
