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
                if (typeof value !== undefined || value !== null) {
                    toCopy += `${value},`;
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
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyExportToCSVService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyExportToCSVService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2, decorators: [{
                    type: Inject,
                    args: [RendererFactory2]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LXRvLWNzdi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2VydmljZXMvc3JjL2xpYi9leHBvcnQtdG8tY3N2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUVoRixNQUFNLE9BQU8sc0JBQXNCO0lBS0w7SUFDUTtJQUxwQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLFNBQVMsQ0FBWTtJQUVyQixZQUM0QixRQUFrQixFQUNWLGVBQWlDO1FBRHpDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDVixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVILEtBQUssQ0FBQyxJQUE4RTtRQUNsRixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzdFLE9BQU87U0FDUjtRQUVELElBQUk7WUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQzthQUM1QjtZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO1NBQ25EO2dCQUFTO1lBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQWlCLEVBQUUsS0FBNkI7UUFDdEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ3ZCLElBQUksR0FBRyxFQUFFO2dCQUNQLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2FBQzVCO1NBQ0Y7UUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLGtDQUFrQztZQUNsQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLElBQUksSUFBSSxDQUFDO1lBRWYsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUksS0FBSyxHQUFRLEtBQUssQ0FBQztnQkFDdkIsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxLQUFLLEVBQUU7d0JBQ1QsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDMUI7eUJBQU07d0JBQ0wsTUFBTTtxQkFDUDtpQkFDRjtnQkFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO29CQUNoRCxNQUFNLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQztpQkFDdkI7cUJBQU07b0JBQ0wsTUFBTSxJQUFJLEdBQUcsQ0FBQztpQkFDZjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxDQUFDLElBQXFDO1FBQ2hELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLENBQUMsQ0FBQztRQUN2RSxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELGNBQWMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxjQUFjLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMvRCxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDakUsQ0FBQzt3R0ExRVUsc0JBQXNCLGtCQUt2QixRQUFRLGFBQ1IsZ0JBQWdCOzRHQU5mLHNCQUFzQjs7NEZBQXRCLHNCQUFzQjtrQkFEbEMsVUFBVTs7MEJBTU4sTUFBTTsyQkFBQyxRQUFROzswQkFDZixNQUFNOzJCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQml6eUV4cG9ydFRvQ1NWU2VydmljZSB7XG4gICNsb2FkaW5nID0gZmFsc2U7XG4gICNyZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoUmVuZGVyZXJGYWN0b3J5MikgcHJpdmF0ZSByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHtcbiAgICAgIHRoaXMuI3JlbmRlcmVyID0gdGhpcy5yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG4gICAgfVxuXG4gIHRvQ1NWKGRhdGE6IHtpdGVtczogQXJyYXk8dW5rbm93bj4sIG1vZGVsOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LCBmaWxlTmFtZTogc3RyaW5nfSkge1xuICAgIGlmICh0aGlzLiNsb2FkaW5nIHx8ICFkYXRhLml0ZW1zIHx8ICFBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpIHx8ICFkYXRhLm1vZGVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuI2xvYWRpbmcgPSB0cnVlO1xuICAgICAgY29uc3QgY3N2ID0gdGhpcy4jZ2V0Q1NWKGRhdGEuaXRlbXMsIGRhdGEubW9kZWwpO1xuICAgICAgaWYgKCFkYXRhLmZpbGVOYW1lKSB7XG4gICAgICAgIGRhdGEuZmlsZU5hbWUgPSAnYml6eS1jc3YnO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNkb3dubG9hZENTVih7Y3N2LCBmaWxlTmFtZTogZGF0YS5maWxlTmFtZX0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLiNsb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgI2dldENTVihpdGVtczogQXJyYXk8YW55PiwgbW9kZWw6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pOiBzdHJpbmcge1xuICAgIGxldCB0b0NvcHkgPSAnJztcblxuICAgIGZvciAoY29uc3Qga2V5IGluIG1vZGVsKSB7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRvQ29weSArPSBgJHttb2RlbFtrZXldfSxgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGl0ZW1zLmZvckVhY2goX2l0ZW0gPT4ge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBsYXN0IGNoYXJhY3RlciAoJywnKVxuICAgICAgdG9Db3B5ID0gdG9Db3B5LnNsaWNlKDAsIC0xKTtcbiAgICAgIHRvQ29weSArPSAnXFxuJztcblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gbW9kZWwpIHtcbiAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSBfaXRlbTtcbiAgICAgICAgY29uc3QgbmVzdGVkUHJvcGVydHkgPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXN0ZWRQcm9wZXJ0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IF9wcm9wZXJ0eSA9IG5lc3RlZFByb3BlcnR5W2ldO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtfcHJvcGVydHldO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSB1bmRlZmluZWQgfHwgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICB0b0NvcHkgKz0gYCR7dmFsdWV9LGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9Db3B5ICs9ICcsJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvQ29weTtcbiAgfVxuXG4gICNkb3dubG9hZENTVihkYXRhOiB7Y3N2OiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmd9KSB7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtkYXRhLmNzdl0sIHsgdHlwZTogJ3RleHQvY3N2O2NoYXJzZXQ9dXRmLTg7JyB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGRvd25sb2FkQnV0dG9uID0gdGhpcy4jcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGRvd25sb2FkQnV0dG9uLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBkYXRhLmZpbGVOYW1lKTtcbiAgICBkb3dubG9hZEJ1dHRvbi5ocmVmID0gdXJsO1xuICAgIHRoaXMuI3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgZG93bmxvYWRCdXR0b24pO1xuICAgIGRvd25sb2FkQnV0dG9uLmNsaWNrKCk7XG4gICAgdGhpcy4jcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCBkb3dubG9hZEJ1dHRvbik7XG4gIH1cbn1cbiJdfQ==