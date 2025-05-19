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
import logo from "../../assets/holidaze_small.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faSuitcase,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FilterModal } from "../modals/FilterModal.tsx";
import VenueModal from "../modals/VenueModal.tsx";
import parse from "date-fns/parse";

const Header = () => {
  const { accessToken, logout, profile, username } = useAuth();
  const { resetSearch } = useVenues();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [showVenueModal, setShowVenueModal] = useState(false);

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
    const updateScreenVisibility = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setShowMobileNav(false);
      }
      if (width > 768) {
        setShowSearch(true);
        setShowMobileNav(false);
      } else {
        setShowSearch(false);
        setShowMobileNav(true);
      }
    };
    updateScreenVisibility();
    window.addEventListener("resize", updateScreenVisibility);
    return () => window.removeEventListener("resize", updateScreenVisibility);
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
    toast.custom(<Toast message="Successfully logged out!" />);
    if (location.pathname.startsWith("/profile")) {
      navigate("/");
    }
  };

  return (
    <>
      <header className="h-auto flex flex-col gap-30 py-3 px-3 md:px-10 bg-ocean-700 rounded-b-lg md:rounded-b-[20px]">
        <div className="flex justify-between">
          <Link
            className="flex items-center justify-start"
            onClick={resetSearch}
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
                )}
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
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
      {showMobileNav && (
        <div className="z-10 w-full px-1 py-3 fixed bottom-0 left-0 bg-turquoise-500">
          <nav className="w-full h-full flex justify-around items-center">
            <Link
              className="w-fit h-full flex flex-col items-center justify-center gap-1"
              to="/"
              onClick={resetSearch}
            >
              <div className="size-7">
                <img className="size-full" src={logo} />
              </div>
              <p className="text-center w-full h-fit text-sm">Home</p>
            </Link>
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
                <Link
                  className="w-fit h-full flex flex-col items-center justify-center gap-1"
                  to={`/profile/${username}`}
                >
                  <div className="flex items-center justify-center size-7 text-ocean-700">
                    <FontAwesomeIcon
                      icon={faSuitcase}
                      size="xl"
                    ></FontAwesomeIcon>
                  </div>
                  <p className="text-center w-full h-fit text-sm">Bookings</p>
                </Link>
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
