import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";

import { Scales } from "@/components/ui/scales";
import { cn } from "@/lib/utils";

type ScalesWithImageDemoProps = {
  src?: string | StaticImageData;
  alt?: string;
  orientation?: "horizontal" | "vertical" | "diagonal";
  size?: number;
  containerClassName?: string;
  className?: string;
  frameClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
  color?: string;
  children?: ReactNode;
};

export default function ScalesWithImageDemo({
  src,
  alt = "Scales showcase image",
  orientation = "diagonal",
  size = 10,
  className,
  containerClassName,
  frameClassName,
  contentClassName,
  imageClassName,
  color = "color-mix(in srgb, var(--text-strong) 10%, transparent)",
  children,
}: ScalesWithImageDemoProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-full items-center justify-center overflow-hidden py-10 md:py-20",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "relative h-80 w-72 rounded-lg bg-gray-100 dark:bg-neutral-800/50",
          className,
        )}
      >
        <div className={cn("absolute -inset-y-[30%] -left-10 h-[160%] w-8 mask-t-from-90% mask-b-from-90%", frameClassName)}>
          <Scales
            orientation={orientation}
            size={size}
            className="rounded-lg"
            color={color}
          />
        </div>
        <div className={cn("absolute -inset-y-[30%] -right-10 h-[160%] w-8 mask-t-from-90% mask-b-from-90%", frameClassName)}>
          <Scales
            orientation={orientation}
            size={size}
            className="rounded-lg"
            color={color}
          />
        </div>
        <div className={cn("absolute -inset-x-[30%] -top-10 h-8 w-[160%] mask-r-from-90% mask-l-from-90%", frameClassName)}>
          <Scales
            orientation={orientation}
            size={size}
            className="rounded-lg"
            color={color}
          />
        </div>
        <div className={cn("absolute -inset-x-[30%] -bottom-10 h-8 w-[160%] mask-r-from-90% mask-l-from-90%", frameClassName)}>
          <Scales
            orientation={orientation}
            size={size}
            className="rounded-lg"
            color={color}
          />
        </div>
        <div
          className={cn(
            "relative z-10 h-full w-full overflow-hidden rounded-none bg-white shadow-sm ring-1 shadow-black/10 ring-black/5 dark:bg-neutral-800",
            contentClassName,
          )}
        >
          {children ? (
            children
          ) : src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className={cn("h-full w-full object-cover", imageClassName)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
