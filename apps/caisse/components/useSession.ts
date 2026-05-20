"use client";

import { useEffect, useState } from "react";
import {
  clearSession,
  getSession,
  subscribeSession,
  type Session,
} from "@/lib/auth";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setReady(true);
    return subscribeSession(() => setSession(getSession()));
  }, []);

  return { session, ready, logout: clearSession };
}
