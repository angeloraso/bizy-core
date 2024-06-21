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
    downloadCSV(data) {
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
    getCSVurl(data) {
        if (this.#loading || !data.items || !Array.isArray(data.items) || !data.model) {
            return;
        }
        try {
            this.#loading = true;
            const csv = this.#getCSV(data.items, data.model);
            const csvData = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
            return (csvData);
        }
        finally {
            this.#loading = false;
        }
    }
    #getCSV(items, model) {
        let csv = '';
        function escapeCommas(str) {
            return str.includes(',') ? `"${str}"` : str;
        }
        for (const key in model) {
            if (key) {
                csv += `${model[key]},`;
            }
        }
        items.forEach(_item => {
            // Remove the last character (',')
            csv = csv.slice(0, -1);
            csv += '\n';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LXRvLWNzdi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi9leHBvcnQtdG8tY3N2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUloRixNQUFNLE9BQU8sc0JBQXNCO0lBS0w7SUFDUTtJQUxwQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLFNBQVMsQ0FBWTtJQUVyQixZQUM0QixRQUFrQixFQUNWLGVBQWlDO1FBRHpDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDVixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUE4RTtRQUN4RixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzdFLE9BQU87U0FDUjtRQUVELElBQUk7WUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQzthQUM1QjtZ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QUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELGNBQWMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxjQUFjLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMvRCxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDakUsQ0FBQzt3R0E3RlUsc0JBQXNCLGtCQUt2QixRQUFRLGFBQ1IsZ0JBQWdCOzRHQU5mLHNCQUFzQixjQUZyQixNQUFNOzs0RkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFNSSxNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEJpenlFeHBvcnRUb0NTVlNlcnZpY2Uge1xuICAjbG9hZGluZyA9IGZhbHNlO1xuICAjcmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KFJlbmRlcmVyRmFjdG9yeTIpIHByaXZhdGUgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyKSB7XG4gICAgICB0aGlzLiNyZW5kZXJlciA9IHRoaXMucmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xuICAgIH1cblxuICBkb3dubG9hZENTVihkYXRhOiB7aXRlbXM6IEFycmF5PHVua25vd24+LCBtb2RlbDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiwgZmlsZU5hbWU6IHN0cmluZ30pIHtcbiAgICBpZiAodGhpcy4jbG9hZGluZyB8fCAhZGF0YS5pdGVtcyB8fCAhQXJyYXkuaXNBcnJheShkYXRhLml0ZW1zKSB8fCAhZGF0YS5tb2RlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLiNsb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGNvbnN0IGNzdiA9IHRoaXMuI2dldENTVihkYXRhLml0ZW1zLCBkYXRhLm1vZGVsKTtcbiAgICAgIGlmICghZGF0YS5maWxlTmFtZSkge1xuICAgICAgICBkYXRhLmZpbGVOYW1lID0gJ2JpenktY3N2JztcbiAgICAgIH1cblxuICAgICAgdGhpcy4jZG93bmxvYWRDU1Yoe2NzdiwgZmlsZU5hbWU6IGRhdGEuZmlsZU5hbWV9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy4jbG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGdldENTVnVybChkYXRhOiB7aXRlbXM6IEFycmF5PHVua25vd24+LCBtb2RlbDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiwgZmlsZU5hbWU6IHN0cmluZ30pOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLiNsb2FkaW5nIHx8ICFkYXRhLml0ZW1zIHx8ICFBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpIHx8ICFkYXRhLm1vZGVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuI2xvYWRpbmcgPSB0cnVlO1xuICAgICAgY29uc3QgY3N2ID0gdGhpcy4jZ2V0Q1NWKGRhdGEuaXRlbXMsIGRhdGEubW9kZWwpO1xuICAgICAgY29uc3QgY3N2RGF0YSA9ICdkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsJyArIGVuY29kZVVSSUNvbXBvbmVudChjc3YpO1xuICAgICAgcmV0dXJuKGNzdkRhdGEpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLiNsb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgI2dldENTVihpdGVtczogQXJyYXk8YW55PiwgbW9kZWw6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pOiBzdHJpbmcge1xuICAgIGxldCBjc3YgPSAnJztcblxuICAgIGZ1bmN0aW9uIGVzY2FwZUNvbW1hcyhzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuaW5jbHVkZXMoJywnKSA/IGBcIiR7c3RyfVwiYCA6IHN0cjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBtb2RlbCkge1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjc3YgKz0gYCR7bW9kZWxba2V5XX0sYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpdGVtcy5mb3JFYWNoKF9pdGVtID0+IHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBjaGFyYWN0ZXIgKCcsJylcbiAgICAgIGNzdiA9IGNzdi5zbGljZSgwLCAtMSk7XG4gICAgICBjc3YgKz0gJ1xcbic7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG1vZGVsKSB7XG4gICAgICAgIGxldCB2YWx1ZTogYW55ID0gX2l0ZW07XG4gICAgICAgIGNvbnN0IG5lc3RlZFByb3BlcnR5ID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVzdGVkUHJvcGVydHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBfcHJvcGVydHkgPSBuZXN0ZWRQcm9wZXJ0eVtpXTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbX3Byb3BlcnR5XTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgY3N2ICs9IGAke2VzY2FwZUNvbW1hcyhTdHJpbmcodmFsdWUpLnJlcGxhY2UoL1xcbi9nLCAnJykpfSxgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNzdiArPSAnLCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjc3Y7XG4gIH1cblxuICAjZG93bmxvYWRDU1YoZGF0YToge2Nzdjogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nfSkge1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbZGF0YS5jc3ZdLCB7IHR5cGU6ICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04OycgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBkb3dubG9hZEJ1dHRvbiA9IHRoaXMuI3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBkb3dubG9hZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZGF0YS5maWxlTmFtZSk7XG4gICAgZG93bmxvYWRCdXR0b24uaHJlZiA9IHVybDtcbiAgICB0aGlzLiNyZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIGRvd25sb2FkQnV0dG9uKTtcbiAgICBkb3dubG9hZEJ1dHRvbi5jbGljaygpO1xuICAgIHRoaXMuI3JlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgZG93bmxvYWRCdXR0b24pO1xuICB9XG59XG4iXX0=