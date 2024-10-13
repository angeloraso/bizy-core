import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class BizyValidatorService {
    isEmail(email) {
        const regex = /^(([^ñ<>()[\]\\.,;:\s@"]+(\.[^ñ<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
    isPassFormat(pass) {
        const formatRegex = /(?!.*012)(?!.*123)(?!.*234)(?!.*345)(?!.*456)(?!.*567)(?!.*678)(?!.*789)(?!.*987)(?!.*876)(?!.*765)(?!.*654)(?!.*543)(?!.*432)(?!.*321)(?!.*210)(?!.*(.)\1{2,})(?!(^\D+$))(?!(^\d+$))(^.{6,}$)/;
        const excludeRegex = /[^'"]$/;
        const _pass = String(pass).toLowerCase();
        return formatRegex.test(_pass) && excludeRegex.test(_pass);
    }
    isNoSpecialCharacter(name) {
        const regex = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
        return regex.test(String(name).toLowerCase());
    }
    isNumber(number) {
        const regex = /^[0-9]*$/;
        return regex.test(String(number).toLowerCase());
    }
    isPhoneNumber(number) {
        const regex = /^\+{0,1}[0-9#*]+$/;
        return regex.test(String(number).toLowerCase());
    }
    isString(string) {
        return typeof string === 'string' || string instanceof String;
    }
    isJSON(text) {
        if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\/bfnrtu]/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
        }
        return false;
    }
    emailValidator() {
        return (control) => {
            return !control.value || (control.value && this.isEmail(control.value)) ? null : { bizyEmail: true };
        };
    }
    phoneNumberValidator() {
        return (control) => {
            return !control.value || (control.value && this.isPhoneNumber(control.value)) ? null : { bizyPhoneNumber: true };
        };
    }
    numberValidator() {
        return (control) => {
            return !control.value || (control.value && this.isNumber(control.value)) ? null : { bizyNumber: true };
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyValidatorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyValidatorService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3ZhbGlkYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDLE1BQU0sT0FBTyxvQkFBb0I7SUFFL0IsT0FBTyxDQUFDLEtBQWM7UUFDcEIsTUFBTSxLQUFLLEdBQUcseUpBQXlKLENBQUM7UUFDeEssT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxZQUFZLENBQUMsSUFBYTtRQUN4QixNQUFNLFdBQVcsR0FBRyxnTUFBZ00sQ0FBQztRQUNyTixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7UUFDOUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxJQUFZO1FBQy9CLE1BQU0sS0FBSyxHQUFHLDZCQUE2QixDQUFDO1FBQzVDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWU7UUFDdEIsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWM7UUFDMUIsTUFBTSxLQUFLLEdBQUcsbUJBQW1CLENBQUM7UUFDbEMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxRQUFRLENBQUMsTUFBZTtRQUN0QixPQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLFlBQVksTUFBTSxDQUFDO0lBQ2hFLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWTtRQUNqQixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUM7YUFDMUQsT0FBTyxDQUFDLGlFQUFpRSxFQUFFLEdBQUcsQ0FBQzthQUMvRSxPQUFPLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sQ0FBQyxPQUF3QixFQUEyQixFQUFFO1lBQzNELE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3ZHLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsT0FBTyxDQUFDLE9BQXdCLEVBQTJCLEVBQUU7WUFDM0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDbkgsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLENBQUMsT0FBd0IsRUFBMkIsRUFBRTtZQUMzRCxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN6RyxDQUFDLENBQUM7SUFDSixDQUFDO3dHQTNEVSxvQkFBb0I7NEdBQXBCLG9CQUFvQixjQUZuQixNQUFNOzs0RkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEJpenlWYWxpZGF0b3JTZXJ2aWNlIHtcblxuICBpc0VtYWlsKGVtYWlsOiB1bmtub3duKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVnZXggPSAvXigoW17DsTw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXsOxPD4oKVtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuICAgIHJldHVybiByZWdleC50ZXN0KFN0cmluZyhlbWFpbCkudG9Mb3dlckNhc2UoKSk7XG4gIH1cblxuICBpc1Bhc3NGb3JtYXQocGFzczogdW5rbm93bik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGZvcm1hdFJlZ2V4ID0gLyg/IS4qMDEyKSg/IS4qMTIzKSg/IS4qMjM0KSg/IS4qMzQ1KSg/IS4qNDU2KSg/IS4qNTY3KSg/IS4qNjc4KSg/IS4qNzg5KSg/IS4qOTg3KSg/IS4qODc2KSg/IS4qNzY1KSg/IS4qNjU0KSg/IS4qNTQzKSg/IS4qNDMyKSg/IS4qMzIxKSg/IS4qMjEwKSg/IS4qKC4pXFwxezIsfSkoPyEoXlxcRCskKSkoPyEoXlxcZCskKSkoXi57Nix9JCkvO1xuICAgIGNvbnN0IGV4Y2x1ZGVSZWdleCA9IC9bXidcIl0kLztcbiAgICBjb25zdCBfcGFzcyA9IFN0cmluZyhwYXNzKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBmb3JtYXRSZWdleC50ZXN0KF9wYXNzKSAmJiBleGNsdWRlUmVnZXgudGVzdChfcGFzcyk7XG4gIH1cblxuICBpc05vU3BlY2lhbENoYXJhY3RlcihuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCByZWdleCA9IC9eW2EtekEtWjAtOV1bYS16QS1aMC05Xy1dKiQvO1xuICAgIHJldHVybiByZWdleC50ZXN0KFN0cmluZyhuYW1lKS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIGlzTnVtYmVyKG51bWJlcjogdW5rbm93bik6IG51bWJlciBpcyBudW1iZXIge1xuICAgIGNvbnN0IHJlZ2V4ID0gL15bMC05XSokLztcbiAgICByZXR1cm4gcmVnZXgudGVzdChTdHJpbmcobnVtYmVyKS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIGlzUGhvbmVOdW1iZXIobnVtYmVyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCByZWdleCA9IC9eXFwrezAsMX1bMC05IypdKyQvO1xuICAgIHJldHVybiByZWdleC50ZXN0KFN0cmluZyhudW1iZXIpLnRvTG93ZXJDYXNlKCkpO1xuICB9XG5cbiAgaXNTdHJpbmcoc3RyaW5nOiB1bmtub3duKTogc3RyaW5nIGlzIHN0cmluZyB7XG4gICAgcmV0dXJuIHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnIHx8IHN0cmluZyBpbnN0YW5jZW9mIFN0cmluZztcbiAgfVxuXG4gIGlzSlNPTih0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoL15bXFxdLDp7fVxcc10qJC8udGVzdCh0ZXh0LnJlcGxhY2UoL1xcXFxbXCJcXFxcL2JmbnJ0dV0vZywgJ0AnKVxuICAgICAgLnJlcGxhY2UoL1wiW15cIlxcXFxcXG5cXHJdKlwifHRydWV8ZmFsc2V8bnVsbHwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWystXT9cXGQrKT8vZywgJ10nKVxuICAgICAgLnJlcGxhY2UoLyg/Ol58OnwsKSg/OlxccypcXFspKy9nLCAnJykpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBlbWFpbFZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICByZXR1cm4gIWNvbnRyb2wudmFsdWUgfHwgKGNvbnRyb2wudmFsdWUgJiYgdGhpcy5pc0VtYWlsKGNvbnRyb2wudmFsdWUpKSA/IG51bGwgOiB7IGJpenlFbWFpbDogdHJ1ZSB9O1xuICAgIH07XG4gIH1cblxuICBwaG9uZU51bWJlclZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICByZXR1cm4gIWNvbnRyb2wudmFsdWUgfHwgKGNvbnRyb2wudmFsdWUgJiYgdGhpcy5pc1Bob25lTnVtYmVyKGNvbnRyb2wudmFsdWUpKSA/IG51bGwgOiB7IGJpenlQaG9uZU51bWJlcjogdHJ1ZSB9O1xuICAgIH07XG4gIH1cblxuICBudW1iZXJWYWxpZGF0b3IoKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgcmV0dXJuICFjb250cm9sLnZhbHVlIHx8IChjb250cm9sLnZhbHVlICYmIHRoaXMuaXNOdW1iZXIoY29udHJvbC52YWx1ZSkpID8gbnVsbCA6IHsgYml6eU51bWJlcjogdHJ1ZSB9O1xuICAgIH07XG4gIH1cbn1cbiJdfQ==