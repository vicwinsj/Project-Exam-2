import { DateRange } from "react-day-picker";

export type Filters = {
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
