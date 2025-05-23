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
    <article className="transition-colors duration-300 border-1 border-neutral-300 hover:border-neutral-500 hover:bg-air-100 rounded-t-2xl overflow-hidden">
      <Link
        className="flex flex-col gap-3"
        to={`/venue/${venue.id}`}
        key={venue.id}
      >
        <div className="overflow-hidden w-full h-50">
          <img
            className="w-full h-full object-cover"
            src={venue.media[0]?.url || placeholderImage}
            alt={venue.media[0]?.alt || "Picture of the venue"}
          />
        </div>
        <div></div>
        <div className="px-3 pb-3">
          <h2 className="truncate">{venue.name || "Unnamed venue"}</h2>
          <p className="truncate">
            {venue.location?.city || "Unknown city"},{" "}
            {venue.location?.country || "Unknown country"}
          </p>
          <p>
            <span className="font-semibold">{venue.price} NOK</span> / night
          </p>
        </div>
      </Link>
    </article>
  );
};
