# 🔐 Rapport — Système d'authentification Weza Caisse

## 1. Philosophie générale

Dans un commerce camerounais, **un seul système de login ne peut pas servir tout le monde**. Le propriétaire qui consulte les rapports depuis son bureau et la caissière qui change de poste 5 fois par jour ont des besoins opposés. J'ai donc conçu **deux flux de connexion** qui coexistent sur la même page `/login`.

---

## 2. Les deux flux de connexion

### A. Email + mot de passe (sécurité forte)

**Pour qui ?** Owner, Admin, Manager

**Quand ?**
- Connexion depuis un ordinateur ou tablette personnelle
- Consultation des rapports en fin de journée
- Configuration de la boutique, des paiements, de l'équipe

**Pourquoi un mot de passe ?**
- 8+ caractères = des milliards de combinaisons
- Difficile à deviner ou à brute-forcer
- Adapté quand on accède à des **données financières** ou des **paramètres sensibles**

### B. PIN à 4 chiffres (rapidité opérationnelle)

**Pour qui ?** Cashier, Employee, Manager

**Quand ?**
- Ouverture de la boutique le matin
- Changement de caissier (équipe matin → équipe soir)
- Reprise après pause déjeuner
- Verrouillage rapide pour quitter la caisse quelques minutes

**Pourquoi un PIN ?**
- ⚡ **2 secondes** pour se connecter vs 30 secondes avec email
- 👀 **Discret** devant les clients (pas d'email pro affiché)
- 🔄 **Changement d'utilisateur fluide** : galerie d'avatars cliquables → 4 chiffres → connecté
- 📱 **Familier** : tout le monde sait taper un PIN (carte SIM, MoMo, carte bancaire)

---

## 3. Recommandation de sécurité à appliquer

**Les administrateurs et propriétaires ne devraient PAS pouvoir se connecter par PIN.**

Raisons :
- Un PIN à 4 chiffres = seulement **10 000 combinaisons** → vulnérable au brute-force
- Si un téléphone est volé avec la session ouverte, un voleur pourrait essayer "1234", "0000", "1111" et accéder aux comptes bancaires de la boutique
- Dans les vrais logiciels (Square, Lightspeed, Sumup), le PIN est **réservé aux caissiers**

**Concrètement il faudrait :**
1. Filtrer la liste affichée sur l'écran de sélection PIN pour n'inclure que `cashier`, `employee` et `manager`
2. Refuser la connexion PIN côté API si l'utilisateur est `owner` ou `admin`, avec un message clair : *"Les administrateurs doivent se connecter par email"*

---

## 4. Les profils (rôles) que j'ai choisis

J'ai défini **5 rôles** dans `packages/types/common.ts`, inspirés des standards SaaS B2B :

| Rôle | Nom français | Cible | Connexion | Accès |
|---|---|---|---|---|
| **`owner`** | Propriétaire | Patron du commerce, fondateur | Email uniquement | **Tout** : POS, ventes, produits, stock, clients, dettes, rapports, paramètres (boutique + paiements + équipe) |
| **`admin`** | Administrateur | Co-fondateur, associé, comptable de confiance | Email uniquement | **Tout** comme owner |
| **`manager`** | Manager | Responsable de boutique, gérant | Email **ou** PIN | POS, ventes, **remboursements**, produits, stock, clients, dettes, **rapports** — **sauf paramètres** |
| **`cashier`** | Caissier | Personnel en boutique, devant la caisse | PIN (recommandé) | POS, ventes (consultation), produits (lecture), clients, encaissement dettes — **pas de remboursement, pas de rapports, pas de modification produits** |
| **`employee`** | Employé | Aide, stagiaire, vendeur occasionnel | PIN | POS uniquement, produits/clients en lecture seule |

### Matrice détaillée des 14 permissions

| Permission | Owner | Admin | Manager | Cashier | Employee |
|---|:-:|:-:|:-:|:-:|:-:|
| `dashboard:view` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `pos:use` (utiliser caisse) | ✅ | ✅ | ✅ | ✅ | ✅ |
| `sales:view` (historique) | ✅ | ✅ | ✅ | ✅ | ❌ |
| `sales:refund` (rembourser) | ✅ | ✅ | ✅ | ❌ | ❌ |
| `products:read` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `products:write` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `stock:write` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `customers:read` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `customers:write` | ✅ | ✅ | ✅ | ✅ | ❌ |
| `debt:collect` (encaisser dette) | ✅ | ✅ | ✅ | ✅ | ❌ |
| `reports:view` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `settings:business` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `settings:payments` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `settings:users` (équipe) | ✅ | ✅ | ❌ | ❌ | ❌ |

### Logique métier derrière le choix

- **Pourquoi distinguer `owner` et `admin` s'ils ont les mêmes droits ?** Pour permettre plus tard de donner à un comptable externe (`admin`) tous les droits **sauf** un audit log "qui a fait quoi", réservé à `owner`. C'est une marge de manœuvre.
- **Pourquoi `manager` ne voit pas les paramètres ?** Le gérant gère la boutique au quotidien mais ne devrait pas pouvoir changer les clés API MoMo ou ajouter un admin → on protège le patron contre les manipulations internes.
- **Pourquoi `cashier` peut encaisser des dettes mais pas rembourser ?** Encaisser, c'est faire rentrer de l'argent (zéro risque pour la boutique). Rembourser, c'est sortir de l'argent → risque de fraude → réservé au manager.
- **Pourquoi `employee` est si limité ?** Stagiaire ou personnel temporaire : il vend mais ne voit pas combien la boutique a fait aujourd'hui, ne peut pas modifier les prix.

---

## 5. Flux visuel actuel

```
                    ┌─────────────────────────────┐
                    │      /login                 │
                    │  ┌───────────────────────┐  │
                    │  │  Email + mot de passe │ ← owner / admin / manager
                    │  │  [se connecter]       │  │
                    │  └───────────────────────┘  │
                    │  ───── ou ─────             │
                    │  ┌───────────────────────┐  │
                    │  │  Connexion par PIN    │ ← cashier / employee / manager
                    │  └─────────┬─────────────┘  │
                    └────────────┼────────────────┘
                                 ↓
                    ┌─────────────────────────┐
                    │   Qui êtes-vous ?       │
                    │   [Marie] [Paul] [Jean] │ ← avatars cliquables
                    └────────────┬────────────┘
                                 ↓
                    ┌─────────────────────────┐
                    │   Bonjour Marie         │
                    │   • • • •               │
                    │   [1][2][3]             │
                    │   [4][5][6]             │
                    │   [7][8][9]             │
                    │   [ ][0][⌫]             │
                    └─────────────────────────┘
                                 ↓
                    Redirige vers la page d'accueil
                    appropriée selon le rôle :
                    - owner/admin/manager → /  (dashboard)
                    - cashier/employee → /caisse (POS)
```

---

## 6. Page Profil — ce que voit l'utilisateur connecté

Sur `/profile`, chaque utilisateur voit :
- 👤 **Son avatar, nom, email, rôle**
- 🕐 **Date et heure de la connexion en cours**
- ✏️ **Modifier son nom et son PIN** (inline, sans quitter la page)
- 🛡️ **Liste détaillée de TOUTES ses permissions** — pour qu'il comprenne ce qu'il peut faire et ne pas faire
- 🚪 **Bouton "Se déconnecter"**

---

## 7. Comptes de démo

Identifiants pré-créés dans les fixtures :

| Nom | Email | Rôle | PIN |
|---|---|---|---|
| Jean Mballa | `jean@pharmacie-akwa.cm` | **Owner** | 1234 |
| Marie Tchouante | `marie@pharmacie-akwa.cm` | **Cashier** | 5678 |
| Paul Ngo | `paul@pharmacie-akwa.cm` | **Manager** | 9012 |

En mode démo : n'importe quel mot de passe ≥ 4 caractères marche pour le login email.

---

*Document généré pour Weza Caisse — version frontend de démonstration.*
