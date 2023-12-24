import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
@Injectable()
export class ValidatorService {

  isEmail(email: unknown): boolean {
    const regex = /^(([^ñ<>()[\]\\.,;:\s@"]+(\.[^ñ<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  isPassFormat(pass: unknown): boolean {
    const formatRegex = /(?!.*012)(?!.*123)(?!.*234)(?!.*345)(?!.*456)(?!.*567)(?!.*678)(?!.*789)(?!.*987)(?!.*876)(?!.*765)(?!.*654)(?!.*543)(?!.*432)(?!.*321)(?!.*210)(?!.*(.)\1{2,})(?!(^\D+$))(?!(^\d+$))(^.{6,}$)/;
    const excludeRegex = /[^'"]$/;
    const _pass = String(pass).toLowerCase();
    return formatRegex.test(_pass) && excludeRegex.test(_pass);
  }

  isUsernameFormat(name: string): boolean {
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
    return regex.test(String(name).toLowerCase());
  }

  isIPFormat(ip: string): boolean {
    const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(String(ip).toLowerCase());
  }

  isNumber(number: unknown): number is number {
    const regex = /^[0-9]*$/;
    return regex.test(String(number).toLowerCase());
  }

  isPhoneNumber(number: string): boolean {
    const regex = /^\+{0,1}[0-9#*]+$/;
    return regex.test(String(number).toLowerCase());
  }

  isString(string: unknown): string is string {
    return typeof string === 'string' || string instanceof String;
  }

  isMac(mac: unknown): boolean {
    const regex = /^[a-fA-F0-9]{12}$/;
    return regex.test(String(mac).toLowerCase());
  }

  isExtension(extension: unknown): boolean {
    const regex = /^[1-9]{1}[0-9]{2,3}$/;
    return regex.test(String(extension).toLowerCase());
  }

  isJSON(text: string): boolean {
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\/bfnrtu]/g, '@')
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      return true;
    }

    return false;
  }

  extensionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isExtension(control.value)) ? null : { bizyExtension: true };
    };
  }

  macValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isMac(control.value)) ? null : { bizyMAC: true };
    };
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isEmail(control.value)) ? null : { bizyEmail: true };
    };
  }

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isPhoneNumber(control.value)) ? null : { bizyPhoneNumber: true };
    };
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isNumber(control.value)) ? null : { bizyNumber: true };
    };
  }
}
