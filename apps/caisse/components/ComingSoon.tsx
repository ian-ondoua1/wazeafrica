import type { LucideIcon } from "lucide-react";

export function ComingSoon({
  icon: Icon,
  title,
  description,
  features,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-weza-primary/10 text-weza-primary">
        <Icon className="h-8 w-8" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-extrabold text-weza-dark">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">{description}</p>
      <ul className="mx-auto mt-8 grid max-w-md gap-2 text-left">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
          >
            <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-weza-primary" />
            {f}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs uppercase tracking-wider text-slate-400">
        En attente des spécifications
      </p>
    </div>
  );
}
