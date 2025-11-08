export async function getTransactions() {
  const transactions = await fetch("https://bold-fe-api.vercel.app/api");
  return transactions.json();
}

export function formatCurrency(amount:number) {
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

export async function getTotalSales() {
    const transactions = await getTransactions();
    const {data} = transactions;
    const totalSales = data.reduce((total, item) => {
        return item.amount + total
    }, 0)
    console.log(totalSales)
    return totalSales
}