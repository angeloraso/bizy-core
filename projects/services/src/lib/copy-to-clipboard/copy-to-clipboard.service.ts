import { Inject, Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable()
export class BizyCopyToClipboardService {

  constructor(
    @Inject(Clipboard) private clipboard: Clipboard,
  ) {}

  copy(data: string | {items: Array<unknown>, model: Record<string, string>}) {
    return new Promise<void>((resolve, reject) => {
      try {
        if (!data) {
          resolve();
          return;
        }
  
        setTimeout(() => {
          let toCopy = '';
  
          if (typeof data === 'string' || data instanceof String) {
            toCopy = data as string;
          } else if (data.items && data.items.length > 0 && data.model) {
            for (const key in data.model) {
              if (key) {
                toCopy += `${data.model[key]},`;
              }
            }
  
            data.items.forEach(_item => {
              // Remove the last character (',')
              toCopy = toCopy.slice(0, -2);
              toCopy += '\n';
  
              for (const key in data.model) {
                let value: any = _item;
                const nestedProperty = key.split('.');
                nestedProperty.forEach(_property => {
                  value = value[_property];
                });
  
                if (typeof value !== undefined && value !== null) {
                  toCopy += `${String(value).replace(/\n/g, '')},`;
                } else {
                  toCopy += ',';
                }
              }
            });
          }
  
          const pending = this.clipboard.beginCopy(toCopy);
          let remainingAttempts = 3;
          const attempt = () => {
            const result = pending.copy();
            if (!result && --remainingAttempts) {
              setTimeout(attempt);
            } else {
              // Remember to destroy when you're done!
              pending.destroy();
              resolve();
            }
          };
  
          attempt();
        }, 100);
      } catch (error) {
        reject(error);
      }
    });
  }
}
