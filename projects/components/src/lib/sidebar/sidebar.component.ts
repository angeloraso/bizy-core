import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit} from '@angular/core';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { Subscription } from 'rxjs';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';

@Component({
  selector: 'bizy-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarComponent implements AfterContentInit {
  @Input() id: string = `bizy-sidebar-${Math.random()}`;
  @ContentChildren(BizySidebarOptionComponent) options!: QueryList<BizySidebarOptionComponent>;
  @ContentChildren(BizySidebarFloatingOptionComponent) floatingOptions!: QueryList<BizySidebarFloatingOptionComponent>;
  @Input() toggle: boolean = false;
  @Output() onToggle = new EventEmitter<boolean>(); 

  #subscription = new Subscription();
  #optionSubscription = new Subscription();
  #floatingOptionSubscription = new Subscription();

  ngAfterContentInit() {
    if (this.options && this.options.length > 0) {
      this.#listenOptionChanges(this.options.toArray());
      this.#subscription.add(this.options.changes.subscribe(() => {
        this.#optionSubscription.unsubscribe();
        this.#optionSubscription = new Subscription();
        this.#listenOptionChanges(this.options.toArray());
      }))
    }

    if (this.floatingOptions && this.floatingOptions.length > 0) {
      this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
      this.#subscription.add(this.floatingOptions.changes.subscribe(() => {
        this.#floatingOptionSubscription.unsubscribe();
        this.#floatingOptionSubscription = new Subscription();
        this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
      }))
    }
  }

  #listenOptionChanges = (options: Array<BizySidebarOptionComponent>) => {
    options.forEach(_option => {
      this.#optionSubscription.add(_option._turnOn$.subscribe(turnOn => {
        if (turnOn) {
          this.#selectParents(this.options.toArray(), _option);
        }
      }));

      if (_option.options && _option.options.length > 0) {
        this.#listenOptionChanges(_option.options.toArray());
      }
    });
  }

  #listenFloatingOptionChanges = (options: Array<BizySidebarFloatingOptionComponent>) => {
    options.forEach(_option => {
      this.#floatingOptionSubscription.add(_option._turnOn$.subscribe(turnOn => {
        if (turnOn) {
          this.floatingOptions.forEach(__option => {
            if (__option.getId() !== _option.getId()) {
              setTimeout(() => {
                __option.selectedChange.emit(false);
              }, 100);
            }
          })
        }
      }));
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
          setTimeout(() => {
            options[i].selectedChange.emit(true);
          }, 100)
        } else {
          setTimeout(() => {
            options[i].selectedChange.emit(false);
          }, 100)
        }
        
      } else {
        setTimeout(() => {
          options[i].selectedChange.emit(false);
        }, 100)
      }
    }

    return founded;
  };

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    this.#optionSubscription.unsubscribe();
    this.#floatingOptionSubscription.unsubscribe();
  }
}