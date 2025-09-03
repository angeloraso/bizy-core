import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, inject, ElementRef, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { BizyMenuBarOptionComponent } from './menu-bar-option/menu-bar-option.component';
import { BehaviorSubject, filter, Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-menu-bar',
  templateUrl: './menu-bar.html',
  styleUrls: ['./menu-bar.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id',
  }
})
export class BizyMenuBarComponent implements AfterContentInit {
  readonly #elementRef = inject(ElementRef);

  @ContentChildren(BizyMenuBarOptionComponent) options!: QueryList<BizyMenuBarOptionComponent>;
  @Input() id: string = `bizy-menu-bar-${Math.random()}`;
  @Output() selectedOptionChange = new EventEmitter<string>();

  getNativeElement = () => this.#elementRef?.nativeElement;

  @Input() set disabled(disabled: boolean) {
    if (typeof disabled === 'undefined' || disabled === null) {
      return;
    }

    this.#subscription.add(this.#afterContentInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
      if (this.options) {
        this.options.forEach((option: BizyMenuBarOptionComponent) => {
          option._setDisabled(disabled);
        });
      }
    }));
  }

  @Input() set selectedOption(selectedOption: string) {
    if (!selectedOption) {
      return;
    }

    this.#subscription.add(this.#afterContentInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
      if (this.options) {
        this.options.forEach((option: BizyMenuBarOptionComponent) => {
          option._setSelected(option.getId() === selectedOption);
        });
      }
    }));
  }

  _onSelect = (option: BizyMenuBarOptionComponent) => {
    if (this.disabled) {
      return;
    }

    this.selectedOptionChange.emit(option.getId());
  }

  #afterContentInit = new BehaviorSubject<boolean>(false);
  #subscription = new Subscription();

  ngAfterContentInit(): void {
    if (this.options) {
      this.options.forEach((option: BizyMenuBarOptionComponent) => {
        this.#subscription.add(option.onSelect.subscribe(() => {
          this._onSelect(option)
        }));
      });
    }

    this.#afterContentInit.next(true);
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}
