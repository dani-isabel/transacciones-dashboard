"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Transaction } from "@/types";

interface TransactionContextType {
  selectedTransaction: Transaction | null;
  selectTransaction: (transaction: Transaction) => void;
  clearTransaction: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const selectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const clearTransaction = () => {
    setSelectedTransaction(null);
  };

  return (
    <TransactionContext.Provider
      value={{ selectedTransaction, selectTransaction, clearTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
}
