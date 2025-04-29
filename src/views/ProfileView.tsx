import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Profile = {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
};

const ProfileView = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState<Venue | null>(null);
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
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch venue details");
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
    fetchProfile();
  }, [name]);

  return (
    <div className="-mt-10 flex flex-col gap-10">
      <section className="relative flex flex-col">
        <div className="w-full h-70 rounded-xl overflow-hidden bg-neutral-500">
          <img className="size-full object-cover" src="" />
        </div>
        <div className="absolute top-40 left-30 flex-[2] size-60 rounded-full overflow-hidden bg-neutral-700 border-2 border-solid border-sunset-800">
          <img className="size-full object-cover" src="" />
        </div>
        <div className="p-3 rounded-xl flex justify-end gap-10 w-full bg-white/10">
          <div className="w-1/3"></div>
          <div className="w-1/2 flex flex-col gap-1">
            <h1>Profile name</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
              pariatur provident nam sint sapiente beatae nisi ad. Beatae unde
              iusto, quibusdam natus aut quasi, impedit magnam culpa nobis
              incidunt non?
            </p>
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
