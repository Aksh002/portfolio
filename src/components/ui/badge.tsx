import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[color:rgba(184,255,111,0.28)] bg-[linear-gradient(135deg,rgba(184,255,111,0.16),rgba(74,214,255,0.1))] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-strong)] shadow-[0_0_18px_rgba(74,214,255,0.1)]",
        className,
      )}
      {...props}
    />
  );
}
