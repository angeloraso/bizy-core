import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import validator from 'validator';
@Injectable({
  providedIn: 'root'
})
export class BizyValidatorService {
  isEmail = (value: string): boolean => validator.isEmail(value, {allow_utf8_local_part: false});

  dateIsAfter = (data: {date: string | number | Date, comparisonDate: string | number | Date}): boolean => {
    if (!data || !data.date || !data.comparisonDate) {
      return false;
    }

    const date = new Date(data.date);
    const comparisonDate = new Date(data.comparisonDate);
    return validator.isAfter(date.toString(), comparisonDate.toString())
  }

  dateIsBefore = (data: {date: string | number | Date, comparisonDate: string | number | Date}): boolean => {
    if (!data || !data.date || !data.comparisonDate) {
      return false;
    }

    const date = new Date(data.date);
    const comparisonDate = new Date(data.comparisonDate);
    return validator.isBefore(date.toString(), comparisonDate.toString())
  }

  isAlpha = (value: string): boolean => validator.isAlpha(value);

  isAlphanumeric = (value: string): boolean => validator.isAlphanumeric(value);

  isNumeric = (value: string | number): boolean => validator.isNumeric(value);

  isNumber(number: unknown): number is number {
    const regex = /^-?\d+(\.\d+)?$/;
    return regex.test(String(number).toLowerCase());
  }

  isString(string: unknown): string is string {
    return typeof string === 'string' || string instanceof String;
  }

  isInteger = (value: string | number): boolean => validator.isInt(value);

  isBoolean = (value: unknown): boolean => validator.isBoolean(value);

  isCreditCard = (value: string | number ): boolean => validator.isCreditCard(value);

  isDataURI = (value: string): boolean => validator.isDataURI(value);

  isURL = (value: string): boolean => validator.isURL(value);

  isDate = (value: string): boolean => validator.isDate(value);

  isJSON = (value: string): boolean => validator.isJSON(value);

  isIP = (value: string, version: 4 | 6 | '4' | '6' ): boolean => validator.isIP(value, {version});

  isJWT = (value: string): boolean => validator.isJWT(value);

  isLowercase = (value: string): boolean => validator.isLowercase(value);

  isUppercase = (value: string): boolean => validator.isUppercase(value);

  isMobilePhone = (data: {value: string, locale: string}): boolean => validator.isMobilePhone(data.value, data.locale);

  isCUIT(cuit: string): boolean {
    if (!cuit) {
      return false;
    }

    if (this.isString(cuit)) {
      cuit = cuit.replace(/[-]/g, '');
    } else {
      cuit = String(cuit);
    }

    // 20, 23, 24, 25, 26 y 27 Personas Físicas
    // 30, 33 y 34 Personas Jurídicas.
    if (!/^(20|23|24|25|26|27|30|33|34)\d{8}\d$/.test(cuit)) {
      return false;
    }

    const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    const digits = cuit.split('').map(Number);
    const checkDigit = digits[10];
    const sum = multipliers.reduce((acc, _multiplier, i) => acc + _multiplier * digits[i], 0);
    const mod11 = 11 - (sum % 11);

    const expectedDigit = mod11 === 11 ? 0 : mod11 === 10 ? 9 : mod11;

    return checkDigit === expectedDigit;
  }

  isDNI(dni: string): boolean {
    const regex = /(^[1-9]{1}[0-9]{7}$)/i;
    return regex.test(String(dni).toLowerCase());
  }

  isCBU(cbu: string): boolean {
    const _isLengthOk = (cbu: string) => {
      return cbu.length === 22;
    };

    const _isValidAccount = (account: string) => {
      if (account.length !== 14) {
        return false;
      }

      const sum =
        Number(account[0]) * 3 +
        Number(account[1]) * 9 +
        Number(account[2]) * 7 +
        Number(account[3]) * 1 +
        Number(account[4]) * 3 +
        Number(account[5]) * 9 +
        Number(account[6]) * 7 +
        Number(account[7]) * 1 +
        Number(account[8]) * 3 +
        Number(account[9]) * 9 +
        Number(account[10]) * 7 +
        Number(account[11]) * 1 +
        Number(account[12]) * 3;
      const diff = (10 - (sum % 10)) % 10; // The result of this should be only 1 digit
      const checksum = Number(account[13]);

      return diff === checksum;
    };

    const _isValidBankCode = (code: string) => {
      if (code.length !== 8) {
        return false;
      }

      const bank = code.substring(0, 3);
      const checksumOne = code[3];
      const branch = code.substring(4, 4 + 3);
      const checksumTwo = code[7];

      const sum =
        (Number(bank[0]) * 7) +
        (Number(bank[1]) * 1) +
        (Number(bank[2]) * 3) +
        (Number(checksumOne) * 9) +
        (Number(branch[0]) * 7) +
        (Number(branch[1]) * 1 )+
        (Number(branch[2]) * 3);
      const diff = (10 - (sum % 10)) % 10; // The result of this should be only 1 digit

      return diff === Number(checksumTwo);
    };

    const bankCode = cbu.substring(0, 8);
    const accountCode = cbu.substring(8, 8 + 14);
    return (
      _isLengthOk(cbu) &&
      _isValidBankCode(bankCode) &&
      _isValidAccount(accountCode)
    );
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isEmail(control.value))
        ? null
        : { bizyEmail: true };
    };
  }

  mobilePhoneValidator(locale: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || !locale ||
        (control.value && locale && this.isMobilePhone({value: control.value, locale}))
        ? null
        : { bizyMobilePhone: true };
    };
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isNumber(control.value))
        ? null
        : { bizyNumber: true };
    };
  }

  numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isNumeric(control.value))
        ? null
        : { bizyNumeric: true };
    };
  }

  dateIsAfterValidator(comparisonDate: string | number | Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || !comparisonDate || (control.value && comparisonDate && !this.dateIsAfter({date: control.value, comparisonDate}))
        ? null
        : { bizyDateIsAfter: true };
    };
  }

  dateIsBeforeValidator(comparisonDate: string | number | Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || !comparisonDate || (control.value && comparisonDate && !this.dateIsBefore({date: control.value, comparisonDate}))
        ? null
        : { bizyDateIsBefore: true };
    };
  }

  alphaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isAlpha(control.value))
        ? null
        : { bizyAlpha: true };
    };
  }

  alphanumericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isAlphanumeric(control.value))
        ? null
        : { bizyAlphanumeric: true };
    };
  }

  integerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isInteger(control.value))
        ? null
        : { bizyInteger: true };
    };
  }

  dataURIValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isDataURI(control.value))
        ? null
        : { bizyDataURI: true };
    };
  }

  urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isURL(control.value))
        ? null
        : { bizyURL: true };
    };
  }

  jsonValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isJSON(control.value))
        ? null
        : { bizyJSON: true };
    };
  }

  jwtValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isJWT(control.value))
        ? null
        : { bizyJWT: true };
    };
  }

  lowerCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isLowercase(control.value))
        ? null
        : { bizyLowerCase: true };
    };
  }

  upperCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isUppercase(control.value))
        ? null
        : { bizyUpperCase: true };
    };
  }

  cuitValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isCUIT(control.value))
        ? null
        : { bizyCUIT: true };
    };
  }

  dniValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isDNI(control.value))
        ? null
        : { bizyDNI: true };
    };
  }

  cbuValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isCBU(control.value))
        ? null
        : { bizyCBU: true };
    };
  }

  creditCardValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || (control.value && this.isCreditCard(control.value))
        ? null
        : { bizyCreditCard: true };
    };
  }
}
