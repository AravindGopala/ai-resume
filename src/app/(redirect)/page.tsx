import Link from "next/link";
import {
  DEFAULT_LANGUAGE_PATH,
  DEFAULT_LANGUAGE_URL_PATH,
} from "@/lib/default-language-path";

// `redirect()` needs a server to issue the 3xx, which a static export has no
// room for. A meta refresh plus a real link does the same job from plain HTML
// and keeps the page crawlable.
//
// The meta tag takes the basePath-prefixed URL because the browser resolves it
// verbatim; `next/link` adds the prefix itself, so it takes the bare path.
export default function Home() {
  return (
    <>
      <meta
        httpEquiv="refresh"
        content={`0; url=${DEFAULT_LANGUAGE_URL_PATH}`}
      />
      <Link href={DEFAULT_LANGUAGE_PATH}>Continue to the resume</Link>
    </>
  );
}
