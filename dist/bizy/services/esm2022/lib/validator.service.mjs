import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ValidatorService {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: ValidatorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: ValidatorService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: ValidatorService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL3ZhbGlkYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFFM0IsT0FBTyxDQUFDLEtBQWM7UUFDcEIsTUFBTSxLQUFLLEdBQUcseUpBQXlKLENBQUM7UUFDeEssT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxZQUFZLENBQUMsSUFBYTtRQUN4QixNQUFNLFdBQVcsR0FBRyxnTUFBZ00sQ0FBQztRQUNyTixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7UUFDOUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxJQUFZO1FBQy9CLE1BQU0sS0FBSyxHQUFHLDZCQUE2QixDQUFDO1FBQzVDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWU7UUFDdEIsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWM7UUFDMUIsTUFBTSxLQUFLLEdBQUcsbUJBQW1CLENBQUM7UUFDbEMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxRQUFRLENBQUMsTUFBZTtRQUN0QixPQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLFlBQVksTUFBTSxDQUFDO0lBQ2hFLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWTtRQUNqQixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUM7YUFDMUQsT0FBTyxDQUFDLGlFQUFpRSxFQUFFLEdBQUcsQ0FBQzthQUMvRSxPQUFPLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sQ0FBQyxPQUF3QixFQUEyQixFQUFFO1lBQzNELE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3ZHLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsT0FBTyxDQUFDLE9BQXdCLEVBQTJCLEVBQUU7WUFDM0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDbkgsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLENBQUMsT0FBd0IsRUFBMkIsRUFBRTtZQUMzRCxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN6RyxDQUFDLENBQUM7SUFDSixDQUFDO3dHQTNEVSxnQkFBZ0I7NEdBQWhCLGdCQUFnQjs7NEZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yU2VydmljZSB7XG5cbiAgaXNFbWFpbChlbWFpbDogdW5rbm93bik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlZ2V4ID0gL14oKFtew7E8PigpW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW17DsTw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgICByZXR1cm4gcmVnZXgudGVzdChTdHJpbmcoZW1haWwpLnRvTG93ZXJDYXNlKCkpO1xuICB9XG5cbiAgaXNQYXNzRm9ybWF0KHBhc3M6IHVua25vd24pOiBib29sZWFuIHtcbiAgICBjb25zdCBmb3JtYXRSZWdleCA9IC8oPyEuKjAxMikoPyEuKjEyMykoPyEuKjIzNCkoPyEuKjM0NSkoPyEuKjQ1NikoPyEuKjU2NykoPyEuKjY3OCkoPyEuKjc4OSkoPyEuKjk4NykoPyEuKjg3NikoPyEuKjc2NSkoPyEuKjY1NCkoPyEuKjU0MykoPyEuKjQzMikoPyEuKjMyMSkoPyEuKjIxMCkoPyEuKiguKVxcMXsyLH0pKD8hKF5cXEQrJCkpKD8hKF5cXGQrJCkpKF4uezYsfSQpLztcbiAgICBjb25zdCBleGNsdWRlUmVnZXggPSAvW14nXCJdJC87XG4gICAgY29uc3QgX3Bhc3MgPSBTdHJpbmcocGFzcykudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gZm9ybWF0UmVnZXgudGVzdChfcGFzcykgJiYgZXhjbHVkZVJlZ2V4LnRlc3QoX3Bhc3MpO1xuICB9XG5cbiAgaXNOb1NwZWNpYWxDaGFyYWN0ZXIobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVnZXggPSAvXlthLXpBLVowLTldW2EtekEtWjAtOV8tXSokLztcbiAgICByZXR1cm4gcmVnZXgudGVzdChTdHJpbmcobmFtZSkudG9Mb3dlckNhc2UoKSk7XG4gIH1cblxuICBpc051bWJlcihudW1iZXI6IHVua25vd24pOiBudW1iZXIgaXMgbnVtYmVyIHtcbiAgICBjb25zdCByZWdleCA9IC9eWzAtOV0qJC87XG4gICAgcmV0dXJuIHJlZ2V4LnRlc3QoU3RyaW5nKG51bWJlcikudG9Mb3dlckNhc2UoKSk7XG4gIH1cblxuICBpc1Bob25lTnVtYmVyKG51bWJlcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVnZXggPSAvXlxcK3swLDF9WzAtOSMqXSskLztcbiAgICByZXR1cm4gcmVnZXgudGVzdChTdHJpbmcobnVtYmVyKS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIGlzU3RyaW5nKHN0cmluZzogdW5rbm93bik6IHN0cmluZyBpcyBzdHJpbmcge1xuICAgIHJldHVybiB0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyB8fCBzdHJpbmcgaW5zdGFuY2VvZiBTdHJpbmc7XG4gIH1cblxuICBpc0pTT04odGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKC9eW1xcXSw6e31cXHNdKiQvLnRlc3QodGV4dC5yZXBsYWNlKC9cXFxcW1wiXFxcXC9iZm5ydHVdL2csICdAJylcbiAgICAgIC5yZXBsYWNlKC9cIlteXCJcXFxcXFxuXFxyXSpcInx0cnVlfGZhbHNlfG51bGx8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrLV0/XFxkKyk/L2csICddJylcbiAgICAgIC5yZXBsYWNlKC8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZywgJycpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZW1haWxWYWxpZGF0b3IoKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgcmV0dXJuICFjb250cm9sLnZhbHVlIHx8IChjb250cm9sLnZhbHVlICYmIHRoaXMuaXNFbWFpbChjb250cm9sLnZhbHVlKSkgPyBudWxsIDogeyBiaXp5RW1haWw6IHRydWUgfTtcbiAgICB9O1xuICB9XG5cbiAgcGhvbmVOdW1iZXJWYWxpZGF0b3IoKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgcmV0dXJuICFjb250cm9sLnZhbHVlIHx8IChjb250cm9sLnZhbHVlICYmIHRoaXMuaXNQaG9uZU51bWJlcihjb250cm9sLnZhbHVlKSkgPyBudWxsIDogeyBiaXp5UGhvbmVOdW1iZXI6IHRydWUgfTtcbiAgICB9O1xuICB9XG5cbiAgbnVtYmVyVmFsaWRhdG9yKCk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIHJldHVybiAhY29udHJvbC52YWx1ZSB8fCAoY29udHJvbC52YWx1ZSAmJiB0aGlzLmlzTnVtYmVyKGNvbnRyb2wudmFsdWUpKSA/IG51bGwgOiB7IGJpenlOdW1iZXI6IHRydWUgfTtcbiAgICB9O1xuICB9XG59XG4iXX0=