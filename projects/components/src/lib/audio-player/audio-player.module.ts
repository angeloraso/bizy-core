import { NgModule } from '@angular/core';
import { BizyAudioPlayerComponent } from './audio-player.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyButtonModule } from '../button';

const COMPONENTS = [
  BizyAudioPlayerComponent,
];

const MODULES = [CommonModule, FormsModule, BizyButtonModule];

@NgModule({
  imports: MODULES,
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyAudioPlayerModule {}
