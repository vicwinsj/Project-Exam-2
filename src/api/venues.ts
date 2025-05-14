import { API_HOLIDAZE_VENUES, API_KEY } from "../constants/api";

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
  _count?: {
    bookings: number;
  };
};

export const fetchVenues = async () => {
  try {
    const response = await fetch(
      `${API_HOLIDAZE_VENUES}?sort=created&sortOrder=desc&wifi=true&limit=100&maxGuests=10`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error instanceof Error ? error : "Failed to fetch venues";
  }
};

export const fetchSearch = async (query: string) => {
  try {
    const response = await fetch(
      `${API_HOLIDAZE_VENUES}/search?q=${query}&sort=created&sortOrder=desc&limit=100`,
      {
        headers: {
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message || "Search failed");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Search fetch failed");
  }
};

export const fetchVenue = async (venueId: string | undefined) => {
  try {
    const response = await fetch(
      `${API_HOLIDAZE_VENUES}/${venueId}?_owner=true&_bookings=true`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error instanceof Error ? error : "Failed to fetch venue details";
  }
};

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
    const response = await fetch(`${API_HOLIDAZE_VENUES}`, {
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error instanceof Error ? error : "Failed to create venue";
  }
};

export const updateVenue = async (
  venueId: string,
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
    const response = await fetch(`${API_HOLIDAZE_VENUES}/${venueId}`, {
      method: "PUT",
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error instanceof Error ? error : "Failed to update venue";
  }
};

export const deleteVenue = async (venueId: string, accessToken: string) => {
  try {
    const response = await fetch(`${API_HOLIDAZE_VENUES}/${venueId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    const text = await response.text();
    if (text) {
      const data = JSON.parse(text);
      return data.data;
    }
    return true;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred while attempting to delete venue");
  }
};
