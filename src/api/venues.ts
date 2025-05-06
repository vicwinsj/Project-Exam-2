import {
  API_HOLIDAZE_BOOKINGS,
  API_HOLIDAZE_VENUES,
  API_KEY,
} from "../constants/api";

// Fetch venues
// Fetch venue/name
// Post venue
// Update venue
// Edit booking

interface Media {
  url: string;
  alt: string;
}

interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
}

export const createVenue = async (
  name: string,
  description: string,
  media: Media[],
  price: number,
  maxGuests: number,
  rating: number,
  meta: Meta,
  location: Location,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${API_HOLIDAZE_VENUES}/?_owner=true&_bookings=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({
          name,
          description,
          media,
          price,
          maxGuests,
          rating,
          meta,
          location,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create venue");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred while attempting to create venue");
  }
};

export const createBooking = async (
  dateFrom: Date,
  dateTo: Date,
  guests: number,
  venueId: string,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${API_HOLIDAZE_BOOKINGS}/?_customer=true&_venue=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({
          dateFrom: dateFrom.toISOString(),
          dateTo: dateTo.toISOString(),
          guests,
          venueId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to book");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred while booking");
  }
};
