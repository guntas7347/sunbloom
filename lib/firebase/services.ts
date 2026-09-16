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
  slug: string;
  icon: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  details: string[];
  content?: string;
  imageUrl?: string;
  active: boolean;
  createdAt?: number | null; // normalized
}

const COL = "Services";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const DEFAULT_SERVICES: Omit<ServicePackage, "id" | "createdAt">[] = [
  {
    slug: "express-entry",
    icon: "Zap",
    title: "Express Entry 2.0",
    desc: "Optimized for STEM, Healthcare, and Skilled Trades with category-based selection strategies.",
    tag: "Fast-Track",
    tagColor: "bg-primary-container/30 text-on-primary-container",
    imageUrl:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Federal Skilled Worker (FSW), Canadian Experience Class (CEC), and Federal Skilled Trades (FST)",
      "CRS score assessment, comprehensive profiling & ranking enhancement roadmap",
      "Category-based selection targeting STEM, Healthcare, Trades, Transport & Agriculture",
      "End-to-end document preparation, reference letter verification, and ITA to PR submission",
    ],
    content: `<h2>Navigating Canada's Premier Economic Immigration System</h2>
<p>Express Entry is Canada’s flagship application management system for key economic immigration programs. In 2026, Immigration, Refugees and Citizenship Canada (IRCC) utilizes targeted <strong>Category-Based Selection</strong> rounds to invite candidates with specific in-demand work experience and language proficiencies alongside standard Comprehensive Ranking System (CRS) draws.</p>

<h3>Programs Managed Under Express Entry</h3>
<ul>
  <li><strong>Federal Skilled Worker Program (FSWP):</strong> For foreign skilled workers with eligible foreign work experience and education credentials.</li>
  <li><strong>Canadian Experience Class (CEC):</strong> For skilled workers with at least one year of Canadian skilled work experience within the last 3 years.</li>
  <li><strong>Federal Skilled Trades Program (FSTP):</strong> For qualified tradespersons with verified certification or Canadian job offers.</li>
</ul>

<h3>Targeted Priority Categories for 2026</h3>
<p>IRCC regularly issues Invitations to Apply (ITAs) through dedicated category draws focusing on key pillars of the Canadian economy:</p>
<ul>
  <li><strong>STEM Occupations:</strong> Software engineers, data scientists, architects, and cybersecurity specialists.</li>
  <li><strong>Healthcare Professionals:</strong> Physicians, registered nurses, medical laboratory technologists, and allied health professionals.</li>
  <li><strong>Skilled Trades:</strong> Electricians, carpenters, plumbers, and heavy equipment mechanics.</li>
  <li><strong>Francophone Mobility:</strong> Candidates with strong French language capabilities (NCLC 7+) regardless of specific occupation.</li>
  <li><strong>Agriculture & Transport:</strong> Commercial transport operators, agricultural managers, and specialized technicians.</li>
</ul>

<h3>How Sunbloom Immigration Accelerates Your Profile</h3>
<p>Our authorized RCIC consultants conduct a comprehensive 360-degree review of your profile to optimize every available CRS point:</p>
<ol>
  <li><strong>Educational Credential Assessment (ECA):</strong> Strategic guidance on maximizing points for foreign degrees and dual credentials.</li>
  <li><strong>Language Score Mastery:</strong> Identifying strategic target scores in IELTS, CELPIP, TEF, or TCF.</li>
  <li><strong>Job Offer & LMIA Evaluation:</strong> Assessing whether an existing Canadian job offer qualifies for 50 or 200 additional CRS points.</li>
  <li><strong>Provincial Alignment (PNP):</strong> Linking your profile directly to provincial nominee streams for an automatic 600-point boost.</li>
</ol>`,
    active: true,
  },
  {
    slug: "pnp-specialized",
    icon: "Map",
    title: "PNP Specialized",
    desc: "Provincial Nomination programs tailored to specific labor market needs in Ontario, BC, Alberta, and other provinces.",
    tag: "Provincial",
    tagColor: "bg-secondary-container/50 text-on-secondary-container",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Alberta Advantage Immigration Program (AAIP) & Tech Pathway expertise",
      "Ontario Immigrant Nominee Program (OINP) & BC PNP strategic matching",
      "Automatic 600 additional CRS points for Express Entry upon provincial nomination",
      "Non-Express Entry Base Streams for in-demand occupations and direct provincial PR",
    ],
    content: `<h2>Unlocking Provincial Pathways Across Canada</h2>
<p>The Provincial Nominee Program (PNP) offers provinces and territories across Canada the authority to nominate individuals who wish to settle in a particular province and possess the specific skills, education, and work experience required by the local labor market.</p>

<h3>The Power of a Provincial Nomination</h3>
<p>Securing a provincial nomination through an Express Entry-aligned stream provides an automatic <strong>600 additional Comprehensive Ranking System (CRS) points</strong>, virtually guaranteeing an Invitation to Apply (ITA) in the very next federal draw.</p>

<h3>Key Provincial Programs We Specialize In</h3>
<ul>
  <li><strong>Alberta Advantage Immigration Program (AAIP):</strong> Alberta Express Entry Stream, Accelerated Tech Pathway, Rural Renewal Stream, and Opportunity Stream.</li>
  <li><strong>Ontario Immigrant Nominee Program (OINP):</strong> Human Capital Priorities, Employer Job Offer streams, and Masters/PhD Graduate streams.</li>
  <li><strong>British Columbia PNP (BC PNP):</strong> Tech Stream, Healthcare Authority Stream, and Skilled Worker categories.</li>
  <li><strong>Saskatchewan (SINP) & Manitoba (MPNP):</strong> International Skilled Worker streams and in-demand occupation lists.</li>
</ul>

<h3>Base vs. Enhanced PNP Streams</h3>
<p>We guide candidates through both <em>Enhanced streams</em> (connected directly to federal Express Entry for rapid processing) and <em>Base streams</em> (paper-based / portal applications for candidates who may not meet federal Express Entry thresholds but have valuable local work experience or employer support).</p>`,
    active: true,
  },
  {
    slug: "visitor-visa",
    icon: "Plane",
    title: "Visitor Visa & Travel",
    desc: "Explore Canada for tourism, family visits, business meetings, or short courses with zero hassle.",
    tag: "Temporary",
    tagColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Single and multiple-entry Temporary Resident Visa (TRV) applications",
      "Dual intent justification & strong ties to home country documentation",
      "Super Visa for parents and grandparents with multi-year stay authorizations",
      "Business visitor visas, conference travel, and urgent processing assistance",
    ],
    content: `<h2>Seamless Travel & Visitor Authorization for Canada</h2>
<p>Whether you are planning a vacation to explore Canada's breathtaking landscapes, visiting beloved family members, attending a critical business conference, or exploring educational institutions, Sunbloom Immigration provides end-to-end representation to ensure your Temporary Resident Visa (TRV) application is robust, transparent, and fully compliant.</p>

<h3>Types of Visitor Applications We Handle</h3>
<ul>
  <li><strong>Tourist & Family Visit Visas:</strong> Multiple-entry visas valid for up to 10 years (or passport validity), granting stays of up to 6 months per entry.</li>
  <li><strong>Parent and Grandparent Super Visa:</strong> Multi-entry visas granting parents and grandparents of Canadian citizens or PRs the ability to stay in Canada for up to 5 consecutive years per visit with options for 2-year extensions.</li>
  <li><strong>Business Visitor Visas:</strong> Facilitating entry for international delegates, corporate meetings, investor site inspections, and industry conferences.</li>
  <li><strong>Visitor Record Extensions:</strong> Legal extensions of status for individuals currently in Canada who wish to prolong their temporary stay.</li>
</ul>

<h3>Why Visitor Visas Get Refused & How We Protect Your File</h3>
<p>The most common reasons for visitor visa refusals under IRCC Section 179(b) include doubts regarding ties to the home country, insufficient financial proof, or unclear purpose of visit. Our team crafts customized submission letters, compiles detailed proof of socio-economic ties, and structures your financial disclosures to meet IRCC guidelines.</p>`,
    active: true,
  },
  {
    slug: "work-and-study-permits",
    icon: "GraduationCap",
    title: "Work & Study Permits",
    desc: "Strategic planning for students, professionals, and temporary workers aiming for long-term residency status.",
    tag: "Permits",
    tagColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Study permit applications at Designated Learning Institutions (DLIs) & PAL advisory",
      "Post-Graduation Work Permit (PGWP) transition strategies for long-term PR",
      "Labour Market Impact Assessment (LMIA) applications and LMIA-exempt work permits",
      "Spousal Open Work Permits (SOWP) for spouses of international students and skilled workers",
    ],
    content: `<h2>Educational & Career Pathways in Canada</h2>
<p>Studying and working in Canada provides invaluable Canadian experience, credential recognition, and the strongest foundation for transitioning to Permanent Residency.</p>

<h3>Study Permits & Provincial Attestation Letters (PAL)</h3>
<p>Under current regulations, international students must secure a Provincial Attestation Letter (PAL) alongside their official Letter of Acceptance (LOA) from a Designated Learning Institution (DLI). We guide students through institution selection, genuine student intent documentation, financial proof structuring, and study permit filings.</p>

<h3>Work Permit Categories We Manage</h3>
<ul>
  <li><strong>LMIA-Based Work Permits:</strong> Comprehensive support for Canadian employers and foreign workers to secure positive Labour Market Impact Assessments under high-wage, low-wage, PR-stream, and Global Hypergrowth programs.</li>
  <li><strong>Post-Graduation Work Permits (PGWP):</strong> Open work permits spanning up to 3 years allowing graduates from eligible Canadian programs to acquire qualifying skilled work experience.</li>
  <li><strong>Spousal Open Work Permits (SOWP):</strong> Authorizing spouses and common-law partners of eligible students and foreign workers in TEER 0, 1, 2, or 3 occupations to work freely in Canada.</li>
  <li><strong>LMIA-Exempt Work Permits:</strong> International agreements (CUSMA/USMCA, CETA, CPTPP), Francophone Mobility (Mobilité Francophone), and Intra-Company Transferees.</li>
</ul>`,
    active: true,
  },
  {
    slug: "startup-and-corporate",
    icon: "Briefcase",
    title: "Start-up & Corporate",
    desc: "Comprehensive immigration solutions for entrepreneurs, innovative startups, and multinational companies expanding to Canada.",
    tag: "Business",
    tagColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Start-Up Visa (SUV) program support with designated venture funds & angel groups",
      "Intra-Company Transferee (ICT) executive and specialized knowledge work permits",
      "C11 Entrepreneur work permits and Provincial Entrepreneur Streams",
      "Corporate compliance audits and global talent stream fast-tracking",
    ],
    content: `<h2>Empowering Global Entrepreneurs & Corporate Expansion</h2>
<p>Canada welcomes visionary entrepreneurs and multinational organizations looking to build world-class businesses in a stable, highly educated, and innovation-driven economy.</p>

<h3>Start-Up Visa (SUV) Program</h3>
<p>The Start-Up Visa program targets immigrant entrepreneurs with the skills and potential to build businesses in Canada that are innovative, can create jobs for Canadians, and can compete on a global scale. We advise founding teams on securing commitments from designated Canadian venture capital funds, angel investor groups, or business incubators, followed by concurrent work permit and permanent residency filings.</p>

<h3>Corporate Mobility & Intra-Company Transferees (ICT)</h3>
<p>Multinational companies can transfer key executives, senior managers, or workers with specialized knowledge to an established Canadian parent company, subsidiary, branch, or affiliate without requiring an LMIA under the International Mobility Program (C12 / ICT regulations).</p>

<h3>Owner-Operator & C11 Entrepreneur Streams</h3>
<p>For individuals who own or control a Canadian enterprise, the C11 work permit stream enables entrepreneurs to actively operate their business in Canada, laying the groundwork for provincial nomination or permanent residence under the Canadian Experience Class.</p>`,
    active: true,
  },
  {
    slug: "family-sponsorship",
    icon: "Heart",
    title: "Family Sponsorship",
    desc: "Reuniting families in Canada through Spousal, Common-Law, Parent, and Dependent Child sponsorship programs.",
    tag: "Family",
    tagColor: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    imageUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Inland and Outland Spousal & Common-Law Partner Sponsorship",
      "Spousal Open Work Permit concurrent filing for inland applicants",
      "Parents and Grandparents Program (PGP) and Super Visa alternatives",
      "Dependent child, adopted children, and orphan relative sponsorships",
    ],
    content: `<h2>Reuniting Families in Canada with Care & Precision</h2>
<p>Family reunification is one of the foundational pillars of the Canadian immigration system. Sunbloom Immigration provides empathetic, thorough legal guidance to ensure your loved ones join you in Canada smoothly and securely.</p>

<h3>Spousal and Common-Law Partner Sponsorship</h3>
<p>Canadian citizens and Permanent Residents can sponsor their spouse, common-law partner, or conjugal partner for Canadian Permanent Residence.</p>
<ul>
  <li><strong>Inland Sponsorship:</strong> For couples residing together in Canada. The sponsored spouse is eligible to apply for an Open Work Permit while the sponsorship application is being processed.</li>
  <li><strong>Outland Sponsorship:</strong> For partners residing outside Canada (or inside Canada who travel frequently). Decisions can be appealed to the Immigration Appeal Division (IAD) if necessary.</li>
</ul>

<h3>Key Requirements for Sponsors</h3>
<ul>
  <li>Must be at least 18 years of age and a Canadian citizen or Permanent Resident.</li>
  <li>Must sign an undertaking promising to provide financial support for the basic needs of the sponsored person (3 years for spouses, 20 years for parents/grandparents).</li>
  <li>Must prove a genuine, ongoing relationship through comprehensive documentary evidence (joint leases, communications, financial commingling, photos, affidavits).</li>
</ul>

<h3>Parents & Grandparents Sponsorship (PGP) & Super Visa</h3>
<p>While the federal PGP operates via lottery intake, we also prepare high-approval Super Visa applications allowing parents and grandparents to stay in Canada for up to 5 consecutive years per visit with hassle-free renewals.</p>`,
    active: true,
  },
];

