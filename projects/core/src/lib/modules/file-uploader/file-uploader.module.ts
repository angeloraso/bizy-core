import { NgModule } from '@angular/core';
import { BizyFileUploaderComponent } from './file-uploader.component';
import { BizyFileUploaderService } from './file-uploader.service';

const COMPONENTS: Array<any> = [
  BizyFileUploaderComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
  providers: [BizyFileUploaderService]
})

export class BizyFileUploaderModule {}
