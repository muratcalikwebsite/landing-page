import { useRef, useMemo, useState } from "react";

type Props = {
  youtubeId: string;
  title?: string;
  maxWidth?: number; // px
};

export default function YouTubePlayer({
  youtubeId,
  title,
  maxWidth = 220,
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [muted, setMuted] = useState(true);

  const src = useMemo(() => {
    const base = `https://www.youtube.com/embed/${youtubeId}`;
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      autoplay: "1",
      mute: "1", // başlangıçta sessiz
      loop: "1",
      playlist: youtubeId,
      controls: "1",
      fs: "1",
      enablejsapi: "1",
      origin: window.location.origin,
    });
    return `${base}?${params.toString()}`;
  }, [youtubeId]);

  const postMsg = (func: string) =>
    JSON.stringify({ event: "command", func, args: [] });

  const toggleMute = () => {
    const el = iframeRef.current;
    if (!el) return;
    try {
      if (muted) {
        el.contentWindow?.postMessage(postMsg("unMute"), "*");
        el.contentWindow?.postMessage(postMsg("playVideo"), "*");
      } else {
        el.contentWindow?.postMessage(postMsg("mute"), "*");
      }
      setMuted((m) => !m);
    } catch {
      /* no-op */
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-black"
      style={{
        aspectRatio: "9 / 16",
        width: `${maxWidth}px`,
        maxWidth: "100%",
      }}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title ?? "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        className="absolute inset-0 w-full h-full pointer-events-none" // YouTube'a tıklama yok
      />

      {/* Ses kontrol butonu */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 
             flex items-center gap-1 rounded-full 
             bg-black/60 backdrop-blur px-3 py-1 
             text-xs text-white whitespace-nowrap 
             hover:bg-black/70 active:scale-95 transition"
        aria-label={muted ? "Sesi aç" : "Sesi kapat"}
      >
        {muted ? "🔇 Ses Aç" : "🔊 Ses Kapat"}
      </button>
    </div>
  );
}
