import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
interface IViewportSize {
  height: number;
  width: number;
}
@Injectable({
  providedIn: 'root'
})
export class BizyViewportService {
  #viewportSizeChanged: BehaviorSubject<IViewportSize>;

  get sizeChange$(): Observable<IViewportSize> {
    return this.#viewportSizeChanged.asObservable();
  }

  constructor(@Inject(Window) private window: Window) {
    this.#viewportSizeChanged = new BehaviorSubject<IViewportSize>(<IViewportSize>{
      width: this.window.innerWidth,
      height: this.window.innerHeight
    });

    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        map(
          (event: any) =>
            <IViewportSize>{
              width: event.currentTarget.innerWidth,
              height: event.currentTarget.innerHeight
            }
        )
      )
      .subscribe(windowSize => {
        this.#viewportSizeChanged.next(windowSize);
      });
  }

  width() {
    return this.window.screen.availWidth;
  }

  height() {
    return this.window.screen.availHeight;
  }
}
