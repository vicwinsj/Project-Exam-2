import { API_HOLIDAZE_VENUES, API_KEY } from "../constants/api";

// Fetch venues

export const fetchVenue = async (venueId: string | undefined) => {
  try {
    const response = await fetch(
      `${API_HOLIDAZE_VENUES}/${venueId}?_owner=true&_bookings=true`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch venue details");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error instanceof Error && error;
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
      console.log(errorData);
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
