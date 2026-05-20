"use client";

import { useMemo, useState } from "react";
import { Banknote } from "lucide-react";
import { Button, Input } from "@weza/ui";
import { formatMoney } from "@/lib/format";

const QUICK = [1000, 2000, 5000, 10000, 20000];

export function CashPaymentForm({
  total,
  loading,
  onConfirm,
  onBack,
}: {
  total: number;
  loading?: boolean;
  onConfirm: (received: number) => void;
  onBack: () => void;
}) {
  const [received, setReceived] = useState<number>(0);

  const quickAmounts = useMemo(() => {
    const set = new Set<number>(QUICK.filter((q) => q >= total));
    const roundedHundred = Math.ceil(total / 100) * 100;
    const roundedThousand = Math.ceil(total / 1000) * 1000;
    set.add(total);
    set.add(roundedHundred);
    set.add(roundedThousand);
    return Array.from(set).sort((a, b) => a - b).slice(0, 5);
  }, [total]);

  const change = received - total;
  const valid = received >= total;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-weza-dark p-6 text-center text-white">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Total à encaisser
        </div>
        <div className="mt-1 font-display text-3xl font-extrabold">
          {formatMoney({ amount: total, currency: "XAF" })}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Montant reçu
        </label>
        <div className="relative">
          <Banknote className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="number"
            min={0}
            value={received || ""}
            onChange={(e) => setReceived(Number(e.target.value))}
            placeholder="0"
            className="pl-9 text-lg font-semibold"
            autoFocus
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {quickAmounts.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setReceived(a)}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              {formatMoney({ amount: a, currency: "XAF" })}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`rounded-xl p-4 ${
          change < 0
            ? "bg-rose-50 text-rose-700"
            : change > 0
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-50 text-slate-600"
        }`}
      >
        <div className="text-xs font-bold uppercase tracking-wider">
          {change < 0 ? "Manquant" : "Monnaie à rendre"}
        </div>
        <div className="mt-1 font-display text-2xl font-extrabold">
          {formatMoney({ amount: Math.abs(change), currency: "XAF" })}
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button type="button" variant="secondary" onClick={onBack}>
          Retour
        </Button>
        <Button
          disabled={!valid}
          loading={loading}
          onClick={() => onConfirm(received)}
        >
          Confirmer la vente
        </Button>
      </div>
    </div>
  );
}
