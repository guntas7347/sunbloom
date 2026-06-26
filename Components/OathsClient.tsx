"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  Info,
  Phone,
  MessageSquare,
  Calendar,
  ChevronDown,
  FileText,
  Check,
  AlertTriangle,
  Award,
  Search,
} from "lucide-react";
import { OathDoc, OathFaq } from "@/lib/firebase/oath";
import Link from "next/link";

// Categorized document data
const DOCUMENT_CATEGORIES = [
  "All",
  "Affidavits & Declarations",
  "Government & Immigration",
  "Real Estate & Legal",
  "Family & Estates",
];

interface OathsClientProps {
  initialDocs: OathDoc[];
  initialFaqs: OathFaq[];
}

export default function OathsClient({
  initialDocs,
  initialFaqs,
}: OathsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter documents based on query and category
  const filteredDocs = initialDocs.filter((doc) => {
    const matchesCat =
      selectedCategory === "All" || doc.cat === selectedCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen text-on-surface">
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

            {/* Document Interactive Finder */}
            <div className="bg-surface-container-high rounded-2xl border border-outline-variant/20 p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="text-maple-red" size={22} />
                  Authorized Documents List
                </h3>
                <p className="text-sm text-secondary">
                  Search or select a category below to confirm if we can
                  commission your documents.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search document name (e.g. invitation, common-law, dower...)"
                  className="w-full pl-12 pr-4 py-3 bg-surface rounded-xl border border-outline-variant/30 focus:ring-2 focus:ring-maple-red/30 focus:border-maple-red outline-none transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category selector */}
              <div className="flex gap-2 flex-wrap">
                {DOCUMENT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "gradient-maple text-white shadow-sm"
                        : "bg-surface border border-outline-variant/30 text-secondary hover:bg-surface-container-highest"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Filtered Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc, idx) => (
                    <div
                      key={doc.id || idx}
                      className="bg-surface p-5 rounded-xl border border-outline-variant/15 flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-maple-red bg-primary-container/20 px-2 py-0.5 rounded-full inline-block">
                          {doc.cat}
                        </span>
                        <h4 className="font-bold text-sm leading-snug">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-secondary leading-relaxed">
                          {doc.desc}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-[10px] text-green-600 font-semibold uppercase tracking-wider">
                        <CheckCircle2 size={12} /> Commissionable
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-10 text-secondary">
                    No matching documents found. Please call/text to verify.
                  </div>
                )}
              </div>
            </div>

            {/* Preparation section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                What to Bring to Your Appointment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/10 space-y-4">
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

                <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/10 space-y-4">
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

                <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/10 space-y-4">
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

                <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/10 space-y-4">
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
              className="bg-surface-container-high rounded-2xl border border-outline-variant/20 p-6 space-y-4 shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-container/20 rounded-lg text-maple-red">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Schedule Visit</h3>
                  <p className="text-[11px] text-secondary">
                    Appointments in 5-10 minutes
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface/50 border border-outline-variant/15 text-sm space-y-3">
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-secondary text-xs">
                    Standard Oath Fee:
                  </span>
                  <span className="font-bold">$20.00 / stamp</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-secondary text-xs">
                    Mobile Service:
                  </span>
                  <span className="font-bold">Contact for quote</span>
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
                  className="w-full flex items-center justify-center gap-2 bg-surface hover:bg-surface-container-highest border border-outline-variant/30 py-3 rounded-xl text-sm font-bold transition-all"
                >
                  <MessageSquare size={16} className="text-maple-red" />
                  Text to Schedule
                </a>
              </div>
            </div>

            {/* Fees & Hours Card */}
            <div className="bg-surface-container-high rounded-2xl border border-outline-variant/20 p-6 space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2 border-b border-outline-variant/15 pb-3">
                <Clock className="text-maple-red" size={20} /> Hours & Location
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="text-secondary shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-semibold block text-xs">
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
                    <span className="font-semibold block text-xs">
                      Office Address
                    </span>
                    <a
                      href="https://www.google.com/maps/place/?q=place_id:ChIJN18vP5E7oFMRpn6ERhTRhmw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-maple-red hover:underline mt-0.5 block"
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
            <div className="bg-primary-container/20 border border-outline-variant/10 rounded-2xl p-5 text-center space-y-2">
              <span className="text-xs font-bold text-maple-red tracking-wider uppercase">
                Monthly Promotion
              </span>
              <h4 className="font-bold text-sm">Costco Gift Card Raffle</h4>
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
      <section className="py-20 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-secondary max-w-2xl mx-auto text-sm">
              Have questions about Commissioner for Oaths services in Edmonton?
              Find answers to commonly asked questions below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {initialFaqs.map((faq, idx) => (
              <div
                key={faq.id || idx}
                className="bg-surface rounded-xl border border-outline-variant/20 overflow-hidden transition-all shadow-sm"
              >
                <button
                  className="w-full flex items-center justify-between p-5 font-semibold text-sm sm:text-base text-left hover:text-maple-red cursor-pointer transition-colors"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-maple-red" : "text-secondary"}`}
                  />
                </button>

                <div
                  style={{
                    maxHeight: openFaq === idx ? "300px" : "0px",
                    opacity: openFaq === idx ? 1 : 0,
                    transition: "max-height 0.3s ease, opacity 0.25s ease",
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-xs sm:text-sm text-secondary leading-relaxed border-t border-dashed border-outline-variant/10 pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
