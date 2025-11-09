"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTransaction } from "@/contexts/TransactionContext";
import {
  formatCurrency,
  getPaymentIcon,
  formatDate,
  getStatusMessages,
  getTransactionIcon,
} from "@/utils/getTransactionsValues";

export default function TransactionSidebar() {
  const { selectedTransaction, clearTransaction } = useTransaction();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        clearTransaction();
      }
    };

    if (selectedTransaction) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedTransaction, clearTransaction]);

  if (!selectedTransaction) {
    return null;
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "REJECTED": {
        return "/rejected.png";
      }
      case "SUCCESSFUL": {
        return "/succesful.png";
      }
      default: {
        return "/desconocido.png";
      }
    }
  }

  function getPaymentMessage(salesType: string) {
    switch (salesType) {
      case "PAYMENT_LINK": {
        return "Link de pago";
      }
      case "TERMINAL": {
        return "Datáfono";
      }
      default: {
        return "Desconocido";
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-90 z-50 flex justify-end">
      <div
        ref={sidebarRef}
        className="flex flex-col md:rounded-l-lg w-full md:w-md h-full bg-white p-4 md:p-7 overflow-y-auto"
      >
        <button onClick={clearTransaction} className="cursor-pointer self-end">
          <XMarkIcon className="size-5 ml-1" />
        </button>
        <div className="flex flex-col justify-center items-center mt-2">
          <Image
            alt={selectedTransaction.status}
            src={getStatusIcon(selectedTransaction.status)}
            width={30}
            height={30}
          />
          <p className="font-medium text-sm">
            {getStatusMessages(selectedTransaction.status)}
          </p>
          <h4 className="text-primary font-bold md:text-xl">{`$ ${formatCurrency(
            selectedTransaction.amount
          )}`}</h4>
          <p className="text-xs text-medium-grey">
            {formatDate(selectedTransaction.createdAt)}
          </p>
        </div>
        <section className="mt-10 md:mt-14 justify-center items-center w-full flex flex-col">
          <article className="w-full">
            <div className="flex justify-between w-full mb-3">
              <h4 className="text-medium-grey">ID Transacción Bold</h4>
              <h4 className="font-bold">{selectedTransaction.id}</h4>
            </div>

            <div className="flex justify-between w-full mb-3 mb:mb-4 row-border">
              <p className="text-medium-grey">Deducción Bold</p>
              <h4 className="text-secondary font-medium">{`-$ ${formatCurrency(
                selectedTransaction.deduction
                  ? selectedTransaction.deduction
                  : 0
              )}`}</h4>
            </div>
            <div className="flex justify-between w-full mb-3">
              <h4 className="text-medium-grey">Método de pago</h4>
              <div className="flex justify-center items-center">
                <Image
                  alt={selectedTransaction.paymentMethod}
                  src={getPaymentIcon(selectedTransaction.paymentMethod)}
                  width={10}
                  height={10}
                  className="w-auto h-6 mr-2"
                />
                <p>{`****${selectedTransaction.transactionReference}`}</p>
              </div>
            </div>
            <div className="flex justify-between w-full mb-3">
              <h4 className="text-medium-grey">Tipo de pago</h4>
              <div className="flex justify-center items-center">
                <Image
                  alt={selectedTransaction.salesType}
                  src={getTransactionIcon(selectedTransaction.salesType)}
                  width={5}
                  height={5}
                  className="h-5 w-5 mr-2"
                />
                <h4 className="font-semibold text-primary">
                  {getPaymentMessage(selectedTransaction.salesType)}
                </h4>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
