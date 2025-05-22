import { Venue } from "./venue";

type Bookings = {
  id: string;
  name: string;
  dateFrom: Date;
  dateTo: Date;
  guests: number;
  venue: Venue;
};

type Venues = {
  id: string;
  name: string;
  description: string;
  media: {
    url: string;
    alt: string;
  }[];
  price: number;
  _count: {
    bookings: number;
  };
  location: {
    country: string;
    city: string;
  };
};

export type Profile = {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager?: boolean;
  venues?: Venues[];
  bookings?: Bookings[];
  _count?: {
    venues: number;
    bookings: number;
  };
};
