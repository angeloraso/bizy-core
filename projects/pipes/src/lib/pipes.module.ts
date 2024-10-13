import { NgModule } from '@angular/core';
import { BizyOrderByPipe } from './orderBy.pipe';
import { BizyReducePipe } from './reduce.pipe';
import { BizySafePipe } from './safe.pipe';
import { BizySearchPipe } from './search';
import { BizySelectedPipe } from './selected.pipe';
import { BizySetToArrayPipe } from './setToArray.pipe';
import { BizyFormatSecondsPipe, BizyFormatSecondsService } from './formatSeconds';
import { BizyAveragePipe } from './average.pipe';
import { BizyRepeatPipe } from './repeat.pipe';

const PIPES: Array<any> = [
  BizyOrderByPipe,
  BizyReducePipe,
  BizySafePipe,
  BizySearchPipe,
  BizySelectedPipe,
  BizySetToArrayPipe,
  BizyFormatSecondsPipe,
  BizyAveragePipe,
  BizyRepeatPipe
];
@NgModule({
  declarations: PIPES,
  exports: PIPES,
  providers: PIPES.concat([BizyFormatSecondsService])
})
export class BizyPipesModule {}
