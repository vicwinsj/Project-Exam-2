export type Venue = {
  id?: string;
  name?: string;
  description?: string;
  owner?: { avatar: { url: string; alt: string }; name: string };
  price?: number;
  rating?: number;
  maxGuests?: number;
  meta?: Meta;
  location?: Location;
  media?: Media[];
  bookings?: Bookings[];
};

interface Bookings {
  id: string;
  dateFrom: Date;
  dateTo: Date;
  guests: number;
  customer: {
    name: string;
    email: string;
  };
}

export interface Media {
  url: string;
  alt: string;
}

export interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface Location {
  address?: string;
  city: string;
  zip?: string;
  country: string;
}
