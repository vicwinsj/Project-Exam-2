import { Button } from "../components/form/Button";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import EditProfileModal from "../components/modals/EditProfileModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import VenueModal from "../components/modals/VenueModal";
import { Tabs } from "../components/Tabs";
import { VenueCard } from "../components/VenueCard";
import { format, differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";

type Venue = {
  id: string;
  name: string;
  price: number;
  location: {
    country: string;
    city: string;
  };
};

type Bookings = {
  id: string;
  name: string;
  dateFrom: Date;
  dateTo: Date;
  guests: number;
  venue: Venue;
};

type Venues = {
  id: string;
  name: string;
  description: string;
  media: {
    url: string;
    alt: string;
  }[];
  price: number;
  _count: {
    bookings: number;
  };
  location: {
    country: string;
    city: string;
  };
};

type ProfileCount = {
  venues: number;
  bookings: number;
};

type Profile = {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager?: boolean;
  venues?: Venues[];
  bookings?: Bookings[];
  _count?: ProfileCount;
};

const ProfileView = () => {
  const location = useLocation();
  const routeProfile = location.state?.profile;

  const { accessToken, username, profile: loggedInProfile } = useAuth();
  const { name: routeName } = useParams();
  const isLoggedInProfile = routeName === username;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("Saved Venues");

  const handleOpenEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
  };

  const handleOpenVenueModal = () => {
    setShowVenueModal(true);
  };

  const handleCloseVenueModal = () => {
    setShowVenueModal(false);
  };

  const [loading, setLoading] = useState<boolean>(true);
  //   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedInProfile && loggedInProfile) {
      setProfile(loggedInProfile);
      setLoading(false);
    } else {
      setProfile(routeProfile);
      setLoading(false);
    }
  }, [isLoggedInProfile, routeProfile, loggedInProfile]);

  useEffect(() => {
    if (profile) {
      document.title = `holidaze | ${profile.name}`;
    }
  }, [profile]);

  if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error}</p>;
  if (!accessToken) return <p>No profile available.</p>;

  return (
    <>
      <div className="flex flex-col gap-20">
        <section className="relative flex flex-col">
          <div className="w-full h-100 rounded-t-[20px] overflow-hidden">
            <img
              className="size-full object-cover"
              src={profile?.banner.url}
              alt={profile?.banner.alt}
            />
          </div>
          <div className="absolute top-80 left-30 size-60 rounded-l-[20px] overflow-hidden border-7 border-white">
            <img
              className="size-full object-cover"
              src={profile?.avatar.url}
              alt={profile?.avatar.alt}
            />
          </div>
          <div className="pt-3 flex justify-between gap-3 w-full">
            <div className="w-1/4"></div>
            <div className="w-1/2 min-h-30 flex flex-col gap-3">
              <div className="">
                <h1 className="flex gap-3 text-black text-2xl">
                  {profile?.name}
                  {profile?.venueManager && (
                    <span className="font-inter font-normal text-ocean-700">
                      Manager
                    </span>
                  )}
                </h1>
                <p className="font-semibold">{profile?.email}</p>
              </div>
              {profile?.bio && (
                <>
                  {" "}
                  <hr className="border-neutral-200"></hr>
                  <p>{profile?.bio}</p>
                </>
              )}
            </div>
            <div className="flex h-fit items-end">
              {isLoggedInProfile && (
                <Button
                  onClick={handleOpenEditProfile}
                  className="h-10"
                  variant="secondary"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </section>
        {isLoggedInProfile && (
          <section className="flex flex-col gap-10">
            <aside className="flex justify-center items-center gap-3 w-full h-full">
              {profile?.venueManager ? (
                <Tabs
                  tabs={["Saved Venues", "Your Bookings", "Your Venues"]}
                  onTabChange={(tab) => setCurrentTab(tab)}
                />
              ) : (
                <Tabs
                  tabs={["Saved Venues", "Your Bookings"]}
                  onTabChange={(tab) => setCurrentTab(tab)}
                />
              )}
              {profile?.venueManager && (
                <Button
                  onClick={handleOpenVenueModal}
                  className="flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>New Venue
                </Button>
              )}
            </aside>
            <div className="flex justify-center bg-white w-full rounded-xl h-full">
              {/* Saved Venues */}
              {currentTab === "Saved Venues" && <p>Here are your favs...</p>}

              {/* Your Bookings */}
              {currentTab === "Your Bookings" &&
              profile?.bookings &&
              profile?.bookings.length > 0 ? (
                <article className="w-2/3 border-neutral-300 border-1 bg-white rounded-xl">
                  <div className="text-sm font-semibold p-3 border-b-[.1px] border-neutral-300 text-ocean-700 flex w-full justify-between rounded-t-xl">
                    <p className="flex-3">Venue</p>
                    <p className="flex-1">City</p>
                    <p className="flex-2">Duration</p>
                    <p className="flex-1 flex justify-center">Guests</p>
                    <p className="flex-1">Total Cost</p>
                    <p className="flex-1">Manage</p>
                  </div>
                  {profile.bookings.map((booking) => (
                    <div key={booking.id} className="p-3 flex justify-between">
                      <Link
                        className="flex-3 truncate"
                        to={`/venue/${booking.venue.id}`}
                      >
                        <strong className="truncate">
                          {booking.venue.name}
                        </strong>
                      </Link>
                      <p className="flex-1 truncate">
                        {booking.venue.location.city || "Unknown"}
                      </p>
                      <p className="flex-2">
                        {format(booking.dateFrom, "MMM d")} –{" "}
                        {format(booking.dateTo, "MMM d y")}
                      </p>
                      <p className="flex-1 flex justify-center">
                        {booking.guests}
                      </p>
                      <strong className="flex-1">
                        {differenceInCalendarDays(
                          booking.dateTo,
                          booking.dateFrom
                        ) * booking.venue.price}{" "}
                        <span className="font-normal">NOK</span>
                      </strong>
                      <p className="flex-1">Delete</p>
                    </div>
                  ))}
                </article>
              ) : (
                currentTab === "Your Bookings" &&
                profile?.bookings &&
                profile?.bookings.length === 0 && <p>No bookings yet!</p>
              )}

              {/* Your Venues */}
              {currentTab === "Your Venues" &&
              profile?.venues &&
              profile?.venues.length > 0 ? (
                <div className="w-full grid grid-cols-4 gap-10">
                  {profile.venues.map((venue) => (
                    <VenueCard key={venue.id} {...venue} />
                  ))}{" "}
                </div>
              ) : (
                currentTab === "Your Venues" &&
                profile?.venues &&
                profile?.venues.length === 0 && (
                  <p>
                    You don't have any venues yet! Upload your venues to see
                    them here.
                  </p>
                )
              )}
            </div>
          </section>
        )}
      </div>
      {showEditProfile && <EditProfileModal onClose={handleCloseEditProfile} />}
      {showVenueModal && (
        <VenueModal title="Create venue" onClose={handleCloseVenueModal} />
      )}
    </>
  );
};

export default ProfileView;
