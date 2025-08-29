import { useEffect, useState, useMemo } from "react";
import Modal from "../components/Modal";
import portrait from "../assets/images/muratcalik.jpg";

type Publication = {
  id: number;
  title: string;
  summary?: string;
  cover?: string;
};

export default function Kurumsal() {
  const [bioOpen, setBioOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Yayınlar için modal state
  const [pubOpen, setPubOpen] = useState(false);
  const [pubIndex, setPubIndex] = useState<number>(0);

  // İçerik: SEO dostu kısa metinler
  const bioExcerpt = useMemo(
    () =>
      "Murat Çalık; Tekirdağ Marmaraereğlisi ve çevresinde arsa geliştirme ve gayrimenkul projelerine odaklanır. Bölgesel deneyim, şeffaf süreç yönetimi ve sürdürülebilir değer yaklaşımıyla yatırımcılara uçtan uca çözüm sunar.",
    []
  );

  const aboutExcerpt = useMemo(
    () =>
      "Bölgenin imar, altyapı ve ulaşım dinamiklerine hâkim ekibimiz; arsa alım-satımı, değerleme, fizibilite ve proje geliştirme süreçlerinde danışmanlık sağlar. Doğru konum, metrekare ve bütçe dengesiyle güvenilir yatırım imkânları yaratır.",
    []
  );

  const publications: Publication[] = [
    {
      id: 1,
      title: "Bölgesel Arsa Piyasası Analizi",
      summary:
        "Marmaraereğlisi’nde arsa arz-talep dengesi ve fiyat dinamiklerine genel bakış.",
    },
    {
      id: 2,
      title: "İmar ve Altyapı Rehberi",
      summary:
        "Yatırım öncesi imar planı, emsal, yol ve altyapı kontrolleri için pratik kontrol listesi.",
    },
    {
      id: 3,
      title: "Ulaşım ve Erişilebilirlik",
      summary:
        "Bölgedeki ana ulaşım aksları ve planlanan yatırımların değere etkisi.",
    },
    {
      id: 4,
      title: "Yatırımda Risk Yönetimi",
      summary:
        "Arsa yatırımında hukuki, teknik ve finansal riskleri azaltma yaklaşımları.",
    },
    {
      id: 5,
      title: "Projelerde Şeffaf Süreç",
      summary:
        "Zaman çizelgesi, izinler ve raporlama standartlarıyla şeffaf yönetim modeli.",
    },
    {
      id: 6,
      title: "Sürdürülebilir Değer Yaklaşımı",
      summary:
        "Uzun vadeli değer üretimi için çevresel ve sosyal faktörlerin dikkate alınması.",
    },
  ];

  const openPub = (index: number) => {
    setPubIndex(index);
    setPubOpen(true);
  };
  const closePub = () => setPubOpen(false);
  const prevPub = () =>
    setPubIndex((i) => (i - 1 + publications.length) % publications.length);
  const nextPub = () => setPubIndex((i) => (i + 1) % publications.length);

  // Klavye oklarıyla gezinme
  useEffect(() => {
    if (!pubOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePub();
      if (e.key === "ArrowLeft") prevPub();
      if (e.key === "ArrowRight") nextPub();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pubOpen]);

  const Card = ({ children }: { children: React.ReactNode }) => (
    <article className="rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-shadow p-5">
      {children}
    </article>
  );

  const PillButton = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#C32C31] px-4 py-2 text-white shadow-sm
                 hover:bg-[#B0282C] active:scale-[0.98] transition-all
                 focus:outline-none focus:ring-2 focus:ring-[#C32C31]/30"
    >
      {children}
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <section
      id="kurumsal"
      role="region"
      aria-labelledby="kurumsal-title"
      className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-12 scroll-mt-20"
    >
      {/* Başlık */}
      <div className="mb-8">
        <h2 id="kurumsal-title" className="text-2xl md:text-3xl font-semibold">
          Kurumsal
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Marmaraereğlisi ve çevresinde arsa geliştirme ve gayrimenkul
          projelerinde şeffaf, veri odaklı ve sürdürülebilir bir yaklaşım. Doğru
          yatırım için imar, altyapı ve ulaşım kriterlerini birlikte ele
          alıyoruz.
        </p>
        <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-[#C32C31] via-[#CEBEBF] to-transparent" />
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Biyografi */}
        <Card>
          <div className="relative overflow-hidden rounded-xl mb-4">
            <img
              src={portrait}
              alt="Murat Çalık portresi — Tekirdağ Marmaraereğlisi'nde arsa geliştirme ve gayrimenkul projeleri"
              className="h-48 w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3 className="font-semibold text-lg">Murat Çalık’ın Biyografisi</h3>
          <p className="text-sm text-gray-700 mt-1">{bioExcerpt}</p>
          <PillButton onClick={() => setBioOpen(true)}>Devamı</PillButton>
        </Card>

        {/* Biz Kimiz */}
        <Card>
          <h3 className="font-semibold text-lg mb-2">Biz Kimiz?</h3>
          <p className="text-sm text-gray-700">{aboutExcerpt}</p>
          <PillButton onClick={() => setAboutOpen(true)}>Devamı</PillButton>
        </Card>

        {/* Yayınlar */}
        <Card>
          <h3 className="font-semibold text-lg mb-3">Yayınlarımız</h3>
          <div className="grid grid-cols-3 gap-2">
            {publications.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => openPub(idx)}
                aria-label={`${p.title} detayını aç`}
                title={p.title}
                className="group relative rounded-lg overflow-hidden aspect-square bg-gray-100
                           ring-1 ring-gray-200 hover:ring-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <div className="absolute inset-0 grid place-items-center text-gray-400">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M8 14l3-3 3 3 2-2 2 2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {/* Başlık overlay (UX) */}
                <div className="absolute inset-x-0 bottom-0 bg-white/80 backdrop-blur px-2 py-1 text-[12px] text-gray-700 line-clamp-2">
                  {p.title}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Modallar */}
      <Modal
        open={bioOpen}
        onClose={() => setBioOpen(false)}
        title="Murat Çalık’ın Biyografisi"
      >
        <div className="prose prose-sm max-w-none text-gray-700">
          <p>
            {bioExcerpt} Yatırım öncesi süreçte konum analizi, imar ve altyapı
            kontrolleri, değerleme ve fizibilite başlıklarında danışmanlık
            sunar; proje geliştirme aşamalarında şeffaf raporlama ve yerinde
            inceleme imkânı sağlar.
          </p>
        </div>
      </Modal>

      <Modal
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        title="Biz Kimiz?"
      >
        <div className="prose prose-sm max-w-none text-gray-700">
          <p>
            {aboutExcerpt} Süreçlerimiz; ön analiz, hukuki/teknik doğrulamalar,
            planlama ve uygulama etaplarıyla ilerler. Amaç, yatırım
            hedeflerinize uygun şekilde riskleri azaltarak uzun vadeli değer
            üretmektir.
          </p>
        </div>
      </Modal>

      <Modal
        open={pubOpen}
        onClose={closePub}
        title={publications[pubIndex]?.title || "Yayın Detayı"}
        closeOnOutside={false} // yanlışlıkla kapanmasın
      >
        {/* Üst araç çubuğu */}
        {publications.length > 1 && (
          <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              {pubIndex + 1} / {publications.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevPub}
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 hover:bg-gray-50"
                aria-label="Önceki yayın"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Önceki
              </button>
              <button
                onClick={nextPub}
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 hover:bg-gray-50"
                aria-label="Sonraki yayın"
              >
                Sonraki
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* İçerik */}
        {publications.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200 aspect-[4/3] grid place-items-center text-gray-400">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M8 14l3-3 3 3 2-2 2 2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="min-w-0">
              {publications[pubIndex].summary ? (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {publications[pubIndex].summary}
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Bu yayın için açıklama eklenmemiş.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
