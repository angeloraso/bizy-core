import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IButtonOption } from './button.types';

@Component({
  selector: 'bizy-button',
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() customClass: string;
  @Input() options: Array<IButtonOption> = [];
  @Input() opened: boolean = false;
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<Event>();

  _menuWidth: number;

  selectButton(event: any) {
    if (!this.options || this.options.length === 0) {
      return;
    }

    this.opened = !this.opened;
    this.selected = !this.selected;

    if (event && event.srcElement && event.srcElement.offsetWidth) {
      this._menuWidth =  event.srcElement.offsetWidth; 
    }
  }

  selectOption(option: IButtonOption, event: any) {
    if (option.options && option.options.length > 0) {
      if (event && event.srcElement && event.srcElement.offsetWidth) {
        option._menuWidth =  event.srcElement.offsetWidth; 
      }

      option.opened = !option.opened;
      option.selected = !option.selected;
    } else {
      this.closeAll();
    }

    if (option.onSelect) {
      option.onSelect();
    }
  }

  closeAll() {
    this.options.forEach(_option => {
      if (_option.options && _option.options.length > 0) {
        _option.options.forEach(__option => {
          __option.selected = false;
          __option.opened = false;
        })
      }

      _option.selected = false;
      _option.opened = false;
    })  
  }
}