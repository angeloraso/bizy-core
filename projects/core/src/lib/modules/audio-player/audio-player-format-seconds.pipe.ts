import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyAudioPlayerFormatSeconds',
})
export class BizyAudioPlayerFormatSecondsPipe implements PipeTransform {
  transform(seconds: number): string {
    if (!seconds) {
      return '00:00';
    }

    const regex = /^-?\d+(\.\d+)?$/;
    const isNumber = regex.test(String(seconds).toLowerCase());
    if (!isNumber || seconds <= 0) {
      return '00:00';
    }

    let _seconds = Number(seconds);
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_MINUTE = 60;

    const hours = Math.floor(_seconds / SECONDS_IN_HOUR);
    _seconds %= SECONDS_IN_HOUR;
    const minutes = Math.floor(_seconds / SECONDS_IN_MINUTE);
    _seconds %= SECONDS_IN_MINUTE;

    const parts: Array<string> = [];
    parts.push(`${hours && hours < 10 ? '0' + hours + ':' : hours ? hours + ':' : ''}${minutes < 10 ? '0' + minutes : minutes}:${_seconds < 10 ? '0' + Math.trunc(_seconds) : Math.trunc(_seconds)}`);
    return parts.join(' ');
  }
}
