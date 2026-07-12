import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DOCUMENT, ElementRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { BizyPopupService } from '../popup.service';

@Component({
  selector: 'bizy-full-screen-popup-wrapper',
  templateUrl: './full-screen-popup-wrapper.html',
  styleUrls: ['./full-screen-popup-wrapper.css'],
  imports: [CommonModule, DialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    'class': 'animated slide-in-up',
    '[style.position]': 'position.main',
    '[style.right]': 'position.right',
    '[style.bottom]': 'position.bottom',
    '[style.left]': 'position.left',
    '[style.transform]': 'position.transform',
    '[style.min-width]': 'minWidth',
  }
})
export class BizyFullScreenPopupWrapperComponent<T> {
  readonly #elementRef = inject(ElementRef);
  readonly #data: {
    component: ComponentType<T>,
    disableClose: boolean,
    disableDrag: boolean,
    element: HTMLElement | null
  } = inject(DIALOG_DATA);
  readonly #dialogRef: DialogRef<void> = inject(DialogRef);
  readonly #popup = inject(BizyPopupService);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #document = inject(DOCUMENT);

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  disabled: boolean = false;

  disableClose: boolean = false;
  disableDrag: boolean = false;
  position: {main?: string, right?: string, bottom?: string, left?: string, transform?: string} = {main: 'absolute', bottom: '0', left: '0', right: '0'};
  minWidth: string = getComputedStyle(this.#document.documentElement).getPropertyValue('--bizy-popup-full-screen-min-width').trim();

  ngOnInit() {
    if (this.#data) {
      if (this.#data.disableClose) {
          this.disableClose = this.#data.disableClose;
      }
  
      if (this.#data.disableDrag) {
        this.disableDrag = this.#data.disableDrag;
      }

      if (this.#data.element) {
        const rect = this.#data.element.getBoundingClientRect();
        const left = `${rect.left}px`;
        const right = `${window.innerWidth - rect.right}px`;
        const bottom = `${window.innerHeight - rect.bottom}px`;
        this.position = {
          main: 'fixed',
          right,
          bottom,
          left,
          transform: '',
        }

        this.minWidth = '0';
      }
    }
  }

  ngAfterViewInit() {
    this.loadDynamicComponent();
  }

  loadDynamicComponent = () => {
    if (this.#data && this.#data.component) {
      this.dynamicComponentContainer.clear();
      this.dynamicComponentContainer.createComponent(this.#data.component);

      this.#ref.detectChanges();
    }
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  async close() {
    this.disabled = true;
    this.#popup.close({id: this.#dialogRef.id});
  }
}