"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TransactionsTable from "@/components/Table";
import type { Transaction } from "@/types/transaction";

interface SearchableTableProps {
  transactions: Transaction[];
}

export default function Search({ transactions }: SearchableTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <>
      <div className="flex flex-column mt-5 rounded-t-lg h-14 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey">
        <h3>Tus ventas de mes actual</h3>
      </div>
      <div className="flex w-full bg-white p-3 ">
        <MagnifyingGlassIcon className="size-6 ml-1 text-medium-grey" />
        <input
          type="search"
          placeholder="Buscar"
          className="absolute pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TransactionsTable transactions={transactions} searchTerm={searchTerm} />
    </>
  );
}
