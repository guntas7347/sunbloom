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

export const DEFAULT_SERVICES: Omit<ServicePackage, "id" | "createdAt">[] = [
  {
    icon: "Zap",
    title: "Express Entry 2.0",
    desc: "Optimized for STEM, Healthcare, and Skilled Trades with category-based selection strategies.",
    tag: "Fast-Track",
    tagColor: "bg-primary-container/30 text-on-primary-container",
    details: [
      "Federal Skilled Worker, CEC & FST streams",
      "CRS score assessment & improvement strategy",
      "ITA to PR submission in under 6 months",
      "Category-based draws targeting priority sectors",
    ],
    active: true,
  },
  {
    icon: "Map",
    title: "PNP Specialized",
    desc: "Provincial Nomination programs tailored to specific labor market needs in Ontario, BC, and Alberta.",
    tag: "Provincial",
    tagColor: "bg-secondary-container/50 text-on-secondary-container",
    details: [
      "Provincial streams aligned with local economic priorities",
      "Additional 600 CRS points upon nomination",
      "Base PNP streams for direct direct-to-province applications",
    ],
    active: true,
  },
  {
    icon: "Plane",
    title: "Visitor Visa & Travel",
    desc: "Explore Canada for tourism, family visits, or short business trips.",
    tag: "Temporary",
    tagColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    details: [
      "Single or multiple-entry visa options",
      "Maximum stay of up to 6 months per visit",
      "PRTD application support for permanent residents",
    ],
    active: true,
  },
  {
    icon: "GraduationCap",
    title: "Work & Study Permits",
    desc: "Strategic planning for students and temporary workers aiming for long-term residency status.",
    tag: "Permits",
    tagColor:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    details: [
      "Study Permit at DLIs and PGWP pathway planning",
      "SOWP for spouses of workers or students",
      "LMIA compliance and closed/open work permits",
    ],
    active: true,
  },
  {
    icon: "Home",
    title: "Start-up & Corporate",
    desc: "Comprehensive support for entrepreneurs and multinational companies expanding to Canada.",
    tag: "Business",
    tagColor:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    details: [
      "Start-Up Visa for innovative tech founders",
      "Intra-Company Transferee (ICT) work permits",
      "LMIA support for corporate staff relocation",
    ],
    active: true,
  },
  {
    icon: "Heart",
    title: "Family Sponsorship",
    desc: "Reuniting families through Spousal, Parent, and Grandparent sponsorship applications.",
    tag: "Family",
    tagColor:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    details: [
      "Spousal and common-law partner sponsorship",
      "Super Visa applications for parents and grandparents",
      "Adoption and dependent children class filings",
    ],
    active: true,
  },
];

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
export async function getServicesPage(pageSize = 20, cursor?: any) {
  const allSnap = await getDocs(collection(db, COL));
  if (allSnap.empty) {
    await seedServices();
  }

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

  const lastDoc = snap.docs[snap.docs.length - 1] || null;

  return {
    items,
    lastDoc,
    hasMore: snap.docs.length === pageSize,
  };
}

// Get only active services (public)
export async function getActiveServices(): Promise<ServicePackage[]> {
  const allSnap = await getDocs(collection(db, COL));
  if (allSnap.empty) {
    await seedServices();
  }

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

// Seed
export async function seedServices() {
  console.log("Seeding default services to Firebase...");
  for (const service of DEFAULT_SERVICES) {
    const payload = {
      ...service,
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, COL), payload);
  }
  await revalidatePaths(["/services"]);
}

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
