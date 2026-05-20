"use client";

import { useEffect, type ReactNode } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button, cn } from "@weza/ui";

type Variant = "danger" | "warning" | "info" | "success";

const VARIANT_STYLES: Record<
  Variant,
  { icon: LucideIcon; iconBg: string; iconColor: string; buttonVariant: "danger" | "primary" }
> = {
  danger: {
    icon: AlertCircle,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    buttonVariant: "danger",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    buttonVariant: "primary",
  },
  info: {
    icon: Info,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    buttonVariant: "primary",
  },
  success: {
    icon: CheckCircle2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    buttonVariant: "primary",
  },
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "danger",
  loading,
  onConfirm,
  onCancel,
  hideCancel,
}: {
  open: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: Variant;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  hideCancel?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel, onConfirm]);

  if (!open) return null;

  const cfg = VARIANT_STYLES[variant];
  const Icon = cfg.icon;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-weza-dark/60 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-card"
      >
        <button
          onClick={onCancel}
          aria-label="Fermer"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-weza-dark"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4 p-6 pr-12">
          <div
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
              cfg.iconBg
            )}
          >
            <Icon className={cn("h-6 w-6", cfg.iconColor)} />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-extrabold text-weza-dark">
              {title}
            </h2>
            {description && (
              <div className="mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4">
          {!hideCancel && (
            <Button variant="secondary" onClick={onCancel} disabled={loading}>
              {cancelLabel}
            </Button>
          )}
          <Button
            variant={cfg.buttonVariant}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
