"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Banknote,
  Calendar,
  CreditCard,
  Download,
  Filter,
  Receipt,
  RefreshCcw,
  Smartphone,
  Wallet,
} from "lucide-react";
import type { PaymentMethod, Sale } from "@weza/types";
import { Badge, Button, Card, cn } from "@weza/ui";
import { api } from "@/lib/api";
import { formatMoney, formatRelativeTime } from "@/lib/format";
import { hasPermission } from "@/lib/permissions";
import { EmptyState } from "@/components/EmptyState";
import { Modal } from "@/components/Modal";
import { PageHeader } from "@/components/PageHeader";
import { PaymentProviderLogo } from "@/components/PaymentProviderLogo";
import { useSession } from "@/components/useSession";

const METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: "Espèces",
  mtn_momo: "MTN Money",
  orange_money: "Orange Money",
  card: "Carte",
  credit: "Crédit",
};

const METHOD_TONES: Record<
  PaymentMethod,
  "default" | "primary" | "success" | "warning" | "info"
> = {
  cash: "success",
  mtn_momo: "warning",
  orange_money: "primary",
  card: "info",
  credit: "default",
};

const METHOD_ICONS: Record<PaymentMethod, typeof Banknote> = {
  cash: Banknote,
  mtn_momo: Smartphone,
  orange_money: Smartphone,
  card: CreditCard,
  credit: Wallet,
};

type RangePreset = "today" | "yesterday" | "7d" | "30d" | "all";

