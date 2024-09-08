import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, Input, OnDestroy, QueryList } from '@angular/core';
import { fromEvent, Subscription, take } from 'rxjs';
import { BizyInputComponent } from '../input';

@Component({
  selector: 'bizy-form',
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFormComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(BizyInputComponent) inputs: QueryList<BizyInputComponent>;
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
    }));
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}