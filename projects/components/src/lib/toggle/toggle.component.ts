import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { LabelPosition } from './toggle.types';
import { BehaviorSubject, take, filter } from 'rxjs';

@Component({
  selector: 'bizy-toggle',
  templateUrl: './toggle.html',
  styleUrls: ['./toggle.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent {
  @ViewChild('bizyToggleInput') bizyToggleInput: ElementRef;
  #afterViewInit = new BehaviorSubject<boolean>(false);
  @Input() id: string = String(Math.random());
  @Input() label: string = '';
  @Input() labelPosition: LabelPosition = 'after';
  @Input() disabled: boolean = false;
  @Output() onSelect = new EventEmitter<boolean>();
  @Output() valueChange = new EventEmitter<boolean>();

  _checked: boolean = false;

  @Input() set checked(checked: boolean) {
    this.#afterViewInit.asObservable().pipe(filter(status => status === true), take(1)).subscribe(() => {
      if (checked) {
        this.renderer.setAttribute(this.bizyToggleInput.nativeElement, 'checked', 'true' );
      } else {
        this.renderer.removeAttribute(this.bizyToggleInput.nativeElement, 'checked' );
      }
  
      this._checked = Boolean(checked);
    })
  }

  ngAfterViewInit() {
    this.#afterViewInit.next(true);
  }

  constructor(@Inject(Renderer2) private renderer: Renderer2) {}
}