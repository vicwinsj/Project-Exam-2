import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/holidaze_main.svg";
import { Button } from "./Button.tsx";
import Search from "./Search.tsx";
import { useVenues } from "../contexts/VenueContext.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import LoginModal from "./LoginModal.tsx";

const Header = () => {
  const { accessToken, loggedInUser, logout } = useAuth();

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
      <header className="z-10 h-auto flex flex-col gap-30 p-10 bg-ocean-700 rounded-b-[20px]">
        <div className="flex justify-between">
          <Link to="/">
            <img src={logo} className="w-30 h-full" />
          </Link>
          <nav className="text-white flex items-center gap-3">
            {accessToken ? (
              <>
                <Link
                  to={`/profile/${loggedInUser?.name}`}
                  className="rounded-l-full size-10 overflow-hidden"
                >
                  <img
                    src={loggedInUser?.avatar.url}
                    alt={loggedInUser?.avatar.alt}
                    className="size-full object-cover bg-black"
                  />
                </Link>
                <Button variant="secondary" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </nav>
        </div>
        {location.pathname !== "/register" &&
          location.pathname !== "/profile" && (
            <Search onSearch={handleSearch} />
          )}
      </header>
      {showLogin && <LoginModal onClose={handleCloseLogin} />}
    </>
  );
};

export default Header;
