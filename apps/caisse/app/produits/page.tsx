"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  Edit3,
  Package,
  Plus,
  Search,
  TrendingUp,
} from "lucide-react";
import type { Product, StockMovement } from "@weza/types";
import { Badge, Button, Card, Input, cn } from "@weza/ui";
import { api, DEFAULT_STORE_ID } from "@/lib/api";
import { formatMoney } from "@/lib/format";
import { hasPermission } from "@/lib/permissions";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { Modal } from "@/components/Modal";
import { PageHeader } from "@/components/PageHeader";
import { StockBadge } from "@/components/StockBadge";
import { useSession } from "@/components/useSession";
import {
  ProductForm,
  type ProductFormValues,
} from "@/components/products/ProductForm";
import { StockEntryForm } from "@/components/products/StockEntryForm";

const REASON_LABELS: Record<StockMovement["reason"], string> = {
  sale: "Vente",
  purchase: "Approvisionnement",
  adjustment: "Ajustement",
  transfer: "Transfert",
  loss: "Casse / Perte",
};

const REASON_TONES: Record<StockMovement["reason"], "default" | "primary" | "success" | "warning" | "danger" | "info"> = {
  sale: "primary",
  purchase: "success",
  adjustment: "info",
  transfer: "default",
  loss: "danger",
};

