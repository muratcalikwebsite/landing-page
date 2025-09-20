import { useEffect, useState, useMemo, type ReactNode } from "react";
import Modal from "../components/Modal";
import portrait from "../assets/images/muratcalik.jpg";
import signature from "../assets/images/imza.jpg";

// KİTAP KAPAKLARI (assets/books)
import rekabetBook from "../assets/books/rekabetBook.jpg";
import baklavaBook from "../assets/books/baklavaBook.jpg";
import baklava2Book from "../assets/books/baklava2Book.jpg";
import dogruBook from "../assets/books/dogruBook.jpg";

type Publication = {
  id: number;
  title: string;
  summary?: string;
  cover?: string;
  disabled?: boolean; // tıklanamaz placeholder desteği
};

export default function Kurumsal() {
  const [bioOpen, setBioOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Yayınlar için modal state
  const [pubOpen, setPubOpen] = useState(false);
  const [pubIndex, setPubIndex] = useState<number>(0);

  // İçerik: SEO dostu kısa metinler
  const bioExcerpt = useMemo(
    () => (
      <>
        Çıraklıktan işverenliğe uzanan bu süreçte en önemli faktörün{" "}
        <b>“dürüst çalışmak, mesleğe saygı duymak ve işini sevmek”</b> olduğunu
        sürekli dile getiren Murat Çalık, MÇ İnşaat Yatırım Gayrimenkul Grubu
        olarak; 30 yıldır inşaat ve arsa sektöründe yaptığı yatırımlarla
        Türkiye’nin önemli yatırım gruplarından biri haline gelmiştir.
      </>
    ),
    []
  );

  const aboutExcerpt = useMemo<ReactNode>(
    () => (
      <>
        MÇ İnşaat Yatırım Gayrimenkul Grubu 30 yıldır inşaat ve arsa sektöründe
        yaptığı yatırımlarla{" "}
        <b>şehrinin önemli yatırım gruplarından biri haline gelmiştir.</b> MÇ
        İnşaat &amp; Arsa bugüne kadar yüksek kaliteli yüzlerce daire ve birçok
        lüks villa perakende birimleri inşa etti ve yatırımlarına devam
        etmektedir.
        <span className="block text-base font-semibold text-[#151618] mt-4">
          Vizyonumuz
        </span>
        <span className="block">
          Temeli insana ve doğaya saygı olan, bireyin doğallığıyla bağını
          koparmadan modernlik, mimari ve teknolojiden üst düzeyde
          faydalanmasını sağlamak ve bu sayede Yaşam Mimarlığı felsefemizi, tüm
          dünyaya örnek oluşturacağımızı gözden kaçırmadan yaşam pratiğine
          aktarmak. Mevcut coğrafyamızın sunduğu doğal güzellikleri evrensel
          olarak paylaşmaya imkân veren projeler geliştirmek.
        </span>
      </>
    ),
    []
  );

  // Sıra: dogruBook → rekabetBook → baklava2Book → baklavaBook
  const publications: Publication[] = [
    {
      id: 1,
      title: "Doğru İnsan, Doğru Zaman, Doğru İş",
      summary:
        "Biz her işi yaparız değil, biz şu işi çok iyi yaparız devri. Bundan böyle, piyasayı doğru okuyan, gelecekte ortaya çıkabilecek iş kolları üzerinde de fikirler geliştirebilecek çok profesyonellerin devri geliyor. Elbette, doğru iş, doğru zaman, doğru insan denklemi hiçbir zaman sona ermeyecek. Bu denklemi çözebilen şirketler, önümüzdeki çağa damgasını vuracak. Bir şirket yöneticisi olarak, herkese tavsiyem şudur: “Ne iş yapıyorsanız yapın, en iyisini yapın. Bir konuda uzmanlaşın ve bu sahada yenilikleri takip edin, rekabet ettiğiniz alanda eşsiz olmaya bakın…”",
      cover: dogruBook,
    },
    {
      id: 2,
      title: "Rekabetin ABC’si",
      summary:
        "1988’lerde babamın şu öğüdünü hiç unutmam! Oğlum “Çok satarak değil, ikramla para kazanmalısın” demişti, tam 37 yıl önce… Ben babamın bu öğüdünü 37 yıldır hem uyguladım hem de yüzlerce çalışanıma, konferanslarımda binlerce insana, eğitim seminerlerimde yüzlerce danışanıma anlatmışımdır.",
      cover: rekabetBook,
    },
    {
      id: 3,
      title: "Hayattan Tat(lı) Al",
      summary:
        "Yıl 2025 şu anda Türkiye’nin her yerinde 300’e yakın üniversite var. Bu üniversitelerden milyonlarca gencimiz mezun oluyor. Peki, ne oluyorlar? Birçoğu diplomalı işsiz. İşte ben gençlerimizin diplomalarını alıncaya kadar iş kuramıyorlarsa ömür boyu saat kurarlar diyorum. Rahmetli Kemal Sunal, Marmara Üniversitesi’nden gazetecilik bölümünden mezundu. Rahmetli Cüneyt Arkın ise doktordu. Diplomamızı alıncaya kadar bir yerlerde çalışarak kendimizi yetiştirmemiz gerekir, bir şeyler öğrenmemiz gerekir. Diploma bizlere bir şeyler kazandırmaz. Mezun olduğumuz okulla ilgili bir iş yapmak yerine belki başka bir sektöre geçiş yapabiliriz… Baklavacılık yapabiliriz, hayvan alıp satabiliriz…",
      cover: baklava2Book,
    },
    {
      id: 4,
      title: "Hayat Başardıkça Tatlanır",
      summary:
        "“Hayat başardıkça tatlanır” Acı tecrübelerimiz olacak, riskler olacak, ayağımıza taşlar takılacak… Ama hiçbir zaman pes etmeyeceğiz. Yeniden ayağa kalkacak direnci bulacağız, silkineceğiz… Yaşadığımız hiçbir tecrübe bizim için yabana atılacak bir değer olarak görülmemelidir. Çünkü bu tecrübeler hayatımızı şekillendiren, bizlere yeni yol haritaları çizen ayrıntılardır. Bu sebeple marka değerimizi belirleyen unsurların arkasın da bizim yıllarca bu marka değerine verdiğimiz emek yatıyor, heyecan yatıyor. Hayatımızın başardıkça tatlanacağı süreci elbette biz şekillendireceğiz.",
      cover: baklavaBook,
    },
  ];

  // 5. kutu: imza görselini tıklanamaz placeholder olarak ekle
  const pubItems = useMemo<Publication[]>(
    () => [
      ...publications,
      {
        id: 999,
        title: "İmza",
        cover: signature, // land-site/src/assets/images/imza.jpg
        disabled: true,   // tıklanamaz / modal açılmaz
      },
    ],
    [publications]
  );

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
      className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-12 pt-4 scroll-mt-20"
    >
      {/* Başlık */}
      <div className="mb-8">
        <h2 id="kurumsal-title" className="text-2xl md:text-3xl font-semibold">
          Kurumsal
        </h2>
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
              className="h-40 w-full object-cover"
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
          <h3 className="font-semibold text-lg mb-2">Hakkımızda</h3>
          <div className="text-sm text-gray-700">{aboutExcerpt}</div>
          <PillButton onClick={() => setAboutOpen(true)}>Devamı</PillButton>
        </Card>

        {/* Yayınlar */}
        <Card>
          <h3 className="font-semibold text-lg mb-3">Yayınlarımız</h3>
          <p className="text-sm text-gray-700 mt-1 mb-4">
            Türk insanının düşünce, duygu ve davranışlarını bilimsel psikoloji
            kavramları içinde inceleyen Murat Çalık, kişisel gelişim, baklava,
            inşaat ve gıda sektörleri ile ilgili{" "}
            <b>kitaplar yazmış ve kamuoyu ile eserlerini paylaşmıştır.</b>
          </p>

          {(() => {
            const firstRow = pubItems.slice(0, 3);
            const secondRow = pubItems.slice(3, 5);

            const CardButton = ({ p, idx }: { p: Publication; idx: number }) => {
              const isDisabled = p.disabled || idx >= publications.length;

              // TIKLANAMAZ İMZA KARTI: orijinal oran, ortalanmış, tam kaplamaz
              if (isDisabled) {
                return (
                  <div
                    key={p.id ?? idx}
                    className="relative rounded-lg overflow-hidden bg-white ring-1 ring-gray-200 aspect-square w-full
                               flex items-center justify-center cursor-default select-none"
                    aria-hidden="true"
                    title={p.title}
                  >
                    {p.cover && (
                      <img
                        src={p.cover}
                        alt="İmza placeholder"
                        className="max-h-[80%] max-w-[80%] object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                );
              }

              // TIKLANABİLİR KİTAP KARTI
              return (
                <button
                  key={p.id ?? idx}
                  onClick={() => openPub(idx)} // yalnızca 0..3
                  aria-label={`${p.title} detayını aç`}
                  title={p.title}
                  className="group relative rounded-lg overflow-hidden bg-gray-100
                             ring-1 ring-gray-200 hover:ring-gray-300 transition
                             focus:outline-none focus:ring-2 focus:ring-gray-300
                             aspect-square w-full"
                >
                  {p.cover ? (
                    <img
                      src={p.cover}
                      alt={`${p.title} kapak`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
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
                  )}
                  {/* Başlık overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-white/85 backdrop-blur px-2 py-1 text-[13px] font-medium text-gray-800 line-clamp-2">
                    {p.title}
                  </div>
                </button>
              );
            };

            return (
              <div className="space-y-4">
                {/* 1. Satır: 3 kutu */}
                <div className="grid grid-cols-3 gap-4">
                  {firstRow.map((p, i) => (
                    <CardButton p={p} idx={i} key={p.id ?? i} />
                  ))}
                </div>

                {/* 2. Satır: 2 kutu (ortalanmış) */}
                <div className="grid grid-cols-2 gap-4 md:w-2/3 mx-auto">
                  {secondRow.map((p, i) => (
                    <CardButton
                      p={p}
                      idx={i + firstRow.length}
                      key={p.id ?? i}
                    />
                  ))}
                </div>
              </div>
            );
          })()}
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
            {bioExcerpt} MÇ İnşaat &amp; Arsa Grubu ile bugüne kadar yüksek
            kaliteli yüzlerce daire ve birçok lüks villa perakende birimleri
            inşa etti ve yatırımlarına devam etmektedir. &quot;
            <br />
            <br />
            MÇ İnşaat Yatırım Gayrimenkul Grubu’nun” yanı sıra Baklavacılık ve
            Hayvancılık ile ticaret grubuna sürekli farklı sektörler katmaya
            devam etmektedir. 1985 yılında geniş çaplı bir şirketin içerisinde
            farklı departmanlarda üretim ve yönetim kademesinde yer alan Murat
            Çalık, aynı zamanda farklı sivil toplum örgütleri bünyesinde de
            aktif roller üstlenmiştir. 5 yıl <b>İTO</b> - İstanbul Ticaret Odası
            Meclis Üyeliği, 5 yıl <b>YİMDER</b> - Yönetici, İdareci ve
            Müşavirler Derneği İstanbul il Başkan Yardımcılığı, 3 yıl{" "}
            <b>ÜSİAD</b> - Üretken Sanayici ve İş Adamları Derneği Genel Başkan
            Yardımcılığı, 6 yıl <b>TÜMSİAD</b> - Tüm Sanayici ve İş Adamları
            Derneği Kurucu Genel Başkan Yardımcılığı,
            <b>TÜMKOG</b> Eğitim Gönüllüleri Derneği Kurucu Başkanlığı ve{" "}
            <b>İŞDER</b> - İş Dünyası Derneği Kurucu Başkanlığı görevlerinde
            bulunan Murat Çalık, iş adamlarına yönelik olarak{" "}
            <b>“Kişisel gelişim ve mesleki açılımlar”</b>
            seminerleri ve konferanslarında da konuşmacı olarak, birikimlerini
            kamuoyuyla paylaşmaktadır.
            <br />
            <br />
            Türk insanının düşünce, duygu ve davranışlarını bilimsel psikoloji
            kavramları içinde inceleyen Murat Çalık, kişisel gelişim, baklava,
            inşaat ve gıda sektörleri ile ilgili{" "}
            <b>
              4 ayrı kitap yazmış ve kamuoyu ile eserlerini paylaşmıştır.
            </b>{" "}
            Kendi hayatından örnekler ile kaleme aldığı ve gençlere yönelik yeni
            yazdığı “Otobiyografi Konulu”{" "}
            <b>
              5’nci kişisel gelişim kitabını da okuyucuları ile bir kez daha
              buluşturmuştur.
            </b>
            <br />
            <br />
            Kendi sektöründe veya yan sektörlerde faaliyet gösteren birçok
            işletmeye aktif olarak danışmanlık da yapan Murat Çalık, aynı
            zamanda kendi alanında bir gazetenin de <b>imtiyaz sahipliğini </b>
            {""}
            yürütmektedir.
          </p>
          {/* İmza görseli */}
          <div className="mt-4 flex justify-end">
            <img
              src={signature}
              alt="Murat Çalık İmza"
              className="h-12 w-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        title="Hakkımızda"
      >
        {/* İSTENEN BAŞLIKLAR VE METİNLER */}
        <div className="prose prose-sm max-w-none text-gray-700">
          {aboutExcerpt}
          <h4 className="text-base font-semibold text-[#151618] mt-5">
            Misyonumuz
          </h4>
          <p>
            İnsanın ilk çağlardan beri süregelen yuva ihtiyacını, ona doğal ve
            modern olanaklarla çevrelenmiş olarak sunmak. Öncelikle sosyal,
            sportif ve kültürel aktivitelerle bağını eksiksiz kurarak, doğal
            yuva ihtiyacını sağlam bir zemine oturtmak. Sonra modernlik, mimari
            mükemmellik ve teknolojinin akıllı kullanımıyla insanı geleceğe
            taşımak ve böylelikle yüceltmek.
          </p>

          <h4 className="text-base font-semibold text-[#151618] mt-5">
            MÇ İnşaat Yatırım Gayrimenkul Grubu Değerleri
          </h4>
          <p>
            MÇ İnşaat &amp; Arsa Marka Değerleri, faaliyet gösterdiğimiz
            sektörde, birlikte çalıştığımız müşterilerimize ve iş ortaklarımıza
            kattıklarımızla birlikte; koruduklarımız ve geliştirdiklerimiz
            toplumumuza kattığımız değerlerin bütünüdür.
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <b>
                Sahip olduğumuz tüm kaynakları müşterilerimizin ihtiyaçları,
                beklentileri ve memnuniyetleri doğrultusunda kullanmak.
              </b>
            </li>
            <li>
              Projelerimizle şehrin çevresel, tarihsel ve kültürel dokusuna uyum
              sağlamak.
            </li>
            <li>
              <b>
                Yönetici kadromuz, teknik ve idari personelimiz ile çağın mimari
                gereklerini yerine getirerek, hitap edilen toplum değerlerine
                uygun yaşam alanları üretmek.
              </b>
            </li>
            <li>
              İleri teknolojiyi, doğru çözüm ortaklarını, kaliteli malzeme
              kullanımını, titiz mimarlık ve mühendislik hizmetlerini aynı
              potada eriterek, tüm projelerimize uygulamak.
            </li>
            <li>
              <b>
                Sürekli üretkenlik politikamızla yeni istihdam alanları
                yaratarak, ekonomiye katkıda bulunmak.
              </b>
            </li>
            <li>
              Gerek doğal afetler gerek asayiş açısından güvenli yaşam alanları
              inşa etmek.
            </li>
          </ul>

          <h4 className="text-base font-semibold text-[#151618] mt-5">
            Sosyal Sorumluluk
          </h4>
          <p>
            Hizmet verdiği tüm alanlarda “değer oluşturma” misyonuyla hareket
            eden MÇ İnşaat Yatırım Gayrimenkul Grubu, başarılı çalışmalar
            gerçekleştirirken, topluma karşı üstlendiği görevlerin bilinciyle
            sosyal sorumluluk projelerine imza atmaktadır. MÇ İnşaat &amp; Arsa
            <b>
              {" "}
              başta eğitim gören üniversite öğrencilerine burs, sanat, spor,
              kültür ve çevreye yaptığı yatırımlarla daha iyi bir toplum, daha
              iyi bir gelecek ve daha iyi yaşam alanları oluşturmayı
              hedeflemektedir.
            </b>{" "}
            Ülkemizde başta okul olmak üzere eğitimci, teknik donanım, malzeme
            gibi pek çok eksik bulunduğunun bilincinde olan MÇ İnşaat &amp;
            Arsa, eksiklerin giderilmesi için gerçekleştirdiği projelerle
            verdiği destek ile evrensel ve ulusal değerlere sahip çıkarak
            gelecek nesillere katkıda bulunmak için aralıksız çalışmaya devam
            etmektedir.
          </p>
          {/* İmza görseli */}
          <div className="mt-4 flex justify-end">
            <img
              src={signature}
              alt="Murat Çalık İmza"
              className="h-12 w-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={pubOpen}
        onClose={closePub}
        title={publications[pubIndex]?.title || "Yayın Detayı"}
        closeOnOutside={false}
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
            {/* Kapak büyük (kırpma olmadan) */}
            <div className="rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200 aspect-[4/3] grid place-items-center">
              {publications[pubIndex]?.cover ? (
                <img
                  src={publications[pubIndex].cover}
                  alt={`${publications[pubIndex].title} kapak`}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="text-gray-400">
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
              )}
            </div>

            {/* Metin */}
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
