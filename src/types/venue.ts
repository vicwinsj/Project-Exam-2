export type Venue = {
  id: string;
  name: string;
  description: string;
  owner: { avatar: { url: string; alt: string }; name: string };
  price: number;
  rating: number;
  maxGuests: number;
  meta: {
    breakfast: boolean;
    wifi: boolean;
    pets: boolean;
    parking: boolean;
  };
  location: {
    address: string;
    city: string;
    country: string;
    zip: string;
  };
  media: {
    url: string;
    alt: string;
  }[];
  bookings: [
    {
      id: string;
      dateFrom: Date;
      dateTo: Date;
      guests: number;
      customer: {
        name: string;
        email: string;
      };
    },
  ];
};
