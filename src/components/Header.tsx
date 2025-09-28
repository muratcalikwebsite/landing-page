import { useEffect, useState } from "react";
import logo from "../assets/logo/logo.jpg";

const LINKS = [
  { id: "arsalar", label: "Arsalarımız" },
  { id: "projeler", label: "Projelerimiz" },
  { id: "kurumsal", label: "Kurumsal" },
  { id: "iletisim", label: "İletişim" },
];

const HEADER_H = 64;
const BRAND_RED = "#C32C31";
const BRAND_DARK = "#151618";

export default function Header() {
  const [active, setActive] = useState<string>("arsalar");
  const [mobileOpen, setMobileOpen] = useState(false);

  const getSections = () =>
    LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];

  const computeActive = () => {
    const sections = getSections();
    const mid = window.scrollY + HEADER_H + window.innerHeight * 0.35;
    let current = sections[0]?.id ?? "arsalar";
    for (const s of sections) if (mid >= s.offsetTop) current = s.id;
    setActive(current);
  };

  useEffect(() => {
    const sections = getSections();
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
          )[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        rootMargin: `-${HEADER_H}px 0px -40% 0px`,
        threshold: [0.51],
      }
    );
    sections.forEach((s) => io.observe(s));
    computeActive();
    const onHash = () => {
      const id = location.hash.replace("#", "");
      if (id) setActive(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      io.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const go = (id: string) => {
    setActive(id);
    setMobileOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const linkClass = (isActive: boolean) =>
    [
      "px-3 py-1.5 rounded-md border transition-all duration-200",
      isActive
        ? "bg-[color:var(--brand-red)/0.08] text-[color:var(--brand-dark)] border-[color:var(--brand-red)/0.25]"
        : "text-gray-700 border-transparent hover:bg-[color:var(--brand-red)/0.06] hover:text-black",
    ].join(" ");

  return (
    <header
      className="sticky top-0 z-[2000] bg-white md:bg-white/80 md:backdrop-blur shadow-none md:shadow"
      style={{
        ["--brand-red" as any]: BRAND_RED,
        ["--brand-dark" as any]: BRAND_DARK,
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded-md shadow"
      >
        İçeriğe atla
      </a>
      <h1 className="sr-only">
        Murat Çalık — Tekirdağ Marmaraereğlisi’nde arsalar ve gayrimenkul
        projeleri
      </h1>

      <div
        className="max-w-7xl mx-auto px-4 h-38 grid grid-cols-3 items-center"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="block md:hidden" aria-hidden="true" />

        <div className="hidden md:flex items-center">
          <a
            href="#arsalar"
            onClick={(e) => {
              e.preventDefault();
              go("arsalar");
            }}
          >
            <img
              src={logo}
              alt="Murat Çalık — Tekirdağ Marmaraereğlisi arsalar ve projeler"
              className="h-28 w-auto object-contain"
            />
          </a>
        </div>

        <div className="flex md:hidden justify-center">
          <a
            href="#arsalar"
            onClick={(e) => {
              e.preventDefault();
              go("arsalar");
            }}
          >
            <img
              src={logo}
              alt="Murat Çalık — Tekirdağ Marmaraereğlisi arsalar ve projeler"
              className="mt-2 h-29 w-auto object-contain"
            />
          </a>
        </div>

        <div className="flex md:hidden justify-end">
          <button
            aria-label="Menüyü aç/kapat"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((s) => !s)}
            className="inline-flex items-center justify-center rounded-lg p-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <svg
              className={`h-6 w-6 ${mobileOpen ? "hidden" : "block"}`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className={`h-6 w-6 ${mobileOpen ? "block" : "hidden"}`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav
          className="hidden md:flex col-span-2 justify-end gap-2"
          aria-label="Bölüm menüsü"
        >
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
                className={linkClass(isActive)}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
      </div>
      {/* KOMİSYON YOK şeridi */}
      <div className="bg-[#C32C31] text-white text-center py-2">
        <div className="flex flex-col md:flex-row justify-center items-center font-semibold md:text-base">
          <span className="uppercase tracking-wide text-lg">
            <b>"KOMİSYON YOK"</b>
          </span>
          <span className="md:ml-2 text-lg">
            Doğrudan Sahibiyle Muhatapsınız!
          </span>
        </div>
      </div>
      {/* Mobile overlay + sheet (blur KALDIRILDI) */}
      <div
        className={[
          "md:hidden fixed inset-0 z-[3000] pt-20",
          "transition-opacity duration-200",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
      >
        <div className="absolute inset-0 bg-black/35" />
        <nav
          id="mobile-nav"
          aria-label="Bölüm menüsü (mobil)"
          className={[
            "relative mx-4 rounded-2xl border bg-white shadow-xl",
            "transition-all duration-200 origin-top",
            mobileOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-[0.98] -translate-y-1",
          ].join(" ")}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="py-2">
            {LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.id);
                    }}
                    className={[
                      "flex items-center gap-3 px-4 py-3 text-base transition-colors",
                      isActive
                        ? "bg-[color:var(--brand-red)/0.06] text-[color:var(--brand-dark)]"
                        : "text-gray-800 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "inline-block h-2 w-2 rounded-full",
                        isActive
                          ? "bg-[color:var(--brand-red)]"
                          : "bg-gray-300",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex gap-3 px-4 pb-4">
            <a
              href="https://wa.me/905323704343"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--brand-red)] px-4 py-2 text-white shadow-sm hover:bg-[#B0282C] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-red)]/30"
            >
              WhatsApp
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
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-[color:var(--brand-dark)] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Ara
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
