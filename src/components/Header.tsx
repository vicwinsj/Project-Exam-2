import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/holidaze_main.svg";
import { Button } from "./Button.tsx";
import Search from "./Search.tsx";
import { useVenues } from "../contexts/VenueContext.tsx";
import Login from "./Login.tsx";

const Header = () => {
  const location = useLocation();

  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  const { handleSearch } = useVenues();

  return (
    <>
      <header className="h-full flex flex-col gap-30 p-10 bg-ocean-700 rounded-b-[20px]">
        <div className="flex justify-between">
          <Link to="/">
            <img src={logo} className="w-30 h-full" />
          </Link>
          <nav className="text-white flex items-center gap-3">
            {location.pathname !== "/register" && (
              <Link
                to="/register"
                className="font-semibold transition-colors duration-300 hover:text-turquoise-500"
              >
                Register
              </Link>
            )}
            <Button variant="secondary" onClick={handleLoginClick}>
              Login
            </Button>
          </nav>
        </div>
        {location.pathname !== "/register" && (
          <Search onSearch={handleSearch} />
        )}
      </header>
      {showLogin && <Login onClose={handleCloseLogin} />}
    </>
  );
};

export default Header;
