export default function Loading() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center px-4 py-16">
      <div className="relative w-full max-w-[28rem] overflow-hidden rounded-[32px] border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--page-base)_82%,rgba(7,10,18,0.96)),color-mix(in_srgb,var(--page-mid)_74%,rgba(9,11,20,0.9))_48%,color-mix(in_srgb,var(--page-end)_66%,rgba(15,10,24,0.86))_100%)] px-6 py-7 shadow-[0_24px_70px_color-mix(in_srgb,var(--text-strong)_12%,transparent)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,color-mix(in_srgb,var(--accent-secondary)_14%,transparent),transparent_26%),radial-gradient(circle_at_84%_22%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_24%)]" />
        <div className="relative">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[color:color-mix(in_srgb,var(--text-strong)_52%,transparent)]">
            Loading / Portfolio
          </p>
          <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.3rem)] font-semibold uppercase leading-[0.94] tracking-[-0.06em] text-[color:var(--text-strong)]">
            Composing the next surface.
          </h2>
          <p className="mt-3 max-w-[28rem] text-sm leading-7 text-[color:color-mix(in_srgb,var(--text-strong)_68%,transparent)]">
            Pulling the next section into place with the same calm systems and atmospheric chrome.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[color:var(--accent)]" />
            <span
              className="h-2.5 w-2.5 animate-pulse rounded-full bg-[color:var(--accent-secondary)]"
              style={{ animationDelay: "120ms" }}
            />
            <span
              className="h-2.5 w-2.5 animate-pulse rounded-full bg-[color:var(--accent-tertiary)]"
              style={{ animationDelay: "240ms" }}
            />
          </div>

          <div className="mt-6 overflow-hidden rounded-full bg-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)]">
            <div className="h-1.5 w-2/3 animate-pulse rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-secondary),var(--accent-tertiary))]" />
          </div>
        </div>
      </div>
    </div>
  );
}
