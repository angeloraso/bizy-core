import { ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class BizyValidatorService {
    isEmail: (value: string) => boolean;
    dateIsAfter: (data: {
        date: string | number | Date;
        comparisonDate: string | number | Date;
    }) => boolean;
    dateIsBefore: (data: {
        date: string | number | Date;
        comparisonDate: string | number | Date;
    }) => boolean;
    isAlpha: (value: string) => boolean;
    isAlphanumeric: (value: string) => boolean;
    isNumeric: (value: string | number) => boolean;
    isNumber(number: unknown): number is number;
    isString(string: unknown): string is string;
    isInteger: (value: string | number) => boolean;
    isBoolean: (value: unknown) => boolean;
    isCreditCard: (value: string | number) => boolean;
    isDataURI: (value: string) => boolean;
    isURL: (value: string) => boolean;
    isDate: (value: string) => boolean;
    isJSON: (value: string) => boolean;
    isIP: (value: string, version: 4 | 6 | "4" | "6") => boolean;
    isJWT: (value: string) => boolean;
    isLowercase: (value: string) => boolean;
    isUppercase: (value: string) => boolean;
    isMobilePhone: (data: {
        value: string;
        locale: string;
    }) => boolean;
    isCUIT(cuit: string): boolean;
    isDNI(dni: string): boolean;
    isCBU(cbu: string): boolean;
    emailValidator(): ValidatorFn;
    mobilePhoneValidator(locale: string): ValidatorFn;
    numberValidator(): ValidatorFn;
    numericValidator(): ValidatorFn;
    dateIsAfterValidator(comparisonDate: string | number | Date): ValidatorFn;
    dateIsBeforeValidator(comparisonDate: string | number | Date): ValidatorFn;
    alphaValidator(): ValidatorFn;
    alphanumericValidator(): ValidatorFn;
    integerValidator(): ValidatorFn;
    dataURIValidator(): ValidatorFn;
    urlValidator(): ValidatorFn;
    jsonValidator(): ValidatorFn;
    jwtValidator(): ValidatorFn;
    lowerCaseValidator(): ValidatorFn;
    upperCaseValidator(): ValidatorFn;
    cuitValidator(): ValidatorFn;
    dniValidator(): ValidatorFn;
    cbuValidator(): ValidatorFn;
    creditCardValidator(): ValidatorFn;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyValidatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyValidatorService>;
}
