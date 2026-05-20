import type { Metadata } from "next";
import { ProductPage } from "@/components/sections/ProductPage";
import { getProduct } from "@/lib/products";

const product = getProduct("logistique");

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.description,
};

export default function LogistiquePage() {
  return <ProductPage product={product} />;
}
