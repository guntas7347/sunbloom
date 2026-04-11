"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import {
  Crosshair,
  Eye,
  CheckCircle,
  ShieldCheck,
  Award,
  Star,
} from "lucide-react";

/* ─── Particle canvas ─────────────────────────────────────────────────────── */
function FireflyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      da: number;
    };

    const N = 60;
    const particles: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random(),
      da: (Math.random() - 0.5) * 0.006,
    }));

    let animId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      /* detect dark mode via <html> class */
      const isDark = document.documentElement.classList.contains("dark");
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.da;
        if (p.alpha <= 0 || p.alpha >= 1) p.da *= -1;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        /* dark: pink-ish dots; light: deep crimson dots */
        const color = isDark
          ? `rgba(248,201,220,${Math.max(0, Math.min(1, p.alpha))})`
          : `rgba(196,31,62,${Math.max(0, Math.min(0.35, p.alpha))})`;
        ctx.fillStyle = color;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const trustBadges = [
  { icon: ShieldCheck, text: "CICC Licensed" },
  // { icon: Award, text: "ICCRC Regulated" },
  // { icon: Star, text: "5-Star on Google" },
];

const cards = [
  {
    Icon: Crosshair,
    title: "Our Mission",
    body: "To provide honest, reliable, and professional immigration guidance to individuals and families seeking opportunities in Canada — with accurate advice, carefully prepared applications, and transparent communication from start to finish.",
  },
  {
    Icon: Eye,
    title: "Our Vision",
    body: "To be a trusted and respected immigration consulting firm known for professionalism, integrity, and dependable service — supporting people worldwide in building a new life in Canada.",
  },
];

const highlights: any = [
  // "No hidden fees",
  // "Free initial assessment",
  // "Trusted by 2,500+ families",
];

