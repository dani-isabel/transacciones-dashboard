import { DATE_RANGES } from "@/constants/filters";
import { getCurrentMonth } from "@/utils/getTransactionsValues";

interface DateRangeButtonsProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export default function DateRangeButtons({
  selectedRange,
  onRangeChange,
}: DateRangeButtonsProps) {
  const ranges = [
    { value: DATE_RANGES.TODAY, label: "Hoy" },
    { value: DATE_RANGES.WEEK, label: "Esta semana" },
    { value: DATE_RANGES.MONTH, label: getCurrentMonth() },
  ];

  const handleClick = (value: string) => {
    if (selectedRange !== value) onRangeChange(value);
  };

  return (
    <div className="h-12 md:w-233 rounded-sm flex justify-between bg-white items-center p-2 md:p-5">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => handleClick(range.value)}
          className={`w-40 md:w-65 h-8 capitalize cursor-pointer ${
            range.value === DATE_RANGES.TODAY ? "ml-3" : ""
          } rounded-lg ${selectedRange === range.value ? "bg-light-grey" : ""}`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
