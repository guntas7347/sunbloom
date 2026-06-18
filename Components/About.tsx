"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const About = () => {
  return (
    <section
      className="py-20 bg-surface-container-lowest overflow-hidden text-left"
      id="about"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Portrait card with borders */}
          <motion.div
            className="relative w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -top-6 -left-6 w-full h-full border-4 border-maple-red rounded-xl -z-10 translate-x-3 translate-y-3"></div>
            <img
              alt="Professional Consultant"
              className="rounded-xl shadow-2xl w-full border border-outline-variant/10"
              src="/rajveer.jpeg"
            />
          </motion.div>

          {/* Right column - Copy & Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="text-3xl font-bold font-headline-md text-on-surface">
              Precision Expertise. Human Compassion.
            </h2>
            <p className="text-body-lg text-secondary leading-relaxed">
              Sunbloom Immigration Ltd. was founded on the principle that
              immigration is not just a legal process, but a profound life
              transition. We provide expert legal guidance and strategic
              planning to help individuals and families navigate the Canadian
              immigration landscape.
            </p>

            <div className="space-y-4 pt-2">
              {/* Consultant Card */}
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-maple-red bg-primary-container/30 p-2.5 rounded-full shrink-0">
                  gavel
                </span>
                <div>
                  <h4 className="font-bold text-on-surface text-lg">
                    CICC Authorized & Licensed
                  </h4>
                  <p className="text-sm font-semibold text-secondary mt-0.5">
                    Rajveer Kaur Gill (RCIC Consultant | College ID: R1054053)
                  </p>
                  <p className="text-xs text-secondary mt-1 max-w-md leading-relaxed">
                    Fully authorized by the College of Immigration and
                    Citizenship Consultants (CICC) to provide legal
                    representation and professional counsel.
                  </p>
                  <div className="pt-3">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=54053"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-maple-red hover:underline"
                    >
                      Verify License Details
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Qualifications */}
              <div className="flex items-start gap-4 pt-2">
                <span className="material-symbols-outlined text-maple-red bg-primary-container/30 p-2.5 rounded-full shrink-0">
                  school
                </span>
                <div className="space-y-2">
                  <h4 className="font-bold text-on-surface text-lg">
                    Professional Qualifications
                  </h4>
                  <ul className="space-y-2 text-xs text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-maple-red shrink-0" />
                      <div>
                        <span className="font-semibold text-on-surface">
                          Graduate Diploma in Immigration and Citizenship Law
                        </span>
                        <p className="opacity-80">
                          Queen's University — Kingston, Canada
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-maple-red shrink-0" />
                      <div>
                        <span className="font-semibold text-on-surface">
                          Bachelor of Science in Nursing
                        </span>
                        <p className="opacity-80">
                          Faridkot College of Nursing — Baba Farid University
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/10">
                <div className="flex items-start gap-2 text-xs text-secondary">
                  <span className="material-symbols-outlined text-maple-red text-[18px]">
                    location_on
                  </span>
                  <div>
                    <span className="font-semibold text-on-surface block">
                      Edmonton Office
                    </span>
                    3612 40th Avenue NW, Edmonton, AB, T6L6M8
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs text-secondary">
                  <span className="material-symbols-outlined text-maple-red text-[18px]">
                    call
                  </span>
                  <div>
                    <span className="font-semibold text-on-surface block">
                      Direct Line
                    </span>
                    289-885-4848
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
