import Image from "next/image";
import Link from "next/link";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="text-sm md:text-base flex py-2 md:h-25 px-5 md:pl-20 md:pr-40 md:py-6 bg-linear-to-r from-primary to-secondary justify-between items-center">
      <Link href="/" className="m-1.5 p-1.5">
        <Image
          src="/boldLogo.png"
          alt="Bold logo"
          height={120}
          width={120}
          className="h-8 w-auto"
        />
      </Link>
      <div className="w-40 flex text-light-grey justify-between">
        <Link className="hover:underline" href="/negocio">
          Mi negocio
        </Link>
        <Link className="hover:underline flex items-center" href="/ayuda">
          Ayuda <QuestionMarkCircleIcon className="size-4 ml-1" />
        </Link>
      </div>
    </nav>
  );
}
