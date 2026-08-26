import { MetadataRoute } from "next";
import { SITE_BACKGROUND_COLOR, SITE_THEME_COLOR } from "@/lib/seo";
import { withBasePath } from "@/lib/base-path";
import { getProfileData } from "@/lib/data";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";

// Static export has no server, so this must be generated at build time.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const { info } = getProfileData(AVAILABLE_LANGUAGES["en"]);

  return {
    name: `${info.name} - ${info.title}`,
    short_name: info.name,
    description: info.subtitle,
    start_url: withBasePath("/en"),
    display: "standalone",
    background_color: SITE_BACKGROUND_COLOR,
    theme_color: SITE_THEME_COLOR,
    icons: [
      {
        src: withBasePath("/icons/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: withBasePath("/icons/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
