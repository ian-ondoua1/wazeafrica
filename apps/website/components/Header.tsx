"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { products } from "@/lib/products";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg">
      <div className="container-weza flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-weza-primary text-white">
            W
          </span>
          <span className="text-weza-dark">Weza</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link href="/" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-weza-primary">
            Accueil
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-weza-primary">
              Produits
              <ChevronDown className="h-4 w-4" />
            </button>
            {productsOpen && (
              <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-card">
                  {products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/produits/${p.slug}`}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50"
                    >
                      <span className="text-xl">{p.emoji}</span>
                      <div>
                        <div className="font-semibold text-weza-dark">{p.shortName}</div>
                        <div className="text-xs text-slate-500">{p.description}</div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/tarifs"
                    className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-semibold text-weza-primary hover:bg-weza-primary/10"
                  >
                    → Voir tous les tarifs
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/tarifs" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-weza-primary">
            Tarifs
          </Link>
          <Link href="/a-propos" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-weza-primary">
            À propos
          </Link>
          <Link href="/contact" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-weza-primary">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/demo" className="text-sm font-semibold text-slate-700 hover:text-weza-primary">
            Connexion
          </Link>
          <Link href="/demo" className="btn-primary px-5 py-2.5 text-sm">
            Essai gratuit
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-weza space-y-1 py-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-50">
              Accueil
            </Link>
            <div className="h-px bg-slate-100" />
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Produits
            </div>
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/produits/${p.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                <span>{p.emoji}</span>
                <span>{p.shortName}</span>
              </Link>
            ))}
            <div className="h-px bg-slate-100" />
            <Link href="/tarifs" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-50">
              Tarifs
            </Link>
            <Link href="/a-propos" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-50">
              À propos
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-50">
              Contact
            </Link>
            <Link href="/demo" onClick={() => setMobileOpen(false)} className="btn-primary mt-3 w-full text-sm">
              Essai gratuit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
