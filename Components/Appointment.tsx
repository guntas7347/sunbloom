"use client";

import React, { useState } from "react";
import {
  Phone,
  User,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const SERVICES = [
  "Visitor Visa",
  "Super Visa",
  "Study Permit",
  "Work Permit",
  "Permanent Residency",
  "Express Entry",
  "PNP",
  "Spousal Sponsorship",
  "PGWP / SOWP",
  "Business Visa",
  "Citizenship",
  "Refugee Services",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

function Field({
  label,
  icon: Icon,
  children,
  delay = "0ms",
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
  delay?: string;
}) {
  return (
    <div
      className="group/field flex flex-col gap-1.5"
      style={{ animation: `fadeSlideUp 0.5s ${delay} both` }}
    >
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <Icon size={12} className="text-primary" />
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200";

export default function Appointment() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400)); // simulate network
    console.log("📋 Callback Request:", form);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes popIn {
          0%   { opacity:0; transform:scale(.85); }
          70%  { transform:scale(1.04); }
          100% { opacity:1; transform:scale(1); }
        }
      `}</style>

      <section
        id="appointment"
        className="py-28 bg-gradient-to-b from-white to-background-alt/40 dark:from-background-dark dark:to-slate-900"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── header ── */}
          <div
            className="text-center mb-14"
            style={{ animation: "fadeSlideUp 0.5s both" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full mb-5">
              <Phone size={12} />
              Free Consultation • No Commitment
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight">
              Request a{" "}
              <span className="relative inline-block">
                <span className="text-primary">Callback</span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/25 rounded-full" />
              </span>
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Tell us about your case and we'll reach out at your preferred time
              — no obligation.
            </p>
          </div>

          {/* ── card ── */}
          <div
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl shadow-slate-200/60 dark:shadow-black/40 border border-slate-100 dark:border-slate-700 overflow-hidden"
            style={{ animation: "fadeSlideUp 0.55s 0.1s both" }}
          >
            {/* top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-primary/60 to-primary/20" />

            {submitted ? (
              /* ── success state ── */
              <div
                className="p-16 flex flex-col items-center text-center gap-4"
                style={{ animation: "popIn 0.5s both" }}
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-full">
                  <CheckCircle2 size={48} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  We'll call you back!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  Your request has been received. Our team will reach out at{" "}
                  <strong className="text-slate-700 dark:text-slate-300">
                    {form.phone || "your number"}
                  </strong>{" "}
                  shortly.
                </p>
                <button
                  onClick={() => {
                    setForm(EMPTY);
                    setSubmitted(false);
                  }}
                  className="mt-4 text-sm text-primary font-bold hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <Field label="Full Name" icon={User} delay="0ms">
                  <input
                    required
                    className={inputCls}
                    placeholder="Rajveer Kaur Gill"
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                  />
                </Field>

                <Field label="Email Address" icon={Mail} delay="60ms">
                  <input
                    required
                    className={inputCls}
                    placeholder="you@example.com"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                  />
                </Field>

                <Field label="Phone Number" icon={Phone} delay="120ms">
                  <input
                    required
                    className={inputCls}
                    placeholder="+1 (289) 885-4848"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </Field>

                <Field
                  label="Service Required"
                  icon={ChevronDown}
                  delay="180ms"
                >
                  <select
                    required
                    className={inputCls}
                    value={form.service}
                    onChange={set("service")}
                  >
                    <option value="" disabled>
                      Select a service…
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Preferred Date" icon={Calendar} delay="240ms">
                  <input
                    className={inputCls}
                    type="date"
                    value={form.date}
                    onChange={set("date")}
                  />
                </Field>

                <Field label="Preferred Time" icon={Clock} delay="300ms">
                  <input
                    className={inputCls}
                    type="time"
                    value={form.time}
                    onChange={set("time")}
                  />
                </Field>

                <Field label="Your Message" icon={MessageSquare} delay="360ms">
                  <div className="md:col-span-2">
                    <textarea
                      className={`${inputCls} resize-none`}
                      placeholder="Briefly describe your situation or ask a question…"
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                    />
                  </div>
                </Field>

                {/* submit — spans full width */}
                <div
                  className="md:col-span-2"
                  style={{ animation: "fadeSlideUp 0.5s 420ms both" }}
                >
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending request…
                      </>
                    ) : (
                      <>
                        <Phone size={16} />
                        Request Callback
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-3">
                    We respond within 1 business day · All consultations are
                    confidential
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
