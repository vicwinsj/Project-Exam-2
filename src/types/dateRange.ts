import { DateRange } from "react-day-picker";

export interface DateRangePickerProps {
  selectedRange?: DateRange;
  onSelect: (range: DateRange | undefined) => void;
  disabledRanges?: Array<{ from: Date; to: Date } | { before: Date }>;
}
