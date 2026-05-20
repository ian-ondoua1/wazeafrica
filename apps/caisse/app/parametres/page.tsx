"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  CreditCard,
  Edit3,
  Plus,
  Settings as SettingsIcon,
  Smartphone,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import type {
  AppUser,
  BusinessSettings,
  PaymentConfig,
  UserRole,
} from "@weza/types";
import { Badge, Button, Card, Input, cn } from "@weza/ui";
import { api } from "@/lib/api";
import { hasPermission } from "@/lib/permissions";
import { Modal } from "@/components/Modal";
import { PageHeader } from "@/components/PageHeader";
import { PaymentProviderLogo } from "@/components/PaymentProviderLogo";
import { useSession } from "@/components/useSession";

type Section = "business" | "payments" | "users";

const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Propriétaire",
  admin: "Administrateur",
  manager: "Manager",
  cashier: "Caissier",
  employee: "Employé",
};

const ROLE_TONES: Record<
  UserRole,
  "default" | "primary" | "success" | "warning" | "danger" | "info"
> = {
  owner: "primary",
  admin: "danger",
  manager: "info",
  cashier: "success",
  employee: "default",
};

export default function ParametresPage() {
  const { session } = useSession();
  const role = session?.user.role;
  const canBusiness = role ? hasPermission(role, "settings:business") : false;
  const canPayments = role ? hasPermission(role, "settings:payments") : false;
  const canUsers = role ? hasPermission(role, "settings:users") : false;

  const initial: Section = canBusiness
    ? "business"
    : canPayments
      ? "payments"
      : "users";
  const [section, setSection] = useState<Section>(initial);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <PageHeader
        title="Paramètres"
        subtitle="Configurer votre boutique et votre équipe"
      />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <Card className="h-fit p-2">
          <nav className="space-y-1">
            {canBusiness && (
              <SectionLink
                active={section === "business"}
                onClick={() => setSection("business")}
                icon={Building2}
                label="Boutique"
              />
            )}
            {canPayments && (
              <SectionLink
                active={section === "payments"}
                onClick={() => setSection("payments")}
                icon={CreditCard}
                label="Paiements"
              />
            )}
            {canUsers && (
              <SectionLink
                active={section === "users"}
                onClick={() => setSection("users")}
                icon={Users}
                label="Équipe"
              />
            )}
          </nav>
        </Card>

        <div>
          {section === "business" && canBusiness && <BusinessSection />}
          {section === "payments" && canPayments && <PaymentSection />}
          {section === "users" && canUsers && <UsersSection />}
        </div>
      </div>
    </div>
  );
}

function SectionLink({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Building2;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
        active
          ? "bg-weza-primary/10 text-weza-primary"
          : "text-slate-600 hover:bg-slate-100"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function BusinessSection() {
  const [data, setData] = useState<BusinessSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    api.settings.getBusiness().then(setData);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    try {
      const updated = await api.settings.updateBusiness(data);
      setData(updated);
      setSavedAt(Date.now());
      setTimeout(() => setSavedAt(null), 2400);
    } finally {
      setSaving(false);
    }
  };

  if (!data) {
    return (
      <Card className="h-72 animate-pulse" />
    );
  }

  return (
    <Card>
      <div className="border-b border-slate-100 p-6">
        <h2 className="font-bold text-weza-dark">Informations de la boutique</h2>
        <p className="mt-1 text-xs text-slate-500">
          Ces infos apparaissent sur les tickets de caisse et factures.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nom commercial" required>
            <Input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </Field>
          <Field label="Raison sociale">
            <Input
              value={data.legalName ?? ""}
              onChange={(e) =>
                setData({ ...data, legalName: e.target.value || undefined })
              }
            />
          </Field>
          <Field label="Téléphone" required>
            <Input
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              required
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={data.email ?? ""}
              onChange={(e) =>
                setData({ ...data, email: e.target.value || undefined })
              }
            />
          </Field>
          <Field label="N° RCCM">
            <Input
              value={data.rccm ?? ""}
              onChange={(e) =>
                setData({ ...data, rccm: e.target.value || undefined })
              }
            />
          </Field>
          <Field label="N° NIU">
            <Input
              value={data.niu ?? ""}
              onChange={(e) =>
                setData({ ...data, niu: e.target.value || undefined })
              }
            />
          </Field>
        </div>

        <Field label="Adresse" required>
          <Input
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            required
          />
        </Field>

        <Field label="Pied de ticket de caisse">
          <textarea
            value={data.receiptFooter ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                receiptFooter: e.target.value || undefined,
              })
            }
            rows={2}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-weza-dark focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
            placeholder="Merci de votre visite — À bientôt !"
          />
        </Field>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          {savedAt && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Enregistré
            </span>
          )}
          <Button type="submit" loading={saving}>
            Sauvegarder
          </Button>
        </div>
      </form>
    </Card>
  );
}

