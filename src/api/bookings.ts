import { API_HOLIDAZE_BOOKINGS, API_KEY } from "../constants/api";

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
