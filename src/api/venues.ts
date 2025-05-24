import { API_HOLIDAZE_VENUES, API_KEY } from "../constants/api";
import { Venue } from "../types/venue";

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

export const fetchVenue = async (id: string) => {
  try {
    const response = await fetch(
      `${API_HOLIDAZE_VENUES}/${id}?_owner=true&_bookings=true`
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

export const createVenue = async (accessToken: string, venue: Venue) => {
  try {
    const response = await fetch(`${API_HOLIDAZE_VENUES}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(venue),
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
  id: string,
  venue: Venue,
  accessToken: string
) => {
  try {
    const response = await fetch(`${API_HOLIDAZE_VENUES}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(venue),
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

export const deleteVenue = async (id: string, accessToken: string) => {
  try {
    const response = await fetch(`${API_HOLIDAZE_VENUES}/${id}`, {
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
