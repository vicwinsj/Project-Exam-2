import { useVenues } from "../context/VenueContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import placeholderImage from "../assets/placeholder_venue.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faWifi,
  faMugSaucer,
  faSquareParking,
  faPaw,
  faCalendar,
  faPeopleRoof,
} from "@fortawesome/free-solid-svg-icons";

type Venue = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  maxGuests: number;
  location: {
    country: string;
    city: string;
  };
  media: {
    url: string;
    alt: string;
  }[];
};

const VenueView = () => {
  const { venueId } = useParams();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (venue) {
      document.title = `holidaze | ${venue.name}`;
    }
  }, [venue]);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${venueId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch venue details");
        }
        const data = await response.json();
        console.log(data.data);
        setVenue(data.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [venueId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!venue) return <p>No venue found.</p>;

  return (
    <section className="flex flex-col gap-10">
      <div className="rounded-2xl overflow-hidden w-full h-full">
        <img
          className="w-full h-130 object-cover"
          src={venue.media[0]?.url || placeholderImage}
          alt={venue.media[0]?.alt || "Picture of the venue"}
        />
      </div>
      <article className="flex flex-col gap-10 w-full">
        <div className="w-full flex justify-between">
          <h1 className="text-5xl">{venue.name}</h1>
          <div className="flex items-center gap-1 text-ocean-700">
            <FontAwesomeIcon icon={faStar} />
            <p className="font-semibold text-xl">{venue.rating}</p>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-10 flex-[2] p-3">
            <div className="flex justify-between">
              <div className="flex gap-3 items-center text-ocean-700">
                <i className="fa-solid fa-location-dot"></i>
                <p className="font-semibold text-black">
                  {venue.location?.city || "Unknown"},{" "}
                  {venue.location?.country || "Unknown"}
                </p>
              </div>
              <p>{venue.maxGuests} guests</p>
            </div>
            <hr className="text-ocean-700"></hr>
            <p>{venue.description}</p>
            <hr className="text-ocean-700"></hr>
            <div className="flex flex-col gap-10">
              <h2 className="text-black">Facilities of this venue</h2>
              <div className="flex">
                <ul className="flex-[1]">
                  <li className="flex items-center gap-3 text-ocean-700">
                    <div className="text-center w-10 text-2xl">
                      <FontAwesomeIcon icon={faWifi} />
                    </div>
                    <span className="text-black">Wifi</span>
                  </li>
                  <li className="flex items-center gap-3 text-ocean-700">
                    <div className="text-center w-10 text-2xl">
                      <FontAwesomeIcon icon={faSquareParking} />
                    </div>
                    <span className="text-black">Parking</span>
                  </li>
                </ul>
                <ul className="flex-[1]">
                  <li className="flex items-center gap-3 text-ocean-700">
                    <div className="text-center w-10 text-2xl">
                      <FontAwesomeIcon icon={faMugSaucer} />
                    </div>
                    <span className="text-black">Breakfast included</span>
                  </li>
                  <li className="flex items-center gap-3 text-ocean-700">
                    <div className="text-center w-10 text-2xl">
                      <FontAwesomeIcon icon={faPaw} />
                    </div>
                    <span className="text-black">Pet friendly</span>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="text-ocean-700"></hr>
            <div>
              <h2 className="text-black">Where you'll stay</h2>
              <img src=""></img>
            </div>
          </div>
          <div className="flex-[1] ">
            <div className="flex flex-col gap-10 w-full h-auto bg-air-100 rounded-xl drop-shadow-2xl p-10">
              <p className="text-xl">
                <strong>{venue.price} NOK</strong> for 1 night
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <Button variant="outline" className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                    <p>Check in</p>
                  </Button>
                  <strong>-</strong>
                  <Button variant="outline" className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                    <p>Check out</p>
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faPeopleRoof}></FontAwesomeIcon>Add
                    guest(s)
                  </Button>
                </div>
              </div>
              <Button variant="primary" size="lg">
                Reserve
              </Button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default VenueView;
