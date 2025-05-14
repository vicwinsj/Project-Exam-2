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
import { useState } from "react";
import { useVenues } from "../../contexts/VenueContext";
import PriceRangeSlider from "../PriceRangeSlider";

type FilterModalProps = {
  onClose: () => void;
  query?: string;
};

export const FilterModal = ({ onClose, query }: FilterModalProps) => {
  const { setFilters } = useVenues();
  const [dateRange, setDateRange] = useState<DateRange>();
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [guests, setGuests] = useState(1);

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const guestLimit = 100;

  const increment = (type: "guests") => {
    if (guests >= guestLimit) return;
    if (type === "guests") setGuests(guests + 1);
  };

  const decrement = (type: "guests") => {
    if (type === "guests" && guests > 1) setGuests(guests - 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    setFilters({
      dateRange: dateRange,
      priceRange: priceRange,
      guests,
      wifi: formData.get("wifi") === "on",
      parking: formData.get("parking") === "on",
      breakfast: formData.get("breakfast") === "on",
      pets: formData.get("pets") === "on",
      rating: Number(formData.get("rating")),
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
          <div className="flex flex-col gap-1">
            <h3 className="text-black ">Search text</h3>
            <input
              name="search"
              id="search"
              defaultValue={query}
              placeholder="Enter e.g. name of venue, city, country etc."
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-black ">Budget per night</h3>
              {priceRange ? (
                <p className="text-sm">
                  {priceRange[0]} NOK – {priceRange[1]} NOK
                </p>
              ) : (
                <p className="text-sm">0 NOK – 1000 NOK</p>
              )}
            </div>
            <PriceRangeSlider
              onChange={(value) => setPriceRange(() => value)}
            />
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
                  onClick={() => decrement("guests")}
                  className="flex-1 transition-all duration-300 flex items-center justify-center rounded-lg text-ocean-700 hover:bg-neutral-100 size-8"
                >
                  <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                </button>
                <p className="flex-1 text-center">{guests}</p>
                <button
                  type="button"
                  onClick={() => increment("guests")}
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
                //   defaultValue={venue?.rating}
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
