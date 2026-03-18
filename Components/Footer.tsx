import React from "react";
import { Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background-dark text-slate-300 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-primary size-6">
                <img src="/sunbloom-logo.png" alt="Sunbloom Immigration Ltd." />
              </div>
              <span className="text-lg font-bold text-white">
                Sunbloom Immigration
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Professional Canadian immigration consulting. Helping you navigate
              the path to success in Canada.
            </p>
            <p className="text-xs text-slate-500">
              RCIC Rajveer Kaur Gill
              <br />
              License: R1054053
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#home"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#about"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#appointment"
                >
                  Appointment
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Key Services</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Permanent Residency
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Express Entry
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Study Permits
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Work Permits
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="text-sm text-primary" size={16} />
                289-885-4848
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="text-sm text-primary" size={16} />
                25415 Terrault Rd, Sturgeon County, AB T8T 0C6
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 Sunbloom Immigration Ltd. All rights reserved.</p>
          <p>
            Incorporated under Canada Business Corporations Act | Authorized
            CICC Member
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
