"use client";

import React from "react";
import { ShieldCheck, Star, Award, Users, CheckCircle } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

const stats = [
  { value: "2,500+", label: "Visas Approved" },
  { value: "98%", label: "Success Rate" },
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Countries Served" },
];

const trustBadges = [
  { icon: ShieldCheck, text: "CICC Licensed Consultants" },
  { icon: Award, text: "ICCRC Regulated" },
  { icon: Star, text: "5-Star Rated on Google" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/7219363/pexels-photo-7219363.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-[#211117]/80" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {trustBadges.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              <Icon size={12} className="text-[#f8c9dc]" />
              {text}
            </div>
          ))}
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white text-center">
          Helping Your Future{" "}
          <span className="relative inline-block">
            <span className="text-[#f8c9dc]">Bloom</span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#c41f3e]/60 rounded-full" />
          </span>{" "}
          in Canada
        </h1>

        {/* Animated Tagline */}
        <div className="mt-5 text-lg sm:text-xl text-white/80 font-medium text-center min-h-[2rem]">
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
          <span className="ml-0.5 border-r-2 border-[#c41f3e] animate-pulse" />
        </div>

        {/* Sub-description */}
        <p className="mt-4 text-sm sm:text-base text-white/60 text-center max-w-xl mx-auto leading-relaxed">
          We handle every step of your immigration journey, from eligibility
          assessment to final approval, with precision and care.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#appointment"
            className="bg-[#c41f3e] text-white px-8 py-3 rounded-lg font-bold text-sm shadow-lg hover:bg-[#a01832] hover:translate-y-[-2px] transition-all"
          >
            Book Free Consultation
          </a>
          <a
            href="#services"
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-white/20 transition-all"
          >
            Explore Services
          </a>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/15" />

        {/* Stats Row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {value}
              </div>
              <div className="text-xs text-white/55 font-medium mt-0.5 uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
          <div className="flex items-center gap-1.5">
            <CheckCircle size={13} className="text-green-400" />
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle size={13} className="text-green-400" />
            <span>Free initial assessment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle size={13} className="text-green-400" />
            <span>Trusted by 2,500+ families</span>
          </div>
        </div>
      </div>
    </section>
  );
}
