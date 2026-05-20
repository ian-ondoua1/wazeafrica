import type { Metadata } from "next";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Nos produits SaaS",
  description:
    "Découvrez les 5 SaaS Weza : Caisse, Facturation OHADA, Livraison, Santé, RH & Paie.",
};

export default function ProduitsIndexPage() {
  return (
    <>
      <section className="bg-radial-fade py-20 sm:py-24">
        <div className="container-weza text-center">
          <span className="eyebrow">Nos produits</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-weza-dark sm:text-5xl lg:text-6xl">
            5 SaaS, <span className="text-gradient">une seule mission</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Tout ce dont une entreprise africaine a besoin pour se digitaliser.
          </p>
        </div>
      </section>
      <ProductsGrid />
      <CTA />
    </>
  );
}
