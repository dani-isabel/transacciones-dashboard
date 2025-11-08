"use client";
import { useState } from "react";
import Image from "next/image";

import {
  formatCurrency,
  getPaymentIcon,
  formatDate,
  getStatusMessages,
  getTransactionIcon,
} from "@/utils/getTransactionsValues";

import { Transaction } from "@/types/transaction";

import TransactionSidebar from "@/components/TansactionsPanel/TransactionSidebar";

export default function TableRows({
  transactions,
}: {
  transactions: Array<Transaction>;
}) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  function handleActiveRow(row: Transaction) {
    setSelectedTransaction(row);
  }
  console.log({ selectedTransaction });
  return (
    <>
      <tbody className="h-100 w-full">
        {transactions.map((row: Transaction) => (
          <tr
            className="h-20 row-border"
            key={row.id}
            onClick={() => handleActiveRow(row)}
          >
            <td className="pl-5">
              <div className="flex text-primary items-center">
                <Image
                  alt={row.salesType}
                  src={getTransactionIcon(row.salesType)}
                  width={5}
                  height={5}
                  className="h-5 w-5 mr-4"
                />
                <p className="font-medium">{getStatusMessages(row.status)}</p>
              </div>
            </td>
            <td>{formatDate(row.createdAt)}</td>
            <td>
              <div className="flex w-40 justify-between">
                <Image
                  alt={row.paymentMethod}
                  src={getPaymentIcon(row.paymentMethod)}
                  width={35}
                  height={10}
                />
                <p>{`****${row.transactionReference}`}</p>
              </div>
            </td>
            <td>{row.id}</td>
            <td>
              <div className="flex flex-col">
                <h4 className="text-primary font-medium">{`$ ${formatCurrency(
                  row.amount
                )}`}</h4>
                {row.deduction && (
                  <div>
                    <p className="text-dark-grey">Deducción Bold</p>
                    <h4 className="text-secondary font-medium">{`-$ ${formatCurrency(
                      row.deduction
                    )}`}</h4>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
