import { useEffect, useRef, useState } from "react";
import { listVideos, subscribeVideos } from "./api";
import type { VideoCollection, VideoDoc } from "./types";

/** Hafif state yönetimi:
 * - İlk açılışta cache (sessionStorage) → sonra Firestore
 * - İsteğe bağlı realtime abonelik (default: true)
 */
export function useVideos(col: VideoCollection, realtime = true) {
  const [data, setData] = useState<VideoDoc[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState<unknown>(null);
  const unsubRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    const key = `videos:${col}`;
    // 1) cache
    const cached = sessionStorage.getItem(key);
    if (cached) {
      try { setData(JSON.parse(cached)); setLoading(false); } catch {}
    }
    // 2) fetch
    listVideos(col)
      .then((v) => { setData(v); sessionStorage.setItem(key, JSON.stringify(v)); })
      .catch(setErr)
      .finally(() => setLoading(false));

    // 3) realtime
    if (realtime) {
      unsubRef.current = subscribeVideos(col, (v) => {
        setData(v);
        sessionStorage.setItem(key, JSON.stringify(v));
      });
    }
    return () => { unsubRef.current?.(); };
  }, [col, realtime]);

  return { data: data ?? [], loading, error };
}
