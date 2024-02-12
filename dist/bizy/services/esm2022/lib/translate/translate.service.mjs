import { Inject, Injectable } from '@angular/core';
import { TranslateService as ngxTranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export var LANGUAGE;
(function (LANGUAGE) {
    LANGUAGE["SPANISH"] = "es";
    LANGUAGE["ENGLISH"] = "en";
})(LANGUAGE || (LANGUAGE = {}));
export class TranslateService {
    translate;
    constructor(translate) {
        this.translate = translate;
    }
    loadTranslations(...args) {
        const locales = [...args];
        locales.forEach(locale => {
            this.translate.setTranslation(locale.lang, locale.translations, true);
        });
    }
    addLangs(langs) {
        this.translate.addLangs(langs);
    }
    getLangs() {
        return this.translate.getLangs();
    }
    setDefault(lang) {
        this.translate.setDefaultLang(lang);
    }
    getCurrentLang() {
        return this.translate.currentLang;
    }
    use(lang) {
        this.translate.use(lang);
    }
    get(translation) {
        return this.translate.instant(translation);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslateService, deps: [{ token: ngxTranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslateService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TranslateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService, decorators: [{
                    type: Inject,
                    args: [ngxTranslateService]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3RyYW5zbGF0ZS90cmFuc2xhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLElBQUksbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBRTlFLE1BQU0sQ0FBTixJQUFZLFFBR1g7QUFIRCxXQUFZLFFBQVE7SUFDbEIsMEJBQWMsQ0FBQTtJQUNkLDBCQUFjLENBQUE7QUFDaEIsQ0FBQyxFQUhXLFFBQVEsS0FBUixRQUFRLFFBR25CO0FBU0QsTUFBTSxPQUFPLGdCQUFnQjtJQUNzQjtJQUFqRCxZQUFpRCxTQUE4QjtRQUE5QixjQUFTLEdBQVQsU0FBUyxDQUFxQjtJQUFHLENBQUM7SUFFNUUsZ0JBQWdCLENBQUMsR0FBRyxJQUFlO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBc0I7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFxQixDQUFDO0lBQ3RELENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUF1QixDQUFDO0lBQ2hELENBQUM7SUFFRCxHQUFHLENBQUMsSUFBYztRQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsR0FBRyxDQUFDLFdBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQzt3R0FoQ1UsZ0JBQWdCLGtCQUNQLG1CQUFtQjs0R0FENUIsZ0JBQWdCLGNBRmYsTUFBTTs7NEZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBRWMsTUFBTTsyQkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgYXMgbmd4VHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5leHBvcnQgZW51bSBMQU5HVUFHRSB7XG4gIFNQQU5JU0ggPSAnZXMnLFxuICBFTkdMSVNIID0gJ2VuJyxcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUxvY2FsZSB7XG4gIGxhbmc6IExBTkdVQUdFO1xuICB0cmFuc2xhdGlvbnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChuZ3hUcmFuc2xhdGVTZXJ2aWNlKSBwcml2YXRlIHRyYW5zbGF0ZTogbmd4VHJhbnNsYXRlU2VydmljZSkge31cblxuICBwdWJsaWMgbG9hZFRyYW5zbGF0aW9ucyguLi5hcmdzOiBJTG9jYWxlW10pOiB2b2lkIHtcbiAgICBjb25zdCBsb2NhbGVzID0gWy4uLmFyZ3NdO1xuICAgIGxvY2FsZXMuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgdGhpcy50cmFuc2xhdGUuc2V0VHJhbnNsYXRpb24obG9jYWxlLmxhbmcsIGxvY2FsZS50cmFuc2xhdGlvbnMsIHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkTGFuZ3MobGFuZ3M6IEFycmF5PExBTkdVQUdFPikge1xuICAgIHRoaXMudHJhbnNsYXRlLmFkZExhbmdzKGxhbmdzKTtcbiAgfVxuXG4gIGdldExhbmdzKCk6IEFycmF5PExBTkdVQUdFPiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmdldExhbmdzKCkgYXMgQXJyYXk8TEFOR1VBR0U+O1xuICB9XG5cbiAgc2V0RGVmYXVsdChsYW5nOiBMQU5HVUFHRSk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKGxhbmcpO1xuICB9XG5cbiAgZ2V0Q3VycmVudExhbmcoKTogTEFOR1VBR0Uge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZyBhcyBMQU5HVUFHRTtcbiAgfVxuXG4gIHVzZShsYW5nOiBMQU5HVUFHRSk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNsYXRlLnVzZShsYW5nKTtcbiAgfVxuXG4gIGdldCh0cmFuc2xhdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuaW5zdGFudCh0cmFuc2xhdGlvbik7XG4gIH1cbn1cbiJdfQ==