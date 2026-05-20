import type {
  AppUser,
  BusinessSettings,
  Customer,
  DebtPayment,
  PaymentConfig,
  Product,
  Sale,
  StockMovement,
  Store,
} from "@weza/types";

export const mockTenantId = "tenant_001";
export const mockUserId = "user_001";

export const mockStores: Store[] = [
  {
    id: "store_001",
    tenantId: mockTenantId,
    name: "Pharmacie Akwa",
    address: "Akwa, Douala",
  },
];

export const mockProducts: Product[] = [
  {
    id: "prod_001",
    tenantId: mockTenantId,
    sku: "PARA-500",
    name: "Paracétamol 500mg (boîte 20)",
    category: "Antidouleur",
    unit: "piece",
    price: { amount: 800, currency: "XAF" },
    stock: 142,
    lowStockThreshold: 20,
    archived: false,
  },
  {
    id: "prod_002",
    tenantId: mockTenantId,
    sku: "AMOX-500",
    name: "Amoxicilline 500mg",
    category: "Antibiotique",
    unit: "piece",
    price: { amount: 2500, currency: "XAF" },
    stock: 58,
    lowStockThreshold: 15,
    archived: false,
  },
  {
    id: "prod_003",
    tenantId: mockTenantId,
    sku: "VITC-1G",
    name: "Vitamine C 1g (tube)",
    category: "Vitamines",
    unit: "piece",
    price: { amount: 1200, currency: "XAF" },
    stock: 9,
    lowStockThreshold: 12,
    archived: false,
  },
  {
    id: "prod_004",
    tenantId: mockTenantId,
    sku: "ALC-70",
    name: "Alcool 70° 250ml",
    category: "Soins",
    unit: "piece",
    price: { amount: 1500, currency: "XAF" },
    stock: 34,
    archived: false,
  },
  {
    id: "prod_005",
    tenantId: mockTenantId,
    sku: "MASQ-50",
    name: "Masques chirurgicaux (boîte 50)",
    category: "Soins",
    unit: "pack",
    price: { amount: 3500, currency: "XAF" },
    stock: 22,
    lowStockThreshold: 10,
    archived: false,
  },
  {
    id: "prod_006",
    tenantId: mockTenantId,
    sku: "GEL-100",
    name: "Gel hydroalcoolique 100ml",
    category: "Soins",
    unit: "piece",
    price: { amount: 1800, currency: "XAF" },
    stock: 47,
    archived: false,
  },
  {
    id: "prod_007",
    tenantId: mockTenantId,
    sku: "EFFER-1G",
    name: "Effervescent 1g (boîte 4)",
    category: "Antidouleur",
    unit: "piece",
    price: { amount: 1100, currency: "XAF" },
    stock: 0,
    lowStockThreshold: 10,
    archived: false,
  },
  {
    id: "prod_008",
    tenantId: mockTenantId,
    sku: "PANS-S",
    name: "Pansements stériles (sachet)",
    category: "Soins",
    unit: "pack",
    price: { amount: 600, currency: "XAF" },
    stock: 88,
    archived: false,
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "cust_001",
    tenantId: mockTenantId,
    fullName: "Jean Mballa",
    phone: "+237 6 77 12 34 56",
    debt: { amount: 8500, currency: "XAF" },
  },
  {
    id: "cust_002",
    tenantId: mockTenantId,
    fullName: "Marie Ngono",
    phone: "+237 6 99 88 11 22",
    debt: { amount: 0, currency: "XAF" },
  },
  {
    id: "cust_003",
    tenantId: mockTenantId,
    fullName: "Paul Etoa",
    phone: "+237 6 95 30 62 44",
    debt: { amount: 12000, currency: "XAF" },
  },
];

