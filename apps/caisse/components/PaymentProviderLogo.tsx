import Image from "next/image";
import { cn } from "@weza/ui";

type Provider = "mtn" | "orange";

const SOURCES: Record<Provider, { src: string; alt: string; bg: string }> = {
  mtn: {
    src: "/logos/mtn.png",
    alt: "MTN Mobile Money",
    bg: "bg-yellow-400",
  },
  orange: {
    src: "/logos/orange.png",
    alt: "Orange Money",
    bg: "bg-orange-500",
  },
};

const SIZES = {
  xs: "h-5 w-5 p-0.5",
  sm: "h-6 w-6 p-1",
  md: "h-8 w-8 p-1",
  lg: "h-10 w-10 p-1.5",
  xl: "h-12 w-12 p-2",
};

const PIXELS: Record<keyof typeof SIZES, number> = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
};

export function PaymentProviderLogo({
  provider,
  size = "md",
  rounded = true,
  withBg = true,
  className,
}: {
  provider: Provider;
  size?: keyof typeof SIZES;
  rounded?: boolean;
  withBg?: boolean;
  className?: string;
}) {
  const cfg = SOURCES[provider];
  const px = PIXELS[size];
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden",
        SIZES[size],
        rounded ? "rounded-xl" : "rounded-md",
        withBg ? cfg.bg : "",
        className
      )}
    >
      <Image
        src={cfg.src}
        alt={cfg.alt}
        width={px}
        height={px}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
