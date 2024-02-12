export interface IFuseResult {
  item: any;
  refIndex: number;
  score: number;
}

export interface IOptions {
  isCaseSensitive?: boolean; // Indica si las comparaciones deben ser sensibles a mayúsculas y minúsculas. (def: false)
  includeScore?: boolean; // Si la puntuación debe incluirse en el conjunto de resultados. Una puntuación de 0 indica una coincidencia perfecta, mientras que una puntuación de 1 indica una falta de coincidencia completa. (def: false)
  includeMatches?: boolean; // Si las coincidencias deben incluirse en el conjunto de resultados. Cuando es verdadero, cada registro en el conjunto de resultados incluirá los índices de los caracteres coincidentes. En consecuencia, se pueden usar para resaltar.(def: false)
  shouldSort?: boolean; // Si se debe ordenar la lista de resultados por puntuación. (def: true)
  findAllMatches?: boolean; // Cuando es verdadero, la función de coincidencia continuará hasta el final de un patrón de búsqueda, incluso si ya se ha encontrado una coincidencia perfecta en la cadena. (def: false)
  minMatchCharLength?: number; // Solo se devolverán las coincidencias cuya longitud exceda este valor. (Por ejemplo, si desea ignorar las coincidencias de un solo carácter en el resultado, configúrelo en 2). (def: 1)
  location?: number; // Determina aproximadamente en qué parte del texto se encuentra el patrón que se espera encontrar. (def: 0)
  threshold?: number; // ¿En qué punto se rinde el algoritmo de coincidencia? Un umbral de 0.0 requiere una coincidencia perfecta (tanto de letras como de ubicación), un umbral de 1.0 coincidiría con cualquier cosa. (def: 0.6)
  distance?: number; // Determina qué tan cerca debe estar la coincidencia de la ubicación difusa (especificada por la ubicación). Una coincidencia exacta de letras, que es la distancia de los caracteres lejos de la ubicación difusa, se consideraría como una falta de coincidencia completa. Una distancia de 0 requiere que la coincidencia esté en la ubicación exacta especificada. Una distancia de 1000 requeriría una coincidencia perfecta para estar dentro de los 800 caracteres de la ubicación que se encuentra utilizando un umbral de 0,8. (def: 100)
  useExtendedSearch?: boolean; // Cuando es verdadero, permite el uso de comandos de búsqueda tipo Unix. (def: false)
  ignoreLocation?: boolean; // Cuando es verdadero, la búsqueda ignorará la ubicación y la distancia, por lo que no importará en qué parte de la cadena aparezca el patrón. (def: false)
  ignoreFieldNorm?: boolean; // Cuando es verdadero, el cálculo de la puntuación de relevancia (utilizada para la clasificación) ignorará la norma de longitud de campo.
  // getFn?: Function; // La función que se utiliza para recuperar el valor de un objeto en la ruta proporcionada. El valor predeterminado también buscará rutas anidadas.
  // sortFn?: Function; // La función a utilizar para ordenar todos los resultados. El valor predeterminado se ordenará por puntuación de relevancia ascendente
}
/**
 * NOTA:
 * - Para comprender mejor cómo location, threshold y distance funcionan juntos, leer en https://fusejs.io/concepts/scoring-theory.html#scoring-theory
 * - El único momento en que tiene sentido establecer ignoreFieldNorm en true es cuando no importa cuántos términos haya, sino solo que el término de consulta exista.
 */

export interface IFuseOptions extends IOptions {
  keys?: Array<string>;
}

export class FuseOptions implements IFuseOptions {
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

  constructor(options: IOptions, keys?: Array<string>) {
    // Si se desea cambiar algun valor por default, este es el lugar indicado
    if (!keys) {
      keys = [];
    }

    const defaultOptions = {
      // Se activa includeScore para poder buscar internamente en propiedades de tipo array
      includeScore: true,
      // Se reduce a 0.3 el threshold (default: 0.6) para aumentar precisión en resultados
      threshold: 0.3
    };

    if (options) {
      options = {...defaultOptions, ...options};
    } else {
      options = defaultOptions;
    }

    Object.assign(this, {...options, keys: keys});
  }
}
