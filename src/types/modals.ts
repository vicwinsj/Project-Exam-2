import { DateRange } from "react-day-picker";
import { Venue } from "./venue";

export type ModalWrapperProps = {
  onClose: () => void;
  children: React.ReactNode;
  isImageCarousel?: boolean;
};

export interface CalendarModalProps {
  disabledDates?: { from: Date; to: Date }[];
  onClose?: () => void;
  onRangeSelect: (range: DateRange | undefined, nights: number) => void;
  selectedRange: DateRange | undefined;
  nights: number;
}

export interface DeleteModalProps {
  id: string;
  name: string;
  onClose: () => void;
  onSuccess: () => void;
}

export interface EditProfileProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export type FilterModalProps = {
  onClose: () => void;
  urlText?: string;
  urlRating?: string | null;
  urlGuests?: number | null;
  urlWifi?: boolean;
  urlBreakfast?: boolean;
  urlParking?: boolean;
  urlPets?: boolean;
  urlDateRange?: DateRange;
  urlPriceRange?: [number, number] | null;
};

export interface GuestsModalProps {
  guestLimit: number | undefined;
  adults: number;
  children: number;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  onClose: () => void;
}

export interface ImageCarouselProps {
  onClose: () => void;
  images: {
    url: string;
    alt: string;
  }[];
  activeImageIndex: number;
}

export type ReserveModalProps = {
  venue: Venue;
  venueId: string | null;
  onVenueUpdate: (updatedVenue: Venue) => void;
  onClose: () => void;
};

export interface VenueModalProps {
  title: string;
  onClose: () => void;
  onSuccess: () => void;
  venue?: Venue;
  onVenueUpdated?: () => Promise<void>;
}
