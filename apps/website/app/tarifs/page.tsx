"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { products, suitePlans } from "@/lib/products";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { cn } from "@/lib/utils";

const billingTabs = ["Mensuel", "Annuel (-20%)"] as const;

const tarifsFaq = [
  {
    question: "Comment fonctionne l'essai gratuit ?",
    answer:
      "14 jours d'accès complet, sans carte bancaire. Vous pouvez tester toutes les fonctionnalités du plan Pro. Aucun paiement n'est demandé tant que vous ne décidez pas de continuer.",
  },
  {
    question: "Puis-je changer de plan en cours de route ?",
    answer:
      "Oui, à tout moment. Le changement prend effet immédiatement et le tarif est calculé au prorata.",
  },
  {
    question: "Y a-t-il des frais d'installation ?",
    answer:
      "Non. Aucuns frais cachés. Vous payez le prix affiché, point.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Mobile Money (MTN, Orange), carte bancaire, virement bancaire local et international.",
  },
  {
    question: "Puis-je résilier à tout moment ?",
    answer:
      "Oui, sans engagement. Vous gardez vos données pendant 90 jours après résiliation.",
  },
];

function annualPrice(monthly: string) {
  const num = parseInt(monthly.replace(/\s/g, ""), 10);
  if (Number.isNaN(num)) return monthly;
  return Math.round((num * 0.8)).toLocaleString("fr-FR");
}

export default function TarifsPage() {
  const [billing, setBilling] = useState<(typeof billingTabs)[number]>("Mensuel");
  const [activeProduct, setActiveProduct] = useState(products[0].slug);

  const current = products.find((p) => p.slug === activeProduct)!;

  return (
    <>
      <section className="bg-radial-fade py-20 sm:py-24">
        <div className="container-weza text-center">
          <span className="eyebrow">Tarification</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-weza-dark sm:text-5xl lg:text-6xl">
            Des tarifs <span className="text-gradient">honnêtes</span>, pas de surprise
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            14 jours d'essai gratuit. Sans carte bancaire. Sans engagement.
          </p>

          <div className="mx-auto mt-10 inline-flex rounded-xl bg-slate-100 p-1">
            {billingTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setBilling(tab)}
                className={cn(
                  "rounded-lg px-5 py-2 text-sm font-semibold transition",
                  billing === tab
                    ? "bg-white text-weza-dark shadow-sm"
                    : "text-slate-600 hover:text-weza-dark"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-weza">
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-2">
            {products.map((p) => (
              <button
                key={p.slug}
                onClick={() => setActiveProduct(p.slug)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
                  activeProduct === p.slug
                    ? "bg-weza-primary text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <span>{p.emoji}</span>
                {p.shortName}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {current.plans.map((plan) => {
              const isAnnual = billing === "Annuel (-20%)";
              const displayPrice =
                plan.price === "Sur devis"
                  ? plan.price
                  : isAnnual
                    ? annualPrice(plan.price)
                    : plan.price;
              return (
                <div
                  key={plan.name}
                  className={cn(
                    "relative rounded-2xl border bg-white p-8 transition",
                    plan.highlight
                      ? "border-weza-primary shadow-card"
                      : "border-slate-200"
                  )}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-weza-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                      Populaire
                    </div>
                  )}
                  <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    {plan.name}
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-weza-dark">
                      {displayPrice}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {plan.price === "Sur devis"
                      ? "Tarif personnalisé"
                      : `FCFA / mois ${isAnnual ? "(facturé annuellement)" : ""}`}
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{plan.description}</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {current.features.slice(0, 4).map((f) => (
                      <li key={f.title} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span className="text-slate-600">{f.title}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/demo"
                    className={cn(
                      "mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                      plan.highlight
                        ? "bg-weza-primary text-white hover:bg-weza-primary-dark"
                        : "border border-slate-200 text-weza-dark hover:border-weza-primary hover:text-weza-primary"
                    )}
                  >
                    {plan.price === "Sur devis" ? "Nous contacter" : "Démarrer l'essai"}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-weza">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Pack Suite</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Tous les SaaS, <span className="text-gradient">un seul abonnement</span>
            </h2>
            <p className="mt-3 text-slate-600">
              Combinez tous les outils Weza et économisez jusqu'à 40%.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
            {suitePlans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative rounded-3xl p-10 shadow-card",
                  plan.highlight
                    ? "bg-white border border-weza-primary"
                    : "bg-weza-dark text-white"
                )}
              >
                <div
                  className={cn(
                    "text-sm font-semibold uppercase tracking-wider",
                    plan.highlight ? "text-weza-primary" : "text-weza-accent"
                  )}
                >
                  {plan.name}
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={cn(
                      "text-5xl font-extrabold",
                      plan.highlight ? "text-weza-dark" : "text-white"
                    )}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      plan.highlight ? "text-slate-500" : "text-white/60"
                    )}
                  >
                    FCFA / mois
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-4 text-base",
                    plan.highlight ? "text-slate-600" : "text-white/80"
                  )}
                >
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {products.map((p) => (
                    <li key={p.slug} className="flex items-center gap-2">
                      <Check
                        className={cn(
                          "h-4 w-4",
                          plan.highlight ? "text-emerald-500" : "text-weza-accent"
                        )}
                      />
                      <span
                        className={cn(
                          plan.highlight ? "text-slate-600" : "text-white/80"
                        )}
                      >
                        {p.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={cn(
                    "mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition",
                    plan.highlight
                      ? "bg-weza-primary text-white hover:bg-weza-primary-dark"
                      : "bg-weza-accent text-weza-dark hover:bg-yellow-300"
                  )}
                >
                  Démarrer la suite
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        items={tarifsFaq}
        title="Questions sur les tarifs"
        subtitle="Tout ce qu'il faut savoir avant de souscrire."
      />
      <CTA />
    </>
  );
}
