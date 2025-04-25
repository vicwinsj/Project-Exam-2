import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
      <div className="w-full min-h-screen flex flex-col gap-5">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  };
  
  export default Layout;
  