import { BizyDatePickerComponent } from './../date-picker/date-picker.component';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, Input, OnDestroy, QueryList } from '@angular/core';
import { fromEvent, Subscription, take } from 'rxjs';
import { BizyInputComponent } from '../input/input.component';
import { BizySelectComponent } from '../select/select.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bizy-form',
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFormComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(BizyInputComponent, { descendants: true }) inputs: QueryList<BizyInputComponent>;
  @ContentChildren(BizySelectComponent, { descendants: true }) selects: QueryList<BizySelectComponent>;
  @ContentChildren(BizyDatePickerComponent, { descendants: true }) datePickers: QueryList<BizyDatePickerComponent>;
  @Input() id: string = `bizy-form-${Math.random()}`;
  @Input() customClass: string = '';

  #subscription = new Subscription();

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const submit$ = fromEvent(this.elementRef.nativeElement, 'submit');
    this.#subscription.add(submit$.pipe(take(1)).subscribe(() => {
      if (this.inputs.length > 0) {
        this.inputs.forEach(component => {
          component.setTouched(true);
        });
      }

      if (this.selects.length > 0) {
        this.selects.forEach(component => {
          component.setTouched(true);
        });
      }

      if (this.datePickers.length > 0) {
        this.datePickers.forEach(component => {
          component.setTouched(true);
        });
      }
    }));

    const keyPress$ = fromEvent(this.elementRef.nativeElement, 'keypress');
    this.#subscription.add(keyPress$.subscribe((event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    }));
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}