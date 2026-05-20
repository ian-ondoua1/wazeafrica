"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CheckCircle2,
  KeyRound,
  LogOut,
  Mail,
  Shield,
  User,
} from "lucide-react";
import { Badge, Button, Card, Input } from "@weza/ui";
import { api } from "@/lib/api";
import { clearSession, setSession } from "@/lib/auth";
import {
  permissionsFor,
  ROLE_DESCRIPTION,
  ROLE_LABEL,
} from "@/lib/permissions";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { useSession } from "@/components/useSession";

const PERMISSION_LABELS: Record<string, string> = {
  "dashboard:view": "Voir le tableau de bord",
  "pos:use": "Utiliser la caisse (POS)",
  "sales:view": "Consulter l'historique des ventes",
  "sales:refund": "Effectuer des remboursements",
  "products:read": "Consulter le catalogue",
  "products:write": "Modifier les produits",
  "stock:write": "Gérer les mouvements de stock",
  "customers:read": "Consulter les clients",
  "customers:write": "Modifier les clients",
  "debt:collect": "Encaisser des règlements de dette",
  "reports:view": "Voir les rapports",
  "settings:business": "Configurer la boutique",
  "settings:payments": "Configurer les paiements",
  "settings:users": "Gérer l'équipe",
};

export default function ProfilePage() {
  const router = useRouter();
  const { session } = useSession();
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(session?.user.fullName ?? "");
  const [changingPin, setChangingPin] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!session) {
    return (
      <EmptyState
        icon={User}
        title="Non connecté"
        description="Veuillez vous identifier pour accéder à votre profil."
      />
    );
  }

  const { user } = session;
  const perms = permissionsFor(user.role);

  const handleSaveName = async () => {
    if (!name.trim() || name === user.fullName) {
      setEditingName(false);
      return;
    }
    setSaving(true);
    try {
      const updated = await api.settings.updateUser(user.id, {
        fullName: name.trim(),
      });
      setSession({ ...session, user: updated });
      setEditingName(false);
      setFeedback("Profil mis à jour");
      setTimeout(() => setFeedback(null), 2400);
    } finally {
      setSaving(false);
    }
  };

  const handleSavePin = async () => {
    if (!/^\d{4}$/.test(newPin)) {
      setPinError("Le PIN doit comporter 4 chiffres");
      return;
    }
    setSaving(true);
    setPinError(null);
    try {
      const updated = await api.settings.updateUser(user.id, { pin: newPin });
      setSession({ ...session, user: updated });
      setNewPin("");
      setChangingPin(false);
      setFeedback("PIN mis à jour");
      setTimeout(() => setFeedback(null), 2400);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <PageHeader
        title="Mon profil"
        subtitle="Vos informations personnelles et permissions"
        actions={
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </Button>
        }
      />

      {feedback && (
        <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          {feedback}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit">
          <div className="flex flex-col items-center p-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-weza-primary text-2xl font-bold text-white">
              {user.fullName
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="mt-4 font-display text-lg font-extrabold text-weza-dark">
              {user.fullName}
            </div>
            <div className="text-sm text-slate-500">{user.email}</div>
            <Badge tone="primary" className="mt-3">
              <Shield className="h-3 w-3" />
              {ROLE_LABEL[user.role]}
            </Badge>
            <p className="mt-4 text-xs text-slate-500">
              Connecté depuis le{" "}
              {new Date(session.loggedAt).toLocaleString("fr-FR")}
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="border-b border-slate-100 p-6">
              <h2 className="font-bold text-weza-dark">Informations</h2>
              <p className="text-xs text-slate-500">
                Modifiez les informations liées à votre compte
              </p>
            </div>
            <div className="space-y-4 p-6">
              <Row icon={User} label="Nom complet">
                {editingName ? (
                  <div className="flex gap-2">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={handleSaveName}
                      loading={saving}
                    >
                      Enregistrer
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingName(false);
                        setName(user.fullName);
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-weza-dark">
                      {user.fullName}
                    </span>
                    <button
                      onClick={() => setEditingName(true)}
                      className="text-xs font-semibold text-weza-primary hover:underline"
                    >
                      Modifier
                    </button>
                  </div>
                )}
              </Row>

              <Row icon={Mail} label="Email">
                <span className="text-sm text-slate-700">{user.email}</span>
              </Row>

              <Row icon={Shield} label="Rôle">
                <div>
                  <Badge tone="primary">{ROLE_LABEL[user.role]}</Badge>
                  <p className="mt-1 text-xs text-slate-500">
                    {ROLE_DESCRIPTION[user.role]}
                  </p>
                </div>
              </Row>

              <Row icon={KeyRound} label="PIN de connexion rapide">
                {changingPin ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        inputMode="numeric"
                        pattern="[0-9]{4}"
                        maxLength={4}
                        value={newPin}
                        onChange={(e) =>
                          setNewPin(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="••••"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={handleSavePin}
                        loading={saving}
                      >
                        Enregistrer
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setChangingPin(false);
                          setNewPin("");
                          setPinError(null);
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                    {pinError && (
                      <p className="text-xs font-semibold text-rose-500">
                        {pinError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-slate-700">
                      {user.pin ? "••••" : "Aucun PIN défini"}
                    </span>
                    <button
                      onClick={() => setChangingPin(true)}
                      className="text-xs font-semibold text-weza-primary hover:underline"
                    >
                      {user.pin ? "Modifier" : "Définir"}
                    </button>
                  </div>
                )}
              </Row>
            </div>
          </Card>

          <Card>
            <div className="border-b border-slate-100 p-6">
              <h2 className="font-bold text-weza-dark">
                Mes permissions ({perms.length})
              </h2>
              <p className="text-xs text-slate-500">
                Ce que votre rôle vous autorise à faire dans Weza Caisse
              </p>
            </div>
            <div className="grid gap-2 p-6 sm:grid-cols-2">
              {perms.map((perm) => (
                <div
                  key={perm}
                  className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div>
                    <div className="text-sm font-semibold text-weza-dark">
                      {PERMISSION_LABELS[perm] ?? perm}
                    </div>
                    <div className="font-mono text-[10px] text-slate-400">
                      {perm}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof User;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[180px_1fr] items-start gap-3 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}
