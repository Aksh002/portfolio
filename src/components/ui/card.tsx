import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "surface-panel rounded-[32px] p-6 backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
