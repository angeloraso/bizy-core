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
    toCSV(data) {
        if (this.#loading || !data.items || !Array.isArray(data.items) || !data.model) {
            return;
        }
        try {
            this.#loading = true;
            const csv = this.#getCSV(data.items, data.model);
            if (!data.fileName) {
                data.fileName = 'bizy-csv';
            }
            this.#downloadCSV({ csv, fileName: data.fileName });
        }
        finally {
            this.#loading = false;
        }
    }
    #getCSV(items, model) {
        let toCopy = '';
        function escapeCommas(str) {
            return str.includes(',') ? `"${str}"` : str;
        }
        for (const key in model) {
            if (key) {
                toCopy += `${model[key]},`;
            }
        }
        items.forEach(_item => {
            // Remove the last character (',')
            toCopy = toCopy.slice(0, -1);
            toCopy += '\n';
            for (const key in model) {
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
                    toCopy += `${escapeCommas(String(value).replace(/\n/g, ''))},`;
                }
                else {
                    toCopy += ',';
                }
            }
        });
        return toCopy;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LXRvLWNzdi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi9leHBvcnQtdG8tY3N2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUloRixNQUFNLE9BQU8sc0JBQXNCO0lBS0w7SUFDUTtJQUxwQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLFNBQVMsQ0FBWTtJQUVyQixZQUM0QixRQUFrQixFQUNWLGVBQWlDO1FBRHpDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDVixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVILEtBQUssQ0FBQyxJQUE4RTtRQUNsRixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzdFLE9BQU87U0FDUjtRQUVELElBQUk7WUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQzthQUM1QjtZ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TmYsc0JBQXNCLGNBRnJCLE1BQU07OzRGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQU1JLE1BQU07MkJBQUMsUUFBUTs7MEJBQ2YsTUFBTTsyQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQml6eUV4cG9ydFRvQ1NWU2VydmljZSB7XG4gICNsb2FkaW5nID0gZmFsc2U7XG4gICNyZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoUmVuZGVyZXJGYWN0b3J5MikgcHJpdmF0ZSByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHtcbiAgICAgIHRoaXMuI3JlbmRlcmVyID0gdGhpcy5yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG4gICAgfVxuXG4gIHRvQ1NWKGRhdGE6IHtpdGVtczogQXJyYXk8dW5rbm93bj4sIG1vZGVsOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LCBmaWxlTmFtZTogc3RyaW5nfSkge1xuICAgIGlmICh0aGlzLiNsb2FkaW5nIHx8ICFkYXRhLml0ZW1zIHx8ICFBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpIHx8ICFkYXRhLm1vZGVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuI2xvYWRpbmcgPSB0cnVlO1xuICAgICAgY29uc3QgY3N2ID0gdGhpcy4jZ2V0Q1NWKGRhdGEuaXRlbXMsIGRhdGEubW9kZWwpO1xuICAgICAgaWYgKCFkYXRhLmZpbGVOYW1lKSB7XG4gICAgICAgIGRhdGEuZmlsZU5hbWUgPSAnYml6eS1jc3YnO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNkb3dubG9hZENTVih7Y3N2LCBmaWxlTmFtZTogZGF0YS5maWxlTmFtZX0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLiNsb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgI2dldENTVihpdGVtczogQXJyYXk8YW55PiwgbW9kZWw6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pOiBzdHJpbmcge1xuICAgIGxldCB0b0NvcHkgPSAnJztcblxuICAgIGZ1bmN0aW9uIGVzY2FwZUNvbW1hcyhzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuaW5jbHVkZXMoJywnKSA/IGBcIiR7c3RyfVwiYCA6IHN0cjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBtb2RlbCkge1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICB0b0NvcHkgKz0gYCR7bW9kZWxba2V5XX0sYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpdGVtcy5mb3JFYWNoKF9pdGVtID0+IHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBjaGFyYWN0ZXIgKCcsJylcbiAgICAgIHRvQ29weSA9IHRvQ29weS5zbGljZSgwLCAtMSk7XG4gICAgICB0b0NvcHkgKz0gJ1xcbic7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG1vZGVsKSB7XG4gICAgICAgIGxldCB2YWx1ZTogYW55ID0gX2l0ZW07XG4gICAgICAgIGNvbnN0IG5lc3RlZFByb3BlcnR5ID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVzdGVkUHJvcGVydHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBfcHJvcGVydHkgPSBuZXN0ZWRQcm9wZXJ0eVtpXTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbX3Byb3BlcnR5XTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgdG9Db3B5ICs9IGAke2VzY2FwZUNvbW1hcyhTdHJpbmcodmFsdWUpLnJlcGxhY2UoL1xcbi9nLCAnJykpfSxgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvQ29weSArPSAnLCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b0NvcHk7XG4gIH1cblxuICAjZG93bmxvYWRDU1YoZGF0YToge2Nzdjogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nfSkge1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbZGF0YS5jc3ZdLCB7IHR5cGU6ICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04OycgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBkb3dubG9hZEJ1dHRvbiA9IHRoaXMuI3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBkb3dubG9hZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZGF0YS5maWxlTmFtZSk7XG4gICAgZG93bmxvYWRCdXR0b24uaHJlZiA9IHVybDtcbiAgICB0aGlzLiNyZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIGRvd25sb2FkQnV0dG9uKTtcbiAgICBkb3dubG9hZEJ1dHRvbi5jbGljaygpO1xuICAgIHRoaXMuI3JlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgZG93bmxvYWRCdXR0b24pO1xuICB9XG59XG4iXX0=