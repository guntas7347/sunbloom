import React from "react";
import {
  User,
  ExternalLink,
  MapPin,
  Phone,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-32 bg-white dark:bg-background-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">
              About Sunbloom Immigration
            </h2>
            <p className="text-lg mb-6 text-slate-600 dark:text-slate-400">
              Sunbloom Immigration Ltd. is a dedicated consultancy firm
              incorporated under the{" "}
              <strong>Canada Business Corporations Act</strong>. We provide
              expert legal guidance to individuals and families seeking to
              navigate the complex Canadian immigration landscape.
            </p>
            <div className="bg-background-alt dark:bg-slate-800 p-10 rounded-2xl shadow-sm border border-primary-light">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="text-primary" />
                Founder & Principal Immigration Consultant
              </h3>
              <p className="text-slate-900 dark:text-slate-100 font-bold text-lg mb-1">
                Rajveer Kaur Gill
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                RCIC Consultant | College ID: R1054053
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Authorized by the College of Immigration and Citizenship
                Consultants (CICC) to provide professional immigration advice
                and representation.
              </p>
              <a
                target="_blank"
                href="https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=54053"
                className="inline-flex items-center gap-2 text-white font-bold bg-primary px-8 py-3 rounded-lg hover:bg-primary/90 transition-all"
              >
                Verify License
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm col-span-1 md:col-span-2">
              <GraduationCap className="text-primary mb-4" />
              <h4 className="font-bold mb-3">Professional Qualifications</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      Graduate Diploma in Immigration and Citizenship Law
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Queen&apos;s University &mdash; Kingston, Canada
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      Bachelor of Science in Nursing
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      University College of Nursing, Faridkot &mdash; Baba Farid
                      University of Health Sciences, Faridkot
                    </p>
                  </div>
                </li>
              </ul>
            </div>{" "}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <MapPin className="text-primary mb-4" />
              <h4 className="font-bold mb-2">Address</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                25415 Terrault Rd
                <br />
                Sturgeon County, AB T8T 0C6
                <br />
                Canada
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <Phone className="text-primary mb-4" />
              <h4 className="font-bold mb-2">Phone</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                289-885-4848
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm col-span-1 md:col-span-2">
              <ShieldCheck className="text-primary mb-4" />
              <h4 className="font-bold mb-2">Legal Status</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Incorporated under Canada Business Corporations Act. Fully
                compliant with CICC regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
