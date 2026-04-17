"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Bell,
  Camera,
  CirclePlus,
  Clock3,
  Code2,
  Dumbbell,
  Film,
  Flag,
  Headphones,
  House,
  Library,
  Menu,
  MoonStar,
  PersonStanding,
  Play,
  Repeat2,
  Search,
  Shuffle,
  TimerReset,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type InterestTrack = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  palette: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  tempo: string;
  length: string;
  year: string;
};

const interestTracks: InterestTrack[] = [
  {
    id: "jogging",
    title: "Jogging",
    subtitle: "Morning pace / reset loop",
    description:
      "Jogging gives me the cleanest mental reset. It is where I sort through ideas, simplify noisy problems, and get back to product work with a calmer head.",
    palette: "from-[#94d7ff] via-[#4ad6ff] to-[#d9fff5]",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1400&auto=format&fit=crop",
    icon: PersonStanding,
    tempo: "112 BPM",
    length: "04:18",
    year: "Reset",
  },
  {
    id: "anime",
    title: "Anime",
    subtitle: "Scene build / emotional timing",
    description:
      "Anime shapes how I think about pacing and payoff. The best arcs know when to hold back, when to hit hard, and how to make a reveal feel earned.",
    palette: "from-[#ffb17a] via-[#ff8d6f] to-[#ffe3b0]",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1400&auto=format&fit=crop",
    icon: Play,
    tempo: "148 BPM",
    length: "05:02",
    year: "Arc",
  },
  {
    id: "pop-culture",
    title: "Pop Culture",
    subtitle: "Movies + series / worldbuilding feed",
    description:
      "Great films and series keep me plugged into tone, framing, and atmosphere. I love stories that build a world strongly enough that even the interface around them feels memorable.",
    palette: "from-[#ffd36e] via-[#ff9a45] to-[#ffe8c4]",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1400&auto=format&fit=crop",
    icon: Film,
    tempo: "124 BPM",
    length: "03:56",
    year: "Screen",
  },
  {
    id: "chelsea",
    title: "Chelsea FC",
    subtitle: "Matchday focus / tactical obsession",
    description:
      "Chelsea is pure systems drama for me: structure, transitions, pressure, and those rare moments where shape and individual brilliance finally click at the same time.",
    palette: "from-[#78a7ff] via-[#1d63ff] to-[#dbe7ff]",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1400&auto=format&fit=crop",
    icon: Flag,
    tempo: "132 BPM",
    length: "04:44",
    year: "Matchday",
  },
  {
    id: "music",
    title: "Music",
    subtitle: "Headphones on / everything flows better",
    description:
      "Music is probably the strongest influence on how I design rhythm into interfaces. I like products that feel composed, layered, and replayable instead of merely functional.",
    palette: "from-[#9de7ff] via-[#4ad6ff] to-[#d7faff]",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1400&auto=format&fit=crop",
    icon: Headphones,
    tempo: "126 BPM",
    length: "04:11",
    year: "Loop",
  },
  {
    id: "photography",
    title: "Photography",
    subtitle: "Light study / framing habit",
    description:
      "Photography sharpens how I see contrast, space, and framing. It makes me more deliberate about what deserves focus and what should fall quietly into the background.",
    palette: "from-[#d6d2cb] via-[#9aa7b8] to-[#f6f0e8]",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
    icon: Camera,
    tempo: "90 BPM",
    length: "03:48",
    year: "Frame",
  },
  {
    id: "pushups",
    title: "Pushups",
    subtitle: "Micro-discipline / no excuses",
    description:
      "Pushups are the simplest kind of consistency signal. Small reps, repeatable effort, no drama. I like the same quality in engineering habits.",
    palette: "from-[#d4ff88] via-[#a7f45a] to-[#efffd4]",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop",
    icon: Dumbbell,
    tempo: "136 BPM",
    length: "02:57",
    year: "Discipline",
  },
  {
    id: "f1",
    title: "F1",
    subtitle: "Precision / pressure / milliseconds",
    description:
      "F1 is one of my favorite examples of ruthless optimization under pressure. Tiny gains matter, coordination matters, and the margin for error is basically gone.",
    palette: "from-[#ff9f9f] via-[#ff5f5f] to-[#ffd8d8]",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
    icon: TimerReset,
    tempo: "156 BPM",
    length: "03:34",
    year: "Speed",
  },
  {
    id: "tennis",
    title: "Tennis",
    subtitle: "Rhythm / control / sharp footwork",
    description:
      "Tennis feels like elegant problem-solving under motion. It has that balance of patience and sudden aggression that I really enjoy in both sport and product strategy.",
    palette: "from-[#fff69c] via-[#d8ff64] to-[#faffd8]",
    image:
      "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=1400&auto=format&fit=crop",
    icon: Trophy,
    tempo: "118 BPM",
    length: "03:21",
    year: "Rhythm",
  },
  {
    id: "food",
    title: "Food",
    subtitle: "Comfort mode / city exploration",
    description:
      "Food is one of my favorite ways to experience a place. I like discovering spots that feel specific, a little chaotic, and somehow exactly right.",
    palette: "from-[#ffc38e] via-[#ff8d6f] to-[#fff0d9]",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop",
    icon: UtensilsCrossed,
    tempo: "102 BPM",
    length: "04:07",
    year: "Comfort",
  },
  {
    id: "bed-rotting",
    title: "Bed-rotting",
    subtitle: "Low power mode / recovery window",
    description:
      "Sometimes the best productivity system is admitting that the system is offline for a while. Rest is part of the loop too, and I have made peace with that.",
    palette: "from-[#d8d5ff] via-[#a3a0ff] to-[#efedff]",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
    icon: MoonStar,
    tempo: "72 BPM",
    length: "06:12",
    year: "Offline",
  },
  {
    id: "vibe-coding",
    title: "Vibe-coding",
    subtitle: "Late night / flow state / shipping things",
    description:
      "Vibe-coding is what happens when design, code, references, and curiosity all line up. It is less about being messy and more about finding momentum while the idea is alive.",
    palette: "from-[#8ff0d8] via-[#4ad6ff] to-[#d9fff8]",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop",
    icon: Code2,
    tempo: "128 BPM",
    length: "05:27",
    year: "Flow",
  },
];

