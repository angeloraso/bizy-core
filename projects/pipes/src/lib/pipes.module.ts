import { NgModule } from '@angular/core';
import { OrderByPipe } from './orderBy.pipe';
import { ReducePipe } from './reduce.pipe';
import { SafePipe } from './safe.pipe';
import { SearchPipe } from './search';

const PIPES = [
  OrderByPipe,
  ReducePipe,
  SafePipe,
  SearchPipe
];
@NgModule({
  declarations: PIPES,
  exports: PIPES,
  providers: [SearchPipe, OrderByPipe]
})
export class PipesModule {}
