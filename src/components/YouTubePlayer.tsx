import { useRef, useMemo } from "react";

type Props = {
  youtubeId: string;
  title?: string;
  maxWidth?: number; // px
  maskTopPx?: number; // kullanılmıyor
};

export default function YouTubePlayer({ youtubeId, title, maxWidth = 220 }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Tek yerde parametreleri üretelim
  const src = useMemo(() => {
    const base = `https://www.youtube.com/embed/${youtubeId}`;
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      autoplay: "1",
      mute: "1",             // başlangıçta sessiz (autoplay için gerekli)
      loop: "1",
      playlist: youtubeId,   // loop çalışsın diye
      controls: "1",         // tam ekranda kontrol lazım
      fs: "1",               // fullscreen butonu yetkisi
      enablejsapi: "1",      // postMessage komutları için
      origin: window.location.origin,
    });
    return `${base}?${params.toString()}`;
  }, [youtubeId]);

  const goFullscreenAndUnmute = () => {
    const el = iframeRef.current;
    if (!el) return;

    // 1) Tam ekran iste
    try {
      // Safari iOS izinlerinde kullanıcı jesti içinde olmalı
      (el.requestFullscreen || (el as any).webkitRequestFullscreen || (el as any).msRequestFullscreen)?.call(el);
    } catch {/* yumuşak geç */}

    // 2) Sesi aç + oynat (YouTube Iframe API postMessage)
    const msg = (func: string) =>
      JSON.stringify({ event: "command", func, args: [] });
    try {
      el.contentWindow?.postMessage(msg("unMute"), "*");
      el.contentWindow?.postMessage(msg("playVideo"), "*");
    } catch {/* no-op */}
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goFullscreenAndUnmute();
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-black cursor-pointer"
      style={{ aspectRatio: "9 / 16", width: `${maxWidth}px`, maxWidth: "100%" }}
      role="button"
      tabIndex={0}
      aria-label={title ? `${title} videosunu tam ekranda aç` : "Videoyu tam ekranda aç"}
      onClick={goFullscreenAndUnmute}
      onKeyDown={onKey}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title ?? "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
      {/* İpucu katmanı (isteğe bağlı) */}
      <div className="pointer-events-none absolute bottom-1 right-1 rounded-md bg-black/40 px-2 py-1 text-[10px] text-white">
        Dokun/Tıkla: Tam ekran + Ses
      </div>
    </div>
  );
}
