import {
  ShoppingCart,
  Receipt,
  Truck,
  HeartPulse,
  Users,
  type LucideIcon,
} from "lucide-react";

export type ProductSlug =
  | "caisse"
  | "facturation"
  | "logistique"
  | "sante"
  | "rh-paie";

export type ProductColor =
  | "orange"
  | "green"
  | "blue"
  | "red"
  | "purple";

export interface PricingPlan {
  name: string;
  price: string;
  priceUsd: string;
  description: string;
  highlight?: boolean;
}

export interface Product {
  slug: ProductSlug;
  emoji: string;
  icon: LucideIcon;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: { icon: string; title: string; description: string }[];
  audience: string;
  competitors: string;
  color: ProductColor;
  accent: string;
  bgSoft: string;
  plans: PricingPlan[];
  problemSolution: {
    problem: string;
    solution: string;
  };
  faq: { question: string; answer: string }[];
  useCases: { persona: string; description: string }[];
}

export const products: Product[] = [
  {
    slug: "caisse",
    emoji: "🛒",
    icon: ShoppingCart,
    name: "Weza Caisse",
    shortName: "Caisse & Mobile Money",
    tagline: "La caisse intelligente pour les commerces africains.",
    description:
      "Système de caisse digital avec Mobile Money intégré, mode offline et gestion de stock.",
    longDescription:
      "Système de caisse digital conçu pour les commerces locaux : boutiques, restaurants, pharmacies, quincailleries, supermarchés. Pensé pour fonctionner même sans connexion internet.",
    color: "orange",
    accent: "bg-orange-500",
    bgSoft: "bg-orange-50",
    audience: "Boutiques (1-50 employés), pharmacies, restaurants, supermarchés.",
    competitors: "Square, SumUp, Shopify POS — aucun n'intègre nativement le mobile money africain.",
    features: [
      { icon: "🛍️", title: "Ventes en temps réel", description: "Suivez chaque transaction au moment où elle se produit." },
      { icon: "📦", title: "Stock & inventaire", description: "Inventaire simplifié, alertes de rupture automatiques." },
      { icon: "💸", title: "MTN & Orange Money", description: "Paiements mobile money encaissés directement à la caisse." },
      { icon: "📴", title: "Mode offline complet", description: "Vendez sans internet, synchronisation automatique au retour du réseau." },
      { icon: "👥", title: "Cahier digital de dettes", description: "Suivez les dettes clients et envoyez des rappels WhatsApp." },
      { icon: "🧾", title: "Tickets imprimés ou WhatsApp", description: "Envoyez le reçu par WhatsApp ou imprimez-le, au choix." },
      { icon: "📱", title: "Tablette, smartphone, PC", description: "Une seule app, sur tous vos appareils." },
      { icon: "📊", title: "Rapports clairs", description: "Vue d'ensemble jour, semaine, mois — sans tableur." },
    ],
    problemSolution: {
      problem: "Vous gérez encore votre boutique au cahier ? Vos stocks fondent sans que vous sachiez où passent les produits ?",
      solution: "Weza Caisse remplace le cahier, suit chaque vente et chaque produit, et accepte MTN et Orange Money en un tap. Même sans internet.",
    },
    plans: [
      { name: "Starter", price: "9 900", priceUsd: "~15$", description: "1 caisse, 1 utilisateur, 500 ventes/mois" },
      { name: "Pro", price: "24 900", priceUsd: "~40$", description: "3 caisses, 5 utilisateurs, mobile money, offline", highlight: true },
      { name: "Business", price: "49 900", priceUsd: "~80$", description: "Caisses illimitées, multi-magasins, analytics" },
      { name: "Enterprise", price: "Sur devis", priceUsd: "", description: "Multi-pays, intégrations sur-mesure" },
    ],
    faq: [
      { question: "Est-ce que ça fonctionne sans internet ?", answer: "Oui. Weza Caisse enregistre toutes les ventes localement et synchronise automatiquement dès que la connexion revient." },
      { question: "Comment fonctionne le paiement Mobile Money ?", answer: "À l'encaissement, le client tape son code MTN ou Orange Money. La confirmation arrive sur votre écran en quelques secondes." },
      { question: "Puis-je utiliser une imprimante thermique ?", answer: "Oui, nous supportons les imprimantes thermiques Bluetooth et USB les plus courantes au Cameroun." },
      { question: "Combien de produits puis-je gérer ?", answer: "Le plan Pro permet un catalogue illimité. Le plan Starter est limité à 500 références." },
    ],
    useCases: [
      { persona: "Boutique de quartier", description: "Suivez ventes et stock, acceptez Mobile Money, fini les cahiers." },
      { persona: "Pharmacie", description: "Gérez votre catalogue, les dettes clients et les rappels de stock." },
      { persona: "Restaurant", description: "Prise de commande rapide, ticket WhatsApp et caisse offline." },
    ],
  },
  {
    slug: "facturation",
    emoji: "🧾",
    icon: Receipt,
    name: "Weza Compta",
    shortName: "Facturation OHADA",
    tagline: "Votre comptabilité, conforme et automatique.",
    description:
      "Plateforme de facturation et comptabilité conforme aux normes OHADA pour CEMAC et UEMOA.",
    longDescription:
      "Plateforme de facturation et comptabilité conforme aux normes OHADA et à la fiscalité des pays CEMAC/UEMOA. Pensée pour les PME, freelances et cabinets qui veulent arrêter Excel sans payer un comptable à plein temps.",
    color: "green",
    accent: "bg-emerald-500",
    bgSoft: "bg-emerald-50",
    audience: "PME (5-100 employés), freelances, cabinets, consultants.",
    competitors: "Pennylane, QuickBooks, Sage — mais aucun n'est conforme OHADA.",
    features: [
      { icon: "📄", title: "Factures pro en 30 secondes", description: "Modèles élégants, numérotation auto, logo personnalisé." },
      { icon: "🏛️", title: "TVA & OHADA", description: "Calculs et formats conformes pour CMR, CIV, SEN, GAB, et autres." },
      { icon: "💳", title: "Suivi des paiements", description: "Rappels automatiques par email et WhatsApp." },
      { icon: "📥", title: "Dépenses & revenus", description: "Centralisez vos recettes et dépenses, exportez à la demande." },
      { icon: "📤", title: "Export comptable", description: "PDF, Excel, formats compatibles avec votre comptable." },
      { icon: "🔁", title: "Facturation récurrente", description: "Abonnements et contrats récurrents, automatisés." },
      { icon: "📊", title: "Tableaux de bord", description: "CA, marge, créances : tout en un écran." },
      { icon: "📱", title: "Mobile-friendly", description: "Facturez depuis votre téléphone, même en déplacement." },
    ],
    problemSolution: {
      problem: "Vos factures sortent encore de Word ? Vous payez un comptable externe juste pour calculer la TVA ?",
      solution: "Weza Compta facture, calcule la TVA OHADA et relance vos clients. Votre comptable reçoit un export propre, vous gardez le contrôle.",
    },
    plans: [
      { name: "Starter", price: "7 900", priceUsd: "~13$", description: "50 factures/mois, 1 utilisateur" },
      { name: "Pro", price: "19 900", priceUsd: "~32$", description: "Factures illimitées, TVA, OHADA, 5 utilisateurs", highlight: true },
      { name: "Business", price: "39 900", priceUsd: "~65$", description: "Multi-sociétés, comptabilité avancée" },
      { name: "Enterprise", price: "Sur devis", priceUsd: "", description: "Cabinets d'expertise, gros volumes" },
    ],
    faq: [
      { question: "Vos factures sont-elles conformes OHADA ?", answer: "Oui. Les modèles incluent toutes les mentions obligatoires (RCCM, NIU, TVA) et respectent l'ordre comptable OHADA." },
      { question: "Quels pays sont supportés ?", answer: "Cameroun, Côte d'Ivoire, Sénégal, Gabon, Bénin, Togo, Burkina Faso, Mali, Niger, RCA, Tchad, Congo." },
      { question: "Mon comptable peut-il accéder à mes données ?", answer: "Oui, vous pouvez l'inviter en lecture seule, ou lui envoyer l'export comptable mensuel automatiquement." },
      { question: "Puis-je migrer depuis Excel ?", answer: "Oui, nous proposons un import de clients et produits depuis un fichier Excel." },
    ],
    useCases: [
      { persona: "Freelance", description: "Facturez vos missions, suivez les paiements, exportez pour les impôts." },
      { persona: "PME", description: "Centralisez factures, TVA et suivi clients sans logiciel cher." },
      { persona: "Cabinet conseil", description: "Récurrence d'abonnements, multi-clients, exports OHADA." },
    ],
  },
  {
    slug: "logistique",
    emoji: "🚚",
    icon: Truck,
    name: "Weza Livraison",
    shortName: "Logistique & Livraison",
    tagline: "Vos livraisons, sous contrôle.",
    description:
      "Plateforme de gestion de livraison adaptée aux motos-taxis, zemidjans et e-commerce local.",
    longDescription:
      "Plateforme de gestion de livraison adaptée au contexte africain : motos-taxis, zemidjans, e-commerce local, restaurants livreurs. Optimisez les tournées, suivez les colis et payez les livreurs en mobile money.",
    color: "blue",
    accent: "bg-sky-500",
    bgSoft: "bg-sky-50",
    audience: "E-commerçants, restaurants avec livraison, sociétés de coursiers, marketplaces.",
    competitors: "Shippr, Bringg, Uber Freight — inadaptés au marché informel africain.",
    features: [
      { icon: "🏍️", title: "Flotte mixte", description: "Motos, vélos, voitures — gérez tous vos livreurs dans une seule app." },
      { icon: "🤖", title: "Assignation auto", description: "Le système attribue chaque course au bon livreur, selon la zone et la charge." },
      { icon: "📍", title: "Tracking GPS temps réel", description: "Vos clients savent où est leur colis, en direct." },
      { icon: "💬", title: "Notifications WhatsApp", description: "Le client reçoit chaque étape par WhatsApp et SMS." },
      { icon: "🗺️", title: "Optimisation de tournées", description: "Les meilleurs trajets, calculés en quelques secondes." },
      { icon: "💰", title: "Cash & Mobile Money", description: "Encaissez à la livraison, en espèces ou mobile money." },
      { icon: "📊", title: "Tableau de bord ops", description: "Volumes, retards, taux de réussite — tout en un écran." },
      { icon: "⭐", title: "Notation des livreurs", description: "Suivez la qualité de service, récompensez les meilleurs." },
    ],
    problemSolution: {
      problem: "Vous gérez vos livreurs au téléphone ? Vous perdez des colis ou des clients faute de visibilité ?",
      solution: "Weza Livraison assigne, suit et notifie automatiquement. Vous gardez le contrôle sur 1 ou 100 livreurs, sans tableur ni groupe WhatsApp.",
    },
    plans: [
      { name: "Starter", price: "14 900", priceUsd: "~24$", description: "100 livraisons/mois, 5 livreurs" },
      { name: "Pro", price: "34 900", priceUsd: "~57$", description: "500 livraisons, GPS, optimisation, 20 livreurs", highlight: true },
      { name: "Business", price: "69 900", priceUsd: "~113$", description: "Livraisons illimitées, multi-entrepôts" },
      { name: "Enterprise", price: "Sur devis", priceUsd: "", description: "Marketplaces, intégrations API" },
    ],
    faq: [
      { question: "Mes livreurs ont besoin de smartphones puissants ?", answer: "Non. Notre app livreur tourne sur n'importe quel Android, même entry-level." },
      { question: "Le tracking GPS marche sans internet ?", answer: "L'app garde la position en local et synchronise dès que la 3G/4G revient." },
      { question: "Puis-je connecter ma boutique en ligne ?", answer: "Oui, nous offrons une API et des intégrations WooCommerce et Shopify." },
    ],
    useCases: [
      { persona: "E-commerçant", description: "Suivez chaque colis, notifiez vos clients, optimisez vos tournées." },
      { persona: "Restaurant", description: "Coordonnez vos livreurs et vos commandes en quelques minutes." },
      { persona: "Société de coursiers", description: "Centralisez vos missions, payez vos livreurs en mobile money." },
    ],
  },
  {
    slug: "sante",
    emoji: "🏥",
    icon: HeartPulse,
    name: "Weza Santé",
    shortName: "Santé & Cliniques",
    tagline: "Digitalisez votre cabinet en quelques clics.",
    description:
      "Solution complète pour digitaliser les cliniques privées, cabinets médicaux et structures de santé.",
    longDescription:
      "Solution complète pour digitaliser les cliniques privées, cabinets médicaux, dentistes, kinés et laboratoires. Prise de rendez-vous, dossiers patients, rappels WhatsApp — sans paperasse.",
    color: "red",
    accent: "bg-rose-500",
    bgSoft: "bg-rose-50",
    audience: "Cliniques privées, cabinets médicaux, dentistes, kinés, laboratoires.",
    competitors: "Doctolib — mais inexistant en Afrique francophone.",
    features: [
      { icon: "📅", title: "RDV en ligne ou WhatsApp", description: "Vos patients réservent depuis un lien, 24/7." },
      { icon: "🗂️", title: "Dossiers médicaux électroniques", description: "Historique, prescriptions, antécédents — au même endroit." },
      { icon: "📋", title: "Consultations & ordonnances", description: "Rédigez et imprimez l'ordonnance en quelques secondes." },
      { icon: "💬", title: "Rappels SMS / WhatsApp", description: "Réduisez les RDV manqués de 70%." },
      { icon: "👨‍⚕️", title: "Planning multi-praticiens", description: "Chaque médecin gère son agenda, sans conflit." },
      { icon: "💉", title: "Actes & facturation", description: "Cotation, facture patient, suivi assurance." },
      { icon: "🔐", title: "Confidentialité renforcée", description: "Chiffrement et contrôle d'accès strict, conformité type RGPD." },
      { icon: "📊", title: "Statistiques médicales", description: "Suivez fréquentation, pathologies fréquentes, revenus." },
    ],
    problemSolution: {
      problem: "Vos patients prennent RDV par téléphone ? Vos dossiers se perdent dans des classeurs ?",
      solution: "Weza Santé centralise RDV, dossiers et rappels. Vos patients réservent en ligne, vous consultez l'historique en un clic.",
    },
    plans: [
      { name: "Starter", price: "12 900", priceUsd: "~21$", description: "1 praticien, 200 RDV/mois" },
      { name: "Pro", price: "29 900", priceUsd: "~49$", description: "5 praticiens, dossiers patients, WhatsApp", highlight: true },
      { name: "Business", price: "59 900", priceUsd: "~97$", description: "Cliniques multi-praticiens" },
      { name: "Enterprise", price: "Sur devis", priceUsd: "", description: "Hôpitaux, réseaux de cliniques" },
    ],
    faq: [
      { question: "Les données patients sont-elles sécurisées ?", answer: "Oui. Données chiffrées en base, accès par rôles, journal d'audit complet." },
      { question: "Mes patients peuvent prendre RDV sur WhatsApp ?", answer: "Oui, via un bot WhatsApp connecté à votre planning ou un lien direct partagé sur vos réseaux." },
      { question: "Puis-je gérer plusieurs cabinets ?", answer: "Oui, à partir du plan Business : multi-sites, multi-praticiens, vue consolidée." },
    ],
    useCases: [
      { persona: "Médecin généraliste", description: "RDV en ligne, dossiers patients, rappels — un seul outil." },
      { persona: "Dentiste", description: "Planning par fauteuil, devis, suivi des soins." },
      { persona: "Clinique privée", description: "Multi-praticiens, facturation, statistiques consolidées." },
    ],
  },
  {
    slug: "rh-paie",
    emoji: "👥",
    icon: Users,
    name: "Weza RH",
    shortName: "RH & Paie",
    tagline: "Gérez vos équipes, payez en un clic.",
    description:
      "Outil de gestion du personnel et de la paie adapté aux PME africaines (CNPS, IRPP, mobile money).",
    longDescription:
      "Outil de gestion du personnel et de la paie pensé pour les PME africaines : calcul automatique de la paie selon CNPS et IRPP, paiement mobile money, gestion des absences et contrats conformes.",
    color: "purple",
    accent: "bg-violet-500",
    bgSoft: "bg-violet-50",
    audience: "PME (5-200 employés), agences, entreprises en croissance.",
    competitors: "PayFit, Factorial — non adaptés aux codes du travail africains.",
    features: [
      { icon: "👤", title: "Dossier employé complet", description: "Contrats, documents, congés, historique — au même endroit." },
      { icon: "💰", title: "Paie automatique", description: "CNPS, IRPP, retenues : tout est calculé automatiquement." },
      { icon: "💸", title: "Paiement mobile money", description: "Payez tous vos employés en quelques clics, mobile money ou virement." },
      { icon: "🏖️", title: "Absences & congés", description: "Demande, validation, soldes : sans email ni papier." },
      { icon: "📄", title: "Contrats conformes", description: "Génération de contrats CDD, CDI et lettres conformes au droit local." },
      { icon: "📊", title: "Bulletins de paie auto", description: "PDF générés et envoyés à chaque employé, chaque mois." },
      { icon: "⏰", title: "Pointage", description: "Présence, retards et heures supp en temps réel." },
      { icon: "📈", title: "Rapports RH", description: "Masse salariale, turnover, absences — toujours à jour." },
    ],
    problemSolution: {
      problem: "Vous calculez la paie sur Excel ? Vous oubliez des congés ou des retenues CNPS ?",
      solution: "Weza RH calcule, paie et archive automatiquement. CNPS et IRPP justes du premier coup, bulletins envoyés en un clic.",
    },
    plans: [
      { name: "Starter", price: "9 900", priceUsd: "~15$", description: "Jusqu'à 10 employés" },
      { name: "Pro", price: "24 900", priceUsd: "~40$", description: "Jusqu'à 50 employés, paie auto, CNPS", highlight: true },
      { name: "Business", price: "49 900", priceUsd: "~80$", description: "Jusqu'à 200 employés, multi-sites" },
      { name: "Enterprise", price: "Sur devis", priceUsd: "", description: "Plus de 200 employés" },
    ],
    faq: [
      { question: "Le calcul CNPS est-il à jour ?", answer: "Oui. Nous mettons à jour les barèmes dès qu'ils sont publiés au Cameroun, en Côte d'Ivoire, au Sénégal et dans les autres pays supportés." },
      { question: "Puis-je payer mes employés en mobile money ?", answer: "Oui, virement bancaire ou mobile money MTN/Orange — au choix par employé." },
      { question: "Les employés ont-ils un accès ?", answer: "Chaque employé a un espace pour ses bulletins, demandes de congé et documents." },
    ],
    useCases: [
      { persona: "Startup en croissance", description: "Onboardez rapidement, payez sans erreur, gardez la conformité." },
      { persona: "Agence", description: "Pointage et heures sup, paie automatique, bulletins envoyés." },
      { persona: "PME établie", description: "Centralisez RH, masse salariale et conformité multi-sites." },
    ],
  },
];

export const getProduct = (slug: ProductSlug) =>
  products.find((p) => p.slug === slug)!;

export const suitePlans: PricingPlan[] = [
  {
    name: "Suite Pro",
    price: "99 900",
    priceUsd: "~165$",
    description: "Tous les SaaS au plan Pro. -35% vs. plans séparés.",
    highlight: true,
  },
  {
    name: "Suite Business",
    price: "199 900",
    priceUsd: "~325$",
    description: "Tous les SaaS au plan Business. -40% vs. plans séparés.",
  },
];
