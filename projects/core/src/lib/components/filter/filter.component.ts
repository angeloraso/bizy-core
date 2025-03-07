import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, Output, QueryList } from '@angular/core';
import { BizyFilterSectionComponent } from './filter-section/filter-section.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyFilterSectionsComponent } from './filter-sections/filter-sections.component';

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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    const mutationObserver = new MutationObserver(() => {
      if (this.sections && this.sections.length > 0) {
        const activatedSections = this.sections.filter(_section => _section.isActivated() === true);
        const activated = activatedSections.length > 0;
        if (this._activated !== activated) {
          this._activated = activated;
          this.onChange.emit(this._activated);
          this.ref.detectChanges();
        }

        this.sections.forEach(_section => {
          this.#subscription.add(_section.onSelect.subscribe(() => {
            const activatedSections = this.sections.filter(_section => _section.isActivated() === true);
            const activated = activatedSections.length > 0;
            if (this._activated !== activated) {
              this._activated = activated;
              this.onChange.emit(this._activated);
              this.ref.detectChanges();
            }
          }));
        });

        mutationObserver.disconnect();
      }
    });

    mutationObserver.observe(this.document.body, { childList: true, subtree: true });
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