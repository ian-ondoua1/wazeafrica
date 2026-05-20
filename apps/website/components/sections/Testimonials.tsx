import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  city: string;
}

export function Testimonials({
  items,
  title = "Ils ont franchi le pas",
  subtitle = "Des entrepreneurs comme vous, qui ont digitalisé leur activité avec Weza.",
}: {
  items?: Testimonial[];
  title?: string;
  subtitle?: string;
}) {
  const list: Testimonial[] = items ?? [
    {
      quote:
        "Avant Weza, je tenais ma pharmacie au cahier. Aujourd'hui, je sais exactement ce que j'ai en stock et je vends sans même y penser, même quand internet coupe.",
      author: "Jean N.",
      role: "Gérant pharmacie",
      city: "Douala",
    },
    {
      quote:
        "La facturation OHADA, c'était mon cauchemar. Weza Compta a tout automatisé. Mon comptable reçoit l'export, je gagne 10 heures par mois.",
      author: "Aïcha M.",
      role: "Fondatrice PME tech",
      city: "Yaoundé",
    },
    {
      quote:
        "Mes patients prennent RDV sur WhatsApp, je consulte leur dossier en un clic. Plus de doubles RDV, plus de dossiers perdus.",
      author: "Dr Mbarga",
      role: "Médecin généraliste",
      city: "Bafoussam",
    },
  ];

  return (
    <section className="section">
      <div className="container-weza">
        <div className="text-center">
          <span className="eyebrow">Témoignages</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">{subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {list.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-card"
            >
              <Quote className="h-8 w-8 text-weza-primary" />
              <blockquote className="mt-4 flex-1 text-slate-700">
                « {t.quote} »
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-weza-primary/10 font-bold text-weza-primary">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-weza-dark">{t.author}</div>
                  <div className="text-xs text-slate-500">
                    {t.role} · {t.city}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
