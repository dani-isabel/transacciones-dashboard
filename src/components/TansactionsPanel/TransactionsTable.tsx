import { Suspense } from "react";

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
        <tr key={row.id}>
          <td>
            {row.salesType}-{row.status}
          </td>
          <td>{row.createdAt}</td>
          <td>
            {row.paymentMethod}
            {row.transactionReference}
          </td>
          <td>{row.id}</td>
          <td className="flex flex-column">
            {row.amount}
            {row.deduction && <p>Deducción Bold</p>}
            <p>{row.deduction}</p>
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
