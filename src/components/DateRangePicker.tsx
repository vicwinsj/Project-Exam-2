import { DayPicker, DateRange, getDefaultClassNames } from "react-day-picker";
import { startOfDay } from "date-fns";

export interface DateRangePickerProps {
  selectedRange?: DateRange;
  onSelect: (range: DateRange | undefined) => void;
  disabledRanges?: Array<{ from: Date; to: Date } | { before: Date }>;
  numberOfMonths?: number;
}

export function DateRangePicker({
  selectedRange,
  onSelect,
  disabledRanges = [],
  numberOfMonths = 2,
}: DateRangePickerProps) {
  const today = startOfDay(new Date());
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      mode="range"
      selected={selectedRange}
      onSelect={onSelect}
      numberOfMonths={numberOfMonths}
      disabled={[{ before: today }, ...disabledRanges]}
      classNames={{
        disabled: `text-neutral-300`,
        root: `w-full grid grid-cols-[auto_1fr_auto] items-center justify-center`,
        nav: "z-10 order-[-1] col-span-2 -mb-7 flex justify-between items-center",
        chevron: `transition-all duration-300 ${defaultClassNames.chevron} fill-ocean-700 size-8 p-2 hover:bg-neutral-100 rounded-lg`,
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
        today: `border-1! text-sunset-800 border-sunset-800! rounded-sm`,
        range_start: `bg-ocean-700 border-y-1 border-ocean-700! text-white rounded-l-sm`,
        range_middle: `bg-air-100 border-y-1 border-ocean-700! text-ocean-700`,
        range_end: `bg-ocean-700 border-y-1 border-ocean-700! text-white rounded-r-sm`,
      }}
    />
  );
}
