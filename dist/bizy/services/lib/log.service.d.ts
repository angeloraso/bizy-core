import * as i0 from "@angular/core";
interface ILogData {
    fileName: string;
    functionName: string;
    param?: unknown;
}
export declare class LogService {
    #private;
    debug(data: string | ILogData, param?: unknown): void;
    info(data: string | ILogData, param?: unknown): void;
    success(data: string | ILogData, param?: unknown): void;
    warning(data: string | ILogData, param?: unknown): void;
    error(data: string | ILogData, param?: unknown): void;
    /** DEPRECATED */
    templateDebug(data: ILogData): void;
    /** DEPRECATED */
    templateSucc(data: ILogData): void;
    /** DEPRECATED */
    templateInfo(data: ILogData): void;
    /** DEPRECATED */
    templateWarn(data: ILogData): void;
    /** DEPRECATED */
    templateError(data: ILogData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LogService>;
}
export {};
