import { test, describe } from "node:test";
import assert from "node:assert";
import {
  getCertificateDocuments,
  getExperienceLetterDocuments,
  getResumeDocuments,
  getAllPreviewDocuments,
  resolveDocumentText,
} from "@/lib/document-sources";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";

describe("document-sources", () => {
  test("certificates have unique slugs and expected count", () => {
    const certs = getCertificateDocuments();
    const slugs = certs.map((c) => c.slug);

    assert.strictEqual(certs.length, 0);
    assert.strictEqual(new Set(slugs).size, slugs.length);
  });

  test("certificate paths are consistent", () => {
    for (const cert of getCertificateDocuments()) {
      assert.strictEqual(cert.category, "certificate");
      assert.match(cert.sharePath, /^\/certificates\//);
      assert.strictEqual(cert.pdf, `${cert.sharePath}.pdf`);
      assert.strictEqual(
        cert.previewRelativePath,
        `certificates/og/${cert.slug}.jpg`
      );
    }
  });

  test("experience letters have expected slugs", () => {
    const letters = getExperienceLetterDocuments();
    const slugs = letters.map((l) => l.slug).sort();

    assert.strictEqual(letters.length, 0);
    assert.deepStrictEqual(slugs, []);
  });

  test("experience letter paths are consistent", () => {
    for (const letter of getExperienceLetterDocuments()) {
      assert.strictEqual(letter.category, "experience-letter");
      assert.match(letter.sharePath, /^\/experience-letters\//);
      assert.strictEqual(letter.pdf, `/experience_letters/${letter.slug}.pdf`);
    }
  });

  test("resume documents match available languages", () => {
    const resumes = getResumeDocuments();
    const langCodes = Object.keys(AVAILABLE_LANGUAGES).sort();

    assert.strictEqual(resumes.length, langCodes.length);
    assert.deepStrictEqual(
      resumes.map((r) => r.slug).sort(),
      langCodes
    );

    for (const resume of resumes) {
      assert.strictEqual(resume.category, "resume");
      assert.strictEqual(resume.pdf, `/pdfs/resume-${resume.slug}.pdf`);
      assert.strictEqual(resume.sharePath, `/resume/${resume.slug}`);
    }
  });

  test("getAllPreviewDocuments aggregates all document types", () => {
    const all = getAllPreviewDocuments();
    assert.strictEqual(all.length, Object.keys(AVAILABLE_LANGUAGES).length);
    assert.strictEqual(new Set(all.map((d) => d.slug)).size, all.length);
  });

  test("resolveDocumentText falls back to en", () => {
    assert.strictEqual(
      resolveDocumentText({ en: "Hello", fr: "Bonjour" }, "xx"),
      "Hello"
    );
    assert.strictEqual(
      resolveDocumentText({ en: "Hello", fr: "Bonjour" }, "fr"),
      "Bonjour"
    );
  });

  test("resume titles exist for each available language", () => {
    for (const resume of getResumeDocuments()) {
      for (const lang of Object.keys(AVAILABLE_LANGUAGES)) {
        assert.ok(
          resume.title[lang],
          `resume ${resume.slug} missing title for ${lang}`
        );
      }
    }
  });

});
