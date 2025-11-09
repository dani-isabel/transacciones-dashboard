"use client";
import Image from "next/image";

import {
  formatCurrency,
  getPaymentIcon,
  formatDate,
  getStatusMessages,
  getTransactionIcon,
  getFilteredData,
} from "@/utils/getTransactionsValues";

import type { Transaction } from "@/types/transaction";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTransaction } from "@/contexts/TransactionContext";

interface TransactionsTableProps {
  transactions: Transaction[];
  searchTerm: string;
}

export default function Table({
  transactions,
  searchTerm,
}: TransactionsTableProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const filteredTransactions = getFilteredData(transactions, searchTerm);
  const { selectedTransaction, selectTransaction } = useTransaction();

  function handleActiveRow(transaction: Transaction) {
    if (!selectedTransaction) {
      selectTransaction(transaction);
    }
  }

  return (
    <div className="h-80 overflow-y-auto">
      {filteredTransactions.length > 0 ? (
        isDesktop ? (
          <table className="table-auto bg-white w-full">
            <thead className="h-10 text-dark-grey">
              <tr className="p-4 text-left row-border header-border">
                <th className="pl-5">Transacción</th>
                <th>Fecha y hora</th>
                <th>Método de pago</th>
                <th>ID transacción Bold</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody className="h-96 w-full">
              {filteredTransactions.map((row: Transaction) => (
                <tr
                  className="h-20 row-border hover:bg-light-grey"
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
                      <p className="font-medium">
                        {getStatusMessages(row.status)}
                      </p>
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
                        className="w-auto h-9"
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
          </table>
        ) : (
          <table className="text-sm table-auto bg-white w-full">
            <tbody className="h-100 w-full">
              {filteredTransactions?.map((row: Transaction) => (
                <tr
                  className="px-5 h-20 row-border hover:bg-light-grey flex justify-between items-center"
                  key={row.id}
                  onClick={() => handleActiveRow(row)}
                >
                  <td className="flex text-primary items-center">
                    <Image
                      alt={row.paymentMethod}
                      src={getPaymentIcon(row.paymentMethod)}
                      width={35}
                      height={10}
                      className="w-auto h-9"
                    />
                    <p>{`****${row.transactionReference}`}</p>
                  </td>
                  <td className="flex flex-col text-end">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <div className="w-full h-80 flex text-primary items-center justify-center bg-white">
          <h3 className="font-bold">No hay transacciones para esta búsqueda</h3>
        </div>
      )}
    </div>
  );
}
