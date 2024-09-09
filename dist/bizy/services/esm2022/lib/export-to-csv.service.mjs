import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2 } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyExportToCSVService {
    document;
    rendererFactory;
    #loading = false;
    #renderer;
    constructor(document, rendererFactory) {
        this.document = document;
        this.rendererFactory = rendererFactory;
        this.#renderer = this.rendererFactory.createRenderer(null, null);
    }
    download(data) {
        if (this.#loading || !data.items || !Array.isArray(data.items) || !data.model) {
            return;
        }
        try {
            this.#loading = true;
            const csv = this.getCSV(data);
            if (!data.fileName) {
                data.fileName = 'bizy-csv';
            }
            this.#downloadCSV({ csv, fileName: data.fileName });
        }
        finally {
            this.#loading = false;
        }
    }
    getCSV(data) {
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
                let value = _item;
                const nestedProperty = key.split('.');
                for (let i = 0; i < nestedProperty.length; i++) {
                    const _property = nestedProperty[i];
                    if (value) {
                        value = value[_property];
                    }
                    else {
                        break;
                    }
                }
                if (typeof value !== undefined && value !== null) {
                    csv += `${escapeCommas(String(value).replace(/\n/g, ''))},`;
                }
                else {
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
    #downloadCSV(data) {
        const blob = new Blob([data.csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const downloadButton = this.#renderer.createElement('a');
        downloadButton.setAttribute('download', data.fileName);
        downloadButton.href = url;
        this.#renderer.appendChild(this.document.body, downloadButton);
        downloadButton.click();
        this.#renderer.removeChild(this.document.body, downloadButton);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyExportToCSVService, deps: [{ token: DOCUMENT }, { token: RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyExportToCSVService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyExportToCSVService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2, decorators: [{
                    type: Inject,
                    args: [RendererFactory2]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LXRvLWNzdi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi9leHBvcnQtdG8tY3N2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUloRixNQUFNLE9BQU8sc0JBQXNCO0lBS0w7SUFDUTtJQUxwQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLFNBQVMsQ0FBWTtJQUVyQixZQUM0QixRQUFrQixFQUNWLGVBQWlDO1FBRHpDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDVixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVILFFBQVEsQ0FBQyxJQUE4RTtRQUNyRixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzdFLE9BQU87U0FDUjtRQUVELElBQUk7WUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQzthQUM1QjtZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxH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QUFjLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDakUsQ0FBQzt3R0FuRlUsc0JBQXNCLGtCQUt2QixRQUFRLGFBQ1IsZ0JBQWdCOzRHQU5mLHNCQUFzQixjQUZyQixNQUFNOzs0RkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFNSSxNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEJpenlFeHBvcnRUb0NTVlNlcnZpY2Uge1xuICAjbG9hZGluZyA9IGZhbHNlO1xuICAjcmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KFJlbmRlcmVyRmFjdG9yeTIpIHByaXZhdGUgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyKSB7XG4gICAgICB0aGlzLiNyZW5kZXJlciA9IHRoaXMucmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xuICAgIH1cblxuICBkb3dubG9hZChkYXRhOiB7aXRlbXM6IEFycmF5PHVua25vd24+LCBtb2RlbDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiwgZmlsZU5hbWU6IHN0cmluZ30pIHtcbiAgICBpZiAodGhpcy4jbG9hZGluZyB8fCAhZGF0YS5pdGVtcyB8fCAhQXJyYXkuaXNBcnJheShkYXRhLml0ZW1zKSB8fCAhZGF0YS5tb2RlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLiNsb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGNvbnN0IGNzdiA9IHRoaXMuZ2V0Q1NWKGRhdGEpO1xuICAgICAgaWYgKCFkYXRhLmZpbGVOYW1lKSB7XG4gICAgICAgIGRhdGEuZmlsZU5hbWUgPSAnYml6eS1jc3YnO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNkb3dubG9hZENTVih7Y3N2LCBmaWxlTmFtZTogZGF0YS5maWxlTmFtZX0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLiNsb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q1NWKGRhdGE6IHtpdGVtczogQXJyYXk8YW55PiwgbW9kZWw6IFJlY29yZDxzdHJpbmcsIHN0cmluZz59KTogc3RyaW5nIHtcbiAgICBsZXQgY3N2ID0gJyc7XG5cbiAgICBmdW5jdGlvbiBlc2NhcGVDb21tYXMoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLmluY2x1ZGVzKCcsJykgPyBgXCIke3N0cn1cImAgOiBzdHI7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YS5tb2RlbCkge1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjc3YgKz0gYCR7ZGF0YS5tb2RlbFtrZXldfSxgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRhdGEuaXRlbXMuZm9yRWFjaChfaXRlbSA9PiB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGxhc3QgY2hhcmFjdGVyICgnLCcpXG4gICAgICBjc3YgPSBjc3Yuc2xpY2UoMCwgLTEpO1xuICAgICAgY3N2ICs9ICdcXG4nO1xuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhLm1vZGVsKSB7XG4gICAgICAgIGxldCB2YWx1ZTogYW55ID0gX2l0ZW07XG4gICAgICAgIGNvbnN0IG5lc3RlZFByb3BlcnR5ID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVzdGVkUHJvcGVydHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBfcHJvcGVydHkgPSBuZXN0ZWRQcm9wZXJ0eVtpXTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbX3Byb3BlcnR5XTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgY3N2ICs9IGAke2VzY2FwZUNvbW1hcyhTdHJpbmcodmFsdWUpLnJlcGxhY2UoL1xcbi9nLCAnJykpfSxgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNzdiArPSAnLCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChjc3YgJiYgY3N2W2Nzdi5sZW5ndGggLSAxXSA9PT0gJywnKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGxhc3QgY2hhcmFjdGVyICgnLCcpXG4gICAgICBjc3YgPSBjc3Yuc2xpY2UoMCwgLTEpO1xuICAgIH1cblxuICAgIHJldHVybiBjc3Y7XG4gIH1cblxuICAjZG93bmxvYWRDU1YoZGF0YToge2Nzdjogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nfSkge1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbZGF0YS5jc3ZdLCB7IHR5cGU6ICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04OycgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBkb3dubG9hZEJ1dHRvbiA9IHRoaXMuI3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBkb3dubG9hZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZGF0YS5maWxlTmFtZSk7XG4gICAgZG93bmxvYWRCdXR0b24uaHJlZiA9IHVybDtcbiAgICB0aGlzLiNyZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIGRvd25sb2FkQnV0dG9uKTtcbiAgICBkb3dubG9hZEJ1dHRvbi5jbGljaygpO1xuICAgIHRoaXMuI3JlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgZG93bmxvYWRCdXR0b24pO1xuICB9XG59XG4iXX0=