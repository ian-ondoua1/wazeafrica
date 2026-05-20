import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  PackageX,
  Receipt,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Badge, Card } from "@weza/ui";
import { api, DEFAULT_STORE_ID } from "@/lib/api";
import { formatMoney, formatNumber, formatRelativeTime } from "@/lib/format";
import { PaymentProviderLogo } from "@/components/PaymentProviderLogo";

export default async function DashboardPage() {
  const [summary, recentSales, timeseries] = await Promise.all([
    api.dashboard.summary(DEFAULT_STORE_ID),
    api.sales.list({ limit: 5 }),
    api.dashboard.salesTimeseries(DEFAULT_STORE_ID, 7),
  ]);

  const maxRevenue = Math.max(...timeseries.map((p) => p.revenue), 1);

  const stats = [
    {
      label: "Chiffre d'affaires",
      value: formatMoney(summary.todayRevenue),
      icon: Wallet,
      tone: "bg-weza-primary/10 text-weza-primary",
    },
    {
      label: "Ventes du jour",
      value: formatNumber(summary.todaySales),
      icon: Receipt,
      tone: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Clients servis",
      value: formatNumber(summary.todayCustomers),
      icon: Users,
      tone: "bg-sky-100 text-sky-600",
    },
    {
      label: "Dettes en cours",
      value: formatMoney(summary.outstandingDebt),
      icon: Banknote,
      tone: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-weza-dark sm:text-3xl">
            Bonjour Jean 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Voici l'activité de Pharmacie Akwa aujourd'hui.
          </p>
        </div>
        <Link
          href="/caisse"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-weza-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-weza-primary-dark"
        >
          Ouvrir la caisse
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5">
              <div className="flex items-center justify-between">
                <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <Badge tone="success" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12%
                </Badge>
              </div>
              <div className="mt-4 text-2xl font-extrabold text-weza-dark">
                {s.value}
              </div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between p-6 pb-2">
            <div>
              <h2 className="font-bold text-weza-dark">Ventes des 7 derniers jours</h2>
              <p className="text-xs text-slate-500">
                Évolution du chiffre d'affaires quotidien
              </p>
            </div>
            <Badge tone="primary">7 jours</Badge>
          </div>
          <div className="px-6 pb-6">
            <div className="flex h-48 items-end gap-3">
              {timeseries.map((p) => {
                const h = (p.revenue / maxRevenue) * 100;
                const date = new Date(p.date);
                const day = date.toLocaleDateString("fr-FR", { weekday: "short" });
                return (
                  <div
                    key={p.date}
                    className="group relative flex flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="absolute -top-8 hidden rounded-md bg-weza-dark px-2 py-1 text-[10px] font-semibold text-white group-hover:block">
                      {formatMoney({ amount: p.revenue, currency: "XAF" })}
                    </div>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-weza-primary to-weza-primary-light transition-all group-hover:from-weza-primary-dark"
                      style={{ height: `${Math.max(h, 4)}%` }}
                    />
                    <div className="text-[11px] font-semibold uppercase text-slate-400">
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6 pb-2">
            <h2 className="font-bold text-weza-dark">Alertes</h2>
            <p className="text-xs text-slate-500">À surveiller aujourd'hui</p>
          </div>
          <div className="space-y-3 px-6 pb-6">
            <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-600">
                <PackageX className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-weza-dark">
                  Stock bas
                </div>
                <p className="mt-0.5 text-xs text-slate-600">
                  {summary.lowStockCount} produit{summary.lowStockCount > 1 ? "s" : ""} sous le seuil d'alerte
                </p>
                <Link
                  href="/produits"
                  className="mt-2 inline-flex text-xs font-semibold text-amber-700 hover:underline"
                >
                  Voir le détail →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-rose-50 p-4">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-rose-100 text-rose-600">
                <Banknote className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-weza-dark">
                  Dettes clients
                </div>
                <p className="mt-0.5 text-xs text-slate-600">
                  {formatMoney(summary.outstandingDebt)} à recouvrer
                </p>
                <Link
                  href="/clients"
                  className="mt-2 inline-flex text-xs font-semibold text-rose-700 hover:underline"
                >
                  Voir les clients →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-sky-50 p-4">
              <div className="flex shrink-0 gap-1">
                <PaymentProviderLogo provider="mtn" size="md" />
                <PaymentProviderLogo provider="orange" size="md" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-weza-dark">
                  Mobile Money
                </div>
                <p className="mt-0.5 text-xs text-slate-600">
                  MTN et Orange Money connectés
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between p-6 pb-2">
          <div>
            <h2 className="font-bold text-weza-dark">Dernières ventes</h2>
            <p className="text-xs text-slate-500">Activité récente sur la caisse</p>
          </div>
          <Link
            href="/ventes"
            className="text-sm font-semibold text-weza-primary hover:underline"
          >
            Voir tout →
          </Link>
        </div>
        <div className="overflow-x-auto px-6 pb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="py-3">Ticket</th>
                <th>Articles</th>
                <th>Paiement</th>
                <th>Total</th>
                <th className="text-right">Quand</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentSales.map((s) => {
                const paymentMethod = s.payments[0]?.method ?? "cash";
                const paymentLabel: Record<string, string> = {
                  cash: "Espèces",
                  mtn_momo: "MTN Money",
                  orange_money: "Orange Money",
                  card: "Carte",
                  credit: "Crédit",
                };
                return (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-3 font-mono text-xs text-slate-500">
                      {s.number}
                    </td>
                    <td className="text-slate-700">
                      {s.lines.reduce((a, l) => a + l.quantity, 0)} article
                      {s.lines.reduce((a, l) => a + l.quantity, 0) > 1 ? "s" : ""}
                    </td>
                    <td>
                      <div className="inline-flex items-center gap-1.5">
                        {(paymentMethod === "mtn_momo" ||
                          paymentMethod === "orange_money") && (
                          <PaymentProviderLogo
                            provider={
                              paymentMethod === "mtn_momo" ? "mtn" : "orange"
                            }
                            size="xs"
                          />
                        )}
                        <Badge
                          tone={
                            paymentMethod === "mtn_momo"
                              ? "warning"
                              : paymentMethod === "orange_money"
                                ? "primary"
                                : "default"
                          }
                        >
                          {paymentLabel[paymentMethod] ?? paymentMethod}
                        </Badge>
                      </div>
                    </td>
                    <td className="font-semibold text-weza-dark">
                      {formatMoney(s.total)}
                    </td>
                    <td className="text-right text-xs text-slate-500">
                      {formatRelativeTime(s.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
