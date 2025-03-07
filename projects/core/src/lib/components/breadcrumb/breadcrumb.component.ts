import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { IBizyBreadcrumb } from './breadcrumb.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyBreadcrumbComponent {
  @Output() onSelect = new EventEmitter<IBizyBreadcrumb>();
  _breadcrumbs: Array<IBizyBreadcrumb> = [];
  showGoBack: boolean = false;

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  @Input() set breadcrumbs(breadcrumbs: Array<IBizyBreadcrumb>) {
    if (breadcrumbs) {
      this._breadcrumbs = breadcrumbs;
      this.showGoBack = false;
      let counter = 0;
      for (let i = 0; i < breadcrumbs.length; i++) {
        if (!breadcrumbs[i].skip) {
          counter++;
        }

        if (counter > 1) {
          this.showGoBack = true;
          this.ref.detectChanges();
          break;
        }
      }
    }
  }

  goTo(breadcrumb: IBizyBreadcrumb) {
    if (breadcrumb.skip) {
      return;
    }

    this.onSelect.emit(breadcrumb);
  }

  goBack() {
    if (!this._breadcrumbs[this._breadcrumbs.length - 2]) {
      return;
    }

    for (let i = this._breadcrumbs.length; i > 0; i--) {
      if (!this._breadcrumbs[i - 2].skip) {
        this.onSelect.emit(this._breadcrumbs[i - 2]);
        break;
      }
    }
  }
}
