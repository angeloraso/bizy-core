import { NgModule } from '@angular/core';
import { SearchPipe } from './search';
import { TranslatePipe } from './translate.pipe';
import { OrderAlphabeticallyPipe } from './orderAlphabetically.pipe';
import { SafePipe } from './safe.pipe';

const PIPES = [SearchPipe, TranslatePipe, OrderAlphabeticallyPipe, SafePipe];
@NgModule({
  declarations: PIPES,
  exports: PIPES
})

export class PipesModule {}
