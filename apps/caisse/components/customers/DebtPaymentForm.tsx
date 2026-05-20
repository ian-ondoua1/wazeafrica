"use client";

import { useState } from "react";
import { Banknote, CreditCard, Smartphone } from "lucide-react";
import type { Customer, PaymentMethod } from "@weza/types";
import { Button, Input } from "@weza/ui";
import { formatMoney } from "@/lib/format";
import { PaymentProviderLogo } from "@/components/PaymentProviderLogo";

const METHODS: { value: PaymentMethod; label: string; icon: typeof Banknote }[] = [
  { value: "cash", label: "Espèces", icon: Banknote },
  { value: "mtn_momo", label: "MTN Money", icon: Smartphone },
  { value: "orange_money", label: "Orange Money", icon: Smartphone },
  { value: "card", label: "Carte", icon: CreditCard },
];

export function DebtPaymentForm({
  customer,
  loading,
  onSubmit,
  onCancel,
}: {
  customer: Customer;
  loading?: boolean;
  onSubmit: (input: {
    amount: number;
    method: PaymentMethod;
    note?: string;
  }) => void;
  onCancel: () => void;
}) {
  const [amount, setAmount] = useState(customer.debt.amount);
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [note, setNote] = useState("");

  const remaining = Math.max(0, customer.debt.amount - amount);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ amount, method, note });
      }}
      className="space-y-4 p-6"
    >
      <div className="rounded-2xl bg-weza-dark p-6 text-white">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Dette actuelle de {customer.fullName}
        </div>
        <div className="mt-2 font-display text-3xl font-extrabold">
          {formatMoney(customer.debt)}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Montant à régler
        </label>
        <Input
          type="number"
          min={1}
          max={customer.debt.amount}
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {[25, 50, 100].map((pct) => (
            <button
              type="button"
              key={pct}
              onClick={() =>
                setAmount(Math.round((customer.debt.amount * pct) / 100))
              }
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200"
            >
              {pct}%
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Mode de paiement
        </label>
        <div className="grid grid-cols-2 gap-2">
          {METHODS.map((m) => {
            const Icon = m.icon;
            const active = method === m.value;
            const isMomo =
              m.value === "mtn_momo" || m.value === "orange_money";
            return (
              <button
                type="button"
                key={m.value}
                onClick={() => setMethod(m.value)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "border-weza-primary bg-weza-primary/5 text-weza-primary"
                    : "border-slate-200 text-slate-600 hover:border-weza-primary/40"
                }`}
              >
                {isMomo ? (
                  <PaymentProviderLogo
                    provider={m.value === "mtn_momo" ? "mtn" : "orange"}
                    size="xs"
                  />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Note (optionnel)
        </label>
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="ex : Acompte, règlement total..."
        />
      </div>

      <div className="rounded-xl bg-slate-50 p-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Reste à payer après cette opération</span>
          <span className="font-bold text-weza-dark">
            {formatMoney({ amount: remaining, currency: "XAF" })}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" loading={loading}>
          Enregistrer le règlement
        </Button>
      </div>
    </form>
  );
}
