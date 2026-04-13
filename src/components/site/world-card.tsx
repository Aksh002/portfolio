import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { InterestWorld } from "@/lib/types";

const accents = {
  football: "from-lime-300/[0.28] via-lime-400/[0.12] to-transparent",
  anime: "from-rose-300/[0.28] via-orange-300/[0.12] to-transparent",
  music: "from-cyan-300/[0.28] via-sky-300/[0.12] to-transparent",
} as const;

export function WorldCard({ world }: { world: InterestWorld }) {
  return (
    <Card className="group relative overflow-hidden p-0">
      <div className={`absolute inset-0 bg-gradient-to-br ${accents[world.key]} opacity-90`} />
      <div className="relative space-y-6 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
              {world.kicker}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text-strong)]">
              {world.title}
            </h3>
          </div>
          <span className="rounded-full border border-[color:var(--panel-border)] bg-[color:rgba(255,255,255,0.08)] p-2 text-[color:var(--text-soft)] transition group-hover:translate-x-0.5 group-hover:translate-y-[-0.5px]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <p className="text-sm leading-7 text-[color:var(--text-muted)]">{world.description}</p>
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
            Interface motifs
          </p>
          <div className="flex flex-wrap gap-2">
            {world.motifs.map((motif) => (
              <span
                key={motif}
                className="rounded-full border border-[color:var(--panel-border)] bg-[color:rgba(0,0,0,0.08)] px-3 py-1.5 text-xs text-[color:var(--text-muted)]"
              >
                {motif}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm leading-7 text-[color:var(--text-soft)]">{world.uiTreatment}</p>
      </div>
    </Card>
  );
}
