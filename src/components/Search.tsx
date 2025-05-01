import { useState } from "react";
import { Button } from "./form/Button";
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
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-4 h-10 text-ocean-700 font-semibold"
        ></FontAwesomeIcon>
      </div>
      <Button variant="primary" size="lg" type="submit">
        Search
      </Button>
    </form>
  );
};

export default Search;
