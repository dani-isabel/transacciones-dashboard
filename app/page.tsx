import Image from "next/image";
import Link from "next/link";
import {
  QuestionMarkCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Filters from "@/components/Filters";
import TransactionsPanel from "@/components/TransactionsPanel";

export default function Home() {
  return (
    <section>
      <nav className="flex w-full h-25 pl-20 pr-40 py-6 bg-linear-to-r from-primary to-secondary justify-between items-center">
        <Link href="/" className="m-1.5 p-1.5">
          <Image src="/boldLogo.png" alt="Bold logo" height={120} width={120} />
        </Link>
        <div className="w-40 flex text-light-grey justify-between">
          <Link href="/negocio">Mi negocio</Link>
          <Link className="flex items-center" href="/ayuda">
            Ayuda <QuestionMarkCircleIcon className="size-4 ml-1" />
          </Link>
        </div>
      </nav>
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
        <TransactionsPanel />
      </section>
    </section>
  );
}
