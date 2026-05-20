"use client";

import { CloudOff, RefreshCw, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export function OfflineBanner() {
  const [online, setOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("weza:pendingSales");
    setPendingCount(raw ? JSON.parse(raw).length : 0);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "weza:pendingSales") {
        setPendingCount(e.newValue ? JSON.parse(e.newValue).length : 0);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 1200));
    window.localStorage.setItem("weza:pendingSales", "[]");
    setPendingCount(0);
    setSyncing(false);
  };

  if (online && pendingCount === 0) return null;

  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-2 text-sm font-semibold text-white ${
        !online ? "bg-amber-500" : "bg-sky-500"
      }`}
    >
      <div className="flex items-center gap-2">
        {!online ? (
          <>
            <WifiOff className="h-4 w-4" />
            Mode hors ligne — vos ventes sont sauvegardées localement
          </>
        ) : (
          <>
            <CloudOff className="h-4 w-4" />
            {pendingCount} vente{pendingCount > 1 ? "s" : ""} en attente de
            synchronisation
          </>
        )}
      </div>
      {online && pendingCount > 0 && (
        <button
          onClick={handleSync}
          disabled={syncing}
          className="inline-flex items-center gap-1 rounded-lg bg-white/20 px-3 py-1 text-xs hover:bg-white/30 disabled:opacity-60"
        >
          {syncing && <RefreshCw className="h-3 w-3 animate-spin" />}
          {syncing ? "Synchronisation..." : "Synchroniser maintenant"}
        </button>
      )}
    </div>
  );
}
