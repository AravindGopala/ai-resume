import { AVAILABLE_LANGUAGES } from "@/constants/i18n";

/**
 * Path of the language the root URL sends visitors to.
 *
 * Includes the base path because a static export is served from a
 * subdirectory on GitHub Pages project pages, and a bare `/en` would
 * escape it. `next/link` prefixes basePath itself, so this constant is
 * for raw HTML (meta refresh) only.
 */
const DEFAULT_LANGUAGE_CODE = AVAILABLE_LANGUAGES["en"]?.code ?? "en";

export const DEFAULT_LANGUAGE_PATH = `/${DEFAULT_LANGUAGE_CODE}`;

export const DEFAULT_LANGUAGE_URL_PATH = `${
  process.env.NEXT_PUBLIC_BASE_PATH ?? ""
}${DEFAULT_LANGUAGE_PATH}/`;
