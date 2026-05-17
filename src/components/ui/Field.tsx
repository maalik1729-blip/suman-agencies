"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
  useId,
} from "react";
import { cn } from "@/lib/utils";

interface FieldShellProps {
  label: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  id?: string;
  children: (ids: { inputId: string; describedBy: string | undefined }) => ReactNode;
}

/** Wraps any input with a real <label>, helper text, and ARIA-wired error message. */
export function FieldShell({ label, helper, error, required, id, children }: FieldShellProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const helperId = helper ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = errorId ?? helperId;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-()"
      >
        {label}
        {required && <span aria-hidden="true" className="ml-0.5 text-()">*</span>}
      </label>
      {children({ inputId, describedBy })}
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-()">
          {error}
        </p>
      ) : helper ? (
        <p id={helperId} className="text-xs text-()">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

const inputBase =
  "h-11 w-full rounded-md border bg-() px-3.5 text-sm text-() " +
  "placeholder:text-() " +
  "border-() hover:border-() " +
  "focus:outline-none focus:border-() focus:ring-4 focus:ring-() " +
  "aria-[invalid=true]:border-() aria-[invalid=true]:focus:ring-() " +
  "disabled:bg-() disabled:text-() " +
  "transition-[border-color,box-shadow] duration-150";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helper, error, required, id, className, ...rest },
  ref
) {
  return (
    <FieldShell label={label} helper={helper} error={error} required={required} id={id}>
      {({ inputId, describedBy }) => (
        <input
          {...rest}
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(inputBase, className)}
        />
      )}
    </FieldShell>
  );
});

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helper, error, required, id, className, rows = 3, ...rest },
  ref
) {
  return (
    <FieldShell label={label} helper={helper} error={error} required={required} id={id}>
      {({ inputId, describedBy }) => (
        <textarea
          {...rest}
          rows={rows}
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(inputBase, "h-auto py-2.5 resize-y", className)}
        />
      )}
    </FieldShell>
  );
});

type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  label: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  options: Array<{ value: string; label: string }>;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helper, error, required, id, options, className, ...rest },
  ref
) {
  return (
    <FieldShell label={label} helper={helper} error={error} required={required} id={id}>
      {({ inputId, describedBy }) => (
        <select
          {...(rest as unknown as React.SelectHTMLAttributes<HTMLSelectElement>)}
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(inputBase, "pr-10 appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat", className)}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2362656e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )}
    </FieldShell>
  );
});
