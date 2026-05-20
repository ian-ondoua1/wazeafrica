import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const BASE = "https://weza.africa";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/produits",
    "/tarifs",
    "/a-propos",
    "/contact",
    "/demo",
    "/mentions-legales",
    "/politique-confidentialite",
    "/cgu",
  ];

  const productPages = products.map((p) => `/produits/${p.slug}`);

  return [...staticPages, ...productPages].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
