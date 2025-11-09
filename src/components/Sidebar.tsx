"use client";
import { useState } from "react";
import Image from "next/image";

import { XMarkIcon } from "@heroicons/react/24/outline";

import { Transaction } from "@/types/transaction";
import {
  formatCurrency,
  getPaymentIcon,
  formatDate,
  getStatusMessages,
  getTransactionIcon,
} from "@/utils/getTransactionsValues";

export default function TransactionSidebar() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const transactionExample = {
    id: "GZENUH5BH1HVQ",
    status: "REJECTED",
    paymentMethod: "BANCOLOMBIA",
    salesType: "TERMINAL",
    createdAt: 1762655514406,
    transactionReference: 2184,
    amount: 1751382,
    deduction: 0,
  };

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

  return (
    <>
      {isSidebarVisible ? (
        <aside className="w-md h-full bg-white z-10 absolute top-0 right-0">
          <div className="md:p-5">
            <button
              className="self-end"
              onClick={() => setIsSidebarVisible(false)}
            >
              <XMarkIcon className="size-5 ml-1" />
            </button>
            <div className="flex flex-col justify-center items-center mt-2">
              <Image
                alt={transactionExample.status}
                src={getStatusIcon(transactionExample.status)}
                width={50}
                height={50}
              />
              <p className="font-medium">
                {getStatusMessages(transactionExample.status)}
              </p>
              <h4 className="text-primary font-bold">{`$ ${formatCurrency(
                transactionExample.amount
              )}`}</h4>
              <p>{formatDate(transactionExample.createdAt)}</p>
            </div>
            <table className="mt-10 justify-center items-center w-full flex flex-col">
              <tbody>
                <tr>
                  <td className="flex justify-between w-full">
                    <h4 className="text-medium-grey">ID Transacción Bold</h4>
                    <h4 className="font-bold">{transactionExample.id}</h4>
                  </td>
                  <td className="flex justify-between w-full">
                    <p className="text-medium-grey">Deducción Bold</p>

                    <h4 className="text-secondary font-medium">{`-$ ${formatCurrency(
                      transactionExample.deduction
                        ? transactionExample.deduction
                        : 0
                    )}`}</h4>
                  </td>
                  <td className="flex justify-between w-full">
                    <h4 className="text-medium-grey">Método de pago</h4>
                    <div className="flex justify-center items-center">
                      <Image
                        alt={transactionExample.paymentMethod}
                        src={getPaymentIcon(transactionExample.paymentMethod)}
                        width={10}
                        height={10}
                        className="w-auto h-6 mr-2"
                      />
                      <p>{`****${transactionExample.transactionReference}`}</p>
                    </div>
                  </td>
                  <td className="flex justify-between w-full">
                    <h4 className="text-medium-grey">Tipo de pago</h4>
                    <Image
                      alt={transactionExample.salesType}
                      src={getTransactionIcon(transactionExample.salesType)}
                      width={5}
                      height={5}
                      className="h-5 w-5 mr-4"
                    />
                    <h4>{}</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </aside>
      ) : null}
    </>
  );
}
