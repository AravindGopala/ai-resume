/**
 * Détection de la langue de la page d'accueil à partir de la requête entrante.
 * Utilisé par le middleware ; gardé pur pour rester testable sans serveur Next.
 */

export const DEFAULT_LANGUAGE_CODE = "en";
export const SPANISH_LANGUAGE_CODE = "es";

/** Codes pays ISO 3166-1 alpha-2 hispanophones, tels que fournis par la géolocalisation Vercel. */
export const SPANISH_SPEAKING_COUNTRIES = [
  "ES",
  "MX",
  "AR",
  "CL",
  "CO",
  "PE",
  "VE",
  "EC",
  "GT",
  "CU",
  "BO",
  "DO",
  "HN",
  "PY",
  "SV",
  "NI",
  "CR",
  "PA",
  "UY",
] as const;

export type PreferredLanguageInput = {
  /** En-tête `accept-language` brut, ex. `es-CL,es;q=0.9`. */
  acceptLanguage?: string | null;
  /** Pays résolu par `geolocation()` de `@vercel/functions`. */
  country?: string | null;
};

/**
 * L'en-tête `accept-language` a la priorité sur la géolocalisation : un visiteur
 * de passage dans un pays hispanophone garde la langue de son navigateur.
 */
export function resolvePreferredLanguage({
  acceptLanguage,
  country,
}: PreferredLanguageInput): string {
  const primaryLocale = acceptLanguage?.split(",")[0]?.trim().toLowerCase();
  const normalizedCountry = country?.trim().toUpperCase();

  const shouldUseSpanish =
    primaryLocale?.startsWith(SPANISH_LANGUAGE_CODE) ||
    (!!normalizedCountry &&
      SPANISH_SPEAKING_COUNTRIES.includes(
        normalizedCountry as (typeof SPANISH_SPEAKING_COUNTRIES)[number],
      ));

  return shouldUseSpanish ? SPANISH_LANGUAGE_CODE : DEFAULT_LANGUAGE_CODE;
}
