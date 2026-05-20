"use client";

import { useState } from "react";
import { Button, Input } from "@weza/ui";
import { formatMoney } from "@/lib/format";

export function DiscountForm({
  subtotal,
  current,
  onConfirm,
  onClear,
  onCancel,
}: {
  subtotal: number;
  current: number;
  onConfirm: (amount: number) => void;
  onClear: () => void;
  onCancel: () => void;
}) {
  const [mode, setMode] = useState<"amount" | "percent">(
    current > 0 ? "amount" : "amount"
  );
  const [amount, setAmount] = useState<number>(current);
  const [percent, setPercent] = useState<number>(0);

  const computed =
    mode === "percent"
      ? Math.min(subtotal, Math.round((subtotal * percent) / 100))
      : Math.min(subtotal, amount);

  return (
    <div className="space-y-4 p-6">
      <div className="rounded-xl bg-slate-50 p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Sous-total</span>
          <span className="font-semibold text-weza-dark">
            {formatMoney({ amount: subtotal, currency: "XAF" })}
          </span>
        </div>
      </div>

      <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setMode("amount")}
          className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold ${
            mode === "amount"
              ? "bg-white text-weza-dark shadow-sm"
              : "text-slate-500"
          }`}
        >
          Montant fixe
        </button>
        <button
          type="button"
          onClick={() => setMode("percent")}
          className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold ${
            mode === "percent"
              ? "bg-white text-weza-dark shadow-sm"
              : "text-slate-500"
          }`}
        >
          Pourcentage
        </button>
      </div>

      {mode === "amount" ? (
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Remise (FCFA)
          </label>
          <Input
            type="number"
            min={0}
            max={subtotal}
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            autoFocus
          />
        </div>
      ) : (
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Remise (%)
          </label>
          <Input
            type="number"
            min={0}
            max={100}
            value={percent || ""}
            onChange={(e) =>
              setPercent(Math.min(100, Number(e.target.value)))
            }
            autoFocus
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {[5, 10, 15, 20, 50].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPercent(p)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                {p}%
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl bg-emerald-50 p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-emerald-700">Remise appliquée</span>
          <span className="font-bold text-emerald-700">
            -{formatMoney({ amount: computed, currency: "XAF" })}
          </span>
        </div>
        <div className="mt-1 flex justify-between border-t border-emerald-200 pt-1">
          <span className="text-slate-600">Nouveau total</span>
          <span className="font-bold text-weza-dark">
            {formatMoney({ amount: subtotal - computed, currency: "XAF" })}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Annuler
        </Button>
        {current > 0 && (
          <Button type="button" variant="danger" onClick={onClear}>
            Retirer la remise
          </Button>
        )}
        <Button
          type="button"
          disabled={computed === 0}
          onClick={() => onConfirm(computed)}
        >
          Appliquer
        </Button>
      </div>
    </div>
  );
}
