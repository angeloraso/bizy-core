import { CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import { BizyMenuOptionComponent } from './menu-option/menu-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, inject, Input, Output, QueryList, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
  imports: [CommonModule, FormsModule, OverlayModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyMenuComponent {
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

  @ViewChild(CdkConnectedOverlay) overlay!: CdkConnectedOverlay;
  @ContentChildren(BizyMenuOptionComponent) options!: QueryList<BizyMenuOptionComponent>;
  @Input() id: string = `bizy-menu-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() offsetX: number = 0;
  @Input() offsetY: number = 0;
  @Input() customClass: string = '';
  @Input() hideArrow: boolean = false;
  @Input() opened: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _menuWidth: number = 0;

  #subscription = new Subscription();
  #overlayCssVariables: string[] = [];

  readonly bizyMenuOptionsId = 'bizyMenuOptionsId';

  syncOverlayCssVariables() {
    const panel = this.overlay.overlayRef?.overlayElement;
    if (!panel) {
      return;
    }

    for (const property of this.#overlayCssVariables) {
      panel.style.removeProperty(property);
    }

    const styles = getComputedStyle(this.#elementRef.nativeElement);
    this.#overlayCssVariables = [];

    for (let index = 0; index < styles.length; index++) {
      const property = styles.item(index);
      if (property.startsWith('--')) {
        panel.style.setProperty(property, styles.getPropertyValue(property));
        this.#overlayCssVariables.push(property);
      }
    }

    this.overlay.overlayRef?.updatePosition();
  }

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
        if (event && event.target && event.target.id && (event.target.id === this.id || event.target.id === this.bizyMenuOptionsId)) {
          return;
        }

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

  getNativeElement = () => this.#elementRef?.nativeElement;

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}