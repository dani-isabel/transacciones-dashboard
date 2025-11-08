import { Suspense } from "react";

import TableRows from "@/components/TansactionsPanel/TableRows";

import { getTransactions } from "@/utils/getTransactionsValues";

export default async function TableContent() {
  const { data } = await getTransactions();

  if (!data) return <div>No hay transacciones</div>;
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
        <TableRows transactions={data} />
      </Suspense>
    </table>
  );
}
