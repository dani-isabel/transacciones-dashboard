import { Suspense } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import Filters from "@/components/Filters";
import Search from "@/components/Search";
import TransactionSidebar from "@/components/Sidebar";
import { TransactionProvider } from "@/contexts/TransactionContext";

import type { Transaction } from "@/types/transaction";

import { formatCurrency, getCurrentDate } from "@/utils/getTransactionsValues";

async function getTransactions(): Promise<{ data: Transaction[] }> {
  const transactions = await fetch("https://bold-fe-api.vercel.app/api");
  if (!transactions.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return transactions.json();
}

function getTotalSales(transactions: Transaction[]): number {
  const totalSales = transactions.reduce((total: number, item: Transaction) => {
    return item.amount + total;
  }, 0);
  return totalSales;
}

function getTotalDeductions(transactions: Transaction[]): number {
  const totalDeductions = transactions.reduce(
    (total: number, item: Transaction) => {
      if (item.deduction) {
        return item.amount + total;
      } else {
        return total;
      }
    },
    0
  );
  return totalDeductions;
}

export default async function TransactionsPanel() {
  const { data: transactions } = await getTransactions();
  const totalSales = getTotalSales(transactions);
  const totalDeductions = getTotalDeductions(transactions);
  const totalEarnings = totalSales - totalDeductions;
  console.log({ totalEarnings });

  return (
    <section className="p-5 md:p-15 relative">
      <TransactionProvider>
        <article className="flex flex-col md:flex-row justify-between">
          <div className="shadow-md rounded-lg bg-white md:w-96">
            <div className="rounded-t-lg h-14 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey">
              <h3>Total de ventas de hoy</h3>
              <Popover className="relative">
                <PopoverButton>
                  <InformationCircleIcon className="size-6 ml-1" />
                </PopoverButton>
                <PopoverPanel
                  anchor="bottom"
                  transition
                  className="bg-white flex origin-top flex-col rounded-sm transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
                >
                  <div className="h-8 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey">
                    <h3>Reporte de hoy</h3>
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
            <div className="flex h-25 justify-center items-center flex-col">
              <h2 className="font-extrabold">{`$ ${formatCurrency(
                totalSales
              )}`}</h2>
              <h4>{getCurrentDate()}</h4>
            </div>
          </div>
          <Suspense fallback={<h3>Loading date filters</h3>}>
            <Filters />
          </Suspense>
        </article>
        <Suspense fallback={<h3>Loading search filter</h3>}>
          <Search transactions={transactions} />
        </Suspense>
        <TransactionSidebar />
      </TransactionProvider>
    </section>
  );
}
