export const colors = {
  weza: {
    primary: "#FF6B35",
    "primary-dark": "#E85826",
    "primary-light": "#FFB088",
    secondary: "#1A535C",
    "secondary-dark": "#0F3D44",
    accent: "#FFD23F",
    dark: "#0F172A",
  },
} as const;

export const radii = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
} as const;

export const shadows = {
  glow: "0 0 40px rgba(255,107,53,0.3)",
  card: "0 12px 32px rgba(15, 23, 42, 0.08)",
} as const;

export const fonts = {
  sans: ["Inter", "system-ui", "sans-serif"],
  display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
  mono: ["JetBrains Mono", "monospace"],
} as const;
