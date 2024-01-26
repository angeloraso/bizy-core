import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private _backPath = '';

  transitionsEnd$: Observable<ActivatedRouteSnapshot>;

  transitionsStart$: Observable<ActivatedRouteSnapshot>;

  constructor(@Inject(Router) private router: Router) {
    this.transitionsEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: any) => event.id),
      distinctUntilChanged(),
      map(() => this.router.routerState.snapshot.root)
    );

    this.transitionsStart$ = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map((event: any) => event.id),
      distinctUntilChanged(),
      map(() => this.router.routerState.snapshot.root)
    );
  }

  getURL() {
    return window.location.pathname;
  }

  getBackPath() {
    return this._backPath;
  }

  getId(activatedRoute: ActivatedRoute, param: string): string | null {
    return activatedRoute.snapshot.paramMap.get(param);
  }

  getQueryParam(activatedRoute: ActivatedRoute, param: string): string | null {
    return activatedRoute.snapshot.queryParamMap.get(param);
  }

  goTo(data: { path: string; params?: Record<string, string> }) {
    this._backPath = this.getURL();
    if (data.path[0] === '/') {
      this.router.navigateByUrl(`${data.path}${this._serialize(data.params)}`, {
        replaceUrl: true
      });
      return;
    }

    const path = this.getURL();
    const index = path.indexOf('?');
    const url = index !== -1 ? path.substring(0, index) : path;

    this.router.navigateByUrl(`${url}/${data.path}${this._serialize(data.params)}`, {
      replaceUrl: true
    });
  }

  goBack() {
    if (this._backPath) {
      this.router.navigateByUrl(this._backPath, { replaceUrl: true });
      this._backPath = '';
    } else {
      const index = this.getURL().lastIndexOf('/');
      const backURL = this.getURL().substring(0, index);
      this.router.navigateByUrl(backURL, { replaceUrl: true });
    }
  }

  reload(force?: boolean): void {
    if (force) {
      window.location.reload();
    } else {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.goTo({ path: this.getURL() });
      });
    }
  }

  private _serialize(params?: Record<string, string>): string {
    if (!params) {
      return '';
    }

    const str = [];
    for (const param in params) {
      if (params[param]) {
        str.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
      }
    }

    const queryParams = str.length > 0 ? `?${str.join('&')}` : '';
    return queryParams;
  }
}
