import ModalWrapper from "./ModalWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faAngleDown,
  faAngleUp,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "../DateRangePicker";
import { Button } from "../form/Button";
import { useState, useEffect } from "react";
import { useVenues } from "../../contexts/VenueContext";
import PriceRangeSlider from "../PriceRangeSlider";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

type FilterModalProps = {
  onClose: () => void;
  urlText?: string;
  urlRating?: string | null;
};

export const FilterModal = ({
  onClose,
  urlText,
  urlRating,
}: FilterModalProps) => {
  const navigate = useNavigate();
  const { setFilters } = useVenues();
  const [dateRange, setDateRange] = useState<DateRange>();
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [guests, setGuests] = useState(1);
  const [selectedRating, setSelectedRating] = useState(urlRating || "");

  useEffect(() => {
    setSelectedRating(urlRating || "");
  }, [urlRating]);

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const guestLimit = 100;

  const increment = () => {
    if (guests >= guestLimit) return;
    setGuests(guests + 1);
  };

  const decrement = () => {
    if (guests > 1) setGuests(guests - 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const searchText = formData.get("search")?.toString().trim();
    const wifi = formData.get("wifi") === "on";
    const parking = formData.get("parking") === "on";
    const breakfast = formData.get("breakfast") === "on";
    const pets = formData.get("pets") === "on";
    const rating = Number(formData.get("rating"));
    const searchParams = new URLSearchParams();

    if (searchText) {
      searchParams.set("q", searchText);
    }
    if (dateRange?.from && dateRange?.to) {
      searchParams.set("from", format(dateRange.from, "dd.MM.yyyy"));
      searchParams.set("to", format(dateRange.to, "dd.MM.yyyy"));
    }
    if (priceRange) {
      searchParams.set("minprice", String(priceRange[0]));
      searchParams.set("maxprice", String(priceRange[1]));
    }
    if (guests > 1) searchParams.set("guests", String(guests));
    if (wifi) searchParams.set("wifi", "true");
    if (parking) searchParams.set("parking", "true");
    if (breakfast) searchParams.set("breakfast", "true");
    if (pets) searchParams.set("pets", "true");
    if (rating > 1) searchParams.set("minrating", String(rating));

    const query = searchParams.toString();
    navigate(query ? `/search?${query}` : "/");

    setFilters({
      searchText: searchText,
      dateRange: dateRange,
      priceRange: priceRange,
      guests,
      wifi: wifi,
      parking: parking,
      breakfast: breakfast,
      pets: pets,
      rating: rating,
    });

    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="max-h-3/4 overflow-y-auto bg-white rounded-xl w-1/2 p-10 flex flex-col gap-10"
      >
        <div className="text-xl flex items-center justify-between">
          <h2 className="text-black text-xl">Filter</h2>
          <FontAwesomeIcon
            className="transition-colors duration-300 cursor-pointer text-neutral-500 hover:text-neutral-700"
            icon={faXmark}
            onClick={onClose}
          ></FontAwesomeIcon>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h3 className="text-black ">Search text</h3>
            <input
              name="search"
              id="search"
              defaultValue={urlText}
              placeholder="Enter e.g. name of venue, city, country etc."
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-black ">Budget per night</h3>
            <div className="flex flex-col gap-3">
              <PriceRangeSlider
                onChange={(value) => setPriceRange(() => value)}
              />
              {priceRange && (
                <p className="text-sm">
                  {priceRange[0]} NOK – {priceRange[1]} NOK
                </p>
              )}
            </div>
          </div>
          <details className="open flex flex-col open:gap-6 group relative p-3 border-1 open:border-neutral-500 rounded-t-xl border-neutral-300 overflow-hidden">
            <summary className="transition-all duration-300 bg-white group-open:bg-air-100 border-neutral-300 border-b-[.1px]">
              <span className="group-open:hidden absolute right-2">
                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
              </span>
              <span className="hidden group-open:inline absolute right-2">
                <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
              </span>
              Travel dates
            </summary>
            <DateRangePicker
              onSelect={handleSelect}
              selectedRange={dateRange}
              numberOfMonths={2}
            />
          </details>
          <div className="flex justify-between">
            <div className="flex-1 flex flex-col gap-3">
              <h3 className="text-black">Guests</h3>
              <div className="flex w-28 gap-3 items-center border-1 rounded-sm border-neutral-300 ">
                <button
                  type="button"
                  onClick={() => decrement}
                  className="flex-1 transition-all duration-300 flex items-center justify-center rounded-lg text-ocean-700 hover:bg-neutral-100 size-8"
                >
                  <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                </button>
                <p className="flex-1 text-center">{guests}</p>
                <button
                  type="button"
                  onClick={() => increment}
                  disabled={guests > guestLimit}
                  className="flex-1 transition-all duration-300 flex items-center justify-center rounded-lg text-ocean-700 hover:bg-neutral-100 size-8"
                >
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </button>
              </div>
            </div>
            <fieldset className="flex-1 flex flex-col gap-3">
              <h3 className="text-black">Minimum rating</h3>
              <select
                required
                value={selectedRating}
                onChange={(event) => setSelectedRating(event.target.value)}
                className="w-fit"
                name="rating"
                id="rating"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </fieldset>
          </div>
          <fieldset className="flex flex-col gap-3">
            <h3 className="text-black">Facilities</h3>
            <div className="w-full flex gap-3 justify-start">
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <input
                    // defaultChecked={venue?.meta.wifi}
                    className="cursor-pointer size-5"
                    type="checkbox"
                    id="wifi"
                    name="wifi"
                  />
                  <label htmlFor="wifi">Free wifi</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    // defaultChecked={venue?.meta.parking}
                    className="cursor-pointer size-5"
                    type="checkbox"
                    id="parking"
                    name="parking"
                  />
                  <label htmlFor="parking">Free parking</label>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <input
                    // defaultChecked={venue?.meta.breakfast}
                    className="cursor-pointer size-5"
                    type="checkbox"
                    id="breakfast"
                    name="breakfast"
                  />
                  <label htmlFor="breakfast">Breakfast included</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    // defaultChecked={venue?.meta.pets}
                    className="cursor-pointer size-5"
                    type="checkbox"
                    id="pets"
                    name="pets"
                  />
                  <label htmlFor="pets">Pets allowed</label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="flex justify-center gap-3">
          <Button type="button" variant="outline">
            Reset
          </Button>
          <Button type="submit" variant="primary">
            Apply
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};
