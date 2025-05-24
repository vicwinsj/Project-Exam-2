import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { fetchVenues, fetchSearch } from "../api/venues";
import { DateRange } from "react-day-picker";
import { Venue } from "../types/venue";

type Filters = {
  searchText?: string;
  dateRange?: DateRange | null;
  priceRange?: [number, number] | null;
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
  filters: Filters;
  searchQuery: string;
  reloadVenues: () => void;
  setSearchQuery: (searchQuery: string) => void;
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
    if (searchQuery.trim()) {
      searchVenues(searchQuery);
    } else {
      setSearchResults(venues);
    }
  }, [searchQuery, venues]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...venues];

      if (filters.searchText?.trim()) {
        setSearchQuery(filters.searchText);
        filtered = filtered.filter(
          (venue) =>
            venue.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            venue.location?.city
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            venue.location?.country
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            venue.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (filters.guests) {
        filtered = filtered.filter(
          (venue) => venue.maxGuests && venue.maxGuests >= filters.guests!
        );
      }

      if (filters.dateRange?.from && filters.dateRange?.to) {
        const selectedStart = new Date(filters.dateRange.from);
        const selectedEnd = new Date(filters.dateRange.to);

        filtered = filtered.filter((venue) => {
          const hasOverlappingBooking = venue.bookings?.some((booking) => {
            const bookingStart = new Date(booking.dateFrom);
            const bookingEnd = new Date(booking.dateTo);

            return bookingStart <= selectedEnd && bookingEnd >= selectedStart;
          });
          return !hasOverlappingBooking;
        });
      }

      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange;
        filtered = filtered.filter(
          (venue) =>
            venue.price && venue.price >= minPrice && venue.price <= maxPrice
        );
      }

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
        filtered = filtered.filter(
          (venue) => venue.rating && venue.rating >= filters.rating!
        );
      }

      setSearchResults(filtered);
    };

    applyFilters();
  }, [searchQuery, venues, filters]);

  const loadVenues = useCallback(async () => {
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
  }, [setLoading, setVenues, searchQuery, setSearchResults, setError]);

  const reloadVenues = async () => {
    setError(null);
    setSearchQuery("");
    setFilters({});
    await loadVenues();
  };

  useEffect(() => {
    loadVenues();
  }, [loadVenues]);

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
    if (searchQuery || Object.keys(filters).length > 0) {
      setSearchQuery("");
      setFilters({});
    } else return;
  };

  return (
    <VenueContext.Provider
      value={{
        filters,
        venues,
        resetSearch,
        searchResults,
        searchQuery,
        setSearchQuery,
        error,
        loading,
        setFilters,
        reloadVenues,
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
