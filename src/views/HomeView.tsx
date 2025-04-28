import { useVenues } from "../contexts/VenueContext";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import placeholderImage from "../assets/placeholder_venue.png";

const HomeView = () => {
  const { searchResults, searchQuery, error, loading } = useVenues();

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading venues...</p>;

  return (
    <section className="flex flex-col gap-10">
      <div>
        {searchQuery.length > 0 ? (
          <p>
            <span className="font-semibold">{searchResults.length}</span>{" "}
            {searchResults.length == 1 ? (
              <span>result</span>
            ) : (
              <span>results</span>
            )}{" "}
            for{" "}
            <span className="font-semibold text-ocean-700">
              "{searchQuery}"
            </span>
            .
          </p>
        ) : (
          <>
            <h1 className="text-5xl">Venues awaiting you</h1>
            <div className="flex justify-between">
              <h2 className="text-black text-[32px]">
                Check out our wide assortment of stays
              </h2>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="w-full grid grid-cols-4 gap-10">
        {searchResults.length > 0 ? (
          searchResults.map((venue) => (
            <Link to={`/venue/${venue.id}`} key={venue.id}>
              <div className="flex flex-col gap-3">
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
                    <span className="font-semibold">{venue.price} kr</span> per
                    night
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
