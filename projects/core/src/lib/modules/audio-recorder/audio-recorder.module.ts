import { NgModule } from '@angular/core';
import { BizyAudioRecorderComponent } from './audio-recorder.component';

const COMPONENTS: Array<any> = [
  BizyAudioRecorderComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyAudioRecorderModule {}