const playlistCover =
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1400&auto=format&fit=crop";

export function AboutInterestsPlayer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const activeTrack = interestTracks[activeIndex];
  const ActiveIcon = activeTrack.icon;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const activeButton = itemRefs.current[activeIndex];
    const list = listRef.current;
    if (!activeButton || !list) return;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const nextTop = Math.max(0, activeButton.offsetTop - list.clientHeight * 0.28);
    list.scrollTo({ top: nextTop, behavior: "smooth" });
  }, [activeIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const syncCompact = () => setIsCompact(mediaQuery.matches);

    syncCompact();
    mediaQuery.addEventListener("change", syncCompact);

    return () => {
      mediaQuery.removeEventListener("change", syncCompact);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || isCompact) return;

    gsap.registerPlugin(ScrollTrigger);

    const trackCount = interestTracks.length;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.14,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const scaledProgress = self.progress * (trackCount - 0.001);
        const nextIndex = Math.min(trackCount - 1, Math.floor(scaledProgress));
        setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isCompact]);

  if (isCompact) {
    return (
      <section className="relative overflow-hidden rounded-[32px] border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_92%,#0d1118),color-mix(in_srgb,var(--page-mid)_84%,#0b1016)_48%,color-mix(in_srgb,var(--page-end)_76%,#090d14)_100%)] shadow-[0_22px_70px_color-mix(in_srgb,var(--text-strong)_12%,transparent)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--accent-secondary)_16%,transparent),transparent_26%),radial-gradient(circle_at_84%_18%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_22%),linear-gradient(180deg,color-mix(in_srgb,var(--text-strong)_2%,transparent),transparent_30%,color-mix(in_srgb,var(--background)_8%,transparent)_100%)]" />
        <div className="relative">
          <div className="flex items-center justify-between border-b border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] px-4 py-4 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[color:color-mix(in_srgb,var(--text-strong)_48%,transparent)]">
              Interest player
            </p>
          </div>

          <div className="space-y-5 p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-end">
              <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--page-base)_10%,transparent),color-mix(in_srgb,var(--page-base)_66%,rgba(0,0,0,0.36)))] shadow-[0_18px_40px_rgba(0,0,0,0.24)]">
                <img
                  src={playlistCover}
                  alt="Interests playlist cover"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,14,0.02),rgba(7,10,16,0.58)_100%)]" />
                <span className="absolute left-3 top-3 text-[10px] uppercase tracking-[0.28em] text-white/80">
                  Album
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[color:color-mix(in_srgb,var(--text-strong)_48%,transparent)]">
                  Curated by Akshit
                </p>
                <h2 className="display max-w-[9ch] text-[clamp(2.5rem,12vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-[color:var(--text-strong)]">
                  Interests.
                </h2>
                <p className="text-sm leading-7 text-[color:color-mix(in_srgb,var(--text-strong)_70%,transparent)]">
                  Pick a track and the right panel becomes the currently playing interest.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--background)_8%,rgba(255,255,255,0.12))]">
              <div className="relative overflow-hidden">
                <img
                  src={activeTrack.image}
                  alt={activeTrack.title}
                  className="aspect-[1.35] w-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${activeTrack.palette} opacity-22 mix-blend-screen`} />
              </div>
              <div className="space-y-4 px-4 py-4">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${activeTrack.palette} text-[#081018] shadow-[0_12px_26px_rgba(0,0,0,0.2)]`}>
                    <ActiveIcon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[color:color-mix(in_srgb,var(--text-strong)_44%,transparent)]">
                      Now playing
                    </p>
                    <p className="truncate text-xl font-semibold tracking-[-0.04em] text-[color:var(--text-strong)]">
                      {activeTrack.title}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-7 text-[color:color-mix(in_srgb,var(--text-strong)_72%,transparent)]">
                  {activeTrack.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:color-mix(in_srgb,var(--text-strong)_48%,transparent)]">
                  <span>{activeTrack.subtitle}</span>
                  <span>•</span>
                  <span>{activeTrack.tempo}</span>
                  <span>•</span>
                  <span>{activeTrack.length}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[color:color-mix(in_srgb,var(--text-strong)_44%,transparent)]">
                  Playlist
                </p>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:color-mix(in_srgb,var(--text-strong)_38%,transparent)]">
                  {interestTracks.length} tracks
                </p>
              </div>
              <div className="space-y-2">
                {interestTracks.map((track, index) => {
                  const Icon = track.icon;
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "grid w-full grid-cols-[40px_1fr_auto] items-center gap-3 rounded-[20px] border px-3 py-3 text-left transition duration-300",
                        isActive
                          ? "border-[color:color-mix(in_srgb,var(--text-strong)_12%,transparent)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--text-strong)_12%,transparent),color-mix(in_srgb,var(--text-strong)_6%,transparent))]"
                          : "border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] bg-[color:color-mix(in_srgb,var(--background)_6%,rgba(255,255,255,0.08))]",
                      )}
                    >
                      <span className="text-sm text-[color:color-mix(in_srgb,var(--text-strong)_44%,transparent)]">
                        {index + 1}
                      </span>
                      <div className="flex min-w-0 items-center gap-3">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${track.palette} text-[#081018] shadow-[0_10px_24px_rgba(0,0,0,0.18)]`}>
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[color:var(--text-strong)]">
                            {track.title}
                          </p>
                          <p className="truncate text-xs text-[color:color-mix(in_srgb,var(--text-strong)_46%,transparent)]">
                            {track.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,var(--text-strong)_44%,transparent)]">
                        {track.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{
        height: `calc(100svh + ${(interestTracks.length - 1) * 14}rem)`,
      }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center py-5 md:py-6">
        <section className="relative h-[min(92svh,920px)] w-full overflow-hidden rounded-[42px] border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_92%,#0d1118),color-mix(in_srgb,var(--page-mid)_84%,#0b1016)_48%,color-mix(in_srgb,var(--page-end)_76%,#090d14)_100%)] shadow-[0_30px_100px_color-mix(in_srgb,var(--text-strong)_14%,transparent)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--accent-secondary)_16%,transparent),transparent_26%),radial-gradient(circle_at_84%_18%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_22%),linear-gradient(180deg,color-mix(in_srgb,var(--text-strong)_2%,transparent),transparent_30%,color-mix(in_srgb,var(--background)_8%,transparent)_100%)]" />

          <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] px-5 py-4 md:px-7">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          <div className="hidden min-w-[320px] items-center gap-3 rounded-full border border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] bg-[color:color-mix(in_srgb,var(--background)_8%,rgba(255,255,255,0.36))] px-4 py-2.5 md:flex">
            <Search className="h-4 w-4 text-[color:color-mix(in_srgb,var(--text-strong)_44%,transparent)]" />
            <span className="text-sm text-[color:color-mix(in_srgb,var(--text-strong)_56%,transparent)]">
              What do you want to play?
            </span>
          </div>

          <div className="flex items-center gap-3 text-[color:color-mix(in_srgb,var(--text-strong)_42%,transparent)]">
            <Bell className="h-4 w-4" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent-tertiary),var(--accent-secondary))] text-[13px] font-semibold text-[color:var(--text-inverse)]">
              A
            </div>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[74px_minmax(0,1.36fr)_minmax(310px,0.84fr)]">
          <aside className="hidden border-r border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] bg-[color:color-mix(in_srgb,var(--background)_18%,rgba(0,0,0,0.28))] lg:flex lg:flex-col lg:items-center lg:gap-5 lg:px-3 lg:py-5">
            {[House, Search, Library, CirclePlus, Menu].map((Icon, index) => (
              <button
                type="button"
                key={index}
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] ${
                  index === 2
                    ? "bg-[linear-gradient(135deg,var(--accent-secondary),var(--accent))] text-[color:var(--text-inverse)]"
                    : "bg-[color:color-mix(in_srgb,var(--background)_8%,rgba(255,255,255,0.1))] text-[color:color-mix(in_srgb,var(--text-strong)_54%,transparent)]"
                }`}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </aside>

          <div className="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)_auto] border-r border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)]">
            <div className="grid gap-5 border-b border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--text-strong)_5%,transparent),transparent)] px-5 py-5 md:grid-cols-[220px_minmax(0,1fr)] md:px-7 md:py-6">
              <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--page-base)_10%,transparent),color-mix(in_srgb,var(--page-base)_66%,rgba(0,0,0,0.36)))] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
                <img
                  src={playlistCover}
                  alt="Interests playlist cover"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,14,0.05),rgba(7,10,16,0.58)_100%)]" />
                <div className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.32em] text-white/76">
                  Playlist
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-end">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[color:color-mix(in_srgb,var(--text-strong)_46%,transparent)]">
                  Curated by Akshit
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTrack.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2 className="display mt-3 max-w-[10ch] text-[clamp(3rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[color:var(--text-strong)]">
                      {activeTrack.title}
                    </h2>
                    <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[color:color-mix(in_srgb,var(--text-strong)_62%,transparent)]">
                      <span className="font-medium text-[color:var(--text-strong)]">
                        Akshit
                      </span>
                      <span>•</span>
                      <span>{interestTracks.length} tracks</span>
                      <span>•</span>
                      <span>{activeTrack.length}</span>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] px-5 py-4 md:px-7">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-secondary))] text-[color:var(--text-inverse)] shadow-[0_20px_40px_rgba(0,0,0,0.24)]"
                  aria-label={`Play ${activeTrack.title}`}
                >
                  <Play className="ml-0.5 h-6 w-6 fill-current" />
                </button>
                <button type="button" className="text-[color:var(--accent)]">
                  <Shuffle className="h-5 w-5" />
                </button>
                <button type="button" className="text-[color:color-mix(in_srgb,var(--text-strong)_58%,transparent)]">
                  <Repeat2 className="h-5 w-5" />
                </button>
              </div>
              <div className="text-sm text-[color:color-mix(in_srgb,var(--text-strong)_54%,transparent)]">
                Recently added
              </div>
            </div>

            <div
              ref={listRef}
              className="min-h-0 overflow-y-auto px-3 py-3 [scrollbar-width:none] md:px-4 [&::-webkit-scrollbar]:hidden"
            >
              <div className="grid grid-cols-[44px_minmax(0,1.2fr)_minmax(0,0.72fr)_64px] items-center px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:color-mix(in_srgb,var(--text-strong)_42%,transparent)]">
                <span>#</span>
                <span>Title</span>
                <span>Lane</span>
                <span className="flex justify-end">
                  <Clock3 className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-1 space-y-1">
                {interestTracks.map((track, index) => {
                  const Icon = track.icon;
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={track.id}
                      ref={(node) => {
                        itemRefs.current[index] = node;
                      }}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`grid w-full grid-cols-[44px_minmax(0,1.2fr)_minmax(0,0.72fr)_64px] items-center gap-3 rounded-[18px] px-3 py-3 text-left transition duration-300 ${
                        isActive
                          ? "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--text-strong)_12%,transparent),color-mix(in_srgb,var(--text-strong)_6%,transparent))] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--text-strong)_6%,transparent)]"
                          : "hover:bg-[color:color-mix(in_srgb,var(--text-strong)_4%,transparent)]"
                      }`}
                    >
                      <span className="text-sm text-[color:color-mix(in_srgb,var(--text-strong)_44%,transparent)]">
                        {index + 1}
                      </span>

                      <div className="flex min-w-0 items-center gap-3">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${track.palette} text-[#081018] shadow-[0_10px_24px_rgba(0,0,0,0.18)]`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className={`truncate text-sm font-medium ${isActive ? "text-[color:var(--text-strong)]" : "text-[color:color-mix(in_srgb,var(--text-strong)_82%,transparent)]"}`}>
                            {track.title}
                          </p>
                          <p className="truncate text-xs text-[color:color-mix(in_srgb,var(--text-strong)_44%,transparent)]">
                            {track.subtitle}
                          </p>
                        </div>
                      </div>

                      <span className="truncate text-sm text-[color:color-mix(in_srgb,var(--text-strong)_56%,transparent)]">
                        {track.year}
                      </span>

                      <span className="text-right text-sm text-[color:color-mix(in_srgb,var(--text-strong)_46%,transparent)]">
                        {track.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] px-5 py-4 md:px-7">
              <div className="flex items-center gap-4">
                <span className="text-xs text-[color:color-mix(in_srgb,var(--text-strong)_42%,transparent)]">
                  00:00
                </span>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)]">
                  <motion.div
                    key={activeTrack.id}
                    initial={{ width: "10%" }}
                    animate={{ width: `${18 + ((activeIndex + 1) / interestTracks.length) * 60}%` }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${activeTrack.palette}`}
                  />
                </div>
                <span className="text-xs text-[color:color-mix(in_srgb,var(--text-strong)_42%,transparent)]">
                  {activeTrack.length}
                </span>
              </div>
            </div>
          </div>

          <aside className="hidden min-h-0 flex-col border-l border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] bg-[color:color-mix(in_srgb,var(--background)_10%,rgba(255,255,255,0.22))] lg:flex">
            <div className="border-b border-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)] px-5 py-5">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[color:color-mix(in_srgb,var(--text-strong)_46%,transparent)]">
                Selected interest
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-0 flex-1 flex-col px-5 py-5"
              >
                <div className="relative overflow-hidden rounded-[22px]">
                  <img
                    src={activeTrack.image}
                    alt={activeTrack.title}
                    className="aspect-[0.95] w-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activeTrack.palette} opacity-20 mix-blend-screen`} />
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${activeTrack.palette} text-[#081018] shadow-[0_12px_26px_rgba(0,0,0,0.2)]`}>
                    <ActiveIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[color:color-mix(in_srgb,var(--text-strong)_44%,transparent)]">
                      Now playing
                    </p>
                    <p className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[color:var(--text-strong)]">
                      {activeTrack.title}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-[color:color-mix(in_srgb,var(--text-strong)_72%,transparent)]">
                  {activeTrack.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
        </section>
      </div>
    </div>
  );
}
