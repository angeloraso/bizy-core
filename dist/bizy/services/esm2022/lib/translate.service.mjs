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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3RyYW5zbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsSUFBSSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFFOUUsTUFBTSxDQUFOLElBQVksUUFHWDtBQUhELFdBQVksUUFBUTtJQUNsQiwwQkFBYyxDQUFBO0lBQ2QsMEJBQWMsQ0FBQTtBQUNoQixDQUFDLEVBSFcsUUFBUSxLQUFSLFFBQVEsUUFHbkI7QUFTRCxNQUFNLE9BQU8sZ0JBQWdCO0lBQ3NCO0lBQWpELFlBQWlELFNBQThCO1FBQTlCLGNBQVMsR0FBVCxTQUFTLENBQXFCO0lBQUcsQ0FBQztJQUU1RSxnQkFBZ0IsQ0FBQyxHQUFHLElBQWU7UUFDeEMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFzQjtRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQXFCLENBQUM7SUFDdEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQXVCLENBQUM7SUFDaEQsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFjO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxHQUFHLENBQUMsV0FBbUI7UUFDckIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDO3dHQWhDVSxnQkFBZ0Isa0JBQ1AsbUJBQW1COzRHQUQ1QixnQkFBZ0IsY0FGZixNQUFNOzs0RkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFFYyxNQUFNOzJCQUFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSBhcyBuZ3hUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmV4cG9ydCBlbnVtIExBTkdVQUdFIHtcbiAgU1BBTklTSCA9ICdlcycsXG4gIEVOR0xJU0ggPSAnZW4nLFxufVxuZXhwb3J0IGludGVyZmFjZSBJTG9jYWxlIHtcbiAgbGFuZzogTEFOR1VBR0U7XG4gIHRyYW5zbGF0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KG5neFRyYW5zbGF0ZVNlcnZpY2UpIHByaXZhdGUgdHJhbnNsYXRlOiBuZ3hUcmFuc2xhdGVTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBsb2FkVHJhbnNsYXRpb25zKC4uLmFyZ3M6IElMb2NhbGVbXSk6IHZvaWQge1xuICAgIGNvbnN0IGxvY2FsZXMgPSBbLi4uYXJnc107XG4gICAgbG9jYWxlcy5mb3JFYWNoKGxvY2FsZSA9PiB7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS5zZXRUcmFuc2xhdGlvbihsb2NhbGUubGFuZywgbG9jYWxlLnRyYW5zbGF0aW9ucywgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRMYW5ncyhsYW5nczogQXJyYXk8TEFOR1VBR0U+KSB7XG4gICAgdGhpcy50cmFuc2xhdGUuYWRkTGFuZ3MobGFuZ3MpO1xuICB9XG5cbiAgZ2V0TGFuZ3MoKTogQXJyYXk8TEFOR1VBR0U+IHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuZ2V0TGFuZ3MoKSBhcyBBcnJheTxMQU5HVUFHRT47XG4gIH1cblxuICBzZXREZWZhdWx0KGxhbmc6IExBTkdVQUdFKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0RGVmYXVsdExhbmcobGFuZyk7XG4gIH1cblxuICBnZXRDdXJyZW50TGFuZygpOiBMQU5HVUFHRSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nIGFzIExBTkdVQUdFO1xuICB9XG5cbiAgdXNlKGxhbmc6IExBTkdVQUdFKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2xhdGUudXNlKGxhbmcpO1xuICB9XG5cbiAgZ2V0KHRyYW5zbGF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHRyYW5zbGF0aW9uKTtcbiAgfVxufVxuIl19