"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ScanBarcode,
  Package,
  Users,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "@weza/types";
import { cn } from "@weza/ui";
import { clearSession } from "@/lib/auth";
import {
  hasPermission,
  ROLE_LABEL,
  type Permission,
} from "@/lib/permissions";
import { useSession } from "@/components/useSession";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  permission?: Permission;
}

const nav: { section: string; items: NavItem[] }[] = [
  {
    section: "Opérations",
    items: [
      {
        href: "/",
        label: "Tableau de bord",
        icon: LayoutDashboard,
        permission: "dashboard:view",
      },
      {
        href: "/caisse",
        label: "Point de vente",
        icon: ScanBarcode,
        permission: "pos:use",
      },
      {
        href: "/ventes",
        label: "Ventes",
        icon: Receipt,
        permission: "sales:view",
      },
    ],
  },
  {
    section: "Catalogue",
    items: [
      {
        href: "/produits",
        label: "Produits & stock",
        icon: Package,
        permission: "products:read",
      },
      {
        href: "/clients",
        label: "Clients",
        icon: Users,
        permission: "customers:read",
      },
    ],
  },
  {
    section: "Pilotage",
    items: [
      {
        href: "/rapports",
        label: "Rapports",
        icon: BarChart3,
        permission: "reports:view",
      },
      {
        href: "/parametres",
        label: "Paramètres",
        icon: Settings,
        permission: "settings:business",
      },
    ],
  },
];

export function Sidebar({ role }: { role?: UserRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSession();
  const effectiveRole = role ?? session?.user.role;

  const filteredNav = effectiveRole
    ? nav
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) =>
              !item.permission ||
              hasPermission(effectiveRole, item.permission)
          ),
        }))
        .filter((group) => group.items.length > 0)
    : [];

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-weza-primary text-white">
          W
        </div>
        <div>
          <div className="font-display text-base font-extrabold text-weza-dark leading-tight">
            Weza
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-weza-primary">
            Caisse
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6 scrollbar-thin">
        {filteredNav.map((group) => (
          <div key={group.section}>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {group.section}
            </div>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        active
                          ? "bg-weza-primary/10 text-weza-primary"
                          : "text-slate-600 hover:bg-slate-100 hover:text-weza-dark"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {session && (
        <div className="border-t border-slate-200 p-4">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition hover:bg-slate-100"
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-weza-secondary text-sm font-bold text-white">
              {session.user.fullName
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-weza-dark">
                {session.user.fullName}
              </div>
              <div className="truncate text-xs text-slate-500">
                {ROLE_LABEL[session.user.role]}
              </div>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut className="h-3.5 w-3.5" />
            Se déconnecter
          </button>
        </div>
      )}
    </aside>
  );
}
