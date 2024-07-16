import { NgModule } from '@angular/core';
import { BizyOrderByPipe } from './orderBy.pipe';
import { BizyReducePipe } from './reduce.pipe';
import { BizySafePipe } from './safe.pipe';
import { BizySearchPipe } from './search';
import { BizySelectedPipe } from './selected.pipe';
import { BizySetToArrayPipe } from './setToArray.pipe';
import { BizyFormatSecondsPipe } from './formatSeconds.pipe';

const PIPES = [
  BizyOrderByPipe,
  BizyReducePipe,
  BizySafePipe,
  BizySearchPipe,
  BizySelectedPipe,
  BizySetToArrayPipe,
  BizyFormatSecondsPipe
];
@NgModule({
  declarations: PIPES,
  exports: PIPES,
  providers: PIPES
})
export class BizyPipesModule {}
