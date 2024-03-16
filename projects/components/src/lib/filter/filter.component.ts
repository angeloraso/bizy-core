import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, Output, QueryList } from '@angular/core';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bizy-filter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
  @ContentChildren(FilterSectionComponent) private sections: QueryList<FilterSectionComponent>;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() opened: boolean = false;
  @Output() onOpen = new EventEmitter<PointerEvent>();

  _filterWidth: number;
  _sections: Array<{id: string, selected: boolean}> = [];

  _activated: boolean = false;

  #subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.sections && this.sections.length > 0) {

      this.sections.forEach(_section => {
        this._sections.push({id: _section.getId(), selected: _section.getSelected()})
      });
      
      const selectedSections = this._sections.filter(_section => _section.selected === true);
      this._activated = selectedSections.length !== this._sections.length;

      this.#listenSectionChanges();
    } else {
      const mutationObserver = new MutationObserver(() => {
        if (this.sections && this.sections.length > 0) {
          this.sections.forEach(_section => {
            this._sections.push({id: _section.getId(), selected: _section.getSelected()})
          });

          const selectedSections = this._sections.filter(_section => _section.selected === true);
          this._activated = selectedSections.length !== this._sections.length;

          this.#listenSectionChanges();
          mutationObserver.disconnect();
        }
      });
  
      mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
  }

  _onOpen(event: any) {
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

  #listenSectionChanges = () => {
    if (!this.sections) {
      return;
    }

    this.sections.forEach(_section => {

      this.#subscription.add(_section.onSelect.subscribe(() => {
        const index = this._sections.findIndex(__section => __section.id === _section.id);
        if (index !== -1) {
          this._sections[index] = {id: _section.getId(), selected: _section.getSelected()};
        } else {
          this._sections.push({id: _section.getId(), selected: _section.getSelected()});
        }

        const selectedSections = this._sections.filter(_section => _section.selected === true);
        this._activated = selectedSections.length !== this._sections.length;
        this.ref.detectChanges();
      }));

      this.#subscription.add(_section.onRange.subscribe(() => {
        const index = this._sections.findIndex(__section => __section.id === _section.id);
        if (index !== -1) {
          this._sections[index] = {id: _section.getId(), selected: _section.getSelected()};
        } else {
          this._sections.push({id: _section.getId(), selected: _section.getSelected()});
        }

        const selectedOptions = this._sections.filter(_section => _section.selected === true);
        this._activated = selectedOptions.length !== this._sections.length;
        this.ref.detectChanges();
      }));
    });
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}