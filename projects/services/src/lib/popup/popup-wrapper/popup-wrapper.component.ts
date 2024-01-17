import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'bizy-popup-wrapper',
  templateUrl: './popup-wrapper.html',
  styleUrls: ['./popup-wrapper.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupWrapperComponent<T> {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(
    @Inject(DIALOG_DATA) private component: ComponentType<T>,
    @Inject(DialogRef) private dialogRef: DialogRef<void>,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.loadDynamicComponent();
  }

  loadDynamicComponent() {
    if (this.component) {
      this.dynamicComponentContainer.clear();
      this.dynamicComponentContainer.createComponent(this.component);
      this.ref.detectChanges();
    }
  }

  close() {
    this.dialogRef.close();
  }
}