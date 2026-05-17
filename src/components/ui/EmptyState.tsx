"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  primaryCta?: ReactNode;
  secondaryCta?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-6 gap-4",
        className
      )}
    >
      {icon ? (
        <div className="text-()" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <div className="max-w-prose">
        <h2 className="text-xl font-semibold text-()">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-()">{description}</p>
        ) : null}
      </div>
      {(primaryCta || secondaryCta) && (
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          {primaryCta}
          {secondaryCta}
        </div>
      )}
    </div>
  );
}
