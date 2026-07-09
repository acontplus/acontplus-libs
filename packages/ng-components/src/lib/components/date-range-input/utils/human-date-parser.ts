/**
 * Utilidades de análisis de diferencia de tiempo / fecha legibles por humanos.
 *
 * Tres analizadores independientes más un punto de entrada público que los combina:
 *  1. {@link parseIso8601Duration} - Duraciones ISO 8601 (`P7D`, `PT1H30M`),
 *     mayúsculas estrictas según lo requerido por la especificación.
 *  2. {@link parseDateMath} - Matemática de fecha estilo Grafana/Elasticsearch (`now-7d`).
 *  3. {@link parseNaturalLanguage} - lenguaje natural (`7 days ago`) a través de un
 *     analizador que la aplicación host registra con {@link setNaturalLanguageParser}
 *     (típicamente `chrono-node`). Sin analizador registrado significa que este paso es una
 *     no-op, por lo que la biblioteca nunca depende directamente de `chrono-node`.
 *
 * {@link parseHumanDate} intenta los tres y acepta duraciones ISO en minúsculas.
 */

/**
 * Una duración de calendario analizada desde una cadena de duración ISO 8601.
 * Cada campo por defecto es 0 cuando su componente está ausente.
 */
export interface Duration {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Opciones para {@link parseHumanDate}.
 */
export interface ParseHumanDateOptions {
  /** Referencia "ahora" usada para resolver expresiones relativas. Por defecto `new Date()`. */
  base?: Date;
  /**
   * Dirección aplicada a una duración ISO 8601 desnuda: `-1` la resuelve al
   * pasado (`base - duration`, ej: "últimos 7 días"), `1` al futuro.
   * Por defecto `-1` para coincidir con el vocabulario "Últimos N días" de este selector.
   */
  durationSign?: 1 | -1;
  /**
   * Si se debe recurrir al analizador de lenguaje natural registrado.
   * Por defecto `true`. No tiene efecto si no se registró ningún analizador.
   */
  useNaturalLanguage?: boolean;
}

// Duración ISO 8601. Los designadores están en mayúsculas según la especificación; `M` es meses antes
// del separador `T` y minutos después. Las fracciones permiten `.` o `,`.
// Los guardias `(?!$)` rechazan las cadenas degeneradas `P` y `PT`.
const ISO_8601_DURATION =
  /^P(?!$)(?:(\d+(?:[.,]\d+)?)Y)?(?:(\d+(?:[.,]\d+)?)M)?(?:(\d+(?:[.,]\d+)?)W)?(?:(\d+(?:[.,]\d+)?)D)?(?:T(?!$)(?:(\d+(?:[.,]\d+)?)H)?(?:(\d+(?:[.,]\d+)?)M)?(?:(\d+(?:[.,]\d+)?)S)?)?$/;

// Matemática de fecha: `now` seguido de cero o más operaciones `±N<unit>`.
// Unidades: y=año, M=mes, w=semana, d=día, h=hora, m=minuto, s=segundo.
const DATE_MATH = /^now((?:[+-]\d+[yMwdhms])*)$/;
const DATE_MATH_OP = /([+-])(\d+)([yMwdhms])/g;

/**
 * Analiza una cadena de duración ISO 8601 estricta en mayúsculas en una {@link Duration}.
 *
 * Compatible con especificación: los designadores deben estar en mayúsculas, por lo que `P7D` se analiza pero `p7d`
 * no. Use {@link parseHumanDate} si necesita entrada permisiva (minúsculas).
 *
 * @param input - Duración ISO 8601 candidata, ej: `P1Y2M10DT2H30M`.
 * @returns La duración analizada, o `null` si la cadena no es una duración válida.
 */
export function parseIso8601Duration(input: string): Duration | null {
  const match = ISO_8601_DURATION.exec(input);
  if (!match) {
    return null;
  }
  const num = (value: string | undefined): number =>
    value === undefined ? 0 : parseFloat(value.replace(',', '.'));
  return {
    years: num(match[1]),
    months: num(match[2]),
    weeks: num(match[3]),
    days: num(match[4]),
    hours: num(match[5]),
    minutes: num(match[6]),
    seconds: num(match[7]),
  };
}

/**
 * Applies a single date-math unit to a date, returning a new Date.
 * Date-level units use calendar-aware setters; the caller guarantees `unit`.
 */
function applyUnit(date: Date, unit: string, amount: number): Date {
  const result = new Date(date.getTime());
  switch (unit) {
    case 'y':
      result.setFullYear(result.getFullYear() + amount);
      break;
    case 'M':
      result.setMonth(result.getMonth() + amount);
      break;
    case 'w':
      result.setDate(result.getDate() + amount * 7);
      break;
    case 'd':
      result.setDate(result.getDate() + amount);
      break;
    case 'h':
      result.setHours(result.getHours() + amount);
      break;
    case 'm':
      result.setMinutes(result.getMinutes() + amount);
      break;
    case 's':
      result.setSeconds(result.getSeconds() + amount);
      break;
  }
  return result;
}

/**
 * Applies a {@link Duration} to a base date, returning a new Date.
 *
 * Calendar units (years, months, weeks, days) use Date setters and are
 * therefore truncated to integers; sub-day units (hours, minutes, seconds)
 * are applied as milliseconds and preserve fractional values.
 *
 * @param base - The date to offset from.
 * @param duration - The duration to apply.
 * @param sign - `1` to add (future), `-1` to subtract (past). Defaults to `1`.
 * @returns A new Date offset from `base`.
 */
export function addDuration(base: Date, duration: Duration, sign: 1 | -1 = 1): Date {
  let result = new Date(base.getTime());
  result = applyUnit(result, 'y', sign * duration.years);
  result = applyUnit(result, 'M', sign * duration.months);
  result.setDate(result.getDate() + sign * (duration.weeks * 7 + duration.days));
  const subDayMs = (duration.hours * 3600 + duration.minutes * 60 + duration.seconds) * 1000;
  result.setTime(result.getTime() + sign * subDayMs);
  return result;
}

/**
 * Parses a Grafana/Elasticsearch style date-math expression into a Date.
 *
 * Supports `now` optionally followed by `±N<unit>` operations applied left to
 * right, e.g. `now`, `now-7d`, `now-1M+15d`. Units: `y M w d h m s`
 * (note `M` = month, `m` = minute). Snapping (`/d`) is not supported.
 *
 * @param input - The date-math expression.
 * @param base - Reference "now". Defaults to `new Date()`.
 * @returns The resolved Date, or `null` if the expression is not date math.
 */
export function parseDateMath(input: string, base: Date = new Date()): Date | null {
  const match = DATE_MATH.exec(input);
  if (!match) {
    return null;
  }
  let result = new Date(base.getTime());
  const operations = match[1];
  DATE_MATH_OP.lastIndex = 0;
  let op: RegExpExecArray | null;
  while ((op = DATE_MATH_OP.exec(operations)) !== null) {
    const sign = op[1] === '-' ? -1 : 1;
    const amount = parseInt(op[2], 10);
    result = applyUnit(result, op[3], sign * amount);
  }
  return result;
}

/**
 * Signature of a natural-language date parser, matching `chrono-node`'s
 * `parseDate(text, ref)` export.
 */
export type NaturalLanguageParser = (text: string, ref?: Date) => Date | null;

// A parser registered by the host app via `setNaturalLanguageParser`. The
// library never imports `chrono-node` itself, keeping it a truly optional
// dependency that works the same in browser, SSR, and Node builds.
let registeredParser: NaturalLanguageParser | null = null;

/**
 * Registers a natural-language parser (typically `chrono-node`'s `parseDate`)
 * for {@link parseNaturalLanguage} / {@link parseHumanDate} to use.
 *
 * The consumer imports the package themselves, so their bundler resolves it
 * and this library never references it directly. Call with `null` to disable.
 *
 * @example
 * import * as chrono from 'chrono-node';
 * setNaturalLanguageParser((text, ref) => chrono.parseDate(text, ref));
 *
 * @param parser - The parser to use, or `null` to disable.
 */
export function setNaturalLanguageParser(parser: NaturalLanguageParser | null): void {
  registeredParser = parser;
}

/**
 * Parses natural language (`7 days ago`, `next friday`) using the parser
 * registered via {@link setNaturalLanguageParser}.
 *
 * @param input - The natural-language date expression.
 * @param base - Reference date the parser resolves against. Defaults to `new Date()`.
 * @returns The parsed Date, or `null` if no parser is registered or the text
 *          could not be parsed.
 */
export function parseNaturalLanguage(input: string, base: Date = new Date()): Date | null {
  if (!registeredParser) {
    return null;
  }
  try {
    return registeredParser(input, base) ?? null;
  } catch {
    return null;
  }
}

/**
 * Public entry point: parses a human-readable date/duration expression into a
 * concrete Date by trying, in order, date math, ISO 8601 duration, then
 * natural language via the registered parser.
 *
 * Unlike {@link parseIso8601Duration}, this accepts lowercase ISO durations
 * (`p7d`) by upper-casing the input before the ISO attempt.
 *
 * @param input - The expression, e.g. `now-7d`, `P7D`, `p7d`, `3 weeks ago`.
 * @param options - See {@link ParseHumanDateOptions}.
 * @returns The parsed Date, or `null` if nothing matched.
 */
export function parseHumanDate(input: string, options: ParseHumanDateOptions = {}): Date | null {
  const base = options.base ?? new Date();
  const durationSign = options.durationSign ?? -1;
  const useNaturalLanguage = options.useNaturalLanguage ?? true;

  const trimmed = input?.trim();
  if (!trimmed) {
    return null;
  }

  // 1. Date math (`now-7d`) - unambiguous and cheap.
  const fromDateMath = parseDateMath(trimmed, base);
  if (fromDateMath) {
    return fromDateMath;
  }

  // 2. ISO 8601 duration - upper-cased so lowercase input is accepted here.
  const duration = parseIso8601Duration(trimmed.toUpperCase());
  if (duration) {
    return addDuration(base, duration, durationSign);
  }

  // 3. Natural language via the registered parser, if any.
  if (useNaturalLanguage) {
    return parseNaturalLanguage(trimmed, base);
  }

  return null;
}
