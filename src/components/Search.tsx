import { useState } from "react";
import { Button } from "./Button";

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
          className="transition-colors duration-300 w-full px-10 py-3 rounded-lg border-2 outline-none border-transparent hover:bg-air-100 focus:border-sunset-800 bg-white placeholder:font-semibold placeholder-ocean-700 placeholder:font-rubik"
          type="text"
          placeholder="Where are your dreams taking you?"
          value={query}
          onChange={handleChange}
        />
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-4 h-10 text-ocean-700 font-semibold"></i>
      </div>
      <Button variant="primary" size="lg" type="submit">
        Search
      </Button>
    </form>
  );
};

export default Search;
