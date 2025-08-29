type Props = {
  youtubeId: string;
  title?: string;

  // Eski kullanımlar kırılmasın diye opsiyonel tuttum:
  maxWidth?: number;   // px, ör: 240
  maskTopPx?: number;  // kullanılmıyor ama prop kalsın
};

export default function YouTubePlayer({ youtubeId, title, maxWidth = 220 }: Props) {
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
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&controls=0&modestbranding=1&playsinline=1&autoplay=1&mute=1&loop=1&playlist=${youtubeId}`}
        title={title ?? "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
