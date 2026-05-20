import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, cn } from "@weza/ui";

type Tone = "default" | "primary" | "success" | "warning" | "danger" | "info";

const tones: Record<Tone, string> = {
  default: "bg-slate-100 text-slate-600",
  primary: "bg-weza-primary/10 text-weza-primary",
  success: "bg-emerald-100 text-emerald-600",
  warning: "bg-amber-100 text-amber-600",
  danger: "bg-rose-100 text-rose-600",
  info: "bg-sky-100 text-sky-600",
};

export interface KPICardProps {
  label: string;
  value: string | number;
  hint?: string;
  delta?: number;
  icon?: LucideIcon;
  tone?: Tone;
  loading?: boolean;
}

export function KPICard({
  label,
  value,
  hint,
  delta,
  icon: Icon,
  tone = "default",
  loading,
}: KPICardProps) {
  if (loading) {
    return (
      <Card className="h-32 animate-pulse" aria-hidden />
    );
  }

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        {Icon && (
          <div
            className={cn(
              "grid h-10 w-10 place-items-center rounded-xl",
              tones[tone]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              delta >= 0
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            )}
          >
            {delta >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {delta >= 0 ? "+" : ""}
            {delta.toFixed(1)}%
          </span>
        )}
      </div>
      <div className="mt-4 font-display text-2xl font-extrabold text-weza-dark">
        {value}
      </div>
      <div className="mt-1 text-xs text-slate-500">{label}</div>
      {hint && <div className="mt-2 text-[11px] text-slate-400">{hint}</div>}
    </Card>
  );
}
