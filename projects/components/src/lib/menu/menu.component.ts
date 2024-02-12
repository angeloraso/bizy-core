import { MenuOptionComponent } from './menu-option/menu-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bizy-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  @ContentChildren(MenuOptionComponent) options!: QueryList<MenuOptionComponent>;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() opened: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _menuWidth: number;

  #subscription = new Subscription();

  constructor(@Inject(ChangeDetectorRef) private ref: ChangeDetectorRef) {}

  _onSelect(event: any) {
    if (this.disabled) {
      return;
    }

    this.selectButton(event)
    this.onSelect.emit(event);
  }

  selectButton(event: any) {
    this.opened = !this.opened;

    if (event && event.srcElement && event.srcElement.offsetWidth) {
      this._menuWidth =  event.srcElement.offsetWidth; 
    }

    if (this.opened) {
      if (this.options) {
        this.options.forEach((option: MenuOptionComponent) => {
          this.#subscription.add(option.onSelect.subscribe(event => {
            this.close(event);
          }));
        });
      }
    } else {
      this.#subscription.unsubscribe();
    }
  }

  close = (event: PointerEvent & {target: {id: string}}) => {
    if (event && event.target && event.target.id && event.target.id === this.id) {
      return;
    }

    this.opened = false;
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}