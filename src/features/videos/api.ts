import {
  collection, getDocs, onSnapshot, orderBy, query, where,
} from "firebase/firestore";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import type { VideoDoc, VideoCollection } from "./types";

function mapDoc(d: QueryDocumentSnapshot<DocumentData>): VideoDoc {
  const raw = d.data() as Omit<VideoDoc, "id">;
  return {
    id: (d as any).id,
    title: raw.title,
    description: raw.description,
    youtubeId: raw.youtubeId,
    order: raw.order ?? 0,
    isPublished: raw.isPublished ?? true,
    durationSec: raw.durationSec ?? 15,
  };
}

export async function listVideos(colName: VideoCollection): Promise<VideoDoc[]> {
  const q = query(collection(db, colName), where("isPublished","==",true), orderBy("order","asc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => mapDoc(d as any));
}

export function subscribeVideos(
  colName: VideoCollection,
  cb: (items: VideoDoc[]) => void
): () => void {
  const q = query(collection(db, colName), where("isPublished","==",true), orderBy("order","asc"));
  return onSnapshot(q, (snap) => cb(snap.docs.map(d => mapDoc(d as any))));
}
