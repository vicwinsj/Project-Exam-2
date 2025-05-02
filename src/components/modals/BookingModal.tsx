import { useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import DayPicker from "react-day-picker";
import { DateRange } from "react-day-picker";

interface BookingModalProps {
  onClose: () => void;
  venue: {
    id: string;
    name: string;
    price: number;
  }; // Simplified venue type; adjust to match your Venue type
}

export default function BookingModal({ onClose, venue }: BookingModalProps) {
  const [range, setRange] = useState<DateRange | undefined>();

  const handleReset = () => setRange(undefined);

  const numberOfNights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;

  const totalPrice = numberOfNights * venue.price;

  return (
    <div className="flex flex-col gap-3 p-10 bg-white rounded-xl w-1/2">
      <h2 className="text-xl font-semibold mb-4">
        Select Booking Dates for {venue.name}
      </h2>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={1}
        className="custom-calendar"
      />
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset
        </button>
        <div className="text-gray-800 text-sm">
          {range?.from && range?.to && (
            <>
              <span>
                {format(range.from, "MMM d")} – {format(range.to, "MMM d")}
              </span>{" "}
              <br />
              <strong>{numberOfNights} nights</strong> | Total: {totalPrice} NOK
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-sm text-blue-600 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
