import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, Output, QueryList, DOCUMENT, ElementRef, inject, ViewChild } from '@angular/core';
import { BizyFilterSectionComponent } from './filter-section/filter-section.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyFilterSectionsComponent } from './filter-sections/filter-sections.component';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

@Component({
  selector: 'bizy-filter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.css'],
  imports: [
    CommonModule,
    OverlayModule,
    BizyFilterSectionsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #ref = inject(ChangeDetectorRef);
  @ViewChild(CdkConnectedOverlay) overlay!: CdkConnectedOverlay;
  @ContentChildren(BizyFilterSectionComponent, { descendants: true }) private sections: QueryList<BizyFilterSectionComponent>;
  @Input() id: string = `bizy-filter-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() opened: boolean = false;
  @Output() onOpen = new EventEmitter<PointerEvent>();
  @Output() onChange = new EventEmitter<boolean>();

  _filterWidth: number;

  _activated: boolean = false;

  #subscription = new Subscription();

  ngAfterViewInit() {
    const mutationObserver = new MutationObserver(() => {
      if (this.sections && this.sections.length > 0) {
        const activatedSections = this.sections.filter(_section => _section.isActivated() === true);
        const activated = activatedSections.length > 0;
        if (this._activated !== activated) {
          this._activated = activated;
          this.onChange.emit(this._activated);
          this.#ref.detectChanges();
        }

        this.sections.forEach(_section => {
          this.#subscription.add(_section.onSelect.subscribe(() => {
            const activatedSections = this.sections.filter(_section => _section.isActivated() === true);
            const activated = activatedSections.length > 0;
            if (this._activated !== activated) {
              this._activated = activated;
              this.onChange.emit(this._activated);
              this.#ref.detectChanges();
            }
          }));
        });

        mutationObserver.disconnect();
      }
    });

    mutationObserver.observe(this.#document.body, { childList: true, subtree: true });
  }

  _onOpen = (event: any) => {
    if (this.disabled) {
      return;
    }

    this.opened = !this.opened;

    if (event && event.srcElement && event.srcElement.offsetWidth) {
      this._filterWidth =  event.srcElement.offsetWidth; 
    }

    this.onOpen.emit(event);

    this.#ref.detectChanges();
    const panel = this.overlay.overlayRef?.overlayElement;
    if (panel) {
      const maxWidth = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-filter-max-width')!;
      panel.style.setProperty('--bizy-filter-max-width', maxWidth);

      const sectionMinWidth = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-filter-section-min-width')!;
      panel.style.setProperty('--bizy-filter-section-min-width', sectionMinWidth);

      const inputMinWidth = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-input-min-width')!;
      panel.style.setProperty('--bizy-input-min-width', inputMinWidth);

      const inputWidth = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-input-width')!;
      panel.style.setProperty('--bizy-input-width', inputWidth);

      const inputMaxWidth = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-input-max-width')!;
      panel.style.setProperty('--bizy-input-max-width', inputMaxWidth);

      const inputBackgroundColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-input-background-color')!;
      panel.style.setProperty('--bizy-input-background-color', inputBackgroundColor);

      this.#ref.detectChanges();
    }
  }

  close = (event: PointerEvent & {target: {id: string}}) => {
    if (event && event.target && event.target.id && event.target.id === this.id) {
      return;
    }

    this.opened = false;
    this.#ref.detectChanges();
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  #getClosestCssVariable = (element: HTMLElement, cssVariable: string): string | null => {
    while (element) {
      const value = getComputedStyle(element).getPropertyValue(cssVariable).trim();
      if (value) {
        return value;
      }

      element = element.parentElement as HTMLElement;
    }

    const rootValue = getComputedStyle(this.#document.documentElement).getPropertyValue(cssVariable).trim();
    return rootValue || null;
  }


  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}