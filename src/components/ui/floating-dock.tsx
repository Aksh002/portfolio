"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  IconChevronDown,
  IconLayoutNavbarCollapse,
  IconX,
} from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";

export type FloatingDockSubItem = {
  title: string;
  icon: React.ReactNode;
  href?: string;
};

export type FloatingDockItem = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  items?: FloatingDockSubItem[];
};

export const FloatingDock = ({
  items,
  activeHref,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  activeHref?: string;
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} activeHref={activeHref} className={desktopClassName} />
      <FloatingDockMobile items={items} activeHref={activeHref} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  activeHref,
  className,
}: {
  items: FloatingDockItem[];
  activeHref?: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-3 flex min-w-[220px] flex-col gap-2 rounded-[28px] border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_86%,rgba(6,9,16,0.94)),color-mix(in_srgb,var(--page-mid)_78%,rgba(10,13,24,0.88)))] p-2.5 shadow-[0_22px_55px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {item.items?.length ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((current) => (current === item.title ? null : item.title))
                      }
                      className="flex w-full items-center gap-3 rounded-[22px] bg-[color:var(--nav-hover)] px-3 py-3 text-sm text-[color:var(--text-soft)] transition duration-300 hover:text-[color:var(--text-strong)]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--panel-border)] bg-[color:color-mix(in_srgb,var(--background)_12%,transparent)]">
                        <span className="h-4 w-4">{item.icon}</span>
                      </span>
                      <span className="font-medium tracking-[0.08em]">{item.title}</span>
                      <IconChevronDown
                        className={cn(
                          "ml-auto h-4 w-4 transition-transform duration-300",
                          expanded === item.title && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {expanded === item.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-5 gap-2 px-1 pb-1">
                            {item.items.map((subItem) =>
                              subItem.href ? (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  target={subItem.href.startsWith("mailto:") ? undefined : "_blank"}
                                  rel={subItem.href.startsWith("mailto:") ? undefined : "noreferrer"}
                                  onClick={() => setOpen(false)}
                                  className="flex h-11 items-center justify-center rounded-[18px] border border-[color:var(--panel-border)] bg-[color:color-mix(in_srgb,var(--background)_10%,transparent)] text-[color:var(--text-soft)] transition hover:border-[color:color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] hover:text-[color:var(--text-strong)]"
                                  aria-label={subItem.title}
                                >
                                  <span className="h-4 w-4">{subItem.icon}</span>
                                </Link>
                              ) : (
                                <span
                                  key={subItem.title}
                                  className="flex h-11 items-center justify-center rounded-[18px] border border-[color:var(--panel-border)] bg-[color:color-mix(in_srgb,var(--background)_8%,transparent)] text-[color:var(--text-faint)]"
                                  aria-label={subItem.title}
                                >
                                  <span className="h-4 w-4">{subItem.icon}</span>
                                </span>
                              ),
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    key={item.title}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-[22px] px-3 py-3 text-sm transition duration-300",
                      activeHref === item.href
                        ? "bg-[linear-gradient(135deg,var(--accent),var(--accent-secondary))] text-[color:var(--text-inverse)] shadow-[0_14px_28px_rgba(74,214,255,0.2)]"
                        : "bg-[color:var(--nav-hover)] text-[color:var(--text-soft)] hover:text-[color:var(--text-strong)]",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border transition",
                        activeHref === item.href
                          ? "border-black/10 bg-black/10"
                          : "border-[color:var(--panel-border)] bg-[color:color-mix(in_srgb,var(--background)_12%,transparent)]",
                      )}
                    >
                      <span className="h-4 w-4">{item.icon}</span>
                    </span>
                    <span className="font-medium tracking-[0.08em]">{item.title}</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_80%,rgba(8,12,18,0.86)),color-mix(in_srgb,var(--page-mid)_72%,rgba(10,14,22,0.92)))] backdrop-blur-xl transition hover:scale-[1.03]"
      >
        {open ? (
          <IconX className="h-5 w-5 text-[color:var(--text-strong)]" />
        ) : (
          <IconLayoutNavbarCollapse className="h-5 w-5 text-[color:var(--text-strong)]" />
        )}
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  activeHref,
  className,
}: {
  items: FloatingDockItem[];
  activeHref?: string;
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-14 items-center gap-2 rounded-full px-1.5 py-1.5 md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} active={activeHref === item.href} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  items,
  active,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  items?: FloatingDockSubItem[];
  active?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [42, 72, 42]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [42, 72, 42]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [18, 28, 18]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [18, 28, 18]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const hasMenu = Boolean(items?.length);

  const bubble = (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full border transition-colors duration-300",
          active
            ? "border-transparent bg-[linear-gradient(135deg,var(--accent),var(--accent-secondary))] text-[color:var(--text-inverse)] shadow-[0_16px_36px_rgba(74,214,255,0.24)]"
            : "border-[color:var(--panel-border)] bg-[color:var(--nav-hover)] text-[color:var(--text-soft)] hover:text-[color:var(--accent-secondary)]",
        )}
      >
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {hovered && !hasMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -3, x: "-50%" }}
            className="surface-dark absolute top-full left-1/2 z-20 mt-3 w-fit rounded-full px-3 py-1.5 text-[10px] font-medium uppercase whitespace-pre tracking-[0.24em] text-[color:var(--text-strong)]"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {hovered && hasMenu && (
          <motion.div
            initial={{ opacity: 0, y: -6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -4, x: "-50%" }}
            className="absolute top-full left-1/2 z-30 mt-3 flex items-center gap-2"
          >
            {items?.map((subItem, index) => (
              <motion.div
                key={subItem.title}
                initial={{ opacity: 0, y: -8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.94 }}
                transition={{ delay: index * 0.03 }}
              >
                <SubBubble item={subItem} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (!href || hasMenu) {
    return bubble;
  }

  return (
    <Link href={href} aria-label={title} aria-current={active ? "page" : undefined}>
      {bubble}
    </Link>
  );
}

function SubBubble({ item }: { item: FloatingDockSubItem }) {
  const [hovered, setHovered] = useState(false);

  const bubbleCore = (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--panel-border)] bg-[color:color-mix(in_srgb,var(--background)_14%,transparent)] text-[color:var(--text-soft)] backdrop-blur-xl transition hover:text-[color:var(--accent-secondary)]",
        !item.href && "opacity-55",
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -3, x: "-50%" }}
            className="surface-dark absolute top-full left-1/2 z-20 mt-2 rounded-full px-3 py-1.5 text-[10px] font-medium uppercase whitespace-pre tracking-[0.24em] text-[color:var(--text-strong)]"
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>
      <span className="h-4 w-4">{item.icon}</span>
    </motion.div>
  );

  if (!item.href) {
    return bubbleCore;
  }

  return (
    <Link
      href={item.href}
      target={item.href.startsWith("mailto:") ? undefined : "_blank"}
      rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
      aria-label={item.title}
    >
      {bubbleCore}
    </Link>
  );
}