export const mockSales: Sale[] = [
  {
    id: "sale_001",
    tenantId: mockTenantId,
    storeId: "store_001",
    cashierId: mockUserId,
    number: "TKT-2026-00142",
    lines: [
      {
        productId: "prod_001",
        name: "Paracétamol 500mg",
        unitPrice: { amount: 800, currency: "XAF" },
        quantity: 2,
      },
    ],
    subtotal: { amount: 1600, currency: "XAF" },
    total: { amount: 1600, currency: "XAF" },
    payments: [
      { method: "mtn_momo", amount: { amount: 1600, currency: "XAF" } },
    ],
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "sale_002",
    tenantId: mockTenantId,
    storeId: "store_001",
    cashierId: mockUserId,
    number: "TKT-2026-00141",
    lines: [
      {
        productId: "prod_005",
        name: "Masques chirurgicaux",
        unitPrice: { amount: 3500, currency: "XAF" },
        quantity: 1,
      },
      {
        productId: "prod_006",
        name: "Gel hydroalcoolique 100ml",
        unitPrice: { amount: 1800, currency: "XAF" },
        quantity: 2,
      },
    ],
    subtotal: { amount: 7100, currency: "XAF" },
    total: { amount: 7100, currency: "XAF" },
    payments: [{ method: "cash", amount: { amount: 7100, currency: "XAF" } }],
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "sale_003",
    tenantId: mockTenantId,
    storeId: "store_001",
    cashierId: mockUserId,
    number: "TKT-2026-00140",
    lines: [
      {
        productId: "prod_002",
        name: "Amoxicilline 500mg",
        unitPrice: { amount: 2500, currency: "XAF" },
        quantity: 1,
      },
    ],
    subtotal: { amount: 2500, currency: "XAF" },
    total: { amount: 2500, currency: "XAF" },
    payments: [{ method: "orange_money", amount: { amount: 2500, currency: "XAF" } }],
    customerId: "cust_001",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: "sale_004",
    tenantId: mockTenantId,
    storeId: "store_001",
    cashierId: mockUserId,
    number: "TKT-2026-00139",
    lines: [
      {
        productId: "prod_003",
        name: "Vitamine C 1g (tube)",
        unitPrice: { amount: 1200, currency: "XAF" },
        quantity: 3,
      },
      {
        productId: "prod_004",
        name: "Alcool 70° 250ml",
        unitPrice: { amount: 1500, currency: "XAF" },
        quantity: 2,
      },
    ],
    subtotal: { amount: 6600, currency: "XAF" },
    total: { amount: 6600, currency: "XAF" },
    payments: [{ method: "credit", amount: { amount: 6600, currency: "XAF" } }],
    customerId: "cust_003",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
];

export const mockStockMovements: StockMovement[] = [
  {
    id: "mov_001",
    productId: "prod_001",
    storeId: "store_001",
    delta: -2,
    reason: "sale",
    ref: "TKT-2026-00142",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "mov_002",
    productId: "prod_003",
    storeId: "store_001",
    delta: 50,
    reason: "purchase",
    ref: "BL-2026-007",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "mov_003",
    productId: "prod_007",
    storeId: "store_001",
    delta: -1,
    reason: "loss",
    ref: "Casse",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
];

export const mockDebtPayments: DebtPayment[] = [
  {
    id: "dp_001",
    customerId: "cust_001",
    amount: { amount: 5000, currency: "XAF" },
    method: "mtn_momo",
    note: "Acompte",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
];

export const mockBusinessSettings: BusinessSettings = {
  name: "Pharmacie Akwa",
  legalName: "PHARMACIE AKWA SARL",
  address: "Rue Joss, Akwa, Douala",
  phone: "+237 6 77 12 34 56",
  email: "contact@pharmacie-akwa.cm",
  rccm: "RC/DLA/2018/B/1234",
  niu: "M021800054321Z",
  receiptFooter: "Merci de votre visite — À bientôt !",
};

export const mockPaymentConfig: PaymentConfig = {
  mtnEnabled: true,
  mtnPhone: "+237 6 77 12 34 56",
  mtnApiKey: "mtn_test_key_XXXX",
  orangeEnabled: true,
  orangePhone: "+237 6 95 30 62 44",
  orangeApiKey: "orange_test_key_XXXX",
  cashEnabled: true,
  cardEnabled: false,
  creditEnabled: true,
};

export const mockAppUsers: AppUser[] = [
  {
    id: "user_001",
    fullName: "Jean Mballa",
    email: "jean@pharmacie-akwa.cm",
    role: "owner",
    pin: "1234",
    active: true,
  },
  {
    id: "user_002",
    fullName: "Marie Tchouante",
    email: "marie@pharmacie-akwa.cm",
    role: "cashier",
    pin: "5678",
    active: true,
  },
  {
    id: "user_003",
    fullName: "Paul Ngo",
    email: "paul@pharmacie-akwa.cm",
    role: "manager",
    pin: "9012",
    active: true,
  },
];
