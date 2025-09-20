import VideoCarousel from "../components/VideoCarousel";
import { useVideos } from "../features/videos/useVideos";
import type { VideoDoc } from "../features/videos/types";

/** UI'da görünmeyen SEO JSON-LD blokları */
function ProjelerSeoJsonLd({ items }: { items: VideoDoc[] }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arsa Grubu",
    url: "https://example.com",
    logo: "https://example.com/logo.png",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://example.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projeler",
        item: "https://example.com/projeler",
      },
    ],
  };

  const videos = (items || []).map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description:
      v.description ||
      "Bölgesel gelişim ve erişilebilirlik odaklı projeler hakkında bilgilendirici video.",
    thumbnailUrl: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
    publisher: { "@type": "Organization", name: "Arsa Grubu" },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videos) }}
      />
    </>
  );
}

export default function Projeler() {
  const { data, loading, error } = useVideos("projeler");

  return (
    <section
      id="projeler"
      role="region"
      aria-labelledby="projeler-title"
      className="min-h-screen max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-2 pb-0 scroll-mt-20"
    >
      {/* Başlık */}
      <header className="mb-6">
        <h2
          id="projeler-title"
          className="text-2xl md:text-3xl font-semibold text-[#151618]"
        >
          Projelerimiz
          {!loading && !error && data.length > 0 && (
            <span className="ml-2 align-middle text-sm font-normal text-gray-500">
              ({data.length})
            </span>
          )}
        </h2>
        <p className="mt-1 text-sm text-gray-700">
          Tüm projelerimizde “Her bütçeye uygun” Misyonuyla hareket eden MÇ
          İnşaat Yatırım Grubu olarak; 30 yıldır 1+1 2+1 3+1 4+1 daireler ve
          Villa Projelerimiz ile onlarca ailemizi konut sahibi yaptık. Kurumsal
          yapımızla, klasik inşaat üretimi anlayışını bir adım öteye taşıyarak
          temeli insan, doğaya saygı, modernlik, mimari ve teknolojiyi yatırım
          dünyasına kazandırdık. Mevcut coğrafyamızın sunduğu doğal güzellikleri
          evrensel olarak paylaşmaya imkan veren her bütçeye uygun daireler ve
          villa projelerimizi üretmeye devam ediyoruz.
        </p>

        <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-[#C32C31] via-[#CEBEBF] to-transparent" />
      </header>

      {/* Yükleniyor */}
      {loading && (
        <div
          aria-live="polite"
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#CEBEBF]/60 bg-white/80 backdrop-blur p-4 animate-pulse shadow-sm"
            >
              <div className="aspect-video rounded-xl bg-[#CEBEBF]/50" />
              <div className="h-3 w-1/2 mt-3 rounded bg-[#CEBEBF]/60" />
              <div className="h-3 w-1/3 mt-2 rounded bg-[#CEBEBF]/50" />
            </div>
          ))}
        </div>
      )}

      {/* Hata */}
      {!!error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-medium">Veri okunamadı</p>
          <p className="text-sm mt-1">{String(error)}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Tekrar Dene
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4v6h6M20 20v-6h-6M20 8a8 8 0 0 0-14.9-3M4 16a8 8 0 0 0 14.9 3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* İçerik */}
      {!loading && !error && (
        <>
          {data.length > 0 ? (
            <>
              <div className="-mb-2">
                <VideoCarousel
                  title={`Projelerimiz (${data.length})`}
                  items={data}
                />
              </div>
              {/* UI'da görünmeyen SEO JSON-LD */}
              <ProjelerSeoJsonLd items={data} />
            </>
          ) : (
            <div className="rounded-2xl border border-[#C32C31]/20 bg-white/80 backdrop-blur p-6 text-gray-700">
              <p className="font-medium text-[#151618]">
                Şu an görüntülenecek proje bulunamadı.
              </p>
              <p className="text-sm mt-1">
                Güncel proje listesi için
                <a
                  href="#iletisim"
                  className="ml-1 inline-flex items-center gap-1 font-medium text-[#C32C31] underline underline-offset-2 hover:text-[#B0282C]"
                >
                  İletişim
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
                bölümünden bize ulaşabilirsiniz.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
