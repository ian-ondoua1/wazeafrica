import type { Metadata } from "next";
import Link from "next/link";
import { Globe2, Heart, Lightbulb, Shield } from "lucide-react";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Weza est une startup panafricaine qui développe des SaaS adaptés aux réalités du marché africain.",
};

const values = [
  {
    icon: Globe2,
    title: "Ancrage local",
    text: "Pensé pour l'Afrique, par des Africains. Nous connaissons les contraintes du terrain.",
  },
  {
    icon: Lightbulb,
    title: "Simplicité",
    text: "Nos outils sont accessibles, même sans formation technique.",
  },
  {
    icon: Shield,
    title: "Fiabilité",
    text: "Mode offline, disponibilité 24/7. Nous restons debout quand le réseau ne suit pas.",
  },
  {
    icon: Heart,
    title: "Accessibilité",
    text: "Des tarifs adaptés au pouvoir d'achat local. Pas de prix occidentaux.",
  },
];

const team = [
  { name: "Équipe Produit", role: "Yaoundé & Douala", emoji: "👩🏾‍💻" },
  { name: "Équipe Tech", role: "Cameroun · Côte d'Ivoire", emoji: "👨🏾‍💻" },
  { name: "Équipe Commerciale", role: "CEMAC & UEMOA", emoji: "🤝🏾" },
  { name: "Support Client", role: "24/7 en français", emoji: "🎧" },
];

export default function AProposPage() {
  return (
    <>
      <section className="bg-radial-fade py-20 sm:py-24">
        <div className="container-weza max-w-4xl text-center">
          <span className="eyebrow">À propos de Weza</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-weza-dark sm:text-5xl lg:text-6xl">
            Le pouvoir des{" "}
            <span className="text-gradient">entreprises africaines</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            Weza, c'est "Pouvoir" en swahili. Notre mission : digitaliser et structurer les
            PME africaines avec des outils simples, locaux et accessibles.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-weza max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Notre histoire</span>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                Nés du terrain, pour le terrain
              </h2>
              <div className="mt-6 space-y-4 text-slate-600">
                <p>
                  Tout est parti d'un constat simple : les commerçants, restaurateurs,
                  cliniques et PME africaines utilisent des outils pensés pour Paris, Londres
                  ou San Francisco. Et ces outils ne marchent pas chez nous.
                </p>
                <p>
                  Pas de Mobile Money. Pas de mode offline quand le réseau coupe. Pas de
                  conformité OHADA. Des tarifs en euros qui n'ont aucun sens à Douala.
                </p>
                <p>
                  Alors nous avons construit Weza : une suite SaaS pour les entreprises
                  africaines, par des Africains. Cinq outils essentiels, conçus pour notre
                  réalité.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-weza-primary via-weza-primary-dark to-weza-secondary p-8 text-white shadow-glow">
                <div className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Notre mission
                </div>
                <p className="mt-4 text-2xl font-bold leading-snug">
                  Digitaliser et structurer les PME africaines avec des outils simples,
                  locaux et accessibles.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
                  <div>
                    <div className="text-3xl font-extrabold">1 000+</div>
                    <div className="text-xs text-white/70">PME</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold">5</div>
                    <div className="text-xs text-white/70">Pays</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold">5</div>
                    <div className="text-xs text-white/70">SaaS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-weza">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Nos valeurs</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Ce qui nous fait avancer
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-card"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-weza-primary/10 text-weza-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-bold text-weza-dark">{v.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-weza">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">L'équipe</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Des Africains qui codent pour l'Afrique
            </h2>
            <p className="mt-3 text-slate-600">
              Une équipe distribuée à travers la CEMAC et l'UEMOA, qui connaît votre marché.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-slate-200 p-8 text-center transition hover:border-weza-primary/40 hover:shadow-card"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-weza-primary/10 text-3xl">
                  {m.emoji}
                </div>
                <h3 className="mt-4 font-bold text-weza-dark">{m.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{m.role}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-slate-50 p-10 text-center">
            <h3 className="text-2xl font-extrabold text-weza-dark">
              Vous voulez nous rejoindre ?
            </h3>
            <p className="mt-3 text-slate-600">
              Nous recrutons des talents passionnés par la digitalisation de l'Afrique.
            </p>
            <Link href="/contact" className="btn-primary mt-6">
              Postuler
            </Link>
          </div>
        </div>
      </section>

      <CTA
        title="Rejoignez le mouvement Weza"
        subtitle="Plus de 1 000 entreprises africaines digitalisent leur activité avec nos outils."
      />
    </>
  );
}
