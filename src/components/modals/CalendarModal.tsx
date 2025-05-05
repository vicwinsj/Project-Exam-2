import { differenceInCalendarDays, startOfDay } from "date-fns";
import { DayPicker, DateRange, getDefaultClassNames } from "react-day-picker";
import { Button } from "../form/Button";

interface CalendarModalProps {
  disabledDates?: { from: Date; to: Date }[];
  onClose: () => void;
  onRangeSelect: (range: DateRange | undefined, nights: number) => void;
  selectedRange: DateRange | undefined;
  nights: number;
}

export default function CalendarModal({
  disabledDates,
  onClose,
  onRangeSelect,
  selectedRange,
  nights,
}: CalendarModalProps) {
  const defaultClassNames = getDefaultClassNames();
  const today = startOfDay(new Date());

  const handleSelect = (range: DateRange | undefined) => {
    const calculatedNights =
      range?.from && range?.to
        ? differenceInCalendarDays(range.to, range.from)
        : 0;

    onRangeSelect(range, calculatedNights);
  };

  const handleReset = () => {
    onRangeSelect(undefined, 0);
  };

  const disabled: (DateRange | { before: Date })[] = [
    ...(disabledDates || []),
    { before: today },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-10 p-10 bg-white rounded-xl w-125"
    >
      <h2 className="text-xl text-black text-center font-semibold">
        {nights > 0
          ? `${nights} ${nights === 1 ? "night" : "nights"}`
          : "Select nights"}
      </h2>
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        numberOfMonths={2}
        showOutsideDays={true}
        disabled={disabled}
        classNames={{
          disabled: "line-through, cursor-default, text-neutral-300",
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
      <div className="flex justify-center gap-1 border- items-center">
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button type="button" onClick={onClose}>
          Apply
        </Button>
      </div>
    </div>
  );
}
