import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'bizy-sidebar-floating-option-title',
  templateUrl: './sidebar-floating-option-title.html',
  styleUrls: ['./sidebar-floating-option-title.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarFloatingOptionTitleComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-sidebar-floating-option-title-${Math.random()}`;
  @Input() customClass: string = '';

  getNativeElement = () => this.#elementRef?.nativeElement;
}