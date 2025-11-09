import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SALES_TYPES } from "@/constants/filters";

import type { FormEvent, ChangeEvent } from "react";

interface FilterModalProps {
  selectedTypes: string[];
  onClose: () => void;
  onSubmit: (salesTypes: string[]) => void;
}

export default function FilterModal({
  selectedTypes,
  onClose,
  onSubmit,
}: FilterModalProps) {
  const [terminal, setTerminal] = useState(
    selectedTypes.includes(SALES_TYPES.TERMINAL)
  );
  const [paymentLink, setPaymentLink] = useState(
    selectedTypes.includes(SALES_TYPES.PAYMENT_LINK)
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const types: string[] = [];
    if (terminal) types.push(SALES_TYPES.TERMINAL);
    if (paymentLink) types.push(SALES_TYPES.PAYMENT_LINK);
    onSubmit(types);
  };

  const handleTerminalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerminal(e.target.checked);
  };

  const handlePaymentLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentLink(e.target.checked);
  };

  return (
    <div className="absolute top-16 right-0 bg-white w-60 flex flex-col py-2 px-4 rounded-sm shadow-md z-10">
      <div className="flex justify-between items-center mb-3">
        <h3>Filtrar</h3>
        <button onClick={onClose} type="button" className="cursor-pointer">
          <XMarkIcon className="size-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <input
            className="mr-4"
            type="checkbox"
            id="datafono"
            checked={terminal}
            onChange={handleTerminalChange}
          />
          <label htmlFor="datafono">Cobro con datáfono</label>
        </div>
        <div>
          <input
            className="mr-4"
            type="checkbox"
            id="link"
            checked={paymentLink}
            onChange={handlePaymentLinkChange}
          />
          <label htmlFor="link">Cobro con link de pago</label>
        </div>
        <button
          className="bg-secondary text-white rounded-lg py-2 mt-2"
          type="submit"
        >
          Aplicar
        </button>
      </form>
    </div>
  );
}
