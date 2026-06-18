import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";
import { revalidatePaths } from "../revalidatePath";

export interface PricingPackage {
  id?: string;
  title: string;
  price: number;
  features: string[];
  createdAt: number | null; // normalized
}

const COL = "pricing_packages";

/* ================================
   Normalizer
================================ */

function normalizePricing(id: string, data: any): PricingPackage {
  return {
    id,
    title: data.title,
    price: data.price,
    features: data.features,
    createdAt: data.createdAt?.toMillis?.() ?? null,
  };
}

/* ================================
   Readers
================================ */

// List all
export async function getAllPricing() {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizePricing(d.id, d.data()));
}

// Get one
export async function getPricingById(id: string) {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return normalizePricing(snap.id, snap.data());
}

/* ================================
   Mutations
================================ */

// Create
export async function createPricing(
  data: Omit<PricingPackage, "id" | "createdAt">,
) {
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, COL), payload);

  revalidatePaths(["/pricing"]);

  return ref.id;
}

// Update
export async function updatePricing(
  id: string,
  data: Partial<Omit<PricingPackage, "id" | "createdAt">>,
) {
  const ref = doc(db, COL, id);
  await updateDoc(ref, data);

  revalidatePaths(["/pricing"]);
}

// Delete
export async function deletePricing(id: string) {
  const ref = doc(db, COL, id);
  await deleteDoc(ref);

  revalidatePaths(["/pricing"]);
}
