"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Delete,
  Lock,
  Mail,
} from "lucide-react";
import type { AppUser } from "@weza/types";
import { Button, Input, cn } from "@weza/ui";
import { api, DEFAULT_STORE_ID } from "@/lib/api";
import { setSession } from "@/lib/auth";
import { defaultRouteFor, ROLE_LABEL } from "@/lib/permissions";

type Mode = "password" | "pin-select" | "pin-keypad";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<AppUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.auth.listCashiers().then(setUsers);
  }, []);

  const handleSuccess = (user: AppUser) => {
    setSession({
      user,
      storeId: DEFAULT_STORE_ID,
      loggedAt: new Date().toISOString(),
    });
    router.replace(defaultRouteFor(user.role));
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await api.auth.loginByPassword({ email, password });
      handleSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion échouée");
    } finally {
      setLoading(false);
    }
  };

  const handlePinDigit = async (digit: string) => {
    if (!selectedUser || pin.length >= 4) return;
    const next = pin + digit;
    setPin(next);
    if (next.length === 4) {
      setLoading(true);
      setError(null);
      try {
        const user = await api.auth.loginByPin({
          userId: selectedUser.id,
          pin: next,
        });
        handleSuccess(user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "PIN incorrect");
        setPin("");
      } finally {
        setLoading(false);
      }
    }
  };

  if (mode === "password") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-weza-primary text-white shadow-card">
              <span className="font-display text-2xl font-extrabold">W</span>
            </div>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-weza-dark">
              Connexion à Weza Caisse
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Bienvenue, accédez à votre tableau de bord
            </p>
          </div>

          {error && <ErrorBanner message={error} />}

          <form onSubmit={handlePasswordLogin} className="space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean@pharmacie-akwa.cm"
                  className="pl-9"
                  required
                  autoFocus
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              loading={loading}
            >
              Se connecter
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-slate-50 px-3 text-slate-400">ou</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMode("pin-select")}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-weza-dark hover:border-weza-primary hover:text-weza-primary"
          >
            Connexion rapide avec PIN
          </button>

          <p className="rounded-xl bg-slate-100 px-3 py-2 text-center text-[11px] text-slate-500">
            Démo : utilisez n'importe quel mot de passe (≥ 4 caractères) avec
            <br />
            <span className="font-mono">jean@pharmacie-akwa.cm</span>,
            <span className="font-mono"> marie@... </span>ou
            <span className="font-mono"> paul@...</span>
          </p>
        </div>
      </div>
    );
  }

  if (mode === "pin-select") {
    return (
      <div className="flex min-h-screen flex-col bg-weza-dark p-6">
        <button
          onClick={() => setMode("password")}
          className="inline-flex items-center gap-2 self-start text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Connexion par email
        </button>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-weza-primary text-white">
            <span className="font-display text-xl font-extrabold">W</span>
          </div>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-white">
            Qui êtes-vous ?
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Sélectionnez votre profil pour vous connecter avec votre PIN
          </p>

          <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-3">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  setPin("");
                  setError(null);
                  setMode("pin-keypad");
                }}
                className="flex flex-col items-center gap-2 rounded-2xl bg-slate-800 p-4 transition hover:bg-slate-700"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-weza-primary text-lg font-bold text-white">
                  {user.fullName
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <span className="text-sm font-semibold text-white">
                  {user.fullName.split(" ")[0]}
                </span>
                <span className="text-[11px] text-slate-400">
                  {ROLE_LABEL[user.role]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-weza-dark p-6">
      <button
        onClick={() => {
          setMode("pin-select");
          setPin("");
          setError(null);
        }}
        className="inline-flex items-center gap-2 self-start text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Changer d'utilisateur
      </button>

      <div className="flex flex-1 flex-col items-center justify-center">
        {selectedUser && (
          <>
            <div className="grid h-16 w-16 place-items-center rounded-full bg-weza-primary text-xl font-bold text-white">
              {selectedUser.fullName
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </div>
            <h2 className="mt-3 font-display text-xl font-extrabold text-white">
              Bonjour {selectedUser.fullName.split(" ")[0]}
            </h2>
            <p className="mt-1 text-sm text-slate-400">Saisissez votre PIN</p>

            <div className="mt-6 flex gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-4 w-4 rounded-full border-2 transition-all",
                    pin.length > i
                      ? "border-weza-primary bg-weza-primary"
                      : "border-slate-500"
                  )}
                />
              ))}
            </div>

            {error && (
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-400">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}

            <div className="mt-8 grid w-full max-w-xs grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                <PinKey
                  key={d}
                  label={String(d)}
                  onClick={() => handlePinDigit(String(d))}
                  disabled={loading}
                />
              ))}
              <div />
              <PinKey
                label="0"
                onClick={() => handlePinDigit("0")}
                disabled={loading}
              />
              <PinKey
                label={<Delete className="h-5 w-5" />}
                onClick={() => setPin((p) => p.slice(0, -1))}
                disabled={loading || pin.length === 0}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PinKey({
  label,
  onClick,
  disabled,
}: {
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="grid h-16 place-items-center rounded-2xl bg-slate-700 text-2xl font-bold text-white transition active:scale-95 hover:bg-slate-600 disabled:opacity-40"
    >
      {label}
    </button>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
      <AlertCircle className="h-4 w-4" />
      {message}
    </div>
  );
}
