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

export interface OathDoc {
  id?: string;
  name: string;
  desc: string;
  cat: string;
  createdAt?: number | null;
}

export interface OathFaq {
  id?: string;
  q: string;
  a: string;
  createdAt?: number | null;
}

const DOCS_COL = "oath_docs";
const FAQS_COL = "oath_faqs";

// Default Oath Documents Seed Data
const DEFAULT_OATH_DOCS: Omit<OathDoc, "id" | "createdAt">[] = [
  { name: "Affidavits & Exhibits", desc: "For legal, financial, or administrative court matters.", cat: "Affidavits & Declarations" },
  { name: "Statutory Declarations", desc: "Solemn declarations in lieu of an oath, required by governments.", cat: "Affidavits & Declarations" },
  { name: "Declaration Affirming Parentage", desc: "For vital statistics and provincial registers.", cat: "Affidavits & Declarations" },
  { name: "Statutory Declarations in Lieu of Guarantor", desc: "Required for passport and registration applications.", cat: "Affidavits & Declarations" },
  { name: "Affidavit of Identity / Proof of ID", desc: "Used to authenticate personal identification records.", cat: "Affidavits & Declarations" },
  { name: "IRCC Statutory Declaration of Common-Law Union", desc: "Required for Canadian spousal sponsorship applications.", cat: "Government & Immigration" },
  { name: "Statutory Declaration for Invitation Letters", desc: "Inviting foreign relatives to visit Canada.", cat: "Government & Immigration" },
  { name: "Lost, Stolen, or Damaged Passport Forms", desc: "Government filings to replace lost travel documents.", cat: "Government & Immigration" },
  { name: "PR Card Applications & Declarations", desc: "Required filings for Permanent Resident status updates.", cat: "Government & Immigration" },
  { name: "Travel Consent Letters for Children", desc: "Recommended for minors traveling out of Canada with one parent.", cat: "Government & Immigration" },
  { name: "Land Title Transfers & Dower Rights", desc: "Authorizations for real estate transactions in Alberta.", cat: "Real Estate & Legal" },
  { name: "Mortgage Documents & Tenant Agreements", desc: "Selected bank and landlord-tenant filings requiring witnesses.", cat: "Real Estate & Legal" },
  { name: "Affidavit of Execution", desc: "Witness declarations confirming signing of legal documents.", cat: "Real Estate & Legal" },
  { name: "Maintenance Enforcement (MEP) Documents", desc: "Alberta family maintenance support documents.", cat: "Real Estate & Legal" },
  { name: "Vehicle Ownership Transfers", desc: "Registry declarations for vehicle sales or gifts.", cat: "Real Estate & Legal" },
  { name: "Cohabitation & Separation Agreements", desc: "Affidavits of execution confirming witness signatures.", cat: "Family & Estates" },
  { name: "Divorce & Custody Filings", desc: "Court documents and affidavits for family court matters.", cat: "Family & Estates" },
  { name: "Power of Attorney Execution Affidavits", desc: "Witness affidavits for Power of Attorney declarations.", cat: "Family & Estates" },
  { name: "Wills & Personal Directives execution", desc: "Affidavits of execution proving valid witness signatures.", cat: "Family & Estates" },
  { name: "Non-contentious Surrogate probate forms", desc: "Alberta surrogate court filings.", cat: "Family & Estates" },
];

// Default Oath FAQs Seed Data
const DEFAULT_OATH_FAQS: Omit<OathFaq, "id" | "createdAt">[] = [
  {
    q: "What does a Commissioner for Oaths do in Alberta?",
    a: "A Commissioner for Oaths in and for Alberta is a provincially appointed official authorized to administer oaths and affirmations, take statutory declarations, and witness signatures on documents intended for use within Alberta and Canada. All services are provided by a Commissioner officially appointed by the Alberta Ministry of Justice."
  },
  {
    q: "Do I need a Commissioner for Oaths or a Notary Public in Edmonton?",
    a: "You generally need a Commissioner for Oaths if your document states 'Commissioner for Oaths in and for Alberta' in the signature block and is intended for use in Canada. If your document explicitly states it must be notarized, requires a 'certified true copy' of an original document, or will be used outside of Canada, you will need a Notary Public or Lawyer."
  },
  {
    q: "How much does commissioning cost, and what are the payment terms?",
    a: "Our commissioning services start at $20. The final fee depends on the number of signatures and stamps required. We accept payment by Cash or Interac e-Transfer only."
  },
  {
    q: "What should I bring to my appointment?",
    a: "Please bring: (1) At least one piece of valid, government-issued photo identification (e.g. Driver's License or Passport). (2) Your document fully completed, but unsigned (you must sign it in front of the Commissioner). (3) All required signing parties and witnesses if applicable."
  },
  {
    q: "Do you accept walk-ins, and how long does it take?",
    a: "We operate strictly by appointment to ensure zero waiting time. Most commissioning appointments take only 5 to 10 minutes. Same-day appointments are frequently available, including evenings and weekends."
  }
];

