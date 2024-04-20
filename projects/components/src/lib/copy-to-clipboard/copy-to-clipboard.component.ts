import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, Inject, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/**
 * "items" is an item array to copy to clipboard as plain text
 * "model" is the item data model that helps to print the item array correctly
 * Example:
 *  items = [{name: "Name 1", lastName: "Last name 1"}, {name: "Name 2", lastName: "Last name 2"}, {name: "Name 3", lastName: "Last name 3"}]
 *  model = {name: "Name", lastName: "Last name"}
 */
@Component({
  selector: 'bizy-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.html',
  styleUrls: ['./copy-to-clipboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyCopyToClipboardComponent {
  @Input() customClass: string = '';
  @Input() items: Array<any>;
  @Input() text: string;
  @Input() model: Record<string, string>;
  @Output() copied = new EventEmitter<void>();

  #loading = new BehaviorSubject<boolean>(false);

  get loading$() {
    return this.#loading.asObservable();
  }

  constructor(
    @Inject(Clipboard) private clipboard: Clipboard,
  ) {}

  // Copy to clipboard in CSV format
  async copyToClipboard() {
    if (this.#loading.value || (!Array.isArray(this.items) && !this.text) || (!this.model && !this.text)) {
      return;
    }

    try {
      this.#loading.next(true);
      await this.initCopy();
      this.copied.emit();
    } finally {
      this.#loading.next(false);
    }
  }

  initCopy() {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        let toCopy = '';

        for (const key in this.model) {
          if (key) {
            toCopy += `${this.model[key]},`;
          }
        }

        if (this.text) {
          toCopy = this.text;
        } else {
          this.items.forEach(_item => {
            // Remove the last character (',')
            toCopy = toCopy.slice(0, -2);
            toCopy += '\n';

            for (const key in this.model) {
              let value: any = _item;
              const nestedProperty = key.split('.');
              nestedProperty.forEach(_property => {
                value = value[_property];
              });
              if (value) {
                toCopy += `${value},`;
              } else {
                toCopy += ',';
              }
            }
          });
        }

        const pending = this.clipboard.beginCopy(toCopy);
        let remainingAttempts = 3;
        const attempt = () => {
          const result = pending.copy();
          if (!result && --remainingAttempts) {
            setTimeout(attempt);
          } else {
            // Remember to destroy when you're done!
            pending.destroy();
            resolve();
          }
        };

        attempt();
      }, 100);
    });
  }
}
