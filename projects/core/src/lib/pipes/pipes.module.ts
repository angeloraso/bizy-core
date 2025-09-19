import { NgModule } from '@angular/core';
import { BizyRepeatPipe } from './repeat.pipe';
import { BizySetToArrayPipe } from './set-to-array.pipe';
import { BizyEnumToArrayPipe } from './enum-to-array.pipe';
import { BizyOrderByPipe } from './order-by.pipe';
import { BizyReducePipe } from './reduce.pipe';
import { BizySafePipe } from './safe.pipe';
import { BizyAveragePipe } from './average.pipe';
import { BizySearchPipe } from './search';
import { BizyFormatSecondsPipe } from './format-seconds.pipe';
import { BizyExtractNumbersPipe } from './extractNumbers.pipe';
import { BizyRoundPipe } from './round.pipe';

const PIPES: Array<any> = [
  BizyRepeatPipe,
  BizySetToArrayPipe,
  BizyEnumToArrayPipe,
  BizyOrderByPipe,
  BizyReducePipe,
  BizySafePipe,
  BizyAveragePipe,
  BizySearchPipe,
  BizyFormatSecondsPipe,
  BizyExtractNumbersPipe,
  BizyRoundPipe
]

@NgModule({
  imports: PIPES,
  exports: PIPES,
  providers: PIPES
})

export class BizyPipesModule {}
