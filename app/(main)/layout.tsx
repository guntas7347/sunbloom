import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { ReactLenis } from "lenis/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root>
      <Header />
      <div className="mt-[72px]">{children}</div>
      <Footer />
    </ReactLenis>
  );
};

export default MainLayout;
