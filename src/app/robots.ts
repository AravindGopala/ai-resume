import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

// Static export has no server, so this must be generated at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
