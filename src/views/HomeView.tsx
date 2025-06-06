import { useVenues } from "../contexts/VenueContext";
import { Button } from "../components/form/Button";
import { VenueCard } from "../components/VenueCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterModal } from "../components/modals/FilterModal";
import { FilterLabel } from "../components/FilterLabel";
import { parse } from "date-fns";
import { HomeLoader } from "../components/loaders/SkeletonLoader";
import { ErrorMessage } from "../components/ErrorMessage";

const HomeView = () => {
  const [searchParams] = useSearchParams();
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    error,
    loading,
    reloadVenues,
  } = useVenues();

  useEffect(() => {
    document.title = "holidaze | Your dream destination is awaiting";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Book your perfect stay with Holidaze. Find unique venues, check availability, and explore unforgettable destinations."
      );
    }
  });

  const searchText = searchParams.get("q") || "";
  const rating = searchParams.get("minrating");
  const guests = searchParams.get("guests");
  const dateFrom = searchParams.get("from");
  const dateTo = searchParams.get("to");
  const minPrice = searchParams.get("minprice");
  const maxPrice = searchParams.get("maxprice");
  const wifi = searchParams.get("wifi") === "true";
  const pets = searchParams.get("pets") === "true";
  const parking = searchParams.get("parking") === "true";
  const breakfast = searchParams.get("breakfast") === "true";

  const dateRange = {
    from: dateFrom ? parse(dateFrom, "dd.MM.yyyy", new Date()) : undefined,
    to: dateTo ? parse(dateTo, "dd.MM.yyyy", new Date()) : undefined,
  };

  const [showFilter, setShowFilter] = useState(false);

  const handleOpenFilter = () => {
    setShowFilter(true);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  useEffect(() => {
    if (!loading && searchText !== searchQuery) {
      setSearchQuery(searchText);
    }
  }, [setSearchQuery, searchQuery, loading, searchText]);

  return (
    <section className="flex flex-col gap-10">
      {loading ? (
        <HomeLoader />
      ) : error ? (
        <ErrorMessage error={error} refetch={reloadVenues}></ErrorMessage>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            {searchText ||
            rating ||
            guests ||
            dateFrom ||
            dateTo ||
            minPrice ||
            maxPrice ||
            wifi ||
            pets ||
            parking ||
            breakfast ? (
              <>
                {searchText ? (
                  <h2 className="text-black text-xl">
                    Search results for{" "}
                    <span className="font-semibold text-ocean-700">
                      "{searchText}"
                    </span>
                  </h2>
                ) : (
                  <h2 className="text-black text-xl">Filtered by</h2>
                )}
              </>
            ) : (
              <div>
                <h1 className="text-3xl md:text-5xl">
                  Stunning venues awaiting you
                </h1>
                <h2 className="text-black text-lg md:text-[32px]">
                  Check out our wide assortment of stays
                </h2>
              </div>
            )}
            <Button
              onClick={handleOpenFilter}
              variant="outline"
              size="sm"
              className="self-end w-fit"
            >
              <FontAwesomeIcon icon={faSliders}></FontAwesomeIcon> Filter
            </Button>
            {(rating ||
              guests ||
              dateFrom ||
              dateTo ||
              minPrice ||
              maxPrice ||
              wifi ||
              pets ||
              parking ||
              breakfast) && (
              <div className="w-full flex flex-wrap gap-3">
                {dateFrom && dateTo && (
                  <FilterLabel>
                    {dateFrom}–{dateTo}
                  </FilterLabel>
                )}
                {minPrice && maxPrice && (
                  <FilterLabel>
                    {minPrice}–{maxPrice} NOK per night
                  </FilterLabel>
                )}
                {guests && <FilterLabel>Guests: {guests}</FilterLabel>}
                {rating && (
                  <FilterLabel>
                    Rating {">"} {rating}
                  </FilterLabel>
                )}
                {breakfast && <FilterLabel>Breakfast included</FilterLabel>}
                {wifi && <FilterLabel>Free wifi</FilterLabel>}
                {pets && <FilterLabel>Pet friendly</FilterLabel>}
                {parking && <FilterLabel>Free parking</FilterLabel>}
              </div>
            )}
          </div>
          {searchResults.length > 0 && (
            <div className="flex flex-col gap-10 justify-center">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {searchResults.map((venue) => (
                  <VenueCard key={venue.id} {...venue} />
                ))}
              </div>
              {(searchText ||
                rating ||
                guests ||
                dateFrom ||
                dateTo ||
                minPrice ||
                maxPrice ||
                wifi ||
                pets ||
                parking ||
                breakfast) && (
                <p className="flex gap-1 justify-center">
                  <span className="font-semibold">{searchResults.length}</span>{" "}
                  {searchResults.length == 1 ? (
                    <span>result.</span>
                  ) : (
                    <span>results.</span>
                  )}
                </p>
              )}
            </div>
          )}
          {showFilter && (
            <FilterModal
              onClose={handleCloseFilter}
              urlText={searchText}
              urlRating={rating}
              urlGuests={Number(guests)}
              urlWifi={wifi}
              urlBreakfast={breakfast}
              urlParking={parking}
              urlPets={pets}
              urlDateRange={dateRange}
              urlPriceRange={[Number(minPrice), Number(maxPrice)]}
            />
          )}
        </>
      )}
    </section>
  );
};

export default HomeView;
