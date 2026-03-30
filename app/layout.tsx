import type { Metadata } from "next";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export const metadata: Metadata = {
  title: "Sunbloom Immigration Ltd.",
  description: "Your trusted partner for immigration services.",
  icons: {
    icon: "/sunbloom-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
        <Header /> {children} <Footer />
      </body>
    </html>
  );
}
