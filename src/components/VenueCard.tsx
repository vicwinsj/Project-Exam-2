import { Link } from "react-router-dom";
import placeholderImage from "../assets/placeholder_venue.png";

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

export const VenueCard = (venue: Venue) => {
  return (
    <article>
      <Link
        className="flex flex-col gap-3"
        to={`/venue/${venue.id}`}
        key={venue.id}
      >
        <div className="rounded-t-2xl overflow-hidden w-full h-50">
          <img
            className="w-full h-full object-cover"
            src={venue.media[0]?.url || placeholderImage}
            alt={venue.media[0]?.alt || "Picture of the venue"}
          />
        </div>
        <div></div>
        <div>
          <h2 className="truncate">{venue.name}</h2>
          <p className="truncate">
            {venue.location?.city || "Unknown"},{" "}
            {venue.location?.country || "Unknown"}
          </p>
          <p>
            <span className="font-semibold">{venue.price} kr</span> per night
          </p>
        </div>
      </Link>
    </article>
  );
};
