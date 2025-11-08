import { Suspense } from "react";
import Image from "next/image";

import {
  formatCurrency,
  getPaymentIcon,
  formatDate,
  getStatusMessages,
} from "@/utils/getFormattedValues";

async function getTransactions() {
  const transactions = await fetch("https://bold-fe-api.vercel.app/api");
  return transactions.json();
}

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
        <tr className="h-20" key={row.id}>
          <td>
            <div className="flex text-primary">
              {row.salesType}
              <p>{getStatusMessages(row.status)}</p>
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
              <h4 className="text-primary">{`$ ${formatCurrency(
                row.amount
              )}`}</h4>
              {row.deduction && (
                <div>
                  <p className="text-dark-grey">Deducción Bold</p>
                  <h4 className="text-secondary">{`-$ ${formatCurrency(
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
      <thead className="h-8 text-dark-grey">
        <tr className="p-4">
          <th>Transacción</th>
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
