import type {
  AppUser,
  Customer,
  DailyReport,
  DashboardSummary,
  DebtPayment,
  ID,
  Money,
  Payment,
  PaymentMethod,
  Product,
  Sale,
  SalesPoint,
  StockMovement,
  TopProduct,
} from "@weza/types";
import type { CaisseApi, CheckoutInput } from "../caisse";
import {
  mockAppUsers,
  mockBusinessSettings,
  mockCustomers,
  mockDebtPayments,
  mockPaymentConfig,
  mockProducts,
  mockSales,
  mockStockMovements,
  mockStores,
  mockTenantId,
  mockUserId,
} from "./fixtures";

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));
const delay = (ms = 80) => new Promise((r) => setTimeout(r, ms));

let products = clone(mockProducts);
let customers = clone(mockCustomers);
let sales = clone(mockSales);
let stockMovements = clone(mockStockMovements);
let debtPayments = clone(mockDebtPayments);
let businessSettings = clone(mockBusinessSettings);
let paymentConfig = clone(mockPaymentConfig);
let appUsers = clone(mockAppUsers);

const xaf = (amount: number): Money => ({ amount, currency: "XAF" });

const sumMoney = (amounts: Money[]): Money => ({
  amount: amounts.reduce((acc, m) => acc + m.amount, 0),
  currency: amounts[0]?.currency ?? "XAF",
});

