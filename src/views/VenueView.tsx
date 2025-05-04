// import { useVenues } from "../context/VenueContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/form/Button";
import placeholderImage from "../assets/placeholder_venue.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faStar,
  faWifi,
  faMugSaucer,
  faSquareParking,
  faPaw,
  faCalendar,
  faPeopleRoof,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import BookingModal from "../components/modals/BookingModal.tsx";

type Venue = {
  id: string;
  name: string;
  description: string;
  owner: { avatar: { url: string; alt: string }; name: string };
  price: number;
  rating: number;
  maxGuests: number;
  meta: {
    breakfast: boolean;
    wifi: boolean;
    pets: boolean;
    parking: boolean;
  };
  location: {
    country: string;
    city: string;
  };
  media: {
    url: string;
    alt: string;
  }[];
  bookings: [{ dateFrom: string; dateTo: string }];
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
          `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_owner=true`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch venue details");
        }
        const data = await response.json();
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

  const [showBookingCalendar, setShowBookingCalendar] = useState(false);

  const handleOpenBookingCalendar = () => {
    setShowBookingCalendar(true);
  };

  const handleCloseBookingCalendar = () => {
    setShowBookingCalendar(false);
  };

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [nights, setNights] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  console.log(selectedRange);

  const handleRangeSelect = (range: DateRange | undefined, nights: number) => {
    if (!range) {
      setSelectedRange(undefined);
      setNights(0);
      setStartDate(null);
      setEndDate(null);
      return;
    }

    setSelectedRange(range);
    setNights(nights);
    setStartDate(range.from ?? null);
    setEndDate(range.to ?? null);
  };

  const disabledDates = venue?.bookings?.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  const noFacilities =
    !venue?.meta.wifi &&
    !venue?.meta.parking &&
    !venue?.meta.breakfast &&
    !venue?.meta.pets;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!venue) return <p>No venue found.</p>;

  return (
    <>
      <article
        onClick={handleCloseBookingCalendar}
        className="flex flex-col gap-10"
      >
        <div className="rounded-t-[20px] overflow-hidden w-full h-full">
          <img
            className="w-full h-130 object-cover"
            src={venue.media[0]?.url || placeholderImage}
            alt={venue.media[0]?.alt || "Picture of the venue"}
          />
        </div>
        <div className="flex flex-col gap-10 w-full">
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
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p className="font-semibold text-black">
                    {venue.location?.city || "Unknown"},{" "}
                    {venue.location?.country || "Unknown"}
                  </p>
                </div>
                <p>{venue.maxGuests} guests</p>
              </div>
              <hr className="border-neutral-200"></hr>
              <div className="flex gap-3 items-center">
                <Link
                  to={`/profile/${venue.owner.name}`}
                  state={{ profile: venue.owner }}
                  className="size-15 rounded-l-lg overflow-hidden"
                >
                  <img
                    className="size-full object-cover"
                    src={venue.owner.avatar.url}
                    alt={venue.owner.avatar.alt}
                  ></img>
                </Link>
                <div>
                  <p>Hosted by</p>
                  <p className="font-semibold">{venue.owner.name}</p>
                </div>
              </div>
              <hr className="border-neutral-200"></hr>
              <p>{venue.description}</p>
              <hr className="border-neutral-200"></hr>
              {noFacilities ? null : (
                <>
                  <div className="flex flex-col gap-10">
                    <h2 className="text-black">Facilities of this venue</h2>
                    <ul className="grid grid-cols-2 grid-rows-2">
                      {venue.meta.wifi && (
                        <li className="flex items-center gap-3 text-ocean-700">
                          <div className="text-center w-10 text-2xl">
                            <FontAwesomeIcon icon={faWifi} />
                          </div>
                          <span className="text-black">Wifi</span>
                        </li>
                      )}
                      {venue.meta.parking && (
                        <li className="flex items-center gap-3 text-ocean-700">
                          <div className="text-center w-10 text-2xl">
                            <FontAwesomeIcon icon={faSquareParking} />
                          </div>
                          <span className="text-black">Parking</span>
                        </li>
                      )}
                      {venue.meta.breakfast && (
                        <li className="flex items-center gap-3 text-ocean-700">
                          <div className="text-center w-10 text-2xl">
                            <FontAwesomeIcon icon={faMugSaucer} />
                          </div>
                          <span className="text-black">Breakfast included</span>
                        </li>
                      )}
                      {venue.meta.pets && (
                        <li className="flex items-center gap-3 text-ocean-700">
                          <div className="text-center w-10 text-2xl">
                            <FontAwesomeIcon icon={faPaw} />
                          </div>
                          <span className="text-black">Pet friendly</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <hr className="border-neutral-200"></hr>
                </>
              )}
              <div className="flex flex-col gap-10">
                <h2 className="text-black">Where you'll stay</h2>
                <div className="w-full h-100 rounded-xl overflow-hidden">
                  <img
                    className="object-cover"
                    src={placeholderImage}
                    alt="Map"
                  ></img>
                </div>
              </div>
            </div>
            <div className="flex-[1] ">
              <div className="flex flex-col gap-10 w-full h-auto border-1 border-solid border-sunset-800 rounded-xl p-10">
                <p className="text-xl">
                  <strong>{venue.price * nights || venue.price} NOK</strong> for{" "}
                  {nights || 1} {nights > 1 ? "nights" : "night"}
                </p>
                <div className="flex flex-col gap-1">
                  <div className="relative flex items-center gap-1">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenBookingCalendar();
                      }}
                      variant="outline"
                      className="w-full flex items-center gap-1"
                    >
                      <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                      {nights > 0 && startDate && endDate ? (
                        <p>
                          {format(startDate, "MMM d")} –{" "}
                          {format(endDate, "MMM d")}
                        </p>
                      ) : (
                        <p>Select dates</p>
                      )}
                    </Button>
                    {showBookingCalendar && (
                      <div className="w-full drop-shadow-md absolute top-10 -left-45 z-10">
                        <BookingModal
                          disabledDates={disabledDates}
                          onClose={handleCloseBookingCalendar}
                          onRangeSelect={handleRangeSelect}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      className="w-full flex items-center gap-1"
                    >
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
        </div>
      </article>
    </>
  );
};

export default VenueView;
