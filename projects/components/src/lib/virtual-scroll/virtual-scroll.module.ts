import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BizyVirtualScrollGridDirective } from './virtual-scroll-grid.directive';
import { BizyVirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { BizyVirtualScrollComponent } from './virtual-scroll.component';

@NgModule({
  imports: [CommonModule, ScrollingModule],
  declarations: [
    BizyVirtualScrollComponent,
    BizyVirtualScrollGridDirective,
    BizyVirtualScrollNgForDirective,
  ],
  exports: [
    BizyVirtualScrollComponent,
    BizyVirtualScrollGridDirective,
    BizyVirtualScrollNgForDirective,
  ],
})
export class BizyVirtualScrollModule {}
