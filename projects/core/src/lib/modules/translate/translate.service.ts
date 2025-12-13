import { inject, Injectable } from '@angular/core';
import { LangChangeEvent, StrictTranslation, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';


export enum LANGUAGE {
  SPANISH = 'es',
  ENGLISH = 'en',
}
export interface ILocale {
  lang: LANGUAGE;
  translations: Record<string, StrictTranslation>;
}

@Injectable({
  providedIn: 'root'
})
export class BizyTranslateService {
  readonly #translate = inject(TranslateService);

  get language$(): Observable<LangChangeEvent> {
    return this.#translate.onLangChange;
  }


  public loadTranslations(...args: ILocale[]): void {
    const locales = [...args];
    locales.forEach(locale => {
      this.#translate.setTranslation(locale.lang, locale.translations, true);
    });
  }

  addLangs(langs: Array<LANGUAGE>) {
    this.#translate.addLangs(langs);
  }

  getLangs(): Array<LANGUAGE> {
    return this.#translate.getLangs() as Array<LANGUAGE>;
  }

  setDefault(lang: LANGUAGE): void {
    this.#translate.setDefaultLang(lang);
  }

  getCurrentLang(): LANGUAGE {
    return this.#translate.currentLang as LANGUAGE;
  }

  use(lang: LANGUAGE): void {
    this.#translate.use(lang);
  }

  get(translation: string): string {
    return this.#translate.instant(translation);
  }
}