function PaymentSection() {
  const [data, setData] = useState<PaymentConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<"MTN" | "ORANGE" | null>(null);
  const [testResult, setTestResult] = useState<{
    provider: string;
    ok: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    api.settings.getPayments().then(setData);
  }, []);

  const update = (patch: Partial<PaymentConfig>) =>
    setData((prev) => (prev ? { ...prev, ...patch } : prev));

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const updated = await api.settings.updatePayments(data);
      setData(updated);
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async (provider: "MTN" | "ORANGE") => {
    setTesting(provider);
    setTestResult(null);
    try {
      const result = await api.settings.testPayment(provider);
      setTestResult({ provider, ...result });
    } finally {
      setTesting(null);
    }
  };

  if (!data) return <Card className="h-72 animate-pulse" />;

  return (
    <div className="space-y-6">
      <ProviderCard
        title="MTN Mobile Money"
        subtitle="Accepter les paiements via MTN MoMo"
        logo={<PaymentProviderLogo provider="mtn" size="lg" />}
        enabled={data.mtnEnabled}
        onToggle={(v) => update({ mtnEnabled: v })}
        phone={data.mtnPhone ?? ""}
        onPhoneChange={(v) => update({ mtnPhone: v })}
        apiKey={data.mtnApiKey ?? ""}
        onApiKeyChange={(v) => update({ mtnApiKey: v })}
        onTest={() => handleTest("MTN")}
        testing={testing === "MTN"}
        testResult={
          testResult?.provider === "MTN" ? testResult : null
        }
      />

      <ProviderCard
        title="Orange Money"
        subtitle="Accepter les paiements via Orange Money"
        logo={<PaymentProviderLogo provider="orange" size="lg" />}
        enabled={data.orangeEnabled}
        onToggle={(v) => update({ orangeEnabled: v })}
        phone={data.orangePhone ?? ""}
        onPhoneChange={(v) => update({ orangePhone: v })}
        apiKey={data.orangeApiKey ?? ""}
        onApiKeyChange={(v) => update({ orangeApiKey: v })}
        onTest={() => handleTest("ORANGE")}
        testing={testing === "ORANGE"}
        testResult={
          testResult?.provider === "ORANGE" ? testResult : null
        }
      />

      <Card className="p-6">
        <h3 className="font-bold text-weza-dark">Autres modes</h3>
        <div className="mt-4 space-y-3">
          <ToggleRow
            label="Espèces"
            description="Paiement en cash"
            checked={data.cashEnabled}
            onChange={(v) => update({ cashEnabled: v })}
          />
          <ToggleRow
            label="Carte bancaire"
            description="TPE bancaire"
            checked={data.cardEnabled}
            onChange={(v) => update({ cardEnabled: v })}
          />
          <ToggleRow
            label="Vente à crédit"
            description="Autoriser les ardoises clients"
            checked={data.creditEnabled}
            onChange={(v) => update({ creditEnabled: v })}
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} loading={saving} size="lg">
          Sauvegarder la configuration
        </Button>
      </div>
    </div>
  );
}

