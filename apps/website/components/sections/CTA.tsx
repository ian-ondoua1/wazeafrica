import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA({
  title = "Prêt à digitaliser votre business ?",
  subtitle = "14 jours d'essai gratuit, sans carte bancaire. Mise en route en 5 minutes.",
  primaryLabel = "Démarrer l'essai gratuit",
  primaryHref = "/demo",
  secondaryLabel = "Parler à un expert",
  secondaryHref = "/contact",
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section">
      <div className="container-weza">
        <div className="relative overflow-hidden rounded-3xl bg-weza-secondary px-8 py-16 text-center sm:px-16 lg:py-20">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-weza-primary/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-weza-accent/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white sm:text-5xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={primaryHref} className="btn-primary">
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
