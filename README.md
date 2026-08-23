## About

A resume site built with Next.js, Tailwind CSS and React. The resume is written
as Markdown and JSON; the build turns that data into both a website and a
downloadable PDF.

> **This is the `gh-pages-static` branch.** It builds a fully static site for
> GitHub Pages. Since GitHub Pages serves plain files with no server, this
> branch drops everything that needs one:
>
> - the contact form (server actions + Resend + Firebase + reCAPTCHA) — the
>   Contact button is a `mailto:` link instead
> - the certificates and experience-letter routes
> - Vercel Analytics and Speed Insights
>
> The `main` branch keeps all of those and deploys to Vercel. Port content
> changes to `main` first, then merge or cherry-pick them here.

## Technologies

- Next.js (static export)
- Tailwind CSS
- React
- Markdown
- JSON
- Calendly

## Deploying to GitHub Pages

1. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
2. Push to the `gh-pages-static` branch (or run the **Deploy to GitHub Pages**
   workflow manually). `.github/workflows/deploy-pages.yml` builds the site and
   publishes it.
3. The site lands at `https://<owner>.github.io/<repo>/`.

The workflow derives the base path from the repo name, so a project page
(`<repo>`) and a user page (`<owner>.github.io`) both work without config
changes. To use Google Analytics, add a repository variable named
`NEXT_PUBLIC_GA_MEASUREMENT_ID`.

To build the static site locally:

```bash
NEXT_PUBLIC_BASE_PATH=/ai-resume npm run build
# output lands in ./out
```

## How to specify the data

The data is specified in the `src/data` folder. Each language has its own folder with the following structure:

- `profile.json`: Contains the profile data.
- `experiences`: Contains the experience data.
- `education`: Contains the education data.
- `skills`: Contains the skills data.

## How to add a new language

1. Add a new folder with the language code (e.g. `es` for Spanish).
2. Add the `profile.json` file with the profile data.
3. Add the `experiences` folder with the experience data. 
4. Add the `education` folder with the education data.
5. Add the `skills` folder with the skills data.
6. Update the `src/constants/translations.ts` file with the translations for web and PDF.
7. Update the `src/constants/i18n.ts` file with the language code and name.

## How to configure API keys

Copy the [.env.template](.env.template) file to `.env` and fill in the values.

### Environment Variables

| Variable | Description | Required |
|---|---|---|
| **Site URL** | | |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for SEO (sitemap, robots, og tags). Set automatically by the Pages workflow. | No |
| `NEXT_PUBLIC_BASE_PATH` | Path prefix the site is served under (`/<repo>` for a project page, empty for a user page). Derived automatically by the Pages workflow. | No |
| **Google Analytics** | | |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics measurement ID (e.g. `G-XXXXXXXXXX`) | No |

## How to add a new experience

Add a markdown file in the `src/{lang}/data/experiences` folder with the experience data.

This file should have the following structure:

```markdown
---
title: {{TITLE}} # Title of the experience
location: {{LOCATION}} # Location of the experience
company: {{COMPANY_NAME}} # Company name
period: {{START_DATE}} - {{END_DATE}} # Period of the experience
order: {{ORDER}} # Order of the experience in the list
pdf: {{INCLUDED_IN_PDF}} # Whether the experience is included in the PDF version (default: false)
---

{{CONTENT}} # Content of the experience
```

## Dependencies

- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## Local Development

Run the development server:

```bash
npm run dev
```

## Testing

The project uses Node.js built-in test runner with `tsx` for TypeScript support.

```
tests/
├── unit/           # Pure logic (download filenames, document sources, data, site URL)
├── integration/    # PDF generation
└── helpers/        # Shared test utilities
```

Run all tests:

```bash
npm test
```

Run only unit or integration tests:

```bash
npm run test:unit
npm run test:integration
```

Run tests in watch mode (re-runs on file changes):

```bash
npm run test:watch
```

Other quality checks:

```bash
npm run lint
npm run typecheck
```

### Pre-commit hooks

After `npm install`, Husky runs on every commit:

1. `npm run typecheck` — TypeScript for app and tests
2. `lint-staged` — ESLint with auto-fix on staged `.ts`/`.tsx` files

### CI (GitHub Actions)

On every push/PR to `main`, the workflow runs lint, typecheck, unit tests, and integration tests.

## Build

```bash
npm run build
```

This runs the full test suite first, then cleans old PDFs, regenerates them for all languages, and builds the Next.js app.

## To deploy production

Simply push to the main branch and the deployment will be triggered.