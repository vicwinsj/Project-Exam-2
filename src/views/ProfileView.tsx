import { Button } from "../components/form/Button";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import EditProfileModal from "../components/modals/EditProfileModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import VenueModal from "../components/modals/VenueModal";
import { Tabs } from "../components/Tabs";
import { VenueCard } from "../components/VenueCard";
import { format, differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toast } from "../components/toast/toast";
import { VenueLoader } from "../components/loaders/SkeletonLoader";
import { Profile } from "../types/profile";

const ProfileView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeProfile = location.state?.profile;

  const { username, profile: loggedInProfile } = useAuth();
  const { name: routeName } = useParams();
  const isLoggedInProfile = routeName === username;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("Your Bookings");

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

  useEffect(() => {
    if (isLoggedInProfile && loggedInProfile) {
      setProfile(loggedInProfile);
    } else {
      setProfile(routeProfile);
    }
  }, [isLoggedInProfile, routeProfile, loggedInProfile]);

  useEffect(() => {
    if (profile) {
      document.title = `holidaze | ${profile.name}`;
    } else {
      document.title = `holidaze | No profile found!`;
    }
    setLoading(false);
  }, [profile]);

  useEffect(() => {
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "View and manage your bookings, update your profile information, and track your hosting activity on Holidaze."
      );
    }
  });

  return (
    <>
      {loading ? (
        <VenueLoader />
      ) : !loading && !profile ? (
        <div className="p-3 lg:p-10 gap-10 flex flex-col justify-center items-center">
          <h1 className="text-3xl lg:text-5xl">No profile found!</h1>
          <div className="flex flex-col justify-center items-center gap-1">
            <p>
              We can't find any profile details related to this username. Are
              you sure this profile exists?
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={() => navigate(-1)}
              variant="primary"
              className="flex gap-1 items-center"
            >
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
              Go Back
            </Button>
            <Button variant="outline">
              <Link to={`mailto:${"manager@holidaze.com"}`}>Report Issue</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:gap-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="transition-all duration-300 hover:text-black/70 -my-1.5 sm:-my-5 flex gap-1 items-center w-fit"
            >
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
              Back
            </button>
            <section className="relative flex flex-col gap-1">
              <div className="w-full h-50 sm:h-80 md:h-100 rounded-t-[20px] overflow-hidden">
                <img
                  className="size-full object-cover"
                  src={profile?.banner.url}
                  alt={profile?.banner.alt}
                />
              </div>
              <div className="absolute top-40 left-15 size-30 sm:top-60 sm:left-25 sm:size-50 md:top-80 md:left-30 md:size-60 rounded-l-[20px] overflow-hidden border-7 border-white">
                <img
                  className="size-full object-cover"
                  src={profile?.avatar.url}
                  alt={profile?.avatar.alt}
                />
              </div>
              <div className="pt-3 flex justify-end gap-3 w-full">
                <div
                  className={`${!isLoggedInProfile && "gap-10 sm:gap-1"} flex flex-col-reverse lg:flex-row lg:gap-0 justify-between w-full sm:w-1/2 lg:w-[63%] xl:w-2/3`}
                >
                  <div
                    className={`${!isLoggedInProfile && "self-center sm:self-auto"} mx-1 mt-10 sm:mt-0 w-fit min-h-30 flex flex-col gap-3`}
                  >
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
                  <div className="flex h-fit justify-end items-center lg:justify-center lg:items-end">
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
              </div>
            </section>
            {isLoggedInProfile && (
              <section className="flex flex-col items-center border-1 border-neutral-300 rounded-b-xl">
                <aside className="bg-air-100 flex justify-between items-start sm:items-center gap-3 w-full h-full border-b-[.1px] p-3 border-neutral-300">
                  {profile?.venueManager ? (
                    <Tabs
                      tabs={["Your Bookings", "Your Venues"]}
                      onTabChange={(tab) => setCurrentTab(tab)}
                    />
                  ) : (
                    <Tabs
                      tabs={["Your Bookings"]}
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
                <>
                  {/* Your Bookings */}
                  {currentTab === "Your Bookings" &&
                  profile?.bookings &&
                  profile?.bookings.length > 0 ? (
                    <div className="flex justify-center h-full w-full p-3 sm:p-10">
                      <div className="w-full lg:w-2/3 border-1 border-neutral-300 bg-white rounded-t-xl">
                        <table className="w-full">
                          <thead className="w-full">
                            <tr className="w-full text-sm font-semibold border-b-1 border-neutral-300 text-ocean-700">
                              <th className="text-left px-3 py-2 w-3/12">
                                Venue
                              </th>
                              <th className="hidden sm:inline-block text-left px-3 py-2 w-2/12">
                                City
                              </th>
                              <th className="text-left px-3 py-2 w-3/12">
                                Dates
                              </th>
                              <th className="hidden sm:inline-block text-center px-3 py-2 w-2/12">
                                Guests
                              </th>
                              <th className="text-left px-3 py-2 w-2/12">
                                NOK
                              </th>
                            </tr>
                          </thead>
                          <tbody className="w-full">
                            {profile.bookings.map((booking) => (
                              <tr key={booking.id} className="w-full text-sm">
                                <td className="px-3 py-1 truncate">
                                  <Link to={`/venue/${booking.venue.id}`}>
                                    <strong className="truncate block max-w-[150px]">
                                      {booking.venue.name}
                                    </strong>
                                  </Link>
                                </td>
                                <td className="hidden sm:inline-block px-3 py-2 truncate">
                                  {booking.venue.location?.city || "Unknown"}
                                </td>
                                <td className="px-3 py-1">
                                  {format(booking.dateFrom, "dd.MM.yy")} –{" "}
                                  {format(booking.dateTo, "dd.MM.yy")}
                                </td>
                                <td className="hidden sm:inline-block px-3 py-2 w-full text-center">
                                  {booking.guests}
                                </td>
                                <td className="px-3 py-1">
                                  <strong>
                                    {booking.venue.price && (
                                      <>
                                        {differenceInCalendarDays(
                                          booking.dateTo,
                                          booking.dateFrom
                                        ) * booking.venue.price}
                                      </>
                                    )}
                                  </strong>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    currentTab === "Your Bookings" &&
                    profile?.bookings &&
                    profile?.bookings.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full w-full p-3 sm:p-10">
                        <p>
                          You don't have any bookings yet! Check out our wide
                          assortment of venues{" "}
                          <Link
                            className="font-semibold hover:underline"
                            to="/"
                          >
                            here
                          </Link>
                        </p>
                      </div>
                    )
                  )}

                  {/* Your Venues */}
                  {currentTab === "Your Venues" &&
                  profile?.venues &&
                  profile?.venues.length > 0 ? (
                    <div className="flex justify-center h-full w-full p-6 sm:p-10">
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {profile.venues.map((venue) => (
                          <VenueCard key={venue.id} {...venue} />
                        ))}{" "}
                      </div>
                    </div>
                  ) : (
                    currentTab === "Your Venues" &&
                    profile?.venues &&
                    profile?.venues.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full w-full p-3 sm:p-10">
                        <p>
                          You don't have any venues yet!{" "}
                          <button
                            className="font-semibold hover:underline"
                            type="button"
                            onClick={handleOpenVenueModal}
                          >
                            Upload
                          </button>{" "}
                          your venues to see them here.
                        </p>
                      </div>
                    )
                  )}
                </>
              </section>
            )}
          </div>
          {showEditProfile && (
            <EditProfileModal
              onClose={handleCloseEditProfile}
              onSuccess={() =>
                toast.custom(<Toast message="Profile successfully updated!" />)
              }
            />
          )}
          {showVenueModal && (
            <VenueModal
              title="Create venue"
              onClose={handleCloseVenueModal}
              onSuccess={() =>
                toast.custom(<Toast message="Venue successfully created!" />)
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default ProfileView;
