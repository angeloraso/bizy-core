import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class KeyboardService {
  #shiftHolding = new BehaviorSubject<boolean>(false);

  get shiftHolding$(): Observable<boolean> {
    return this.#shiftHolding.asObservable();
  }

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.document.addEventListener('keydown', (event) => {
      if (event.key === 'Shift') {
        this.#shiftHolding.next(true);
      }
    });
    
    this.document.addEventListener('keyup', (event) => {
      if (event.key === 'Shift') {
        this.#shiftHolding.next(false);
      }
    });
  }

  isShiftHolding(): boolean {
      return this.#shiftHolding.value;
  }
}