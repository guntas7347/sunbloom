import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Clock,
  CheckCircle2,
  Info,
  Phone,
  MessageSquare,
  Calendar,
  FileText,
  AlertTriangle,
  Award,
} from "lucide-react";
import { getCachedOathDocs, getCachedOathFaqs } from "@/lib/firebase/oath-server";
import OathDocFinder from "@/Components/OathDocFinder";
import OathFaqAccordion from "@/Components/OathFaqAccordion";

export const metadata: Metadata = {
  title: "Commissioner for Oaths Edmonton | Same-Day Service from $20",
  description:
    "Official Commissioner for Oaths in Edmonton, AB. Fast 5-10 minute appointments, same-day and mobile service starting at $20 for affidavits, statutory declarations, travel consent letters, and registry documents. Call or text (289) 885-4848.",
  alternates: {
    canonical: "/oath",
  },
  openGraph: {
    title: "Commissioner for Oaths Edmonton | Same-Day Service from $20",
    description:
      "Official Commissioner for Oaths in Edmonton, AB. Fast 5-10 minute appointments, same-day and mobile service starting at $20 for affidavits, statutory declarations, travel consent letters, and registry documents. Call or text (289) 885-4848.",
    type: "website",
    locale: "en_CA",
    url: "https://sunbloomimmigration.com/oath",
  },
};

