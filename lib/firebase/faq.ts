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

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category: string;
  createdAt: number | null; // normalized
}

const COL = "faqs";

/* ================================
   Normalizer & Utilities
================================ */

export function cleanCategory(cat: string | undefined | null): string {
  if (!cat) return "general";
  return cat.trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizeFaq(id: string, data: any): FAQItem {
  return {
    id,
    question: data.question,
    answer: data.answer,
    category: cleanCategory(data.category),
    createdAt: data.createdAt?.toMillis?.() ?? null,
  };
}

/* ================================
   Readers
================================ */

// List all
export async function getAllFaqs() {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizeFaq(d.id, d.data()));
}

// Get one
export async function getFaqById(id: string) {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return normalizeFaq(snap.id, snap.data());
}

/* ================================
   Mutations
================================ */

// Create
export async function createFaq(data: Omit<FAQItem, "id" | "createdAt">) {
  const payload = {
    ...data,
    category: cleanCategory(data.category),
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, COL), payload);

  revalidatePaths(["/pricing"]);

  return ref.id;
}

// Update
export async function updateFaq(
  id: string,
  data: Partial<Omit<FAQItem, "id" | "createdAt">>,
) {
  const ref = doc(db, COL, id);
  const payload = { ...data };
  if (payload.category !== undefined) {
    payload.category = cleanCategory(payload.category);
  }
  await updateDoc(ref, payload);

  revalidatePaths(["/pricing"]);
}

// Delete
export async function deleteFaq(id: string) {
  const ref = doc(db, COL, id);
  await deleteDoc(ref);

  revalidatePaths(["/pricing"]);
}
