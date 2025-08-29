// Firestore'dan okuyacağımız video dökümanı tipi
export type VideoDoc = {
  id: string;            // Firestore doc id
  title: string;
  description?: string;
  youtubeId: string;     // yalnızca ID (örn: "dQw4w9WgXcQ")
  order: number;         // slider sırası
  isPublished: boolean;  // yayında mı
  durationSec?: number;  // opsiyonel: otomatik geçiş süresi (default 15)
};

// Koleksiyon adları için güvenli union
export type VideoCollection = "arsalar" | "projeler";
