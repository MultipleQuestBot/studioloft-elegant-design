import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://studioloft.ru";

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/order`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/admin`, lastModified: new Date(), priority: 0.3 },
  ];
}
