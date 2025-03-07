import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BizyExportToCSVService {
  #loading = false;
  #renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(RendererFactory2) private rendererFactory: RendererFactory2) {
      this.#renderer = this.rendererFactory.createRenderer(null, null);
    }

  download(data: {items: Array<unknown>, model: Record<string, string>, fileName: string}) {
    if (this.#loading || !data.items || !Array.isArray(data.items) || !data.model) {
      return;
    }

    try {
      this.#loading = true;
      const csv = this.getCSV(data);
      if (!data.fileName) {
        data.fileName = 'bizy-csv';
      }

      this.#downloadCSV({csv, fileName: data.fileName});
    } finally {
      this.#loading = false;
    }
  }

  getCSV(data: {items: Array<any>, model: Record<string, string>}): string {
    let csv = '';

    function escapeCommas(str) {
      return str.includes(',') ? `"${str}"` : str;
    }

    for (const key in data.model) {
      if (key) {
        csv += `${data.model[key]},`;
      }
    }

    data.items.forEach(_item => {
      // Remove the last character (',')
      csv = csv.slice(0, -1);
      csv += '\n';

      for (const key in data.model) {
        let value: any = _item;
        const nestedProperty = key.split('.');
        for (let i = 0; i < nestedProperty.length; i++) {
          const _property = nestedProperty[i];
          if (value) {
            value = value[_property];
          } else {
            break;
          }
        }

        if (typeof value !== undefined && value !== null) {
          csv += `${escapeCommas(String(value).replace(/\n/g, ''))},`;
        } else {
          csv += ',';
        }
      }
    });

    if (csv && csv[csv.length - 1] === ',') {
      // Remove the last character (',')
      csv = csv.slice(0, -1);
    }

    return csv;
  }

  #downloadCSV(data: {csv: string, fileName: string}) {
    const blob = new Blob([data.csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadButton = this.#renderer.createElement('a');
    downloadButton.setAttribute('download', data.fileName);
    downloadButton.href = url;
    this.#renderer.appendChild(this.document.body, downloadButton);
    downloadButton.click();
    this.#renderer.removeChild(this.document.body, downloadButton);
  }
}
