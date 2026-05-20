import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata = {
  title: "Politique de confidentialité",
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="01/01/2026">
      <p>
        Weza SARL accorde une importance particulière à la protection de vos données
        personnelles. Cette politique décrit ce que nous collectons, pourquoi, et comment.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>Informations d'identification (nom, prénom, email, téléphone)</li>
        <li>Informations d'entreprise (raison sociale, RCCM, NIU)</li>
        <li>Données techniques (adresse IP, navigateur, pages visitées)</li>
        <li>Données métier (vos clients, factures, transactions — uniquement si vous utilisez nos SaaS)</li>
      </ul>

      <h2>Finalités</h2>
      <ul>
        <li>Fournir nos services et exécuter votre contrat</li>
        <li>Répondre à vos demandes de support</li>
        <li>Améliorer nos produits</li>
        <li>Respecter nos obligations légales</li>
      </ul>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et
        d'opposition sur vos données. Contactez-nous à g.ondoua@weza-africa.com ou
        k.nguimfack@weza-africa.com.
      </p>

      <h2>Cookies</h2>
      <p>
        Nous utilisons des cookies essentiels au fonctionnement du site et, avec votre
        consentement, des cookies d'analyse anonymes (Plausible / Umami). Aucun cookie
        publicitaire tiers n'est posé.
      </p>

      <h2>Sécurité</h2>
      <p>
        Vos données sont chiffrées en transit (HTTPS) et au repos. Nous suivons les standards
        de sécurité de l'industrie et journalisons les accès sensibles.
      </p>

      <h2>Contact DPO</h2>
      <p>g.ondoua@weza-africa.com · k.nguimfack@weza-africa.com</p>
    </LegalLayout>
  );
}
