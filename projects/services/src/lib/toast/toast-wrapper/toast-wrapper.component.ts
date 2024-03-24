import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TOAST, ToastService } from '../toast.service';

@Component({
  selector: 'bizy-toast-wrapper',
  templateUrl: './toast-wrapper.html',
  styleUrls: ['./toast-wrapper.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastWrapperComponent {

  type: TOAST = TOAST.INFO;
  title: string = '';
  msg: string = '';

  constructor(
    @Inject(DIALOG_DATA) private data: {type: TOAST, title: string, msg: string},
    @Inject(ToastService) private toast: ToastService,
  ) {
    this.type = this.data.type;
    this.title = this.data.title;
    this.msg = this.data.msg;
  }

  close() {
    this.toast.close();
  }
}