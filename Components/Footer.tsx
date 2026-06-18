"use client";

import React from "react";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="w-full py-16 px-6 lg:px-12 bg-surface-container-lowest text-on-surface border-t border-outline-variant/10 transition-colors duration-300 text-left">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1 - Brand & Bio */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-maple-red tracking-tight">Sunbloom</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Pioneering the next generation of precision immigration services for a diverse Canada.
          </p>
          <p className="text-xs text-secondary font-semibold">
            RCIC Rajveer Kaur Gill | College ID: R1054053
          </p>
          <div className="flex gap-4 text-secondary pt-2">
            <span className="material-symbols-outlined cursor-pointer hover:text-maple-red transition-colors text-lg">public</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-maple-red transition-colors text-lg">mail</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-maple-red transition-colors text-lg">call</span>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="text-secondary hover:text-maple-red hover:translate-x-1 transition-all inline-block" href="#services">
                Immigration Services
              </a>
            </li>
            <li>
              <a className="text-secondary hover:text-maple-red hover:translate-x-1 transition-all inline-block" href="#strategy">
                Rural & Northern Streams
              </a>
            </li>
            <li>
              <a className="text-secondary hover:text-maple-red hover:translate-x-1 transition-all inline-block" href="#strategy">
                Francophone Mobility
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Support */}
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="text-secondary hover:text-maple-red hover:translate-x-1 transition-all inline-block" href="#appointment">
                Free Assessment
              </a>
            </li>
            <li>
              <a className="text-secondary hover:text-maple-red hover:translate-x-1 transition-all inline-block" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="text-secondary hover:text-maple-red hover:translate-x-1 transition-all inline-block" href="#">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs">Newsletter</h4>
          <p className="text-xs text-secondary leading-relaxed">
            Get the latest IRCC updates delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              required
              className="bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface text-xs w-full focus:ring-2 focus:ring-maple-red outline-none"
              placeholder="Your email"
              type="email"
            />
            <button
              type="submit"
              className="bg-maple-red px-3 py-2 rounded-lg text-white hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Footer Details */}
      <div className="max-w-[1440px] mx-auto mt-12 pt-6 border-t border-outline-variant/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <p className="text-xs text-secondary opacity-60">
            © 2024 Sunbloom Immigration Services. All rights reserved.
          </p>
          <p className="text-[10px] text-secondary opacity-50">
            Incorporated under Canada Business Corporations Act | Authorized CICC/RCIC Member.
          </p>
        </div>
        
        {/* Verification Logos */}
        <div className="flex items-center gap-6">
          <img
            alt="CICC Logo"
            className="h-8 grayscale opacity-40 dark:invert"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6y6xPZaeLkyvyWnGDTWgo-F7UorH0lYde4tAovy5nIFqH63r4cOHvt9VHgV6yTeLrCNvguzKn10rDtJsjlwGDaEuJrAy2GAnbTKEHFNtG89fH-zQMXiqRCq2aE9p8F_6wNv-6ASUx8TbfvfTW6azQQJqLU95dkJ8cw4arGSEjr6A2X6JoVA-J4hzy9ClQzjVgVlzs0a63sKNyXaSg1oxbG0QlVI2P2zHwuje3lz-orMllSAqpxtNJBPw9iaqYGFIpVqoklnunEOQ"
          />
          <img
            alt="RCIC Logo"
            className="h-8 grayscale opacity-40 dark:invert"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA81mzeGRESrkPFF4_5PBOLCV2HuCmvqQS08GccoizyFaydjFHsYnHZ7sc65QW6s1OD26DWC52NePiXqEwJdYrlmG7EV8bXIjx-vwXOWM3g_TVLMaGEc7OvtfAV-nhiQdtLLb8KpppzPQfNn5ol3OifTvc07hCELkTs_n6RnBcPYuJcO990cJx94jbwPvSNzMNwjGAaXjE1NbQ2Bzoehw9ECS2BXCCifKRUfgQFN3akyjtbWouzqsU2gDnW3eIEv3CNkG29x_Xwu9Y"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
