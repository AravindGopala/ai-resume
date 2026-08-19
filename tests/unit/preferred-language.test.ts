import { test, describe } from "node:test";
import assert from "node:assert";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import {
  DEFAULT_LANGUAGE_CODE,
  SPANISH_LANGUAGE_CODE,
  SPANISH_SPEAKING_COUNTRIES,
  resolvePreferredLanguage,
} from "@/lib/preferred-language";

describe("preferred-language", () => {
  test("les codes retournés existent dans AVAILABLE_LANGUAGES", () => {
    for (const code of [DEFAULT_LANGUAGE_CODE, SPANISH_LANGUAGE_CODE]) {
      assert.ok(
        Object.keys(AVAILABLE_LANGUAGES).includes(code),
        `${code} doit être déclaré dans AVAILABLE_LANGUAGES`,
      );
    }
  });

  test("accept-language espagnol gagne, quel que soit le pays", () => {
    assert.strictEqual(
      resolvePreferredLanguage({
        acceptLanguage: "es-CL,es;q=0.9,en;q=0.8",
        country: "US",
      }),
      SPANISH_LANGUAGE_CODE,
    );
  });

  test("chaque pays hispanophone bascule en espagnol sans accept-language", () => {
    for (const country of SPANISH_SPEAKING_COUNTRIES) {
      assert.strictEqual(
        resolvePreferredLanguage({ acceptLanguage: null, country }),
        SPANISH_LANGUAGE_CODE,
        `${country} doit résoudre en espagnol`,
      );
    }
  });

  test("un pays non hispanophone avec un navigateur anglais reste en anglais", () => {
    assert.strictEqual(
      resolvePreferredLanguage({ acceptLanguage: "en-US,en;q=0.9", country: "US" }),
      DEFAULT_LANGUAGE_CODE,
    );
  });

  test("repli sur l'anglais quand ni l'en-tête ni le pays ne sont disponibles", () => {
    assert.strictEqual(
      resolvePreferredLanguage({ acceptLanguage: null, country: undefined }),
      DEFAULT_LANGUAGE_CODE,
    );
    assert.strictEqual(resolvePreferredLanguage({}), DEFAULT_LANGUAGE_CODE);
  });

  test("les valeurs d'en-tête sont normalisées (casse et espaces)", () => {
    assert.strictEqual(
      resolvePreferredLanguage({ acceptLanguage: " ES-es , en;q=0.5" }),
      SPANISH_LANGUAGE_CODE,
    );
    assert.strictEqual(
      resolvePreferredLanguage({ acceptLanguage: null, country: " cl " }),
      SPANISH_LANGUAGE_CODE,
    );
  });

  test("une chaîne de pays vide ne déclenche pas l'espagnol", () => {
    assert.strictEqual(
      resolvePreferredLanguage({ acceptLanguage: null, country: "" }),
      DEFAULT_LANGUAGE_CODE,
    );
  });
});
