import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";
import { revalidatePaths } from "../revalidatePath";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  published: boolean;
  featured?: boolean;
  createdAt?: number | null;
  updatedAt?: number | null;
};

/* ================================
   Normalizer
================================ */

function normalizePost(id: string, data: any): Post & { id: string } {
  return {
    id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    imageUrl: data.imageUrl,
    published: data.published,
    featured: data.featured ?? false,
    createdAt: data.createdAt?.toMillis?.() ?? null,
    updatedAt: data.updatedAt?.toMillis?.() ?? null,
  };
}

/* ================================
   Mutations
================================ */

export async function upsertPost(post: Post) {
  const ref = doc(db, "posts", post.slug);

  await setDoc(
    ref,
    {
      ...post,
      updatedAt: serverTimestamp(),
      createdAt: post.createdAt ?? serverTimestamp(),
    },
    { merge: true },
  );

  revalidatePaths(["/blog", `/blog/${post.slug}`]);
}

export async function deletePost(slug: string) {
  await deleteDoc(doc(db, "posts", slug));

  revalidatePaths(["/blog", `/blog/${slug}`]);
}

/* ================================
   Readers
================================ */

export async function getPostBySlug(slug: string) {
  const snap = await getDoc(doc(db, "posts", slug));
  if (!snap.exists()) return null;
  return normalizePost(snap.id, snap.data());
}

export async function getAllPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizePost(d.id, d.data()));
}

export async function getPublishedPosts() {
  const q = query(
    collection(db, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizePost(d.id, d.data()));
}

export async function getFeaturedPost() {
  const q = query(
    collection(db, "posts"),
    where("published", "==", true),
    where("featured", "==", true),
    limit(1),
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;
  return normalizePost(snap.docs[0].id, snap.docs[0].data());
}

export async function setFeaturedExclusive(slug: string) {
  const snap = await getDocs(collection(db, "posts"));

  for (const d of snap.docs) {
    await updateDoc(doc(db, "posts", d.id), {
      featured: d.id === slug,
    });
  }

  revalidatePaths(["/blog"]);
}
