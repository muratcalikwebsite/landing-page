import type { ReactNode } from "react";

type ContactKey = "mail" | "instagram" | "facebook" | "telefon" | "whatsapp" | "adres";

type ContactItem = {
  key: ContactKey;
  label: string;
  value: string;
  href?: string;
  accent: string;   // Tailwind gradient sınıfı
  icon: ReactNode;
};

export default function Iletisim() {
  const items: ContactItem[] = [
    {
      key: "mail",
      label: "E-posta",
      value: "calikmurat59@gmail.com",
      href: "mailto:calikmurat59@gmail.com",
      accent: "from-indigo-500 to-blue-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      key: "instagram",
      label: "Instagram",
      value: "muratcalik_official",
      href: "https://www.instagram.com/muratcalik_official/",
      accent: "from-pink-500 to-purple-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6"/>
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
        </svg>
      ),
    },
    {
      key: "facebook",
      label: "Facebook",
      value: "murat.calik.5458",
      href: "https://www.facebook.com/murat.calik.5458/",
      accent: "from-blue-600 to-sky-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M13 22v-8h3l.5-4H13V7.5c0-1 .3-1.5 1.6-1.5H17V2.2C16.4 2.1 15.4 2 14.2 2 11.7 2 10 3.5 10 6.3V10H7v4h3v8h3z"/>
        </svg>
      ),
    },
    {
      key: "telefon",
      label: "Telefon",
      value: "0532 370 43 43",
      href: "tel:+905323704343",
      accent: "from-emerald-500 to-teal-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
          <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 3.2 2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.1 8.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" stroke="currentColor" strokeWidth="1.7"/>
        </svg>
      ),
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      value: "0532 370 43 43",
      href: "https://wa.me/905323704343",
      accent: "from-green-500 to-lime-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M20 11.9A8.1 8.1 0 1 1 6.6 4.7l.3.3A8.1 8.1 0 0 1 20 11.9zM6 19l1.2-3.6A7 7 0 1 0 18.6 6.9 7 7 0 0 0 7.6 17.8L6 19z"/>
        </svg>
      ),
    },
    {
      key: "adres",
      label: "Adres",
      value: "Tekirdağ / Yeniçiftlik / Marmaraereğlisi",
      accent: "from-amber-500 to-orange-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
          <path d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ),
    },
  ];

  const getAria = (it: ContactItem) => {
    switch (it.key) {
      case "mail": return `E-posta gönder: ${it.value}`;
      case "telefon": return `Telefon ara: ${it.value}`;
      case "whatsapp": return `WhatsApp sohbeti başlat: ${it.value}`;
      case "instagram": return `Instagram profili: ${it.value}`;
      case "facebook": return `Facebook profili: ${it.value}`;
      case "adres": return `Adres: ${it.value}`;
      default: return it.label;
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
      className="section max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 scroll-mt-20"
    >
      {/* Organization adı (microdata) */}
      <meta itemProp="name" content="Murat Çalık" />

      {/* Başlık + marka aksanı */}
      <header className="mb-6">

        <h2 id="iletisim-title" className="text-2xl md:text-3xl font-semibold text-[#151618]">İletişim</h2>
        <p className="mt-1 text-sm text-gray-700">
          Tekirdağ Marmaraereğlisi ve çevresindeki arsa/proje talepleriniz için bize ulaşın.
          E-posta, telefon ve WhatsApp üzerinden hızlı dönüş sağlıyoruz.
        </p>
        <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-[#C32C31] via-[#CEBEBF] to-transparent" />
      </header>

      {/* Kartlar */}
      <div role="list" className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => {
          const CardInner = (
            <div className="flex items-start gap-4">
              <div className={`shrink-0 rounded-xl p-2.5 text-white bg-gradient-to-br ${it.accent} shadow-sm`}>
                {it.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm text-gray-500">{it.label}</div>

                {/* Değer alanı + microdata */}
                {it.key === "mail" ? (
                  <div className="font-medium text-gray-900 break-words" itemProp="email">
                    {it.value}
                  </div>
                ) : it.key === "telefon" ? (
                  <div className="font-medium text-gray-900 break-words" itemProp="telephone">
                    {it.value}
                  </div>
                ) : it.key === "adres" ? (
                  <address
                    className="not-italic font-medium text-gray-900 break-words"
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <span itemProp="addressRegion">Tekirdağ</span>{" / "}
                    <span>Yeniçiftlik</span>{" / "}
                    <span itemProp="addressLocality">Marmaraereğlisi</span>
                    <meta itemProp="addressCountry" content="TR" />
                  </address>
                ) : (
                  <div className="font-medium text-gray-900 break-words">{it.value}</div>
                )}
              </div>
            </div>
          );

          // marka şeridi (sol tarafta ince kırmızı çizgi)
          const BrandStripe = <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-[#C32C31]/70" aria-hidden="true" />;

          // Link kartı (http/s ise yeni sekme; tel/mail'da aynı sekme daha iyi)
          if (it.href) {
            const external = isExternal(it);
            const rel =
              it.key === "instagram" || it.key === "facebook" ? "noopener noreferrer me" :
              external ? "noopener noreferrer" : undefined;

            return (
              <a
                key={it.key}
                href={it.href}
                {...(external ? { target: "_blank", rel } : { rel })}
                aria-label={getAria(it)}
                title={getAria(it)}
                className={baseClass}
                role="listitem"
                {...(it.key === "instagram" || it.key === "facebook" ? { itemProp: "sameAs" } : {})}
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
          className="inline-flex items-center gap-2 rounded-xl bg-[#C32C31] px-4 py-2 text-white shadow-sm hover:bg-[#B0282C] focus:outline-none focus:ring-2 focus:ring-[#C32C31]/30"
          aria-label="WhatsApp üzerinden yazın: 0532 370 43 43"
          rel="noopener noreferrer"
          target="_blank"
        >
          WhatsApp’tan Yazın
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
        <a
          href="tel:+905323704343"
          className="inline-flex items-center gap-2 rounded-xl border border-[#151618]/15 px-4 py-2 text-[#151618] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#151618]/20"
          aria-label="Telefonla arayın: 0532 370 43 43"
        >
          Hemen Ara
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 3.2 2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.1 8.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" stroke="currentColor" strokeWidth="1.7"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
