import { Suspense } from "react";

import TableRows from "@/components/TableRows";

import { getTransactions } from "@/utils/getTransactionsValues";

export default async function TableContent() {
  const { data } = await getTransactions();

  if (!data) return <div>No hay transacciones</div>;
  return (
    <>
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
    </>
  );
}
