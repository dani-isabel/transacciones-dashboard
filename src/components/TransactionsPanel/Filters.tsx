import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Filters() {
  return (
    <article className="mt-5 md:mt-0 text-primary">
      <div className="h-12 md:w-233 rounded-sm flex justify-between bg-white items-center">
        <button className="w-40 md:w-65 h-8 ml-3 rounded-lg bg-light-grey">
          Hoy
        </button>
        <button className="w-40 md:w-65">Esta semana</button>
        <button className="w-40 md:w-65">Mes actual</button>
      </div>
      <div className="flex justify-end">
        <button className="h-11 flex bg-white w-30 shadow-md items-center rounded-sm mt-4 p-2 justify-end">
          Filtrar <AdjustmentsHorizontalIcon className="size-6 ml-1" />
        </button>
        <div className="bg-white w-60 flex-col py-2 px-4 rounded-sm shadow-md">
          <div className="flex">
            <h3>Filtrar</h3>
            <button>
              <XMarkIcon className="size-5 ml-1" />
            </button>
          </div>
          <form className="flex flex-col">
            <div>
              <input className="mr-4" type="checkbox" id="datafono" />
              <label htmlFor="datafono">Cobro con datáfono</label>
            </div>
            <div>
              <input className="mr-4" type="checkbox" id="link" />
              <label htmlFor="link">Cobro con link de pago</label>
            </div>
            <div>
              <input className="mr-4" type="checkbox" id="todos" />
              <label htmlFor="todos">Ver todos</label>
            </div>
            <button
              className="bg-secondary text-white rounded-lg py-2"
              type="submit"
            >
              Aplicar
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
