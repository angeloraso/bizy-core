import { DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { TOAST, BizyToastService } from '../toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-toast-wrapper',
  templateUrl: './toast-wrapper.html',
  styleUrls: ['./toast-wrapper.css'],
  imports: [CommonModule, DialogModule],
  providers: [BizyToastService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyToastWrapperComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #data: {type: TOAST, title: string, msg: string, id: string, duration: number} = inject(DIALOG_DATA);
  readonly #toast = inject(BizyToastService);

  type: TOAST = TOAST.INFO;
  title: string = '';
  msg: string = '';
  id: string;

  ngOnInit() {
    if (!this.#data) {
      this.close();
      return;
    }

    this.type = this.#data.type;
    this.title = this.#data.title;
    this.msg = this.#data.msg;
    this.id = this.#data.id;

    setTimeout(() => {
      this.close();
    }, this.#data.duration || 3000);
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  close() {
    this.#toast.close(this.id);
  }
}