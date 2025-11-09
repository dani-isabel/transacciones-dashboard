import type { Transaction, PaymentMethod, SalesType, TransactionStatus } from "@/types";
import { SALES_TYPES, PAYMENT_METHODS, TRANSACTION_STATUS } from "@/constants";

export function formatCurrency (amount:number) {
    const locale = "es-ES"
    try{
        Intl.NumberFormat.supportedLocalesOf([locale])
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
        }).format(amount).replace("COP", "")
    } catch(error) {
        console.error("Invalid locale", {error, amount, locale})
        return amount.toLocaleString()
    }
}

export function getPaymentIcon(method: PaymentMethod) {
    switch(method) {
        case PAYMENT_METHODS.CARD: {
            return "/american-express.png";
        }
        case PAYMENT_METHODS.DAVIPLATA: {
            return "/daviplata.png";
        }
        case PAYMENT_METHODS.NEQUI: {
            return "/nequi.png";
        }
        case PAYMENT_METHODS.PSE: {
            return "/pse.png";
        }
        case PAYMENT_METHODS.BANCOLOMBIA: {
            return "/bancolombia.png";
        }
        default: {
            return "/tardjeta-credito.png";
        }
    }
}

export function formatDate(date:number) {
    const formattedDate = new Date(date).toLocaleString().replace(",", "-")
    return formattedDate
}

export function getStatusMessages(status: TransactionStatus | string) {
    switch (status) {
        case TRANSACTION_STATUS.SUCCESSFUL: {
            return "Cobro exitoso";
        }
        case TRANSACTION_STATUS.REJECTED: {
            return "Cobro no realizado";
        }
        default: {
            return "Cobro pendiente"
        }
    }
}

export function getTransactionIcon(type: SalesType | string) {
    switch (type) {
        case SALES_TYPES.TERMINAL: {
            return "/datafono.png";
        }
        case SALES_TYPES.PAYMENT_LINK: {
            return "/enlace.png";
        }
        default: {
            return "/desconocido.png"
        }
    }
}

export function getCurrentDate() {
    const date = new Date()
    const formattedCurrentDate = new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
    } as const).format(date)
    return formattedCurrentDate
}
export function getCurrentMonth() {
    const date = new Date()
    const formattedCurrentMonth = new Intl.DateTimeFormat("es-ES", {
        month: "long",
    } as const).format(date)
    return formattedCurrentMonth
}

export function getFilteredData(transactions: Transaction[], searchTerm:string) {
    return transactions.filter((transaction) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();

    const matchesId = transaction.id.toLowerCase().includes(searchLower);
    const matchesPaymentMethod = transaction.paymentMethod
      .toLowerCase()
      .includes(searchLower);
    const matchesReference = transaction.transactionReference
      .toString()
      .includes(searchLower);
    const matchesAmount = formatCurrency(transaction.amount)
      .toLowerCase()
      .includes(searchLower);
    const matchesDeduction = transaction.deduction
      ? formatCurrency(transaction.deduction).toLowerCase().includes(searchLower)
      : false;
    const matchesStatus = getStatusMessages(transaction.status)
      .toLowerCase()
      .includes(searchLower);
    const matchesSalesType = transaction.salesType
      .toLowerCase()
      .includes(searchLower);
    const matchesDate = formatDate(transaction.createdAt)
      .toLowerCase()
      .includes(searchLower);

    return (
      matchesId ||
      matchesPaymentMethod ||
      matchesReference ||
      matchesAmount ||
      matchesDeduction ||
      matchesStatus ||
      matchesSalesType ||
      matchesDate
    );
  });
}