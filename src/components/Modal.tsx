import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Başlık metni (opsiyonel, a11y için yararlı) */
  title?: string;
  /** Arka plana tıklayınca kapansın mı? (varsayılan: true) */
  closeOnOutside?: boolean;
};

export default function Modal({
  open,
  onClose,
  children,
  title,
  closeOnOutside = true,
}: Props) {
  const [show, setShow] = useState(open); // animasyon durumu
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const labelId = useId();
  const prevActive = useRef<HTMLElement | null>(null);

  // Açılış/kapanış yan etkileri
  useEffect(() => {
    if (!open) return;
    setShow(true);
    prevActive.current = document.activeElement as HTMLElement;

    // body scroll kilidi
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // ESC & Tab ile odak tuzağı
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
      if (e.key === "Tab") {
        const focusables = getFocusable(panelRef.current);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);

    // İlk odak
    const timer = setTimeout(() => {
      const f = getFocusable(panelRef.current)[0];
      f?.focus();
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // odak geri yükle
      prevActive.current?.focus?.();
    };
  }, [open]);

  // Dışa tıklayınca kapat
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!closeOnOutside) return;
    if (e.target === overlayRef.current) handleClose();
  };

  // Animasyonlu kapat
  const handleClose = () => {
    setShow(false);
    // exit animasyonu (200ms) sonra parent onClose
    setTimeout(() => onClose(), 200);
  };

  if (!open && !show) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={[
        "fixed inset-0 z-50 flex items-center justify-center px-4",
        "bg-black/40 backdrop-blur-sm",
        "transition-opacity duration-200",
        show ? "opacity-100" : "opacity-0",
      ].join(" ")}
      onMouseDown={onOverlayClick}
      aria-hidden={false}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? labelId : undefined}
        className={[
          "bg-white border border-gray-200 shadow-xl rounded-2xl w-full max-w-2xl",
          "outline-none focus-visible:ring-2 focus-visible:ring-gray-300",
          "transition-all duration-200",
          "max-h-[85vh] flex flex-col",
          show
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-[0.98]",
        ].join(" ")}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Başlık + kapat */}
        <div className="flex items-start gap-3 px-6 pt-5 sticky top-0 ">
          {title ? (
            <h3
              id={labelId}
              className="text-lg md:text-xl font-semibold text-gray-900"
            >
              {title}
            </h3>
          ) : (
            <span className="sr-only" id={labelId}>
              Modal dialog
            </span>
          )}
          <button
            onClick={handleClose}
            className="ml-auto inline-flex items-center justify-center rounded-full border border-gray-200 p-2 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            aria-label="Kapat"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
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

        {/* İçerik */}
        <div className="px-6 py-4 overflow-y-auto min-h-0 overscroll-contain">{children}</div>

        {/* Alt boşluk */}
        <div className="pb-4" />
      </div>
    </div>,
    document.body
  );
}

/* Yardımcı: odaklanabilir öğeleri topla */
function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");
  return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}
