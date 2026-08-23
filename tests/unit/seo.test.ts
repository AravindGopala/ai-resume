import { test, describe } from "node:test";
import assert from "node:assert";
import {
  getLanguageAlternates,
  getOgLocale,
  getOgLocaleAlternates,
} from "@/lib/seo";

describe("seo", () => {
  test("getOgLocale maps language codes to Open Graph locales", () => {
    assert.strictEqual(getOgLocale("en"), "en_US");
    assert.strictEqual(getOgLocale("de"), "en_US");
  });

  test("getOgLocaleAlternates excludes the current locale", () => {
    assert.deepStrictEqual(getOgLocaleAlternates("en"), []);
  });

  test("getLanguageAlternates includes x-default and all supported languages", () => {
    assert.deepStrictEqual(getLanguageAlternates("https://example.com"), {
      "x-default": "https://example.com/en",
      en: "https://example.com/en",
    });
  });
});
