import {IFuseOptions, IFuseResult, FuseOptions} from './search.model';
import {Pipe, PipeTransform} from '@angular/core';
import Fuse from 'fuse.js';
@Pipe({
  name: 'bizySearch'
})
export class BizySearchPipe implements PipeTransform {
  fuseOptions: IFuseOptions;
  fuse: Fuse<any>;
  elements: Array<unknown>;
  searchIsText: boolean;

  readonly perfectMatch = {
    ignoreLocation: true,
    threshold: 0.0
  };

  transform<T>(
    elements: Array<T>,
    search: Array<string>,
    keys?: Array<string>,
    options?: IFuseOptions
  ): Array<T> {
    if (!search || search.length === 0) {
      return elements;
    }

    if (typeof search === 'string' || search instanceof String) {
      // @ts-ignore
      search = [search];
    }

    let output: Array<T> = elements;
    // Remove empty elements
    search = search.filter(n => n);
    search.forEach(_keyword => {
      // Apply perfect match if "search" is a number or is an email
      this.searchIsText = isNaN(Number(_keyword)) && !_keyword.includes('@');

      if (!this.searchIsText) {
        this.fuseOptions = new FuseOptions({...options, ...this.perfectMatch}, keys);
        this.fuse = new Fuse(output, this.fuseOptions);
      } else {
        this.fuseOptions = new FuseOptions(options!, keys);
        this.fuse = new Fuse(output, this.fuseOptions);
      }

      const fuseResult = this.fuse.search(_keyword) as Array<IFuseResult>;
      // Get each fuse result item
      output = fuseResult.map(match => match.item);
    });
    return output;
  }
}
