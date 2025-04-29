import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";

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
  const { accessToken } = useAuth();

  const { name } = useParams();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      document.title = `holidaze | ${profile.name}`;
    }
  }, [profile]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${name}?_bookings=true?_venues=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": "efffe6d5-fb4b-4a2c-a744-5dd884d1924e",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile details");
        }
        const data = await response.json();
        setProfile(data.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchProfile();
    } else {
      setError("Not authenticated");
      setLoading(false);
    }
  }, [name, accessToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="-mt-10 flex flex-col gap-10">
      <section className="relative flex flex-col">
        <div className="w-full h-70 rounded-xl overflow-hidden bg-neutral-500">
          <img
            className="size-full object-cover"
            src={profile?.banner.url}
            alt={profile?.banner.alt}
          />
        </div>
        <div className="absolute top-40 left-30 flex-[2] size-60 rounded-l-xl rounded-r-full  overflow-hidden bg-neutral-700 border-l-10 border-sunset-800">
          <img
            className="size-full object-cover"
            src={profile?.avatar.url}
            alt={profile?.avatar.alt}
          />
        </div>
        <div className="p-3 rounded-b-xl flex justify-between gap-3 w-full ">
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
            <Button className="h-10" variant="secondary">
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
  );
};

export default ProfileView;
