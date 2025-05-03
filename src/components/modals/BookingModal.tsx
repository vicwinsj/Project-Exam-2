import { useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { DayPicker, DateRange, getDefaultClassNames } from "react-day-picker";
import { Button } from "../form/Button";

interface BookingModalProp {
  onClose: () => void;
}

export default function BookingModal({ onClose }: BookingModalProp) {
  const defaultClassNames = getDefaultClassNames();
  const [range, setRange] = useState<DateRange | undefined>();

  const handleReset = () => setRange(undefined);

  const numberOfNights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-3 p-10 bg-white rounded-xl w-125"
    >
      <h2 className="text-xl text-black text-center font-semibold">
        {numberOfNights} nights
      </h2>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        showOutsideDays={true}
        classNames={{
          root: `w-full grid grid-cols-[auto_1fr_auto] items-center justify-center`,
          nav: "z-10 order-[-1] col-span-2 -mb-7 mx-3 flex justify-between items-center",
          months: `w-full grid grid-cols-2 gap-x-3 overflow-hidden`,
          month_caption: `text-center text-lg font-semibold`,
          month: `w-full flex flex-col gap-1`,
          month_grid: `w-full grid grid-cols-7 text-center gap-1`,
          day: `aspect-square w-10 border-y-1 border-white text-center p-1`,
          week: `w-full flex justify-between`,
          weeks: `col-span-7 row-span-5 flex flex-col gap-1`,
          head_row: `w-full`,
          weekdays: `w-[204px] flex justify-between text-neutral-300 text-sm`,
          weekday: `aspect-square w-10 text-center p-1 font-normal`,
          outside: `text-neutral-300`,
          today: `border-sunset-800 border-1 rounded-sm`,
          range_start: `bg-ocean-700 border-y-1 border-ocean-700! text-white rounded-l-sm`,
          range_middle: `bg-air-100 border-y-1 border-ocean-700! text-ocean-700`,
          range_end: `bg-ocean-700 border-y-1 border-ocean-700! text-white rounded-r-sm`,
          chevron: `${defaultClassNames.chevron} fill-ocean-700`,
        }}
      />
      <div className="flex justify-center gap-1 border- items-center">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <div className="text-sm">
          {range?.from && range?.to && (
            <>
              <span>
                {format(range.from, "MMM d")} – {format(range.to, "MMM d")}
              </span>{" "}
              <br />
              <strong>{numberOfNights} nights</strong>
            </>
          )}
        </div>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
