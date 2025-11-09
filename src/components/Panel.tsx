import { Suspense } from "react";

import Filters from "@/components/Filters";
import Search from "@/components/Search";
import TransactionSidebar from "@/components/Sidebar";
import TotalSalesCard from "@/components/SummaryCard";
import { TransactionProvider } from "@/contexts/TransactionContext";

import type { Transaction, DateRange } from "@/types";

import { filterTransactionsByDateRange } from "@/utils/getFilterTransactions";
import { DATE_RANGES, URL_PARAMS } from "@/constants";

async function getTransactions(): Promise<{ data: Transaction[] }> {
  const transactions = await fetch("https://bold-fe-api.vercel.app/api");
  if (!transactions.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return transactions.json();
}

export default async function TransactionsPanel({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const selectedRange = ((params[URL_PARAMS.DATE_RANGE] as string) ||
    DATE_RANGES.TODAY) as DateRange;

  const { data: transactions } = await getTransactions();
  const dailyTransactions = filterTransactionsByDateRange(
    transactions,
    selectedRange
  );

  return (
    <section className="text-sm md:text-base p-5 md:p-15 relative">
      <TransactionProvider>
        <article className="flex flex-col md:flex-row justify-between">
          <TotalSalesCard
            transactions={dailyTransactions}
            selectedRange={selectedRange}
          />
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
