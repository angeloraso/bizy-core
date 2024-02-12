export interface IFuseResult {
    item: any;
    refIndex: number;
    score: number;
}
export interface IOptions {
    isCaseSensitive?: boolean;
    includeScore?: boolean;
    includeMatches?: boolean;
    shouldSort?: boolean;
    findAllMatches?: boolean;
    minMatchCharLength?: number;
    location?: number;
    threshold?: number;
    distance?: number;
    useExtendedSearch?: boolean;
    ignoreLocation?: boolean;
    ignoreFieldNorm?: boolean;
}
/**
 * NOTA:
 * - Para comprender mejor cómo location, threshold y distance funcionan juntos, leer en https://fusejs.io/concepts/scoring-theory.html#scoring-theory
 * - El único momento en que tiene sentido establecer ignoreFieldNorm en true es cuando no importa cuántos términos haya, sino solo que el término de consulta exista.
 */
export interface IFuseOptions extends IOptions {
    keys?: Array<string>;
}
export declare class FuseOptions implements IFuseOptions {
    isCaseSensitive?: boolean;
    distance?: number;
    findAllMatches?: boolean;
    ignoreLocation?: boolean;
    ignoreFieldNorm?: boolean;
    includeMatches?: boolean;
    includeScore?: boolean;
    location?: number;
    minMatchCharLength?: number;
    shouldSort?: boolean;
    threshold?: number;
    useExtendedSearch?: boolean;
    keys: Array<string>;
    constructor(options: IOptions, keys?: Array<string>);
}
