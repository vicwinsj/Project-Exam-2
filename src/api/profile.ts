import { API_HOLIDAZE_PROFILES, API_KEY } from "../constants/api";

export const fetchProfile = async (name: string, accessToken: string) => {
  try {
    const response = await fetch(
      `${API_HOLIDAZE_PROFILES}/${name}?_bookings=true&_venues=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile details");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred while fetching profile");
  }
};

type Avatar = {
  url: string;
  alt: string;
};

type Banner = {
  url: string;
  alt: string;
};

export const editProfile = async (
  name: string,
  userData: {
    banner: Banner;
    avatar: Avatar;
    bio: string;
    venueManager: boolean;
  },
  accessToken: string
) => {
  try {
    const response = await fetch(`${API_HOLIDAZE_PROFILES}/${name}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred while updating profile");
  }
};
