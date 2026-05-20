# Weza Caisse — Spécifications Frontend
> Next.js 14 · TypeScript · Tailwind CSS · React Query · Dexie.js · Workbox

---

## Sommaire

1. [Stack technique](#1-stack-technique)
2. [Structure du projet](#2-structure-du-projet)
3. [Design system](#3-design-system)
4. [Layout & navigation](#4-layout--navigation)
5. [Page : Authentification](#5-page--authentification)
6. [Page : Dashboard](#6-page--dashboard)
7. [Page : Interface de caisse](#7-page--interface-de-caisse)
8. [Page : Catalogue produits](#8-page--catalogue-produits)
9. [Page : Gestion du stock](#9-page--gestion-du-stock)
10. [Page : Clients & dettes](#10-page--clients--dettes)
11. [Page : Rapports](#11-page--rapports)
12. [Page : Paramètres](#12-page--paramètres)
13. [Offline-first — couche client](#13-offline-first--couche-client)
14. [Gestion d'état — React Query](#14-gestion-détat--react-query)
15. [Composants réutilisables](#15-composants-réutilisables)
16. [Accessibilité & responsive](#16-accessibilité--responsive)
17. [Performance frontend](#17-performance-frontend)
18. [Tests frontend](#18-tests-frontend)

---

## 1. Stack technique

| Technologie | Rôle | Version |
|---|---|---|
| **Next.js 14** | Framework (App Router) | 14+ |
| **TypeScript** | Typage strict | 5+ |
| **Tailwind CSS** | Styling utility-first | 3.4+ |
| **shadcn/ui** | Composants UI de base | Latest |
| **React Query (TanStack)** | Cache + fetch + sync | 5+ |
| **Zustand** | État global UI (panier, session) | 4+ |
| **React Hook Form** | Formulaires | 7+ |
| **Zod** | Validation côté client | 3+ |
| **Dexie.js** | IndexedDB (offline) | 3+ |
| **Workbox** | Service Worker | 7+ |
| **Framer Motion** | Animations | 10+ |
| **Recharts** | Graphiques dashboard | 2+ |
| **React PDF Renderer** | Prévisualisation tickets | 3+ |
| **Lucide React** | Icônes | Latest |
| **date-fns** | Manipulation de dates | 3+ |
| **Sonner** | Toasts / notifications UI | Latest |

---

## 2. Structure du projet

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (fonts, providers)
│   ├── (auth)/
│   │   ├── layout.tsx              # Layout sans sidebar
│   │   ├── login/page.tsx          # Connexion email + password
│   │   └── pin/page.tsx            # Login PIN caisse (4 chiffres)
│   └── (app)/
│       ├── layout.tsx              # Layout principal (sidebar + header)
│       ├── page.tsx                # Dashboard KPIs
│       ├── caisse/
│       │   └── page.tsx            # Interface POS principale
│       ├── produits/
│       │   ├── page.tsx            # Liste produits
│       │   ├── nouveau/page.tsx    # Formulaire ajout
│       │   └── [id]/
│       │       ├── page.tsx        # Détail produit
│       │       └── modifier/page.tsx
│       ├── stock/
│       │   ├── page.tsx            # Mouvements de stock
│       │   ├── entree/page.tsx     # Saisie entrée stock
│       │   └── inventaire/page.tsx # Correction inventaire
│       ├── clients/
│       │   ├── page.tsx            # Liste clients + dettes
│       │   ├── nouveau/page.tsx
│       │   └── [id]/page.tsx       # Fiche client + historique
│       ├── rapports/
│       │   ├── page.tsx            # Sélecteur de rapports
│       │   ├── journalier/page.tsx
│       │   └── mensuel/page.tsx
│       └── parametres/
│           ├── page.tsx            # Infos commerce
│           ├── utilisateurs/page.tsx
│           ├── paiements/page.tsx  # Config MoMo
│           └── appareils/page.tsx  # Devices enregistrés
│
├── components/
│   ├── caisse/
│   │   ├── SaleScreen.tsx          # Écran POS principal
│   │   ├── ProductGrid.tsx         # Grille produits (avec catégories)
│   │   ├── ProductSearch.tsx       # Recherche avec autocomplete
│   │   ├── ProductCard.tsx         # Carte produit cliquable
│   │   ├── Cart.tsx                # Panier latéral
│   │   ├── CartItem.tsx            # Ligne panier (qté modifiable)
│   │   ├── CartSummary.tsx         # Total + bouton encaisser
│   │   ├── PaymentModal.tsx        # Modal de choix du paiement
│   │   ├── CashPaymentForm.tsx     # Formulaire paiement espèces
│   │   ├── MoMoPaymentFlow.tsx     # Flow MoMo avec polling
│   │   ├── MoMoPendingScreen.tsx   # Écran attente confirmation
│   │   ├── ReceiptModal.tsx        # Ticket de caisse + envoi
│   │   ├── DiscountModal.tsx       # Saisie de remise
│   │   ├── CreditPaymentForm.tsx   # Paiement à crédit
│   │   ├── CashSessionBanner.tsx   # Session de caisse ouverte
│   │   └── OfflineBanner.tsx       # Indicateur hors ligne
│   │
│   ├── products/
│   │   ├── ProductForm.tsx         # Formulaire ajout/modification
│   │   ├── ProductTable.tsx        # Tableau liste produits
│   │   ├── ProductRow.tsx
│   │   ├── CategoryBadge.tsx
│   │   ├── StockBadge.tsx          # Badge stock (vert/orange/rouge)
│   │   ├── BulkActions.tsx         # Actions en lot
│   │   └── ImportCSVModal.tsx
│   │
│   ├── customers/
│   │   ├── CustomerForm.tsx
│   │   ├── CustomerTable.tsx
│   │   ├── DebtBadge.tsx
│   │   ├── DebtHistory.tsx
│   │   ├── DebtPaymentModal.tsx    # Enregistrer un remboursement
│   │   └── ReminderModal.tsx       # Envoyer rappel WhatsApp
│   │
│   ├── reports/
│   │   ├── DashboardKPIs.tsx       # Cards KPIs
│   │   ├── SalesChart.tsx          # Graphique ventes (Recharts)
│   │   ├── PaymentMethodChart.tsx  # Donut espèces vs MoMo
│   │   ├── TopProductsChart.tsx    # Bar chart top produits
│   │   ├── DailySalesTable.tsx
│   │   └── CashierReport.tsx
│   │
│   ├── stock/
│   │   ├── StockMovementTable.tsx
│   │   ├── StockAlertList.tsx
│   │   ├── StockEntryForm.tsx
│   │   └── InventoryForm.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Modal.tsx
│       ├── Drawer.tsx              # Panneau latéral (mobile)
│       ├── DataTable.tsx           # Tableau générique paginé
│       ├── SearchInput.tsx
│       ├── StatusBadge.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSpinner.tsx
│       ├── ConfirmDialog.tsx
│       ├── CurrencyInput.tsx       # Input pour montants FCFA
│       ├── PhoneInput.tsx          # Input téléphone +237
│       └── PageHeader.tsx
│
├── hooks/
│   ├── useCart.ts                  # État et actions du panier
│   ├── useProducts.ts              # Fetch + cache produits
│   ├── useProductSearch.ts         # Recherche avec debounce
│   ├── useSale.ts                  # Créer / annuler une vente
│   ├── useMoMoPayment.ts           # Flow paiement MoMo
│   ├── useOfflineSync.ts           # Gestion sync offline
│   ├── useNetworkStatus.ts         # Détection connexion
│   ├── useCustomers.ts
│   ├── useStock.ts
│   ├── useReports.ts
│   ├── useCashSession.ts
│   └── usePermissions.ts           # Vérification des droits
│
├── stores/
│   ├── cartStore.ts                # Zustand : panier
│   ├── sessionStore.ts             # Zustand : session utilisateur
│   └── offlineStore.ts             # Zustand : état sync offline
│
├── lib/
│   ├── offline/
│   │   ├── db.ts                   # Dexie (IndexedDB)
│   │   └── sync.ts                 # Logique sync client
│   ├── api.ts                      # Client fetch typé
│   ├── formatters.ts               # FCFA, dates, téléphones
│   └── constants.ts
│
└── public/
    ├── sw.js                       # Service Worker (Workbox)
    ├── manifest.json               # PWA manifest
    └── icons/                      # Icônes PWA
```

---

## 3. Design system

### 3.1 Tokens de couleurs

```typescript
// tailwind.config.ts

const colors = {
  // Couleurs primaires Weza
  primary: {
    DEFAULT: '#FF6B35',
    50:  '#FFF3EE',
    100: '#FFE4D5',
    200: '#FFCAB0',
    300: '#FFA880',
    400: '#FF8554',
    500: '#FF6B35',
    600: '#E85118',
    700: '#C43D0C',
    800: '#9E3009',
    900: '#7A2508',
  },
  // MTN Yellow
  mtn: { DEFAULT: '#FFCC00', dark: '#E6B800' },
  // Orange Money
  orange: { DEFAULT: '#FF6600', dark: '#E55C00' },
  // Neutres
  slate: { /* tailwind defaults */ },
};
```

### 3.2 Typographie

```typescript
// tailwind.config.ts

fontFamily: {
  sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
  display: ['Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
  mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
},
fontSize: {
  'display-xl': ['3.5rem',   { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  'display-lg': ['2.25rem',  { lineHeight: '1.2', letterSpacing: '-0.02em' }],
  'display-md': ['1.875rem', { lineHeight: '1.25' }],
  'body-lg':    ['1.125rem', { lineHeight: '1.75' }],
  'body-md':    ['1rem',     { lineHeight: '1.7' }],
  'body-sm':    ['0.875rem', { lineHeight: '1.6' }],
  'label':      ['0.75rem',  { lineHeight: '1.4', letterSpacing: '0.05em' }],
},
```

### 3.3 Composant Button

```tsx
// components/ui/Button.tsx

import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:   'bg-primary text-white hover:bg-primary-600 shadow-sm',
        secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
        outline:   'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50',
        ghost:     'text-slate-600 hover:bg-slate-100',
        danger:    'bg-red-500 text-white hover:bg-red-600',
        mtn:       'bg-mtn text-slate-900 hover:bg-mtn-dark font-semibold',
        orange:    'bg-orange text-white hover:bg-orange-dark font-semibold',
      },
      size: {
        sm:   'h-8  px-3 text-sm',
        md:   'h-10 px-4 text-sm',
        lg:   'h-12 px-6 text-base',
        xl:   'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({ variant, size, loading, leftIcon, rightIcon, children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} disabled={loading || props.disabled} {...props}>
      {loading ? <LoadingSpinner size="sm" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
```

### 3.4 Composant CurrencyInput

```tsx
// components/ui/CurrencyInput.tsx

export function CurrencyInput({ value, onChange, label, ...props }: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Accepter uniquement les chiffres
    const raw = e.target.value.replace(/\D/g, '');
    onChange(raw ? Number(raw) : 0);
  };

  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          value={value ? value.toLocaleString('fr-FR') : ''}
          onChange={handleChange}
          className="w-full h-12 pl-4 pr-16 text-lg font-semibold border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          {...props}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
          FCFA
        </span>
      </div>
    </div>
  );
}
```

---

## 4. Layout & navigation

### 4.1 Layout principal

```tsx
// app/(app)/layout.tsx

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar desktop */}
      <Sidebar className="hidden lg:flex" />

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Navigation mobile (bottom tabs) */}
      <MobileNav className="lg:hidden" />
    </div>
  );
}
```

### 4.2 Sidebar

```tsx
// components/layout/Sidebar.tsx

const navItems = [
  { href: '/',          icon: LayoutDashboard, label: 'Dashboard',   permission: null },
  { href: '/caisse',    icon: ShoppingCart,    label: 'Caisse',      permission: 'sales:create' },
  { href: '/produits',  icon: Package,         label: 'Produits',    permission: 'products:read' },
  { href: '/stock',     icon: Warehouse,       label: 'Stock',       permission: 'stock:write' },
  { href: '/clients',   icon: Users,           label: 'Clients',     permission: 'customers:read' },
  { href: '/rapports',  icon: BarChart2,       label: 'Rapports',    permission: 'reports:view' },
  { href: '/parametres',icon: Settings,        label: 'Paramètres',  permission: 'settings:write' },
];

export function Sidebar({ className }: { className?: string }) {
  const { role } = useSession();
  const { pendingCount } = useOfflineStore();
  const pathname = usePathname();

  return (
    <aside className={cn('w-64 flex flex-col bg-white border-r border-slate-100', className)}>
      {/* Logo */}
      <div className="p-6 border-b border-slate-100">
        <WezaLogo />
        <p className="text-xs text-slate-400 mt-1">Caisse</p>
      </div>

      {/* Indicateur offline */}
      {pendingCount > 0 && (
        <div className="mx-4 mt-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-700 font-medium">
            {pendingCount} vente{pendingCount > 1 ? 's' : ''} en attente de sync
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems
          .filter((item) => !item.permission || hasPermission(role, item.permission))
          .map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
            />
          ))}
      </nav>

      {/* Profil utilisateur */}
      <UserMenu />
    </aside>
  );
}
```

### 4.3 Navigation mobile (bottom tabs)

```tsx
// components/layout/MobileNav.tsx

const mobileNavItems = [
  { href: '/caisse',   icon: ShoppingCart, label: 'Caisse' },
  { href: '/produits', icon: Package,      label: 'Produits' },
  { href: '/',         icon: Home,         label: 'Accueil' },
  { href: '/clients',  icon: Users,        label: 'Clients' },
  { href: '/rapports', icon: BarChart2,    label: 'Rapports' },
];

export function MobileNav({ className }: { className?: string }) {
  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100',
      'flex items-center justify-around px-2 z-50 safe-area-pb',
      className
    )}>
      {mobileNavItems.map((item) => (
        <MobileNavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
```

---

## 5. Page : Authentification

### 5.1 Login email + password

```tsx
// app/(auth)/login/page.tsx

export default function LoginPage() {
  const { handleSubmit, register, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const login = useMutation({
    mutationFn: (data: LoginSchema) => api.post('/auth/login', data),
    onSuccess: (data) => {
      sessionStore.setSession(data);
      router.push(data.user.role === 'CASHIER' ? '/caisse' : '/');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <WezaLogo size="lg" />
          <h1 className="text-2xl font-display font-bold text-slate-900 mt-4">
            Connexion à Weza Caisse
          </h1>
        </div>

        <form onSubmit={handleSubmit((d) => login.mutate(d))} className="space-y-4">
          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Mot de passe" type="password" {...register('password')} error={errors.password?.message} />

          <Button type="submit" size="lg" className="w-full" loading={login.isPending}>
            Se connecter
          </Button>
        </form>

        <div className="text-center">
          <Link href="/pin" className="text-sm text-primary hover:underline">
            Connexion rapide avec PIN (caissier)
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### 5.2 Login PIN (caissier)

```tsx
// app/(auth)/pin/page.tsx

export default function PinLoginPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [pin, setPin] = useState('');

  const { data: users } = useQuery({
    queryKey: ['cashiers'],
    queryFn: () => api.get('/auth/cashiers'), // liste des caissiers du tenant
  });

  const loginPin = useMutation({
    mutationFn: () => api.post('/auth/login/pin', { userId: selectedUser!.id, pin }),
    onSuccess: (data) => {
      sessionStore.setSession(data);
      router.push('/caisse');
    },
    onError: () => {
      setPin('');
      toast.error('PIN incorrect');
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-6">
      <WezaLogo variant="white" />

      {/* Sélection du caissier */}
      {!selectedUser ? (
        <div className="mt-8 w-full max-w-sm">
          <p className="text-white text-center mb-4">Qui êtes-vous ?</p>
          <div className="grid grid-cols-2 gap-3">
            {users?.map((user: User) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="flex flex-col items-center p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mb-2">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="text-white text-sm font-medium">{user.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Clavier PIN */
        <div className="mt-8 w-full max-w-xs">
          <p className="text-white text-center mb-2">Bonjour, {selectedUser.name}</p>
          <p className="text-slate-400 text-center text-sm mb-6">Saisissez votre PIN</p>

          {/* Indicateur de saisie */}
          <div className="flex justify-center gap-4 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  'w-4 h-4 rounded-full border-2 border-slate-500 transition-all',
                  pin.length > i && 'bg-primary border-primary'
                )}
              />
            ))}
          </div>

          {/* Clavier numérique */}
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((key, i) => (
              <button
                key={i}
                onClick={() => {
                  if (key === '⌫') {
                    setPin((p) => p.slice(0, -1));
                  } else if (key !== '' && pin.length < 4) {
                    const newPin = pin + String(key);
                    setPin(newPin);
                    if (newPin.length === 4) loginPin.mutate();
                  }
                }}
                className={cn(
                  'h-16 rounded-2xl text-2xl font-bold text-white transition-all active:scale-95',
                  key === '' ? 'pointer-events-none' : 'bg-slate-700 hover:bg-slate-600'
                )}
              >
                {key}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSelectedUser(null)}
            className="mt-6 w-full text-slate-400 text-sm hover:text-white transition-colors"
          >
            ← Changer d'utilisateur
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## 6. Page : Dashboard

```tsx
// app/(app)/page.tsx

export default function DashboardPage() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard', today],
    queryFn: () => api.get(`/reports/dashboard?date=${today}`),
    refetchInterval: 60_000, // Refresh toutes les 60s
    staleTime: 30_000,
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <PageHeader title="Dashboard" subtitle={`Aujourd'hui — ${format(new Date(), 'EEEE d MMMM', { locale: fr })}`} />

      {/* KPIs principaux */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Chiffre d'affaires"
          value={formatCurrency(stats?.totalRevenue ?? 0)}
          delta={stats?.revenueDeltaPercent}
          icon={<TrendingUp className="text-primary" />}
          loading={isLoading}
        />
        <KPICard
          label="Transactions"
          value={stats?.saleCount ?? 0}
          delta={stats?.saleCountDelta}
          icon={<ShoppingBag className="text-blue-500" />}
          loading={isLoading}
        />
        <KPICard
          label="Panier moyen"
          value={formatCurrency(stats?.averageBasket ?? 0)}
          icon={<Receipt className="text-green-500" />}
          loading={isLoading}
        />
        <KPICard
          label="Dettes clients"
          value={formatCurrency(stats?.totalDebt ?? 0)}
          icon={<AlertCircle className="text-amber-500" />}
          loading={isLoading}
          variant={stats?.totalDebt > 0 ? 'warning' : 'default'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique ventes par heure */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-semibold text-slate-900 mb-4">Ventes d'aujourd'hui</h2>
          <SalesChart data={stats?.hourlyBreakdown ?? []} />
        </div>

        {/* Répartition modes de paiement */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-semibold text-slate-900 mb-4">Mode de paiement</h2>
          <PaymentMethodChart
            cash={stats?.cashRevenue ?? 0}
            momo={stats?.momoRevenue ?? 0}
            credit={stats?.creditRevenue ?? 0}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top produits */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-semibold text-slate-900 mb-4">Top 5 produits</h2>
          <TopProductsChart data={stats?.topProducts ?? []} />
        </div>

        {/* Alertes stock */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={18} />
            Alertes stock
          </h2>
          <StockAlertList />
        </div>
      </div>
    </div>
  );
}
```

---

## 7. Page : Interface de caisse

C'est la page la plus critique. Elle doit être rapide, intuitive, et fonctionner offline.

### 7.1 Layout de la caisse

```tsx
// app/(app)/caisse/page.tsx

export default function CaissePage() {
  return (
    <div className="flex h-full bg-slate-900 overflow-hidden">
      {/* Zone produits (gauche) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <CaisseHeader />
        <ProductSearch />
        <CategoryTabs />
        <ProductGrid />
      </div>

      {/* Zone panier (droite, fixe) */}
      <div className="w-96 flex flex-col border-l border-slate-700 bg-slate-800">
        <Cart />
      </div>

      {/* Bannière offline */}
      <OfflineBanner />
    </div>
  );
}
```

### 7.2 Header de la caisse

```tsx
// components/caisse/CaisseHeader.tsx

export function CaisseHeader() {
  const { user } = useSession();
  const { pendingCount, isSyncing } = useOfflineStore();
  const { data: session } = useCashSession();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700">
      <div className="flex items-center gap-3">
        <WezaLogo size="sm" variant="white" />
        <div>
          <p className="text-white font-semibold text-sm">{user.businessName}</p>
          <p className="text-slate-400 text-xs">{user.name} · {format(new Date(), 'HH:mm')}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Indicateur sync */}
        {pendingCount > 0 && (
          <button onClick={() => syncNow()} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg">
            {isSyncing
              ? <RefreshCw size={14} className="text-amber-400 animate-spin" />
              : <CloudOff size={14} className="text-amber-400" />}
            <span className="text-amber-400 text-xs font-medium">{pendingCount}</span>
          </button>
        )}

        {/* Session de caisse */}
        {session ? (
          <span className="text-green-400 text-xs flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Session ouverte
          </span>
        ) : (
          <Button variant="outline" size="sm" onClick={() => openCashSessionModal()}>
            Ouvrir la caisse
          </Button>
        )}

        <Link href="/" className="text-slate-400 hover:text-white p-2">
          <X size={20} />
        </Link>
      </div>
    </header>
  );
}
```

### 7.3 Recherche de produit

```tsx
// components/caisse/ProductSearch.tsx

export function ProductSearch() {
  const [query, setQuery] = useState('');
  const { addToCart } = useCartStore();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus automatique au chargement et après chaque vente
  useEffect(() => { inputRef.current?.focus(); }, []);

  const { data: results, isLoading } = useProductSearch(query);

  // Shortcut clavier F1
  useHotkeys('f1', () => inputRef.current?.focus(), { preventDefault: true });

  return (
    <div className="p-4 relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Rechercher un produit, code-barres... (F1)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-slate-700 text-white placeholder-slate-400 rounded-xl border border-slate-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown de résultats */}
      {query.length >= 2 && (
        <div className="absolute left-4 right-4 top-full mt-1 bg-slate-800 border border-slate-600 rounded-xl overflow-hidden z-50 shadow-2xl">
          {isLoading ? (
            <div className="p-4 text-center text-slate-400 text-sm">Recherche...</div>
          ) : results?.length === 0 ? (
            <div className="p-4 text-center text-slate-400 text-sm">Aucun produit trouvé</div>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {results?.map((product: Product) => (
                <li key={product.id}>
                  <button
                    onClick={() => { addToCart(product); setQuery(''); inputRef.current?.focus(); }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-700 transition-colors text-left"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">{product.name}</p>
                      <p className="text-slate-400 text-xs">{product.category?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold text-sm">{formatCurrency(product.sellingPrice)} F</p>
                      <StockBadge stock={product.stockQuantity} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
```

### 7.4 Grille de produits

```tsx
// components/caisse/ProductGrid.tsx

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { addToCart } = useCartStore();

  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: () => api.get('/categories') });
  const { data: products } = useProducts({ categoryId: activeCategory ?? undefined, featured: !activeCategory });

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Onglets catégories */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all',
            !activeCategory
              ? 'bg-primary text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          )}
        >
          Favoris
        </button>
        {categories?.map((cat: Category) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeCategory === cat.id
                ? 'bg-primary text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grille produits */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-3">
          {products?.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => addToCart(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <motion.button
      onClick={onClick}
      disabled={isOutOfStock}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex flex-col items-start p-3 rounded-xl border text-left transition-all',
        isOutOfStock
          ? 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed'
          : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-primary-500/50 active:bg-slate-500'
      )}
    >
      {product.imageUrl ? (
        <img src={product.imageUrl} alt={product.name} className="w-full h-16 object-cover rounded-lg mb-2" />
      ) : (
        <div className="w-full h-16 bg-slate-600 rounded-lg mb-2 flex items-center justify-center">
          <Package className="text-slate-400" size={24} />
        </div>
      )}
      <p className="text-white text-xs font-medium line-clamp-2 leading-tight mb-1">{product.name}</p>
      <p className="text-primary font-bold text-sm">{formatCurrency(product.sellingPrice)} F</p>
      {product.stockQuantity <= (product.minStockLevel ?? 5) && product.stockQuantity > 0 && (
        <p className="text-amber-400 text-xs mt-1">Stock: {product.stockQuantity}</p>
      )}
    </motion.button>
  );
}
```

### 7.5 Panier

```tsx
// components/caisse/Cart.tsx

export function Cart() {
  const { items, total, subtotal, discountAmount, clearCart } = useCartStore();
  const [showPayment, setShowPayment] = useState(false);

  // Shortcut F2 pour encaisser
  useHotkeys('f2', () => items.length > 0 && setShowPayment(true), { preventDefault: true });

  return (
    <div className="flex flex-col h-full">
      {/* En-tête panier */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <ShoppingCart size={18} />
          Panier
          {items.length > 0 && (
            <span className="bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </h2>
        {items.length > 0 && (
          <button onClick={clearCart} className="text-slate-400 hover:text-red-400 transition-colors">
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Liste des articles */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <AnimatePresence>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <ShoppingCart size={48} strokeWidth={1} />
              <p className="mt-3 text-sm">Le panier est vide</p>
              <p className="text-xs mt-1">Cliquez sur un produit pour l'ajouter</p>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.productId} item={item} />)
          )}
        </AnimatePresence>
      </div>

      {/* Résumé et bouton encaisser */}
      {items.length > 0 && (
        <div className="border-t border-slate-700 p-4 space-y-3">
          {discountAmount > 0 && (
            <>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Sous-total</span>
                <span>{formatCurrency(subtotal)} F</span>
              </div>
              <div className="flex justify-between text-sm text-green-400">
                <span>Remise</span>
                <span>-{formatCurrency(discountAmount)} F</span>
              </div>
            </>
          )}
          <div className="flex justify-between text-lg font-bold text-white">
            <span>TOTAL</span>
            <span className="text-primary">{formatCurrency(total)} FCFA</span>
          </div>

          <Button
            size="xl"
            className="w-full"
            onClick={() => setShowPayment(true)}
            rightIcon={<ChevronRight size={20} />}
          >
            Encaisser (F2)
          </Button>
        </div>
      )}

      {/* Modal de paiement */}
      <PaymentModal open={showPayment} onClose={() => setShowPayment(false)} />
    </div>
  );
}
```

### 7.6 Ligne de panier

```tsx
// components/caisse/CartItem.tsx

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart, setItemDiscount } = useCartStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-3 bg-slate-700 rounded-xl p-3"
    >
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{item.name}</p>
        <p className="text-primary text-sm">{formatCurrency(item.unitPrice)} F × {item.quantity}</p>
        {item.discount > 0 && (
          <p className="text-green-400 text-xs">-{formatCurrency(item.discount)} F de remise</p>
        )}
      </div>

      {/* Contrôle quantité */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => item.quantity > 1 ? updateQuantity(item.productId, item.quantity - 1) : removeFromCart(item.productId)}
          className="w-8 h-8 rounded-lg bg-slate-600 hover:bg-slate-500 flex items-center justify-center text-white transition-colors"
        >
          {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
        </button>
        <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          className="w-8 h-8 rounded-lg bg-slate-600 hover:bg-primary flex items-center justify-center text-white transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="text-right min-w-[60px]">
        <p className="text-white font-bold text-sm">{formatCurrency(item.total)} F</p>
      </div>
    </motion.div>
  );
}
```

### 7.7 Modal de paiement

```tsx
// components/caisse/PaymentModal.tsx

export function PaymentModal({ open, onClose }: ModalProps) {
  const [step, setStep] = useState<'method' | 'cash' | 'momo' | 'credit' | 'success'>('method');
  const [provider, setProvider] = useState<'MTN_MOMO' | 'ORANGE_MONEY' | null>(null);
  const { total, items } = useCartStore();
  const { config } = usePaymentConfig();

  return (
    <Modal open={open} onClose={onClose} title="Encaisser" size="md">
      <AnimatePresence mode="wait">
        {step === 'method' && (
          <motion.div key="method" {...fadeIn} className="space-y-3">
            <p className="text-center text-2xl font-bold text-slate-900 mb-6">
              {formatCurrency(total)} FCFA
            </p>

            {/* Espèces */}
            <button
              onClick={() => setStep('cash')}
              className="w-full flex items-center gap-4 p-4 border-2 border-slate-200 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Banknote className="text-green-600" size={24} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">Espèces</p>
                <p className="text-sm text-slate-500">Paiement en cash</p>
              </div>
              <ChevronRight className="ml-auto text-slate-400 group-hover:text-primary" />
            </button>

            {/* MTN MoMo */}
            {config?.mtnEnabled && (
              <button
                onClick={() => { setProvider('MTN_MOMO'); setStep('momo'); }}
                className="w-full flex items-center gap-4 p-4 border-2 border-slate-200 rounded-2xl hover:border-mtn hover:bg-mtn/5 transition-all group"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <span className="font-black text-yellow-700 text-sm">MTN</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900">MTN Mobile Money</p>
                  <p className="text-sm text-slate-500">Paiement mobile</p>
                </div>
                <ChevronRight className="ml-auto text-slate-400 group-hover:text-mtn-dark" />
              </button>
            )}

            {/* Orange Money */}
            {config?.orangeEnabled && (
              <button
                onClick={() => { setProvider('ORANGE_MONEY'); setStep('momo'); }}
                className="w-full flex items-center gap-4 p-4 border-2 border-slate-200 rounded-2xl hover:border-orange hover:bg-orange/5 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <span className="font-black text-orange-600 text-sm">OM</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900">Orange Money</p>
                  <p className="text-sm text-slate-500">Paiement mobile</p>
                </div>
                <ChevronRight className="ml-auto text-slate-400 group-hover:text-orange-dark" />
              </button>
            )}

            {/* À crédit */}
            <button
              onClick={() => setStep('credit')}
              className="w-full flex items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-2xl hover:border-amber-400 hover:bg-amber-50 transition-all group"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <BookOpen className="text-amber-600" size={24} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">À crédit</p>
                <p className="text-sm text-slate-500">Enregistrer une dette</p>
              </div>
              <ChevronRight className="ml-auto text-slate-400 group-hover:text-amber-500" />
            </button>
          </motion.div>
        )}

        {step === 'cash' && (
          <motion.div key="cash" {...fadeIn}>
            <CashPaymentForm
              total={total}
              onSuccess={() => setStep('success')}
              onBack={() => setStep('method')}
            />
          </motion.div>
        )}

        {step === 'momo' && provider && (
          <motion.div key="momo" {...fadeIn}>
            <MoMoPaymentFlow
              provider={provider}
              total={total}
              onSuccess={() => setStep('success')}
              onBack={() => setStep('method')}
            />
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div key="success" {...fadeIn}>
            <ReceiptModal onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
```

### 7.8 Flow MoMo avec polling

```tsx
// components/caisse/MoMoPaymentFlow.tsx

export function MoMoPaymentFlow({ provider, total, onSuccess, onBack }: MoMoPaymentFlowProps) {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const { items } = useCartStore();

  const initiate = useMutation({
    mutationFn: (phone: string) => api.post('/payments/momo/initiate', {
      provider, phone: `237${phone}`, total, idempotencyKey: crypto.randomUUID(),
    }),
    onSuccess: (data) => {
      setPaymentId(data.paymentId);
      setStatus('pending');
    },
    onError: (err: ApiError) => {
      if (err.code === 'CIRCUIT_OPEN') {
        toast.error('MTN MoMo indisponible. Utilisez une autre méthode.');
      } else {
        toast.error(err.message);
      }
    },
  });

  // Polling du statut
  const { data: statusData } = useQuery({
    queryKey: ['payment-status', paymentId],
    queryFn: () => api.get(`/payments/momo/${paymentId}/status`),
    enabled: !!paymentId && status === 'pending',
    refetchInterval: 5000, // Toutes les 5 secondes
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (!statusData) return;
    if (statusData.status === 'COMPLETED') { setStatus('success'); onSuccess(); }
    if (statusData.status === 'FAILED')    { setStatus('error'); }
  }, [statusData]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-3xl font-bold text-slate-900">{formatCurrency(total)} FCFA</p>
        <p className="text-slate-500 text-sm mt-1">
          {provider === 'MTN_MOMO' ? 'MTN Mobile Money' : 'Orange Money'}
        </p>
      </div>

      {status === 'idle' && (
        <>
          <PhoneInput
            label="Numéro du client"
            prefix="+237"
            value={phone}
            onChange={setPhone}
            placeholder="6XX XXX XXX"
          />
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack} className="flex-1">Retour</Button>
            <Button
              onClick={() => initiate.mutate(phone)}
              loading={initiate.isPending}
              disabled={phone.length !== 9}
              className="flex-1"
              variant={provider === 'MTN_MOMO' ? 'mtn' : 'orange'}
            >
              Envoyer la demande
            </Button>
          </div>
        </>
      )}

      {status === 'pending' && (
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-primary-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <Smartphone className="absolute inset-0 m-auto text-primary" size={28} />
          </div>
          <p className="font-semibold text-slate-900">En attente de confirmation</p>
          <p className="text-sm text-slate-500">
            Le client doit composer son PIN sur <strong>+237 {phone}</strong>
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>Annuler</Button>
            <Button variant="ghost" size="sm" onClick={onBack}>Payer autrement</Button>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <X className="text-red-500" size={32} />
          </div>
          <p className="font-semibold text-red-600">Paiement échoué</p>
          <p className="text-sm text-slate-500">{statusData?.reason ?? 'Le paiement n\'a pas abouti.'}</p>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>Réessayer</Button>
            <Button variant="outline" size="sm" onClick={onBack}>Espèces</Button>
            <Button variant="outline" size="sm" onClick={() => {}}>À crédit</Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 8. Page : Catalogue produits

```tsx
// app/(app)/produits/page.tsx

export default function ProduitsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['products', { search, category, page }],
    queryFn: () => api.get('/products', { params: { search, categoryId: category, page, limit: 25 } }),
    staleTime: 30_000,
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Catalogue produits"
        subtitle={`${data?.pagination.total ?? 0} produits`}
        actions={
          <>
            <Button variant="outline" leftIcon={<Upload size={16} />} onClick={() => openImportModal()}>
              Importer CSV
            </Button>
            <Button leftIcon={<Plus size={16} />} href="/produits/nouveau">
              Ajouter un produit
            </Button>
          </>
        }
      />

      {/* Filtres */}
      <div className="flex gap-3 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="Chercher un produit..." className="flex-1 min-w-60" />
        <CategorySelect value={category} onChange={setCategory} />
        {selected.length > 0 && <BulkActions selectedIds={selected} onClear={() => setSelected([])} />}
      </div>

      {/* Tableau */}
      <ProductTable
        products={data?.products ?? []}
        loading={isLoading}
        selected={selected}
        onSelect={setSelected}
      />

      <Pagination
        page={page}
        totalPages={data?.pagination.pages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
}
```

---

## 9. Page : Gestion du stock

```tsx
// app/(app)/stock/page.tsx

export default function StockPage() {
  const { data: alerts } = useQuery({
    queryKey: ['stock-alerts'],
    queryFn: () => api.get('/stock/alerts'),
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Gestion du stock"
        actions={
          <>
            <Button variant="outline" href="/stock/inventaire">Faire l'inventaire</Button>
            <Button leftIcon={<Plus size={16} />} href="/stock/entree">Entrée de stock</Button>
          </>
        }
      />

      {/* Alertes stock */}
      {alerts?.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <h3 className="font-semibold text-amber-800 flex items-center gap-2 mb-3">
            <AlertTriangle size={18} />
            {alerts.length} produit{alerts.length > 1 ? 's' : ''} en alerte de stock
          </h3>
          <div className="space-y-2">
            {alerts.map((product: Product) => (
              <div key={product.id} className="flex items-center justify-between">
                <span className="text-amber-900 text-sm">{product.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-amber-700 text-sm font-medium">
                    {product.stockQuantity} / {product.minStockLevel} {product.unit}
                  </span>
                  <Button size="sm" variant="outline" href={`/stock/entree?productId=${product.id}`}>
                    Réapprovisionner
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mouvements de stock */}
      <StockMovementTable />
    </div>
  );
}
```

---

## 10. Page : Clients & dettes

```tsx
// app/(app)/clients/page.tsx

export default function ClientsPage() {
  const [tab, setTab] = useState<'all' | 'debts'>('all');

  const { data } = useQuery({
    queryKey: ['customers', tab],
    queryFn: () => api.get('/customers', { params: { hasDebt: tab === 'debts' } }),
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Clients"
        actions={<Button leftIcon={<Plus size={16} />} href="/clients/nouveau">Nouveau client</Button>}
      />

      {/* Résumé dettes */}
      <div className="grid grid-cols-3 gap-4">
        <KPICard label="Total clients" value={data?.stats.totalCustomers ?? 0} icon={<Users />} />
        <KPICard label="Clients avec dette" value={data?.stats.customersWithDebt ?? 0} icon={<AlertCircle />} variant="warning" />
        <KPICard label="Total dettes" value={formatCurrency(data?.stats.totalDebt ?? 0) + ' FCFA'} icon={<TrendingDown />} variant="danger" />
      </div>

      {/* Onglets */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setTab('all')}
          className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all', tab === 'all' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500')}
        >
          Tous les clients
        </button>
        <button
          onClick={() => setTab('debts')}
          className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all', tab === 'debts' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500')}
        >
          Dettes en cours
        </button>
      </div>

      <CustomerTable customers={data?.customers ?? []} />
    </div>
  );
}
```

---

## 11. Page : Rapports

```tsx
// app/(app)/rapports/page.tsx

export default function RapportsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: dailyReport, isLoading } = useQuery({
    queryKey: ['daily-report', format(selectedDate, 'yyyy-MM-dd')],
    queryFn: () => api.get('/reports/daily', { params: { date: format(selectedDate, 'yyyy-MM-dd') } }),
  });

  const exportPDF = useMutation({
    mutationFn: () => api.post('/reports/export', { type: 'daily', date: format(selectedDate, 'yyyy-MM-dd') }),
    onSuccess: (data) => window.open(data.url),
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Rapports"
        actions={
          <Button
            variant="outline"
            leftIcon={<Download size={16} />}
            onClick={() => exportPDF.mutate()}
            loading={exportPDF.isPending}
          >
            Exporter PDF
          </Button>
        }
      />

      {/* Sélecteur de date */}
      <DatePicker value={selectedDate} onChange={setSelectedDate} maxDate={new Date()} />

      {/* KPIs du jour */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="CA Total" value={formatCurrency(dailyReport?.totalRevenue ?? 0) + ' F'} />
        <KPICard label="Nb transactions" value={dailyReport?.saleCount ?? 0} />
        <KPICard label="Panier moyen" value={formatCurrency(dailyReport?.averageBasket ?? 0) + ' F'} />
        <KPICard label="Ventes MoMo" value={formatCurrency(dailyReport?.momoRevenue ?? 0) + ' F'} variant="info" />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-semibold mb-4">Ventes par heure</h3>
          <SalesChart data={dailyReport?.hourlyBreakdown ?? []} />
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-semibold mb-4">Top produits vendus</h3>
          <TopProductsChart data={dailyReport?.topProducts ?? []} />
        </div>
      </div>

      {/* Tableau des transactions */}
      <div className="bg-white rounded-2xl border border-slate-100">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-semibold">Toutes les transactions</h3>
        </div>
        <DailySalesTable sales={dailyReport?.sales ?? []} />
      </div>
    </div>
  );
}
```

---

## 12. Page : Paramètres

### 12.1 Configuration Mobile Money

```tsx
// app/(app)/parametres/paiements/page.tsx

export function PaymentSettingsPage() {
  const { data: config } = useQuery({ queryKey: ['payment-config'], queryFn: () => api.get('/settings/payments') });
  const form = useForm({ defaultValues: config });
  const [testResult, setTestResult] = useState<null | 'ok' | 'error'>(null);

  const save = useMutation({
    mutationFn: (data: PaymentConfig) => api.put('/settings/payments', data),
    onSuccess: () => toast.success('Configuration sauvegardée'),
  });

  const testConnection = useMutation({
    mutationFn: (provider: string) => api.post('/settings/payments/test', { provider }),
    onSuccess: () => setTestResult('ok'),
    onError: () => setTestResult('error'),
  });

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader title="Configuration des paiements" />

      {/* MTN MoMo */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
              <span className="font-black text-yellow-900 text-xs">MTN</span>
            </div>
            <div>
              <h3 className="font-semibold">MTN Mobile Money</h3>
              <p className="text-sm text-slate-500">Accepter les paiements MTN MoMo</p>
            </div>
          </div>
          <Switch {...form.register('mtnEnabled')} />
        </div>

        {form.watch('mtnEnabled') && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <Input label="Numéro de réception MTN" placeholder="+237 6XX XXX XXX" {...form.register('mtnPhone')} />
            <Input label="Clé API MTN MoMo" type="password" placeholder="Fournie par MTN MoMo for Business" {...form.register('mtnApiKey')} />
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => testConnection.mutate('MTN')} loading={testConnection.isPending}>
                Tester la connexion
              </Button>
              {testResult === 'ok' && <span className="text-green-600 text-sm flex items-center gap-1"><CheckCircle size={14} /> Connexion réussie</span>}
              {testResult === 'error' && <span className="text-red-500 text-sm flex items-center gap-1"><XCircle size={14} /> Connexion échouée</span>}
            </div>
          </div>
        )}
      </section>

      <Button onClick={form.handleSubmit((d) => save.mutate(d))} loading={save.isPending} size="lg">
        Sauvegarder la configuration
      </Button>
    </div>
  );
}
```

---

## 13. Offline-first — couche client

### 13.1 Base de données locale (Dexie)

```typescript
// lib/offline/db.ts

import Dexie, { type Table } from 'dexie';

export class WezaOfflineDB extends Dexie {
  products!: Table<OfflineProduct>;
  categories!: Table<OfflineCategory>;
  customers!: Table<OfflineCustomer>;
  transactionQueue!: Table<OfflineTransaction>;
  config!: Table<OfflineConfig>;

  constructor() {
    super('weza-caisse');
    this.version(1).stores({
      products:          '++_id, id, tenantId, name, barcode, categoryId, [tenantId+isActive]',
      categories:        '++_id, id, tenantId',
      customers:         '++_id, id, tenantId, phone',
      transactionQueue:  '++_id, id, type, synced, createdAt',
      config:            'key',
    });
  }
}

export const offlineDB = new WezaOfflineDB();
```

### 13.2 Hooks offline

```typescript
// hooks/useNetworkStatus.ts

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online',  handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online',  handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline };
}

// hooks/useOfflineSync.ts

export function useOfflineSync() {
  const { isOnline } = useNetworkStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Compter les transactions en attente
  useEffect(() => {
    const updateCount = async () => {
      const count = await offlineDB.transactionQueue.where('synced').equals(0).count();
      setPendingCount(count);
    };
    updateCount();
    const interval = setInterval(updateCount, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sync automatique quand on revient en ligne
  useEffect(() => {
    if (isOnline && pendingCount > 0) {
      syncPendingTransactions();
    }
  }, [isOnline]);

  const syncPendingTransactions = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      const pending = await offlineDB.transactionQueue
        .where('synced').equals(0)
        .sortBy('createdAt');

      if (pending.length === 0) return;

      const response = await api.post('/sync/push', {
        deviceId: getDeviceId(),
        transactions: pending,
      });

      // Marquer les transactions réussies comme synchronisées
      const successIds = response.results
        .filter((r: any) => r.success)
        .map((r: any) => r.id);

      await offlineDB.transactionQueue
        .where('id').anyOf(successIds)
        .modify({ synced: 1 });

      setPendingCount(pending.length - successIds.length);
      toast.success(`${successIds.length} vente(s) synchronisée(s)`);
    } catch (error) {
      toast.error('Échec de la synchronisation');
    } finally {
      setIsSyncing(false);
    }
  };

  return { isOnline, isSyncing, pendingCount, syncNow: syncPendingTransactions };
}
```

### 13.3 Store Zustand — Panier

```typescript
// stores/cartStore.ts

interface CartStore {
  items: CartItem[];
  discountAmount: number;
  discountPercent: number | null;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setDiscount: (amount: number, percent?: number) => void;
  clearCart: () => void;

  // Calculés
  subtotal: number;
  total: number;
  itemCount: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  discountAmount: 0,
  discountPercent: null,

  get subtotal() { return get().items.reduce((s, i) => s + i.total, 0); },
  get total()    { return get().subtotal - get().discountAmount; },
  get itemCount(){ return get().items.reduce((s, i) => s + i.quantity, 0); },

  addToCart: (product) => set((state) => {
    const existing = state.items.find((i) => i.productId === product.id);
    if (existing) {
      return { items: state.items.map((i) => i.productId === product.id
        ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * Number(i.unitPrice) }
        : i
      )};
    }
    return { items: [...state.items, {
      productId:  product.id,
      name:       product.name,
      unitPrice:  Number(product.sellingPrice),
      quantity:   1,
      discount:   0,
      total:      Number(product.sellingPrice),
    }]};
  }),

  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter((i) => i.productId !== productId),
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map((i) => i.productId === productId
      ? { ...i, quantity, total: quantity * (Number(i.unitPrice) - i.discount) }
      : i
    ),
  })),

  setDiscount: (amount, percent) => set({ discountAmount: amount, discountPercent: percent ?? null }),

  clearCart: () => set({ items: [], discountAmount: 0, discountPercent: null }),
}));
```

---

## 14. Gestion d'état — React Query

```typescript
// hooks/useProducts.ts

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      // En ligne → API
      if (navigator.onLine) {
        const data = await api.get('/products', { params: filters });
        // Mettre en cache offline
        await offlineDB.products.bulkPut(data.products);
        return data;
      }
      // Hors ligne → IndexedDB
      let query = offlineDB.products.where('tenantId').equals(getTenantId());
      if (filters.categoryId) {
        query = query.and((p) => p.categoryId === filters.categoryId);
      }
      const products = await query.toArray();
      return { products, pagination: { total: products.length } };
    },
    staleTime: 60_000,         // 1 minute
    gcTime: 5 * 60_000,        // 5 minutes en cache
  });
}

// hooks/useProductSearch.ts

export function useProductSearch(query: string) {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: async () => {
      if (!query || query.length < 2) return [];

      if (navigator.onLine) {
        return api.get('/products/search', { params: { q: query } });
      }

      // Offline : recherche locale dans IndexedDB
      const normalizedQuery = query.toLowerCase();
      return offlineDB.products
        .filter((p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.barcode?.includes(query) ||
          p.internalRef?.toLowerCase().includes(normalizedQuery)
        )
        .limit(10)
        .toArray();
    },
    enabled: query.length >= 2,
    staleTime: 30_000,
  });
}
```

---

## 15. Composants réutilisables

### 15.1 KPICard

```tsx
// components/ui/KPICard.tsx

interface KPICardProps {
  label: string;
  value: string | number;
  delta?: number;       // % de variation vs période précédente
  icon?: React.ReactNode;
  loading?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export function KPICard({ label, value, delta, icon, loading, variant = 'default' }: KPICardProps) {
  const variantStyles = {
    default: 'bg-white',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-amber-50 border-amber-200',
    danger:  'bg-red-50  border-red-200',
    info:    'bg-blue-50 border-blue-200',
  };

  if (loading) return <div className="h-24 rounded-2xl bg-slate-100 animate-pulse" />;

  return (
    <div className={cn('rounded-2xl border p-5 space-y-1', variantStyles[variant])}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        {icon && <div className="opacity-60">{icon}</div>}
      </div>
      <p className="text-2xl font-display font-bold text-slate-900">{value}</p>
      {delta !== undefined && (
        <p className={cn('text-xs font-medium flex items-center gap-1', delta >= 0 ? 'text-green-600' : 'text-red-500')}>
          {delta >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {delta >= 0 ? '+' : ''}{delta.toFixed(1)}% vs hier
        </p>
      )}
    </div>
  );
}
```

### 15.2 StockBadge

```tsx
// components/ui/StockBadge.tsx

export function StockBadge({ stock, min }: { stock: number; min?: number }) {
  if (stock <= 0) return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
      Rupture
    </span>
  );
  if (min && stock <= min) return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
      Stock bas · {stock}
    </span>
  );
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
      En stock · {stock}
    </span>
  );
}
```

### 15.3 OfflineBanner

```tsx
// components/caisse/OfflineBanner.tsx

export function OfflineBanner() {
  const { isOnline, pendingCount, isSyncing, syncNow } = useOfflineSync();

  if (isOnline && pendingCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 text-sm font-medium',
          !isOnline
            ? 'bg-amber-500 text-white'
            : 'bg-blue-500 text-white'
        )}
      >
        <div className="flex items-center gap-2">
          {!isOnline
            ? <><WifiOff size={16} /> Mode hors ligne — vos ventes sont sauvegardées localement</>
            : <><CloudOff size={16} /> {pendingCount} vente(s) en attente de synchronisation</>
          }
        </div>
        {isOnline && pendingCount > 0 && (
          <button onClick={syncNow} className="flex items-center gap-1 underline">
            {isSyncing ? <RefreshCw size={14} className="animate-spin" /> : null}
            {isSyncing ? 'Synchronisation...' : 'Synchroniser maintenant'}
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## 16. Accessibilité & responsive

### 16.1 Breakpoints

```typescript
// Breakpoints Tailwind utilisés
// sm  : 640px  — grands smartphones paysage
// md  : 768px  — tablettes portrait
// lg  : 1024px — tablettes paysage / petits PC
// xl  : 1280px — PC standard

// Points clés :
// - < lg  : Navigation en bottom tabs, sidebar masquée
// - >= lg : Sidebar visible, bottom tabs masquées
// - < md  : Interface caisse en colonne (panier en drawer)
// - >= md : Interface caisse en deux colonnes
```

### 16.2 Interface caisse mobile

Sur mobile, le panier est un drawer qui remonte du bas :

```tsx
// Sur mobile (<md), le panier est accessible via un bouton flottant
function MobileCaisse() {
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount, total } = useCartStore();

  return (
    <>
      {/* Produits : plein écran */}
      <div className="flex flex-col h-full">
        <ProductSearch />
        <CategoryTabs />
        <ProductGrid />
      </div>

      {/* Bouton panier flottant */}
      {itemCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-20 right-4 bg-primary text-white rounded-full px-5 py-3 shadow-lg flex items-center gap-3 z-40"
        >
          <ShoppingCart size={20} />
          <span className="font-bold">{formatCurrency(total)} FCFA</span>
          <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {itemCount}
          </span>
        </button>
      )}

      {/* Drawer panier */}
      <Drawer open={cartOpen} onClose={() => setCartOpen(false)} side="bottom" className="h-[80vh]">
        <Cart />
      </Drawer>
    </>
  );
}
```

### 16.3 Taille des cibles tactiles

- Tous les boutons de caisse : minimum `h-12` (48px)
- Cartes produits : minimum `h-20` avec zone tactile complète
- Contrôles quantité (+/-) : minimum `w-10 h-10` (40px)
- Clavier PIN : `h-16` par touche (64px)

---

## 17. Performance frontend

### 17.1 Objectifs Lighthouse

| Métrique | Cible |
|---|---|
| Performance | ≥ 85 |
| Accessibilité | ≥ 95 |
| Best Practices | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

### 17.2 Stratégies d'optimisation

```tsx
// 1. Lazy loading des pages non critiques
const RapportsPage   = dynamic(() => import('./rapports/page'), { loading: () => <PageSkeleton /> });
const ParametresPage = dynamic(() => import('./parametres/page'), { loading: () => <PageSkeleton /> });

// 2. Virtualisation des longues listes
import { FixedSizeList } from 'react-window';

function ProductTableVirtualized({ products }: { products: Product[] }) {
  return (
    <FixedSizeList height={600} itemCount={products.length} itemSize={56} width="100%">
      {({ index, style }) => <ProductRow key={index} style={style} product={products[index]} />}
    </FixedSizeList>
  );
}

// 3. Images optimisées
import Image from 'next/image';

<Image
  src={product.imageUrl}
  alt={product.name}
  width={64} height={64}
  className="rounded-lg object-cover"
  loading="lazy"
/>

// 4. Debounce sur la recherche
function useProductSearch(query: string) {
  const debouncedQuery = useDebounce(query, 300); // 300ms
  return useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => api.get('/products/search', { params: { q: debouncedQuery } }),
    enabled: debouncedQuery.length >= 2,
  });
}

// 5. Prefetch au hover sur les liens de navigation
<Link href="/produits" prefetch={true}>Produits</Link>
```

---

## 18. Tests frontend

### 18.1 Tests de composants (React Testing Library)

```tsx
// __tests__/caisse/Cart.test.tsx

describe('Cart', () => {
  it('ajoute un produit et met à jour le total', async () => {
    const { getByText } = render(<CartTestWrapper />);
    fireEvent.click(getByText('Paracétamol 500mg'));
    expect(getByText('1 200 FCFA')).toBeInTheDocument();
  });

  it('incrémente la quantité sur double ajout', () => {
    const store = useCartStore.getState();
    store.addToCart(mockProduct);
    store.addToCart(mockProduct);
    expect(store.items[0].quantity).toBe(2);
    expect(store.total).toBe(mockProduct.sellingPrice * 2);
  });

  it('applique une remise correctement', () => {
    const store = useCartStore.getState();
    store.addToCart({ ...mockProduct, sellingPrice: 10_000 });
    store.setDiscount(1_000, 10);
    expect(store.total).toBe(9_000);
  });
});
```

### 18.2 Tests E2E (Playwright)

```typescript
// e2e/vente-especes.spec.ts

test('vente complète en espèces', async ({ page }) => {
  await page.goto('/pin');
  await page.click('[data-testid="user-jean-paul"]');
  await page.click('[data-testid="pin-1"]');
  await page.click('[data-testid="pin-2"]');
  await page.click('[data-testid="pin-3"]');
  await page.click('[data-testid="pin-4"]');
  await page.waitForURL('/caisse');

  // Rechercher et ajouter un produit
  await page.fill('[data-testid="product-search"]', 'Paracétamol');
  await page.click('[data-testid="product-Paracétamol 500mg"]');
  await expect(page.locator('[data-testid="cart-total"]')).toContainText('1 200');

  // Encaisser en espèces
  await page.click('[data-testid="btn-encaisser"]');
  await page.click('[data-testid="payment-cash"]');
  await page.fill('[data-testid="amount-paid"]', '2000');
  await expect(page.locator('[data-testid="change-due"]')).toContainText('800');
  await page.click('[data-testid="confirm-sale"]');

  // Vérifier le succès
  await expect(page.locator('[data-testid="sale-success"]')).toBeVisible();
  await expect(page.locator('[data-testid="cart-items"]')).toBeEmpty();
});

// e2e/offline-sync.spec.ts

test('vente offline synchronisée au retour en ligne', async ({ page, context }) => {
  await page.goto('/caisse');

  // Simuler le mode offline
  await context.setOffline(true);
  await expect(page.locator('[data-testid="offline-banner"]')).toBeVisible();

  // Effectuer une vente
  await addProductAndSell(page);
  await expect(page.locator('[data-testid="pending-sync-count"]')).toContainText('1');

  // Revenir en ligne
  await context.setOffline(false);
  await expect(page.locator('[data-testid="sync-success"]')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('[data-testid="pending-sync-count"]')).not.toBeVisible();
});
```

---

> **Weza Caisse — Frontend Specifications v1.0**  
> *Stack : Next.js 14 · TypeScript · Tailwind CSS · React Query · Dexie.js · Framer Motion*
