import type { Config } from "tailwindcss";
import preset from "@weza/design-tokens/tailwind-preset";

const config: Config = {
  presets: [preset as Config],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  plugins: [],
};

export default config;
