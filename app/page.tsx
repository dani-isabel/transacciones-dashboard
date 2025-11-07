import Image from "next/image";
import Link from "next/link";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <section>
      <nav className="flex w-full h-25 pl-20 pr-40 py-6 bg-linear-to-r from-primary to-secondary justify-between items-center">
        <Link href="/dashboard" className="-m-1.5 p-1.5">
          <Image src="/boldLogo.png" alt="Bold logo" height={120} width={120} />
        </Link>
        <div className="w-40 flex text-light-grey justify-between">
          <Link href="/negocio">Mi negocio</Link>
          <Link className="flex items-center" href="/ayuda">
            Ayuda <QuestionMarkCircleIcon className="size-4 ml-1" />{" "}
          </Link>
        </div>
      </nav>
      <article className="m-15">
        <div>
          <div className="w-50 bg-linear-to-r from-primary to-secondary">
            <h3>Total de ventas de hoy</h3>
          </div>
          <div>
            <h2>TOTAL</h2>
          </div>
        </div>
      </article>
    </section>
  );
}
