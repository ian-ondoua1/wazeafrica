"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ({
  items,
  title = "Questions fréquentes",
  subtitle = "Tout ce que vous devez savoir avant de vous lancer.",
}: {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="section bg-slate-50">
      <div className="container-weza max-w-4xl">
        <div className="text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{title}</h2>
          <p className="mt-3 text-slate-600">{subtitle}</p>
        </div>

        <div className="mt-12 space-y-3">
          {items.map((item, idx) => {
            const open = openIdx === idx;
            return (
              <div
                key={item.question}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition",
                  open ? "border-weza-primary/40 shadow-card" : "border-slate-200"
                )}
              >
                <button
                  onClick={() => setOpenIdx(open ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-weza-dark">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-weza-primary transition-transform",
                      open && "rotate-180"
                    )}
                  />
                </button>
                {open && (
                  <div className="px-6 pb-5 text-slate-600">{item.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
