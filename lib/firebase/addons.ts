import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { revalidatePaths } from "../revalidatePath";

export interface Addon {
  id?: string;
  title: string;
  priceLabel: string;
  icon: string;
  active: boolean;
  createdAt: number | null; // normalized
}

const COL = "addons";

/* ================================
   Normalizer
================================ */

function normalizeAddon(id: string, data: any): Addon {
  return {
    id,
    title: data.title,
    priceLabel: data.priceLabel,
    icon: data.icon,
    active: data.active,
    createdAt: data.createdAt?.toMillis?.() ?? null,
  };
}

/* ================================
   Readers
================================ */

// List all (admin)
export async function getAllAddons() {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => normalizeAddon(d.id, d.data()));
}

// List active (public)
export async function getActiveAddons() {
  const snap = await getDocs(collection(db, COL));
  return snap.docs
    .map((d) => normalizeAddon(d.id, d.data()))
    .filter((a) => a.active);
}

// Get one
export async function getAddonById(id: string) {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return normalizeAddon(snap.id, snap.data());
}

/* ================================
   Mutations
================================ */

// Create
export async function createAddon(data: Omit<Addon, "id" | "createdAt">) {
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, COL), payload);

  revalidatePaths(["/pricing"]);

  return ref.id;
}

// Update
export async function updateAddon(
  id: string,
  data: Partial<Omit<Addon, "id" | "createdAt">>,
) {
  const ref = doc(db, COL, id);
  await updateDoc(ref, data);

  revalidatePaths(["/pricing"]);
}

// Delete
export async function deleteAddon(id: string) {
  const ref = doc(db, COL, id);
  await deleteDoc(ref);

  revalidatePaths(["/pricing"]);
}
