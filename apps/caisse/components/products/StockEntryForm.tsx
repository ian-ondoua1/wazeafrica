"use client";

import { useState } from "react";
import type { ID, StockMovementReason } from "@weza/types";
import { Button, Input } from "@weza/ui";

const REASONS: { value: StockMovementReason; label: string; direction: 1 | -1 }[] = [
  { value: "purchase", label: "Approvisionnement", direction: 1 },
  { value: "adjustment", label: "Ajustement (inventaire)", direction: 1 },
  { value: "transfer", label: "Transfert", direction: -1 },
  { value: "loss", label: "Casse / Perte", direction: -1 },
];

export function StockEntryForm({
  productName,
  loading,
  onSubmit,
  onCancel,
}: {
  productName: string;
  loading?: boolean;
  onSubmit: (input: {
    quantity: number;
    reason: StockMovementReason;
    note?: string;
  }) => void;
  onCancel: () => void;
}) {
  const [reason, setReason] = useState<StockMovementReason>("purchase");
  const [quantity, setQuantity] = useState(0);
  const [note, setNote] = useState("");

  const direction =
    REASONS.find((r) => r.value === reason)?.direction ?? 1;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ quantity: quantity * direction, reason, note });
      }}
      className="space-y-4 p-6"
    >
      <div className="rounded-xl bg-slate-50 p-3 text-sm">
        <div className="text-xs uppercase tracking-wider text-slate-400">
          Produit
        </div>
        <div className="font-semibold text-weza-dark">{productName}</div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Motif
        </label>
        <div className="grid grid-cols-2 gap-2">
          {REASONS.map((r) => (
            <button
              type="button"
              key={r.value}
              onClick={() => setReason(r.value)}
              className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                reason === r.value
                  ? "border-weza-primary bg-weza-primary/5 text-weza-primary"
                  : "border-slate-200 text-slate-600 hover:border-weza-primary/40"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Quantité {direction === 1 ? "à ajouter" : "à retirer"}
        </label>
        <Input
          type="number"
          min={1}
          value={quantity || ""}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Note (optionnel)
        </label>
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="ex : Bon de livraison BL-2026-008"
        />
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" loading={loading}>
          Valider le mouvement
        </Button>
      </div>
    </form>
  );
}
