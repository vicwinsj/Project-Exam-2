import { useVenues } from "../contexts/VenueContext";
import { Button } from "../components/form/Button";
import { VenueCard } from "../components/VenueCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const HomeView = () => {
  const [searchParams] = useSearchParams();
  const { handleSearch, searchQuery, searchResults, error, loading } =
    useVenues();

  const query = searchParams.get("q") || "";
  // const filter = searchParams.get("filter") || "all";

  useEffect(() => {
    if (!loading && query !== searchQuery) {
      handleSearch(query);
    }
  }, [handleSearch, loading, query, searchQuery]);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading venues...</p>;

  return (
    <section className="flex flex-col gap-10">
      <div>
        {query.length > 0 ? (
          <div className="flex justify-between">
            <h2 className="text-black text-[32px]">
              Search Results for "{query}"
            </h2>
            <Button variant="outline" className="w-fit">
              <FontAwesomeIcon icon={faSliders}></FontAwesomeIcon> Filter
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-5xl">Venues awaiting you</h1>

            <h2 className="text-black text-[32px]">
              Check out our wide assortment of stays
            </h2>
          </>
        )}
      </div>
      {searchResults.length >= 0 && (
        <div className="flex flex-col gap-10 justify-center">
          <div className="w-full grid grid-cols-4 gap-10">
            {searchResults.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </div>
          {query.length > 0 && (
            <p className="flex gap-1 justify-center">
              <span className="font-semibold">{searchResults.length}</span>{" "}
              {searchResults.length == 1 ? (
                <span>result</span>
              ) : (
                <span>results</span>
              )}{" "}
              for{" "}
              <span className="font-semibold text-ocean-700">
                "{query}"<span className="text-black">.</span>
              </span>
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default HomeView;
