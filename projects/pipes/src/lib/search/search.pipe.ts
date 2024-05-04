import {IFuseOptions, IFuseResult, FuseOptions} from './search.model';
import {Pipe, PipeTransform} from '@angular/core';
import Fuse from 'fuse.js';
@Pipe({
  name: 'bizySearch'
})
export class BizySearchPipe implements PipeTransform {
  fuseOptions: IFuseOptions;
  fuse: Fuse<any>;
  items: Array<unknown>;

  readonly perfectMatch = {
    threshold: 0.0
  };

  transform<T>(
    items: Array<T>,
    search: string | number | Array<string | number>,
    keys?: string | Array<string>,
    options?: IFuseOptions
  ): Array<T> {
    if (typeof search === 'undefined' || search === null || search === '' || (Array.isArray(search) && search.length === 0)) {
      return items;
    }

    if (!Array.isArray(keys)) {
      keys = [keys];
    }

    if (!Array.isArray(search)) {
      search = [search];
    }

    let output: Array<T> = items;
    // Remove empty items
    search = search.filter(n => n);
    search.forEach(_keyword => {
      // Apply perfect match if "search" is a number or is an email
      const searchIsText = isNaN(Number(_keyword)) && !String(_keyword).includes('@');

      if (!searchIsText) {
        this.fuseOptions = new FuseOptions({...options, ...this.perfectMatch}, keys as Array<string>);
        this.fuse = new Fuse(output, this.fuseOptions);
      } else {
        this.fuseOptions = new FuseOptions(options!, keys as Array<string>);
        this.fuse = new Fuse(output, this.fuseOptions);
      }

      const fuseResult = this.fuse.search(String(_keyword)) as Array<IFuseResult>;
      // Get each fuse result item
      output = fuseResult.map(match => match.item);
    });
    return output;
  }
}
