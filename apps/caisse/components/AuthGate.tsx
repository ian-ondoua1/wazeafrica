"use client";

import { Lock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Button } from "@weza/ui";
import {
  DEV_BYPASS_AUTH,
  defaultRouteFor,
  routePermission,
  hasPermission,
} from "@/lib/permissions";
import { OfflineBanner } from "@/components/OfflineBanner";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { useSession } from "@/components/useSession";

export function AuthGate({ children }: { children: ReactNode }) {
  const { session, ready } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/login";

  useEffect(() => {
    if (!ready) return;
    // DEV: pas de backend, on désactive la redirection forcée vers /login
    // et la redirection auto post-login. Décommente le bloc ci-dessous pour
    // réactiver les gardes une fois l'API d'auth en place.
    if (DEV_BYPASS_AUTH) return;
    // if (!session && !isLogin) {
    //   router.replace("/login");
    //   return;
    // }
    // if (session && isLogin) {
    //   router.replace(defaultRouteFor(session.user.role));
    // }
  }, [ready, session, isLogin, router]);

  if (!ready) {
    return (
      <div className="grid h-screen place-items-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-weza-primary/20 border-t-weza-primary" />
      </div>
    );
  }

  if (isLogin) {
    return <>{children}</>;
  }

  // DEV: pas de session ? on rend quand même tout le shell (équivalent rôle owner).
  // Quand l'auth sera en place, remettre `if (!session) return null;` ici.
  if (!session && !DEV_BYPASS_AUTH) {
    return null;
  }

  const requiredPerm = routePermission(pathname);
  const allowed =
    !requiredPerm ||
    !session ||
    hasPermission(session.user.role, requiredPerm);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar role={session?.user.role ?? "owner"} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <OfflineBanner />
        <Topbar />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {allowed ? children : <AccessDenied />}
        </main>
      </div>
    </div>
  );
}

function AccessDenied() {
  const router = useRouter();
  const { session } = useSession();
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-rose-100 text-rose-500">
        <Lock className="h-8 w-8" />
      </div>
      <h2 className="mt-5 font-display text-2xl font-extrabold text-weza-dark">
        Accès refusé
      </h2>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Votre rôle ne vous permet pas d'accéder à cette section. Contactez
        l'administrateur si vous pensez qu'il s'agit d'une erreur.
      </p>
      <Button
        className="mt-6"
        onClick={() =>
          router.replace(session ? defaultRouteFor(session.user.role) : "/login")
        }
      >
        Retour à l'accueil
      </Button>
    </div>
  );
}
