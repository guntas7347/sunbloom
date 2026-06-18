import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";
import { revalidatePaths } from "../revalidatePath";

export interface ServicePackage {
  id?: string;
  icon: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  details: string[];
  active: boolean;
  createdAt?: number | null; // normalized
}

const COL = "packages";

/* ================================
   Normalizer
================================ */

function normalizeService(id: string, data: any): ServicePackage {
  return {
    id,
    icon: data.icon || "Briefcase",
    title: data.title || "",
    desc: data.desc || "",
    tag: data.tag || "",
    tagColor: data.tagColor || "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    details: data.details || [],
    active: data.active !== undefined ? data.active : true,
    createdAt: data.createdAt?.toMillis?.() ?? null,
  };
}

/* ================================
   Readers
================================ */

// Get all services (admin)
export async function getAllServices(): Promise<ServicePackage[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => normalizeService(d.id, d.data()));
}

// Paginated
export async function getServicesPage(pageSize = 20, cursor?: number | null) {
  let q;

  if (cursor) {
    q = query(
      collection(db, COL),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(pageSize),
    );
  } else {
    q = query(
      collection(db, COL),
      orderBy("createdAt", "desc"),
      limit(pageSize),
    );
  }

  const snap = await getDocs(q);

  const items = snap.docs.map((d) => normalizeService(d.id, d.data()));

  const last = items[items.length - 1];

  return {
    items,
    nextCursor: last?.createdAt ?? null,
    hasMore: snap.docs.length === pageSize,
  };
}

// Get only active services (public)
export async function getActiveServices(): Promise<ServicePackage[]> {
  const q = query(collection(db, COL), where("active", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizeService(d.id, d.data()));
}

// Get one service
export async function getServiceById(
  id: string,
): Promise<ServicePackage | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return normalizeService(snap.id, snap.data());
}

/* ================================
   Mutations
================================ */

// Create
export async function createService(data: ServicePackage) {
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, COL), payload);

  revalidatePaths(["/services"]);

  return docRef.id;
}

// Update
export async function updateService(id: string, data: Partial<ServicePackage>) {
  const ref = doc(db, COL, id);
  await updateDoc(ref, data);

  revalidatePaths(["/services"]);
}

// Delete
export async function deleteService(id: string) {
  const ref = doc(db, COL, id);
  await deleteDoc(ref);

  revalidatePaths(["/services"]);
}
