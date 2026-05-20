import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthGate } from "@/components/AuthGate";

export const metadata: Metadata = {
  title: {
    default: "Weza Caisse",
    template: "%s · Weza Caisse",
  },
  description: "La caisse intelligente pour les commerces africains.",
};

export const viewport: Viewport = {
  themeColor: "#FF6B35",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
