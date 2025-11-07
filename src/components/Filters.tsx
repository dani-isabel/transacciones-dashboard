import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function Filters() {
  return (
    <article className="text-primary">
      <div className="h-12 w-233 rounded-sm flex justify-between bg-white items-center">
        <button className="w-65 h-8 ml-3 rounded-lg bg-light-grey">Hoy</button>
        <button className="w-65">Esta semana</button>
        <button className="w-65">Mes actual</button>
      </div>
      <div className="flex justify-end">
        <button className="h-11 flex bg-white w-30 shadow-md items-center rounded-sm mt-4 p-2 justify-end">
            Filtrar <AdjustmentsHorizontalIcon className="size-6 ml-1" />
        </button>
      </div>
    </article>
  );
}
