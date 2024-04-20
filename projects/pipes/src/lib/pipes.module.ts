import { NgModule } from '@angular/core';
import { BizyOrderByPipe } from './orderBy.pipe';
import { BizyReducePipe } from './reduce.pipe';
import { BizySafePipe } from './safe.pipe';
import { BizySearchPipe } from './search';
import { BizySelectedPipe } from './selected.pipe';

const PIPES = [
  BizyOrderByPipe,
  BizyReducePipe,
  BizySafePipe,
  BizySearchPipe,
  BizySelectedPipe
];
@NgModule({
  declarations: PIPES,
  exports: PIPES,
  providers: PIPES
})
export class BizyPipesModule {}
