import { NgForOf } from '@angular/common';
import { Directive, Host } from '@angular/core';

interface Item {
  id: string;
}

@Directive({
  selector: '[ngForBizyTrackById]'
})
export class BizyNgForTrackByIdDirective<T extends Item> {
  constructor(@Host() private readonly ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = (_index: number, item: T) => item.id;
  }
}
