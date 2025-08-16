import { BizySelectOptionComponent } from './select-option/select-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, QueryList, ContentChildren, AfterViewInit, ViewChild, ContentChild, TemplateRef, inject, ViewContainerRef, ElementRef } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { BizyInputComponent } from '../input/input.component';
import { Portal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-select',
  templateUrl: './select.html',
  styleUrls: ['./select.css'],
  imports: [CommonModule, BizyInputComponent, OverlayModule, PortalModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySelectComponent implements AfterViewInit {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);
  #viewContainerRef = inject(ViewContainerRef);
  @ViewChild('templatePortalContent') templatePortalContent: TemplateRef<unknown>;
  @ContentChildren(BizySelectOptionComponent) options: QueryList<BizySelectOptionComponent>;
  @ViewChild('bizyInput') bizyInput: BizyInputComponent;
  @Input() id: string = `bizy-select-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() placeholder: string = '';
  @Input() customClass: string = '';
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();
  @Output() onOpen = new EventEmitter<boolean>();

  _optionValue: string = '';
  optionPortal: Portal<any>;
  templatePortal: TemplatePortal<any> | null = null;

  #subscription = new Subscription();
  #contentChildrenSubscription = new Subscription();

  get touched(): boolean {
    return this.bizyInput ? this.bizyInput.touched : false;
  }

  ngAfterViewInit() {
    this.templatePortal = new TemplatePortal(this.templatePortalContent, this.#viewContainerRef);
    this._optionValue = '';

    const option = this.options.find(_option => _option.getSelected());

    if (option) {
      this._optionValue = option.getValue();
    }

    this.options.forEach(_option => {
      this.#subscription.add(_option.onSelect.subscribe(() => {
        this.close();
        this.#ref.detectChanges();
      }));

      this.#subscription.add(_option.selected$.pipe(filter(_value => _value === true)).subscribe(() => {
        this._optionValue = _option.getValue();
        this.#ref.detectChanges();
      }));
    });

    this.#contentChildrenSubscription.add(this.options.changes.subscribe(() => {
      this.#subscription.unsubscribe();
      this.#subscription = new Subscription();

      this.options.forEach(_option => {
        this.#subscription.add(_option.onSelect.subscribe(() => {
          this.close();
          this.#ref.detectChanges();
        }));

        this.#subscription.add(_option.selected$.pipe(filter(_value => _value === true)).subscribe(() => {
          this._optionValue = _option.getValue();
          this.#ref.detectChanges();
        }));
      });
    }));
    this.#ref.detectChanges();
  }

  _onOpen(event: PointerEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.opened = !this.opened;
    this.onSelect.emit(event);
    this.openedChange.emit(this.opened);
    this.onOpen.emit(this.opened);

    if (this.bizyInput) {
      this.bizyInput.setFocus(true);
    }
    this.#ref.detectChanges();
  }

  close = (event?: PointerEvent & {target: {id: string}}, select?: BizyInputComponent) => {
    if (select && event && event.target && event.target === select.bizyInputWrapper.nativeElement) {
      return;
    }

    this.opened = false;
    this.openedChange.emit(this.opened);
    this.onOpen.emit(this.opened);
    this.#ref.detectChanges();
  }

  setTouched(touched: boolean) {
    if (this.bizyInput) {
      this.bizyInput.setTouched(touched);
      this.#ref.detectChanges();
    }
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    this.#contentChildrenSubscription.unsubscribe();
  }
}