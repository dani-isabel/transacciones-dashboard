import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Filters from "@/components/TansactionsPanel/Filters";
import TransactionsTable from "@/components/TansactionsPanel/TransactionsTable";

export default function TransactionsPanel() {
  return (
    <section className="m-15">
      <article className="flex justify-between">
        <div className="shadow-md w-100 rounded-lg bg-white">
          <div className="rounded-t-lg h-14 p-3 flex justify-between items-center bg-linear-to-r from-primary to-secondary text-light-grey">
            <h3>Total de ventas de hoy</h3>
            <InformationCircleIcon className="size-6 ml-1" />
          </div>
          <div className="flex h-25 justify-center items-center flex-col">
            <h2>TOTAL</h2>
            <h4>27 de Junio 2024</h4>
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
    </section>
  );
}
