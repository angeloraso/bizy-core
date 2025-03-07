import { BizySearchPipeOptions, IFuseResult, IBizySearchPipeOptions} from './search.model';
import {Pipe, PipeTransform} from '@angular/core';
import Fuse from 'fuse.js';
@Pipe({
  name: 'bizySearch'
})
export class BizySearchPipe implements PipeTransform {
  searchPipeOptions: IBizySearchPipeOptions;
  fuse: Fuse<any>;
  items: Array<unknown>;

  readonly perfectMatch = {
    threshold: 0.0
  };

  transform<T>(
    items: Array<T>,
    search: string | number | Array<string | number>,
    keys?: string | Array<string>,
    options?: IBizySearchPipeOptions
  ): Array<T> {
    if (typeof search === 'undefined' || search === null || search === '' || (Array.isArray(search) && search.length === 0)) {
      return items;
    }

    let _keys: Array<string> = [];

    if (keys) {
      if (Array.isArray(keys)) {
        _keys = keys;
      } else {
        _keys = [keys];
      }
    }

    if (!Array.isArray(search)) {
      search = [this.#removeAccentsAndDiacritics(String(search))];
    } else {
      search = search.map(_search => this.#removeAccentsAndDiacritics(String(_search)))
    }

    const getFn = (item: T, keys: Array<string>) => {
      const value = keys.reduce((acc, key) => acc && acc[key], item);
      return typeof value === 'string' ? this.#removeAccentsAndDiacritics(value) : value;
    }

    // Remove empty items
    search = search.filter(n => n);
    search.forEach(_keyword => {
      // Apply perfect match if "search" is a number or is an email
      const searchIsText = isNaN(Number(_keyword)) && !String(_keyword).includes('@');

      if (searchIsText) {
        this.searchPipeOptions = new BizySearchPipeOptions({...options, getFn}, _keys);
        this.fuse = new Fuse(items, this.searchPipeOptions);
      } else {
        this.searchPipeOptions = new BizySearchPipeOptions({...options, ...this.perfectMatch, getFn}, _keys);
        this.fuse = new Fuse(items, this.searchPipeOptions);
      }

      const fuseResult = this.fuse.search(String(_keyword)) as Array<IFuseResult>;
      // Get each fuse result item
      items = fuseResult.map(match => match.item);
    });

    return items;
  }

  #removeAccentsAndDiacritics(search: string): string {
    if (!search) {
      return '';
    }

    return search.normalize('NFD')!.replace(/[\u0300-\u036f]/g, '');
  }
}