export default function VentesPage() {
  const { session } = useSession();
  const canRefund = session
    ? hasPermission(session.user.role, "sales:refund")
    : false;
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<RangePreset>("today");
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | "all">("all");
  const [detail, setDetail] = useState<Sale | null>(null);
  const [refunding, setRefunding] = useState(false);

  useEffect(() => {
    setLoading(true);
    let from: Date | undefined;
    let to: Date | undefined;
    const now = new Date();
    if (range === "today") {
      from = new Date(now);
      from.setHours(0, 0, 0, 0);
    } else if (range === "yesterday") {
      from = new Date(now);
      from.setDate(from.getDate() - 1);
      from.setHours(0, 0, 0, 0);
      to = new Date(from);
      to.setDate(to.getDate() + 1);
    } else if (range === "7d") {
      from = new Date(now);
      from.setDate(from.getDate() - 7);
    } else if (range === "30d") {
      from = new Date(now);
      from.setDate(from.getDate() - 30);
    }
    api.sales
      .list({
        from: from?.toISOString(),
        to: to?.toISOString(),
        method: methodFilter === "all" ? undefined : methodFilter,
      })
      .then((list) => {
        setSales(list);
        setLoading(false);
      });
  }, [range, methodFilter]);

  const stats = useMemo(() => {
    const completed = sales.filter((s) => s.status === "completed");
    const total = completed.reduce((sum, s) => sum + s.total.amount, 0);
    const articles = completed.reduce(
      (sum, s) => sum + s.lines.reduce((a, l) => a + l.quantity, 0),
      0
    );
    return { count: completed.length, total, articles };
  }, [sales]);

  const handleRefund = async (sale: Sale) => {
    if (
      !window.confirm(
        `Rembourser le ticket ${sale.number} (${formatMoney(sale.total)}) ?`
      )
    )
      return;
    setRefunding(true);
    try {
      const updated = await api.sales.refund(sale.id);
      setSales((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      if (detail?.id === sale.id) setDetail(updated);
    } finally {
      setRefunding(false);
    }
  };

  const handleExportCSV = () => {
    const header = [
      "Ticket",
      "Date",
      "Articles",
      "Mode",
      "Sous-total",
      "Remise",
      "Total",
      "Statut",
    ].join(";");
    const rows = sales.map((s) =>
      [
        s.number,
        new Date(s.createdAt).toLocaleString("fr-FR"),
        s.lines.reduce((a, l) => a + l.quantity, 0),
        s.payments.map((p) => METHOD_LABELS[p.method]).join("+"),
        s.subtotal.amount,
        s.discount?.amount ?? 0,
        s.total.amount,
        s.status,
      ].join(";")
    );
    const blob = new Blob([[header, ...rows].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `weza-ventes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <PageHeader
        title="Historique des ventes"
        subtitle={`${stats.count} transaction${stats.count > 1 ? "s" : ""} sur la période`}
        actions={
          <Button
            variant="secondary"
            onClick={handleExportCSV}
            disabled={sales.length === 0}
          >
            <Download className="h-4 w-4" />
            Exporter CSV
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-slate-400">
            Chiffre d'affaires
          </div>
          <div className="mt-2 font-display text-2xl font-extrabold text-weza-primary">
            {formatMoney({ amount: stats.total, currency: "XAF" })}
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-slate-400">
            Tickets
          </div>
          <div className="mt-2 font-display text-2xl font-extrabold text-weza-dark">
            {stats.count}
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-slate-400">
            Articles vendus
          </div>
          <div className="mt-2 font-display text-2xl font-extrabold text-weza-dark">
            {stats.articles}
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Calendar className="h-4 w-4" />
          Période
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ["today", "Aujourd'hui"],
              ["yesterday", "Hier"],
              ["7d", "7 jours"],
              ["30d", "30 jours"],
              ["all", "Tout"],
            ] as [RangePreset, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setRange(key)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                range === key
                  ? "bg-weza-primary text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="ml-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Filter className="h-4 w-4" />
          Mode
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ["all", "Tous"],
              ["cash", "Espèces"],
              ["mtn_momo", "MTN"],
              ["orange_money", "Orange"],
              ["credit", "Crédit"],
            ] as [PaymentMethod | "all", string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMethodFilter(key)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                methodFilter === key
                  ? "bg-weza-dark text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {label}
            </button>
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
        ) : sales.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="Aucune vente"
            description="Aucune transaction sur la période sélectionnée."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-3">Ticket</th>
                  <th className="px-2 py-3">Articles</th>
                  <th className="px-2 py-3">Paiement</th>
                  <th className="px-2 py-3 text-right">Total</th>
                  <th className="px-2 py-3">Statut</th>
                  <th className="px-6 py-3 text-right">Quand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sales.map((s) => {
                  const articleCount = s.lines.reduce(
                    (a, l) => a + l.quantity,
                    0
                  );
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setDetail(s)}
                      className="cursor-pointer hover:bg-slate-50"
                    >
                      <td className="px-6 py-3 font-mono text-xs text-slate-600">
                        {s.number}
                      </td>
                      <td className="px-2 py-3 text-slate-700">
                        {articleCount} article{articleCount > 1 ? "s" : ""}
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {s.payments.map((p, i) => {
                            const isMomo =
                              p.method === "mtn_momo" ||
                              p.method === "orange_money";
                            return (
                              <div
                                key={i}
                                className="inline-flex items-center gap-1.5"
                              >
                                {isMomo && (
                                  <PaymentProviderLogo
                                    provider={
                                      p.method === "mtn_momo"
                                        ? "mtn"
                                        : "orange"
                                    }
                                    size="xs"
                                  />
                                )}
                                <Badge tone={METHOD_TONES[p.method]}>
                                  {METHOD_LABELS[p.method]}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-2 py-3 text-right font-semibold text-weza-dark">
                        {formatMoney(s.total)}
                      </td>
                      <td className="px-2 py-3">
                        {s.status === "completed" ? (
                          <Badge tone="success">Encaissée</Badge>
                        ) : s.status === "refunded" ? (
                          <Badge tone="danger">Remboursée</Badge>
                        ) : (
                          <Badge>{s.status}</Badge>
                        )}
                      </td>
                      <td className="px-6 py-3 text-right text-xs text-slate-500">
                        {formatRelativeTime(s.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        title="Détail du ticket"
        size="md"
      >
        {detail && (
          <div className="space-y-5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-sm text-slate-500">
                  {detail.number}
                </div>
                <div className="text-xs text-slate-400">
                  {new Date(detail.createdAt).toLocaleString("fr-FR")}
                </div>
              </div>
              {detail.status === "completed" ? (
                <Badge tone="success">Encaissée</Badge>
              ) : (
                <Badge tone="danger">Remboursée</Badge>
              )}
            </div>

            <div className="rounded-xl border border-slate-100">
              {detail.lines.map((l, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0"
                >
                  <div>
                    <div className="text-sm font-semibold text-weza-dark">
                      {l.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatMoney(l.unitPrice)} × {l.quantity}
                    </div>
                  </div>
                  <div className="font-semibold text-weza-dark">
                    {formatMoney({
                      amount: l.unitPrice.amount * l.quantity,
                      currency: l.unitPrice.currency,
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Sous-total</span>
                <span>{formatMoney(detail.subtotal)}</span>
              </div>
              {detail.discount && detail.discount.amount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Remise</span>
                  <span>-{formatMoney(detail.discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-dashed border-slate-200 pt-2 text-base font-bold">
                <span>Total</span>
                <span className="text-weza-primary">
                  {formatMoney(detail.total)}
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Encaissement
              </h4>
              <ul className="space-y-2">
                {detail.payments.map((p, i) => {
                  const Icon = METHOD_ICONS[p.method];
                  const isMomo =
                    p.method === "mtn_momo" || p.method === "orange_money";
                  return (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        {isMomo ? (
                          <PaymentProviderLogo
                            provider={
                              p.method === "mtn_momo" ? "mtn" : "orange"
                            }
                            size="sm"
                          />
                        ) : (
                          <Icon className="h-4 w-4 text-slate-500" />
                        )}
                        <span className="text-sm font-semibold text-weza-dark">
                          {METHOD_LABELS[p.method]}
                        </span>
                      </div>
                      <span className="font-semibold text-weza-dark">
                        {formatMoney(p.amount)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {detail.status === "completed" && canRefund && (
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <Button
                  variant="danger"
                  onClick={() => handleRefund(detail)}
                  loading={refunding}
                >
                  <RefreshCcw className="h-4 w-4" />
                  Rembourser
                </Button>
              </div>
            )}
            {detail.status === "completed" && !canRefund && (
              <p className="border-t border-slate-100 pt-4 text-center text-xs text-slate-400">
                Seul un manager ou administrateur peut effectuer un remboursement.
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
