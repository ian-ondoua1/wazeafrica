"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Percent,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import type { CartLine, Money, Product, Sale } from "@weza/types";
import { Badge, Button, Input, cn } from "@weza/ui";
import { api, DEFAULT_STORE_ID } from "@/lib/api";
import { formatMoney } from "@/lib/format";
import { Modal } from "@/components/Modal";
import { DiscountForm } from "@/components/caisse/DiscountForm";
import {
  PaymentModal,
  type PaymentResult,
} from "@/components/caisse/PaymentModal";
import { ReceiptModal } from "@/components/caisse/ReceiptModal";

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [discount, setDiscount] = useState(0);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [lastSale, setLastSale] = useState<Sale | null>(null);
  const [lastChange, setLastChange] = useState<number | undefined>(undefined);
  const searchRef = useRef<HTMLInputElement>(null);

  const reload = () =>
    api.products.list().then((p) => {
      setProducts(p);
      setLoading(false);
    });

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "F2" && lines.length > 0) {
        e.preventDefault();
        setShowPayment(true);
      } else if (e.key === "F3" && lines.length > 0) {
        e.preventDefault();
        setShowDiscount(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lines.length]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.category && set.add(p.category));
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.sku.toLowerCase().includes(s) ||
          (p.barcode ?? "").includes(search)
      );
    }
    if (category) result = result.filter((p) => p.category === category);
    return result;
  }, [products, search, category]);

  const subtotal: Money = useMemo(
    () => ({
      amount: lines.reduce(
        (a, l) => a + l.unitPrice.amount * l.quantity,
        0
      ),
      currency: "XAF",
    }),
    [lines]
  );

  const totalAmount = Math.max(0, subtotal.amount - discount);
  const articleCount = lines.reduce((a, l) => a + l.quantity, 0);

  function addToCart(p: Product) {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === p.id);
      if (idx === -1) {
        return [
          ...prev,
          {
            productId: p.id,
            name: p.name,
            unitPrice: p.price,
            quantity: 1,
          },
        ];
      }
      const next = [...prev];
      next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
      return next;
    });
  }

  function updateQty(productId: string, delta: number) {
    setLines((prev) =>
      prev
        .map((l) =>
          l.productId === productId
            ? { ...l, quantity: Math.max(0, l.quantity + delta) }
            : l
        )
        .filter((l) => l.quantity > 0)
    );
  }

  function removeLine(productId: string) {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }

  function clearCart() {
    setLines([]);
    setDiscount(0);
  }

  async function handlePayment(result: PaymentResult) {
    setCheckingOut(true);
    try {
      const sale = await api.sales.checkout({
        cart: {
          lines,
          customerId: result.customerId,
          discount: discount
            ? { amount: discount, currency: "XAF" }
            : undefined,
        },
        storeId: DEFAULT_STORE_ID,
        payments: [
          {
            method: result.method,
            amount: result.amount,
            reference: result.reference,
          },
        ],
      });
      setLastSale(sale);
      setLastChange(result.changeDue);
      setShowPayment(false);
      clearCart();
      reload();
    } finally {
      setCheckingOut(false);
    }
  }

  function startNewSale() {
    setLastSale(null);
    setLastChange(undefined);
    setTimeout(() => searchRef.current?.focus(), 50);
  }

  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_400px]">
      <section className="flex flex-col overflow-hidden border-r border-slate-200 bg-slate-50">
        <div className="space-y-4 border-b border-slate-200 bg-white px-6 py-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Code-barres, nom du produit, SKU…  (F1)"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <CategoryChip
              active={category === null}
              label="Tout"
              onClick={() => setCategory(null)}
            />
            {categories.map((c) => (
              <CategoryChip
                key={c}
                active={category === c}
                label={c}
                onClick={() => setCategory(c)}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-2xl bg-white"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-3xl">🔍</div>
              <p className="mt-3 text-sm text-slate-500">
                Aucun produit trouvé
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductTile
                  key={p.id}
                  product={p}
                  onAdd={() => addToCart(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <aside className="flex flex-col overflow-hidden bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-weza-primary/10 text-weza-primary">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-weza-dark">Panier</div>
              <div className="text-xs text-slate-500">
                {articleCount} article{articleCount > 1 ? "s" : ""}
              </div>
            </div>
          </div>
          {lines.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-slate-400 hover:text-rose-500"
            >
              Vider
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-3">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-slate-100">
                <ShoppingCart className="h-7 w-7 text-slate-400" />
              </div>
              <p className="mt-4 text-sm font-medium text-weza-dark">
                Panier vide
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Tapez sur un produit pour commencer.
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-400">
                F1 recherche · F2 encaisser · F3 remise
              </p>
            </div>
          ) : (
            lines.map((line) => (
              <div
                key={line.productId}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-weza-dark">
                    {line.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {formatMoney(line.unitPrice)} × {line.quantity}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQty(line.productId, -1)}
                    aria-label="Diminuer"
                    className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:border-weza-primary hover:text-weza-primary"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-weza-dark">
                    {line.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(line.productId, 1)}
                    aria-label="Augmenter"
                    className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:border-weza-primary hover:text-weza-primary"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => removeLine(line.productId)}
                  aria-label="Retirer"
                  className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="space-y-2 border-t border-slate-200 p-4">
            <button
              type="button"
              onClick={() => setShowDiscount(true)}
              className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              <span className="inline-flex items-center gap-2">
                <Percent className="h-3.5 w-3.5" />
                Appliquer une remise (F3)
              </span>
              {discount > 0 && (
                <span className="font-bold text-emerald-600">
                  -{formatMoney({ amount: discount, currency: "XAF" })}
                </span>
              )}
            </button>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Sous-total</span>
              <span className="font-semibold text-weza-dark">
                {formatMoney(subtotal)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-sm text-emerald-600">
                <span>Remise</span>
                <span>
                  -{formatMoney({ amount: discount, currency: "XAF" })}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-2">
              <span className="font-bold text-weza-dark">Total</span>
              <span className="font-display text-xl font-extrabold text-weza-primary">
                {formatMoney({ amount: totalAmount, currency: "XAF" })}
              </span>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={() => setShowPayment(true)}
            >
              Encaisser (F2)
            </Button>
          </div>
        )}
      </aside>

      <Modal
        open={showDiscount}
        onClose={() => setShowDiscount(false)}
        title="Remise"
      >
        <DiscountForm
          subtotal={subtotal.amount}
          current={discount}
          onConfirm={(amount) => {
            setDiscount(amount);
            setShowDiscount(false);
          }}
          onClear={() => {
            setDiscount(0);
            setShowDiscount(false);
          }}
          onCancel={() => setShowDiscount(false)}
        />
      </Modal>

      <PaymentModal
        open={showPayment}
        total={totalAmount}
        loading={checkingOut}
        onClose={() => setShowPayment(false)}
        onConfirm={handlePayment}
      />

      <ReceiptModal
        open={!!lastSale}
        sale={lastSale}
        changeDue={lastChange}
        onClose={() => setLastSale(null)}
        onNewSale={startNewSale}
      />
    </div>
  );
}

function CategoryChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold transition",
        active
          ? "bg-weza-primary text-white shadow-sm"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      )}
    >
      {label}
    </button>
  );
}

function ProductTile({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: () => void;
}) {
  const out = product.stock === 0;
  const low =
    !out &&
    product.lowStockThreshold !== undefined &&
    product.stock <= product.lowStockThreshold;
  return (
    <button
      onClick={onAdd}
      disabled={out}
      className={cn(
        "group flex flex-col rounded-2xl border bg-white p-4 text-left shadow-sm transition",
        out
          ? "cursor-not-allowed opacity-60"
          : "hover:-translate-y-0.5 hover:border-weza-primary/40 hover:shadow-card"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {product.sku}
        </span>
        {out ? (
          <Badge tone="danger">Rupture</Badge>
        ) : low ? (
          <Badge tone="warning">Stock bas</Badge>
        ) : (
          <Badge tone="default">{product.stock} en stock</Badge>
        )}
      </div>
      <div className="mt-2 flex-1 text-sm font-semibold leading-tight text-weza-dark">
        {product.name}
      </div>
      <div className="mt-3 font-display text-base font-extrabold text-weza-primary">
        {formatMoney(product.price)}
      </div>
    </button>
  );
}
