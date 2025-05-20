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
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import VenueModal from "../components/modals/VenueModal.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { fetchVenue } from "../api/venues.ts";
import { DeleteModal } from "../components/modals/DeleteModal.tsx";
import { CustomerBookings } from "../components/CustomerBookings.tsx";
import { Toast } from "../components/toast/toast.tsx";
import toast from "react-hot-toast";
import { ImageCarousel } from "../components/modals/ImageCarousel.tsx";
import { VenueLoader } from "../components/loaders/SkeletonLoader.tsx";
import { ReserveModal } from "../components/modals/ReserveModal.tsx";
import { Venue } from "../types/venue.ts";

const VenueView = () => {
  const { profile } = useAuth();

  const navigate = useNavigate();
  const { venueId } = useParams();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showImageCarousel, setShowImageCarousel] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleOpenImageCarousel = (index: number) => {
    setShowImageCarousel(true);
    setActiveImageIndex(index);
  };

  const handleCloseImageCarousel = () => {
    setShowImageCarousel(false);
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

  const [showVenueModal, setShowVenueModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
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

  const noFacilities =
    !venue?.meta.wifi &&
    !venue?.meta.parking &&
    !venue?.meta.breakfast &&
    !venue?.meta.pets;

  if (loading) return <VenueLoader />;
  if (error) return <p>Error: {error}</p>;
  if (!loading && !venue) return <p>No venue found.</p>;

  return (
    <>
      {venue && (
        <>
          <article className="w-full h-full flex flex-col gap-10">
            <button
              type="button"
              onClick={handleGoBack}
              className="flex gap-1 items-center w-fit"
            >
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
              Back
            </button>
            <div className="flex h-100 gap-3 rounded-t-[20px] overflow-hidden w-full">
              <div
                onClick={() => {
                  if (venue.media) {
                    handleOpenImageCarousel(0);
                  }
                }}
                className="relative cursor-pointer flex-2 h-full"
              >
                <img
                  className=" w-full h-full object-cover"
                  src={venue.media[0]?.url || placeholderImage}
                  alt={venue.media[0]?.alt || "Picture of the venue"}
                />
                <div className="absolute inset-0 w-full-h-full hover:bg-white/10"></div>
              </div>
              {venue.media.length > 1 && (
                <div className="flex-1 flex flex-col gap-3 h-full">
                  <div
                    onClick={() => {
                      if (venue.media) {
                        handleOpenImageCarousel(1);
                      }
                    }}
                    className="relative cursor-pointer w-full h-1/2"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={venue.media[1]?.url || placeholderImage}
                      alt={venue.media[1]?.alt || "Picture of the venue"}
                    />
                    <div className="absolute inset-0 w-full-h-full hover:bg-white/10"></div>
                  </div>
                  {venue.media.length > 2 && (
                    <div
                      onClick={() => {
                        if (venue.media) {
                          handleOpenImageCarousel(2);
                        }
                      }}
                      className="relative cursor-pointer w-full h-1/2"
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={venue.media[2]?.url || placeholderImage}
                        alt={venue.media[2]?.alt || "Picture of the venue"}
                      />
                      <div className="absolute inset-0 w-full-h-full hover:bg-white/10"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-10 w-full">
              <div className="w-full flex items-start justify-between">
                <h1 className="flex-2 w-full text-5xl truncate">
                  {venue.name || "Unnamed venue"}
                </h1>
                {isOwnVenue && (
                  <div className="w-full flex-1 flex justify-end items-center gap-3">
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
                <div className="flex-2 w-full sm:w-2/3 flex flex-col gap-10 p-3">
                  <ul className="flex items-center w-full gap-3">
                    <li className="flex max-w-3/4 gap-1 items-center text-ocean-700">
                      <FontAwesomeIcon className="w-fit" icon={faLocationDot} />
                      <strong className="max-w-full truncate">
                        {venue.location?.city || "Unknown city"}
                      </strong>
                      <strong className="w-fit -ml-1">,</strong>
                      <strong className="max-w-full truncate">
                        {venue.location?.country || "Unknown country"}
                      </strong>
                    </li>
                    <p className="w-fit">&#x2022;</p>
                    <li className="w-fit">{venue.maxGuests} guests</li>
                    <p className="w-fit">&#x2022;</p>
                    <li className="w-fit flex items-center gap-1 text-ocean-700">
                      <FontAwesomeIcon className="" icon={faStar} />
                      <p className="font-semibold">{venue.rating}</p>
                    </li>
                  </ul>
                  <hr className="border-neutral-300"></hr>
                  <div className="w-full flex gap-3 items-center">
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
                    <div className="w-full">
                      <p>Hosted by</p>
                      <p className="w-full font-semibold">{venue.owner.name}</p>
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
                              <span className="text-black">
                                Breakfast included
                              </span>
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
                <aside className="sm:flex-1 w-full">
                  {isOwnVenue ? (
                    <CustomerBookings
                      bookings={venue.bookings}
                    ></CustomerBookings>
                  ) : (
                    <ReserveModal
                      venue={venue}
                      venueId={venueId}
                      onVenueUpdate={setVenue}
                    ></ReserveModal>
                  )}
                </aside>
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
          {showImageCarousel && (
            <ImageCarousel
              images={venue.media}
              onClose={handleCloseImageCarousel}
              activeImageIndex={activeImageIndex}
            />
          )}
        </>
      )}
    </>
  );
};

export default VenueView;
