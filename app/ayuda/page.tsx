import Navbar from "@/components/Navbar";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function Ayuda() {
  return (
    <section>
      <Navbar />
      <div className="flex flex-col w-full h-full justify-center items-center mt-10 md:mt-30">
        <QuestionMarkCircleIcon className="w-64 ml-1 text-primary" />
        <h1 className="text-primary md:text-3xl">
          Próximamente aquí te ayudaremos
        </h1>
      </div>
    </section>
  );
}
