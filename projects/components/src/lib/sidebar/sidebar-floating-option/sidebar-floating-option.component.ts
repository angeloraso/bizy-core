import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, OnInit, Output, QueryList } from '@angular/core';
import { BizySidebarOptionComponent } from '../sidebar-option/sidebar-option.component';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'bizy-sidebar-floating-option',
  templateUrl: './sidebar-floating-option.html',
  styleUrls: ['./sidebar-floating-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarFloatingOptionComponent implements AfterContentInit {
  @ContentChildren(BizySidebarOptionComponent) options!: QueryList<BizySidebarOptionComponent>;
  @Input() id: string = `bizy-sidebar-floating-option-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() selectable: boolean = true;
  @Input() offsetX: number = 0;
  @Input() offsetY: number = 0;
  @Input() customClass: string = '';
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _turnOn$ = new BehaviorSubject<boolean>(false);
  _selected: boolean = false;
  _opened: boolean = false;

  @Input() set selected(selected: boolean) {
    if (typeof selected === 'undefined' || selected === null) {
      return;
    }

    const turnOn = selected && selected !== this._selected;
    this._turnOn$.next(turnOn);
    this._opened = turnOn;
    this._selected = selected;
    this.ref.detectChanges();
  }

  #subscription = new Subscription();
  #optionSubscription = new Subscription();

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  ngAfterContentInit() {
    if (this.options && this.options.length > 0) {
      this.#listenOptionChanges(this.options.toArray());
      this.#subscription.add(this.options.changes.subscribe(() => {
        this.#optionSubscription.unsubscribe();
        this.#optionSubscription = new Subscription();
        this.#listenOptionChanges(this.options.toArray());
      }))
    }
  }

  _onSelect(event: PointerEvent) {
    if (this.disabled || !this.selectable) {
      return;
    }

    this._opened = !this._opened;
    this.ref.detectChanges();
    this.selectedChange.emit(this._opened);
    this.onSelect.emit(event);
  }

  close = (event: PointerEvent & {target: {id: string}}) => {
    if (event && event.target && event.target.id && event.target.id === this.id) {
      return;
    }

    this._opened = false;
    this.ref.detectChanges();
  }

  getId = (): string  => {
    return this.id;
  }

  getSelected = (): boolean  => {
    return this.selected;
  }

  #listenOptionChanges = (options: Array<BizySidebarOptionComponent>) => {
    options.forEach(_option => {
      this.#optionSubscription.add(_option._turnOn$.subscribe(turnOn => {
        if (turnOn) {
          if (!_option.options || _option.options.length === 0) {
            this._opened = false;
            this.ref.detectChanges();
          }

          this.#selectParents(this.options.toArray(), _option);
        }
      }));

      if (_option.options && _option.options.length > 0) {
        this.#listenOptionChanges(_option.options.toArray());
      }
    });
  }

  #selectParents = (options: Array<BizySidebarOptionComponent>, option: BizySidebarOptionComponent): boolean => {
    let founded: boolean = false;
    for (let i = 0; i < options.length; i++) {
      if (options[i].getId() === option.getId()) {
        founded = true;
      } else if (options[i].options && options[i].options.length > 0) {
        const _founded = this.#selectParents(options[i].options.toArray(), option);
        if (_founded) {
          founded = true;
          options[i].selectedChange.emit(true);
        } else {
          options[i].selectedChange.emit(false);
        }
        
      } else {
        options[i].selectedChange.emit(false);
      }
    }

    return founded;
  };

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    this.#optionSubscription.unsubscribe();
  }
}