/* ================================
   Normalizer
   ================================ */

function normalizeService(id: string, data: any): ServicePackage {
  const title = data.title || "";
  const calculatedSlug = data.slug || slugify(title) || id;

  return {
    id,
    slug: calculatedSlug,
    icon: data.icon || "Briefcase",
    title: title,
    desc: data.desc || "",
    tag: data.tag || "",
    tagColor:
      data.tagColor ||
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    details: Array.isArray(data.details) ? data.details : [],
    content: data.content || "",
    imageUrl: data.imageUrl || "",
    active: data.active !== undefined ? data.active : true,
    createdAt: data.createdAt?.toMillis?.() ?? null,
  };
}

/* ================================
   Migration & Seeding
   ================================ */

export async function seedOrMigrateServices(): Promise<ServicePackage[]> {
  try {
    const snap = await getDocs(collection(db, COL));
    
    if (snap.empty) {
      console.log("Seeding default services into Firestore...");
      for (const item of DEFAULT_SERVICES) {
        await addDoc(collection(db, COL), {
          ...item,
          createdAt: serverTimestamp(),
        });
      }
      const freshSnap = await getDocs(collection(db, COL));
      return freshSnap.docs.map((d) => normalizeService(d.id, d.data()));
    }

    // Check if any existing document is missing slug or content
    const existing = snap.docs.map((d) => normalizeService(d.id, d.data()));
    let updatedAny = false;

    for (const docSnap of snap.docs) {
      const data = docSnap.data();
      const defaultMatch = DEFAULT_SERVICES.find(
        (def) =>
          slugify(def.title) === slugify(data.title || "") ||
          def.slug === data.slug
      );

      const updates: any = {};
      if (!data.slug && data.title) {
        updates.slug = defaultMatch ? defaultMatch.slug : slugify(data.title);
      }
      if (!data.content && defaultMatch?.content) {
        updates.content = defaultMatch.content;
      }
      if (!data.imageUrl && defaultMatch?.imageUrl) {
        updates.imageUrl = defaultMatch.imageUrl;
      }

      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, COL, docSnap.id), updates);
        updatedAny = true;
      }
    }

    if (updatedAny) {
      const freshSnap = await getDocs(collection(db, COL));
      return freshSnap.docs.map((d) => normalizeService(d.id, d.data()));
    }

    return existing;
  } catch (err) {
    console.error("Error in seedOrMigrateServices:", err);
    return DEFAULT_SERVICES.map((s, i) => ({
      ...s,
      id: `default-${i}`,
      createdAt: Date.now(),
    }));
  }
}

