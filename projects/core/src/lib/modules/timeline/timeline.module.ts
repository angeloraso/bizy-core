import { NgModule } from '@angular/core';
import { BizyTimelineComponent } from './timeline.component';
import { BizyTimelineEventComponent } from './timeline-event/timeline-event.component';
import { BizyTimelineForDirective } from './timeline.directive';

const COMPONENTS = [
  BizyTimelineComponent,
  BizyTimelineEventComponent
];

@NgModule({
  imports: [...COMPONENTS, BizyTimelineForDirective],
  exports: [...COMPONENTS, BizyTimelineForDirective],
})

export class BizyTimelineModule {}
