import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type Quote = {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  eventType: string;
  message: string;
  createdAt: number;
  phone: string;
};

const COL = "quotes";



/* ================================
   Read
================================ */

export async function getQuote(id: string) {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;

  const data = snap.data() as Quote;

  return {
    id: snap.id,
    ...data,
  };
}

export async function getAllQuotes() {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map((d) => {
    const data = d.data() as Quote;
    return {
      id: d.id,
      ...data,
    };
  });
}

/* ================================
   Delete
================================ */

export async function deleteQuote(id: string) {
  const ref = doc(db, COL, id);
  await deleteDoc(ref);
}
