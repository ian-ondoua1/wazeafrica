export type ID = string;
export type ISODate = string;

export type Currency = "XAF" | "XOF" | "EUR" | "USD";

export interface Money {
  amount: number;
  currency: Currency;
}

export type PlanTier = "starter" | "pro" | "business" | "enterprise";

export type SaaSFeature = "caisse" | "compta" | "livraison" | "sante" | "rh-paie";

export interface Tenant {
  id: ID;
  name: string;
  country: string;
  currency: Currency;
  features: SaaSFeature[];
  plan: Record<SaaSFeature, PlanTier | null>;
}

export type UserRole = "owner" | "admin" | "manager" | "cashier" | "employee";

export interface User {
  id: ID;
  tenantId: ID;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };
