import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <Badge>{eyebrow}</Badge>
      <div className="space-y-3">
        <h2 className="accent-gradient-text text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--text-soft)] md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
