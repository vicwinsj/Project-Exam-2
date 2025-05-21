import { differenceInCalendarDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "../form/Button";
import { DateRangePicker } from "../DateRangePicker";

interface CalendarModalProps {
  disabledDates?: { from: Date; to: Date }[];
  onClose?: () => void;
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
  const handleReset = () => {
    onRangeSelect(undefined, 0);
  };

  const handleSelect = (range: DateRange | undefined) => {
    const calculatedNights =
      range?.from && range?.to
        ? differenceInCalendarDays(range.to, range.from)
        : 0;

    onRangeSelect(range, calculatedNights);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-10 p-10 bg-white rounded-xl w-80 md:w-125"
    >
      <h2 className="text-xl text-black text-center font-semibold">
        {nights > 0
          ? `${nights} ${nights === 1 ? "night" : "nights"}`
          : "Select nights"}
      </h2>
      <DateRangePicker
        selectedRange={selectedRange}
        onSelect={handleSelect}
        disabledRanges={disabledDates || []}
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
