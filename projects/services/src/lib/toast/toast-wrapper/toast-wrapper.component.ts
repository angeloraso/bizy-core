import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TOAST, BizyToastService } from '../toast.service';

@Component({
  selector: 'bizy-toast-wrapper',
  templateUrl: './toast-wrapper.html',
  styleUrls: ['./toast-wrapper.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyToastWrapperComponent {

  type: TOAST = TOAST.INFO;
  title: string = '';
  msg: string = '';
  id: string;

  constructor(
    @Inject(DIALOG_DATA) private data: {type: TOAST, title: string, msg: string, id: string},
    @Inject(BizyToastService) private toast: BizyToastService,
  ) {
    this.type = this.data.type;
    this.title = this.data.title;
    this.msg = this.data.msg;
    this.id = this.data.id;

    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.toast.close(this.id);
  }
}