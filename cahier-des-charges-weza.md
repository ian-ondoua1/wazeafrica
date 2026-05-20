# 📋 Cahier des Charges — Weza

> **Site Web Vitrine SaaS**
> Version 1.0 — Document de spécifications fonctionnelles & techniques

---

## 📑 Sommaire

1. [Présentation du projet](#1-présentation-du-projet)
2. [Identité de la startup](#2-identité-de-la-startup)
3. [Cibles & personas](#3-cibles--personas)
4. [Architecture du site](#4-architecture-du-site)
5. [Présentation des produits SaaS](#5-présentation-des-produits-saas)
6. [Grille tarifaire](#6-grille-tarifaire)
7. [Stack technique](#7-stack-technique)
8. [Design system](#8-design-system)
9. [Spécifications par page](#9-spécifications-par-page)
10. [Composants réutilisables](#10-composants-réutilisables)
11. [SEO & performance](#11-seo--performance)
12. [Internationalisation](#12-internationalisation)
13. [Sécurité & conformité](#13-sécurité--conformité)
14. [Roadmap de développement](#14-roadmap-de-développement)
15. [Livrables](#15-livrables)

---

## 1. Présentation du projet

### 1.1 Contexte

**Weza** est une startup technologique panafricaine qui développe une suite de solutions SaaS adaptées aux réalités du marché africain (Cameroun, Afrique subsaharienne, zone CEMAC/UEMOA). L'entreprise propose **5 produits SaaS** complémentaires couvrant les besoins essentiels des PME, commerces et professionnels.

### 1.2 Objectif du site web

Le site web vitrine a pour mission de :

- ✅ Présenter clairement les **5 SaaS** et leurs cas d'usage
- ✅ **Convertir** les visiteurs en utilisateurs (essai gratuit / démo)
- ✅ Établir la **crédibilité** de la marque Weza
- ✅ Servir de **point d'entrée unique** vers chaque produit
- ✅ Générer des **leads B2B qualifiés**

### 1.3 Périmètre

| Élément | Inclus |
|---|---|
| Site vitrine multi-pages | ✅ |
| Page produit par SaaS | ✅ |
| Tarification dynamique | ✅ |
| Formulaire de contact & démo | ✅ |
| Blog (phase 2) | ⏳ |
| Application SaaS elle-même | ❌ (projet séparé) |
| Espace client / dashboard | ❌ (projet séparé) |

---

## 2. Identité de la startup

### 2.1 Branding

| Élément | Valeur |
|---|---|
| **Nom** | Weza |
| **Tagline FR** | Le pouvoir des entreprises africaines |
| **Tagline EN** | Empowering African businesses |
| **Signification** | "Pouvoir / Rendre capable" en swahili |
| **Domaine suggéré** | weza.africa / weza.cm / wezatech.com |

### 2.2 Mission

> Digitaliser et structurer les PME africaines avec des outils simples, locaux et accessibles.

### 2.3 Valeurs

- 🌍 **Ancrage local** : pensé pour l'Afrique, par des Africains
- 💡 **Simplicité** : outils intuitifs, accessibles même sans formation tech
- 🔒 **Fiabilité** : fonctionne offline, disponible 24/7
- 💰 **Accessibilité** : tarifs adaptés au pouvoir d'achat local

---

## 3. Cibles & personas

### 3.1 Cibles principales

| Cible | Profil | SaaS prioritaire |
|---|---|---|
| **Commerçants** | Boutique, pharmacie, quincaillerie | POS + Mobile Money |
| **Restaurateurs** | Restaurants, snacks, fast-foods | POS + Logistique |
| **PME** | 5 à 50 employés | Facturation, RH & Paie |
| **Cliniques privées** | Médecins, dentistes, cabinets | Santé |
| **E-commerçants** | Boutiques en ligne | Logistique |

### 3.2 Persona 1 — Jean, gérant de pharmacie

- 38 ans, Douala
- Gère 2 pharmacies, 6 employés
- **Frustrations** : suit son stock dans un cahier, oublie les dettes clients
- **Besoin** : un outil simple, qui marche même sans internet, avec MTN/Orange Money

### 3.3 Persona 2 — Aïcha, fondatrice d'une PME

- 32 ans, Yaoundé
- 15 employés, fait sa compta sur Excel
- **Frustrations** : ne comprend rien à OHADA, paie sans cesse un comptable externe
- **Besoin** : une solution automatique, conforme aux normes, abordable

### 3.4 Persona 3 — Dr Mbarga, médecin généraliste

- 45 ans, clinique privée à Bafoussam
- 3 médecins, gestion papier
- **Frustrations** : doubles RDV, dossiers patients perdus
- **Besoin** : prise de RDV en ligne + notifications WhatsApp

---

## 4. Architecture du site

### 4.1 Arborescence

```
weza.africa/
├── /                          → Page d'accueil
├── /produits
│   ├── /caisse                → POS + Mobile Money
│   ├── /facturation           → Facturation OHADA
│   ├── /logistique            → Logistique & Livraison
│   ├── /sante                 → Santé & Cliniques
│   └── /rh-paie               → RH & Paie
├── /tarifs                    → Grille tarifaire complète
├── /a-propos                  → Notre histoire, équipe, mission
├── /contact                   → Formulaire + infos
├── /demo                      → Demande de démo
├── /blog                      → (Phase 2)
├── /ressources                → Guides, cas clients (Phase 2)
├── /mentions-legales
├── /politique-confidentialite
└── /cgu
```

### 4.2 Navigation principale

```
[Logo Weza]   Produits ▼   Tarifs   À propos   Blog   [Connexion]   [Essai gratuit]
```

**Menu déroulant Produits** :
- 🛒 Caisse & Mobile Money
- 🧾 Facturation OHADA
- 🚚 Logistique & Livraison
- 🏥 Santé & Cliniques
- 👥 RH & Paie
- → Voir tous les produits

### 4.3 Footer

| Colonne 1 | Colonne 2 | Colonne 3 | Colonne 4 |
|---|---|---|---|
| **Produits** | **Ressources** | **Entreprise** | **Légal** |
| Caisse | Blog | À propos | CGU |
| Facturation | Guides | Carrières | Confidentialité |
| Logistique | Cas clients | Presse | Mentions légales |
| Santé | Support | Contact | RGPD |
| RH & Paie | API docs | Partenaires | Cookies |

---

## 5. Présentation des produits SaaS

### 🛒 5.1 — Weza Caisse (POS + Mobile Money)

**Slogan** : *La caisse intelligente pour les commerces africains.*

#### Description
Système de caisse digital conçu pour les commerces locaux : boutiques, restaurants, pharmacies, quincailleries, supermarchés.

#### Fonctionnalités clés
- 🛍️ Gestion des ventes en temps réel
- 📦 Suivi de stock & inventaire simplifié
- 📊 Historique complet des transactions
- 👥 Gestion clients & suivi des dettes (cahier digital)
- 💸 Paiement MTN Mobile Money & Orange Money intégré
- 📴 Mode **offline** complet (synchronisation auto)
- 🧾 Tickets de caisse imprimables ou WhatsApp
- 📱 Compatible tablette, smartphone, PC

#### Cible
Boutiques (1-50 employés), pharmacies, restaurants, supermarchés.

#### Concurrents internationaux
Square, SumUp, Shopify POS — mais aucun n'intègre nativement le mobile money africain.

---

### 🧾 5.2 — Weza Compta (Facturation OHADA)

**Slogan** : *Votre comptabilité, conforme et automatique.*

#### Description
Plateforme de facturation et comptabilité conforme aux **normes OHADA** et à la fiscalité des pays CEMAC/UEMOA.

#### Fonctionnalités clés
- 📄 Création automatique de factures professionnelles
- 🏛️ Gestion TVA & fiscalité locale (Cameroun, Côte d'Ivoire, Sénégal, etc.)
- 💳 Suivi des paiements clients (rappels automatiques)
- 📥 Gestion des dépenses et revenus
- 📤 Export comptable (PDF, Excel)
- 📱 Interface mobile-friendly
- 🔁 Récurrence de factures (abonnements)
- 📊 Tableaux de bord financiers

#### Cible
PME (5-100 employés), freelances, cabinets, consultants.

#### Concurrents internationaux
Pennylane, QuickBooks, Sage — mais non conformes OHADA.

---

### 🚚 5.3 — Weza Livraison (Logistique intelligente)

**Slogan** : *Vos livraisons, sous contrôle.*

#### Description
Plateforme de gestion de livraison adaptée au contexte africain (zemidjan, motos-taxis, e-commerce local).

#### Fonctionnalités clés
- 🏍️ Gestion des livreurs (motos, vélos, voitures)
- 🤖 Assignation automatique selon la zone
- 📍 Suivi GPS temps réel des colis
- 💬 Notifications WhatsApp / SMS automatiques
- 🗺️ Optimisation des trajets et tournées
- 📊 Tableau de bord opérationnel
- 💰 Gestion paiement à la livraison (cash + mobile money)
- ⭐ Notation des livreurs

#### Cible
E-commerçants, restaurants avec livraison, sociétés de coursiers, marketplaces.

#### Concurrents internationaux
Shippr, Bringg, Uber Freight — mais inadaptés au marché informel africain.

---

### 🏥 5.4 — Weza Santé (Cliniques & Rendez-vous)

**Slogan** : *Digitalisez votre cabinet en quelques clics.*

#### Description
Solution complète pour digitaliser les cliniques privées, cabinets médicaux et structures de santé.

#### Fonctionnalités clés
- 📅 Prise de rendez-vous en ligne ou WhatsApp
- 🗂️ Gestion patients & dossiers médicaux électroniques
- 📋 Historique des consultations & prescriptions
- 💬 Notifications SMS / WhatsApp (rappels RDV)
- 👨‍⚕️ Gestion du planning des médecins
- 💉 Gestion des actes médicaux et facturation
- 🔐 Confidentialité renforcée (RGPD-like)
- 📊 Statistiques médicales

#### Cible
Cliniques privées, cabinets médicaux, dentistes, kinés, laboratoires.

#### Concurrent international
Doctolib — mais inexistant en Afrique francophone.

---

### 👥 5.5 — Weza RH (Personnel & Paie)

**Slogan** : *Gérez vos équipes, payez en un clic.*

#### Description
Outil de gestion du personnel et de la paie adapté aux PME africaines.

#### Fonctionnalités clés
- 👤 Gestion complète des employés
- 💰 Calcul automatique de la paie (CNPS, IRPP, etc.)
- 💸 Paiement via mobile money ou virement bancaire
- 🏖️ Gestion des absences, congés et permissions
- 📄 Génération de contrats de travail conformes
- 📊 Bulletins de paie automatiques (PDF)
- ⏰ Pointage et présence
- 📈 Rapports RH

#### Cible
PME (5-200 employés), agences, entreprises en croissance.

#### Concurrents internationaux
PayFit, Factorial — mais non adaptés aux codes du travail africains.

---

## 6. Grille tarifaire

### 6.1 Modèle global

- 🎁 **Essai gratuit de 14 jours** sans carte bancaire
- 💳 **Paiement mensuel ou annuel** (-20% sur annuel)
- 💰 Prix affichés en **FCFA** (et équivalents USD/EUR)
- 🔁 Sans engagement, résiliation à tout moment
- 📞 Pricing **custom** pour grandes entreprises

### 6.2 Plans par SaaS

#### 🛒 Weza Caisse

| Plan | Prix mensuel | Idéal pour |
|---|---|---|
| **Starter** | **9 900 FCFA** (~15$) | 1 caisse, 1 utilisateur, 500 ventes/mois |
| **Pro** | **24 900 FCFA** (~40$) | 3 caisses, 5 utilisateurs, mobile money, offline |
| **Business** | **49 900 FCFA** (~80$) | Caisses illimitées, multi-magasins, analytics |
| **Enterprise** | Sur devis | Multi-pays, intégrations sur-mesure |

#### 🧾 Weza Compta

| Plan | Prix mensuel | Idéal pour |
|---|---|---|
| **Starter** | **7 900 FCFA** (~13$) | 50 factures/mois, 1 utilisateur |
| **Pro** | **19 900 FCFA** (~32$) | Factures illimitées, TVA, OHADA, 5 utilisateurs |
| **Business** | **39 900 FCFA** (~65$) | Multi-sociétés, comptabilité avancée |
| **Enterprise** | Sur devis | Cabinets d'expertise, gros volumes |

#### 🚚 Weza Livraison

| Plan | Prix mensuel | Idéal pour |
|---|---|---|
| **Starter** | **14 900 FCFA** (~24$) | 100 livraisons/mois, 5 livreurs |
| **Pro** | **34 900 FCFA** (~57$) | 500 livraisons, GPS, optimisation, 20 livreurs |
| **Business** | **69 900 FCFA** (~113$) | Livraisons illimitées, multi-entrepôts |
| **Enterprise** | Sur devis | Marketplaces, intégrations API |

#### 🏥 Weza Santé

| Plan | Prix mensuel | Idéal pour |
|---|---|---|
| **Starter** | **12 900 FCFA** (~21$) | 1 praticien, 200 RDV/mois |
| **Pro** | **29 900 FCFA** (~49$) | 5 praticiens, dossiers patients, WhatsApp |
| **Business** | **59 900 FCFA** (~97$) | Cliniques multi-praticiens |
| **Enterprise** | Sur devis | Hôpitaux, réseaux de cliniques |

#### 👥 Weza RH

| Plan | Prix mensuel | Idéal pour |
|---|---|---|
| **Starter** | **9 900 FCFA** (~15$) | Jusqu'à 10 employés |
| **Pro** | **24 900 FCFA** (~40$) | Jusqu'à 50 employés, paie auto, CNPS |
| **Business** | **49 900 FCFA** (~80$) | Jusqu'à 200 employés, multi-sites |
| **Enterprise** | Sur devis | +200 employés |

### 6.3 Pack Suite Complète

> **Weza All-in-One** : tous les SaaS, un seul abonnement.

| Plan | Prix mensuel | Économie |
|---|---|---|
| **Suite Pro** | **99 900 FCFA** (~165$) | -35% vs. plans séparés |
| **Suite Business** | **199 900 FCFA** (~325$) | -40% vs. plans séparés |

---

## 7. Stack technique

### 7.1 Frontend

| Technologie | Rôle | Version |
|---|---|---|
| **Next.js** | Framework React (App Router) | 14+ |
| **TypeScript** | Typage statique | 5+ |
| **Tailwind CSS** | Styling utility-first | 3.4+ |
| **shadcn/ui** | Composants UI | Latest |
| **Framer Motion** | Animations | Latest |
| **Lucide React** | Icônes | Latest |
| **next-intl** | Internationalisation | Latest |
| **React Hook Form** | Formulaires | Latest |
| **Zod** | Validation | Latest |

### 7.2 Backend & services

| Service | Rôle |
|---|---|
| **Sanity / Strapi** | CMS pour blog & contenu |
| **Resend / SendGrid** | Emails transactionnels |
| **Stripe / FlutterWave** | Paiement (phase 2) |
| **Supabase** | Auth + DB (phase 2) |
| **Plausible / Umami** | Analytics RGPD-friendly |

### 7.3 Hébergement & DevOps

- ☁️ **Vercel** (hébergement Next.js)
- 🌍 **Cloudflare** (CDN, DNS, anti-DDoS)
- 📦 **GitHub** (versionning, CI/CD)
- 🔄 **GitHub Actions** (déploiement automatique)

### 7.4 Outils de dev

- 🎨 **Figma** (maquettes)
- 📝 **Notion** (documentation)
- 💬 **Slack / Discord** (communication)
- 🐛 **Sentry** (monitoring d'erreurs)

---

## 8. Design system

### 8.1 Couleurs

```css
/* Couleurs principales */
--weza-primary: #FF6B35;        /* Orange chaleureux — africain & énergique */
--weza-primary-dark: #E85826;
--weza-primary-light: #FFB088;

/* Couleurs secondaires */
--weza-secondary: #1A535C;      /* Vert profond — confiance & stabilité */
--weza-accent: #FFD23F;         /* Jaune solaire — optimisme */

/* Neutres */
--weza-dark: #0F172A;
--weza-gray-900: #1E293B;
--weza-gray-500: #64748B;
--weza-gray-100: #F1F5F9;
--weza-white: #FFFFFF;

/* États */
--weza-success: #10B981;
--weza-warning: #F59E0B;
--weza-error: #EF4444;
```

### 8.2 Typographie

| Usage | Police | Poids |
|---|---|---|
| **Display / Titres** | `Cabinet Grotesk` ou `Satoshi` | 700-900 |
| **Body / Texte** | `Inter` ou `Plus Jakarta Sans` | 400-600 |
| **Mono / Code** | `JetBrains Mono` | 400-500 |

#### Échelle typographique

```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */
--text-7xl: 4.5rem;     /* 72px */
```

### 8.3 Espacement

Utiliser l'échelle Tailwind par défaut (4px base) : `0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

### 8.4 Bordures & ombres

```css
--radius-sm: 0.5rem;
--radius-md: 0.75rem;
--radius-lg: 1rem;
--radius-xl: 1.5rem;
--radius-2xl: 2rem;

--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 12px rgba(0,0,0,0.08);
--shadow-lg: 0 12px 32px rgba(0,0,0,0.12);
--shadow-glow: 0 0 40px rgba(255,107,53,0.3);
```

### 8.5 Style général

- **Direction** : moderne, africain-tech, chaleureux mais pro
- **Inspirations** : Stripe (rigueur), Linear (modernité), Vercel (typographie)
- **À éviter** : clichés "ethnique" (motifs wax surchargés), violet/dégradés génériques

---

## 9. Spécifications par page

### 9.1 Page d'accueil (`/`)

| Section | Contenu |
|---|---|
| **1. Hero** | Titre fort, sous-titre, 2 CTA (Essai gratuit / Voir démo), mockup |
| **2. Logos clients** | Bande de logos de PME utilisatrices (social proof) |
| **3. Présentation suite** | 5 cards des SaaS avec icône, titre, description, lien |
| **4. Pourquoi Weza** | 4 piliers : Local, Simple, Offline, Abordable |
| **5. Témoignages** | 3 carrousel de témoignages clients (vidéo + texte) |
| **6. Statistiques** | Compteurs animés (1000+ entreprises, 5 pays, etc.) |
| **7. Tarifs aperçu** | Lien vers /tarifs avec plan le plus populaire |
| **8. FAQ** | 6-8 questions fréquentes (accordéon) |
| **9. CTA final** | "Prêt à digitaliser votre business ?" + formulaire |
| **10. Footer** | Liens, réseaux sociaux, newsletter |

### 9.2 Page produit type (ex: `/produits/caisse`)

| Section | Contenu |
|---|---|
| **1. Hero produit** | Titre produit, slogan, mockup interactif, CTA |
| **2. Problème → Solution** | "Vous gérez encore au cahier ? → Voici la solution" |
| **3. Fonctionnalités** | 6-8 features avec icône + description + screenshot |
| **4. Cas d'usage** | Pour qui ? (3 personas illustrés) |
| **5. Vidéo démo** | Embed YouTube/Vimeo, 60-90 secondes |
| **6. Comparatif** | Tableau Weza vs concurrents internationaux |
| **7. Témoignages** | Spécifiques au produit |
| **8. Tarifs** | Plans du produit + lien vers grille complète |
| **9. FAQ produit** | Questions spécifiques |
| **10. CTA** | Essai gratuit / Demander une démo |

### 9.3 Page tarifs (`/tarifs`)

- Toggle Mensuel / Annuel (-20%)
- Sélecteur par produit (onglets ou dropdown)
- Tableau comparatif des plans (Starter / Pro / Business / Enterprise)
- Section "Pack Suite All-in-One"
- Calculateur ROI (optionnel)
- FAQ sur la tarification

### 9.4 Page contact (`/contact`)

- Formulaire (Nom, Email, Téléphone, Entreprise, Produit d'intérêt, Message)
- Coordonnées (adresse Douala/Yaoundé, email, téléphone, WhatsApp)
- Carte (Google Maps)
- Liens réseaux sociaux
- Horaires de support

### 9.5 Page démo (`/demo`)

- Formulaire qualifié : produit, taille entreprise, créneau préféré
- Bouton "Réserver" → calendrier Calendly intégré
- Témoignages rassurants

### 9.6 Page À propos (`/a-propos`)

- Notre histoire (storytelling)
- Mission, vision, valeurs
- Équipe (photos + bio)
- Investisseurs / partenaires
- Carrières (lien)

---

## 10. Composants réutilisables

### 10.1 Liste des composants

```
components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Modal.tsx
│   ├── Tabs.tsx
│   ├── Accordion.tsx
│   ├── Badge.tsx
│   ├── Toggle.tsx
│   └── Tooltip.tsx
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── MobileMenu.tsx
│   └── Container.tsx
├── sections/
│   ├── Hero.tsx
│   ├── FeatureGrid.tsx
│   ├── PricingTable.tsx
│   ├── TestimonialCarousel.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   ├── LogoCloud.tsx
│   └── StatsCounter.tsx
├── forms/
│   ├── ContactForm.tsx
│   ├── DemoForm.tsx
│   └── NewsletterForm.tsx
└── product/
    ├── ProductCard.tsx
    ├── PricingCard.tsx
    └── ComparisonTable.tsx
```

### 10.2 Pattern de composant

```tsx
// Exemple : ProductCard.tsx
interface ProductCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  color: 'orange' | 'green' | 'blue' | 'red' | 'purple'
}

export function ProductCard({ icon: Icon, title, description, href, color }: ProductCardProps) {
  return (
    <Link href={href} className="group relative ...">
      {/* contenu */}
    </Link>
  )
}
```

---

## 11. SEO & performance

### 11.1 SEO technique

- ✅ Métadonnées dynamiques par page (Next.js Metadata API)
- ✅ Sitemap XML automatique (`/sitemap.xml`)
- ✅ Robots.txt configuré
- ✅ Open Graph + Twitter Cards pour chaque page
- ✅ Structured Data (JSON-LD) : Organization, Product, FAQ
- ✅ URLs propres et SEO-friendly
- ✅ Balises canoniques

### 11.2 Performance (cibles Lighthouse)

| Métrique | Cible |
|---|---|
| **Performance** | ≥ 90 |
| **Accessibilité** | ≥ 95 |
| **Best Practices** | ≥ 95 |
| **SEO** | 100 |
| **LCP** | < 2.5s |
| **FID** | < 100ms |
| **CLS** | < 0.1 |

### 11.3 Optimisations

- 🖼️ Images optimisées (Next.js Image, WebP/AVIF)
- 📦 Code splitting automatique
- ⚡ Lazy loading des composants lourds
- 🔤 Polices auto-hébergées (next/font)
- 🗜️ Compression Brotli (Vercel)
- 💾 Cache agressif des assets statiques

---

## 12. Internationalisation

### 12.1 Langues supportées

- 🇫🇷 **Français** (par défaut)
- 🇬🇧 **Anglais** (phase 2)

### 12.2 Implémentation

- Librairie : `next-intl`
- Structure : `/fr/...` et `/en/...`
- Sélecteur de langue dans le header
- Détection auto selon les préférences navigateur
- Fichiers de traduction : `messages/fr.json`, `messages/en.json`

---

## 13. Sécurité & conformité

### 13.1 Sécurité

- 🔒 HTTPS obligatoire (Let's Encrypt via Vercel)
- 🛡️ Headers de sécurité (CSP, HSTS, X-Frame-Options)
- 🤖 Protection reCAPTCHA v3 sur les formulaires
- 🚫 Anti-spam Honeypot
- 🔐 Variables sensibles dans `.env`

### 13.2 Conformité

- 📜 Mentions légales conformes (Cameroun + UE)
- 🍪 Bannière cookies (consentement)
- 📋 Politique de confidentialité (RGPD-like)
- 📃 CGU complètes
- ♿ Accessibilité WCAG 2.1 AA

---

## 14. Roadmap de développement

### 📅 Phase 1 — MVP (4-6 semaines)

| Semaine | Tâches |
|---|---|
| **S1** | Setup Next.js, Tailwind, design system, composants UI |
| **S2** | Page d'accueil + Header/Footer + Navigation |
| **S3** | 5 pages produits (template + contenu) |
| **S4** | Page tarifs + Page contact + Page À propos |
| **S5** | SEO, optimisations, responsive, tests |
| **S6** | Déploiement Vercel, DNS, recettes, ajustements |

### 📅 Phase 2 — Évolutions (post-launch)

- Blog avec CMS (Sanity)
- Pages cas clients
- Espace partenaires
- Centre d'aide / docs
- Intégration paiement direct
- Multi-langue (EN)
- Calculateur ROI interactif

---

## 15. Livrables

### 15.1 Livrables techniques

- ✅ Code source complet sur GitHub (privé)
- ✅ Site déployé sur Vercel (production + staging)
- ✅ Documentation technique (README, CONTRIBUTING)
- ✅ Guide d'édition de contenu
- ✅ Comptes admin (Vercel, Cloudflare, CMS)

### 15.2 Livrables design

- ✅ Maquettes Figma (mobile + desktop)
- ✅ Design system documenté
- ✅ Charte graphique (logo, couleurs, typo)
- ✅ Assets (icônes, illustrations, mockups)

### 15.3 Livrables marketing

- ✅ Textes finaux (FR) toutes pages
- ✅ Photos / illustrations
- ✅ Vidéos de démo (1 par produit)
- ✅ Stratégie SEO (mots-clés ciblés)

---

## 📌 Annexes

### A. Mots-clés SEO ciblés

**Globaux** : SaaS Afrique, logiciel PME Cameroun, digitalisation entreprise Afrique

**Par produit** :
- Caisse : "logiciel caisse mobile money", "POS Cameroun", "caisse offline"
- Compta : "facturation OHADA", "logiciel comptabilité Cameroun", "facture TVA"
- Logistique : "logiciel livraison moto", "tracking colis WhatsApp"
- Santé : "logiciel clinique Cameroun", "prise de rendez-vous médical"
- RH : "logiciel paie Afrique", "CNPS automatique"

### B. Inspirations design

- [Stripe.com](https://stripe.com) — rigueur, animations
- [Linear.app](https://linear.app) — typographie, dégradés
- [Vercel.com](https://vercel.com) — minimalisme tech
- [Notion.so](https://notion.so) — chaleur, illustrations
- [Wave.com](https://wave.com) — fintech africaine

### C. Checklist de lancement

- [ ] Toutes les pages fonctionnelles
- [ ] Tests cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Tests mobile (iOS, Android)
- [ ] Lighthouse score ≥ 90 partout
- [ ] Formulaires testés (envoi email OK)
- [ ] Analytics configuré
- [ ] Sitemap soumis à Google Search Console
- [ ] DNS et SSL OK
- [ ] Mentions légales en place
- [ ] Bannière cookies fonctionnelle

---

> **Document rédigé pour le projet Weza**
> *Le pouvoir des entreprises africaines.*

