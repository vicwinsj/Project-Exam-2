import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchVenues, fetchSearch } from "../api/venues";
import { DateRange } from "react-day-picker";

type Venue = {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating: number;
  meta: {
    wifi: boolean;
    breakfast: boolean;
    pets: boolean;
    parking: boolean;
  };
  location: {
    country: string;
    city: string;
  };
  media: {
    url: string;
    alt: string;
  }[];
};

type Filters = {
  dateRange?: DateRange;
  guests?: number;
  wifi?: boolean;
  parking?: boolean;
  breakfast?: boolean;
  pets?: boolean;
  rating?: number;
};

type VenueContextType = {
  venues: Venue[];
  resetSearch: () => void;
  searchResults: Venue[];
  setFilters: (filters: Filters) => void;
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
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    loadVenues();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchVenues(searchQuery);
    } else {
      setSearchResults(venues);
    }
  }, [searchQuery, venues]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...venues];

      if (searchQuery?.trim()) {
        filtered = filtered.filter(
          (venue) =>
            venue.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            venue.location.city
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            venue.location.country
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            venue.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (filters.guests) {
        filtered = filtered.filter(
          (venue) => venue.maxGuests >= filters.guests!
        );
      }

      // if (filters.dateRange) {
      //   filtered = filtered.filter((venue) => dateFrom <= venue.bookings.))
      // }

      // if (filters.priceRange) {
      //   filtered = filtered.filter((venue) => priceFrom <= venue.price <= priceTo)
      // }

      if (filters.wifi) {
        filtered = filtered.filter((venue) => venue.meta?.wifi);
      }
      if (filters.parking) {
        filtered = filtered.filter((venue) => venue.meta?.parking);
      }
      if (filters.breakfast) {
        filtered = filtered.filter((venue) => venue.meta?.breakfast);
      }
      if (filters.pets) {
        filtered = filtered.filter((venue) => venue.meta?.pets);
      }

      if (filters.rating) {
        filtered = filtered.filter((venue) => venue.rating >= filters.rating!);
      }

      setSearchResults(filtered);
    };

    applyFilters();
  }, [searchQuery, venues, filters]);

  const loadVenues = async () => {
    setLoading(true);
    try {
      const data = await fetchVenues();
      setVenues(data);
      if (!searchQuery) {
        setSearchResults(data);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const searchVenues = async (query: string) => {
    setLoading(true);
    try {
      const results = await fetchSearch(query);
      setSearchResults(results);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown search error");
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = async () => {
    setSearchQuery("");
    await loadVenues();
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
        setFilters,
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
