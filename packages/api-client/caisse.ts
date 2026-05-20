import type {
  AppUser,
  BusinessSettings,
  Cart,
  Customer,
  DailyReport,
  DashboardSummary,
  DebtPayment,
  ID,
  PaymentConfig,
  PaymentMethod,
  Product,
  Sale,
  SalesPoint,
  StockMovement,
  Store,
} from "@weza/types";

export interface CheckoutInput {
  cart: Cart;
  storeId: ID;
  payments: { method: PaymentMethod; amount: number; reference?: string }[];
}

export interface CaisseApi {
  auth: {
    loginByPassword(input: {
      email: string;
      password: string;
    }): Promise<AppUser>;
    loginByPin(input: { userId: ID; pin: string }): Promise<AppUser>;
    listCashiers(): Promise<AppUser[]>;
  };
  stores: {
    list(): Promise<Store[]>;
    get(id: ID): Promise<Store>;
  };
  products: {
    list(query?: { search?: string; category?: string }): Promise<Product[]>;
    get(id: ID): Promise<Product>;
    create(input: Omit<Product, "id" | "tenantId">): Promise<Product>;
    update(id: ID, patch: Partial<Product>): Promise<Product>;
    archive(id: ID): Promise<void>;
    categories(): Promise<string[]>;
    lowStock(): Promise<Product[]>;
  };
  stock: {
    movements(query?: { productId?: ID; limit?: number }): Promise<StockMovement[]>;
    addEntry(input: {
      productId: ID;
      delta: number;
      reason: StockMovement["reason"];
      note?: string;
      storeId: ID;
    }): Promise<StockMovement>;
  };
  customers: {
    list(query?: { search?: string; withDebt?: boolean }): Promise<Customer[]>;
    get(id: ID): Promise<Customer>;
    create(input: Omit<Customer, "id" | "tenantId" | "debt">): Promise<Customer>;
    update(id: ID, patch: Partial<Customer>): Promise<Customer>;
    history(id: ID): Promise<Sale[]>;
    payDebt(input: {
      customerId: ID;
      amount: number;
      method: PaymentMethod;
      note?: string;
    }): Promise<{ customer: Customer; payment: DebtPayment }>;
    debtPayments(id: ID): Promise<DebtPayment[]>;
  };
  sales: {
    list(query?: {
      from?: string;
      to?: string;
      limit?: number;
      method?: PaymentMethod;
    }): Promise<Sale[]>;
    get(id: ID): Promise<Sale>;
    checkout(input: CheckoutInput): Promise<Sale>;
    refund(id: ID): Promise<Sale>;
  };
  dashboard: {
    summary(storeId: ID): Promise<DashboardSummary>;
    salesTimeseries(storeId: ID, days: number): Promise<SalesPoint[]>;
  };
  reports: {
    daily(date: string, storeId: ID): Promise<DailyReport>;
  };
  settings: {
    getBusiness(): Promise<BusinessSettings>;
    updateBusiness(patch: Partial<BusinessSettings>): Promise<BusinessSettings>;
    getPayments(): Promise<PaymentConfig>;
    updatePayments(patch: Partial<PaymentConfig>): Promise<PaymentConfig>;
    testPayment(provider: "MTN" | "ORANGE"): Promise<{ ok: boolean; message: string }>;
    listUsers(): Promise<AppUser[]>;
    createUser(input: Omit<AppUser, "id">): Promise<AppUser>;
    updateUser(id: ID, patch: Partial<AppUser>): Promise<AppUser>;
    deleteUser(id: ID): Promise<void>;
  };
}
