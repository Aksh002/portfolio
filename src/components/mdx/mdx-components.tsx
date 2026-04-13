import type { ReactElement, ReactNode } from "react";

import { cn } from "@/lib/utils";

type MdxComponentProps = {
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
};

type MdxComponentMap = Record<string, (props: MdxComponentProps) => ReactElement>;

export const mdxComponents: MdxComponentMap = {
  h3: ({ className, ...props }) => (
    <h3
      className={cn("mt-8 text-xl font-semibold tracking-tight text-[color:var(--text-strong)]", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("mt-4 text-sm leading-7 text-[color:var(--text-muted)] md:text-base", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn("mt-4 space-y-3 text-sm text-[color:var(--text-muted)] md:text-base", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cn("relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent)]", className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-[color:var(--text-strong)]", className)} {...props} />
  ),
};
