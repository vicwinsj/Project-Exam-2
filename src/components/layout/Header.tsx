import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../form/Button.tsx";
import Search from "../Search.tsx";
import { useVenues } from "../../contexts/VenueContext.tsx";
import { useAuth } from "../../contexts/AuthContext.tsx";
import LoginModal from "../modals/LoginModal.tsx";
import toast from "react-hot-toast";
import { Toast } from "../toast/toast.tsx";
import logo from "../../assets/logos/holidaze_small.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FilterModal } from "../modals/FilterModal.tsx";
import VenueModal from "../modals/VenueModal.tsx";
import parse from "date-fns/parse";

const Header = () => {
  const { accessToken, logout, profile } = useAuth();
  const { resetSearch } = useVenues();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [mobileNavOpacity, setMobileNavOpacity] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);

  const searchText = searchParams.get("q") || "";
  const rating = searchParams.get("minrating");
  const guests = searchParams.get("guests");
  const dateFrom = searchParams.get("from");
  const dateTo = searchParams.get("to");
  const minPrice = searchParams.get("minprice");
  const maxPrice = searchParams.get("maxprice");
  const wifi = searchParams.get("wifi") === "true";
  const pets = searchParams.get("pets") === "true";
  const parking = searchParams.get("parking") === "true";
  const breakfast = searchParams.get("breakfast") === "true";

  const dateRange = {
    from: dateFrom ? parse(dateFrom, "dd.MM.yyyy", new Date()) : undefined,
    to: dateTo ? parse(dateTo, "dd.MM.yyyy", new Date()) : undefined,
  };

  const handleOpenFilter = () => {
    setShowFilter(true);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const handleOpenVenueModal = () => {
    setShowVenueModal(true);
  };

  const handleCloseVenueModal = () => {
    setShowVenueModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY || currentScrollY === 0) {
        setMobileNavOpacity(false);
        setShowHeader(false);
      } else {
        setMobileNavOpacity(true);
        setShowHeader(true);
      }

      if (currentScrollY === 0) {
        setMobileNavOpacity(true);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const updateScreenSizeVisibility = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setShowMobileNav(false);
        setShowLoginButton(true);
        setShowSearch(true);
        setShowStickyHeader(false);
      } else {
        setShowMobileNav(true);
        setShowLoginButton(false);
        setShowSearch(false);
        setShowStickyHeader(true);
      }
    };
    updateScreenSizeVisibility();
    window.addEventListener("resize", updateScreenSizeVisibility);
    return () =>
      window.removeEventListener("resize", updateScreenSizeVisibility);
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
    if (pathname.startsWith("/profile")) {
      navigate("/");
    }
  };

  const handleHomeClick = () => {
    if (pathname.includes("/search") && window.scrollY === 0) {
      resetSearch();
      navigate("/");
    } else {
      if (!pathname.includes("/search") && pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleProfileClick = () => {
    if (!pathname.includes(`/profile/${profile?.name}`)) {
      navigate(`/profile/${profile?.name}`);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`z-10 transition-all duration-300 ${showHeader && showStickyHeader && location.pathname !== "/register" && "sticky inset-0 sm:"} h-fit flex flex-col px-6 py-3 bg-ocean-700 rounded-b-lg md:rounded-b-[20px]`}
      >
        <div className="flex justify-between items-center">
          <Link
            className="flex items-center justify-start"
            onClick={handleHomeClick}
            to="/"
          >
            <strong className="transform-colors duration-300 font-rubik text-lg md:text-2xl text-white hover:text-turquoise-500">
              holida<span className="italic">z</span>e
            </strong>
          </Link>
          {showSearch &&
            location.pathname !== "/register" &&
            location.pathname !== "/profile" && <Search />}
          <nav className="text-white flex items-center gap-3">
            {accessToken ? (
              <>
                <Button size="sm" variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
                {!showMobileNav && (
                  <Link
                    to={`/profile/${profile?.name}`}
                    className="transition-colors duration-300 rounded-r-md border-1 border-white hover:border-turquoise-500 size-8.5 overflow-hidden"
                  >
                    <img
                      src={profile?.avatar.url}
                      alt={profile?.avatar.alt}
                      className="size-full object-cover bg-black"
                    />
                  </Link>
                )}
              </>
            ) : (
              <>
                {location.pathname !== "/register" && (
                  <Link
                    to="/register"
                    className="text-sm font-semibold transition-colors duration-300 hover:text-turquoise-500"
                  >
                    Register
                  </Link>
                )}{" "}
                {showLoginButton && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                )}
              </>
            )}
          </nav>
        </div>
      </header>
      {showLogin && <LoginModal onClose={handleCloseLogin} />}
      {showFilter && (
        <FilterModal
          onClose={handleCloseFilter}
          urlText={searchText}
          urlRating={rating}
          urlGuests={Number(guests)}
          urlWifi={wifi}
          urlBreakfast={breakfast}
          urlParking={parking}
          urlPets={pets}
          urlDateRange={dateRange}
          urlPriceRange={[Number(minPrice), Number(maxPrice)]}
        />
      )}
      {showVenueModal && (
        <VenueModal
          title="Create venue"
          onClose={handleCloseVenueModal}
          onSuccess={() =>
            toast.custom(<Toast message="Venue successfully created!" />)
          }
        />
      )}
      {showMobileNav && location.pathname !== "/register" && (
        <div
          className={`transition-all duration-300 z-10 w-full p-1 fixed bottom-0 left-0 bg-turquoise-500 ${mobileNavOpacity ? "opacity-100" : "opacity-30"}`}
        >
          <nav className="font-rubik font-semibold text-ocean-700 w-full h-full flex justify-around items-center">
            <button
              className="w-fit h-full flex flex-col items-center justify-center gap-1"
              onClick={handleHomeClick}
            >
              <div className="size-7">
                <img className="size-full" src={logo} />
              </div>
              <p className="text-center w-full h-fit text-sm">Home</p>
            </button>
            <button
              className="w-fit h-full flex flex-col items-center justify-center gap-1"
              onClick={handleOpenFilter}
            >
              <div className="flex items-center justify-center size-7 text-ocean-700">
                <FontAwesomeIcon icon={faSearch} size="xl"></FontAwesomeIcon>
              </div>
              <p className="text-center w-full h-fit text-sm">Search</p>
            </button>
            {accessToken ? (
              <>
                <button
                  onClick={handleOpenVenueModal}
                  className="w-fit h-full flex flex-col items-center justify-center gap-1"
                >
                  <div className="flex items-center justify-center size-7 text-sunset-800 border-3 border-sunset-800 rounded-full">
                    <FontAwesomeIcon icon={faPlus} size="lg"></FontAwesomeIcon>
                  </div>
                  <p className="text-center w-full h-fit text-sm">New Venue</p>
                </button>
                <button
                  className="flex flex-col items-center justify-center w-fit h-full gap-1"
                  onClick={handleProfileClick}
                >
                  <div className="transition-colors duration-300 rounded-r-md border-1 border-white hover:border-turquoise-500 size-7 overflow-hidden">
                    <img
                      src={profile?.avatar.url}
                      alt={profile?.avatar.alt}
                      className="size-full object-cover bg-black"
                    />
                  </div>
                  <p className="text-center w-full h-fit text-sm">Profile</p>
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="w-fit h-full flex flex-col items-center justify-center gap-1"
              >
                <div className="flex items-center justify-center size-7 text-ocean-700">
                  <FontAwesomeIcon
                    icon={faRightToBracket}
                    size="xl"
                  ></FontAwesomeIcon>
                </div>
                <p className="text-center w-full h-fit text-sm">Login</p>
              </button>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
