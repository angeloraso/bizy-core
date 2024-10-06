import { Injectable } from '@angular/core';
import { BIZY_FORMAT_SECONDS_FORMAT, BIZY_FORMAT_SECONDS_LANGUAGE } from './formatSeconds.types';

@Injectable()
export class BizyFormatSecondsService {
  #options: {
    language: BIZY_FORMAT_SECONDS_LANGUAGE,
    format: BIZY_FORMAT_SECONDS_FORMAT
  } = {
    language: BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH,
    format: BIZY_FORMAT_SECONDS_FORMAT.TIME
  }

  getOptions() {
    return this.#options;
  }

  setOptions(options: {language?: BIZY_FORMAT_SECONDS_LANGUAGE, format?: BIZY_FORMAT_SECONDS_FORMAT}) {
    if (options && options.language) {
      this.#options.language = options.language;
    }

    if (options && options.format) {
      this.#options.format = options.format;
    }
  }
}