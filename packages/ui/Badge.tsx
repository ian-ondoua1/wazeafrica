import type { HTMLAttributes } from "react";
import { cn } from "./utils";

type Tone = "default" | "primary" | "success" | "warning" | "danger" | "info";

const tones: Record<Tone, string> = {
  default: "bg-slate-100 text-slate-700",
  primary: "bg-weza-primary/10 text-weza-primary",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-rose-100 text-rose-700",
  info: "bg-sky-100 text-sky-700",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
