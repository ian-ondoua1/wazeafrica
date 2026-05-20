import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";

export function ProductsGrid() {
  return (
    <section className="section">
      <div className="container-weza">
        <div className="max-w-3xl">
          <span className="eyebrow">Notre suite SaaS</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            5 outils. Une seule promesse :{" "}
            <span className="text-gradient">simplifier votre business.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Chaque SaaS Weza est conçu pour l'Afrique : tarifs accessibles, mode offline,
            Mobile Money, et conformité locale.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.slug}
                href={`/produits/${p.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:border-weza-primary/40 hover:shadow-card"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${p.accent} opacity-0 transition group-hover:opacity-100`}
                />
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${p.bgSoft}`}>
                  <Icon className={`h-6 w-6 text-weza-dark`} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-weza-dark">{p.name}</h3>
                <p className="mt-2 text-sm font-medium text-weza-primary">{p.shortName}</p>
                <p className="mt-3 flex-1 text-slate-600">{p.description}</p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-weza-secondary group-hover:text-weza-primary">
                  Découvrir
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-dashed border-weza-primary/30 bg-weza-primary/5 p-8">
            <div>
              <span className="eyebrow">Pack Suite</span>
              <h3 className="mt-4 text-xl font-bold text-weza-dark">Weza All-in-One</h3>
              <p className="mt-3 text-slate-600">
                Tous les SaaS dans un seul abonnement. Jusqu'à -40% vs. plans séparés.
              </p>
            </div>
            <Link href="/tarifs" className="btn-primary mt-6 w-full">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
