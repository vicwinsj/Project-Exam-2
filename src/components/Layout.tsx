import React from "react";
import Header from "./Header";
// import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
    return (
      <div className="w-full h-full">
        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    );
  };
  
  export default Layout;
  