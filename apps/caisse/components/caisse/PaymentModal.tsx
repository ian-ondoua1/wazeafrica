"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Banknote,
  BookOpen,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import type { PaymentConfig, PaymentMethod } from "@weza/types";
import { api } from "@/lib/api";
import { formatMoney } from "@/lib/format";
import { Modal } from "@/components/Modal";
import { PaymentProviderLogo } from "@/components/PaymentProviderLogo";
import { CashPaymentForm } from "./CashPaymentForm";
import { MoMoPaymentFlow } from "./MoMoPaymentFlow";
import { CreditPaymentForm } from "./CreditPaymentForm";

type Step =
  | "method"
  | "cash"
  | "mtn_momo"
  | "orange_money"
  | "card"
  | "credit";

export interface PaymentResult {
  method: PaymentMethod;
  amount: number;
  reference?: string;
  customerId?: string;
  changeDue?: number;
}

export function PaymentModal({
  open,
  total,
  loading,
  onClose,
  onConfirm,
}: {
  open: boolean;
  total: number;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (result: PaymentResult) => void;
}) {
  const [step, setStep] = useState<Step>("method");
  const [config, setConfig] = useState<PaymentConfig | null>(null);

  useEffect(() => {
    if (open) {
      setStep("method");
      api.settings.getPayments().then(setConfig);
    }
  }, [open]);

  const cfg = config ?? {
    mtnEnabled: true,
    orangeEnabled: true,
    cashEnabled: true,
    cardEnabled: false,
    creditEnabled: true,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={step === "method" ? "Encaissement" : "Paiement"}
      size="md"
    >
      <div className="p-6">
        {step === "method" && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-weza-dark p-6 text-center text-white">
              <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
                À encaisser
              </div>
              <div className="mt-1 font-display text-4xl font-extrabold">
                {formatMoney({ amount: total, currency: "XAF" })}
              </div>
            </div>

            {cfg.cashEnabled && (
              <MethodButton
                visual={
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
                    <Banknote className="h-6 w-6" />
                  </div>
                }
                title="Espèces"
                subtitle="Paiement en cash + calcul de monnaie"
                onClick={() => setStep("cash")}
              />
            )}
            {cfg.mtnEnabled && (
              <MethodButton
                visual={<PaymentProviderLogo provider="mtn" size="xl" />}
                title="MTN Mobile Money"
                subtitle="Demande de paiement push USSD"
                onClick={() => setStep("mtn_momo")}
              />
            )}
            {cfg.orangeEnabled && (
              <MethodButton
                visual={<PaymentProviderLogo provider="orange" size="xl" />}
                title="Orange Money"
                subtitle="Demande de paiement push USSD"
                onClick={() => setStep("orange_money")}
              />
            )}
            {cfg.cardEnabled && (
              <MethodButton
                visual={
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-100 text-sky-600">
                    <CreditCard className="h-6 w-6" />
                  </div>
                }
                title="Carte bancaire"
                subtitle="TPE bancaire"
                onClick={() => setStep("card")}
              />
            )}
            {cfg.creditEnabled && (
              <MethodButton
                visual={
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-rose-100 text-rose-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                }
                title="À crédit"
                subtitle="Ardoise client (dette)"
                onClick={() => setStep("credit")}
                dashed
              />
            )}
          </div>
        )}

        {step === "cash" && (
          <CashPaymentForm
            total={total}
            loading={loading}
            onBack={() => setStep("method")}
            onConfirm={(received) =>
              onConfirm({
                method: "cash",
                amount: total,
                changeDue: received - total,
              })
            }
          />
        )}

        {(step === "mtn_momo" || step === "orange_money") && (
          <MoMoPaymentFlow
            provider={step}
            total={total}
            loading={loading}
            onBack={() => setStep("method")}
            onConfirm={(phone) =>
              onConfirm({
                method: step,
                amount: total,
                reference: `+237${phone}`,
              })
            }
          />
        )}

        {step === "card" && (
          <CashPaymentForm
            total={total}
            loading={loading}
            onBack={() => setStep("method")}
            onConfirm={() =>
              onConfirm({ method: "card", amount: total })
            }
          />
        )}

        {step === "credit" && (
          <CreditPaymentForm
            total={total}
            loading={loading}
            onBack={() => setStep("method")}
            onConfirm={(customerId) =>
              onConfirm({
                method: "credit",
                amount: total,
                customerId,
              })
            }
          />
        )}
      </div>
    </Modal>
  );
}

function MethodButton({
  visual,
  title,
  subtitle,
  onClick,
  dashed,
}: {
  visual: ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  dashed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-2xl border-2 ${
        dashed ? "border-dashed" : ""
      } border-slate-200 p-4 text-left transition hover:border-weza-primary hover:bg-weza-primary/5`}
    >
      {visual}
      <div className="flex-1">
        <div className="font-semibold text-weza-dark">{title}</div>
        <div className="text-xs text-slate-500">{subtitle}</div>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-weza-primary" />
    </button>
  );
}
