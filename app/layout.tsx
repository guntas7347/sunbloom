import type { Metadata } from "next";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { ReactLenis } from "lenis/react";

export const metadata: Metadata = {
  title:
    "Sunbloom Immigration | Your Journey to Canada Starts with a Sun Bloom",
  description:
    "Expert immigration services with precise sectoral alignment. Trust Sunbloom for holistic settlement and a seamless transition to your new life in Canada.",
  icons: {
    icon: "/sunbloom-full.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })()
            `,
          }}
        />
      </head>
      <body className="bg-background text-on-surface font-body-md overflow-x-hidden transition-colors duration-300">
        <ReactLenis root>
          <Header />
          <div className="mt-[72px]">{children}</div>
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
