import { useState } from "react";

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      className="transition-colors duration-300 w-1/2 px-6 py-3 rounded-lg border-2 outline-none border-transparent focus:border-sunset-800 bg-white"
      type="text"
      placeholder="Where are your dreams taking you?"
      value={query}
      onChange={handleChange}
    />
  );
};

export default Search;
