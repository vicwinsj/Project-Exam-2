import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useVenues } from "../contexts/VenueContext";

// type SearchProps = {
//   onSearch: (query: string) => void;
// };

const Search = () => {
  const navigate = useNavigate();
  const { resetSearch } = useVenues();

  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleErase = () => {
    setQuery("");
    inputRef.current?.focus();
    resetSearch();
    navigate("/");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // onSearch(query);

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center gap-3">
      <div className="w-1/2 relative">
        <input
          className="w-full px-3 py-3 rounded-lg border-2 border-transparent hover:bg-air-100 outline-none focus:border-sunset-800 bg-white placeholder:font-semibold placeholder-ocean-700 placeholder:font-rubik"
          type="text"
          placeholder="Where are your dreams taking you?"
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
              className="transition-colors duration-300 text-xl text-neutral-500 hover:text-neutral-700 font-semibold"
            ></FontAwesomeIcon>
          </button>
        )}
      </div>
    </form>
  );
};

export default Search;
