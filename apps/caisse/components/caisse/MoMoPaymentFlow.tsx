"use client";

import { useEffect, useState } from "react";
import { RotateCcw, XCircle } from "lucide-react";
import { Button, Input } from "@weza/ui";
import { formatMoney } from "@/lib/format";
import { PaymentProviderLogo } from "@/components/PaymentProviderLogo";

type Provider = "mtn_momo" | "orange_money";
type Status = "idle" | "pending" | "success" | "error";

export function MoMoPaymentFlow({
  provider,
  total,
  loading,
  onConfirm,
  onBack,
}: {
  provider: Provider;
  total: number;
  loading?: boolean;
  onConfirm: (phone: string) => void;
  onBack: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const label = provider === "mtn_momo" ? "MTN Mobile Money" : "Orange Money";
  const logoKey = provider === "mtn_momo" ? "mtn" : "orange";

  useEffect(() => {
    if (status !== "pending") return;
    const timer = setTimeout(() => {
      const ok = Math.random() > 0.15;
      if (ok) {
        setStatus("success");
        setTimeout(() => onConfirm(phone), 600);
      } else {
        setStatus("error");
        setErrorMsg(
          "Le client n'a pas validé la transaction sur son téléphone."
        );
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [status, phone, onConfirm]);

  const sendRequest = () => {
    if (phone.replace(/\D/g, "").length < 9) return;
    setErrorMsg(null);
    setStatus("pending");
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-weza-dark p-6 text-center text-white">
        <div className="mb-2 flex justify-center">
          <PaymentProviderLogo provider={logoKey} size="lg" />
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
          {label}
        </div>
        <div className="mt-1 font-display text-3xl font-extrabold">
          {formatMoney({ amount: total, currency: "XAF" })}
        </div>
      </div>

      {status === "idle" && (
        <>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              N° de téléphone du client
            </label>
            <div className="flex items-stretch gap-2">
              <div className="grid h-11 w-16 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600">
                +237
              </div>
              <Input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))
                }
                placeholder="6 XX XX XX XX"
                className="flex-1"
                autoFocus
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <Button type="button" variant="secondary" onClick={onBack}>
              Retour
            </Button>
            <Button
              disabled={phone.length < 9}
              loading={loading}
              onClick={sendRequest}
            >
              Envoyer la demande
            </Button>
          </div>
        </>
      )}

      {status === "pending" && (
        <div className="space-y-4 py-4 text-center">
          <div className="relative mx-auto h-20 w-20">
            <div className="absolute inset-0 rounded-full border-4 border-weza-primary/20" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-weza-primary border-t-transparent" />
            <div className="absolute inset-0 m-auto grid place-items-center">
              <PaymentProviderLogo provider={logoKey} size="md" />
            </div>
          </div>
          <p className="font-semibold text-weza-dark">
            En attente de confirmation
          </p>
          <p className="text-sm text-slate-500">
            Le client doit composer son code sur{" "}
            <strong>+237 {phone}</strong>
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setStatus("idle")}
          >
            Annuler la demande
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-4 py-2 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-rose-100 text-rose-500">
            <XCircle className="h-8 w-8" />
          </div>
          <p className="font-semibold text-rose-600">Paiement échoué</p>
          <p className="text-sm text-slate-500">{errorMsg}</p>
          <div className="flex justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setStatus("idle")}
            >
              <RotateCcw className="h-4 w-4" />
              Réessayer
            </Button>
            <Button variant="ghost" size="sm" onClick={onBack}>
              Payer autrement
            </Button>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-4 py-4 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-500">
            ✓
          </div>
          <p className="font-semibold text-emerald-600">Paiement confirmé</p>
        </div>
      )}
    </div>
  );
}
