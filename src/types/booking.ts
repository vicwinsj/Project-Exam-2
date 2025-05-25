import { Venue } from "./venue";

export type ReserveBookingProps = {
  venue: Venue;
  onVenueUpdate: (updatedVenue: Venue) => void;
  isInModal?: boolean;
  onClose?: () => void;
};
