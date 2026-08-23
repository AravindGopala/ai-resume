import { MetadataRoute } from "next";
import { SITE_BACKGROUND_COLOR, SITE_THEME_COLOR } from "@/lib/seo";

// Static export has no server, so this must be generated at build time.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aravind Datla - Senior Embedded Software Engineer",
    short_name: "Aravind Datla",
    description:
      "Senior Software Engineer specializing in cloud-native platforms & IoT solutions",
    start_url: "/en",
    display: "standalone",
    background_color: SITE_BACKGROUND_COLOR,
    theme_color: SITE_THEME_COLOR,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
