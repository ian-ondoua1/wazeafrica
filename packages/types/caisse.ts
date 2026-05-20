import type { ID, ISODate, Money, UserRole } from "./common";

export interface Store {
  id: ID;
  tenantId: ID;
  name: string;
  address?: string;
}

export type ProductUnit = "piece" | "kg" | "g" | "l" | "ml" | "pack";

export interface Product {
  id: ID;
  tenantId: ID;
  sku: string;
  name: string;
  barcode?: string;
  category?: string;
  unit: ProductUnit;
  price: Money;
  cost?: Money;
  stock: number;
  lowStockThreshold?: number;
  imageUrl?: string;
  archived: boolean;
}

export interface Customer {
  id: ID;
  tenantId: ID;
  fullName: string;
  phone?: string;
  email?: string;
  debt: Money;
  notes?: string;
}

export interface CartLine {
  productId: ID;
  name: string;
  unitPrice: Money;
  quantity: number;
  discount?: Money;
}

export interface Cart {
  lines: CartLine[];
  customerId?: ID;
  discount?: Money;
}

export type PaymentMethod =
  | "cash"
  | "mtn_momo"
  | "orange_money"
  | "card"
  | "credit";

export interface Payment {
  method: PaymentMethod;
  amount: Money;
  reference?: string;
}

export type SaleStatus = "draft" | "completed" | "refunded" | "voided";

export interface Sale {
  id: ID;
  tenantId: ID;
  storeId: ID;
  cashierId: ID;
  number: string;
  lines: CartLine[];
  subtotal: Money;
  discount?: Money;
  total: Money;
  payments: Payment[];
  customerId?: ID;
  status: SaleStatus;
  createdAt: ISODate;
  syncedAt?: ISODate;
}

export type StockMovementReason =
  | "sale"
  | "purchase"
  | "adjustment"
  | "transfer"
  | "loss";

export interface StockMovement {
  id: ID;
  productId: ID;
  storeId: ID;
  delta: number;
  reason: StockMovementReason;
  ref?: string;
  createdAt: ISODate;
}

export interface DashboardSummary {
  todayRevenue: Money;
  todaySales: number;
  todayCustomers: number;
  outstandingDebt: Money;
  lowStockCount: number;
}

export interface SalesPoint {
  date: ISODate;
  revenue: number;
  count: number;
}

export interface DebtPayment {
  id: ID;
  customerId: ID;
  amount: Money;
  method: PaymentMethod;
  note?: string;
  createdAt: ISODate;
}

export interface DebtEntry {
  id: ID;
  customerId: ID;
  saleId?: ID;
  amount: Money;
  balance: Money;
  createdAt: ISODate;
}

export interface BusinessSettings {
  name: string;
  legalName?: string;
  address: string;
  phone: string;
  email?: string;
  rccm?: string;
  niu?: string;
  receiptFooter?: string;
  logoUrl?: string;
}

export interface PaymentConfig {
  mtnEnabled: boolean;
  mtnPhone?: string;
  mtnApiKey?: string;
  orangeEnabled: boolean;
  orangePhone?: string;
  orangeApiKey?: string;
  cashEnabled: boolean;
  cardEnabled: boolean;
  creditEnabled: boolean;
}

export interface AppUser {
  id: ID;
  fullName: string;
  email: string;
  role: UserRole;
  pin?: string;
  active: boolean;
}

export interface TopProduct {
  productId: ID;
  name: string;
  quantity: number;
  revenue: Money;
}

export interface DailyReport {
  date: ISODate;
  totalRevenue: Money;
  saleCount: number;
  averageBasket: Money;
  cashRevenue: Money;
  momoRevenue: Money;
  cardRevenue: Money;
  creditRevenue: Money;
  hourlyBreakdown: { hour: number; revenue: number; count: number }[];
  topProducts: TopProduct[];
  sales: Sale[];
}
