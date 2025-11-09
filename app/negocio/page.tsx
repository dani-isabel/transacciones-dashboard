import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";
export default function Negocio() {
  return (
    <section>
      <Navbar />
      <div className="flex flex-col w-full h-full justify-center items-center mt-10 md:mt-30">
        <BuildingStorefrontIcon className="w-64 ml-1 text-primary" />
        <h1 className="text-primary md:text-3xl">
          Próximamente aquí encontrarás métricas de tu negocio
        </h1>
      </div>
    </section>
  );
}