export default function ProduitsPage() {
  const { session } = useSession();
  const role = session?.user.role;
  const canWrite = role ? hasPermission(role, "products:write") : false;
  const canStock = role ? hasPermission(role, "stock:write") : false;
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [stockTarget, setStockTarget] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  const reload = async () => {
    const [list, cats, moves] = await Promise.all([
      api.products.list(),
      api.products.categories(),
      api.stock.movements({ limit: 8 }),
    ]);
    setProducts(list);
    setCategories(cats);
    setMovements(moves);
  };

  useEffect(() => {
    reload().finally(() => setLoading(false));
  }, []);

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

  const stats = useMemo(() => {
    const total = products.length;
    const lowStock = products.filter(
      (p) =>
        p.lowStockThreshold !== undefined && p.stock <= p.lowStockThreshold
    ).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    const stockValue = products.reduce(
      (sum, p) => sum + p.price.amount * p.stock,
      0
    );
    return { total, lowStock, outOfStock, stockValue };
  }, [products]);

  const handleCreate = async (values: ProductFormValues) => {
    setSaving(true);
    try {
      await api.products.create(values);
      await reload();
      setShowCreate(false);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (values: ProductFormValues) => {
    if (!editing) return;
    setSaving(true);
    try {
      await api.products.update(editing.id, values);
      await reload();
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async (product: Product) => {
    if (
      !window.confirm(
        `Archiver "${product.name}" ? Il ne sera plus disponible à la vente.`
      )
    )
      return;
    await api.products.archive(product.id);
    await reload();
  };

  const handleStockEntry = async (input: {
    quantity: number;
    reason: StockMovement["reason"];
    note?: string;
  }) => {
    if (!stockTarget) return;
    setSaving(true);
    try {
      await api.stock.addEntry({
        productId: stockTarget.id,
        delta: input.quantity,
        reason: input.reason,
        note: input.note,
        storeId: DEFAULT_STORE_ID,
      });
      await reload();
      setStockTarget(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <PageHeader
        title="Produits & stock"
        subtitle={`${products.length} produits référencés`}
        actions={
          canWrite && (
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="h-4 w-4" />
              Ajouter un produit
            </Button>
          )
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat label="Articles actifs" value={String(stats.total)} icon={Package} />
        <MiniStat
          label="Stock bas"
          value={String(stats.lowStock)}
          icon={AlertTriangle}
          tone="warning"
        />
        <MiniStat
          label="En rupture"
          value={String(stats.outOfStock)}
          icon={AlertTriangle}
          tone="danger"
        />
        <MiniStat
          label="Valeur stock"
          value={formatMoney({ amount: stats.stockValue, currency: "XAF" })}
          icon={TrendingUp}
          tone="success"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, SKU ou code-barres..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            active={category === null}
            label="Toutes"
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

      <Card>
        {loading ? (
          <div className="space-y-2 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Package}
            title="Aucun produit"
            description="Aucun produit ne correspond à votre recherche."
            action={
              <Button onClick={() => setShowCreate(true)}>
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-3">Produit</th>
                  <th className="px-2 py-3">SKU</th>
                  <th className="px-2 py-3">Catégorie</th>
                  <th className="px-2 py-3 text-right">Prix</th>
                  <th className="px-2 py-3 text-center">Stock</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3">
                      <div className="font-semibold text-weza-dark">
                        {p.name}
                      </div>
                      {p.barcode && (
                        <div className="font-mono text-[11px] text-slate-400">
                          {p.barcode}
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-3 font-mono text-xs text-slate-500">
                      {p.sku}
                    </td>
                    <td className="px-2 py-3 text-slate-600">
                      {p.category ?? "—"}
                    </td>
                    <td className="px-2 py-3 text-right font-semibold text-weza-dark">
                      {formatMoney(p.price)}
                    </td>
                    <td className="px-2 py-3 text-center">
                      <StockBadge
                        stock={p.stock}
                        threshold={p.lowStockThreshold}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {canStock && (
                          <button
                            onClick={() => setStockTarget(p)}
                            aria-label="Mouvement de stock"
                            title="Mouvement de stock"
                            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        )}
                        {canWrite && (
                          <>
                            <button
                              onClick={() => setEditing(p)}
                              aria-label="Modifier"
                              title="Modifier"
                              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-weza-dark"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleArchive(p)}
                              aria-label="Archiver"
                              title="Archiver"
                              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                            >
                              <Archive className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {!canWrite && !canStock && (
                          <span className="text-xs text-slate-300">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {movements.length > 0 && (
        <Card>
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="font-bold text-weza-dark">
              Derniers mouvements de stock
            </h2>
            <p className="text-xs text-slate-500">
              Entrées, sorties et ajustements récents
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {movements.map((m) => {
              const product = products.find((p) => p.id === m.productId);
              return (
                <div
                  key={m.id}
                  className="flex items-center justify-between px-6 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Badge tone={REASON_TONES[m.reason]}>
                      {REASON_LABELS[m.reason]}
                    </Badge>
                    <div>
                      <div className="text-sm font-semibold text-weza-dark">
                        {product?.name ?? "—"}
                      </div>
                      {m.ref && (
                        <div className="font-mono text-[11px] text-slate-400">
                          {m.ref}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "font-bold",
                      m.delta > 0 ? "text-emerald-600" : "text-rose-500"
                    )}
                  >
                    {m.delta > 0 ? "+" : ""}
                    {m.delta}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Nouveau produit"
        size="lg"
      >
        <ProductForm
          categories={categories}
          loading={saving}
          onSubmit={handleCreate}
          onCancel={() => setShowCreate(false)}
        />
      </Modal>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Modifier le produit"
        size="lg"
      >
        {editing && (
          <ProductForm
            initialValue={editing}
            categories={categories}
            loading={saving}
            submitLabel="Mettre à jour"
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      <Modal
        open={!!stockTarget}
        onClose={() => setStockTarget(null)}
        title="Mouvement de stock"
      >
        {stockTarget && (
          <StockEntryForm
            productName={stockTarget.name}
            loading={saving}
            onSubmit={handleStockEntry}
            onCancel={() => setStockTarget(null)}
          />
        )}
      </Modal>
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
        "rounded-full px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "bg-weza-primary text-white shadow-sm"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      )}
    >
      {label}
    </button>
  );
}

function MiniStat({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: typeof Package;
  tone?: "default" | "warning" | "danger" | "success";
}) {
  const tones = {
    default: "bg-slate-100 text-slate-600",
    warning: "bg-amber-100 text-amber-600",
    danger: "bg-rose-100 text-rose-600",
    success: "bg-emerald-100 text-emerald-600",
  };
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 text-2xl font-extrabold text-weza-dark">
        {value}
      </div>
      <div className="text-xs text-slate-500">{label}</div>
    </Card>
  );
}
