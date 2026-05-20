"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Printer, Send } from "lucide-react";
import type { BusinessSettings, PaymentMethod, Sale } from "@weza/types";
import { Button } from "@weza/ui";
import { api } from "@/lib/api";
import { formatMoney } from "@/lib/format";
import { Modal } from "@/components/Modal";
import { PaymentProviderLogo } from "@/components/PaymentProviderLogo";

const METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: "Espèces",
  mtn_momo: "MTN Money",
  orange_money: "Orange Money",
  card: "Carte",
  credit: "À crédit",
};

export function ReceiptModal({
  open,
  sale,
  changeDue,
  onClose,
  onNewSale,
}: {
  open: boolean;
  sale: Sale | null;
  changeDue?: number;
  onClose: () => void;
  onNewSale: () => void;
}) {
  const [business, setBusiness] = useState<BusinessSettings | null>(null);

  useEffect(() => {
    if (open) api.settings.getBusiness().then(setBusiness);
  }, [open]);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    if (!sale) return;
    const msg = encodeURIComponent(
      `Bonjour, voici votre ticket de caisse :\n\n` +
        `${business?.name ?? "Weza Caisse"}\n` +
        `Ticket : ${sale.number}\n` +
        sale.lines
          .map((l) => `• ${l.name} × ${l.quantity} — ${formatMoney({ amount: l.unitPrice.amount * l.quantity, currency: "XAF" })}`)
          .join("\n") +
        `\n\nTotal : ${formatMoney(sale.total)}\nMerci !`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <Modal open={open} onClose={onClose} size="sm">
      {sale && (
        <div className="p-6">
          <div className="mb-4 flex flex-col items-center gap-2 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="font-display text-lg font-extrabold text-weza-dark">
              Vente encaissée !
            </h2>
            {changeDue !== undefined && changeDue > 0 && (
              <div className="rounded-xl bg-amber-50 px-4 py-2 text-amber-900">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Monnaie à rendre :
                </span>
                <div className="font-display text-xl font-extrabold">
                  {formatMoney({ amount: changeDue, currency: "XAF" })}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 rounded-2xl border border-dashed border-slate-300 p-4 font-mono text-xs">
            {business && (
              <div className="text-center">
                <div className="font-bold text-weza-dark">{business.name}</div>
                <div className="text-slate-500">{business.address}</div>
                <div className="text-slate-500">{business.phone}</div>
                {business.rccm && (
                  <div className="text-[10px] text-slate-400">
                    RCCM : {business.rccm}
                  </div>
                )}
              </div>
            )}
            <div className="border-t border-dashed border-slate-300 pt-2 text-center">
              <div className="font-bold text-weza-dark">{sale.number}</div>
              <div className="text-slate-500">
                {new Date(sale.createdAt).toLocaleString("fr-FR")}
              </div>
            </div>
            <div className="space-y-1 border-t border-dashed border-slate-300 pt-2">
              {sale.lines.map((l, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <span className="truncate">{l.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>
                      {l.quantity} × {formatMoney(l.unitPrice)}
                    </span>
                    <span className="font-semibold text-weza-dark">
                      {formatMoney({
                        amount: l.unitPrice.amount * l.quantity,
                        currency: l.unitPrice.currency,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-0.5 border-t border-dashed border-slate-300 pt-2">
              <div className="flex justify-between text-slate-500">
                <span>Sous-total</span>
                <span>{formatMoney(sale.subtotal)}</span>
              </div>
              {sale.discount && sale.discount.amount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Remise</span>
                  <span>-{formatMoney(sale.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-weza-dark">
                <span>TOTAL</span>
                <span>{formatMoney(sale.total)}</span>
              </div>
            </div>
            <div className="space-y-1 border-t border-dashed border-slate-300 pt-2">
              {sale.payments.map((p, i) => {
                const isMomo =
                  p.method === "mtn_momo" || p.method === "orange_money";
                return (
                  <div key={i} className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      {isMomo && (
                        <PaymentProviderLogo
                          provider={p.method === "mtn_momo" ? "mtn" : "orange"}
                          size="xs"
                        />
                      )}
                      {METHOD_LABELS[p.method]}
                    </span>
                    <span className="font-semibold text-weza-dark">
                      {formatMoney(p.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
            {business?.receiptFooter && (
              <div className="border-t border-dashed border-slate-300 pt-2 text-center italic text-slate-500">
                {business.receiptFooter}
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <Button variant="secondary" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              Imprimer
            </Button>
            <Button variant="secondary" size="sm" onClick={handleWhatsApp}>
              <Send className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
          <Button size="lg" className="mt-3 w-full" onClick={onNewSale}>
            Nouvelle vente
          </Button>
        </div>
      )}
    </Modal>
  );
}
