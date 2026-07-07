// Requires: npm install embla-carousel-react lucide-react
// Tailwind must be configured in your project (tailwind.config.js content globs, etc.)

import { useState, useEffect, useRef, useCallback, type ReactElement } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Terminal, Cpu, Network, FolderTree, type LucideIcon } from "lucide-react";

const SLIDE_DURATION = 4000;

// Types
interface Card {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
}

interface CarouselProps {
  autoplay?: boolean;
  slideDuration?: number;
}

const cards: Card[] = [
  {
    icon: Cpu,
    tag: "inference",
    title: "LM Studio",
    body: "Qwen2.5-Coder and Qwen3 run entirely on local hardware. Nothing leaves the machine, no key, no bill.",
  },
  {
    icon: Terminal,
    tag: "editor",
    title: "Continue",
    body: "Wires a local model straight into VS Code for autocomplete and chat, keeping the whole loop offline.",
  },
  {
    icon: Network,
    tag: "tool use",
    title: "MCP servers",
    body: "A Playwright-backed server gives the agent live web search without leaving the editor.",
  },
  {
    icon: FolderTree,
    tag: "agent mode",
    title: "Project awareness",
    body: "Agent mode reads the whole folder structure before it writes a single line of code.",
  },
];

export default function LocalToolingCarousel({ slideDuration = SLIDE_DURATION }: CarouselProps = {}): ReactElement {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [active, setActive] = useState<number>(0);
  const [runId, setRunId] = useState<number>(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep `active` in sync with embla's real selected index
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = (): void => {
      setActive(emblaApi.selectedScrollSnap());
      setRunId((r: number) => r + 1);
    };

    emblaApi.on("select", onSelect);

    return (): void => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number): void => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const advance = useCallback((): void => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = setTimeout(advance, slideDuration);

    return (): void => {
      clearTimeout(timeoutRef.current!);
    };
  }, [active, runId, advance, slideDuration]);

  const handleManualNav = (index: number): void => {
    if (index === active) {
      setRunId((r: number) => r + 1);
      return;
    }
    scrollTo(index);
  };

  return (
    <div className="w-full max-w-3xl">
      <style>{`
        @keyframes fill-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .lac-fill {
          animation: fill-progress ${slideDuration}ms linear forwards;
        }
        .lac-fill.paused {
          animation-play-state: paused;
        }
      `}</style>

      {/* Progress segments */}
      <div className="mt-4 flex gap-1.5">
        {cards.map((_: Card, i: number) => (
          <button
            key={i}
            onClick={() => handleManualNav(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-0.75 flex-1 overflow-hidden rounded-full bg-white/30">
            {i < active && <div className="absolute inset-0 bg-slate-100" />}
            {i === active && <div key={runId} className={`lac-fill absolute inset-0 bg-slate-100`} />}
          </button>
        ))}
      </div>

      {/* Embla viewport */}
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {cards.map((card: Card, i: number) => {
            const Icon: LucideIcon = card.icon;
            return (
              <div key={i} className="relative min-w-0 flex-[0_0_100%] overflow-hidden py-6 min-h-47.5">
                <div className="mt-1.5 mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-amber-400">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="mb-0.5 text-[11px] uppercase tracking-widest text-amber-400">{card.tag}</div>
                    <div className="text-lg font-semibold text-slate-100">{card.title}</div>
                  </div>
                </div>

                <p className="font-sans text-sm leading-relaxed text-slate-400">{card.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
