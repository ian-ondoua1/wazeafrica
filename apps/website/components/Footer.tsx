import Link from "next/link";
import { products } from "@/lib/products";

const columns = [
  {
    title: "Produits",
    links: products.map((p) => ({
      label: p.shortName,
      href: `/produits/${p.slug}`,
    })),
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Cas clients", href: "#" },
      { label: "Support", href: "/contact" },
      { label: "API docs", href: "#" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Carrières", href: "#" },
      { label: "Presse", href: "#" },
      { label: "Contact", href: "/contact" },
      { label: "Partenaires", href: "#" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "CGU", href: "/cgu" },
      { label: "Confidentialité", href: "/politique-confidentialite" },
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Cookies", href: "/politique-confidentialite" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-weza-dark text-slate-300">
      <div className="container-weza py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold text-white">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-weza-primary text-white">
                W
              </span>
              Weza
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              Le pouvoir des entreprises africaines.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Suite SaaS panafricaine pour PME, commerces et professionnels.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-weza-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Weza. Tous droits réservés. Douala · Yaoundé · Abidjan · Dakar.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <span>🇨🇲 Cameroun</span>
            <span>🇨🇮 Côte d'Ivoire</span>
            <span>🇸🇳 Sénégal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
