import type { Transaction } from "@/types/transaction";

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

export function getPaymentIcon(method:string) {
    switch(method) {
        case "CARD": {
            return "/american-express.png";
        }
        case "DAVIPLATA": {
            return "/daviplata.png";
        }
        case "NEQUI": {
            return "/nequi.png";
        }
        case "PSE": {
            return "/pse.png";
        }
        case "BANCOLOMBIA": {
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

export function getStatusMessages(status:string) {
    switch (status) {
        case "SUCCESSFUL": {
            return "Cobro exitoso";
        }
        case "REJECTED": {
            return "Cobro no realizado";
        }
        default: {
            return "Cobro pendiente"
        }
    }
}

export function getTransactionIcon(type:string) {
    switch (type) {
        case "TERMINAL": {
            return "/datafono.png";
        }
        case "PAYMENT_LINK": {
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