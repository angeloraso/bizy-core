import { ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class ValidatorService {
    isEmail(email: unknown): boolean;
    isPassFormat(pass: unknown): boolean;
    isNoSpecialCharacter(name: string): boolean;
    isNumber(number: unknown): number is number;
    isPhoneNumber(number: string): boolean;
    isString(string: unknown): string is string;
    isJSON(text: string): boolean;
    emailValidator(): ValidatorFn;
    phoneNumberValidator(): ValidatorFn;
    numberValidator(): ValidatorFn;
    static ɵfac: i0.ɵɵFactoryDeclaration<ValidatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ValidatorService>;
}