/* ========================================================
   Oath Documents CRUD
   ======================================================== */

function normalizeDoc(id: string, data: any): OathDoc {
  return {
    id,
    name: data.name || "",
    desc: data.desc || "",
    cat: data.cat || "Affidavits & Declarations",
    createdAt: data.createdAt?.toMillis?.() ?? null,
  };
}

export async function getAllOathDocs(): Promise<OathDoc[]> {
  const q = query(collection(db, DOCS_COL), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  
  if (snap.empty) {
    await seedOathDocs();
    const freshSnap = await getDocs(q);
    return freshSnap.docs.map((d) => normalizeDoc(d.id, d.data()));
  }
  
  return snap.docs.map((d) => normalizeDoc(d.id, d.data()));
}

export async function getOathDocById(id: string): Promise<OathDoc | null> {
  const snap = await getDoc(doc(db, DOCS_COL, id));
  if (!snap.exists()) return null;
  return normalizeDoc(snap.id, snap.data());
}

export async function createOathDoc(data: Omit<OathDoc, "id" | "createdAt">) {
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, DOCS_COL), payload);
  revalidatePaths(["/oath"]);
  return ref.id;
}

export async function updateOathDoc(id: string, data: Partial<Omit<OathDoc, "id" | "createdAt">>) {
  const ref = doc(db, DOCS_COL, id);
  await updateDoc(ref, data);
  revalidatePaths(["/oath"]);
}

export async function deleteOathDoc(id: string) {
  const ref = doc(db, DOCS_COL, id);
  await deleteDoc(ref);
  revalidatePaths(["/oath"]);
}

export async function seedOathDocs() {
  console.log("Seeding default Oath Documents to Firebase...");
  for (const docItem of DEFAULT_OATH_DOCS) {
    const payload = {
      ...docItem,
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, DOCS_COL), payload);
  }
  revalidatePaths(["/oath"]);
}

/* ========================================================
   Oath FAQs CRUD
   ======================================================== */

function normalizeFaq(id: string, data: any): OathFaq {
  return {
    id,
    q: data.q || "",
    a: data.a || "",
    createdAt: data.createdAt?.toMillis?.() ?? null,
  };
}

export async function getAllOathFaqs(): Promise<OathFaq[]> {
  const q = query(collection(db, FAQS_COL), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  
  if (snap.empty) {
    await seedOathFaqs();
    const freshSnap = await getDocs(q);
    return freshSnap.docs.map((d) => normalizeFaq(d.id, d.data()));
  }
  
  return snap.docs.map((d) => normalizeFaq(d.id, d.data()));
}

export async function getOathFaqById(id: string): Promise<OathFaq | null> {
  const snap = await getDoc(doc(db, FAQS_COL, id));
  if (!snap.exists()) return null;
  return normalizeFaq(snap.id, snap.data());
}

export async function createOathFaq(data: Omit<OathFaq, "id" | "createdAt">) {
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, FAQS_COL), payload);
  revalidatePaths(["/oath"]);
  return ref.id;
}

export async function updateOathFaq(id: string, data: Partial<Omit<OathFaq, "id" | "createdAt">>) {
  const ref = doc(db, FAQS_COL, id);
  await updateDoc(ref, data);
  revalidatePaths(["/oath"]);
}

export async function deleteOathFaq(id: string) {
  const ref = doc(db, FAQS_COL, id);
  await deleteDoc(ref);
  revalidatePaths(["/oath"]);
}

export async function seedOathFaqs() {
  console.log("Seeding default Oath FAQs to Firebase...");
  for (const faqItem of DEFAULT_OATH_FAQS) {
    const payload = {
      ...faqItem,
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, FAQS_COL), payload);
  }
  revalidatePaths(["/oath"]);
}
