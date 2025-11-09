"use client";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  formatCurrency,
  getCurrentDate,
  getCurrentMonth,
} from "@/utils/getTransactionsValues";
import { DATE_RANGES } from "@/constants";
import type { Transaction, DateRange } from "@/types";

function getTotalSales(transactions: Transaction[]): number {
  return transactions.reduce((total: number, item: Transaction) => {
    return item.amount + total;
  }, 0);
}

function getTotalDeductions(transactions: Transaction[]): number {
  return transactions.reduce((total: number, item: Transaction) => {
    if (item.deduction) {
      return item.deduction + total;
    } else {
      return total;
    }
  }, 0);
}

interface SummaryCardProps {
  transactions: Transaction[];
  selectedRange: DateRange;
}

export default function SummaryCard({
  transactions,
  selectedRange,
}: SummaryCardProps) {
  const totalSales = getTotalSales(transactions);
  const totalDeductions = getTotalDeductions(transactions);
  const totalEarnings = totalSales - totalDeductions;

  const getTitle = () => {
    switch (selectedRange) {
      case DATE_RANGES.TODAY:
        return "Total de ventas de hoy";
      case DATE_RANGES.WEEK:
        return "Total de ventas de esta semana";
      case DATE_RANGES.MONTH:
        return `Total de ventas de ${getCurrentMonth()}`;
      default:
        return "Total de ventas de hoy";
    }
  };

  const getReportTitle = () => {
    switch (selectedRange) {
      case DATE_RANGES.TODAY:
        return "Reporte de hoy";
      case DATE_RANGES.WEEK:
        return "Reporte de esta semana";
      case DATE_RANGES.MONTH:
        return `Reporte de ${getCurrentMonth()}`;
      default:
        return "Reporte de hoy";
    }
  };

  return (
    <div className="shadow-md rounded-lg bg-white md:w-96">
      <div className="rounded-t-lg h-14 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey">
        <h3 className="text-lg">{getTitle()}</h3>
        <Popover className="relative">
          <PopoverButton className="cursor-pointer">
            <InformationCircleIcon className="size-6 ml-1" />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            transition
            className="bg-white flex origin-top flex-col rounded-sm transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <div className="h-8 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey">
              <h3>{getReportTitle()}</h3>
            </div>
            <div className="p-2 md:p-5">
              <span>
                <h4 className="text-dark-grey">Total ganancias:</h4>{" "}
                <strong className="text-primary">{`$ ${formatCurrency(
                  totalEarnings
                )}`}</strong>
              </span>
              <span>
                <h4 className="text-dark-grey">Total deducciones:</h4>{" "}
                <strong className="text-secondary">{`$ -${formatCurrency(
                  totalDeductions
                )}`}</strong>
              </span>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
      <div className="flex p-2 md:p-4 justify-center items-center flex-col">
        <h2 className="font-extrabold md:text-xl md:mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{`$ ${formatCurrency(
          totalSales
        )}`}</h2>
        <h4 className="text-sm">{getCurrentDate()}</h4>
      </div>
    </div>
  );
}
