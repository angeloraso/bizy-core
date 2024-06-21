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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LXRvLWNzdi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi9leHBvcnQtdG8tY3N2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUloRixNQUFNLE9BQU8sc0JBQXNCO0lBS0w7SUFDUTtJQUxwQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLFNBQVMsQ0FBWTtJQUVyQixZQUM0QixRQUFrQixFQUNWLGVBQWlDO1FBRHpDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDVixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVILFFBQVEsQ0FBQyxJQUE4RTtRQUNyRixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzdFLE9BQU87U0FDUjtRQUVELElBQUk7WUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQzthQUM1QjtZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxH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c0JBQXNCLGNBRnJCLE1BQU07OzRGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQU1JLE1BQU07MkJBQUMsUUFBUTs7MEJBQ2YsTUFBTTsyQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQml6eUV4cG9ydFRvQ1NWU2VydmljZSB7XG4gICNsb2FkaW5nID0gZmFsc2U7XG4gICNyZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoUmVuZGVyZXJGYWN0b3J5MikgcHJpdmF0ZSByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHtcbiAgICAgIHRoaXMuI3JlbmRlcmVyID0gdGhpcy5yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG4gICAgfVxuXG4gIGRvd25sb2FkKGRhdGE6IHtpdGVtczogQXJyYXk8dW5rbm93bj4sIG1vZGVsOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LCBmaWxlTmFtZTogc3RyaW5nfSkge1xuICAgIGlmICh0aGlzLiNsb2FkaW5nIHx8ICFkYXRhLml0ZW1zIHx8ICFBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpIHx8ICFkYXRhLm1vZGVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuI2xvYWRpbmcgPSB0cnVlO1xuICAgICAgY29uc3QgY3N2ID0gdGhpcy5nZXRDU1YoZGF0YSk7XG4gICAgICBpZiAoIWRhdGEuZmlsZU5hbWUpIHtcbiAgICAgICAgZGF0YS5maWxlTmFtZSA9ICdiaXp5LWNzdic7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuI2Rvd25sb2FkQ1NWKHtjc3YsIGZpbGVOYW1lOiBkYXRhLmZpbGVOYW1lfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuI2xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXRDU1YoZGF0YToge2l0ZW1zOiBBcnJheTxhbnk+LCBtb2RlbDogUmVjb3JkPHN0cmluZywgc3RyaW5nPn0pOiBzdHJpbmcge1xuICAgIGxldCBjc3YgPSAnJztcblxuICAgIGZ1bmN0aW9uIGVzY2FwZUNvbW1hcyhzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuaW5jbHVkZXMoJywnKSA/IGBcIiR7c3RyfVwiYCA6IHN0cjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhLm1vZGVsKSB7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNzdiArPSBgJHtkYXRhLm1vZGVsW2tleV19LGA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGF0YS5pdGVtcy5mb3JFYWNoKF9pdGVtID0+IHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBjaGFyYWN0ZXIgKCcsJylcbiAgICAgIGNzdiA9IGNzdi5zbGljZSgwLCAtMSk7XG4gICAgICBjc3YgKz0gJ1xcbic7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEubW9kZWwpIHtcbiAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSBfaXRlbTtcbiAgICAgICAgY29uc3QgbmVzdGVkUHJvcGVydHkgPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXN0ZWRQcm9wZXJ0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IF9wcm9wZXJ0eSA9IG5lc3RlZFByb3BlcnR5W2ldO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtfcHJvcGVydHldO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBjc3YgKz0gYCR7ZXNjYXBlQ29tbWFzKFN0cmluZyh2YWx1ZSkucmVwbGFjZSgvXFxuL2csICcnKSl9LGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3N2ICs9ICcsJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNzdjtcbiAgfVxuXG4gICNkb3dubG9hZENTVihkYXRhOiB7Y3N2OiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmd9KSB7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtkYXRhLmNzdl0sIHsgdHlwZTogJ3RleHQvY3N2O2NoYXJzZXQ9dXRmLTg7JyB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGRvd25sb2FkQnV0dG9uID0gdGhpcy4jcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGRvd25sb2FkQnV0dG9uLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBkYXRhLmZpbGVOYW1lKTtcbiAgICBkb3dubG9hZEJ1dHRvbi5ocmVmID0gdXJsO1xuICAgIHRoaXMuI3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgZG93bmxvYWRCdXR0b24pO1xuICAgIGRvd25sb2FkQnV0dG9uLmNsaWNrKCk7XG4gICAgdGhpcy4jcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCBkb3dubG9hZEJ1dHRvbik7XG4gIH1cbn1cbiJdfQ==