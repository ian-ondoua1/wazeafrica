"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Banknote,
  Edit3,
  Phone,
  Plus,
  Search,
  TrendingDown,
  Users,
  Wallet,
} from "lucide-react";
import type {
  Customer,
  DebtPayment,
  PaymentMethod,
  Sale,
} from "@weza/types";
import { Badge, Button, Card, Input, cn } from "@weza/ui";
import { api } from "@/lib/api";
import { formatMoney, formatRelativeTime } from "@/lib/format";
import { hasPermission } from "@/lib/permissions";
import { EmptyState } from "@/components/EmptyState";
import { KPICard } from "@/components/KPICard";
import { Modal } from "@/components/Modal";
import { PageHeader } from "@/components/PageHeader";
import { useSession } from "@/components/useSession";
import {
  CustomerForm,
  type CustomerFormValues,
} from "@/components/customers/CustomerForm";
import { DebtPaymentForm } from "@/components/customers/DebtPaymentForm";

type Tab = "all" | "debts";

export default function ClientsPage() {
  const { session } = useSession();
  const role = session?.user.role;
  const canWrite = role ? hasPermission(role, "customers:write") : false;
  const canCollect = role ? hasPermission(role, "debt:collect") : false;
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [detail, setDetail] = useState<Customer | null>(null);
  const [payTarget, setPayTarget] = useState<Customer | null>(null);
  const [history, setHistory] = useState<Sale[]>([]);
  const [payments, setPayments] = useState<DebtPayment[]>([]);
  const [saving, setSaving] = useState(false);

  const reload = async () => {
    const list = await api.customers.list();
    setCustomers(list);
  };

  useEffect(() => {
    reload().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!detail) return;
    Promise.all([
      api.customers.history(detail.id),
      api.customers.debtPayments(detail.id),
    ]).then(([h, p]) => {
      setHistory(h);
      setPayments(p);
    });
  }, [detail]);

  const filtered = useMemo(() => {
    let result = customers;
    if (tab === "debts") result = result.filter((c) => c.debt.amount > 0);
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.fullName.toLowerCase().includes(s) ||
          (c.phone ?? "").toLowerCase().includes(s)
      );
    }
    return result;
  }, [customers, tab, search]);

  const stats = useMemo(() => {
    const totalCustomers = customers.length;
    const customersWithDebt = customers.filter(
      (c) => c.debt.amount > 0
    ).length;
    const totalDebt = customers.reduce((sum, c) => sum + c.debt.amount, 0);
    return { totalCustomers, customersWithDebt, totalDebt };
  }, [customers]);

  const handleCreate = async (values: CustomerFormValues) => {
    setSaving(true);
    try {
      await api.customers.create(values);
      await reload();
      setShowCreate(false);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (values: CustomerFormValues) => {
    if (!editing) return;
    setSaving(true);
    try {
      await api.customers.update(editing.id, values);
      await reload();
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const handlePayment = async (input: {
    amount: number;
    method: PaymentMethod;
    note?: string;
  }) => {
    if (!payTarget) return;
    setSaving(true);
    try {
      await api.customers.payDebt({
        customerId: payTarget.id,
        amount: input.amount,
        method: input.method,
        note: input.note,
      });
      await reload();
      setPayTarget(null);
      if (detail?.id === payTarget.id) {
        const refreshed = await api.customers.get(payTarget.id);
        setDetail(refreshed);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleWhatsAppReminder = (customer: Customer) => {
    const phone = (customer.phone ?? "").replace(/\D/g, "");
    if (!phone) {
      alert("Aucun numéro de téléphone enregistré pour ce client.");
      return;
    }
    const msg = encodeURIComponent(
      `Bonjour ${customer.fullName}, nous vous rappelons votre solde en attente de ${formatMoney(customer.debt)} à la Pharmacie Akwa. Merci !`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <PageHeader
        title="Clients & dettes"
        subtitle={`${stats.totalCustomers} clients · ${stats.customersWithDebt} avec dette`}
        actions={
          canWrite && (
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="h-4 w-4" />
              Nouveau client
            </Button>
          )
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KPICard
          label="Total clients"
          value={stats.totalCustomers}
          icon={Users}
          tone="info"
        />
        <KPICard
          label="Clients avec dette"
          value={stats.customersWithDebt}
          icon={AlertCircle}
          tone="warning"
        />
        <KPICard
          label="Dettes en cours"
          value={formatMoney({ amount: stats.totalDebt, currency: "XAF" })}
          icon={TrendingDown}
          tone="danger"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Chercher un client par nom ou téléphone..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
          <TabButton active={tab === "all"} onClick={() => setTab("all")}>
            Tous
          </TabButton>
          <TabButton active={tab === "debts"} onClick={() => setTab("debts")}>
            Dettes en cours
          </TabButton>
        </div>
      </div>

      <Card>
        {loading ? (
          <div className="space-y-2 p-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Aucun client"
            description="Aucun client ne correspond à votre recherche."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-3">Client</th>
                  <th className="px-2 py-3">Téléphone</th>
                  <th className="px-2 py-3 text-right">Dette</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3">
                      <button
                        onClick={() => setDetail(c)}
                        className="flex items-center gap-3 text-left"
                      >
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-weza-secondary text-sm font-bold text-white">
                          {c.fullName
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-weza-dark hover:text-weza-primary">
                            {c.fullName}
                          </div>
                          {c.email && (
                            <div className="text-xs text-slate-500">
                              {c.email}
                            </div>
                          )}
                        </div>
                      </button>
                    </td>
                    <td className="px-2 py-3 text-slate-600">
                      {c.phone ?? "—"}
                    </td>
                    <td className="px-2 py-3 text-right">
                      {c.debt.amount > 0 ? (
                        <Badge tone="danger">{formatMoney(c.debt)}</Badge>
                      ) : (
                        <span className="text-xs text-slate-400">À jour</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {c.debt.amount > 0 && canCollect && (
                          <button
                            onClick={() => setPayTarget(c)}
                            title="Enregistrer un règlement"
                            className="grid h-8 w-8 place-items-center rounded-lg text-emerald-600 hover:bg-emerald-50"
                          >
                            <Wallet className="h-4 w-4" />
                          </button>
                        )}
                        {c.debt.amount > 0 && (
                          <button
                            onClick={() => handleWhatsAppReminder(c)}
                            title="Rappel WhatsApp"
                            className="grid h-8 w-8 place-items-center rounded-lg text-emerald-600 hover:bg-emerald-50"
                          >
                            <Phone className="h-4 w-4" />
                          </button>
                        )}
                        {canWrite && (
                          <button
                            onClick={() => setEditing(c)}
                            title="Modifier"
                            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-weza-dark"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
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

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Nouveau client"
      >
        <CustomerForm
          loading={saving}
          onSubmit={handleCreate}
          onCancel={() => setShowCreate(false)}
        />
      </Modal>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Modifier le client"
      >
        {editing && (
          <CustomerForm
            initialValue={editing}
            submitLabel="Mettre à jour"
            loading={saving}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      <Modal
        open={!!payTarget}
        onClose={() => setPayTarget(null)}
        title="Règlement de dette"
      >
        {payTarget && (
          <DebtPaymentForm
            customer={payTarget}
            loading={saving}
            onSubmit={handlePayment}
            onCancel={() => setPayTarget(null)}
          />
        )}
      </Modal>

      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        title="Fiche client"
        size="lg"
      >
        {detail && (
          <div className="space-y-6 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-weza-secondary text-lg font-bold text-white">
                  {detail.fullName
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="font-display text-lg font-extrabold text-weza-dark">
                    {detail.fullName}
                  </div>
                  <div className="text-sm text-slate-500">
                    {detail.phone ?? "Sans numéro"}
                  </div>
                </div>
              </div>
              {detail.debt.amount > 0 && canCollect && (
                <Button
                  size="sm"
                  onClick={() => {
                    setPayTarget(detail);
                  }}
                >
                  <Banknote className="h-4 w-4" />
                  Encaisser
                </Button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Stat label="Dette" value={formatMoney(detail.debt)} />
              <Stat label="Ventes" value={String(history.length)} />
              <Stat label="Règlements" value={String(payments.length)} />
            </div>

            {detail.notes && (
              <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                {detail.notes}
              </div>
            )}

            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Historique d'achats
              </h4>
              {history.length === 0 ? (
                <p className="text-sm text-slate-500">Aucun achat enregistré.</p>
              ) : (
                <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">
                  {history.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <div>
                        <div className="font-mono text-xs text-slate-500">
                          {s.number}
                        </div>
                        <div className="text-xs text-slate-400">
                          {formatRelativeTime(s.createdAt)}
                        </div>
                      </div>
                      <div className="font-semibold text-weza-dark">
                        {formatMoney(s.total)}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Règlements de dette
              </h4>
              {payments.length === 0 ? (
                <p className="text-sm text-slate-500">Aucun règlement enregistré.</p>
              ) : (
                <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">
                  {payments.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <div>
                        <div className="text-sm font-semibold text-weza-dark">
                          {formatMoney(p.amount)}
                        </div>
                        <div className="text-xs text-slate-400">
                          {p.method} · {formatRelativeTime(p.createdAt)}
                        </div>
                      </div>
                      {p.note && (
                        <div className="text-xs text-slate-500">{p.note}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
        active
          ? "bg-white text-weza-dark shadow-sm"
          : "text-slate-500 hover:text-weza-dark"
      )}
    >
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="text-xs uppercase tracking-wider text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-base font-bold text-weza-dark">{value}</div>
    </div>
  );
}
