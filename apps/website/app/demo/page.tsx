"use client";

import { useState } from "react";
import { Calendar, Check, Clock, Video } from "lucide-react";
import { products } from "@/lib/products";

const benefits = [
  {
    icon: Video,
    title: "Démo personnalisée",
    text: "30 minutes avec un expert, sur le SaaS qui vous intéresse.",
  },
  {
    icon: Calendar,
    title: "Au moment qui vous arrange",
    text: "Créneaux disponibles en semaine, soir et samedi.",
  },
  {
    icon: Clock,
    title: "Mise en route rapide",
    text: "Si Weza vous convient, vous démarrez le jour même.",
  },
];

export default function DemoPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="bg-radial-fade py-20 sm:py-24">
        <div className="container-weza max-w-4xl text-center">
          <span className="eyebrow">Démo gratuite</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-weza-dark sm:text-5xl lg:text-6xl">
            Voyez Weza <span className="text-gradient">en action</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Réservez une démo personnalisée de 30 minutes avec un expert Weza. Sans engagement.
          </p>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-weza">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-weza-dark">
                Ce que vous aurez
              </h2>
              <div className="mt-8 space-y-6">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-weza-primary/10 text-weza-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-weza-dark">{b.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{b.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 rounded-2xl border border-weza-primary/30 bg-weza-primary/5 p-6">
                <p className="text-sm font-semibold text-weza-primary">
                  💡 Bon à savoir
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Vous pouvez aussi démarrer directement votre essai gratuit de 14 jours,
                  sans démo. Mais la démo aide à éviter les pièges et à configurer Weza pour
                  votre métier.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              {sent ? (
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-2xl text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-weza-dark">
                    Demande reçue !
                  </h2>
                  <p className="mt-3 text-slate-600">
                    Un expert Weza vous contacte sous 24h pour confirmer le créneau.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10"
                >
                  <h3 className="text-xl font-extrabold text-weza-dark">
                    Réservez votre démo
                  </h3>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-semibold text-weza-dark">
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-weza-dark">
                        Email pro *
                      </label>
                      <input
                        type="email"
                        required
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-weza-dark">
                        Téléphone WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-weza-dark">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-weza-dark">
                        Produit d'intérêt *
                      </label>
                      <select
                        required
                        defaultValue=""
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                      >
                        <option value="">— Sélectionner —</option>
                        {products.map((p) => (
                          <option key={p.slug} value={p.slug}>
                            {p.name}
                          </option>
                        ))}
                        <option value="suite">Suite All-in-One</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-weza-dark">
                        Taille entreprise
                      </label>
                      <select
                        defaultValue=""
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                      >
                        <option value="">— Sélectionner —</option>
                        <option>1-5 personnes</option>
                        <option>6-20 personnes</option>
                        <option>21-50 personnes</option>
                        <option>51-200 personnes</option>
                        <option>200+ personnes</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-semibold text-weza-dark">
                        Créneau préféré
                      </label>
                      <select
                        defaultValue=""
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                      >
                        <option value="">— Sélectionner —</option>
                        <option>Cette semaine, matin</option>
                        <option>Cette semaine, après-midi</option>
                        <option>Semaine prochaine, matin</option>
                        <option>Semaine prochaine, après-midi</option>
                        <option>Samedi</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary mt-8 w-full">
                    Réserver ma démo gratuite
                  </button>
                  <p className="mt-4 text-center text-xs text-slate-500">
                    Sans engagement. Aucune carte bancaire demandée.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
