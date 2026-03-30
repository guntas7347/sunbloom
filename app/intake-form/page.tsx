"use client";

import React, { useState } from "react";
import {
  User,
  Globe,
  Phone,
  Mail,
  Briefcase,
  BookOpen,
  FileText,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Info,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type YesNo = "yes" | "no" | "";

interface LanguageScore {
  test: string;
  listening: string;
  reading: string;
  writing: string;
  speaking: string;
}

interface FormData {
  // Personal
  fullLegalName: string;
  dateOfBirth: string;
  countryOfCitizenship: string;
  countryOfResidence: string;
  currentImmigrationStatus: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  maritalStatus: string;
  dependentChildren: string;

  // Services
  servicesRequested: string[];

  // Education
  highestEducation: string;
  countryOfEducation: string;
  ecaObtained: YesNo;
  ecaAuthority: string;
  languageTests: LanguageScore[];

  // Employment
  currentOccupation: string;
  nocCode: string;
  yearsSkilled: string;
  countriesOfExperience: string;
  canadianWorkExp: string;
  validJobOffer: YesNo;
  lmiaSupported: YesNo;

  // Immigration History
  priorApplications: YesNo;
  priorRefusals: YesNo;
  removalOrder: YesNo;
  lostPrStatus: YesNo;
  inadmissibility: YesNo;
  refugeeClaim: YesNo;
  immigrationHistoryDetails: string;

  // Additional
  additionalInfo: string;

  // Declaration
  declarationName: string;
  declarationSignature: string;
  declarationDate: string;
  consentChecked: boolean;
}

/* ─────────────────────────────────────────────
   Static Data
───────────────────────────────────────────── */
const SERVICE_GROUPS = [
  {
    label: "Temporary Residence",
    options: [
      "Visitor Visa (TRV)",
      "Study Permit",
      "Work Permit – LMIA-Based",
      "Work Permit – LMIA-Exempt",
    ],
  },
  {
    label: "Permanent Residence",
    options: [
      "Express Entry – Federal Skilled Worker (FSW)",
      "Express Entry – Canadian Experience Class (CEC)",
      "Express Entry – Federal Skilled Trades (FST)",
      "Provincial Nominee Program (PNP)",
      "Family Sponsorship (Spouse / Common-Law / Dependent Child)",
      "Family Sponsorship (Parents & Grandparents)",
      "Humanitarian & Compassionate (H&C) Grounds",
      "PR Card Renewal / Status Issues",
    ],
  },
  {
    label: "Citizenship",
    options: [
      "Citizenship Application",
      "Citizenship Refusal / Reconsideration",
      "Citizenship Revocation",
    ],
  },
  {
    label: "Appeals & Enforcement",
    options: [
      "Sponsorship Appeal (IAD)",
      "Residency Obligation Appeal (IAD)",
      "Removal Order Appeal (IAD)",
      "Inadmissibility Hearing (ID)",
      "Detention Review (ID)",
    ],
  },
  {
    label: "Refugee & Protection",
    options: [
      "Refugee Claim (RPD)",
      "Refugee Appeal Division (RAD)",
      "Pre-Removal Risk Assessment (PRRA)",
      "Refugee / Protection Consultation",
    ],
  },
];

const LANGUAGE_TEST_OPTIONS = ["IELTS", "CELPIP", "TEF Canada", "TCF Canada"];

const MARITAL_STATUS_OPTIONS = [
  "Single",
  "Married",
  "Common-Law Partner",
  "Separated",
  "Divorced",
  "Widowed",
];

const EDUCATION_LEVELS = [
  "Less than Secondary/High School",
  "Secondary / High School Diploma",
  "One-year Post-Secondary Certificate or Diploma",
  "Two-year Post-Secondary Certificate or Diploma",
  "Three-year or Longer Post-Secondary Certificate or Diploma",
  "Bachelor's Degree",
  "Two or More Certificates/Diplomas/Degrees",
  "Master's Degree",
  "Doctoral Degree (PhD or MD)",
  "Trade Certificate / Apprenticeship",
];

const CANADIAN_WORK_EXP_OPTIONS = [
  "None",
  "Less than 1 year",
  "1 year or more",
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="p-2 rounded-lg bg-[#c41f3e]/10 shrink-0">
        <Icon size={18} className="text-[#c41f3e]" />
      </div>
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function FieldLabel({
  label,
  required,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
    >
      {label}
      {required && <span className="text-[#c41f3e] ml-0.5">*</span>}
    </label>
  );
}

const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c41f3e]/40 focus:border-[#c41f3e] transition";

const selectCls =
  "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#c41f3e]/40 focus:border-[#c41f3e] transition appearance-none";

function YesNoField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: YesNo;
  onChange: (v: YesNo) => void;
}) {
  return (
    <div>
      <FieldLabel label={label} />
      <div className="flex gap-3">
        {(["yes", "no"] as YesNo[]).map((opt) => (
          <label
            key={opt}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-semibold cursor-pointer transition
              ${
                value === opt
                  ? "border-[#c41f3e] bg-[#c41f3e]/8 text-[#c41f3e]"
                  : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400"
              }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function IntakeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    fullLegalName: "",
    dateOfBirth: "",
    countryOfCitizenship: "",
    countryOfResidence: "",
    currentImmigrationStatus: "",
    email: "",
    phoneCountryCode: "+1",
    phoneNumber: "",
    maritalStatus: "",
    dependentChildren: "0",
    servicesRequested: [],
    highestEducation: "",
    countryOfEducation: "",
    ecaObtained: "",
    ecaAuthority: "",
    languageTests: [],
    currentOccupation: "",
    nocCode: "",
    yearsSkilled: "",
    countriesOfExperience: "",
    canadianWorkExp: "",
    validJobOffer: "",
    lmiaSupported: "",
    priorApplications: "",
    priorRefusals: "",
    removalOrder: "",
    lostPrStatus: "",
    inadmissibility: "",
    refugeeClaim: "",
    immigrationHistoryDetails: "",
    additionalInfo: "",
    declarationName: "",
    declarationSignature: "",
    declarationDate: "",
    consentChecked: false,
  });

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const toggleService = (svc: string) =>
    set(
      "servicesRequested",
      form.servicesRequested.includes(svc)
        ? form.servicesRequested.filter((s) => s !== svc)
        : [...form.servicesRequested, svc],
    );

  const addLanguageTest = () =>
    set("languageTests", [
      ...form.languageTests,
      { test: "", listening: "", reading: "", writing: "", speaking: "" },
    ]);

  const removeLanguageTest = (i: number) =>
    set(
      "languageTests",
      form.languageTests.filter((_, idx) => idx !== i),
    );

  const updateLanguageTest = (
    i: number,
    field: keyof LanguageScore,
    val: string,
  ) =>
    set(
      "languageTests",
      form.languageTests.map((t, idx) =>
        idx === i ? { ...t, [field]: val } : t,
      ),
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#211117] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">
            Submission Received
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Thank you, <strong>{form.fullLegalName}</strong>. Our team will
            review your intake form and contact you within 1–2 business days.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                fullLegalName: "",
                dateOfBirth: "",
                countryOfCitizenship: "",
                countryOfResidence: "",
                currentImmigrationStatus: "",
                email: "",
                phoneCountryCode: "+1",
                phoneNumber: "",
                maritalStatus: "",
                dependentChildren: "0",
                servicesRequested: [],
                highestEducation: "",
                countryOfEducation: "",
                ecaObtained: "",
                ecaAuthority: "",
                languageTests: [],
                currentOccupation: "",
                nocCode: "",
                yearsSkilled: "",
                countriesOfExperience: "",
                canadianWorkExp: "",
                validJobOffer: "",
                lmiaSupported: "",
                priorApplications: "",
                priorRefusals: "",
                removalOrder: "",
                lostPrStatus: "",
                inadmissibility: "",
                refugeeClaim: "",
                immigrationHistoryDetails: "",
                additionalInfo: "",
                declarationName: "",
                declarationSignature: "",
                declarationDate: "",
                consentChecked: false,
              });
            }}
            className="bg-[#c41f3e] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#a01832] transition"
          >
            Submit Another Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#211117] font-sans">
      {/* Header Banner */}
      <div className="bg-[#c41f3e] text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <img
              src="/sunbloom-logo.png"
              alt="Sunbloom"
              className="h-7 w-7 object-contain brightness-0 invert"
            />
            <span className="text-sm font-semibold tracking-wide opacity-80">
              Sunbloom Immigration Ltd.
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            Client Intake Form
          </h1>
          <p className="text-white/70 text-sm mt-1">
            Preliminary Assessment — Please complete all applicable sections
            accurately and in full.
          </p>
        </div>
      </div>

      {/* Notice */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <div className="flex gap-2.5 items-start bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4">
          <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            All information provided is strictly confidential and protected
            under Canada's privacy legislation (PIPEDA). This form is for
            preliminary assessment purposes only and does not constitute legal
            advice or establish a formal consultant–client relationship.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto px-4 py-6 space-y-6"
      >
        {/* ── 1. Personal Information ── */}
        <Card>
          <SectionHeader
            icon={User}
            title="1. Personal Information"
            subtitle="Legal name as it appears on your passport or travel document"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FieldLabel
                label="Full Legal Name"
                required
                htmlFor="fullLegalName"
              />
              <input
                id="fullLegalName"
                type="text"
                placeholder="As shown on passport"
                className={inputCls}
                value={form.fullLegalName}
                onChange={(e) => set("fullLegalName", e.target.value)}
                required
              />
            </div>

            <div>
              <FieldLabel label="Date of Birth" required htmlFor="dob" />
              <input
                id="dob"
                type="date"
                className={inputCls}
                value={form.dateOfBirth}
                onChange={(e) => set("dateOfBirth", e.target.value)}
                required
              />
            </div>

            <div>
              <FieldLabel
                label="Country of Citizenship"
                required
                htmlFor="citizenship"
              />
              <input
                id="citizenship"
                type="text"
                placeholder="e.g. India"
                className={inputCls}
                value={form.countryOfCitizenship}
                onChange={(e) => set("countryOfCitizenship", e.target.value)}
                required
              />
            </div>

            <div>
              <FieldLabel
                label="Country of Current Residence"
                required
                htmlFor="residence"
              />
              <input
                id="residence"
                type="text"
                placeholder="e.g. Canada"
                className={inputCls}
                value={form.countryOfResidence}
                onChange={(e) => set("countryOfResidence", e.target.value)}
                required
              />
            </div>

            <div>
              <FieldLabel
                label="Current Immigration Status (if in Canada)"
                htmlFor="immigStatus"
              />
              <input
                id="immigStatus"
                type="text"
                placeholder="e.g. Visitor, Student, Worker, PR, Citizen, N/A"
                className={inputCls}
                value={form.currentImmigrationStatus}
                onChange={(e) =>
                  set("currentImmigrationStatus", e.target.value)
                }
              />
            </div>

            <div>
              <FieldLabel label="Email Address" required htmlFor="email" />
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className={inputCls}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                required
              />
            </div>

            <div>
              <FieldLabel label="Phone Number" required htmlFor="phone" />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="+1"
                  className={`${inputCls} w-20 shrink-0`}
                  value={form.phoneCountryCode}
                  onChange={(e) => set("phoneCountryCode", e.target.value)}
                />
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  className={inputCls}
                  value={form.phoneNumber}
                  onChange={(e) => set("phoneNumber", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <FieldLabel label="Marital Status" required htmlFor="marital" />
              <div className="relative">
                <select
                  id="marital"
                  className={selectCls}
                  value={form.maritalStatus}
                  onChange={(e) => set("maritalStatus", e.target.value)}
                  required
                >
                  <option value="">Select…</option>
                  {MARITAL_STATUS_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <FieldLabel
                label="Number of Dependent Children"
                htmlFor="children"
              />
              <input
                id="children"
                type="number"
                min={0}
                max={20}
                className={inputCls}
                value={form.dependentChildren}
                onChange={(e) => set("dependentChildren", e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* ── 2. Services Requested ── */}
        <Card>
          <SectionHeader
            icon={FileText}
            title="2. Services Requested"
            subtitle="Select all that apply"
          />
          <div className="space-y-5">
            {SERVICE_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-bold text-[#c41f3e] uppercase tracking-wider mb-2">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((opt) => {
                    const selected = form.servicesRequested.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleService(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition
                          ${
                            selected
                              ? "bg-[#c41f3e] border-[#c41f3e] text-white"
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-[#c41f3e] hover:text-[#c41f3e]"
                          }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {form.servicesRequested.length > 0 && (
            <div className="mt-4 p-3 bg-[#c41f3e]/5 rounded-lg border border-[#c41f3e]/20">
              <p className="text-xs font-semibold text-[#c41f3e] mb-1">
                Selected ({form.servicesRequested.length}):
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {form.servicesRequested.join(" · ")}
              </p>
            </div>
          )}
        </Card>

        {/* ── 3. Education & Language ── */}
        <Card>
          <SectionHeader
            icon={BookOpen}
            title="3. Education & Language Proficiency"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel label="Highest Level of Education" htmlFor="edu" />
              <div className="relative">
                <select
                  id="edu"
                  className={selectCls}
                  value={form.highestEducation}
                  onChange={(e) => set("highestEducation", e.target.value)}
                >
                  <option value="">Select…</option>
                  {EDUCATION_LEVELS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <FieldLabel
                label="Country Where Education Was Obtained"
                htmlFor="eduCountry"
              />
              <input
                id="eduCountry"
                type="text"
                placeholder="e.g. India"
                className={inputCls}
                value={form.countryOfEducation}
                onChange={(e) => set("countryOfEducation", e.target.value)}
              />
            </div>

            <div>
              <YesNoField
                label="Has an Educational Credential Assessment (ECA) been obtained?"
                name="eca"
                value={form.ecaObtained}
                onChange={(v) => set("ecaObtained", v)}
              />
            </div>

            {form.ecaObtained === "yes" && (
              <div>
                <FieldLabel label="ECA Issuing Authority" htmlFor="ecaAuth" />
                <input
                  id="ecaAuth"
                  type="text"
                  placeholder="e.g. WES, ICAS"
                  className={inputCls}
                  value={form.ecaAuthority}
                  onChange={(e) => set("ecaAuthority", e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Language Tests */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Language Test Results
              </p>
              <button
                type="button"
                onClick={addLanguageTest}
                className="text-xs font-bold text-[#c41f3e] hover:underline"
              >
                + Add Test
              </button>
            </div>
            {form.languageTests.length === 0 && (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                No language tests added. Click &quot;+ Add Test&quot; if
                applicable.
              </p>
            )}
            <div className="space-y-4">
              {form.languageTests.map((lt, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="relative w-40">
                      <select
                        className={selectCls}
                        value={lt.test}
                        onChange={(e) =>
                          updateLanguageTest(i, "test", e.target.value)
                        }
                      >
                        <option value="">Select test…</option>
                        {LANGUAGE_TEST_OPTIONS.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLanguageTest(i)}
                      className="text-xs text-slate-400 hover:text-red-500 transition"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(
                      ["listening", "reading", "writing", "speaking"] as const
                    ).map((skill) => (
                      <div key={skill}>
                        <FieldLabel
                          label={skill.charAt(0).toUpperCase() + skill.slice(1)}
                        />
                        <input
                          type="text"
                          placeholder="Score"
                          className={inputCls}
                          value={lt[skill]}
                          onChange={(e) =>
                            updateLanguageTest(i, skill, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── 4. Employment ── */}
        <Card>
          <SectionHeader
            icon={Briefcase}
            title="4. Employment History"
            subtitle="Most recent occupation details"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel
                label="Current Occupation / Job Title"
                htmlFor="occ"
              />
              <input
                id="occ"
                type="text"
                placeholder="e.g. Registered Nurse"
                className={inputCls}
                value={form.currentOccupation}
                onChange={(e) => set("currentOccupation", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel label="NOC Code (if known)" htmlFor="noc" />
              <input
                id="noc"
                type="text"
                placeholder="e.g. 31301"
                className={inputCls}
                value={form.nocCode}
                onChange={(e) => set("nocCode", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel
                label="Total Years of Skilled Work Experience"
                htmlFor="years"
              />
              <input
                id="years"
                type="text"
                placeholder="e.g. 4"
                className={inputCls}
                value={form.yearsSkilled}
                onChange={(e) => set("yearsSkilled", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel
                label="Countries Where Experience Was Gained"
                htmlFor="expCountries"
              />
              <input
                id="expCountries"
                type="text"
                placeholder="e.g. India, UAE"
                className={inputCls}
                value={form.countriesOfExperience}
                onChange={(e) => set("countriesOfExperience", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel label="Canadian Work Experience" htmlFor="canExp" />
              <div className="relative">
                <select
                  id="canExp"
                  className={selectCls}
                  value={form.canadianWorkExp}
                  onChange={(e) => set("canadianWorkExp", e.target.value)}
                >
                  <option value="">Select…</option>
                  {CANADIAN_WORK_EXP_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <YesNoField
                label="Do you have a valid Canadian job offer?"
                name="jobOffer"
                value={form.validJobOffer}
                onChange={(v) => set("validJobOffer", v)}
              />
            </div>

            {form.validJobOffer === "yes" && (
              <div>
                <YesNoField
                  label="Is the job offer LMIA-supported?"
                  name="lmia"
                  value={form.lmiaSupported}
                  onChange={(v) => set("lmiaSupported", v)}
                />
              </div>
            )}
          </div>
        </Card>

        {/* ── 5. Immigration History ── */}
        <Card>
          <SectionHeader
            icon={Globe}
            title="5. Immigration History"
            subtitle="Answer honestly — past issues do not automatically disqualify you"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <YesNoField
              label="Have you previously applied for Canadian immigration?"
              name="priorApps"
              value={form.priorApplications}
              onChange={(v) => set("priorApplications", v)}
            />
            <YesNoField
              label="Have any of your applications been refused?"
              name="priorRefusals"
              value={form.priorRefusals}
              onChange={(v) => set("priorRefusals", v)}
            />
            <YesNoField
              label="Have you ever had a removal order issued against you?"
              name="removal"
              value={form.removalOrder}
              onChange={(v) => set("removalOrder", v)}
            />
            <YesNoField
              label="Have you ever lost Permanent Resident (PR) status?"
              name="lostPr"
              value={form.lostPrStatus}
              onChange={(v) => set("lostPrStatus", v)}
            />
            <YesNoField
              label="Have you ever been found inadmissible to Canada?"
              name="inadmiss"
              value={form.inadmissibility}
              onChange={(v) => set("inadmissibility", v)}
            />
            <YesNoField
              label="Have you ever made a refugee or protection claim in any country?"
              name="refugee"
              value={form.refugeeClaim}
              onChange={(v) => set("refugeeClaim", v)}
            />
          </div>
          {(form.priorApplications === "yes" ||
            form.priorRefusals === "yes" ||
            form.removalOrder === "yes" ||
            form.lostPrStatus === "yes" ||
            form.inadmissibility === "yes" ||
            form.refugeeClaim === "yes") && (
            <div className="mt-4">
              <FieldLabel
                label="Please provide details for any 'Yes' answers above"
                htmlFor="historyDetails"
              />
              <textarea
                id="historyDetails"
                rows={4}
                placeholder="Include application types, dates, outcomes, and any relevant context…"
                className={`${inputCls} resize-none`}
                value={form.immigrationHistoryDetails}
                onChange={(e) =>
                  set("immigrationHistoryDetails", e.target.value)
                }
              />
            </div>
          )}
        </Card>

        {/* ── 6. Additional Information ── */}
        <Card>
          <SectionHeader
            icon={Info}
            title="6. Additional Information"
            subtitle="Any other context that may be relevant to your case"
          />
          <textarea
            rows={5}
            placeholder="Share any other details, upcoming deadlines, family circumstances, or specific concerns you would like our consultant to be aware of…"
            className={`${inputCls} resize-none`}
            value={form.additionalInfo}
            onChange={(e) => set("additionalInfo", e.target.value)}
          />
        </Card>

        {/* ── 7. Declaration & Consent ── */}
        <Card>
          <SectionHeader icon={AlertCircle} title="7. Declaration & Consent" />

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 mb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
            <p>
              <strong className="text-slate-800 dark:text-slate-200">
                Declaration of Accuracy:
              </strong>{" "}
              I declare that the information provided in this form is true,
              correct, and complete to the best of my knowledge and belief. I
              understand that providing false or misleading information may
              result in the refusal of my application and may have serious legal
              consequences.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-slate-200">
                Consent to Collect and Use Personal Information:
              </strong>{" "}
              I consent to Sunbloom Immigration Ltd. collecting, using, and
              retaining my personal information for the purpose of assessing my
              immigration matter and providing professional immigration
              consulting services. My personal data will be handled in
              accordance with the{" "}
              <em>
                Personal Information Protection and Electronic Documents Act
              </em>{" "}
              (PIPEDA) and will not be disclosed to third parties without my
              express written consent, except as required by law or regulatory
              bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FieldLabel
                label="Full Name (Print)"
                required
                htmlFor="declName"
              />
              <input
                id="declName"
                type="text"
                placeholder="Your full legal name"
                className={inputCls}
                value={form.declarationName}
                onChange={(e) => set("declarationName", e.target.value)}
                required
              />
            </div>

            <div>
              <FieldLabel
                label="Signature (Type your full name)"
                required
                htmlFor="sig"
              />
              <input
                id="sig"
                type="text"
                placeholder="Type to sign"
                className={`${inputCls} font-serif italic text-base`}
                value={form.declarationSignature}
                onChange={(e) => set("declarationSignature", e.target.value)}
                required
              />
            </div>

            <div>
              <FieldLabel label="Date" required htmlFor="declDate" />
              <input
                id="declDate"
                type="date"
                className={inputCls}
                value={form.declarationDate}
                onChange={(e) => set("declarationDate", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Consent checkbox */}
          <label className="mt-5 flex gap-3 cursor-pointer group">
            <div className="mt-0.5 shrink-0">
              <input
                type="checkbox"
                className="sr-only"
                checked={form.consentChecked}
                onChange={(e) => set("consentChecked", e.target.checked)}
                required
              />
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition
                  ${
                    form.consentChecked
                      ? "bg-[#c41f3e] border-[#c41f3e]"
                      : "border-slate-300 dark:border-slate-600 group-hover:border-[#c41f3e]"
                  }`}
              >
                {form.consentChecked && (
                  <svg
                    viewBox="0 0 12 9"
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <polyline points="1 4 4.5 7.5 11 1" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              I have read and understood the Declaration of Accuracy and Consent
              to Collect and Use Personal Information, and I agree to the terms
              set out above.{" "}
              <span className="text-[#c41f3e] font-semibold">*</span>
            </span>
          </label>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-3 pb-8">
          <button
            type="button"
            onClick={() =>
              window.confirm("Reset the form? All data will be lost.") &&
              window.location.reload()
            }
            className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-lg bg-[#c41f3e] text-white text-sm font-bold shadow-md hover:bg-[#a01832] hover:translate-y-[-1px] transition-all disabled:opacity-50"
          >
            Submit Intake Form
          </button>
        </div>
      </form>
    </div>
  );
}
