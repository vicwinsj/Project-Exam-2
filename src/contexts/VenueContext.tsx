import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchVenues } from "../api/venues";

type Venue = {
  id: string;
  name: string;
  description: string;
  price: number;
  location: {
    country: string;
    city: string;
  };
  media: {
    url: string;
    alt: string;
  }[];
};

type VenueContextType = {
  venues: Venue[];
  resetSearch: () => void;
  searchResults: Venue[];
  searchQuery: string;
  handleSearch: (query: string) => void;
  error: string | null;
  loading: boolean;
};

const VenueContext = createContext<VenueContextType | undefined>(undefined);

export const VenueProvider = ({ children }: { children: ReactNode }) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [searchResults, setSearchResults] = useState<Venue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    loadVenues();
  }, []);

  useEffect(() => {
    if (!loading && searchQuery) {
      const filtered = venues.filter((venue) => {
        const name = venue.name ?? "";
        const city = venue.location?.city ?? "";
        const country = venue.location?.country ?? "";

        return (
          name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      setSearchResults(filtered);
    } else setSearchResults(venues);
  }, [loading, venues, searchQuery]);

  const loadVenues = async () => {
    try {
      const data = await fetchVenues();
      setVenues(data);
      setSearchResults(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while fetching venues");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearchQuery("");
    loadVenues();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <VenueContext.Provider
      value={{
        venues,
        resetSearch,
        searchResults,
        searchQuery,
        handleSearch,
        error,
        loading,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};

export const useVenues = () => {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error("useVenues must be used within a VenueProvider");
  }
  return context;
};
