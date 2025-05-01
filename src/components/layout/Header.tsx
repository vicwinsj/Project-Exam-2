import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/holidaze_main.svg";
import { Button } from "../form/Button.tsx";
import Search from "../Search.tsx";
import { useVenues } from "../../contexts/VenueContext.tsx";
import { useAuth } from "../../contexts/AuthContext.tsx";
import LoginModal from "../modals/LoginModal.tsx";
import { fetchProfile } from "../../api/profile.ts";

const Header = () => {
  const { accessToken, username, logout, authLoading } = useAuth();
  const { handleSearch } = useVenues();
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  type Profile = {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
    venueManager: boolean;
  };

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    const loadProfile = async () => {
      try {
        const data = await fetchProfile(username!, accessToken!);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      loadProfile();
    } else {
      setError("Not authenticated");
      setLoading(false);
    }
  }, [username, accessToken, authLoading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
    if (location.pathname === "/profile") {
      navigate("/");
    }
  };

  return (
    <>
      <header className="h-auto flex flex-col gap-30 p-10 bg-ocean-700 rounded-b-[20px]">
        <div className="flex justify-between">
          <Link to="/">
            <img src={logo} className="w-30 h-full" />
          </Link>
          {location.pathname !== "/register" &&
            location.pathname !== "/profile" && (
              <Search onSearch={handleSearch} />
            )}
          <nav className="text-white flex items-center gap-3">
            {accessToken ? (
              <>
                <Link
                  to={`/profile/${profile?.name}`}
                  className="transition-colors duration-300 rounded-l-md border-2 border-white hover:border-turquoise-500 size-10 overflow-hidden"
                >
                  <img
                    src={profile?.avatar.url}
                    alt={profile?.avatar.alt}
                    className="size-full object-cover bg-black"
                  />
                </Link>
                <Button variant="secondary" onClick={handleLogout}>
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
      </header>
      {showLogin && <LoginModal onClose={handleCloseLogin} />}
    </>
  );
};

export default Header;
