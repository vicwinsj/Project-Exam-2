import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useVenues } from "../contexts/VenueContext";
import { useSearchParams } from "react-router-dom";

// type SearchProps = {
//   onSearch: (query: string) => void;
// };

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, filters, setFilters, resetSearch } =
    useVenues();

  const urlQuery = searchParams.get("q") || "";

  useEffect(() => {
    setQuery(urlQuery || "");
  }, [urlQuery]);

  const [query, setQuery] = useState(urlQuery || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleErase = () => {
    setQuery("");
    inputRef.current?.blur();
    resetSearch();
    navigate("/", { replace: true });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (filters) {
      setFilters({});
    }
    if (searchQuery) {
      setSearchQuery("");
    }
    // onSearch(query);
    const newParams = new URLSearchParams();
    if (query) newParams.set("q", query.trim());
    navigate({ pathname: "/search", search: newParams.toString() });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full justify-center gap-3">
      <div className="w-3/4 lg:w-1/2 relative">
        <input
          className="w-full px-3 py-3 rounded-lg border-2 border-transparent hover:bg-air-100 outline-none focus:border-sunset-800 bg-white placeholder:font-semibold placeholder-ocean-700 placeholder:font-rubik"
          type="text"
          placeholder="What's your dream destination?"
          value={query}
          onChange={handleChange}
          ref={inputRef}
        />
        {query.length > 0 && (
          <button
            className="flex items-center absolute right-4 top-[17px]"
            type="button"
            onClick={handleErase}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="transition-colors duration-300 text-xl text-neutral-300 hover:text-neutral-500 font-semibold"
            ></FontAwesomeIcon>
          </button>
        )}
      </div>
    </form>
  );
};

export default Search;