export const mockCaisseApi: CaisseApi = {
  auth: {
    async loginByPassword({ email, password }) {
      await delay(250);
      const user = appUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.active
      );
      if (!user) throw new Error("Email ou mot de passe invalide");
      if (!password || password.length < 4)
        throw new Error("Email ou mot de passe invalide");
      return clone(user);
    },
    async loginByPin({ userId, pin }) {
      await delay(180);
      const user = appUsers.find((u) => u.id === userId && u.active);
      if (!user) throw new Error("Utilisateur introuvable");
      // Les administrateurs et propriétaires ne peuvent pas se connecter par
      // PIN — ils doivent passer par l'email + mot de passe pour des raisons
      // de sécurité (le PIN à 4 chiffres est trop faible pour les accès
      // sensibles).
      if (user.role === "owner" || user.role === "admin") {
        throw new Error(
          "Les administrateurs doivent se connecter par email"
        );
      }
      if (user.pin !== pin) throw new Error("PIN incorrect");
      return clone(user);
    },
    async listCashiers() {
      await delay();
      // Seuls les caissiers, employés et managers sont proposés sur l'écran
      // PIN. Les owner/admin sont exclus pour les forcer à utiliser le flow
      // email + mot de passe.
      return clone(
        appUsers.filter(
          (u) =>
            u.active &&
            (u.role === "cashier" ||
              u.role === "employee" ||
              u.role === "manager")
        )
      );
    },
  },
  stores: {
    async list() {
      await delay();
      return clone(mockStores);
    },
    async get(id) {
      await delay();
      const store = mockStores.find((s) => s.id === id);
      if (!store) throw new Error(`Store ${id} not found`);
      return clone(store);
    },
  },
  products: {
    async list(query) {
      await delay();
      let result = products.filter((p) => !p.archived);
      if (query?.search) {
        const s = query.search.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s)
        );
      }
      if (query?.category) {
        result = result.filter((p) => p.category === query.category);
      }
      return clone(result);
    },
    async get(id) {
      await delay();
      const p = products.find((p) => p.id === id);
      if (!p) throw new Error(`Product ${id} not found`);
      return clone(p);
    },
    async create(input) {
      await delay();
      const p: Product = {
        ...input,
        id: `prod_${Date.now()}`,
        tenantId: mockTenantId,
      };
      products.push(p);
      return clone(p);
    },
    async update(id, patch) {
      await delay();
      const idx = products.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error(`Product ${id} not found`);
      products[idx] = { ...products[idx], ...patch };
      return clone(products[idx]);
    },
    async archive(id) {
      await delay();
      const idx = products.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error(`Product ${id} not found`);
      products[idx].archived = true;
    },
    async categories() {
      await delay();
      const set = new Set<string>();
      products.forEach((p) => p.category && set.add(p.category));
      return Array.from(set).sort();
    },
    async lowStock() {
      await delay();
      return clone(
        products.filter(
          (p) =>
            !p.archived &&
            p.lowStockThreshold !== undefined &&
            p.stock <= p.lowStockThreshold
        )
      );
    },
  },
  stock: {
    async movements(query) {
      await delay();
      let result = [...stockMovements];
      if (query?.productId) {
        result = result.filter((m) => m.productId === query.productId);
      }
      result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      if (query?.limit) result = result.slice(0, query.limit);
      return clone(result);
    },
    async addEntry(input) {
      await delay(150);
      const mov: StockMovement = {
        id: `mov_${Date.now()}`,
        productId: input.productId,
        storeId: input.storeId,
        delta: input.delta,
        reason: input.reason,
        ref: input.note,
        createdAt: new Date().toISOString(),
      };
      stockMovements = [mov, ...stockMovements];
      const idx = products.findIndex((p) => p.id === input.productId);
      if (idx !== -1) {
        products[idx].stock = Math.max(0, products[idx].stock + input.delta);
      }
      return clone(mov);
    },
  },
  customers: {
    async list(query) {
      await delay();
      let result = customers;
      if (query?.search) {
        const s = query.search.toLowerCase();
        result = result.filter(
          (c) =>
            c.fullName.toLowerCase().includes(s) ||
            (c.phone ?? "").toLowerCase().includes(s)
        );
      }
      if (query?.withDebt) {
        result = result.filter((c) => c.debt.amount > 0);
      }
      return clone(result);
    },
    async get(id) {
      await delay();
      const c = customers.find((c) => c.id === id);
      if (!c) throw new Error(`Customer ${id} not found`);
      return clone(c);
    },
    async create(input) {
      await delay();
      const c: Customer = {
        ...input,
        id: `cust_${Date.now()}`,
        tenantId: mockTenantId,
        debt: xaf(0),
      };
      customers.push(c);
      return clone(c);
    },
    async update(id, patch) {
      await delay();
      const idx = customers.findIndex((c) => c.id === id);
      if (idx === -1) throw new Error(`Customer ${id} not found`);
      customers[idx] = { ...customers[idx], ...patch };
      return clone(customers[idx]);
    },
    async history(id) {
      await delay();
      const result = sales.filter((s) => s.customerId === id);
      result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return clone(result);
    },
    async payDebt(input) {
      await delay(150);
      const idx = customers.findIndex((c) => c.id === input.customerId);
      if (idx === -1) throw new Error(`Customer ${input.customerId} not found`);
      const newBalance = Math.max(
        0,
        customers[idx].debt.amount - input.amount
      );
      customers[idx] = {
        ...customers[idx],
        debt: xaf(newBalance),
      };
      const payment: DebtPayment = {
        id: `dp_${Date.now()}`,
        customerId: input.customerId,
        amount: xaf(input.amount),
        method: input.method,
        note: input.note,
        createdAt: new Date().toISOString(),
      };
      debtPayments = [payment, ...debtPayments];
      return { customer: clone(customers[idx]), payment: clone(payment) };
    },
    async debtPayments(id) {
      await delay();
      const result = debtPayments.filter((p) => p.customerId === id);
      result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return clone(result);
    },
  },
  sales: {
    async list(query) {
      await delay();
      let result = [...sales];
      if (query?.from) result = result.filter((s) => s.createdAt >= query.from!);
      if (query?.to) result = result.filter((s) => s.createdAt <= query.to!);
      if (query?.method) {
        result = result.filter((s) =>
          s.payments.some((p) => p.method === query.method)
        );
      }
      result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      if (query?.limit) result = result.slice(0, query.limit);
      return clone(result);
    },
    async get(id) {
      await delay();
      const s = sales.find((s) => s.id === id);
      if (!s) throw new Error(`Sale ${id} not found`);
      return clone(s);
    },
    async checkout(input: CheckoutInput) {
      await delay(200);
      const { cart, storeId, payments: paymentInputs } = input;
      const subtotal = sumMoney(
        cart.lines.map((l) => ({
          amount: l.unitPrice.amount * l.quantity,
          currency: l.unitPrice.currency,
        }))
      );
      const total: Money = xaf(subtotal.amount - (cart.discount?.amount ?? 0));
      const payments: Payment[] = paymentInputs.map((p) => ({
        method: p.method,
        amount: xaf(p.amount),
        reference: p.reference,
      }));
      const sale: Sale = {
        id: `sale_${Date.now()}`,
        tenantId: mockTenantId,
        storeId,
        cashierId: mockUserId,
        number: `TKT-${new Date().getFullYear()}-${String(sales.length + 143).padStart(5, "0")}`,
        lines: cart.lines,
        subtotal,
        discount: cart.discount,
        total,
        payments,
        customerId: cart.customerId,
        status: "completed",
        createdAt: new Date().toISOString(),
      };
      cart.lines.forEach((l) => {
        const p = products.find((p) => p.id === l.productId);
        if (p) p.stock = Math.max(0, p.stock - l.quantity);
        stockMovements = [
          {
            id: `mov_${Date.now()}_${l.productId}`,
            productId: l.productId,
            storeId,
            delta: -l.quantity,
            reason: "sale",
            ref: sale.number,
            createdAt: sale.createdAt,
          },
          ...stockMovements,
        ];
      });
      const creditAmount = payments
        .filter((p) => p.method === "credit")
        .reduce((s, p) => s + p.amount.amount, 0);
      if (creditAmount > 0 && cart.customerId) {
        const idx = customers.findIndex((c) => c.id === cart.customerId);
        if (idx !== -1) {
          customers[idx] = {
            ...customers[idx],
            debt: xaf(customers[idx].debt.amount + creditAmount),
          };
        }
      }
      sales = [sale, ...sales];
      return clone(sale);
    },
    async refund(id) {
      await delay();
      const idx = sales.findIndex((s) => s.id === id);
      if (idx === -1) throw new Error(`Sale ${id} not found`);
      sales[idx].status = "refunded";
      return clone(sales[idx]);
    },
  },
  dashboard: {
    async summary(storeId) {
      await delay();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isoToday = today.toISOString();
      const todaySales = sales.filter(
        (s) =>
          s.storeId === storeId &&
          s.createdAt >= isoToday &&
          s.status === "completed"
      );
      const revenue = sumMoney(todaySales.map((s) => s.total));
      const customersToday = new Set(
        todaySales.map((s) => s.customerId).filter(Boolean)
      ).size;
      const outstandingDebt = sumMoney(customers.map((c) => c.debt));
      const lowStock = products.filter(
        (p) =>
          !p.archived && p.lowStockThreshold && p.stock <= p.lowStockThreshold
      ).length;
      const summary: DashboardSummary = {
        todayRevenue: revenue,
        todaySales: todaySales.length,
        todayCustomers: customersToday,
        outstandingDebt,
        lowStockCount: lowStock,
      };
      return summary;
    },
    async salesTimeseries(_storeId: ID, days: number) {
      await delay();
      const points: SalesPoint[] = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const seed = (d.getDay() + 1) * 7000 + Math.floor(Math.random() * 5000);
        points.push({
          date: d.toISOString(),
          revenue: seed,
          count: Math.floor(seed / 1500),
        });
      }
      return points;
    },
  },
  reports: {
    async daily(date, storeId) {
      await delay();
      const day = new Date(date);
      day.setHours(0, 0, 0, 0);
      const next = new Date(day);
      next.setDate(next.getDate() + 1);
      const isoStart = day.toISOString();
      const isoEnd = next.toISOString();
      const daySales = sales.filter(
        (s) =>
          s.storeId === storeId &&
          s.createdAt >= isoStart &&
          s.createdAt < isoEnd &&
          s.status === "completed"
      );
      const totalRevenue = sumMoney(daySales.map((s) => s.total));
      const saleCount = daySales.length;
      const averageBasket = xaf(
        saleCount > 0 ? Math.round(totalRevenue.amount / saleCount) : 0
      );
      const byMethod = (method: PaymentMethod) =>
        xaf(
          daySales
            .flatMap((s) => s.payments)
            .filter((p) => p.method === method)
            .reduce((sum, p) => sum + p.amount.amount, 0)
        );
      const hourlyBreakdown = Array.from({ length: 24 }, (_, hour) => {
        const slice = daySales.filter(
          (s) => new Date(s.createdAt).getHours() === hour
        );
        return {
          hour,
          revenue: slice.reduce((sum, s) => sum + s.total.amount, 0),
          count: slice.length,
        };
      });
      const productAgg = new Map<
        ID,
        { name: string; quantity: number; revenue: number }
      >();
      daySales.forEach((s) =>
        s.lines.forEach((l) => {
          const prev = productAgg.get(l.productId) ?? {
            name: l.name,
            quantity: 0,
            revenue: 0,
          };
          productAgg.set(l.productId, {
            name: l.name,
            quantity: prev.quantity + l.quantity,
            revenue: prev.revenue + l.unitPrice.amount * l.quantity,
          });
        })
      );
      const topProducts: TopProduct[] = Array.from(productAgg.entries())
        .map(([productId, agg]) => ({
          productId,
          name: agg.name,
          quantity: agg.quantity,
          revenue: xaf(agg.revenue),
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);
      const report: DailyReport = {
        date,
        totalRevenue,
        saleCount,
        averageBasket,
        cashRevenue: byMethod("cash"),
        momoRevenue: xaf(
          byMethod("mtn_momo").amount + byMethod("orange_money").amount
        ),
        cardRevenue: byMethod("card"),
        creditRevenue: byMethod("credit"),
        hourlyBreakdown,
        topProducts,
        sales: daySales,
      };
      return clone(report);
    },
  },
  settings: {
    async getBusiness() {
      await delay();
      return clone(businessSettings);
    },
    async updateBusiness(patch) {
      await delay(120);
      businessSettings = { ...businessSettings, ...patch };
      return clone(businessSettings);
    },
    async getPayments() {
      await delay();
      return clone(paymentConfig);
    },
    async updatePayments(patch) {
      await delay(120);
      paymentConfig = { ...paymentConfig, ...patch };
      return clone(paymentConfig);
    },
    async testPayment(provider) {
      await delay(800);
      return {
        ok: true,
        message: `Connexion ${provider} validée — compte actif`,
      };
    },
    async listUsers() {
      await delay();
      return clone(appUsers);
    },
    async createUser(input) {
      await delay();
      const user: AppUser = { ...input, id: `user_${Date.now()}` };
      appUsers.push(user);
      return clone(user);
    },
    async updateUser(id, patch) {
      await delay();
      const idx = appUsers.findIndex((u) => u.id === id);
      if (idx === -1) throw new Error(`User ${id} not found`);
      appUsers[idx] = { ...appUsers[idx], ...patch };
      return clone(appUsers[idx]);
    },
    async deleteUser(id) {
      await delay();
      appUsers = appUsers.filter((u) => u.id !== id);
    },
  },
};