/* ================================
   Readers
   ================================ */

// Get all services (admin)
export async function getAllServices(): Promise<ServicePackage[]> {
  try {
    const snap = await getDocs(collection(db, COL));
    if (snap.empty) {
      return await seedOrMigrateServices();
    }
    return snap.docs.map((d) => normalizeService(d.id, d.data()));
  } catch (err) {
    console.error("Failed to fetch all services:", err);
    return DEFAULT_SERVICES.map((s, i) => ({
      ...s,
      id: `default-${i}`,
      createdAt: Date.now(),
    }));
  }
}

// Paginated
export async function getServicesPage(pageSize = 20, cursor?: any) {
  try {
    const checkSnap = await getDocs(collection(db, COL));
    if (checkSnap.empty) {
      await seedOrMigrateServices();
    }

    let q;
    if (cursor) {
      q = query(
        collection(db, COL),
        orderBy("createdAt", "desc"),
        startAfter(cursor),
        limit(pageSize)
      );
    } else {
      q = query(
        collection(db, COL),
        orderBy("createdAt", "desc"),
        limit(pageSize)
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
  } catch (err) {
    console.error("Failed to paginate services:", err);
    return {
      items: DEFAULT_SERVICES.map((s, i) => ({
        ...s,
        id: `default-${i}`,
        createdAt: Date.now(),
      })),
      lastDoc: null,
      hasMore: false,
    };
  }
}

// Get only active services (public)
export async function getActiveServices(): Promise<ServicePackage[]> {
  try {
    const q = query(collection(db, COL), where("active", "==", true));
    const snap = await getDocs(q);
    
    if (snap.empty) {
      const seeded = await seedOrMigrateServices();
      return seeded.filter((s) => s.active);
    }

    return snap.docs.map((d) => normalizeService(d.id, d.data()));
  } catch (err) {
    console.error("Failed to fetch active services:", err);
    return DEFAULT_SERVICES.filter((s) => s.active).map((s, i) => ({
      ...s,
      id: `default-${i}`,
      createdAt: Date.now(),
    }));
  }
}

// Get one service by document ID
export async function getServiceById(
  id: string
): Promise<ServicePackage | null> {
  try {
    const snap = await getDoc(doc(db, COL, id));
    if (!snap.exists()) return null;
    return normalizeService(snap.id, snap.data());
  } catch (err) {
    console.error(`Failed to fetch service ${id}:`, err);
    return null;
  }
}

// Get one service by slug (or fallback to id/title match)
export async function getServiceBySlug(
  slug: string
): Promise<ServicePackage | null> {
  try {
    const cleanSlug = slug.toLowerCase().trim();
    
    // First query by slug field
    const q = query(collection(db, COL), where("slug", "==", cleanSlug));
    const snap = await getDocs(q);
    
    if (!snap.empty) {
      return normalizeService(snap.docs[0].id, snap.docs[0].data());
    }

    // Fallback: check if slug matches document ID
    const byId = await getServiceById(cleanSlug);
    if (byId) return byId;

    // Fallback: check all docs to see if title slug matches
    const all = await getAllServices();
    const match = all.find(
      (s) =>
        s.slug === cleanSlug ||
        slugify(s.title) === cleanSlug ||
        s.id === cleanSlug
    );
    if (match) return match;

    // Fallback: check default services
    const defaultMatch = DEFAULT_SERVICES.find(
      (s) => s.slug === cleanSlug || slugify(s.title) === cleanSlug
    );
    if (defaultMatch) {
      return {
        ...defaultMatch,
        id: `default-${cleanSlug}`,
        createdAt: Date.now(),
      };
    }

    return null;
  } catch (err) {
    console.error(`Failed to fetch service by slug ${slug}:`, err);
    const defaultMatch = DEFAULT_SERVICES.find(
      (s) => s.slug === slug || slugify(s.title) === slug
    );
    if (defaultMatch) {
      return {
        ...defaultMatch,
        id: `default-${slug}`,
        createdAt: Date.now(),
      };
    }
    return null;
  }
}

/* ================================
   Mutations
   ================================ */

// Create
export async function createService(data: Omit<ServicePackage, "id">) {
  const serviceSlug = data.slug ? slugify(data.slug) : slugify(data.title);
  const payload = {
    ...data,
    slug: serviceSlug,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, COL), payload);

  revalidatePaths(["/", "/services", `/services/${serviceSlug}`, `/service/${serviceSlug}`]);

  return docRef.id;
}

// Update
export async function updateService(id: string, data: Partial<ServicePackage>) {
  const updates: any = { ...data };
  if (updates.slug) {
    updates.slug = slugify(updates.slug);
  }

  const ref = doc(db, COL, id);
  await updateDoc(ref, updates);

  revalidatePaths([
    "/",
    "/services",
    `/services/${updates.slug || id}`,
    `/service/${updates.slug || id}`,
  ]);
}

// Delete
export async function deleteService(id: string) {
  const ref = doc(db, COL, id);
  await deleteDoc(ref);

  revalidatePaths(["/", "/services"]);
}
