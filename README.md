# Weza Monorepo

Monorepo de la suite SaaS Weza — site vitrine + 5 apps SaaS.

## Stack

- **Monorepo** : pnpm workspaces + Turborepo
- **Apps** : Next.js 14 (App Router) + TypeScript + Tailwind
- **UI partagée** : `@weza/ui` + design tokens
- **Contrat API** : `@weza/types` + `@weza/api-client` (mock pour le moment)

## Structure

```
weza/
├── apps/
│   ├── website/          → Site vitrine (weza.africa) — port 3000
│   ├── caisse/           → POS + Mobile Money — port 3001
│   ├── compta/           → (à venir) Facturation OHADA
│   ├── livraison/        → (à venir) Logistique
│   ├── sante/            → (à venir) RDV cliniques
│   └── rh-paie/          → (à venir) RH & Paie
├── packages/
│   ├── ui/               → Composants partagés (Button, Card, Input, Badge…)
│   ├── design-tokens/    → Couleurs Weza, fonts, preset Tailwind
│   ├── types/            → Types métier partagés (contrat API)
│   ├── api-client/       → Interface + mock (à brancher sur le vrai back)
│   └── tsconfig/         → Configs TypeScript partagées
└── cahier-des-charges-weza.md
```

## Commandes

```bash
# Installer
pnpm install

# Tout démarrer en parallèle
pnpm dev

# Une seule app
pnpm dev:website        # http://localhost:3000
pnpm dev:caisse         # http://localhost:3001

# Build
pnpm build
pnpm typecheck
```

## Brancher le vrai backend

L'app Caisse utilise actuellement `mockCaisseApi` depuis `@weza/api-client/mock`.
Le contrat à respecter côté serveur est défini dans
[`packages/api-client/caisse.ts`](packages/api-client/caisse.ts) et les types
métier dans [`packages/types/caisse.ts`](packages/types/caisse.ts).

Pour brancher l'API réelle : créer une implémentation de `CaisseApi` dans
`apps/caisse/lib/api.ts` qui appelle votre back HTTP (fetch / tRPC / etc.) et
remplacer `mockCaisseApi` par cette implémentation.
