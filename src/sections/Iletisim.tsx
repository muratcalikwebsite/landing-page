import type { ReactNode } from "react";

type ContactKey =
  | "kurumsal"
  | "telefon"
  | "instagram"
  | "facebook"
  | "youtube"
  | "adres";

type ContactItem = {
  key: ContactKey;
  label: string;
  value: string;
  href?: string;
  accent: string; // Tailwind gradient sınıfı
  icon: ReactNode;
};

export default function Iletisim() {
  const items: ContactItem[] = [
    // 1) Bireysel Telefon
    {
      key: "telefon",
      label: "Telefon",
      value: "0532 370 43 43",
      href: "tel:+905323704343",
      accent: "from-emerald-500 to-teal-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 3.2 2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.1 8.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      ),
    },
    // 2) Kurumsal Telefon
    {
      key: "kurumsal",
      label: "Kurumsal",
      value: "0850 466 37 66",
      href: "tel:+908504663766",
      accent: "from-cyan-500 to-sky-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 3.2 2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.1 8.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      ),
    },
    // 3) Instagram
    {
      key: "instagram",
      label: "Instagram",
      value: "muratcalik_official",
      href: "https://www.instagram.com/muratcalik_official/",
      accent: "from-pink-500 to-purple-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle
            cx="12"
            cy="12"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
      ),
    },
    // 4) Facebook
    {
      key: "facebook",
      label: "Facebook",
      value: "muratcalikofficial",
      href: "https://www.facebook.com/muratcalikofficial?rdid=o6TdbygvKi5ToQHA&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17LETc6Cem%2F",
      accent: "from-blue-600 to-sky-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M13 22v-8h3l.5-4H13V7.5c0-1 .3-1.5 1.6-1.5H17V2.2C16.4 2.1 15.4 2 14.2 2 11.7 2 10 3.5 10 6.3V10H7v4h3v8h3z" />
        </svg>
      ),
    },
    // 5) YouTube (E-posta yerine)
    {
      key: "youtube",
      label: "YouTube",
      value: "@mc_insaat_arsa_yatirim_grubu",
      href: "https://www.youtube.com/@mc_insaat_arsa_yatirim_grubu",
      accent: "from-red-600 to-rose-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21.8 8s-.2-1.5-.8-2.2c-.8-.9-1.6-.9-2-1C16.6 4.5 12 4.5 12 4.5s-4.6 0-7 .3c-.4.1-1.2.1-2 1C2.2 6.5 2.2 8 2.2 8S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.5.8 2.2c.8.9 1.9.8 2.4.9 1.8.2 7.6.3 7.6.3s4.6 0 7-.3c.4-.1 1.2-.1 2-1 .6-.7.8-2.2.8-2.2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2zM9.8 14.7V8.9l5.3 2.9-5.3 2.9z" />
        </svg>
      ),
    },
    // 6) Adres
    {
      key: "adres",
      label: "Adres",
      value: "Tekirdağ / Yeniçiftlik / Marmaraereğlisi",
      accent: "from-amber-500 to-orange-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="11"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      ),
    },
  ];

  const getAria = (it: ContactItem) => {
    switch (it.key) {
      case "telefon":
        return `Telefon ara: ${it.value}`;
      case "kurumsal":
        return `Kurumsal hattı ara: ${it.value}`;
      case "youtube":
        return `YouTube kanalına git: ${it.value}`;
      case "instagram":
        return `Instagram profili: ${it.value}`;
      case "facebook":
        return `Facebook profili: ${it.value}`;
      case "adres":
        return `Adres: ${it.value}`;
      default:
        return it.label;
    }
  };

  const baseClass =
    "group relative rounded-2xl border border-[#CEBEBF]/60 bg-white/85 backdrop-blur p-5 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all";

  const isExternal = (it: ContactItem) => Boolean(it.href?.startsWith("http"));

  return (
    <section
      id="iletisim"
      role="region"
      aria-labelledby="iletisim-title"
      itemScope
      itemType="https://schema.org/Organization"
      className="section max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-12 scroll-mt-20"
    >
      {/* Organization adı (microdata) */}
      <meta itemProp="name" content="Murat Çalık" />

      {/* Başlık + marka aksanı */}
      <header className="mb-6">
        <h2
          id="iletisim-title"
          className="text-2xl md:text-3xl font-semibold text-[#151618]"
        >
          İletişim
        </h2>
        <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-[#C32C31] via-[#CEBEBF] to-transparent" />
      </header>

      {/* Kartlar */}
      <div
        role="list"
        className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((it) => {
          const CardInner = (
            <div className="flex items-start gap-4">
              <div
                className={`shrink-0 rounded-xl p-2.5 text-white bg-gradient-to-br ${it.accent} shadow-sm`}
              >
                {it.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm text-gray-500">{it.label}</div>

                {/* Değer alanı + microdata */}
                {it.key === "telefon" || it.key === "kurumsal" ? (
                  <div
                    className="font-medium text-gray-900 break-words"
                    itemProp="telephone"
                  >
                    {it.value}
                  </div>
                ) : it.key === "adres" ? (
                  <address
                    className="not-italic font-medium text-gray-900 break-words"
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <span itemProp="addressRegion">Yeniçiftlik</span>
                    {" - "}
                    <span>Marmaraereğlisi</span>
                    {" - "}
                    <span itemProp="addressLocality">Tekirdağ</span>
                    <meta itemProp="addressCountry" content="TR" />
                  </address>
                ) : (
                  <div className="font-medium text-gray-900 break-words">
                    {it.value}
                  </div>
                )}
              </div>
            </div>
          );

          // marka şeridi (sol tarafta ince kırmızı çizgi)
          const BrandStripe = (
            <span
              className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-[#C32C31]/70"
              aria-hidden="true"
            />
          );

          // Link kartı (http/s ise yeni sekme; tel'de aynı sekme yeterli)
          if (it.href) {
            const external = isExternal(it);
            const isSameAs =
              it.key === "instagram" ||
              it.key === "facebook" ||
              it.key === "youtube";
            const rel = isSameAs
              ? "noopener noreferrer me"
              : external
              ? "noopener noreferrer"
              : undefined;

            return (
              <a
                key={it.key}
                href={it.href}
                {...(external ? { target: "_blank", rel } : { rel })}
                aria-label={getAria(it)}
                title={getAria(it)}
                className={baseClass}
                role="listitem"
                {...(isSameAs ? { itemProp: "sameAs" } : {})}
              >
                {BrandStripe}
                {CardInner}
              </a>
            );
          }

          // Düz kart
          return (
            <div
              key={it.key}
              className={baseClass}
              role="listitem"
              aria-label={getAria(it)}
              title={getAria(it)}
            >
              {BrandStripe}
              {CardInner}
            </div>
          );
        })}
      </div>

      {/* Alt CTA'lar */}
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://wa.me/905323704343"
          className="inline-flex items-center gap-1 rounded-xl bg-[green] px-2 py-2 text-white shadow-sm hover:bg-[darkgreen] focus:outline-none focus:ring-2 focus:ring-[#C32C31]/30"
          aria-label="WhatsApp üzerinden yazın: 0532 370 43 43"
          rel="noopener noreferrer"
          target="_blank"
        >
          WhatsApp’tan Yazın
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
            />
          </svg>
        </a>
        <a
          href="tel:+905323704343"
          className="inline-flex items-center gap-1 rounded-xl border border-[#151618]/15 px-2 py-2 text-[#151618] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#151618]/20"
          aria-label="Telefonla arayın: 0532 370 43 43"
        >
          Hemen Ara
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 3.2 2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.1 8.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
