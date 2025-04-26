import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
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
  media: [
    {
      url: string;
      alt: string;
    },
  ];
};

const HomeView = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [searchResults, setSearchResults] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }
        const data = await response.json();
        setVenues(data.data);
        setSearchResults(data.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occured");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setSearchResults(venues);
      return;
    }
    const filtered = venues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(query.toLowerCase()) ||
        venue.location.city.toLowerCase().includes(query.toLowerCase()) ||
        venue.location.country.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="flex flex-col gap-10">
      <div className="">
        <h1 className="text-5xl">Venues awaiting you</h1>
        <div className="flex justify-between">
          <h2 className="text-black text-[32px]">
            Check out our wide assortment of stays
          </h2>
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-10">
        {searchResults.length > 0 ? (
          searchResults.map((venue) => (
            <Link to={`/venue/${venue.id}`}>
              <div key={venue.id} className="flex flex-col gap-3">
                <div className="rounded-2xl overflow-hidden w-full h-50">
                  <img
                    className="w-full h-full object-cover"
                    src={venue.media[0]?.url || placeholderImage}
                    alt={venue.media[0]?.alt || "Picture of the venue"}
                  />
                </div>
                <div>
                  <h2 className="truncate">{venue.name}</h2>
                  <p>
                    {venue.location?.city || "Unknown"},{" "}
                    {venue.location?.country || "Unknown"}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {venue.price} {"kr"}
                    </span>{" "}
                    per night
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No venues found.</p>
        )}
      </div>
    </section>
  );
};

export default HomeView;
