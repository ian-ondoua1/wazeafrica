import type { UserRole } from "@weza/types";

export type Permission =
  | "dashboard:view"
  | "pos:use"
  | "sales:view"
  | "sales:refund"
  | "products:read"
  | "products:write"
  | "stock:write"
  | "customers:read"
  | "customers:write"
  | "debt:collect"
  | "reports:view"
  | "settings:business"
  | "settings:payments"
  | "settings:users";

const PERMISSIONS_BY_ROLE: Record<UserRole, Permission[]> = {
  owner: [
    "dashboard:view",
    "pos:use",
    "sales:view",
    "sales:refund",
    "products:read",
    "products:write",
    "stock:write",
    "customers:read",
    "customers:write",
    "debt:collect",
    "reports:view",
    "settings:business",
    "settings:payments",
    "settings:users",
  ],
  admin: [
    "dashboard:view",
    "pos:use",
    "sales:view",
    "sales:refund",
    "products:read",
    "products:write",
    "stock:write",
    "customers:read",
    "customers:write",
    "debt:collect",
    "reports:view",
    "settings:business",
    "settings:payments",
    "settings:users",
  ],
  manager: [
    "dashboard:view",
    "pos:use",
    "sales:view",
    "sales:refund",
    "products:read",
    "products:write",
    "stock:write",
    "customers:read",
    "customers:write",
    "debt:collect",
    "reports:view",
  ],
  cashier: [
    "pos:use",
    "sales:view",
    "products:read",
    "customers:read",
    "customers:write",
    "debt:collect",
  ],
  employee: ["pos:use", "products:read", "customers:read"],
};

// DEV: tant qu'il n'y a pas de backend, on bypass toutes les vérifications
// de permissions pour permettre la navigation libre. Passe à `false` pour
// réactiver les contrôles d'accès en production.
export const DEV_BYPASS_AUTH = true;

export function hasPermission(role: UserRole, perm: Permission): boolean {
  if (DEV_BYPASS_AUTH) return true;
  return PERMISSIONS_BY_ROLE[role]?.includes(perm) ?? false;
}

export function permissionsFor(role: UserRole): Permission[] {
  // En mode dev on retourne toutes les permissions pour que la page profil
  // affiche tout ce qui est accessible.
  if (DEV_BYPASS_AUTH) {
    return PERMISSIONS_BY_ROLE.owner;
  }
  return PERMISSIONS_BY_ROLE[role] ?? [];
}

export const ROLE_LABEL: Record<UserRole, string> = {
  owner: "Propriétaire",
  admin: "Administrateur",
  manager: "Manager",
  cashier: "Caissier",
  employee: "Employé",
};

export const ROLE_DESCRIPTION: Record<UserRole, string> = {
  owner: "Accès total à toutes les fonctionnalités, paramètres et équipe.",
  admin: "Comme propriétaire : gestion complète et paramètres.",
  manager: "Pilotage, rapports et opérations — sauf les paramètres.",
  cashier: "Encaissement, ventes et clients uniquement.",
  employee: "Caisse et consultation des produits / clients.",
};

export interface RouteGuard {
  path: string;
  permission?: Permission;
}

export const ROUTE_GUARDS: RouteGuard[] = [
  { path: "/", permission: "dashboard:view" },
  { path: "/caisse", permission: "pos:use" },
  { path: "/ventes", permission: "sales:view" },
  { path: "/produits", permission: "products:read" },
  { path: "/clients", permission: "customers:read" },
  { path: "/rapports", permission: "reports:view" },
  { path: "/parametres", permission: "settings:business" },
  { path: "/profile" },
];

export function routePermission(pathname: string): Permission | undefined {
  // En mode dev aucune route n'est protégée.
  if (DEV_BYPASS_AUTH) return undefined;
  const match = ROUTE_GUARDS.find(
    (g) => g.path === pathname || pathname.startsWith(g.path + "/")
  );
  return match?.permission;
}

export function defaultRouteFor(role: UserRole): string {
  if (hasPermission(role, "dashboard:view")) return "/";
  if (hasPermission(role, "pos:use")) return "/caisse";
  return "/profile";
}
