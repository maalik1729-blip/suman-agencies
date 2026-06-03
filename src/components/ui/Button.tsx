"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-500) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none " +
  "active:translate-y-px select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-(--color-brand-500) text-white hover:bg-(--color-brand-600) active:bg-(--color-brand-700) shadow-sm",
  secondary:
    "bg-(--color-surface-2) text-(--color-text-strong) border border-(--color-border) hover:border-(--color-border-strong)",
  ghost:
    "bg-transparent text-(--color-text) hover:bg-(--color-surface-2)",
  destructive:
    "bg-(--color-danger-50) text-(--color-danger-700) border border-(--color-danger-200) hover:bg-[color-mix(in_srgb,var(--color-danger-50)_80%,var(--color-danger-200))]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base font-semibold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth,
    loading,
    leftIcon,
    rightIcon,
    className,
    children,
    disabled,
    type = "button",
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...rest}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Processing…</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
});

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-75"
      />
    </svg>
  );
}
