import { useEffect, useMemo, useState, useId, useRef } from "react";
import YouTubePlayer from "./YouTubePlayer";
import type { VideoDoc } from "../features/videos/types";

type Props = {
  title?: string;
  items: VideoDoc[];
  autoPlaySec?: number;
};

export default function VideoCarouselGrid({ title, items, autoPlaySec }: Props) {
  if (!items.length) return null;

  // Layout sabitleri
  const GAP = 20;               // kartlar arası boşluk (px) - gap-5
  const TRACK_PAD_X = 56;       // oklar için soldan/sağdan iç boşluk (px) = pl-14/pr-14
  const OUTER_PAD_X = 16;       // genel güven payı
  const MAX_CARD_W = 220;
  const MIN_CARD_W = 150;

  // refs
  const containerRef = useRef<HTMLDivElement | null>(null);

  // responsive durumlar
  const [perPage, setPerPage] = useState(2);
  const [cardW, setCardW] = useState(200);
  const [containerW, setContainerW] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Container genişliğini canlı izleyelim (kartlar kesilmesin)
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cw = Math.floor(entry.contentRect.width);
        setContainerW(cw);
      }
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  // perPage ve cardW hesabı (ok & padding dahil)
  useEffect(() => {
    const compute = () => {
      // XL ve üstü 3, diğerleri 2
      const isXL = window.matchMedia("(min-width: 1280px)").matches;
      const nextPerPage = isXL ? 3 : 2;
      setPerPage(nextPerPage);

      // Kullanılabilir genişlik:
      // dış güven payı + ok alanı + kartlar arası boşluklar düşülür
      const usable =
        containerW -
        OUTER_PAD_X -
        TRACK_PAD_X * 2 -
        (nextPerPage - 1) * GAP;

      const calc = Math.floor(usable / nextPerPage);
      setCardW(Math.max(MIN_CARD_W, Math.min(MAX_CARD_W, calc)));
    };

    compute();
  }, [containerW]);

  // Sayfalama
  const [start, setStart] = useState(0);
  const getAt = (i: number) => items[(i + items.length) % items.length];
  const visible = useMemo(
    () => Array.from({ length: Math.min(perPage, items.length) }, (_, i) => getAt(start + i)),
    [items, start, perPage]
  );
  const prev = () => setStart((s) => (s - perPage + items.length) % items.length);
  const next = () => setStart((s) => (s + perPage) % items.length);

  // Autoplay (odak/hover iken dur)
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!autoPlaySec || items.length <= perPage || paused) return;
    const t = setInterval(next, autoPlaySec * 1000);
    return () => clearInterval(t);
  }, [autoPlaySec, items.length, perPage, paused]);

  // Klavye
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  // A11y
  const listId = useId();
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.floor(start / perPage) + 1;

  return (
    <div
      className="space-y-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={containerRef}
        className="relative max-w-[1200px] mx-auto outline-none"
        role="region"
        aria-roledescription="carousel"
        aria-label={title || "Video galerisi"}
        aria-live="polite"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Sol ok */}
        {items.length > perPage && (
          <button
            onClick={prev}
            aria-label="Önceki videolar"
            className="group absolute left-2 top-1/2 -translate-y-1/2
                       z-20 rounded-full size-9 grid place-items-center shadow-lg
                       bg-[#C32C31] text-white border border-[#C32C31]
                       hover:bg-[#B0282C] focus:outline-none"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Track: ok alanına çarpmaması için padding, kartların tam görünmesi için overflow-visible */}
        <div
          id={listId}
          className="flex flex-nowrap justify-center gap-5 pl-14 pr-14 overflow-visible"
          style={{ paddingLeft: TRACK_PAD_X, paddingRight: TRACK_PAD_X }}
        >
          {visible.map((v) => (
            <article
              key={v.id}
              className="flex flex-col items-center gap-3 shrink-0"
              style={{ width: cardW }}
              itemScope
              itemType="https://schema.org/VideoObject"
              role="group"
              aria-roledescription="slide"
            >
              <YouTubePlayer youtubeId={v.youtubeId} title={v.title} maxWidth={cardW} />
              <div className="relative -mt-2 w-full bg-white/90 backdrop-blur border border-gray-200/70 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-[#C32C31]/70" aria-hidden="true" />
                <h4 className="font-semibold text-sm leading-snug text-[#151618]" itemProp="name">
                  {v.title}
                </h4>
                {v.description && (
                  <p className="text-xs text-gray-700 mt-1.5 leading-relaxed" itemProp="description">
                    {v.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Sağ ok */}
        {items.length > perPage && (
          <button
            onClick={next}
            aria-label="Sonraki videolar"
            className="group absolute right-2 top-1/2 -translate-y-1/2
                       z-20 rounded-full size-9 grid place-items-center shadow-lg
                       bg-[#C32C31] text-white border border-[#C32C31]
                       hover:bg-[#B0282C] focus:outline-none"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* SR-only sayfa bilgisi */}
        {items.length > perPage && (
          <div className="sr-only" aria-live="polite">
            Sayfa {currentPage} / {totalPages}
          </div>
        )}
      </div>
    </div>
  );
}
