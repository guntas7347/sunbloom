import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export type DashboardStats = {
  totalQuotes: number;
  newQuotes7d: number;
  activeServices: number;
  publishedPosts: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  // 1. Total quotes
  const quotesSnap = await getDocs(collection(db, "quotes"));
  const totalQuotes = quotesSnap.size;

  // 2. New quotes in last 7 days
  const since = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const recentQuotesSnap = await getDocs(
    query(collection(db, "quotes"), where("createdAt", ">=", since)),
  );
  const newQuotes7d = recentQuotesSnap.size;

  // 3. Active services
  const activeServicesSnap = await getDocs(
    query(collection(db, "packages"), where("active", "==", true)),
  );
  const activeServices = activeServicesSnap.size;

  // 4. Published posts
  const publishedPostsSnap = await getDocs(
    query(collection(db, "posts"), where("published", "==", true)),
  );
  const publishedPosts = publishedPostsSnap.size;

  return {
    totalQuotes,
    newQuotes7d,
    activeServices,
    publishedPosts,
  };
}
