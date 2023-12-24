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
  param?: unknown
}

@Injectable()
export class LogService {
  #lastLogTimestamp: number = 0;

  #log(log: string, color: COLOR, param: unknown): void {
    const difference = this.#lastLogTimestamp ? Date.now() - this.#lastLogTimestamp : 0;
    this.#lastLogTimestamp = Date.now();

    const timestampStyles = 'color: #EE5DFF';
    const logStyles = `color: ${color}; font-size: 12px;`;
    const date = new Date();
    if (param) {
      console.log(`%c${date.toLocaleString()}: %c${log} %c(+${difference}ms)`, timestampStyles, logStyles, timestampStyles, param);
    } else {
      console.log(`%c${date.toLocaleString()}: %c${log} %c(+${difference}ms)`, timestampStyles, logStyles, timestampStyles);
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
  /** DEPRECATED */
  templateDebug(data: ILogData): void {
    this.#template({ ...data, title: 'Debug', color: COLOR.DEFAULT });
  }
  /** DEPRECATED */
  templateSucc(data: ILogData): void {
    this.#template({ ...data, title: 'Success', color: COLOR.SUCCESS });
  }
  /** DEPRECATED */
  templateInfo(data: ILogData): void {
    this.#template({ ...data, title: 'Info', color: COLOR.INFO });
  }
  /** DEPRECATED */
  templateWarn(data: ILogData): void {
    this.#template({ ...data, title: 'Warning', color: COLOR.WARNING });
  }
  /** DEPRECATED */
  templateError(data: ILogData): void {
    this.#template({ ...data, title: 'Error', color: COLOR.ERROR });
  }

  #template(data: { fileName: string; functionName: string; title: string, color: COLOR; param?: unknown }): void {
    const log = `(${data.title}) ${data.fileName} - ${data.functionName}`;
    this.#log(log, data.color, data.param);
  }
}
