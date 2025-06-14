import { NgModule } from '@angular/core';
import { BizyTimelineComponent } from './timeline.component';
import { BizyTimelineEventComponent } from './timeline-event/timeline-event.component';

const COMPONENTS = [
  BizyTimelineComponent,
  BizyTimelineEventComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyTimelineModule {}
