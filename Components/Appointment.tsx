"use client";

import React, { useState } from "react";
import { sendEmail } from "@/lib/nodemailer";

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
  className = "",
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
  delay?: string;
  className?: string;
}) {
  return (
    <div
      className={`group/field flex flex-col gap-1.5 ${className}`}
      style={{ animation: `fadeSlideUp 0.5s ${delay} both` }}
    >
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary">
        <Icon size={12} className="text-maple-red" />
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface-container text-on-surface placeholder-secondary/50 text-sm outline-none ring-0 focus:border-maple-red focus:ring-2 focus:ring-maple-red/20 transition-all duration-200";

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
    const res = await sendEmail({
      subject: "[APPOINTMENT_REQUEST] New Callback Request",

      html: `
<p>This is an <b>automated notification</b> indicating that a user has submitted a <b>callback / appointment request</b> through the website.</p>

<h3>User Details</h3>
<ul>
  <li><b>Name:</b> ${form.name}</li>
  <li>
    <b>Email:</b> ${form.email}
    (<a href="mailto:${encodeURIComponent(form.email)}?subject=${encodeURIComponent("Regarding your appointment request")}&body=${encodeURIComponent("Hello " + form.name + ",\n\nWe received your request and will get back to you shortly.")}">
      Send Email
    </a>)
  </li>
  <li>
    <b>Phone:</b> ${form.phone}
    (<a href="tel:${form.phone}">Call Now</a>)
  </li>
</ul>

<h3>Request Details</h3>
<ul>
  <li><b>Service Requested:</b> ${form.service}</li>
  <li><b>Preferred Date:</b> ${form.date}</li>
  <li><b>Preferred Time:</b> ${form.time}</li>
</ul>

<h3>Additional Message</h3>
<p>${form.message}</p>

<hr/>
<p>Please contact the user promptly to proceed with the request.</p>
`,
    });

    if (res.success) {
      setSubmitting(false);
      setSubmitted(true);
    } else {
      setSubmitting(false);
      alert(
        "Failed to book appointment. Please try again or contact us at directly at consult@sunbloomimmigration.com",
      );
    }
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
        className="py-20 bg-surface-container-low"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* header */}
          <div
            className="text-center mb-14"
            style={{ animation: "fadeSlideUp 0.5s both" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-container/30 text-on-primary-container text-xs font-bold px-4 py-2 rounded-full mb-5 border border-primary-container/50">
              <Phone size={12} className="text-maple-red" />
              Appointment Scheduling
            </div>
            <h2 className="text-3xl font-bold font-headline-md text-on-surface leading-tight">
              Request a <span className="text-maple-red">Callback</span>
            </h2>
            <p className="mt-3 text-secondary max-w-md mx-auto text-sm leading-relaxed">
              Tell us about your case and we'll reach out at your preferred time — no obligation.
            </p>
          </div>

          {/* card */}
          <div
            className="bg-surface rounded-2xl shadow-xl border border-outline-variant/15 overflow-hidden"
            style={{ animation: "fadeSlideUp 0.55s 0.1s both" }}
          >
            {/* top accent bar */}
            <div className="h-1.5 gradient-maple" />

            {submitted ? (
              /* success state */
              <div
                className="p-16 flex flex-col items-center text-center gap-4 animate-[popIn_0.5s_both]"
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-full">
                  <CheckCircle2 size={48} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-on-surface">
                  We'll call you back!
                </h3>
                <p className="text-secondary max-w-sm text-sm">
                  Your request has been received. Our team will reach out at{" "}
                  <strong className="text-on-surface">
                    {form.phone || "your number"}
                  </strong>{" "}
                  shortly.
                </p>
                <button
                  onClick={() => {
                    setForm(EMPTY);
                    setSubmitted(false);
                  }}
                  className="mt-4 text-sm text-maple-red font-bold hover:underline"
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

                <Field label="Your Message" icon={MessageSquare} delay="360ms" className="md:col-span-2">
                  <textarea
                    className={`${inputCls} resize-none`}
                    placeholder="Briefly describe your situation or ask a question…"
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                  />
                </Field>

                {/* submit — spans full width */}
                <div
                  className="md:col-span-2"
                  style={{ animation: "fadeSlideUp 0.5s 420ms both" }}
                >
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-3 gradient-maple text-white py-4 rounded-lg font-bold text-base shadow-md hover:scale-[0.99] active:scale-[0.97] transition-all duration-205 disabled:opacity-70 disabled:cursor-not-allowed"
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
                  <p className="text-center text-xs text-secondary mt-3">
                    We respond within 1 business day · All consultations are confidential
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
