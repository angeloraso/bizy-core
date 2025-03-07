import { Inject, Pipe, PipeTransform } from '@angular/core';
import { BIZY_FORMAT_SECONDS_FORMAT, BIZY_FORMAT_SECONDS_LANGUAGE, BizyFormatSecondsService } from '../services/format-seconds.service';

@Pipe({
  name: 'bizyFormatSeconds'
})
export class BizyFormatSecondsPipe implements PipeTransform {

    constructor(@Inject(BizyFormatSecondsService) private bizyFormatSecondsService: BizyFormatSecondsService) {}

    transform(seconds: number, options?: {format: BIZY_FORMAT_SECONDS_FORMAT, language: BIZY_FORMAT_SECONDS_LANGUAGE}): string {
        if (!seconds) {
            return '00:00:00';
        }

        const regex = /^-?\d+(\.\d+)?$/;
        const isNumber = regex.test(String(seconds).toLowerCase());
        if (!isNumber || seconds <= 0) {
            return '00:00:00';
        } 

        const defaultOptions = this.bizyFormatSecondsService.getOptions();

        const language = options?.language ?? defaultOptions.language;
        const format = options?.format ?? defaultOptions.format;

        const DAY = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Día' : 'Day';
        const DAYS = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Días' : 'Days';
        const MONTH = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Mes' : 'Month';
        const MONTHS = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Meses' : 'Months';
        const YEAR = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Año' : 'Year';
        const YEARS = language === BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH ? 'Años' : 'Years';

        let _seconds = Number(seconds);

        const SECONDS_IN_YEAR = 365.25 * 24 * 3600;
        const SECONDS_IN_MONTH = 30.44 * 24 * 3600;
        const SECONDS_IN_DAY = 24 * 3600;
        const SECONDS_IN_HOUR = 3600;
        const SECONDS_IN_MINUTE = 60;

        if (format === BIZY_FORMAT_SECONDS_FORMAT.DATE_TIME) {
            const years = Math.floor(_seconds / SECONDS_IN_YEAR);
            _seconds %= SECONDS_IN_YEAR;
            const months = Math.floor(_seconds / SECONDS_IN_MONTH);
            _seconds %= SECONDS_IN_MONTH;
            const days = Math.floor(_seconds / SECONDS_IN_DAY);
            _seconds %= SECONDS_IN_DAY;
            const hours = Math.floor(_seconds / SECONDS_IN_HOUR);
            _seconds %= SECONDS_IN_HOUR;
            const minutes = Math.floor(_seconds / SECONDS_IN_MINUTE);
            _seconds %= SECONDS_IN_MINUTE;
    
            const parts: Array<string> = [];
            if (years > 0) {
                parts.push(years + (years === 1 ? ` ${YEAR}` : ` ${YEARS}`));
            }
    
            if (months > 0) {
                parts.push(months + (months === 1 ? ` ${MONTH}` : ` ${MONTHS}`));
            }
    
            if (days > 0) {
                parts.push(days + (days === 1 ? ` ${DAY}` : ` ${DAYS}`));
            }

            parts.push(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${_seconds < 10 ? '0' + Math.trunc(_seconds) : Math.trunc(_seconds)}`);
            return parts.join(' ');
        } else {
            const hours = Math.floor(_seconds / SECONDS_IN_HOUR);
            _seconds %= SECONDS_IN_HOUR;
            const minutes = Math.floor(_seconds / SECONDS_IN_MINUTE);
            _seconds %= SECONDS_IN_MINUTE;
    
            const parts: Array<string> = [];
            parts.push(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${_seconds < 10 ? '0' + Math.trunc(_seconds) : Math.trunc(_seconds)}`);
            return parts.join(' ');
        }
    }
}
