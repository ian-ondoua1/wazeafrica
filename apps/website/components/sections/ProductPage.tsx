import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import type { Product } from "@/lib/products";
import { FAQ } from "./FAQ";
import { CTA } from "./CTA";

export function ProductPage({ product }: { product: Product }) {
  const Icon = product.icon;
  return (
    <>
      <section className="relative overflow-hidden bg-radial-fade">
        <div className="container-weza py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">
                <span>{product.emoji}</span>
                {product.shortName}
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-weza-dark sm:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 max-w-xl text-xl text-slate-700">{product.tagline}</p>
              <p className="mt-4 max-w-xl text-slate-600">{product.longDescription}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/demo" className="btn-primary">
                  Essai gratuit 14 jours
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Demander une démo
                </Link>
              </div>
            </div>

            <div className="relative">
              <div
                className={`rounded-3xl border border-slate-200 ${product.bgSoft} p-8 shadow-card`}
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-sm">
                  <Icon className="h-8 w-8 text-weza-dark" />
                </div>
                <div className="mt-6 space-y-3">
                  {product.features.slice(0, 4).map((f) => (
                    <div
                      key={f.title}
                      className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm"
                    >
                      <span className="text-xl">{f.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-weza-dark">{f.title}</div>
                        <div className="text-xs text-slate-500">{f.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-weza max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-3xl bg-rose-50 p-10">
              <div className="text-sm font-semibold uppercase tracking-wider text-rose-600">
                Le problème
              </div>
              <p className="mt-4 text-2xl font-bold text-weza-dark">
                {product.problemSolution.problem}
              </p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-10">
              <div className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Avec Weza
              </div>
              <p className="mt-4 text-2xl font-bold text-weza-dark">
                {product.problemSolution.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-weza">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Fonctionnalités</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Tout ce dont vous avez besoin
            </h2>
            <p className="mt-3 text-slate-600">
              {product.name} embarque toutes les fonctionnalités pensées pour votre métier.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-card"
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 font-bold text-weza-dark">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-weza">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Pour qui</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              {product.name}, fait pour vous si...
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {product.useCases.map((u) => (
              <div
                key={u.persona}
                className="rounded-2xl border border-slate-200 p-8 transition hover:border-weza-primary/40 hover:shadow-card"
              >
                <div className="text-sm font-semibold text-weza-primary">
                  {u.persona}
                </div>
                <p className="mt-2 text-slate-600">{u.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-weza max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Comparatif</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Weza vs. les outils internationaux
            </h2>
            <p className="mt-3 text-slate-600">{product.competitors}</p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Critère
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-weza-primary">
                    {product.name}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-500">
                    Outils internationaux
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { label: "Mobile Money (MTN, Orange)", weza: true, intl: false },
                  { label: "Mode offline", weza: true, intl: false },
                  { label: "Conforme OHADA / CNPS", weza: true, intl: false },
                  { label: "Tarif adapté au marché local", weza: true, intl: false },
                  { label: "Support en français local", weza: true, intl: false },
                  { label: "Interface en anglais", weza: false, intl: true },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="px-6 py-4 text-sm font-medium text-weza-dark">
                      {row.label}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.weza ? (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-slate-300" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.intl ? (
                        <Check className="mx-auto h-5 w-5 text-slate-400" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-rose-400" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-weza">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Tarifs {product.shortName}</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Choisissez votre plan
            </h2>
            <p className="mt-3 text-slate-600">
              14 jours d'essai gratuit. Sans engagement. Résiliation à tout moment.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {product.plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 ${
                  plan.highlight
                    ? "border-weza-primary bg-white shadow-card"
                    : "border-slate-200 bg-white"
                }`}
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
                  <span className="text-3xl font-extrabold text-weza-dark">
                    {plan.price}
                  </span>
                  {plan.priceUsd && (
                    <span className="text-sm font-medium text-slate-400">
                      {plan.priceUsd}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {plan.price === "Sur devis" ? "Tarif personnalisé" : "FCFA / mois"}
                </div>
                <p className="mt-4 text-sm text-slate-600">{plan.description}</p>
                <Link
                  href="/demo"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    plan.highlight
                      ? "bg-weza-primary text-white hover:bg-weza-primary-dark"
                      : "border border-slate-200 text-weza-dark hover:border-weza-primary hover:text-weza-primary"
                  }`}
                >
                  {plan.price === "Sur devis" ? "Nous contacter" : "Démarrer"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        items={product.faq}
        title={`Questions sur ${product.name}`}
        subtitle="Tout ce que vous devez savoir avant de vous lancer."
      />

      <CTA
        title={`Prêt à passer à ${product.name} ?`}
        subtitle="Lancez votre essai en 5 minutes. Sans carte bancaire."
      />
    </>
  );
}
