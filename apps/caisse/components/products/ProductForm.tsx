"use client";

import { useState } from "react";
import type { Product, ProductUnit } from "@weza/types";
import { Button, Input } from "@weza/ui";

const UNITS: { value: ProductUnit; label: string }[] = [
  { value: "piece", label: "Unité" },
  { value: "pack", label: "Pack" },
  { value: "kg", label: "Kg" },
  { value: "g", label: "g" },
  { value: "l", label: "L" },
  { value: "ml", label: "ml" },
];

export type ProductFormValues = Omit<Product, "id" | "tenantId">;

export function ProductForm({
  initialValue,
  categories,
  submitLabel = "Enregistrer",
  loading,
  onSubmit,
  onCancel,
}: {
  initialValue?: Partial<ProductFormValues>;
  categories: string[];
  submitLabel?: string;
  loading?: boolean;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initialValue?.name ?? "");
  const [sku, setSku] = useState(initialValue?.sku ?? "");
  const [barcode, setBarcode] = useState(initialValue?.barcode ?? "");
  const [category, setCategory] = useState(initialValue?.category ?? "");
  const [unit, setUnit] = useState<ProductUnit>(initialValue?.unit ?? "piece");
  const [price, setPrice] = useState<number>(initialValue?.price?.amount ?? 0);
  const [cost, setCost] = useState<number>(initialValue?.cost?.amount ?? 0);
  const [stock, setStock] = useState<number>(initialValue?.stock ?? 0);
  const [threshold, setThreshold] = useState<number>(
    initialValue?.lowStockThreshold ?? 0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      sku,
      barcode: barcode || undefined,
      category: category || undefined,
      unit,
      price: { amount: price, currency: "XAF" },
      cost: cost ? { amount: cost, currency: "XAF" } : undefined,
      stock,
      lowStockThreshold: threshold || undefined,
      archived: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nom du produit" required>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Paracétamol 500mg"
            required
          />
        </Field>
        <Field label="Référence (SKU)" required>
          <Input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="PARA-500"
            required
          />
        </Field>
        <Field label="Code-barres">
          <Input
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="3401570012345"
          />
        </Field>
        <Field label="Catégorie">
          <input
            list="cat-options"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Antidouleur"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-weza-dark focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
          />
          <datalist id="cat-options">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <Field label="Unité">
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as ProductUnit)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-weza-dark focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Prix de vente (FCFA)" required>
          <Input
            type="number"
            min={0}
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </Field>
        <Field label="Prix d'achat (FCFA)">
          <Input
            type="number"
            min={0}
            value={cost || ""}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </Field>
        <Field label="Stock actuel">
          <Input
            type="number"
            min={0}
            value={stock || ""}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </Field>
        <Field label="Seuil d'alerte stock">
          <Input
            type="number"
            min={0}
            value={threshold || ""}
            onChange={(e) => setThreshold(Number(e.target.value))}
            placeholder="ex : 10"
          />
        </Field>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
    </label>
  );
}
