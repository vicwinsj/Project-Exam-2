import { useEffect, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const body = document.querySelector("body");

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/register" &&
      !body?.classList.contains("bg-ocean-700")
    ) {
      body?.classList.add("bg-ocean-700");
      body?.classList.remove("bg-white");
    } else if (body?.classList.contains("bg-ocean-700")) {
      body?.classList.remove("bg-ocean-700");
    }

    return () => {
      body?.classList.remove("bg-ocean-700");
    };
  });

  return (
    <div
      className={`bg-white w-full min-h-screen flex flex-col mx-1 sm:mx-5 gap-6 sm:gap-10 ${location.pathname === "/register" && "px-1! sm:px-5! mx-0! bg-ocean-700!"}`}
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