function ProviderCard({
  title,
  subtitle,
  logo,
  enabled,
  onToggle,
  phone,
  onPhoneChange,
  apiKey,
  onApiKeyChange,
  onTest,
  testing,
  testResult,
}: {
  title: string;
  subtitle: string;
  logo: React.ReactNode;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  phone: string;
  onPhoneChange: (v: string) => void;
  apiKey: string;
  onApiKeyChange: (v: string) => void;
  onTest: () => void;
  testing: boolean;
  testResult: { ok: boolean; message: string } | null;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-100 p-6">
        <div className="flex items-center gap-3">
          {logo}
          <div>
            <h3 className="font-bold text-weza-dark">{title}</h3>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
        <Switch checked={enabled} onChange={onToggle} />
      </div>
      {enabled && (
        <div className="space-y-4 p-6">
          <Field label="Numéro de réception">
            <Input
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="+237 6 XX XX XX XX"
            />
          </Field>
          <Field label="Clé API">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="Fournie par l'opérateur"
            />
          </Field>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              loading={testing}
              onClick={onTest}
            >
              Tester la connexion
            </Button>
            {testResult &&
              (testResult.ok ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {testResult.message}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500">
                  <XCircle className="h-3.5 w-3.5" />
                  {testResult.message}
                </span>
              ))}
          </div>
        </div>
      )}
    </Card>
  );
}

function UsersSection() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AppUser | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const reload = () => api.settings.listUsers().then(setUsers);

  useEffect(() => {
    reload().finally(() => setLoading(false));
  }, []);

  const handleSave = async (
    values: Omit<AppUser, "id">,
    id: string | null
  ) => {
    setSaving(true);
    try {
      if (id) await api.settings.updateUser(id, values);
      else await api.settings.createUser(values);
      await reload();
      setEditing(null);
      setCreating(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user: AppUser) => {
    if (!window.confirm(`Supprimer ${user.fullName} de l'équipe ?`)) return;
    await api.settings.deleteUser(user.id);
    await reload();
  };

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-100 p-6">
        <div>
          <h2 className="font-bold text-weza-dark">Équipe & rôles</h2>
          <p className="text-xs text-slate-500">
            Gérez les utilisateurs ayant accès à la caisse
          </p>
        </div>
        <Button size="sm" onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>
      {loading ? (
        <div className="space-y-2 p-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex items-center justify-between gap-3 px-6 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-weza-secondary text-sm font-bold text-white">
                  {u.fullName
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold text-weza-dark">
                    {u.fullName}
                  </div>
                  <div className="text-xs text-slate-500">{u.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={ROLE_TONES[u.role]}>{ROLE_LABELS[u.role]}</Badge>
                {!u.active && <Badge tone="default">Désactivé</Badge>}
                <button
                  onClick={() => setEditing(u)}
                  title="Modifier"
                  className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-weza-dark"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(u)}
                  title="Supprimer"
                  className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={creating || !!editing}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        title={editing ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
      >
        <UserForm
          initialValue={editing ?? undefined}
          loading={saving}
          onSubmit={(v) => handleSave(v, editing?.id ?? null)}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      </Modal>
    </Card>
  );
}

function UserForm({
  initialValue,
  loading,
  onSubmit,
  onCancel,
}: {
  initialValue?: AppUser;
  loading?: boolean;
  onSubmit: (values: Omit<AppUser, "id">) => void;
  onCancel: () => void;
}) {
  const [fullName, setFullName] = useState(initialValue?.fullName ?? "");
  const [email, setEmail] = useState(initialValue?.email ?? "");
  const [role, setRole] = useState<UserRole>(initialValue?.role ?? "cashier");
  const [pin, setPin] = useState(initialValue?.pin ?? "");
  const [active, setActive] = useState(initialValue?.active ?? true);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ fullName, email, role, pin: pin || undefined, active });
      }}
      className="space-y-4 p-6"
    >
      <Field label="Nom complet" required>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </Field>
      <Field label="Email" required>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Field>
      <Field label="Rôle">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-weza-dark focus:border-weza-primary focus:outline-none focus:ring-2 focus:ring-weza-primary/20"
        >
          {(
            ["owner", "admin", "manager", "cashier", "employee"] as UserRole[]
          ).map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="PIN (4 chiffres) pour connexion rapide">
        <Input
          inputMode="numeric"
          pattern="[0-9]{4}"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          placeholder="1234"
        />
      </Field>
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-weza-primary focus:ring-weza-primary"
        />
        Utilisateur actif
      </label>
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" loading={loading}>
          {initialValue ? "Mettre à jour" : "Créer"}
        </Button>
      </div>
    </form>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        checked ? "bg-weza-primary" : "bg-slate-300"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
      <div>
        <div className="text-sm font-semibold text-weza-dark">{label}</div>
        <div className="text-xs text-slate-500">{description}</div>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
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
