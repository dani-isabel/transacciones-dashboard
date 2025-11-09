import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import TransactionSidebar from "@/components/Sidebar";

import type { Transaction } from "@/types/transaction";

import { formatCurrency, getCurrentDate } from "@/utils/getTransactionsValues";

async function getTransactions(): Promise<{ data: Transaction[] }> {
  const transactions = await fetch("https://bold-fe-api.vercel.app/api");
  if (!transactions.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return transactions.json();
}

export function getTotalSales(transactions: Transaction[]): string {
  const totalSales = transactions.reduce((total: number, item: Transaction) => {
    return item.amount + total;
  }, 0);
  return formatCurrency(totalSales);
}

export default async function TransactionsPanel() {
  const { data: transactions } = await getTransactions();
  const totalSales = getTotalSales(transactions);

  return (
    <section className="p-5 md:p-15 relative">
      <article className="flex flex-col md:flex-row justify-between">
        <div className="shadow-md rounded-lg bg-white md:w-96">
          <div className="rounded-t-lg h-14 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey">
            <h3>Total de ventas de hoy</h3>
            <InformationCircleIcon className="size-6 ml-1" />
          </div>
          <div className="flex h-25 justify-center items-center flex-col">
            <h2 className="font-extrabold">{`$ ${totalSales}`}</h2>
            <h4>{getCurrentDate()}</h4>
          </div>
        </div>
        <Filters />
      </article>
      <Search transactions={transactions} />
      <TransactionSidebar />
    </section>
  );
}
