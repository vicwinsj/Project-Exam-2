import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues?sort=created&sortOrder=desc&limit=100"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }
        const data = await response.json();
        setVenues(data.data);
        setSearchResults(data.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query) {
      setSearchResults(venues);
      return;
    }
    const filtered = venues.filter((venue) => {
      const name = venue.name ?? "";
      const city = venue.location?.city ?? "";
      const country = venue.location?.country ?? "";

      return (
        name.toLowerCase().includes(query.toLowerCase()) ||
        city.toLowerCase().includes(query.toLowerCase()) ||
        country.toLowerCase().includes(query.toLowerCase())
      );
    });
    setSearchResults(filtered);
  };

  return (
    <VenueContext.Provider
      value={{
        venues,
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
