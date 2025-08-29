export type ContactChannel = "mail" | "telefon" | "whatsapp" | "instagram" | "facebook";

export function trackContactClick(channel: ContactChannel, value: string) {
  try {
    // @ts-ignore
    window.gtag?.("event", "contact_click", {
      event_category: "engagement",
      event_label: channel,
      value
    });
  } catch {}
}
