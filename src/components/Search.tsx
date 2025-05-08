import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center gap-3">
      <div className="w-1/2 relative">
        <input
          className=" w-full px-10 py-3 rounded-lg border-2 border-transparent hover:bg-air-100 outline-none focus:border-sunset-800 bg-white placeholder:font-semibold placeholder-ocean-700 placeholder:font-rubik"
          type="text"
          placeholder="Where are your dreams taking you?"
          value={query}
          onChange={handleChange}
        />
        <button className="absolute right-8 top-3.5" type="submit">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="transition-colors duration-300 text-2xl text-sunset-800 hover:text-sunset-900 font-semibold"
          ></FontAwesomeIcon>
        </button>
      </div>
    </form>
  );
};

export default Search;
