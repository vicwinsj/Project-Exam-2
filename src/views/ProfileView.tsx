import { Button } from "../components/form/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { fetchProfile } from "../api/profile";
import EditProfileModal from "../components/modals/EditProfileModal";

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
  venueManager: boolean;
};

const ProfileView = () => {
  const { accessToken, authLoading } = useAuth();

  const { name } = useParams();

  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleOpenEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
  };

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      document.title = `holidaze | ${profile.name}`;
    }
  }, [profile]);

  useEffect(() => {
    if (authLoading) return;

    const loadProfile = async () => {
      try {
        const data = await fetchProfile(name!, accessToken!);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      loadProfile();
    } else {
      setError("Not authenticated");
      setLoading(false);
    }
  }, [name, accessToken, authLoading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <>
      <div className="flex flex-col gap-10">
        <section className="relative flex flex-col">
          <div className="w-full h-100 rounded-t-[20px] overflow-hidden">
            <img
              className="size-full object-cover"
              src={profile?.banner.url}
              alt={profile?.banner.alt}
            />
          </div>
          <div className="absolute top-80 left-30 size-60 rounded-l-full rounded-r-xl overflow-hidden border-3 border-sunset-800">
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
                <h1 className="text-black text-2xl">{profile?.name}</h1>
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
            <div className="flex items-end h-fit">
              <Button
                onClick={handleOpenEditProfile}
                className="h-10"
                variant="secondary"
              >
                Edit
              </Button>
            </div>
          </div>
        </section>
        <section className="flex flex-col">
          <aside className="flex p-3 gap-3 w-full h-full">
            <Button variant="outline">Venues</Button>
            <Button variant="outline">Bookings</Button>
            <Button variant="outline">Favorites</Button>
          </aside>
          <div className="bg-white w-full rounded-xl h-50 border-sunset-800 border-1"></div>
        </section>
      </div>
      {showEditProfile && (
        <EditProfileModal
          onClose={handleCloseEditProfile}
          name={profile?.name}
          avatar={profile?.avatar}
          banner={profile?.banner}
          bio={profile?.bio}
          manager={profile?.venueManager}
        ></EditProfileModal>
      )}
    </>
  );
};

export default ProfileView;