const stats = [
  { value: "2,500+", label: "Visas Approved" },
  { value: "98%", label: "Success Rate" },
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Countries Served" },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden
        bg-gradient-to-br from-[#fdf6f9] via-white to-[#fce8ef]
        dark:bg-none"
      style={undefined}
    >
      {/* Dark-mode background (inline so it doesn't fight Tailwind gradients) */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(135deg, #0d0d18 0%, #16091a 40%, #1a0d12 100%)",
        }}
      />

      {/* Subtle grid — lighter in light mode */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <FireflyCanvas />

      {/* ── Main two-column layout ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
          <div className="flex flex-col items-start">
            {/* Welcome badge */}
            <div
              className="inline-flex items-center gap-2
              bg-[#c41f3e]/8 border border-[#c41f3e]/30 text-[#c41f3e]
              dark:bg-white/8 dark:border-[#c41f3e]/40 dark:text-[#f8c9dc]
              text-xs font-semibold px-4 py-2 rounded-full mb-7 tracking-wide backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c41f3e] animate-pulse" />
              Welcome to Sunbloom Immigration
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap gap-2 mb-6">
              {trustBadges.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-1.5
                    bg-slate-100 border border-slate-200 text-slate-600
                    dark:bg-white/6 dark:border-white/15 dark:text-white/70
                    text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  <Icon size={11} className="text-[#c41f3e]" />
                  {text}
                </div>
              ))}
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black leading-[1.08] tracking-tight
              text-slate-900 dark:text-white mb-5"
            >
              Helping Your Future{" "}
              <span className="relative inline-block">
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #c41f3e 0%, #f8c9dc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Bloom
                </span>
                <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-[#c41f3e] to-[#f8c9dc] rounded-full opacity-70" />
              </span>{" "}
              in Canada
            </h1>

            {/* Typing animation */}
            <div
              className="text-base sm:text-lg font-medium min-h-[1.8rem] mb-4 flex items-center gap-1
              text-slate-600 dark:text-white/70"
            >
              <TypeAnimation
                sequence={[
                  "From Application to Approval",
                  2200,
                  "Guiding Your Canadian Journey",
                  2200,
                  "Expert Immigration, Done Right",
                  2200,
                  "Clarity. Strategy. Results.",
                  2200,
                ]}
                wrapper="span"
                speed={55}
                deletionSpeed={65}
                repeat={Infinity}
              />
              <span className="inline-block w-0.5 h-[1em] bg-[#c41f3e] ml-0.5 animate-pulse rounded" />
            </div>

            {/* Description */}
            <p
              className="text-sm sm:text-base leading-relaxed max-w-lg mb-8
              text-slate-500 dark:text-white/55"
            >
              At Sunbloom Immigration, we help individuals and families navigate
              the immigration process with confidence. Whether you are planning
              to study, work, or settle abroad — our experienced consultants
              provide clear guidance and personalized solutions to help you
              achieve your goals.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#appointment"
                className="group relative overflow-hidden bg-[#c41f3e] text-white
                  px-7 py-3.5 rounded-xl font-bold text-sm
                  shadow-lg shadow-[#c41f3e]/25 dark:shadow-[#c41f3e]/30
                  hover:shadow-[#c41f3e]/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="relative z-10">Book Consultation</span>
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a
                href="#services"
                className="border font-bold text-sm px-7 py-3.5 rounded-xl
                  bg-white border-slate-200 text-slate-700
                  dark:bg-white/8 dark:border-white/25 dark:text-white
                  hover:bg-slate-50 dark:hover:bg-white/15
                  hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm"
              >
                Explore Services
              </a>
            </div>

            {/* Social proof */}
            <div
              className="flex flex-wrap items-center gap-4 text-xs
              text-slate-400 dark:text-white/45"
            >
              {highlights.map((h: any) => (
                <div key={h} className="flex items-center gap-1.5">
                  <CheckCircle
                    size={12}
                    className="text-emerald-500 dark:text-emerald-400 flex-shrink-0"
                  />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Image ─────────────────────────────────────────── */}
          <div className="relative flex justify-center lg:justify-end">
            {/* glow blob */}
            <div
              className="absolute -inset-6 rounded-3xl blur-3xl
                opacity-10 dark:opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 40%, #c41f3e 0%, transparent 70%)",
              }}
            />

            {/* Floating badge — success rate */}
            {/* <div
              className="absolute top-5 -left-4 z-20
              bg-white/90 border border-slate-200 shadow-lg
              dark:bg-white/10 dark:border-white/20 dark:shadow-xl
              backdrop-blur-md rounded-2xl px-4 py-3"
            >
              <div className="text-2xl font-black text-[#c41f3e] dark:text-[#f8c9dc]">
                98%
              </div>
              <div
                className="text-[10px] font-semibold uppercase tracking-wider
                text-slate-500 dark:text-white/60"
              >
                Success Rate
              </div>
            </div> */}

            {/* Floating badge — visas */}
            {/* <div
              className="absolute bottom-10 -right-2 z-20
              bg-white/90 border border-slate-200 shadow-lg
              dark:bg-white/10 dark:border-white/20 dark:shadow-xl
              backdrop-blur-md rounded-2xl px-4 py-3"
            >
              <div className="text-2xl font-black text-[#c41f3e] dark:text-[#f8c9dc]">
                2,500+
              </div>
              <div
                className="text-[10px] font-semibold uppercase tracking-wider
                text-slate-500 dark:text-white/60"
              >
                Visas Approved
              </div>
            </div> */}

            {/* Image frame */}
            <div
              className="relative w-full max-w-md lg:max-w-full rounded-3xl overflow-hidden
              border border-slate-200 dark:border-white/10
              shadow-xl dark:shadow-2xl"
            >
              {/* gradient fade at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-28 z-10"
                style={{
                  background:
                    "linear-gradient(to top, var(--fade-color, #fce8ef) 0%, transparent 100%)",
                }}
              />
              {/* light-mode fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-28 z-10 dark:hidden"
                style={{
                  background:
                    "linear-gradient(to top, #fdf6f9 0%, transparent 100%)",
                }}
              />
              {/* dark-mode fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-28 z-10 hidden dark:block"
                style={{
                  background:
                    "linear-gradient(to top, #1a0d12 0%, transparent 100%)",
                }}
              />

              <Image
                src="/rajveer.jpeg"
                alt="Rajveer – Founder, Sunbloom Immigration"
                width={620}
                height={520}
                className="w-full object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>

        {/* ── Stats strip ─────────────────────────────────────────────────────── */}
        {/* <div
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden
          bg-slate-200 dark:bg-white/10"
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="px-6 py-5 text-center transition-colors
                bg-white hover:bg-slate-50
                dark:bg-white/5 dark:hover:bg-white/10"
            >
              <div
                className="text-2xl sm:text-3xl font-black
                text-slate-900 dark:text-white"
              >
                {value}
              </div>
              <div
                className="text-[11px] font-medium mt-1 uppercase tracking-widest
                text-slate-400 dark:text-white/45"
              >
                {label}
              </div>
            </div>
          ))}
        </div> */}

        {/* ── Mission / Vision cards ─────────────────────────────────────────── */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pb-16">
          {cards.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="group relative rounded-2xl p-6 transition-all duration-300
                bg-white border border-slate-200 hover:border-[#c41f3e]/40 hover:shadow-md
                dark:bg-white/[0.06] dark:border-white/[0.12] dark:hover:bg-white/[0.10] dark:hover:border-[#c41f3e]/40
                backdrop-blur-md"
            >
              {/* Corner glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#c41f3e]/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl
                  bg-[#c41f3e]/10 border border-[#c41f3e]/25
                  dark:bg-[#c41f3e]/15 dark:border-[#c41f3e]/30
                  flex items-center justify-center"
                >
                  <Icon
                    size={18}
                    className="text-[#c41f3e] dark:text-[#f8c9dc]"
                  />
                </div>
                <div>
                  <h5
                    className="font-bold text-base mb-2
                    text-slate-900 dark:text-white"
                  >
                    {title}
                  </h5>
                  <p
                    className="text-sm leading-relaxed
                    text-slate-500 dark:text-white/50"
                  >
                    {body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
