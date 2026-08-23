/**
 * Path prefix the site is served under.
 *
 * Empty when the site sits at a domain root (Vercel, or a GitHub user page);
 * "/<repo>" for a GitHub Pages project page. `next/link` and `next/image`
 * prefix this themselves, so it is only needed for raw URLs handed to the
 * browser or to a third-party library — see the pdf.js worker.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes an absolute, app-root-relative path with the base path. */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
