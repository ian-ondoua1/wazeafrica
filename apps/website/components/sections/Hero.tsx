import Link from "next/link";
import { ArrowRight, Check, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-radial-fade">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-40" />
      <div className="container-weza relative py-20 sm:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-weza-primary" />
              Suite SaaS panafricaine
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-weza-dark sm:text-5xl lg:text-6xl xl:text-7xl">
              Le pouvoir des{" "}
              <span className="text-gradient">entreprises africaines</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600 sm:text-xl">
              5 SaaS pour digitaliser et structurer votre activité : caisse, facturation
              OHADA, livraison, santé, RH & paie. Pensés pour le terrain africain.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo" className="btn-primary">
                Démarrer gratuitement
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#produits" className="btn-secondary">
                <Play className="h-4 w-4" />
                Voir la démo
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
              {["14 jours d'essai", "Sans carte bancaire", "Support local 24/7"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-weza-primary" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-weza-primary via-weza-primary-dark to-weza-secondary p-1 shadow-glow">
              <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-3 rounded-[22px] bg-white p-6">
                <div className="rounded-2xl bg-orange-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                    Caisse
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-weza-dark">
                    47 500 F
                  </div>
                  <div className="text-xs text-slate-500">Ventes du jour</div>
                  <div className="mt-3 h-2 rounded-full bg-orange-200">
                    <div className="h-full w-3/4 rounded-full bg-orange-500" />
                  </div>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    Facture
                  </div>
                  <div className="mt-2 text-lg font-bold text-weza-dark">
                    F-2026-042
                  </div>
                  <div className="text-xs text-slate-500">Payée · OHADA</div>
                  <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    <Check className="h-3 w-3" /> Conforme
                  </div>
                </div>

                <div className="rounded-2xl bg-sky-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                    Livraisons
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-weza-dark">12</div>
                  <div className="text-xs text-slate-500">En cours · 4 livreurs</div>
                  <div className="mt-3 flex -space-x-2">
                    {["A", "B", "C", "D"].map((c, i) => (
                      <div
                        key={c}
                        className="grid h-6 w-6 place-items-center rounded-full bg-sky-500 text-[10px] font-bold text-white ring-2 ring-white"
                        style={{ opacity: 1 - i * 0.15 }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-rose-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                    Santé
                  </div>
                  <div className="mt-2 text-lg font-bold text-weza-dark">
                    Dr. Mbarga
                  </div>
                  <div className="text-xs text-slate-500">8 RDV aujourd'hui</div>
                  <div className="mt-3 grid grid-cols-5 gap-1">
                    {[1, 1, 1, 0, 1].map((v, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full ${
                          v ? "bg-rose-500" : "bg-rose-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-weza-accent text-xl">
                  💰
                </div>
                <div>
                  <div className="text-xs text-slate-500">Mobile Money</div>
                  <div className="font-bold text-weza-dark">+ 12 500 FCFA</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-8 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-weza-secondary text-xl text-white">
                  📴
                </div>
                <div>
                  <div className="text-xs text-slate-500">Mode</div>
                  <div className="font-bold text-weza-dark">Offline OK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
