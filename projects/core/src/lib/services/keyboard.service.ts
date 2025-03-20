import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BizyKeyboardService {
  #shiftHolding = new BehaviorSubject<boolean>(false);
  #controlHolding = new BehaviorSubject<boolean>(false);

  get controlHolding$(): Observable<boolean> {
    return this.#controlHolding.asObservable();
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

    this.document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key !== 'Control') {
        this.#controlHolding.next(true);
      }
    });
    
    this.document.addEventListener('keyup', (event) => {
      if (event.ctrlKey && event.key !== 'Control') {
        this.#controlHolding.next(false);
      }
    });
  }

  isShiftHolding(): boolean {
      return this.#shiftHolding.value;
  }

  isControlHolding(): boolean {
    return this.#controlHolding.value;
}
}