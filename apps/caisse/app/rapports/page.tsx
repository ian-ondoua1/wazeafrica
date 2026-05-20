"use client";

import { useEffect, useState } from "react";
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Download,
  Receipt,
  Smartphone,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { DailyReport } from "@weza/types";
import { Badge, Button, Card, cn } from "@weza/ui";
import { api, DEFAULT_STORE_ID } from "@/lib/api";
import { formatMoney, formatNumber } from "@/lib/format";
import { KPICard } from "@/components/KPICard";
import { PageHeader } from "@/components/PageHeader";

export default function RapportsPage() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [report, setReport] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.reports
      .daily(date, DEFAULT_STORE_ID)
      .then(setReport)
      .finally(() => setLoading(false));
  }, [date]);

  const shiftDate = (days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().slice(0, 10));
  };

  const isToday = date === new Date().toISOString().slice(0, 10);

  const handleExportPDF = () => {
    if (!report) return;
    const content = `Rapport du ${new Date(date).toLocaleDateString("fr-FR", { dateStyle: "full" })}

CA TOTAL : ${formatMoney(report.totalRevenue)}
Transactions : ${report.saleCount}
Panier moyen : ${formatMoney(report.averageBasket)}

RÉPARTITION PAR MODE DE PAIEMENT
- Espèces  : ${formatMoney(report.cashRevenue)}
- MoMo     : ${formatMoney(report.momoRevenue)}
- Carte    : ${formatMoney(report.cardRevenue)}
- Crédit   : ${formatMoney(report.creditRevenue)}

TOP PRODUITS
${report.topProducts.map((p, i) => `${i + 1}. ${p.name} — ${p.quantity} unités (${formatMoney(p.revenue)})`).join("\n")}
`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `weza-rapport-${date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const maxHourRevenue = report
    ? Math.max(...report.hourlyBreakdown.map((h) => h.revenue), 1)
    : 1;
  const maxTopRevenue = report
    ? Math.max(...report.topProducts.map((p) => p.revenue.amount), 1)
    : 1;
  const paymentTotal = report
    ? report.cashRevenue.amount +
      report.momoRevenue.amount +
      report.cardRevenue.amount +
      report.creditRevenue.amount
    : 0;

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <PageHeader
        title="Rapports & analytics"
        subtitle="Performance de votre commerce au jour le jour"
        actions={
          <Button
            variant="secondary"
            onClick={handleExportPDF}
            disabled={!report}
          >
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        }
      />

      <Card className="flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => shiftDate(-1)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 hover:border-weza-primary hover:text-weza-primary"
            aria-label="Jour précédent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <input
            type="date"
            value={date}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-weza-dark focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
          />
          <button
            onClick={() => shiftDate(1)}
            disabled={isToday}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 hover:border-weza-primary hover:text-weza-primary disabled:opacity-50"
            aria-label="Jour suivant"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <Badge tone="primary">
          {new Date(date).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </Badge>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Chiffre d'affaires"
          value={report ? formatMoney(report.totalRevenue) : "—"}
          icon={Wallet}
          tone="primary"
          loading={loading}
        />
        <KPICard
          label="Transactions"
          value={report ? formatNumber(report.saleCount) : "—"}
          icon={Receipt}
          tone="info"
          loading={loading}
        />
        <KPICard
          label="Panier moyen"
          value={report ? formatMoney(report.averageBasket) : "—"}
          icon={TrendingUp}
          tone="success"
          loading={loading}
        />
        <KPICard
          label="Mobile Money"
          value={report ? formatMoney(report.momoRevenue) : "—"}
          icon={Smartphone}
          tone="warning"
          loading={loading}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between p-6 pb-2">
            <div>
              <h2 className="font-bold text-weza-dark">Ventes par heure</h2>
              <p className="text-xs text-slate-500">
                Répartition du chiffre d'affaires sur la journée
              </p>
            </div>
          </div>
          <div className="px-6 pb-6">
            {report && report.saleCount > 0 ? (
              <div className="flex h-48 items-end gap-1">
                {report.hourlyBreakdown.map((h) => {
                  const ratio = (h.revenue / maxHourRevenue) * 100;
                  return (
                    <div
                      key={h.hour}
                      className="group relative flex flex-1 flex-col items-center justify-end gap-1"
                    >
                      {h.revenue > 0 && (
                        <div className="absolute -top-8 hidden whitespace-nowrap rounded-md bg-weza-dark px-2 py-1 text-[10px] font-semibold text-white group-hover:block">
                          {formatMoney({
                            amount: h.revenue,
                            currency: "XAF",
                          })}
                        </div>
                      )}
                      <div
                        className={cn(
                          "w-full rounded-t bg-gradient-to-t transition-all",
                          h.revenue > 0
                            ? "from-weza-primary to-weza-primary-light group-hover:from-weza-primary-dark"
                            : "bg-slate-100"
                        )}
                        style={{
                          height: `${Math.max(ratio, h.revenue > 0 ? 4 : 2)}%`,
                        }}
                      />
                      <div
                        className={cn(
                          "text-[9px] font-semibold",
                          h.hour % 3 === 0
                            ? "text-slate-500"
                            : "text-transparent"
                        )}
                      >
                        {String(h.hour).padStart(2, "0")}h
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center text-sm text-slate-400">
                Aucune vente sur cette journée
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="p-6 pb-2">
            <h2 className="font-bold text-weza-dark">Modes de paiement</h2>
            <p className="text-xs text-slate-500">Répartition de l'encaissement</p>
          </div>
          <div className="space-y-3 px-6 pb-6">
            <PaymentBar
              label="Espèces"
              value={report?.cashRevenue.amount ?? 0}
              total={paymentTotal}
              color="bg-emerald-500"
              icon={Banknote}
            />
            <PaymentBar
              label="Mobile Money"
              value={report?.momoRevenue.amount ?? 0}
              total={paymentTotal}
              color="bg-amber-500"
              icon={Smartphone}
            />
            <PaymentBar
              label="Carte"
              value={report?.cardRevenue.amount ?? 0}
              total={paymentTotal}
              color="bg-sky-500"
              icon={CreditCard}
            />
            <PaymentBar
              label="Crédit"
              value={report?.creditRevenue.amount ?? 0}
              total={paymentTotal}
              color="bg-rose-500"
              icon={Wallet}
            />
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 pb-2">
          <h2 className="font-bold text-weza-dark">Top produits</h2>
          <p className="text-xs text-slate-500">Meilleures ventes de la journée</p>
        </div>
        <div className="px-6 pb-6">
          {report && report.topProducts.length > 0 ? (
            <div className="space-y-3">
              {report.topProducts.map((p, i) => {
                const ratio = (p.revenue.amount / maxTopRevenue) * 100;
                return (
                  <div key={p.productId} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-weza-primary/10 text-xs font-bold text-weza-primary">
                          {i + 1}
                        </span>
                        <span className="font-semibold text-weza-dark">
                          {p.name}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-weza-dark">
                        {formatMoney(p.revenue)}
                        <span className="ml-2 text-xs text-slate-400">
                          {p.quantity} u.
                        </span>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-weza-primary to-weza-primary-light transition-all"
                        style={{ width: `${ratio}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-slate-400">
              Aucun produit vendu sur cette journée
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function PaymentBar({
  label,
  value,
  total,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  icon: typeof Banknote;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-slate-600">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>
        <span className="font-semibold text-weza-dark">
          {formatMoney({ amount: value, currency: "XAF" })}{" "}
          <span className="text-xs font-normal text-slate-400">({pct}%)</span>
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
