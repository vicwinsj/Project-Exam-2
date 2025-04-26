import { Link } from "react-router-dom";
import logo from "../assets/holidaze_main.svg";
import { Button } from "./Button.tsx";
import Search from "./Search.tsx";
import { useVenues } from "../context/VenueContext";

const Header = () => {
  const { handleSearch } = useVenues();

  return (
    <header className="h-80 flex flex-col gap-30 p-10 bg-ocean-700 shadow-2xl drop-shadow-ocean-700 rounded-b-[20px]">
      <div className="flex justify-between">
        <Link to="/">
          <img src={logo} className="w-30 h-full" />
        </Link>
        <nav className="text-white flex items-center gap-3">
          <Link
            to="/register"
            className="transition-colors duration-300 hover:text-turquoise-500"
          >
            Register
          </Link>
          <Button variant="secondary">Login</Button>
        </nav>
      </div>
      <div className="w-full flex justify-center">
        <Search onSearch={handleSearch} />
      </div>
    </header>
  );
};

export default Header;
