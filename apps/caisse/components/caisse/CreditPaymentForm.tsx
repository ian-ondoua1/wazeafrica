"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, UserPlus } from "lucide-react";
import type { Customer } from "@weza/types";
import { Button, Input } from "@weza/ui";
import { api } from "@/lib/api";
import { formatMoney } from "@/lib/format";

export function CreditPaymentForm({
  total,
  loading,
  onConfirm,
  onBack,
}: {
  total: number;
  loading?: boolean;
  onConfirm: (customerId: string) => void;
  onBack: () => void;
}) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    api.customers.list().then(setCustomers);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return customers.slice(0, 6);
    const s = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.fullName.toLowerCase().includes(s) ||
        (c.phone ?? "").toLowerCase().includes(s)
    );
  }, [customers, search]);

  const createCustomer = async () => {
    if (!newName) return;
    const c = await api.customers.create({
      fullName: newName,
      phone: newPhone || undefined,
    });
    setCustomers((prev) => [...prev, c]);
    setSelected(c);
    setCreatingNew(false);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-amber-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          Vente à crédit (ardoise)
        </div>
        <div className="mt-1 font-display text-2xl font-extrabold text-amber-900">
          {formatMoney({ amount: total, currency: "XAF" })}
        </div>
        <p className="mt-1 text-xs text-amber-700">
          Cette somme sera ajoutée à la dette du client sélectionné.
        </p>
      </div>

      {!creatingNew ? (
        <>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Client
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un client..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="max-h-60 space-y-1.5 overflow-y-auto scrollbar-thin">
            {filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelected(c)}
                className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                  selected?.id === c.id
                    ? "border-weza-primary bg-weza-primary/5"
                    : "border-slate-200 hover:border-weza-primary/40"
                }`}
              >
                <div>
                  <div className="text-sm font-semibold text-weza-dark">
                    {c.fullName}
                  </div>
                  <div className="text-xs text-slate-500">{c.phone ?? "—"}</div>
                </div>
                {c.debt.amount > 0 && (
                  <div className="text-right text-xs">
                    <div className="font-bold text-rose-500">
                      {formatMoney(c.debt)}
                    </div>
                    <div className="text-slate-400">en cours</div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCreatingNew(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:border-weza-primary hover:text-weza-primary"
          >
            <UserPlus className="h-4 w-4" />
            Créer un nouveau client
          </button>
        </>
      ) : (
        <div className="space-y-3 rounded-xl border border-slate-200 p-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nom complet du client"
          />
          <Input
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="+237 6 XX XX XX XX"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setCreatingNew(false)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={!newName}
              onClick={createCustomer}
            >
              Créer
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button type="button" variant="secondary" onClick={onBack}>
          Retour
        </Button>
        <Button
          disabled={!selected}
          loading={loading}
          onClick={() => selected && onConfirm(selected.id)}
        >
          {selected
            ? `Enregistrer sur ${selected.fullName.split(" ")[0]}`
            : "Sélectionner un client"}
        </Button>
      </div>
    </div>
  );
}
