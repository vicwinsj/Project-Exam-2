// import { useVenues } from "../context/VenueContext";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import CalendarModal from "../components/modals/CalendarModal.tsx";
import GuestsModal from "../components/modals/GuestsModal.tsx";
import VenueModal from "../components/modals/VenueModal.tsx";
import { createBooking } from "../api/bookings.ts";
import { useAuth } from "../contexts/AuthContext.tsx";
import { fetchVenue } from "../api/venues.ts";
import { DeleteModal } from "../components/modals/DeleteModal.tsx";
import { CustomerBookings } from "../components/CustomerBookings.tsx";
import { Toast } from "../components/toast/toast.tsx";
import toast from "react-hot-toast";
import LoginModal from "../components/modals/LoginModal.tsx";
import { ImageCarousel } from "../components/modals/ImageCarousel.tsx";

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
    address: string;
    city: string;
    country: string;
    zip: string;
  };
  media: {
    url: string;
    alt: string;
  }[];
  bookings: [
    {
      id: string;
      dateFrom: Date;
      dateTo: Date;
      guests: number;
      customer: {
        name: string;
        email: string;
      };
    },
  ];
};

const VenueView = () => {
  const { accessToken, profile, refreshProfile } = useAuth();

  const navigate = useNavigate();
  const { venueId } = useParams();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showImageCarousel, setShowImageCarousel] = useState(false);

  const handleOpenImageCarousel = () => {
    setShowImageCarousel(true);
  };

  const handleCloseImageCarousel = () => {
    setShowImageCarousel(false);
  };

  const handleOpenLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const updateVenue = async () => {
    const updatedVenue = await fetchVenue(venueId);
    setVenue(updatedVenue);
  };

  useEffect(() => {
    if (venue) {
      document.title = `holidaze | ${venue.name}`;
    }
  }, [venue]);

  useEffect(() => {
    const loadVenueDetails = async () => {
      try {
        const venueDetails = await fetchVenue(venueId);
        if (venueDetails) {
          setVenue(venueDetails);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    loadVenueDetails();
  }, [venueId]);

  const isOwnVenue = venue?.owner.name === profile?.name;

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showAddPeopleModal, setShowAddPeopleModal] = useState(false);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpenCalendarModal = () => {
    setShowCalendarModal(true);
  };
  const handleCloseCalendarModal = () => {
    setShowCalendarModal(false);
  };

  const handleOpenAddPeopleModal = () => {
    setShowAddPeopleModal(true);
  };
  const handleCloseAddPeopleModal = () => {
    setShowAddPeopleModal(false);
  };

  const handleOpenVenueModal = () => {
    setShowVenueModal(true);
  };

  const handleCloseVenueModal = () => {
    setShowVenueModal(false);
  };

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  type ErrorState = {
    date?: string;
  };

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [nights, setNights] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<ErrorState>({});

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

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const totalGuests = adults + children;

  const handleReservation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validateForm = () => {
      const newErrors: ErrorState = {};

      if (startDate == endDate) {
        newErrors.date = "You need to book at least one night.";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (
      validateForm() &&
      startDate &&
      endDate &&
      venueId &&
      accessToken &&
      startDate != endDate
    )
      try {
        const result = await createBooking(
          startDate,
          endDate,
          totalGuests,
          venueId,
          accessToken
        );
        if (result) {
          if (errors) {
            setErrors({});
          }
          await refreshProfile();
          await updateVenue();
          setSelectedRange(undefined);
          toast.custom(
            <Toast message="Venue has been booked. Enjoy your stay!" />
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          // setServerError(error.message);
        }
      }
  };

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
        onClick={() => {
          handleCloseCalendarModal();
          handleCloseAddPeopleModal();
        }}
        className="flex flex-col gap-10"
      >
        <button
          type="button"
          onClick={handleGoBack}
          className="flex gap-1 items-center w-fit"
        >
          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          Back
        </button>
        <div className="flex h-130 gap-3 rounded-t-[20px] overflow-hidden w-full">
          <div
            onClick={venue.media && handleOpenImageCarousel}
            className="cursor-pointer flex-3 h-full"
          >
            <img
              className="w-full h-full object-cover"
              src={venue.media[0]?.url || placeholderImage}
              alt={venue.media[0]?.alt || "Picture of the venue"}
            />
          </div>
          {venue.media.length > 1 && (
            <div className="flex-1 flex flex-col gap-3 h-full">
              <div
                onClick={venue.media && handleOpenImageCarousel}
                className="cursor-pointer w-full h-1/2"
              >
                <img
                  className="w-full h-full object-cover"
                  src={venue.media[1]?.url || placeholderImage}
                  alt={venue.media[1]?.alt || "Picture of the venue"}
                />
              </div>
              {venue.media.length > 2 && (
                <div
                  onClick={venue.media && handleOpenImageCarousel}
                  className="cursor-pointer w-full h-1/2"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={venue.media[2]?.url || placeholderImage}
                    alt={venue.media[2]?.alt || "Picture of the venue"}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-10 w-full">
          <div className="w-full flex items-start justify-between">
            <h1 className="flex-2 text-5xl">{venue.name || "Unnamed venue"}</h1>
            {isOwnVenue && (
              <div className="flex-1 flex justify-end items-center gap-3">
                <Button
                  onClick={handleOpenDeleteModal}
                  className=""
                  variant="delete"
                >
                  Delete Venue
                </Button>
                <Button onClick={handleOpenVenueModal} variant="secondary">
                  Edit Venue
                </Button>
              </div>
            )}
          </div>
          <div className="w-full flex gap-10">
            <div className="flex-2 flex flex-col gap-10 p-3 overflow-hidden">
              <ul className="flex gap-3">
                <li className="flex gap-1 items-center text-ocean-700">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p className="font-semibold text-black">
                    {venue.location?.city || "Unknown city"},{" "}
                    {venue.location?.country || "Unknown country"}
                  </p>
                </li>
                <p>&#x2022;</p>
                <li>{venue.maxGuests} guests</li>
                <p>&#x2022;</p>
                <li className="flex items-center gap-1 text-ocean-700">
                  <FontAwesomeIcon className="" icon={faStar} />
                  <p className="font-semibold">{venue.rating}</p>
                </li>
              </ul>
              <hr className="border-neutral-300"></hr>
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
              <hr className="border-neutral-300"></hr>
              <p className="w-full">
                {venue.description || (
                  <span className="italic">
                    This venue doesn't have a description yet.
                  </span>
                )}
              </p>
              <hr className="border-neutral-300"></hr>
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
                  <hr className="border-neutral-300"></hr>
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
            {isOwnVenue ? (
              <CustomerBookings bookings={venue.bookings}></CustomerBookings>
            ) : (
              <aside className="flex-1">
                <form
                  onSubmit={handleReservation}
                  className="flex flex-col gap-10 w-full h-auto border-1 border-neutral-300 rounded-xl p-10"
                >
                  <h3 className="text-xl text-black">
                    {venue.price * nights || venue.price} NOK{" "}
                    <span className="font-normal">
                      for {nights || 1} {nights > 1 ? "nights" : "night"}
                    </span>
                  </h3>
                  <div className="flex flex-col gap-1">
                    <div className="relative">
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCalendarModal();
                          if (showAddPeopleModal) {
                            handleCloseAddPeopleModal();
                          }
                          if (showCalendarModal) {
                            handleCloseCalendarModal();
                          }
                        }}
                        variant="outline"
                        className={`w-full flex items-center gap-3 ${errors.date && "border-red-500"}`}
                      >
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="w-1/12"
                        ></FontAwesomeIcon>
                        {nights > 0 && startDate && endDate ? (
                          <p>
                            {format(startDate, "MMM d")} –{" "}
                            {format(endDate, "MMM d")}
                          </p>
                        ) : (
                          <p>Select dates</p>
                        )}
                      </Button>
                      {errors.date && (
                        <p className="mt-1 mb-3 text-red-500 text-sm">
                          {errors.date}
                        </p>
                      )}
                      {showCalendarModal && (
                        <div className="w-full drop-shadow-md absolute top-10 -left-45 z-10">
                          <CalendarModal
                            disabledDates={disabledDates}
                            onClose={handleCloseCalendarModal}
                            onRangeSelect={handleRangeSelect}
                            selectedRange={selectedRange}
                            nights={nights}
                          />
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAddPeopleModal();
                          if (showCalendarModal) {
                            handleCloseCalendarModal();
                          }
                          if (showAddPeopleModal) {
                            handleCloseAddPeopleModal();
                          }
                        }}
                        variant="outline"
                        className="w-full flex items-center gap-3"
                      >
                        <FontAwesomeIcon
                          icon={faPeopleRoof}
                          className="w-1/12"
                        ></FontAwesomeIcon>
                        {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
                      </Button>
                      {showAddPeopleModal && (
                        <div className="w-full drop-shadow-md absolute top-10 left-0 z-10">
                          <GuestsModal
                            guestLimit={venue.maxGuests}
                            adults={adults}
                            children={children}
                            setAdults={setAdults}
                            setChildren={setChildren}
                            onClose={handleCloseAddPeopleModal}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {accessToken ? (
                    <Button type="submit" variant="primary" size="lg">
                      Reserve
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleOpenLogin}
                      variant="primary"
                      size="lg"
                    >
                      Login to reserve
                    </Button>
                  )}
                </form>
              </aside>
            )}
          </div>
        </div>
      </article>
      {showVenueModal && (
        <VenueModal
          venue={venue}
          title="Edit venue"
          onClose={handleCloseVenueModal}
          onSuccess={() =>
            toast.custom(<Toast message="Venue successfully updated!" />)
          }
          onVenueUpdated={updateVenue}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          venueId={venue.id}
          venueName={venue.name}
          onClose={handleCloseDeleteModal}
          onSuccess={() =>
            toast.custom(<Toast message="Venue successfully deleted!" />)
          }
        />
      )}
      {showLogin && <LoginModal onClose={handleCloseLogin} />}
      {showImageCarousel && (
        <ImageCarousel
          images={venue.media}
          onClose={handleCloseImageCarousel}
        />
      )}
    </>
  );
};

export default VenueView;
