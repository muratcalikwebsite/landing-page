import { useEffect, useMemo, useState, useId, useRef } from "react";
import YouTubePlayer from "./YouTubePlayer";
import type { VideoDoc } from "../features/videos/types";

type Props = {
  title?: string;
  items: VideoDoc[];
  /** otomatik geçiş (sn) – odak/hover varken durur */
  autoPlaySec?: number;
};

export default function VideoCarouselGrid({ title, items, autoPlaySec }: Props) {
  const VIDEO_W = 260;

  // Kaç kart görünecek?
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1280) setPerPage(3);
      else if (w >= 768) setPerPage(2);
      else setPerPage(1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Sayfalama durumu
  const [start, setStart] = useState(0);
  const getAt = (i: number) => items[(i + items.length) % items.length];
  const visible = useMemo(
    () => Array.from({ length: Math.min(perPage, items.length) }, (_, i) => getAt(start + i)),
    [items, start, perPage]
  );
  const prev = () => setStart((s) => (s - perPage + items.length) % items.length);
  const next = () => setStart((s) => (s + perPage) % items.length);

  // Autoplay (hover/focus iken dur)
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!autoPlaySec || items.length <= perPage || paused) return;
    const t = setInterval(next, autoPlaySec * 1000);
    return () => clearInterval(t);
  }, [autoPlaySec, items.length, perPage, paused]);

  // Klavye ile gezinme (←/→)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  // A11y id’leri ve sayfa bilgisi
  const listId = useId();
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.floor(start / perPage) + 1;

  if (!items.length) return null;

  return (
    <div
      className="space-y-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Başlık + ince marka ayraç
      {title && (
        <header className="mb-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl md:text-2xl font-semibold text-[#151618]">{title}</h3>
            <span className="h-1 w-20 rounded-full bg-gradient-to-r from-[#C32C31] via-[#CEBEBF] to-transparent" />
          </div>
          <p className="sr-only">Video galerisi, {items.length} öğe.</p>
        </header>
      )} */}

      {/* İç kapsayıcı: oklar sabit, grid ortalı */}
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
            className="group absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                       rounded-full size-10 grid place-items-center shadow-lg
                       bg-[#C32C31] text-white border border-[#C32C31]
                       hover:bg-[#B0282C] hover:scale-105 focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-[#C32C31]/40"
          >
            <svg className="w-5 h-5 group-active:-translate-x-[1px] transition-transform" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Kartlar */}
        <div id={listId} className="flex flex-wrap justify-center gap-7">
          {visible.map((v) => (
            <article
              key={v.id}
              className="flex flex-col items-center gap-3"
              style={{ width: VIDEO_W }}
              itemScope
              itemType="https://schema.org/VideoObject"
              role="group"
              aria-roledescription="slide"
            >
              <YouTubePlayer youtubeId={v.youtubeId} title={v.title} maxWidth={VIDEO_W} />
              <div className="relative w-full bg-white/90 backdrop-blur border border-gray-200/70 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                {/* İnce marka şeridi */}
                <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-[#C32C31]/70" aria-hidden="true" />
                <h4 className="font-semibold text-base leading-snug text-[#151618]" itemProp="name">
                  {v.title}
                </h4>
                {v.description && (
                  <p className="text-sm text-gray-700 mt-1.5 leading-relaxed" itemProp="description">
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
            className="group absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                       rounded-full size-10 grid place-items-center shadow-lg
                       bg-[#C32C31] text-white border border-[#C32C31]
                       hover:bg-[#B0282C] hover:scale-105 focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-[#C32C31]/40"
          >
            <svg className="w-5 h-5 group-active:translate-x-[1px] transition-transform" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Ekran okuyucuya durum bildirimi */}
        {items.length > perPage && (
          <div className="sr-only" aria-live="polite">
            Sayfa {currentPage} / {totalPages}
          </div>
        )}
      </div>
    </div>
  );
}
