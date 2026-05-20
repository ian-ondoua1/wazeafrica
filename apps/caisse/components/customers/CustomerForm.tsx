"use client";

import { useState } from "react";
import type { Customer } from "@weza/types";
import { Button, Input } from "@weza/ui";

export type CustomerFormValues = Omit<Customer, "id" | "tenantId" | "debt">;

export function CustomerForm({
  initialValue,
  submitLabel = "Enregistrer",
  loading,
  onSubmit,
  onCancel,
}: {
  initialValue?: Partial<CustomerFormValues>;
  submitLabel?: string;
  loading?: boolean;
  onSubmit: (values: CustomerFormValues) => void;
  onCancel: () => void;
}) {
  const [fullName, setFullName] = useState(initialValue?.fullName ?? "");
  const [phone, setPhone] = useState(initialValue?.phone ?? "");
  const [email, setEmail] = useState(initialValue?.email ?? "");
  const [notes, setNotes] = useState(initialValue?.notes ?? "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          fullName,
          phone: phone || undefined,
          email: email || undefined,
          notes: notes || undefined,
        });
      }}
      className="space-y-4 p-6"
    >
      <Field label="Nom complet" required>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Jean Mballa"
          required
        />
      </Field>
      <Field label="Téléphone">
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+237 6 XX XX XX XX"
        />
      </Field>
      <Field label="Email">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="client@email.com"
        />
      </Field>
      <Field label="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Préférences, infos utiles..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-weza-dark placeholder:text-slate-400 focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
        />
      </Field>

      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
    </label>
  );
}
