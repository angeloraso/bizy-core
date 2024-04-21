import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export var LANGUAGE;
(function (LANGUAGE) {
    LANGUAGE["SPANISH"] = "es";
    LANGUAGE["ENGLISH"] = "en";
})(LANGUAGE || (LANGUAGE = {}));
export class BizyTranslateService {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTranslateService, deps: [{ token: TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTranslateService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTranslateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService, decorators: [{
                    type: Inject,
                    args: [TranslateService]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3RyYW5zbGF0ZS90cmFuc2xhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBRXZELE1BQU0sQ0FBTixJQUFZLFFBR1g7QUFIRCxXQUFZLFFBQVE7SUFDbEIsMEJBQWMsQ0FBQTtJQUNkLDBCQUFjLENBQUE7QUFDaEIsQ0FBQyxFQUhXLFFBQVEsS0FBUixRQUFRLFFBR25CO0FBU0QsTUFBTSxPQUFPLG9CQUFvQjtJQUNlO0lBQTlDLFlBQThDLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQUcsQ0FBQztJQUV0RSxnQkFBZ0IsQ0FBQyxHQUFHLElBQWU7UUFDeEMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFzQjtRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQXFCLENBQUM7SUFDdEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQXVCLENBQUM7SUFDaEQsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFjO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxHQUFHLENBQUMsV0FBbUI7UUFDckIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDO3dHQWhDVSxvQkFBb0Isa0JBQ1gsZ0JBQWdCOzRHQUR6QixvQkFBb0IsY0FGbkIsTUFBTTs7NEZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBRWMsTUFBTTsyQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuZXhwb3J0IGVudW0gTEFOR1VBR0Uge1xuICBTUEFOSVNIID0gJ2VzJyxcbiAgRU5HTElTSCA9ICdlbicsXG59XG5leHBvcnQgaW50ZXJmYWNlIElMb2NhbGUge1xuICBsYW5nOiBMQU5HVUFHRTtcbiAgdHJhbnNsYXRpb25zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQml6eVRyYW5zbGF0ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KFRyYW5zbGF0ZVNlcnZpY2UpIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBsb2FkVHJhbnNsYXRpb25zKC4uLmFyZ3M6IElMb2NhbGVbXSk6IHZvaWQge1xuICAgIGNvbnN0IGxvY2FsZXMgPSBbLi4uYXJnc107XG4gICAgbG9jYWxlcy5mb3JFYWNoKGxvY2FsZSA9PiB7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS5zZXRUcmFuc2xhdGlvbihsb2NhbGUubGFuZywgbG9jYWxlLnRyYW5zbGF0aW9ucywgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRMYW5ncyhsYW5nczogQXJyYXk8TEFOR1VBR0U+KSB7XG4gICAgdGhpcy50cmFuc2xhdGUuYWRkTGFuZ3MobGFuZ3MpO1xuICB9XG5cbiAgZ2V0TGFuZ3MoKTogQXJyYXk8TEFOR1VBR0U+IHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuZ2V0TGFuZ3MoKSBhcyBBcnJheTxMQU5HVUFHRT47XG4gIH1cblxuICBzZXREZWZhdWx0KGxhbmc6IExBTkdVQUdFKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0RGVmYXVsdExhbmcobGFuZyk7XG4gIH1cblxuICBnZXRDdXJyZW50TGFuZygpOiBMQU5HVUFHRSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nIGFzIExBTkdVQUdFO1xuICB9XG5cbiAgdXNlKGxhbmc6IExBTkdVQUdFKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2xhdGUudXNlKGxhbmcpO1xuICB9XG5cbiAgZ2V0KHRyYW5zbGF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHRyYW5zbGF0aW9uKTtcbiAgfVxufVxuIl19