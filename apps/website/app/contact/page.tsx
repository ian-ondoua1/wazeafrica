"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { products } from "@/lib/products";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="bg-radial-fade py-20 sm:py-24">
        <div className="container-weza text-center">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-weza-dark sm:text-5xl lg:text-6xl">
            Parlons de votre <span className="text-gradient">business</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Notre équipe vous répond sous 24 heures, en français, depuis Douala et Yaoundé.
          </p>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-weza">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-1">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-weza-primary/10 text-weza-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-weza-dark">Nous écrire</h3>
                <a
                  href="mailto:g.ondoua@weza-africa.com"
                  className="mt-1 block text-sm text-slate-600 hover:text-weza-primary"
                >
                  g.ondoua@weza-africa.com
                </a>
                <a
                  href="mailto:k.nguimfack@weza-africa.com"
                  className="mt-1 block text-sm text-slate-600 hover:text-weza-primary"
                >
                  k.nguimfack@weza-africa.com
                </a>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-weza-dark">WhatsApp</h3>
                <a
                  href="https://wa.me/237655874420"
                  className="mt-1 block text-sm text-slate-600 hover:text-weza-primary"
                >
                  +237 6 55 87 44 20
                </a>
                <a
                  href="https://wa.me/237695306244"
                  className="mt-1 block text-sm text-slate-600 hover:text-weza-primary"
                >
                  +237 6 95 30 62 44
                </a>
                <p className="mt-2 text-xs text-slate-500">Support 24/7</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-sky-100 text-sky-600">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-weza-dark">Téléphone</h3>
                <p className="mt-1 text-sm text-slate-600">+237 6 55 87 44 20</p>
                <p className="text-sm text-slate-600">+237 6 95 30 62 44</p>
                <p className="mt-2 text-xs text-slate-500">Lun-Ven · 8h - 18h</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-rose-100 text-rose-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-weza-dark">Bureaux</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Akwa, Douala · Cameroun
                  <br />
                  Bastos, Yaoundé · Cameroun
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              {sent ? (
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-2xl text-white">
                    ✓
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-weza-dark">
                    Message envoyé !
                  </h2>
                  <p className="mt-3 text-slate-600">
                    Notre équipe vous répond sous 24h ouvrées. Pour une réponse plus rapide,
                    contactez-nous sur WhatsApp.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-semibold text-weza-dark">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-weza-dark">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-weza-dark">
                        Téléphone
                      </label>
                      <input
                        type="tel"
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
                    <div className="sm:col-span-2">
                      <label className="text-sm font-semibold text-weza-dark">
                        Produit d'intérêt
                      </label>
                      <select
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                        defaultValue=""
                      >
                        <option value="">— Sélectionner —</option>
                        {products.map((p) => (
                          <option key={p.slug} value={p.slug}>
                            {p.name} ({p.shortName})
                          </option>
                        ))}
                        <option value="suite">Suite All-in-One</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-semibold text-weza-dark">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">
                    Envoyer le message
                  </button>
                  <p className="mt-4 text-xs text-slate-500">
                    En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
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
