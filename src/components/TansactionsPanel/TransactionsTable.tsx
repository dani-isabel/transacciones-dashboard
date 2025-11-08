import { Suspense } from "react";
import Image from "next/image";

import {
  getTransactions,
  formatCurrency,
  getPaymentIcon,
  formatDate,
  getStatusMessages,
  getTransactionIcon,
} from "@/utils/getTransactionsValues";

async function TableRows() {
  const { data } = await getTransactions();

  interface Transaction {
    amount: number;
    createdAt: number;
    deduction?: number;
    id: string;
    paymentMethod: string;
    salesType: string;
    status: string;
    transactionReference: number;
  }

  if (!data) return <div>No hay transacciones</div>;
  return (
    <tbody className="h-100 w-full">
      {data.map((row: Transaction) => (
        <tr className="h-20 row-border" key={row.id}>
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
  );
}

export default async function TransactionsTable() {
  return (
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
      <Suspense
        fallback={
          <tbody className="h-100 w-full">
            <tr>
              <td>Cargando las transacciones...</td>
            </tr>
          </tbody>
        }
      >
        <TableRows />
      </Suspense>
    </table>
  );
}
