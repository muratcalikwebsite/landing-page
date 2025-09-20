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
  const GAP = 20;               // kartlar arası boşluk (px)
  const TRACK_PAD_X = 56;       // oklar için iç boşluk (pl-14/pr-14)
  const OUTER_PAD_X = 16;       // genel güven payı
  const MAX_CARD_W = 220;
  const MIN_CARD_W = 150;

  // refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // responsive durumlar
  const [perPage, setPerPage] = useState(2);
  const [cardW, setCardW] = useState(200);
  const [containerW, setContainerW] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Container genişliğini canlı izle
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

  // perPage ve cardW hesabı
  useEffect(() => {
    const compute = () => {
      const isXL = window.matchMedia("(min-width: 1280px)").matches;
      const nextPerPage = isXL ? 3 : 2;
      setPerPage(nextPerPage);

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

  // Drag-to-scroll state
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDownRef.current = true;
    startXRef.current = e.clientX;
    startScrollRef.current = trackRef.current.scrollLeft;
    // drag sırasında text seçimi engelle
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  };
  const endDrag = () => {
    isDownRef.current = false;
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !trackRef.current) return;
    const dx = e.clientX - startXRef.current;
    trackRef.current.scrollLeft = startScrollRef.current - dx;
  };

  // Touch drag (mobil)
  const touchStartX = useRef(0);
  const touchStartScroll = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartScroll.current = trackRef.current.scrollLeft;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    trackRef.current.scrollLeft = touchStartScroll.current - dx;
  };

  // Oklar
  const pageWidth = useMemo(() => perPage * cardW + (perPage - 1) * GAP, [perPage, cardW]);
  const prev = () => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: -pageWidth, behavior: "smooth" });
  };
  const next = () => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: pageWidth, behavior: "smooth" });
  };

  // Autoplay (odak/hover iken dur)
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!autoPlaySec || items.length <= perPage || paused) return;
    const t = setInterval(() => {
      if (!trackRef.current) return;
      trackRef.current.scrollBy({ left: cardW + GAP, behavior: "smooth" });
      // sona geldiyse başa sar
      const el = trackRef.current;
      const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - (cardW + GAP);
      if (nearEnd) {
        // küçük bir gecikmeyle başa al
        setTimeout(() => {
          el.scrollTo({ left: 0, behavior: "smooth" });
        }, 300);
      }
    }, autoPlaySec * 1000);
    return () => clearInterval(t);
  }, [autoPlaySec, items.length, perPage, paused, cardW]);

  // Klavye ile kaydırma
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  // A11y
  const listId = useId();

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

        {/* Track: yatay scroll + drag + snap */}
        <div
          id={listId}
          ref={trackRef}
          className="flex flex-nowrap items-stretch gap-5 pl-14 pr-14 overflow-x-auto overflow-y-visible
                     scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingLeft: TRACK_PAD_X, paddingRight: TRACK_PAD_X }}
          onMouseDown={onMouseDown}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        >
          {items.map((v) => (
            <article
              key={v.id}
              className="flex flex-col items-center gap-3 shrink-0 snap-start"
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
      </div>
    </div>
  );
}
