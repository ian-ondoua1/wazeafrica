import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata = {
  title: "Conditions générales d'utilisation",
};

export default function CGUPage() {
  return (
    <LegalLayout title="Conditions générales d'utilisation" updated="01/01/2026">
      <p>
        Les présentes CGU régissent l'accès et l'utilisation des services Weza. En vous
        inscrivant, vous les acceptez sans réserve.
      </p>

      <h2>Objet</h2>
      <p>
        Weza fournit, sous forme de logiciels en tant que service (SaaS), une suite d'outils
        de gestion : Caisse, Facturation OHADA, Livraison, Santé, RH & Paie.
      </p>

      <h2>Compte client</h2>
      <ul>
        <li>L'utilisateur fournit des informations exactes lors de l'inscription</li>
        <li>L'utilisateur est responsable de la confidentialité de ses identifiants</li>
        <li>L'utilisation est strictement limitée au périmètre du plan souscrit</li>
      </ul>

      <h2>Tarification & paiement</h2>
      <p>
        Les tarifs sont indiqués en FCFA sur la page tarifs. Le paiement est dû d'avance,
        mensuellement ou annuellement. Aucun remboursement n'est dû en cas de résiliation
        anticipée.
      </p>

      <h2>Engagement de service</h2>
      <p>
        Weza s'engage à une disponibilité de 99,9% sur base mensuelle, hors maintenance
        planifiée et cas de force majeure.
      </p>

      <h2>Résiliation</h2>
      <p>
        L'utilisateur peut résilier son abonnement à tout moment depuis son espace client. Les
        données restent accessibles 90 jours après résiliation, puis sont supprimées.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Weza ne peut être tenue responsable des dommages indirects. La responsabilité totale
        est plafonnée au montant payé sur les 12 derniers mois.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes CGU sont régies par le droit OHADA et le droit camerounais. Tout litige
        sera porté devant les tribunaux compétents de Douala.
      </p>
    </LegalLayout>
  );
}
