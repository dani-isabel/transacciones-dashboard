import { Suspense } from "react";
import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Filters from "@/components/Filters";
import TransactionsTable from "@/components/Table";
import TransactionSidebar from "@/components/Sidebar";

import { getTotalSales, getCurrentDate } from "@/utils/getTransactionsValues";

export default function TransactionsPanel() {
  return (
    <section className="p-5 md:p-15 relative">
      <article className="flex flex-col md:flex-row justify-between">
        <div className="shadow-md rounded-lg bg-white md:w-96">
          <div className="rounded-t-lg h-14 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey">
            <h3>Total de ventas de hoy</h3>
            <InformationCircleIcon className="size-6 ml-1" />
          </div>
          <div className="flex h-25 justify-center items-center flex-col">
            <TotatlSales />
            <h4>{getCurrentDate()}</h4>
          </div>
        </div>
        <Filters />
      </article>
      <div className="flex flex-column mt-5 rounded-t-lg h-14 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey">
        <h3>Tus ventas de mes actual</h3>
      </div>
      <div className="flex w-full bg-white p-3 ">
        <MagnifyingGlassIcon className="size-6 ml-1 text-medium-grey" />
        <input type="search" placeholder="Buscar" className="absolute pl-8" />
      </div>
      <TransactionsTable />
      <TransactionSidebar />
    </section>
  );
}

async function TotatlSales() {
  const total = await getTotalSales();

  return (
    <Suspense
      fallback={
        <tbody className="h-100 w-full">
          <tr>
            <td>****</td>
          </tr>
        </tbody>
      }
    >
      <h2 className="font-extrabold">{`$ ${total}`}</h2>
    </Suspense>
  );
}
