import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "./utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border bg-white px-4 text-sm text-weza-dark transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-weza-primary/20",
        invalid
          ? "border-rose-400 focus:border-rose-500"
          : "border-slate-200 focus:border-weza-primary",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
