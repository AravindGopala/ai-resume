import path from "path";
import { getProfileData } from "../src/lib/data";
import { AVAILABLE_LANGUAGES } from "../src/constants/i18n";
import { renderOgImage } from "./lib/render-og-image";

const OUTPUT_RELATIVE_PATH = "og-image.png";

(async () => {
  try {
    const { info } = getProfileData(AVAILABLE_LANGUAGES["en"]);
    const outputPath = path.join(process.cwd(), "public", OUTPUT_RELATIVE_PATH);

    renderOgImage(
      { name: info.name, title: info.title, subtitle: info.subtitle },
      outputPath
    );

    console.log(`OG image generated: /${OUTPUT_RELATIVE_PATH}`);
  } catch (error) {
    console.error("Failed to generate OG image:", error);
    process.exit(1);
  }
})();
