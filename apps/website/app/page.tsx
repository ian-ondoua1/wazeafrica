import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { WhyWeza } from "@/components/sections/WhyWeza";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

const homeFaq = [
  {
    question: "Combien de temps pour démarrer ?",
    answer:
      "5 minutes. Vous créez votre compte, choisissez votre SaaS, et vous commencez. L'essai gratuit dure 14 jours, sans carte bancaire.",
  },
  {
    question: "Vos outils fonctionnent-ils sans internet ?",
    answer:
      "Oui pour Weza Caisse et l'app livreur de Weza Livraison. Toutes les données se synchronisent dès que la connexion revient.",
  },
  {
    question: "Acceptez-vous le Mobile Money ?",
    answer:
      "Oui. MTN Mobile Money et Orange Money sont intégrés nativement à Weza Caisse, Weza Compta et Weza RH.",
  },
  {
    question: "Êtes-vous conformes OHADA et CNPS ?",
    answer:
      "Oui. Weza Compta respecte les normes OHADA pour CEMAC et UEMOA. Weza RH calcule CNPS et IRPP selon les barèmes officiels.",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "À partir de 7 900 FCFA / mois par SaaS. Pack Suite All-in-One disponible avec jusqu'à -40% vs. plans séparés.",
  },
  {
    question: "Avez-vous un support en français ?",
    answer:
      "Oui, 24/7 par WhatsApp, email et téléphone. Équipe basée à Douala et Yaoundé.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <div id="produits">
        <ProductsGrid />
      </div>
      <WhyWeza />
      <Stats />
      <Testimonials />

      <section className="section">
        <div className="container-weza">
          <div className="overflow-hidden rounded-3xl bg-slate-50 p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-16">
            <div>
              <span className="eyebrow">Pack Suite</span>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                Tous nos SaaS, <span className="text-gradient">un seul abonnement</span>
              </h2>
              <p className="mt-4 max-w-xl text-slate-600">
                Avec Weza All-in-One, profitez de tous les outils Weza et économisez jusqu'à
                40% sur les plans séparés.
              </p>
              <Link href="/tarifs" className="btn-primary mt-8">
                Voir les tarifs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:mt-0 lg:w-1/2">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="text-sm font-medium text-slate-500">Suite Pro</div>
                <div className="mt-1 text-3xl font-extrabold text-weza-dark">
                  99 900<span className="text-sm font-medium text-slate-500"> FCFA / mois</span>
                </div>
                <div className="mt-3 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  -35%
                </div>
              </div>
              <div className="rounded-2xl bg-weza-dark p-6 text-white shadow-card">
                <div className="text-sm font-medium text-white/60">Suite Business</div>
                <div className="mt-1 text-3xl font-extrabold">
                  199 900<span className="text-sm font-medium text-white/60"> FCFA / mois</span>
                </div>
                <div className="mt-3 inline-flex rounded-full bg-weza-accent px-2 py-0.5 text-xs font-semibold text-weza-dark">
                  -40%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={homeFaq} />
      <CTA />
    </>
  );
}
