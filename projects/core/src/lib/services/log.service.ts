import { Injectable } from '@angular/core';

enum COLOR {
  DEFAULT = '#666666',
  INFO = '#2484C6',
  SUCCESS = '#65BF6C',
  WARNING = '#F7A64C',
  ERROR = '#EF4C59'
}

interface ILogData {
  fileName: string;
  functionName: string;
  param?: unknown;
  group?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BizyLogService {
  #lastLogTimestamps = new Map<string, number>();

  #log(log: string, color: COLOR, param: unknown, group: string = 'default'): void {
    const now = Date.now();
    const lastLogTimestamp = this.#lastLogTimestamps.get(group);
    const difference = lastLogTimestamp === undefined ? 0 : now - lastLogTimestamp;
    this.#lastLogTimestamps.set(group, now);

    const timestampStyles = 'color: #EE5DFF';
    const logStyles = `color: ${color}; font-size: 12px;`;
    const date = new Date();
    const groupLabel = group === 'default' ? '' : `[${group}] `;
    if (param) {
      console.log(`%c${date.toLocaleString()}: %c${groupLabel}${log} %c(+${difference}ms)`, timestampStyles, logStyles, timestampStyles, param);
    } else {
      console.log(`%c${date.toLocaleString()}: %c${groupLabel}${log} %c(+${difference}ms)`, timestampStyles, logStyles, timestampStyles);
    }
  }

  debug(data: string | ILogData, param?: unknown): void {
    if (typeof data === 'string') {
      this.#log(data, COLOR.DEFAULT, param);
    } else {
      this.#template({ ...data, param: data.param, title: 'Debug', color: COLOR.DEFAULT });
    }
  }

  info(data: string | ILogData, param?: unknown): void {
    if (typeof data === 'string') {
      this.#log(data, COLOR.INFO, param);
    } else {
      this.#template({ ...data, param: data.param, title: 'Info', color: COLOR.INFO });
    }
  }

  success(data: string | ILogData, param?: unknown): void {
    if (typeof data === 'string') {
      this.#log(data, COLOR.SUCCESS, param);
    } else {
      this.#template({ ...data, param: data.param, title: 'Success', color: COLOR.SUCCESS });
    }
  }

  warning(data: string | ILogData, param?: unknown): void {
    if (typeof data === 'string') {
      this.#log(data, COLOR.WARNING, param);
    } else {
      this.#template({ ...data, param: data.param, title: 'Warning', color: COLOR.WARNING });
    }
  }

  error(data: string | ILogData, param?: unknown): void {
    if (typeof data === 'string') {
      this.#log(data, COLOR.ERROR, param);
    } else {
      this.#template({ ...data, param: data.param, title: 'Error', color: COLOR.ERROR });
    }
  }

  #template(data: ILogData & { title: string; color: COLOR }): void {
    const log = `(${data.title}) ${data.fileName} - ${data.functionName}`;
    this.#log(log, data.color, data.param, data.group);
  }
}
