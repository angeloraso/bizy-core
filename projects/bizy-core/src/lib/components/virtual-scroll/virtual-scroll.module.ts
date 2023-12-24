import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VirtualScrollGridDirective } from './virtual-scroll-grid.directive';
import { VirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { VirtualScrollComponent } from './virtual-scroll.component';

@NgModule({
  imports: [CommonModule, ScrollingModule],
  declarations: [
    VirtualScrollComponent,
    VirtualScrollGridDirective,
    VirtualScrollNgForDirective,
  ],
  exports: [
    VirtualScrollComponent,
    VirtualScrollGridDirective,
    VirtualScrollNgForDirective,
  ],
})
export class VirtualScrollModule {}
