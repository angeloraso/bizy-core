import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyFormatSeconds'
})
export class BizyFormatSecondsPipe implements PipeTransform {

    transform(seconds: number, language: 'es' | 'en' = 'es'): string {
        if (!seconds) {
            return '00:00:00';
        }

        const DAY = language === 'es' ? 'Día' : 'Day';
        const DAYS = language === 'es' ? 'Días' : 'Days';
        const MONTH = language === 'es' ? 'Mes' : 'Meses';
        const MONTHS = language === 'es' ? 'Meses' : 'Months';
        const YEAR = language === 'es' ? 'Año' : 'Year';
        const YEARS = language === 'es' ? 'Años' : 'Years';

        let _seconds = Number(seconds);

        const SECONDS_IN_YEAR = 365.25 * 24 * 3600;
        const SECONDS_IN_MONTH = 30.44 * 24 * 3600;
        const SECONDS_IN_DAY = 24 * 3600;
        const SECONDS_IN_HOUR = 3600;
        const SECONDS_IN_MINUTE = 60;

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
    }
}
