import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import {
  getServiceBySlug,
  getActiveServices,
  ServicePackage,
} from "@/lib/firebase/services";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowLeft,
  Clock,
  Award,
  Globe,
  MapPin,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function ServiceIcon({ name, size = 24 }: { name: string; size?: number }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Layers size={size} />;
  return <IconComponent size={size} />;
}

// Generate dynamic SEO metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Sunbloom Immigration Services",
      description:
        "The requested immigration service could not be found. Explore our authorized Canadian immigration pathways.",
    };
  }

  const title = `${service.title} | Sunbloom Immigration Services`;
  const description =
    service.desc ||
    `Expert Canadian immigration representation and consultation for ${service.title}. RCIC authorized member R1054053.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://sunbloomimmigration.com/services/${service.slug}`,
      images: service.imageUrl
        ? [
            {
              url: service.imageUrl,
              width: 1200,
              height: 630,
              alt: service.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service || !service.active) {
    notFound();
  }

  // Get other active services for the "Other Pathways" section
  const allServices = await getActiveServices();
  const otherServices = allServices.filter((s) => s.slug !== service.slug);

  // Structured data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://sunbloomimmigration.com/services/${service.slug}#service`,
        "name": service.title,
        "description": service.desc,
        "provider": {
          "@type": "LegalService",
          "name": "Sunbloom Immigration Services",
          "url": "https://sunbloomimmigration.com",
          "telephone": "+12898854848",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Edmonton",
            "addressRegion": "AB",
            "addressCountry": "CA",
          },
        },
        "areaServed": "Canada",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Canadian Immigration Services",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://sunbloomimmigration.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://sunbloomimmigration.com/#services",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": service.title,
            "item": `https://sunbloomimmigration.com/services/${service.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-background min-h-screen text-on-surface pt-24 pb-24">
      {/* Schema.org JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- Breadcrumbs --- */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-medium text-secondary"
        >
          <Link
            href="/"
            className="hover:text-maple-red transition-colors flex items-center gap-1"
          >
            Home
          </Link>
          <ChevronRight size={14} className="text-outline-variant" />
          <Link
            href="/#services"
            className="hover:text-maple-red transition-colors"
          >
            Services
          </Link>
          <ChevronRight size={14} className="text-outline-variant" />
          <span className="text-on-surface font-semibold truncate">
            {service.title}
          </span>
        </nav>
      </div>

      {/* --- Hero Banner Section --- */}
      <section className="relative overflow-hidden bg-surface-container-lowest border-y border-outline-variant/15 py-12 lg:py-16">
        {/* Ambient background decoration */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-maple-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${service.tagColor}`}
              >
                <Sparkles size={12} />
                {service.tag || "Canadian Immigration"}
              </span>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-xs font-semibold text-secondary border border-outline-variant/20">
                <ShieldCheck size={14} className="text-maple-red" />
                RCIC Regulated & Authorized
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-container/30 text-maple-red rounded-xl shrink-0">
                  <ServiceIcon name={service.icon} size={28} />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface font-headline-md">
                  {service.title}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-2xl pt-2">
                {service.desc}
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/intake-form?service=${encodeURIComponent(service.title)}`}
                className="gradient-maple text-white px-7 py-3.5 rounded-lg text-sm font-bold shadow-md hover:scale-95 transition-all inline-flex items-center gap-2"
              >
                Start Free Assessment
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/#appointment"
                className="border-2 border-maple-red text-maple-red hover:bg-maple-red/10 px-6 py-3 rounded-lg text-sm font-bold transition-all inline-flex items-center gap-2"
              >
                <Calendar size={16} />
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Hero Right Banner Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20 aspect-[16/10] bg-muted">
              {service.imageUrl ? (
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-surface-container-high to-surface-container flex items-center justify-center">
                  <ServiceIcon name={service.icon} size={64} />
                </div>
              )}
              {/* Dark subtle gradient bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Floating verified badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-xl border border-outline-variant/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-on-surface">
                    Sunbloom Legal Representation
                  </p>
                  <p className="text-[11px] text-secondary">
                    CICC ID: R1054053 | High Approval Standards
                  </p>
                </div>
                <span className="p-2 bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300 rounded-lg text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 size={14} /> Active Pathway
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Main Content Section (2 Column Layout) --- */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* --- LEFT COLUMN: Key Features & Long-form Rich Text --- */}
          <div className="lg:col-span-8 space-y-12">
            {/* Key Features & Program Highlights Bento */}
            {service.details && service.details.length > 0 && (
              <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/20 space-y-6">
                <div className="flex items-center gap-3 border-b border-outline-variant/15 pb-4">
                  <div className="p-2 bg-primary-container/30 text-maple-red rounded-lg">
                    <Award size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-on-surface font-headline-md">
                      Key Program Highlights & Coverage
                    </h2>
                    <p className="text-xs text-secondary">
                      Comprehensive features included in our {service.title}{" "}
                      representation
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/15 shadow-sm"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-maple-red mt-0.5 shrink-0"
                      />
                      <span className="text-sm font-medium text-on-surface leading-snug">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Long-form Comprehensive Guide / Rich Text Body */}
            {service.content ? (
              <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-10 border border-outline-variant/20 shadow-sm space-y-4">
                <div
                  className="service-prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              </div>
            ) : (
              <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 text-center space-y-4">
                <p className="text-secondary text-sm">
                  Our consultants provide tailored assistance for{" "}
                  {service.title}. Schedule a consultation to review your
                  individual profile.
                </p>
                <Link
                  href="/#appointment"
                  className="inline-flex items-center gap-2 text-sm font-bold text-maple-red hover:underline"
                >
                  Book a Consultation <ArrowRight size={14} />
                </Link>
              </div>
            )}

            {/* 4-Step Process Pathway Card */}
            <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/20 space-y-6">
              <h3 className="text-xl font-bold text-on-surface font-headline-md">
                Our 4-Step Process for {service.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-xs">
                    01
                  </div>
                  <h4 className="font-bold text-sm text-on-surface">
                    Profile Assessment
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed">
                    Evaluating eligibility, credentials, and selecting the optimal
                    stream.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-xs">
                    02
                  </div>
                  <h4 className="font-bold text-sm text-on-surface">
                    Documentation
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed">
                    Compiling robust supporting documents, affidavits, and verified
                    records.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-xs">
                    03
                  </div>
                  <h4 className="font-bold text-sm text-on-surface">
                    Legal Submission
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed">
                    Filing with IRCC accompanied by an authorized RCIC submission
                    letter.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-xs">
                    04
                  </div>
                  <h4 className="font-bold text-sm text-on-surface">
                    Approval & Landing
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed">
                    Tracking progress, handling correspondence, and final settlement
                    guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Sticky Sidebar & Consultation Card --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {/* Consultation Action Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 border border-outline-variant/25 shadow-lg space-y-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-maple-red bg-primary-container/30 px-2.5 py-1 rounded-full">
                  Free Initial Review
                </span>
                <h3 className="text-xl font-bold text-on-surface font-headline-md pt-1">
                  Ready to apply for {service.title}?
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Get a personalized eligibility assessment and direct guidance
                  from our licensed RCIC consultant.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/intake-form?service=${encodeURIComponent(service.title)}`}
                  className="w-full gradient-maple text-white py-3.5 px-4 rounded-xl text-sm font-bold shadow-md hover:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Complete Assessment Form</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/#appointment"
                  className="w-full bg-surface-container hover:bg-surface-variant text-on-surface py-3 px-4 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-outline-variant/20"
                >
                  <Calendar size={15} className="text-maple-red" />
                  <span>Book 1-on-1 Consultation</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-outline-variant/15 space-y-3">
                <div className="flex items-center gap-3 text-xs text-secondary">
                  <ShieldCheck size={16} className="text-maple-red shrink-0" />
                  <span>Regulated Canadian Immigration Consultant (RCIC)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-secondary">
                  <Clock size={16} className="text-maple-red shrink-0" />
                  <span>Fast Response & Transparent Case Timeline</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-secondary">
                  <CheckCircle2 size={16} className="text-maple-red shrink-0" />
                  <span>100% Confidential & Secure Client Portal</span>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="pt-4 border-t border-outline-variant/15 bg-surface-container/50 -mx-6 -mb-6 p-6 rounded-b-2xl space-y-2.5">
                <p className="text-xs font-bold text-on-surface">
                  Need Immediate Assistance?
                </p>
                <div className="flex items-center gap-2 text-xs text-secondary">
                  <Phone size={14} className="text-maple-red" />
                  <a
                    href="tel:+12898854848"
                    className="hover:text-maple-red transition-colors font-semibold"
                  >
                    (289) 885-4848
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-secondary">
                  <Mail size={14} className="text-maple-red" />
                  <a
                    href="mailto:info@sunbloomimmigration.com"
                    className="hover:text-maple-red transition-colors truncate"
                  >
                    info@sunbloomimmigration.com
                  </a>
                </div>
              </div>
            </div>

            {/* Commissioner for Oaths Cross-Promotion Banner */}
            <div className="bg-gradient-to-br from-surface-container-high to-surface-container p-6 rounded-2xl border border-outline-variant/20 space-y-3">
              <div className="flex items-center gap-2 text-maple-red font-bold text-xs uppercase tracking-wider">
                <Award size={16} />
                <span>Alberta Appointed</span>
              </div>
              <h4 className="font-bold text-sm text-on-surface">
                Need Document Witnessing or Affidavits?
              </h4>
              <p className="text-xs text-secondary leading-relaxed">
                Official Commissioner for Oaths services in Edmonton starting at $20
                for statutory declarations, travel consents, and passport affidavits.
              </p>
              <Link
                href="/oath"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-maple-red hover:underline pt-1"
              >
                View Oath Services & Booking <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Related Services Section --- */}
      {otherServices.length > 0 && (
        <section className="border-t border-outline-variant/15 bg-surface-container-low/50 py-16">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-maple-red uppercase tracking-wider">
                  Explore More Options
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-on-surface font-headline-md mt-1">
                  Other Immigration Pathways
                </h2>
              </div>
              <Link
                href="/#services"
                className="text-xs font-bold text-maple-red hover:underline inline-flex items-center gap-1"
              >
                View All Services <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.slice(0, 3).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-primary-container/30 text-maple-red rounded-lg">
                        <ServiceIcon name={s.icon} size={20} />
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.tagColor}`}
                      >
                        {s.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-on-surface group-hover:text-maple-red transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-secondary mt-1.5 line-clamp-2 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-outline-variant/10 flex items-center justify-between text-xs font-bold text-maple-red">
                    <span>Learn More</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
