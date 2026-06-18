"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/lib/useTheme";
import Link from "next/link";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Strategic Focus", href: "#strategy" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 lg:px-12 py-4 glass-nav border-b border-outline-variant/20 transition-all duration-300">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <img
          alt="Sunbloom Logo"
          className="h-10 w-auto"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRKsv8JnVWmrJ490hukwN2mZkMnAOciaU8aOU-xlRe-Z-8y5tZDzFP4bBuaaW6flp4EKD8IiqE8H82Pw0_n0f_f29tcAJFB9TwSrAvCjasyUM6pLcMx13rSXVbtdUc31i7tll5QCXf2NT-MQV74JKvgyD1pcV7g_g349XFAyZ1iOiklVHxYPxWuEOyYdt64OCaf3FY2bZhP-MW0kKOB7NlToevjE8RFxdtj_Bl1bciLVuDyMa508rvKwsavh0rBmjSjLCAnapdv60"
        />
        <span className="text-xl font-bold hidden lg:block text-maple-red tracking-tight">
          Sunbloom Immigration
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            className="font-label-md text-sm text-secondary hover:text-maple-red transition-colors"
            href={link.href}
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="p-2 rounded-full hover:bg-surface-variant transition-colors text-secondary hover:text-maple-red flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            {theme === "dark" ? "dark_mode" : "light_mode"}
          </span>
        </button>

        <Link
          href="#appointment"
          className="gradient-maple text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:scale-95 transition-all active:scale-90"
        >
          Free Assessment
        </Link>

        {/* Mobile Burger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-secondary p-1 flex items-center justify-center hover:bg-surface-variant rounded-lg"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-background border-b border-outline-variant/25 md:hidden shadow-xl p-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block font-label-md text-base text-on-surface hover:text-maple-red transition-colors py-2 border-b border-outline-variant/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-4">
            <Link
              href="#appointment"
              className="gradient-maple text-white px-5 py-3 rounded-lg text-center font-bold shadow-md hover:opacity-95"
              onClick={() => setIsMenuOpen(false)}
            >
              Free Assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
