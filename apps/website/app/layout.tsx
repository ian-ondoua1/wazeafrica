import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Weza — Le pouvoir des entreprises africaines",
    template: "%s · Weza",
  },
  description:
    "Suite SaaS panafricaine pour PME, commerces et professionnels : caisse Mobile Money, facturation OHADA, livraison, santé, RH & paie.",
  keywords: [
    "SaaS Afrique",
    "logiciel PME Cameroun",
    "Mobile Money",
    "facturation OHADA",
    "digitalisation Afrique",
  ],
  authors: [{ name: "Weza" }],
  openGraph: {
    title: "Weza — Le pouvoir des entreprises africaines",
    description:
      "5 SaaS pour digitaliser votre activité : caisse, facturation OHADA, livraison, santé, RH & paie.",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weza — Le pouvoir des entreprises africaines",
    description:
      "Suite SaaS pour PME africaines. Mobile Money, OHADA, offline, accessible.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
