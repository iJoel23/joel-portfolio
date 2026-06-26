import type en from "./locales/en.json"
import es from "./locales/es.json"

/** Compile-time guard: es.json must mirror en.json keys. */
const _localeKeyParity: typeof en = es

export type TranslationResources = typeof en

export type TranslationKey = {
  [Section in keyof TranslationResources]: TranslationResources[Section] extends string
    ? `${Section & string}`
    : {
        [Key in keyof TranslationResources[Section]]: TranslationResources[Section][Key] extends string
          ? `${Section & string}.${Key & string}`
          : {
              [Nested in keyof TranslationResources[Section][Key]]: `${Section & string}.${Key & string}.${Nested & string}`
            }[keyof TranslationResources[Section][Key]]
      }[keyof TranslationResources[Section]]
}[keyof TranslationResources]

void _localeKeyParity
