import { Globe2, Sparkles, WifiOff, Wallet } from "lucide-react";

const pillars = [
  {
    icon: Globe2,
    title: "Ancrage local",
    description: "Pensé pour l'Afrique, par des Africains. OHADA, CNPS, Mobile Money — natifs.",
  },
  {
    icon: Sparkles,
    title: "Simple à prendre en main",
    description: "Vos équipes l'utilisent en 5 minutes, sans formation tech.",
  },
  {
    icon: WifiOff,
    title: "Fonctionne offline",
    description: "Continuez à travailler quand internet coupe. Synchronisation auto.",
  },
  {
    icon: Wallet,
    title: "Tarifs accessibles",
    description: "Adaptés au pouvoir d'achat local. À partir de 7 900 FCFA / mois.",
  },
];

export function WhyWeza() {
  return (
    <section className="section bg-slate-50">
      <div className="container-weza">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Pourquoi Weza</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Conçu pour la réalité <span className="text-gradient">du terrain africain</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Les outils internationaux ne connaissent pas vos contraintes. Nous oui.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-card"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-weza-primary/10 text-weza-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-bold text-weza-dark">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
