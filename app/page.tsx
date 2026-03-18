"use client";

import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {
  CheckCircle,
  Plane,
  Users,
  GraduationCap,
  Briefcase,
  Home,
  Award,
  Map,
  Zap,
  Heart,
  FileText,
  Gavel,
  ExternalLink,
  MapPin,
  Phone,
  User,
  ShieldCheck,
} from "lucide-react";

const App = () => {
  return (
    <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
      <Header />

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative overflow-hidden pt-24 pb-32 lg:pt-40 lg:pb-52 bg-gradient-to-br from-primary-light/30 via-white to-white dark:from-background-dark dark:via-background-dark dark:to-background-dark"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                Trusted Canadian <br />
                <span className="text-primary">Immigration Services</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
                Helping clients bloom in Canada with expert guidance and
                personalized immigration solutions. Your journey to a new life
                starts with professional care.
              </p>
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                <a
                  href="#appointment"
                  className="bg-primary text-white px-10 py-5 rounded-lg font-bold shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all"
                >
                  Book Consultation
                </a>
                <a
                  href="#services"
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-lg font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  View Services
                </a>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-square bg-gradient-to-tr from-primary/30 to-primary/5 rounded-full absolute -top-10 -right-10 blur-3xl opacity-50"></div>
              <div
                className="relative z-10 w-full max-w-lg mx-auto aspect-video rounded-xl bg-slate-200 shadow-2xl overflow-hidden border-4 border-white dark:border-slate-800"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuALyRNfDzvUwdvURElQRJfV_UQphPv-DirhtXr1D16RSWvSY3b03kt33SDku1-mmYmqGVgba6aT7_A3GsAwYbT2P_cjAYVW3nb2NJHEl3IAVkDQdvZLxMsG1Iqd_iRcVtJ87gOHJ2QNPUTEZuwRkIfXjI1jOD-EmoAnTC_G97EJvz79QgMDfaiCzN-0XtvszNrTVYUSS8KXO8anHfnhscDU0ELJBCxbAkf7HDBWwcLhw-aJwWvx4V6n7rrdtfhOGEFrWT-qL3rI6vw')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <ShieldCheck className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    Licensed Consultant
                  </p>
                  <p className="text-sm font-black">CICC Authorized</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-32 bg-background-alt/50 dark:bg-background-dark/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Our Professional Services
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Comprehensive support for all your Canadian immigration needs
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                {
                  icon: Plane,
                  title: "Visitor Visa",
                  desc: "Explore Canada for tourism, family visits, or short business trips.",
                },
                {
                  icon: Users,
                  title: "Super Visa",
                  desc: "Long-term stay options for parents and grandparents of citizens/PRs.",
                },
                {
                  icon: GraduationCap,
                  title: "Study Permit",
                  desc: "Obtain authorization to study at designated learning institutions (DLI).",
                },
                {
                  icon: Briefcase,
                  title: "Work Permit",
                  desc: "Closed or open work permits for foreign workers in Canada.",
                },
                {
                  icon: Home,
                  title: "Permanent Residency",
                  desc: "Transition to living permanently in Canada through various pathways.",
                },
                {
                  icon: Award,
                  title: "Citizenship",
                  desc: "The final step in your journey to become a Canadian citizen.",
                },
                {
                  icon: FileText,
                  title: "PRTD",
                  desc: "Travel documents for permanent residents without valid PR cards.",
                },
                {
                  icon: Zap,
                  title: "Express Entry",
                  desc: "Fast-tracked economic immigration for skilled workers.",
                },
                {
                  icon: Map,
                  title: "PNP",
                  desc: "Provincial Nominee Programs tailored to local economic needs.",
                },
                {
                  icon: Briefcase,
                  title: "Business Visa",
                  desc: "Invest, start a business, or expand your operations in Canada.",
                },
                {
                  icon: Heart,
                  title: "Spousal Sponsorship",
                  desc: "Unite with your loved ones through family class sponsorship.",
                },
                {
                  icon: GraduationCap,
                  title: "PGWP",
                  desc: "Post-Graduation Work Permit for international students.",
                },
                {
                  icon: Users,
                  title: "SOWP",
                  desc: "Spousal Open Work Permit for partners of students/workers.",
                },
                {
                  icon: FileText,
                  title: "LMIA Process",
                  desc: "Assistance for employers applying for Labour Market Impact Assessment.",
                },
                {
                  icon: Gavel,
                  title: "Refugee Services",
                  desc: "Professional support for asylum and refugee applications.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:shadow-xl transition-all"
                >
                  <service.icon className="text-primary size-8 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-white dark:bg-background-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    Meet Our Lead Consultant
                  </h3>
                  <p className="text-slate-900 dark:text-slate-100 font-bold text-lg mb-1">
                    Rajveer Kaur Gill
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    RCIC Consultant | College ID: R1054053
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    Authorized by the College of Immigration and Citizenship
                    Consultants (CICC) to provide professional immigration
                    advice and representation.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-white font-bold bg-primary px-8 py-3 rounded-lg hover:bg-primary/90 transition-all"
                  >
                    Verify License
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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

        {/* Appointment Section */}
        <section
          id="appointment"
          className="py-32 bg-background-alt/30 dark:bg-slate-900"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Book an Appointment</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Schedule your professional consultation today
              </p>
            </div>
            <div className="bg-background-light dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary"
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary"
                    placeholder="email@example.com"
                    type="email"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary"
                    placeholder="289-885-4848"
                    type="tel"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold mb-2">
                    Select Service
                  </label>
                  <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary">
                    <option>Visitor Visa</option>
                    <option>Study Permit</option>
                    <option>Work Permit</option>
                    <option>Permanent Residency</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold mb-2">Date</label>
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary"
                    type="date"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold mb-2">Time</label>
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary"
                    type="time"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-2">
                    Your Message
                  </label>
                  <textarea
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary"
                    placeholder="How can we help you?"
                    rows={4}
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <button
                    className="w-full bg-primary text-white py-5 rounded-lg font-bold text-lg hover:bg-primary/90 shadow-lg transition-all"
                    type="submit"
                  >
                    Schedule Consultation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-32 bg-white dark:bg-background-dark"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-light/40 p-3 rounded-lg">
                      <Phone className="text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Phone</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        289-885-4848
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-light/40 p-3 rounded-lg">
                      <MapPin className="text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Our Office</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        25415 Terrault Rd, Sturgeon County, AB T8T 0C6, Canada
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-inner bg-slate-200 h-64 relative border border-slate-300 dark:border-slate-700">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCVGrtifqLWm3hZoK4tC00ChprftH8oa94FqOXkxoqj-us4mqZK94yYXY3R_sSUarNVVLGzkVyllsB4oLIlAPV5qAoCwzuARrQNaktKbhkpVNd4SBdvyFCZadO-amU5XZ6DbY-JANSNp0tXiqDrlpc-71ig_G6hxNzMwjCH6uD8O-sR12aiWZBe5bR1wyyRkvuukaCd9QWwLAN7RUCfxw0O1KXVChFtIHGMexf0jGqRMJL865BvPoCgRDJzw1xrLatwAs4FnokTK34')",
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <MapPin className="text-primary" size={16} />
                      <span className="text-xs font-bold">
                        Sunbloom Immigration
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Name</label>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-900 focus:ring-primary focus:border-primary"
                      placeholder="Your Name"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-900 focus:ring-primary focus:border-primary"
                      placeholder="Email Address"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-900 focus:ring-primary focus:border-primary"
                      placeholder="Message details..."
                      rows={5}
                    ></textarea>
                  </div>
                  <button
                    className="w-full bg-primary text-white py-5 rounded-lg font-bold hover:bg-primary/90 transition-all"
                    type="submit"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
