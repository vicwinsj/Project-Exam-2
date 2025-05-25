import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { DateRangePickerProps } from "../types/dateRangePicker";

export function DateRangePicker({
  selectedRange,
  onSelect,
  disabledRanges = [],
}: DateRangePickerProps) {
  const today = startOfDay(new Date());
  const defaultClassNames = getDefaultClassNames();
  const [months, setMonths] = useState(2);

  useEffect(() => {
    const updateMonths = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setMonths(1);
      } else {
        setMonths(2);
      }
    };

    updateMonths();
    window.addEventListener("resize", updateMonths);
    return () => window.removeEventListener("resize", updateMonths);
  }, []);

  return (
    <DayPicker
      mode="range"
      selected={selectedRange}
      onSelect={onSelect}
      numberOfMonths={months}
      disabled={[{ before: today }, ...disabledRanges]}
      className="daypicker"
      classNames={{
        disabled: `text-neutral-300!`,
        root: `w-full flex items-center justify-center`,
        nav: "z-10 order-[-1] col-span-2 -mb-7 flex justify-between items-center",
        chevron: `transition-all duration-300 ${defaultClassNames.chevron} fill-ocean-700 size-8 p-2 hover:bg-neutral-100 rounded-lg`,
        months: `w-full grid justify-center! grid-cols-1 md:grid-cols-2 md:gap-x-3 overflow-hidden`,
        month_caption: `text-center text-lg font-semibold`,
        month: `w-full cols-span-1 flex flex-col gap-1`,
        month_grid: `w-full grid grid-cols-7 text-center`,
        day: `aspect-square flex items-center justify-center w-full border-y-1 border-white text-center p-1`,
        week: `w-full flex justify-between`,
        weeks: `col-span-7 row-span-5 flex flex-col gap-1`,
        head_row: `w-full`,
        weekdays: `w-full flex justify-between text-neutral-300 text-sm`,
        weekday: `aspect-square w-10 text-center p-1 font-normal`,
        outside: `text-neutral-300`,
        today: `border-1! text-sunset-800 border-sunset-800! rounded-sm`,
        range_start: `bg-ocean-700 border-y-1 border-ocean-700! text-white rounded-l-sm`,
        range_middle: `bg-air-100 border-y-1 border-ocean-700! text-ocean-700`,
        range_end: `bg-ocean-700 border-y-1 border-ocean-700! text-white rounded-r-sm`,
      }}
    />
  );
}
