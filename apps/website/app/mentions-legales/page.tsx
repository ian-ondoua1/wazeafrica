import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" updated="01/01/2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site weza.africa est édité par <strong>Weza SARL</strong>, société de droit
        camerounais, immatriculée au RCCM de Douala.
      </p>
      <ul>
        <li>Siège social : Akwa, Douala — Cameroun</li>
        <li>Email : g.ondoua@weza-africa.com · k.nguimfack@weza-africa.com</li>
        <li>Téléphone : +237 6 55 87 44 20 · +237 6 95 30 62 44</li>
      </ul>

      <h2>Directeur de la publication</h2>
      <p>Le directeur de la publication est le représentant légal de Weza SARL.</p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
        Le CDN et la protection sont fournis par Cloudflare Inc.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments du site (textes, images, logos, codes) sont la propriété
        exclusive de Weza SARL. Toute reproduction sans autorisation préalable est interdite.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question, vous pouvez nous écrire à g.ondoua@weza-africa.com ou
        k.nguimfack@weza-africa.com, ou utiliser notre formulaire de contact.
      </p>
    </LegalLayout>
  );
}
