"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  LogOut,
  Search,
  Settings,
  Shield,
  User,
  WifiOff,
} from "lucide-react";
import { clearSession } from "@/lib/auth";
import { hasPermission, ROLE_LABEL } from "@/lib/permissions";
import { useSession } from "@/components/useSession";

export function Topbar() {
  const router = useRouter();
  const { session } = useSession();
  const [online, setOnline] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Rechercher un produit, client, ticket…"
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-weza-dark placeholder:text-slate-400 focus:border-weza-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
        />
      </div>

      <div className="flex items-center gap-3">
        {!online ? (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            <WifiOff className="h-3.5 w-3.5" />
            Hors ligne
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            En ligne
          </div>
        )}
        <button
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-600 hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-weza-primary" />
        </button>

        {session && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-slate-100"
            >
              <div className="grid h-9 w-9 place-items-center rounded-full bg-weza-secondary text-sm font-bold text-white">
                {session.user.fullName
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="hidden text-left lg:block">
                <div className="text-sm font-semibold text-weza-dark">
                  {session.user.fullName}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">
                  {ROLE_LABEL[session.user.role]}
                </div>
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
                <div className="border-b border-slate-100 p-4">
                  <div className="text-sm font-bold text-weza-dark">
                    {session.user.fullName}
                  </div>
                  <div className="text-xs text-slate-500">
                    {session.user.email}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-weza-primary/10 px-2 py-0.5 text-[11px] font-semibold text-weza-primary">
                    <Shield className="h-3 w-3" />
                    {ROLE_LABEL[session.user.role]}
                  </div>
                </div>
                <div className="p-1">
                  <MenuLink
                    href="/profile"
                    icon={User}
                    label="Mon profil"
                    onSelect={() => setMenuOpen(false)}
                  />
                  {hasPermission(session.user.role, "settings:business") && (
                    <MenuLink
                      href="/parametres"
                      icon={Settings}
                      label="Paramètres"
                      onSelect={() => setMenuOpen(false)}
                    />
                  )}
                </div>
                <div className="border-t border-slate-100 p-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function MenuLink({
  href,
  icon: Icon,
  label,
  onSelect,
}: {
  href: string;
  icon: typeof User;
  label: string;
  onSelect: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
    >
      <Icon className="h-4 w-4 text-slate-400" />
      {label}
    </Link>
  );
}
