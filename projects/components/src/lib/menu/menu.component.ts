import { BizyMenuOptionComponent } from './menu-option/menu-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, inject, Input, Output, QueryList } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'bizy-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyMenuComponent {
  readonly #ref = inject(ChangeDetectorRef);

  @ContentChildren(BizyMenuOptionComponent) options!: QueryList<BizyMenuOptionComponent>;
  @Input() id: string = `bizy-menu-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() offsetX: number = 0;
  @Input() offsetY: number = 0;
  @Input() customClass: string = '';
  @Input() hideArrow: boolean = false;
  @Input() opened: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _menuWidth: number;

  #subscription = new Subscription();

  _onSelect(event: any) {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit(event);

    if (this.options && this.options.length > 0) {
      this.selectButton(event)
    }
  }

  selectButton(event: any) {
    this.opened = !this.opened;

    if (event && event.srcElement && event.srcElement.offsetWidth) {
      this._menuWidth =  event.srcElement.offsetWidth; 
    }

    if (this.opened) {
      this.#subscription = new Subscription();
      this.#subscription.add(fromEvent(window, 'scroll', { capture: true }).subscribe(() => {
        this.opened = false;
        this.#ref.detectChanges();
        this.#subscription.unsubscribe();
      }));

      if (this.options) {
        this.options.forEach((option: BizyMenuOptionComponent) => {
          this.#subscription.add(option.onSelect.subscribe(event => {
            this.close(event);
          }));
        });
      }
    } else {
      this.#subscription.unsubscribe();
    }
  }

  close = (event: Event & {target: {id: string}}) => {
    if (event && event.target && event.target.id && event.target.id === this.id) {
      return;
    }

    this.opened = false;
    this.#subscription.unsubscribe();
    this.#ref.detectChanges();
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}