export default async function OathsPage() {
  const docs = await getCachedOathDocs();
  const faqs = await getCachedOathFaqs();

  // Structured data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://sunbloomimmigration.com/oath#localbusiness",
        "name": "Commissioner for Oaths Edmonton Services",
        "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80",
        "telephone": "+12898854848",
        "url": "https://sunbloomimmigration.com/oath",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8130 Rowland Rd NW",
          "addressLocality": "Edmonton",
          "addressRegion": "AB",
          "postalCode": "T6A 3W8",
          "addressCountry": "CA",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 53.54148,
          "longitude": -113.44754,
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "opens": "07:30",
          "closes": "18:00",
        },
        "priceRange": "$$",
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="bg-background min-h-screen text-on-surface">
      {/* Schema.org JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-surface-container-low border-b border-outline-variant/15 text-on-surface dark:bg-[#050b18] dark:text-white transition-colors duration-300">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-25 filter blur-xs"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent dark:from-[#050b18] dark:via-[#050b18]/90 dark:to-transparent"></div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 border border-primary-container/30 text-on-primary-container text-xs font-semibold uppercase tracking-wider">
              <Award size={14} className="text-maple-red" /> Appointed in & for
              Alberta
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-on-surface dark:text-white">
              Commissioner for Oaths <br />
              <span className="text-maple-red">Edmonton Services</span>
            </h1>

            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              Same-day, professional, and affordable commissioning services
              starting at{" "}
              <span className="text-on-surface dark:text-white font-bold">
                $20
              </span>
              . Document signing for affidavits, statutory declarations,
              registry forms, and travel letters.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#booking-widget"
                className="gradient-maple text-white text-center px-8 py-3.5 rounded-xl font-bold hover:scale-95 transition-all shadow-lg shadow-maple-red/20 active:scale-90"
              >
                Book Appointment Online
              </a>
              <a
                href="tel:+12898854848"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container border border-outline-variant/30 text-on-surface hover:bg-surface-container-high dark:bg-white/10 dark:hover:bg-white/15 dark:border-white/20 dark:text-white rounded-xl font-bold transition-all"
              >
                <Phone size={18} className="text-maple-red" />
                Call / Text (289) 885-4848
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-outline-variant/15 dark:border-white/10">
              <div className="space-y-1">
                <span className="text-xs text-secondary block">Price</span>
                <span className="text-lg font-bold text-on-surface dark:text-white">
                  From $20
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-secondary block">Speed</span>
                <span className="text-lg font-bold text-on-surface dark:text-white">
                  5-10 Mins
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-secondary block">
                  Availability
                </span>
                <span className="text-lg font-bold text-on-surface dark:text-white">
                  7 Days a Week
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-secondary block">Rating</span>
                <span className="text-lg font-bold text-on-surface dark:text-white">
                  ★ Top Rated
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE CONTENT GRID --- */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: Main info */}
          <div className="lg:col-span-8 space-y-12">
            {/* Introductory Statement */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">
                Duly Appointed Commissioning Services
              </h2>
              <p className="text-secondary leading-relaxed">
                Whether you need to file a statutory declaration for
                immigration, execute affidavits for court filings, verify land
                title transfer permissions, or declare travel letters, we can
                help. All services are performed by an officially authorized
                Commissioner for Oaths in and for Alberta, conforming with
                provincial laws and guidelines.
              </p>
            </div>

            {/* Document Interactive Finder - Client component */}
            <OathDocFinder initialDocs={docs} />

            {/* Preparation section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                What to Bring to Your Appointment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/10 space-y-4 dark:bg-[#0b1329]/50">
                  <div className="h-10 w-10 rounded-lg gradient-maple flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-base">
                    Valid Government-Issued Photo ID
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed">
                    You must present at least one valid, unexpired piece of
                    photo identification (e.g. Alberta Driver's License,
                    Canadian Passport, or PR Card). Digital copies are not
                    accepted.
                  </p>
                </div>

                <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/10 space-y-4 dark:bg-[#0b1329]/50">
                  <div className="h-10 w-10 rounded-lg gradient-maple flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-base">
                    Completed (but Unsigned) Documents
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed">
                    Ensure all fields are fully completed before arriving.
                    However, **do not sign** the signature fields. You must sign
                    the papers directly in front of the Commissioner.
                  </p>
                </div>

                <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/10 space-y-4 dark:bg-[#0b1329]/50">
                  <div className="h-10 w-10 rounded-lg gradient-maple flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-base">
                    All Signing Parties Present
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed">
                    Everyone whose signature needs commissioning must be
                    physically present at the appointment. If the document
                    requires execution witnesses, they must also be present.
                  </p>
                </div>

                <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/10 space-y-4 dark:bg-[#0b1329]/50">
                  <div className="h-10 w-10 rounded-lg gradient-maple flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <h4 className="font-bold text-base">
                    Cash or E-Transfer Payment
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed">
                    Payment is due at the time of commissioning. We accept cash
                    or direct Interac e-Transfers to ensure swift transactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Notary public disclaimer */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-4">
              <AlertTriangle
                className="text-amber-600 shrink-0 mt-1"
                size={28}
              />
              <div className="space-y-2">
                <h4 className="font-bold text-lg text-amber-800 dark:text-amber-400">
                  Do You Need a Commissioner for Oaths or Notary Public?
                </h4>
                <p className="text-sm text-secondary leading-relaxed">
                  We provide Commissioner for Oaths services exclusively and
                  **do not** offer Notary Public services. We cannot certify
                  true copies, notarize contracts/deeds, or execute
                  documentation meant to leave Canada.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-400">
                  <Info size={14} /> If your documents state "Commissioner for
                  Oaths in and for Alberta", we are the right choice.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky panels for Pricing, Hours, Booking */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[90px]">
            {/* Booking Inquiry Card */}
            <div
              id="booking-widget"
              className="bg-surface-container-high rounded-2xl border border-outline-variant/20 p-6 space-y-4 shadow-md dark:bg-[#0b1329]/50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-container/20 rounded-lg text-maple-red">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-on-surface dark:text-white">
                    Schedule Visit
                  </h3>
                  <p className="text-[11px] text-secondary">
                    Appointments in 5-10 minutes
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface/50 border border-outline-variant/15 text-sm space-y-3 dark:bg-[#0f172a]/50">
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-secondary text-xs">
                    Standard Oath Fee:
                  </span>
                  <span className="font-bold text-on-surface dark:text-white">
                    $20.00 / stamp
                  </span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-secondary text-xs">
                    Mobile Service:
                  </span>
                  <span className="font-bold text-on-surface dark:text-white">
                    Contact for quote
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-secondary text-xs">Availability:</span>
                  <span className="font-bold text-green-600">Open Today</span>
                </div>
              </div>

              {/* Call-to-actions */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/#appointment"
                  className="w-full block text-center gradient-maple text-white py-3 rounded-xl text-sm font-bold shadow-md hover:opacity-95"
                >
                  Book Instant
                </Link>
                <a
                  href="sms:+12898854848"
                  className="w-full flex items-center justify-center gap-2 bg-surface hover:bg-surface-container-highest border border-outline-variant/30 py-3 rounded-xl text-sm font-bold transition-all dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10"
                >
                  <MessageSquare size={16} className="text-maple-red" />
                  Text to Schedule
                </a>
              </div>
            </div>

            {/* Fees & Hours Card */}
            <div className="bg-surface-container-high rounded-2xl border border-outline-variant/20 p-6 space-y-4 dark:bg-[#0b1329]/50">
              <h3 className="font-bold text-lg flex items-center gap-2 border-b border-outline-variant/15 pb-3 text-on-surface dark:text-white">
                <Clock className="text-maple-red" size={20} /> Hours & Location
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="text-secondary shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-semibold block text-xs text-on-surface dark:text-white">
                      Business Hours
                    </span>
                    <p className="text-xs text-secondary mt-0.5">
                      Open 7 Days a Week <br />
                      7:30 AM – 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <MapPin
                    className="text-secondary shrink-0 mt-0.5"
                    size={16}
                  />
                  <div>
                    <span className="font-semibold block text-xs text-on-surface dark:text-white">
                      Office Address
                    </span>
                    <a
                      href="https://www.google.com/maps/place/?q=place_id:ChIJN18vP5E7oFMRpn6ERhTRhmw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-maple-red hover:underline mt-0.5 block font-semibold"
                    >
                      8130 Rowland Rd NW <br />
                      Edmonton, AB T6A 3W8
                    </a>
                  </div>
                </div>

                {/* Google Map Link Card */}
                <a
                  href="https://www.google.com/maps/place/?q=place_id:ChIJN18vP5E7oFMRpn6ERhTRhmw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-xl overflow-hidden h-32 border border-outline-variant/10 hover:opacity-95 transition-opacity"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="bg-white text-black font-semibold text-xs px-3 py-1.5 rounded-lg shadow flex items-center gap-1.5">
                      <MapPin size={12} className="text-maple-red" /> View on
                      Google Maps
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Promotion Box */}
            <div className="bg-primary-container/20 border border-outline-variant/10 rounded-2xl p-5 text-center space-y-2 dark:bg-[#0b1329]/30">
              <span className="text-xs font-bold text-maple-red tracking-wider uppercase">
                Monthly Promotion
              </span>
              <h4 className="font-bold text-sm text-on-surface dark:text-white">
                Costco Gift Card Raffle
              </h4>
              <p className="text-[11px] text-secondary leading-relaxed">
                All booked clients are automatically entered into our monthly
                draw for a $200 Costco gift card! No additional purchase or
                review required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 bg-surface-container-low border-t border-outline-variant/10 dark:bg-[#050b18]/60">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-on-surface dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-secondary max-w-2xl mx-auto text-sm">
              Have questions about Commissioner for Oaths services in Edmonton?
              Find answers to commonly asked questions below.
            </p>
          </div>

          {/* FAQ Accordion - Client component */}
          <OathFaqAccordion initialFaqs={faqs} />
        </div>
      </section>

      {/* --- CTA FOOTER OUTRO --- */}
      <section className="py-16 gradient-maple text-white text-center space-y-6">
        <div className="max-w-3xl mx-auto px-6 space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">
            Need Same-Day Commissioning?
          </h2>
          <p className="text-white/80 text-sm">
            Save time and hassle. Our quick 5-10 minute sessions ensure you get
            back to your day immediately. Open evenings and weekends.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
          <a
            href="tel:+12898854848"
            className="w-full sm:w-auto bg-white text-[#8b2626] font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors shadow-md text-center"
          >
            Call: (289) 885-4848
          </a>
          <a
            href="https://calendly.com/oaths-edmonton/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-black hover:bg-black/80 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md text-center border border-white/10"
          >
            Book Appointment
          </a>
        </div>
      </section>
    </div>
  );
}
