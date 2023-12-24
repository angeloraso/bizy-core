export enum LANGUAGE {
  SPANISH = 'es',
  ENGLISH = 'en',
}
export interface ILocale {
  lang: LANGUAGE;
  translations: Record<string, unknown>;
}
