import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[linear-gradient(135deg,var(--accent),#f5ffcf_30%,var(--accent-secondary)_68%,var(--accent-tertiary))] px-5 py-3 text-[#081018] shadow-[0_10px_35px_rgba(74,214,255,0.22)] hover:translate-y-[-1px] hover:brightness-105",
        outline:
          "border-[color:var(--panel-border)] bg-[linear-gradient(140deg,var(--surface-dark-top),rgba(255,255,255,0.05))] px-5 py-3 text-[color:var(--text-strong)] backdrop-blur hover:border-[color:rgba(74,214,255,0.4)] hover:bg-[linear-gradient(140deg,rgba(74,214,255,0.12),rgba(255,141,111,0.08))]",
        subtle:
          "border-transparent bg-transparent px-0 py-0 text-[color:var(--text-muted)] hover:text-[var(--accent-secondary)]",
      },
      size: {
        default: "",
        sm: "px-4 py-2 text-xs uppercase tracking-[0.24em]",
        lg: "px-6 py-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export { Button, buttonVariants };
