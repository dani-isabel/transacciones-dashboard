"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { DATE_RANGES, URL_PARAMS } from "@/constants";
import type { DateRange, SalesType } from "@/types";

import DateRangeButtons from "@/components/DateRangeButtons";
import FilterModal from "@/components/FilterModal";

export default function Filters() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleDateRangeChange = (range: DateRange) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(URL_PARAMS.DATE_RANGE, range);
    router.push(`?${params.toString()}`);
  };

  const handleFilterSubmit = (salesTypes: SalesType[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (salesTypes.length > 0) {
      params.set(URL_PARAMS.SALES_TYPE, salesTypes.join(","));
    } else {
      params.delete(URL_PARAMS.SALES_TYPE);
    }

    router.push(`?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const handleToggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  return (
    <article className="text-sm md:text-base mt-5 md:mt-0 text-primary">
      <DateRangeButtons
        selectedRange={
          (searchParams.get(URL_PARAMS.DATE_RANGE) as DateRange) ||
          DATE_RANGES.TODAY
        }
        onRangeChange={handleDateRangeChange}
      />
      <div className="flex justify-end relative">
        <button
          onClick={handleToggleFilter}
          className="h-11 flex bg-white w-30 shadow-md items-center rounded-sm mt-4 p-2 justify-end cursor-pointer hover:bg-hover"
        >
          Filtrar <AdjustmentsHorizontalIcon className="size-6 ml-1" />
        </button>
        {isFilterOpen && (
          <FilterModal
            selectedTypes={
              (searchParams
                .get(URL_PARAMS.SALES_TYPE)
                ?.split(",") as SalesType[]) || []
            }
            onClose={handleCloseFilter}
            onSubmit={handleFilterSubmit}
          />
        )}
      </div>
    </article>
  );
}
