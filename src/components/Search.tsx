"use client";
import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TransactionsTable from "@/components/Table";
import type { Transaction } from "@/types/transaction";
import { applyFilters } from "@/utils/getFilterTransactions";
import { getCurrentMonth } from "@/utils/getTransactionsValues";

import {
  DATE_RANGES,
  URL_PARAMS,
  type DateRange,
  type SalesType,
} from "@/constants/filters";

interface SearchableTableProps {
  transactions: Transaction[];
}

export default function Search({ transactions }: SearchableTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchParams = useSearchParams();
  const ranges = [
    { value: DATE_RANGES.TODAY, label: "Hoy" },
    { value: DATE_RANGES.WEEK, label: "Esta semana" },
    { value: DATE_RANGES.MONTH, label: getCurrentMonth() },
  ];

  const currentDateRange = (searchParams.get(URL_PARAMS.DATE_RANGE) ||
    DATE_RANGES.TODAY) as DateRange;

  const filteredTransactions = useMemo(() => {
    const dateRange = (searchParams.get(URL_PARAMS.DATE_RANGE) ||
      DATE_RANGES.TODAY) as DateRange;
    const salesTypeParam = searchParams.get(URL_PARAMS.SALES_TYPE);

    const salesTypes = salesTypeParam
      ? (salesTypeParam.split(",") as SalesType[])
      : [];

    return applyFilters(transactions, dateRange, salesTypes);
  }, [transactions, searchParams]);

  return (
    <>
      <div className="flex flex-column mt-5 rounded-t-lg h-14 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey">
        <span className="flex">
          <h4 className="mr-2">Tus ventas de</h4>
          <strong className="capitalize">
            {ranges.find((range) => range.value === currentDateRange)?.label}
          </strong>
        </span>
      </div>
      <div className="flex w-full bg-white p-3 relative header-border">
        <MagnifyingGlassIcon className="size-6 ml-1 text-medium-grey" />
        <input
          type="search"
          placeholder="Buscar"
          className="absolute pl-8 md:w-96"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>
      <TransactionsTable
        transactions={filteredTransactions}
        searchTerm={searchTerm}
      />
      <div className="h-5 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey rounded-b-lg"></div>
    </>
  );
}
