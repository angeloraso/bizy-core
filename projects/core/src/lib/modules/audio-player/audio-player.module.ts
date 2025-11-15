import { NgModule } from '@angular/core';
import { BizyAudioPlayerComponent } from './audio-player.component';

const COMPONENTS: Array<any> = [BizyAudioPlayerComponent];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyAudioPlayerModule {}
